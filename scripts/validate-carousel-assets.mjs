import fs from "node:fs";
import path from "node:path";
import carouselMediaModule from "../src/data/carouselMedia.js";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const { carouselMedia, pageMediaRules } = carouselMediaModule;
const requiredFields = ["id", "page", "type", "src", "poster", "alt", "sourceName", "sourceUrl", "licenseNote", "tags", "duration", "priority"];
const failures = [];
const seen = new Map();
const pages = new Map();

function recordUnique(kind, value, id) {
  if (!value) return;
  const key = `${kind}:${value}`;
  if (seen.has(key)) failures.push(`${kind} is duplicated by ${seen.get(key)} and ${id}: ${value}`);
  else seen.set(key, id);
}

function publicFile(route) {
  return path.join(root, "public", route.replace(/^\//, ""));
}

for (const slide of carouselMedia) {
  for (const field of requiredFields) {
    if (slide[field] === undefined || slide[field] === "" || (Array.isArray(slide[field]) && slide[field].length === 0)) {
      failures.push(`${slide.id || "unknown slide"} is missing ${field}`);
    }
  }
  if (slide.type !== "video") failures.push(`${slide.id} must use real video media`);
  if (!slide.src.startsWith("/") || /^https?:/i.test(slide.src)) failures.push(`${slide.id} src must be self-hosted: ${slide.src}`);
  if (!slide.poster.startsWith("/") || /^https?:/i.test(slide.poster)) failures.push(`${slide.id} poster must be self-hosted: ${slide.poster}`);
  if (!/^https:\/\//i.test(slide.sourceUrl)) failures.push(`${slide.id} must include an HTTPS source credit URL`);
  if (!fs.existsSync(publicFile(slide.src))) failures.push(`${slide.id} video file is missing: ${slide.src}`);
  if (!fs.existsSync(publicFile(slide.poster))) failures.push(`${slide.id} poster file is missing: ${slide.poster}`);
  if (slide.fallbackMp4 && !fs.existsSync(publicFile(slide.fallbackMp4))) failures.push(`${slide.id} fallback file is missing: ${slide.fallbackMp4}`);
  recordUnique("src", slide.src, slide.id);
  recordUnique("poster", slide.poster, slide.id);
  recordUnique("fallbackMp4", slide.fallbackMp4, slide.id);

  const allowedTags = pageMediaRules[slide.page] || [];
  if (!allowedTags.length) failures.push(`${slide.id} uses unknown page ${slide.page}`);
  if (!slide.tags.some((tag) => allowedTags.includes(tag))) failures.push(`${slide.id} has no page-relevant tag for ${slide.page}`);
  pages.set(slide.page, [...(pages.get(slide.page) || []), slide]);
}

for (const [page, slides] of pages) {
  if (!slides.some((slide) => slide.priority === "high")) failures.push(`${page} needs one high-priority lead video`);
  if (page !== "home" && (slides.length < 3 || slides.length > 4)) failures.push(`${page} should have 3-4 focused videos, found ${slides.length}`);
}

if (failures.length) {
  console.error("Carousel asset validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

for (const [page, slides] of pages) {
  console.log(`${page}: ${slides.length} unique local videos`);
}
console.log(`Carousel asset validation passed: ${carouselMedia.length} videos with unique source and poster paths.`);
