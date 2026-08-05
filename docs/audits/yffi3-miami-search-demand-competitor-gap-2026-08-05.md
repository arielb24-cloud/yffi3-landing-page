# YFFI3 Miami search-demand and competitor-gap audit

Audit date: 2026-08-05 (America/New_York)

## Evidence boundary

- Search Console is connected, but its current overview reports 0 web-search clicks and its query, link, page-indexing, and Core Web Vitals data are still processing or unavailable.
- The submitted sitemap is successful and reports 20 discovered pages.
- Current public search results were sampled for English and Spanish Miami agency, auto, homeowners, commercial/workers compensation, and RV intents.
- This is a qualitative intent/competition audit, not a keyword-volume forecast. No traffic, position, or conversion volume is inferred from the public results.

## Current public-index state

Public search can already retrieve the domain's home, auto, homeowners, commercial, and life pages. The retrieved home result still reflected an older crawl with the former `Ste 108` copy and older on-page claims. The repository now uses the GBP-verified `Suite 108-109` address and safer `Multiple Carrier Options` / `Owner-Led Local Office` language. A recrawl is required before search snippets can reflect those corrections.

## Qualitative query and page map

| Intent sampled | Current YFFI3 asset | Current result pattern | Realistic action now |
| --- | --- | --- | --- |
| Miami insurance agency | English and Spanish home pages | Local agencies emphasize Miami location, bilingual service, clear coverage categories, phone/quote actions, and long-standing local identity | Keep one strong home page per language. Refine the H1 to name Miami, preserve verified NAP/GBP entity signals, and avoid generic statewide-first positioning. |
| Auto insurance Miami / seguro de auto Miami | `/auto-insurance/` and `/es/seguro-de-auto/` | Dedicated local pages commonly lead with exact service/city intent and bilingual quote access; some competitors rely on aggressive unsupported price/speed claims | Existing pages already provide more than 1,100 visible words, clear H1/title, coverage questions, bilingual pairing, and privacy-safe next steps. Improve/index these pages; do not copy price guarantees or create another auto page. |
| Homeowners insurance Miami / seguro de vivienda Miami | `/home-insurance/` and `/es/seguro-de-vivienda/` | Competitive pages discuss wind, hurricane, flood separation, roof/inspection considerations, lender needs, and Florida market context | Existing paired pages already cover lender, flood, roof, inspection, and eligibility questions with disclaimers. Improve/index them before considering condo/flood expansion. |
| Commercial insurance Miami / workers compensation Miami | `/commercial-insurance/` and `/es/seguro-comercial/` | Strong pages separate general liability, commercial property/auto, workers compensation, contracts, payroll, and certificates | Existing paired pages already cover those sub-intents and use anchors/FAQ schema. Keep one substantive commercial hub until Search Console proves a subtopic deserves a standalone page. |
| Renters insurance Miami | `/renters-insurance/` and `/es/seguro-de-inquilinos/` | Dedicated local results are thinner and often carrier-led | Existing paired pages exceed 1,000 visible words and are the appropriate assets. Prioritize indexing and internal links, not a new page. |
| Life insurance Miami | `/life-insurance/` and `/es/seguro-de-vida/` | Local and national providers compete on family planning, term/permanent/final expense, bilingual help, and consultation | Existing paired pages cover the intent without approval or price promises. Prioritize indexing and conversion measurement. |
| RV insurance Miami | Home-page service section and quote route; no dedicated page | Search results include Florida RV specialists and a Miami agency page | Keep RV on the substantive home/service catalog and verified GBP service for now. A new page is not justified until impressions, customer questions, or lead data prove demand. |

## Verified strengths to preserve

- Unique English/Spanish URLs with self-canonical and reciprocal `hreflang` pairs.
- Dedicated auto, homeowners, commercial, renters, and life pages in both languages.
- One H1 per audited page, descriptive local titles, substantial visible copy, original service guidance, and FAQ content.
- Stable `InsuranceAgency` entity with one provider `@id`, verified NAP, hours, language, map, service area, and service catalog.
- Clear call, quote, text, and bilingual navigation paths without price, savings, eligibility, approval, award, or review fabrication.

## Verified gaps and changes

1. **Home-page H1 locality:** both home-page H1s led with Florida while the title, entity, GBP, body, and highest-priority query family are Miami-specific. The source H1s are now `Miami Insurance Made Simple for Your Family` and `Seguros en Miami más sencillos para su familia`. This is a content-only change and must pass matching desktop/mobile screenshot comparison before deployment.
2. **Authoritative service facts:** the safe source-of-truth file listed six insurance types while public structured data listed 13. The fact file and schema now align to the 13 already-published service concepts; this does not create new claims.
3. **Search recrawl lag:** the public home result still exposes older address/claim text. Deploy the corrected source first, then request/rely on normal recrawl. Do not manipulate snippets with fake freshness or repeated submissions.
4. **Measurement scarcity:** Search Console has no usable query performance yet. Do not create new landing pages, doorway pages, or mass content until impressions, customer questions, or attributed leads establish demand.

## Competitive gaps that require evidence before implementation

- Condo insurance and standalone flood insurance appear as meaningful Miami subtopics, but YFFI3 does not yet have first-party query/lead evidence sufficient to justify separate pages.
- Long-tenure, carrier-count, savings, speed, rating, and license claims are common competitor trust devices. YFFI3 must not add them unless documentary evidence supports the exact wording and the website is approved to publish it.
- Broader citation and backlink coverage may be valuable, but only verified listings, real community relationships, and editorially earned links are acceptable. No mass directory blasts or paid link schemes.

## Recheck trigger

Repeat the query/page analysis when Search Console exposes at least 28 days of impressions and page/query pairs, or sooner if attributed quote starts identify a service with meaningful demand. Rank opportunities by qualified quote starts and bound/revenue outcomes, not impressions alone.
