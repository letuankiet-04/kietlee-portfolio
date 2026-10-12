import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, MapPin, Target, Sparkles, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { useApp } from '../../context/AppContext';

export const AboutSection: React.FC = () => {
  const { lang } = useApp();

  return (
    <section id="about" className="min-h-screen py-28 px-4 sm:px-6 relative z-10 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-cyan-400 mb-2">// 01. VỀ BẢN THÂN // ABOUT ME</div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
            Xây Dựng <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-[#F89820]">Nền Tảng Vững Chắc</span>
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm mt-3">
            {lang === 'vi'
              ? 'Năng lực cốt lõi xuất phát từ kiến trúc, chuẩn mực mã nguồn và tư duy giải quyết bài toán.'
              : 'Core competency rooted in architecture, clean code standards, and algorithmic problem solving.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#6DB33F]" />
                <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider">
                  {lang === 'vi' ? 'HỒ SƠ NĂNG LỰC CHÍNH XÁC' : 'VERIFIED PROFILE OVERVIEW'}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                Lê Tuấn Kiệt — <span className="text-cyan-400">{PERSONAL_INFO.role[lang]}</span>
              </h3>

              <p className="text-slate-300 leading-relaxed font-light text-sm sm:text-base mb-6">
                {PERSONAL_INFO.bio[lang]}
              </p>

              {/* FPT Software Highlight Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/40 border border-emerald-500/30 flex items-start gap-3 mb-6 shadow-[0_0_20px_rgba(109,179,63,0.15)]">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 mt-0.5">
                  <Briefcase size={20} />
                </div>
                <div>
                  <div className="font-mono text-xs text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-2">
                    <span>{lang === 'vi' ? 'KINH NGHIỆM THỰC TẾ' : 'INDUSTRY EXPERIENCE'}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[10px] text-emerald-300 border border-emerald-500/40">
                      04/2026 - 09/2026
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 font-mono">
                    {lang === 'vi'
                      ? '6 tháng thực tập vị trí Java Backend Intern tại FPT Software — rèn luyện quy trình chuẩn doanh nghiệp.'
                      : '6 months internship as Java Backend Intern at FPT Software — experienced in enterprise software processes.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 font-mono">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <GraduationCap size={14} className="text-cyan-400" />
                  <span>{lang === 'vi' ? 'Học Vấn' : 'University'}</span>
                </div>
                <div className="text-sm font-bold text-white">FPT University</div>
                <div className="text-[11px] text-emerald-400">GPA 3.2 / 4.0</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Target size={14} className="text-[#F89820]" />
                  <span>{lang === 'vi' ? 'Mục Tiêu' : 'Objective'}</span>
                </div>
                <div className="text-sm font-bold text-white">Fresher / Junior</div>
                <div className="text-[11px] text-slate-400">Backend Dev</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <MapPin size={14} className="text-purple-400" />
                  <span>{lang === 'vi' ? 'Địa Điểm' : 'Location'}</span>
                </div>
                <div className="text-sm font-bold text-white">Long Trường</div>
                <div className="text-[11px] text-slate-400">TP. Hồ Chí Minh</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key Pillars & Soft Skills */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* Education Box */}
            <div className="glass-panel p-6 rounded-2xl border-cyan-500/20">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
                <GraduationCap size={16} />
                <span>{lang === 'vi' ? 'ĐÀO TẠO CHÍNH QUY' : 'FORMAL EDUCATION'}</span>
              </div>
              <div className="text-base font-bold text-white">{PERSONAL_INFO.education.university}</div>
              <div className="text-xs text-slate-300 mt-1 font-mono">
                {PERSONAL_INFO.education.major[lang]} (09/2023 - 09/2027)
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800">
                <span>{PERSONAL_INFO.education.year[lang]}</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-bold">
                  GPA: {PERSONAL_INFO.education.gpa}
                </span>
              </div>
            </div>

            {/* Languages Box */}
            <div className="glass-panel p-6 rounded-2xl border-emerald-500/20">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 mb-3">
                <Award size={16} />
                <span>{lang === 'vi' ? 'NGOẠI NGỮ' : 'LANGUAGES'}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {PERSONAL_INFO.languages.map((l) => (
                  <div key={l.name} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-xs text-slate-400 font-mono">{l.name}</div>
                    <div className="text-sm font-bold text-emerald-300 font-mono mt-0.5">{l.level}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills Box */}
            <div className="glass-panel p-6 rounded-2xl border-purple-500/20">
              <div className="flex items-center gap-2 font-mono text-xs text-purple-400 mb-3">
                <Sparkles size={16} />
                <span>{lang === 'vi' ? 'KỸ NĂNG MỀM' : 'SOFT SKILLS'}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {PERSONAL_INFO.softSkills.map((sk) => (
                  <span
                    key={sk.en}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300"
                  >
                    {sk[lang]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
