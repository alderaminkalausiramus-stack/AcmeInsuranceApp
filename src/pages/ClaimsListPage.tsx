import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Claim, ClaimStatus, ClaimCategory, RiskLevel, ClaimFilterState } from '../types/claim';
import { MetricsBar } from '../components/MetricsBar';
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
  ArrowUpDown, 
  ChevronRight, 
  ShieldAlert
} from 'lucide-react';

interface ClaimsListPageProps {
  claims: Claim[];
}

export const ClaimsListPage: React.FC<ClaimsListPageProps> = ({ claims }) => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<ClaimFilterState>({
    status: 'all',
    category: 'all',
    risk: 'all',
    searchQuery: '',
    sortBy: 'date_desc',
  });

  const getCategoryBadge = (category: ClaimCategory) => {
    switch (category) {
      case 'auto':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Car className="w-3 h-3 text-blue-600" />
            <span>Auto</span>
          </span>
        );
      case 'property':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Home className="w-3 h-3 text-emerald-600" />
            <span>Property</span>
          </span>
        );
      case 'health':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <HeartPulse className="w-3 h-3 text-rose-600" />
            <span>Health</span>
          </span>
        );
      default:
        return null;
    }
  };

  const renderStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200 whitespace-nowrap">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Pending</span>
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 whitespace-nowrap">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Approved</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 text-rose-800 border border-rose-200 whitespace-nowrap">
            <XCircle className="w-3 h-3 text-rose-600" />
            <span>Denied</span>
          </span>
        );
      case 'info_requested':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-purple-50 text-purple-800 border border-purple-200 whitespace-nowrap">
            <HelpCircle className="w-3 h-3 text-purple-600" />
            <span>Needs Info</span>
          </span>
        );
      default:
        return null;
    }
  };

  const renderRiskPill = (level: RiskLevel, score: number) => {
    if (level === 'high') {
      return (
        <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 whitespace-nowrap">
          <ShieldAlert className="w-2.5 h-2.5 text-rose-600" />
          <span>High ({score})</span>
        </span>
      );
    }
    if (level === 'medium') {
      return (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
          <span>Med ({score})</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] text-slate-600 bg-slate-50 border border-slate-200 whitespace-nowrap">
        <span>Low ({score})</span>
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
    <div className="space-y-4">
      {/* Metrics Bar */}
      <MetricsBar claims={claims} />

      {/* Main Table Card (Fits in Viewport without Horizontal Scroll) */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
        {/* Compact Toolbar */}
        <div className="p-3.5 border-b border-slate-200 bg-slate-50/70 space-y-2.5">
          {/* Row 1: Status Tabs & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
            {/* Status Filter Tabs */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-0.5 text-xs">
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
                    onClick={() => setFilters((prev) => ({ ...prev, status: tab.key }))}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition border ${
                      isActive
                        ? 'bg-blue-50 text-blue-800 border-blue-200 font-semibold shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Search claims or customer..."
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full bg-white text-xs text-slate-900 rounded-md pl-8 pr-2.5 py-1.5 border border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
              />
            </div>
          </div>

          {/* Row 2: Secondary Category & Risk Filters */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1 border-t border-slate-200/50">
            <div className="flex items-center space-x-3">
              {/* Category Pills */}
              <div className="flex items-center space-x-1">
                <span className="text-slate-500 text-[11px] font-medium mr-1">Line:</span>
                {(['all', 'auto', 'property', 'health'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                    className={`px-2 py-0.5 rounded text-[11px] capitalize transition border ${
                      filters.category === cat
                        ? 'bg-slate-200 text-slate-900 border-slate-300 font-semibold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Risk Pills */}
              <div className="flex items-center space-x-1 pl-2.5 border-l border-slate-200">
                <span className="text-slate-500 text-[11px] font-medium mr-1">Risk:</span>
                {(['all', 'high', 'medium', 'low'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFilters((prev) => ({ ...prev, risk: lvl }))}
                    className={`px-1.5 py-0.5 rounded text-[11px] uppercase transition border ${
                      filters.risk === lvl
                        ? 'bg-slate-200 text-slate-900 border-slate-300 font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Control */}
            <div className="flex items-center space-x-1.5 text-xs text-slate-600">
              <ArrowUpDown className="w-3 h-3 text-slate-400" />
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                aria-label="Sort claims table"
                className="bg-white text-slate-700 text-xs rounded border border-slate-300 px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-xs"
              >
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
                <option value="amount_desc">Highest Claim $</option>
                <option value="amount_asc">Lowest Claim $</option>
                <option value="risk_desc">Highest Risk</option>
              </select>
            </div>
          </div>
        </div>

        {/* Viewport-Fitted Clean Table (No Horizontal Scrollbar) */}
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
              <th scope="col" className="py-2.5 px-3.5 w-[20%]">Claim / Policy</th>
              <th scope="col" className="py-2.5 px-3.5 w-[34%]">Insured & Incident</th>
              <th scope="col" className="py-2.5 px-3.5 w-[16%]">Type & Risk</th>
              <th scope="col" className="py-2.5 px-3.5 w-[14%] text-right">Claimed Loss</th>
              <th scope="col" className="py-2.5 px-3.5 w-[10%]">Status</th>
              <th scope="col" className="py-2.5 px-3.5 w-[6%] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredClaims.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-500">
                  <AlertCircle className="w-7 h-7 text-slate-300 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-slate-700">No matching claims found</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Try adjusting your filters above.</p>
                </td>
              </tr>
            ) : (
              filteredClaims.map((claim) => {
                const formattedDate = new Date(claim.submittedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <tr
                    key={claim.id}
                    onClick={() => navigate(`/claims/${claim.id}`)}
                    className="hover:bg-blue-50/40 cursor-pointer transition group"
                  >
                    {/* Column 1: Claim ID & Policy # + Date */}
                    <td className="py-2.5 px-3.5">
                      <div className="font-mono font-semibold text-blue-700 group-hover:underline">
                        {claim.claimNumber}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {claim.policy.policyNumber} • {formattedDate}
                      </div>
                    </td>

                    {/* Column 2: Insured Name & Incident Statement */}
                    <td className="py-2.5 px-3.5">
                      <div className="font-semibold text-slate-900 truncate">
                        {claim.customer.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {claim.title}
                      </div>
                    </td>

                    {/* Column 3: Category Badge + Risk Rating */}
                    <td className="py-2.5 px-3.5">
                      <div className="flex items-center space-x-1.5">
                        {getCategoryBadge(claim.category)}
                        {renderRiskPill(claim.riskLevel, claim.riskScore)}
                      </div>
                    </td>

                    {/* Column 4: Financials (Claimed Amount & Settlement) */}
                    <td className="py-2.5 px-3.5 text-right">
                      <div className="font-semibold text-slate-900">
                        ${claim.claimedAmount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {claim.approvedPayout !== undefined ? (
                          <span className="text-emerald-700 font-medium">
                            Approved: ${claim.approvedPayout.toLocaleString()}
                          </span>
                        ) : (
                          <span>Suggested: ${(Math.max(0, claim.claimedAmount - claim.policy.deductible)).toLocaleString()}</span>
                        )}
                      </div>
                    </td>

                    {/* Column 5: Status Badge */}
                    <td className="py-2.5 px-3.5">
                      {renderStatusBadge(claim.status)}
                    </td>

                    {/* Column 6: Review Action Button */}
                    <td className="py-2.5 px-3.5 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/claims/${claim.id}`);
                        }}
                        className="p-1 rounded hover:bg-blue-100 text-blue-700 transition inline-flex items-center justify-center"
                        title="Review Claim Details"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Footer Summary Bar */}
        <div className="px-3.5 py-2 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Showing <strong className="text-slate-700">{filteredClaims.length}</strong> of <strong className="text-slate-700">{claims.length}</strong> claims</span>
          <span className="font-mono text-slate-400">Claims Intake Registry</span>
        </div>
      </div>
    </div>
  );
};
