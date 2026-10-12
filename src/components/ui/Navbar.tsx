import React, { useState, useEffect } from 'react';
import { Terminal, Github, Sun, Moon, Globe, Palette } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { useApp } from '../../context/AppContext';
import { ThemePalette } from '../../types';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, theme, setTheme, isDark, setIsDark } = useApp();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cycleTheme = () => {
    const themes: ThemePalette[] = ['spring', 'cyber', 'java'];
    const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIdx]);
  };

  const navLinks = [
    { id: 'about', label: { vi: 'Giới thiệu', en: 'About' } },
    { id: 'skills', label: { vi: 'Kỹ năng', en: 'Skills' } },
    { id: 'projects', label: { vi: 'Dự án', en: 'Projects' } },
    { id: 'experience', label: { vi: 'Hoạt động', en: 'Experience' } },
    { id: 'certifications', label: { vi: 'Chứng chỉ', en: 'Certs' } },
    { id: 'contact', label: { vi: 'Terminal', en: 'Contact' } },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#030708]/85 backdrop-blur-md border-b border-emerald-500/20 shadow-lg'
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg border border-emerald-500/40 bg-emerald-950/40 flex items-center justify-center text-emerald-400 group-hover:border-cyan-400 group-hover:text-cyan-300 transition-colors shadow-[0_0_15px_rgba(109,179,63,0.3)]">
            <Terminal size={17} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-sm sm:text-base tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-300 to-[#F89820]">
              {PERSONAL_INFO.fullNameEn}
            </span>
            <span className="text-[9px] font-mono text-slate-400 tracking-tight">
              JAVA BACKEND // 200 OK
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 font-mono text-xs text-slate-300">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="hover:text-cyan-300 transition-colors relative group py-1"
            >
              <span className="text-emerald-500 mr-1">//</span>
              {item.label[lang]}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Controls & Socials */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Switcher Button */}
          <button
            onClick={cycleTheme}
            title={`Current Theme: ${theme.toUpperCase()} (Click to toggle)`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 hover:border-cyan-400 bg-slate-900/60 text-xs font-mono text-emerald-400 hover:text-cyan-300 transition-all backdrop-blur-sm"
          >
            <Palette size={14} />
            <span className="capitalize hidden sm:inline">{theme}</span>
          </button>

          {/* Bilingual Switcher (VI / EN) */}
          <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            title="Toggle Language"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-emerald-500 bg-slate-900/60 text-xs font-mono text-slate-300 hover:text-emerald-400 transition-all backdrop-blur-sm"
          >
            <Globe size={13} />
            <span className="font-bold">{lang.toUpperCase()}</span>
          </button>

          {/* Dark / Light Mode */}
          <button
            onClick={() => setIsDark(!isDark)}
            title="Toggle Dark/Light"
            className="p-1.5 rounded-lg border border-slate-750 hover:border-emerald-500 bg-slate-900/60 text-slate-400 hover:text-yellow-400 transition-all backdrop-blur-sm"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* GitHub */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg border border-slate-750 hover:border-emerald-500 bg-slate-900/60 text-slate-400 hover:text-emerald-400 transition-all backdrop-blur-sm"
            title="GitHub Profile"
          >
            <Github size={15} />
          </a>
        </div>
      </div>
    </header>
  );
};
