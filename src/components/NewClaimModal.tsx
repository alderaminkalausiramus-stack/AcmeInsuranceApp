import React, { useState, useEffect } from 'react';
import { Claim, ClaimCategory, RiskLevel } from '../types/claim';
import { X, PlusCircle, AlertTriangle } from 'lucide-react';

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

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const now = new Date();
      const timestamp = now.toISOString();
      const currentYear = now.getFullYear();
      const uniqueSuffix = Date.now().toString().slice(-5);
      const randomIdSuffix = Math.floor(1000 + Math.random() * 9000);
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
        incidentLocation: 'Chicago Metropolitan Area, IL',
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
    <div
      role="dialog"
      aria-modal="true"
      aria-label="File New Claim"
      onClick={() => {
        if (!isSubmitting) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    >
      <div
        className="bg-white border border-slate-200 rounded-lg max-w-lg w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-2">
            <PlusCircle className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-semibold text-slate-900">File New Claim</h3>
          </div>
          <button
            type="button"
            aria-label="Close new claim modal"
            disabled={isSubmitting}
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="nc-customer-name" className="block text-slate-700 font-semibold mb-1">
                Customer Full Name
              </label>
              <input
                id="nc-customer-name"
                type="text"
                required
                placeholder="e.g. Jordan Alvarez"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="nc-customer-email" className="block text-slate-700 font-semibold mb-1">
                Customer Email
              </label>
              <input
                id="nc-customer-email"
                type="email"
                required
                placeholder="jordan.alvarez@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="nc-category" className="block text-slate-700 font-semibold mb-1">
                Line of Business
              </label>
              <select
                id="nc-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ClaimCategory)}
                className="w-full bg-white text-slate-900 rounded border border-slate-300 px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              >
                <option value="auto">Auto</option>
                <option value="property">Property</option>
                <option value="health">Health</option>
              </select>
            </div>
            <div>
              <label htmlFor="nc-claimed" className="block text-slate-700 font-semibold mb-1">
                Claimed ($)
              </label>
              <input
                id="nc-claimed"
                type="number"
                required
                min={100}
                value={claimedAmount}
                onChange={(e) => setClaimedAmount(Number(e.target.value))}
                className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="nc-deductible" className="block text-slate-700 font-semibold mb-1">
                Deductible ($)
              </label>
              <input
                id="nc-deductible"
                type="number"
                required
                min={0}
                value={deductible}
                onChange={(e) => setDeductible(Number(e.target.value))}
                className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="nc-policy" className="block text-slate-700 font-semibold mb-1">
              Policy Identifier
            </label>
            <input
              id="nc-policy"
              type="text"
              placeholder="Leave blank to auto-generate (e.g. POL-AUT-44910)"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm font-mono"
            />
          </div>

          <div>
            <label htmlFor="nc-title" className="block text-slate-700 font-semibold mb-1">
              Incident Headline / Summary
            </label>
            <input
              id="nc-title"
              type="text"
              required
              placeholder="e.g. Rear bumper impact in commercial parking lot"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="nc-statement" className="block text-slate-700 font-semibold mb-1">
              Customer Statement
            </label>
            <textarea
              id="nc-statement"
              rows={2}
              required
              placeholder="Describe the incident details, damages, and any responding parties..."
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="w-full bg-white text-slate-900 rounded border border-slate-300 p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div>
            <span className="block text-slate-700 font-semibold mb-1.5">Initial Risk Triage</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRiskPreset('low')}
                className={`py-1.5 rounded text-xs font-semibold capitalize border transition ${
                  riskPreset === 'low'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                Low Risk
              </button>
              <button
                type="button"
                onClick={() => setRiskPreset('medium')}
                className={`py-1.5 rounded text-xs font-semibold capitalize border transition ${
                  riskPreset === 'medium'
                    ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                Medium Risk
              </button>
              <button
                type="button"
                onClick={() => setRiskPreset('high')}
                className={`py-1.5 rounded text-xs font-semibold capitalize border transition ${
                  riskPreset === 'high'
                    ? 'bg-rose-50 text-rose-800 border-rose-300 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                High Risk
              </button>
            </div>
          </div>

          {submitError && (
            <div className="p-2 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-200">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-3.5 py-1.5 rounded text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1.5 rounded text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 shadow-sm transition disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit to Queue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
