import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StorytellingSection } from './components/StorytellingSection';
import { HorizontalScrollSection } from './components/HorizontalScrollSection';
import { StickyProcessSection } from './components/StickyProcessSection';
import { ImpactGallery } from './components/ImpactGallery';
import { MobileAppSimulator } from './components/MobileAppSimulator';
import { PayrollCalculator } from './components/PayrollCalculator';
import { Pricing } from './components/Pricing';
import { Faq } from './components/Faq';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PortalApp } from './components/PortalApp';
import { AlienAICopilot } from './components/AlienAICopilot';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'portal'>('landing');
  const [isAiCopilotOpen, setIsAiCopilotOpen] = useState<boolean>(false);

  // Initialize and Synchronize Lenis Smooth Scroll with GSAP ScrollTrigger
  useEffect(() => {
    if (viewMode === 'landing') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const lenis = new Lenis({
        duration: prefersReducedMotion ? 0.01 : 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: !prefersReducedMotion,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      // Synchronize Lenis scroll with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      const tickerCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tickerCallback);
        lenis.destroy();
      };
    }
  }, [viewMode]);

  const handleOpenPortal = () => {
    setViewMode('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setViewMode('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMobileSim = () => {
    setViewMode('landing');
    const el = document.getElementById('mobile-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-900">
      <ScrollProgress />

      {viewMode === 'landing' ? (
        <>
          <Navbar
            onOpenPortal={handleOpenPortal}
            onOpenMobileSim={handleOpenMobileSim}
            onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
          />

          <main className="flex-1">
            <Hero
              onOpenPortal={handleOpenPortal}
              onOpenMobileSim={handleOpenMobileSim}
              onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
            />

            {/* GSAP ScrollTrigger Pinned Narrative: Break it down -> Build it up -> Scale it out */}
            <StorytellingSection onOpenPortal={handleOpenPortal} />

            {/* Horizontal Module Carousel */}
            <HorizontalScrollSection onOpenPortal={handleOpenPortal} />

            {/* Sticky Step Process Flow */}
            <StickyProcessSection onOpenPortal={handleOpenPortal} />

            {/* Asymmetric Featured Deployments & Oversized Impact Metrics */}
            <ImpactGallery onOpenPortal={handleOpenPortal} />

            {/* Flutter Mobile App Replica */}
            <MobileAppSimulator />

            {/* Sri Lankan Statutory Deterministic Payroll Calculator */}
            <PayrollCalculator />

            {/* Pricing Plans */}
            <Pricing onOpenPortal={handleOpenPortal} />

            {/* FAQ Accordion */}
            <Faq />

            {/* Editorial Contact & Deployment Consultation */}
            <ContactSection />
          </main>

          <Footer
            onOpenPortal={handleOpenPortal}
            onOpenMobileSim={handleOpenMobileSim}
          />

          {/* Floating AI Assistant Trigger Button */}
          {!isAiCopilotOpen && (
            <div className="fixed bottom-6 right-6 z-40">
              <button
                onClick={() => setIsAiCopilotOpen(true)}
                className="group relative flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 hover:text-purple-700 hover:border-purple-300 font-bold text-xs shadow-lg transition-all duration-200"
                aria-label="Open AlienAI Copilot"
              >
                <Sparkles className="w-4 h-4 text-purple-600 group-hover:rotate-12 transition-transform" />
                <span>Ask AlienAI</span>
                <span className="flex h-2 w-2 relative ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </button>
            </div>
          )}

          <AlienAICopilot
            isOpen={isAiCopilotOpen}
            onClose={() => setIsAiCopilotOpen(false)}
          />
        </>
      ) : (
        <PortalApp
          onBackToLanding={handleBackToLanding}
          onOpenAiCopilot={() => setIsAiCopilotOpen(true)}
        />
      )}
    </div>
  );
}

export default App;
