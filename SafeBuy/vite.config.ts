import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 프론트에서 /api 로 보내면 ↓ 실제 서버엔 / 로 전달
      '/api': {
        target: 'https://dontrecallme.shop',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // ← /api prefix 제거
      },
    },
  },
});
