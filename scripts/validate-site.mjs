import fs from "node:fs";
import path from "node:path";
import carouselMediaModule from "../src/data/carouselMedia.js";
import googleReviewsModule from "../src/data/googleReviews.js";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const checkDist = process.argv.includes("--dist");
const siteRoot = checkDist ? path.join(root, "dist") : root;
const siteFacts = JSON.parse(fs.readFileSync(path.join(root, "content", "site-facts.json"), "utf8"));
const siteUrl = siteFacts.siteUrl;
const quoteDestination = siteFacts.quoteDestination;
const googleReviewUrl = "https://g.page/r/CfCEW-Ye4vpMEAE/review";
const googleTagManagerId = "GTM-5FZCMM3V";
const googleAnalyticsTagId = "G-6XC09FD9LD";
const { carouselMediaByPage } = carouselMediaModule;
const { googleReviews } = googleReviewsModule;
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
  "terms",
  "es",
  "es/seguro-de-auto",
  "es/seguro-de-vivienda",
  "es/seguro-de-inquilinos",
  "es/seguro-comercial",
  "es/seguro-de-vida",
  "es/sobre-oficina-3",
  "es/solicitar-cotizacion",
  "es/privacidad",
  "es/terminos"
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
const englishServiceSlugs = ["auto-insurance", "home-insurance", "commercial-insurance", "life-insurance", "renters-insurance"];
const spanishServiceSlugs = ["es/seguro-de-auto", "es/seguro-de-vivienda", "es/seguro-comercial", "es/seguro-de-vida", "es/seguro-de-inquilinos"];
const motionExpectations = Object.fromEntries(englishServiceSlugs.map((slug) => {
  const slides = carouselMediaByPage[slug] || [];
  return [slug, {
    slides,
    ids: slides.map((slide) => slide.id),
    sources: slides.flatMap((slide) => [slide.src, slide.fallbackMp4, slide.poster].filter(Boolean))
  }];
}));

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

  if (!/^<!doctype html>\n<html/i.test(html) || !html.includes("<head>\n<!-- Google Tag Manager -->")) {
    failures.push(`${slug || "home"} must place Google Tag Manager immediately after <head>`);
  }
  if (!html.includes("<body>\n<!-- Google Tag Manager (noscript) -->")) {
    failures.push(`${slug || "home"} must place the Google Tag Manager fallback immediately after <body>`);
  }
  if (countMatches(html, /googletagmanager\.com\/gtm\.js\?id=/g) !== 1) failures.push(`${slug || "home"} must have exactly one GTM script installation`);
  if (countMatches(html, /googletagmanager\.com\/ns\.html\?id=GTM-5FZCMM3V/g) !== 1) failures.push(`${slug || "home"} must have exactly one GTM noscript fallback`);
  if (countMatches(html, /GTM-5FZCMM3V/g) !== 2) failures.push(`${slug || "home"} must reference ${googleTagManagerId} only in the standard script and noscript snippets`);
  if (html.includes(googleAnalyticsTagId) || /googletagmanager\.com\/gtag\/js|\bgtag\s*\(/i.test(html)) {
    failures.push(`${slug || "home"} must not hard-code GA4 or gtag.js`);
  }

  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${slug || "home"} missing title`);
  if (!/<meta name="description" content="[^"]+">/i.test(html)) failures.push(`${slug || "home"} missing meta description`);
  if (!/<meta property="og:title" content="[^"]+">/i.test(html)) failures.push(`${slug || "home"} missing OG title`);
  if (countMatches(html, /<h1[\s>]/gi) !== 1) failures.push(`${slug || "home"} must have exactly one H1`);
  if (!/<main[\s>]/i.test(html) || !/<section[\s>]/i.test(html)) failures.push(`${slug || "home"} missing semantic main/section`);
  if (!html.includes("application/ld+json")) failures.push(`${slug || "home"} missing JSON-LD schema`);
  if (slug === "" && !html.includes('"@type":"InsuranceAgency"')) failures.push("home missing InsuranceAgency schema");
  if (slug !== "" && slug !== "es" && !html.includes('"@type":"BreadcrumbList"')) failures.push(`${slug} missing BreadcrumbList schema`);
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
  if (slug === "" && countMatches(html, /class="coverage-card"/g) !== 8) failures.push("home must show the eight live coverage cards");
  if (slug === "" && !html.includes('id="general-liability-insurance"')) failures.push("home missing General Liability coverage card");
  if (slug === "" && !html.includes('id="health-insurance"')) failures.push("home missing Health Insurance coverage card");
  if (slug === "" && !html.includes('id="google-reviews"')) failures.push("home missing Google reviews trust section");
  if (slug === "" && !html.includes(googleReviewUrl)) failures.push("home Google review CTA must use the Office #3 URL");
  if (slug === "" && !html.includes("/assets/yffi3/google-review-qr.png")) failures.push("home missing Google review QR asset");
  if (slug === "" && countMatches(html, /data-review-card=/g) !== googleReviews.length) failures.push(`home must render ${googleReviews.length} review snapshot cards`);
  if (slug === "" && !html.includes('id="seguros-en-espanol"')) failures.push("home missing bilingual Miami section");
  if (slug === "" && html.includes('href="/home-insurance/">Home</a>')) failures.push("home nav should label home-insurance as Homeowners");
  if (slug === "home-insurance" && !html.includes("Homeowners Insurance")) failures.push("homeowners page missing Homeowners Insurance wording");
  if (slug === "" && countMatches(html, /<details>/g) < 8) failures.push("home FAQ should include expanded customer/search-intent questions");
  if (slug === "" && !html.includes("bilingual insurance help")) failures.push("home FAQ missing bilingual service question");
  if (["auto-insurance", "home-insurance", "commercial-insurance", "life-insurance", "renters-insurance"].includes(slug) && !html.includes("Local search guide")) {
    failures.push(`${slug} missing local search-intent panel`);
  }
  const matchingEnglishSlug = englishServiceSlugs.includes(slug)
    ? slug
    : englishServiceSlugs[spanishServiceSlugs.indexOf(slug)];
  if (matchingEnglishSlug) {
    const expected = motionExpectations[matchingEnglishSlug];
    if (!html.includes("data-insurance-carousel")) failures.push(`${slug} missing interactive motion carousel`);
    if (countMatches(html, /class="motion-slide"/g) !== expected.ids.length) failures.push(`${slug} has the wrong carousel slide count`);
    if (countMatches(html, /class="motion-video"/g) !== expected.ids.length) failures.push(`${slug} must use video on every slide`);
    if (countMatches(html, /class="motion-poster"/g) !== expected.ids.length) failures.push(`${slug} must provide a poster for every video`);
    if (countMatches(html, /class="carousel-chip"/g) !== expected.ids.length) failures.push(`${slug} has the wrong chip count`);
    if (countMatches(html, /class="carousel-dot"/g) !== expected.ids.length) failures.push(`${slug} has the wrong dot count`);
    if (!html.includes("data-carousel-prev") || !html.includes("data-carousel-next")) failures.push(`${slug} carousel missing arrow controls`);
    for (const id of expected.ids) if (!html.includes(`data-slide-id="${id}"`)) failures.push(`${slug} missing carousel slide ${id}`);
    for (const source of expected.sources) if (!html.includes(source)) failures.push(`${slug} missing local carousel source ${source}`);
    if (html.includes('data-media-type="image"')) failures.push(`${slug} must not render static image slides`);
    if (/https?:\/\/[^"']+\.(?:mp4|webm|mov)/i.test(html)) failures.push(`${slug} must not load remote media URLs`);
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
    if (!/\salt="[^"]*"/i.test(img)) failures.push(`${slug || "home"} image missing alt attribute: ${img}`);
  }

  const hrefs = [...html.matchAll(/\shref="([^"]+)"/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/") && !href.startsWith("//") && !href.includes("."));
  for (const href of hrefs) {
    if (!routeExists(href)) failures.push(`${slug || "home"} has broken internal link: ${href}`);
  }
}

const quoteHtml = read(htmlPath("get-a-quote"));
const spanishQuoteHtml = read(htmlPath("es/solicitar-cotizacion"));
for (const field of requiredFields) {
  if (!quoteHtml.includes(`name="${field}"`)) failures.push(`Quote form missing field: ${field}`);
}
if (!quoteHtml.includes(`name="${honeypotField}"`)) failures.push(`Quote form missing honeypot field: ${honeypotField}`);
if (!quoteHtml.includes(`action="${quoteDestination}"`)) failures.push("Quote form missing verified ConsumerRateQuotes action");
if (!quoteHtml.includes(`data-quote-destination="${quoteDestination}"`)) failures.push("Quote form missing ConsumerRateQuotes JS destination");
if (!spanishQuoteHtml.includes(`action="${quoteDestination}"`)) failures.push("Spanish quote form missing verified ConsumerRateQuotes action");
if (!spanishQuoteHtml.includes(`data-quote-destination="${quoteDestination}"`)) failures.push("Spanish quote form missing ConsumerRateQuotes JS destination");
for (const option of ["Auto", "Homeowners", "Renters", "Business", "General Liability", "Commercial", "Life"]) {
  if (!quoteHtml.includes(`<option>${option}</option>`)) failures.push(`Quote form missing approved option: ${option}`);
}

const notFound = path.join(siteRoot, "404.html");
if (!fs.existsSync(notFound)) {
  failures.push("Missing dedicated 404.html page");
} else {
  const notFoundHtml = read(notFound);
  if (!notFoundHtml.includes('name="robots" content="noindex, nofollow, noarchive"')) failures.push("404.html must be noindex, nofollow, noarchive");
  if (countMatches(notFoundHtml, /<h1[\s>]/gi) !== 1) failures.push("404.html must have exactly one H1");
  if (!notFoundHtml.includes("<head>\n<!-- Google Tag Manager -->")) failures.push("404.html must place Google Tag Manager immediately after <head>");
  if (!notFoundHtml.includes("<body>\n<!-- Google Tag Manager (noscript) -->")) failures.push("404.html must place the GTM fallback immediately after <body>");
  if (countMatches(notFoundHtml, /googletagmanager\.com\/gtm\.js\?id=/g) !== 1) failures.push("404.html must have exactly one GTM script installation");
  if (countMatches(notFoundHtml, /googletagmanager\.com\/ns\.html\?id=GTM-5FZCMM3V/g) !== 1) failures.push("404.html must have exactly one GTM noscript fallback");
  if (countMatches(notFoundHtml, /GTM-5FZCMM3V/g) !== 2) failures.push(`404.html must reference ${googleTagManagerId} only in the standard script and noscript snippets`);
  if (notFoundHtml.includes(googleAnalyticsTagId) || /googletagmanager\.com\/gtag\/js|\bgtag\s*\(/i.test(notFoundHtml)) failures.push("404.html must not hard-code GA4 or gtag.js");
}

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
  const crawlerPolicies = new Map([
    ["GPTBot", "Disallow: /"],
    ["OAI-SearchBot", "Allow: /"],
    ["ChatGPT-User", "Allow: /"],
    ["ClaudeBot", "Disallow: /"],
    ["Claude-SearchBot", "Allow: /"],
    ["Claude-User", "Allow: /"],
    ["Googlebot", "Allow: /"],
    ["Google-Extended", "Disallow: /"],
    ["Applebot", "Allow: /"],
    ["Applebot-Extended", "Disallow: /"],
    ["Bingbot", "Allow: /"],
    ["PerplexityBot", "Allow: /"]
  ]);
  for (const [bot, directive] of crawlerPolicies) {
    const group = robotsText.match(new RegExp(`User-agent: ${bot.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\n([^\\n]*(?:\\n(?!User-agent:|Sitemap:)[^\\n]*)*)`, "i"))?.[0] || "";
    if (!group) failures.push(`robots.txt missing ${bot}`);
    else if (!group.includes(directive)) failures.push(`robots.txt ${bot} must include ${directive}`);
  }
}

const llms = path.join(siteRoot, "llms.txt");
if (!fs.existsSync(llms)) {
  failures.push("Missing llms.txt");
} else {
  const llmsText = read(llms);
  for (const required of ["Your Family First Insurance Office #3", siteUrl, "305-910-8850", "Do not infer price promises"]) {
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
  if (/script-src[^;]*'unsafe-inline'/.test(htaccessText)) failures.push(".htaccess CSP must not allow unsafe inline scripts");
  if (!htaccessText.includes('Strict-Transport-Security "max-age=31536000')) failures.push(".htaccess missing bounded HSTS header");
}

const styles = path.join(siteRoot, "assets", "styles.css");
if (!fs.existsSync(styles)) {
  failures.push("Missing assets/styles.css");
} else {
  const css = read(styles);
  const normalizedCss = css.replace(/[\s"']/g, "").toLowerCase();
  const hasCss = (value) => {
    const normalizedValue = value.replace(/[\s"']/g, "").toLowerCase();
    return normalizedCss.includes(normalizedValue) || normalizedCss.includes(normalizedValue.replaceAll("::", ":"));
  };
  if (!css.includes("prefers-reduced-motion")) failures.push("CSS missing reduced motion support");
  if (/font-size\s*:[^;]*vw/i.test(css)) failures.push("CSS uses viewport-width font sizing");
  if (!hasCss("object-fit: contain")) failures.push("CSS missing logo contain rule");
  for (const variable of ["--navy: #050B12", "--deep-blue: #7DD3FC", "--miami-blue: #9ADCF7", "--aqua: #77E7DC", "--ice: #F3FBFF", "--coral: #FF7D65", "--gold: #F4C96B", "--champagne: #FFE0A1"]) {
    if (!css.includes(variable)) failures.push(`CSS missing palette variable: ${variable}`);
  }
  for (const required of ["backdrop-filter", "--glass-line", ".button::before", ".button::after", ".service-picture", ".liquid-tilt"]) {
    if (!hasCss(required)) failures.push(`CSS missing liquid glass styling: ${required}`);
  }
  for (const required of ["trust-marquee", ".trust-ticker[data-in-view=\"true\"] .trust-track", ".motion-carousel", ".carousel-track", "scroll-snap-type: x mandatory", ".motion-video.is-ready", ".carousel-progress", ".coverage-link-rail", "translate3d(0, 28px, 0)", ".faq summary::after", "white-space: nowrap"]) {
    if (!hasCss(required)) failures.push(`CSS missing polish styling: ${required}`);
  }
}

const js = path.join(siteRoot, "assets", "site.js");
if (!fs.existsSync(js)) {
  failures.push("Missing assets/site.js");
} else {
  const script = read(js);
  if (!script.includes("IntersectionObserver")) failures.push("JS missing scroll reveal IntersectionObserver");
  if (!script.includes("data-in-view")) failures.push("JS missing offscreen animation pausing");
  if (!script.includes("window.location.assign")) failures.push("JS missing secure quote redirect");
  if (!script.includes("data-insurance-carousel")) failures.push("JS missing accessible carousel controller");
  if (!script.includes("syncMotionMedia")) failures.push("JS missing offscreen video pause/play handling");
  if (!script.includes("hydrateVideo")) failures.push("JS missing lazy video hydration");
  if (!script.includes("ArrowRight")) failures.push("JS missing keyboard carousel navigation");
  if (!script.includes("visibilitychange")) failures.push("JS missing tab visibility media pausing");
  for (const eventName of ["phone_click", "sms_click", "email_click", "quote_start", "form_submit"]) {
    if (!script.includes(`"${eventName}"`)) failures.push(`JS missing privacy-safe analytics event: ${eventName}`);
  }
  for (const fieldName of ["page_path", "page_language", "product_category", "cta_location", "landing_page", "referrer_category", "traffic_source", "traffic_medium", "campaign_name", "campaign_content"]) {
    if (!script.includes(`${fieldName}:`)) failures.push(`JS analytics payload missing approved field: ${fieldName}`);
  }
  if (!script.includes('const attributionStorageKey = "yffi_first_touch_v1"')) failures.push("JS missing session-scoped first-touch attribution");
  if (script.includes("gclid") || script.includes("wbraid") || script.includes("gbraid")) failures.push("JS must not store advertising click identifiers without an approved consent and vendor contract");
  if (!script.includes("window.dataLayer.push({")) failures.push("JS missing dataLayer event transport");
}

if (checkDist && fs.existsSync(path.join(siteRoot, "assets", "site.entry.js"))) failures.push("dist must not expose the unbundled browser entry");

if (!checkDist) {
  const server = path.join(root, "server.js");
  if (!fs.existsSync(server)) {
    failures.push("Missing server.js for GoDaddy Beta Apps Node deployment");
  } else {
    const serverText = read(server);
    if (!serverText.includes("process.env.PORT || 3000")) failures.push("server.js must use process.env.PORT || 3000");
    if (!serverText.includes("express.static(distDir")) failures.push("server.js must serve the dist folder with express.static");
    if (!serverText.includes("canonicalHostname")) failures.push("server.js must enforce the verified canonical production host");
    if (!serverText.includes("Strict-Transport-Security")) failures.push("server.js must emit HSTS on HTTPS responses");
    if (!serverText.includes('path.join(distDir, "404.html")')) failures.push("server.js must serve the dedicated 404 page");
    if (!serverText.includes("compression({ threshold: 1024 })")) failures.push("server.js must compress production text responses");
    if (!serverText.includes('maxAge: "7d"')) failures.push("server.js must cache static assets with revalidation support");
    if (/script-src[^;]*'unsafe-inline'/.test(serverText)) failures.push("server.js CSP must not allow unsafe inline scripts");
  }
}

if (failures.length) {
  console.error("Site validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site validation passed for ${checkDist ? "dist" : "source"} output.`);
