import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote:
        'AlienHR solved our multi-branch attendance nightmare overnight. With 4 locations across Colombo and Kandy, sub-meter GPS geofencing completely eliminated timecard discrepancies.',
      name: 'Nalaka Wickremasinghe',
      role: 'Director of Operations',
      company: 'OmniCloud Technologies',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5
    },
    {
      quote:
        'The deterministic Sri Lankan statutory payroll engine is remarkable. EPF 8%/12% and ETF 3% calculations run in seconds with zero manual verification needed by our accounting team.',
      name: 'Ananya Somasundaram',
      role: 'Head of People & Culture',
      company: 'Zenith Logistics Group',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: 5
    },
    {
      quote:
        'Our employees genuinely enjoy using the mobile app. The live quota tracker and instant leave approval workflow gave them total visibility and confidence in their balances.',
      name: 'Rohan de Silva',
      role: 'Chief Technology Officer',
      company: 'Pulse Digital Asia',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 5
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            <span>Proven in Production</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Trusted by Forward-Thinking <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">Leaders</span>.
          </h2>
          <p className="text-base sm:text-lg text-purple-200/70">
            See how enterprise teams transform their human capital operations with AlienHR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-gradient-to-b from-[#14092B] to-[#0E051E] border border-purple-500/25 relative flex flex-col justify-between hover:border-purple-400/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-purple-100/90 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-purple-500/15">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-full border border-purple-400/40 object-cover"
                />
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {t.name}
                  </div>
                  <div className="text-xs text-purple-300/70">{t.role}</div>
                  <div className="text-[11px] text-purple-400 font-medium">{t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

