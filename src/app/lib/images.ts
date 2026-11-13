import fs from "node:fs";
import path from "node:path";

const APARTMENT_FOLDERS = ["ap1", "ap2", "ap3", "ap4"] as const;
const PUBLIC_APARTMENTS_DIR = path.join(process.cwd(), "public", "apartments");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

// Sort by the leading number in the filename (01, 02, 3, 04, ... 10, 11),
// falling back to a plain string compare for ties / non-numeric names.
const compareByNumber = (a: string, b: string) => {
  const na = parseInt(a, 10);
  const nb = parseInt(b, 10);
  const aNum = !Number.isNaN(na);
  const bNum = !Number.isNaN(nb);
  if (aNum && bNum && na !== nb) return na - nb;
  if (aNum !== bNum) return aNum ? -1 : 1;
  return a.localeCompare(b);
};

const readFolder = (folder: string): string[] => {
  const dir = path.join(PUBLIC_APARTMENTS_DIR, folder);
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter((e) => e.isFile() && !e.name.startsWith(".") && IMAGE_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort(compareByNumber)
    .map((name) => `/apartments/${folder}/${name}`);
};

const APARTMENT_IMAGES: Record<string, string[]> = Object.fromEntries(
  APARTMENT_FOLDERS.map((folder) => [folder, readFolder(folder)])
);

export function getApartmentImages(folder: string): string[] {
  return APARTMENT_IMAGES[folder] ?? [];
}

export { APARTMENT_IMAGES };
