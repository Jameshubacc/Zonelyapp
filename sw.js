// Service worker — offline app shell cache
const CACHE = 'tz-converter-v6';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './zones.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/favicon-16.png',
  './brand/zonely-mark-transparent.svg',
  './brand/timeofday/zonely-time-morning.svg',
  './brand/timeofday/zonely-time-afternoon.svg',
  './brand/timeofday/zonely-time-evening.svg',
  './brand/timeofday/zonely-time-night.svg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first: always serve the freshest version when online, so updates
// apply immediately; fall back to cache only when offline.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // let cross-origin pass through

  e.respondWith(
    fetch(e.request)
      .then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return resp;
      })
      .catch(() => caches.match(e.request).then((cached) => cached || caches.match('./index.html')))
  );
});
