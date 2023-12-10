const cacheName = "DefaultCompany-SchoolTour-0.1";
const contentToCache = [
    "Build/shcooltour.loader.js",
    "Build/ef21f3d45ee7a44c9748f9bc63cf3f0c.js",
    "Build/a82844b7a21e0df34ff9b5f6e1262f64.data",
    "Build/bb991228f77b472e987c1fd846b9722e.wasm",
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
