"""Hand-pixeled 90s-style laser icons. Run: python make_icons.py"""
import math
from pathlib import Path
from PIL import Image

OUT = Path(__file__).parent
PAL = {"K": "#000000", "Y": "#FFCC00", "B": "#0066CC", "W": "#FFFFFF", "s": "#808080"}

# Laser warning: 23 wide so the burst has a true centre column (11).
TRIANGLE = """
..........KKK..........
.........KKKKK.........
.........KKYKK.........
........KKKYKKK........
........KKYYYKK........
.......KKKYYYKKK.......
.......KKYYYYYKK.......
......KKKYYYYYKKK......
......KKYYYYYYYKK......
.....KKKYYYYYYYKKK.....
.....KKYYYYYYYYYKK.....
....KKKYYYYYYYYYKKK....
....KKYYYYYYYYYYYKK....
...KKKYYYYYYYYYYYKKK...
...KKYYYYYYYYYYYYYKK...
..KKKYYYYYYYYYYYYYKKK..
..KKYYYYYYYYYYYYYYYKK..
.KKKYYYYYYYYYYYYYYYKKK.
.KKKKKKKKKKKKKKKKKKKKK.
..KKKKKKKKKKKKKKKKKKK..
"""
CX, CY = 11, 13
BURST = {(CX, CY)}
for dx, dy, n in ((0, -1, 3), (0, 1, 3), (-1, 0, 3), (1, 0, 3),
                  (-1, -1, 2), (1, -1, 2), (-1, 1, 2), (1, 1, 2)):
    BURST |= {(CX + dx * i, CY + dy * i) for i in range(1, n + 1)}
BEAM = {(x, CY) for x in range(6, CX - 3)}  # beam enters from the left edge


def build_laser():
    rows = [list(r) for r in TRIANGLE.split()]
    for x, y in BURST | BEAM:
        assert rows[y][x] == "Y", (x, y)
        rows[y][x] = "K"
    return ["".join(r) for r in rows]


def circle_sign(n=23, fill="B"):
    c = (n - 1) / 2
    rows = []
    for y in range(n):
        r = ""
        for x in range(n):
            d = math.hypot(x - c, y - c)
            r += "." if d > c + 0.5 else ("K" if d > c - 1.1 else fill)
        rows.append(r)
    return rows


# Safety glasses (15 wide), centred inside a blue "mandatory" circle.
GLASSES = """
..W...........W..
.W.W.........W.W.
WWWWWWWWWWWWWWWWW
WLLLLLLWWWLLLLLLW
WLLLLHLWWWLLLLHLW
WLLLHLLLWLLLLHLLW
WLLLLLW...WLLLLLW
.WWWWW.....WWWWW.
"""


LENSES = {  # name: (lens, glint)
    "black": ("#000000", "#FFFFFF"),
    "green": ("#20B040", "#B8F5B0"),
    "amber": ("#FF9A00", "#FFE9A0"),
    "clear": ("#9CCBF5", "#FFFFFF"),
    "dither": ("#CFE6FA", "#FFFFFF"),  # checkerboard with the blue = see-through
}


def build_glasses(lens="black"):
    PAL["L"], PAL["H"] = LENSES[lens]
    rows = [list(r) for r in circle_sign()]
    g = GLASSES.split()
    oy, ox = (23 - len(g)) // 2, (23 - len(g[0])) // 2
    for y, r in enumerate(g):
        for x, ch in enumerate(r):
            if ch != ".":
                if lens == "dither" and ch == "L" and (x + y) % 2:
                    ch = "B"
                rows[oy + y][ox + x] = ch
    return ["".join(r) for r in rows]


def with_shadow(rows):
    h, w = len(rows), len(rows[0])
    g = [[None] * (w + 1) for _ in range(h + 1)]
    for y, r in enumerate(rows):
        for x, ch in enumerate(r):
            if ch != ".":
                g[y + 1][x + 1] = PAL["s"]
    for y, r in enumerate(rows):
        for x, ch in enumerate(r):
            if ch != ".":
                g[y][x] = PAL[ch]
    return g


def to_png(grid, px, path):
    h, w = len(grid), len(grid[0])
    im = Image.new("RGBA", (w * px, h * px), (0, 0, 0, 0))
    for y, row in enumerate(grid):
        for x, c in enumerate(row):
            if c:
                rgb = tuple(int(c[i:i + 2], 16) for i in (1, 3, 5))
                im.paste(rgb + (255,), (x * px, y * px, (x + 1) * px, (y + 1) * px))
    im.save(path)


def to_svg(grid, path):
    h, w = len(grid), len(grid[0])
    rects = []
    for y, row in enumerate(grid):
        x = 0
        while x < w:
            c = row[x]
            if not c:
                x += 1
                continue
            s = x
            while x < w and row[x] == c:
                x += 1
            rects.append(f'<rect x="{s}" y="{y}" width="{x - s}" height="1" fill="{c}"/>')
    path.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
                    f'shape-rendering="crispEdges">{"".join(rects)}</svg>', encoding="utf-8")


PAL["R"] = "#E00000"

CAUTION_TRI = """
....KKK....
...KKKKK...
...KKYKK...
..KKKYKKK..
..KKKYKKK..
.KKKKYKKKK.
.KKKKKKKKK.
KKKKKYKKKKK
KKKKKKKKKKK
.KKKKKKKKK.
"""


def build_burst(n=15):
    c = n // 2
    rows = [["."] * n for _ in range(n)]
    # hand-placed octant: cardinal ray, 22.5deg ray, 45deg ray
    base = {(i, 0) for i in range(2, 8)} | {(i, i) for i in range(2, 6)} | {(4, 2), (5, 2), (6, 3), (7, 3)}
    pts = {(dx, dy) for dx in (-1, 0, 1) for dy in (-1, 0, 1)}
    for x, y in base:
        for sx in (1, -1):
            for sy in (1, -1):
                pts |= {(sx * x, sy * y), (sx * y, sy * x)}
    for x, y in pts:
        if abs(x) <= c and abs(y) <= c:
            rows[c + y][c + x] = "R"
    return ["".join(r) for r in rows]


def plain(rows):
    return [[PAL[ch] if ch != "." else None for ch in r] for r in rows]


MINI_BURST = """
R...R...R
.R..R..R.
..R.R.R..
...RRR...
RRRRRRRRR
...RRR...
..R.R.R..
.R..R..R.
R...R...R
"""

for name, rows in (("caution-tri", CAUTION_TRI.split()), ("red-burst", build_burst()), ("red-burst-mini", MINI_BURST.split())):
    g = plain(rows)
    for px in (1, 2, 3):
        to_png(g, px, OUT / f"{name}-{px}x.png")

for name, lens in [("laser", None), ("glasses", "black")] + [(f"glasses-{k}", k) for k in LENSES if k != "black"]:
    rows = build_laser() if lens is None else build_glasses(lens)
    assert all(len(r) == len(rows[0]) for r in rows), name
    g = with_shadow(rows)
    for px in (1, 2, 4, 8):
        to_png(g, px, OUT / f"{name}-icon-{px}x.png")
    to_svg(g, OUT / f"{name}-icon.svg")
# Standalone goggles (25 wide, centre col 12), like a NOTICE sign pictogram.
TEMPLES = ["K" + "." * 23 + "K", "KK" + "." * 21 + "KK", ".K" + "." * 21 + "K."]
WRAP = TEMPLES + [
    "." + "K" * 23 + ".",
    ".K" + "G" * 21 + "K.",
    ".KGWW" + "G" * 9 + "WW" + "G" * 7 + "K.",
    ".KGW" + "G" * 10 + "W" + "G" * 8 + "K.",
    ".K" + "G" * 21 + "K.",
    ".K" + "G" * 8 + "KKKKK" + "G" * 8 + "K.",
    ".KK" + "G" * 6 + "KK...KK" + "G" * 6 + "KK.",
    "..KKKKKKKK.....KKKKKKKK..",
]
SPECS = TEMPLES + [
    "." + "K" * 23 + ".",
    ".KGGGGGGGGK...KGGGGGGGGK.",
    ".KGWWGGGGGK...KGWWGGGGGK.",
    ".KGWGGGGGGK...KGWGGGGGGK.",
    ".KGGGGGGGGK...KGGGGGGGGK.",
    "..KGGGGGGK.....KGGGGGGK..",
    "...KKKKKK.......KKKKKK...",
]
PAL["G"], PAL["g"] = "#20B040", "#A8E6A0"


def goggles(rows, dither=False):
    out = []
    for y, r in enumerate(rows):
        out.append("".join("g" if dither and ch == "G" and (x + y) % 2 else ch for x, ch in enumerate(r)))
    assert all(len(r) == 25 for r in out)
    return out


for name, rows in (("goggles-wrap", goggles(WRAP)), ("goggles-wrap-dither", goggles(WRAP, True)),
                   ("goggles-specs", goggles(SPECS))):
    g = with_shadow(rows)
    for px in (1, 2, 4, 8):
        to_png(g, px, OUT / f"{name}-{px}x.png")
    to_svg(g, OUT / f"{name}.svg")
# Original green-lens glasses, no circle, black frame.
PAL["h"] = "#B8F5B0"
CLASSIC = [r.replace("W", "K").replace("L", "G").replace("H", "h") for r in GLASSES.split()]
CLASSIC[6] = CLASSIC[6][:7] + "K.K" + CLASSIC[6][10:]  # close frame around the nose notch
g = with_shadow(CLASSIC)
for px in (1, 2, 4, 8):
    to_png(g, px, OUT / f"glasses-green-plain-{px}x.png")
to_svg(g, OUT / "glasses-green-plain.svg")
# Simple 8-spoke burst (plus + x) for the DANGER sign.
def build_burst8(n=15, diag=5):
    c = n // 2
    rows = [["."] * n for _ in range(n)]
    for i in range(-c, c + 1):
        rows[c][c + i] = rows[c + i][c] = "R"
    for i in range(-diag, diag + 1):
        rows[c + i][c + i] = rows[c + i][c - i] = "R"
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            rows[c + dy][c + dx] = "R"
    return ["".join(r) for r in rows]


g = plain(build_burst8())
for px in (1, 2, 3):
    to_png(g, px, OUT / f"red-burst8-{px}x.png")
# Red version of the triangle-icon burst (same 7x7 shape: arms 3 / diagonals 2).
rb = [["."] * 7 for _ in range(7)]
for x, y in BURST:
    rb[y - CY + 3][x - CX + 3] = "R"
g = plain(["".join(r) for r in rb])
for px in (1, 2, 3, 6):
    to_png(g, px, OUT / f"red-burst-tri-{px}x.png")
# Cut-out caution triangle: the "!" is transparent so the bar colour shows through.
g = plain([r.replace("Y", ".") for r in CAUTION_TRI.split()])
for px in (1, 2, 3):
    to_png(g, px, OUT / f"caution-tri-cut-{px}x.png")
print("ok")
