// Service worker: lưu sẵn khung web và dữ liệu Kinh Thánh để đọc khi không có mạng.
const VERSION = "__VERSION__";
const BASE = "__BASE__";
const SHELL = __SHELL__;
const SHELL_CACHE = "kt-shell-" + VERSION;
const PAGE_CACHE = "kt-pages-v1";
const DATA_CACHE = "kt-data-__DATAV__"; // đổi theo nội dung Kinh Thánh; app.js dùng chung tên này
const FONT_CACHE = "kt-fonts-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if ((k.startsWith("kt-shell-") && k !== SHELL_CACHE) || (k.startsWith("kt-data-") && k !== DATA_CACHE)) await caches.delete(k);
    await self.clients.claim();
  })());
});

async function cacheFirst(req, name) {
  const hit = await caches.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok || res.type === "opaque") (await caches.open(name)).put(req, res.clone());
  return res;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(cacheFirst(req, FONT_CACHE));
    return;
  }
  if (url.origin !== location.origin) return;

  if (url.pathname.startsWith(BASE + "data/")) {
    e.respondWith(cacheFirst(req, DATA_CACHE));
    return;
  }

  if (req.mode === "navigate") {
    // Trang: lấy mới khi có mạng, mất mạng thì dùng bản đã lưu, hoặc trang khung tự vẽ đoạn từ dữ liệu.
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        if (res.ok) (await caches.open(PAGE_CACHE)).put(req, res.clone());
        return res;
      } catch (err) {
        const hit = await caches.match(req, { ignoreSearch: true });
        if (hit) return hit;
        const shell = await caches.match(BASE + "doc/");
        return shell || Response.error();
      }
    })());
    return;
  }

  if (url.pathname.startsWith(BASE + "assets/")) {
    e.respondWith(cacheFirst(req, SHELL_CACHE));
  }
});
