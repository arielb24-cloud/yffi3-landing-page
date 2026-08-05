# YFFI3 production performance baseline

Measurement date: 2026-08-05 (America/New_York)

## Field data: Cloudflare Web Analytics

Connected site: `yourfamilyfirstinsurance3.com`

Window: last 24 hours, EDT, bots excluded.

| Metric | Current production measurement |
| --- | --- |
| Visits | 36 |
| Page views | 46 |
| Page load time | 951 ms |
| LCP good / needs improvement / poor | 88% / 4% / 8% |
| LCP P50 | 478 ms |
| LCP P75 | 889 ms |
| LCP P90 | 3,992 ms |
| LCP P99 | 19,720 ms |
| INP good / needs improvement / poor | 100% / 0% / 0% |
| CLS good / needs improvement / poor | 100% / 0% / 0% |

Cloudflare's element debug tables reported no usable rows for LCP, INP, or CLS in this low-volume window. The poor LCP tail is real field evidence, but the available sample does not identify a repeatable URL or element cause.

## Lab context

The most recent local desktop homepage Lighthouse rechecks scored 90 and 92 for performance, 100 for accessibility, and 100 for SEO, with LCP 1.785-1.873 seconds and total blocking time 8-11.5 ms. One run recorded CLS 0.104 and the other 0. The lower Best Practices score in those artifacts came from an external Google Ads/CSP diagnostic in that historical local run, not from a current Tag Assistant connection failure.

Lab data is used only as a regression aid. It is not presented as production field data.

## Decision

- Preserve the current design, carousel, fonts, and animation because production P75 LCP is 889 ms and INP/CLS are 100% good in the available RUM window.
- Do not degrade imagery or remove visible motion based on the small unexplained LCP tail.
- Correct the verified build-system regression that could overwrite the committed Save-Data, reduced-motion, form-safety, and runtime improvements. This is a prevention change, not a claim that the production P75 improved.
- Recheck the 28-day RUM window after traffic grows. Optimize a specific image, font, route, or script only when URL/element breakdown or repeatable lab reproduction identifies it.

## Deployment comparison

Before a material performance deployment, record the same RUM window and representative lab viewports. After deployment, compare P75 LCP, INP, CLS, page load time, screenshot layout, and funnel behavior. Roll back if field/lab metrics or visual behavior regress outside normal variance.
