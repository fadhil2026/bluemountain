import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

export default defineConfig({
  // GitHub Pages: repo name is "KASIR" (adjust if different)
  // If deployed at https://user.github.io/KASIR/ → base: '/KASIR/'
  // If deployed at root custom domain → base: '/'
  base: './',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-chart': ['chart.js'],
          'vendor-pdf':   ['jspdf', 'html2canvas'],
          'vendor-db':    ['dexie'],
        },
      },
    },
  },

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'assets/logo.png',
        'assets/logo.jpeg',
        'assets/logo_icon.png',
        'assets/icons/icon-192.png',
        'assets/icons/icon-512.png',
        'favicon.ico',
      ],
      manifest: {
        name: 'Blue Mountain Refilling Station',
        short_name: 'Blue Mountain',
        description: 'Sistem Kasir POS — Blue Mountain Refilling Station',
        theme_color: '#1e3a8a',
        background_color: '#eff6ff',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: './',
        lang: 'id',
        categories: ['business', 'productivity'],
        icons: [
          {
            src: 'assets/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'assets/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpeg,jpg,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],

  define: {
    __APP_VERSION__: JSON.stringify(pkg.version || '2.0.0'),
    __BUILD_TIME__:   JSON.stringify(new Date().toISOString()),
  },
});
