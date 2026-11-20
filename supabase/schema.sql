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

-- Secondary indexes on public.claims are intentionally omitted here so you can
-- diagnose slow queries on 90k+ rows and add targeted B-tree / composite / GIN indexes.

create or replace function public.get_dashboard_summary()
returns jsonb
language sql
stable
security invoker
set search_path = ''
set statement_timeout = '25s'
as $$
  with grouped as (
    select
      date_trunc('month', submitted_at at time zone 'UTC') as month_bucket,
      category,
      status,
      risk_level,
      priority,
      count(*)::int as cnt,
      coalesce(sum(claimed_amount), 0)::numeric as sum_claimed,
      coalesce(sum(case when status = 'approved' then coalesce(approved_payout, suggested_payout, 0) else 0 end), 0)::numeric as sum_disbursed
    from public.claims
    group by 1, 2, 3, 4, 5
  ),
  totals as (
    select
      coalesce(sum(cnt), 0)::int as total_claims,
      coalesce(sum(sum_claimed), 0)::numeric as total_claimed,
      coalesce(sum(sum_disbursed), 0)::numeric as total_disbursed,
      coalesce(sum(cnt) filter (where status = 'pending'), 0)::int as pending,
      coalesce(sum(cnt) filter (where status = 'in_review'), 0)::int as in_review,
      coalesce(sum(cnt) filter (where status = 'info_requested'), 0)::int as needs_info,
      coalesce(sum(cnt) filter (where status = 'approved'), 0)::int as approved,
      coalesce(sum(cnt) filter (where status = 'rejected'), 0)::int as denied,
      coalesce(sum(cnt) filter (where risk_level = 'high'), 0)::int as high_risk,
      coalesce(sum(cnt) filter (where priority = 'urgent'), 0)::int as urgent,
      coalesce(sum(cnt) filter (where category = 'auto'), 0)::int as auto_count,
      coalesce(sum(sum_claimed) filter (where category = 'auto'), 0)::numeric as auto_amount,
      coalesce(sum(cnt) filter (where category = 'property'), 0)::int as property_count,
      coalesce(sum(sum_claimed) filter (where category = 'property'), 0)::numeric as property_amount,
      coalesce(sum(cnt) filter (where category = 'health'), 0)::int as health_count,
      coalesce(sum(sum_claimed) filter (where category = 'health'), 0)::numeric as health_amount
    from grouped
  ),
  monthly as (
    select
      to_char(month_bucket, 'YYYY-MM') as sort_key,
      to_char(month_bucket, 'Mon YY') as label,
      coalesce(sum(cnt), 0)::int as claims,
      coalesce(sum(sum_claimed), 0)::numeric as claimed_amount,
      coalesce(sum(sum_disbursed), 0)::numeric as disbursed
    from grouped
    group by month_bucket
    order by month_bucket desc
    limit 12
  )
  select jsonb_build_object(
    'totalClaims', t.total_claims,
    'totalClaimed', t.total_claimed,
    'totalDisbursed', t.total_disbursed,
    'pending', t.pending,
    'inReview', t.in_review,
    'needsInfo', t.needs_info,
    'approved', t.approved,
    'denied', t.denied,
    'highRisk', t.high_risk,
    'urgent', t.urgent,
    'byCategory', jsonb_build_object(
      'auto', jsonb_build_object('count', t.auto_count, 'amount', t.auto_amount),
      'property', jsonb_build_object('count', t.property_count, 'amount', t.property_amount),
      'health', jsonb_build_object('count', t.health_count, 'amount', t.health_amount)
    ),
    'monthlySeries', coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'sortKey', m.sort_key,
            'label', m.label,
            'claims', m.claims,
            'claimedAmount', m.claimed_amount,
            'disbursed', m.disbursed
          )
          order by m.sort_key asc
        )
        from monthly m
      ),
      '[]'::jsonb
    )
  )
  from totals t;
$$;

revoke all on function public.get_dashboard_summary() from public, anon;
grant execute on function public.get_dashboard_summary() to authenticated, service_role;

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
