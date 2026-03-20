const CACHE_VERSION = '3';
const CACHE_NAME = `portfolio-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `portfolio-dynamic-v${CACHE_VERSION}`;
const MAX_DYNAMIC_CACHE_SIZE = 50;

const STATIC_ASSETS = [
  '/favicon.svg',
  '/apple-touch-icon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/og-image.png',
  '/fr/',
  '/offline.html',
];

// Install: pre-cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== DYNAMIC_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Trim dynamic cache to MAX_DYNAMIC_CACHE_SIZE entries (evict oldest)
async function trimCache(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxSize) {
    await cache.delete(keys[0]);
    if (keys.length - 1 > maxSize) {
      await trimCache(cacheName, maxSize);
    }
  }
}

// Fetch strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and external requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Skip admin and API routes
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api')) return;

  // HTML pages: network-first with cache fallback, then offline fallback
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, clone);
            trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
          });
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          // Offline fallback
          const offlinePage = await caches.match('/offline.html');
          return offlinePage || new Response('Offline', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
          });
        })
    );
    return;
  }

  // Static assets (CSS, JS, fonts, images): cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Only cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, clone);
            trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE_SIZE);
          });
        }
        return response;
      });
    })
  );
});
