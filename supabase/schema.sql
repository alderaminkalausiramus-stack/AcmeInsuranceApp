-- Acme Insurance Claims Workbench — Supabase Postgres Schema & RBAC
-- Run this in Supabase Dashboard -> SQL Editor BEFORE running supabase/seed.sql

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

-- ---------------------------------------------------------------------------
-- 1. User Profiles & Role-Based Access Control (superadmin | user)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  full_name text not null,
  title text not null default 'Claims Adjuster',
  role text not null default 'user' check (role in ('superadmin', 'user')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_profiles_role on public.profiles (role);
create index if not exists idx_profiles_is_active on public.profiles (is_active);

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.set_profiles_updated_at();

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, title, role, is_active)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), split_part(coalesce(new.email, 'User'), '@', 1)),
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'title'), ''), 'Claims Adjuster'),
    case when (new.raw_app_meta_data ->> 'role') = 'superadmin' then 'superadmin' else 'user' end,
    true
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function private.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function private.handle_new_user();

create or replace function private.is_active_user()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and is_active = true
  );
$$;

revoke all on function private.is_active_user() from public, anon;
grant execute on function private.is_active_user() to authenticated;

create or replace function private.is_superadmin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = 'superadmin'
      and is_active = true
  );
$$;

revoke all on function private.is_superadmin() from public, anon;
grant execute on function private.is_superadmin() to authenticated;

grant usage on schema public to authenticated, service_role;
revoke all on table public.profiles from anon;
grant select on table public.profiles to authenticated;
grant select, insert, update, delete on table public.profiles to service_role;

alter table public.profiles enable row level security;

drop policy if exists "Users can read own profile or superadmin reads all" on public.profiles;
create policy "Users can read own profile or superadmin reads all"
  on public.profiles
  for select
  to authenticated
  using (id = (select auth.uid()) or (select private.is_superadmin()));

-- ---------------------------------------------------------------------------
-- 2. Claims Registry
-- ---------------------------------------------------------------------------
create table if not exists public.claims (
  id text primary key,
  claim_number text unique not null,
  category text not null check (category in ('auto', 'property', 'health')),
  status text not null check (status in ('pending', 'in_review', 'approved', 'rejected', 'info_requested')),
  priority text not null check (priority in ('low', 'normal', 'urgent')),
  customer jsonb not null,
  policy jsonb not null,
  incident_date date not null,
  submitted_at timestamptz not null default now(),
  incident_location text not null,
  claimed_amount numeric(12, 2) not null check (claimed_amount >= 0),
  suggested_payout numeric(12, 2) not null check (suggested_payout >= 0),
  approved_payout numeric(12, 2) check (approved_payout is null or approved_payout >= 0),
  risk_score integer not null check (risk_score between 0 and 100),
  risk_level text not null check (risk_level in ('low', 'medium', 'high')),
  risk_reasons jsonb not null default '[]'::jsonb,
  title text not null,
  summary text not null,
  detailed_statement text not null,
  attachments jsonb not null default '[]'::jsonb,
  timeline jsonb not null default '[]'::jsonb,
  review_decision jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_claims_status on public.claims (status);
create index if not exists idx_claims_category on public.claims (category);
create index if not exists idx_claims_risk_level on public.claims (risk_level);
create index if not exists idx_claims_submitted_at on public.claims (submitted_at desc);
create index if not exists idx_claims_claimed_amount on public.claims (claimed_amount desc);
create index if not exists idx_claims_risk_score on public.claims (risk_score desc);

create or replace function public.set_claims_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_claims_updated_at on public.claims;
create trigger trg_claims_updated_at
  before update on public.claims
  for each row
  execute function public.set_claims_updated_at();

revoke all on table public.claims from anon;
grant select, insert, update, delete on table public.claims to authenticated, service_role;

alter table public.claims enable row level security;

drop policy if exists "Active users can read claims" on public.claims;
create policy "Active users can read claims"
  on public.claims
  for select
  to authenticated
  using ((select private.is_active_user()));

drop policy if exists "Active users can insert claims" on public.claims;
create policy "Active users can insert claims"
  on public.claims
  for insert
  to authenticated
  with check ((select private.is_active_user()));

drop policy if exists "Active users can update claims" on public.claims;
create policy "Active users can update claims"
  on public.claims
  for update
  to authenticated
  using ((select private.is_active_user()))
  with check ((select private.is_active_user()));

drop policy if exists "Superadmins can delete claims" on public.claims;
create policy "Superadmins can delete claims"
  on public.claims
  for delete
  to authenticated
  using ((select private.is_superadmin()));
