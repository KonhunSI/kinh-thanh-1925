// Sinh toàn bộ web tĩnh Kinh Thánh 1925 vào thư mục dist/.
// Chạy: node build.mjs   (biến môi trường: BASE="/kinh-thanh-1925/", SITE="https://example.com/kinh-thanh-1925")
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { BOOKS, NT, SLUGS, INTRO, fold } from "./src/books.mjs";
import { VOD_DAYS, VOD_SPECIAL, TET } from "./src/vod.mjs";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(ROOT, "dist");
const BASE = (process.env.BASE || "/").replace(/\/?$/, "/");
const SITE = (process.env.SITE || "http://localhost:8080").replace(/\/$/, "");
const SITE_NAME = "Kinh Thánh 1925";

// ---------- dữ liệu ----------
const DATA = BOOKS.map((_, i) => JSON.parse(fs.readFileSync(path.join(ROOT, "data", `b${String(i + 1).padStart(2, "0")}.json`), "utf8")));
const CHS = DATA.map((b) => b.length);
const TOTAL_CH = CHS.reduce((a, b) => a + b, 0);
const TOTAL_V = DATA.reduce((a, b) => a + b.reduce((x, c) => x + c.length, 0), 0);

// ---------- tiện ích ----------
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const u = (p = "") => BASE + p; // đường dẫn trong site
const abs = (p = "") => SITE + "/" + p; // đường dẫn tuyệt đối (canonical, sitemap)
const chPath = (b, c) => `${SLUGS[b]}/${c}/`;
const bookPath = (b) => `${SLUGS[b]}/`;
const clip = (s, n = 155) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)) + "…");
function write(rel, content) {
  const f = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
}

// ---------- tài nguyên dùng chung ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const css = fs.readFileSync(path.join(ROOT, "src/style.css"), "utf8");
const DATAV = crypto.createHash("sha1").update(JSON.stringify(DATA)).digest("hex").slice(0, 8);
// Ảnh nền câu gốc: src/vod-img/<khóa>.jpg (khóa: 01-01 … 12-31, 02-29, GOODFRI, EASTER, PENTECOST, TET1–3)
const VOD_IMG_DIR = path.join(ROOT, "src/vod-img");
const VODIMG = fs.existsSync(VOD_IMG_DIR) ? fs.readdirSync(VOD_IMG_DIR).filter((f) => /\.(jpe?g|webp)$/i.test(f)).sort() : [];
const META = { BASE, NT, CHS, VOD_DAYS, VOD_SPECIAL, TET, VODIMG, BOOKS, SLUGS, DATAV };
const js = fs.readFileSync(path.join(ROOT, "src/app.js"), "utf8").replace("/*@META@*/", `const META=${JSON.stringify(META)};`);
const hash = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 8);
const CSS_V = hash(css), JS_V = hash(js);
const VERSION = hash(css + js + TOTAL_V + BASE + DATAV);
write("assets/style.css", css);
write("assets/app.js", js);
for (const f of fs.readdirSync(path.join(ROOT, "src/static"))) fs.copyFileSync(path.join(ROOT, "src/static", f), path.join(OUT, "assets", f));
for (const f of VODIMG) { fs.mkdirSync(path.join(OUT, "assets/vod"), { recursive: true }); fs.copyFileSync(path.join(VOD_IMG_DIR, f), path.join(OUT, "assets/vod", f)); }
for (let i = 0; i < 66; i++) write(`data/b${String(i + 1).padStart(2, "0")}.json`, JSON.stringify(DATA[i]));

const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></symbol>
<symbol id="i-book" viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z"/><path d="M4 19a2 2 0 0 1 2-2h13"/><path d="M9 7h6"/></symbol>
<symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></symbol>
<symbol id="i-saved" viewBox="0 0 24 24"><path d="M7 3h10v18l-5-4-5 4V3Z"/></symbol>
<symbol id="i-aa" viewBox="0 0 24 24"><path d="M3 18 8 6l5 12M4.6 14h6.8"/><path d="M15 18c0-2 1-3 3-3s3 1 3 3v-5c0-1.5-1-2.5-3-2.5-1 0-2 .4-2.6 1"/></symbol>
<symbol id="i-head" viewBox="0 0 24 24"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/></symbol>
<symbol id="i-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
<symbol id="i-left" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></symbol>
<symbol id="i-right" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></symbol>
<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></symbol>
<symbol id="i-note" viewBox="0 0 24 24"><path d="M5 4h14v12l-4 4H5V4Z"/><path d="M15 20v-4h4M9 9h6M9 13h4"/></symbol>
<symbol id="i-copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></symbol>
<symbol id="i-image" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/></symbol>
<symbol id="i-play" viewBox="0 0 24 24"><path d="M7 4v16l13-8L7 4Z"/></symbol>
<symbol id="i-pause" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></symbol>
<symbol id="i-stop" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1.5"/></symbol>
<symbol id="i-trash" viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></symbol>
</svg>`;
const ic = (id, extra = "") => `<svg class="icon"${extra}><use href="#i-${id}"/></svg>`;

// Áp dụng cỡ chữ / giao diện trước khi vẽ trang để không bị chớp.
const PREF_SCRIPT = `<script>try{var p=JSON.parse(localStorage.getItem("kt1925")||"{}"),d=document.documentElement;if(p.theme&&p.theme!=="auto")d.setAttribute("data-theme",p.theme);if(p.size)d.style.setProperty("--read-size",p.size+"px");if(p.fam==="sans")d.classList.add("sans");if(p.lay==="lines")d.classList.add("lines")}catch(e){}</script>`;

function layout({ title, desc, canonical, page, tab, body, head = "", noindex = false, pick = null, data = {}, wide = false }) {
  const dataAttrs = Object.entries(data).map(([k, v]) => ` data-${k}="${esc(v)}"`).join("");
  const tabs = [["today", "", "sun", "Hôm nay"], ["read", "muc-luc/", "book", "Đọc"], ["search", "tim-kiem/", "search", "Tìm kiếm"], ["saved", "da-luu/", "saved", "Đã lưu"]];
  return `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${canonical != null ? `<link rel="canonical" href="${esc(abs(canonical))}">` : ""}
${noindex ? `<meta name="robots" content="noindex">` : ""}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:locale" content="vi_VN">
${canonical != null ? `<meta property="og:url" content="${esc(abs(canonical))}">` : ""}
<meta property="og:image" content="${esc(abs("assets/og.png"))}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F3F4F1" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#13161B" media="(prefers-color-scheme: dark)">
<link rel="manifest" href="${u("manifest.webmanifest")}">
<link rel="icon" href="${u("assets/icon.svg")}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${u("assets/icon-180.png")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;0,7..72,600;1,7..72,400&display=swap">
<link rel="stylesheet" href="${u("assets/style.css")}?v=${CSS_V}">
${PREF_SCRIPT}
${head}
</head>
<body data-page="${page}"${dataAttrs}>
<a class="skip" href="#main">Bỏ qua, đến nội dung</a>
${SPRITE}
<header class="top"><div class="wrap wide">
${pick ? `<a class="brand desk" href="${u()}"><span class="ribbon" aria-hidden="true"></span><span>Kinh Thánh <small>1925</small></span></a>` : ""}
${pick
  ? `<button class="pick" id="pickBtn" aria-haspopup="dialog"><span>${esc(pick)}</span>${ic("down", ' style="width:16px;height:16px"')}</button>
<button class="ibtn" id="listenBtn" title="Nghe đọc đoạn này" aria-label="Nghe đọc đoạn này" aria-pressed="false">${ic("head")}</button>`
  : `<a class="brand" href="${u()}"><span class="ribbon" aria-hidden="true"></span><span>Kinh Thánh <small>1925</small></span></a>
<button class="ibtn" id="pickBtn" title="Chọn sách" aria-label="Chọn sách" aria-haspopup="dialog">${ic("book")}</button>`}
<nav class="topnav" aria-label="Chính">${tabs.map(([k, href, icon, label]) => `<a href="${u(href)}" data-tab="${k}"${tab === k ? ' aria-current="page"' : ""}>${label}</a>`).join("")}</nav>
<button class="ibtn" id="aaBtn" title="Cỡ chữ và giao diện" aria-label="Cỡ chữ và giao diện" aria-haspopup="dialog">${ic("aa")}</button>
</div></header>
<main id="main" class="wrap${wide ? " wide" : ""}">
${body}
</main>
<div class="dock"><div class="wrap">
  <div class="bar player" id="player" hidden>
    <button class="ibtn" id="pPause" aria-label="Tạm dừng">${ic("pause")}</button>
    <div class="info"><b id="pTitle">Đang đọc</b><span class="muted" id="pSub">Chuẩn bị…</span></div>
    <select id="pRate" aria-label="Tốc độ đọc"><option value="0.8">0.8×</option><option value="1">1×</option><option value="1.2">1.2×</option><option value="1.4">1.4×</option></select>
    <button class="ibtn" id="pStop" aria-label="Dừng đọc">${ic("stop")}</button>
  </div>
  <div class="bar selbar" id="selbar" hidden>
    <div class="row">
      <div class="colors" role="group" aria-label="Tô màu">
        <button class="color" style="background:var(--h-y)" data-c="y" aria-label="Tô vàng"></button>
        <button class="color" style="background:var(--h-g)" data-c="g" aria-label="Tô xanh lá"></button>
        <button class="color" style="background:var(--h-b)" data-c="b" aria-label="Tô xanh dương"></button>
        <button class="color" style="background:var(--h-p)" data-c="p" aria-label="Tô hồng"></button>
        <button class="color" style="background:var(--h-v)" data-c="v" aria-label="Tô tím"></button>
        <button class="color none" data-c="" aria-label="Bỏ tô màu">${ic("x")}</button>
      </div>
      <button class="ibtn" id="selClose" aria-label="Bỏ chọn">${ic("x")}</button>
    </div>
    <div class="acts">
      <button id="aNote">${ic("note")}Ghi chú</button>
      <button id="aBm">${ic("saved")}<span id="aBmLabel">Đánh dấu</span></button>
      <button id="aCopy">${ic("copy")}Sao chép</button>
      <button id="aImg">${ic("image")}Ảnh chia sẻ</button>
      <button id="aListen">${ic("play")}Nghe từ đây</button>
    </div>
  </div>
</div></div>
<nav class="tabs" aria-label="Chính"><div class="wrap">
${tabs.map(([k, href, icon, label]) => `<a href="${u(href)}" data-tab="${k}"${tab === k ? ' aria-current="page"' : ""}>${ic(icon)}${label}</a>`).join("\n")}
</div></nav>
<dialog id="dPick"><div class="dlg">
  <div class="dlg-head"><button class="ibtn" id="pickBack" aria-label="Quay lại danh sách sách" hidden>${ic("left")}</button><h3 id="pickTitle">Chọn sách</h3><button class="ibtn" data-close aria-label="Đóng">${ic("x")}</button></div>
  <div class="dlg-body" id="pickBody"></div>
</div></dialog>
<dialog id="dAa"><div class="dlg">
  <div class="dlg-head"><h3>Cỡ chữ và giao diện</h3><button class="ibtn" data-close aria-label="Đóng">${ic("x")}</button></div>
  <div class="dlg-body">
    <label class="field" for="fs"><span>Cỡ chữ: <b id="fsVal">19</b></span><input type="range" id="fs" min="15" max="28" step="1" value="19"></label>
    <div class="field"><span>Kiểu chữ</span><div class="seg" id="segFam"><button data-v="serif">Có chân</button><button data-v="sans">Không chân</button></div></div>
    <div class="field"><span>Trình bày</span><div class="seg" id="segLay"><button data-v="flow">Liền đoạn</button><button data-v="lines">Mỗi câu một dòng</button></div></div>
    <div class="field"><span>Giao diện</span><div class="seg" id="segTheme"><button data-v="auto">Tự động</button><button data-v="light">Sáng</button><button data-v="dark">Tối</button></div></div>
    <div class="field"><span>Đọc khi không có mạng</span><div class="row"><button class="btn" id="offlineBtn">Tải toàn bộ Kinh Thánh (khoảng 5 MB)</button></div><span class="small muted" id="offlineMsg" style="font-weight:400"></span></div>
    <p class="small muted" style="margin:0">Văn bản: Kinh Thánh bản Truyền Thống 1925 (Tân Ước 1923, Cựu Ước 1925), thuộc phạm vi công cộng.</p>
  </div>
</div></dialog>
<dialog id="dNote"><div class="dlg">
  <div class="dlg-head"><h3 id="noteTitle">Ghi chú</h3><button class="ibtn" data-close aria-label="Đóng">${ic("x")}</button></div>
  <div class="dlg-body"><p id="noteVerse" style="font-family:var(--f-text);margin:0 0 12px;line-height:1.55"></p><label class="sr" for="noteText">Nội dung ghi chú</label><textarea id="noteText" placeholder="Điều Chúa dạy tôi qua câu này…"></textarea></div>
  <div class="dlg-foot"><button class="btn ghost" id="noteDel">Xóa ghi chú</button><button class="btn primary" id="noteSave">Lưu</button></div>
</div></dialog>
<dialog id="dImg"><div class="dlg">
  <div class="dlg-head"><h3>Ảnh câu Kinh Thánh</h3><button class="ibtn" data-close aria-label="Đóng">${ic("x")}</button></div>
  <div class="dlg-body"><img id="shareImg" class="share-img" alt=""></div>
  <div class="dlg-foot"><button class="btn" id="imgSave">Tải ảnh về</button><button class="btn primary" id="imgShare" hidden>Chia sẻ</button></div>
</div></dialog>
<div class="toast" id="toast" role="status" hidden></div>
<script src="${u("assets/app.js")}?v=${JS_V}" defer></script>
</body>
</html>
`;
}

const breadcrumbLd = (items) => `<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(p) })),
})}</script>`;

const bookList = (from, to, cls = "") => `<ul class="books">${BOOKS.slice(from, to).map(([n], j) => `<li><a href="${u(bookPath(from + j))}"${cls}>${esc(n)}</a></li>`).join("")}</ul>`;
const testament = (b) => (b < NT ? "Cựu Ước" : "Tân Ước");

// ---------- trang chủ ----------
{
  const [vb, vc, vv] = VOD_DAYS["01-01"];
  const vt = DATA[vb - 1][vc - 1][vv - 1].replace(/^\(\d+:\d+\)\s*/, "");
  const body = `
<div class="home"><div class="home-main">
<div class="date" id="todayDate">Kinh Thánh bản Truyền Thống 1925</div>
<article class="vod" aria-label="Câu gốc hôm nay"><div class="vod-img" id="vodImgBox" hidden></div><div class="label" id="vodLabel">Câu gốc hôm nay</div>
<blockquote id="vodText">${esc(vt)}</blockquote><cite id="vodRef">${esc(BOOKS[vb - 1][0])} ${vc}:${vv}</cite>
<div class="row"><a class="btn" id="vodRead" href="${u(chPath(vb - 1, vc))}#v${vv}">Đọc cả đoạn</a><button class="btn ghost" id="vodImg">${ic("image")}Ảnh chia sẻ</button><button class="btn ghost" id="vodCopy">${ic("copy")}Sao chép</button></div></article>
<a class="continue" id="contBtn" href="${u(chPath(0, 1))}">${ic("book", ' style="color:var(--accent)"')}<span><span class="small muted">Bắt đầu đọc</span><b>Sáng Thế Ký 1</b></span></a>
<div class="section" id="planBox"></div>
</div><div class="home-side">
<section class="section toc" aria-labelledby="toc">
<h2 id="toc">Mục lục</h2>
<p class="lead">${TOTAL_CH.toLocaleString("vi-VN")} đoạn, ${TOTAL_V.toLocaleString("vi-VN")} câu, theo bản dịch Truyền Thống 1925.</p>
<h3 class="label" style="margin-top:20px">Cựu Ước · 39 sách</h3>${bookList(0, NT)}
<h3 class="label" style="margin-top:20px">Tân Ước · 27 sách</h3>${bookList(NT, 66)}
</section>
<section class="section" aria-labelledby="about">
<h2 id="about">Về bản dịch này</h2>
<p class="lead">Bản Truyền Thống 1925 là bản Kinh Thánh tiếng Việt quen thuộc với nhiều thế hệ tín hữu Tin Lành. Tân Ước in lần đầu năm 1923 tại Hà Nội, trọn bộ Kinh Thánh in năm 1925–1926. Văn bản đã thuộc phạm vi công cộng.</p>
</section>
</div></div>`;
  write("index.html", layout({
    title: "Kinh Thánh 1925 – Bản Truyền Thống, đọc trực tuyến",
    desc: "Đọc Kinh Thánh tiếng Việt bản Truyền Thống 1925: 66 sách, tìm kiếm có và không dấu, tô màu, ghi chú, kế hoạch đọc, câu gốc mỗi ngày, nghe đọc và đọc khi không có mạng.",
    canonical: "", page: "home", tab: "today", body, wide: true,
    head: `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: abs(""), inLanguage: "vi", potentialAction: { "@type": "SearchAction", target: abs("tim-kiem/") + "?q={search_term_string}", "query-input": "required name=search_term_string" } })}</script>`,
  }));
}

// ---------- mục lục ----------
write("muc-luc/index.html", layout({
  title: "Mục lục 66 sách – Kinh Thánh 1925",
  desc: "Danh sách 39 sách Cựu Ước và 27 sách Tân Ước trong Kinh Thánh bản Truyền Thống 1925.",
  canonical: "muc-luc/", page: "toc", tab: "read", wide: true,
  body: `<h1 class="page">Mục lục</h1><p class="lead">Chọn một sách để xem các đoạn.</p>
<div class="toc"><h2>Cựu Ước</h2>${bookList(0, NT)}<h2>Tân Ước</h2>${bookList(NT, 66)}</div>`,
}));

// ---------- trang sách ----------
for (let b = 0; b < 66; b++) {
  const name = BOOKS[b][0];
  const intro = INTRO[b] || `Sách ${name} thuộc ${testament(b)}, gồm ${CHS[b]} đoạn.`;
  const body = `<nav class="crumbs" aria-label="Vị trí"><a href="${u()}">Trang chủ</a><span>›</span><a href="${u("muc-luc/")}">Mục lục</a><span>›</span><span>${esc(name)}</span></nav>
<div class="label" style="margin-top:14px">${testament(b)}</div>
<h1 class="page">${esc(name)}</h1>
<p class="lead">${esc(intro)} ${CHS[b]} đoạn, ${DATA[b].reduce((a, c) => a + c.length, 0)} câu.</p>
<ul class="chs" id="bookChs" data-b="${b}">${DATA[b].map((_, i) => `<li><a href="${u(chPath(b, i + 1))}" data-c="${i + 1}" aria-label="Đoạn ${i + 1}">${i + 1}</a></li>`).join("")}</ul>
<div class="section"><a class="btn primary" href="${u(chPath(b, 1))}">Đọc từ đoạn 1 ${ic("right")}</a></div>`;
  write(`${bookPath(b)}index.html`, layout({
    title: `${name} – Kinh Thánh 1925`,
    desc: clip(`${intro} Đọc ${name} (${CHS[b]} đoạn) theo bản Truyền Thống 1925.`),
    canonical: bookPath(b), page: "book", tab: "read", body, data: { b }, wide: true,
    head: breadcrumbLd([["Kinh Thánh 1925", ""], [name, bookPath(b)]]),
  }));
}

// ---------- trang đoạn ----------
const verseHtml = (vs) => vs.map((t, i) => `<span class="v" id="v${i + 1}" data-v="${i + 1}"><span class="n">${i + 1}</span>${esc(t)}</span>`).join(" ");
function prevNext(b, c) {
  const prev = c > 1 ? [b, c - 1] : b > 0 ? [b - 1, CHS[b - 1]] : null;
  const next = c < CHS[b] ? [b, c + 1] : b < 65 ? [b + 1, 1] : null;
  return { prev, next };
}
const urls = [""];
urls.push("muc-luc/");
for (let b = 0; b < 66; b++) {
  urls.push(bookPath(b));
  for (let c = 1; c <= CHS[b]; c++) {
    const name = BOOKS[b][0];
    const vs = DATA[b][c - 1];
    const { prev, next } = prevNext(b, c);
    const navBtn = (x, dir) => x
      ? `<a class="btn" rel="${dir}" href="${u(chPath(x[0], x[1]))}">${dir === "prev" ? ic("left") : ""}${esc(BOOKS[x[0]][0])} ${x[1]}${dir === "next" ? ic("right") : ""}</a>`
      : `<span class="btn" aria-disabled="true">${dir === "prev" ? "Đầu Kinh Thánh" : "Hết Kinh Thánh"}</span>`;
    const side = `<aside class="side" aria-label="Các đoạn trong sách ${esc(name)}"><div class="label">${testament(b)}</div>
<a class="side-book" href="${u(bookPath(b))}">${esc(name)}</a><div class="small muted">${CHS[b]} đoạn</div>
<ul class="chs mini">${DATA[b].map((_, i) => `<li><a href="${u(chPath(b, i + 1))}"${i + 1 === c ? ' class="cur" aria-current="page"' : ""}>${i + 1}</a></li>`).join("")}</ul>
<div class="side-links">${b > 0 ? `<a href="${u(bookPath(b - 1))}">${ic("left")}${esc(BOOKS[b - 1][0])}</a>` : ""}${b < 65 ? `<a href="${u(bookPath(b + 1))}">${esc(BOOKS[b + 1][0])}${ic("right")}</a>` : ""}</div>
<a class="btn side-all" href="${u("muc-luc/")}">${ic("book")}Tất cả 66 sách</a></aside>`;
    const body = `<div class="reader"><article class="read-main"><nav class="crumbs" aria-label="Vị trí"><a href="${u()}">Trang chủ</a><span>›</span><a href="${u(bookPath(b))}">${esc(name)}</a><span>›</span><span>Đoạn ${c}</span></nav>
<div class="ch-head"><div><a class="book" href="${u(bookPath(b))}">${esc(name)}</a><h1><span class="sr">${esc(name)} </span>Đoạn ${c}</h1></div><span class="small muted">${vs.length} câu</span></div>
<div class="scripture" id="scr"><p>${verseHtml(vs)}</p></div>
<div class="done-row" id="planRow" hidden></div>
<nav class="ch-nav" aria-label="Chuyển đoạn">${navBtn(prev, "prev")}${navBtn(next, "next")}</nav>
<p class="copyright">Kinh Thánh bản Truyền Thống 1925 · phạm vi công cộng</p></article>${side}</div>`;
    write(`${chPath(b, c)}index.html`, layout({
      title: `${name} ${c} – Kinh Thánh 1925`,
      desc: clip(`${name} ${c}: ${vs.slice(0, 3).join(" ")}`),
      canonical: chPath(b, c), page: "chapter", tab: "read", body, pick: `${name} ${c}`, data: { b, c }, wide: true,
      head: breadcrumbLd([["Kinh Thánh 1925", ""], [name, bookPath(b)], [`${name} ${c}`, chPath(b, c)]])
        + (prev ? `<link rel="prev" href="${u(chPath(prev[0], prev[1]))}">` : "") + (next ? `<link rel="next" href="${u(chPath(next[0], next[1]))}">` : ""),
    }));
    urls.push(chPath(b, c));
  }
}

// ---------- tìm kiếm, đã lưu, trang dự phòng offline, 404 ----------
write("tim-kiem/index.html", layout({
  title: "Tìm kiếm – Kinh Thánh 1925", desc: "Tìm chữ trong toàn bộ Kinh Thánh 1925, gõ có dấu hoặc không dấu, hoặc gõ tên đoạn như Giăng 3:16.",
  canonical: "tim-kiem/", page: "search", tab: "search",
  body: `<h1 class="sr">Tìm kiếm Kinh Thánh</h1>
<form class="search-box" role="search" id="sForm" action="${u("tim-kiem/")}">${ic("search", ' style="color:var(--muted)"')}
<label class="sr" for="q">Từ cần tìm</label><input id="q" name="q" type="search" placeholder="Tìm chữ, hoặc gõ đoạn như “Giăng 3:16”" autocomplete="off" enterkeyhint="search"></form>
<div class="chips" id="scope" role="group" aria-label="Phạm vi tìm">
<button class="chip" data-s="all" aria-pressed="true">Cả Kinh Thánh</button><button class="chip" data-s="ot" aria-pressed="false">Cựu Ước</button><button class="chip" data-s="nt" aria-pressed="false">Tân Ước</button><button class="chip" data-s="book" aria-pressed="false" id="scopeBook">Sách đang đọc</button></div>
<div id="sOut"><p class="muted small">Gõ không dấu cũng tìm được: “yeu thuong” sẽ ra “yêu thương”. Gõ có dấu để tìm đúng từng chữ.</p></div>
<noscript><p>Trang tìm kiếm cần bật JavaScript.</p></noscript>`,
}));
write("da-luu/index.html", layout({
  title: "Đã lưu – Kinh Thánh 1925", desc: "Các câu đã tô màu, ghi chú và đánh dấu.", canonical: "da-luu/", noindex: true, page: "saved", tab: "saved",
  body: `<h1 class="page">Đã lưu</h1>
<div class="seg" role="group" aria-label="Loại đã lưu" id="savedSeg"><button data-k="hl" aria-pressed="true">Tô màu</button><button data-k="notes" aria-pressed="false">Ghi chú</button><button data-k="bm" aria-pressed="false">Đánh dấu</button></div>
<ul class="saved-list" id="savedList"></ul>
<div class="section"><p class="small muted" style="margin:0 0 8px">Tô màu, ghi chú và kế hoạch đọc được lưu trên trình duyệt này. Hãy sao lưu nếu đổi máy hoặc xóa dữ liệu trình duyệt.</p>
<div class="row"><button class="btn" id="backupBtn">Sao lưu</button><label class="btn" for="restoreFile" style="cursor:pointer">Khôi phục</label><input id="restoreFile" type="file" accept="application/json,.json" class="sr"></div></div>`,
}));
// Trang khung: service worker trả trang này khi mất mạng; app.js tự vẽ đoạn từ dữ liệu đã tải.
write("doc/index.html", layout({
  title: "Kinh Thánh 1925", desc: "Đọc Kinh Thánh 1925 khi không có mạng.", canonical: null, noindex: true, page: "shell", tab: "read", pick: "Kinh Thánh",
  body: `<div id="shell"><p class="loading">Đang mở…</p></div>`,
}));
write("404.html", layout({
  title: "Không tìm thấy trang – Kinh Thánh 1925", desc: "Trang này không có.", canonical: null, noindex: true, page: "404", tab: "",
  body: `<h1 class="page">Không tìm thấy trang này</h1><p class="lead">Đường dẫn có thể đã gõ sai. Thử tìm đoạn Kinh Thánh bạn cần.</p>
<div class="section row"><a class="btn primary" href="${u("tim-kiem/")}">${ic("search")}Tìm kiếm</a><a class="btn" href="${u("muc-luc/")}">Mục lục</a></div>`,
}));

// ---------- SEO, PWA ----------
const today = new Date().toISOString().slice(0, 10);
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((p) => `<url><loc>${abs(p)}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${abs("sitemap.xml")}\n`);
write("manifest.webmanifest", JSON.stringify({
  name: "Kinh Thánh 1925", short_name: "Kinh Thánh", description: "Kinh Thánh bản Truyền Thống 1925",
  lang: "vi", start_url: BASE, scope: BASE, display: "standalone", background_color: "#F3F4F1", theme_color: "#8A1C2B",
  icons: [
    { src: u("assets/icon-192.png"), sizes: "192x192", type: "image/png" },
    { src: u("assets/icon-512.png"), sizes: "512x512", type: "image/png" },
    { src: u("assets/icon-512-maskable.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
}, null, 1));
const sw = fs.readFileSync(path.join(ROOT, "src/sw.js"), "utf8")
  .replace("__VERSION__", VERSION).replace("__BASE__", BASE).replace("__DATAV__", DATAV)
  .replace("__SHELL__", JSON.stringify([BASE, u("doc/"), u("muc-luc/"), u("tim-kiem/"), u("da-luu/"), u(`assets/style.css?v=${CSS_V}`), u(`assets/app.js?v=${JS_V}`), u("assets/icon.svg"), u("manifest.webmanifest")]));
write("sw.js", sw);
write(".nojekyll", "");
if (process.env.CNAME) write("CNAME", process.env.CNAME + "\n");

console.log(`Đã sinh ${urls.length} trang trong sitemap · ${TOTAL_CH} đoạn · ${TOTAL_V} câu · BASE=${BASE} · SITE=${SITE} · v${VERSION}`);
