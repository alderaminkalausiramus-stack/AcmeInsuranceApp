# Acme Insurance - Claims Review Workbench

A modern React & TypeScript web application designed for insurance adjusters, claims analysts, and underwriting reviewers to review, inspect, and adjudicate incoming customer claims.

---

## 🚀 Key Features

## 🚀 Architecture & Pages

### 1. Main Claims Ledger (`/`)
- Full-width enterprise claims data table ([`src/pages/ClaimsListPage.tsx`](src/pages/ClaimsListPage.tsx)).
- **Top KPI Metrics Bar**: Awaiting Review, High Risk Flags, Approved Claims, and Total Disbursed.
- **Table Filters & Controls**:
  - Live search by customer, claim ID, or policy number.
  - Quick status tabs (**All**, **Pending**, **Needs Info**, **Approved**, **Denied**) with real-time count badges.
  - Line of Business (**Auto**, **Property**, **Health**) and Risk Level (**High**, **Medium**, **Low**) filters.
  - Multi-column sorting (Date, Amount, Risk).
- **Columns**: Claim Number, Insured Customer, Policy #, Line of Business, Claimed Amount, Approved Payout, Risk Level & Score, Adjudication Status, Submission Date, and Action button (**Review**).
- Clicking any row navigates directly to that claim's dedicated detail page.

### 2. Dedicated Claim Detail Page (`/claims/:claimId`)
- Dedicated full-page review station ([`src/pages/ClaimDetailPage.tsx`](src/pages/ClaimDetailPage.tsx)).
- **Top Header**: "← Back to Queue" navigation, breadcrumbs, status pill, and priority flag.
- **Incident & Narrative Statement**: Full customer statement, incident date, location, and financial summary (Claimed Loss, Deductible, Suggested Net, and Approved Payout).
- **Insured Customer Profile**: Contact info, address, tenure, and prior claim history.
- **Policy Coverage Details**: Coverage limit, deductible, effective dates, and premium status.
- **Evidence & Attachments Gallery**: Interactive cards for photos, police reports, and contractor quotes with modal document inspector.
- **Risk Intelligence Engine**: 0–100 risk score with automated trigger rules and SIU alerts.
- **Official Adjudication Station**:
  - Segmented control to **Approve Claim** (with authorized payout and reason code), **Request Info** (with documentation checklist), or **Deny Claim** (with exclusion/fraud code).
  - Mandatory adjuster rationale notes.
  - Option to amend existing decisions.
- **Audit Trail & Notes**: Chronological history tracking automated risk engine flags, reviewer notes, and status changes with inline note appending.

### 2. Decision Adjudication & Payout Authorization
- **Approve Claim:**
  - Adjust and authorize final payout amount (prefilled with suggested net payout: claimed amount minus deductible).
  - Choose formal approval reason code (`FULL_COVERAGE_CONFIRMED`, `PARTIAL_SETTLEMENT_ACCEPTED`, `EXPEDITED_FAST_TRACK`, `MANAGER_OVERRIDE_APPROVED`).
  - Mandatory adjuster rationale notes.
- **Request More Information:**
  - Interactive checklist of required documents (e.g., Police Incident Report, Itemized UB-04 Medical Bill, Second Repair Quote, Maintenance Logs).
  - Set request reason code and custom notification message.
- **Deny Claim:**
  - Select denial code (`POLICY_EXCLUSION_WEAR_AND_TEAR`, `SUSPECTED_FRAUD_SIU_REFERRAL`, `PRE_EXISTING_DAMAGE`, `LACK_OF_COVERAGE_OR_NONPAYMENT`, `UNSUBSTANTIATED_LOSS_BURDEN_UNMET`).
  - Mandatory legal / adjudication notice.
- **Amend Decision:**
  - Easily reopen and adjust decisions with full historical audit tracking.

### 3. Audit Trail & Internal Adjuster Notes
- Chronological timeline tracking every event: submission, risk engine checks, status changes, and adjuster decisions.
- Form to append internal reviewer notes without altering claim status.

### 4. Utilities & Data Management
- **Simulate New Claim:** Modal to file simulated incoming claims with customizable customer profiles, lines of business, amounts, and risk engine scores.
- **Export CSV:** One-click download of the complete claims ledger formatted for Excel and analytics.
- **Persistent State:** Saves all adjustments in `localStorage` with a **Reset Demo** button to restore clean seed data anytime.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite 6
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS + Lucide React Icons
- **Persistence:** LocalStorage with typed seed fallbacks

---

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Start Vite dev server (defaults to http://localhost:5173)
npm run dev

# Run TypeScript check & production build
npm run build
```
