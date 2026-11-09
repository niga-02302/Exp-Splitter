const CACHE_NAME = 'tripsplit-shell-v4';
const CACHE_PREFIX = 'tripsplit-shell-';
const CORE_FILES = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './favicon-16.png', './favicon-32.png'
];
const INDEX_URL = new URL('./index.html', self.registration.scope).toString();

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  const isHtml = request.mode === 'navigate' || url.pathname.endsWith('/index.html');
  if (isHtml) {
    // Always ask GitHub Pages for the newest HTML first; use cached HTML only offline.
    event.respondWith(
      fetch(request, { cache: 'no-store' }).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(INDEX_URL, copy));
        }
        return response;
      }).catch(async () => {
        return (await caches.match(request)) || (await caches.match(INDEX_URL)) || Response.error();
      })
    );
    return;
  }

  // Cache-first for the app shell assets; the cache is replaced on each SW version.
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      if (response && response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }))
  );
});
