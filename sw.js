// Service worker — offline app shell cache
const CACHE = 'tz-converter-v19';
const ASSETS = [
  './',
  './index.html',
  './app.js?v=19',
  './i18n.js?v=19',
  './cities-i18n.js?v=19',
  './zones.js?v=19',
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

// Caching strategy, per asset kind:
// - Navigations/index.html: network-first (no-store) so a new release shows up
//   on the next launch; cache fallback when offline.
// - Versioned assets (?v=N): cache-first — immutable per release, the URL
//   changes when the app updates, so re-downloading them every launch is waste.
// - Other static assets (icons, brand SVGs, manifest): stale-while-revalidate —
//   serve from cache instantly, refresh in the background.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // let cross-origin pass through

  const putCopy = (resp) => {
    const copy = resp.clone();
    caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
    return resp;
  };

  if (e.request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .then(putCopy)
        .catch(() => caches.match(e.request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  if (/(^|&)v=\d+/.test(url.search.slice(1))) {
    e.respondWith(
      caches.match(e.request).then((cached) => cached || fetch(e.request).then(putCopy))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fresh = fetch(e.request).then(putCopy).catch(() => cached);
      return cached || fresh;
    })
  );
});
