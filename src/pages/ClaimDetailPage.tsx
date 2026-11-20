import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Claim,
  ClaimStatus,
  ReviewDecisionRecord,
  TimelineEntry,
  ClaimAttachment,
} from '../types/claim';
import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileText,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  AlertTriangle,
  Send,
  Paperclip,
  Edit3,
  ExternalLink,
  Shield,
  FileCheck,
  Eye,
  Trash2,
  Loader2,
} from 'lucide-react';
import { AttachmentModal } from '../components/AttachmentModal';
import { useAuth } from '../context/AuthContext';

interface ClaimDetailPageProps {
  claims: Claim[];
  onUpdateClaim: (updatedClaim: Claim) => Promise<void>;
  onDeleteClaim?: (claimId: string) => Promise<void>;
}

const DEFAULT_REQUESTED_DOCS = ['Official Police Incident Report'];

const REQUIRED_DOCUMENT_OPTIONS = [
  'Official Police Incident Report',
  'Itemized UB-04 / Medical Billing Breakdown',
  'Second Independent Contractor Quote',
  'Detailed Proof of Ownership & Receipts',
];

export const ClaimDetailPage: React.FC<ClaimDetailPageProps> = ({
  claims,
  onUpdateClaim,
  onDeleteClaim,
}) => {
  const { claimId } = useParams<{ claimId: string }>();
  const navigate = useNavigate();
  const { profile, isSuperAdmin } = useAuth();

  const reviewerName = profile?.fullName || 'Claims Adjuster';
  const reviewerRoleLabel: TimelineEntry['role'] = isSuperAdmin ? 'Superadmin' : 'Claims Reviewer';

  const claim = claims.find((c) => c.id === claimId);

  // Attachment Modal & Superadmin Delete Modal
  const [activeAttachment, setActiveAttachment] = useState<ClaimAttachment | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Decision Form State
  const isDecided = claim
    ? claim.status === 'approved' ||
      claim.status === 'rejected' ||
      claim.status === 'info_requested'
    : false;
  const [isAmending, setIsAmending] = useState<boolean>(false);
  const [activeDecisionTab, setActiveDecisionTab] = useState<
    'approved' | 'info_requested' | 'rejected'
  >('approved');
  const [payoutInput, setPayoutInput] = useState<number>(() =>
    claim ? claim.approvedPayout ?? (claim.suggestedPayout || claim.claimedAmount) : 0
  );
  const [reasonCode, setReasonCode] = useState<string>('FULL_COVERAGE_CONFIRMED');
  const [decisionNotes, setDecisionNotes] = useState<string>('');
  const [selectedDocRequests, setSelectedDocRequests] = useState<string[]>(DEFAULT_REQUESTED_DOCS);
  const [decisionError, setDecisionError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Quick note state
  const [quickNoteText, setQuickNoteText] = useState<string>('');

  // Reset form state cleanly whenever the viewed claim changes
  useEffect(() => {
    if (!claim) return;
    setActiveAttachment(null);
    setIsAmending(false);
    setDecisionError(null);
    setQuickNoteText('');

    if (claim.reviewDecision) {
      setActiveDecisionTab(claim.reviewDecision.decision);
      setReasonCode(claim.reviewDecision.reasonCode);
      setDecisionNotes(claim.reviewDecision.notes);
      setPayoutInput(
        claim.reviewDecision.approvedPayout ??
          claim.approvedPayout ??
          (claim.suggestedPayout || claim.claimedAmount)
      );
      setSelectedDocRequests(
        claim.reviewDecision.requestedDocuments?.length
          ? claim.reviewDecision.requestedDocuments
          : DEFAULT_REQUESTED_DOCS
      );
    } else {
      setActiveDecisionTab('approved');
      setReasonCode('FULL_COVERAGE_CONFIRMED');
      setDecisionNotes('');
      setPayoutInput(claim.suggestedPayout || claim.claimedAmount);
      setSelectedDocRequests(DEFAULT_REQUESTED_DOCS);
    }
  }, [claim?.id]);

  if (!claim) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-12 text-center max-w-md mx-auto shadow-sm my-10">
        <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
        <h2 className="text-base font-semibold text-slate-900">Claim Record Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          The requested claim identifier does not exist or has been removed from the registry.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 transition shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Claims Queue</span>
        </button>
      </div>
    );
  }

  const handleStartAmend = () => {
    if (claim.reviewDecision) {
      setActiveDecisionTab(claim.reviewDecision.decision);
      setReasonCode(claim.reviewDecision.reasonCode);
      setDecisionNotes(claim.reviewDecision.notes);
      setPayoutInput(
        claim.reviewDecision.approvedPayout ??
          claim.approvedPayout ??
          (claim.suggestedPayout || claim.claimedAmount)
      );
      setSelectedDocRequests(
        claim.reviewDecision.requestedDocuments?.length
          ? claim.reviewDecision.requestedDocuments
          : DEFAULT_REQUESTED_DOCS
      );
    }
    setDecisionError(null);
    setIsAmending(true);
  };

  const toggleRequestedDoc = (doc: string) => {
    setSelectedDocRequests((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const handleSubmitDecision = async () => {
    if (!decisionNotes.trim()) {
      setDecisionError('Please provide formal review notes justifying this decision.');
      return;
    }
    setDecisionError(null);
    setIsSaving(true);

    try {
      const now = new Date().toISOString();
      const finalStatus: ClaimStatus = activeDecisionTab;
      const finalPayout = activeDecisionTab === 'approved' ? Number(payoutInput) : undefined;

      const decisionRecord: ReviewDecisionRecord = {
        decision: activeDecisionTab,
        decidedAt: now,
        reviewerName,
        reasonCode,
        notes: decisionNotes.trim(),
        approvedPayout: finalPayout,
        requestedDocuments: activeDecisionTab === 'info_requested' ? selectedDocRequests : undefined,
      };

      let actionLabel = 'Decision recorded';
      if (activeDecisionTab === 'approved') {
        actionLabel = `Claim Approved by ${reviewerName} for $${(finalPayout ?? 0).toLocaleString()}. Code: ${reasonCode}`;
      } else if (activeDecisionTab === 'rejected') {
        actionLabel = `Claim Denied by ${reviewerName}. Code: ${reasonCode}`;
      } else {
        actionLabel = `Information Requested by ${reviewerName}. Code: ${reasonCode}`;
      }

      const newTimelineEntry: TimelineEntry = {
        id: `tl-${Date.now()}`,
        timestamp: now,
        author: reviewerName,
        role: reviewerRoleLabel,
        actionType: 'decision',
        message: `${actionLabel}. Note: "${decisionNotes.trim()}"`,
      };

      const updatedClaim: Claim = {
        ...claim,
        status: finalStatus,
        approvedPayout: finalPayout,
        reviewDecision: decisionRecord,
        timeline: [newTimelineEntry, ...claim.timeline],
      };

      await onUpdateClaim(updatedClaim);
      setIsAmending(false);
    } catch (err) {
      setDecisionError(err instanceof Error ? err.message : 'Failed to save decision.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddQuickNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNoteText.trim() || isSaving) return;

    setIsSaving(true);
    try {
      const newTimelineEntry: TimelineEntry = {
        id: `tl-note-${Date.now()}`,
        timestamp: new Date().toISOString(),
        author: reviewerName,
        role: reviewerRoleLabel,
        actionType: 'note',
        message: quickNoteText.trim(),
      };

      const updatedClaim: Claim = {
        ...claim,
        timeline: [newTimelineEntry, ...claim.timeline],
      };

      await onUpdateClaim(updatedClaim);
      setQuickNoteText('');
    } catch (err) {
      setDecisionError(err instanceof Error ? err.message : 'Failed to save note.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <Link
            to="/claims"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-foreground bg-background hover:bg-accent border border-border transition shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Back to Queue</span>
          </Link>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400">Claims</span>
            <span className="text-slate-300">/</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{claim.claimNumber}</span>
            <span className="text-xs uppercase font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {claim.category}
            </span>
          </div>
        </div>

        {/* Right Badges */}
        <div className="flex items-center space-x-2">
          {claim.priority === 'urgent' && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
              Urgent Priority
            </span>
          )}
          {claim.status === 'pending' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Pending Review</span>
            </span>
          )}
          {claim.status === 'in_review' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium bg-sky-50 text-sky-800 border border-sky-200">
              <Eye className="w-3.5 h-3.5 text-sky-600" />
              <span>In Review</span>
            </span>
          )}
          {claim.status === 'approved' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Approved (${claim.approvedPayout?.toLocaleString()})</span>
            </span>
          )}
          {claim.status === 'rejected' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200">
              <XCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>Claim Denied</span>
            </span>
          )}
          {claim.status === 'info_requested' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium bg-purple-50 text-purple-800 border border-purple-200">
              <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
              <span>Info Requested</span>
            </span>
          )}
          {isSuperAdmin && onDeleteClaim && (
            <button
              type="button"
              onClick={() => {
                setDeleteError(null);
                setIsDeleteModalOpen(true);
              }}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-[1px] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-xl w-full max-w-sm p-5 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                <Trash2 className="w-4 h-4 text-rose-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Delete claim {claim.claimNumber}?</h2>
                <p className="text-xs text-slate-600 mt-1">
                  This permanently deletes the claim record and its audit trail from Supabase. This action cannot be undone.
                </p>
              </div>
            </div>

            {deleteError && (
              <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-3.5 py-2 rounded-md text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  if (!onDeleteClaim) return;
                  setIsDeleting(true);
                  setDeleteError(null);
                  try {
                    await onDeleteClaim(claim.id);
                    navigate('/', { replace: true });
                  } catch (err) {
                    setDeleteError(err instanceof Error ? err.message : 'Failed to delete claim.');
                    setIsDeleting(false);
                  }
                }}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-60"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Claim</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Financial Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Claimed Loss</p>
          <p className="text-lg font-bold text-slate-900 mt-0.5">${claim.claimedAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Policy Deductible</p>
          <p className="text-lg font-bold text-amber-700 mt-0.5">-${claim.policy.deductible.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Suggested Net</p>
          <p className="text-lg font-bold text-blue-700 mt-0.5">
            ${Math.max(0, claim.claimedAmount - claim.policy.deductible).toLocaleString()}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Authorized Settlement</p>
          <p className="text-lg font-bold text-emerald-700 mt-0.5">
            {claim.approvedPayout !== undefined ? `$${claim.approvedPayout.toLocaleString()}` : '—'}
          </p>
        </div>
      </div>

      {/* 2-Column Balanced Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols): Insured, Policy, Narrative, Evidence */}
        <div className="lg:col-span-7 space-y-4">
          {/* Insured Profile & Policy Coverage Card */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-xs font-semibold text-slate-800 uppercase tracking-wide flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-700" />
                <span>Insured Customer & Policy Record</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">{claim.policy.policyNumber}</span>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {/* Customer Details */}
              <div className="space-y-2 pr-0 sm:pr-2">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Customer Information</p>
                <div className="flex justify-between">
                  <span className="text-slate-500">Name:</span>
                  <span className="font-semibold text-slate-900">{claim.customer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-slate-700">{claim.customer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="text-slate-700">{claim.customer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="text-slate-700 text-right">{claim.customer.address}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-100">
                  <span className="text-slate-500">Tenure:</span>
                  <span className="text-slate-700">Since {claim.customer.customerSince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Historical Claims:</span>
                  <span className="font-medium text-slate-900">{claim.customer.totalPriorClaims} incident(s)</span>
                </div>
              </div>

              {/* Policy Terms */}
              <div className="space-y-2 pt-3 sm:pt-0 pl-0 sm:pl-4">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Policy Terms</p>
                <div className="flex justify-between">
                  <span className="text-slate-500">Plan Type:</span>
                  <span className="font-medium text-slate-900 text-right">{claim.policy.policyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Coverage Limit:</span>
                  <span className="font-semibold text-slate-900">${claim.policy.coverageLimit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deductible:</span>
                  <span className="font-semibold text-amber-700">${claim.policy.deductible.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Effective Date:</span>
                  <span className="text-slate-700">{claim.policy.policyStartDate}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-100">
                  <span className="text-slate-500">Premium Status:</span>
                  <span className="font-semibold text-emerald-700 capitalize">
                    {claim.policy.premiumStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Incident Narrative Statement */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
              <h3 className="font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-700" />
                <span>Incident Report & Customer Narrative</span>
              </h3>
              <div className="flex items-center space-x-3 text-slate-500">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{new Date(claim.submittedAt).toLocaleDateString()}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{claim.incidentLocation}</span>
                </span>
              </div>
            </div>

            <p className="text-sm font-semibold text-slate-900">{claim.title}</p>
            <div className="bg-slate-50 p-3.5 rounded border border-slate-200 text-xs text-slate-700 leading-relaxed">
              {claim.detailedStatement}
            </div>
          </div>

          {/* Evidence Attachments */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center space-x-1.5">
                <Paperclip className="w-3.5 h-3.5 text-blue-700" />
                <span>Evidence Documents ({claim.attachments.length})</span>
              </h3>
              <span className="text-[11px] text-slate-400">Click to preview file</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {claim.attachments.map((att) => (
                <button
                  key={att.id}
                  type="button"
                  onClick={() => setActiveAttachment(att)}
                  className="text-left cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded p-2.5 transition flex flex-col justify-between group focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <div className="w-full">
                    {att.fileType === 'image' ? (
                      <div className="w-full h-24 mb-2 overflow-hidden rounded bg-slate-100 aspect-video">
                        <img
                          src={att.previewUrl || '/damage.jpg'}
                          alt={att.name}
                          decoding="async"
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1.5 mb-1">
                        <FileCheck className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="text-xs font-semibold text-slate-900 truncate group-hover:text-blue-700">
                          {att.name}
                        </span>
                      </div>
                    )}
                    <p className="text-[11px] text-slate-500 line-clamp-1">{att.caption}</p>
                  </div>
                  <div className="w-full flex items-center justify-between text-[10px] text-slate-400 pt-1.5 mt-1 border-t border-slate-200">
                    <span>{att.category} • {att.size}</span>
                    <span className="text-blue-700 font-medium flex items-center space-x-0.5">
                      <span>View</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Risk Engine, Adjudication Console, Audit Log */}
        <div className="lg:col-span-5 space-y-4">
          {/* Risk Engine Assessment Card */}
          <div
            className={`p-3.5 rounded-lg border text-xs shadow-sm ${
              claim.riskLevel === 'high'
                ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                : claim.riskLevel === 'medium'
                ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-start space-x-2.5">
              <ShieldAlert
                className={`w-4 h-4 mt-0.5 shrink-0 ${
                  claim.riskLevel === 'high'
                    ? 'text-rose-600'
                    : claim.riskLevel === 'medium'
                    ? 'text-amber-600'
                    : 'text-slate-500'
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wide">
                    Risk Engine: {claim.riskScore}/100 ({claim.riskLevel})
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">RiskGuard v4.2</span>
                </div>
                <ul className="list-disc list-inside mt-1.5 text-xs space-y-0.5 text-slate-600">
                  {claim.riskReasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Adjudication Decision Console */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Adjudication Decision
                </h2>
                <p className="text-[11px] text-slate-500">Official claim determination & payout</p>
              </div>

              {isDecided && !isAmending && (
                <button
                  type="button"
                  onClick={handleStartAmend}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition shadow-sm"
                >
                  <Edit3 className="w-3 h-3 text-slate-500" />
                  <span>Amend</span>
                </button>
              )}
            </div>

            {/* Display recorded decision */}
            {isDecided && !isAmending && claim.reviewDecision ? (
              <div className="bg-slate-50 rounded border border-slate-200 p-3 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    {claim.reviewDecision.decision === 'approved' && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Approved: ${claim.reviewDecision.approvedPayout?.toLocaleString()}
                      </span>
                    )}
                    {claim.reviewDecision.decision === 'rejected' && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
                        Claim Denied
                      </span>
                    )}
                    {claim.reviewDecision.decision === 'info_requested' && (
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
                        Info Requested
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(claim.reviewDecision.decidedAt).toLocaleString()}
                  </span>
                </div>

                <div className="text-xs text-slate-600">
                  Reason Code: <strong className="text-slate-800">{claim.reviewDecision.reasonCode}</strong>
                </div>

                <div className="text-slate-700 text-xs bg-white p-2.5 rounded border border-slate-200">
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    Adjuster Notes ({claim.reviewDecision.reviewerName}):
                  </span>
                  <p>{claim.reviewDecision.notes}</p>
                </div>

                {claim.reviewDecision.requestedDocuments && (
                  <div className="text-xs text-slate-600">
                    <span className="font-medium text-slate-800 block mb-0.5">Requested Items:</span>
                    <ul className="list-disc list-inside space-y-0.5">
                      {claim.reviewDecision.requestedDocuments.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              /* Adjudication Inputs */
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDecisionTab('approved');
                      setReasonCode('FULL_COVERAGE_CONFIRMED');
                    }}
                    className={`py-1.5 rounded text-xs font-semibold border transition ${
                      activeDecisionTab === 'approved'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDecisionTab('info_requested');
                      setReasonCode('INSUFFICIENT_DOCUMENTATION');
                    }}
                    className={`py-1.5 rounded text-xs font-semibold border transition ${
                      activeDecisionTab === 'info_requested'
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Request Info
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDecisionTab('rejected');
                      setReasonCode('POLICY_EXCLUSION_WEAR_AND_TEAR');
                    }}
                    className={`py-1.5 rounded text-xs font-semibold border transition ${
                      activeDecisionTab === 'rejected'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    Deny
                  </button>
                </div>

                {activeDecisionTab === 'approved' && (
                  <div className="space-y-2.5 text-xs bg-emerald-50/40 p-3 rounded border border-emerald-200">
                    <div>
                      <label htmlFor="cd-payout" className="block font-semibold text-slate-800 mb-1">
                        Authorized Settlement ($)
                      </label>
                      <div className="relative">
                        <DollarSign className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                        <input
                          id="cd-payout"
                          type="number"
                          min={0}
                          value={payoutInput}
                          onChange={(e) => setPayoutInput(Math.max(0, Number(e.target.value)))}
                          className="w-full bg-white text-slate-900 font-bold rounded border border-slate-300 pl-7 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="cd-approval-code" className="block font-semibold text-slate-800 mb-1">
                        Approval Code
                      </label>
                      <select
                        id="cd-approval-code"
                        value={reasonCode}
                        onChange={(e) => setReasonCode(e.target.value)}
                        className="w-full bg-white text-slate-900 rounded border border-slate-300 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 shadow-sm"
                      >
                        <option value="FULL_COVERAGE_CONFIRMED">FULL_COVERAGE_CONFIRMED</option>
                        <option value="PARTIAL_SETTLEMENT_ACCEPTED">PARTIAL_SETTLEMENT_ACCEPTED</option>
                        <option value="EXPEDITED_FAST_TRACK">EXPEDITED_FAST_TRACK</option>
                        <option value="MANAGER_OVERRIDE_APPROVED">MANAGER_OVERRIDE_APPROVED</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeDecisionTab === 'info_requested' && (
                  <div className="text-xs bg-purple-50/40 p-3 rounded border border-purple-200 space-y-2">
                    <span className="block font-semibold text-slate-800">Required Documents:</span>
                    <div className="space-y-1">
                      {REQUIRED_DOCUMENT_OPTIONS.map((docName) => {
                        const checked = selectedDocRequests.includes(docName);
                        return (
                          <label
                            key={docName}
                            className="flex items-center space-x-2 p-1.5 rounded border bg-white border-slate-200 cursor-pointer text-slate-700 text-xs shadow-sm"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleRequestedDoc(docName)}
                              className="rounded border-slate-300 text-purple-600 focus:ring-0"
                            />
                            <span>{docName}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeDecisionTab === 'rejected' && (
                  <div className="text-xs bg-rose-50/40 p-3 rounded border border-rose-200">
                    <label htmlFor="cd-denial-code" className="block font-semibold text-slate-800 mb-1">
                      Denial Reason Code
                    </label>
                    <select
                      id="cd-denial-code"
                      value={reasonCode}
                      onChange={(e) => setReasonCode(e.target.value)}
                      className="w-full bg-white text-slate-900 rounded border border-slate-300 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 shadow-sm"
                    >
                      <option value="POLICY_EXCLUSION_WEAR_AND_TEAR">POLICY_EXCLUSION_WEAR_AND_TEAR</option>
                      <option value="SUSPECTED_FRAUD_SIU_REFERRAL">SUSPECTED_FRAUD_SIU_REFERRAL</option>
                      <option value="PRE_EXISTING_DAMAGE">PRE_EXISTING_DAMAGE</option>
                      <option value="LACK_OF_COVERAGE_OR_NONPAYMENT">LACK_OF_COVERAGE_OR_NONPAYMENT</option>
                    </select>
                  </div>
                )}

                <div className="text-xs">
                  <label htmlFor="cd-notes" className="block font-semibold text-slate-800 mb-1">
                    Adjuster Notes & Rationale <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="cd-notes"
                    rows={2}
                    value={decisionNotes}
                    onChange={(e) => setDecisionNotes(e.target.value)}
                    placeholder="Enter formal justification notes..."
                    className="w-full bg-white text-slate-900 rounded border border-slate-300 p-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400 shadow-sm"
                  />
                </div>

                {decisionError && (
                  <div className="p-2 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{decisionError}</span>
                  </div>
                )}

                <div className="flex items-center justify-end space-x-2 pt-1">
                  {isAmending && (
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => setIsAmending(false)}
                      className="px-3 py-1.5 rounded text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => void handleSubmitDecision()}
                    className={`px-4 py-1.5 rounded text-xs font-semibold text-white shadow-sm transition disabled:opacity-50 ${
                      activeDecisionTab === 'approved'
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : activeDecisionTab === 'rejected'
                        ? 'bg-rose-600 hover:bg-rose-700'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {isSaving
                      ? 'Saving...'
                      : activeDecisionTab === 'approved'
                      ? `Confirm Approval ($${Number(payoutInput).toLocaleString()})`
                      : activeDecisionTab === 'rejected'
                      ? 'Confirm Claim Denial'
                      : 'Dispatch Info Request'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Activity Log & Audit Trail */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-700" />
              <span>Audit Trail & Internal Notes</span>
            </h3>

            <form onSubmit={handleAddQuickNote} className="mb-2.5 flex items-center space-x-1.5">
              <input
                type="text"
                aria-label="Add internal adjuster note"
                value={quickNoteText}
                onChange={(e) => setQuickNoteText(e.target.value)}
                placeholder="Add internal adjuster note..."
                className="flex-1 bg-white text-xs text-slate-900 rounded border border-slate-300 px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-400 shadow-sm"
              />
              <button
                type="submit"
                disabled={!quickNoteText.trim() || isSaving}
                className="px-3 py-1.5 rounded bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white text-xs font-semibold flex items-center space-x-1 shadow-sm transition"
              >
                <Send className="w-3 h-3" />
                <span>Add</span>
              </button>
            </form>

            <div className="space-y-1.5 text-xs max-h-56 overflow-y-auto">
              {claim.timeline.map((entry, index) => (
                <div key={entry.id || index} className="p-2 rounded bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                    <span className="font-semibold text-slate-800">
                      {entry.author} <span className="font-normal">({entry.role})</span>
                    </span>
                    <span>{new Date(entry.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-600 text-xs">{entry.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Attachment Modal */}
      <AttachmentModal
        attachment={activeAttachment}
        onClose={() => setActiveAttachment(null)}
      />
    </div>
  );
};
