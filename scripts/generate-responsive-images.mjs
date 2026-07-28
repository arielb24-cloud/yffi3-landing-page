import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const publicDir = path.join(root, "public");
const mediaManifest = JSON.parse(fs.readFileSync(path.join(root, "content", "media-manifest.json"), "utf8"));

async function webpVariant(inputPath, outputPath, width, options = {}) {
  await sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88, smartSubsample: true, ...options })
    .toFile(outputPath);
}

const brandVariants = [
  ["assets/yffi3/yffi3-official-franchise-logo.png", "assets/yffi3/yffi3-official-franchise-logo-240.webp", 240, { quality: 92 }],
  ["assets/yffi3/yffi3-official-franchise-logo.png", "assets/yffi3/yffi3-official-franchise-logo-480.webp", 480, { quality: 92 }],
  ["assets/yffi3/yffi3-official-franchise-logo.png", "assets/yffi3/yffi3-official-franchise-logo-800.webp", 800, { quality: 92 }],
  ["assets/yffi3/yffi3-original-franchise-logo.png", "assets/yffi3/yffi3-original-franchise-logo-160.webp", 160, { quality: 90 }],
  ["assets/yffi3/yffi3-original-franchise-logo.png", "assets/yffi3/yffi3-original-franchise-logo-320.webp", 320, { quality: 90 }],
  ["assets/yffi3/yffi3-family-office-photo.jpg", "assets/yffi3/yffi3-family-office-photo-480.webp", 480, { quality: 86 }],
  ["assets/yffi3/yffi3-family-office-photo.jpg", "assets/yffi3/yffi3-family-office-photo-720.webp", 720, { quality: 86 }],
  ["assets/yffi3/yffi3-principal-agent-ariel-busutil.jpg", "assets/yffi3/yffi3-principal-agent-ariel-busutil-720.webp", 720, { quality: 86 }],
  ["assets/yffi3/yffi3-quote-qr.jpeg", "assets/yffi3/yffi3-quote-qr-240.webp", 240, { lossless: true, quality: 100 }]
];

for (const [input, output, width, options] of brandVariants) {
  await webpVariant(path.join(publicDir, input), path.join(publicDir, output), width, options);
}

for (const service of mediaManifest.services) {
  for (const item of service.items.filter((candidate) => candidate.type === "image")) {
    const relativeInput = item.src.replace(/^\/assets\//, "assets/");
    const inputPath = path.join(publicDir, relativeInput);
    for (const width of [480, 600, 720]) {
      const relativeOutput = relativeInput.replace(/\.webp$/i, `-${width}.webp`);
      await webpVariant(inputPath, path.join(publicDir, relativeOutput), width);
    }
  }
}

console.log("Generated responsive WebP derivatives without changing the approved source assets.");
