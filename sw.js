const CACHE = 'farsi-app-v8';

const ASSETS = [
  './',
  './index.html',
  './manifest.json?v=2',
  './css/style.css?v=5',
  './js/french_data.js?v=2',
  './js/spanish_data.js?v=1',
  './grammar-data-farsi.js',
  './js/data.js?v=2',
  './js/lessons.js?v=3',
  './js/french_lessons.js?v=1',
  './js/spanish_lessons.js?v=1',
  './js/srs.js?v=2',
  './js/flashcard.js?v=3',
  './js/vocab.js?v=2',
  './js/grammar.js?v=3',
  './js/phrases.js?v=2',
  './js/alphabet.js?v=2',
  './js/streak.js?v=2',
  './js/app.js?v=4',
  './js/exercises_levels.js?v=1',
  './js/exercises_ui.js?v=1',
  './js/install-prompt.js?v=1',
  './fonts/Playfair_9pt_SemiCondensed-Black.ttf',
  './fonts/Playfair_9pt_SemiCondensed-Regular.ttf',
  './fonts/Playfair_9pt_SemiCondensed-Light.ttf',
  './fonts/Playfair_9pt-Medium.ttf',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
