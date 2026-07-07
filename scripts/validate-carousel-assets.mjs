import fs from "node:fs";
import path from "node:path";
import carouselModule from "../src/data/carouselMedia.js";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const {
  carouselMedia,
  carouselMediaByPage,
  pageMediaRules
} = carouselModule;

const failures = [];
const warnings = [];
const allowedTypes = new Set(["video", "image", "lottie", "rive"]);
const requiredFields = [
  "id",
  "page",
  "type",
  "src",
  "poster",
  "alt",
  "sourceName",
  "sourceUrl",
  "licenseNote",
  "tags",
  "duration",
  "priority"
];

function describe(slide) {
  return `${slide.page || "unknown-page"}:${slide.id || "unknown-slide"}`;
}

function repoPath(publicUrl) {
  if (!publicUrl || !publicUrl.startsWith("/")) return "";
  return path.join(root, "public", publicUrl.replace(/^\/+/, ""));
}

function addPath(paths, field, slide) {
  const value = slide[field];
  if (!value) return;
  paths.push({ field, value, slide });
}

function checkDuplicates(items, label) {
  const seen = new Map();
  for (const item of items) {
    const value = item.value;
    if (!value) continue;
    const existing = seen.get(value);
    if (existing) {
      failures.push(`${label} duplicated: ${value} used by ${describe(existing.slide)} (${existing.field}) and ${describe(item.slide)} (${item.field})`);
    } else {
      seen.set(value, item);
    }
  }
}

if (!Array.isArray(carouselMedia) || !carouselMedia.length) {
  failures.push("carouselMedia must export a non-empty slide array");
}

const perFieldPaths = {
  src: [],
  fallbackMp4: [],
  poster: []
};
const allAssetPaths = [];
const knownIds = new Set();

for (const slide of carouselMedia) {
  const name = describe(slide);

  for (const field of requiredFields) {
    const value = slide[field];
    if (field === "tags") {
      if (!Array.isArray(value) || value.length === 0) failures.push(`${name} missing non-empty tags array`);
    } else if (value === undefined || value === null || value === "") {
      failures.push(`${name} missing required metadata field: ${field}`);
    }
  }

  if (knownIds.has(`${slide.page}:${slide.id}`)) failures.push(`${name} duplicates a slide id on the same page`);
  knownIds.add(`${slide.page}:${slide.id}`);

  if (!allowedTypes.has(slide.type)) failures.push(`${name} has unsupported type: ${slide.type}`);
  if (slide.type !== "video") {
    failures.push(`${name} must be a moving video slide; static image/lottie/rive carousel slides are not allowed for this site`);
  }
  if (!["high", "normal"].includes(slide.priority)) failures.push(`${name} priority must be high or normal`);
  if (slide.type === "video" && !slide.poster) failures.push(`${name} video slide must include a poster`);
  if (slide.type !== "video" && slide.fallbackMp4) failures.push(`${name} non-video slide should not include fallbackMp4`);

  const pageRules = pageMediaRules[slide.page];
  if (!pageRules) {
    failures.push(`${name} has no page media rule`);
  } else {
    const tags = new Set(slide.tags || []);
    const hasAllowedTag = pageRules.some((tag) => tags.has(tag));
    const hasPageTag = slide.page === "home" ? tags.has("home") : tags.has(slide.page);
    if (!hasAllowedTag || !hasPageTag) {
      failures.push(`${name} tags do not match page purpose; tags=${JSON.stringify(slide.tags)} allowed=${JSON.stringify(pageRules)}`);
    }
  }

  for (const field of ["src", "fallbackMp4", "poster"]) {
    const value = slide[field];
    if (!value) continue;
    perFieldPaths[field].push({ field, value, slide });
    allAssetPaths.push({ field, value, slide });

    if (value.startsWith("/")) {
      const filePath = repoPath(value);
      if (!fs.existsSync(filePath)) failures.push(`${name} missing local ${field} asset: ${value}`);
    } else if (!/^https?:\/\//.test(value)) {
      failures.push(`${name} ${field} must be a site path or URL: ${value}`);
    }
  }

  if (slide.type === "video" && slide.src && !/\.(webm|mp4)$/i.test(slide.src)) {
    failures.push(`${name} video src must end in .webm or .mp4`);
  }
  if (slide.fallbackMp4 && !/\.mp4$/i.test(slide.fallbackMp4)) {
    failures.push(`${name} fallbackMp4 must end in .mp4`);
  }
  if (slide.poster && !/\.(jpg|jpeg|png|webp|avif)$/i.test(slide.poster)) {
    failures.push(`${name} poster should be a browser image file`);
  }
  if (!String(slide.alt || "").toLowerCase().match(/insurance|coverage|quote|miami|office|business|home|apartment|car|family/)) {
    warnings.push(`${name} alt text may be too generic: ${slide.alt}`);
  }
}

for (const [field, paths] of Object.entries(perFieldPaths)) {
  checkDuplicates(paths, field);
}
checkDuplicates(allAssetPaths, "asset path");

for (const [page, slides] of Object.entries(carouselMediaByPage)) {
  if (!Array.isArray(slides) || slides.length === 0) failures.push(`${page} has no carousel slides`);
  const highPriority = slides.filter((slide) => slide.priority === "high").length;
  if (page !== "home" && highPriority !== 1) failures.push(`${page} should have exactly one high-priority lead slide`);
  if (page === "home" && highPriority !== 1) failures.push("home should have exactly one high-priority carousel slide");
  const lead = slides[0];
  if (lead && lead.priority !== "high") failures.push(`${page} first slide should be the high-priority lead slide`);
  if (page !== "home" && slides.length < 3) failures.push(`${page} should have at least three focused carousel slides`);
}

const expectedPages = ["home", "auto-insurance", "home-insurance", "renters-insurance", "commercial-insurance", "life-insurance"];
for (const page of expectedPages) {
  if (!carouselMediaByPage[page]?.length) failures.push(`Missing carousel media for ${page}`);
}

console.log("Carousel media inventory:");
for (const page of expectedPages) {
  const slides = carouselMediaByPage[page] || [];
  console.log(`- ${page}: ${slides.length} slides`);
  for (const slide of slides) {
    const media = [slide.src, slide.fallbackMp4, slide.poster].filter(Boolean).join(" | ");
    console.log(`  - ${slide.id} [${slide.type}] ${media}`);
  }
}

if (warnings.length) {
  console.warn("Carousel media warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Carousel media validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Carousel media validation passed with zero duplicate asset paths.");
