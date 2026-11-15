# Vẽ lại logo Kinh Thánh 1925 (sách bìa đen, chữ mạ vàng, ruy-băng đỏ) thành SVG vector.
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
FONT = sys.argv[1]
f = TTFont(FONT); gs = f.getGlyphSet(); cmap = f.getBestCmap(); upm = f['head'].unitsPerEm; hmtx = f['hmtx']
def text_path(s, size, cx, baseline, track=0.0):
    sc = size / upm
    names = [cmap[ord(ch)] for ch in s]
    adv = [hmtx[n][0] * sc for n in names]
    width = sum(adv) + track * size * (len(s) - 1)
    x = cx - width / 2; d = []
    for n, a in zip(names, adv):
        pen = SVGPathPen(gs)
        gs[n].draw(TransformPen(pen, (sc, 0, 0, -sc, x, baseline)))
        d.append(pen.getCommands()); x += a + track * size
    return " ".join(d)

GOLD = '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E6C26A"/><stop offset=".5" stop-color="#C99A3E"/><stop offset="1" stop-color="#A97A26"/></linearGradient>'
EDGE = '<linearGradient id="e" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9C6E1F"/><stop offset=".5" stop-color="#E8C66E"/><stop offset="1" stop-color="#B8862E"/></linearGradient>'
def book(with_text=True):
    # viewBox 512: bìa x 138..362, y 84..394
    t = ""
    if with_text:
        t = (f'<path fill="url(#g)" d="{text_path("Kinh Thánh", 25.5, 252, 196)}"/>'
             f'<path fill="url(#g)" d="{text_path("1925", 13, 252, 222, track=0.7)}"/>')
    return (
        '<path d="M150 98h214a10 10 0 0 1 10 10v290a10 10 0 0 1-10 10H160a14 14 0 0 1-14-14z" fill="#121212"/>'  # bìa sau
        '<path d="M148 94h212a8 8 0 0 1 8 8v290a6 6 0 0 1-6 6H156a10 10 0 0 1-10-10z" fill="url(#e)"/>'          # mép giấy vàng
        '<rect x="138" y="84" width="224" height="310" rx="10" fill="#1C1C1C"/>'                                  # bìa trước
        '<path d="M148 84h4v310h-4z" fill="#242424"/>'                                                            # gáy
        '<rect x="157" y="98" width="190" height="282" rx="1.5" fill="none" stroke="url(#g)" stroke-width="2.2"/>' # khung vàng
        + t +
        '<path d="M164 394h24v54l-12-10-12 10z" fill="#8A1C2B"/>'                                                 # ruy-băng
    )
def svg(inner, bg=None, vb="0 0 512 512", extra=""):
    b = f'<rect width="512" height="512" fill="{bg}"/>' if bg else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><defs>{GOLD}{EDGE}</defs>{b}{extra}{inner}</svg>'
out = sys.argv[2]
open(f"{out}/logo.svg", "w").write(svg(book(True), vb="120 70 270 400"))                    # sách có chữ, nền trong
open(f"{out}/logo-mark.svg", "w").write(svg(book(False), vb="120 70 270 400"))              # sách không chữ (cỡ nhỏ)
open(f"{out}/app-icon.svg", "w").write(svg(f'<g transform="translate(256 256) scale(1.22) translate(-256 -266)">{book(True)}</g>', bg="#F7F3EA"))
open(f"{out}/app-icon-maskable.svg", "w").write(svg(f'<g transform="translate(256 256) scale(.92) translate(-256 -266)">{book(True)}</g>', bg="#F7F3EA"))
open(f"{out}/favicon.svg", "w").write(svg(f'<g transform="translate(256 256) scale(1.42) translate(-256 -266)">{book(False)}</g>', bg="#F7F3EA", extra=""))
