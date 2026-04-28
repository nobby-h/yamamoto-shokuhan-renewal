import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        service: resolve(__dirname, 'service.html'),
        serviceUnsou: resolve(__dirname, 'service/unsou.html'),
        serviceJinzai: resolve(__dirname, 'service/jinzai.html'),
        serviceJidousha: resolve(__dirname, 'service/jidousha.html'),
        recruit: resolve(__dirname, 'recruit.html'),
        news: resolve(__dirname, 'news.html'),
        contact: resolve(__dirname, 'contact.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
