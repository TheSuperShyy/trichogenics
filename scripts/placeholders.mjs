/**
 * Generates branded placeholder images into public/media/ using sharp.
 * These stand in for real photography / AI video posters so the staging build
 * looks intentional. They are overwritten by the real assets produced via
 * `npm run transcode` (and by dropping real photos into public/media/).
 *
 * Run: npm run placeholders
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

const ROOT = join(process.cwd(), "public", "media");

const NAVY = "#071331";
const NAVY2 = "#16294A";
const TEAL = "#12A594";
const SKY = "#9BC2E0";

function svg(w, h, c1, c2, label, textColor = "#ffffff") {
  return Buffer.from(`
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <text x="50%" y="50%" fill="${textColor}" fill-opacity="0.55" font-family="Georgia, serif"
        font-size="${Math.round(Math.min(w, h) / 14)}" text-anchor="middle" dominant-baseline="middle">${label}</text>
</svg>`);
}

const SKY1 = "#C9E1F1";
const SKY0 = "#F2F8FC";

const targets = [
  { path: "hero/hero-poster.jpg", w: 1600, h: 1100, c1: SKY1, c2: SKY0, label: "Trichogenics", textColor: NAVY },
  { path: "hero/he-hero.jpg", w: 1600, h: 1100, c1: SKY1, c2: SKY0, label: "טריכוג׳ניקס", textColor: NAVY },
  { path: "og/dr-asi-dr-eric.jpg", w: 1200, h: 630, c1: NAVY, c2: TEAL, label: "Trichogenics" },
  { path: "team/dr-asi.jpg", w: 400, h: 400, c1: NAVY2, c2: SKY, label: "Dr. Asi" },
  { path: "team/dr-eric.jpg", w: 400, h: 400, c1: NAVY2, c2: SKY, label: "Dr. Eric" },
  ...[1, 2, 3, 4, 5, 6].map((n) => ({
    path: `results/bf-${n}.jpg`,
    w: 800,
    h: 1000,
    c1: NAVY,
    c2: SKY,
    label: `BF ${n}`,
  })),
];

for (const t of targets) {
  const out = join(ROOT, t.path);
  await mkdir(dirname(out), { recursive: true });
  await sharp(svg(t.w, t.h, t.c1, t.c2, t.label, t.textColor)).jpeg({ quality: 82 }).toFile(out);
  console.log("wrote", t.path);
}
console.log(`\nDone — ${targets.length} placeholders in public/media/`);
