import React, { useRef, useState } from 'react';
import {
  MapPin,
  Calculator,
  CalendarCheck,
  ShieldCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

interface HorizontalScrollSectionProps {
  onOpenPortal: () => void;
}

export const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ onOpenPortal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState<number>(0);

  const cards = [
    {
      num: '01',
      tag: 'ATTENDANCE ENGINE',
      title: 'Sub-Meter GPS Geofenced Clock-In',
      desc: 'Hardware-verified perimeter coordinates eliminate buddy punching and mock GPS apps. Operates across multi-branch locations with sub-second sync.',
      stat: '< 5m',
      statLabel: 'Location Accuracy',
      icon: MapPin,
      accentColor: 'text-purple-600',
      bgTag: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      num: '02',
      tag: 'STATUTORY PAYROLL',
      title: 'Deterministic Sri Lankan Payroll',
      desc: 'Automates employee EPF (8%), employer EPF (12%), and ETF (3%) calculations on eligible earnings with automated progressive APIT tax deductions.',
      stat: '100%',
      statLabel: 'Statutory Compliance',
      icon: Calculator,
      accentColor: 'text-purple-600',
      bgTag: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      num: '03',
      tag: 'LEAVE GOVERNANCE',
      title: 'Live Leave Quota & Balance Ledger',
      desc: 'Automatic yearly provisioning of Annual (14d), Casual (7d), and Medical (14d) quotas with real-time balance validation and manager approval workflows.',
      stat: '0 Days',
      statLabel: 'Balance Drift',
      icon: CalendarCheck,
      accentColor: 'text-purple-600',
      bgTag: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      num: '04',
      tag: 'SECURITY & AUDIT',
      title: 'Cryptographic Event Trail & CSV Export',
      desc: 'Every punch, approval, quota update, and salary payout is recorded in an immutable audit ledger with IP address and hardware trace.',
      stat: '0s',
      statLabel: 'Audit Reconstruction',
      icon: ShieldCheck,
      accentColor: 'text-purple-600',
      bgTag: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      num: '05',
      tag: 'BRANCH NETWORK',
      title: 'Multi-Branch Calibration & Switching',
      desc: 'Manage discrete offices in Colombo, Kandy, and Galle with individual radius boundaries, lead manager delegations, and live headcounts.',
      stat: '3 Hubs',
      statLabel: 'Active Enterprise Nodes',
      icon: Building2,
      accentColor: 'text-purple-600',
      bgTag: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -380, behavior: 'smooth' });
      setScrollIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 380, behavior: 'smooth' });
      setScrollIndex((prev) => Math.min(cards.length - 1, prev + 1));
    }
  };

  return (
    <section className="py-24 bg-[#FBFBFC] border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-semibold tracking-wider mb-4">
              <span>[ 02. SYSTEM MODULES ]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive Horizontal Architecture.
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-xl">
              Scroll horizontally through the core modules powering the AlienHR ecosystem. Built for zero spreadsheet error.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              {String(scrollIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:border-purple-300 hover:text-purple-600 flex items-center justify-center text-slate-700 transition-colors shadow-sm"
                aria-label="Previous Module"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:border-purple-300 hover:text-purple-600 flex items-center justify-center text-slate-700 transition-colors shadow-sm"
                aria-label="Next Module"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 px-4 sm:px-8 max-w-full scrollbar-none custom-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="w-2 sm:w-12 shrink-0" />
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="w-[320px] sm:w-[380px] shrink-0 bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-mono font-bold text-slate-300 group-hover:text-purple-600 transition-colors">
                    {c.num}
                  </span>
                  <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border ${c.bgTag}`}>
                    {c.tag}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-purple-50 group-hover:text-purple-600 group-hover:border-purple-200 transition-all mb-5">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-950 transition-colors mb-3 leading-snug">
                  {c.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {c.desc}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-extrabold font-mono text-slate-900 group-hover:text-purple-600 transition-colors">
                    {c.stat}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {c.statLabel}
                  </div>
                </div>

                <button
                  onClick={onOpenPortal}
                  className="w-9 h-9 rounded-full bg-slate-50 group-hover:bg-purple-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-all"
                  aria-label="View in portal"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
        <div className="w-2 sm:w-12 shrink-0" />
      </div>
    </section>
  );
};
