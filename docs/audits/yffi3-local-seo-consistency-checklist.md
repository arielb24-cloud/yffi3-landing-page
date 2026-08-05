# YFFI3 Local SEO consistency audit

Audit date: 2026-08-05 (America/New_York)

Use only verified business data. Never add locations, reviews, citations, credentials, categories, service areas, or licensing claims without authoritative evidence.

## Canonical entity record

| Field | Verified value | Source and status |
| --- | --- | --- |
| Google Business Profile name | Your Family First Insurance | Signed-in GBP; `CONNECTED`, verified, profile strength complete |
| Website entity name | Your Family First Insurance Office #3 | Current website and structured data; the brand is separately identified as Your Family First Insurance |
| Address | 11200 W Flagler St, Suite 108-109, Miami, FL 33174 | Signed-in GBP editor and website agree after normalizing `108-109` versus `Suite 108-109`; `MATCH` |
| Phone | 305-910-8850 | Signed-in GBP editor and website; `MATCH` |
| Website | https://yourfamilyfirstinsurance3.com/ | Signed-in GBP editor; `MATCH`. The public management card displayed an inconsistent “Add website” prompt, so no edit was made. |
| Primary category | Insurance agency | Signed-in GBP editor; `MATCH` |
| Hours | Mon-Fri 9:00 AM-6:00 PM; Sat 9:00 AM-3:00 PM; Sun closed | Signed-in GBP editor and website structured data; `MATCH` |
| Languages | English and Spanish | Signed-in GBP editor and website; `MATCH` |
| Service areas | Florida, Doral, Miami, Hialeah, Kendall, Sweetwater | Signed-in GBP editor and website; `MATCH` |
| WhatsApp | https://wa.me/13059108850 | Signed-in GBP editor; `MATCH` with the published phone |
| Google rating/reviews | 5.0 from 8 reviews at audit time | Signed-in GBP review manager; factual snapshot only, not a website claim |
| Map entity | Existing verified GBP/Google Maps entity | Signed-in GBP; `CONNECTED`. Do not create a duplicate. |

The shorter GBP brand name and the website's Office #3 identifier are not treated as an error. Changing the GBP name would require authoritative real-world signage or business-name evidence; no keyword or location modifier was added.

## GBP services and reviews

- The live profile already listed the major English-language insurance services offered on the website.
- `RV insurance` was the only verified website service absent from GBP. It was added on 2026-08-05 and is `PENDING GOOGLE REVIEW`; Google indicated review may take up to one day. Do not report it as published until rechecked.
- No new category, location, product, citation, or unverified service was created.
- The profile had eight reviews with a 5.0 rating. Three reviews had no owner reply at audit time. No reply was posted because review responses are external communications and require separate approval.
- Never solicit or publish fake reviews. Ask only real customers for honest feedback, without review gating or incentives that violate platform rules.

## Search Console status

| Check | Verified status |
| --- | --- |
| Domain property | `CONNECTED` through signed-in Search Console |
| Sitemap | `https://yourfamilyfirstinsurance3.com/sitemap.xml`; Success; last read 2026-08-04; 20 discovered pages |
| Web search clicks | 0 in the available overview snapshot |
| Page indexing | Processing data; recheck after Search Console finishes collection |
| Core Web Vitals | No field data available yet for mobile or desktop |
| HTTPS | 2 HTTPS pages and 0 non-HTTPS pages in the available report |
| Links | Processing data; no usable export yet |

Search Console does not yet provide enough query or field-performance data for a statistically meaningful opportunity model. Current public search results may be used for qualitative intent and competitor analysis, but not presented as first-party search volume or ranking proof.

## Listing reconciliation

Use `MATCH`, `CORRECTED`, `PENDING PLATFORM REVIEW`, `NEEDS HUMAN LOGIN`, `NOT VERIFIED`, `DUPLICATE TO RESOLVE`, or `NOT APPLICABLE`.

| Service | Access/status | Verified result |
| --- | --- | --- |
| Google Business Profile / Maps | `CONNECTED` | NAP, website, category, hours, languages, service areas, and map entity verified. RV service is `PENDING PLATFORM REVIEW`. |
| Facebook | `CONNECTED` through GBP editor only | Saved profile URL is present in GBP. The destination profile itself was not audited in this pass. |
| Apple Business Connect | `NEEDS HUMAN LOGIN` | No claim about listing completeness. |
| Bing Places | `NEEDS HUMAN LOGIN` | No claim about listing completeness. |
| Yelp | `NEEDS HUMAN LOGIN` | No claim about listing completeness. |
| Instagram | `NEEDS HUMAN LOGIN` | No claim about listing completeness. |
| LinkedIn | `NEEDS HUMAN LOGIN` | No claim about listing completeness. |
| Florida licensing record | `NOT VERIFIED` | Do not publish license numbers or scope until checked against an authoritative record. |
| Franchise and insurance directories | `NOT VERIFIED` | Do not create mass citations or imply franchise/carrier authorization. |

## Website structured-data and entity checks

- The production source contains one canonical `InsuranceAgency` entity with a stable `@id`, verified NAP, hours, languages, map URL, service areas, and service catalog.
- `Service.provider` references must resolve to the same agency `@id`; do not create competing organization entities.
- `sameAs` must contain only verified official profiles. A guessed citation/profile URL is worse than omitting it.
- `content/site-facts.json` is the authoritative safe-content source and now enumerates all 13 currently published insurance service concepts so generated GEO/AI-readable surfaces cannot silently omit verified offerings.
- Continue exposing canonical `llms.txt`, Markdown representations, `/api/site.json`, `/api/status.json`, and sitemap/robots resources, but do not describe their presence as guaranteed inclusion or recommendation by any search or AI system.

## Quality rules

- Do not create duplicate listings, fake locations, thin city pages, doorway pages, or keyword-stuffed business names.
- Keep citation URLs canonical and free of tracking parameters.
- Store access records and screenshots outside the public repository; never commit credentials or customer information.
- Recheck Google approval of the RV service, Search Console indexing/query data, and real field Core Web Vitals before upgrading any pending status.
