import React, { useState, useEffect } from 'react';
import { Sparkles, Smartphone, LayoutDashboard, ChevronRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
  onOpenMobileSim: () => void;
  onOpenAiCopilot: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPortal,
  onOpenMobileSim,
  onOpenAiCopilot,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/90 py-3.5 shadow-xs'
          : 'bg-white/60 backdrop-blur-xs py-5 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-purple-700 p-0.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <img
                src="/alien_logo.png"
                alt="AlienHR Logo"
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors">
                  Alien<span className="text-purple-700">HR</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  SYSTEM v2.0
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#overview"
              className="hover:text-purple-700 transition-colors py-1 relative group"
            >
              <span>Overview</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-700 transition-all duration-200 group-hover:w-full" />
            </a>

            <a
              href="#mobile-experience"
              className="hover:text-purple-700 transition-colors py-1 relative group flex items-center gap-1.5"
            >
              <span>Mobile App</span>
              <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded-sm">
                FLUTTER
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-700 transition-all duration-200 group-hover:w-full" />
            </a>

            <a
              href="#payroll-engine"
              className="hover:text-purple-700 transition-colors py-1 relative group"
            >
              <span>Payroll & EPF</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-700 transition-all duration-200 group-hover:w-full" />
            </a>

            <a
              href="#pricing"
              className="hover:text-purple-700 transition-colors py-1 relative group"
            >
              <span>Pricing</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-700 transition-all duration-200 group-hover:w-full" />
            </a>

            <a
              href="#contact"
              className="hover:text-purple-700 transition-colors py-1 relative group"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-700 transition-all duration-200 group-hover:w-full" />
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenAiCopilot}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200/80 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Ask AlienAI</span>
            </button>

            <button
              onClick={onOpenMobileSim}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-500" />
              <span>Mobile Demo</span>
            </button>

            <button
              onClick={onOpenPortal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Launch Client Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenPortal}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-700 text-white"
            >
              Portal
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <a
                href="#overview"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800"
              >
                Overview
              </a>
              <a
                href="#mobile-experience"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800"
              >
                Mobile Experience
              </a>
              <a
                href="#payroll-engine"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800"
              >
                Payroll & EPF
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800"
              >
                Pricing Plans
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-800"
              >
                Contact
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMobileSim();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 flex items-center justify-center gap-2"
              >
                <Smartphone className="w-4 h-4 text-purple-700" />
                <span>Open Mobile Simulator</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-purple-700 flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Launch Client Portal</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};
