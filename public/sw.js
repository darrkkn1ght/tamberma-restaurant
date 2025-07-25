// Tamberma Restaurant Service Worker - Enhanced Version

const CACHE_NAME = 'tamberma-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html',
  // Logo & Gallery
  '/images/logo/tamberma-logo.png',
  '/images/logo/tamberma-icon.svg',
  '/images/logo/tamberma-logo-white.png',
  '/images/gallery/hero-bg.jpg',
  '/images/gallery/ambiance-1.jpg',
  '/images/gallery/ambiance-2.jpg',
  '/images/gallery/cocktails-1.jpg',
  '/images/gallery/food-1.jpg',
  '/images/gallery/outdoor.jpg',
  // Menu images
  '/images/menu/bar-menu-1.jpg',
  '/images/menu/bar-menu-2.jpg',
  '/images/menu/bar-menu-3.jpg',
  '/images/menu/bar-menu-4.jpg',
  '/images/menu/indian-menu-1.jpg',
  '/images/menu/indian-menu-2.jpg',
  // UI overlay
  '/images/ui/hero-overlay.png',
];

// Install: cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fallback to network, fallback to offline page for navigation
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    // Handle navigation requests (HTML pages)
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If we get a valid response, update the cache
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() =>
          caches.match(event.request).then((cached) =>
            cached || caches.match('/offline.html')
          )
        )
    );
    return;
  }

  // For other requests (images, CSS, etc.)
  event.respondWith(
    caches.match(event.request).then((response) =>
      response || fetch(event.request).catch(() => undefined)
    )
  );
}); 