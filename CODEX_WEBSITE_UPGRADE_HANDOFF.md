# Codex website upgrade handoff

Codex has implemented the code-side premium media workflow on branch `codex/premium-media-carousel`.

## Completed workflow

- Keep the official franchise marks and verified business facts unchanged.
- Generate every public page from structured facts and a license-gated media manifest.
- Bundle Embla Carousel, Embla Fade, GSAP, and ScrollTrigger into a self-hosted production script.
- Render each insurance hero as a touch-draggable, keyboard-operable, button-controlled carousel with pause/resume, reduced-motion, Save-Data, offscreen, focus, hover, and hidden-tab safeguards.
- Retain the 15 existing responsive image pairs as production fallbacks.
- Validate facts, claims, media licenses, local assets, HTML, spelling, accessibility, internal routes, structured data, and security headers.
- Build and test under Node.js 22 and pnpm 11.7.0; run Chromium, Firefox, WebKit, axe, Lighthouse, Vale, and Lychee in GitHub Actions.

## Exact prompt for the next licensed-footage intake

> Work only in the existing YFFI3 repository. Do not alter, recolor, crop, filter, redraw, or replace the official franchise logo. Do not invent reviews, ratings, awards, carrier relationships, pricing, savings, approvals, people, or insurance claims. Read `AGENTS.md`, `content/site-facts.json`, `content/media-manifest.json`, and `docs/MEDIA_PROVENANCE.md` before editing. For each supplied licensed source clip, verify the provider asset ID, commercial-use license, license proof, non-editorial status, attribution terms, logos/plates/people, and service-page relevance. Reject anything from Pinterest, social media, YouTube, manufacturer/dealer pages, real-estate listings, or a GitHub video link collection unless the original rights holder independently grants production rights. Run `pnpm media:transcode --input ABSOLUTE_SOURCE_PATH --id SAFE_ASSET_ID`, add the generated WebM/MP4/poster paths and exact rights record to the media manifest, keep the existing image fallback, and run `pnpm check`, `pnpm build`, and `pnpm qa`. Never hotlink footage. Never enable autoplay for reduced-motion or Save-Data users. Pause inactive and offscreen video. Report any missing license, provider account, budget, factual approval, or GitHub write scope as a blocker rather than guessing.

## Human-controlled inputs still required

Premium stock footage is not a free public software dependency. To ingest final car, mansion, apartment, or business clips, Codex needs either:

1. original clips already owned by the business plus proof they may be used commercially; or
2. access to a chosen stock provider account and an approved budget/plan; or
3. direct per-asset links from a free provider whose commercial license has been reviewed.

The carousel is fully production-capable before those clips arrive; it displays the existing optimized imagery without broken media or unlicensed downloads.

## GitHub write authorization still required

ChatGPT's GitHub permission mode is already set to **Allow all actions**, but that consent does not supply a Git credential to this Codex workspace or expand the underlying GitHub App installation scopes. The completed commit is `c35f7aa` on `codex/premium-media-carousel`.

To push and open a pull request, authorize one of these safe paths without pasting a token into chat:

1. reconnect/install the Codex GitHub integration for `arielb24-cloud/yffi3-landing-page` with repository **Contents**, **Pull requests**, and **Issues** read/write access; or
2. open this repository in a Codex cloud/local environment that already has an authenticated GitHub credential; or
3. apply the exported Git patch from the handoff artifact in an authenticated local clone.
