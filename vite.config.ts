import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    setupFiles: ['./src/mocks/setupTest.ts'],
    environment: 'happy-dom',
    globals: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
