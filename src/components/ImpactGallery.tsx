import React from 'react';
import { ArrowUpRight, Building2, MapPin, CheckCircle, Shield } from 'lucide-react';

interface ImpactGalleryProps {
  onOpenPortal: () => void;
}

export const ImpactGallery: React.FC<ImpactGalleryProps> = ({ onOpenPortal }) => {
  const deployments = [
    {
      title: 'Colombo Tech Hub — Corporate Headquarters',
      category: 'ENTERPRISE DEPLOYMENT',
      specs: '148 Personnel • 150m Perimeter • Level 24 WTC',
      coords: '6.9334° N, 79.8437° E',
      stat: '99.4%',
      statLabel: 'On-Time Punctuality',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Kandy Innovation Research Lab',
      category: 'R&D FACILITY',
      specs: '42 Engineers • 200m Perimeter • Peradeniya Corridor',
      coords: '7.2711° N, 80.6014° E',
      stat: '0 Days',
      statLabel: 'Leave Balance Drift',
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Galle Coastal Engineering Center',
      category: 'REGIONAL NODE',
      specs: '26 Personnel • 250m Perimeter • Light House St',
      coords: '6.0268° N, 80.2170° E',
      stat: '100%',
      statLabel: 'Statutory EPF Accuracy',
      image:
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const impactMetrics = [
    {
      num: '99.98%',
      label: 'GEOFENCE PRECISION',
      desc: 'Sub-meter mobile telemetry eliminates false clock-ins and proxy punches.',
    },
    {
      num: '0.00 Rs',
      label: 'CALCULATION VARIANCE',
      desc: 'Deterministic payroll engine executes EPF 8%/12% and ETF 3% with zero rounding errors.',
    },
    {
      num: '< 600ms',
      label: 'CLOCK-IN LATENCY',
      desc: 'Instant cryptographic punch validation directly into live attendance rosters.',
    },
    {
      num: '100%',
      label: 'LEGAL STATUTORY ALIGNMENT',
      desc: 'Full compliance with Sri Lanka Labour Act No. 15 and Inland Revenue APIT rules.',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-semibold tracking-wider mb-4">
              <span>[ 04. OPERATIONAL IMPACT ]</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Enterprise Deployments & Measured Impact.
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600 leading-relaxed">
            Real-world deployments across Sri Lankan innovation corridors demonstrate the efficiency of hardware-less workforce intelligence.
          </p>
        </div>

        {/* Oversized Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {impactMetrics.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#FAF9FD] border border-slate-200/90 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono font-bold text-purple-700 uppercase tracking-wider mb-2">
                  {m.label}
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono text-slate-900 tracking-tight mb-3">
                  {m.num}
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Asymmetric Featured Deployments */}
        <div className="space-y-12">
          {deployments.map((d, idx) => (
            <div
              key={idx}
              onClick={onOpenPortal}
              className={`rounded-3xl border border-slate-200/90 overflow-hidden bg-white hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Media Image */}
              <div className={`lg:col-span-7 h-64 sm:h-80 lg:h-auto relative overflow-hidden group ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={d.image}
                  alt={d.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-mono font-bold text-slate-800 border border-slate-200">
                  {d.category}
                </div>
              </div>

              {/* Text Meta */}
              <div className={`lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>{d.coords}</span>
                    <span className="text-purple-700 font-semibold">[ ACTIVE HUB ]</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3 leading-snug">
                    {d.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-mono mb-6">
                    {d.specs}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-black font-mono text-slate-900">
                      {d.stat}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {d.statLabel}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900">
                    <span>View Hub in Portal</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

