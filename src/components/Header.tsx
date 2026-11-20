import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Plus, Download, Users, LogOut, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types/auth';

interface HeaderProps {
  onOpenNewClaimModal: () => void;
  onExportCSV: () => void;
  totalClaimsCount: number;
  profile: UserProfile;
  onSignOut: () => Promise<void>;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewClaimModal,
  onExportCSV,
  totalClaimsCount,
  profile,
  onSignOut,
}) => {
  const location = useLocation();
  const isUsersPage = location.pathname.startsWith('/users');
  const isSuperAdmin = profile.role === 'superadmin';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        {/* Company Identity & Primary Navigation */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2.5 group cursor-pointer select-none">
            <div className="w-8 h-8 rounded-md bg-blue-700 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-800 transition">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition">
              Acme Insurance
            </span>
          </Link>

          <nav className="hidden sm:flex items-center space-x-1 pl-3 border-l border-slate-200">
            <Link
              to="/"
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                !isUsersPage
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              <span>Claims Portal</span>
              <span className="text-[11px] font-medium px-1.5 py-0.2 rounded-full bg-white/80 text-slate-600 border border-slate-200">
                {totalClaimsCount}
              </span>
            </Link>

            {isSuperAdmin && (
              <Link
                to="/users"
                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition ${
                  isUsersPage
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Users</span>
              </Link>
            )}
          </nav>
        </div>

        {/* Action Controls & Signed-in Persona */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onExportCSV}
            title="Export full claim list as CSV spreadsheet"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 transition border border-slate-300 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={onOpenNewClaimModal}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Claim</span>
          </button>

          <div className="flex items-center pl-2.5 ml-1 border-l border-slate-200 space-x-2.5">
            <div
              className={`w-7 h-7 rounded-full border flex items-center justify-center font-semibold text-xs shrink-0 ${
                isSuperAdmin
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}
            >
              {getInitials(profile.fullName)}
            </div>
            <div className="hidden md:block text-left leading-tight">
              <div className="flex items-center space-x-1">
                <p className="text-xs font-semibold text-slate-900">{profile.fullName}</p>
                {isSuperAdmin && (
                  <span className="inline-flex items-center space-x-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wide bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    <span>Superadmin</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500">{profile.title}</p>
            </div>

            <button
              type="button"
              onClick={() => void onSignOut()}
              title="Sign out"
              aria-label="Sign out"
              className="inline-flex items-center space-x-1 px-2 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
