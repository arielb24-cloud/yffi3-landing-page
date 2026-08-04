# YFFI3 Manual Actions

This file contains only actions that cannot be safely completed from the repository. Status labels are intentionally explicit.

## 1. Repair the `www` production hostname — NEEDS HUMAN LOGIN

- **Dashboard/service:** Cloudflare dashboard for `yourfamilyfirstinsurance3.com` and its Pages project.
- **Menu path:** `Workers & Pages` → select the YFFI3 Pages project → `Custom domains`.
- **Field/setting:** `www.yourfamilyfirstinsurance3.com`.
- **Recommended value:** Attach `www.yourfamilyfirstinsurance3.com` to the same Pages project as the apex. In `DNS` → `Records`, remove only a confirmed conflicting/orphaned `www` A, AAAA, or CNAME record. Use the Pages-provided record and keep it proxied. In `Workers & Pages` → `Overview` → `Domains & Routes`, remove a `www` Worker route only if it points to a different Worker.
- **Why it matters:** HTTPS `www` currently returns Cloudflare 522 before repository middleware can issue the configured 301 to the apex.
- **How to verify:** `curl -I 'https://www.yourfamilyfirstinsurance3.com/es/seguro-de-auto/?source=verify'` must return one permanent 301 whose `Location` is `https://yourfamilyfirstinsurance3.com/es/seguro-de-auto/?source=verify`; following it must end at 200 without a loop.
- **Risk if incorrect:** Deleting an authoritative DNS record or attaching the hostname to the wrong Pages project can create downtime or route traffic to the wrong site. Do not enable HSTS `includeSubDomains` or preload until this succeeds.

## 2. Verify Cloudflare security posture — NEEDS HUMAN LOGIN

- **Dashboard/service:** Cloudflare zone dashboard.
- **Menu path and values:**
  - `SSL/TLS` → `Overview` → encryption mode: **Full (strict)**.
  - `SSL/TLS` → `Edge Certificates` → `Always Use HTTPS`: **On**; `Minimum TLS Version`: **TLS 1.2**; `TLS 1.3`: **On**; `Automatic HTTPS Rewrites`: **On**.
  - `Security` → `WAF` → `Managed rules`: enable and monitor appropriate Cloudflare managed protections.
  - `Security` → `Settings`: `Under Attack Mode`: **Off** unless responding to an attack.
  - `Caching` → `Configuration`: `Development Mode`: **Off** normally.
  - `Speed` → `Optimization` → `Protocol Optimization`: HTTP/3 **On**.
- **Why it matters:** The live edge proves HSTS, HTTP/2, and HTTP/3 advertisement, but dashboard origin validation, WAF, and TLS toggles were not accessible from the unauthenticated CLI.
- **How to verify:** Cloudflare Configuration Rules show no conflicting override; SSL Labs or an equivalent controlled test confirms TLS 1.2+; apex stays 200 and the repaired `www` redirect works.
- **Risk if incorrect:** `Flexible` SSL can cause redirect loops and unencrypted origin traffic. Aggressive WAF/rate rules can block search crawlers and customers. HSTS subdomain/preload settings can make broken subdomains inaccessible for a long time.

## 3. Resolve the incomplete Google tag gateway — NEEDS HUMAN LOGIN

- **Dashboard/service:** GTM container `GTM-5FZCMM3V` and Cloudflare Google tag gateway.
- **Menu path:** GTM `Admin` → `Google tag gateway`; then `Configure` or the `Manage in Cloudflare` link. Cloudflare opens the zone's Google tag gateway page.
- **Field/setting:** GTM currently reports `Incomplete`; `yourfamilyfirstinsurance3.com` is `Pending`; the Pages hostname is `Not started`.
- **Recommended value:** Because this repository already contains the standard manual GTM installation, detach/delete the incomplete gateway until the owner intentionally approves a complete first-party gateway and consent configuration. In GTM `Admin` → `Google tag gateway` → `Configure` → `Delete`, review the domain impact and confirm. If the owner elects to keep it instead, complete the Cloudflare connection, keep automatic script setup off for the manually tagged domain, and validate the selected measurement path in Tag Assistant.
- **Why it matters:** Cloudflare currently injects two gateway bootstrap scripts that CSP blocks. Allowing their hashes in repository CSP could enable a second loader, so CSP must not be weakened as a workaround.
- **How to verify:** GTM Admin no longer shows an incomplete/pending gateway; rendered HTML has one executable GTM loader; browser console has zero CSP errors; Tag Assistant shows one Google tag and expected hits; GA4 Realtime/DebugView receives a test page view without duplicate events.
- **Risk if incorrect:** Detaching a working gateway can reduce measurement recovery; completing automated injection over a manual install can duplicate tags. Take a configuration screenshot and use Tag Assistant before/after. See [Google's Cloudflare gateway instructions](https://support.google.com/analytics/answer/16061641).

## 4. Review Google Ads and consent; keep Apollo paused — NEEDS OWNER AND PRIVACY APPROVAL

- **Dashboard/service:** Google Tag Manager container `GTM-5FZCMM3V` and the linked Google Ads account.
- **Menu path:** GTM `Workspace` → `Tags`; Google Ads `Tools` → `Data manager` → `Google tag` → `Manage`.
- **Field/setting:** Paused `Apollo Website Tracker` tag; linked Google Ads destination; consent defaults and per-tag consent checks.
- **Recommended value:** GTM version 5 pauses Apollo. Keep it paused unless the owner documents a valid business purpose, vendor agreement, retention, consent basis, and privacy approval. Remove duplicate broad triggers and use one consent-gated trigger if later approved. Confirm the Google Ads destination belongs to an active approved account/campaign; disconnect or deactivate remarketing if not approved. Implement consent mode/CMP only after qualified legal review identifies the required regions and choices.
- **Why it matters:** The Apollo Custom HTML tag was attached to three page-wide triggers and caused CSP errors before version 5 paused it. Live Google Ads measurement/remarketing requests were observed. No approved consent default was proven.
- **How to verify:** In GTM Preview/Tag Assistant, Apollo does not fire while paused and the Google tag fires once. GA4 receives only approved non-PII parameters. Diagnose the separate tag-gateway CSP errors under action 3. Review the final version diff and retain version 5 unless a later approved version supersedes it.
- **Risk if incorrect:** Publishing an unreviewed tag can create privacy exposure, duplicate data, bad attribution, or website errors. Weakening CSP with `unsafe-inline` would increase security risk and is not recommended.

## 5. Configure and verify GA4 reporting — NEEDS HUMAN LOGIN

- **Dashboard/service:** GA4 property for measurement ID `G-6XC09FD9LD`.
- **Menu path:** `Admin` → `Data collection and modification` → `Data streams` for the web stream; `Admin` → `Data display` → `Events` and `Key events`; `Admin` → `Data settings` → `Data retention`; `Reports` → `Realtime`; `Admin`/`DebugView` where shown in the current UI.
- **Field/setting:** Enhanced measurement, internal/developer traffic filters, retention, event/key-event names.
- **Recommended value:** Confirm the production stream URL and measurement ID; exclude internal/developer traffic only through tested filters; document retention; use `phone_click` and `sms_click` as key events, `email_click` optionally, and `quote_start` as a secondary funnel event. Do not create `generate_lead` until a secure system confirms a valid lead. Do not double-count enhanced-measurement form events.
- **Why it matters:** Live GA4 page-view collection was proven, but event receipt, DebugView, retention, filters, and key-event settings were not.
- **How to verify:** Test from GTM Preview, confirm exactly one event in Tag Assistant and DebugView, inspect parameters for PII, then confirm Realtime. Use test data only.
- **Risk if incorrect:** Marking `form_submit` as a lead or enabling duplicate form measurement inflates conversions and corrupts campaign decisions.

## 6. Submit and inspect in Google Search Console — NEEDS HUMAN LOGIN

- **Dashboard/service:** Google Search Console.
- **Menu path:** Select the **Domain property** `yourfamilyfirstinsurance3.com`; `Sitemaps`; `URL inspection`; `Indexing` → `Pages`; `Experience` → `Core Web Vitals`; `Security & Manual Actions`.
- **Field/setting:** Submit `https://yourfamilyfirstinsurance3.com/sitemap.xml`.
- **Recommended value:** Inspect `/`, the five English service pages, their five Spanish counterparts, `/get-a-quote/`, and `/es/solicitar-cotizacion/`. Confirm live access, declared/selected canonical, HTTPS, robots access, and indexing. Export the last 28 days and compare with the prior 28 days by query, page, device, and country.
- **Why it matters:** Repository and live crawlability are proven, but Google indexing, canonical selection, demand, CTR, manual actions, and field Core Web Vitals are not.
- **How to verify:** Sitemap status is `Success`; inspected priority pages are available to Google and use the intended canonical; no manual action/security issue is present.
- **Risk if incorrect:** Requesting indexing before business facts or privacy are corrected can accelerate discovery of inaccurate information. Repeated submissions do not improve rankings.

## 7. Verify the authoritative business entity — NEEDS BUSINESS CONFIRMATION

- **Dashboard/service:** Florida licensing records, lease/official business documents, Google Business Profile, and approved franchise records.
- **Menu path:** GBP `Edit profile` → `Business information`; compare with the authoritative primary documents and Florida license lookup.
- **Field/setting:** Public/legal name, street and suite, phone, categories, service areas, hours, principal/CEO title, producer/license language, carrier-count claims, geo coordinates, and approved profiles.
- **Recommended value:** Do not change the website from `Ste 108` to `108-109` until the authoritative document and GBP agree. Confirm whether `Principal Agent`, `CEO`, agent descriptions, and any `50+` carrier statement are legally and factually supportable. Add hours, coordinates, email, `hasMap`, and `sameAs` only when verified.
- **Why it matters:** Inconsistent NAP or unsupported licensing/title claims harm local trust and can create regulatory risk.
- **How to verify:** The exact same approved entity facts appear in the website footer, JSON-LD, Markdown, APIs, GBP, Apple Business Connect, Bing Places, and approved profiles.
- **Risk if incorrect:** A silent suite or licensing change may misdirect customers and create compliance problems.

## 8. Reconcile local listings — NEEDS HUMAN LOGIN

- **Dashboard/service:** Google Business Profile, Apple Business Connect, Bing Places, Facebook, Instagram, LinkedIn, Yelp, and applicable insurance directories.
- **Menu path:** Each service's business/profile information editor.
- **Field/setting:** Name, address/suite, phone, website canonical URL, primary/secondary category, hours, service area, language, description, logo, and review URL.
- **Recommended value:** Use only the approved entity record from action 6. Point website links to the canonical HTTPS apex; do not use tracking parameters in structured data or core NAP fields.
- **Why it matters:** Consistent real-world entity signals support local discovery and reduce customer confusion.
- **How to verify:** Complete the separate local consistency checklist and retain dated screenshots/export records outside the public repository.
- **Risk if incorrect:** Duplicate listings, category stuffing, or inconsistent names can trigger suspensions and split review authority.

## 9. Approve a secure CRM/quote-vendor integration — NEEDS OAUTH / API PERMISSION

- **Dashboard/service:** Approved CRM and ConsumerRateQuotes/vendor administration.
- **Menu path:** Vendor-specific API/webhook/OAuth application settings.
- **Field/setting:** Server-to-server lead creation, success acknowledgement, webhook/callback, idempotency key, campaign fields, retention, user roles, and offline conversion export.
- **Recommended value:** Implement only the integration specified in `docs/audits/yffi3-measurement-and-integration-spec.md`. Keep secrets server-side; require acknowledgement before `generate_lead`; map qualified lead, completed quote, bound policy, and revenue from the system of record.
- **Why it matters:** The current static form redirects and forces re-entry; it cannot prove a completed lead or preserve campaign attribution reliably.
- **How to verify:** Use vendor-approved synthetic records in staging; prove deduplication, error handling, consent capture, deletion, and offline conversion reconciliation before production.
- **Risk if incorrect:** PII leakage, duplicate leads, false conversions, or lost customer data.

## 10. Run external rich-result and field-performance validation — NEEDS HUMAN BROWSER/QUOTA

- **Dashboard/service:** Google Rich Results Test, Schema.org Validator, PageSpeed Insights, and Search Console Core Web Vitals.
- **Menu path:** Submit representative English and Spanish canonical URLs after deployment.
- **Field/setting:** `/`, `/auto-insurance/`, `/es/seguro-de-auto/`, `/get-a-quote/`, and `/es/solicitar-cotizacion/`.
- **Recommended value:** Treat validation as evidence, not as a ranking guarantee. Use multiple PageSpeed runs and field data where available.
- **Why it matters:** Repository JSON parsing and browser tests do not prove Google's selected rich-result treatment or real-user performance.
- **How to verify:** Save dated result URLs/exports; reconcile any error to visible content and current official requirements.
- **Risk if incorrect:** Adding unsupported schema merely to clear a warning can create spam-policy risk.
