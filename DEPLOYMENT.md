# GoDaddy Beta Apps Deployment Guide

This repo is prepared for the GoDaddy Beta Apps Node.js 22 flow shown as the `github-import` app.

## Required GoDaddy Settings

- Runtime: Node.js 22
- Source: GitHub Repository
- Branch: `main`
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm run build`
- Start command: `pnpm start`
- Output folder: `dist`
- Port: use GoDaddy's assigned `PORT`; local fallback is `3000`

## Local Build Command

```bash
pnpm run build
```

The production output folder is:

```text
dist/
```

## GoDaddy Beta Apps Steps

1. Push this committed repo to GitHub on the selected branch.
2. In GoDaddy Beta Apps, open the `github-import` Node.js 22 app.
3. Change Source from Folder Upload to GitHub Repository using `Configure GitHub Repository`.
4. Select the GitHub repo and branch `main`.
5. Set the install, build, start, and output folder fields exactly as shown above.
6. Use Preview first. Confirm the preview loads, then use Publish to Live.
7. Test desktop and mobile:
    - Official logo/sign is visible and not stretched.
    - Family/office photo is the real Office #3 photo.
    - Phone links call `305-910-8850`.
    - `Get My Free Quote` opens the connected quote path.
    - Quote form validates required fields and opens `https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868`.
    - Footer links, `robots.txt`, `sitemap.xml`, `llms.txt`, and `humans.txt` open.

## Production Server

`server.js` serves the built `dist/` folder using Express:

- `process.env.PORT || 3000`
- static routes for every generated page folder
- `/healthz` health check
- baseline browser security headers
- no `.env` secrets required

## Manual Confirmation Before Publishing

- Confirm the listed address is still correct: 11200 W Flagler St #108-109, Miami, FL 33174.
- Confirm `305-910-8850` is the correct public office number and SMS use is approved.
- Confirm the QR code is approved for this office before relying on it.
- ConsumerRateQuotes account ID `64868` was owner-confirmed as the Office #3 lead route; test one live inquiry after publishing.
- Confirm franchise/business approval before adding carrier names, reviews, discounts, awards, or testimonials.
