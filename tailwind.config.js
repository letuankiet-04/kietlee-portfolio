/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#030014',
          card: 'rgba(13, 8, 38, 0.65)',
          border: 'rgba(168, 85, 247, 0.25)',
          purple: '#a855f7',
          pink: '#ec4899',
          cyan: '#06b6d4',
          blue: '#3b82f6',
          neon: '#10b981',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.5)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.5)',
        'glow-neon': '0 0 30px -5px rgba(16, 185, 129, 0.5)',
      },
    },
  },
  plugins: [],
};
