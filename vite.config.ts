import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/kietlee-portfolio/',
  server: {
    port: 3000,
    open: false,
  },
});
