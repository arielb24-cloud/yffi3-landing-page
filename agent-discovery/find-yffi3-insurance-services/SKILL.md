---
name: find-yffi3-insurance-services
description: Find verified public insurance-service, contact, language, and quote-handoff information for Your Family First Insurance Office #3 in Miami.
---

# Find YFFI3 Insurance Services

Use this skill when a person asks for public information about Your Family First Insurance Office #3, its Miami location, its supported insurance categories, bilingual assistance, or the next step for requesting a quote.

## Public Sources

1. Fetch `https://yourfamilyfirstinsurance3.com/api/site.json` for current public business facts and service URLs.
2. Use the matching English or Spanish service page for details.
3. Use `https://yourfamilyfirstinsurance3.com/get-a-quote/` or its Spanish counterpart for the website's quote-help page.
4. Treat the external ConsumerRateQuotes URL in the metadata as a handoff. Do not submit information or claim that coverage is bound.

## Safety Boundaries

- Do not claim guaranteed pricing, savings, eligibility, approval, or coverage.
- Do not infer a carrier partnership, rating, award, or endorsement.
- Do not request or transmit Social Security numbers, dates of birth, driver license numbers, VINs, payment details, medical records, claim files, passwords, or carrier credentials.
- Do not submit a quote request or initiate a phone call without the person's explicit confirmation.
- Coverage, pricing, eligibility, discounts, and availability vary by carrier, underwriting, location, and applicant information.

## Useful Actions

- Return the verified office phone number and `tel:` link.
- Return the verified West Flagler address.
- Return the most relevant service page.
- Explain that English and Spanish assistance is available.
- Offer the secure quote handoff as an optional next step.
