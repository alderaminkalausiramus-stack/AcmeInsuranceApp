import { Claim } from '../types/claim';
import { SEED_CLAIMS } from '../data/seedClaims';

const STORAGE_KEY = 'acme_claims_clean_v6';

// Check if any legacy or bracketed names exist or old unsplash image URLs
function needsFreshSeed(claims: Claim[]): boolean {
  return claims.some((c) =>
    /\[mock\]|\[test\]|\(demo\)|sarah|james|derek|elena|marcus|linda|robert|jenkins|montgomery|vance|sterling|hastings/i.test(
      c.customer?.name || ''
    ) ||
    c.attachments?.some((a) => a.previewUrl && a.previewUrl.includes('unsplash')) ||
    (c.customer?.avatarUrl && c.customer.avatarUrl.includes('unsplash'))
  );
}

export function loadStoredClaims(): Claim[] {
  try {
    // Purge previous storage keys
    [
      'aegis_insurance_claims_v1',
      'acme_insurance_claims_v1',
      'acme_insurance_claims_v2',
      'acme_claims_mock_data_v4',
      'acme_claims_clean_v5',
    ].forEach((k) => localStorage.removeItem(k));

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_CLAIMS));
      return SEED_CLAIMS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      if (needsFreshSeed(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_CLAIMS));
        return SEED_CLAIMS;
      }
      return parsed;
    }
    return SEED_CLAIMS;
  } catch (error) {
    console.error('Failed to parse claims from localStorage, fallback to seed data', error);
    return SEED_CLAIMS;
  }
}

export function saveStoredClaims(claims: Claim[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
  } catch (error) {
    console.error('Failed to save claims to localStorage', error);
  }
}

export function resetStoredClaims(): Claim[] {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_CLAIMS));
  return SEED_CLAIMS;
}

export function exportClaimsToCSV(claims: Claim[]): void {
  const headers = [
    'Claim ID',
    'Customer Name',
    'Customer Email',
    'Policy Number',
    'Category',
    'Status',
    'Risk Level',
    'Risk Score',
    'Claimed Amount ($)',
    'Approved Payout ($)',
    'Incident Date',
    'Submission Date',
    'Reviewer Decision',
    'Reason Code',
    'Reviewer Notes',
  ];

  const rows = claims.map((c) => [
    `"${c.claimNumber}"`,
    `"${c.customer.name.replace(/"/g, '""')}"`,
    `"${c.customer.email}"`,
    `"${c.policy.policyNumber}"`,
    `"${c.category.toUpperCase()}"`,
    `"${c.status.toUpperCase()}"`,
    `"${c.riskLevel.toUpperCase()}"`,
    `"${c.riskScore}"`,
    `"${c.claimedAmount.toFixed(2)}"`,
    `"${(c.approvedPayout ?? 0).toFixed(2)}"`,
    `"${c.incidentDate}"`,
    `"${c.submittedAt}"`,
    `"${c.reviewDecision ? c.reviewDecision.decision.toUpperCase() : 'PENDING'}"`,
    `"${c.reviewDecision ? c.reviewDecision.reasonCode : 'N/A'}"`,
    `"${c.reviewDecision ? c.reviewDecision.notes.replace(/"/g, '""') : ''}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Acme_Insurance_Claims_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
