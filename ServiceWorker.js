const cacheName = "DefaultCompany-SchoolTour-0.1";
const contentToCache = [
    "Build/shcooltour.loader.js",
    "Build/244106bdbae6a0cbead1e5b74e9f9507.js",
    "Build/720cbb74e9990ef2492dade2cbe5f8a6.data",
    "Build/89c8173408683ccaf9e8c4e0967bdda7.wasm",
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
