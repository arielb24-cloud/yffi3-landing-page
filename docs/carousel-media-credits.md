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
| Auto Insurance | auto-drive | `/media/carousel/auto/auto-city-highway.mp4`, `/media/carousel/auto/auto-city-highway-poster.png` | Pexels Videos, `https://www.pexels.com/video/30254179/` | Pexels License; locally compressed and hosted. | Premium car-detail motion; replaces old static auto media. |
| Auto Insurance | auto-renewal | `/media/carousel/auto/auto-road-closeup.mp4`, `/media/carousel/auto/auto-road-closeup-poster.png` | Pexels Videos, `https://www.pexels.com/video/5927764/` | Pexels License; locally compressed and hosted. | Moving road footage for auto renewal conversations. |
| Auto Insurance | auto-family-drivers | `/media/carousel/auto/auto-road-dashboard.mp4`, `/media/carousel/auto/auto-road-dashboard-poster.png` | Pexels Videos, `https://www.pexels.com/video/4565727/` | Pexels License; locally compressed and hosted. | Driver-view motion for household driver quote help. |
| Homeowners Insurance | homeowners-exterior | `/media/carousel/homeowners/home-drone-exterior.mp4`, `/media/carousel/homeowners/home-drone-exterior-poster.png` | Pexels Videos, `https://www.pexels.com/video/17224715/` | Pexels License; locally compressed and hosted. | Modern home exterior motion for homeowners quote help. |
| Homeowners Insurance | homeowners-closing | `/media/carousel/homeowners/home-luxury-walkthrough.mp4`, `/media/carousel/homeowners/home-luxury-walkthrough-poster.png` | Pexels Videos, `https://www.pexels.com/video/7578541/` | Pexels License; locally compressed and hosted. | Luxury home exterior/walkthrough motion for closing timing. |
| Homeowners Insurance | homeowners-renewal | `/media/carousel/homeowners/home-neighborhood-aerial.mp4`, `/media/carousel/homeowners/home-neighborhood-aerial-poster.png` | Pexels Videos, `https://www.pexels.com/video/3769952/` | Pexels License; locally compressed and hosted. | Warm home interior motion for renewal questions. |
| Renters Insurance | renters-apartment | `/media/carousel/renters/renters-modern-apartment.mp4`, `/media/carousel/renters/renters-modern-apartment-poster.png` | Pexels Videos, `https://www.pexels.com/video/7533207/` | Pexels License; locally compressed and hosted. | Bright apartment motion for renters quote help. |
| Renters Insurance | renters-lease | `/media/carousel/renters/renters-apartment-keys.mp4`, `/media/carousel/renters/renters-apartment-keys-poster.png` | Pexels Videos, `https://www.pexels.com/video/8320971/` | Pexels License; locally compressed and hosted. | Moving key-handoff scene for lease requirements. |
| Renters Insurance | renters-belongings | `/media/carousel/renters/renters-city-interior.mp4`, `/media/carousel/renters/renters-city-interior-poster.png` | Pexels Videos, `https://www.pexels.com/video/3769965/` | Pexels License; locally compressed and hosted. | Apartment walkthrough motion for belongings coverage questions. |
| Commercial Insurance | commercial-storefront | `/media/carousel/commercial/commercial-open-sign.mp4`, `/media/carousel/commercial/commercial-open-sign-poster.png` | Pexels Videos, `https://www.pexels.com/video/6115075/` | Pexels License; locally compressed and hosted. | Small-business open-sign motion. |
| Commercial Insurance | commercial-office | `/media/carousel/commercial/commercial-team-meeting.mp4`, `/media/carousel/commercial/commercial-team-meeting-poster.png` | Pexels Videos, `https://www.pexels.com/video/7147921/` | Pexels License; locally compressed and hosted. | Office team meeting motion for business coverage conversations. |
| Commercial Insurance | commercial-certificates | `/media/carousel/commercial/commercial-workshop-tools.mp4`, `/media/carousel/commercial/commercial-workshop-tools-poster.png` | Pexels Videos, `https://www.pexels.com/video/10294767/` | Pexels License; locally compressed and hosted. | Contractor/workshop motion for liability and certificate requests. |
| Life Insurance | life-family | `/media/carousel/life/life-family-beach.mp4`, `/media/carousel/life/life-family-beach-poster.png` | Pexels Videos, `https://www.pexels.com/video/36906034/` | Pexels License; locally compressed and hosted. | Family future-focused motion for life insurance quote help. |
| Life Insurance | life-term | `/media/carousel/life/life-home-planning.mp4`, `/media/carousel/life/life-home-planning-poster.png` | Pexels Videos, `https://www.pexels.com/video/6964248/` | Pexels License; locally compressed and hosted. | Couple reviewing documents for term life planning. |
| Life Insurance | life-final-expense | `/media/carousel/life/life-family-budget.mp4`, `/media/carousel/life/life-family-budget-poster.png` | Pexels Videos, `https://www.pexels.com/video/7735809/` | Pexels License; locally compressed and hosted. | Family budget planning motion for final expense conversations. |

## Premium Asset Gaps

The service-page carousels now use moving MP4 media only. The best future upgrade is to commission Office #3-owned video footage:
- Auto: Miami road/driving footage with no obvious brand-logo focus.
- Homeowners: real Miami/West Flagler home exterior and front-door motion.
- Renters: authentic apartment move-in or consultation footage.
- Commercial: local small business owner/storefront footage with releases.
- Life: warm family planning or agent conversation footage with releases.

Target final videos: 5-8 seconds, muted, loopable, no watermark, 1280x720 or similar, ideally under 3-5 MB per clip.
