import React, { useState } from 'react';
import { 
  Claim, 
  ClaimStatus, 
  ReviewDecisionRecord, 
  TimelineEntry, 
  ClaimAttachment 
} from '../types/claim';
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  FileText, 
  Calendar, 
  MapPin, 
  User, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  Send, 
  Paperclip, 
  Edit3,
  ExternalLink
} from 'lucide-react';

interface ClaimDetailProps {
  claim: Claim;
  onUpdateClaim: (updatedClaim: Claim) => void;
  onViewAttachment: (attachment: ClaimAttachment) => void;
}

export const ClaimDetail: React.FC<ClaimDetailProps> = ({
  claim,
  onUpdateClaim,
  onViewAttachment,
}) => {
  const isDecided = claim.status !== 'pending';
  const [isAmending, setIsAmending] = useState<boolean>(false);

  // Decision Form State
  const [activeDecisionTab, setActiveDecisionTab] = useState<'approved' | 'info_requested' | 'rejected'>('approved');
  const [payoutInput, setPayoutInput] = useState<number>(claim.suggestedPayout || claim.claimedAmount);
  const [reasonCode, setReasonCode] = useState<string>('FULL_COVERAGE_CONFIRMED');
  const [decisionNotes, setDecisionNotes] = useState<string>('');
  const [selectedDocRequests, setSelectedDocRequests] = useState<string[]>([
    'Official Police Incident Report',
  ]);
  const [decisionError, setDecisionError] = useState<string | null>(null);

  // Quick note state
  const [quickNoteText, setQuickNoteText] = useState<string>('');

  const toggleRequestedDoc = (doc: string) => {
    setSelectedDocRequests((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const handleSubmitDecision = () => {
    if (!decisionNotes.trim()) {
      setDecisionError('Please provide formal review notes justifying this decision.');
      return;
    }
    setDecisionError(null);

    const now = new Date().toISOString();
    let finalStatus: ClaimStatus = activeDecisionTab;
    let finalPayout = activeDecisionTab === 'approved' ? Number(payoutInput) : 0;

    const decisionRecord: ReviewDecisionRecord = {
      decision: activeDecisionTab,
      decidedAt: now,
      reviewerName: 'Alex Rivera (Adjuster)',
      reasonCode: reasonCode,
      notes: decisionNotes,
      approvedPayout: activeDecisionTab === 'approved' ? finalPayout : 0,
      requestedDocuments: activeDecisionTab === 'info_requested' ? selectedDocRequests : undefined,
    };

    let actionLabel = 'Decision recorded';
    if (activeDecisionTab === 'approved') {
      actionLabel = `Claim Approved by Alex Rivera for $${finalPayout.toLocaleString()}. Reason: ${reasonCode}`;
    } else if (activeDecisionTab === 'rejected') {
      actionLabel = `Claim Denied by Alex Rivera. Reason: ${reasonCode}`;
    } else {
      actionLabel = `Information Requested by Alex Rivera. Reason: ${reasonCode}`;
    }

    const newTimelineEntry: TimelineEntry = {
      id: `tl-${Date.now()}`,
      timestamp: now,
      author: 'Alex Rivera',
      role: 'Claims Reviewer',
      actionType: 'decision',
      message: `${actionLabel}. Reviewer Note: "${decisionNotes}"`,
    };

    const updatedClaim: Claim = {
      ...claim,
      status: finalStatus,
      approvedPayout: activeDecisionTab === 'approved' ? finalPayout : claim.approvedPayout,
      reviewDecision: decisionRecord,
      timeline: [newTimelineEntry, ...claim.timeline],
    };

    onUpdateClaim(updatedClaim);
    setIsAmending(false);
  };

  const handleAddQuickNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNoteText.trim()) return;

    const newTimelineEntry: TimelineEntry = {
      id: `tl-note-${Date.now()}`,
      timestamp: new Date().toISOString(),
      author: 'Alex Rivera',
      role: 'Claims Reviewer',
      actionType: 'note',
      message: quickNoteText.trim(),
    };

    const updatedClaim: Claim = {
      ...claim,
      timeline: [newTimelineEntry, ...claim.timeline],
    };

    onUpdateClaim(updatedClaim);
    setQuickNoteText('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs h-[calc(100vh-12.5rem)] min-h-[580px] flex flex-col overflow-hidden">
      {/* Detail Header Banner */}
      <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base font-bold text-slate-900 font-mono tracking-tight">
              {claim.claimNumber}
            </h1>
            <span className="text-[11px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
              {claim.category}
            </span>
            {claim.priority === 'urgent' && (
              <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                Urgent Priority
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
            <span className="flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-800 font-medium">{claim.customer.name}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Filed {new Date(claim.submittedAt).toLocaleDateString()}</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{claim.incidentLocation}</span>
            </span>
          </div>
        </div>

        {/* Current Adjudication Status */}
        <div>
          {claim.status === 'pending' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Pending Review</span>
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
              <span>Information Requested</span>
            </span>
          )}
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/30">
        {/* Risk / Underwriting Assessment Box */}
        <div
          className={`p-3.5 rounded-md border text-xs ${
            claim.riskLevel === 'high'
              ? 'bg-rose-50/70 border-rose-200 text-rose-900'
              : claim.riskLevel === 'medium'
              ? 'bg-amber-50/70 border-amber-200 text-amber-900'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="flex items-start justify-between">
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
              <div>
                <p className="font-semibold text-xs">
                  Automated Risk Assessment: Score {claim.riskScore}/100 ({claim.riskLevel.toUpperCase()})
                  {claim.riskLevel === 'high' && ' — Special Investigation Unit (SIU) Referral Flagged'}
                </p>
                <ul className="list-disc list-inside mt-1 text-[11px] space-y-0.5 text-slate-600">
                  {claim.riskReasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Engine v4.2</span>
          </div>
        </div>

        {/* 2-Column Section: Customer & Policy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Profile */}
          <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs">
            <div className="bg-slate-50 px-3.5 py-1.5 border-b border-slate-200 text-[11px] font-semibold text-slate-700 uppercase tracking-wide flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Insured Profile</span>
            </div>
            <div className="p-3 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Name:</span>
                <span className="font-medium text-slate-900">{claim.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="text-slate-800">{claim.customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="text-slate-800">{claim.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="text-slate-800 text-right">{claim.customer.address}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-500">Tenure:</span>
                <span className="text-slate-800">Since {claim.customer.customerSince}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Prior Claims:</span>
                <span className="font-medium text-slate-900">
                  {claim.customer.totalPriorClaims} recorded
                </span>
              </div>
            </div>
          </div>

          {/* Policy Coverage */}
          <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-xs">
            <div className="bg-slate-50 px-3.5 py-1.5 border-b border-slate-200 text-[11px] font-semibold text-slate-700 uppercase tracking-wide flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Policy Coverage</span>
            </div>
            <div className="p-3 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Policy Number:</span>
                <span className="font-mono font-medium text-slate-900">{claim.policy.policyNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Plan:</span>
                <span className="text-slate-800">{claim.policy.policyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Coverage Limit:</span>
                <span className="font-semibold text-slate-900">
                  ${claim.policy.coverageLimit.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Deductible:</span>
                <span className="font-medium text-amber-700">
                  ${claim.policy.deductible.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100">
                <span className="text-slate-500">Effective Date:</span>
                <span className="text-slate-800">{claim.policy.policyStartDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-semibold text-emerald-700 capitalize">
                  {claim.policy.premiumStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Incident Narrative & Claimed Amount Strip */}
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-xs">
          <h3 className="text-xs font-semibold text-slate-900 mb-1 flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Incident Report & Customer Statement</span>
          </h3>
          <p className="text-xs font-medium text-slate-800 mb-1.5">{claim.title}</p>
          <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-700 leading-relaxed mb-3">
            {claim.detailedStatement}
          </div>

          {/* Simple financial values */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block">Claimed Loss</span>
              <span className="font-bold text-slate-900">${claim.claimedAmount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Deductible</span>
              <span className="font-medium text-amber-700">-${claim.policy.deductible.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Suggested Net</span>
              <span className="font-bold text-slate-900">
                ${Math.max(0, claim.claimedAmount - claim.policy.deductible).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Approved Payout</span>
              <span className="font-bold text-emerald-700">
                {claim.approvedPayout !== undefined ? `$${claim.approvedPayout.toLocaleString()}` : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Evidence & Supporting Attachments */}
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-semibold text-slate-900 flex items-center space-x-1.5">
              <Paperclip className="w-3.5 h-3.5 text-slate-500" />
              <span>Evidence & Attachments ({claim.attachments.length})</span>
            </h3>
            <span className="text-[11px] text-slate-500">Click to preview document</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {claim.attachments.map((att) => (
              <div
                key={att.id}
                onClick={() => onViewAttachment(att)}
                className="cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded p-2.5 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-900 truncate">{att.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{att.caption}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 mt-1 border-t border-slate-200/60">
                  <span>{att.category}</span>
                  <span className="text-blue-700 font-medium flex items-center space-x-0.5">
                    <span>View</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADJUDICATION & DECISION FORM */}
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Adjudication & Review Decision
              </h2>
              <p className="text-[11px] text-slate-500">
                Official insurance adjudication decision record
              </p>
            </div>

            {isDecided && !isAmending && (
              <button
                onClick={() => setIsAmending(true)}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-300 transition"
              >
                <Edit3 className="w-3 h-3" />
                <span>Amend Decision</span>
              </button>
            )}
          </div>

          {/* If already decided and not amending */}
          {isDecided && !isAmending && claim.reviewDecision ? (
            <div className="bg-slate-50 rounded border border-slate-200 p-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {claim.reviewDecision.decision === 'approved' && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Approved: ${claim.reviewDecision.approvedPayout?.toLocaleString()}
                    </span>
                  )}
                  {claim.reviewDecision.decision === 'rejected' && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                      Claim Denied
                    </span>
                  )}
                  {claim.reviewDecision.decision === 'info_requested' && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
                      Info Requested
                    </span>
                  )}
                  <span className="text-slate-600">
                    Reason: <strong>{claim.reviewDecision.reasonCode}</strong>
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {new Date(claim.reviewDecision.decidedAt).toLocaleString()}
                </span>
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
            /* Decision Input Controls */
            <div className="space-y-3">
              {/* Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveDecisionTab('approved');
                    setReasonCode('FULL_COVERAGE_CONFIRMED');
                  }}
                  className={`py-1.5 rounded text-xs font-medium border transition ${
                    activeDecisionTab === 'approved'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Approve Claim
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveDecisionTab('info_requested');
                    setReasonCode('INSUFFICIENT_DOCUMENTATION');
                  }}
                  className={`py-1.5 rounded text-xs font-medium border transition ${
                    activeDecisionTab === 'info_requested'
                      ? 'bg-slate-900 text-white border-slate-900'
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
                  className={`py-1.5 rounded text-xs font-medium border transition ${
                    activeDecisionTab === 'rejected'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  Deny Claim
                </button>
              </div>

              {/* Approve Form */}
              {activeDecisionTab === 'approved' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded border border-slate-200">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Authorized Payout Amount ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="number"
                        value={payoutInput}
                        onChange={(e) => setPayoutInput(Math.max(0, Number(e.target.value)))}
                        className="w-full bg-white text-slate-900 font-semibold rounded border border-slate-300 pl-7 pr-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Reason Code</label>
                    <select
                      value={reasonCode}
                      onChange={(e) => setReasonCode(e.target.value)}
                      className="w-full bg-white text-slate-900 rounded border border-slate-300 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
                    >
                      <option value="FULL_COVERAGE_CONFIRMED">FULL_COVERAGE_CONFIRMED</option>
                      <option value="PARTIAL_SETTLEMENT_ACCEPTED">PARTIAL_SETTLEMENT_ACCEPTED</option>
                      <option value="EXPEDITED_FAST_TRACK">EXPEDITED_FAST_TRACK</option>
                      <option value="MANAGER_OVERRIDE_APPROVED">MANAGER_OVERRIDE_APPROVED</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Request Info Form */}
              {activeDecisionTab === 'info_requested' && (
                <div className="text-xs bg-slate-50 p-3 rounded border border-slate-200 space-y-2">
                  <label className="block font-medium text-slate-700">Required Documents:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {[
                      'Official Police Incident Report',
                      'Itemized UB-04 / Medical Billing Breakdown',
                      'Second Independent Contractor Quote',
                      'Detailed Proof of Ownership & Receipts',
                    ].map((docName) => {
                      const checked = selectedDocRequests.includes(docName);
                      return (
                        <label
                          key={docName}
                          onClick={() => toggleRequestedDoc(docName)}
                          className="flex items-center space-x-2 p-1.5 rounded border bg-white border-slate-200 cursor-pointer text-slate-700 text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {}}
                            className="rounded border-slate-300 text-slate-900 focus:ring-0"
                          />
                          <span>{docName}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Deny Form */}
              {activeDecisionTab === 'rejected' && (
                <div className="text-xs bg-slate-50 p-3 rounded border border-slate-200">
                  <label className="block font-medium text-slate-700 mb-1">Denial Reason Code</label>
                  <select
                    value={reasonCode}
                    onChange={(e) => setReasonCode(e.target.value)}
                    className="w-full bg-white text-slate-900 rounded border border-slate-300 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
                  >
                    <option value="POLICY_EXCLUSION_WEAR_AND_TEAR">POLICY_EXCLUSION_WEAR_AND_TEAR</option>
                    <option value="SUSPECTED_FRAUD_SIU_REFERRAL">SUSPECTED_FRAUD_SIU_REFERRAL</option>
                    <option value="PRE_EXISTING_DAMAGE">PRE_EXISTING_DAMAGE</option>
                    <option value="LACK_OF_COVERAGE_OR_NONPAYMENT">LACK_OF_COVERAGE_OR_NONPAYMENT</option>
                  </select>
                </div>
              )}

              {/* Rationale Textarea */}
              <div className="text-xs">
                <label className="block font-medium text-slate-700 mb-1">
                  Adjuster Rationale Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="Record formal adjudication justification..."
                  className="w-full bg-white text-slate-900 rounded border border-slate-300 p-2 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400 placeholder-slate-400"
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
                    onClick={() => setIsAmending(false)}
                    className="px-3 py-1.5 rounded text-xs font-medium text-slate-600 hover:bg-slate-100 border border-transparent"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSubmitDecision}
                  className="px-4 py-1.5 rounded text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-xs"
                >
                  {activeDecisionTab === 'approved'
                    ? `Confirm Approval ($${Number(payoutInput).toLocaleString()})`
                    : activeDecisionTab === 'rejected'
                    ? 'Confirm Denial'
                    : 'Dispatch Info Request'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Audit Trail & Activity Log */}
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-xs">
          <h3 className="text-xs font-semibold text-slate-900 mb-2.5 flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Audit Trail & Internal Notes</span>
          </h3>

          <form onSubmit={handleAddQuickNote} className="mb-3 flex items-center space-x-2">
            <input
              type="text"
              value={quickNoteText}
              onChange={(e) => setQuickNoteText(e.target.value)}
              placeholder="Add internal note without status change..."
              className="flex-1 bg-white text-xs text-slate-900 rounded border border-slate-300 px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-400 placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!quickNoteText.trim()}
              className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-medium flex items-center space-x-1"
            >
              <Send className="w-3 h-3" />
              <span>Add</span>
            </button>
          </form>

          <div className="space-y-2 text-xs">
            {claim.timeline.map((entry, index) => (
              <div key={entry.id || index} className="p-2.5 rounded bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-[11px] mb-0.5">
                  <span className="font-semibold text-slate-800">
                    {entry.author} ({entry.role})
                  </span>
                  <span className="text-slate-400">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-slate-600 text-xs">{entry.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
