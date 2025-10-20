// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  
  base: mode === 'production' ? '/' : '/',

  css: {
    devSourcemap: true, // Allow source maps in dev
  },


  build: {
    sourcemap: true, // Enables source maps in production for JS and CSS
    minify: 'esbuild', // default, but can be turned off temporarily
    // minify: false, // uncomment this temporarily to debug CSS issues
  },
}));
