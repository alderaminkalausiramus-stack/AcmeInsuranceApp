# Acme Insurance — Claims Review Workbench

A React & TypeScript web application for insurance adjusters, claims analysts, and underwriting reviewers to inspect, triage, and adjudicate incoming customer claims.

---

## Architecture & Pages

### 1. Claims Ledger (`/`)
- Full-width enterprise claims table ([`src/pages/ClaimsListPage.tsx`](src/pages/ClaimsListPage.tsx)) with **pagination** (10 / 25 / 50 per page).
- **Top KPI Metrics Bar**: Awaiting Review, High Risk Flags, Approved Claims, and Total Disbursed.
- **Filters & Controls**:
  - Live search by customer name, claim number, policy number, or incident headline.
  - Status tabs (**All**, **Pending**, **In Review**, **Needs Info**, **Approved**, **Denied**) with live counts.
  - Line of Business (**Auto**, **Property**, **Health**) and Risk Level (**High**, **Medium**, **Low**) filters.
  - Multi-column sorting (Newest, Oldest, Claimed Amount, Risk Score).

### 2. Claim Detail Page (`/claims/:claimId`)
- Dedicated claim review workspace ([`src/pages/ClaimDetailPage.tsx`](src/pages/ClaimDetailPage.tsx)).
- Customer profile, policy coverage details, incident narrative, and evidence attachment previews (`/damage.jpg` + document cards).
- Risk engine score (`0–100`) and triggered rules.
- **Adjudication Station**: Approve (with payout & reason code), Request Info (document checklist), Deny (exclusion/SIU codes), or Amend an existing decision.
- **Audit Trail & Notes**: Chronological timeline with inline note appending.

### 3. Intake & Export Utilities
- **New Claim**: Modal to file incoming claims directly into the queue.
- **Export CSV**: Formula-safe CSV export of all claims.

---

## Tech Stack

- **Frontend:** React 18, TypeScript (Strict), Vite 6, React Router v7, Tailwind CSS v3, Lucide React
- **Backend / Database:** Supabase Postgres (`@supabase/supabase-js`)
- **Hosting:** Vercel (`vercel.json` SPA rewrites)

---

## Running Locally

```bash
npm install
cp .env.example .env.local   # Add your Supabase URL & anon key
npm run dev                  # http://localhost:5173
```

If `.env.local` is not configured, the app falls back to the 60-claim seed dataset in [`src/data/seedClaims.ts`](src/data/seedClaims.ts).

---

## Supabase & Vercel Staging Setup

1. **Supabase:**
   - Run [`supabase/schema.sql`](supabase/schema.sql) in **SQL Editor** to create the `public.claims` table, indexes, trigger, and RLS policies.
   - Run [`supabase/seed.sql`](supabase/seed.sql) in **SQL Editor** to seed 60 realistic claims.
2. **Vercel:**
   - Import this repository into Vercel (Framework Preset: `Vite`, Build Command: `npm run build`, Output Directory: `dist`).
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in **Project Settings → Environment Variables**.
   - Deploy.
