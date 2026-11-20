import React, { useState } from 'react';
import { Claim, ClaimCategory, RiskLevel } from '../types/claim';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select } from './ui/select';
import { Textarea } from './ui/textarea';

interface NewClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClaim: (newClaim: Claim) => Promise<void>;
}

const DEFAULT_FORM = {
  customerName: '',
  customerEmail: '',
  category: 'auto' as ClaimCategory,
  policyNumber: '',
  claimedAmount: 4200,
  deductible: 500,
  title: '',
  statement: '',
  riskPreset: 'low' as RiskLevel,
};

export const NewClaimModal: React.FC<NewClaimModalProps> = ({
  isOpen,
  onClose,
  onCreateClaim,
}) => {
  const [customerName, setCustomerName] = useState(DEFAULT_FORM.customerName);
  const [customerEmail, setCustomerEmail] = useState(DEFAULT_FORM.customerEmail);
  const [category, setCategory] = useState<ClaimCategory>(DEFAULT_FORM.category);
  const [policyNumber, setPolicyNumber] = useState(DEFAULT_FORM.policyNumber);
  const [claimedAmount, setClaimedAmount] = useState<number>(DEFAULT_FORM.claimedAmount);
  const [deductible, setDeductible] = useState<number>(DEFAULT_FORM.deductible);
  const [title, setTitle] = useState(DEFAULT_FORM.title);
  const [statement, setStatement] = useState(DEFAULT_FORM.statement);
  const [riskPreset, setRiskPreset] = useState<RiskLevel>(DEFAULT_FORM.riskPreset);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resetForm = () => {
    setCustomerName(DEFAULT_FORM.customerName);
    setCustomerEmail(DEFAULT_FORM.customerEmail);
    setCategory(DEFAULT_FORM.category);
    setPolicyNumber(DEFAULT_FORM.policyNumber);
    setClaimedAmount(DEFAULT_FORM.claimedAmount);
    setDeductible(DEFAULT_FORM.deductible);
    setTitle(DEFAULT_FORM.title);
    setStatement(DEFAULT_FORM.statement);
    setRiskPreset(DEFAULT_FORM.riskPreset);
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const now = new Date();
      const timestamp = now.toISOString();
      const currentYear = now.getFullYear();
      const uniqueSuffix = Date.now().toString().slice(-5);
      const randomIdSuffix = Math.floor(100000 + Math.random() * 900000);
      const newClaimNumber = `CLM-${currentYear}-${randomIdSuffix}`;

      let riskScore = 15;
      let riskReasons = ['Clean historical claims history'];
      if (riskPreset === 'medium') {
        riskScore = 55;
        riskReasons = ['Claim filed 48 hours after incident without initial telemetry reporting'];
      } else if (riskPreset === 'high') {
        riskScore = 88;
        riskReasons = [
          'High value claim relative to policy valuation benchmark',
          'Inconsistent incident timing and location discrepancies detected',
        ];
      }

      const trimmedName = customerName.trim();
      const trimmedEmail = customerEmail.trim();
      const trimmedPolicy = policyNumber.trim();
      const trimmedTitle = title.trim();
      const trimmedStatement = statement.trim();

      const createdClaim: Claim = {
        id: `clm-${Date.now()}`,
        claimNumber: newClaimNumber,
        category,
        status: 'pending',
        priority: riskPreset === 'high' ? 'urgent' : 'normal',
        customer: {
          id: `cust-${uniqueSuffix}`,
          name: trimmedName,
          email: trimmedEmail,
          phone: '+1 (312) 555-0190',
          address: '1004 Pinecrest Way, Chicago, IL 60611',
          customerSince: '2022-06-15',
          totalPriorClaims: riskPreset === 'high' ? 2 : 0,
          avatarUrl: '/damage.jpg',
        },
        policy: {
          policyNumber:
            trimmedPolicy || `POL-${category.toUpperCase().slice(0, 3)}-${randomIdSuffix}`,
          policyType: `${category.toUpperCase()} Standard Comprehensive`,
          coverageLimit: category === 'auto' ? 50000 : category === 'property' ? 300000 : 100000,
          deductible: Number(deductible),
          policyStartDate: '2022-06-15',
          premiumStatus: 'active',
        },
        incidentDate: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10),
        submittedAt: timestamp,
        incidentLocation: 'Chicago, IL',
        claimedAmount: Number(claimedAmount),
        suggestedPayout: Math.max(0, Number(claimedAmount) - Number(deductible)),
        riskScore,
        riskLevel: riskPreset,
        riskReasons,
        title: trimmedTitle,
        summary: trimmedTitle,
        detailedStatement: trimmedStatement,
        attachments: [
          {
            id: `att-${Date.now()}`,
            name: 'Incident_Inspection_Photo.jpg',
            category: 'Damage Photo',
            size: '2.1 MB',
            fileType: 'image',
            previewUrl: '/damage.jpg',
            caption: 'Customer uploaded damage photo',
          },
        ],
        timeline: [
          {
            id: `tl-ai-${Date.now()}`,
            timestamp,
            author: 'RiskGuard AI',
            role: 'Risk Engine',
            actionType: 'risk_flag',
            message: `Intake score calculated: ${riskPreset.toUpperCase()} (${riskScore}/100).`,
          },
          {
            id: `tl-init-${Date.now() - 1}`,
            timestamp,
            author: trimmedName,
            role: 'Customer',
            actionType: 'created',
            message: `Claim ${newClaimNumber} entered into intake queue.`,
          },
        ],
      };

      await onCreateClaim(createdClaim);
      resetForm();
      onClose();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save new claim.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      disableClose={isSubmitting}
      title="File New Claim"
      description="Enter policyholder and incident details to add a claim to the review queue."
      maxWidthClassName="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1.5">
            <Label htmlFor="nc-customer-name">Customer Full Name</Label>
            <Input
              id="nc-customer-name"
              type="text"
              required
              placeholder="e.g. Jordan Alvarez"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nc-customer-email">Customer Email</Label>
            <Input
              id="nc-customer-email"
              type="email"
              required
              placeholder="jordan.alvarez@example.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="space-y-1.5">
            <Label htmlFor="nc-category">Line of Business</Label>
            <Select
              id="nc-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ClaimCategory)}
            >
              <option value="auto">Auto</option>
              <option value="property">Property</option>
              <option value="health">Health</option>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nc-claimed">Claimed ($)</Label>
            <Input
              id="nc-claimed"
              type="number"
              required
              min={100}
              value={claimedAmount}
              onChange={(e) => setClaimedAmount(Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nc-deductible">Deductible ($)</Label>
            <Input
              id="nc-deductible"
              type="number"
              required
              min={0}
              value={deductible}
              onChange={(e) => setDeductible(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="nc-policy">Policy Number</Label>
          <Input
            id="nc-policy"
            type="text"
            placeholder="Leave blank to auto-generate (e.g. POL-AUT-44910)"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
            className="font-mono"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="nc-title">Incident Headline</Label>
          <Input
            id="nc-title"
            type="text"
            required
            placeholder="e.g. Rear bumper impact in commercial parking lot"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="nc-statement">Customer Statement</Label>
          <Textarea
            id="nc-statement"
            rows={3}
            required
            placeholder="Describe the incident details, damages, and any responding parties..."
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Initial Risk Triage</Label>
          <div className="grid grid-cols-3 gap-2">
            {(['low', 'medium', 'high'] as const).map((level) => {
              const active = riskPreset === level;
              return (
                <Button
                  key={level}
                  type="button"
                  size="sm"
                  variant={active ? 'default' : 'outline'}
                  onClick={() => setRiskPreset(level)}
                  className="capitalize"
                >
                  {level} Risk
                </Button>
              );
            })}
          </div>
        </div>

        {submitError && (
          <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-3 border-t border-border">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>{isSubmitting ? 'Submitting...' : 'Submit Claim'}</span>
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
