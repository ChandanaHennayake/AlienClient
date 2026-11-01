import React, { useState } from 'react';
import { TrendingUp, Clock, DollarSign, Award, ArrowRight } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [employees, setEmployees] = useState<number>(120);

  // Benchmarks: average HR admin spends 4 hours/month per 10 employees on attendance auditing & payroll adjustments
  const hoursSavedPerMonth = Math.round((employees / 10) * 4.5);
  // Average error avoidance savings (disputed overtime + ghost punching + calculation missteps)
  const rupeesSavedPerMonth = Math.round(employees * 1850);

  return (
    <section className="py-20 relative overflow-hidden bg-[#080313]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#170C30] via-[#1F0E42] to-[#14082B] border border-purple-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Workforce ROI Engine
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 mb-4 leading-tight">
                Quantify the Direct Impact on Your Enterprise Bottom Line.
              </h3>
              <p className="text-sm text-purple-200/70 mb-6">
                Spreadsheet-driven HR wastes hundreds of hours in attendance reconciliation and payroll adjustments. Drag the slider to forecast your savings.
              </p>

              <div>
                <div className="flex justify-between text-xs font-bold text-purple-200 mb-2">
                  <span>Organization Headcount</span>
                  <span className="font-mono text-white text-base">{employees} Personnel</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2 bg-purple-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[10px] text-purple-300/50 mt-1 font-mono">
                  <span>10 Employees</span>
                  <span>1,000 Employees</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0B0418] border border-purple-500/25 text-center">
                <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {hoursSavedPerMonth} hrs
                </div>
                <div className="text-xs text-purple-300/70 mt-1 font-medium">Monthly Admin Saved</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0418] border border-emerald-500/30 text-center">
                <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                  Rs. {rupeesSavedPerMonth.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-300/70 mt-1 font-medium">Payroll Leakage Prevented</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

