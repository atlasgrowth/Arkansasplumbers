
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Arkansasplumbers/',
  build: {
    outDir: 'dist'
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['d9b7c193-bf09-45a5-af62-6f94275b93b2-00-2nvule3d6s500.riker.replit.dev'],
    fs: {
      allow: ['..']
    }
  }
});
