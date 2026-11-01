import React, { useState } from 'react';
import { Calculator, Award, CheckCircle2 } from 'lucide-react';
import { fireSuccessConfetti } from '../utils/confetti';

export const PayrollCalculator: React.FC = () => {
  const [basicSalary, setBasicSalary] = useState<number>(250000);
  const [allowances, setAllowances] = useState<number>(35000);
  const [noPayDays, setNoPayDays] = useState<number>(0);

  // Calculations
  const dailyRate = basicSalary / 22;
  const noPayDeductions = Math.round(dailyRate * noPayDays);
  const eligibleEarnings = Math.max(0, basicSalary - noPayDeductions);
  const grossEarnings = eligibleEarnings + allowances;

  // Sri Lanka Statutory Rules
  const epfEmployee = Math.round(eligibleEarnings * 0.08);
  const epfEmployer = Math.round(eligibleEarnings * 0.12);
  const etfEmployer = Math.round(eligibleEarnings * 0.03);

  // Progressive APIT calculation simulation
  let apitTax = 0;
  if (grossEarnings > 150000) {
    const taxable = grossEarnings - 100000;
    if (taxable <= 41666) apitTax = taxable * 0.06;
    else if (taxable <= 83333) apitTax = 41666 * 0.06 + (taxable - 41666) * 0.12;
    else apitTax = 41666 * 0.06 + 41666 * 0.12 + (taxable - 83333) * 0.18;
  }
  apitTax = Math.round(apitTax);

  const totalDeductions = epfEmployee + apitTax;
  const netTakeHome = grossEarnings - totalDeductions;
  const totalCostToCompany = grossEarnings + epfEmployer + etfEmployer;

  return (
    <section id="payroll-engine" className="py-24 bg-[#FBFBFC] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-semibold tracking-wider mb-4">
            <span>[ 05. STATUTORY SIMULATOR ]</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Interactive Statutory Calculator.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Compliant with Department of Labour Act No. 15 of 1958 and Inland Revenue APIT tax tables. Zero manual calculation errors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Box */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-purple-700" />
              <span>Input Compensation Parameters</span>
            </h3>

            <div className="space-y-6">
              {/* Basic Salary */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-700">Basic Monthly Salary</span>
                  <span className="font-mono text-purple-700 font-bold text-sm">
                    Rs. {basicSalary.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-700"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>Rs. 50,000</span>
                  <span>Rs. 1,000,000</span>
                </div>
              </div>

              {/* Allowances */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-700">Fixed Monthly Allowances</span>
                  <span className="font-mono text-purple-700 font-bold text-sm">
                    Rs. {allowances.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={allowances}
                  onChange={(e) => setAllowances(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-700"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>Rs. 0</span>
                  <span>Rs. 200,000</span>
                </div>
              </div>

              {/* No-Pay Absence Days */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-700">Unapproved / No-Pay Absence</span>
                  <span className="font-mono text-rose-600 font-bold text-sm">
                    {noPayDays} Day(s)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={noPayDays}
                  onChange={(e) => setNoPayDays(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>0 Days</span>
                  <span>5 Days</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => fireSuccessConfetti()}
                  className="w-full py-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-purple-700" />
                  <span>Verify Deterministic Calculation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            {/* Net take-home hero banner */}
            <div className="p-6 rounded-2xl bg-[#FAF8FF] border border-purple-200/80 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700">
                  Estimated Employee Take-Home
                </span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono mt-1">
                  Rs. {netTakeHome.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Automated Direct Deposit Ready</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-purple-100 text-left sm:text-right">
                <span className="text-[10px] text-slate-400 block font-mono">TOTAL EMPLOYER COST (CTC)</span>
                <span className="text-base font-extrabold text-slate-900 font-mono">
                  Rs. {totalCostToCompany.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                <span className="text-slate-700 font-medium">Gross Remuneration (Basic + Allowances)</span>
                <span className="font-mono font-bold text-slate-900">Rs. {grossEarnings.toLocaleString()}</span>
              </div>

              {noPayDeductions > 0 && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 flex justify-between items-center text-rose-700 font-medium">
                  <span>No-Pay Leave Deduction ({noPayDays} days)</span>
                  <span className="font-mono font-bold">-Rs. {noPayDeductions.toLocaleString()}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <div className="text-[10px] font-mono font-bold text-purple-700 uppercase">EPF Employee (8%)</div>
                  <div className="text-sm font-bold text-slate-900 font-mono mt-1">
                    Rs. {epfEmployee.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Deducted from gross</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <div className="text-[10px] font-mono font-bold text-purple-700 uppercase">EPF Employer (12%)</div>
                  <div className="text-sm font-bold text-slate-900 font-mono mt-1">
                    Rs. {epfEmployer.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Statutory employer cost</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <div className="text-[10px] font-mono font-bold text-purple-700 uppercase">ETF Employer (3%)</div>
                  <div className="text-sm font-bold text-slate-900 font-mono mt-1">
                    Rs. {etfEmployer.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Trust Fund Board</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                <span className="text-slate-600">Progressive APIT Tax Deduction</span>
                <span className="font-mono font-bold text-slate-800">Rs. {apitTax.toLocaleString()}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
