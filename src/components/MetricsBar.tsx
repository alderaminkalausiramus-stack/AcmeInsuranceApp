import React, { useMemo } from 'react';
import { Claim } from '../types/claim';
import { Clock, CheckCircle2, AlertTriangle, DollarSign } from 'lucide-react';

interface MetricsBarProps {
  claims: Claim[];
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ claims }) => {
  const { awaitingReviewCount, approvedCount, highRiskCount, totalApprovedPayout } = useMemo(() => {
    let awaiting = 0;
    let approved = 0;
    let highRisk = 0;
    let disbursed = 0;

    for (const c of claims) {
      if (c.status === 'pending' || c.status === 'in_review') awaiting += 1;
      if (c.status === 'approved') {
        approved += 1;
        disbursed += c.approvedPayout ?? c.suggestedPayout ?? 0;
      }
      if (c.riskLevel === 'high') highRisk += 1;
    }

    return {
      awaitingReviewCount: awaiting,
      approvedCount: approved,
      highRiskCount: highRisk,
      totalApprovedPayout: disbursed,
    };
  }, [claims]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
      {/* Awaiting Review */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Awaiting Review</p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{awaitingReviewCount}</p>
        </div>
        <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* High Risk Flags */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">High Risk Flags</p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{highRiskCount}</p>
        </div>
        <div className="w-8 h-8 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
          <AlertTriangle className="w-4 h-4" />
        </div>
      </div>

      {/* Approved Settled */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Approved Claims</p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{approvedCount}</p>
        </div>
        <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      </div>

      {/* Total Approved Disbursed */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Total Disbursed</p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">
            ${totalApprovedPayout.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
          <DollarSign className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
