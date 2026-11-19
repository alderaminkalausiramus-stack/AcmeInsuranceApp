export type ClaimStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'info_requested';

export type ClaimCategory = 'auto' | 'property' | 'health';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface PolicyInfo {
  policyNumber: string;
  policyType: string;
  coverageLimit: number;
  deductible: number;
  policyStartDate: string;
  premiumStatus: 'active' | 'grace_period' | 'delinquent';
}

export interface CustomerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  customerSince: string;
  totalPriorClaims: number;
  avatarUrl?: string;
}

export interface ClaimAttachment {
  id: string;
  name: string;
  category: 'Damage Photo' | 'Police Report' | 'Medical Invoice' | 'Repair Estimate' | 'Receipt';
  size: string;
  fileType: 'image' | 'pdf' | 'document';
  previewUrl: string;
  caption: string;
}

export interface TimelineEntry {
  id: string;
  timestamp: string;
  author: string;
  role: 'System' | 'Customer' | 'Senior Adjuster' | 'Risk Engine' | 'Claims Reviewer';
  actionType: 'created' | 'status_update' | 'note' | 'risk_flag' | 'info_requested' | 'decision';
  message: string;
}

export interface ReviewDecisionRecord {
  decision: 'approved' | 'rejected' | 'info_requested';
  decidedAt: string;
  reviewerName: string;
  reasonCode: string;
  notes: string;
  approvedPayout?: number;
  requestedDocuments?: string[];
}

export interface Claim {
  id: string;
  claimNumber: string;
  category: ClaimCategory;
  status: ClaimStatus;
  priority: 'low' | 'normal' | 'urgent';
  
  customer: CustomerInfo;
  policy: PolicyInfo;
  
  incidentDate: string;
  submittedAt: string;
  incidentLocation: string;
  
  claimedAmount: number;
  suggestedPayout: number;
  approvedPayout?: number;
  
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  riskReasons: string[];
  
  title: string;
  summary: string;
  detailedStatement: string;
  
  attachments: ClaimAttachment[];
  timeline: TimelineEntry[];
  reviewDecision?: ReviewDecisionRecord;
}

export interface ClaimFilterState {
  status: 'all' | ClaimStatus;
  category: 'all' | ClaimCategory;
  risk: 'all' | RiskLevel;
  searchQuery: string;
  sortBy: 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc' | 'risk_desc';
}
