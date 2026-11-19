import React, { useState } from 'react';
import { Claim, ClaimCategory, RiskLevel } from '../types/claim';
import { X, PlusCircle } from 'lucide-react';

interface NewClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClaim: (newClaim: Claim) => void;
}

export const NewClaimModal: React.FC<NewClaimModalProps> = ({
  isOpen,
  onClose,
  onCreateClaim,
}) => {
  const [customerName, setCustomerName] = useState('Tom Doe');
  const [customerEmail, setCustomerEmail] = useState('tom.doe@example.fake');
  const [category, setCategory] = useState<ClaimCategory>('auto');
  const [policyNumber, setPolicyNumber] = useState('POL-AUT-44910');
  const [claimedAmount, setClaimedAmount] = useState<number>(4200);
  const [deductible, setDeductible] = useState<number>(500);
  const [title, setTitle] = useState('Fender bender while parking');
  const [statement, setStatement] = useState(
    'While backing out of parking space in commercial plaza, bumper struck light pole anchor. Scratched paint and crumpled bumper quarter panel.'
  );
  const [riskPreset, setRiskPreset] = useState<RiskLevel>('low');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const timestamp = new Date().toISOString();
    const randomIdSuffix = Math.floor(1000 + Math.random() * 9000);
    const newClaimNumber = `CLM-2024-${randomIdSuffix}`;

    let riskScore = 15;
    let riskReasons = ['Clean historical claims history'];
    if (riskPreset === 'medium') {
      riskScore = 55;
      riskReasons = ['Claim filed 48 hours after incident without initial telemetry reporting'];
    } else if (riskPreset === 'high') {
      riskScore = 88;
      riskReasons = [
        'High value claim relative to vehicle book value',
        'Inconsistent incident timing and location discrepancies detected',
      ];
    }

    const createdClaim: Claim = {
      id: `clm-${Date.now()}`,
      claimNumber: newClaimNumber,
      category,
      status: 'pending',
      priority: riskPreset === 'high' ? 'urgent' : 'normal',
      customer: {
        id: `cust-${Date.now()}`,
        name: customerName,
        email: customerEmail,
        phone: '+1 (555) 712-9901',
        address: '1004 Pinecrest Way, Chicago, IL',
        customerSince: '2022-06-15',
        totalPriorClaims: riskPreset === 'high' ? 2 : 0,
      },
      policy: {
        policyNumber: policyNumber || `POL-${category.toUpperCase().slice(0, 3)}-${randomIdSuffix}`,
        policyType: `${category.toUpperCase()} Standard Comprehensive`,
        coverageLimit: category === 'auto' ? 50000 : category === 'property' ? 300000 : 100000,
        deductible: deductible,
        policyStartDate: '2022-06-15',
        premiumStatus: 'active',
      },
      incidentDate: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10),
      submittedAt: timestamp,
      incidentLocation: 'Chicago Metropolitan Area, IL',
      claimedAmount: Number(claimedAmount),
      suggestedPayout: Math.max(0, Number(claimedAmount) - deductible),
      riskScore,
      riskLevel: riskPreset,
      riskReasons,
      title,
      summary: title,
      detailedStatement: statement,
      attachments: [
        {
          id: `att-new-1`,
          name: 'Incident_Inspection_Photo.jpg',
          category: 'Damage Photo',
          size: '2.1 MB',
          fileType: 'image',
          previewUrl: '/example.jpg',
          caption: 'Customer uploaded damage photo',
        },
      ],
      timeline: [
        {
          id: `tl-init-${Date.now()}`,
          timestamp: timestamp,
          author: customerName,
          role: 'Customer',
          actionType: 'created',
          message: `Claim ${newClaimNumber} entered into intake queue.`,
        },
        {
          id: `tl-ai-${Date.now()}`,
          timestamp: timestamp,
          author: 'RiskGuard AI',
          role: 'Risk Engine',
          actionType: 'risk_flag',
          message: `Intake score calculated: ${riskPreset.toUpperCase()} (${riskScore}/100).`,
        },
      ],
    };

    onCreateClaim(createdClaim);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="bg-white border border-slate-200 rounded-lg max-w-lg w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-2">
            <PlusCircle className="w-4 h-4 text-blue-700" />
            <h3 className="text-sm font-semibold text-slate-900">Simulate Incoming Customer Claim</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Customer Full Name</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Customer Email</label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Line of Business</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ClaimCategory)}
                className="w-full bg-white text-slate-900 rounded border border-slate-300 px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
              >
                <option value="auto">Auto</option>
                <option value="property">Property</option>
                <option value="health">Health</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Claimed ($)</label>
              <input
                type="number"
                required
                min={100}
                value={claimedAmount}
                onChange={(e) => setClaimedAmount(Number(e.target.value))}
                className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Deductible ($)</label>
              <input
                type="number"
                required
                min={0}
                value={deductible}
                onChange={(e) => setDeductible(Number(e.target.value))}
                className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Policy Identifier</label>
            <input
              type="text"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Incident Headline / Summary</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white text-slate-900 rounded border border-slate-300 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Customer Statement</label>
            <textarea
              rows={2}
              required
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="w-full bg-white text-slate-900 rounded border border-slate-300 p-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">Simulate Risk Engine Rating</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRiskPreset('low')}
                className={`py-1.5 rounded text-xs font-semibold capitalize border transition ${
                  riskPreset === 'low'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
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
                    ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs'
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
                    ? 'bg-rose-50 text-rose-800 border-rose-300 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                High Risk
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 shadow-xs transition"
            >
              Submit to Queue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
