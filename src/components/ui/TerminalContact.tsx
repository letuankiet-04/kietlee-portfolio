import React, { useState } from 'react';
import { Send, Terminal as TerminalIcon, Sparkles, Mail, Github, FileText, CheckCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolio';
import { useApp } from '../../context/AppContext';

export const TerminalContact: React.FC<{ onTriggerEasterEgg: () => void }> = ({ onTriggerEasterEgg }) => {
  const { lang } = useApp();
  const [history, setHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: 'init --status',
      output:
        lang === 'vi'
          ? 'Kiến trúc máy chủ đã sẵn sàng. Gõ "help" để xem danh sách lệnh hoặc gõ trực tiếp.'
          : 'Backend interactive CLI ready. Type "help" to view supported commands.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output =
          lang === 'vi'
            ? 'Lệnh khả dụng: help | email | github | resume | status | sudo hire kiet | clear'
            : 'Available commands: help | email | github | resume | status | sudo hire kiet | clear';
        break;
      case 'email':
      case 'contact':
        output = (
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-emerald-400" />
            <span>Email: </span>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-300 underline">
              {PERSONAL_INFO.email}
            </a>
          </div>
        );
        break;
      case 'github':
        output = (
          <div className="flex items-center gap-2">
            <Github size={14} className="text-emerald-400" />
            <span>GitHub: </span>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyan-300 underline">
              {PERSONAL_INFO.github}
            </a>
          </div>
        );
        break;
      case 'resume':
      case 'cv':
        output = (
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-[#F89820]" />
            <span>{lang === 'vi' ? 'Hồ sơ ứng tuyển: Java Backend Fresher (Ex-Intern FPT Software)' : 'Profile: Java Backend Fresher (Ex-Intern FPT Software)'}</span>
          </div>
        );
        break;
      case 'status':
        output = `STATUS 200 OK: ${PERSONAL_INFO.status[lang]} | GPA: 3.4/4.0 | Location: Long Trường, TP.HCM`;
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'sudo hire kiet':
      case 'sudo hire me':
        output = (
          <div className="text-emerald-400 font-bold flex items-center gap-2">
            <Sparkles size={16} className="text-amber-400" />
            <span>{lang === 'vi' ? '🎉 TUYỆT VỜI! Đang mở khóa Easter Egg ma trận Backend...' : '🎉 SUCCESS! Unlocking Backend matrix Easter Egg...'}</span>
          </div>
        );
        onTriggerEasterEgg();
        break;
      default:
        output =
          lang === 'vi'
            ? `Lệnh không xác định: "${cmd}". Gõ "help" để xem các lệnh.`
            : `Unknown command: "${cmd}". Type "help" for available commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput('');
  };

  return (
    <section id="contact" className="min-h-screen py-28 px-4 sm:px-6 relative z-10 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="font-mono text-xs text-cyan-400 mb-2">// 06. LIÊN HỆ & TERMINAL // REVERSE SHELL</div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
            Giao Tiếp <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-[#F89820]">Trực Tiếp Qua CLI</span>
          </h2>
          <p className="text-slate-400 font-mono text-xs sm:text-sm mt-3">
            {lang === 'vi'
              ? 'Tương tác trực tiếp bằng các câu lệnh dòng lệnh hoặc gửi email nhanh.'
              : 'Direct interactive pseudo-shell for developer-to-developer communication.'}
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl border border-emerald-500/30 bg-[#04090e]/95 backdrop-blur-xl shadow-[0_0_50px_rgba(109,179,63,0.15)] overflow-hidden">
          {/* Top Bar */}
          <div className="px-4 py-3 bg-slate-950/80 border-b border-emerald-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <TerminalIcon size={14} className="text-emerald-400" />
              <span className="text-emerald-300 font-semibold">kiet@backend-server: ~/contact-session</span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
          </div>

          {/* History */}
          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm max-h-80 overflow-y-auto space-y-3 scrollbar-none">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="text-cyan-400 font-bold">❯</span>
                  <span className="text-slate-200">{item.command}</span>
                </div>
                <div className="text-slate-300 pl-4">{item.output}</div>
              </div>
            ))}
          </div>

          {/* Input Line */}
          <form onSubmit={handleCommand} className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/90 flex items-center gap-2 font-mono">
            <span className="text-cyan-400 font-bold">❯</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === 'vi' ? 'Gõ "help", "email", hoặc "sudo hire kiet"...' : 'Type "help", "email", or "sudo hire kiet"...'}
              className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-slate-600 font-mono"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <Send size={14} />
            </button>
          </form>
        </div>

        {/* Big Glow CTA */}
        <div className="text-center mt-10">
          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Interview%20Invitation%20-%20Java%20Backend%20Developer`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-[#F89820] hover:scale-105 font-mono text-sm font-bold text-black shadow-[0_0_35px_rgba(109,179,63,0.5)] transition-all"
          >
            <CheckCircle size={18} className="text-black" />
            <span>
              {lang === 'vi'
                ? 'HIRE ME AS YOUR BACKEND DEVELOPER'
                : 'HIRE ME AS YOUR BACKEND DEVELOPER'}
            </span>
          </a>
          <div className="text-xs font-mono text-slate-500 mt-2">
            Long Trường, TP.HCM • {PERSONAL_INFO.email}
          </div>
        </div>
      </div>
    </section>
  );
};
