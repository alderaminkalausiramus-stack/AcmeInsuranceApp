import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Branding & System Info */}
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-6 h-6 rounded bg-blue-700 flex items-center justify-center text-white shrink-0">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">
                Acme Casualty & Property Insurance Company
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Claims Management & Underwriting Adjudication System • v2.4.1 (Build 8840)
              </p>
            </div>
          </div>

          {/* Middle: Operational Status */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium text-slate-700">Claims Core Engine:</span>
            <span className="text-emerald-700 font-semibold">Online & Operational</span>
          </div>

          {/* Right: Security & Obviously Fake Contact Number */}
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="text-slate-600 font-medium">SIU Fraud Line: (555) 000-0000</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400">Demo Environment Only</span>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <p>© {new Date().getFullYear()} Acme Insurance Group. Simulated demo application with mock records.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Guidelines</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">Regulatory Disclosures</span>
            <span>•</span>
            <span className="hover:text-slate-600 cursor-pointer">Helpdesk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
