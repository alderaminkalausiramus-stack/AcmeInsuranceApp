import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  FileSpreadsheet,
  Clock,
  AlertTriangle,
  Users,
  LogOut,
  Plus,
  Download,
  PanelLeft,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Claim } from '../types/claim';
import { UserProfile } from '../types/auth';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { cn } from '../lib/utils';

interface DashboardLayoutProps {
  claims: Claim[];
  profile: UserProfile;
  onOpenNewClaimModal: () => void;
  onExportCSV: () => void;
  onSignOut: () => Promise<void>;
  children: React.ReactNode;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  claims,
  profile,
  onOpenNewClaimModal,
  onExportCSV,
  onSignOut,
  children,
}) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const isSuperAdmin = profile.role === 'superadmin';

  const counts = useMemo(() => {
    let pending = 0;
    let highRisk = 0;
    for (const c of claims) {
      if (c.status === 'pending' || c.status === 'in_review') pending += 1;
      if (c.riskLevel === 'high') highRisk += 1;
    }
    return { total: claims.length, pending, highRisk };
  }, [claims]);

  const searchParams = new URLSearchParams(location.search);
  const activeStatusParam = searchParams.get('status');
  const activeRiskParam = searchParams.get('risk');

  const isDashboard = location.pathname === '/';
  const isAllClaims =
    location.pathname === '/claims' && !activeStatusParam && !activeRiskParam;
  const isPendingNav =
    location.pathname === '/claims' && activeStatusParam === 'pending';
  const isHighRiskNav =
    location.pathname === '/claims' && activeRiskParam === 'high';
  const isUsersPage = location.pathname.startsWith('/users');
  const isClaimDetail = location.pathname.startsWith('/claims/');

  const breadcrumbTitle = useMemo(() => {
    if (isDashboard) return isSuperAdmin ? 'Admin Dashboard' : 'Adjuster Dashboard';
    if (isUsersPage) return 'User Directory';
    if (isClaimDetail) {
      const claimId = location.pathname.replace('/claims/', '');
      const found = claims.find((c) => c.id === claimId);
      return found ? found.claimNumber : 'Claim Detail';
    }
    if (isPendingNav) return 'Pending Review';
    if (isHighRiskNav) return 'High Risk Claims';
    return 'Claims Queue';
  }, [
    isDashboard,
    isSuperAdmin,
    isUsersPage,
    isClaimDetail,
    isPendingNav,
    isHighRiskNav,
    location.pathname,
    claims,
  ]);

  const navLinkClasses = (active: boolean) =>
    cn(
      'flex items-center justify-between rounded-md px-2.5 py-2 text-xs font-medium transition-colors',
      active
        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
        : 'text-sidebar-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground'
    );

  const renderSidebarContent = (onNavigate?: () => void) => (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand Header */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-sidebar-border">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-2.5 select-none group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Shield className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Acme Insurance
            </span>
            <span className="text-[11px] text-muted-foreground">
              {isSuperAdmin ? 'Admin Console' : 'Claims Workbench'}
            </span>
          </div>
        </Link>
        {onNavigate && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onNavigate}
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        <div>
          <p className="px-2.5 mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>
          <nav className="space-y-1">
            <Link to="/" onClick={onNavigate} className={navLinkClasses(isDashboard)}>
              <span className="flex items-center gap-2.5">
                <LayoutDashboard className="h-4 w-4 shrink-0" />
                <span>Dashboard</span>
              </span>
            </Link>

            <Link to="/claims" onClick={onNavigate} className={navLinkClasses(isAllClaims)}>
              <span className="flex items-center gap-2.5">
                <FileSpreadsheet className="h-4 w-4 shrink-0" />
                <span>Claims Queue</span>
              </span>
              <span className="text-[11px] tabular-nums text-muted-foreground bg-background border border-border rounded px-1.5 py-0.5">
                {counts.total}
              </span>
            </Link>

            <Link
              to="/claims?status=pending"
              onClick={onNavigate}
              className={navLinkClasses(isPendingNav)}
            >
              <span className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Pending Review</span>
              </span>
              <span className="text-[11px] tabular-nums text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                {counts.pending}
              </span>
            </Link>

            <Link
              to="/claims?risk=high"
              onClick={onNavigate}
              className={navLinkClasses(isHighRiskNav)}
            >
              <span className="flex items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>High Risk Flags</span>
              </span>
              <span className="text-[11px] tabular-nums text-rose-700 bg-rose-50 border border-rose-200 rounded px-1.5 py-0.5">
                {counts.highRisk}
              </span>
            </Link>
          </nav>
        </div>

        {isSuperAdmin && (
          <div>
            <p className="px-2.5 mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Administration
            </p>
            <nav className="space-y-1">
              <Link to="/users" onClick={onNavigate} className={navLinkClasses(isUsersPage)}>
                <span className="flex items-center gap-2.5">
                  <Users className="h-4 w-4 shrink-0" />
                  <span>User Management</span>
                </span>
                <Badge variant="purple" className="text-[10px] px-1.5 py-0">
                  Admin
                </Badge>
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Signed-in User Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-2.5">
        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-background p-2.5 shadow-sm">
          <div
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs font-semibold border',
              isSuperAdmin
                ? 'bg-zinc-900 text-zinc-50 border-zinc-800'
                : 'bg-secondary text-secondary-foreground border-border'
            )}
          >
            {getInitials(profile.fullName)}
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-xs font-semibold text-foreground">{profile.fullName}</p>
              {isSuperAdmin && <ShieldCheck className="h-3.5 w-3.5 text-foreground shrink-0" />}
            </div>
            <p className="truncate text-[11px] text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void onSignOut()}
          className="w-full justify-center text-xs text-muted-foreground hover:text-destructive hover:border-rose-200 hover:bg-rose-50"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background text-foreground antialiased">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:block shrink-0 border-r border-sidebar-border transition-all duration-200 sticky top-0 h-screen',
          sidebarOpen ? 'w-64' : 'w-0 overflow-hidden border-r-0'
        )}
      >
        {sidebarOpen && renderSidebarContent()}
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-[1px]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64 max-w-[85vw] h-full shadow-xl border-r border-sidebar-border">
            {renderSidebarContent(() => setMobileMenuOpen(false))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-zinc-50/40">
        {/* Top Breadcrumb Header */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border bg-background/95 backdrop-blur px-4 sm:px-6">
          <div className="flex items-center gap-2 min-w-0">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMobileMenuOpen(true);
                } else {
                  setSidebarOpen((prev) => !prev);
                }
              }}
              aria-label="Toggle sidebar"
              className="text-muted-foreground hover:text-foreground"
            >
              <PanelLeft className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-4 mx-1" />

            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs min-w-0">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
              >
                Acme Insurance
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground hidden sm:inline shrink-0" />
              {isClaimDetail && (
                <>
                  <Link
                    to="/claims"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Claims
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                </>
              )}
              <span className="font-semibold text-foreground truncate">{breadcrumbTitle}</span>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onExportCSV}
              className="hidden sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export CSV</span>
            </Button>

            <Button type="button" size="sm" onClick={onOpenNewClaimModal}>
              <Plus className="h-3.5 w-3.5" />
              <span>New Claim</span>
            </Button>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-6">{children}</main>
      </div>
    </div>
  );
};
