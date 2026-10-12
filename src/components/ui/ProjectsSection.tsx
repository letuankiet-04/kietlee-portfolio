import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Sparkles,
  Layers,
  ShieldCheck,
  Database,
  Server,
  Cpu,
  Boxes,
} from 'lucide-react';
import { PROJECTS } from '../../data/portfolio';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';

// Interactive 3D Tilt Card Component
const Project3DTiltCard: React.FC<{
  project: Project;
  onOpenArch: (project: Project) => void;
  lang: 'vi' | 'en';
}> = ({ project, onOpenArch, lang }) => {
  const cardRef = useRef<HTMLDivElement>(null!);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: '1100px' }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: rotate.x === 0 && rotate.y === 0 ? 'transform 0.5s ease-out' : 'transform 0.08s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className={`glass-panel rounded-3xl p-6 sm:p-7 border flex flex-col justify-between relative group h-full overflow-hidden ${
          project.featured
            ? 'border-emerald-500/50 shadow-[0_0_35px_rgba(109,179,63,0.2)]'
            : 'border-slate-800 hover:border-cyan-500/50'
        }`}
      >
        {/* Dynamic Specular Sheen Layer */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
            opacity: glare.opacity,
          }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          {/* Header Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.accent, boxShadow: `0 0 10px ${project.accent}` }}
              />
              <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                {project.period}
              </span>
            </div>
            {project.featured && (
              <span className="flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles size={11} /> {lang === 'vi' ? 'NỔI BẬT NHẤT' : 'FEATURED'}
              </span>
            )}
            {project.id === 'personal-3d-portfolio' && (
              <span className="flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Boxes size={11} /> {lang === 'vi' ? '3D INTERACTIVE' : '3D INTERACTIVE'}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
            {project.title}
          </h3>
          <p className="text-xs font-mono text-emerald-400 mb-3">{project.tagline[lang]}</p>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5 font-light">
            {project.description[lang]}
          </p>

          {/* Key Features List */}
          <div className="mb-5 space-y-1.5 pt-3 border-t border-slate-800">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              {lang === 'vi' ? 'Tính năng chính:' : 'Key Highlights:'}
            </div>
            {project.features[lang].slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                <span className="text-cyan-400 mt-0.5">❯</span>
                <span className="leading-tight">{feat}</span>
              </div>
            ))}
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div
          className="relative z-10 pt-4 border-t border-slate-800/80 space-y-3"
          style={{ transform: 'translateZ(25px)' }}
        >
          {/* Architecture Preview Button */}
          <button
            onClick={() => onOpenArch(project)}
            className="w-full py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-cyan-300 text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Layers size={14} />
            <span>{lang === 'vi' ? 'BUNG SƠ ĐỒ KIẾN TRÚC' : 'VIEW ARCHITECTURE STACK'}</span>
          </button>

          {/* GitHub Links */}
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>
            )}
            {project.githubBackend && (
              <a
                href={project.githubBackend}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
              >
                <Github size={14} />
                <span>Backend</span>
              </a>
            )}
            {project.githubFrontend && (
              <a
                href={project.githubFrontend}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-all"
              >
                <Github size={14} />
                <span>Frontend</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { lang } = useApp();
  const [selectedArchProject, setSelectedArchProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="min-h-screen py-28 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-cyan-400 mb-2">// 03. DỰ ÁN NỔI BẬT // 3D TILT CARDS & ARCHITECTURE PREVIEW</div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
            Các Hệ Thống <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-[#F89820]">Backend & Web 3D</span>
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm mt-3 max-w-2xl mx-auto">
            {lang === 'vi'
              ? 'Tất cả các dự án đều tuân thủ mô hình phân lớp rõ ràng, bảo mật chuẩn mực, tối ưu hóa dữ liệu và hiển thị dạng thẻ 3D tilt trực quan.'
              : 'All projects adhere to layered architectures, standard security protocols, and interactive 3D tilt card visualization.'}
          </p>
        </div>

        {/* 4 Projects Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <Project3DTiltCard
                project={project}
                onOpenArch={setSelectedArchProject}
                lang={lang}
              />
            </motion.div>
          ))}
        </div>

        {/* Architecture Modal Popup */}
        <AnimatePresence>
          {selectedArchProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-2xl w-full glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] relative"
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                      // ARCHITECTURE PREVIEW
                    </span>
                    <h4 className="font-display text-xl font-bold text-white">
                      {selectedArchProject.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedArchProject(null)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-mono text-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Pipeline Flow Diagram */}
                <div className="space-y-2.5 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <Cpu size={16} className="text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-slate-400 text-[10px]">CLIENT LAYER:</div>
                      <div className="text-slate-200">{selectedArchProject.architecture.client}</div>
                    </div>
                  </div>

                  <div className="flex justify-center text-emerald-400">↓ HTTP / REST API</div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <Server size={16} className="text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-slate-400 text-[10px]">CONTROLLER LAYER:</div>
                      <div className="text-slate-200">{selectedArchProject.architecture.controller}</div>
                    </div>
                  </div>

                  <div className="flex justify-center text-emerald-400">↓ Business Logic</div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <ShieldCheck size={16} className="text-[#F89820] shrink-0" />
                    <div>
                      <div className="text-slate-400 text-[10px]">SERVICE & REPOSITORY LAYER:</div>
                      <div className="text-slate-200">{selectedArchProject.architecture.service}</div>
                    </div>
                  </div>

                  <div className="flex justify-center text-emerald-400">↓ JPA / SQL & Cache / Edge</div>

                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <Database size={16} className="text-purple-400 shrink-0" />
                    <div>
                      <div className="text-slate-400 text-[10px]">PERSISTENCE & DEPLOYMENT LAYER:</div>
                      <div className="text-slate-200">{selectedArchProject.architecture.database}</div>
                      {selectedArchProject.architecture.cache && (
                        <div className="text-amber-400 text-[11px] mt-0.5">
                          ⚡ {selectedArchProject.architecture.cache}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-right">
                  <button
                    onClick={() => setSelectedArchProject(null)}
                    className="px-6 py-2 rounded-xl bg-emerald-500 text-black font-mono font-bold text-xs hover:bg-emerald-400"
                  >
                    {lang === 'vi' ? 'Đóng' : 'Close'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
