import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

// Dynamic version derived from git commit count & hash
let gitCommitCount = '';
let gitCommitHash  = '';
try {
  gitCommitCount = execSync('git rev-list --count HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  gitCommitHash  = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
} catch (_) {}

const baseVersion = (pkg.version || '3.0.0').split('.').slice(0, 2).join('.');
const dynamicAppVersion = gitCommitCount && gitCommitCount !== '0'
  ? `${baseVersion}.${gitCommitCount}`
  : (pkg.version || '3.0.0');

const buildTimestamp = new Date().toISOString();

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

  esbuild: {
    drop: ['console', 'debugger'],
  },

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'assets/logo.png',
        'assets/logo-thermal.png',
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
            purpose: 'any',
          },
          {
            src: 'assets/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'assets/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'assets/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
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
    __APP_VERSION__:     JSON.stringify(dynamicAppVersion),
    __GIT_HASH__:        JSON.stringify(gitCommitHash),
    __BUILD_TIMESTAMP__: JSON.stringify(buildTimestamp),
  },
});
