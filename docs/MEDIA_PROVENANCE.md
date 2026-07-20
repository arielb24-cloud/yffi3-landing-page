# Media provenance and production policy

The carousel only renders assets listed in `content/media-manifest.json`. Every production item must be self-hosted, approved for production, non-editorial, and supported by a commercial-use license record.

## Existing assets

The 15 image pairs currently in the manifest were already supplied in the YFFI3 repository and are retained as the safe production fallback. Their provenance is recorded as existing project assets; replacing them does not erase the original files.

## Production video set acquired July 20, 2026

Five source clips were downloaded from the original Mixkit and Coverr asset pages, visually reviewed, trimmed to short web loops, stripped of audio, and transcoded to self-hosted WebM/MP4 with WebP posters. The production set contains one video for each insurance page. Rejected candidates included watermarked footage, an unrelated restaurant terrace, and a dark dirt-road driving shot. Exact URLs, license names, review dates, and attribution requirements are recorded in `docs/media-licenses.csv` and `content/media-manifest.json`.

Coverr attribution is retained in the public footer. Mixkit assets are covered by the Mixkit Stock Video Free License pages that explicitly state commercial or personal use.

## Premium video intake

1. License and download the original clip from the actual provider. Do not download from Pinterest, social media, manufacturer sites, real-estate listings, YouTube, or GitHub link collections.
2. Save the receipt, asset ID, source page, license terms, download date, and any required attribution outside the public web root.
3. Run:

   ```bash
   pnpm media:transcode --input /absolute/path/source.mov --id auto-night-drive
   ```

4. Add the generated WebM, MP4, and WebP poster paths to `content/media-manifest.json`; add the exact provider and proof record.
5. Run `pnpm check` and the browser QA suite. The build will reject missing files, remote media, editorial-only footage, and incomplete production approval.

## Acquisition rules

- Good premium sources include Filmsupply, Artgrid/Artlist, FILMPAC, Stocksy, Dissolve, Adobe Stock, Getty Images, Shutterstock, Pond5, Storyblocks, Envato Elements, and Motion Array. Pexels, Pixabay, Mixkit, and Coverr can be evaluated for free commercial footage.
- Pinterest, Awwwards, Behance, Dribbble, Instagram, TikTok, YouTube, luxury manufacturers, dealers, and property listings are inspiration or discovery sources only.
- Prefer 6–12 second landscape shots, 4K source, restrained camera motion, dark negative space for copy, no readable plates, no logos, no identifiable people, and no unsafe driving.
- Reject editorial-only, recognizable branded, watermarked, AI-person, testimonial-style, news, crash, claims-event, or disaster footage.
- Keep background carousel video muted, playsinline, caption-independent, and decorative. The adjacent page copy supplies meaning.

## Performance policy

- Use WebM first and MP4/H.264 fallback with a WebP poster.
- Never autoplay when `prefers-reduced-motion` or `Save-Data` is enabled.
- Pause video when the slide, carousel, tab, or browser viewport is inactive.
- Hydrate only the active and next video sources.
- Keep each optimized loop as short and lightweight as the creative permits; the image fallback remains required.
