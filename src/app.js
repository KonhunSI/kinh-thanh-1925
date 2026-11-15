"use strict";
/*@META@*/
const { BASE, NT, CHS, GROUPS, VOD_DAYS, VOD_SPECIAL, TET, VODIMG, BOOKS, SLUGS, EN_BOOKS } = META;
const PLANS = {
  year: { name: "Trọn Kinh Thánh trong 1 năm", desc: "Từ Sáng Thế Ký đến Khải Huyền, khoảng 3–4 đoạn mỗi ngày.", days: 365, from: 0, to: 66 },
  nt90: { name: "Tân Ước trong 90 ngày", desc: "260 đoạn Tân Ước, khoảng 3 đoạn mỗi ngày.", days: 90, from: NT, to: 66 },
};
const HL = { y: "var(--h-y)", g: "var(--h-g)", b: "var(--h-b)", p: "var(--h-p)", v: "var(--h-v)" };
const WD = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

/* ---------- Lưu trữ trên máy ---------- */
const KEY = "kt1925";
const DEF = { pos: null, size: 19, fam: "serif", lay: "flow", theme: "auto", rate: 1, lang: "vi", en: "kjv", hl: {}, notes: {}, bm: {}, plan: null };
let S = (() => { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { return Object.assign({}, DEF); } })();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Trình duyệt không cho lưu dữ liệu. Kiểm tra chế độ ẩn danh."); return; } stamp(); }

/* ---------- Tiện ích ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const key = (b, c, v) => `${b}.${c}.${v}`;
const parseKey = (k) => k.split(".").map(Number);
const refName = (b, c, v) => `${BOOKS[b][0]} ${c}${v ? ":" + v : ""}`;
const chUrl = (b, c, v) => `${BASE}${SLUGS[b]}/${c}/${v ? "#v" + v : ""}`;
const bookUrl = (b) => `${BASE}${SLUGS[b]}/`;
const ic = (id) => `<svg class="icon"><use href="#i-${id}"/></svg>`;
function fold(s) { let o = ""; for (const ch of s) { if (ch === "Đ" || ch === "đ") { o += "d"; continue; } o += ch.normalize("NFD")[0].toLowerCase(); } return o; }
function toast(msg) { const t = $("#toast"); if (!t) return; t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => (t.hidden = true), 2600); }
function todayStr(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function daysBetween(a, b) { return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 864e5); }
async function copyText(t) {
  try { await navigator.clipboard.writeText(t); toast("Đã sao chép"); }
  catch (e) { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand("copy"); } catch (_) {} ta.remove(); toast(ok ? "Đã sao chép" : "Trình duyệt chặn sao chép"); }
}
function downloadBlob(blob, name) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); }

const cache = {}, pending = {};
function loadBook(b) {
  if (cache[b]) return Promise.resolve(cache[b]);
  if (pending[b]) return pending[b];
  pending[b] = fetch(`${BASE}data/b${String(b + 1).padStart(2, "0")}.json`)
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((d) => (cache[b] = d)).finally(() => delete pending[b]);
  return pending[b];
}

// Bản tiếng Anh: KJV (King James, 1611) hoặc WEB (World English Bible), cùng số câu với bản 1925.
const EN_NAME = { kjv: "KJV", web: "WEB" }, enCache = {}, enPending = {};
function loadEn(b, tr = S.en) {
  const k = tr + b;
  if (enCache[k]) return Promise.resolve(enCache[k]);
  if (enPending[k]) return enPending[k];
  enPending[k] = fetch(`${BASE}data/${tr}/b${String(b + 1).padStart(2, "0")}.json`)
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((d) => (enCache[k] = d)).finally(() => delete enPending[k]);
  return enPending[k];
}
const enRef = (b, c, v) => `${EN_BOOKS[b]} ${c}${v ? ":" + v : ""}`;

/* ---------- Cỡ chữ và giao diện ---------- */
function applyPrefs() {
  const d = document.documentElement;
  d.style.setProperty("--read-size", S.size + "px");
  if (S.theme === "auto") d.removeAttribute("data-theme"); else d.setAttribute("data-theme", S.theme);
  d.classList.toggle("sans", S.fam === "sans");
  d.classList.toggle("lines", S.lay === "lines");
  d.classList.toggle("lang-bi", S.lang === "bi"); d.classList.toggle("lang-en", S.lang === "en");
  $("#fEn").hidden = S.lang === "vi"; $("#fLay").hidden = S.lang === "bi";
  $("#enNote").textContent = S.en === "kjv" ? "Bản 1611, lời cổ giống bản 1925." : "Tiếng Anh hiện đại, dễ đọc.";
  $("#fs").value = S.size; $("#fsVal").textContent = S.size;
  for (const [id, val] of [["#segFam", S.fam], ["#segLay", S.lay], ["#segTheme", S.theme], ["#segLang", S.lang], ["#segEn", S.en]])
    $$(id + " button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === val));
}
$("#aaBtn").onclick = () => { $("#dAa").showModal(); offlineStatus(); };
$("#fs").oninput = (e) => { S.size = +e.target.value; save(); applyPrefs(); };
for (const [id, k] of [["#segFam", "fam"], ["#segLay", "lay"], ["#segTheme", "theme"], ["#segLang", "lang"], ["#segEn", "en"]])
  $$(id + " button").forEach((b) => (b.onclick = () => { S[k] = b.dataset.v; save(); applyPrefs(); if (k === "lang" || k === "en") langChanged(); }));
$$("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) d.close(); }));

/* ---------- Đọc khi không có mạng ---------- */
const DATA_CACHE = "kt-data-" + META.DATAV;
async function offlineStatus() {
  const msg = $("#offlineMsg"), btn = $("#offlineBtn");
  if (!("caches" in window) || !("serviceWorker" in navigator)) { msg.textContent = "Trình duyệt này chưa hỗ trợ đọc khi không có mạng."; btn.hidden = true; return; }
  try { const c = await caches.open(DATA_CACHE); const n = (await c.keys()).filter((r) => /\/data\/b\d+\.json$/.test(r.url)).length; if (n >= 66) { msg.textContent = "Đã tải đủ 66 sách. Có thể đọc khi không có mạng."; btn.textContent = "Tải lại toàn bộ"; } else if (n) msg.textContent = `Đã có ${n}/66 sách trên máy.`; } catch (e) {}
}
$("#offlineBtn").onclick = async () => {
  const msg = $("#offlineMsg"), btn = $("#offlineBtn"); btn.disabled = true;
  try {
    const c = await caches.open(DATA_CACHE); let n = 0;
    for (let i = 0; i < 66; i++) {
      const url = `${BASE}data/b${String(i + 1).padStart(2, "0")}.json`;
      const res = await fetch(url, { cache: "reload" }); if (!res.ok) throw new Error(res.status);
      await c.put(url, res); msg.textContent = `Đang tải ${++n}/66 sách…`;
    }
    if (S.lang !== "vi") { // tải thêm bản tiếng Anh đang dùng
      for (let i = 0; i < 66; i++) {
        const url = `${BASE}data/${S.en}/b${String(i + 1).padStart(2, "0")}.json`;
        const res = await fetch(url, { cache: "reload" }); if (!res.ok) throw new Error(res.status);
        await c.put(url, res); msg.textContent = `Đang tải bản ${EN_NAME[S.en]} ${i + 1}/66…`;
      }
    }
    const shell = await caches.open("kt-pages-v1"); await shell.add(`${BASE}doc/`).catch(() => {});
    msg.textContent = "Xong. Có thể đọc toàn bộ Kinh Thánh khi không có mạng."; toast("Đã tải xong 66 sách");
  } catch (e) { msg.textContent = "Tải chưa xong vì mất kết nối. Bấm lại để tải tiếp."; }
  btn.disabled = false;
};
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register(`${BASE}sw.js`, { scope: BASE }).catch(() => {}));

/* ---------- Chọn sách ---------- */
const bookKeys = BOOKS.map(([n, a]) => {
  const roman = (s) => s.replace(/^III\s/, "3").replace(/^II\s/, "2").replace(/^I\s/, "1");
  return [fold(roman(n)).replace(/[\s-]/g, ""), fold(a).replace(/[\s-]/g, "")];
});
function curBook() { const b = document.body.dataset.b; return b != null ? +b : S.pos ? S.pos.b : -1; }
// Màn hình rộng ở trang đoạn đã có cột bên phải liệt kê các đoạn: chọn sách là mở luôn đoạn 1.
const sideChapters = () => document.body.dataset.page === "chapter" && matchMedia("(min-width:1024px)").matches;
const bookRows = (list, cb) => list.map((i) => `<li><button data-b="${i}"${i === cb ? ' class="cur" aria-current="true"' : ""}><span>${esc(BOOKS[i][0])}</span><small>${CHS[i]} đoạn</small></button></li>`).join("");
function renderBooks(filter = "") {
  $("#pickTitle").textContent = "Chọn sách"; $("#pickBack").hidden = true;
  const f = fold(filter).replace(/[\s-]/g, ""), cb = curBook();
  let list;
  if (f) {
    const hits = BOOKS.map((_, i) => i).filter((i) => bookKeys[i].some((k) => k.includes(f)));
    list = hits.length ? `<ul class="blist">${bookRows(hits, cb)}</ul>` : `<p class="muted small" style="margin:16px 4px">Không thấy sách nào.</p>`;
  } else {
    list = [["Cựu Ước", 0, NT], ["Tân Ước", NT, 66]].map(([tm, a0, z0]) => `<h4 class="blist-tm">${tm}</h4>` +
      GROUPS.filter(([, a]) => a >= a0 && a < z0).map(([g, a, z]) => `<div class="blist-grp">${esc(g)}</div><ul class="blist">${bookRows(Array.from({ length: z - a + 1 }, (_, j) => a + j), cb)}</ul>`).join("")).join("");
  }
  $("#pickBody").innerHTML = `<div class="pick-filter"><label class="sr" for="bf">Lọc tên sách</label><input class="filter" id="bf" placeholder="Gõ tên sách…" value="${esc(filter)}" autocomplete="off"></div>${list}`;
  const bf = $("#bf");
  bf.oninput = () => { const p = bf.selectionStart; renderBooks(bf.value); const n = $("#bf"); n.focus(); n.setSelectionRange(p, p); };
  $$("#pickBody [data-b]").forEach((x) => (x.onclick = () => { const b = +x.dataset.b; if (CHS[b] === 1 || sideChapters()) location.href = chUrl(b, 1); else renderChapters(b); }));
  if (!f) { const c = $("#pickBody .cur"); if (c) c.scrollIntoView({ block: "center" }); else $("#pickBody").scrollTop = 0; }
}
function renderChapters(b) {
  $("#pickTitle").textContent = BOOKS[b][0]; $("#pickBack").hidden = false;
  const cur = document.body.dataset.page === "chapter" || document.body.dataset.page === "shell" ? S.pos : null;
  let h = `<ul class="chs">`;
  for (let c = 1; c <= CHS[b]; c++) h += `<li><a href="${chUrl(b, c)}" class="${cur && cur.b === b && cur.c === c ? "cur" : ""}">${c}</a></li>`;
  $("#pickBody").innerHTML = h + `</ul>`; $("#pickBody").scrollTop = 0;
}
$("#pickBack").onclick = () => renderBooks();
$("#pickBtn").onclick = () => {
  const cb = curBook();
  $("#dPick").showModal();
  if (document.body.dataset.page === "chapter" && cb >= 0 && !sideChapters()) renderChapters(cb); else renderBooks();
};
function findBook(q) {
  const f = fold(q).replace(/[\s.-]/g, ""); if (f.length < 2) return -1;
  let i = bookKeys.findIndex((k) => k[1] === f); if (i >= 0) return i;
  i = bookKeys.findIndex((k) => k[0] === f); if (i >= 0) return i;
  return bookKeys.findIndex((k) => k[0].startsWith(f));
}
function parseRef(q) {
  const m = q.trim().match(/^((?:[1-3]|i{1,3})\s*)?([^\d:]+?)\s*(\d+)(?:\s*[:.,\s]\s*(\d+))?$/i); if (!m) return null;
  let pre = (m[1] || "").trim().toLowerCase(); pre = pre === "iii" ? "3" : pre === "ii" ? "2" : pre === "i" ? "1" : pre;
  const b = findBook(pre + m[2]); if (b < 0) return null;
  const c = +m[3]; if (c < 1 || c > CHS[b]) return null;
  return { b, c, v: m[4] ? +m[4] : null };
}

/* ---------- Tab "Đọc" mở đoạn đang đọc dở ---------- */
if (S.pos) $$('[data-tab="read"]').forEach((t) => (t.href = chUrl(S.pos.b, S.pos.c)));

/* ---------- Kế hoạch đọc ---------- */
const planListCache = {};
function planList(id) { if (planListCache[id]) return planListCache[id]; const p = PLANS[id], out = []; for (let b = p.from; b < p.to; b++) for (let c = 1; c <= CHS[b]; c++) out.push([b, c]); return (planListCache[id] = out); }
function planDay(id, d) { const L = planList(id), p = PLANS[id]; return L.slice(Math.floor((d * L.length) / p.days), Math.floor(((d + 1) * L.length) / p.days)); }
const planHas = (b) => !!S.plan && b >= PLANS[S.plan.id].from && b < PLANS[S.plan.id].to;
const planDone = (b, c) => !!(S.plan && S.plan.done[b + "." + c]);
function togglePlanCh(b, c) { if (!S.plan) return; const k = b + "." + c; if (S.plan.done[k]) delete S.plan.done[k]; else S.plan.done[k] = 1; save(); }

/* ---------- Trang đoạn ---------- */
let sel = new Set(), CH = null; // CH = {b, c, verses}
function chapterMarkup(b, c, vs) {
  const prev = c > 1 ? [b, c - 1] : b > 0 ? [b - 1, CHS[b - 1]] : null;
  const next = c < CHS[b] ? [b, c + 1] : b < 65 ? [b + 1, 1] : null;
  const nav = (x, dir) => x ? `<a class="btn" rel="${dir}" href="${chUrl(x[0], x[1])}">${dir === "prev" ? ic("left") : ""}${esc(refName(x[0], x[1]))}${dir === "next" ? ic("right") : ""}</a>` : `<span class="btn" aria-disabled="true">${dir === "prev" ? "Đầu Kinh Thánh" : "Hết Kinh Thánh"}</span>`;
  return `<nav class="crumbs" aria-label="Vị trí"><a href="${BASE}">Trang chủ</a><span>›</span><a href="${bookUrl(b)}">${esc(BOOKS[b][0])}</a><span>›</span><span>Đoạn ${c}</span></nav>
<div class="ch-head"><div><a class="book" href="${bookUrl(b)}">${esc(BOOKS[b][0])}</a><h1><span class="sr">${esc(BOOKS[b][0])} </span>Đoạn ${c}</h1></div><span class="small muted">${vs.length} câu</span></div>
<div class="scripture" id="scr"><p>${vs.map((t, i) => `<span class="v" id="v${i + 1}" data-v="${i + 1}"><span class="n">${i + 1}</span>${esc(t)}</span>`).join(" ")}</p></div>
<div class="done-row" id="planRow" hidden></div>
<nav class="ch-nav" aria-label="Chuyển đoạn">${nav(prev, "prev")}${nav(next, "next")}</nav>`;
}
function decorate() {
  const { b, c } = CH;
  $$("#scr .v").forEach((el) => {
    const v = +el.dataset.v, k = key(b, c, v);
    el.className = "v" + (S.hl[k] ? " hl-" + S.hl[k] : "") + (sel.has(v) ? " sel" : "") + (audio && audio.cur === v ? " playing" : "");
    const dot = el.querySelector(".notedot");
    if (S.notes[k] && !dot) el.insertAdjacentHTML("beforeend", `<button class="notedot" data-note="${v}" aria-label="Xem ghi chú câu ${v}">${ic("note")}</button>`);
    if (!S.notes[k] && dot) dot.remove();
  });
  const row = $("#planRow");
  if (planHas(b)) {
    const d = planDone(b, c); row.hidden = false;
    row.innerHTML = `<button class="btn${d ? "" : " primary"}" id="markDone">${d ? "✓ Đã đọc trong kế hoạch" : "Đánh dấu đã đọc đoạn này"}</button>`;
    $("#markDone").onclick = () => { togglePlanCh(b, c); decorate(); if (planDone(b, c)) toast("Đã ghi vào kế hoạch đọc"); };
  } else row.hidden = true;
}
async function initChapter(b, c) {
  S.pos = { b, c }; save();
  $$('[data-tab="read"]').forEach((t) => (t.href = chUrl(b, c)));
  if (!cache[b]) { try { await loadBook(b); } catch (e) {} }
  const vs = cache[b] ? cache[b][c - 1] : $$("#scr .v").map((el) => el.textContent.replace(/^\d+/, ""));
  CH = { b, c, verses: vs, en: null };
  decorate();
  langChip(); applyLang();
  $("#scr").addEventListener("click", (e) => {
    const nd = e.target.closest("[data-note]"); if (nd) { e.stopPropagation(); openNote(+nd.dataset.note); return; }
    const v = e.target.closest(".v"); if (!v) return;
    const n = +v.dataset.v; if (sel.has(n)) sel.delete(n); else sel.add(n);
    v.classList.toggle("sel", sel.has(n)); updateSelbar();
  });
  $("#listenBtn").onclick = () => (audio ? stopAudio() : startAudio(1));
  const m = location.hash.match(/^#v(\d+)$/);
  if (m) { const el = $("#v" + m[1]); if (el) { el.scrollIntoView({ block: "center" }); el.classList.add("flash"); } }
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input,textarea,select,dialog") || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "ArrowLeft") { const a = $('a[rel="prev"]'); if (a) location.href = a.href; }
    if (e.key === "ArrowRight") { const a = $('a[rel="next"]'); if (a) location.href = a.href; }
    if (e.key === "Escape" && sel.size) { e.preventDefault(); clearSel(); }
  });
  let tx = 0, ty = 0;
  $("#scr").addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  $("#scr").addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 80 && Math.abs(dy) < 50) { const a = $(`a[rel="${dx < 0 ? "next" : "prev"}"]`); if (a) location.href = a.href; }
  }, { passive: true });
}
// Song ngữ / tiếng Anh: chữ Việt bọc trong .vi, câu tiếng Anh thêm vào .en ngay trong cùng câu.
async function applyLang() {
  if (!CH) return;
  const { b, c } = CH, tr = S.en;
  if (S.lang === "vi") { CH.en = null; langChip(); return; }
  let en;
  try { en = (await loadEn(b, tr))[c - 1]; } catch (e) { toast("Chưa tải được bản tiếng Anh. Kiểm tra kết nối mạng."); return; }
  if (!CH || CH.b !== b || CH.c !== c || S.en !== tr || S.lang === "vi") return;
  CH.en = en;
  $$("#scr .v").forEach((el) => {
    if (!el.querySelector(".vi")) {
      const w = document.createElement("span"); w.className = "vi";
      [...el.childNodes].filter((n) => n.nodeType === 3 || (n.nodeType === 1 && !n.matches(".n,.notedot,.en"))).forEach((n) => w.appendChild(n));
      el.insertBefore(w, el.querySelector(".n") ? el.querySelector(".n").nextSibling : el.firstChild);
    }
    let e = el.querySelector(".en");
    if (!e) { e = document.createElement("span"); e.className = "en"; e.lang = "en"; el.querySelector(".vi").after(e); }
    e.textContent = en[+el.dataset.v - 1] || "";
  });
  langChip();
}
function langChip() {
  const head = $(".ch-head"); if (!head) return;
  let chip = $("#langChip");
  if (!chip) {
    chip = document.createElement("button"); chip.id = "langChip"; chip.className = "lang-chip";
    chip.onclick = () => { $("#dAa").showModal(); offlineStatus(); $("#fLang").scrollIntoView({ block: "nearest" }); };
    head.appendChild(chip);
  }
  const cp = $(".copyright"); if (cp) { if (!cp.dataset.vi) cp.dataset.vi = cp.textContent; cp.textContent = S.lang === "vi" ? cp.dataset.vi : `${cp.dataset.vi} · ${S.en === "kjv" ? "King James Version (1611)" : "World English Bible"} · public domain`; }
  chip.textContent = S.lang === "vi" ? "Tiếng Việt" : S.lang === "bi" ? `Song ngữ · ${EN_NAME[S.en]}` : `English · ${EN_NAME[S.en]}`;
  chip.setAttribute("aria-label", "Đổi ngôn ngữ khi đọc: " + chip.textContent);
  const bk = $(".ch-head .book");
  if (bk && CH) { if (!bk.dataset.vi) bk.dataset.vi = bk.textContent; bk.textContent = S.lang === "vi" ? bk.dataset.vi : `${bk.dataset.vi} · ${EN_BOOKS[CH.b]}`; }
}
function langChanged() {
  if (CH) applyLang();
  if (document.body.dataset.page === "home") vodLang();
}
function clearSel() { sel.clear(); $$(".v.sel").forEach((x) => x.classList.remove("sel")); updateSelbar(); }
function updateSelbar() {
  const on = sel.size > 0; $("#selbar").hidden = !on; if (!on) return;
  const all = [...sel].every((v) => S.bm[key(CH.b, CH.c, v)]); $("#aBmLabel").textContent = all ? "Bỏ đánh dấu" : "Đánh dấu";
}
function selected() {
  const vs = [...sel].sort((a, b) => a - b);
  let parts = [], s = vs[0], p = vs[0];
  for (const v of vs.slice(1).concat([null])) { if (v === p + 1) { p = v; continue; } parts.push(s === p ? `${s}` : `${s}–${p}`); s = p = v; }
  const vi = vs.map((v) => CH.verses[v - 1]).join(" "), en = CH.en ? vs.map((v) => CH.en[v - 1]).filter(Boolean).join(" ") : "";
  const ref = `${BOOKS[CH.b][0]} ${CH.c}:${parts.join(", ")}`, eref = `${EN_BOOKS[CH.b]} ${CH.c}:${parts.join(", ")}`;
  const mode = en ? S.lang : "vi";
  return { vs, text: mode === "en" ? en : vi, ref: mode === "en" ? eref : ref, vi, en, eref, mode };
}
$("#selClose").onclick = clearSel;
$$("#selbar .color").forEach((btn) => (btn.onclick = () => {
  const c = btn.dataset.c;
  for (const v of sel) { const k = key(CH.b, CH.c, v); if (c) S.hl[k] = c; else delete S.hl[k]; }
  save(); sel.clear(); decorate(); updateSelbar(); toast(c ? "Đã tô màu" : "Đã bỏ tô màu");
}));
$("#aCopy").onclick = () => {
  const s = selected(), link = `${location.origin}${chUrl(CH.b, CH.c, s.vs[0])}`, tr = EN_NAME[S.en];
  const vi = `“${s.vi}” (${s.ref}, Kinh Thánh 1925)`, en = `“${s.en}” (${s.eref}, ${tr})`;
  copyText((s.mode === "bi" ? `${vi}\n${en}` : s.mode === "en" ? en : vi) + `\n${link}`); clearSel();
};
$("#aBm").onclick = () => {
  const vs = [...sel], all = vs.every((v) => S.bm[key(CH.b, CH.c, v)]);
  for (const v of vs) { const k = key(CH.b, CH.c, v); if (all) delete S.bm[k]; else S.bm[k] = Date.now(); }
  save(); toast(all ? "Đã bỏ đánh dấu" : "Đã đánh dấu"); clearSel();
};
$("#aNote").onclick = () => openNote(Math.min(...sel));
$("#aImg").onclick = () => { const s = selected(); openImage(s.text, s.ref, null, chUrl(CH.b, CH.c, s.vs[0])); clearSel(); };
$("#aListen").onclick = () => { const from = Math.min(...sel); clearSel(); startAudio(from); };

/* ---------- Ghi chú ---------- */
let noteFor = null;
function openNote(v) {
  const { b, c } = CH; noteFor = { b, c, v }; const k = key(b, c, v);
  $("#noteTitle").textContent = "Ghi chú · " + refName(b, c, v);
  $("#noteVerse").textContent = CH.verses[v - 1];
  $("#noteText").value = S.notes[k] ? S.notes[k].t : "";
  $("#noteDel").hidden = !S.notes[k];
  $("#dNote").showModal(); setTimeout(() => $("#noteText").focus(), 50);
}
function afterNote(msg) { save(); $("#dNote").close(); sel.clear(); updateSelbar(); if (CH) decorate(); if (document.body.dataset.page === "saved") renderSaved(); toast(msg); }
$("#noteSave").onclick = () => { const k = key(noteFor.b, noteFor.c, noteFor.v), t = $("#noteText").value.trim(); if (t) S.notes[k] = { t, at: Date.now() }; else delete S.notes[k]; afterNote(t ? "Đã lưu ghi chú" : "Đã xóa ghi chú"); };
$("#noteDel").onclick = () => { delete S.notes[key(noteFor.b, noteFor.c, noteFor.v)]; afterNote("Đã xóa ghi chú"); };

/* ---------- Ảnh chia sẻ ---------- */
let lastBlob = null, lastName = "";
const loadImg = (src) => new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = no; im.src = src; });
async function openImage(text, ref, bg = null, url = "") {
  text = cleanVerse(text);
  try { await Promise.all([document.fonts.load('400 48px "Literata"'), document.fonts.load('600 30px "Be Vietnam Pro"')]); } catch (e) {}
  const W = 1080, H = 1350, cv = document.createElement("canvas"); cv.width = W; cv.height = H; const g = cv.getContext("2d");
  g.fillStyle = "#1B2028"; g.fillRect(0, 0, W, H);
  let bgIm = null; if (bg) { try { bgIm = await loadImg(bg); } catch (e) {} }
  if (bgIm) { // ảnh nền phủ kín khung, thêm lớp tối để chữ dễ đọc
    const s = Math.max(W / bgIm.width, H / bgIm.height), w = bgIm.width * s, h = bgIm.height * s; g.drawImage(bgIm, (W - w) / 2, (H - h) / 2, w, h);
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "rgba(12,14,18,.55)"); gr.addColorStop(.5, "rgba(12,14,18,.62)"); gr.addColorStop(1, "rgba(12,14,18,.78)"); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }
  g.fillStyle = "#A3283A"; g.beginPath(); g.moveTo(860, 0); g.lineTo(930, 0); g.lineTo(930, 190); g.lineTo(895, 160); g.lineTo(860, 190); g.closePath(); g.fill();
  const pad = 110, maxW = W - pad * 2; let size = 60, lines;
  const wrap = (fs) => { g.font = `400 ${fs}px Literata, Georgia, serif`; const out = []; let cur = ""; for (const w of `“${text}”`.split(" ")) { const t = cur ? cur + " " + w : w; if (g.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else cur = t; } if (cur) out.push(cur); return out; };
  for (;;) { lines = wrap(size); if (lines.length * size * 1.45 < H - 560 || size <= 30) break; size -= 3; }
  const lh = size * 1.45; let y = (H - lines.length * lh) / 2 - 30; g.fillStyle = "#F1EEE7"; g.textBaseline = "top";
  for (const l of lines) { g.fillText(l, pad, y); y += lh; }
  g.font = '600 36px "Be Vietnam Pro", system-ui, sans-serif'; g.fillStyle = bgIm ? "#F6C7CE" : "#E27C89"; g.fillText(ref, pad, y + 36);
  g.font = '500 26px "Be Vietnam Pro", system-ui, sans-serif'; g.fillStyle = bgIm ? "#C9CED6" : "#8D95A0"; g.fillText("KINH THÁNH · BẢN TRUYỀN THỐNG 1925", pad, H - 130);
  g.fillText("kinhthanh1925.com", pad, H - 92);
  lastBlob = await new Promise((r) => cv.toBlob(r, "image/jpeg", 0.92));
  lastName = "kinh-thanh-" + fold(ref).replace(/[^a-z0-9]+/g, "-").replace(/-$/, "") + ".jpg";
  lastUrl = location.origin + (url || location.pathname);
  lastRef = ref;
  // data: URL để nhấn giữ ảnh lưu/chia sẻ được cả trong trình duyệt của Zalo, Facebook
  $("#shareImg").src = cv.toDataURL("image/jpeg", 0.9); $("#shareImg").alt = `Ảnh câu ${ref}`;
  lastFile = new File([lastBlob], lastName, { type: "image/jpeg" });
  lastPng = await new Promise((r) => cv.toBlob(r, "image/png")); // bộ nhớ tạm của iPhone/Chrome chỉ nhận PNG
  const canFile = !!(navigator.canShare && (() => { try { return navigator.canShare({ files: [lastFile] }); } catch (e) { return false; } })());
  const canCopyImg = !!(navigator.clipboard && window.ClipboardItem);
  const ua = navigator.userAgent;
  const mobile = /Android|iPhone|iPad|iPod/i.test(ua) || (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform));
  const inApp = /Zalo|FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\//i.test(ua);
  const iosOther = /CriOS|FxiOS|EdgiOS/.test(ua);
  $("#imgShare").hidden = !(canFile || navigator.share);
  $("#imgCopy").hidden = !canCopyImg || canFile;
  $("#imgCopy").classList.toggle("primary", $("#imgShare").hidden);
  $("#imgFb").hidden = mobile || canFile;
  $("#imgFb").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(lastUrl);
  const hint = $("#shareHint"); let h = "";
  if (canFile) h = "";
  else if (inApp) h = "Bạn đang mở trang bên trong ứng dụng khác. Nhấn giữ vào ảnh để lưu, hoặc bấm nút ••• chọn “Mở bằng trình duyệt” để có nút Chia sẻ thẳng sang Zalo, Facebook.";
  else if (iosOther) h = (canCopyImg ? "Bấm “Sao chép ảnh” rồi mở Zalo, Messenger… và dán vào ô chat. " : "") + "Nhấn giữ vào ảnh để lưu vào thư viện Ảnh. Mở trang bằng Safari sẽ có nút Chia sẻ thẳng sang Zalo, Facebook.";
  else if (mobile) h = (canCopyImg ? "Bấm “Sao chép ảnh” rồi dán vào Zalo, Messenger… " : "") + "Hoặc nhấn giữ vào ảnh để lưu.";
  else if (canCopyImg) h = "Bấm “Sao chép ảnh” rồi dán (Ctrl+V) vào Zalo, Messenger hoặc tin nhắn. Hoặc tải ảnh về để đăng lên mạng xã hội.";
  hint.textContent = h; hint.hidden = !h;
  $("#dImg").showModal();
}
let lastFile = null, lastUrl = "", lastRef = "", lastPng = null;
$("#imgShare").onclick = async () => {
  try {
    if (navigator.canShare && navigator.canShare({ files: [lastFile] })) await navigator.share({ files: [lastFile], title: lastRef });
    else await navigator.share({ title: lastRef, text: `${lastRef} – Kinh Thánh 1925`, url: lastUrl });
  } catch (e) { if (e && e.name !== "AbortError") toast("Máy chưa hỗ trợ chia sẻ, hãy tải ảnh về"); }
};
$("#imgCopy").onclick = async () => {
  try { await navigator.clipboard.write([new ClipboardItem({ "image/png": lastPng || lastBlob })]); toast("Đã sao chép ảnh, dán vào nơi muốn gửi"); }
  catch (e) {
    try { const png = await new Promise((r) => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"); c.width = im.width; c.height = im.height; c.getContext("2d").drawImage(im, 0, 0); c.toBlob(r, "image/png"); }; im.src = $("#shareImg").src; });
      await navigator.clipboard.write([new ClipboardItem({ "image/png": png })]); toast("Đã sao chép ảnh, dán vào nơi muốn gửi"); }
    catch (e2) { toast("Không sao chép được, hãy tải ảnh về"); }
  }
};
$("#imgSave").onclick = () => { if (lastBlob) downloadBlob(lastBlob, lastName); };

/* ---------- Nghe đọc (giọng đọc của máy) ---------- */
let audio = null;
$("#pRate").value = String(S.rate);
function enVoice() { if (!("speechSynthesis" in window)) return null; const vs = speechSynthesis.getVoices(); return vs.find((v) => /^en-(US|GB)/i.test(v.lang)) || vs.find((v) => /^en/i.test(v.lang)) || null; }
function viVoice() { if (!("speechSynthesis" in window)) return null; return speechSynthesis.getVoices().find((v) => /^vi/i.test(v.lang)) || null; }
if ("speechSynthesis" in window) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) {} }
function markPlaying(v) {
  $$(".v.playing").forEach((x) => x.classList.remove("playing"));
  const el = $("#v" + v);
  if (el) { el.classList.add("playing"); el.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
  if (audio) { audio.cur = v; $("#pSub").textContent = `Câu ${v} / ${audio.n}`; }
}
function syncPlayer() {
  $("#player").hidden = !audio; $("#listenBtn") && $("#listenBtn").setAttribute("aria-pressed", String(!!audio)); if (!audio) return;
  $("#pTitle").textContent = refName(audio.b, audio.c);
  $("#pPause").innerHTML = ic(audio.paused ? "play" : "pause"); $("#pPause").setAttribute("aria-label", audio.paused ? "Tiếp tục" : "Tạm dừng");
}
function startAudio(from = 1) {
  if (!CH) return; stopAudio();
  if (!("speechSynthesis" in window)) { toast("Trình duyệt này chưa hỗ trợ đọc to."); return; }
  const enMode = S.lang === "en" && CH.en;
  const voice = enMode ? enVoice() : viVoice(); if (!voice && !enMode) toast("Máy chưa có giọng tiếng Việt, âm đọc có thể không chuẩn.");
  const { b, c } = CH, verses = enMode ? CH.en : CH.verses; audio = { b, c, n: verses.length, cur: from, paused: false }; syncPlayer();
  let wake = null; try { navigator.wakeLock && navigator.wakeLock.request("screen").then((w) => (wake = w)).catch(() => {}); } catch (e) {}
  audio.release = () => { try { wake && wake.release(); } catch (e) {} };
  const speakFrom = (v) => {
    if (!audio || audio.stopped) return;
    if (v > verses.length) { endAudio(true); return; }
    const u = new SpeechSynthesisUtterance(verses[v - 1] || " "); u.lang = enMode ? "en-US" : "vi-VN"; if (voice) u.voice = voice; u.rate = S.rate;
    u.onstart = () => markPlaying(v); u.onend = () => { if (audio && !audio.stopped) speakFrom(v + 1); };
    speechSynthesis.speak(u);
  };
  speakFrom(from);
}
function endAudio(completed) {
  const a = audio; audio = null; if (a && a.release) a.release();
  $$(".v.playing").forEach((x) => x.classList.remove("playing")); syncPlayer();
  if (completed) { const n = $('a[rel="next"]'); if (n) toast(`Hết đoạn. Chạm “${n.textContent.trim()}” để đọc tiếp.`); }
}
function stopAudio() { if (!audio) return; audio.stopped = true; try { speechSynthesis.cancel(); } catch (e) {} endAudio(false); }
$("#pStop").onclick = stopAudio;
$("#pPause").onclick = () => { if (!audio) return; if (audio.paused) speechSynthesis.resume(); else speechSynthesis.pause(); audio.paused = !audio.paused; syncPlayer(); };
$("#pRate").onchange = (e) => { S.rate = +e.target.value; save(); if (audio) { const v = audio.cur; stopAudio(); setTimeout(() => startAudio(v), 80); } };
window.addEventListener("pagehide", () => { try { speechSynthesis.cancel(); } catch (e) {} });

/* ---------- Câu gốc mỗi ngày ---------- */
const pad2 = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
function easter(y) { // Lịch Gregory
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1; return new Date(y, mo - 1, da);
}
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const SPECIAL_LABEL = { GOODFRI: "Thứ Sáu Tuần Thánh", EASTER: "Chúa Nhật Phục Sinh", PENTECOST: "Lễ Ngũ Tuần", TET1: "Mùng 1 Tết", TET2: "Mùng 2 Tết", TET3: "Mùng 3 Tết" };
function vodFor(d) {
  const today = ymd(d), y = d.getFullYear(), ea = easter(y);
  const sp = { [ymd(addDays(ea, -2))]: "GOODFRI", [ymd(ea)]: "EASTER", [ymd(addDays(ea, 49))]: "PENTECOST" };
  if (TET[y]) { const [ty, tm, td] = TET[y].split("-").map(Number); for (let n = 0; n < 3; n++) sp[ymd(new Date(ty, tm - 1, td + n))] = "TET" + (n + 1); }
  const key = sp[today] || `${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  const ref = VOD_SPECIAL[key] || VOD_DAYS[key] || VOD_DAYS["01-01"];
  const img = VODIMG.find((f) => f.replace(/\.\w+$/, "") === key);
  return { key, ref, label: SPECIAL_LABEL[key] || "", img: img ? `${BASE}assets/vod/${img}` : null };
}
const cleanVerse = (t) => t.replace(/^\(\d+:\d+\)\s*/, "");

/* ---------- Trang chủ ---------- */
async function initHome() {
  const d = new Date();
  $("#todayDate").textContent = `${WD[d.getDay()]}, ${d.getDate()} tháng ${d.getMonth() + 1}`;
  const vod = vodFor(d), [vb, vc, vv] = vod.ref, b = vb - 1;
  if (vod.label) $("#vodLabel").textContent = "Câu gốc hôm nay · " + vod.label;
  if (vod.img) { const box = $("#vodImgBox"); box.style.backgroundImage = `url("${vod.img}")`; box.hidden = false; $("#vod").classList.add("has-img"); }
  $("#vodRef").textContent = refName(b, vc, vv); $("#vodRead").href = chUrl(b, vc, vv);
  let vt = $("#vodText").textContent;
  try { const data = await loadBook(b); vt = cleanVerse(data[vc - 1][vv - 1]); $("#vodText").textContent = vt; } catch (e) {}
  VOD = { b, c: vc, v: vv, vt };
  $("#vodCopy").onclick = () => copyText(`“${vt}” (${refName(b, vc, vv)}, Kinh Thánh 1925)` + (VOD.en ? `\n“${VOD.en}” (${enRef(b, vc, vv)}, ${EN_NAME[S.en]})` : ""));
  vodLang();
  $("#vodImg").onclick = () => openImage(vt, refName(b, vc, vv), vod.img, chUrl(b, vc, vv));
  contCard();
  renderPlan();
}
let VOD = null;
async function vodLang() {
  if (!VOD) return;
  let p = $("#vodEn");
  if (S.lang === "vi") { VOD.en = null; if (p) p.remove(); return; }
  try { VOD.en = (await loadEn(VOD.b))[VOD.c - 1][VOD.v - 1]; } catch (e) { return; }
  if (!p) { p = document.createElement("p"); p.id = "vodEn"; p.className = "vod-en"; p.lang = "en"; $("#vodText").after(p); }
  p.textContent = `${VOD.en} (${enRef(VOD.b, VOD.c, VOD.v)}, ${EN_NAME[S.en]})`;
}
function contCard() {
  const cb = $("#contBtn"); if (!cb) return;
  const [b, c, lab] = S.pos ? [S.pos.b, S.pos.c, "Đọc tiếp"] : [0, 1, "Bắt đầu đọc"];
  cb.href = chUrl(b, c); cb.querySelector(".muted").textContent = lab; cb.querySelector("b").textContent = refName(b, c);
}
function renderPlan() {
  const box = $("#planBox"); let h;
  if (!S.plan) {
    h = `<h2>Kế hoạch đọc</h2><p class="lead">Chọn một kế hoạch để đọc đều mỗi ngày. Có thể đổi bất cứ lúc nào.</p><div class="plan-pick">${Object.entries(PLANS).map(([id, p]) => `<button class="plan-card" data-plan="${id}"><span class="label">${p.days} ngày</span><b>${esc(p.name)}</b><span class="small muted">${esc(p.desc)}</span></button>`).join("")}</div>`;
  } else {
    const id = S.plan.id, p = PLANS[id], L = planList(id);
    const dayIdx = Math.max(0, Math.min(p.days - 1, daysBetween(S.plan.start, todayStr())));
    const doneN = L.filter(([b, c]) => S.plan.done[b + "." + c]).length, today = planDay(id, dayIdx);
    let behind = 0; for (let i = 0; i < dayIdx; i++) behind += planDay(id, i).filter(([b, c]) => !S.plan.done[b + "." + c]).length;
    h = `<h2>${esc(p.name)}</h2><div class="small muted">Ngày ${dayIdx + 1} trên ${p.days} · đã đọc ${doneN}/${L.length} đoạn</div>
    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="${L.length}" aria-valuenow="${doneN}" aria-label="Tiến độ kế hoạch"><i style="width:${((doneN / L.length) * 100).toFixed(1)}%"></i></div>
    ${behind ? `<p class="small" style="margin:6px 0 0">Còn ${behind} đoạn của những ngày trước. <button class="linkbtn" id="catchUp">Đọc bù</button></p>` : ""}
    <div class="label" style="margin-top:16px">Hôm nay đọc</div>
    <ul class="today-list">${today.map(([b, c]) => `<li><a href="${chUrl(b, c)}">${esc(refName(b, c))}</a><button class="check" data-done="${b}.${c}" aria-pressed="${planDone(b, c)}" aria-label="Đã đọc ${esc(refName(b, c))}">${ic("check")}</button></li>`).join("")}</ul>
    <p class="small" style="margin-top:14px" id="endRow"><button class="linkbtn" id="endPlan">Đổi hoặc dừng kế hoạch</button></p>`;
  }
  box.innerHTML = h;
  $$("[data-plan]", box).forEach((x) => (x.onclick = () => { S.plan = { id: x.dataset.plan, start: todayStr(), done: {} }; save(); renderPlan(); toast("Đã bắt đầu kế hoạch"); }));
  $$("[data-done]", box).forEach((x) => (x.onclick = () => { const [b, c] = x.dataset.done.split(".").map(Number); togglePlanCh(b, c); renderPlan(); }));
  const cu = $("#catchUp");
  if (cu) cu.onclick = () => { const id = S.plan.id, dayIdx = Math.min(PLANS[id].days - 1, daysBetween(S.plan.start, todayStr())); for (let i = 0; i < dayIdx; i++) { const m = planDay(id, i).find(([b, c]) => !planDone(b, c)); if (m) { location.href = chUrl(m[0], m[1]); return; } } };
  const ep = $("#endPlan");
  if (ep) ep.onclick = () => {
    $("#endRow").innerHTML = `Dừng kế hoạch sẽ xóa tiến độ đã đánh dấu. <button class="linkbtn" id="endYes">Dừng kế hoạch</button> · <button class="linkbtn" id="endNo" style="color:var(--muted)">Giữ lại</button>`;
    $("#endYes").onclick = () => { S.plan = null; save(); renderPlan(); }; $("#endNo").onclick = renderPlan;
  };
}

/* ---------- Trang sách ---------- */
function initBook() {
  const b = +document.body.dataset.b;
  $$("#bookChs a").forEach((a) => { const c = +a.dataset.c; if (S.pos && S.pos.b === b && S.pos.c === c) a.classList.add("cur"); else if (planDone(b, c)) a.classList.add("read"); });
}

/* ---------- Tìm kiếm ---------- */
let scope = "all", sTimer = null, allLoaded = false, FOLD = null;
async function loadAll(onProg) {
  if (allLoaded) return; let n = 0;
  await Promise.all(BOOKS.map((_, i) => loadBook(i).then(() => onProg(++n))));
  FOLD = BOOKS.map((_, b) => cache[b].map((ch) => ch.map(fold))); allLoaded = true;
}
function initSearch() {
  const q = $("#q"), qs = new URLSearchParams(location.search).get("q");
  if (S.pos) $("#scopeBook").textContent = "Sách " + BOOKS[S.pos.b][0]; else $("#scopeBook").hidden = true;
  $$("#scope .chip").forEach((c) => (c.onclick = () => { scope = c.dataset.s; $$("#scope .chip").forEach((x) => x.setAttribute("aria-pressed", x === c)); doSearch(); }));
  q.addEventListener("input", () => { clearTimeout(sTimer); sTimer = setTimeout(doSearch, 250); });
  $("#sForm").addEventListener("submit", (e) => { e.preventDefault(); const r = parseRef(q.value); if (r) location.href = chUrl(r.b, r.c, r.v); else doSearch(); });
  if (qs) { q.value = qs; doSearch(); } else q.focus();
}
async function doSearch() {
  const q = $("#q").value.trim(), out = $("#sOut");
  try { history.replaceState(null, "", q ? "?q=" + encodeURIComponent(q) : location.pathname); } catch (e) {}
  if (!q) { out.innerHTML = `<p class="muted small">Gõ không dấu cũng tìm được: “yeu thuong” sẽ ra “yêu thương”. Gõ có dấu để tìm đúng từng chữ.</p>`; return; }
  const ref = parseRef(q);
  const head = ref ? `<a class="goto" href="${chUrl(ref.b, ref.c, ref.v)}">${ic("book")}Mở ${esc(refName(ref.b, ref.c, ref.v))}</a>` : "";
  if (q.length < 2) { out.innerHTML = head; return; }
  if (!allLoaded) {
    out.innerHTML = head + `<p class="count" id="prog">Đang tải toàn bộ Kinh Thánh để tìm… 0/66</p>`;
    try { await loadAll((n) => { const p = $("#prog"); if (p) p.textContent = `Đang tải toàn bộ Kinh Thánh để tìm… ${n}/66`; }); }
    catch (e) { out.innerHTML = head + `<p class="count">Không tải được dữ liệu. Kiểm tra kết nối mạng.</p>`; return; }
    if ($("#q").value.trim() !== q) return;
  }
  const exact = fold(q) !== q.toLowerCase(), needle = exact ? q.toLowerCase() : fold(q);
  const cb = S.pos ? S.pos.b : 0;
  const [b0, b1] = scope === "ot" ? [0, NT] : scope === "nt" ? [NT, 66] : scope === "book" ? [cb, cb + 1] : [0, 66];
  const hits = []; let total = 0;
  for (let b = b0; b < b1; b++) { const chs = cache[b]; for (let c = 0; c < chs.length; c++) { const vs = chs[c]; for (let v = 0; v < vs.length; v++) {
    const hay = exact ? vs[v].toLowerCase() : FOLD[b][c][v]; if (hay.indexOf(needle) < 0) continue; total++; if (hits.length < 200) hits.push([b, c + 1, v + 1, hay, vs[v]]);
  } } }
  const mk = (hay, orig) => { let o = "", p = 0, i; while ((i = hay.indexOf(needle, p)) >= 0) { o += esc(orig.slice(p, i)) + "<mark>" + esc(orig.slice(i, i + needle.length)) + "</mark>"; p = i + needle.length; } return o + esc(orig.slice(p)); };
  out.innerHTML = head + `<p class="count">${total ? `${total.toLocaleString("vi-VN")} câu${total > 200 ? " · hiện 200 câu đầu" : ""}` : "Không tìm thấy câu nào. Thử bỏ dấu hoặc mở rộng phạm vi."}</p>
   <ul class="results">${hits.map(([b, c, v, hay, orig]) => `<li><a href="${chUrl(b, c, v)}"><div class="ref">${esc(refName(b, c, v))}</div><div class="txt">${mk(hay, orig)}</div></a></li>`).join("")}</ul>`;
}

/* ---------- Đã lưu ---------- */
let savedKind = "hl";
function initSaved() {
  const qk = new URLSearchParams(location.search).get("k");
  if (["hl", "notes", "bm"].includes(qk)) { savedKind = qk; $$("#savedSeg button").forEach((x) => x.setAttribute("aria-pressed", x.dataset.k === qk)); }
  $$("#savedSeg button").forEach((b) => (b.onclick = () => { savedKind = b.dataset.k; $$("#savedSeg button").forEach((x) => x.setAttribute("aria-pressed", x === b)); renderSaved(); }));
  $("#backupBtn").onclick = () => {
    const data = JSON.stringify({ app: "kinhthanh1925", v: 1, at: new Date().toISOString(), hl: S.hl, notes: S.notes, bm: S.bm, plan: S.plan }, null, 1);
    downloadBlob(new Blob([data], { type: "application/json" }), `kinh-thanh-1925-sao-luu-${todayStr()}.json`); toast("Đã tải bản sao lưu");
  };
  $("#restoreFile").onchange = async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try { const d = JSON.parse(await f.text()); if (d.app !== "kinhthanh1925") throw 0; Object.assign(S.hl, d.hl || {}); Object.assign(S.notes, d.notes || {}); Object.assign(S.bm, d.bm || {}); if (d.plan && !S.plan) S.plan = d.plan; save(); renderSaved(); toast("Đã khôi phục"); }
    catch (_) { toast("Tệp này không phải bản sao lưu của Kinh Thánh 1925"); }
    e.target.value = "";
  };
  $("#syncCardBtn").onclick = () => openAcct();
  syncCard();
  renderSaved();
}
function syncCard() {
  const t = $("#syncCardText"), b = $("#syncCardBtn"); if (!t) return;
  t.textContent = user ? `Đang đồng bộ với tài khoản ${user.email || user.name || ""}. Tô màu, ghi chú và kế hoạch đọc có trên mọi thiết bị bạn đăng nhập.` : "Tô màu, ghi chú và kế hoạch đọc đang lưu trên trình duyệt này. Đăng nhập để giữ chúng trên mọi thiết bị, hoặc tải bản sao lưu.";
  b.hidden = !!user;
}
async function renderSaved() {
  const L = $("#savedList"), src = S[savedKind];
  const keys = Object.keys(src).sort((a, b) => { const A = parseKey(a), B = parseKey(b); return A[0] - B[0] || A[1] - B[1] || A[2] - B[2]; });
  if (!keys.length) {
    const msg = { hl: ["Chưa tô màu câu nào", "Khi đọc, chạm vào một câu rồi chọn màu."], notes: ["Chưa có ghi chú", "Chạm vào một câu rồi chọn Ghi chú."], bm: ["Chưa đánh dấu câu nào", "Chạm vào một câu rồi chọn Đánh dấu."] }[savedKind];
    L.innerHTML = `<li class="empty" style="background:none;border:0"><b>${msg[0]}</b>${msg[1]}</li>`; return;
  }
  L.innerHTML = `<li class="empty" style="background:none;border:0">Đang tải…</li>`;
  try { await Promise.all([...new Set(keys.map((k) => parseKey(k)[0]))].map(loadBook)); } catch (e) { L.innerHTML = `<li class="empty">Không tải được dữ liệu. Kiểm tra kết nối mạng.</li>`; return; }
  L.innerHTML = keys.map((k) => {
    const [b, c, v] = parseKey(k), t = cache[b][c - 1][v - 1], hl = S.hl[k];
    return `<li><div class="top-row">${hl ? `<span class="swatch" style="background:${HL[hl]}"></span>` : ""}<a class="ref" href="${chUrl(b, c, v)}">${esc(refName(b, c, v))}</a><button class="ibtn" data-del="${k}" aria-label="Xóa ${esc(refName(b, c, v))}">${ic("trash")}</button></div>
    <a class="txt" href="${chUrl(b, c, v)}">${esc(t)}</a>${savedKind === "notes" ? `<div class="note">${esc(S.notes[k].t)}</div>` : ""}</li>`;
  }).join("");
  $$("[data-del]", L).forEach((x) => (x.onclick = () => { delete S[savedKind][x.dataset.del]; save(); renderSaved(); toast("Đã xóa"); }));
}

/* ---------- Trang khung khi không có mạng ---------- */
async function initShell() {
  const rel = decodeURIComponent(location.pathname).slice(BASE.length - 1).replace(/^\//, "");
  const m = rel.match(/^([a-z0-9-]+)\/(\d+)\/?$/);
  const box = $("#shell");
  const b = m ? SLUGS.indexOf(m[1]) : -1, c = m ? +m[2] : 0;
  if (b < 0 || c < 1 || c > CHS[b]) {
    box.innerHTML = `<h1 class="page">Đang không có mạng</h1><p class="lead">Trang này chưa được lưu trên máy. Hãy mở một đoạn Kinh Thánh đã tải, hoặc vào Cỡ chữ và giao diện để tải toàn bộ khi có mạng.</p><div class="section row"><a class="btn" href="${BASE}muc-luc/">Mục lục</a></div>`;
    return;
  }
  try { await loadBook(b); } catch (e) { box.innerHTML = `<h1 class="page">Đang không có mạng</h1><p class="lead">${esc(BOOKS[b][0])} chưa được tải về máy. Khi có mạng, mở Cỡ chữ và giao diện rồi bấm “Tải toàn bộ Kinh Thánh”.</p>`; return; }
  document.title = `${refName(b, c)} – Kinh Thánh 1925`;
  document.body.dataset.page = "chapter"; document.body.dataset.b = b; document.body.dataset.c = c;
  $("#pickBtn span").textContent = refName(b, c);
  box.innerHTML = chapterMarkup(b, c, cache[b][c - 1]);
  initChapter(b, c);
}


/* ---------- Tài khoản và đồng bộ ---------- */
// Dữ liệu cá nhân được "trải phẳng" thành từng mục (h|câu, n|câu, b|câu, p, d|đoạn, pos). Mỗi mục có dấu thời gian
// sửa gần nhất; khi đồng bộ, mục nào sửa sau thì thắng, kể cả việc xóa. Lần đầu đăng nhập thì gộp cả hai bên.
const MKEY = "kt1925m", UKEY = "kt1925u", DAY = 864e5;
const lsGet = (k) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
const lsSet = (k, v) => { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
let user = lsGet(UKEY), fb = null, fbP = null, syncT = null, syncing = null, syncErr = false;
function flat(s) {
  const o = {};
  for (const k in s.hl) o["h|" + k] = s.hl[k];
  for (const k in s.notes) o["n|" + k] = s.notes[k];
  for (const k in s.bm) o["b|" + k] = s.bm[k];
  if (s.plan) { o.p = { id: s.plan.id, start: s.plan.start }; const tag = planTag(o.p); for (const k in s.plan.done) o["d|" + tag + k] = 1; }
  if (s.pos) o.pos = { b: s.pos.b, c: s.pos.c };
  return o;
}
function unflat(o) {
  const r = { hl: {}, notes: {}, bm: {}, plan: null, pos: o.pos || null }, done = {};
  for (const k in o) {
    const i = k.indexOf("|"); if (i < 0) continue;
    const t = k.slice(0, i), id = k.slice(i + 1);
    if (t === "h") r.hl[id] = o[k]; else if (t === "n") r.notes[id] = o[k]; else if (t === "b") r.bm[id] = o[k];
    else if (t === "d" && o.p && k.startsWith("d|" + planTag(o.p))) done[k.slice(2 + planTag(o.p).length)] = 1;
  }
  if (o.p && PLANS[o.p.id]) r.plan = { id: o.p.id, start: o.p.start, done };
  return r;
}
const js = (v) => JSON.stringify(v);
const planTag = (p) => `${p.id}@${p.start}|`; // đoạn đã đọc gắn với từng lần bắt đầu kế hoạch
function eq(a, b) { const ka = Object.keys(a); if (ka.length !== Object.keys(b).length) return false; for (const k of ka) if (!(k in b) || js(a[k]) !== js(b[k])) return false; return true; }
// Ghi dấu thời gian cho các mục vừa đổi (gọi sau mỗi lần lưu).
function stamp() {
  const M = lsGet(MKEY) || { m: {}, prev: null }, cur = flat(S), now = Date.now(); let dirty = false;
  if (M.prev) {
    for (const k in cur) if (!(k in M.prev) || js(cur[k]) !== js(M.prev[k])) { M.m[k] = now; if (k !== "pos") dirty = true; }
    for (const k in M.prev) if (!(k in cur)) { M.m[k] = now; if (k !== "pos") dirty = true; }
  }
  M.prev = cur; if (dirty) M.dirty = true; lsSet(MKEY, M);
  if (dirty) schedSync();
}
function merge(L, Lm, remote) {
  const R = (remote && remote.d) || {}, Rm = (remote && remote.m) || {}, d = {}, m = {}, now = Date.now();
  for (const k of new Set([...Object.keys(L), ...Object.keys(R), ...Object.keys(Lm), ...Object.keys(Rm)])) {
    const tl = Lm[k] || 0, tr = Rm[k] || 0;
    if (tr > tl || (tr === tl && k in R)) { if (k in R) d[k] = R[k]; if (tr) m[k] = tr; } // bằng nhau: theo bản trên mây để mọi máy giống nhau
    else { if (k in L) d[k] = L[k]; if (tl) m[k] = tl; }
    if (!(k in d) && m[k] && now - m[k] > 180 * DAY) delete m[k]; // quên dấu xóa quá cũ
  }
  const tag = d.p ? "d|" + planTag(d.p) : null; // bỏ đoạn đã đọc của kế hoạch cũ
  for (const k in d) if (k.startsWith("d|") && (!tag || !k.startsWith(tag))) { delete d[k]; m[k] = now; }
  return { d, m, write: !remote || !eq(d, R) || !eq(m, Rm) ? { d, m, t: now } : null };
}
function applyData(d, m, dirty) {
  const r = unflat(d);
  Object.assign(S, r);
  try { localStorage.setItem(KEY, js(S)); } catch (e) {}
  lsSet(MKEY, { m, prev: flat(S), dirty: !!dirty, last: Date.now(), uid: user && user.uid });
  refreshUI();
}
function refreshUI() {
  const pg = document.body.dataset.page;
  if (typeof CH !== "undefined" && CH) decorate();
  if (pg === "saved") { renderSaved(); syncCard(); }
  if (pg === "home") { contCard(); renderPlan(); }
  if (pg === "book") initBook();
  if ($("#dAcct").open && user && acctMode === "me") renderAcct();
}
const loadFb = () => fbP || (fbP = import(`${BASE}assets/fb.js?v=${META.FBV}`).then((x) => (fb = x)).catch((e) => { fbP = null; throw e; }));
function schedSync(ms = 2500) { if (!user) return; clearTimeout(syncT); syncT = setTimeout(() => runSync().catch(() => {}), ms); }
function runSync() {
  if (!user) return Promise.resolve();
  if (syncing) return syncing;
  syncing = (async () => {
    try {
      await loadFb(); if (!fb.current()) return;
      setSync("busy");
      S = loadS(); // đọc lại: tab khác có thể vừa lưu
      const M = lsGet(MKEY) || { m: {} }, L = flat(S), Lm = M.m || {};
      const res = await fb.sync((remote) => merge(L, Lm, remote));
      const now = flat(loadS());
      if (eq(now, L)) applyData(res.d, res.m, false);
      else { S = loadS(); const M2 = lsGet(MKEY) || { m: {} }, again = merge(now, M2.m || {}, { d: res.d, m: res.m }); applyData(again.d, again.m, true); schedSync(500); }
      syncErr = false; setSync("ok");
    } catch (e) { console.warn("Đồng bộ lỗi", e); syncErr = true; setSync("err"); throw e; }
    finally { syncing = null; }
  })();
  return syncing;
}
function syncDueOnLoad() { const M = lsGet(MKEY); return !M || M.dirty || !M.last || Date.now() - M.last > 6e4; }

// ----- Giao diện tài khoản -----
const GLOGO = `<svg class="glogo" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17z"/><path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.2-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>`;
const inAppUA = /Zalo|FBAN|FBAV|FB_IAB|Instagram|Messenger|Line\//i.test(navigator.userAgent);
let acctMode = "in";
const ERR = {
  "auth/invalid-email": "Email chưa đúng. Kiểm tra lại giúp nhé.",
  "auth/missing-password": "Hãy nhập mật khẩu.",
  "auth/invalid-credential": "Email hoặc mật khẩu không đúng.",
  "auth/wrong-password": "Mật khẩu không đúng.",
  "auth/user-not-found": "Email hoặc mật khẩu không đúng.",
  "auth/invalid-login-credentials": "Email hoặc mật khẩu không đúng.",
  "auth/email-already-in-use": "Email này đã có tài khoản. Hãy đăng nhập, hoặc chọn Quên mật khẩu.",
  "auth/weak-password": "Mật khẩu cần ít nhất 6 ký tự.",
  "auth/too-many-requests": "Thử quá nhiều lần. Đợi vài phút rồi thử lại.",
  "auth/network-request-failed": "Không kết nối được. Kiểm tra mạng rồi thử lại.",
  "auth/popup-blocked": "Trình duyệt đã chặn cửa sổ đăng nhập Google. Cho phép cửa sổ bật lên rồi thử lại.",
  "auth/user-disabled": "Tài khoản này đã bị khóa.",
  "auth/requires-recent-login": "Vì bảo mật, hãy xác nhận lại rồi thử lần nữa.",
  "auth/user-mismatch": "Tài khoản vừa chọn không phải tài khoản đang đăng nhập.",
  "auth/account-exists-with-different-credential": "Email này đã đăng ký bằng cách khác. Hãy đăng nhập bằng email và mật khẩu.",
};
const errMsg = (e) => ERR[e && e.code] || "Có lỗi xảy ra. Thử lại sau.";
const quiet = (e) => e && (e.code === "auth/popup-closed-by-user" || e.code === "auth/cancelled-popup-request");
function acctButton() {
  const b = $("#acctBtn"); if (!b) return;
  if (user) { const ch = (user.name || user.email || "?").trim()[0].toUpperCase(); b.innerHTML = `<span class="av" aria-hidden="true">${esc(ch)}</span>`; b.classList.add("on"); b.title = b.ariaLabel = `Tài khoản: ${user.email || user.name}`; }
  else { b.innerHTML = ic("user"); b.classList.remove("on"); b.title = b.ariaLabel = "Tài khoản"; }
}
function openAcct(mode) {
  acctMode = mode || (user ? "me" : "in");
  renderAcct(); $("#dAcct").showModal();
  if (user && syncDueOnLoad()) runSync().catch(() => {});
  loadFb().then(() => { const g = $("#gBtn"); if (g) g.disabled = false; }).catch(() => { const e = $("#acctErr"); if (e) { e.textContent = "Không tải được phần đăng nhập. Kiểm tra mạng rồi mở lại."; e.hidden = false; } });
}
function setSync(state) {
  const el = $("#syncState"); if (!el) return;
  const M = lsGet(MKEY) || {};
  el.dataset.state = state;
  if (state === "err") { el.innerHTML = `Chưa đồng bộ được. <button class="linkbtn" id="syncRetry">Thử lại</button>`; $("#syncRetry").onclick = () => runSync().catch(() => {}); return; }
  el.textContent = state === "busy" ? "Đang đồng bộ…" : M.last ? `Đã đồng bộ lúc ${new Date(M.last).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}` : "";
}
function renderAcct() {
  const box = $("#acctBody"), title = $("#acctTitle"), back = $("#acctBack");
  const mode = user ? (acctMode === "del" ? "del" : "me") : (["in", "up", "reset"].includes(acctMode) ? acctMode : "in");
  back.hidden = !["up", "reset", "del"].includes(mode);
  back.onclick = () => { acctMode = user ? "me" : "in"; renderAcct(); };
  const priv = `<p class="small muted acct-foot">Xem <a href="${BASE}rieng-tu/">quyền riêng tư</a>: lưu gì và cách xóa.</p>`;
  if (mode === "me") {
    title.textContent = "Tài khoản";
    const ch = esc((user.name || user.email || "?").trim()[0].toUpperCase());
    const n = (o) => Object.keys(o || {}).length;
    const stat = (k, num, label) => `<a class="acct-stat" href="${BASE}da-luu/?k=${k}"><b>${num}</b><span>${label}</span></a>`;
    box.innerHTML = `<div class="acct-me"><span class="av big" aria-hidden="true">${ch}</span><div><b>${esc(user.name || user.email)}</b>${user.name ? `<span class="small muted">${esc(user.email || "")}</span>` : ""}<span class="small" id="syncState"></span></div></div>
      <div class="acct-stats">${stat("hl", n(S.hl), "Tô màu")}${stat("notes", n(S.notes), "Ghi chú")}${stat("bm", n(S.bm), "Đánh dấu")}</div>
      <p class="small muted acct-out-msg" id="logoutMsg" hidden></p>
      <div class="acct-actions"><button class="btn" id="logoutBtn">Đăng xuất</button><button class="linkbtn small acct-del" id="delLink">Xóa tài khoản</button></div>`;
    setSync(syncing ? "busy" : syncErr ? "err" : "ok");
    $("#delLink").onclick = () => { acctMode = "del"; renderAcct(); };
    $("#logoutBtn").onclick = () => doLogout(false);
    return;
  }
  if (mode === "del") {
    title.textContent = "Xóa tài khoản";
    const pw = fb && fb.providers().includes("password") && !fb.providers().includes("google.com");
    box.innerHTML = `<p>Tài khoản <b>${esc(user.email || user.name)}</b> và mọi dữ liệu đã đồng bộ sẽ bị xóa vĩnh viễn, không khôi phục được.</p>
      <p class="small muted">Tô màu và ghi chú trên máy này vẫn được giữ lại.</p>
      <form id="delForm" novalidate>${pw ? `<label class="field"><span>Nhập mật khẩu để xác nhận</span><input type="password" id="delPass" autocomplete="current-password" required></label>` : `<p class="small muted">Bạn sẽ được hỏi chọn lại tài khoản Google để xác nhận.</p>`}
      <p class="acct-err" id="acctErr" role="alert" hidden></p>
      <div class="row"><button class="btn danger" type="submit" id="delYes">Xóa vĩnh viễn</button><button class="btn" type="button" id="delNo">Giữ tài khoản</button></div></form>`;
    $("#delNo").onclick = () => { acctMode = "me"; renderAcct(); };
    $("#delForm").onsubmit = async (e) => {
      e.preventDefault(); const err = $("#acctErr"), btn = $("#delYes"); err.hidden = true;
      const pass = pw ? $("#delPass").value : null;
      if (pw && !pass) { err.textContent = "Hãy nhập mật khẩu."; err.hidden = false; return; }
      btn.disabled = true;
      try { await fb.deleteAccount(pass); clearTimeout(syncT); user = null; lsSet(UKEY, null); lsSet(MKEY, null); acctButton(); syncCard(); $("#dAcct").close(); toast("Đã xóa tài khoản"); }
      catch (ex) { btn.disabled = false; if (!quiet(ex)) { err.textContent = errMsg(ex); err.hidden = false; } }
    };
    return;
  }
  // Chưa đăng nhập: đăng nhập / tạo tài khoản / quên mật khẩu
  title.textContent = { in: "Đăng nhập", up: "Tạo tài khoản", reset: "Đặt lại mật khẩu" }[mode];
  const lead = { in: "Đăng nhập để giữ tô màu, ghi chú, đánh dấu và kế hoạch đọc trên mọi thiết bị.", up: "Tạo tài khoản để giữ tô màu, ghi chú, đánh dấu và kế hoạch đọc trên mọi thiết bị. Những gì bạn đã lưu trên máy này sẽ được đưa vào tài khoản.", reset: "Nhập email đã đăng ký. Chúng tôi sẽ gửi một liên kết để bạn đặt mật khẩu mới." }[mode];
  const g = mode === "reset" ? "" : `<button class="btn gbtn" id="gBtn" type="button"${fb ? "" : " disabled"}>${GLOGO}Tiếp tục với Google</button>
    ${inAppUA ? `<p class="small muted acct-hint">Đăng nhập Google không chạy trong trình duyệt của Zalo hay Facebook. Hãy mở trang bằng Safari hoặc Chrome, hoặc dùng email bên dưới.</p>` : ""}
    <div class="or"><span>hoặc dùng email</span></div>`;
  box.innerHTML = `<p class="acct-lead">${lead}</p>${g}
    <form id="acctForm" novalidate>
      <label class="field"><span>Email</span><input type="email" id="aEmail" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" required></label>
      ${mode === "reset" ? "" : `<label class="field"><span>Mật khẩu${mode === "up" ? " <small class=\"muted\">(ít nhất 6 ký tự)</small>" : ""}</span><span class="pw"><input type="password" id="aPass" autocomplete="${mode === "up" ? "new-password" : "current-password"}" minlength="6" required><button class="linkbtn" type="button" id="pwShow" aria-pressed="false">Hiện</button></span></label>`}
      <p class="acct-err" id="acctErr" role="alert" hidden></p>
      <p class="acct-ok" id="acctOk" role="status" hidden></p>
      <button class="btn primary wide" type="submit" id="acctSubmit">${{ in: "Đăng nhập", up: "Tạo tài khoản", reset: "Gửi liên kết" }[mode]}</button>
    </form>
    <div class="acct-links">${mode === "in" ? `<button class="linkbtn" data-mode="reset">Quên mật khẩu?</button><span>Chưa có tài khoản? <button class="linkbtn" data-mode="up">Tạo tài khoản</button></span>` : mode === "up" ? `<span>Đã có tài khoản? <button class="linkbtn" data-mode="in">Đăng nhập</button></span>` : `<button class="linkbtn" data-mode="in">Quay lại đăng nhập</button>`}</div>${priv}`;
  const em = $("#aEmail"); em.value = renderAcct._email || ""; em.oninput = () => (renderAcct._email = em.value.trim());
  $$("[data-mode]", box).forEach((x) => (x.onclick = () => { acctMode = x.dataset.mode; renderAcct(); setTimeout(() => $("#aEmail").focus(), 0); }));
  const pws = $("#pwShow"); if (pws) pws.onclick = () => { const p = $("#aPass"), on = p.type === "password"; p.type = on ? "text" : "password"; pws.textContent = on ? "Ẩn" : "Hiện"; pws.setAttribute("aria-pressed", on); };
  const err = $("#acctErr"), ok = $("#acctOk"), sub = $("#acctSubmit");
  const fail = (e) => { if (quiet(e)) return; err.textContent = errMsg(e); err.hidden = false; };
  const gb = $("#gBtn");
  if (gb) gb.onclick = () => { err.hidden = true; if (!fb) return; fb.signInGoogle().then(signedIn).catch(fail); };
  $("#acctForm").onsubmit = async (e) => {
    e.preventDefault(); err.hidden = ok.hidden = true;
    const email = em.value.trim(), pass = mode === "reset" ? "" : $("#aPass").value;
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail({ code: "auth/invalid-email" });
    if (mode !== "reset" && !pass) return fail({ code: "auth/missing-password" });
    if (mode === "up" && pass.length < 6) return fail({ code: "auth/weak-password" });
    sub.disabled = true;
    try {
      await loadFb();
      if (mode === "reset") { await fb.resetPassword(email); ok.textContent = `Nếu ${email} đã đăng ký, một email đặt lại mật khẩu sẽ đến trong vài phút. Xem cả hộp thư Spam.`; ok.hidden = false; }
      else signedIn(await (mode === "up" ? fb.signUp(email, pass) : fb.signIn(email, pass)));
    } catch (ex) { fail(ex); }
    sub.disabled = false;
  };
}
function setUser(u) {
  user = u ? { uid: u.uid, email: u.email || "", name: u.displayName || "" } : null;
  lsSet(UKEY, user); acctButton(); syncCard();
}
async function signedIn(cred) {
  const u = cred && cred.user; if (!u) return;
  const M = lsGet(MKEY);
  if (M && M.uid && M.uid !== u.uid) lsSet(MKEY, { m: {}, prev: flat(S) }); // dữ liệu trên máy chưa thuộc tài khoản nào khác
  setUser(u); acctMode = "me"; renderAcct();
  try { await runSync(); toast("Đã đăng nhập và đồng bộ"); } catch (e) { toast("Đã đăng nhập. Sẽ đồng bộ khi có mạng."); }
}
async function doLogout(force) {
  const btn = $("#logoutBtn"), msg = $("#logoutMsg"); if (btn) btn.disabled = true;
  const M = lsGet(MKEY) || {};
  if (M.dirty && !force) {
    try { await runSync(); } catch (e) {
      if (msg) msg.hidden = false;
      if (msg) msg.innerHTML = `Có thay đổi mới chưa đồng bộ được. Đăng xuất bây giờ sẽ mất chúng. <button class="linkbtn danger" id="logoutForce">Vẫn đăng xuất</button>`;
      const f = $("#logoutForce"); if (f) f.onclick = () => doLogout(true);
      if (btn) btn.disabled = false; return;
    }
  }
  clearTimeout(syncT);
  try { await loadFb(); await fb.logOut(); } catch (e) {}
  Object.assign(S, { hl: {}, notes: {}, bm: {}, plan: null, pos: null });
  try { localStorage.setItem(KEY, js(S)); } catch (e) {}
  lsSet(MKEY, null); setUser(null); refreshUI();
  $("#dAcct").close(); toast("Đã đăng xuất. Dữ liệu vẫn còn trong tài khoản.");
}
$("#acctBtn").onclick = () => openAcct();
function initAccount() {
  acctButton();
  if (!user) return;
  // Đã đăng nhập: tải phần đăng nhập khi trang rảnh, kiểm tra phiên rồi đồng bộ nếu cần.
  const go = () => loadFb().then(() => {
    let first = true;
    fb.onUser((u) => {
      if (u) { setUser(u); if (first && syncDueOnLoad()) runSync().catch(() => {}); }
      else if (user) { setUser(null); lsSet(MKEY, null); }
      first = false;
    });
  }).catch(() => {});
  if ("requestIdleCallback" in window) requestIdleCallback(go, { timeout: 2500 }); else setTimeout(go, 800);
  addEventListener("online", () => schedSync(1000));
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && syncDueOnLoad()) schedSync(300); });
}

/* ---------- Khởi động ---------- */
const loadS = () => { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { return Object.assign({}, DEF); } };
function boot() {
  applyPrefs();
  ({
    home: initHome,
    book: initBook,
    chapter: () => initChapter(+document.body.dataset.b, +document.body.dataset.c),
    search: initSearch,
    saved: initSaved,
    shell: initShell,
  }[document.body.dataset.page] || (() => {}))();
  initAccount();
}
// Trang được dựng sẵn (tải trước) chỉ chạy khi người dùng thật sự mở nó, và đọc lại dữ liệu mới nhất
// để không ghi nhầm "đang đọc" hay đè mất màu tô vừa thêm ở trang trước.
if (document.prerendering) { applyPrefs(); document.addEventListener("prerenderingchange", () => { S = loadS(); boot(); }, { once: true }); }
else boot();
// Quay lại trang cũ bằng nút Back: trang lấy từ bộ nhớ đệm, cập nhật lại dữ liệu đã lưu.
addEventListener("pageshow", (e) => { if (e.persisted) { S = loadS(); applyPrefs(); if (typeof CH !== "undefined" && CH) decorate(); } });
