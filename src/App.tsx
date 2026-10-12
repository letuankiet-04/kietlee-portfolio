import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { Scene } from './components/canvas/Scene';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/ui/HeroSection';
import { AboutSection } from './components/ui/AboutSection';
import { SkillsSection } from './components/ui/SkillsSection';
import { ProjectsSection } from './components/ui/ProjectsSection';
import { ExperienceSection } from './components/ui/ExperienceSection';
import { CertificationsSection } from './components/ui/CertificationsSection';
import { TerminalContact } from './components/ui/TerminalContact';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { CustomCursor } from './components/ui/CustomCursor';
import { EasterEggModal } from './components/ui/EasterEggModal';
import { useKonamiCode } from './hooks/useKonamiCode';
import { AppProvider } from './context/AppContext';

export const MainContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  useKonamiCode(() => setEasterEggOpen(true));

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030708] text-slate-100 selection:bg-emerald-500 selection:text-black">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <CustomCursor />
      <Navbar />

      {/* 3D WebGL Background Canvas */}
      <Scene />

      {/* 2D Interactive UI Sections */}
      <main className="relative z-10 scanlines">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <TerminalContact onTriggerEasterEgg={() => setEasterEggOpen(true)} />
      </main>

      {/* Minimalist Tech Footer */}
      <footer className="relative z-10 py-10 border-t border-emerald-500/20 text-center font-mono text-xs text-slate-500 bg-[#030708]/90">
        <p className="mb-1 text-slate-400">
          © 2026 Lê Tuấn Kiệt (LE TUAN KIET) // Java Backend Developer
        </p>
        <p className="text-[11px] text-slate-600">
          Crafted with React, Three.js, React Three Fiber & Custom GLSL Shaders.
        </p>
      </footer>

      <EasterEggModal isOpen={easterEggOpen} onClose={() => setEasterEggOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
