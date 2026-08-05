# YFFI3 website-to-revenue attribution contract

Reviewed: 2026-08-05

## Outcome

The supported target design uses an opaque first-party `attribution_id` to join website acquisition data to vendor/agency lifecycle outcomes. It does not place PII, insurance details, raw click identifiers, or raw UTM values in ConsumerRateQuotes URLs, GTM event payloads, GA4 parameters, or QQCatalyst notes.

The runnable local fallback is in `/Users/arielsacc/Desktop/YFFI-Automation/outputs/attribution/`.

## Current connection truth

| Layer | State | Current proof |
| --- | --- | --- |
| Website to GTM/GA4 | `CONNECTED` | Production emits approved interaction events. Release QA must re-verify requests and GA4 reception. |
| ConsumerRateQuotes | `PARTIALLY CONNECTED` | Agency ID `64868` is the approved quote destination. Public application code accepts `ref1` through `ref5`, but no public vendor contract defines persistence, length, export visibility, or acknowledgement behavior. |
| QQCatalyst lifecycle API | `NEEDS OAUTH / API PERMISSION` | QQCatalyst documents OAuth2, agency authorization, contacts/customer sources, policies, billing, and commissions. No API-partner credentials are present. |
| QQCatalyst lifecycle CSV | `CSV FALLBACK READY` | The local attribution package validates and joins exported lifecycle stages. |
| Google Ads offline conversion import | `NEEDS HUMAN LOGIN / ACCOUNT CONFIGURATION` | Google Ads Data Manager conversion actions and consent/match-key configuration must be completed before any upload. |

## First-party record

Create an opaque `attribution_id` at the first eligible website touch and persist:

- first-seen timestamp and landing path;
- English/Spanish page language;
- sanitized `utm_source`, `utm_medium`, `utm_campaign`, `utm_id`, `utm_term`, and `utm_content`;
- categorized referrer and quote-start source/CTA location;
- applicable consent states;
- GA client ID only when analytics storage is allowed;
- GCLID/WBRAID/GBRAID only when collection and ad-user-data processing are allowed.

Advertising click IDs must be encrypted at rest, excluded from logs and analytics payloads, and removed under the approved retention/deletion policy. They remain first-party; the quote vendor receives only the opaque `attribution_id` after the vendor confirms the proposed `ref1` use in writing.

## Lifecycle truth table

| Stage | Evidence required | Measurement action |
| --- | --- | --- |
| `quote_start` | User intentionally opens or submits toward the approved quote experience | GA4 interaction event; not a lead |
| `lead_acknowledged` | Vendor/agency returns a stable source record ID | Eligible for `generate_lead`; dedupe on that ID |
| `quote_created` | A documented quote record exists | Custom lifecycle event/reporting stage |
| `policy_bound` | QQCatalyst policy or binder evidence confirms bound status | Bound-policy event; unique order/event ID |
| `revenue_recognized` | Finance-approved agency revenue/commission value exists | Revenue event/value; never substitute written premium unless finance defines it as revenue |
| `policy_cancelled` | Agency system confirms cancellation | Adjustment/retraction workflow; never silently delete the original event |

## QQCatalyst mapping

Use `CustomerSourceID` for a controlled source such as `Website`, not for raw campaign text. Persist the QQ contact `EntityID` returned by contact creation and the QQ policy ID from policy records/exports. QQCatalyst documents policy billing, premium, commission, and binder endpoints, but the agency must choose and document which finance field is recognized revenue.

The API path is gated by QQCatalyst API-partner registration, OAuth2 credentials, and agency authorization. Credentials remain server-side. Until then, use the local CSV fallback and do not represent the API as connected.

## Production handoff gate

Do not enable the proposed `ref1=attribution_id` handoff until all of the following are true:

1. ConsumerRateQuotes confirms field contract, persistence, export visibility, and a non-production test method.
2. A first-party server-side store exists with encryption, retention, deletion, access control, and idempotent writes.
3. A vendor acknowledgement or agency reconciliation produces a stable lead/contact ID.
4. QQCatalyst OAuth/API permission is approved, or the CSV workflow is tested with a redacted sample export.
5. Google Ads conversion actions, consent terms, Data Manager mapping, and dedupe IDs are approved.
6. A synthetic end-to-end test proves visit to acknowledged lead to outcome without creating a fake production lead.

## Rollback

The production default remains unchanged: no vendor referral parameters are appended. If the later handoff fails validation, disable the feature flag that appends `ref1`; keep the existing quote URL and interaction events. Historical first-party records remain auditable and must be deleted only through the retention workflow.

