import React from 'react';
import { Claim, ClaimStatus, ClaimCategory, RiskLevel, ClaimFilterState } from '../types/claim';
import { 
  Search, 
  Car, 
  Home, 
  HeartPulse, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  HelpCircle,
  ArrowUpDown
} from 'lucide-react';

interface ClaimsQueueProps {
  claims: Claim[];
  selectedClaimId: string | null;
  onSelectClaim: (claimId: string) => void;
  filters: ClaimFilterState;
  onFiltersChange: React.Dispatch<React.SetStateAction<ClaimFilterState>>;
}

export const ClaimsQueue: React.FC<ClaimsQueueProps> = ({
  claims,
  selectedClaimId,
  onSelectClaim,
  filters,
  onFiltersChange,
}) => {
  const getCategoryIcon = (category: ClaimCategory) => {
    switch (category) {
      case 'auto':
        return <Car className="w-3.5 h-3.5 text-slate-600" />;
      case 'property':
        return <Home className="w-3.5 h-3.5 text-slate-600" />;
      case 'health':
        return <HeartPulse className="w-3.5 h-3.5 text-slate-600" />;
      default:
        return <Car className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const renderStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Pending</span>
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Approved</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Denied</span>
          </span>
        );
      case 'info_requested':
        return (
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-800 border border-purple-200">
            <HelpCircle className="w-3 h-3 text-purple-600" />
            <span>Info Needed</span>
          </span>
        );
      default:
        return null;
    }
  };

  const renderRiskPill = (level: RiskLevel, score: number) => {
    if (level === 'high') {
      return (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          Risk {score}
        </span>
      );
    }
    if (level === 'medium') {
      return (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
          Risk {score}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] text-slate-600 bg-slate-50 border border-slate-200">
        Risk {score}
      </span>
    );
  };

  const statusCounts = {
    all: claims.length,
    pending: claims.filter((c) => c.status === 'pending').length,
    info_requested: claims.filter((c) => c.status === 'info_requested').length,
    approved: claims.filter((c) => c.status === 'approved').length,
    rejected: claims.filter((c) => c.status === 'rejected').length,
  };

  const filteredClaims = claims
    .filter((claim) => {
      if (filters.status !== 'all' && claim.status !== filters.status) return false;
      if (filters.category !== 'all' && claim.category !== filters.category) return false;
      if (filters.risk !== 'all' && claim.riskLevel !== filters.risk) return false;
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = claim.customer.name.toLowerCase().includes(q);
        const matchesClaimNo = claim.claimNumber.toLowerCase().includes(q);
        const matchesPolicy = claim.policy.policyNumber.toLowerCase().includes(q);
        const matchesTitle = claim.title.toLowerCase().includes(q);
        if (!matchesName && !matchesClaimNo && !matchesPolicy && !matchesTitle) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'date_desc':
          return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
        case 'date_asc':
          return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
        case 'amount_desc':
          return b.claimedAmount - a.claimedAmount;
        case 'amount_asc':
          return a.claimedAmount - b.claimedAmount;
        case 'risk_desc':
          return b.riskScore - a.riskScore;
        default:
          return 0;
      }
    });

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs flex flex-col h-[calc(100vh-12.5rem)] min-h-[580px] overflow-hidden">
      {/* Search & Filter Header */}
      <div className="p-3.5 border-b border-slate-200 space-y-2.5 bg-slate-50/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
              Claims Queue
            </h2>
            <span className="text-[11px] font-semibold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
              {filteredClaims.length}
            </span>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-1 text-xs text-slate-600">
            <ArrowUpDown className="w-3 h-3 text-slate-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => onFiltersChange((prev) => ({ ...prev, sortBy: e.target.value as any }))}
              aria-label="Sort claims queue"
              className="bg-white text-slate-700 text-xs rounded border border-slate-300 px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-slate-400"
            >
              <option value="date_desc">Newest First</option>
              <option value="date_asc">Oldest First</option>
              <option value="amount_desc">Highest Claim $</option>
              <option value="amount_asc">Lowest Claim $</option>
              <option value="risk_desc">Highest Risk</option>
            </select>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Search by customer, claim #, policy #..."
            value={filters.searchQuery}
            onChange={(e) => onFiltersChange((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-white text-xs text-slate-900 rounded-md pl-8 pr-2.5 py-1.5 border border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex space-x-1 overflow-x-auto pb-0.5 text-xs">
          {(
            [
              { key: 'all', label: 'All', count: statusCounts.all },
              { key: 'pending', label: 'Pending', count: statusCounts.pending },
              { key: 'info_requested', label: 'Needs Info', count: statusCounts.info_requested },
              { key: 'approved', label: 'Approved', count: statusCounts.approved },
              { key: 'rejected', label: 'Denied', count: statusCounts.rejected },
            ] as const
          ).map((tab) => {
            const isActive = filters.status === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onFiltersChange((prev) => ({ ...prev, status: tab.key }))}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-xs whitespace-nowrap transition ${
                  isActive
                    ? 'bg-slate-900 text-white font-medium'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1 rounded ${
                    isActive ? 'bg-slate-700 text-slate-200' : 'bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between text-xs pt-0.5">
          <div className="flex items-center space-x-1">
            {(['all', 'auto', 'property', 'health'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => onFiltersChange((prev) => ({ ...prev, category: cat }))}
                className={`px-1.5 py-0.5 rounded text-[11px] capitalize transition ${
                  filters.category === cat
                    ? 'bg-slate-200 text-slate-900 font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1 text-[11px]">
            <span className="text-slate-400">Risk:</span>
            {(['all', 'high', 'medium', 'low'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => onFiltersChange((prev) => ({ ...prev, risk: lvl }))}
                className={`px-1.5 py-0.5 rounded uppercase font-medium transition ${
                  filters.risk === lvl
                    ? 'bg-slate-200 text-slate-900 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Claims List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 bg-white">
        {filteredClaims.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <AlertCircle className="w-6 h-6 mx-auto text-slate-400 mb-1.5" />
            <p className="text-xs font-medium text-slate-700">No claims match criteria</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Adjust filter selections above.</p>
          </div>
        ) : (
          filteredClaims.map((claim) => {
            const isSelected = claim.id === selectedClaimId;
            const formattedDate = new Date(claim.submittedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });

            return (
              <div
                key={claim.id}
                onClick={() => onSelectClaim(claim.id)}
                className={`p-3 cursor-pointer transition text-left border-l-4 ${
                  isSelected
                    ? 'bg-slate-100/90 border-l-slate-900'
                    : 'hover:bg-slate-50 border-l-transparent'
                }`}
              >
                {/* Top Row: Claim ID & Date */}
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="p-1 rounded bg-slate-100 border border-slate-200">
                      {getCategoryIcon(claim.category)}
                    </span>
                    <span className="font-semibold text-slate-900 font-mono text-[11px]">
                      {claim.claimNumber}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">{formattedDate}</span>
                </div>

                {/* Customer Name & Short Headline */}
                <div className="mb-1.5">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {claim.customer.name}
                  </p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{claim.title}</p>
                </div>

                {/* Bottom Row: Amount & Badges */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-900">
                    ${claim.claimedAmount.toLocaleString()}
                    <span className="text-[10px] text-slate-400 font-normal ml-1">claimed</span>
                  </span>

                  <div className="flex items-center space-x-1">
                    {renderRiskPill(claim.riskLevel, claim.riskScore)}
                    {renderStatusBadge(claim.status)}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
