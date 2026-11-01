import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle2,
  Smartphone,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { fireSuccessConfetti } from '../utils/confetti';

interface HeroProps {
  onOpenPortal: () => void;
  onOpenMobileSim: () => void;
  onOpenAiCopilot: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenPortal,
  onOpenMobileSim,
  onOpenAiCopilot
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isDemoClockedIn, setIsDemoClockedIn] = useState<boolean>(true);
  const [demoPunchTime, setDemoPunchTime] = useState<string>('08:42 AM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDemoPunchToggle = () => {
    if (!isDemoClockedIn) {
      const now = new Date();
      setDemoPunchTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      );
      setIsDemoClockedIn(true);
      fireSuccessConfetti();
    } else {
      setIsDemoClockedIn(false);
    }
  };

  return (
    <section id="overview" className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Top Badge */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono mb-8 shadow-2xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
            </span>
            <span className="font-semibold text-slate-800">
              [ 01. INTRODUCING ALIENHR 2.0 ]
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
              STABLE RELEASE
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
            Autonomous Precision for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-900">
              Human Capital Operations.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-10">
            A unified web and mobile ecosystem engineered to replace fragmented spreadsheets. 
            Real-time <span className="font-semibold text-slate-900">GPS geofenced attendance</span>, 
            deterministic <span className="font-semibold text-slate-900">Sri Lankan statutory payroll (EPF/ETF)</span>, 
            and automated quota balances.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button
              onClick={onOpenPortal}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-purple-700 hover:bg-purple-800 shadow-md shadow-purple-900/10 hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-purple-200" />
              <span>Open Client Web Portal</span>
              <ArrowRight className="w-4 h-4 text-purple-200" />
            </button>

            <button
              onClick={onOpenMobileSim}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-all hover:border-slate-300"
            >
              <Smartphone className="w-4 h-4 text-purple-600" />
              <span>Interactive Mobile Simulator</span>
            </button>

            <button
              onClick={onOpenAiCopilot}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl text-xs font-semibold text-purple-700 hover:bg-purple-50 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Ask AlienAI Copilot</span>
            </button>
          </div>

          {/* Editorial Specs Bar */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 pb-12 border-y border-slate-200/80 mb-16 text-left">
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
                GEOFENCE ACCURACY
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                &lt; 5 Meters
              </div>
              <div className="text-xs text-purple-700 font-medium mt-0.5">
                Hardware Anti-Spoof
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
                STATUTORY ENGINE
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                100% Deterministic
              </div>
              <div className="text-xs text-purple-700 font-medium mt-0.5">
                EPF 8%/12% + ETF 3%
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
                PUNCH LATENCY
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                &lt; 600 ms
              </div>
              <div className="text-xs text-emerald-600 font-medium mt-0.5">
                Real-Time Cloud Sync
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
                SECURITY GRADE
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                ISO 27001
              </div>
              <div className="text-xs text-purple-700 font-medium mt-0.5">
                Cryptographic Ledger
              </div>
            </div>
          </div>

        </div>

        {/* Clean Interactive Showcase Card (Editorial White with Purple Highlights) */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-200/50">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                </div>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  alienhr // live-console.telemetry
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>API Synced (Render)</span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                  {currentTime || '08:42:15 AM'}
                </span>
              </div>
            </div>

            {/* Grid Layout inside the Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Simulated Punch Terminal */}
              <div className="md:col-span-5 bg-[#FAF8FF] p-6 rounded-2xl border border-purple-200/60 text-center">
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="font-mono text-purple-700 font-bold uppercase">
                    GPS Geofence Radar
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-700 text-[11px] font-mono">
                    HQ (150m)
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-purple-100 mb-5 text-left">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700">
                    <MapPin className="w-5 h-5 text-purple-600 animate-bounce" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Colombo Tech Hub (HQ)</div>
                    <div className="text-[11px] text-slate-500 font-mono">Accuracy: 4.2m • Inside Radius</div>
                  </div>
                </div>

                {/* Punch Button */}
                <button
                  onClick={handleDemoPunchToggle}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 ${
                    isDemoClockedIn
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-purple-700 hover:bg-purple-800 text-white'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>{isDemoClockedIn ? 'CLOCK OUT (CURRENTLY PUNCHED IN)' : 'CLOCK IN (GPS VERIFIED)'}</span>
                </button>

                <div className="text-[11px] text-slate-500 mt-2 font-mono">
                  {isDemoClockedIn ? `In at ${demoPunchTime} • Working: 07h 14m` : 'Tap button to clock in'}
                </div>
              </div>

              {/* Right Column: Workforce Metrics & Payroll Strip */}
              <div className="md:col-span-7 space-y-4">
                
                {/* Roster Strip */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Active Workforce Roster
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      94.2% Attendance
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-lg font-black font-mono text-slate-900">216</div>
                      <div className="text-[10px] text-slate-500">Headcount</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <div className="text-lg font-black font-mono text-emerald-700">186</div>
                      <div className="text-[10px] text-emerald-600 font-medium">Present</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                      <div className="text-lg font-black font-mono text-amber-700">14</div>
                      <div className="text-[10px] text-amber-600 font-medium">Late</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100">
                      <div className="text-lg font-black font-mono text-purple-700">8</div>
                      <div className="text-[10px] text-purple-600 font-medium">On Leave</div>
                    </div>
                  </div>
                </div>

                {/* Statutory Payroll Banner */}
                <div className="p-4 rounded-2xl bg-[#FAF8FF] border border-purple-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
                      <Award className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Sri Lanka Statutory Compliance Engine
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        EPF 8% + 12% • ETF 3% • Progressive APIT
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onOpenPortal}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700 transition-colors"
                  >
                    Explore Portal
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
