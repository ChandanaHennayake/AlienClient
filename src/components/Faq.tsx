import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does AlienHR GPS geofencing prevent false punches or GPS spoofing?',
      a: 'AlienHR utilizes hardware-level mobile device telemetry combined with fused GPS, Wi-Fi BSSID signals, and server-side coordinate validation. If an employee attempts mock location providers or coordinates outside the branch perimeter radius (e.g. 150m), the check-in is rejected immediately and logged to the security audit trail.'
    },
    {
      q: 'Is the deterministic payroll engine compliant with Sri Lankan labour statutes?',
      a: 'Yes, 100%. AlienHR incorporates the Department of Labour EPF Act No. 15 of 1958 and ETF Act No. 46 of 1980 rules. It computes employee EPF (8%), employer EPF (12%), and employer ETF (3%) on total eligible earnings, and correctly factors progressive APIT income tax brackets and no-pay leave deductions.'
    },
    {
      q: 'Can employees view their payslips and leave balances from the mobile app?',
      a: 'Absolutely. The AlienHR mobile app allows employees to view real-time leave balances across Annual, Casual, and Medical allocations, submit leave requests with instant quota check, view itemized corporate payslips, and check upcoming company holidays.'
    },
    {
      q: 'Can managers oversee multiple branches and approve team requests?',
      a: 'Yes. AlienHR includes a multi-branch switcher for managers and admins. Managers can review their assigned branches, inspect live team attendance rosters, approve or reject leave applications with required comments, and review attendance correction submissions.'
    },
    {
      q: 'How long does deployment take?',
      a: 'Because AlienHR is cloud-native and requires zero physical biometric hardware, deployment takes less than 30 minutes. You create your branch coordinates, invite managers and employees via email, and your team is ready to clock in.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#FBFBFC] border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-semibold tracking-wider mb-4">
            <span>[ 07. FREQUENTLY ASKED ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Answers to Common Inquiries.
          </h2>
          <p className="text-base text-slate-600">
            Everything you need to know about the AlienHR client portal and mobile ecosystem.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-purple-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-purple-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
