const CACHE_NAME = 'blue-mountain-v2.1.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './receipt-data.html',
  './manifest.json',
  './css/main.css',
  './css/dock.css',
  './css/pos.css',
  './css/modals.css',
  './js/app.js',
  './js/store.js',
  './js/db.js',
  './js/printer.js',
  './js/receipt.js',
  './js/views/pos.js',
  './js/views/products.js',
  './js/views/transactions.js',
  './js/views/reports.js',
  './js/views/settings.js',
  './js/views/modals.js',
  './js/utils/currency.js',
  './js/utils/date.js',
  './assets/logo.jpeg',
  './assets/logo.png',
  './assets/logo_icon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
];

// Install: cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
