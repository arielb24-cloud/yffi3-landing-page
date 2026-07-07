# Carousel Media Credits

This inventory is generated from the production carousel manifest in `src/data/carouselMedia.js`.

Rules for future replacements:
- Do not hotlink external videos or images in production.
- Keep all carousel assets local, optimized, and unique.
- Do not repeat any `src`, `fallbackMp4`, or `poster` path across the manifest.
- Keep page media specific to the page topic.
- Run `pnpm run build` after changes; the build runs `scripts/validate-carousel-assets.mjs`.

| Page | Slide | Media files | Source / URL | License note | Notes |
|---|---|---|---|---|---|
| Home | home-auto | `/media/insurance-slides/auto-miami-drive.webm`, `/media/insurance-slides/posters/auto-miami-drive-poster.jpg` | YFFI3 optimized local motion media, `local:/public/media/insurance-slides/` | Locally hosted optimized carousel media. | Homepage auto overview only; not reused on auto service page. |
| Home | home-homeowners | `/media/insurance-slides/home-miami-sunlight.webm`, `/media/insurance-slides/posters/home-miami-sunlight-poster.jpg` | YFFI3 optimized local motion media, `local:/public/media/insurance-slides/` | Locally hosted optimized carousel media. | Homepage homeowners overview only; dedicated page uses separate service media. |
| Home | home-renters | `/media/insurance-slides/renters-apartment-keys.webm`, `/media/insurance-slides/posters/renters-apartment-keys-poster.jpg` | YFFI3 optimized local motion media, `local:/public/media/insurance-slides/` | Locally hosted optimized carousel media. | Homepage renters overview only; dedicated page uses separate service media. |
| Home | home-business | `/media/insurance-slides/business-storefront-open.webm`, `/media/insurance-slides/posters/business-storefront-open-poster.jpg` | YFFI3 optimized local motion media, `local:/public/media/insurance-slides/` | Locally hosted optimized carousel media. | Homepage business overview only; dedicated page uses separate service media. |
| Home | home-liability | `/media/insurance-slides/liability-contractor-checklist.webm`, `/media/insurance-slides/posters/liability-contractor-checklist-poster.jpg` | YFFI3 optimized local motion media, `local:/public/media/insurance-slides/` | Locally hosted optimized carousel media. | Homepage general-liability overview only; not reused on commercial service carousel. |
| Home | home-life | `/media/insurance-slides/family-protection-planning.webm`, `/media/insurance-slides/posters/family-protection-planning-poster.jpg` | YFFI3 optimized local motion media, `local:/public/media/insurance-slides/` | Locally hosted optimized carousel media. | Homepage life overview only; dedicated page uses separate service media. |
| Home | home-bilingual | `/media/insurance-slides/bilingual-agent-consult.webm`, `/media/insurance-slides/posters/bilingual-agent-consult-poster.jpg` | YFFI3 optimized local motion media, `local:/public/media/insurance-slides/` | Locally hosted optimized carousel media. | Local/bilingual service signal; no fake review or carrier claim. |
| Auto Insurance | auto-drive | `/assets/yffi3/service-auto-motion.webm`, `/media/insurance-slides/auto-palm-street-drive.mp4`, `/assets/yffi3/service-auto-slide-1.jpg` | Pexels Videos reference search: `https://www.pexels.com/search/videos/car%20driving%20palm%20trees/` | Pexels-style local compressed download retained in the repo; verify exact original source URL if replacing this clip. | Dedicated auto page lead motion; avoids old car-key still. |
| Auto Insurance | auto-renewal | `/assets/yffi3/service-auto-slide-4.jpg`, `/assets/yffi3/service-auto-slide-4-poster.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Still-image-to-motion slide using CSS pan/depth. |
| Auto Insurance | auto-family-drivers | `/assets/yffi3/service-auto-slide-3.webp`, `/assets/yffi3/service-auto-slide-3.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Auto-specific household driver support slide. |
| Homeowners Insurance | homeowners-exterior | `/assets/yffi3/service-homeowners-motion.webm`, `/assets/yffi3/service-homeowners-slide-1.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Dedicated homeowners lead motion; homepage uses a different clip. |
| Homeowners Insurance | homeowners-closing | `/assets/yffi3/service-homeowners-slide-2.webp`, `/assets/yffi3/service-homeowners-slide-2.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Closing/lender-focused homeowners support slide. |
| Homeowners Insurance | homeowners-renewal | `/assets/yffi3/service-homeowners-slide-3.webp`, `/assets/yffi3/service-homeowners-slide-3.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Renewal/roof/wind-focused homeowners support slide. |
| Renters Insurance | renters-apartment | `/assets/yffi3/service-renters-motion.webm`, `/assets/yffi3/service-renters-slide-1.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Dedicated renters lead motion; homepage uses a different clip. |
| Renters Insurance | renters-lease | `/assets/yffi3/service-renters-slide-2.webp`, `/assets/yffi3/service-renters-slide-2.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Lease/proof-focused renters support slide. |
| Renters Insurance | renters-belongings | `/assets/yffi3/service-renters-slide-3.webp`, `/assets/yffi3/service-renters-slide-3.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Belongings/liability-focused renters support slide. |
| Commercial Insurance | commercial-storefront | `/assets/yffi3/service-commercial-motion.webm`, `/assets/yffi3/service-commercial-slide-1.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Dedicated commercial page lead motion; homepage uses a different clip. |
| Commercial Insurance | commercial-office | `/assets/yffi3/service-commercial-slide-2.webp`, `/assets/yffi3/service-commercial-slide-2.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Operations/contracts-focused business support slide. |
| Commercial Insurance | commercial-certificates | `/assets/yffi3/service-commercial-slide-3.webp`, `/assets/yffi3/service-commercial-slide-3.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Certificate/liability-focused commercial support slide. |
| Life Insurance | life-family | `/assets/yffi3/service-life-motion.webm`, `/assets/yffi3/service-life-slide-1.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Dedicated life page lead motion; homepage uses a different clip. |
| Life Insurance | life-term | `/assets/yffi3/service-life-slide-2.webp`, `/assets/yffi3/service-life-slide-2.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Term-life-focused support slide. |
| Life Insurance | life-final-expense | `/assets/yffi3/service-life-slide-3.webp`, `/assets/yffi3/service-life-slide-3.jpg` | YFFI3 approved local media pack, `local:/public/assets/yffi3/` | Owner-provided or project-approved local asset for Office #3 website use. | Final-expense/family-planning support slide. |

## Premium Asset Gaps

The current build is valid and publishable, but the next best upgrade is to replace the local service-page motion loops with verified exact-source short videos from Pexels, Coverr, or Mixkit:
- Auto: luxury car driving city or palm-lined road, no visible brand logos.
- Homeowners: luxury Florida home exterior or slow front-door/drone motion.
- Renters: modern apartment walkthrough, keys, moving boxes, or cozy interior motion.
- Commercial: small business storefront opening, restaurant owner, office team, or contractor prep.
- Life: warm family planning, parents with children, calm future-focused home moment.

Target final videos: 5-8 seconds, muted, loopable, no watermark, 1280x720 or similar, under roughly 2 MB when possible.
