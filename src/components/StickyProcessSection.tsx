import React, { useState } from 'react';
import { Check, Shield, MapPin, Calculator, Calendar, ArrowRight } from 'lucide-react';

interface StickyProcessSectionProps {
  onOpenPortal: () => void;
}

export const StickyProcessSection: React.FC<StickyProcessSectionProps> = ({ onOpenPortal }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: '01',
      title: 'Geofenced Mobile Verification',
      subtitle: 'Instant GPS lock with hardware fingerprinting',
      content:
        'When an employee opens the AlienHR mobile app on-site, device GPS coordinates are verified against the branch perimeter polygon in real time. Mock location detection and device tampering checks prevent buddy punching.',
      badge: 'Zero Hardware Footprint',
      icon: MapPin,
      previewInfo: {
        label: 'Perimeter Check',
        val1: 'Colombo Tech Hub (150m)',
        val2: 'Accuracy: 4.2m • Locked'
      }
    },
    {
      step: '02',
      title: 'Real-Time Quota & Leave Balancing',
      subtitle: 'Deterministic ledger with zero balance drift',
      content:
        'Leave applications immediately calculate available vs pending days across statutory categories (Annual, Casual, Medical). Automated notifications ping the branch manager for one-click approval or rejection.',
      badge: 'Immediate Quota Sync',
      icon: Calendar,
      previewInfo: {
        label: 'Statutory Allocation',
        val1: '14 Annual • 7 Casual • 14 Medical',
        val2: 'Available Balance: Live'
      }
    },
    {
      step: '03',
      title: 'Deterministic Statutory Payroll',
      subtitle: 'Department of Labour EPF & ETF compliance',
      content:
        'At the close of each payroll period, the engine aggregates approved worked hours, punctuality flags, and no-pay days. It applies exact statutory percentages (EPF 8%, EPF 12%, ETF 3%) and progressive APIT tax without Excel spreadsheets.',
      badge: 'Audit Ready',
      icon: Calculator,
      previewInfo: {
        label: 'Calculation Engine',
        val1: 'EPF 8% + 12% | ETF 3%',
        val2: '0.00 Rs Calculation Drift'
      }
    },
    {
      step: '04',
      title: 'Immutable Audit Trail & PDF Delivery',
      subtitle: 'Secure ledger with direct employee distribution',
      content:
        'Every single action—from a GPS clock-in to a salary disbursement—is signed into an immutable audit stream with IP and actor telemetry. Employees receive encrypted itemized payslips directly on their mobile devices.',
      badge: 'Cryptographic Integrity',
      icon: Shield,
      previewInfo: {
        label: 'Audit Trace',
        val1: 'SHA-256 Event Fingerprint',
        val2: 'One-Click CSV / PDF Export'
      }
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sticky Title & Process Indicator */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-semibold tracking-wider mb-4">
              <span>[ 03. HOW IT WORKS ]</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Precision from Punch to Payslip.
            </h2>
            
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              AlienHR unifies the entire employee lifecycle into an automated four-stage pipeline. Clean, transparent, and completely verifiable.
            </p>

            {/* Stepper tracker */}
            <div className="space-y-3">
              {steps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx + 1)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                    activeStep === idx + 1
                      ? 'bg-purple-50/80 border-purple-300 text-purple-950 font-bold shadow-xs'
                      : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                      {s.step}
                    </span>
                    <span className="text-sm font-semibold">{s.title}</span>
                  </div>
                  {activeStep === idx + 1 && (
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={onOpenPortal}
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
              >
                <span>Launch Interactive Web Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Step Detail Cards */}
          <div className="lg:col-span-7 space-y-8">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isSelected = activeStep === idx + 1;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx + 1)}
                  className={`p-8 rounded-3xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-white border-purple-300 shadow-xl shadow-purple-600/5 ring-1 ring-purple-100'
                      : 'bg-slate-50/50 border-slate-200/80 opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        STAGE {s.step}
                      </span>
                      <span className="text-xs font-mono text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60 font-semibold">
                        {s.badge}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/70 text-purple-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {s.title}
                  </h3>
                  <div className="text-xs font-medium text-purple-700 mb-4">
                    {s.subtitle}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {s.content}
                  </p>

                  {/* Micro Visual Card */}
                  <div className="bg-[#FAF8FF] border border-purple-200/60 rounded-2xl p-4 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-purple-600 font-bold">
                        {s.previewInfo.label}
                      </div>
                      <div className="font-bold text-slate-900 mt-0.5">
                        {s.previewInfo.val1}
                      </div>
                    </div>
                    <div className="text-right font-mono text-xs font-semibold text-emerald-600 bg-white px-3 py-1 rounded-lg border border-slate-200/80">
                      {s.previewInfo.val2}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

