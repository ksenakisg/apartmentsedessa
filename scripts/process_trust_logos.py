#!/usr/bin/env python3
"""Remove baked-in light backgrounds from trust PNGs; write RGBA replacements."""

from __future__ import annotations

import shutil
import sys
from pathlib import Path

from PIL import Image


def is_light_background(r: int, g: int, b: int, *, strict_white: bool = False) -> bool:
    m, M = min(r, g, b), max(r, g, b)
    chroma = M - m
    lum = (r + g + b) / 3
    if r > 250 and g > 250 and b > 250:
        return True
    if strict_white:
        return False
    # Light gray / checkerboard-style neutrals
    if lum > 215 and chroma < 28:
        return True
    if lum > 235 and chroma < 45:
        return True
    return False


def neighbor_indices(x: int, y: int, w: int, h: int) -> list[tuple[int, int]]:
    out: list[tuple[int, int]] = []
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            if dx == 0 and dy == 0:
                continue
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h:
                out.append((nx, ny))
    return out


def is_booking_blue(r: int, g: int, b: int) -> bool:
    """Navy app-tile blue (dominant B, dark overall)."""
    if b < 55:
        return False
    if b > r + 12 and b > g + 8:
        return True
    if b > 70 and r < 95 and g < 110:
        return True
    return False


def process_booking(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = list(im.getdata())
    blue_mask: list[bool] = []
    for r, g, b, _a in px:
        blue_mask.append(is_booking_blue(r, g, b))

    out: list[tuple[int, int, int, int]] = []
    for y in range(h):
        for x in range(w):
            i = y * w + x
            r, g, b, a = px[i]
            has_blue_nb = any(blue_mask[ny * w + nx] for nx, ny in neighbor_indices(x, y, w, h))
            if blue_mask[i]:
                out.append((r, g, b, 255))
                continue
            # Keep bright pixels that touch blue (white wordmark + AA fringe)
            if (r + g + b) / 3 > 190 and has_blue_nb:
                out.append((r, g, b, 255))
                continue
            # Kill light background / checker / outer white margins
            if is_light_background(r, g, b):
                out.append((r, g, b, 0))
                continue
            # Mid tones far from blue: likely AA on outer edge of tile
            if has_blue_nb:
                out.append((r, g, b, min(255, int(a))))
            else:
                out.append((r, g, b, 0))

    out_im = Image.new("RGBA", (w, h))
    out_im.putdata(out)
    return out_im


def is_airbnb_coral(r: int, g: int, b: int) -> bool:
    """Airbnb 'Rausch' / coral-red family."""
    if r < 90:
        return False
    if r > g + 8 and r > b + 8 and g < 230:  # red-dominant
        return True
    if r > 180 and g > 40 and g < 200 and b < 200 and (r + g + b) < 520:
        return True
    return False


def process_airbnb(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    px = list(im.getdata())
    fg_mask: list[bool] = []
    for r, g, b, _a in px:
        fg_mask.append(is_airbnb_coral(r, g, b))

    out: list[tuple[int, int, int, int]] = []
    for y in range(h):
        for x in range(w):
            i = y * w + x
            r, g, b, a = px[i]
            has_fg_nb = any(fg_mask[ny * w + nx] for nx, ny in neighbor_indices(x, y, w, h))
            if fg_mask[i]:
                out.append((r, g, b, 255))
                continue
            # Anti-alias fringe near logo
            if has_fg_nb and not is_light_background(r, g, b, strict_white=False):
                out.append((r, g, b, 255))
                continue
            if is_light_background(r, g, b):
                out.append((r, g, b, 0))
                continue
            # Default transparent
            out.append((r, g, b, 0))

    out_im = Image.new("RGBA", (w, h))
    out_im.putdata(out)
    return out_im


def trim_alpha(im: Image.Image, pad: int = 2) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.size[0], r + pad)
    b = min(im.size[1], b + pad)
    return im.crop((l, t, r, b))


def remove_black_fringe(im: Image.Image, *, thresh: int = 38) -> Image.Image:
    """Drop near-black pixels that touch transparency (compression / matting halos)."""
    w, h = im.size
    px = list(im.getdata())
    out = list(px)

    def a_at(i: int) -> int:
        return px[i][3]

    for y in range(h):
        for x in range(w):
            i = y * w + x
            r, g, b, a = px[i]
            if a == 0:
                continue
            if r > thresh or g > thresh or b > thresh:
                continue
            touches_clear = False
            for nx, ny in neighbor_indices(x, y, w, h):
                if a_at(ny * w + nx) == 0:
                    touches_clear = True
                    break
            if touches_clear:
                out[i] = (r, g, b, 0)

    rim = Image.new("RGBA", (w, h))
    rim.putdata(out)
    return rim


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    trust = root / "assets" / "trust"
    jobs = (
        ("airbnb-src.png", "airbnb-logo.png", process_airbnb),
        ("booking-src.png", "booking-logo.png", process_booking),
    )
    for src_name, out_name, fn in jobs:
        path_src = trust / src_name
        path_out = trust / out_name
        if not path_src.exists():
            print("missing source", path_src, file=sys.stderr)
            return 1
        im = Image.open(path_src)
        out = trim_alpha(fn(im), pad=2)
        if out_name.startswith("booking"):
            out = remove_black_fringe(out)
            out = trim_alpha(out, pad=2)
        path_out.parent.mkdir(parents=True, exist_ok=True)
        out.save(path_out, format="PNG", optimize=True)
        print("wrote", path_out, out.size, "from", path_src.name)
        if out_name == "booking-logo.png":
            hero_booking = trust / "image_9.png"
            shutil.copyfile(path_out, hero_booking)
            print("wrote", hero_booking, "(homepage hero Booking mark)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
