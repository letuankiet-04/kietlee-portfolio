import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { lang } = useApp();
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootSequence = [
    `  .   ____          _            __ _ _`,
    ` /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\`,
    `( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\`,
    ` \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )`,
    `  '  |____| .__|_| |_|_| |_\\__, | / / / /`,
    `=========|_|==============|___/=/_/_/_/`,
    `:: Spring Boot ::                (v3.2.4)`,
    ``,
    `2026-10-12 INFO  [main] c.k.portfolio.PortfolioApplication : Starting PortfolioApplication v1.0.0 on Kiet-MacBook with PID 2442`,
    `2026-10-12 INFO  [main] c.k.portfolio.config.SecurityConfig : Initializing JWT Security Filter Chain... [OK]`,
    `2026-10-12 INFO  [main] c.k.portfolio.service.DbConnection  : Connecting to MySQL datasource jdbc:mysql://db.kietlee.dev:3306/portfolio... Connected.`,
    `2026-10-12 INFO  [main] c.k.portfolio.cache.RedisService    : Warming up Redis in-memory cache... 100% warmed up [OK]`,
    `2026-10-12 INFO  [main] o.s.b.w.embedded.tomcat.Tomcat      : Tomcat initialized with port: 8080 (http)`,
    `2026-10-12 INFO  [main] c.k.portfolio.PortfolioApplication : Started PortfolioApplication in 1.284 seconds (process running for 1.82)`,
    `>> SYSTEM STATUS: 200 OK — Welcome to Inside the Backend.`,
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setLogs((prev) => [...prev, bootSequence[index]]);
        setProgress(Math.round(((index + 1) / bootSequence.length) * 100));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 bg-[#030708] flex flex-col justify-center items-center p-4 sm:p-6 font-mono text-xs text-emerald-400 select-none overflow-hidden"
      >
        <div className="w-full max-w-3xl p-5 md:p-6 rounded-xl border border-emerald-500/30 bg-[#06100c]/90 shadow-[0_0_50px_rgba(109,179,63,0.2)] backdrop-blur-xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-500/20 text-slate-400 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 text-emerald-400 font-semibold tracking-wider">
                LE_TUAN_KIET // BACKEND_BOOT_SEQUENCE
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              PID: 2442 | PORT: 8080
            </span>
          </div>

          {/* Log Window */}
          <div className="h-64 sm:h-72 overflow-y-auto space-y-1 scrollbar-none font-mono text-[11px] sm:text-xs">
            {logs.map((log, i) => (
              <div
                key={i}
                className={
                  log.includes(':: Spring Boot ::') || log.startsWith('  ')
                    ? 'text-[#6DB33F] font-bold leading-none'
                    : log.includes('200 OK')
                    ? 'text-cyan-400 font-bold bg-cyan-950/40 p-1 rounded'
                    : log.includes('Redis')
                    ? 'text-amber-400'
                    : log.includes('MySQL')
                    ? 'text-cyan-300'
                    : 'text-slate-300'
                }
              >
                {log}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center gap-4">
            <div className="flex-1 bg-slate-900/80 h-2 rounded-full overflow-hidden border border-emerald-500/20">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-[#F89820]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-emerald-400 font-bold text-xs w-12 text-right">
              {progress}%
            </span>
          </div>

          <div className="mt-2 text-right">
            <span className="text-[10px] text-slate-500">
              {lang === 'vi' ? 'Nhấn bất kỳ để bỏ qua...' : 'Click anywhere to skip...'}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
