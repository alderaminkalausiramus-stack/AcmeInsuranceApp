-- Acme Insurance Claims Workbench — Supabase Postgres Schema
-- Run this in Supabase Dashboard -> SQL Editor BEFORE running supabase/seed.sql

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

-- Indexes for common ledger filters & sort orders
create index if not exists idx_claims_status on public.claims (status);
create index if not exists idx_claims_category on public.claims (category);
create index if not exists idx_claims_risk_level on public.claims (risk_level);
create index if not exists idx_claims_submitted_at on public.claims (submitted_at desc);
create index if not exists idx_claims_claimed_amount on public.claims (claimed_amount desc);
create index if not exists idx_claims_risk_score on public.claims (risk_score desc);

-- Automatically maintain updated_at on updates
create or replace function public.set_claims_updated_at()
returns trigger
language plpgsql
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

-- Row Level Security (RLS)
-- Staging open policies (read/insert/update without delete).
-- To restrict to authenticated users later, replace `true` with `auth.role() = 'authenticated'`.
alter table public.claims enable row level security;

drop policy if exists "Allow staging read on claims" on public.claims;
create policy "Allow staging read on claims"
  on public.claims
  for select
  using (true);

drop policy if exists "Allow staging insert on claims" on public.claims;
create policy "Allow staging insert on claims"
  on public.claims
  for insert
  with check (true);

drop policy if exists "Allow staging update on claims" on public.claims;
create policy "Allow staging update on claims"
  on public.claims
  for update
  using (true)
  with check (true);
