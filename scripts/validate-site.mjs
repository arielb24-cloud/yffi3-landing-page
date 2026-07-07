import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const checkDist = process.argv.includes("--dist");
const siteRoot = checkDist ? path.join(root, "dist") : root;
const siteUrl = "https://yourfamilyfirstinsurance3.com";
const quoteDestination = "https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868";
const googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJD3Bodbu_2YgR8IRb5h7i-kw&source=g.page.m._&laa=merchant-review-solicitation";
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
const forbiddenDistFiles = [
  "AGENTS.md",
  "AUDIT_REPORT.md",
  "DEPLOYMENT.md",
  "DEPLOYMENT_AUTHORIZATION_REQUESTS.md",
  "MEDIA_TODO.md",
  "README.md",
  "SECURITY.md",
  "SEO_AI_FINDABILITY_NOTES.md",
  "package.json",
  "pnpm-lock.yaml",
  "server.js",
  "playwright.config.mjs",
  "yffi3-godaddy-upload.zip"
];
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
const requiredMotionMedia = [
  "auto-miami-drive",
  "home-miami-sunlight",
  "renters-apartment-keys",
  "business-storefront-open",
  "liability-contractor-checklist",
  "family-protection-planning",
  "bilingual-agent-consult"
];
const serviceMotionExpectations = {
  "auto-insurance": {
    slideIds: ["auto", "auto-renewal", "auto-family-drivers"],
    videoRefs: ["/media/insurance-slides/auto-palm-street-drive.mp4"],
    posterRefs: ["/media/insurance-slides/posters/auto-miami-drive-poster.jpg", "/assets/yffi3/service-auto-slide-1.jpg", "/assets/yffi3/service-auto-slide-4.jpg"],
    start: 'data-start-slide="auto"'
  },
  "home-insurance": {
    slideIds: ["homeowners", "homeowners-closing", "homeowners-renewal"],
    videoRefs: ["/media/insurance-slides/home-miami-sunlight.webm"],
    posterRefs: ["/media/insurance-slides/posters/home-miami-sunlight-poster.jpg", "/assets/yffi3/service-homeowners-slide-2.jpg", "/assets/yffi3/service-homeowners-slide-3.jpg"],
    start: 'data-start-slide="homeowners"'
  },
  "commercial-insurance": {
    slideIds: ["business", "commercial-liability", "commercial-certificates"],
    videoRefs: ["/media/insurance-slides/business-storefront-open.webm", "/media/insurance-slides/liability-contractor-checklist.webm"],
    posterRefs: ["/media/insurance-slides/posters/business-storefront-open-poster.jpg", "/media/insurance-slides/posters/liability-contractor-checklist-poster.jpg", "/assets/yffi3/service-commercial-slide-3.jpg"],
    start: 'data-start-slide="business"'
  },
  "life-insurance": {
    slideIds: ["family", "life-term", "life-final-expense"],
    videoRefs: ["/media/insurance-slides/family-protection-planning.webm"],
    posterRefs: ["/media/insurance-slides/posters/family-protection-planning-poster.jpg", "/assets/yffi3/service-life-slide-2.jpg", "/assets/yffi3/service-life-slide-3.jpg"],
    start: 'data-start-slide="family"'
  },
  "renters-insurance": {
    slideIds: ["renters", "renters-lease", "renters-belongings"],
    videoRefs: ["/media/insurance-slides/renters-apartment-keys.webm"],
    posterRefs: ["/media/insurance-slides/posters/renters-apartment-keys-poster.jpg", "/assets/yffi3/service-renters-slide-2.jpg", "/assets/yffi3/service-renters-slide-3.jpg"],
    start: 'data-start-slide="renters"'
  }
};

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
  if (slug === "" && html.includes('id="condo-insurance"')) failures.push("home should replace Condo Insurance card with General Liability");
  if (slug === "" && !html.includes('id="general-liability-insurance"')) failures.push("home missing General Liability coverage card");
  if (slug === "" && !html.includes('id="health-insurance"')) failures.push("home missing Health Insurance coverage card");
  if (slug === "" && !html.includes('id="google-reviews"')) failures.push("home missing Google reviews trust section");
  if (slug === "" && !html.includes(googleReviewUrl)) failures.push("home Google review CTA must use the Office #3 Google review URL");
  if (slug === "" && !html.includes('id="seguros-en-espanol"')) failures.push("home missing Spanish local SEO section");
  if (slug === "" && html.includes('href="/home-insurance/">Home</a>')) failures.push("home nav should label home-insurance as Homeowners");
  if (slug === "home-insurance" && !html.includes("Homeowners Insurance")) failures.push("homeowners page missing Homeowners Insurance wording");
  if (slug === "about-office-3" && !html.includes('id="google-reviews"')) failures.push("about page missing Google reviews trust section");
  if (slug === "about-office-3" && !html.includes('id="seguros-en-espanol"')) failures.push("about page missing Spanish local SEO section");
  if (slug === "" && countMatches(html, /<details>/g) < 8) failures.push("home FAQ should include expanded customer/search-intent questions");
  if (slug === "" && !html.includes("bilingual insurance help")) failures.push("home FAQ missing bilingual service question");
  if (["auto-insurance", "home-insurance", "commercial-insurance", "life-insurance", "renters-insurance"].includes(slug) && !html.includes("Local search guide")) {
    failures.push(`${slug} missing local search-intent panel`);
  }
  if (["auto-insurance", "home-insurance", "commercial-insurance", "life-insurance", "renters-insurance"].includes(slug)) {
    const expectedMotion = serviceMotionExpectations[slug];
    if (!html.includes("data-insurance-carousel")) failures.push(`${slug} missing interactive insurance motion carousel`);
    if (countMatches(html, /class="motion-slide"/g) !== expectedMotion.slideIds.length) failures.push(`${slug} carousel should include focused service slides only`);
    if (countMatches(html, /class="motion-video"/g) < 1) failures.push(`${slug} carousel should include at least one lazy video element`);
    if (countMatches(html, /class="motion-poster"/g) !== expectedMotion.slideIds.length) failures.push(`${slug} carousel should include one poster per focused slide`);
    if (countMatches(html, /class="carousel-chip"/g) !== expectedMotion.slideIds.length) failures.push(`${slug} carousel should include focused category chips`);
    if (countMatches(html, /class="carousel-dot"/g) !== expectedMotion.slideIds.length) failures.push(`${slug} carousel should include focused accessible dots`);
    if (!html.includes('data-carousel-prev') || !html.includes('data-carousel-next')) failures.push(`${slug} carousel missing arrow controls`);
    for (const slideId of expectedMotion.slideIds) {
      if (!html.includes(`data-slide-id="${slideId}"`)) failures.push(`${slug} missing focused carousel slide: ${slideId}`);
    }
    for (const videoRef of expectedMotion.videoRefs) {
      if (!html.includes(videoRef)) failures.push(`${slug} missing focused carousel video reference: ${videoRef}`);
    }
    for (const posterRef of expectedMotion.posterRefs) {
      if (!html.includes(posterRef)) failures.push(`${slug} missing focused carousel poster reference: ${posterRef}`);
    }
    if (!html.includes(expectedMotion.start)) failures.push(`${slug} carousel does not prioritize matching first slide`);
    if (html.includes("motion-category")) failures.push(`${slug} carousel still renders cluttered overlay category labels`);
    if (html.includes("motion-detail")) failures.push(`${slug} carousel still renders cluttered overlay detail text`);
    if (slug === "auto-insurance" && html.includes("/assets/yffi3/service-auto-slide-2.jpg")) failures.push("auto page should not render the car-key still in the carousel");
    if (html.includes("related-links")) failures.push(`${slug} service page should not render unrelated coverage link section`);
    if (html.includes("service-auto-gallery.webp") || html.includes("service-homeowners-gallery.webp") || html.includes("service-commercial-gallery.webp") || html.includes("service-life-gallery.webp") || html.includes("service-renters-gallery.webp")) failures.push(`${slug} still references old gallery-strip service art`);
    if (html.includes("service-auto-insurance.svg") || html.includes("service-homeowners-insurance.svg") || html.includes("service-commercial-insurance.svg") || html.includes("service-life-insurance.svg") || html.includes("service-renters-insurance.svg")) failures.push(`${slug} still references old SVG service art`);
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
  for (const disallowed of ["Disallow: /package.json", "Disallow: /server.js", "Disallow: /DEPLOYMENT.md", "Disallow: /MEDIA_TODO.md", "Disallow: /node_modules/"]) {
    if (!robotsText.includes(disallowed)) failures.push(`robots.txt missing backend artifact disallow: ${disallowed}`);
  }
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

const notFound = path.join(siteRoot, "404.html");
if (!fs.existsSync(notFound)) {
  failures.push("Missing noindex 404.html");
} else {
  const notFoundText = read(notFound);
  if (!/<meta name="description" content="[^"]+">/i.test(notFoundText)) failures.push("404.html missing meta description");
  if (!/<meta name="robots" content="noindex, nofollow, noarchive">/i.test(notFoundText)) failures.push("404.html missing noindex robots meta");
  if (countMatches(notFoundText, /<h1[\s>]/gi) !== 1) failures.push("404.html must have exactly one H1");
}

if (checkDist) {
  for (const file of forbiddenDistFiles) {
    if (fs.existsSync(path.join(siteRoot, file))) failures.push(`dist must not expose backend/deployment file: ${file}`);
  }
  for (const directory of ["node_modules", "test-results", "playwright-report", "playwright-screenshots", "audit-screenshots"]) {
    if (fs.existsSync(path.join(siteRoot, directory))) failures.push(`dist must not expose backend/QA directory: ${directory}`);
  }
}

const htaccess = path.join(siteRoot, ".htaccess");
if (!fs.existsSync(htaccess)) {
  failures.push("Missing .htaccess security header file");
} else {
  const htaccessText = read(htaccess);
  for (const header of ["Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
    if (!htaccessText.includes(header)) failures.push(`.htaccess missing ${header}`);
  }
  if (!htaccessText.includes("https://secure.ConsumerRateQuotes.com")) failures.push(".htaccess CSP missing ConsumerRateQuotes form-action");
  if (!htaccessText.includes("media-src 'self'")) failures.push(".htaccess CSP missing media-src for local videos");
  if (!htaccessText.includes("ErrorDocument 404 /404.html")) failures.push(".htaccess missing noindex 404 fallback");
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
  for (const required of ["trust-marquee", ".trust-ticker[data-in-view=\"true\"] .trust-track", ".motion-carousel", ".carousel-track", "scroll-snap-type: x mandatory", ".motion-video.is-ready", ".carousel-progress", ".coverage-link-rail", "translate3d(0, 28px, 0)", ".faq summary::after", "white-space: nowrap"]) {
    if (!css.includes(required)) failures.push(`CSS missing polish styling: ${required}`);
  }
}

const js = path.join(siteRoot, "assets", "site.js");
if (!fs.existsSync(js)) {
  failures.push("Missing assets/site.js");
} else {
  const script = read(js);
  if (!script.includes("IntersectionObserver")) failures.push("JS missing scroll reveal IntersectionObserver");
  if (!script.includes("data-in-view")) failures.push("JS missing offscreen animation pausing");
  if (!script.includes("syncMotionMedia")) failures.push("JS missing offscreen video pause/play handling");
  if (!script.includes("data-insurance-carousel")) failures.push("JS missing insurance carousel initialization");
  if (!script.includes("hydrateVideo")) failures.push("JS missing lazy carousel video hydration");
  if (!script.includes("data-carousel-chip")) failures.push("JS missing category chip handling");
  if (!script.includes("ArrowRight")) failures.push("JS missing keyboard carousel navigation");
  if (!script.includes("window.location.assign")) failures.push("JS missing secure quote redirect");
}

const mediaRoot = checkDist
  ? path.join(siteRoot, "media", "insurance-slides")
  : path.join(root, "public", "media", "insurance-slides");
for (const mediaName of requiredMotionMedia) {
  if (!fs.existsSync(path.join(mediaRoot, `${mediaName}.webm`))) failures.push(`Missing local carousel WebM media: ${mediaName}.webm`);
  if (!fs.existsSync(path.join(mediaRoot, "posters", `${mediaName}-poster.jpg`))) failures.push(`Missing local carousel poster: ${mediaName}-poster.jpg`);
}

if (!checkDist) {
  const server = path.join(root, "server.js");
  if (!fs.existsSync(server)) {
    failures.push("Missing server.js for GoDaddy Beta Apps Node deployment");
  } else {
    const serverText = read(server);
    if (!serverText.includes("process.env.PORT || 3000")) failures.push("server.js must use process.env.PORT || 3000");
    if (!serverText.includes("express.static(distDir")) failures.push("server.js must serve the dist folder with express.static");
    if (!serverText.includes("blockedPublicPaths")) failures.push("server.js must block backend/deployment-looking public paths");
    if (!serverText.includes("404.html")) failures.push("server.js must serve noindex 404.html for unknown HTML routes");
    if (!serverText.includes("media-src 'self'")) failures.push("server.js CSP missing media-src for local videos");
  }
}

if (failures.length) {
  console.error("Site validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site validation passed for ${checkDist ? "dist" : "source"} output.`);
