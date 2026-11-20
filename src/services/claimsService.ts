import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  Claim,
  ClaimAttachment,
  ClaimCategory,
  ClaimFilterState,
  ClaimStatus,
  CustomerInfo,
  PolicyInfo,
  ReviewDecisionRecord,
  RiskLevel,
  TimelineEntry,
} from '../types/claim';

export interface DashboardSummary {
  totalClaims: number;
  totalClaimed: number;
  totalDisbursed: number;
  pending: number;
  inReview: number;
  needsInfo: number;
  approved: number;
  denied: number;
  highRisk: number;
  urgent: number;
  byCategory: {
    auto: { count: number; amount: number };
    property: { count: number; amount: number };
    health: { count: number; amount: number };
  };
  monthlySeries: Array<{
    sortKey: string;
    label: string;
    claims: number;
    claimedAmount: number;
    disbursed: number;
  }>;
}

export interface FetchClaimsPageParams {
  status: ClaimStatus | 'all';
  category: ClaimCategory | 'all';
  risk: RiskLevel | 'all';
  searchQuery: string;
  sortBy: ClaimFilterState['sortBy'];
  page: number;
  pageSize: number;
}

export interface ClaimsPageResult {
  claims: Claim[];
  totalCount: number;
}

interface ClaimRow {
  id: string;
  claim_number: string;
  category: ClaimCategory;
  status: ClaimStatus;
  priority: 'low' | 'normal' | 'urgent';
  customer: CustomerInfo;
  policy: PolicyInfo;
  incident_date: string;
  submitted_at: string;
  incident_location: string;
  claimed_amount: number | string;
  suggested_payout: number | string;
  approved_payout: number | string | null;
  risk_score: number;
  risk_level: RiskLevel;
  risk_reasons: string[];
  title: string;
  summary: string;
  detailed_statement: string;
  attachments: ClaimAttachment[];
  timeline: TimelineEntry[];
  review_decision: ReviewDecisionRecord | null;
}

function rowToClaim(row: ClaimRow): Claim {
  return {
    id: row.id,
    claimNumber: row.claim_number,
    category: row.category,
    status: row.status,
    priority: row.priority,
    customer: row.customer,
    policy: row.policy,
    incidentDate: row.incident_date,
    submittedAt: row.submitted_at,
    incidentLocation: row.incident_location,
    claimedAmount: Number(row.claimed_amount),
    suggestedPayout: Number(row.suggested_payout),
    approvedPayout:
      row.approved_payout !== null && row.approved_payout !== undefined
        ? Number(row.approved_payout)
        : undefined,
    riskScore: Number(row.risk_score),
    riskLevel: row.risk_level,
    riskReasons: Array.isArray(row.risk_reasons) ? row.risk_reasons : [],
    title: row.title,
    summary: row.summary,
    detailedStatement: row.detailed_statement,
    attachments: Array.isArray(row.attachments) ? row.attachments : [],
    timeline: Array.isArray(row.timeline) ? row.timeline : [],
    reviewDecision: row.review_decision ?? undefined,
  };
}

function claimToRow(claim: Claim): ClaimRow {
  return {
    id: claim.id,
    claim_number: claim.claimNumber,
    category: claim.category,
    status: claim.status,
    priority: claim.priority,
    customer: claim.customer,
    policy: claim.policy,
    incident_date: claim.incidentDate,
    submitted_at: claim.submittedAt,
    incident_location: claim.incidentLocation,
    claimed_amount: claim.claimedAmount,
    suggested_payout: claim.suggestedPayout,
    approved_payout: claim.approvedPayout ?? null,
    risk_score: claim.riskScore,
    risk_level: claim.riskLevel,
    risk_reasons: claim.riskReasons,
    title: claim.title,
    summary: claim.summary,
    detailed_statement: claim.detailedStatement,
    attachments: claim.attachments,
    timeline: claim.timeline,
    review_decision: claim.reviewDecision ?? null,
  };
}

function sanitizePostgrestSearch(raw: string): string {
  return raw.replace(/[(),*%]/g, ' ').replace(/\s+/g, ' ').trim();
}

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      totalClaims: 0,
      totalClaimed: 0,
      totalDisbursed: 0,
      pending: 0,
      inReview: 0,
      needsInfo: 0,
      approved: 0,
      denied: 0,
      highRisk: 0,
      urgent: 0,
      byCategory: {
        auto: { count: 0, amount: 0 },
        property: { count: 0, amount: 0 },
        health: { count: 0, amount: 0 },
      },
      monthlySeries: [],
    };
  }

  const { data, error } = await supabase.rpc('get_dashboard_summary');

  if (error) {
    throw new Error(`Failed to fetch dashboard summary from Supabase: ${error.message}`);
  }

  const raw = data as DashboardSummary;
  return {
    ...raw,
    totalClaimed: Number(raw.totalClaimed ?? 0),
    totalDisbursed: Number(raw.totalDisbursed ?? 0),
    byCategory: {
      auto: {
        count: Number(raw.byCategory?.auto?.count ?? 0),
        amount: Number(raw.byCategory?.auto?.amount ?? 0),
      },
      property: {
        count: Number(raw.byCategory?.property?.count ?? 0),
        amount: Number(raw.byCategory?.property?.amount ?? 0),
      },
      health: {
        count: Number(raw.byCategory?.health?.count ?? 0),
        amount: Number(raw.byCategory?.health?.amount ?? 0),
      },
    },
    monthlySeries: Array.isArray(raw.monthlySeries)
      ? raw.monthlySeries.map((m) => ({
          ...m,
          claims: Number(m.claims ?? 0),
          claimedAmount: Number(m.claimedAmount ?? 0),
          disbursed: Number(m.disbursed ?? 0),
        }))
      : [],
  };
}

export async function fetchClaimsPage(params: FetchClaimsPageParams): Promise<ClaimsPageResult> {
  if (!isSupabaseConfigured || !supabase) {
    const { SEED_CLAIMS } = await import('../data/seedClaims');
    return { claims: SEED_CLAIMS.slice(0, params.pageSize), totalCount: SEED_CLAIMS.length };
  }

  let query = supabase.from('claims').select('*', { count: 'exact' });

  if (params.status !== 'all') {
    query = query.eq('status', params.status);
  }
  if (params.category !== 'all') {
    query = query.eq('category', params.category);
  }
  if (params.risk !== 'all') {
    query = query.eq('risk_level', params.risk);
  }

  const cleanedSearch = sanitizePostgrestSearch(params.searchQuery);
  if (cleanedSearch) {
    query = query.or(
      [
        `title.ilike.%${cleanedSearch}%`,
        `incident_location.ilike.%${cleanedSearch}%`,
        `claim_number.ilike.%${cleanedSearch}%`,
        `customer->>name.ilike.%${cleanedSearch}%`,
        `policy->>policyNumber.ilike.%${cleanedSearch}%`,
      ].join(',')
    );
  }

  switch (params.sortBy) {
    case 'date_asc':
      query = query.order('submitted_at', { ascending: true });
      break;
    case 'amount_desc':
      query = query.order('claimed_amount', { ascending: false });
      break;
    case 'amount_asc':
      query = query.order('claimed_amount', { ascending: true });
      break;
    case 'risk_desc':
      query = query
        .order('risk_score', { ascending: false })
        .order('submitted_at', { ascending: false });
      break;
    case 'date_desc':
    default:
      query = query.order('submitted_at', { ascending: false });
      break;
  }

  const from = Math.max(0, (params.page - 1) * params.pageSize);
  const to = from + params.pageSize - 1;

  const { data, count, error } = await query.range(from, to);

  if (error) {
    throw new Error(`Failed to fetch claims from Supabase: ${error.message}`);
  }

  return {
    claims: (data as ClaimRow[]).map(rowToClaim),
    totalCount: count ?? 0,
  };
}

export async function fetchPriorityClaims(
  mode: 'escalations' | 'review',
  limit = 6
): Promise<Claim[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  let query = supabase.from('claims').select('*');
  if (mode === 'escalations') {
    query = query.or('risk_level.eq.high,priority.eq.urgent');
  } else {
    query = query.in('status', ['pending', 'in_review']);
  }

  const { data, error } = await query
    .order('risk_score', { ascending: false })
    .order('submitted_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch priority claims: ${error.message}`);
  }

  return (data as ClaimRow[]).map(rowToClaim);
}

export async function fetchRecentActivityClaims(limit = 12): Promise<Claim[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('claims')
    .select('*')
    .order('submitted_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch recent activity: ${error.message}`);
  }

  return (data as ClaimRow[]).map(rowToClaim);
}

export async function fetchClaimById(claimId: string): Promise<Claim | null> {
  if (!isSupabaseConfigured || !supabase) {
    const { SEED_CLAIMS } = await import('../data/seedClaims');
    return SEED_CLAIMS.find((c) => c.id === claimId) ?? null;
  }

  const { data, error } = await supabase
    .from('claims')
    .select('*')
    .eq('id', claimId)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch claim: ${error.message}`);
  }

  return data ? rowToClaim(data as ClaimRow) : null;
}

export async function fetchClaimsForExport(limit = 1000): Promise<Claim[]> {
  if (!isSupabaseConfigured || !supabase) {
    const { SEED_CLAIMS } = await import('../data/seedClaims');
    return SEED_CLAIMS;
  }

  const { data, error } = await supabase
    .from('claims')
    .select('*')
    .order('submitted_at', { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to export claims: ${error.message}`);
  }

  return (data as ClaimRow[]).map(rowToClaim);
}

export async function createClaim(claim: Claim): Promise<Claim> {
  if (!isSupabaseConfigured || !supabase) {
    return claim;
  }

  const { data, error } = await supabase
    .from('claims')
    .insert(claimToRow(claim))
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to create claim in Supabase: ${error.message}`);
  }

  return rowToClaim(data as ClaimRow);
}

export async function updateClaim(claim: Claim): Promise<Claim> {
  if (!isSupabaseConfigured || !supabase) {
    return claim;
  }

  const row = claimToRow(claim);
  const { data, error } = await supabase
    .from('claims')
    .update({
      status: row.status,
      priority: row.priority,
      approved_payout: row.approved_payout,
      review_decision: row.review_decision,
      timeline: row.timeline,
    })
    .eq('id', claim.id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update claim in Supabase: ${error.message}`);
  }

  return rowToClaim(data as ClaimRow);
}

export async function deleteClaim(claimId: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  const { data, error } = await supabase
    .from('claims')
    .delete()
    .eq('id', claimId)
    .select('id');

  if (error) {
    throw new Error(`Failed to delete claim in Supabase: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error('Unable to delete claim. Superadmin privileges are required.');
  }
}
