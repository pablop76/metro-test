/* eslint-disable no-restricted-globals */

// Numer wersji podbijamy przy KAZDEJ zmianie tego pliku lub tresci pytan —
// przy aktywacji kasowane sa wszystkie cache spoza listy `keep`, wiec bump
// wymusza pobranie swiezej bazy zamiast wyswietlania starej z pamieci.
const SHELL_CACHE = 'metro-quiz-shell-v3';
const STATIC_CACHE = 'metro-quiz-static-v3';
const BASE = self.location.pathname.replace(/\/service-worker\.js$/, '');

const QUESTIONS_URL = `${BASE}/questions.json`;

const SHELL_URLS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
  QUESTIONS_URL,
];

// GitHub Pages oddaje questions.json z naglowkiem max-age=600, wiec zwykly
// fetch() moglby przez 10 minut siegac do cache przegladarki i podawac baze
// sprzed poprawki. Dla pliku z pytaniami zawsze omijamy ten cache — kopia
// w cache service workera zostaje wylacznie jako zapas na tryb offline.
const fetchFresh = (request) => fetch(new Request(request.url, { cache: 'no-store' }));

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      Promise.all(
        SHELL_URLS.map((url) =>
          fetch(new Request(url, { cache: 'no-store' }))
            .then((res) => (res.ok ? cache.put(url, res) : null))
            .catch(() => null)
        )
      )
    )
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
            // Kopia robiona od razu — caches.open() jest asynchroniczne,
            // a odpowiedz moze byc juz przeczytana, zanim callback wystartuje
            const copy = res.clone();
            caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
          }
          return res;
        })
        .catch(() => caches.match(`${BASE}/index.html`))
    );
    return;
  }

  // Network-first z cache fallback (questions.json i inne).
  // Baza pytan idzie zawsze prosto do sieci — patrz komentarz przy fetchFresh.
  const isQuestions = url.pathname === QUESTIONS_URL;
  event.respondWith(
    (isQuestions ? fetchFresh(request) : fetch(request))
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((cache) => cache.put(request, copy));
        }
        return res;
      })
      .catch(() => caches.match(request))
  );
});
