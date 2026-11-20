import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type UserRole = 'superadmin' | 'user';

interface ManageUsersRequest {
  action: 'list' | 'create' | 'update' | 'delete';
  userId?: string;
  email?: string;
  password?: string;
  fullName?: string;
  title?: string;
  role?: UserRole;
  isActive?: boolean;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: 'Server configuration missing' }, 500);
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return jsonResponse({ error: 'Missing authorization token' }, 401);
    }
    const token = authHeader.slice('Bearer '.length).trim();

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const {
      data: { user: caller },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !caller) {
      return jsonResponse({ error: 'Invalid or expired session' }, 401);
    }

    const { data: callerProfile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id, role, is_active')
      .eq('id', caller.id)
      .single();

    if (profileError || !callerProfile || callerProfile.role !== 'superadmin' || !callerProfile.is_active) {
      return jsonResponse({ error: 'Superadmin privileges required' }, 403);
    }

    const body = (await req.json()) as ManageUsersRequest;

    if (body.action === 'list') {
      const { data: profiles, error } = await supabaseAdmin
        .from('profiles')
        .select('id, email, full_name, title, role, is_active, created_at, updated_at')
        .order('role', { ascending: true })
        .order('created_at', { ascending: true });

      if (error) {
        return jsonResponse({ error: error.message }, 500);
      }

      return jsonResponse({ users: profiles ?? [] });
    }

    if (body.action === 'create') {
      const email = body.email?.trim().toLowerCase();
      const password = body.password ?? '';
      const fullName = body.fullName?.trim();
      const title = body.title?.trim() || (body.role === 'superadmin' ? 'System Administrator' : 'Claims Adjuster');
      const role: UserRole = body.role === 'superadmin' ? 'superadmin' : 'user';

      if (!email || !email.includes('@')) {
        return jsonResponse({ error: 'A valid email address is required.' }, 400);
      }
      if (password.length < 8) {
        return jsonResponse({ error: 'Password must be at least 8 characters.' }, 400);
      }
      if (!fullName) {
        return jsonResponse({ error: 'Full name is required.' }, 400);
      }

      const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName, title },
        app_metadata: { role },
      });

      if (createError || !created.user) {
        return jsonResponse({ error: createError?.message ?? 'Failed to create user.' }, 400);
      }

      const { data: profile, error: upsertError } = await supabaseAdmin
        .from('profiles')
        .upsert(
          {
            id: created.user.id,
            email,
            full_name: fullName,
            title,
            role,
            is_active: true,
          },
          { onConflict: 'id' }
        )
        .select('id, email, full_name, title, role, is_active, created_at, updated_at')
        .single();

      if (upsertError) {
        return jsonResponse({ error: upsertError.message }, 500);
      }

      return jsonResponse({ user: profile }, 201);
    }

    if (body.action === 'update') {
      const userId = body.userId?.trim();
      if (!userId) {
        return jsonResponse({ error: 'userId is required.' }, 400);
      }

      if (userId === caller.id) {
        if (body.role && body.role !== 'superadmin') {
          return jsonResponse({ error: 'You cannot demote your own superadmin account.' }, 400);
        }
        if (body.isActive === false) {
          return jsonResponse({ error: 'You cannot deactivate your own account.' }, 400);
        }
      }

      const { data: existing, error: existingError } = await supabaseAdmin
        .from('profiles')
        .select('id, email, full_name, title, role, is_active')
        .eq('id', userId)
        .single();

      if (existingError || !existing) {
        return jsonResponse({ error: 'User not found.' }, 404);
      }

      const nextRole: UserRole =
        body.role === 'superadmin' || body.role === 'user' ? body.role : existing.role;
      const nextFullName = body.fullName?.trim() || existing.full_name;
      const nextTitle = body.title?.trim() || existing.title;
      const nextIsActive = typeof body.isActive === 'boolean' ? body.isActive : existing.is_active;

      const authUpdate: Record<string, unknown> = {
        app_metadata: { role: nextRole },
        user_metadata: { full_name: nextFullName, title: nextTitle },
        ban_duration: nextIsActive ? 'none' : '876000h',
      };
      if (body.password && body.password.length > 0) {
        if (body.password.length < 8) {
          return jsonResponse({ error: 'Password must be at least 8 characters.' }, 400);
        }
        authUpdate.password = body.password;
      }

      const { error: authUpdateError } = await supabaseAdmin.auth.admin.updateUserById(userId, authUpdate);
      if (authUpdateError) {
        return jsonResponse({ error: authUpdateError.message }, 400);
      }

      const { data: updatedProfile, error: profileUpdateError } = await supabaseAdmin
        .from('profiles')
        .update({
          full_name: nextFullName,
          title: nextTitle,
          role: nextRole,
          is_active: nextIsActive,
        })
        .eq('id', userId)
        .select('id, email, full_name, title, role, is_active, created_at, updated_at')
        .single();

      if (profileUpdateError) {
        return jsonResponse({ error: profileUpdateError.message }, 500);
      }

      return jsonResponse({ user: updatedProfile });
    }

    if (body.action === 'delete') {
      const userId = body.userId?.trim();
      if (!userId) {
        return jsonResponse({ error: 'userId is required.' }, 400);
      }
      if (userId === caller.id) {
        return jsonResponse({ error: 'You cannot delete your own account.' }, 400);
      }

      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
      if (deleteError) {
        return jsonResponse({ error: deleteError.message }, 400);
      }

      return jsonResponse({ deleted: true, userId });
    }

    return jsonResponse({ error: 'Unsupported action.' }, 400);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected server error';
    return jsonResponse({ error: message }, 500);
  }
});
