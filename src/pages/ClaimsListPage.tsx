import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  ChevronLeft,
  ShieldAlert,
  Eye,
} from 'lucide-react';

interface ClaimsListPageProps {
  claims: Claim[];
}

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

export const ClaimsListPage: React.FC<ClaimsListPageProps> = ({ claims }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const statusParam = searchParams.get('status');
  const riskParam = searchParams.get('risk');

  const resolveStatus = (val: string | null): ClaimStatus | 'all' =>
    val === 'pending' ||
    val === 'in_review' ||
    val === 'approved' ||
    val === 'rejected' ||
    val === 'info_requested'
      ? val
      : 'all';

  const resolveRisk = (val: string | null): RiskLevel | 'all' =>
    val === 'low' || val === 'medium' || val === 'high' ? val : 'all';

  const [filters, setFilters] = useState<ClaimFilterState>({
    status: resolveStatus(statusParam),
    category: 'all',
    risk: resolveRisk(riskParam),
    searchQuery: '',
    sortBy: 'date_desc',
  });

  // Sync URL query params when clicking sidebar shortcuts (e.g. Pending Review / High Risk)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      status: resolveStatus(statusParam),
      risk: resolveRisk(riskParam),
    }));
  }, [statusParam, riskParam]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Reset to page 1 when filters, sorting, or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.status, filters.category, filters.risk, filters.searchQuery, filters.sortBy, pageSize]);

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
      case 'in_review':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[11px] font-medium bg-sky-50 text-sky-800 border border-sky-200 whitespace-nowrap">
            <Eye className="w-3 h-3 text-sky-600" />
            <span>In Review</span>
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

  const statusCounts = useMemo(() => {
    const counts = {
      all: claims.length,
      pending: 0,
      in_review: 0,
      info_requested: 0,
      approved: 0,
      rejected: 0,
    };
    for (const c of claims) {
      if (c.status in counts) {
        counts[c.status] += 1;
      }
    }
    return counts;
  }, [claims]);

  const filteredClaims = useMemo(() => {
    const trimmedQuery = filters.searchQuery.trim().toLowerCase();

    return claims
      .filter((claim) => {
        if (filters.status !== 'all' && claim.status !== filters.status) return false;
        if (filters.category !== 'all' && claim.category !== filters.category) return false;
        if (filters.risk !== 'all' && claim.riskLevel !== filters.risk) return false;
        if (trimmedQuery !== '') {
          const matchesName = claim.customer.name.toLowerCase().includes(trimmedQuery);
          const matchesClaimNo = claim.claimNumber.toLowerCase().includes(trimmedQuery);
          const matchesPolicy = claim.policy.policyNumber.toLowerCase().includes(trimmedQuery);
          const matchesTitle = claim.title.toLowerCase().includes(trimmedQuery);
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
  }, [claims, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredClaims.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredClaims.length);

  const paginatedClaims = useMemo(
    () => filteredClaims.slice(startIndex, endIndex),
    [filteredClaims, startIndex, endIndex]
  );

  const pageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i += 1) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (safePage > 3) pages.push('ellipsis');

    const start = Math.max(2, safePage - 1);
    const end = Math.min(totalPages - 1, safePage + 1);
    for (let i = start; i <= end; i += 1) pages.push(i);

    if (safePage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
    return pages;
  }, [safePage, totalPages]);

  return (
    <div className="space-y-4">
      {/* Metrics Bar */}
      <MetricsBar claims={claims} />

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
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
                  { key: 'in_review', label: 'In Review', count: statusCounts.in_review },
                  { key: 'info_requested', label: 'Needs Info', count: statusCounts.info_requested },
                  { key: 'approved', label: 'Approved', count: statusCounts.approved },
                  { key: 'rejected', label: 'Denied', count: statusCounts.rejected },
                ] as const
              ).map((tab) => {
                const isActive = filters.status === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, status: tab.key }))}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition border ${
                      isActive
                        ? 'bg-blue-50 text-blue-800 border-blue-200 font-semibold shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none ${
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
                aria-label="Search claims by customer, claim number, policy number, or title"
                placeholder="Search claims or customer..."
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full bg-white text-xs text-slate-900 rounded-md pl-8 pr-2.5 py-1.5 border border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

          {/* Row 2: Secondary Category & Risk Filters */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1 border-t border-slate-200/50">
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Pills */}
              <div className="flex items-center space-x-1">
                <span className="text-slate-500 text-[11px] font-medium mr-1">Line:</span>
                {(['all', 'auto', 'property', 'health'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
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
                    type="button"
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
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as ClaimFilterState['sortBy'],
                  }))
                }
                aria-label="Sort claims table"
                className="bg-white text-slate-700 text-xs rounded border border-slate-300 px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
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

        {/* Clean Table */}
        <div className="overflow-x-auto">
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
              {paginatedClaims.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500">
                    <AlertCircle className="w-7 h-7 text-slate-300 mx-auto mb-1.5" />
                    <p className="text-xs font-semibold text-slate-700">No matching claims found</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Try adjusting your filters above.</p>
                  </td>
                </tr>
              ) : (
                paginatedClaims.map((claim) => {
                  const formattedDate = new Date(claim.submittedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });

                  return (
                    <tr
                      key={claim.id}
                      tabIndex={0}
                      onClick={() => navigate(`/claims/${claim.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          navigate(`/claims/${claim.id}`);
                        }
                      }}
                      className="hover:bg-blue-50/40 focus:bg-blue-50/60 focus:outline-none cursor-pointer transition group"
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
                      <td className="py-2.5 px-3.5 max-w-0">
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
                            <span>
                              Suggested: ${Math.max(0, claim.claimedAmount - claim.policy.deductible).toLocaleString()}
                            </span>
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
                          aria-label={`Review claim ${claim.claimNumber}`}
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
        </div>

        {/* Pagination & Footer Summary Bar */}
        <div className="px-3.5 py-2.5 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center space-x-3">
            <span>
              {filteredClaims.length === 0 ? (
                <>Showing <strong className="text-slate-800">0</strong> claims</>
              ) : (
                <>
                  Showing <strong className="text-slate-800">{startIndex + 1}–{endIndex}</strong> of{' '}
                  <strong className="text-slate-800">{filteredClaims.length}</strong> claims
                  {filteredClaims.length !== claims.length && (
                    <span className="text-slate-400"> (filtered from {claims.length})</span>
                  )}
                </>
              )}
            </span>

            <div className="flex items-center space-x-1.5 border-l border-slate-200 pl-3">
              <label htmlFor="claims-page-size" className="text-slate-500">
                Per page:
              </label>
              <select
                id="claims-page-size"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-white text-slate-700 text-[11px] rounded border border-slate-300 px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Page Navigation */}
          <nav aria-label="Claims table pagination" className="flex items-center space-x-1">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center space-x-0.5 px-2 py-1 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            {pageNumbers.map((item, idx) =>
              item === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="px-1.5 text-slate-400">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  aria-current={item === safePage ? 'page' : undefined}
                  onClick={() => setCurrentPage(item)}
                  className={`min-w-[26px] px-2 py-1 rounded border text-center transition ${
                    item === safePage
                      ? 'bg-blue-700 text-white border-blue-700 font-semibold shadow-sm'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center space-x-0.5 px-2 py-1 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
