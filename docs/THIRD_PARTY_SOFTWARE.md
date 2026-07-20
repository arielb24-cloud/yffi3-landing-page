# Third-party software

Production dependencies are deliberately narrow:

| Package | Purpose | License | Upstream |
| --- | --- | --- | --- |
| Embla Carousel | Accessible touch/drag carousel engine | MIT | https://github.com/davidjerleke/embla-carousel |
| Embla Carousel Fade | Official cross-fade plugin | MIT | https://github.com/davidjerleke/embla-carousel |
| GSAP | Motion choreography and ScrollTrigger | GSAP standard license | https://github.com/greensock/GSAP |
| Express | Production static server | MIT | https://github.com/expressjs/express |

Development-only validation and build tools: esbuild, Sharp, SVGO, AJV, AJV Formats, cspell, html-validate, Lighthouse CI, Playwright, and axe-core. Vale and Lychee are configured in continuous integration using their official GitHub Actions.

The project does not copy components, demo layouts, videos, or imagery from the audited GitHub repositories. References were selected for patterns and installed packages only; their licenses do not grant rights to unrelated stock footage.
