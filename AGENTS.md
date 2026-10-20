# Agent Rules for YFFI Office #3 Website

This project is a Cloudflare Pages static website for Your Family First Insurance Office #3, with Pages Functions for public metadata and response handling. `server.js` serves `dist/` for local development and CI; it is not the deployed Pages runtime.

## Brand and Contract Rules

- Do not alter the official franchise logo/sign.
- Do not recolor, distort, crop, trace, rewrite, redesign, or replace the official franchise logo/sign.
- Do not create a competing "modern YFFI3" logo.
- Use the official logo/sign only from `public/assets/yffi3/yffi3-official-franchise-logo.png` or the copied production path.
- Do not replace the real family/office photo with AI-generated people, stock people, or fake customer imagery.

## Insurance Copy Rules

- Do not create fake insurance claims.
- Do not claim guaranteed cheapest pricing, guaranteed savings, instant approval, guaranteed approval, fake awards, fake ratings, fake reviews, or unauthorized carrier relationships.
- Do not imply carrier partnerships unless written approval and approved copy are provided.
- Use safe insurance wording: "quote help," "compare options," "coverage conversations," and "availability varies."
- Preserve the disclaimer that coverage options, availability, pricing, and eligibility vary by carrier, underwriting, location, and applicant information.

## Form and Privacy Rules

- Do not collect sensitive underwriting info in the public static form.
- Do not ask for SSN, DOB, driver license number, VIN, policy number, payment information, medical records, claim files, passwords, or carrier login credentials.
- Do not expose recipient emails, SMTP credentials, API keys, tokens, webhooks, or private URLs in frontend code.
- The public quote page contains no duplicate contact or underwriting fields and opens `https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868`; the owner confirmed account ID `64868` belongs to Office #3 and routes leads correctly.

## Design and Build Rules

- Preserve mobile-first design.
- Keep the official logo aspect ratio intact with `object-fit: contain`.
- Use real crawlable links and semantic HTML.
- Run `pnpm run build` before finalizing.
- Run `pnpm run qa` after visual or accessibility-sensitive changes when practical.
- Cloudflare Pages uses Node.js 22, `pnpm install --frozen-lockfile`, `pnpm run build`, and output folder `dist`. Production branch is `main`; feature branches produce noindex previews.
- Give the user a tested preview and obtain explicit approval before releasing to production.
- Do not commit `.env`, `node_modules`, screenshots, Playwright reports, test results, or ZIP deployment artifacts.
