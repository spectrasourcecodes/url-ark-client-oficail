// public/service-worker.js

const CACHE_NAME = 'ArkInvestX1-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.jpeg',
  '/icons/icon-512x512.jpeg',
];

self.addEventListener("install", (event) => {
  console.log("SW Installed");

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("SW Activated");

  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        return cached || fetch(event.request);
      })
      .catch(() => caches.match("/"))
  );
});