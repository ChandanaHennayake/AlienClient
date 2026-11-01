import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Clock, ShieldCheck, Check } from 'lucide-react';
import { fireSuccessConfetti } from '../utils/confetti';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    workEmail: '',
    company: '',
    headcount: '50 - 250 Employees',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    fireSuccessConfetti();
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Editorial Inquiry Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-semibold tracking-wider mb-4">
                <span>[ 08. CONSULTATION & DEPLOYMENT ]</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-4">
                Let's engineer <br />
                <span className="text-purple-700">your workforce.</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                Schedule a private architectural walkthrough with our Human Capital Systems engineering team. No biometric hardware required.
              </p>
            </div>

            {/* Direct Coordinates Box */}
            <div className="p-6 rounded-3xl bg-[#FAF9FD] border border-slate-200 space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">HEADQUARTERS COORDINATES</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    World Trade Center, Level 24, Colombo 01
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    6.9334° N, 79.8437° E • Geofence Perimeter Active
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <Mail className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">DIRECT DISPATCH</div>
                  <a href="mailto:systems@alienhr.io" className="font-bold text-purple-700 hover:underline mt-0.5 block">
                    systems@alienhr.io
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200">
                <Phone className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-400 text-[10px] uppercase">DIRECT CONCIERGE</div>
                  <div className="font-bold text-slate-900 mt-0.5">+94 (11) 244-8900</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SOC2 Type II & Sri Lanka Labour Act Compliant</span>
            </div>
          </div>

          {/* Right Column: Clean Architectural Form */}
          <div className="lg:col-span-7 bg-[#FAF9FD] rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Consultation Scheduled</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Our systems architect will contact {formData.workEmail || 'you'} within 2 business hours with private sandbox credentials.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1.5 font-mono uppercase text-[10px]">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-semibold block mb-1.5 font-mono uppercase text-[10px]">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@enterprise.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1.5 font-mono uppercase text-[10px]">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OmniCorp Asia"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-semibold block mb-1.5 font-mono uppercase text-[10px]">
                      Active Personnel Headcount
                    </label>
                    <select
                      value={formData.headcount}
                      onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-600"
                    >
                      <option value="10 - 50 Employees">10 - 50 Employees</option>
                      <option value="50 - 250 Employees">50 - 250 Employees</option>
                      <option value="250 - 1,000 Employees">250 - 1,000 Employees</option>
                      <option value="1,000+ Enterprise">1,000+ Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1.5 font-mono uppercase text-[10px]">
                    Operational Requirements / Branch Locations
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your current branch locations or statutory payroll specifications..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Architectural Briefing</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

