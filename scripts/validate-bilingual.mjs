import fs from "node:fs";
import path from "node:path";
import { englishToSpanish } from "../content/spanish-content.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const useDist = process.argv.includes("--dist");
const siteRoot = useDist ? path.join(root, "dist") : root;
const siteUrl = "https://yourfamilyfirstinsurance3.com";
const failures = [];

const fileFor = (slug) => path.join(siteRoot, ...(slug ? slug.split("/") : []), "index.html");
const urlFor = (slug) => slug ? `${siteUrl}/${slug}/` : `${siteUrl}/`;
const read = (slug) => fs.readFileSync(fileFor(slug), "utf8");

for (const [englishSlug, spanishSlug] of Object.entries(englishToSpanish)) {
  for (const slug of [englishSlug, spanishSlug]) {
    if (!fs.existsSync(fileFor(slug))) failures.push(`Missing bilingual page: /${slug}`);
  }
  if (!fs.existsSync(fileFor(englishSlug)) || !fs.existsSync(fileFor(spanishSlug))) continue;

  const english = read(englishSlug);
  const spanish = read(spanishSlug);
  const englishUrl = urlFor(englishSlug);
  const spanishUrl = urlFor(spanishSlug);

  const expected = [
    [english, '<html lang="en-US">', `${englishSlug || "home"} lang`],
    [spanish, '<html lang="es-US">', `${spanishSlug} lang`],
    [english, `<link rel="canonical" href="${englishUrl}">`, `${englishSlug || "home"} canonical`],
    [spanish, `<link rel="canonical" href="${spanishUrl}">`, `${spanishSlug} canonical`],
    [english, `<link rel="alternate" hreflang="en-US" href="${englishUrl}">`, `${englishSlug || "home"} en alternate`],
    [english, `<link rel="alternate" hreflang="es-US" href="${spanishUrl}">`, `${englishSlug || "home"} es alternate`],
    [spanish, `<link rel="alternate" hreflang="en-US" href="${englishUrl}">`, `${spanishSlug} en alternate`],
    [spanish, `<link rel="alternate" hreflang="es-US" href="${spanishUrl}">`, `${spanishSlug} es alternate`],
    [english, `href="/${spanishSlug}/" lang="es"`, `${englishSlug || "home"} language selector`],
    [spanish, `href="${englishSlug ? `/${englishSlug}/` : "/"}" lang="en"`, `${spanishSlug} language selector`]
  ];
  for (const [html, needle, label] of expected) {
    if (!html.includes(needle)) failures.push(`Missing ${label}: ${needle}`);
  }
}

const untranslatedInterface = [
  "Get My Free Quote",
  "Frequently Asked Questions",
  "Skip to content",
  "Open navigation",
  "Primary navigation",
  "Select one",
  "Best time to call",
  "Continue to Secure Quote Form",
  "Return Home",
  "Page Not Found"
];
for (const spanishSlug of Object.values(englishToSpanish)) {
  const html = read(spanishSlug);
  for (const phrase of untranslatedInterface) {
    if (html.includes(phrase)) failures.push(`${spanishSlug} contains untranslated interface text: ${phrase}`);
  }
  if (!html.includes('<meta property="og:locale" content="es_US">')) failures.push(`${spanishSlug} missing Spanish OG locale`);
  if (!html.includes('"inLanguage":"es-US"') && !["es/privacidad", "es/terminos"].includes(spanishSlug)) failures.push(`${spanishSlug} missing Spanish structured-data language`);
}

const spanish404 = path.join(siteRoot, "es", "404.html");
if (!fs.existsSync(spanish404)) failures.push("Missing Spanish 404 page");
else if (!fs.readFileSync(spanish404, "utf8").includes('<html lang="es-US">')) failures.push("Spanish 404 has incorrect lang");

const sitemap = fs.readFileSync(path.join(siteRoot, "sitemap.xml"), "utf8");
for (const slug of [...Object.keys(englishToSpanish), ...Object.values(englishToSpanish)]) {
  if (!sitemap.includes(`<loc>${urlFor(slug)}</loc>`)) failures.push(`Sitemap missing ${urlFor(slug)}`);
}
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) failures.push("Sitemap missing xhtml namespace for hreflang links");

if (failures.length) {
  console.error("Bilingual validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Bilingual validation passed for ${Object.keys(englishToSpanish).length} English/Spanish page pairs (${useDist ? "dist" : "source"}).`);
