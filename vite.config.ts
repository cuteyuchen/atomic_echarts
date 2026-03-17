import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  root: 'example',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'atomic-echarts': path.resolve(__dirname, 'src/index.ts'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
