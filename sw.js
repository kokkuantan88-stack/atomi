// Atomi service worker: lets the app install on phones and open without internet.
// Pages and scripts: try the network first (so updates show up straight away), fall back to the saved copy offline.
// Fonts and the Supabase library: use the saved copy and refresh it in the background.
// Supabase data and log-in requests are never cached.
const VERSION = "atomi-v1";
const SHELL = ["/", "/index.html", "/questions.js", "/lessons.js", "/lower.js", "/extra.js", "/arcade.js", "/story.js", "/supabase.js",
  "/atomi-hero.png", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/apple-touch-icon.png", "/icons/favicon-64.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(url.hostname.endsWith("supabase.co")) return;
  const sameOrigin = url.origin === self.location.origin;
  const saved = /fonts\.(googleapis|gstatic)\.com$|cdn\.jsdelivr\.net$/.test(url.hostname);
  if(sameOrigin){
    e.respondWith(fetch(req).then(res => {
      if(res.ok) caches.open(VERSION).then(c => c.put(req, res.clone()));
      return res;
    }).catch(() => caches.match(req, {ignoreSearch:true}).then(r => r || (req.mode === "navigate" ? caches.match("/index.html") : Response.error()))));
  } else if(saved){
    e.respondWith(caches.open(VERSION).then(c => c.match(req).then(hit => {
      const fresh = fetch(req).then(res => { if(res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || fresh;
    })));
  }
});
