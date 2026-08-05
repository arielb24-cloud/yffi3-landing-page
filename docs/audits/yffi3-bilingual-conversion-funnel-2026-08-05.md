# YFFI3 bilingual conversion-funnel audit — 2026-08-05

Production domain: `https://yourfamilyfirstinsurance3.com`

Status vocabulary: `CONNECTED`, `PARTIALLY CONNECTED`, `NEEDS HUMAN LOGIN`, `NEEDS OAUTH / API PERMISSION`, `CSV FALLBACK READY`, or `BLOCKED`.

## Outcome

The public English and Spanish funnels provide valid call, SMS, and secure quote handoffs without collecting sensitive application data in the static website. GTM version 7 closes the verified SMS measurement gap. A website redirect remains a `quote_start`, not a completed lead, quote, bound policy, or revenue event.

## Verified production paths

| Surface | English desktop | Spanish desktop | Analytics status | Result |
| --- | --- | --- | --- | --- |
| Primary navigation and language switch | PASS | PASS | `language_switch` configured in GTM | Correct reciprocal locale paths and no horizontal overflow at the tested desktop viewport |
| Call | `tel:13059108850` | `tel:13059108850` | `phone_click` received in GA4 Realtime | `CONNECTED` |
| SMS | `sms:+13059108850` | `sms:+13059108850` | `sms_click` fired in Tag Assistant and increased in clean-production GA4 Realtime after GTM v7 | `CONNECTED` |
| Quote CTA | ConsumerRateQuotes Office #3 URL | Same destination | `quote_start` fired in Tag Assistant and appeared in GA4 Realtime | `CONNECTED` for outbound intent only |
| Empty first-step form | Native required-field validation and status message | Localized validation and status message | No lead event | PASS |
| Sensitive-data guard | SSN-like note blocked before navigation | Same guard with Spanish status message | No lead event and no submitted values in `dataLayer` | PASS |
| Valid safe handoff | Opens `https://secure.consumerratequotes.com/ConsumerV2?id=64868` | Same destination | `quote_start`; no `generate_lead` | PASS WITH VENDOR LIMITATION |
| Email | No public `mailto:` CTA exists | No public `mailto:` CTA exists | Runtime supports `email_click`, but there is no verified public Office #3 inbox | `BLOCKED / NEEDS OWNER CONFIRMATION` |

## Desktop and mobile evidence

- English and Spanish desktop home pages had `clientWidth === scrollWidth === 1200`; no horizontal overflow was measured.
- Desktop form validation clearly surfaced the error state and moved focus to the first invalid field.
- The existing same-run 390×844 comparison shows the form remains single-column and the CTA, FAQ, QR, and footer regions do not overlap. The current browser connector did not expose viewport emulation, so no new mobile interaction run is claimed.
- The only current bilingual content defect found was the English conjunction `or` between the Spanish call and text links. The generator source now renders `o`; production verification remains required after release.

## GA4/GTM truth table

| Event | Site emits | GTM v7 accepts | Tag Assistant | GA4 Realtime | Business meaning |
| --- | ---: | ---: | ---: | ---: | --- |
| `page_view` | Google tag | Yes | Yes | Yes | Page exposure |
| `cta_click` | Yes | Yes | Configured | Not separately exercised in this pass | Generic CTA intent |
| `phone_click` | Yes | Yes | Previously verified | Yes | Call intent, not a connected call |
| `sms_click` | Yes | Yes as of v7 | Yes | Yes; clean production count increased | SMS intent, not a sent message |
| `quote_start` | Yes after valid handoff | Yes | Yes | Yes | Outbound quote-path start, not a completed lead |
| `form_submit` | Diagnostic | Yes | Configured | Not treated as a lead | Form diagnostic only |
| `language_switch` | Yes | Yes | Configured | Not separately exercised in this pass | Locale preference intent |
| `generate_lead` | No | No | No | No | Must wait for a vendor/CRM success acknowledgement |

`GA4 – YFFI Marketing Intent Events` is the GTM tag name, not a literal GA4 event named `marketing_intent`. The tag forwards the actual event name with `{{Event}}`.

## Remaining attribution boundary

Traffic parameters can be joined locally by the first-party `attribution_id`, but the production quote vendor has not yet supplied a confirmed persistence/callback/export contract. QQCatalyst activation remains `NEEDS OAUTH / API PERMISSION`; the local reconciliation package is `CSV FALLBACK READY`. Never place raw GCLID, UTMs, contact details, or sensitive insurance data in the vendor reference fields without a written vendor contract and privacy approval.

## Rollback

- GTM: republish version 6 to remove only the `sms_click` trigger addition.
- Website: revert the Spanish conjunction localization pair and regenerate.
- Quote handoff: retain the current ConsumerRateQuotes URL until a supported acknowledgement path is approved and tested.
