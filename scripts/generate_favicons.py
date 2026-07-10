"""Generate transparent favicon assets from logo-source-transparent.png."""
import base64
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "_pypkg"))

from PIL import Image

SRC = ROOT / "assets" / "logo-source-transparent.png"
FALLBACK_SRC = ROOT / "assets" / "central-riverfront-logo.png"
OUT_ASSETS = ROOT / "assets"
OUT_ROOT = ROOT


def to_transparent_rgba(img: Image.Image) -> Image.Image:
    src = img.convert("RGBA")
    px = src.load()
    w, h = src.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if r > 215 and g > 215 and b > 215:
                px[x, y] = (0, 0, 0, 0)
            elif r < 40 and g < 40 and b < 40:
                px[x, y] = (0, 0, 0, 0)
            elif b > r + 8 and b > g + 4 and b >= 80:
                px[x, y] = (r, g, b, 255)
            elif b > r and b > g:
                alpha = min(255, max(0, int((max(r, g, b) - 25) * 255 / 120)))
                px[x, y] = (r, g, b, alpha if alpha > 8 else 0)
            else:
                px[x, y] = (0, 0, 0, 0)
    bbox = src.getbbox()
    return src.crop(bbox) if bbox else src


def fit_square(img: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    fitted = img.resize((size, size), Image.Resampling.LANCZOS)
    canvas.alpha_composite(fitted)
    return canvas


def write_svg(img: Image.Image, path: Path, embed_size: int = 128) -> None:
    embedded = fit_square(img, embed_size)
    import io

    buf = io.BytesIO()
    embedded.save(buf, format="PNG", optimize=True)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {embed_size} {embed_size}" '
        f'role="img" aria-label="Central and Riverfront Apartments">\n'
        f'  <image width="{embed_size}" height="{embed_size}" href="data:image/png;base64,{b64}"/>\n'
        f"</svg>\n"
    )
    path.write_text(svg, encoding="utf-8")


def main() -> None:
    src_path = SRC if SRC.exists() else FALLBACK_SRC
    master = to_transparent_rgba(Image.open(src_path))

    png_sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "favicon-48x48.png": 48,
        "favicon.png": 48,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }

    root_names = {
        "favicon-16x16.png",
        "favicon-32x32.png",
        "favicon-48x48.png",
        "favicon.png",
        "apple-touch-icon.png",
    }

    for name, size in png_sizes.items():
        target = OUT_ROOT / name if name in root_names else OUT_ASSETS / name
        fit_square(master, size).save(target, optimize=True)

    fit_square(master, 1024).save(OUT_ASSETS / "logo-transparent-master.png", optimize=True)
    fit_square(master, 48).save(
        OUT_ROOT / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
    )
    write_svg(master, OUT_ROOT / "favicon.svg")
    print("Generated transparent favicons in", OUT_ROOT, "and", OUT_ASSETS)


if __name__ == "__main__":
    main()
