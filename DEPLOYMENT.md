# Cloudflare Pages Deployment Guide

The connected Cloudflare Pages project is yffi3-landing-page. Production uses the main branch of the GitHub repository; feature branches produce previews.

## Build and runtime

- Node.js 22 builds the site.
- Install: pnpm install --frozen-lockfile
- Build: pnpm run build
- Output: dist
- Cloudflare serves static assets and discovers the Pages Functions in functions/.
- server.js is for local development and CI, not the deployed Pages runtime.

## Preview before production

1. Commit and push the feature branch to create a preview.
2. Verify all localized routes, metadata, quote/contact links, keyboard controls, mobile layouts, review expansion and video autoplay/pause behavior.
3. Check preview noindex protection and absence of production analytics unless explicitly debugging tags.
4. Give the user the preview URL. Obtain explicit approval before merging/releasing to main.
5. After an approved release, verify the custom domain, HTTPS redirects, crawl eligibility, assets, quote routing and production-only measurement behavior.

Preserve official franchise identification, original office/family photography and approved footage. Never commit credentials or client data. ConsumerRateQuotes account 64868 was owner-confirmed as the Office #3 lead route; do not submit a real inquiry or contact a customer without authorization for that action.
