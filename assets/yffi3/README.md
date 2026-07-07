# Required approved assets

Place the approved Office #3 assets in this folder before publishing:

- yffi3-official-franchise-logo.png
- yffi3-family-office-photo.jpg
- yffi3-family-office-photo.webp
- yffi3-principal-agent-ariel-busutil.jpg
- yffi3-original-franchise-logo.png
- yffi3-quote-qr.jpeg
- service-auto-slide-1.webp through service-auto-slide-3.webp
- service-auto-slide-1.jpg through service-auto-slide-3.jpg
- service-auto-slide-4.jpg
- service-auto-slide-4-poster.jpg
- service-auto-motion.gif
- service-auto-motion.webm
- service-homeowners-slide-1.webp through service-homeowners-slide-3.webp
- service-homeowners-slide-1.jpg through service-homeowners-slide-3.jpg
- service-homeowners-motion.gif
- service-homeowners-motion.webm
- service-commercial-slide-1.webp through service-commercial-slide-3.webp
- service-commercial-slide-1.jpg through service-commercial-slide-3.jpg
- service-commercial-motion.gif
- service-commercial-motion.webm
- service-life-slide-1.webp through service-life-slide-3.webp
- service-life-slide-1.jpg through service-life-slide-3.jpg
- service-life-motion.gif
- service-life-motion.webm
- service-renters-slide-1.webp through service-renters-slide-3.webp
- service-renters-slide-1.jpg through service-renters-slide-3.jpg
- service-renters-motion.gif
- service-renters-motion.webm

Do not replace these with generated images or a redesigned logo. The HTML references these exact files as brand/compliance assets.

The carousel inventory lives in `/src/data/carouselMedia.js`. Update that manifest first whenever replacing media, then run `pnpm run build` so `scripts/validate-carousel-assets.mjs` can catch duplicate paths, missing alt text, missing license notes, or page-off-topic slides.

`service-auto-slide-4.jpg` and `service-auto-slide-4-poster.jpg` are local production fallback assets for the auto carousel. They replace the older car-key still in rendered pages so the auto insurance experience stays motion-led and less cluttered.

The auto carousel also uses `/public/media/insurance-slides/auto-palm-street-drive.mp4`, a compressed local Pexels-style car-under-palm-trees loop. Keep it local and optimized; do not hotlink external media in production.
