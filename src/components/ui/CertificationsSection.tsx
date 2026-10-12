import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, RotateCw, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '../../data/portfolio';
import { useApp } from '../../context/AppContext';
import { CertificationItem } from '../../types';

export const CertificationsSection: React.FC = () => {
  const { lang } = useApp();
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const getBadgeAccent = (type: CertificationItem['badgeType']) => {
    switch (type) {
      case 'java':
        return { border: 'border-amber-500/50', glow: '#F89820', badge: 'bg-amber-500/20 text-amber-300' };
      case 'spring':
        return { border: 'border-emerald-500/50', glow: '#6DB33F', badge: 'bg-emerald-500/20 text-emerald-300' };
      case 'architecture':
        return { border: 'border-cyan-500/50', glow: '#00F0FF', badge: 'bg-cyan-500/20 text-cyan-300' };
      case 'design':
        return { border: 'border-purple-500/50', glow: '#a855f7', badge: 'bg-purple-500/20 text-purple-300' };
      default:
        return { border: 'border-blue-500/50', glow: '#3b82f6', badge: 'bg-blue-500/20 text-blue-300' };
    }
  };

  return (
    <section id="certifications" className="min-h-screen py-28 px-4 sm:px-6 relative z-10 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-amber-400 mb-2">// 05. CHỨNG CHỈ CHUYÊN MÔN // 3D FLIP BADGES</div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
            Chứng Chỉ <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F89820] via-emerald-400 to-cyan-400">Quốc Tế & Học Thuật</span>
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm mt-3">
            {lang === 'vi'
              ? 'Nhấp vào thẻ để lật xem chứng nhận được cấp từ IBM, Duke, Minnesota, Michigan, Sydney & VSTEP.'
              : 'Click on any badge to flip and view credentials issued by IBM, Duke, Minnesota, Michigan, Sydney & VSTEP.'}
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CERTIFICATIONS.map((cert, index) => {
            const isFlipped = flippedIndex === index;
            const accent = getBadgeAccent(cert.badgeType);

            return (
              <div
                key={index}
                className="h-64 cursor-pointer perspective"
                onClick={() => setFlippedIndex(isFlipped ? null : index)}
              >
                <motion.div
                  className="w-full h-full relative rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Front Side */}
                  <div
                    className={`absolute inset-0 rounded-2xl glass-panel p-5 border ${accent.border} [backface-visibility:hidden] flex flex-col justify-between hover:scale-102 transition-transform`}
                    style={{ boxShadow: `0 8px 30px -10px ${accent.glow}30` }}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${accent.badge}`}>
                          {cert.badgeType}
                        </span>
                        <span className="font-mono text-xs text-slate-400">{cert.issueDate}</span>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white mb-3">
                        <Award size={22} style={{ color: accent.glow }} />
                      </div>

                      <h3 className="font-display text-sm sm:text-base font-bold text-white line-clamp-3">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="truncate max-w-[140px]">{cert.issuer}</span>
                      <RotateCw size={13} className="text-slate-500 animate-spin-slow" />
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className={`absolute inset-0 rounded-2xl glass-panel p-5 border ${accent.border} [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-between bg-[#04090e]/95`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-2">
                        <CheckCircle2 size={15} />
                        <span>VERIFIED CREDENTIAL</span>
                      </div>
                      <h4 className="font-display text-xs font-bold text-white mb-2">{cert.title}</h4>
                      <div className="text-[11px] font-mono text-slate-300">
                        <span className="text-slate-500">Đơn vị cấp:</span> {cert.issuer}
                      </div>
                      <div className="text-[11px] font-mono text-slate-300 mt-1">
                        <span className="text-slate-500">Thời gian:</span> {cert.issueDate}
                      </div>
                    </div>

                    <div className="text-center pt-3 border-t border-slate-800">
                      <span className="text-[10px] font-mono text-cyan-400">
                        {lang === 'vi' ? 'Nhấp để lật lại' : 'Click to flip back'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
