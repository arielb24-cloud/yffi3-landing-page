# YFFI3 Local SEO Consistency Checklist

Complete this only after an authoritative business source resolves the `Ste 108` versus `108-109` discrepancy and confirms titles/licensing. Never infer missing values.

## Canonical entity record

| Field | Website currently states | Authoritative value | Verified by/date |
|---|---|---|---|
| Public business name | Your Family First Insurance Office #3 | **PENDING** | **PENDING** |
| Legal business name | Present in repository schema; requires confirmation | **PENDING** | **PENDING** |
| Street/suite | Ste 108 | **BLOCKED: conflicting 108-109 reference** | **PENDING** |
| City/state/postal code | Miami, FL 33134 | **PENDING** | **PENDING** |
| Telephone | 305-910-8850 | **PENDING** | **PENDING** |
| Website | https://yourfamilyfirstinsurance3.com/ | Same canonical apex | **PENDING** |
| Primary category | Insurance agency wording | **PENDING GBP category** | **PENDING** |
| Hours | Not published | **PENDING** | **PENDING** |
| Languages | English and Spanish | **PENDING** | **PENDING** |
| Principal/CEO title | Present in site copy; requires confirmation | **PENDING** | **PENDING** |
| Licensing language/numbers | Do not add without authoritative proof | **PENDING** | **PENDING** |
| Geo coordinates | Not published | **PENDING** | **PENDING** |

## Listing-by-listing reconciliation

Use `MATCH`, `CORRECTED`, `DUPLICATE TO RESOLVE`, `NEEDS HUMAN LOGIN`, or `NOT APPLICABLE`.

| Service | Ownership/access | Name | Address/suite | Phone | Website | Category | Hours | Logo/photos | Duplicate check | Final status/date |
|---|---|---|---|---|---|---|---|---|---|---|
| Google Business Profile | NEEDS HUMAN LOGIN |  |  |  |  |  |  |  |  |  |
| Apple Business Connect | NEEDS HUMAN LOGIN |  |  |  |  |  |  |  |  |  |
| Bing Places | NEEDS HUMAN LOGIN |  |  |  |  |  |  |  |  |  |
| Facebook | NEEDS HUMAN LOGIN |  |  |  |  |  |  |  |  |  |
| Instagram | NEEDS HUMAN LOGIN |  |  |  |  |  |  |  |  |  |
| LinkedIn | NEEDS HUMAN LOGIN |  |  |  |  |  |  |  |  |  |
| Yelp | NEEDS HUMAN LOGIN |  |  |  |  |  |  |  |  |  |
| Florida licensing record | PUBLIC/OWNER VERIFICATION |  |  |  | N/A |  | N/A | N/A |  |  |
| Approved franchise directory | NEEDS HUMAN LOGIN |  |  |  |  |  |  |  |  |  |
| Relevant insurance directories | NEEDS OWNER LIST |  |  |  |  |  |  |  |  |  |

## Website surfaces to compare after approval

- Footer and contact blocks on all English and Spanish pages.
- `InsuranceAgency` JSON-LD and all `Service.provider` references.
- `llms.txt`, Markdown representations, `/api/site.json`, `/api/status.json`, and OpenAPI examples.
- Quote destination account ownership and the approved public review URL.
- Social profiles before adding `sameAs`; never add a guessed profile.
- Logo and real office photography; retain only permissioned assets.
- Reviews: quote only genuine permitted excerpts, preserve meaning, and link to the source when allowed.

## Quality rules

- Do not create duplicate listings or thin city pages.
- Do not keyword-stuff the business name or categories.
- Do not invent hours, coordinates, service areas, licensing, prices, appointments, or carrier relationships.
- Keep core listing URLs canonical and free of tracking parameters.
- Store access records and screenshots outside the public repository; never commit credentials or customer information.
