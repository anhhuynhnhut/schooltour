const cacheName = "DefaultCompany-SchoolTour-0.1";
const contentToCache = [
    "Build/shcooltour.loader.js",
    "Build/244106bdbae6a0cbead1e5b74e9f9507.js",
    "Build/498c5384a56c8aa9f101b8630024f118.data",
    "Build/1660f46c1c72cbfa3e61b466a5667702.wasm",
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
