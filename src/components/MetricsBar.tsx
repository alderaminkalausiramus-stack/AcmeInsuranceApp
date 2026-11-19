import React from 'react';
import { Claim } from '../types/claim';
import { Clock, CheckCircle2, AlertTriangle, DollarSign } from 'lucide-react';

interface MetricsBarProps {
  claims: Claim[];
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ claims }) => {
  const pendingCount = claims.filter((c) => c.status === 'pending').length;
  const approvedCount = claims.filter((c) => c.status === 'approved').length;
  const highRiskCount = claims.filter((c) => c.riskLevel === 'high').length;
  
  const totalApprovedPayout = claims
    .filter((c) => c.status === 'approved')
    .reduce((sum, c) => sum + (c.approvedPayout ?? c.suggestedPayout ?? 0), 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
      {/* Pending Reviews */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Awaiting Review</p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{pendingCount}</p>
        </div>
        <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* High Risk Flags */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">High Risk Flags</p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{highRiskCount}</p>
        </div>
        <div className="w-8 h-8 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
          <AlertTriangle className="w-4 h-4" />
        </div>
      </div>

      {/* Approved Settled */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Approved Claims</p>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{approvedCount}</p>
        </div>
        <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      </div>

      {/* Total Approved Disbursed */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex items-center justify-between">
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
