import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { Claim, ClaimStatus, ClaimCategory, RiskLevel, ClaimFilterState } from '../types/claim';
import { DashboardSummary, fetchClaimsPage } from '../services/claimsService';
import { MetricsBar } from '../components/MetricsBar';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
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
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  Eye,
  Loader2,
  RefreshCw,
  X,
} from 'lucide-react';

interface ClaimsListPageProps {
  summary: DashboardSummary | null;
  refreshKey: number;
}

const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;

export const ClaimsListPage: React.FC<ClaimsListPageProps> = ({ summary, refreshKey }) => {
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

  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const [rows, setRows] = useState<Claim[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      status: resolveStatus(statusParam),
      risk: resolveRisk(riskParam),
    }));
    setCurrentPage(1);
  }, [statusParam, riskParam]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(filters.searchQuery);
      setCurrentPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [filters.searchQuery]);

  const loadPage = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await fetchClaimsPage({
        status: filters.status,
        category: filters.category,
        risk: filters.risk,
        searchQuery: debouncedSearch,
        sortBy: filters.sortBy,
        page: currentPage,
        pageSize,
      });
      setRows(result.claims);
      setTotalCount(result.totalCount);
    } catch (err) {
      Sentry.captureException(err);
      setErrorMessage(
        err instanceof Error ? err.message : 'Unable to query claims. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    filters.status,
    filters.category,
    filters.risk,
    debouncedSearch,
    filters.sortBy,
    currentPage,
    pageSize,
    refreshKey,
  ]);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setErrorMessage(null);

    fetchClaimsPage({
      status: filters.status,
      category: filters.category,
      risk: filters.risk,
      searchQuery: debouncedSearch,
      sortBy: filters.sortBy,
      page: currentPage,
      pageSize,
    })
      .then((result) => {
        if (!active) return;
        setRows(result.claims);
        setTotalCount(result.totalCount);
      })
      .catch((err) => {
        if (!active) return;
        Sentry.captureException(err);
        setErrorMessage(
          err instanceof Error ? err.message : 'Unable to query claims. Please try again.'
        );
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [
    filters.status,
    filters.category,
    filters.risk,
    debouncedSearch,
    filters.sortBy,
    currentPage,
    pageSize,
    refreshKey,
  ]);

  const renderCategoryBadge = (category: ClaimCategory) => {
    switch (category) {
      case 'auto':
        return (
          <Badge variant="info">
            <Car className="h-3 w-3" />
            <span>Auto</span>
          </Badge>
        );
      case 'property':
        return (
          <Badge variant="success">
            <Home className="h-3 w-3" />
            <span>Property</span>
          </Badge>
        );
      case 'health':
        return (
          <Badge variant="destructive">
            <HeartPulse className="h-3 w-3" />
            <span>Health</span>
          </Badge>
        );
    }
  };

  const renderStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="warning" className="whitespace-nowrap">
            <Clock className="h-3 w-3" />
            <span>Pending</span>
          </Badge>
        );
      case 'in_review':
        return (
          <Badge variant="info" className="whitespace-nowrap">
            <Eye className="h-3 w-3" />
            <span>In Review</span>
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="success" className="whitespace-nowrap">
            <CheckCircle2 className="h-3 w-3" />
            <span>Approved</span>
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="destructive" className="whitespace-nowrap">
            <XCircle className="h-3 w-3" />
            <span>Denied</span>
          </Badge>
        );
      case 'info_requested':
        return (
          <Badge variant="purple" className="whitespace-nowrap">
            <HelpCircle className="h-3 w-3" />
            <span>Needs Info</span>
          </Badge>
        );
    }
  };

  const renderRiskBadge = (level: RiskLevel, score: number) => {
    if (level === 'high') {
      return (
        <Badge variant="destructive" className="tabular-nums whitespace-nowrap">
          <ShieldAlert className="h-3 w-3" />
          <span>High ({score})</span>
        </Badge>
      );
    }
    if (level === 'medium') {
      return (
        <Badge variant="warning" className="tabular-nums whitespace-nowrap">
          Med ({score})
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="tabular-nums whitespace-nowrap">
        Low ({score})
      </Badge>
    );
  };

  const statusCounts = {
    all: summary?.totalClaims ?? totalCount,
    pending: summary?.pending ?? 0,
    in_review: summary?.inReview ?? 0,
    info_requested: summary?.needsInfo ?? 0,
    approved: summary?.approved ?? 0,
    rejected: summary?.denied ?? 0,
  };

  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.category !== 'all' ||
    filters.risk !== 'all' ||
    filters.searchQuery.trim() !== '';

  const resetFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      risk: 'all',
      searchQuery: '',
      sortBy: 'date_desc',
    });
    setDebouncedSearch('');
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + rows.length, totalCount);

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

  const totalClaimsAll = summary?.totalClaims ?? totalCount;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Claims Queue</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Search, filter, and adjudicate claims across the live registry.
          </p>
        </div>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="self-start sm:self-auto text-xs text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
            <span>Reset filters</span>
          </Button>
        )}
      </div>

      {/* KPI Metrics */}
      <MetricsBar summary={summary} />

      {/* Main Claims Card */}
      <Card className="overflow-hidden">
        {/* Filter Toolbar — Responsive shadcn Controls */}
        <div className="p-4 border-b border-border bg-muted/20 space-y-3">
          {/* Desktop Status Tabs */}
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto">
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
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, status: tab.key }));
                    setCurrentPage(1);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition border ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background text-foreground border-border hover:bg-accent'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold leading-none tabular-nums ${
                      isActive
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {tab.count.toLocaleString('en-US')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Dropdown Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                type="text"
                aria-label="Search claims by customer, claim number, policy number, location, or title"
                placeholder="Search customer, claim #, policy, city..."
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="pl-9 bg-background"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex items-center gap-2">
              {/* Mobile/Tablet Status Select */}
              <Select
                aria-label="Filter by status"
                value={filters.status}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    status: e.target.value as ClaimStatus | 'all',
                  }));
                  setCurrentPage(1);
                }}
                className="lg:hidden text-xs"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending ({statusCounts.pending.toLocaleString()})</option>
                <option value="in_review">In Review ({statusCounts.in_review.toLocaleString()})</option>
                <option value="info_requested">
                  Needs Info ({statusCounts.info_requested.toLocaleString()})
                </option>
                <option value="approved">Approved ({statusCounts.approved.toLocaleString()})</option>
                <option value="rejected">Denied ({statusCounts.rejected.toLocaleString()})</option>
              </Select>

              <Select
                aria-label="Filter by line of business"
                value={filters.category}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    category: e.target.value as ClaimCategory | 'all',
                  }));
                  setCurrentPage(1);
                }}
                className="text-xs lg:w-36"
              >
                <option value="all">All Lines</option>
                <option value="auto">Auto</option>
                <option value="property">Property</option>
                <option value="health">Health</option>
              </Select>

              <Select
                aria-label="Filter by risk level"
                value={filters.risk}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    risk: e.target.value as RiskLevel | 'all',
                  }));
                  setCurrentPage(1);
                }}
                className="text-xs lg:w-32"
              >
                <option value="all">All Risks</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </Select>

              <Select
                aria-label="Sort claims"
                value={filters.sortBy}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as ClaimFilterState['sortBy'],
                  }));
                  setCurrentPage(1);
                }}
                className="text-xs lg:w-40"
              >
                <option value="date_desc">Newest First</option>
                <option value="date_asc">Oldest First</option>
                <option value="amount_desc">Highest Claim $</option>
                <option value="amount_asc">Lowest Claim $</option>
                <option value="risk_desc">Highest Risk</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Body States: Error / Loading / Empty / Responsive Data */}
        {errorMessage ? (
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-8 w-8 text-rose-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground">Unable to load claims</p>
            <p className="text-xs text-muted-foreground mt-1 mb-4 max-w-md mx-auto">
              {errorMessage}
            </p>
            <Button type="button" size="sm" onClick={() => void loadPage()}>
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </Button>
          </CardContent>
        ) : isLoading ? (
          <CardContent className="py-14 text-center">
            <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-foreground" />
            <p className="text-xs font-medium text-muted-foreground">Loading claims...</p>
          </CardContent>
        ) : rows.length === 0 ? (
          <CardContent className="py-14 text-center">
            <AlertCircle className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm font-semibold text-foreground">No matching claims found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your search or filter selections.
            </p>
          </CardContent>
        ) : (
          <>
            {/* Mobile Card List (Zero Squished Columns) */}
            <div className="md:hidden divide-y divide-border">
              {rows.map((claim) => {
                const formattedDate = new Date(claim.submittedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <button
                    key={claim.id}
                    type="button"
                    onClick={() => navigate(`/claims/${claim.id}`)}
                    className="w-full text-left p-4 hover:bg-muted/40 active:bg-muted/60 transition-colors space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-mono text-xs font-semibold text-foreground">
                          {claim.claimNumber}
                        </p>
                        <p className="text-[11px] font-mono text-muted-foreground">
                          {claim.policy.policyNumber} &middot; {formattedDate}
                        </p>
                      </div>
                      {renderStatusBadge(claim.status)}
                    </div>

                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-foreground">{claim.customer.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {claim.title} &middot; {claim.incidentLocation}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {renderCategoryBadge(claim.category)}
                        {renderRiskBadge(claim.riskLevel, claim.riskScore)}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="text-right tabular-nums">
                          <p className="text-sm font-bold text-foreground">
                            ${claim.claimedAmount.toLocaleString('en-US')}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Desktop shadcn Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Claim / Policy</TableHead>
                    <TableHead>Insured &amp; Incident</TableHead>
                    <TableHead>Line &amp; Risk</TableHead>
                    <TableHead className="text-right">Claimed Loss</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10 text-right">
                      <span className="sr-only">Open</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((claim) => {
                    const formattedDate = new Date(claim.submittedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });

                    return (
                      <TableRow
                        key={claim.id}
                        tabIndex={0}
                        onClick={() => navigate(`/claims/${claim.id}`)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            navigate(`/claims/${claim.id}`);
                          }
                        }}
                        className="cursor-pointer group"
                      >
                        <TableCell className="whitespace-nowrap">
                          <div className="font-mono font-semibold text-foreground group-hover:underline">
                            {claim.claimNumber}
                          </div>
                          <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                            {claim.policy.policyNumber} &bull; {formattedDate}
                          </div>
                        </TableCell>

                        <TableCell className="max-w-[320px]">
                          <div className="font-semibold text-foreground truncate">
                            {claim.customer.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground truncate mt-0.5">
                            {claim.title} &middot; {claim.incidentLocation}
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {renderCategoryBadge(claim.category)}
                            {renderRiskBadge(claim.riskLevel, claim.riskScore)}
                          </div>
                        </TableCell>

                        <TableCell className="text-right tabular-nums whitespace-nowrap">
                          <div className="font-semibold text-foreground">
                            ${claim.claimedAmount.toLocaleString('en-US')}
                          </div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">
                            {claim.approvedPayout !== undefined ? (
                              <span className="text-emerald-700 font-medium">
                                Approved: ${claim.approvedPayout.toLocaleString('en-US')}
                              </span>
                            ) : (
                              <span>
                                Net: $
                                {Math.max(
                                  0,
                                  claim.claimedAmount - claim.policy.deductible
                                ).toLocaleString('en-US')}
                              </span>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="whitespace-nowrap">
                          {renderStatusBadge(claim.status)}
                        </TableCell>

                        <TableCell className="text-right">
                          <ChevronRight className="h-4 w-4 text-muted-foreground inline-block group-hover:text-foreground transition-colors" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {/* Responsive Pagination Footer */}
        <div className="px-4 py-3 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="tabular-nums">
              {totalCount === 0 ? (
                <>
                  Showing <strong className="text-foreground">0</strong> claims
                </>
              ) : (
                <>
                  Showing{' '}
                  <strong className="text-foreground">
                    {(startIndex + 1).toLocaleString('en-US')}–{endIndex.toLocaleString('en-US')}
                  </strong>{' '}
                  of <strong className="text-foreground">{totalCount.toLocaleString('en-US')}</strong>{' '}
                  claims
                  {totalCount !== totalClaimsAll && (
                    <span> (filtered from {totalClaimsAll.toLocaleString('en-US')})</span>
                  )}
                </>
              )}
            </span>

            <div className="hidden sm:flex items-center gap-1.5 border-l border-border pl-3">
              <label htmlFor="claims-page-size">Rows:</label>
              <Select
                id="claims-page-size"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="h-7 w-16 text-xs px-2"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <nav
            aria-label="Claims table pagination"
            className="flex items-center justify-between sm:justify-end gap-1.5 w-full sm:w-auto"
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage <= 1 || isLoading}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-8 px-2.5 text-xs"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Prev</span>
            </Button>

            {/* Mobile compact page indicator */}
            <span className="sm:hidden text-xs font-medium text-foreground tabular-nums">
              Page {safePage.toLocaleString('en-US')} of {totalPages.toLocaleString('en-US')}
            </span>

            {/* Desktop numbered pages */}
            <div className="hidden sm:flex items-center gap-1">
              {pageNumbers.map((item, idx) =>
                item === 'ellipsis' ? (
                  <span key={`ellipsis-${idx}`} className="px-1.5 text-muted-foreground">
                    &hellip;
                  </span>
                ) : (
                  <Button
                    key={item}
                    type="button"
                    variant={item === safePage ? 'default' : 'outline'}
                    size="sm"
                    disabled={isLoading}
                    aria-current={item === safePage ? 'page' : undefined}
                    onClick={() => setCurrentPage(item)}
                    className="h-8 min-w-[32px] px-2 text-xs tabular-nums"
                  >
                    {item.toLocaleString('en-US')}
                  </Button>
                )
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage >= totalPages || isLoading}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-8 px-2.5 text-xs"
            >
              <span>Next</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </nav>
        </div>
      </Card>
    </div>
  );
};
