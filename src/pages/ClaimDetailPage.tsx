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
import { fetchClaimById } from '../services/claimsService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Dialog } from '../components/ui/dialog';
import { Separator } from '../components/ui/separator';

interface ClaimDetailPageProps {
  onUpdateClaim: (updatedClaim: Claim) => Promise<Claim>;
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
  onUpdateClaim,
  onDeleteClaim,
}) => {
  const { claimId } = useParams<{ claimId: string }>();
  const navigate = useNavigate();
  const { profile, isSuperAdmin } = useAuth();

  const reviewerName = profile?.fullName || 'Claims Adjuster';
  const reviewerRoleLabel: TimelineEntry['role'] = isSuperAdmin ? 'Superadmin' : 'Claims Reviewer';

  const [claim, setClaim] = useState<Claim | null>(null);
  const [isLoadingClaim, setIsLoadingClaim] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [activeAttachment, setActiveAttachment] = useState<ClaimAttachment | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const isDecided = claim
    ? claim.status === 'approved' ||
      claim.status === 'rejected' ||
      claim.status === 'info_requested'
    : false;

  const [isAmending, setIsAmending] = useState<boolean>(false);
  const [activeDecisionTab, setActiveDecisionTab] = useState<
    'approved' | 'info_requested' | 'rejected'
  >('approved');
  const [payoutInput, setPayoutInput] = useState<number>(0);
  const [reasonCode, setReasonCode] = useState<string>('FULL_COVERAGE_CONFIRMED');
  const [decisionNotes, setDecisionNotes] = useState<string>('');
  const [selectedDocRequests, setSelectedDocRequests] = useState<string[]>(DEFAULT_REQUESTED_DOCS);
  const [decisionError, setDecisionError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [quickNoteText, setQuickNoteText] = useState<string>('');

  useEffect(() => {
    if (!claimId) {
      setClaim(null);
      setIsLoadingClaim(false);
      return;
    }
    let active = true;
    setIsLoadingClaim(true);
    setLoadError(null);

    fetchClaimById(claimId)
      .then((found) => {
        if (active) setClaim(found);
      })
      .catch((err) => {
        if (active) setLoadError(err instanceof Error ? err.message : 'Unable to load claim.');
      })
      .finally(() => {
        if (active) setIsLoadingClaim(false);
      });

    return () => {
      active = false;
    };
  }, [claimId]);

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

  if (isLoadingClaim) {
    return (
      <Card className="p-12 text-center my-6">
        <Loader2 className="h-6 w-6 text-foreground animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-foreground">Loading Claim Record...</p>
      </Card>
    );
  }

  if (loadError || !claim) {
    return (
      <Card className="p-10 text-center max-w-md mx-auto my-8">
        <AlertTriangle className="h-9 w-9 text-amber-500 mx-auto mb-3" />
        <h2 className="text-base font-semibold text-foreground">
          {loadError ? 'Unable to Load Claim' : 'Claim Record Not Found'}
        </h2>
        <p className="text-xs text-muted-foreground mt-1 mb-5">
          {loadError ||
            'The requested claim identifier does not exist or has been removed from the registry.'}
        </p>
        <Button type="button" size="sm" onClick={() => navigate('/claims')}>
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Claims Queue</span>
        </Button>
      </Card>
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

      const saved = await onUpdateClaim(updatedClaim);
      setClaim(saved);
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

      const saved = await onUpdateClaim(updatedClaim);
      setClaim(saved);
      setQuickNoteText('');
    } catch (err) {
      setDecisionError(err instanceof Error ? err.message : 'Failed to save note.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderStatusBadge = () => {
    switch (claim.status) {
      case 'pending':
        return (
          <Badge variant="warning">
            <Clock className="h-3 w-3" />
            <span>Pending Review</span>
          </Badge>
        );
      case 'in_review':
        return (
          <Badge variant="info">
            <Eye className="h-3 w-3" />
            <span>In Review</span>
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="success">
            <CheckCircle2 className="h-3 w-3" />
            <span>Approved (${claim.approvedPayout?.toLocaleString('en-US')})</span>
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3" />
            <span>Claim Denied</span>
          </Badge>
        );
      case 'info_requested':
        return (
          <Badge variant="purple">
            <HelpCircle className="h-3 w-3" />
            <span>Info Requested</span>
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Action & Identity Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/claims">
            <Button type="button" variant="outline" size="sm">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Queue</span>
            </Button>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-mono text-lg sm:text-xl font-bold tracking-tight text-foreground">
              {claim.claimNumber}
            </h1>
            <Badge variant="secondary" className="uppercase">
              {claim.category}
            </Badge>
            {claim.priority === 'urgent' && <Badge variant="destructive">Urgent</Badge>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {renderStatusBadge()}
          {isSuperAdmin && onDeleteClaim && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setDeleteError(null);
                setIsDeleteModalOpen(true);
              }}
              className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </Button>
          )}
        </div>
      </div>

      {/* Financial Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Claimed Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-foreground">
              ${claim.claimedAmount.toLocaleString('en-US')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Policy Deductible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-amber-700">
              -${claim.policy.deductible.toLocaleString('en-US')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Suggested Net</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-foreground">
              ${Math.max(0, claim.claimedAmount - claim.policy.deductible).toLocaleString('en-US')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Authorized Settlement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold tabular-nums text-emerald-700">
              {claim.approvedPayout !== undefined
                ? `$${claim.approvedPayout.toLocaleString('en-US')}`
                : '—'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 2-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Customer & Policy Record */}
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div>
                  <CardTitle>Insured Customer &amp; Policy</CardTitle>
                  <CardDescription className="mt-0.5">
                    Coverage verification and policyholder history
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="font-mono self-start sm:self-auto">
                {claim.policy.policyNumber}
              </Badge>
            </CardHeader>
            <CardContent className="pt-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer Information
                </p>
                <dl className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                    <dt className="text-muted-foreground">Name</dt>
                    <dd className="font-semibold text-foreground">{claim.customer.name}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="text-foreground break-all sm:text-right">
                      {claim.customer.email}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd className="text-foreground">{claim.customer.phone}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                    <dt className="text-muted-foreground">Address</dt>
                    <dd className="text-foreground sm:text-right">{claim.customer.address}</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Tenure</dt>
                    <dd className="text-foreground">Since {claim.customer.customerSince}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Prior Claims</dt>
                    <dd className="font-medium text-foreground">
                      {claim.customer.totalPriorClaims} incident(s)
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-3 sm:border-l sm:border-border sm:pl-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Policy Terms
                </p>
                <dl className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5">
                    <dt className="text-muted-foreground">Plan Type</dt>
                    <dd className="font-medium text-foreground sm:text-right">
                      {claim.policy.policyType}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Coverage Limit</dt>
                    <dd className="font-semibold tabular-nums text-foreground">
                      ${claim.policy.coverageLimit.toLocaleString('en-US')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Deductible</dt>
                    <dd className="font-semibold tabular-nums text-amber-700">
                      ${claim.policy.deductible.toLocaleString('en-US')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">Effective Date</dt>
                    <dd className="text-foreground">{claim.policy.policyStartDate}</dd>
                  </div>
                  <Separator />
                  <div className="flex justify-between gap-2 items-center">
                    <dt className="text-muted-foreground">Premium Status</dt>
                    <dd>
                      <Badge variant="success" className="capitalize">
                        {claim.policy.premiumStatus.replace('_', ' ')}
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>

          {/* Incident Narrative */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <CardTitle>Incident Report</CardTitle>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(claim.submittedAt).toLocaleDateString()}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{claim.incidentLocation}</span>
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm font-semibold text-foreground">{claim.title}</p>
              <div className="rounded-lg border border-border bg-muted/40 p-3.5 text-xs text-foreground/90 leading-relaxed">
                {claim.detailedStatement}
              </div>
            </CardContent>
          </Card>

          {/* Evidence Attachments */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                  <CardTitle>Evidence Documents ({claim.attachments.length})</CardTitle>
                </div>
                <span className="text-[11px] text-muted-foreground">Tap to preview</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {claim.attachments.map((att) => (
                  <button
                    key={att.id}
                    type="button"
                    onClick={() => setActiveAttachment(att)}
                    className="text-left rounded-lg border border-border bg-muted/20 hover:bg-muted/50 p-3 transition flex flex-col justify-between gap-2 group"
                  >
                    <div className="w-full">
                      {att.fileType === 'image' ? (
                        <div className="w-full h-28 mb-2 overflow-hidden rounded-md bg-muted">
                          <img
                            src={att.previewUrl || '/damage.jpg'}
                            alt={att.name}
                            decoding="async"
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <FileCheck className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-xs font-semibold text-foreground truncate">
                            {att.name}
                          </span>
                        </div>
                      )}
                      <p className="text-[11px] text-muted-foreground line-clamp-2">
                        {att.caption}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border">
                      <span className="truncate">
                        {att.category} &bull; {att.size}
                      </span>
                      <span className="text-foreground font-medium inline-flex items-center gap-0.5 shrink-0 ml-2">
                        <span>View</span>
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Risk Engine */}
          <Card
            className={
              claim.riskLevel === 'high'
                ? 'border-rose-200 bg-rose-50/40'
                : claim.riskLevel === 'medium'
                  ? 'border-amber-200 bg-amber-50/40'
                  : undefined
            }
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldAlert
                    className={`h-4 w-4 ${
                      claim.riskLevel === 'high'
                        ? 'text-rose-600'
                        : claim.riskLevel === 'medium'
                          ? 'text-amber-600'
                          : 'text-muted-foreground'
                    }`}
                  />
                  <CardTitle className="tabular-nums">
                    Risk Score: {claim.riskScore}/100
                  </CardTitle>
                </div>
                <Badge
                  variant={
                    claim.riskLevel === 'high'
                      ? 'destructive'
                      : claim.riskLevel === 'medium'
                        ? 'warning'
                        : 'secondary'
                  }
                  className="capitalize"
                >
                  {claim.riskLevel} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground">
                {claim.riskReasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Adjudication Console */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-2 pb-4 border-b border-border">
              <div>
                <CardTitle>Adjudication Decision</CardTitle>
                <CardDescription className="mt-0.5">
                  Official claim determination &amp; settlement payout
                </CardDescription>
              </div>
              {isDecided && !isAmending && (
                <Button type="button" variant="outline" size="sm" onClick={handleStartAmend}>
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Amend</span>
                </Button>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              {isDecided && !isAmending && claim.reviewDecision ? (
                <div className="space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {claim.reviewDecision.decision === 'approved' && (
                      <Badge variant="success">
                        Approved: ${claim.reviewDecision.approvedPayout?.toLocaleString('en-US')}
                      </Badge>
                    )}
                    {claim.reviewDecision.decision === 'rejected' && (
                      <Badge variant="destructive">Claim Denied</Badge>
                    )}
                    {claim.reviewDecision.decision === 'info_requested' && (
                      <Badge variant="purple">Info Requested</Badge>
                    )}
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(claim.reviewDecision.decidedAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-muted-foreground">
                    Reason Code:{' '}
                    <strong className="font-mono text-foreground">
                      {claim.reviewDecision.reasonCode}
                    </strong>
                  </p>

                  <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-1">
                    <p className="font-semibold text-foreground">
                      Reviewer Notes ({claim.reviewDecision.reviewerName})
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {claim.reviewDecision.notes}
                    </p>
                  </div>

                  {claim.reviewDecision.requestedDocuments && (
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Requested Documents:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                        {claim.reviewDecision.requestedDocuments.map((doc, i) => (
                          <li key={i}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-1.5 rounded-lg border border-border bg-muted p-1">
                    {[
                      {
                        key: 'approved' as const,
                        label: 'Approve',
                        code: 'FULL_COVERAGE_CONFIRMED',
                      },
                      {
                        key: 'info_requested' as const,
                        label: 'Need Info',
                        code: 'INSUFFICIENT_DOCUMENTATION',
                      },
                      {
                        key: 'rejected' as const,
                        label: 'Deny',
                        code: 'POLICY_EXCLUSION_WEAR_AND_TEAR',
                      },
                    ].map((tab) => {
                      const active = activeDecisionTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => {
                            setActiveDecisionTab(tab.key);
                            setReasonCode(tab.code);
                          }}
                          className={`rounded-md py-1.5 text-xs font-medium transition ${
                            active
                              ? 'bg-background text-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {activeDecisionTab === 'approved' && (
                    <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-3.5">
                      <div className="space-y-1.5">
                        <Label htmlFor="cd-payout">Authorized Settlement ($)</Label>
                        <div className="relative">
                          <DollarSign className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                          <Input
                            id="cd-payout"
                            type="number"
                            min={0}
                            value={payoutInput}
                            onChange={(e) => setPayoutInput(Math.max(0, Number(e.target.value)))}
                            className="pl-8 font-semibold tabular-nums"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="cd-approval-code">Approval Code</Label>
                        <Select
                          id="cd-approval-code"
                          value={reasonCode}
                          onChange={(e) => setReasonCode(e.target.value)}
                        >
                          <option value="FULL_COVERAGE_CONFIRMED">FULL_COVERAGE_CONFIRMED</option>
                          <option value="PARTIAL_SETTLEMENT_ACCEPTED">
                            PARTIAL_SETTLEMENT_ACCEPTED
                          </option>
                          <option value="EXPEDITED_FAST_TRACK">EXPEDITED_FAST_TRACK</option>
                          <option value="MANAGER_OVERRIDE_APPROVED">
                            MANAGER_OVERRIDE_APPROVED
                          </option>
                        </Select>
                      </div>
                    </div>
                  )}

                  {activeDecisionTab === 'info_requested' && (
                    <div className="space-y-2 rounded-lg border border-border bg-muted/20 p-3.5">
                      <Label>Required Documents</Label>
                      <div className="space-y-1.5">
                        {REQUIRED_DOCUMENT_OPTIONS.map((docName) => {
                          const checked = selectedDocRequests.includes(docName);
                          return (
                            <label
                              key={docName}
                              className="flex items-center gap-2.5 p-2 rounded-md border border-border bg-background cursor-pointer text-xs text-foreground"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleRequestedDoc(docName)}
                                className="rounded border-input"
                              />
                              <span>{docName}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeDecisionTab === 'rejected' && (
                    <div className="space-y-1.5 rounded-lg border border-border bg-muted/20 p-3.5">
                      <Label htmlFor="cd-denial-code">Denial Reason Code</Label>
                      <Select
                        id="cd-denial-code"
                        value={reasonCode}
                        onChange={(e) => setReasonCode(e.target.value)}
                      >
                        <option value="POLICY_EXCLUSION_WEAR_AND_TEAR">
                          POLICY_EXCLUSION_WEAR_AND_TEAR
                        </option>
                        <option value="SUSPECTED_FRAUD_SIU_REFERRAL">
                          SUSPECTED_FRAUD_SIU_REFERRAL
                        </option>
                        <option value="PRE_EXISTING_DAMAGE">PRE_EXISTING_DAMAGE</option>
                        <option value="LACK_OF_COVERAGE_OR_NONPAYMENT">
                          LACK_OF_COVERAGE_OR_NONPAYMENT
                        </option>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label htmlFor="cd-notes">Adjuster Notes &amp; Rationale *</Label>
                    <Textarea
                      id="cd-notes"
                      rows={3}
                      value={decisionNotes}
                      onChange={(e) => setDecisionNotes(e.target.value)}
                      placeholder="Enter formal justification notes..."
                    />
                  </div>

                  {decisionError && (
                    <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>{decisionError}</span>
                    </div>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                    {isAmending && (
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isSaving}
                        onClick={() => setIsAmending(false)}
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      type="button"
                      disabled={isSaving}
                      onClick={() => void handleSubmitDecision()}
                      className="w-full sm:w-auto"
                    >
                      {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
                      <span>{isSaving ? 'Saving...' : 'Record Decision'}</span>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Audit Trail & Internal Notes */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Audit Trail &amp; Notes</CardTitle>
              <CardDescription>Chronological record of actions on this claim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAddQuickNote} className="flex gap-2">
                <Input
                  type="text"
                  value={quickNoteText}
                  onChange={(e) => setQuickNoteText(e.target.value)}
                  placeholder="Append an internal review note..."
                  className="text-xs"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!quickNoteText.trim() || isSaving}
                  aria-label="Add note"
                  className="shrink-0"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>

              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {claim.timeline.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-lg border border-border bg-muted/20 p-3 space-y-1 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-foreground">{entry.author}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {entry.role}
                        </Badge>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{entry.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Superadmin Delete Claim Dialog */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        disableClose={isDeleting}
        title={`Delete claim ${claim.claimNumber}?`}
        maxWidthClassName="max-w-sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            This permanently deletes the claim record and its audit trail from Supabase. This action cannot be undone.
          </p>

          {deleteError && (
            <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {deleteError}
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={async () => {
                if (!onDeleteClaim) return;
                setIsDeleting(true);
                setDeleteError(null);
                try {
                  await onDeleteClaim(claim.id);
                  navigate('/claims', { replace: true });
                } catch (err) {
                  setDeleteError(err instanceof Error ? err.message : 'Failed to delete claim.');
                  setIsDeleting(false);
                }
              }}
              className="w-full sm:w-auto"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>Delete Claim</span>
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Attachment Preview Dialog */}
      <AttachmentModal attachment={activeAttachment} onClose={() => setActiveAttachment(null)} />
    </div>
  );
};
