# Codex website upgrade handoff

Codex has implemented the code-side premium media workflow on branch `codex/premium-media-carousel`.

## Completed workflow

- Keep the official franchise marks and verified business facts unchanged.
- Generate every public page from structured facts and a license-gated media manifest.
- Bundle Embla Carousel, Embla Fade, GSAP, and ScrollTrigger into a self-hosted production script.
- Render each insurance hero as a touch-draggable, keyboard-operable, button-controlled carousel with pause/resume, reduced-motion, Save-Data, offscreen, focus, hover, and hidden-tab safeguards.
- Add one visually reviewed, licensed, self-hosted video to every insurance page and retain the 15 existing responsive image pairs as production fallbacks.
- Reject watermarked, irrelevant, visibly branded, or low-quality candidates before production; record the approved Mixkit/Coverr sources and licenses in the manifest and CSV.
- Validate facts, claims, media licenses, local assets, HTML, spelling, accessibility, internal routes, structured data, and security headers.
- Build and test under Node.js 22 and pnpm 11.7.0; run Chromium, Firefox, WebKit, axe, Lighthouse, Vale, and Lychee in GitHub Actions.

## Exact prompt for later licensed-footage replacement

> Work only in the existing YFFI3 repository. Do not alter, recolor, crop, filter, redraw, or replace the official franchise logo. Do not invent reviews, ratings, awards, carrier relationships, pricing, savings, approvals, people, or insurance claims. Read `AGENTS.md`, `content/site-facts.json`, `content/media-manifest.json`, and `docs/MEDIA_PROVENANCE.md` before editing. For each supplied licensed source clip, verify the provider asset ID, commercial-use license, license proof, non-editorial status, attribution terms, logos/plates/people, and service-page relevance. Reject anything from Pinterest, social media, YouTube, manufacturer/dealer pages, real-estate listings, or a GitHub video link collection unless the original rights holder independently grants production rights. Run `pnpm media:transcode --input ABSOLUTE_SOURCE_PATH --id SAFE_ASSET_ID`, add the generated WebM/MP4/poster paths and exact rights record to the media manifest, keep the existing image fallback, and run `pnpm check`, `pnpm build`, and `pnpm qa`. Never hotlink footage. Never enable autoplay for reduced-motion or Save-Data users. Pause inactive and offscreen video. Report any missing license, provider account, budget, factual approval, or GitHub write scope as a blocker rather than guessing.

## Licensed footage is included

The current production set includes:

- Auto: moving red sports car on a curved road at warm dawn.
- Homeowners: landscaped luxury residential pool and covered patio.
- Commercial: clean low-angle motion view of a neutral corporate tower.
- Life: tropical ocean and palm silhouettes at a vivid sunset.
- Renters: slow pan across a refined high-rise bedroom.

All five are short, muted, self-hosted WebM/MP4 loops with WebP posters. The full source/license record is in `content/media-manifest.json`, `docs/media-licenses.csv`, and `docs/MEDIA_PROVENANCE.md`. A future paid-stock upgrade is optional, not required for this branch.

## GitHub write authorization still required

ChatGPT's GitHub permission mode is already set to **Allow all actions**, but that consent does not supply a Git credential to this Codex workspace or expand the underlying GitHub App installation scopes. The completed work is on `codex/premium-media-carousel`.

To push and open a pull request, authorize one of these safe paths without pasting a token into chat:

1. reconnect/install the Codex GitHub integration for `arielb24-cloud/yffi3-landing-page` with repository **Contents**, **Pull requests**, and **Issues** read/write access; or
2. open this repository in a Codex cloud/local environment that already has an authenticated GitHub credential; or
3. apply the exported Git patch from the handoff artifact in an authenticated local clone.

## One-task Codex prompt after reconnecting GitHub

Attach only the exported `v3-0001-Build-premium-licensed-media-carousel-workflow.patch` file to a Codex cloud task for `arielb24-cloud/yffi3-landing-page`, then send:

> Work only in `arielb24-cloud/yffi3-landing-page`. Read `AGENTS.md` first. Create or switch to branch `codex/premium-media-carousel`. Locate the attached file `v3-0001-Build-premium-licensed-media-carousel-workflow.patch` and apply it with `git am --3way`. Do not recreate the work or substitute different media. Run `corepack enable`, `pnpm install --frozen-lockfile`, `pnpm check`, and `pnpm build`. Run the Playwright QA suite in Chromium, Firefox, and WebKit when the environment supports browser downloads; otherwise confirm that the included GitHub Actions workflow performs the three-browser run. Verify the five self-hosted video triples, `docs/media-licenses.csv`, footer attribution, reduced-motion and Save-Data behavior, and that no remote media URLs are loaded. Push `codex/premium-media-carousel` and open a pull request into the repository's default branch titled `Build premium licensed-media carousel workflow`. Include validation results and any environment-only browser-download limitation in the PR body. Do not merge the pull request.
