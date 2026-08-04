# YFFI3 Measurement Dictionary and Secure Integration Specification

## Measurement dictionary

| Metric | System of record | Meaning | Must not be represented as |
|---|---|---|---|
| Cloudflare requests | Cloudflare | Edge HTTP requests, including assets, APIs, bots, retries, and people | Visits or prospects |
| Cloudflare unique visitors | Cloudflare | Approximate unique clients derived by Cloudflare; can include bots and shared devices | A precise count of individual humans |
| GA4 users | GA4 | Browser/device-level measured users under the property's identity and consent settings | Known people or customers |
| GA4 sessions | GA4 | Analytics sessions grouped by GA4 rules | Quotes or leads |
| Page views | GA4 | Measured page-view events | Unique people or qualified visits |
| Lead | CRM/vendor | A validated, successfully acknowledged contact record with required consent | A page view, invalid form, or unconfirmed redirect |
| Qualified lead | CRM | A lead meeting an approved business qualification rule | Any raw inquiry |
| Completed quote | Quoting platform/CRM | A quote workflow completed and recorded by the system of record | `quote_start` |
| Bound policy | Agency management/carrier system | Coverage confirmed as bound under approved office process | A quote or application |
| Revenue | Accounting/commission system | Recognized premium/commission value under the business's accounting definition | Traffic value estimated by analytics |

## Current website event contract

| Event | When it fires | GA4 recommendation | Safe parameters |
|---|---|---|---|
| `phone_click` | Intentional click on `tel:` | Key event | Approved interaction and first-touch fields listed below |
| `sms_click` | Intentional click on `sms:` | Key event | Same |
| `email_click` | Intentional click on `mailto:` | Optional key event | Same |
| `form_submit` | Valid first-step form immediately before the approved handoff | Diagnostic only | Same |
| `quote_start` | Valid form handoff or intentional approved destination click | Secondary funnel event | Same |
| `generate_lead` | Not implemented | Add only after server/vendor acknowledgement | Never infer from a redirect |
| `quote_complete` | Not implemented | Key event only with vendor confirmation | Server-side/offline identifier, no PII in GA4 |
| `policy_bound` | Not implemented | Offline primary business conversion | Imported from system of record |

Approved interaction fields are `page_path`, `page_language`, `product_category`, and `cta_location`. Approved first-touch fields are `landing_page`, `referrer_category`, `traffic_source`, `traffic_medium`, `campaign_name`, and `campaign_content`. Missing campaign values use `(not_set)` so tag mappings stay stable.

The current data layer must never include name, email, phone, ZIP, address, notes, insurance answers, policy data, VIN, date of birth, health information, license information, form contents, raw referrer URLs, full query strings, or advertising click identifiers.

## Campaign attribution posture

The public form redirects to ConsumerRateQuotes and does not receive a success response. It does not have an approved server-side destination for attribution. The website captures a sanitized first-touch subset of `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content` in browser `sessionStorage` for the current tab session and passes those non-PII values to its data layer. It does not retain raw queries, raw referrers, click IDs, or submitted data, and it does not append attribution values to the vendor URL. `page_path` and `landing_page` contain canonical paths without query strings.

When an approved server-side integration exists, forward only these non-PII attribution fields after validation:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- canonical landing-page path without query values
- referrer category such as `direct`, `search`, `social`, `partner`, or `other`
- permitted Google/Microsoft click ID only when the vendor, consent policy, and advertising account explicitly support it

Reject any campaign value containing an email address, phone number, street address, policy/customer identifier, encoded PII, or free-form form content. Establish an approved campaign naming convention before collection. Do not copy query strings into logs or analytics.

## Required vendor capability

The approved CRM or quoting platform must provide:

- A server-side HTTPS API, signed webhook, or OAuth flow.
- A deterministic success acknowledgement and stable non-PII record ID.
- Idempotency support or a documented deduplication key.
- Consent fields and source timestamps.
- Lead status updates or export/webhook for qualified, quoted, bound, lost, and invalid states.
- Test/sandbox capability or vendor-approved synthetic records.
- Deletion, retention, audit, and least-privilege controls.
- Offline conversion export using an allowed identifier and Google-supported privacy controls.

## Required credentials and security controls

- Store OAuth client secrets, API keys, webhook secrets, and refresh tokens only in Cloudflare encrypted secrets or an approved server-side secret manager.
- Never place credentials in HTML, JavaScript, source control, build artifacts, logs, screenshots, or analytics.
- Use least-privilege service accounts, rotation, access logging, and separate test/production credentials.
- Restrict CORS/origins, validate `Content-Type`, enforce payload limits, rate limit abusive endpoints, and use bot/spam controls.
- Encrypt data in transit and rely on approved vendor encryption at rest.
- Log only request IDs, outcome codes, durations, and non-PII error categories.

## Proposed data fields

PII belongs only in the approved secure lead system: name, email, phone, ZIP, insurance category, preferred contact time, and screened general notes. Keep sensitive underwriting information out of this first-step form. Separately store non-PII campaign fields, page language, landing path, consent text version, consent timestamp, and lead-source category.

## Consent and retention

- Display the exact approved contact/marketing consent near submission; separate service-request consent from marketing SMS/email consent where required.
- Record text version, timestamp, source, and language with the CRM record.
- Define retention by lead state and legal/business need; automate deletion or anonymization when the period ends.
- Ensure vendors' contracts and subprocessors match the approved privacy policy.

## Deduplication and spam handling

- Use vendor idempotency keys for retries.
- Deduplicate by the approved CRM's protected matching logic, not in GA4.
- Keep the existing honeypot and field validation; add server-side schema validation and rate limits.
- Treat honeypot hits, invalid payloads, and rejected vendor responses as non-leads.
- Never emit `generate_lead` for spam, validation failure, timeout, or unknown response.

## Error handling and status mapping

| Integration result | User experience | Analytics/CRM state |
|---|---|---|
| Validation failure | Inline, localized correction | No form or lead event |
| Spam/honeypot | Neutral acknowledgement | Rejected/spam; no analytics conversion |
| Vendor success | Localized success or approved secure continuation | Create lead once; eligible for `generate_lead` |
| Vendor timeout/5xx | Do not claim success; show call fallback and retry guidance | `delivery_error`; no lead event |
| Duplicate acknowledged | Show safe success without creating another record | Existing lead ID; no duplicate event |
| Qualified | No public PII | CRM status `qualified` |
| Quote completed | No client-side inference | Vendor/CRM status `quoted` |
| Bound | No client-side inference | System-of-record status `bound` |

## Testing procedure

1. Obtain written vendor permission and synthetic test identities.
2. Test validation, consent, honeypot, rate limit, timeout, malformed response, duplicate retry, and vendor rejection in staging.
3. Prove no PII appears in URL, `dataLayer`, browser console, Cloudflare logs, GA4 DebugView, or source maps.
4. Prove one acknowledged test record creates at most one lead and one allowed conversion.
5. Reconcile CRM status changes through quote and bound stages.
6. Test deletion/retention and revoke the test credentials.
7. Publish behind a reversible feature flag and monitor errors and duplicates.

## Offline conversion import

Export only approved conversion name, conversion time, value/currency when truthful, and a Google-supported identifier collected with proper disclosure and consent. Upload `qualified_lead`, `quote_complete`, `policy_bound`, and recognized revenue as separate lifecycle stages. Never import raw insurance answers. Use transaction/order IDs for deduplication and document the attribution window.
