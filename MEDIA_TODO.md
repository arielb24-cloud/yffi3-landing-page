# Insurance Carousel Media Replacement Guide

The carousel system is production-ready and currently uses local optimized placeholder WebM loops and poster images in `public/media/insurance-slides/`.

Replace the placeholder media with licensed final footage using the same filenames so no code changes are required.

## Technical Targets

- Format: WebM first. Add MP4 fallback only if available and update the matching `videoMp4` field in `scripts/generate-site.mjs`.
- Duration: 5 to 8 seconds.
- Audio: none.
- Desktop size: 1280x720 or 1600x900, compressed.
- Mobile-safe crop: important subject centered inside the middle 60% of the frame.
- File target: ideally under 2 MB per WebM, never 4K.
- Motion: ambient, slow, trustworthy, no fear-heavy scenes.
- Avoid: crashes, storms as the main focus, emergency lights, fake carrier logos, fake people, fake awards, or anything that implies unauthorized partnerships.

## Required Files

### Auto Insurance

- File: `auto-miami-drive.webm`
- Poster: `posters/auto-miami-drive-poster.jpg`
- Search terms: `Miami car driving night`, `car driving city lights`, `luxury car road close up`, `driver hands steering wheel city`, `Miami street car palm trees`
- Best visual: clean road movement, city light reflections, dashboard detail, or premium street scene.

### Homeowners Insurance

- File: `home-miami-sunlight.webm`
- Poster: `posters/home-miami-sunlight-poster.jpg`
- Search terms: `modern Florida home exterior`, `sunlight living room family home`, `front door home keys`, `palm shadow house`, `Miami home exterior`
- Best visual: warm home exterior, sunlight through windows, palm shadows, or slow entry detail.

### Renters Insurance

- File: `renters-apartment-keys.webm`
- Poster: `posters/renters-apartment-keys-poster.jpg`
- Search terms: `modern apartment keys`, `apartment interior sunlight`, `young renter moving apartment`, `cozy apartment living room`, `city apartment interior`
- Best visual: keys, move-in moment, apartment light, belongings, or calm interior.

### Business Insurance

- File: `business-storefront-open.webm`
- Poster: `posters/business-storefront-open-poster.jpg`
- Search terms: `small business owner storefront`, `restaurant owner opening`, `barber shop owner`, `contractor small business`, `office client meeting`
- Best visual: open sign, storefront prep, owner getting ready, restaurant/barber/office details.

### General Liability

- File: `liability-contractor-checklist.webm`
- Poster: `posters/liability-contractor-checklist-poster.jpg`
- Search terms: `contractor clipboard`, `small business service worker`, `worker checking equipment`, `insured contractor job site`, `professional workspace checklist`
- Best visual: responsible jobsite detail, clipboard/checklist, tools in motion, service professional.

### Family / Life Insurance

- File: `family-protection-planning.webm`
- Poster: `posters/family-protection-planning-poster.jpg`
- Search terms: `family financial planning table`, `life insurance family planning`, `mortgage protection planning`, `final expense planning documents`, `warm home planning`
- Best visual: warm planning details, family home context, papers/keys, calm protection mood.

### Bilingual Local Service

- File: `bilingual-agent-consult.webm`
- Poster: `posters/bilingual-agent-consult-poster.jpg`
- Search terms: `insurance agent client meeting`, `Spanish speaking agent consultation`, `Miami family office`, `local business consultation`, `advisor meeting client office`
- Best visual: real office consultation, agent greeting, document review, phone consultation, bilingual/local warmth.

## Suggested Sources To Inspect

- Pexels Videos
- Coverr
- Mixkit
- Unsplash for poster stills
- Existing approved Office #3 assets when real local imagery is available

Download and optimize final files locally. Do not hotlink external stock media in production.
