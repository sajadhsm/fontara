import { defineConfig, UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

import { r, port, isDev } from './scripts/utils'

export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`
    }
  },
  plugins: [Vue()],
  optimizeDeps: {
    include: ['vue', 'webextension-polyfill']
  }
}

export default defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === 'serve' ? `http://localhost:${port}/` : '/dist/',
  server: {
    port,
    hmr: {
      host: 'localhost'
    }
  },
  build: {
    outDir: r('extension/dist'),
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    minify: 'terser',
    terserOptions: {
      mangle: false
    },
    rollupOptions: {
      input: {
        popup: r('src/popup/index.html'),
        options: r('src/options/index.html'),
        background: r('src/background/index.html')
      }
    }
  }
}))
