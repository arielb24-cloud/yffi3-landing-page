# YFFI3 verified attribute scorecard — 2026-08-05

These are implementation-maturity scores, not predicted Google rankings. A score requires current evidence; it is reduced when proof depends on indexing, third-party approval, OAuth, vendor callbacks, citations, reviews, links, or accumulated traffic.

| Rank | Attribute | Score / 100 | Verified current state | What prevents a higher score |
| ---: | --- | ---: | --- | --- |
| 1 | LocalBusiness / InsuranceAgency schema and NAP | 98 | One stable `InsuranceAgency` entity, verified address/phone/hours/languages/map, and a 13-service offer catalog validate across both locales | Search engines decide when to recrawl and reconcile the older cached result |
| 2 | Front-end marketing attribution capture | 97 | Landing page, language, quote source, sanitized UTM source/medium/campaign/ID/term/content, and intent events are available without contact data or raw GCLID in `dataLayer` | No supported vendor acknowledgement or CRM join is active yet |
| 3 | Technical SEO and crawlability | 96 | HTTPS, canonical/hreflang, robots/sitemap, 20 valid URLs, discovery resources, one H1 per page, parseable JSON-LD, and Search Console sitemap `Success` | Search Console indexing/link/CWV reports are still processing for the young domain |
| 4 | Google Business Profile and Maps | 96 | Verified profile, correct NAP/website/hours/service areas/languages/category/WhatsApp/Map entity; RV service added from verified site facts | RV service is `PENDING GOOGLE REVIEW`; only 8 Google reviews were present and three had no owner reply |
| 5 | English/Spanish local relevance | 96 | Reciprocal locale pages, substantial bilingual service content, localized validation/privacy copy, Miami home H1s, and the last English conjunction defect corrected | Additional page opportunities need real Search Console demand before expansion |
| 6 | GA4/GTM intent measurement | 96 | GTM v7, GA4 Google tag, `page_view`, `phone_click`, `sms_click`, and `quote_start` were proven through Tag Assistant and Realtime; Apollo remains paused | No verified email CTA; GA4 event/key-event tables require processing and a later configuration recheck |
| 7 | Bilingual conversion funnel | 96 | English/Spanish desktop call/SMS/quote/form/privacy paths pass, exact destinations match, sensitive data is blocked, and no horizontal overflow was measured | Fresh mobile interaction emulation was unavailable in the selected browser; same-run mobile visual evidence passed |
| 8 | Production performance and Core Web Vitals | 95 | Cloudflare 24-hour RUM: 951 ms page load, LCP P75 889 ms, INP 100% good, CLS 100% good; design and animations preserved | Low sample volume and an unexplained LCP tail: 8% poor, P90 3,992 ms |
| 9 | Existing-page Miami search opportunity | 95 | Unique metadata/H1s, substantial service pages and FAQs, current qualitative Miami SERP gap audit, and improve-existing-first decision | Search Console has no usable query/click history yet; no defensible search-volume claims |
| 10 | AI/search retrieval readiness | 92 | Search/retrieval crawler access, `llms.txt`, machine-readable public facts, Markdown negotiation, OpenAPI and read-only discovery cards are present | These improve eligibility, not guaranteed citation/recommendation by any AI platform |
| 11 | Traffic-to-bound-policy-to-revenue attribution | 72 | Safe event/lifecycle schemas, dedupe/privacy gates, QQCatalyst mapping, Google Ads mapping, and a tested local CSV joiner are ready | `NEEDS OAUTH / API PERMISSION` for QQCatalyst and written ConsumerRateQuotes persistence/callback/export confirmation |
| 12 | Off-site authority, citations, reviews, and backlinks | 70 | Google profile, Google Maps entity, Facebook, parent-brand office listing, and the public site are verified | Current exact-name/phone/address searches did not establish a broad citation or quality-backlink footprint; no fake listings, paid-link spam, fake reviews, or outreach was created |

Weighted equally, the current implementation-maturity score is **92/100**. The largest remaining gains are external and evidence-gated: supported vendor/CRM integration, real customer review operations, legitimate Miami partnerships/citations/backlinks, and accumulated Search Console/RUM data.

## Truthful platform status

| Platform surface | Status | Evidence boundary |
| --- | --- | --- |
| Google Search | `PARTIALLY CONNECTED` | Domain property and sitemap connected; discovery confirmed; ranking/recommendation not guaranteed |
| Google Business Profile / Maps | `PARTIALLY CONNECTED` | Profile verified; RV service pending review |
| GA4 / GTM | `CONNECTED` for measured website intent | Does not prove completed lead, quote, bind, or revenue |
| QQCatalyst | `NEEDS OAUTH / API PERMISSION` | Official API path designed, not connected |
| ConsumerRateQuotes attribution | `BLOCKED` | Needs written vendor contract for reference persistence and success acknowledgement |
| Local CSV revenue join | `CSV FALLBACK READY` | Local-only tested reconciliation package |
| Bing and AI-search retrieval eligibility | `PARTIALLY CONNECTED` | Crawl/retrieval surfaces are available; no platform-wide recommendation guarantee exists |
