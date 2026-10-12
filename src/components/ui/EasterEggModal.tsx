import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Copy, Check } from 'lucide-react';

export const EasterEggModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Confetti with Spring Green, Cyan, and Java Orange
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#6DB33F', '#00F0FF', '#F89820', '#10B981'],
      });
    }
  }, [isOpen]);

  const jsonSnippet = `{
  "developer": "Lê Tuấn Kiệt",
  "role": "Java Backend Developer",
  "status": "Ready for Hire",
  "strengths": [
    "High-Performance Spring Boot APIs",
    "Clean Controller-Service-Repository Pattern",
    "Real-World FPT Software Internship Experience",
    "Strict Unit & Load Testing (Mockito, JMeter)"
  ],
  "contact": "lekiet2442005@gmail.com"
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="max-w-lg w-full glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-400 text-center shadow-[0_0_50px_rgba(109,179,63,0.35)] relative overflow-hidden"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Sparkles size={22} />
              </span>
            </div>

            <h3 className="font-display text-2xl font-black text-white mb-2">
              EASTER EGG // BACKEND PAYLOAD UNLOCKED
            </h3>

            <p className="font-mono text-xs text-emerald-300 mb-4">
              Bạn đã mở khóa bí mật qua lệnh <code>sudo hire kiet</code> hoặc tổ hợp Konami Code!
            </p>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-left font-mono text-[11px] text-cyan-300 mb-6 overflow-x-auto relative">
              <pre>{jsonSnippet}</pre>
              <button
                onClick={copyToClipboard}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Copy JSON Payload"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>

            <div className="flex items-center justify-center gap-3">
              <a
                href="mailto:lekiet2442005@gmail.com?subject=Offer%20for%20Le%20Tuan%20Kiet"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-mono text-xs font-bold text-black transition-all"
              >
                GỬI OFFER NGAY
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 font-mono text-xs text-slate-300 transition-all"
              >
                ĐÓNG
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
