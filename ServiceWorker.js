const cacheName = "DefaultCompany-SchoolTour-0.1";
const contentToCache = [
    "Build/shcooltour.loader.js",
    "Build/5d5da081feb1ad93a81367a2019ef65f.js",
    "Build/225a27131421a9673b0b77c167981993.data",
    "Build/c62a8e54b91a4d83ccb0ca1b08f52680.wasm",
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
