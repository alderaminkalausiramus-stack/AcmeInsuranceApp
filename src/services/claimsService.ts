import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  Claim,
  ClaimAttachment,
  ClaimCategory,
  ClaimStatus,
  CustomerInfo,
  PolicyInfo,
  ReviewDecisionRecord,
  RiskLevel,
  TimelineEntry,
} from '../types/claim';

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
    approvedPayout: row.approved_payout !== null && row.approved_payout !== undefined
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

export async function fetchClaims(): Promise<Claim[]> {
  if (!isSupabaseConfigured || !supabase) {
    const { SEED_CLAIMS } = await import('../data/seedClaims');
    return SEED_CLAIMS;
  }

  const { data, error } = await supabase
    .from('claims')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch claims from Supabase: ${error.message}`);
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
