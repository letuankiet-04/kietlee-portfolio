import React from 'react';
import { motion } from 'framer-motion';
import { Server, Users, Heart, Calendar, ArrowUpRight } from 'lucide-react';
import { WORK_EXPERIENCES, ACTIVITIES } from '../../data/portfolio';
import { useApp } from '../../context/AppContext';

export const ExperienceSection: React.FC = () => {
  const { lang } = useApp();

  return (
    <section id="experience" className="min-h-screen py-28 px-4 sm:px-6 relative z-10 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-emerald-400 mb-2">// 04. KINH NGHIỆM & HOẠT ĐỘNG // TIMELINE CIRCUIT</div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
            Mạch Điện <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-[#F89820]">Kinh Nghiệm & Cột Mốc</span>
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm mt-3">
            {lang === 'vi'
              ? 'Trải nghiệm từ môi trường thực tế tại FPT Software đến các hoạt động cộng đồng & thủ lĩnh dự án.'
              : 'From enterprise production environments at FPT Software to leadership in social initiatives.'}
          </p>
        </div>

        {/* Timeline Circuit */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-emerald-500/40 space-y-12">
          {/* 1. FPT Software Internship - THE BRIGHTEST PRODUCTION BEACON */}
          {WORK_EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Glowing Pulse Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#030708] border-2 border-emerald-400 shadow-[0_0_20px_#6DB33F] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(109,179,63,0.25)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Server size={18} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {exp.company}
                      </h3>
                      <div className="text-xs font-mono text-cyan-400 font-semibold">
                        {exp.role[lang]}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 w-fit">
                    {exp.period} ({exp.type})
                  </span>
                </div>

                <div className="space-y-1.5 my-4">
                  {exp.description[lang].map((line, i) => (
                    <div key={i} className="text-slate-300 text-xs sm:text-sm font-mono flex items-start gap-2">
                      <span className="text-emerald-400">❯</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-emerald-300 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}

          {/* 2. Activities */}
          {ACTIVITIES.map((act, index) => (
            <div key={index} className="relative group">
              <div className="absolute -left-[30px] sm:-left-[46px] top-1.5 w-4 h-4 rounded-full bg-[#030708] border-2 border-cyan-400 shadow-[0_0_12px_#00F0FF]" />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                      {index === 0 ? <Users size={16} /> : <Heart size={16} />}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {act.title[lang]}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-slate-400 bg-slate-900/60 px-2.5 py-0.5 rounded border border-slate-800 w-fit">
                    {act.period}
                  </span>
                </div>

                <div className="text-xs font-mono text-cyan-400 mb-2">
                  {act.role[lang]} — {act.organization}
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                  {act.description[lang]}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
