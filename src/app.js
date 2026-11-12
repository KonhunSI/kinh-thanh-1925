"use strict";
/*@META@*/
const { BASE, NT, CHS, VOD, BOOKS, SLUGS } = META;
const PLANS = {
  year: { name: "Trọn Kinh Thánh trong 1 năm", desc: "Từ Sáng Thế Ký đến Khải Huyền, khoảng 3–4 đoạn mỗi ngày.", days: 365, from: 0, to: 66 },
  nt90: { name: "Tân Ước trong 90 ngày", desc: "260 đoạn Tân Ước, khoảng 3 đoạn mỗi ngày.", days: 90, from: NT, to: 66 },
};
const HL = { y: "var(--h-y)", g: "var(--h-g)", b: "var(--h-b)", p: "var(--h-p)", v: "var(--h-v)" };
const WD = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

/* ---------- Lưu trữ trên máy ---------- */
const KEY = "kt1925";
const DEF = { pos: null, size: 19, fam: "serif", lay: "flow", theme: "auto", rate: 1, hl: {}, notes: {}, bm: {}, plan: null };
let S = (() => { try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { return Object.assign({}, DEF); } })();
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("Trình duyệt không cho lưu dữ liệu. Kiểm tra chế độ ẩn danh."); } }

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

/* ---------- Cỡ chữ và giao diện ---------- */
function applyPrefs() {
  const d = document.documentElement;
  d.style.setProperty("--read-size", S.size + "px");
  if (S.theme === "auto") d.removeAttribute("data-theme"); else d.setAttribute("data-theme", S.theme);
  d.classList.toggle("sans", S.fam === "sans");
  d.classList.toggle("lines", S.lay === "lines");
  $("#fs").value = S.size; $("#fsVal").textContent = S.size;
  for (const [id, val] of [["#segFam", S.fam], ["#segLay", S.lay], ["#segTheme", S.theme]])
    $$(id + " button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === val));
}
$("#aaBtn").onclick = () => { $("#dAa").showModal(); offlineStatus(); };
$("#fs").oninput = (e) => { S.size = +e.target.value; save(); applyPrefs(); };
for (const [id, k] of [["#segFam", "fam"], ["#segLay", "lay"], ["#segTheme", "theme"]])
  $$(id + " button").forEach((b) => (b.onclick = () => { S[k] = b.dataset.v; save(); applyPrefs(); }));
$$("dialog").forEach((d) => d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) d.close(); }));

/* ---------- Đọc khi không có mạng ---------- */
const DATA_CACHE = "kt-data-" + META.DATAV;
async function offlineStatus() {
  const msg = $("#offlineMsg"), btn = $("#offlineBtn");
  if (!("caches" in window) || !("serviceWorker" in navigator)) { msg.textContent = "Trình duyệt này chưa hỗ trợ đọc khi không có mạng."; btn.hidden = true; return; }
  try { const c = await caches.open(DATA_CACHE); const n = (await c.keys()).length; if (n >= 66) { msg.textContent = "Đã tải đủ 66 sách. Có thể đọc khi không có mạng."; btn.textContent = "Tải lại toàn bộ"; } else if (n) msg.textContent = `Đã có ${n}/66 sách trên máy.`; } catch (e) {}
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
let pickTab = "ot";
function curBook() { const b = document.body.dataset.b; return b != null ? +b : S.pos ? S.pos.b : -1; }
function renderBooks(filter = "") {
  $("#pickTitle").textContent = "Chọn sách"; $("#pickBack").hidden = true;
  const f = fold(filter).replace(/[\s-]/g, "");
  const list = BOOKS.map((_, i) => i).filter((i) => (f ? bookKeys[i].some((k) => k.includes(f)) : pickTab === "ot" ? i < NT : i >= NT));
  const cb = curBook();
  $("#pickBody").innerHTML = `<label class="sr" for="bf">Lọc tên sách</label><input class="filter" id="bf" placeholder="Gõ tên sách…" value="${esc(filter)}">
   ${f ? "" : `<div class="seg" style="margin-top:12px"><button data-t="ot" aria-pressed="${pickTab === "ot"}">Cựu Ước · 39</button><button data-t="nt" aria-pressed="${pickTab === "nt"}">Tân Ước · 27</button></div>`}
   <ul class="books">${list.map((i) => `<li><button data-b="${i}" class="${i === cb ? "cur" : ""}">${esc(BOOKS[i][0])}</button></li>`).join("") || `<li class="muted">Không thấy sách nào.</li>`}</ul>`;
  const bf = $("#bf");
  bf.oninput = () => { const p = bf.selectionStart; renderBooks(bf.value); const n = $("#bf"); n.focus(); n.setSelectionRange(p, p); };
  $$("#pickBody [data-t]").forEach((x) => (x.onclick = () => { pickTab = x.dataset.t; renderBooks(); }));
  $$("#pickBody [data-b]").forEach((x) => (x.onclick = () => { const b = +x.dataset.b; if (CHS[b] === 1) location.href = chUrl(b, 1); else renderChapters(b); }));
}
function renderChapters(b) {
  $("#pickTitle").textContent = BOOKS[b][0]; $("#pickBack").hidden = false;
  const cur = document.body.dataset.page === "chapter" || document.body.dataset.page === "shell" ? S.pos : null;
  let h = `<ul class="chs">`;
  for (let c = 1; c <= CHS[b]; c++) h += `<li><a href="${chUrl(b, c)}" class="${cur && cur.b === b && cur.c === c ? "cur" : ""}">${c}</a></li>`;
  $("#pickBody").innerHTML = h + `</ul>`;
}
$("#pickBack").onclick = () => renderBooks();
$("#pickBtn").onclick = () => { const cb = curBook(); pickTab = cb >= NT ? "nt" : "ot"; if (document.body.dataset.page === "chapter" && cb >= 0) renderChapters(cb); else renderBooks(); $("#dPick").showModal(); };
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
if (S.pos) { const t = $('[data-tab="read"]'); if (t) t.href = chUrl(S.pos.b, S.pos.c); }

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
  const t = $('[data-tab="read"]'); if (t) t.href = chUrl(b, c);
  if (!cache[b]) { try { await loadBook(b); } catch (e) {} }
  const vs = cache[b] ? cache[b][c - 1] : $$("#scr .v").map((el) => el.textContent.replace(/^\d+/, ""));
  CH = { b, c, verses: vs };
  decorate();
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
function clearSel() { sel.clear(); $$(".v.sel").forEach((x) => x.classList.remove("sel")); updateSelbar(); }
function updateSelbar() {
  const on = sel.size > 0; $("#selbar").hidden = !on; if (!on) return;
  const all = [...sel].every((v) => S.bm[key(CH.b, CH.c, v)]); $("#aBmLabel").textContent = all ? "Bỏ đánh dấu" : "Đánh dấu";
}
function selected() {
  const vs = [...sel].sort((a, b) => a - b);
  let parts = [], s = vs[0], p = vs[0];
  for (const v of vs.slice(1).concat([null])) { if (v === p + 1) { p = v; continue; } parts.push(s === p ? `${s}` : `${s}–${p}`); s = p = v; }
  return { vs, text: vs.map((v) => CH.verses[v - 1]).join(" "), ref: `${BOOKS[CH.b][0]} ${CH.c}:${parts.join(", ")}` };
}
$("#selClose").onclick = clearSel;
$$("#selbar .color").forEach((btn) => (btn.onclick = () => {
  const c = btn.dataset.c;
  for (const v of sel) { const k = key(CH.b, CH.c, v); if (c) S.hl[k] = c; else delete S.hl[k]; }
  save(); sel.clear(); decorate(); updateSelbar(); toast(c ? "Đã tô màu" : "Đã bỏ tô màu");
}));
$("#aCopy").onclick = () => { const s = selected(); copyText(`“${s.text}” (${s.ref}, Kinh Thánh 1925)\n${location.origin}${chUrl(CH.b, CH.c, s.vs[0])}`); clearSel(); };
$("#aBm").onclick = () => {
  const vs = [...sel], all = vs.every((v) => S.bm[key(CH.b, CH.c, v)]);
  for (const v of vs) { const k = key(CH.b, CH.c, v); if (all) delete S.bm[k]; else S.bm[k] = Date.now(); }
  save(); toast(all ? "Đã bỏ đánh dấu" : "Đã đánh dấu"); clearSel();
};
$("#aNote").onclick = () => openNote(Math.min(...sel));
$("#aImg").onclick = () => { const s = selected(); openImage(s.text, s.ref); clearSel(); };
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
async function openImage(text, ref) {
  try { await Promise.all([document.fonts.load('400 48px "Literata"'), document.fonts.load('600 30px "Be Vietnam Pro"')]); } catch (e) {}
  const W = 1080, H = 1350, cv = document.createElement("canvas"); cv.width = W; cv.height = H; const g = cv.getContext("2d");
  g.fillStyle = "#1B2028"; g.fillRect(0, 0, W, H);
  g.fillStyle = "#A3283A"; g.beginPath(); g.moveTo(860, 0); g.lineTo(930, 0); g.lineTo(930, 190); g.lineTo(895, 160); g.lineTo(860, 190); g.closePath(); g.fill();
  const pad = 110, maxW = W - pad * 2; let size = 60, lines;
  const wrap = (fs) => { g.font = `400 ${fs}px Literata, Georgia, serif`; const out = []; let cur = ""; for (const w of `“${text}”`.split(" ")) { const t = cur ? cur + " " + w : w; if (g.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else cur = t; } if (cur) out.push(cur); return out; };
  for (;;) { lines = wrap(size); if (lines.length * size * 1.45 < H - 560 || size <= 30) break; size -= 3; }
  const lh = size * 1.45; let y = (H - lines.length * lh) / 2 - 30; g.fillStyle = "#F1EEE7"; g.textBaseline = "top";
  for (const l of lines) { g.fillText(l, pad, y); y += lh; }
  g.font = '600 36px "Be Vietnam Pro", system-ui, sans-serif'; g.fillStyle = "#E27C89"; g.fillText(ref, pad, y + 36);
  g.font = '500 26px "Be Vietnam Pro", system-ui, sans-serif'; g.fillStyle = "#8D95A0"; g.fillText("KINH THÁNH · BẢN TRUYỀN THỐNG 1925", pad, H - 130);
  lastBlob = await new Promise((r) => cv.toBlob(r, "image/png"));
  lastName = "kinh-thanh-" + fold(ref).replace(/[^a-z0-9]+/g, "-").replace(/-$/, "") + ".png";
  $("#shareImg").src = URL.createObjectURL(lastBlob); $("#shareImg").alt = `Ảnh câu ${ref}`;
  const file = new File([lastBlob], lastName, { type: "image/png" });
  $("#imgShare").hidden = !(navigator.canShare && navigator.canShare({ files: [file] }));
  $("#imgShare").onclick = () => navigator.share({ files: [file], title: ref }).catch(() => {});
  $("#dImg").showModal();
}
$("#imgSave").onclick = () => { if (lastBlob) downloadBlob(lastBlob, lastName); };

/* ---------- Nghe đọc (giọng đọc của máy) ---------- */
let audio = null;
$("#pRate").value = String(S.rate);
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
  const voice = viVoice(); if (!voice) toast("Máy chưa có giọng tiếng Việt, âm đọc có thể không chuẩn.");
  const { b, c, verses } = CH; audio = { b, c, n: verses.length, cur: from, paused: false }; syncPlayer();
  let wake = null; try { navigator.wakeLock && navigator.wakeLock.request("screen").then((w) => (wake = w)).catch(() => {}); } catch (e) {}
  audio.release = () => { try { wake && wake.release(); } catch (e) {} };
  const speakFrom = (v) => {
    if (!audio || audio.stopped) return;
    if (v > verses.length) { endAudio(true); return; }
    const u = new SpeechSynthesisUtterance(verses[v - 1]); u.lang = "vi-VN"; if (voice) u.voice = voice; u.rate = S.rate;
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

/* ---------- Trang chủ ---------- */
async function initHome() {
  const d = new Date();
  $("#todayDate").textContent = `${WD[d.getDay()]}, ngày ${d.getDate()} tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
  const doy = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
  const [vb, vc, vv] = VOD[doy % VOD.length], b = vb - 1;
  $("#vodRef").textContent = refName(b, vc, vv); $("#vodRead").href = chUrl(b, vc, vv);
  let vt = $("#vodText").textContent;
  try { const data = await loadBook(b); vt = data[vc - 1][vv - 1]; $("#vodText").textContent = vt; } catch (e) {}
  $("#vodCopy").onclick = () => copyText(`“${vt}” (${refName(b, vc, vv)}, Kinh Thánh 1925)`);
  $("#vodImg").onclick = () => openImage(vt, refName(b, vc, vv));
  if (S.pos) { const cb = $("#contBtn"); cb.href = chUrl(S.pos.b, S.pos.c); cb.querySelector(".muted").textContent = "Đọc tiếp"; cb.querySelector("b").textContent = refName(S.pos.b, S.pos.c); }
  renderPlan();
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
  renderSaved();
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

/* ---------- Khởi động ---------- */
applyPrefs();
({
  home: initHome,
  book: initBook,
  chapter: () => initChapter(+document.body.dataset.b, +document.body.dataset.c),
  search: initSearch,
  saved: initSaved,
  shell: initShell,
}[document.body.dataset.page] || (() => {}))();
