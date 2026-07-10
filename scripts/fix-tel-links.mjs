import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const htmlPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "index.html");
let html = fs.readFileSync(htmlPath, "utf8");

const telBlocks = [...html.matchAll(/<a\b[^>]*href="tel:\+306945209164"[^>]*>[\s\S]*?<\/a>/gi)];
let count = 0;

for (const match of telBlocks) {
  const block = match[0];
  if (!block.includes('data-i18n="') || block.includes("<span data-i18n")) continue;

  const keyMatch = block.match(/data-i18n="([^"]+)"/);
  if (!keyMatch) continue;

  const key = keyMatch[1];
  const inner = block
    .replace(/^<a\b[^>]*>/i, "")
    .replace(/<\/a>$/i, "")
    .replace(/\s*data-i18n="[^"]+"/g, "")
    .trim();

  const openTag = block.match(/^<a\b[^>]*>/i)[0].replace(/\s*data-i18n="[^"]+"/g, "");
  const fixed = `${openTag}<span data-i18n="${key}">${inner}</span></a>`;

  html = html.replace(block, fixed);
  count++;
}

fs.writeFileSync(htmlPath, html);
console.log("Fixed tel link blocks:", count);
