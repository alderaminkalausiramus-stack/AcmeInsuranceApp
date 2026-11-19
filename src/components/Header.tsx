import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Plus, Download, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onOpenNewClaimModal: () => void;
  onExportCSV: () => void;
  onResetData: () => void;
  totalClaimsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewClaimModal,
  onExportCSV,
  onResetData,
  totalClaimsCount,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Company Identity */}
        <Link to="/" className="flex items-center space-x-3 group cursor-pointer select-none">
          <div className="w-8 h-8 rounded-md bg-blue-700 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-800 transition">
            <Shield className="w-4 h-4" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition">
              Acme Insurance
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              Claims Portal ({totalClaimsCount})
            </span>
          </div>
        </Link>

        {/* Action Controls & Reviewer Persona */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onResetData}
            title="Reset demo data to default records"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-transparent"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={onExportCSV}
            title="Export full claim list as CSV spreadsheet"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 transition border border-slate-300 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenNewClaimModal}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate New Claim</span>
          </button>

          <div className="hidden md:flex items-center pl-3 ml-2 border-l border-slate-200 space-x-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-semibold text-xs">
              JR
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs font-semibold text-slate-900">Jane Reviewer</p>
              <p className="text-[10px] text-slate-500">Claims Adjuster</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
