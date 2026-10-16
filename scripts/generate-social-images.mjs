import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { pages } from "./generate-live-base.mjs";
import { spanishPages } from "../content/spanish-content.mjs";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const output = path.join(root, "public/assets/social");
const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const logo = (await fs.readFile(path.join(root, "public/assets/yffi3/yffi3-official-franchise-logo.png"))).toString("base64");
const family = (await fs.readFile(path.join(root, "public/assets/yffi3/yffi3-family-office-photo.jpg"))).toString("base64");

async function lines(text, size) {
  const rows = [""];
  for (const word of text.split(/\s+/)) {
    const last = rows.length - 1;
    const candidate = rows[last] + (rows[last] ? " " : "") + word;
    const measured = await sharp({ text: { text: escapeXml(candidate), font: `Georgia Bold ${size}`, dpi: 72 } }).metadata();
    if (rows[last] && measured.width > 700) rows.push(word);
    else rows[last] += (rows[last] ? " " : "") + word;
  }
  return rows;
}

await fs.mkdir(output, { recursive: true });
for (const english of pages) {
  for (const [locale, page] of [["en", english], ["es", spanishPages.find((item) => item.englishSlug === english.slug)]]) {
    if (!page) throw new Error(`Missing social-preview translation: ${english.slug}`);
    let size = 56;
    let heading = await lines(page.h1, size);
    if (heading.length > 4) { size = 45; heading = await lines(page.h1, size); }
    if (heading.length > 5) throw new Error(`Social heading needs a shorter title: ${page.slug}`);
    const title = heading.map((line, index) => `<text x="64" y="${200 + index * (size + 12)}" fill="#fff7e9" font-family="Georgia, serif" font-weight="700" font-size="${size}">${escapeXml(line)}</text>`).join("");
    // Render an original card layout. Protected photographs and the official sign
    // remain unaltered, contained at their original aspect ratios.
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#06111f"/><stop offset="1" stop-color="#173c42"/></linearGradient></defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="64" y="58" width="64" height="5" rx="2" fill="#f4c96b"/>
      <text x="64" y="109" fill="#9adcf7" font-family="Arial, sans-serif" font-size="24" font-weight="700">${locale === "es" ? "SEGUROS EN MIAMI" : "MIAMI INSURANCE"}</text>
      ${title}
      <rect x="817" y="48" width="1" height="440" fill="#9adcf7" opacity=".3"/>
      <image href="data:image/png;base64,${logo}" x="850" y="54" width="286" height="130" preserveAspectRatio="xMidYMid meet"/>
      <image href="data:image/jpeg;base64,${family}" x="850" y="215" width="286" height="250" preserveAspectRatio="xMidYMid meet"/>
      <text x="64" y="510" fill="#f3fbff" font-family="Arial, sans-serif" font-size="24">Your Family First Insurance · ${locale === "es" ? "Oficina" : "Office"} #3</text>
      <text x="64" y="555" fill="#ffe0a1" font-family="Arial, sans-serif" font-size="32" font-weight="700">305-910-8850</text>
      <text x="64" y="592" fill="#c5d9df" font-family="Arial, sans-serif" font-size="21">West Flagler · Miami, FL 33174</text>
      <text x="850" y="555" fill="#c5d9df" font-family="Arial, sans-serif" font-size="17">yourfamilyfirstinsurance3.com</text>
    </svg>`;
    const filename = `${(english.slug || "home").replaceAll("/", "-")}-${locale}.jpg`;
    await sharp(Buffer.from(svg)).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(output, filename));
  }
}
console.log(`Generated ${pages.length * 2} bilingual social preview cards.`);
