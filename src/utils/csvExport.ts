import { Claim } from '../types/claim';

function escapeCsvField(value: string | number | undefined | null): string {
  const raw = value === undefined || value === null ? '' : String(value);
  // Neutralize spreadsheet formula injection (=, +, -, @, tab, CR)
  const neutralized = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  return `"${neutralized.replace(/"/g, '""')}"`;
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
    escapeCsvField(c.claimNumber),
    escapeCsvField(c.customer.name),
    escapeCsvField(c.customer.email),
    escapeCsvField(c.policy.policyNumber),
    escapeCsvField(c.category.toUpperCase()),
    escapeCsvField(c.status.toUpperCase()),
    escapeCsvField(c.riskLevel.toUpperCase()),
    escapeCsvField(c.riskScore),
    escapeCsvField(c.claimedAmount.toFixed(2)),
    escapeCsvField(c.approvedPayout !== undefined ? c.approvedPayout.toFixed(2) : ''),
    escapeCsvField(c.incidentDate),
    escapeCsvField(c.submittedAt),
    escapeCsvField(c.reviewDecision ? c.reviewDecision.decision.toUpperCase() : 'PENDING'),
    escapeCsvField(c.reviewDecision ? c.reviewDecision.reasonCode : 'N/A'),
    escapeCsvField(c.reviewDecision ? c.reviewDecision.notes : ''),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `Acme_Insurance_Claims_Report_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
