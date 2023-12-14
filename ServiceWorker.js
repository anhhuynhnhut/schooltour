const cacheName = "DefaultCompany-SchoolTour-0.1";
const contentToCache = [
    "Build/shcooltour.loader.js",
    "Build/3715cd07ed2f07863eccf720882d3a5c.js",
    "Build/7c13bfda805d4b36ffdeaea0fbdbd955.data",
    "Build/89273bf7449becae58c1a2fbeed44512.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
