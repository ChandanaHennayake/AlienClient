import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StorytellingSectionProps {
  onOpenPortal: () => void;
}

export const StorytellingSection: React.FC<StorytellingSectionProps> = ({ onOpenPortal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2400',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        }
      });

      tl.to(step1Ref.current, {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: 'power2.inOut'
      })
      .fromTo(
        step2Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.4'
      )
      .to(imagePanelRef.current, {
        scale: 1.05,
        duration: 1.2,
        ease: 'power1.inOut'
      }, '-=1.2')
      .to(step2Ref.current, {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: 'power2.inOut'
      })
      .fromTo(
        step3Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
        '-=0.4'
      )
      .to(imagePanelRef.current, {
        scale: 1.1,
        duration: 1.2,
        ease: 'power1.inOut'
      }, '-=1.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0A0713] text-white overflow-hidden flex items-center select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/20 via-[#0A0713] to-[#0A0713] pointer-events-none" />

      <div
        ref={containerRef}
        className="max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 h-full flex items-center relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          
          {/* Left Column: Oversized Narrative Typography */}
          <div className="lg:col-span-7 relative min-h-[440px] flex items-center">
            
            {/* Act I: Break it down */}
            <div
              ref={step1Ref}
              className="absolute inset-0 flex flex-col justify-center text-left"
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-purple-400 mb-4">
                <span>[ ACT 01 • DECONSTRUCTION ]</span>
              </div>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] mb-6">
                Break it <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-fuchsia-400">
                  down.
                </span>
              </h2>
              <p className="max-w-lg text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-6">
                Legacy HR operations crumble under disconnected spreadsheets, proxy clock-ins, and manual payroll errors. We deconstruct workforce friction into verifiable telemetry.
              </p>
              <div className="flex items-center gap-3 font-mono text-xs text-purple-300/80">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                <span>Scroll to reconstruct the operating system</span>
              </div>
            </div>

            {/* Act II: Build it up */}
            <div
              ref={step2Ref}
              className="absolute inset-0 flex flex-col justify-center text-left opacity-0 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-purple-400 mb-4">
                <span>[ ACT 02 • RECONSTRUCTION ]</span>
              </div>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] mb-6">
                Build it <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-fuchsia-400">
                  up.
                </span>
              </h2>
              <p className="max-w-lg text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-6">
                Sub-meter GPS geofencing perimeter locks, anti-spoof hardware telemetry, and automated quota balance engines work in unison with zero hardware footprint.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-500/30 text-purple-300">
                  GPS Accuracy: 4.2m
                </span>
                <span className="px-2.5 py-1 rounded bg-purple-950/80 border border-purple-500/30 text-purple-300">
                  Live Quota Validation
                </span>
              </div>
            </div>

            {/* Act III: Scale it out */}
            <div
              ref={step3Ref}
              className="absolute inset-0 flex flex-col justify-center text-left opacity-0 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-purple-400 mb-4">
                <span>[ ACT 03 • EXPANSION ]</span>
              </div>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] mb-6">
                Scale it <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-fuchsia-400">
                  out.
                </span>
              </h2>
              <p className="max-w-lg text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-6">
                Deterministic statutory payroll across multi-branch enterprises. Direct deposit payslips with Sri Lanka Department of Labour EPF 8%/12% and ETF 3% precision.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={onOpenPortal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs tracking-wide shadow-lg shadow-purple-900/50 transition-colors pointer-events-auto"
                >
                  <span>Experience AlienHR Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Sculptural Visual Artifact with Dynamic Lighting */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div
              ref={imagePanelRef}
              className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden border border-purple-500/30 bg-[#120822] shadow-2xl shadow-purple-950/80 flex items-center justify-center p-8 text-center"
            >
              <div className="absolute inset-0 bg-radial from-purple-600/30 via-transparent to-transparent opacity-80" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 p-0.5 shadow-xl shadow-purple-900/60">
                  <div className="w-full h-full bg-[#0D0519] rounded-[14px] flex items-center justify-center">
                    <img
                      src="/alien_logo.png"
                      alt="AlienHR Core Symbol"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>

                <div className="font-mono text-xs uppercase tracking-widest text-purple-300/80">
                  Human Capital Operating Core
                </div>

                <div className="grid grid-cols-2 gap-3 text-left font-mono text-[11px]">
                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/20">
                    <div className="text-slate-400 text-[10px]">VERIFICATION</div>
                    <div className="font-bold text-emerald-400 mt-0.5">SUB-METER GPS</div>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/20">
                    <div className="text-slate-400 text-[10px]">STATUTORY</div>
                    <div className="font-bold text-purple-300 mt-0.5">EPF/ETF ENGINE</div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono tracking-tight">
                  IMMUTABLE SHA-256 AUDIT LEDGER • ISO 27001
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
