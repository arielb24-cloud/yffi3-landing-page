# Your Family First Insurance Office #3 Website

Premium website for Your Family First Insurance Office #3 in Miami, built for GoDaddy Beta Apps as a Node.js 22 app serving the production `dist/` folder.

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

The production server is `server.js` and uses `process.env.PORT || 3000`.

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

## Privacy and Quote Form Status

The quote form validates required basic contact fields, then opens the provided secure ConsumerRateQuotes path: `https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868`.

Do not collect SSNs, dates of birth, driver license numbers, VINs, policy numbers, payment details, medical records, claim files, passwords, or carrier credentials through the public static form.

## GoDaddy Beta Apps Deployment

Use the GoDaddy Beta Apps `github-import` Node.js 22 app flow:

1. Configure GitHub Repository.
2. Select branch `main`.
3. Install command: `pnpm install --frozen-lockfile`.
4. Build command: `pnpm run build`.
5. Start command: `pnpm start`.
6. Output folder: `dist`.

Do not commit or upload `node_modules`, `.env`, screenshots, Playwright reports, test results, or ZIP deployment artifacts.
