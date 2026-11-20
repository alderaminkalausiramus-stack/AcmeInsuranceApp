import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';
import {
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Car,
  Home,
  HeartPulse,
  HelpCircle,
  Activity,
  Plus,
  FileSpreadsheet,
  Loader2,
} from 'lucide-react';
import { Claim, ClaimStatus } from '../types/claim';
import { UserProfile } from '../types/auth';
import {
  DashboardSummary,
  fetchPriorityClaims,
  fetchRecentActivityClaims,
} from '../services/claimsService';
import { listUsers } from '../services/usersService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

interface DashboardPageProps {
  summary: DashboardSummary;
  profile: UserProfile;
  refreshKey: number;
  onOpenNewClaimModal: () => void;
}

function formatCurrency(value: number): string {
  return `$${Math.round(value).toLocaleString('en-US')}`;
}

function getStatusBadge(status: ClaimStatus) {
  switch (status) {
    case 'approved':
      return <Badge variant="success">Approved</Badge>;
    case 'rejected':
      return <Badge variant="destructive">Denied</Badge>;
    case 'in_review':
      return <Badge variant="info">In Review</Badge>;
    case 'info_requested':
      return <Badge variant="purple">Needs Info</Badge>;
    default:
      return <Badge variant="warning">Pending</Badge>;
  }
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  summary,
  profile,
  refreshKey,
  onOpenNewClaimModal,
}) => {
  const navigate = useNavigate();
  const isSuperAdmin = profile.role === 'superadmin';

  const [chartMode, setChartMode] = useState<'count' | 'amount'>('amount');
  const [teamUsers, setTeamUsers] = useState<UserProfile[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(isSuperAdmin);
  const [priorityClaims, setPriorityClaims] = useState<Claim[]>([]);
  const [loadingPriority, setLoadingPriority] = useState<boolean>(true);
  const [recentClaims, setRecentClaims] = useState<Claim[]>([]);
  const [loadingActivity, setLoadingActivity] = useState<boolean>(true);

  useEffect(() => {
    if (!isSuperAdmin) return;
    let active = true;
    setLoadingUsers(true);
    listUsers()
      .then((rows) => {
        if (active) setTeamUsers(rows);
      })
      .catch(() => {
        // Non-blocking on dashboard; full errors shown on /users
      })
      .finally(() => {
        if (active) setLoadingUsers(false);
      });
    return () => {
      active = false;
    };
  }, [isSuperAdmin]);

  useEffect(() => {
    let active = true;
    setLoadingPriority(true);
    setLoadingActivity(true);

    fetchPriorityClaims(isSuperAdmin ? 'escalations' : 'review', 6)
      .then((rows) => {
        if (active) setPriorityClaims(rows);
      })
      .catch(() => {
        if (active) setPriorityClaims([]);
      })
      .finally(() => {
        if (active) setLoadingPriority(false);
      });

    fetchRecentActivityClaims(12)
      .then((rows) => {
        if (active) setRecentClaims(rows);
      })
      .catch(() => {
        if (active) setRecentClaims([]);
      })
      .finally(() => {
        if (active) setLoadingActivity(false);
      });

    return () => {
      active = false;
    };
  }, [isSuperAdmin, refreshKey]);

  const metrics = useMemo(() => {
    const decided = summary.approved + summary.denied;
    const approvalRate = decided > 0 ? Math.round((summary.approved / decided) * 100) : 0;
    const avgClaim = summary.totalClaims > 0 ? summary.totalClaimed / summary.totalClaims : 0;

    return {
      ...summary,
      awaitingReview: summary.pending + summary.inReview,
      approvalRate,
      avgClaim,
    };
  }, [summary]);

  const recentActivity = useMemo(() => {
    const entries: Array<{
      id: string;
      claimId: string;
      claimNumber: string;
      author: string;
      actionType: string;
      message: string;
      timestamp: string;
    }> = [];

    for (const c of recentClaims) {
      for (const item of c.timeline) {
        if (
          item.actionType === 'decision' ||
          item.actionType === 'note' ||
          item.actionType === 'info_requested' ||
          item.actionType === 'created'
        ) {
          entries.push({
            id: `${c.id}-${item.id}`,
            claimId: c.id,
            claimNumber: c.claimNumber,
            author: item.author,
            actionType: item.actionType,
            message: item.message,
            timestamp: item.timestamp,
          });
        }
      }
    }

    return entries
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);
  }, [recentClaims]);

  const firstName = profile.fullName.split(' ')[0] || profile.fullName;
  const activeUsersCount = teamUsers.filter((u) => u.isActive).length;
  const superadminCount = teamUsers.filter((u) => u.role === 'superadmin').length;

  return (
    <div className="space-y-6">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back, {firstName}
            </h1>
            <Badge variant={isSuperAdmin ? 'default' : 'secondary'}>
              {isSuperAdmin ? (
                <>
                  <ShieldCheck className="h-3 w-3" />
                  <span>Superadmin</span>
                </>
              ) : (
                <span>Claims Adjuster</span>
              )}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {isSuperAdmin
              ? 'Executive claims exposure, high-risk escalations, and organization directory overview.'
              : 'Your daily claims triage queue, adjudication progress, and recent review activity.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSuperAdmin ? (
            <Link to="/users">
              <Button variant="outline" size="sm">
                <Users className="h-3.5 w-3.5" />
                <span>Manage Users</span>
              </Button>
            </Link>
          ) : (
            <Link to="/claims">
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="h-3.5 w-3.5" />
                <span>Open Queue</span>
              </Button>
            </Link>
          )}
          <Button size="sm" onClick={onOpenNewClaimModal}>
            <Plus className="h-3.5 w-3.5" />
            <span>File Claim</span>
          </Button>
        </div>
      </div>

      {/* KPI Row — 4 shadcn Metric Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {isSuperAdmin ? (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total Claim Exposure
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {formatCurrency(metrics.totalClaimed)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across {metrics.totalClaims.toLocaleString('en-US')} claims &middot; Avg{' '}
                  {formatCurrency(metrics.avgClaim)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Total Disbursed
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {formatCurrency(metrics.totalDisbursed)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.approved.toLocaleString('en-US')} approved &middot;{' '}
                  {metrics.approvalRate}% adjudication approval rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Active Queue &amp; Risk
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-rose-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {metrics.awaitingReview.toLocaleString('en-US')}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.highRisk.toLocaleString('en-US')} high-risk flags &middot;{' '}
                  {metrics.urgent.toLocaleString('en-US')} urgent priority
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Team Directory
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {loadingUsers ? '—' : activeUsersCount}
                  <span className="text-sm font-normal text-muted-foreground">
                    {loadingUsers ? '' : ` / ${teamUsers.length}`}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {loadingUsers
                    ? 'Loading active directory...'
                    : `${superadminCount} superadmin · ${teamUsers.length - superadminCount} adjusters`}
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Awaiting Review
                </CardTitle>
                <Clock className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {metrics.awaitingReview.toLocaleString('en-US')}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.pending.toLocaleString('en-US')} pending &middot;{' '}
                  {metrics.inReview.toLocaleString('en-US')} currently in review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  High-Risk Flags
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-rose-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {metrics.highRisk.toLocaleString('en-US')}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.urgent.toLocaleString('en-US')} marked urgent &middot; requires secondary review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Needs Info Follow-Up
                </CardTitle>
                <HelpCircle className="h-4 w-4 text-violet-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {metrics.needsInfo.toLocaleString('en-US')}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting policyholder documentation
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Approved Payouts
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tabular-nums">
                  {formatCurrency(metrics.totalDisbursed)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.approved.toLocaleString('en-US')} claims settled &middot;{' '}
                  {metrics.denied.toLocaleString('en-US')} denied
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Analytics Row — Interactive Recharts + Portfolio Breakdown */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4">
            <div>
              <CardTitle>Claims Intake &amp; Disbursement</CardTitle>
              <CardDescription className="mt-1">
                Monthly trend aggregated across all {metrics.totalClaims.toLocaleString('en-US')} live records.
              </CardDescription>
            </div>
            <div className="inline-flex items-center self-start sm:self-auto rounded-md border border-border bg-muted p-0.5 text-xs shrink-0">
              <button
                type="button"
                onClick={() => setChartMode('amount')}
                className={`rounded px-2.5 py-1 text-xs font-medium transition ${
                  chartMode === 'amount'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Volume ($)
              </button>
              <button
                type="button"
                onClick={() => setChartMode('count')}
                className={`rounded px-2.5 py-1 text-xs font-medium transition ${
                  chartMode === 'count'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Count
              </button>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {chartMode === 'amount' ? (
                  <AreaChart
                    data={metrics.monthlySeries}
                    margin={{ top: 8, right: 12, left: 4, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="claimedFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#18181b" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#18181b" stopOpacity={0.01} />
                      </linearGradient>
                      <linearGradient id="disbursedFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: '#71717a' }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: '#71717a' }}
                      tickFormatter={(v) => {
                        const num = Number(v);
                        if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
                        return `$${Math.round(num / 1000)}k`;
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e4e4e7',
                        borderRadius: '8px',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }}
                      formatter={(val: unknown, name: unknown) => [
                        formatCurrency(Number(val ?? 0)),
                        name === 'claimedAmount' ? 'Claimed' : 'Disbursed',
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="claimedAmount"
                      stroke="#18181b"
                      strokeWidth={2}
                      fill="url(#claimedFill)"
                    />
                    <Area
                      type="monotone"
                      dataKey="disbursed"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="url(#disbursedFill)"
                    />
                  </AreaChart>
                ) : (
                  <BarChart
                    data={metrics.monthlySeries}
                    margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: '#71717a' }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: '#71717a' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        borderColor: '#e4e4e7',
                        borderRadius: '8px',
                        fontSize: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      }}
                      formatter={(val: unknown) => [
                        `${Number(val ?? 0).toLocaleString('en-US')} claims`,
                        'Submitted',
                      ]}
                    />
                    <Bar dataKey="claims" fill="#18181b" radius={[6, 6, 0, 0]} maxBarSize={38} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Line of Business & Status Breakdown */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle>Portfolio Breakdown</CardTitle>
            <CardDescription className="mt-1">
              Distribution across lines of business and adjudication stages.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 flex-1">
            <div className="space-y-3">
              {[
                {
                  key: 'auto' as const,
                  label: 'Auto Insurance',
                  icon: Car,
                  color: 'bg-blue-600',
                  pill: 'text-blue-700 bg-blue-50 border-blue-200',
                },
                {
                  key: 'property' as const,
                  label: 'Property & Home',
                  icon: Home,
                  color: 'bg-emerald-600',
                  pill: 'text-emerald-700 bg-emerald-50 border-emerald-200',
                },
                {
                  key: 'health' as const,
                  label: 'Health & Medical',
                  icon: HeartPulse,
                  color: 'bg-rose-600',
                  pill: 'text-rose-700 bg-rose-50 border-rose-200',
                },
              ].map((lob) => {
                const stat = metrics.byCategory[lob.key];
                const pct =
                  metrics.totalClaims > 0 ? Math.round((stat.count / metrics.totalClaims) * 100) : 0;
                const Icon = lob.icon;
                return (
                  <div key={lob.key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="flex items-center gap-2 font-medium text-foreground">
                        <span className={`inline-flex p-1 rounded border ${lob.pill}`}>
                          <Icon className="h-3 w-3" />
                        </span>
                        <span>{lob.label}</span>
                      </span>
                      <span className="tabular-nums text-muted-foreground text-right">
                        <strong className="text-foreground">
                          {stat.count.toLocaleString('en-US')}
                        </strong>{' '}
                        ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full ${lob.color}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-border">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2.5">
                Status Mix
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Pending', count: metrics.pending, status: 'pending' },
                  { label: 'In Review', count: metrics.inReview, status: 'in_review' },
                  { label: 'Needs Info', count: metrics.needsInfo, status: 'info_requested' },
                  { label: 'Approved', count: metrics.approved, status: 'approved' },
                  { label: 'Denied', count: metrics.denied, status: 'rejected' },
                  { label: 'High Risk', count: metrics.highRisk, risk: 'high' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() =>
                      navigate(
                        item.risk ? `/claims?risk=${item.risk}` : `/claims?status=${item.status}`
                      )
                    }
                    className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-2 text-left hover:bg-accent transition-colors"
                  >
                    <span className="text-[11px] text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-semibold tabular-nums text-foreground">
                      {item.count.toLocaleString('en-US')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Operational Row — Actionable Claims Table + Team / Activity */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>
                {isSuperAdmin ? 'High-Risk & Urgent Escalations' : 'Priority Review Queue'}
              </CardTitle>
              <CardDescription className="mt-1">
                {isSuperAdmin
                  ? 'Claims flagged with elevated risk scores or urgent priority requiring oversight.'
                  : 'Pending and in-review claims ranked by risk score for immediate adjudication.'}
              </CardDescription>
            </div>
            <Link to={isSuperAdmin ? '/claims?risk=high' : '/claims?status=pending'}>
              <Button variant="ghost" size="sm" className="text-xs">
                <span>View all</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            {loadingPriority ? (
              <div className="py-10 text-center text-xs text-muted-foreground border-t border-border">
                <Loader2 className="h-4 w-4 animate-spin mx-auto mb-1.5" />
                Loading queue...
              </div>
            ) : priorityClaims.length === 0 ? (
              <div className="py-10 text-center text-xs text-muted-foreground border-t border-border">
                No priority claims in this queue right now.
              </div>
            ) : (
              <>
                {/* Mobile Stacked Cards */}
                <div className="md:hidden divide-y divide-border border-t border-border">
                  {priorityClaims.map((claim) => (
                    <button
                      key={claim.id}
                      type="button"
                      onClick={() => navigate(`/claims/${claim.id}`)}
                      className="w-full text-left p-4 hover:bg-muted/40 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-semibold text-foreground">
                          {claim.claimNumber}
                        </span>
                        {getStatusBadge(claim.status)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{claim.customer.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{claim.title}</p>
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <Badge
                          variant={
                            claim.riskLevel === 'high'
                              ? 'destructive'
                              : claim.riskLevel === 'medium'
                                ? 'warning'
                                : 'secondary'
                          }
                          className="tabular-nums"
                        >
                          Risk {claim.riskScore}
                        </Badge>
                        <span className="text-sm font-semibold tabular-nums text-foreground">
                          {formatCurrency(claim.claimedAmount)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Desktop shadcn Table */}
                <div className="hidden md:block border-t border-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Claim</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Risk</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {priorityClaims.map((claim) => (
                        <TableRow
                          key={claim.id}
                          onClick={() => navigate(`/claims/${claim.id}`)}
                          className="cursor-pointer"
                        >
                          <TableCell className="py-3">
                            <p className="font-mono font-semibold text-foreground">
                              {claim.claimNumber}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                              {claim.title}
                            </p>
                          </TableCell>
                          <TableCell className="py-3">
                            <p className="font-medium text-foreground">{claim.customer.name}</p>
                            <p className="text-[11px] text-muted-foreground capitalize">
                              {claim.category}
                            </p>
                          </TableCell>
                          <TableCell className="py-3 whitespace-nowrap">
                            {getStatusBadge(claim.status)}
                          </TableCell>
                          <TableCell className="py-3 text-right font-medium tabular-nums">
                            {formatCurrency(claim.claimedAmount)}
                          </TableCell>
                          <TableCell className="py-3 text-right">
                            <Badge
                              variant={
                                claim.riskLevel === 'high'
                                  ? 'destructive'
                                  : claim.riskLevel === 'medium'
                                    ? 'warning'
                                    : 'secondary'
                              }
                              className="tabular-nums"
                            >
                              {claim.riskScore}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-4">
          {isSuperAdmin && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle>Team Access Directory</CardTitle>
                  <CardDescription className="mt-1">
                    Active superadmins and claims adjusters.
                  </CardDescription>
                </div>
                <Link to="/users">
                  <Button variant="outline" size="sm" className="text-xs h-7 px-2.5">
                    <span>Manage</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {loadingUsers ? (
                  <p className="text-xs text-muted-foreground py-2">Loading users...</p>
                ) : (
                  teamUsers.slice(0, 5).map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2 bg-background"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">
                          {member.fullName}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">{member.email}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Badge variant={member.role === 'superadmin' ? 'default' : 'secondary'}>
                          {member.role === 'superadmin' ? 'Superadmin' : 'Adjuster'}
                        </Badge>
                        <span
                          title={member.isActive ? 'Active' : 'Deactivated'}
                          className={`h-2 w-2 rounded-full ${
                            member.isActive ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Adjudication Activity</CardTitle>
                  <CardDescription className="mt-1">
                    Latest decisions and reviewer notes across the ledger.
                  </CardDescription>
                </div>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingActivity ? (
                <p className="text-xs text-muted-foreground py-2">Loading recent activity...</p>
              ) : recentActivity.length === 0 ? (
                <p className="text-xs text-muted-foreground">No recent activity recorded.</p>
              ) : (
                recentActivity.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => navigate(`/claims/${event.claimId}`)}
                    className="w-full text-left flex items-start gap-2.5 rounded-md p-2 -mx-2 hover:bg-muted/60 transition-colors"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-foreground truncate">
                          {event.author}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                          {event.claimNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                        {event.message}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
