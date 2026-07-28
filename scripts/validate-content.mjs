import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function validateDocument(name, dataPath, schemaPath) {
  const data = readJson(dataPath);
  const schema = readJson(schemaPath);
  const validate = ajv.compile(schema);
  if (!validate(data)) {
    const details = validate.errors
      .map((error) => `${error.instancePath || "/"} ${error.message}`)
      .join("\n  - ");
    throw new Error(`${name} schema validation failed:\n  - ${details}`);
  }
  return data;
}

const facts = validateDocument("Site facts", "content/site-facts.json", "content/site-facts.schema.json");
const media = validateDocument("Media manifest", "content/media-manifest.json", "content/media-manifest.schema.json");
const failures = [];
const expectedServices = new Set(["auto-insurance", "home-insurance", "commercial-insurance", "life-insurance", "renters-insurance"]);
const serviceSlugs = new Set();
const itemIds = new Set();

for (const service of media.services) {
  if (serviceSlugs.has(service.slug)) failures.push(`Duplicate media service: ${service.slug}`);
  serviceSlugs.add(service.slug);
  if (!expectedServices.has(service.slug)) failures.push(`Unexpected media service: ${service.slug}`);

  for (const item of service.items) {
    if (itemIds.has(item.id)) failures.push(`Duplicate media item ID: ${item.id}`);
    itemIds.add(item.id);
    if (!item.approvedForProduction) failures.push(`${item.id} is not approved for production`);
    if (item.editorialOnly) failures.push(`${item.id} is editorial-only and cannot be used in marketing`);
    if (/^(https?:)?\/\//i.test(item.src) || /^(https?:)?\/\//i.test(item.fallbackSrc)) {
      failures.push(`${item.id} must be self-hosted, not loaded from a remote URL`);
    }
    if (/pinterest|instagram|tiktok|youtube/i.test(item.sourceUrl)) {
      failures.push(`${item.id} names an inspiration/social site as the asset source`);
    }

    const localPaths = [item.src, item.fallbackSrc, item.poster].filter(Boolean);
    for (const publicPath of localPaths) {
      const filePath = path.join(root, "public", publicPath.replace(/^\/assets\//, "assets/"));
      if (!fs.existsSync(filePath)) {
        failures.push(`${item.id} references missing file: ${publicPath}`);
        continue;
      }
      const byteSize = fs.statSync(filePath).size;
      if (byteSize === 0) failures.push(`${item.id} references an empty file: ${publicPath}`);
      if (item.type === "video" && /\.(mp4|webm)$/i.test(publicPath) && byteSize > 6 * 1024 * 1024) {
        failures.push(`${item.id} video exceeds the 6 MB per-format performance budget: ${publicPath}`);
      }
    }

    if (item.type === "video") {
      if (!/\.webm$/i.test(item.src) || !/\.mp4$/i.test(item.fallbackSrc)) {
        failures.push(`${item.id} video must provide WebM src and MP4 fallbackSrc`);
      }
      if (!item.poster || !/\.(avif|webp|jpe?g|png)$/i.test(item.poster)) failures.push(`${item.id} video requires an optimized poster`);
      if (/owner-provided existing website asset/i.test(item.license)) failures.push(`${item.id} video needs an asset-specific commercial license record`);
    } else if (!/\.webp$/i.test(item.src) || !/\.jpe?g$/i.test(item.fallbackSrc)) {
      failures.push(`${item.id} image must provide WebP src and JPEG fallbackSrc`);
    } else {
      for (const width of [480, 600, 720]) {
        const responsivePath = item.src.replace(/\.webp$/i, `-${width}.webp`);
        const filePath = path.join(root, "public", responsivePath.replace(/^\/assets\//, "assets/"));
        if (!fs.existsSync(filePath)) failures.push(`${item.id} missing ${width}px responsive derivative: ${responsivePath}`);
      }
    }
  }
}

for (const slug of expectedServices) {
  if (!serviceSlugs.has(slug)) failures.push(`Media manifest missing service: ${slug}`);
}

if (!facts.quoteDestination.endsWith("id=64868")) failures.push("Verified quote destination must retain Office #3 account ID 64868");
if (facts.approvedAssetPaths.officialLogo !== "/assets/yffi3/yffi3-official-franchise-logo.png") failures.push("Official logo path changed");
for (const responsiveAsset of [
  "/assets/yffi3/yffi3-official-franchise-logo-480.webp",
  "/assets/yffi3/yffi3-official-franchise-logo-240.webp",
  "/assets/yffi3/yffi3-official-franchise-logo-800.webp",
  "/assets/yffi3/yffi3-original-franchise-logo-160.webp",
  "/assets/yffi3/yffi3-original-franchise-logo-320.webp",
  "/assets/yffi3/yffi3-family-office-photo-480.webp",
  "/assets/yffi3/yffi3-family-office-photo-720.webp",
  "/assets/yffi3/yffi3-principal-agent-ariel-busutil-720.webp",
  "/assets/yffi3/yffi3-quote-qr-240.webp"
]) {
  if (!fs.existsSync(path.join(root, "public", responsiveAsset.replace(/^\/assets\//, "assets/")))) {
    failures.push(`Missing responsive approved-asset derivative: ${responsiveAsset}`);
  }
}

if (failures.length) {
  console.error("Content validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Content validation passed: ${media.services.length} services, ${itemIds.size} production media items.`);
