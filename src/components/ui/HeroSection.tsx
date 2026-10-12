import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, Sparkles, Terminal, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { useApp } from '../../context/AppContext';

export const HeroSection: React.FC = () => {
  const { lang, taglineIndex, setTaglineIndex } = useApp();
  const [displayText, setDisplayText] = useState('');
  const fullText = lang === 'vi' ? 'Java Backend Fresher' : 'Java Backend Fresher';

  // Typing effect for Role
  useEffect(() => {
    let index = 0;
    setDisplayText('');
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 85);
    return () => clearInterval(interval);
  }, [fullText]);

  const currentTagline = PERSONAL_INFO.taglineOptions[taglineIndex][lang];

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center z-10">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-xs font-mono mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(109,179,63,0.25)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{PERSONAL_INFO.status[lang]}</span>
        </motion.div>

        {/* 3D Reactive Big Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-4"
        >
          <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white drop-shadow-2xl">
            <span>LE TUAN KIET</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-3 font-mono text-base sm:text-xl md:text-2xl text-cyan-400 font-semibold tracking-wider">
            <Cpu size={22} className="text-[#6DB33F] animate-pulse" />
            <span>&gt; {displayText}</span>
            <span className="w-2.5 h-6 bg-cyan-400 inline-block animate-pulse ml-0.5" />
          </div>
        </motion.div>

        {/* Tagline Box with Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="max-w-3xl mx-auto my-6 p-4 rounded-xl border border-slate-800 bg-[#081116]/80 backdrop-blur-sm"
        >
          <p className="text-slate-300 text-sm sm:text-lg font-light leading-relaxed mb-3">
            "{currentTagline}"
          </p>
          <div className="flex items-center justify-center gap-2 pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-500">
              {lang === 'vi' ? 'Chọn phương án tagline:' : 'Select tagline style:'}
            </span>
            {PERSONAL_INFO.taglineOptions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTaglineIndex(idx)}
                className={`w-6 h-6 rounded-md font-mono text-xs transition-all ${
                  taglineIndex === idx
                    ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_rgba(109,179,63,0.5)]'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 font-mono font-semibold text-white shadow-[0_0_25px_rgba(109,179,63,0.4)] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Code2 size={18} />
            <span>{lang === 'vi' ? 'XEM 3 DỰ ÁN BACKEND' : 'EXPLORE BACKEND PROJECTS'}</span>
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-emerald-500/40 hover:border-cyan-400 bg-emerald-950/20 backdrop-blur-sm font-mono text-emerald-300 hover:text-cyan-300 transition-all flex items-center justify-center gap-2"
          >
            <Terminal size={18} />
            <span>{lang === 'vi' ? 'MỞ TERMINAL CLI' : 'OPEN INTERACTIVE CLI'}</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <div className="mt-14 flex flex-col items-center gap-2 text-slate-500 font-mono text-xs">
          <span>{lang === 'vi' ? 'CUỘN ĐỂ DU HÀNH XUYÊN KIẾN TRÚC' : 'SCROLL TO TRAVERSE THE BACKEND'}</span>
          <ArrowDown size={14} className="animate-bounce text-emerald-400" />
        </div>
      </div>
    </section>
  );
};
