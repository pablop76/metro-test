/* eslint-disable no-restricted-globals */

const SHELL_CACHE = 'metro-quiz-shell-v2';
const STATIC_CACHE = 'metro-quiz-static-v2';
const BASE = self.location.pathname.replace(/\/service-worker\.js$/, '');

const SHELL_URLS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
  `${BASE}/questions.json`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const keep = [SHELL_CACHE, STATIC_CACHE];
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => !keep.includes(n)).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  const isStaticAsset = /\.(js|css|woff2?|ttf|eot)$/.test(url.pathname);
  const isImage = /\.(png|jpe?g|gif|svg|ico|webp)$/.test(url.pathname);
  const isNavigation = request.mode === 'navigate';

  if (isStaticAsset) {
    // Cache-first: haszowane pliki JS/CSS są immutable
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then((hit) => {
          if (hit) return hit;
          return fetch(request).then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }

  if (isImage) {
    // Cache-first dla obrazków pytań
    event.respondWith(
      caches.open(SHELL_CACHE).then((cache) =>
        cache.match(request).then((hit) => {
          if (hit) return hit;
          return fetch(request).then((res) => {
            if (res.ok) cache.put(request, res.clone());
            return res;
          });
        })
      )
    );
    return;
  }

  if (isNavigation) {
    // Network-first dla HTML, fallback do shell
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok) {
            caches.open(SHELL_CACHE).then((cache) => cache.put(request, res.clone()));
          }
          return res;
        })
        .catch(() => caches.match(`${BASE}/index.html`))
    );
    return;
  }

  // Network-first z cache fallback (questions.json i inne)
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          caches.open(SHELL_CACHE).then((cache) => cache.put(request, res.clone()));
        }
        return res;
      })
      .catch(() => caches.match(request))
  );
});
