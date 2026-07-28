# Required approved assets

Place the approved Office #3 assets in this folder before publishing:

- yffi3-official-franchise-logo.png
- yffi3-family-office-photo.jpg
- yffi3-family-office-photo.webp
- yffi3-principal-agent-ariel-busutil.jpg
- yffi3-original-franchise-logo.png
- yffi3-quote-qr.jpeg

Do not replace the official franchise assets with generated images or a redesigned logo.

The carousel inventory lives in `/src/data/carouselMedia.js`. Update that manifest first whenever replacing media, then run `pnpm run build` so `scripts/validate-carousel-assets.mjs` can catch duplicate paths, missing alt text, missing license notes, page-off-topic slides, or any static carousel slide.

Most carousel videos now live under `/public/media/premium-carousel/`; the approved family beach life clip remains under `/public/media/carousel/life/`. Keep carousel media local, muted, loopable, optimized, page-specific, and unique. Do not hotlink external media in production, and do not reintroduce static image slides.
