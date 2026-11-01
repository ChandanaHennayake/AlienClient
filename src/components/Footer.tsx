import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenPortal: () => void;
  onOpenMobileSim: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortal, onOpenMobileSim }) => {
  return (
    <footer className="bg-white border-t border-slate-200/90 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-700 p-1 flex items-center justify-center">
                <img src="/alien_logo.png" alt="Logo" className="w-5 h-5 object-contain" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                Alien<span className="text-purple-700">HR</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              The next-generation autonomous AI human capital management and workforce intelligence platform. Built with sub-meter geofenced attendance and deterministic statutory payroll.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>System Health: 99.99% Operational</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">Product</div>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a href="#overview" className="hover:text-purple-700 transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#mobile-experience" className="hover:text-purple-700 transition-colors">
                  Mobile App
                </a>
              </li>
              <li>
                <a href="#payroll-engine" className="hover:text-purple-700 transition-colors">
                  Statutory Payroll
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-purple-700 transition-colors">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          {/* Portal Navigation */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">Portal</div>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <button onClick={onOpenPortal} className="hover:text-purple-700 transition-colors text-left">
                  Employee Terminal
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-purple-700 transition-colors text-left">
                  Manager Approvals
                </button>
              </li>
              <li>
                <button onClick={onOpenPortal} className="hover:text-purple-700 transition-colors text-left">
                  Admin Executive Suite
                </button>
              </li>
              <li>
                <button onClick={onOpenMobileSim} className="hover:text-purple-700 transition-colors text-left">
                  Mobile Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">Stay Informed</div>
            <p className="text-xs text-slate-500">
              Updates on Sri Lankan labour statutes and AlienHR releases.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Subscribed to AlienHR legal & product updates.');
              }}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                placeholder="Corporate email"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shrink-0 transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© 2026 AlienHR Systems. All rights reserved. Clean Workforce Intelligence.</div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
              <span>Department of Labour & ISO 27001 Certified</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
