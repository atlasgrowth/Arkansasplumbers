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
    allowedHosts: ['d9b7c193-bf09-45a5-af62-6f94275b93b2-00-2nvule3d6s500.riker.replit.dev', '5e0c8b32-2387-44d4-8a10-ad9c2c64da62-00-2tdv56eew62up.janeway.replit.dev', '46b8f2d5-dcde-4b70-947b-1bb00faec0c2-00-3fhc9brd2jukf.worf.replit.dev', '3dac67cf-4769-4c62-a194-70a078286a6b-00-38p37ujcxhirs.picard.replit.dev', 'e12df2fc-3db6-4869-b3a3-5cfcf44d0483-00-11avg9qie5347.worf.replit.dev']
  }
});
