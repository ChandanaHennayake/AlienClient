import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { fireSuccessConfetti } from '../utils/confetti';

interface PricingProps {
  onOpenPortal: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenPortal }) => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const tiers = [
    {
      name: 'Starter Cloud',
      desc: 'Ideal for boutique teams and fast-growing startups',
      monthlyPrice: 8500,
      annualPrice: 6800,
      headcount: 'Up to 25 Employees',
      features: [
        'Sub-meter GPS Geofenced Punching',
        'Single Branch Geofence Perimeter',
        'Standard Leave Quota Management',
        'Mobile App (Android & iOS)',
        'Basic Statutory EPF/ETF Summaries',
        'Community & Email Support'
      ],
      popular: false
    },
    {
      name: 'Enterprise Growth',
      desc: 'Full-spectrum workforce intelligence for scaling companies',
      monthlyPrice: 24500,
      annualPrice: 19600,
      headcount: 'Up to 150 Employees',
      features: [
        'Everything in Starter Cloud',
        'Unlimited Multi-Branch Geofences',
        'Deterministic Statutory Payroll Engine',
        'Itemized Employee Payslips with Bank Export',
        'Automated Leave Balance Accrual Engine',
        'Cryptographic Audit Trail & Logs',
        'Role-Based Multi-Manager Approvals',
        'Priority 24/7 Dedicated Support'
      ],
      popular: true
    },
    {
      name: 'Global Sovereign',
      desc: 'Custom deployments, on-premise, or private VPC isolation',
      monthlyPrice: 65000,
      annualPrice: 52000,
      headcount: 'Unlimited Headcount',
      features: [
        'Everything in Enterprise Growth',
        'Custom ERP & Bank Gateway Direct Integration',
        'Dedicated SLA with 99.99% Uptime Guarantee',
        'Custom Statutory Rule Override Engine',
        'Biometric Hardware Terminal Bridging',
        'Dedicated Human Capital Success Architect'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-semibold tracking-wider mb-4">
            <span>[ 06. PLANS & INVESTMENT ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Transparent, Predictable Investment.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-8">
            Deploy in minutes. Zero hardware setup required. Switch between plans anytime.
          </p>

          {/* Billing Switch */}
          <div className="inline-flex items-center gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isAnnual ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Billed Monthly
            </button>
            <button
              onClick={() => {
                setIsAnnual(true);
                fireSuccessConfetti();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAnnual ? 'bg-purple-700 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual (Save 20%)</span>
              <span className="text-[9px] bg-purple-100 text-purple-900 px-1.5 py-0.2 rounded font-bold">
                PROMO
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, idx) => {
            const price = isAnnual ? t.annualPrice : t.monthlyPrice;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  t.popular
                    ? 'bg-white border-2 border-purple-600 shadow-xl shadow-purple-600/5 ring-1 ring-purple-100'
                    : 'bg-white border border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {t.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-purple-700 text-white font-mono font-bold text-[10px] tracking-wider uppercase shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{t.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{t.desc}</p>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-xs font-bold text-slate-500 font-mono">Rs.</span>
                    <span className="text-4xl font-black font-mono text-slate-900 tracking-tight">
                      {price.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                  <div className="text-[11px] font-mono font-semibold text-purple-700 mb-6">
                    {t.headcount}
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3 mb-8">
                    {t.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenPortal}
                  className={`w-full py-3 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 ${
                    t.popular
                      ? 'bg-purple-700 hover:bg-purple-800 text-white shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800'
                  }`}
                >
                  <span>Get Started with {t.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
