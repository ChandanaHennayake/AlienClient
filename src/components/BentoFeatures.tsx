import React, { useState } from 'react';
import {
  MapPin,
  Calculator,
  CalendarCheck,
  FileSpreadsheet,
  Sparkles,
  Shield,
  Layers,
  ArrowUpRight,
  CheckCircle,
  Sliders
} from 'lucide-react';
import { fireSuccessConfetti } from '../utils/confetti';

interface BentoFeaturesProps {
  onOpenPortal: () => void;
}

export const BentoFeatures: React.FC<BentoFeaturesProps> = ({ onOpenPortal }) => {
  // Interactive state for Geofence radius slider
  const [demoRadius, setDemoRadius] = useState<number>(150);
  const [selectedBranch, setSelectedBranch] = useState<'Colombo' | 'Kandy' | 'Galle'>('Colombo');

  // Interactive state for quick statutory payroll
  const [basicPay, setBasicPay] = useState<number>(150000);
  const epfEmployee = Math.round(basicPay * 0.08);
  const epfEmployer = Math.round(basicPay * 0.12);
  const etfEmployer = Math.round(basicPay * 0.03);
  const netTakeHome = basicPay - epfEmployee;

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Architecture & Core Modules</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-5">
            Engineered with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Zero Tolerance</span> for Human Error.
          </h2>
          <p className="text-base sm:text-lg text-purple-200/70">
            A cohesive suite designed from the ground up to replace fragmented HR spreadsheets, outdated punch cards, and brittle payroll formulas.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* CARD 1: Large Feature - GPS Geofenced Attendance (Col 8) */}
          <div className="md:col-span-12 lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#140A29]/90 to-[#0F0620]/90 border border-purple-500/25 relative overflow-hidden group hover:border-purple-400/50 transition-all duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-500/30 text-purple-400">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Active Multi-Branch Geofencing</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Sub-Meter GPS Geofencing with Hardware Fingerprinting
            </h3>
            <p className="text-sm text-purple-200/70 mb-6 max-w-xl">
              Eliminate proxy attendance and GPS spoofing. Employees can only clock in when their physical device is confirmed within their designated branch perimeter.
            </p>

            {/* Interactive Demo Within Card 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0416] border border-purple-500/20">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  {(['Colombo', 'Kandy', 'Galle'] as const).map((branch) => (
                    <button
                      key={branch}
                      onClick={() => setSelectedBranch(branch)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedBranch === branch
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50'
                          : 'bg-purple-950/40 text-purple-300/70 hover:bg-purple-900/40'
                      }`}
                    >
                      {branch} Branch
                    </button>
                  ))}
                </div>

                <div className="text-xs font-mono text-purple-300">
                  Radius: <span className="font-bold text-white">{demoRadius}m</span>
                </div>
              </div>

              {/* Slider for radius */}
              <div className="mb-4">
                <div className="flex justify-between text-[11px] text-purple-300/60 mb-1 font-medium">
                  <span>Geofence Boundary Calibration</span>
                  <span>50m - 500m</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={demoRadius}
                  onChange={(e) => setDemoRadius(Number(e.target.value))}
                  className="w-full h-1.5 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Radar visualization */}
              <div className="h-32 rounded-xl bg-purple-950/30 border border-purple-500/20 relative flex items-center justify-center overflow-hidden">
                <div
                  className="absolute rounded-full border border-purple-500/40 bg-purple-600/10 animate-pulse-slow transition-all duration-300"
                  style={{ width: `${Math.min(demoRadius * 0.7, 180)}px`, height: `${Math.min(demoRadius * 0.7, 180)}px` }}
                />
                <div className="w-4 h-4 rounded-full bg-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/80 z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                </div>
                <div className="absolute bottom-2 left-3 text-[10px] font-mono text-purple-300/80">
                  {selectedBranch === 'Colombo' && 'HQ: 6.9334° N, 79.8437° E (WTC Colombo)'}
                  {selectedBranch === 'Kandy' && 'Lab: 7.2711° N, 80.6014° E (Gatambe)'}
                  {selectedBranch === 'Galle' && 'Hub: 6.0268° N, 80.2170° E (Galle Fort)'}
                </div>
                <div className="absolute top-2 right-3 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  GPS LOCK: 100% OK
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Deterministic Statutory Payroll Engine (Col 5) */}
          <div className="md:col-span-12 lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#140A29]/90 to-[#0F0620]/90 border border-purple-500/25 relative overflow-hidden group hover:border-purple-400/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-2xl bg-fuchsia-900/40 border border-fuchsia-500/30 text-fuchsia-400">
                <Calculator className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-900/50 text-purple-300 border border-purple-500/30">
                Department of Labour Rules
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Statutory Payroll Engine
            </h3>
            <p className="text-sm text-purple-200/70 mb-5">
              Live calculation of Sri Lankan EPF 8%, EPF 12%, ETF 3%, and APIT tax brackets with zero spreadsheet math.
            </p>

            {/* Quick Interactive Tool */}
            <div className="p-4 rounded-2xl bg-[#0B0416] border border-purple-500/20 space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-purple-300/80 uppercase">
                  Basic Monthly Salary (LKR)
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-400">Rs.</span>
                  <input
                    type="number"
                    value={basicPay}
                    onChange={(e) => setBasicPay(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-purple-950/50 border border-purple-500/30 rounded-xl px-3 py-1.5 text-white font-mono text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-purple-950/30 p-2.5 rounded-xl border border-purple-500/15">
                  <span className="text-purple-300/70 text-[10px]">EPF Employee (8%)</span>
                  <div className="font-bold text-white font-mono">Rs. {epfEmployee.toLocaleString()}</div>
                </div>
                <div className="bg-purple-950/30 p-2.5 rounded-xl border border-purple-500/15">
                  <span className="text-purple-300/70 text-[10px]">EPF Employer (12%)</span>
                  <div className="font-bold text-white font-mono">Rs. {epfEmployer.toLocaleString()}</div>
                </div>
                <div className="bg-purple-950/30 p-2.5 rounded-xl border border-purple-500/15">
                  <span className="text-purple-300/70 text-[10px]">ETF Employer (3%)</span>
                  <div className="font-bold text-white font-mono">Rs. {etfEmployer.toLocaleString()}</div>
                </div>
                <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30">
                  <span className="text-emerald-300/80 text-[10px]">Est. Net Take-Home</span>
                  <div className="font-bold text-emerald-400 font-mono">Rs. {netTakeHome.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: Intelligent Leave Quotas (Col 4) */}
          <div className="md:col-span-6 lg:col-span-4 rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#140A29]/90 to-[#0F0620]/90 border border-purple-500/25 hover:border-purple-400/50 transition-all duration-300">
            <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-500/30 text-purple-400 w-fit mb-4">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Live Leave Quotas & Balances</h3>
            <p className="text-sm text-purple-200/70 mb-5">
              Automated provisioning of Annual (14d), Casual (7d), and Medical (14d) allocations with real-time manager approval routing.
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-purple-300 font-medium">Annual Leave</span>
                  <span className="font-bold text-white font-mono">9 Available / 14</span>
                </div>
                <div className="w-full h-2 rounded-full bg-purple-950 overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '64%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-purple-300 font-medium">Casual Leave</span>
                  <span className="font-bold text-white font-mono">5 Available / 7</span>
                </div>
                <div className="w-full h-2 rounded-full bg-purple-950 overflow-hidden">
                  <div className="h-full bg-fuchsia-500 rounded-full" style={{ width: '71%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-purple-300 font-medium">Medical Leave</span>
                  <span className="font-bold text-white font-mono">13 Available / 14</span>
                </div>
                <div className="w-full h-2 rounded-full bg-purple-950 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 4: Immutable Audit Trail & Analytical Hub (Col 4) */}
          <div className="md:col-span-6 lg:col-span-4 rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#140A29]/90 to-[#0F0620]/90 border border-purple-500/25 hover:border-purple-400/50 transition-all duration-300">
            <div className="p-3 rounded-2xl bg-indigo-900/40 border border-indigo-500/30 text-indigo-400 w-fit mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cryptographic Audit Trail</h3>
            <p className="text-sm text-purple-200/70 mb-5">
              Every punch, approval, quota update, and salary payout is recorded in an immutable audit ledger with IP and actor trace.
            </p>

            <div className="space-y-2 font-mono text-[11px] bg-[#0A0314] p-3 rounded-xl border border-purple-500/20">
              <div className="flex items-center justify-between text-emerald-400">
                <span>[08:42] GPS_CHECK_IN</span>
                <span className="text-slate-400 text-[10px]">192.168.1.104</span>
              </div>
              <div className="flex items-center justify-between text-purple-300">
                <span>[14:12] LEAVE_SUBMIT</span>
                <span className="text-slate-400 text-[10px]">EMP-0042</span>
              </div>
              <div className="flex items-center justify-between text-amber-400">
                <span>[17:30] PAYROLL_BATCH</span>
                <span className="text-slate-400 text-[10px]">CHRO_ADMIN</span>
              </div>
            </div>
          </div>

          {/* CARD 5: Enterprise Reports & CSV Hub (Col 4) */}
          <div className="md:col-span-12 lg:col-span-4 rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#140A29]/90 to-[#0F0620]/90 border border-purple-500/25 hover:border-purple-400/50 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-2xl bg-cyan-900/40 border border-cyan-500/30 text-cyan-400 w-fit mb-4">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1-Click CSV & PDF Reports</h3>
              <p className="text-sm text-purple-200/70 mb-4">
                Export comprehensive attendance logs, monthly payroll summaries, and department headcounts ready for auditors.
              </p>
            </div>

            <button
              onClick={onOpenPortal}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-purple-900/40 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/30 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore Analytics in Portal</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

