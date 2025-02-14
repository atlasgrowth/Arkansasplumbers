import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Arkansasplumbers/',
  build: {
    
    outDir: 'dist',outDir: 'dist'
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['d9b7c193-bf09-45a5-af62-6f94275b93b2-00-2nvule3d6s500.riker.replit.dev', '5e0c8b32-2387-44d4-8a10-ad9c2c64da62-00-2tdv56eew62up.janeway.replit.dev']
  }
});
