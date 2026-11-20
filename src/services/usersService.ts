import { supabase } from '../lib/supabase';
import { CreateUserInput, UpdateUserInput, UserProfile, UserRole } from '../types/auth';

interface ProfileRow {
  id: string;
  email: string;
  full_name: string;
  title: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

function rowToProfile(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    title: row.title,
    role: row.role,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function extractFunctionError(error: unknown, fallback: string): Promise<string> {
  if (error && typeof error === 'object' && 'context' in error) {
    const ctx = (error as { context?: Response }).context;
    if (ctx && typeof ctx.json === 'function') {
      try {
        const parsed = (await ctx.json()) as { error?: string; message?: string };
        if (parsed?.error) return parsed.error;
        if (parsed?.message) return parsed.message;
      } catch {
        // ignore parse failure and fall back
      }
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
}

export async function fetchMyProfile(userId: string): Promise<UserProfile | null> {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, title, role, is_active, created_at, updated_at')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to load user profile: ${error.message}`);
  }

  return data ? rowToProfile(data as ProfileRow) : null;
}

export async function listUsers(): Promise<UserProfile[]> {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  const { data, error } = await supabase.functions.invoke('manage-users', {
    body: { action: 'list' },
  });

  if (error) {
    throw new Error(await extractFunctionError(error, 'Failed to load users.'));
  }

  const rows = (data as { users?: ProfileRow[] })?.users ?? [];
  return rows.map(rowToProfile);
}

export async function createUser(input: CreateUserInput): Promise<UserProfile> {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  const { data, error } = await supabase.functions.invoke('manage-users', {
    body: {
      action: 'create',
      email: input.email,
      password: input.password,
      fullName: input.fullName,
      title: input.title,
      role: input.role,
    },
  });

  if (error) {
    throw new Error(await extractFunctionError(error, 'Failed to create user.'));
  }

  return rowToProfile((data as { user: ProfileRow }).user);
}

export async function updateUser(input: UpdateUserInput): Promise<UserProfile> {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  const { data, error } = await supabase.functions.invoke('manage-users', {
    body: {
      action: 'update',
      userId: input.userId,
      fullName: input.fullName,
      title: input.title,
      role: input.role,
      isActive: input.isActive,
      password: input.password,
    },
  });

  if (error) {
    throw new Error(await extractFunctionError(error, 'Failed to update user.'));
  }

  return rowToProfile((data as { user: ProfileRow }).user);
}

export async function deleteUser(userId: string): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  const { error } = await supabase.functions.invoke('manage-users', {
    body: {
      action: 'delete',
      userId,
    },
  });

  if (error) {
    throw new Error(await extractFunctionError(error, 'Failed to delete user.'));
  }
}
