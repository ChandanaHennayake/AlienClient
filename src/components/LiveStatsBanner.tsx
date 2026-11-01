import React from 'react';
import { ShieldAlert, Zap, Award, CheckCircle, Clock, Users } from 'lucide-react';

export const LiveStatsBanner: React.FC = () => {
  const stats = [
    {
      label: 'Geofence Precision',
      value: '< 5 Meters',
      change: 'Zero Spoofing',
      icon: Zap,
      color: 'text-purple-400'
    },
    {
      label: 'Statutory Payroll Engine',
      value: '100% Deterministic',
      change: 'EPF / ETF / APIT',
      icon: Award,
      color: 'text-fuchsia-400'
    },
    {
      label: 'Clock-In Verification Time',
      value: '< 800 ms',
      change: 'Sub-second sync',
      icon: Clock,
      color: 'text-emerald-400'
    },
    {
      label: 'Active Enterprise Headcount',
      value: '12,500+',
      change: '3 Continents',
      icon: Users,
      color: 'text-cyan-400'
    }
  ];

  return (
    <section className="py-10 border-y border-purple-500/15 bg-[#090314]/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="relative group p-4 sm:p-6 rounded-2xl bg-purple-950/20 border border-purple-500/15 hover:border-purple-500/40 hover:bg-purple-900/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl bg-purple-900/30 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-purple-300/70 tracking-wide uppercase">
                    {stat.label}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

