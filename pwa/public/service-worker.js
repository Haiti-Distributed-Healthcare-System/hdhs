// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = ['./offline.html', './app.js'];

self.addEventListener('install', event => {
  const cache = await caches.open('test-static');
  cache.addAll(FILES_TO_CACHE);
});

self.addEventListener('fetch', event => {
  event.respondWith(checkCache(event.request));
});

async function checkCache(req){
  const cacheResponse = await caches.match(req);
  return cacheResponse || fetch(req);
}
