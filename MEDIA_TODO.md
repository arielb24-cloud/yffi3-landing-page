# Premium Carousel Media Replacement Guide

The carousel now uses real locally hosted MP4 motion clips from `public/media/premium-carousel/` plus the approved family beach clip at `public/media/carousel/life/life-family-beach.mp4`.

Do not replace carousel slots with static photos, still-image pans, or fake GIF-like animations. Carousel media must be true moving video.

## Rules

- Update `src/data/carouselMedia.js` first.
- Every `src` and `poster` path must be unique across the manifest.
- Keep media page-specific: auto videos on auto, homes on homeowners, move-in/apartment videos on renters, business/worksite videos on commercial, family/planning videos on life.
- Keep all media local in production. Do not hotlink Pexels, Pixabay, Mixkit, Coverr, or any other source.
- Keep official franchise/logo assets unchanged and separate from stock carousel media.
- Run `pnpm run build`; it runs `scripts/validate-carousel-assets.mjs`.

## Technical Targets

- Format: MP4, muted, loopable, no audio.
- Duration: 5 to 8 seconds.
- Desktop size: 1280x720 or similar.
- Mobile-safe crop: important subject centered inside the middle 60% of the frame.
- File target: ideally 3 to 5 MB per clip, acceptable up to about 6.5 MB for richer motion.
- Avoid: crashes, emergency lights, fear-heavy storm footage, obvious luxury brand-logo focus, watermarks, editorial-only footage, fake carrier logos, fake people, fake awards, or anything implying unauthorized partnerships.

## Strong Future Upgrade Searches

### Auto Insurance
- `Miami car driving night`
- `luxury car driving city`
- `driver hands steering wheel city`
- `city drive sunset`

### Homeowners Insurance
- `modern Florida home exterior`
- `luxury home exterior drone`
- `sunlit home walkthrough`
- `palm trees home exterior`

### Renters Insurance
- `moving boxes apartment`
- `couple apartment keys`
- `modern apartment move in`
- `renters lifestyle apartment`

### Commercial Insurance
- `small business owner storefront`
- `office client meeting`
- `contractor worksite`
- `certificate of insurance contractor`

### Life Insurance
- `family walking beach`
- `family coming home`
- `family planning documents`
- `parents child home`

### Bilingual Local Service
- `advisor client meeting`
- `insurance consultation office`
- `Miami local office meeting`
- `Spanish speaking consultation`

## Sources To Inspect

Preferred free/commercial-friendly sources:
- Pexels Videos
- Pixabay Videos
- Mixkit
- Coverr
- Splitshire
- Mazwai

If using sources that require attribution, add the credit to `docs/carousel-media-credits.md` before publishing.
