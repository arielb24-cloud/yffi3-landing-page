# Security Notes

## Static Site Scope

This website builds static HTML, CSS, and JavaScript into `dist/`, then serves it through `server.js` for GoDaddy Beta Apps Node.js 22. It should not contain private credentials, API keys, SMTP details, CRM tokens, webhook secrets, or private admin URLs.

## Quote Form

The quote form is a privacy-safe first-step UI. It validates required basic contact fields, then opens the provided secure ConsumerRateQuotes path: `https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868`.

Do not collect or request:

- Social Security numbers
- Dates of birth
- Driver license numbers
- VINs
- Policy numbers
- Payment cards or bank details
- Medical records
- Claim files
- Passwords or carrier login credentials

## Deployment Hygiene

Deploy through GoDaddy Beta Apps from GitHub. Do not commit or upload `.env`, `node_modules`, screenshots, Playwright reports, test results, or ZIP deployment artifacts.

## Headers

The Node production server sets baseline browser security headers before serving `dist/`. The generated `.htaccess` remains only as a fallback artifact for Apache-style static hosting.

## Reporting Issues

Before publishing, manually confirm the phone number, address, franchise branding approval, privacy policy, and terms. ConsumerRateQuotes account ID `64868` was owner-confirmed as the Office #3 lead route; test one live inquiry after publishing.
