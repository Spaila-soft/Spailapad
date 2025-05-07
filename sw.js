const CACHE_NAME = "Spailãpad data";
const FILES_TO_CACHE = [
  " /",
  "/index.html",
  
  
  
  " /manifest.json",
  "  /css/bootstrap.min.css",
  "  /js/bootstrap.bundle.js",
  "  /songs/s1.m4a",
  "  /songs/s2.m4a",
  "  /songs/s3.m4a",
  "  /songs/s4.m4a",
  "  /songs/s5.m4a",
  "  /background.gif",
  "  /Spailã.png",
  " /Spailãpad.png"
  
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
});