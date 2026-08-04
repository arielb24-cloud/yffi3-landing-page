# YFFI3 Production Optimization Audit

## Executive summary

**Overall status before implementation: NOT PRODUCTION-READY.** The canonical apex site had strong page-level SEO, bilingual metadata, accessibility foundations, structured data, discovery resources, and a privacy-safe website data layer. Four material gaps prevented an unqualified production-ready result:

1. The public privacy pages falsely stated that analytics and advertising tracking were absent even though live requests proved that GTM loaded GA4 and a Google Ads destination.
2. The authenticated GTM workspace contained an Apollo Website Tracker Custom HTML tag attached to three broad page triggers, with no confirmed consent default. It produced repeated Content Security Policy errors on production. GTM version 5 now pauses that tag.
3. Source `robots.txt` allowed GPTBot while the `Content-Signal` header denied model training and Cloudflare's managed `robots.txt` blocked GPTBot.
4. `www.yourfamilyfirstinsurance3.com` returned Cloudflare 522 before the Pages middleware could issue its permanent redirect. GTM Admin also reported the Cloudflare Google tag gateway as `Incomplete`, with the apex `Pending`; its two injected bootstrap scripts generated the two remaining CSP errors.

The repository repairs privacy disclosure, crawler-policy consistency, unsupported `priceRange` schema, 301 redirect semantics, review-control accessibility, analytics regression tests, and stale technical documentation. GTM version 5 pauses Apollo and live testing proves it no longer loads. The `www` routing defect, incomplete Google tag gateway, advertising/consent approval, authoritative address/title/licensing facts, Search Console work, GA4 administration, and CRM/vendor integration remain external actions. Because `www` and the two gateway/Ads CSP errors remain unresolved, the post-implementation status is still **NOT PRODUCTION-READY** under the brief's strict acceptance criteria.

## Audit identity and evidence

| Item | Evidence |
|---|---|
| Repository | `arielb24-cloud/yffi3-landing-page` |
| Production URL | `https://yourfamilyfirstinsurance3.com` |
| Audited production commit/tree | Git commit `315b595ddde85e10bbb2d83ed3cc15a457002351`; repository tree matched the prior deployed production tree at baseline |
| Production branch | `main` on `origin` |
| Working branch | `codex/yffi3-production-optimization` |
| Baseline test time | August 4, 2026, 1:56–2:19 PM EDT (`America/New_York`) |
| Package/build | pnpm 11.7.0; `pnpm check`; `pnpm build` |
| Deployment workflow | GitHub `main` is connected to Cloudflare Pages; repository middleware is `functions/_middleware.js` |
| Baseline screenshots | 40 full-page images: 20 at 1440×900 and 20 at 390×844, stored outside the build at `/Users/arielsacc/.codex/visualizations/2026/08/04/019fcde2-77aa-7503-a069-2d28c1bda2d5/yffi3-production-audit/baseline/` |
| Machine evidence | `/Users/arielsacc/.codex/visualizations/2026/08/04/019fcde2-77aa-7503-a069-2d28c1bda2d5/yffi3-production-audit/baseline-live-metadata.json` |
| Browser limitation | The in-app browser connected and navigated successfully, but `Page.captureScreenshot` timed out repeatedly. The permitted fallback used the repository's installed Playwright Chromium for the screenshot matrix. |

Status values in this report are `PASS`, `WARNING`, `FAILURE`, or `BLOCKED`. Severity is `critical`, `high`, `medium`, `low`, or `informational`.

## Written implementation plan

This plan was recorded after the read-only baseline and before source changes:

1. Correct English and Spanish privacy disclosures without changing styles or layout.
2. Make the crawler policy consistent with search/retrieval allowed and training denied.
3. Remove only unsupported structured facts; preserve unresolved public facts until authoritative confirmation.
4. Use 301 for the canonical-host redirect and add focused analytics/privacy/crawler tests.
5. Validate generation, build, browser behavior, accessibility, security headers, and exact before/after screenshots.
6. Preview any authenticated GTM change before publishing; do not weaken CSP to make an unapproved tracker run.
7. Commit in focused reversible units, deploy through the established `main` workflow, then re-audit production.

## Every audited sitemap URL

At baseline, every URL below returned HTTPS 200, `text/html`, one meaningful H1, a unique title and description, a correct self-canonical, reciprocal `en-US`/`es-US`/`x-default` alternates, an indexable robots directive, correct `lang`, valid JSON-LD, Open Graph and Twitter metadata, no mixed content, no missing image alt, and no unlabeled form control. Every page was internally linked. The metadata table in the machine evidence retains the exact values.

| URL | Locale | Baseline | H1 |
|---|---:|---:|---|
| `/` | en-US | PASS | Florida Insurance Made Simple for Your Family |
| `/es/` | es-US | PASS | Seguros de Florida más sencillos para su familia |
| `/auto-insurance/` | en-US | PASS | Auto Insurance Quote Help in Miami |
| `/es/seguro-de-auto/` | es-US | PASS | Ayuda con cotizaciones de seguro de auto en Miami |
| `/home-insurance/` | en-US | PASS | Homeowners Insurance Quote Help for Miami-Dade |
| `/es/seguro-de-vivienda/` | es-US | PASS | Ayuda con seguro para propietarios de vivienda en Miami |
| `/commercial-insurance/` | en-US | PASS | Commercial Insurance Help for Miami Businesses |
| `/es/seguro-comercial/` | es-US | PASS | Ayuda con seguro comercial para negocios de Miami |
| `/life-insurance/` | en-US | PASS | Life Insurance Quote Help for Miami Families |
| `/es/seguro-de-vida/` | es-US | PASS | Ayuda con seguro de vida para familias de Miami |
| `/renters-insurance/` | en-US | PASS | Renters Insurance Quote Help in Miami |
| `/es/seguro-de-inquilinos/` | es-US | PASS | Ayuda con cotizaciones de seguro de inquilinos en Miami |
| `/about-office-3/` | en-US | PASS | About Your Family First Insurance Office #3 |
| `/es/sobre-oficina-3/` | es-US | PASS | Sobre Your Family First Insurance Office #3 |
| `/get-a-quote/` | en-US | PASS | Get My Free Quote |
| `/es/solicitar-cotizacion/` | es-US | PASS | Solicitar cotización |
| `/privacy-policy/` | en-US | FAILURE | Privacy Policy |
| `/es/privacidad/` | es-US | FAILURE | Política de privacidad |
| `/terms/` | en-US | PASS | Website Terms and Insurance Disclaimer |
| `/es/terminos/` | es-US | PASS | Términos del sitio y aviso de seguros |

The privacy failures were content accuracy failures, not metadata or rendering failures.

## Production endpoint and protocol baseline

| Check | Baseline | Evidence and impact |
|---|---|---|
| Apex HTTPS | PASS | HTTP/2 200; HTTP/3 advertised with `alt-svc`; HSTS `max-age=31536000` without `includeSubDomains` or preload |
| Apex HTTP | PASS | Cloudflare 301 to HTTPS with path and query retained |
| `www` HTTPS | FAILURE, high | Cloudflare 522; the request does not reach Pages middleware |
| `www` HTTP | FAILURE, high | Cloudflare first redirects to HTTPS `www`, which then returns 522 |
| `/robots.txt` | WARNING, medium | 200 text/plain; Cloudflare managed preamble and source policy contradicted each other for GPTBot |
| `/sitemap.xml` | PASS | 200 XML; exactly 20 canonical public URLs |
| `/llms.txt` | PASS | 200 text/plain; public facts and non-transactional boundaries present |
| `/.well-known/openapi.json` | PASS | 200 valid JSON with appropriate OpenAPI MIME type |
| `/.well-known/mcp/server-card.json` | PASS | 200 valid JSON; read-only public capability; no fake OAuth or transaction claim |
| `/api/site.json` | PASS | 200 valid JSON; public site facts only |
| `/api/status.json` | PASS | 200 valid JSON; no private data or credentials |
| Unknown path | PASS | Real 404, localized HTML, `noindex`, `Cache-Control: no-store` |
| `Accept: text/markdown` | PASS | Markdown 200, `Vary: Accept`, public 5-minute revalidation, token headers |
| `Accept: text/html` | PASS | HTML 200; no cache/body collision with Markdown |
| Quote destination | PASS WITH LIMITATION | Valid form redirects to the approved ConsumerRateQuotes URL; this site does not store or confirm a completed lead |

## Findings, actions, and verification

| ID | Area | Status/severity | Evidence | Business impact | Action | Implemented | Verification |
|---|---|---|---|---|---|---|---|
| F-01 | Privacy | PASS AFTER REPAIR / critical | Live GA4 and Google Ads requests contradicted both privacy pages | Material trust and compliance exposure | Disclose GTM, GA4, cookies/identifiers, approximate location, Google processing, Ads, paused Apollo, retention/controls, no PII, and legal review | Yes, repository | Bilingual build and browser disclosure tests pass; production verification pending deployment |
| F-02 | GTM/Apollo | PASS WITH WARNING / high | Authenticated workspace had one Apollo Custom HTML tag connected to All Pages, Consent Initialization, and Initialization; production emitted repeated CSP errors | Possible duplicate unconsented tracking attempts and noisy diagnostics | Pause until approved consent and purpose exist; do not weaken CSP | Yes: GTM version 5 published at 2:29 PM EDT | Live fresh-context probe: zero Apollo requests; GA4 tag unchanged |
| F-03 | Google Ads | WARNING / high | Live requests referenced an Ads destination even though no repository ad tag exists | Advertising/remarketing may require consent and an accurate privacy basis | Confirm account, campaign purpose, linked destination, and consent; disconnect if unapproved | Disclosure added; account decision external | NEEDS OWNER/PRIVACY CONFIRMATION |
| F-04 | `www` | FAILURE / high | HTTPS 522 from Cloudflare; Pages middleware cannot execute | Lost traffic, link inconsistency, and acceptance failure | Attach/repair `www` in Cloudflare Pages/DNS, then let middleware return 301 | 301 code corrected | BLOCKED: Cloudflare CLI not authenticated |
| F-05 | Crawler policy | PASS AFTER REPAIR / medium | Source allowed GPTBot while `ai-train=no` and Cloudflare managed robots blocked it | Ambiguous training permission and difficult governance | Allow search/retrieval bots; disallow model-training bots | Yes | Source validation and generated `robots.txt` directive tests pass; live verification pending deployment |
| F-06 | Structured data | PASS AFTER REPAIR / medium | `priceRange: "$$"` had no verified meaning or visible support | Unsupported business fact can reduce trust | Remove only `priceRange`; preserve address until verified | Yes | All JSON-LD parses in generation and 20-page browser tests |
| F-07 | Conversion semantics | PASS / medium | `form_submit` is diagnostic; `quote_start` runs only after validation; no `generate_lead` | Prevents inflated lead reporting | Add invalid/valid handoff tests and no-PII assertions | Yes | Invalid form: no lead/quote start; valid handoff: one quote start; zero PII; all tests pass |
| F-08 | Metadata/SEO | PASS / informational | 20 unique titles/descriptions; correct canonical/hreflang/H1/locale/schema | Strong crawl and presentation foundation | Preserve | No metadata rewrite | Generation, browser, and 40-image visual gate pass |
| F-09 | Asset caching | PASS WITH WARNING / low | Mutable site JS/media cached for four hours; filenames are not all fingerprinted | One-year immutable caching could serve stale mutable files | Keep current revalidation policy; do not add `immutable` | No change | Confirmed by response headers |
| F-10 | Performance | WARNING / medium | Twelve local desktop Lighthouse runs across six EN/ES pages ranged from 0.48–0.97 performance; the repeat homepage runs after the accessibility fix were 0.90 and 0.92 with LCP 1.79–1.87 s. One of four homepage runs had CLS 0.104; the other three were 0. | Third-party scripts and lab variance can affect load and interaction cost | Review field CWV in Search Console; resolve Ads/gateway diagnostics before tuning visible media | No appearance-changing optimization | Accessibility/SEO 1.0; Best Practices 0.74 because CSP blocks an unapproved Ads script |
| F-11 | Business facts | BLOCKED / high | `Ste 108` conflicts with an existing `108-109` reference; titles/licensing and carrier-count claims lack an authoritative source in this audit | Local ranking, licensing, and consumer-trust risk | Verify before any public change | No | NEEDS BUSINESS CONFIRMATION |
| F-12 | Campaign/revenue attribution | BLOCKED / high | Static form validates then redirects; no CRM acknowledgement or completed-quote callback | Cannot report qualified leads, quotes, policies, or revenue truthfully | Implement approved server-side CRM/vendor integration spec | Specification only | NEEDS OAUTH/API PERMISSION and vendor support |
| F-13 | Browser console/tag gateway | FAILURE / high | Baseline had five inline-script CSP errors. After GTM v5, two remain and match Cloudflare-injected first-party Google tag gateway bootstrap scripts. GTM Admin reports gateway `Incomplete` and apex `Pending`. | Noisy diagnostics and an incomplete duplicate-loader path, although standard GTM/GA4 collection still works | Detach or correctly complete the gateway in Cloudflare/GTM; do not allow extra hashes in source CSP | Exact manual action documented | BLOCKED by Cloudflare login/owner consent decision |

## Analytics architecture and observed behavior

Repository and production HTML contain the standard GTM installation exactly once: one `GTM-5FZCMM3V` script and one noscript iframe. No direct `gtag.js` or hard-coded `G-6XC09FD9LD` appears in page source. Live network evidence showed GA4 collection for `G-6XC09FD9LD`, proving the Google tag is delivered through GTM. It also showed a linked Google Ads destination. A fresh post-version-5 probe showed GA4 collection, Google Ads requests, zero Apollo requests, and two blocked scripts belonging to the incomplete Cloudflare Google tag gateway. The site data layer sends only:

- `event`
- `page_path`
- `page_language`
- `product_category`
- `cta_location`

It does not push submitted field values. `form_submit` is diagnostic. `quote_start` is the valid outbound handoff. `generate_lead` is intentionally absent because neither this static site nor the destination provides a success acknowledgement. Marking a mere redirect as a generated lead would inflate conversion reporting.

## Search, AI retrieval, and training policy

The intended policy is:

| Purpose | Crawlers | Policy | Reason |
|---|---|---|---|
| Ordinary search | Googlebot, Bingbot, Applebot | Allow | Discovery and indexing of public pages |
| AI search/retrieval | OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot | Allow | Discovery or user-requested retrieval of public information |
| Model training | GPTBot, ClaudeBot, Google-Extended, Applebot-Extended | Disallow | The business has not granted default training permission |
| Bulk/training-oriented bots | Amazonbot, Bytespider, CCBot, meta-externalagent | Disallow | Align source with Cloudflare's managed training-crawler posture |

The response header remains `Content-Signal: search=yes, ai-input=yes, ai-train=no`. The policy is based on current primary documentation from [OpenAI crawler controls](https://developers.openai.com/api/docs/bots), [Anthropic crawler controls](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers), [Applebot](https://support.apple.com/en-us/119829), and [Cloudflare Managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/).

## Privacy implementation basis

The disclosure follows current primary documentation: [GA4 data collection](https://support.google.com/analytics/answer/11593727), [GA4 IP handling](https://support.google.com/analytics/answer/11598602), [Google Analytics opt-out controls](https://support.google.com/analytics/answer/181881), and [Google tag consent responsibilities](https://support.google.com/tagmanager/answer/12329599). It is a technical disclosure, not legal advice. The business must obtain qualified advice for consent requirements based on its visitors, advertising use, and applicable law.

## Post-implementation verification

### Repository and browser checks

| Command/check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | PASS; lockfile already current |
| `pnpm check` | PASS; source generation, content, carousel assets, agent discovery, site rules, bilingual pairs, HTML, and spelling |
| `pnpm build` | PASS; `dist/` generated and validated |
| Cloudflare Pages Functions build | PASS with Wrangler 4.118.0 |
| Chromium full suite | PASS: 134/134 tests in 8.2 minutes before the final one-line accessibility repair |
| Firefox/WebKit suite | PASS: 144 behavioral tests; 124 expected Chromium-only screenshot skips; zero failures |
| Final focused accessibility suite | PASS: homepage axe plus visible review-label regression, 2/2 |
| Visual gate | PASS: 40/40 at 1440×900 and 390×844; only the two approved privacy pages changed height |
| Lighthouse full gate | COMPLETED WITH EXTERNAL-TAG FAILURE: 12 runs; accessibility and SEO 1.0; Google Ads CSP error keeps Best Practices at 0.74 |
| Lighthouse homepage recheck | PASS for repaired label audit in 2/2; performance 0.90–0.92; LCP 1.79–1.87 s |

The first focused redirect run reused a stale server on port 4175 and returned the previous 308. Rerunning on the isolated server at port 4185 returned the new 301, and the complete Chromium, Firefox, and WebKit suites passed there. This was classified as a test-environment defect, not a product failure.

### Visual evidence

Original baseline screenshots and machine metadata are under the audit artifact root named above. The controlled final comparison uses `comparison-before/`, `after/`, and `visual-diff-summary.json`. Three initial mismatches were moving video frames and one was a QR decode race; the hardened gate compares poster frames and waits with a bounded image-decode timeout. Its final result is 40 passed, 0 failed, with no unexplained difference.

### Authenticated service evidence

- GTM version 5, **Pause unapproved Apollo tracker**, was published August 4, 2026 at 2:29 PM EDT.
- The version contains exactly one modified item: the Apollo Website Tracker is paused. The GA4 Google tag remains unchanged.
- Fresh production network evidence after version 5: GA4 collection present, Google Ads requests present, Apollo requests absent.
- GTM Admin reports Google tag gateway `Incomplete`; apex `Pending`; Pages hostname `Not started`.
- The post-version-5 console has two CSP errors, down from five. Their hashes/content identify Cloudflare's injected gateway bootstraps, not Apollo.

### Deployment state

Repository commit, push, Cloudflare Pages deployment, and final production polling will be recorded after the final diff and commit gate. Until the `www` 522 and incomplete gateway are resolved, the strict overall status remains **NOT PRODUCTION-READY** even if the repository deployment succeeds.
