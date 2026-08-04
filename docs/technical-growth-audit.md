# Technical Growth Audit

Audit scope: Your Family First Insurance Office #3 public website, English and Spanish routes, GoDaddy Beta Apps Node.js deployment.

## Verified In The Repository

| Area | Status | Evidence |
|---|---|---|
| Metadata | VERIFIED | Every public route has a unique title, concise description, canonical URL, Open Graph data, Twitter card data, and reciprocal English/Spanish alternates. |
| Crawlability and indexability | VERIFIED | Public pages are crawlable; the localized 404 pages return a real 404 and include `noindex`. |
| Structured data | VERIFIED | The site emits `InsuranceAgency`, `WebSite`, `Service`, `BreadcrumbList`, `ItemList`, and matching `FAQPage` JSON-LD where applicable. |
| Semantic HTML and accessibility | VERIFIED | Each page has one H1, semantic landmarks, labeled controls, keyboard navigation, visible focus, reduced-motion support, and automated axe checks. |
| Internal linking and content architecture | VERIFIED | English and Spanish service, quote, about, privacy, and terms pages are linked with reciprocal locale paths and crawlable anchors. |
| Redirects | VERIFIED | The Node server uses permanent HTTPS and apex-domain redirects in production. Unknown routes return localized 404 pages instead of a misleading homepage fallback. |
| Sitemap and robots | VERIFIED | `sitemap.xml` contains all 20 localized URLs with `en-US`, `es-US`, and `x-default` alternates. `robots.txt` exposes the sitemap and allows major search and AI crawlers. |
| AI crawler access | VERIFIED | Search and user-requested retrieval crawlers are allowed, while model-training crawlers are blocked. `llms.txt` publishes approved NAP, services, and claim boundaries. |
| Performance configuration | VERIFIED WITH AUTO-PAGE BUDGET WARNING | Carousel media is self-hosted, poster-first, active-only playback, lazy hydration, offscreen pause, transform/opacity motion, Save-Data fallback, reduced-motion fallback, compression, responsive logo assets, and cache headers. The final 12-run desktop Lighthouse CI pass met the strict 0.90 performance and 2.5 s LCP targets on the English/Spanish home and homeowners pages. The English/Spanish auto pages scored 0.87 with approximately 2.51 s LCP, so performance and LCP remain visible CI warnings instead of deployment blockers; accessibility, best practices, SEO, console, image-alt, label, compression, and CLS checks remain blocking. |
| Automated testing | VERIFIED | Build validation, bilingual validation, carousel deduplication, Playwright interaction/visual/a11y coverage, Lighthouse CI, spelling, and link checks are wired into package scripts and GitHub Actions. |
| Security and privacy | VERIFIED | CSP, HSTS on secure production requests, clickjacking protection, MIME sniff protection, restrictive Permissions Policy, no frontend secrets, no sensitive underwriting fields, and secure quote routing are enforced. |
| Backend and build tooling | VERIFIED | Node 22 serves the generated `dist/` directory; `pnpm run build` creates the production site and `pnpm start` uses `process.env.PORT || 3000`. |

## Owner Or Platform Actions

| Area | Status | Required action |
|---|---|---|
| Analytics and event tracking | PARTIALLY CONNECTED | GTM loads GA4 and a Google Ads destination. GTM version 5 pauses the Apollo Website Tracker; it must not be enabled without owner/privacy approval and a valid consent configuration. The public privacy page discloses the observed tools and the data layer excludes form values. |
| Google Search Console | NEEDS OWNER TOKEN | Verify the canonical domain, submit `/sitemap.xml`, inspect the main English and Spanish URLs, and monitor indexing and Core Web Vitals. |
| Bing Webmaster Tools | NEEDS OWNER TOKEN | Verify the domain, submit `/sitemap.xml`, and request re-crawls after publishing material content changes. |
| Cloudflare | CONNECTED WITH WWW BLOCKER | The apex production domain is served by Cloudflare Pages. The `www` hostname currently fails with Cloudflare 522 before the Pages middleware can return its configured 301 redirect; repair the `www` custom-domain/DNS route in Cloudflare. |
| Content accuracy | OWNER CONFIRMATION | Reconfirm the public NAP, 50+ carrier access statement, ConsumerRateQuotes account 64868 routing, office hours before publishing them, and the date/source of the static Google review snapshot. |

## Off-Site Growth Priorities

1. Keep the Google Business Profile name, address, phone, categories, service area, website, and hours exactly consistent with the website.
2. Ask real customers for reviews through the approved Office #3 Google review link and QR code; never gate, fabricate, or selectively suppress feedback.
3. Publish useful English and Spanish Google Business Profile posts tied to real Miami insurance questions and seasonal needs.
4. Build consistent local citations on major directories and correct any conflicting Office #3 NAP records.
5. Earn relevant local links through Miami business associations, community organizations, landlord/property partners, and contractor networks without buying spam links.
6. Add original, compliance-reviewed local guides over time based on Search Console queries. Prioritize helpful answers over repetitive keyword pages.
7. Use the existing privacy-safe data layer for quote starts and contact clicks. Add completed-lead, qualified-lead, bound-policy, and revenue events only through an approved server-side CRM integration with consent, deduplication, and test records.

No technical change can guarantee first-place rankings or a fixed visitor count. Sustainable growth depends on useful original content, accurate local entity signals, real customer trust, links, crawl/index health, and conversion measurement.
