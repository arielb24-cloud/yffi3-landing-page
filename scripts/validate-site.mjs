import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const checkDist = process.argv.includes("--dist");
const siteRoot = checkDist ? path.join(root, "dist") : root;
const siteUrl = "https://yourfamilyfirstinsurance3.com";
const quoteDestination = "https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868";
const requiredSlugs = [
  "",
  "auto-insurance",
  "home-insurance",
  "commercial-insurance",
  "life-insurance",
  "renters-insurance",
  "about-office-3",
  "get-a-quote",
  "privacy-policy",
  "terms"
];
const requiredFields = ["name", "phone", "email", "insuranceType", "zip", "bestTime", "notes"];
const honeypotField = "companyWebsite";
const bannedPhrases = [
  "guaranteed " + "cheapest",
  "official " + "cheapest " + "insurance",
  "protecting " + "what " + "matters " + "most",
  "what " + "matters " + "most",
  "authorized " + "carrier " + "partner",
  "guaranteed " + "approval",
  "guaranteed " + "savings",
  "official " + "partner",
  "fake " + "reviews",
  "award-" + "winning",
  "top-" + "rated"
];
const approvedAssets = [
  "/assets/yffi3/yffi3-official-franchise-logo.png",
  "/assets/yffi3/yffi3-family-office-photo.jpg",
  "/assets/yffi3/yffi3-family-office-photo.webp",
  "/assets/yffi3/yffi3-principal-agent-ariel-busutil.jpg",
  "/assets/yffi3/yffi3-original-franchise-logo.png"
];

const failures = [];

function htmlPath(slug) {
  return slug ? path.join(siteRoot, slug, "index.html") : path.join(siteRoot, "index.html");
}

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function countMatches(text, regex) {
  return [...text.matchAll(regex)].length;
}

function routeExists(href) {
  if (href === "/") return fs.existsSync(htmlPath(""));
  const [pathOnly] = href.split("#");
  if (pathOnly === "" || pathOnly === "/") return fs.existsSync(htmlPath(""));
  const withoutSlash = pathOnly.replace(/^\/+|\/+$/g, "");
  return fs.existsSync(htmlPath(withoutSlash));
}

for (const slug of requiredSlugs) {
  const filePath = htmlPath(slug);
  if (!fs.existsSync(filePath)) {
    failures.push(`Missing page: /${slug}`);
    continue;
  }
  const html = read(filePath);
  const lower = html.toLowerCase();

  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${slug || "home"} missing title`);
  if (!/<meta name="description" content="[^"]+">/i.test(html)) failures.push(`${slug || "home"} missing meta description`);
  if (!/<meta property="og:title" content="[^"]+">/i.test(html)) failures.push(`${slug || "home"} missing OG title`);
  if (countMatches(html, /<h1[\s>]/gi) !== 1) failures.push(`${slug || "home"} must have exactly one H1`);
  if (!/<main[\s>]/i.test(html) || !/<section[\s>]/i.test(html)) failures.push(`${slug || "home"} missing semantic main/section`);
  if (!html.includes("application/ld+json")) failures.push(`${slug || "home"} missing JSON-LD schema`);
  if (slug === "" && !html.includes('"@type":"InsuranceAgency"')) failures.push("home missing InsuranceAgency schema");
  if (slug !== "" && !html.includes('"@type":"BreadcrumbList"')) failures.push(`${slug} missing BreadcrumbList schema`);
  if (html.includes("<details") && !html.includes('"@type":"FAQPage"')) failures.push(`${slug || "home"} has FAQ markup without FAQPage schema`);

  for (const phrase of bannedPhrases) {
    if (lower.includes(phrase)) failures.push(`${slug || "home"} contains banned phrase: ${phrase}`);
  }

  if (lower.includes("west flagler") === false && ["", "auto-insurance", "home-insurance", "commercial-insurance", "about-office-3"].includes(slug)) {
    failures.push(`${slug || "home"} missing West Flagler local relevance`);
  }

  if (slug === "" && !html.includes("mobile-call")) failures.push("home missing mobile phone call chip");
  if (slug === "" && !html.includes("Get My Free Quote")) failures.push("home missing quote CTA");
  if (slug === "" && !html.includes("trust-ticker")) failures.push("home missing header trust ticker");
  if (slug === "" && !html.includes("50+ Insurance Carriers")) failures.push("home missing 50+ carriers trust block");
  if (slug === "" && html.includes('href="/home-insurance/">Home</a>')) failures.push("home nav should label home-insurance as Homeowners");
  if (slug === "home-insurance" && !html.includes("Homeowners Insurance")) failures.push("homeowners page missing Homeowners Insurance wording");
  if (slug === "" && countMatches(html, /<details>/g) < 8) failures.push("home FAQ should include expanded customer/search-intent questions");
  if (slug === "" && !html.includes("bilingual insurance help")) failures.push("home FAQ missing bilingual service question");
  if (["auto-insurance", "home-insurance", "commercial-insurance", "life-insurance", "renters-insurance"].includes(slug) && !html.includes("Local search guide")) {
    failures.push(`${slug} missing local search-intent panel`);
  }
  if (["auto-insurance", "home-insurance", "commercial-insurance", "life-insurance", "renters-insurance"].includes(slug)) {
    const expectedVisual = {
      "auto-insurance": "service-auto-insurance.svg",
      "home-insurance": "service-homeowners-insurance.svg",
      "commercial-insurance": "service-commercial-insurance.svg",
      "life-insurance": "service-life-insurance.svg",
      "renters-insurance": "service-renters-insurance.svg"
    }[slug];
    if (!html.includes(expectedVisual)) failures.push(`${slug} missing optimized service visual: ${expectedVisual}`);
    if (html.includes("showcase-logo")) failures.push(`${slug} should use service-specific imagery instead of the banner logo hero image`);
  }
  if (slug === "get-a-quote" && !html.includes("ConsumerRateQuotes intake path")) failures.push("quote FAQ missing secure intake explanation");

  for (const asset of approvedAssets) {
    const needsAsset =
      asset.includes("official-franchise-logo") ||
      (asset.includes("family-office") && ["", "get-a-quote"].includes(slug)) ||
      (asset.includes("principal-agent") && ["", "about-office-3"].includes(slug)) ||
      (asset.includes("original-franchise") && ["", "about-office-3"].includes(slug));
    if (needsAsset && !html.includes(asset)) failures.push(`${slug || "home"} missing approved asset reference: ${asset}`);
  }

  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  for (const img of imgTags) {
    if (!/\salt="[^"]+"/i.test(img)) failures.push(`${slug || "home"} image missing alt text: ${img}`);
  }

  const hrefs = [...html.matchAll(/\shref="([^"]+)"/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/") && !href.startsWith("//") && !href.includes("."));
  for (const href of hrefs) {
    if (!routeExists(href)) failures.push(`${slug || "home"} has broken internal link: ${href}`);
  }
}

const quoteHtml = read(htmlPath("get-a-quote"));
for (const field of requiredFields) {
  if (!quoteHtml.includes(`name="${field}"`)) failures.push(`Quote form missing field: ${field}`);
}
if (!quoteHtml.includes(`name="${honeypotField}"`)) failures.push(`Quote form missing honeypot field: ${honeypotField}`);
if (!quoteHtml.includes(`action="${quoteDestination}"`)) failures.push("Quote form missing ConsumerRateQuotes action URL");
if (!quoteHtml.includes(`data-quote-destination="${quoteDestination}"`)) failures.push("Quote form missing ConsumerRateQuotes JS destination");

const sitemap = path.join(siteRoot, "sitemap.xml");
if (!fs.existsSync(sitemap)) {
  failures.push("Missing sitemap.xml");
} else {
  const sitemapText = read(sitemap);
  for (const slug of requiredSlugs) {
    const url = slug ? `${siteUrl}/${slug}/` : `${siteUrl}/`;
    if (!sitemapText.includes(url)) failures.push(`sitemap.xml missing ${url}`);
  }
}

const robots = path.join(siteRoot, "robots.txt");
if (!fs.existsSync(robots)) {
  failures.push("Missing robots.txt");
} else {
  const robotsText = read(robots);
  if (!robotsText.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) failures.push("robots.txt missing sitemap URL");
  for (const bot of ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "Googlebot", "Bingbot", "PerplexityBot"]) {
    if (!robotsText.includes(`User-agent: ${bot}`)) failures.push(`robots.txt missing ${bot}`);
  }
}

const llms = path.join(siteRoot, "llms.txt");
if (!fs.existsSync(llms)) {
  failures.push("Missing llms.txt");
} else {
  const llmsText = read(llms);
  for (const required of ["Your Family First Insurance Office #3", siteUrl, "305-910-8850", "Do not infer guaranteed pricing"]) {
    if (!llmsText.includes(required)) failures.push(`llms.txt missing ${required}`);
  }
}

const humans = path.join(siteRoot, "humans.txt");
if (!fs.existsSync(humans)) failures.push("Missing humans.txt");

const htaccess = path.join(siteRoot, ".htaccess");
if (!fs.existsSync(htaccess)) {
  failures.push("Missing .htaccess security header file");
} else {
  const htaccessText = read(htaccess);
  for (const header of ["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
    if (!htaccessText.includes(header)) failures.push(`.htaccess missing ${header}`);
  }
  if (!htaccessText.includes("https://secure.ConsumerRateQuotes.com")) failures.push(".htaccess CSP missing ConsumerRateQuotes form-action");
}

const styles = path.join(siteRoot, "assets", "styles.css");
if (!fs.existsSync(styles)) {
  failures.push("Missing assets/styles.css");
} else {
  const css = read(styles);
  if (!css.includes("prefers-reduced-motion")) failures.push("CSS missing reduced motion support");
  if (/font-size\s*:[^;]*vw/i.test(css)) failures.push("CSS uses viewport-width font sizing");
  if (!css.includes("object-fit: contain")) failures.push("CSS missing logo contain rule");
  for (const variable of ["--navy: #050B12", "--deep-blue: #7DD3FC", "--miami-blue: #9ADCF7", "--aqua: #77E7DC", "--ice: #F3FBFF", "--coral: #FF7D65", "--gold: #F4C96B", "--champagne: #FFE0A1"]) {
    if (!css.includes(variable)) failures.push(`CSS missing palette variable: ${variable}`);
  }
  for (const required of ["backdrop-filter", "--glass-line", ".button::before", ".button::after", ".service-picture", ".liquid-tilt"]) {
    if (!css.includes(required)) failures.push(`CSS missing liquid glass styling: ${required}`);
  }
  for (const required of ["trust-marquee", ".trust-ticker:hover .trust-track", ".coverage-link-rail", "translate3d(0, 28px, 0)", ".faq summary::after", "white-space: nowrap"]) {
    if (!css.includes(required)) failures.push(`CSS missing polish styling: ${required}`);
  }
}

const js = path.join(siteRoot, "assets", "site.js");
if (!fs.existsSync(js)) {
  failures.push("Missing assets/site.js");
} else {
  const script = read(js);
  if (!script.includes("IntersectionObserver")) failures.push("JS missing scroll reveal IntersectionObserver");
  if (!script.includes("window.location.assign")) failures.push("JS missing secure quote redirect");
}

if (!checkDist) {
  const server = path.join(root, "server.js");
  if (!fs.existsSync(server)) {
    failures.push("Missing server.js for GoDaddy Beta Apps Node deployment");
  } else {
    const serverText = read(server);
    if (!serverText.includes("process.env.PORT || 3000")) failures.push("server.js must use process.env.PORT || 3000");
    if (!serverText.includes("express.static(distDir")) failures.push("server.js must serve the dist folder with express.static");
  }
}

if (failures.length) {
  console.error("Site validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site validation passed for ${checkDist ? "dist" : "source"} output.`);
