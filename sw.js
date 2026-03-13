// MesReçus — Service Worker
// Cache-first pour fonctionner hors-ligne

const CACHE_NAME = 'mesrecus-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap'
];

// Installation : mise en cache des assets statiques
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(err => {
        // Si les fonts Google ne sont pas dispo (hors-ligne), on continue quand même
        console.warn('Certains assets non mis en cache :', err);
        return cache.addAll(['./index.html', './manifest.json']);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activation : suppression des vieux caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch : cache-first pour les assets locaux, network-first pour l'API Freebox
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // API Freebox → toujours réseau (pas de cache)
  if (url.hostname.includes('fbxos.fr') || url.pathname.includes('/api/')) {
    return; // laisse passer sans interception
  }

  // Google Fonts → stale-while-revalidate
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          const networkFetch = fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached);
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // Assets locaux → cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Ne pas cacher les erreurs
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      });
    })
  );
});

// Notification de mise à jour disponible
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
