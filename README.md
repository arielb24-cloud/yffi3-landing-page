# Your Family First Insurance Office #3 Website

Bilingual website for Your Family First Insurance Office #3 in Miami, built as static pages with Cloudflare Pages Functions. Node.js 22 builds the `dist/` output.

## Build

```bash
pnpm install
pnpm run build
pnpm run qa
```

Production output:

```text
dist/
```

The local/CI server is `server.js` and uses `process.env.PORT || 3000`. Cloudflare serves the deployed site directly.

## Pages

- `/`
- `/auto-insurance/`
- `/home-insurance/`
- `/commercial-insurance/`
- `/life-insurance/`
- `/renters-insurance/`
- `/about-office-3/`
- `/get-a-quote/`
- `/privacy-policy/`
- `/terms/`

## Brand and Compliance

- Official franchise logo/sign: `public/assets/yffi3/yffi3-official-franchise-logo.png`
- Real family/office photo: `public/assets/yffi3/yffi3-family-office-photo.jpg`
- Do not redesign, recolor, distort, crop, trace, or replace the official franchise logo/sign.
- Do not use fake AI people, fake reviews, fake awards, guaranteed savings claims, instant approval claims, or unauthorized carrier relationship claims.

## SEO and AI Findability

Generated public files include:

- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `humans.txt`
- Open Graph tags
- Canonical URLs
- InsuranceAgency, Service, FAQPage, and BreadcrumbList JSON-LD where appropriate
- Public Streamable HTTP MCP endpoint and MCP Server Card
- DNS-AID publication and DNSSEC handoff in `docs/dns-aid.md`

## Privacy and Quote Form Status

The public quote page contains no duplicate contact or underwriting form. Its quote buttons and handoff card open the provided secure ConsumerRateQuotes path: `https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868`.

Do not collect SSNs, dates of birth, driver license numbers, VINs, policy numbers, payment details, medical records, claim files, passwords, or carrier credentials through the public static form.

## Cloudflare Pages Deployment

The connected Pages project is `yffi3-landing-page`:

1. Use the connected GitHub repository.
2. Push a feature branch for a noindex preview; production uses `main`.
3. Install command: `pnpm install --frozen-lockfile`.
4. Build command: `pnpm run build`.
5. Pages Functions are discovered in `functions/`; no Node start command is used in production.
6. Output folder: `dist`.

Provide a tested preview and obtain explicit user approval before releasing to production.

Do not commit or upload `node_modules`, `.env`, screenshots, Playwright reports, test results, or ZIP deployment artifacts.
