// Agro Plus Service Worker v5 — minimal, safe, cannot cause blank pages
// Strategy: network-only for everything except images (which get cached).
// JS/CSS assets: returned directly to network — browser HTTP cache handles them.
// HTML navigation: network-only, no caching of index.html in SW.

const CACHE = "agro-plus-img-v5";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const { request } = e;
  const url = new URL(request.url);

  // ── Only handle same-origin GET requests ────────────────────────────────
  if (request.method !== "GET") return;
  if (url.origin !== location.origin) return;

  // ── API: always network, never SW-cached ────────────────────────────────
  if (url.pathname.startsWith("/api/")) return;

  // ── JS / CSS / fonts: pure network pass-through ─────────────────────────
  // Do NOT call e.respondWith() — let the browser handle it natively.
  // This avoids the "MIME type text/html" error that happens when a cached
  // index.html is returned instead of a JS chunk.
  if (/\.(js|mjs|css|woff2?|ttf|otf|eot)(\?.*)?$/i.test(url.pathname)) {
    return; // browser handles it
  }

  // ── Images: cache-first with network fallback ────────────────────────────
  if (/\.(png|jpg|jpeg|webp|gif|svg|ico)(\?.*)?$/i.test(url.pathname)) {
    e.respondWith(
      caches.open(CACHE).then(async cache => {
        const cached = await cache.match(request);
        if (cached) return cached;
        const fresh = await fetch(request);
        if (fresh.ok) cache.put(request, fresh.clone());
        return fresh;
      }).catch(() => fetch(request))
    );
    return;
  }

  // ── HTML navigation (page loads / reloads) ───────────────────────────────
  // IMPORTANT: network-only, no e.respondWith fallback to cached index.html.
  // When you reload /cheque-book/create, Express serves index.html correctly.
  // If Express is not running, you get a normal browser network error — not a
  // white blank page from a stale SW cache.
  if (request.mode === "navigate") {
    return; // browser fetches from Express directly — no SW involvement
  }

  // ── Everything else: network pass-through ────────────────────────────────
  return;
});