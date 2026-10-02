import fs from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const screenshotDir = path.resolve("playwright-screenshots");
const playwrightPort = process.env.PLAYWRIGHT_PORT || "4275";
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${playwrightPort}`;
const quoteDestination = "https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868";
const googleTagManagerId = "GTM-5FZCMM3V";
const googleAnalyticsTagId = "G-6XC09FD9LD";
const pages = [
  { name: "home", path: "/" },
  { name: "quote", path: "/get-a-quote/" },
  { name: "auto", path: "/auto-insurance/", service: true },
  { name: "homeowners", path: "/home-insurance/", service: true },
  { name: "commercial", path: "/commercial-insurance/", service: true },
  { name: "life", path: "/life-insurance/", service: true },
  { name: "renters", path: "/renters-insurance/", service: true },
  { name: "about", path: "/about-office-3/" },
  { name: "privacy", path: "/privacy-policy/" },
  { name: "terms", path: "/terms/" },
  { name: "customers", path: "/policyholder-help/", policyholder: true },
  { name: "hurricane-guide", path: "/customer-resources/hurricane-preparation/", policyholder: true, resource: true },
  { name: "renewal-guide", path: "/customer-resources/renewal-review/", policyholder: true, resource: true },
  { name: "certificate-guide", path: "/customer-resources/certificate-of-insurance/", policyholder: true, resource: true },
  { name: "annual-review-guide", path: "/customer-resources/life-event-review/", policyholder: true, resource: true },
  { name: "home-es", path: "/es/", spanish: true },
  { name: "quote-es", path: "/es/solicitar-cotizacion/", spanish: true },
  { name: "auto-es", path: "/es/seguro-de-auto/", spanish: true, service: true },
  { name: "homeowners-es", path: "/es/seguro-de-vivienda/", spanish: true, service: true },
  { name: "commercial-es", path: "/es/seguro-comercial/", spanish: true, service: true },
  { name: "life-es", path: "/es/seguro-de-vida/", spanish: true, service: true },
  { name: "renters-es", path: "/es/seguro-de-inquilinos/", spanish: true, service: true },
  { name: "about-es", path: "/es/sobre-oficina-3/", spanish: true },
  { name: "privacy-es", path: "/es/privacidad/", spanish: true },
  { name: "terms-es", path: "/es/terminos/", spanish: true },
  { name: "customers-es", path: "/es/ayuda-para-clientes/", spanish: true, policyholder: true },
  { name: "hurricane-guide-es", path: "/es/recursos-para-clientes/preparacion-para-huracanes/", spanish: true, policyholder: true, resource: true },
  { name: "renewal-guide-es", path: "/es/recursos-para-clientes/revision-de-renovacion/", spanish: true, policyholder: true, resource: true },
  { name: "certificate-guide-es", path: "/es/recursos-para-clientes/certificado-de-seguro/", spanish: true, policyholder: true, resource: true },
  { name: "annual-review-guide-es", path: "/es/recursos-para-clientes/revision-anual/", spanish: true, policyholder: true, resource: true }
];
const viewports = [
  { name: "mobile", width: 390, height: 920 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1100 }
];
const languagePairs = [
  ["/", "/es/"],
  ["/auto-insurance/", "/es/seguro-de-auto/"],
  ["/home-insurance/", "/es/seguro-de-vivienda/"],
  ["/renters-insurance/", "/es/seguro-de-inquilinos/"],
  ["/commercial-insurance/", "/es/seguro-comercial/"],
  ["/life-insurance/", "/es/seguro-de-vida/"],
  ["/about-office-3/", "/es/sobre-oficina-3/"],
  ["/get-a-quote/", "/es/solicitar-cotizacion/"],
  ["/privacy-policy/", "/es/privacidad/"],
  ["/terms/", "/es/terminos/"],
  ["/policyholder-help/", "/es/ayuda-para-clientes/"],
  ["/customer-resources/hurricane-preparation/", "/es/recursos-para-clientes/preparacion-para-huracanes/"],
  ["/customer-resources/renewal-review/", "/es/recursos-para-clientes/revision-de-renovacion/"],
  ["/customer-resources/certificate-of-insurance/", "/es/recursos-para-clientes/certificado-de-seguro/"],
  ["/customer-resources/life-event-review/", "/es/recursos-para-clientes/revision-anual/"]
];

test.beforeAll(() => {
  fs.mkdirSync(screenshotDir, { recursive: true });
});

test.beforeEach(async ({ page, context }) => {
  // Safari upgrades loopback assets under the production CSP. Keep this HTTP-only
  // test accommodation in the harness; production security headers stay intact.
  if (baseURL.startsWith("http://127.0.0.1:") || baseURL.startsWith("http://localhost:")) {
    await context.route(`${baseURL}/**`, async (route) => {
      if (!route.request().isNavigationRequest()) return route.continue();
      const response = await route.fetch();
      const headers = response.headers();
      if (headers["content-security-policy"]) headers["content-security-policy"] = headers["content-security-policy"].replace(/;?\s*upgrade-insecure-requests/g, "");
      await route.fulfill({ response, headers });
    });
  }
  await page.route("https://www.googletagmanager.com/gtm.js**", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/javascript", body: "" });
  });
});

async function revealWholePage(page) {
  await page.evaluate(async () => {
    const root = document.documentElement;
    root.style.scrollBehavior = "auto";
    const step = Math.max(280, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y < root.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 45));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => window.setTimeout(resolve, 120));
  });
}

for (const viewport of viewports) {
  for (const pageInfo of pages) {
    test(`${pageInfo.name} renders at ${viewport.name}`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== "chromium", "Visual evidence is captured once in Chromium; cross-browser behavior is covered by the remaining suite.");
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(pageInfo.path, { waitUntil: "networkidle" });

      await expect(page.locator("header.site-header")).toBeVisible();
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('img[alt*="official franchise logo"], .brand-logo img').first()).toBeVisible();
      await expect(page.locator(pageInfo.spanish ? '#site-nav a[href="/es/seguro-de-vivienda/"]' : '#site-nav a[href="/home-insurance/"]')).toHaveText(pageInfo.spanish ? "Vivienda" : "Homeowners");
      await expect(page.locator(pageInfo.spanish ? '#site-nav a[href="/es/"]' : '#site-nav a[href="/"]')).toHaveText(pageInfo.spanish ? "Inicio" : "Home");

      const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(hasHorizontalOverflow).toBe(false);

      const logoBox = await page.locator(".brand-logo img").first().boundingBox();
      expect(logoBox?.width || 0).toBeGreaterThan(60);
      expect(logoBox?.height || 0).toBeGreaterThan(28);

      if (["home", "home-es"].includes(pageInfo.name)) {
        await expect(page.getByRole("link", { name: pageInfo.spanish ? /Solicitar cotización/i : /Get My Free Quote/i }).first()).toBeVisible();
        await expect(page.locator(pageInfo.spanish ? 'img[alt*="Foto real de la familia"]' : 'img[alt*="Real family and office photo"]').first()).toBeVisible();
        const principalAgentPhoto = page.locator(".principal-photo img").first();
        await principalAgentPhoto.scrollIntoViewIfNeeded();
        await expect(principalAgentPhoto).toBeVisible();
        await expect(page.locator(".trust-ticker")).toBeVisible();
      }

      if (["quote", "quote-es"].includes(pageInfo.name)) {
        const quoteHandoff = page.locator('[data-quote-handoff]');
        await quoteHandoff.scrollIntoViewIfNeeded();
        await expect(quoteHandoff).toBeVisible();
        await expect(quoteHandoff.locator('input, textarea, select')).toHaveCount(0);
        await expect(quoteHandoff.locator('a[href*="secure.ConsumerRateQuotes.com"]')).toBeVisible();
      }

      if (pageInfo.service) {
        const carousel = page.locator("[data-insurance-carousel]");
        await expect(carousel).toBeVisible();
        await expect(carousel.locator(".motion-slide")).toHaveCount(3);
        await expect(carousel.locator(".motion-video")).toHaveCount(3);
        await expect(carousel.locator(".motion-poster")).toHaveCount(3);
        await expect(carousel.locator(".motion-video").first()).toHaveAttribute("data-mp4", /^\/media\/.*\.mp4$/);
        await expect(carousel.locator(".motion-poster").first()).toHaveAttribute("src", /^\/media\/.*-poster\.(?:png|jpg|webp)$/);
        await expect(carousel).toHaveAttribute("role", "region");
        await expect(carousel.locator("[data-carousel-dot]")).toHaveCount(3);
        await expect(page.locator("[data-carousel-prev]")).toBeVisible();
        await expect(page.locator("[data-carousel-next]")).toBeVisible();
        const searchIntentPanel = page.locator(".service-detail");
        await searchIntentPanel.scrollIntoViewIfNeeded();
        await expect(searchIntentPanel).toBeVisible();
        await expect(page.locator(".service-detail .detail-card")).toHaveCount(4);
        expect(await page.locator(".faq-list details").count()).toBeGreaterThanOrEqual(4);
      }

      if (pageInfo.policyholder) {
        await expect(page.locator("main input, main textarea, main select")).toHaveCount(0);
        await expect(page.locator(".policyholder-contact")).toBeVisible();
        if (pageInfo.resource) await expect(page.locator(".policyholder-sources")).toBeVisible();
        else await expect(page.locator(".policyholder-resources .intent-card")).toHaveCount(4);
      }

      await revealWholePage(page);

      await page.screenshot({
        path: path.join(screenshotDir, `${pageInfo.name}-${viewport.name}.png`),
        fullPage: true
      });
    });
  }
}

for (const pageInfo of pages) {
  test(`${pageInfo.name} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(pageInfo.path, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}

test("mobile navigation opens cleanly", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 920 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /open navigation/i }).click();
  await expect(page.locator("#site-nav")).toHaveAttribute("data-open", "true");
  await expect(page.getByRole("navigation", { name: /primary navigation/i })).toBeVisible();
  await expect(page.getByRole("navigation", { name: /primary navigation/i }).getByRole("link", { name: "Homeowners" })).toBeVisible();
  await page.screenshot({
    path: path.join(screenshotDir, "home-mobile-nav-open.png"),
    fullPage: true
  });
});

test("mobile homeowners page scroll content stays usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 920 });
  await page.goto("/home-insurance/", { waitUntil: "networkidle" });

  await page.locator(".service-detail").scrollIntoViewIfNeeded();
  await expect(page.locator(".service-detail h2")).toContainText("What to Review");
  await expect(page.locator(".detail-card").first()).toBeVisible();

  await page.locator(".faq-list").scrollIntoViewIfNeeded();
  await page.locator(".faq-list summary").first().click();
  await expect(page.locator(".faq-list details").first()).toHaveAttribute("open", "");

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasHorizontalOverflow).toBe(false);

  await page.screenshot({
    path: path.join(screenshotDir, "homeowners-mobile-scroll-faq.png"),
    fullPage: true
  });
});

test("mobile homepage sections keep stable document flow while scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 920 });
  await page.goto("/", { waitUntil: "networkidle" });

  const before = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    sections: Array.from(document.querySelectorAll("main > section")).map((section) => {
      const box = section.getBoundingClientRect();
      return {
        top: Math.round(box.top + window.scrollY),
        bottom: Math.round(box.bottom + window.scrollY),
        contentVisibility: getComputedStyle(section).contentVisibility
      };
    })
  }));

  expect(before.sections.every((section) => section.contentVisibility === "visible")).toBe(true);
  for (let index = 1; index < before.sections.length; index += 1) {
    // Firefox can round adjacent fractional-pixel section edges two pixels apart.
    // This tolerance still rejects a visible overlap while avoiding a false failure.
    expect(before.sections[index].top).toBeGreaterThanOrEqual(before.sections[index - 1].bottom - 2);
  }

  await revealWholePage(page);
  const after = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    y: window.scrollY,
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1
  }));
  expect(after.height).toBe(before.height);
  expect(after.y).toBe(0);
  expect(after.overflow).toBe(false);
});

test("mobile carousel autoplays before engagement and controls do not move the page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 920 });
  await page.goto("/", { waitUntil: "networkidle" });
  const carousel = page.locator("[data-insurance-carousel]");
  const nextControl = carousel.locator("[data-carousel-next]");
  await nextControl.scrollIntoViewIfNeeded();
  await expect.poll(() => carousel.locator('.motion-slide[data-active="true"] video').evaluate(v => !v.paused && v.readyState >= 2)).toBe(true);
  const beforeY = await page.evaluate(() => window.scrollY);

  await nextControl.click();

  await expect(carousel).toHaveAttribute("data-active-slide", "home-homeowners");
  await expect.poll(() => carousel.locator('.motion-slide[data-active="true"] video').evaluate(v => !v.paused && v.readyState >= 2)).toBe(true);
  const afterY = await page.evaluate(() => window.scrollY);
  expect(Math.abs(afterY - beforeY)).toBeLessThanOrEqual(1);
});

test("quote page avoids duplicate data entry and continues to the secure vendor", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 920 });
  await page.route("https://secure.consumerratequotes.com/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<!doctype html><title>Secure Quote</title><h1>Secure Consumer Quote</h1>"
    });
  });
  await page.goto("/get-a-quote/", { waitUntil: "networkidle" });

  const handoff = page.locator("[data-quote-handoff]");
  const buttonBounds = await handoff.locator("[data-secure-quote-handoff]").boundingBox();
  const barBounds = await page.locator(".mobile-contact-bar").boundingBox();
  expect(buttonBounds.y + buttonBounds.height).toBeLessThanOrEqual(barBounds.y);
  await handoff.scrollIntoViewIfNeeded();
  await expect(handoff.locator("input, textarea, select")).toHaveCount(0);
  await handoff.getByRole("link", { name: /Get My Free Quote/i }).click();

  await expect(page).toHaveURL(quoteDestination);
});

test("quote buttons and handoff card route to the secure quote destination", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/", { waitUntil: "networkidle" });

  const quoteLinks = page.locator('a.button[href*="secure.ConsumerRateQuotes.com"]');
  await expect(quoteLinks.first()).toBeVisible();
  expect(await quoteLinks.count()).toBeGreaterThanOrEqual(2);

  for (const href of await quoteLinks.evaluateAll((links) => links.map((link) => link.href))) {
    const url = new URL(href);
    expect(url.hostname).toBe("secure.consumerratequotes.com");
    expect(url.pathname).toBe("/ConsumerV2");
    expect(url.searchParams.get("id")).toBe("64868");
  }

  await page.goto("/get-a-quote/", { waitUntil: "networkidle" });
  await expect(page.locator("[data-quote-handoff] a[data-secure-quote-handoff]")).toHaveAttribute("href", quoteDestination);
});

test("GTM is installed once per page with no hard-coded GA4 tag", async ({ request }) => {
  for (const pageInfo of pages) {
    const response = await request.get(pageInfo.path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain("<head>\n<!-- Google Tag Manager -->");
    expect(html).toContain("<body>\n<!-- Google Tag Manager (noscript) -->");
    expect(html.match(/googletagmanager\.com\/gtm\.js\?id=/g) || []).toHaveLength(1);
    expect(html.match(/googletagmanager\.com\/ns\.html\?id=GTM-5FZCMM3V/g) || []).toHaveLength(1);
    expect(html.match(/GTM-5FZCMM3V/g) || []).toHaveLength(2);
    expect(html).not.toContain(googleAnalyticsTagId);
    expect(html).not.toMatch(/googletagmanager\.com\/gtag\/js|\bgtag\s*\(/i);
  }

  const notFound = await request.get("/gtm-installation-404-check/");
  expect(notFound.status()).toBe(404);
  const notFoundHtml = await notFound.text();
  expect(notFoundHtml.match(/googletagmanager\.com\/gtm\.js\?id=/g) || []).toHaveLength(1);
  expect(notFoundHtml.match(/googletagmanager\.com\/ns\.html\?id=GTM-5FZCMM3V/g) || []).toHaveLength(1);
  expect(notFoundHtml.match(new RegExp(googleTagManagerId, "g")) || []).toHaveLength(2);
});

test("analytics events use only approved non-sensitive fields", async ({ page }) => {
  await page.goto("/get-a-quote/", { waitUntil: "networkidle" });
  await expect(page.locator("[data-quote-handoff] input, [data-quote-handoff] textarea, [data-quote-handoff] select")).toHaveCount(0);

  await page.goto("/", { waitUntil: "networkidle" });
  const clickEvents = await page.evaluate(async () => {
    window.dataLayer = [];
    document.addEventListener("click", (event) => event.preventDefault(), true);
    const emailLink = document.createElement("a");
    emailLink.href = "mailto:analytics-test@example.invalid";
    emailLink.dataset.analyticsTest = "email-second-pass";
    document.body.append(emailLink);
    document.querySelector('a[href^="tel:"]').dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    document.querySelector('a[href^="sms:"]').dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    emailLink.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    document.querySelector('a[href^="https://secure.ConsumerRateQuotes.com/ConsumerV2"]').dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    return window.dataLayer;
  });
  expect(clickEvents.map((entry) => entry.event)).toEqual(["phone_click", "sms_click", "email_click", "quote_start"]);
  for (const event of clickEvents) {
    expect(Object.keys(event).sort()).toEqual([
      "campaign_content", "campaign_id", "campaign_name", "campaign_term", "cta_location", "event",
      "landing_page", "page_language", "page_path", "product_category", "referrer_category",
      "traffic_medium", "traffic_source"
    ]);
    expect(event.landing_page).toBe("/get-a-quote/");
    expect(event.referrer_category).toBe("direct");
    expect(JSON.stringify(event)).not.toMatch(/"(?:name|address|insurance_details|form_contents)"\s*:|3059108850|ariel@example\.com/i);
  }
});

test("first-touch attribution is sanitized, non-PII, and session-scoped", async ({ page }) => {
  await page.goto("/auto-insurance/?utm_source=google&utm_medium=cpc&utm_campaign=Miami%20Auto%202026&utm_id=campaign-64868&utm_term=miami%20auto%20insurance&utm_content=hero%3Cscript%3E&gclid=must-not-be-stored", { waitUntil: "networkidle" });
  const firstTouch = await page.evaluate(() => JSON.parse(sessionStorage.getItem("yffi_first_touch_v1")));
  expect(firstTouch).toEqual({
    landing_page: "/auto-insurance/",
    referrer_category: "direct",
    traffic_source: "google",
    traffic_medium: "cpc",
    campaign_name: "Miami Auto 2026",
    campaign_id: "campaign-64868",
    campaign_term: "miami auto insurance",
    campaign_content: "hero script"
  });
  expect(JSON.stringify(firstTouch)).not.toContain("gclid");
  expect(JSON.stringify(firstTouch)).not.toContain("must-not-be-stored");

  await page.goto("/home-insurance/?utm_source=second-touch", { waitUntil: "networkidle" });
  const persisted = await page.evaluate(() => JSON.parse(sessionStorage.getItem("yffi_first_touch_v1")));
  expect(persisted).toEqual(firstTouch);
});

test("campaign attribution rejects email addresses and phone numbers", async ({ page }) => {
  await page.goto("/auto-insurance/?utm_campaign=synthetic%40example.invalid&utm_content=%2B1%20%28202%29%20555-0100", { waitUntil: "networkidle" });
  const firstTouch = await page.evaluate(() => JSON.parse(sessionStorage.getItem("yffi_first_touch_v1")));
  expect(firstTouch.campaign_name).toBe("(not_set)");
  expect(firstTouch.campaign_content).toBe("(not_set)");
});

test("review dates stay anchored to the actual snapshot in both languages", async ({ request }) => {
  for (const [path, date] of [["/about-office-3/", "Recorded July 13, 2026"], ["/es/sobre-oficina-3/", "Registrado el 13 de julio de 2026"]]) {
    const html = await (await request.get(path)).text();
    expect(html).toContain(date);
    expect(html).not.toMatch(/class="real-review-meta">[^<]*(?:ago|hace)/);
    expect(html).not.toContain("contract-safe");
  }
});

test("a direct quote handoff emits quote_start without claiming form submission or generated lead", async ({ page }) => {
  await page.route("https://secure.consumerratequotes.com/**", (route) => route.abort());
  await page.goto("/get-a-quote/", { waitUntil: "networkidle" });
  const events = await page.evaluate(() => {
    window.dataLayer = [];
    document.addEventListener("click", (event) => event.preventDefault(), true);
    document.querySelector("[data-secure-quote-handoff]").dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    return window.dataLayer;
  });
  const quoteStartEvents = events.filter((entry) => entry?.event === "quote_start");
  expect(quoteStartEvents).toHaveLength(1);
  expect(events.filter((entry) => entry?.event === "form_submit")).toHaveLength(0);
  expect(events.filter((entry) => entry?.event === "quote_form_validated")).toHaveLength(0);
  expect(events.filter((entry) => entry?.event === "generate_lead")).toHaveLength(0);
});

test("privacy pages accurately disclose measurement and advertising tools", async ({ request }) => {
  const english = await (await request.get("/privacy-policy/")).text();
  for (const disclosure of ["Google Tag Manager", "Google Analytics 4", "Google Ads", "_ga", "cookie-preference panel"]) {
    expect(english).toContain(disclosure);
  }
  expect(english).toContain("does not send names, phone numbers, email addresses, ZIP codes, notes, insurance details, raw referrer URLs, or full query strings");
  expect(english).toContain("browser session storage");

  const spanish = await (await request.get("/es/privacidad/")).text();
  for (const disclosure of ["Google Tag Manager", "Google Analytics 4", "Google Ads", "_ga", "panel de preferencias de cookies"]) {
    expect(spanish).toContain(disclosure);
  }
});

test("review rail buttons use their visible text as the accessible name", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const reviewButtons = page.locator(".real-review-mini");
  expect(await reviewButtons.count()).toBeGreaterThanOrEqual(3);
  for (const button of await reviewButtons.all()) {
    await expect(button).not.toHaveAttribute("aria-label", /.+/);
    const visibleText = (await button.innerText()).replace(/\s+/g, " ").trim();
    expect(visibleText.length).toBeGreaterThan(20);
  }
});

test("header ticker contains trusted links and pauses on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/", { waitUntil: "networkidle" });

  const ticker = page.locator(".trust-ticker");
  await expect(ticker).toBeVisible();
  await expect(ticker.locator('a[href="/about-office-3/"]').first()).toBeVisible();
  await expect(ticker.locator('a[href="/policyholder-help/"]').first()).toBeVisible();
  await expect(ticker.locator('a[href*="secure.ConsumerRateQuotes.com"]').first()).toBeVisible();

  const beforeHover = await page.locator(".trust-track").evaluate((node) => getComputedStyle(node).animationPlayState);
  expect(beforeHover).toBe("running");
  await ticker.hover();
  const afterHover = await page.locator(".trust-track").evaluate((node) => getComputedStyle(node).animationPlayState);
  expect(afterHover).toBe("paused");
});

test("service carousel supports explicit controls and state", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 920 });
  await page.goto("/auto-insurance/", { waitUntil: "networkidle" });

  const carousel = page.locator("[data-insurance-carousel]");
  await expect(carousel).toHaveAttribute("data-active-slide", "auto-drive");
  await expect(carousel.locator(".motion-slide").nth(0)).toHaveAttribute("data-active", "true");
  await expect(carousel.locator("[data-carousel-dot]").nth(0)).toHaveAttribute("aria-current", "true");

  await carousel.locator("[data-carousel-next]").click();
  await expect(carousel.locator(".motion-slide").nth(1)).toHaveAttribute("data-active", "true");
  await expect(carousel.locator("[data-carousel-dot]").nth(1)).toHaveAttribute("aria-current", "true");
});

test("reduced-motion preference disables automatic carousel rotation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/home-insurance/", { waitUntil: "networkidle" });

  const carousel = page.locator("[data-insurance-carousel]");
  const initialCurrent = await carousel.locator("[data-carousel-dot][aria-current=\"true\"]").getAttribute("data-slide-id");
  await page.waitForTimeout(7000);
  await expect(carousel.locator("[data-carousel-dot][aria-current=\"true\"]")).toHaveAttribute("data-slide-id", initialCurrent || "");
  expect(await carousel.locator("video").first().evaluate((video) => video.paused)).toBe(true);
});

test("homepage Business slide uses the premium consultation video and keeps playing on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/", { waitUntil: "networkidle" });

  const carousel = page.locator("[data-insurance-carousel]");
  await carousel.locator('[data-carousel-chip][data-slide-id="home-business"]').click();
  await expect(carousel).toHaveAttribute("data-active-slide", "home-business");

  const activeVideo = carousel.locator('.motion-slide[data-active="true"] .motion-video');
  await expect(activeVideo).toHaveAttribute("data-mp4", "/media/premium-carousel/home/business-office-consultation.mp4");
  await expect(page.locator('[data-mp4*="storefront-open-sign"]')).toHaveCount(0);
  await expect.poll(() => activeVideo.evaluate((video) => video.paused), { timeout: 8000 }).toBe(false);

  await carousel.hover();
  await expect(carousel).toHaveAttribute("data-paused", "true");
  await expect.poll(() => activeVideo.evaluate((video) => video.paused), { timeout: 3000 }).toBe(false);
});

test("Save-Data keeps carousel video paused and unhydrated", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "connection", {
      configurable: true,
      get: () => ({ saveData: true })
    });
  });
  await page.goto("/auto-insurance/", { waitUntil: "networkidle" });

  const carousel = page.locator("[data-insurance-carousel]");
  await expect(carousel.locator("video[src]")).toHaveCount(0);
  expect(await carousel.locator("video").first().evaluate((video) => video.paused)).toBe(true);
});

test("service carousel media requests remain self-hosted", async ({ page }) => {
  const loadedMediaUrls = [];
  page.on("request", (request) => {
    if (["image", "media"].includes(request.resourceType())) loadedMediaUrls.push(request.url());
  });

  for (const pageInfo of pages.filter((pageInfo) => pageInfo.service)) {
    await page.goto(pageInfo.path, { waitUntil: "networkidle" });
    await expect(page.locator("[data-insurance-carousel]")).toHaveAttribute("data-active-slide", /.+/);
  }

  const localOrigin = new URL(page.url()).origin;
  const remoteMediaUrls = loadedMediaUrls.filter((url) => {
    const parsed = new URL(url);
    return parsed.protocol !== "data:" && parsed.origin !== localOrigin;
  });
  expect(remoteMediaUrls).toEqual([]);
});

for (const pageInfo of pages) {
  test(`${pageInfo.name} has clean metadata, schema, and runtime`, async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];
    const failedRequests = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => {
      const errorText = request.failure()?.errorText || "failed";
      if (request.resourceType() === "media" && errorText.includes("ERR_ABORTED")) return;
      failedRequests.push(`${request.method()} ${request.url()}: ${errorText}`);
    });

    const response = await page.goto(pageInfo.path, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.length || 0).toBeGreaterThanOrEqual(80);
    expect(description?.length || 0).toBeLessThanOrEqual(250);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`^https://yourfamilyfirstinsurance3\\.com${pageInfo.path === "/" ? "/$" : pageInfo.path}`));
    const schemaText = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");
    if (await page.locator(".faq-list details").count()) {
      const faq = await page.evaluate(() => {
        const schema = [...document.querySelectorAll('script[type="application/ld+json"]')]
          .map((script) => JSON.parse(script.textContent)).find((item) => item["@type"] === "FAQPage");
        const text = (html) => {
          const element = document.createElement("div");
          element.innerHTML = html;
          return element.textContent.replace(/\s+/g, " ").trim();
        };
        return {
          locale: schema.inLanguage,
          schemaRows: schema.mainEntity.map((item) => ({
            question: item.name, answer: text(item.acceptedAnswer.text), id: new URL(item["@id"]).hash.slice(1),
            links: [...new DOMParser().parseFromString(item.acceptedAnswer.text, "text/html").querySelectorAll("a")]
              .map((link) => [link.textContent, link.getAttribute("href")])
          })),
          visibleRows: [...document.querySelectorAll(".faq-list details")].map((item) => ({
            question: item.querySelector("summary").textContent,
            answer: text(item.querySelector(".faq-answer").innerHTML), id: item.querySelector("summary").id,
            links: [...item.querySelectorAll("a")].map((link) => [link.textContent, link.getAttribute("href")])
          }))
        };
      });
      expect(faq.locale).toBe(pageInfo.spanish ? "es-US" : "en-US");
      expect(faq.schemaRows).toEqual(faq.visibleRows);
      expect(new Set(faq.visibleRows.map((row) => row.question)).size).toBe(faq.visibleRows.length);
    }
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
  });
}

test("expanded FAQs have no serious accessibility violations", async ({ page }) => {
  for (const route of ["/", "/es/", "/home-insurance/", "/es/seguro-de-vivienda/"]) {
    await page.setViewportSize({ width: 390, height: 920 });
    await page.goto(route, { waitUntil: "networkidle" });
    for (const summary of await page.locator(".faq summary").all()) await summary.click();
    const results = await new AxeBuilder({ page }).include(".faq").analyze();
    expect(results.violations.filter((item) => ["serious", "critical"].includes(item.impact)), route).toEqual([]);
  }
});

test("FAQ next steps have valid destinations and localized internal links", async ({ page, request }) => {
  test.setTimeout(90_000);
  const internalLinks = new Set();
  for (const pageInfo of pages.filter((item) => !["privacy", "terms", "privacy-es", "terms-es"].includes(item.name))) {
    await page.goto(pageInfo.path, { waitUntil: "domcontentloaded" });
    const links = await page.locator(".faq-links a").evaluateAll((items) => items.map((item) => item.getAttribute("href")));
    expect(links.length).toBeGreaterThan(0);
    for (const href of links) {
      if (href.startsWith("/")) {
        expect(href.startsWith("/es/")).toBe(Boolean(pageInfo.spanish));
        internalLinks.add(href);
      } else {
        expect(href).toMatch(/^https:\/\/|^tel:13059108850$/);
      }
    }
  }
  for (const href of internalLinks) {
    const url = new URL(href, baseURL);
    const response = await request.get(url.pathname);
    expect(response.status(), href).toBe(200);
    if (url.hash) expect(await response.text(), href).toContain(`id="${url.hash.slice(1)}"`);
  }
});

for (const route of ["/", "/es/", "/home-insurance/", "/es/seguro-de-vivienda/"]) {
  test(`FAQ keyboard controls and expanded layout ${route}`, async ({ page }) => {
    test.setTimeout(60_000);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 920 });
      await page.goto(route, { waitUntil: "networkidle" });
      const details = page.locator(".faq-list details");
      const summary = details.first().locator("summary");
      await summary.focus();
      await page.keyboard.press("Enter");
      await expect(details.first()).toHaveAttribute("open", "");
      await page.keyboard.press("Space");
      await expect(details.first()).not.toHaveAttribute("open", "");
      for (const item of await details.all()) await item.locator("summary").click();
      const lastAnswer = details.last().locator(".faq-answer");
      await lastAnswer.scrollIntoViewIfNeeded();
      const geometry = await page.evaluate(() => {
        const rects = [...document.querySelectorAll(".faq details, .faq-answer, .faq-links a")]
          .map((item) => item.getBoundingClientRect());
        const bar = document.querySelector(".mobile-contact-bar")?.getBoundingClientRect();
        const last = [...document.querySelectorAll(".faq-answer")].at(-1).getBoundingClientRect();
        return {
          fits: rects.every((rect) => rect.left >= 0 && rect.right <= innerWidth + 1),
          overflow: document.documentElement.scrollWidth > innerWidth,
          lastBottom: last.bottom, barTop: bar?.height ? bar.top : innerHeight,
          targets: [...document.querySelectorAll(".faq summary, .faq-links a")].every((item) => item.getBoundingClientRect().height >= 44)
        };
      });
      expect(geometry.fits).toBe(true);
      expect(geometry.overflow).toBe(false);
      expect(geometry.targets).toBe(true);
      // Scroll offsets round to device pixels; DOM rectangles retain fractional pixels.
      expect(geometry.lastBottom).toBeLessThanOrEqual(geometry.barTop + 1);
    }
  });
}

test("all internal links resolve without a broken page", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")).filter(Boolean))]);
  for (const href of hrefs) {
    const response = await request.get(href.split("#")[0] || "/");
    expect(response.status(), `Broken internal link: ${href}`).toBeLessThan(400);
  }
});

test("service content remains specific to its insurance topic", async ({ page }) => {
  const rules = [
    ["/auto-insurance/", ["condo insurance", "flood insurance", "workers compensation", "health insurance"]],
    ["/home-insurance/", ["auto insurance", "renters insurance", "commercial insurance", "life insurance"]],
    ["/commercial-insurance/", ["homeowners insurance", "renters insurance", "life insurance"]],
    ["/life-insurance/", ["auto insurance", "homeowners insurance", "renters insurance", "commercial insurance"]],
    ["/renters-insurance/", ["auto insurance", "homeowners insurance", "commercial insurance", "life insurance"]]
  ];
  for (const [route, disallowed] of rules) {
    await page.goto(route, { waitUntil: "networkidle" });
    const topicContent = (await page.locator(".service-detail, .search-intent-panel, .service-cta, .faq").allTextContents()).join(" ").toLowerCase();
    for (const phrase of disallowed) expect(topicContent).not.toContain(phrase);
  }
});

test("unknown routes return a real noindex 404 page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist/", { waitUntil: "networkidle" });
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page Not Found");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow, noarchive");
});

test("production host redirects to canonical HTTPS and emits HSTS", async ({ request }) => {
  const redirect = await request.get("/", {
    headers: { Host: "www.yourfamilyfirstinsurance3.com", "X-Forwarded-Proto": "http" },
    maxRedirects: 0
  });
  expect(redirect.status()).toBe(301);
  expect(redirect.headers().location).toBe("https://yourfamilyfirstinsurance3.com/");

  const secure = await request.get("/", {
    headers: { Host: "yourfamilyfirstinsurance3.com", "X-Forwarded-Proto": "https" }
  });
  expect(secure.status()).toBe(200);
  expect(secure.headers()["strict-transport-security"]).toBe("max-age=31536000");
  expect(secure.headers()["cross-origin-opener-policy"]).toBe("same-origin");
  expect(secure.headers()["content-security-policy"]).toContain("https://www.googletagmanager.com");
  expect(secure.headers()["content-security-policy"]).toContain("https://tagmanager.google.com");
  expect(secure.headers()["content-security-policy"]).toContain("https://fonts.googleapis.com");
  expect(secure.headers()["content-security-policy"]).toContain("frame-src https://www.googletagmanager.com");
  expect(secure.headers()["content-security-policy"]).toContain("connect-src 'self' https://google.com https://www.google.com");
  expect(secure.headers()["content-security-policy"]).toContain("https://analytics.google.com");
  expect(secure.headers()["content-security-policy"]).toContain("https://stats.g.doubleclick.net https://ad.doubleclick.net");
  expect(secure.headers()["content-security-policy"]).not.toContain("script-src 'self' 'unsafe-inline'");

  const gtmPreview = await request.get("/?gtm_debug=test", {
    headers: { Host: "yourfamilyfirstinsurance3.com", "X-Forwarded-Proto": "https" }
  });
  expect(gtmPreview.status()).toBe(200);
  expect(gtmPreview.headers()["cross-origin-opener-policy"]).toBe("same-origin-allow-popups");
});

test("every language pair returns 200 with reciprocal SEO signals", async ({ page, request }) => {
  test.setTimeout(90000);
  for (const [englishPath, spanishPath] of languagePairs) {
    expect((await request.get(englishPath)).status()).toBe(200);
    expect((await request.get(spanishPath)).status()).toBe(200);

    await page.goto(englishPath, { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("lang", "en-US");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://yourfamilyfirstinsurance3.com${englishPath}`);
    await expect(page.locator('link[rel="alternate"][hreflang="es-US"]')).toHaveAttribute("href", `https://yourfamilyfirstinsurance3.com${spanishPath}`);
    await expect(page.locator('.language-switcher-desktop a[lang="es"]')).toHaveAttribute("href", spanishPath);

    await page.goto(spanishPath, { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("lang", "es-US");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://yourfamilyfirstinsurance3.com${spanishPath}`);
    await expect(page.locator('link[rel="alternate"][hreflang="en-US"]')).toHaveAttribute("href", `https://yourfamilyfirstinsurance3.com${englishPath}`);
    await expect(page.locator('.language-switcher-desktop a[lang="en"]')).toHaveAttribute("href", englishPath);
  }
});

test("language selector works with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 920 } });
  const page = await context.newPage();
  await page.goto(`${baseURL}/auto-insurance/`);
  await page.locator('.language-switcher-mobile a[lang="es"]').click();
  await expect(page).toHaveURL(/\/es\/seguro-de-auto\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es-US");
  await page.locator('.language-switcher-mobile a[lang="en"]').click();
  await expect(page).toHaveURL(/\/auto-insurance\/$/);
  await context.close();
});

test("language selector stays compact on mobile and uses full names on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 920 });
  await page.goto("/es/", { waitUntil: "networkidle" });
  await expect(page.locator(".language-switcher-mobile .language-short").first()).toBeVisible();
  await expect(page.locator(".language-switcher-mobile .language-long").first()).toBeHidden();
  await expect(page.locator('.language-switcher-mobile a[lang="en"]')).toHaveAccessibleName("EN - English");
  await expect(page.locator('.language-switcher-mobile a[lang="es"]')).toHaveAccessibleName("ES - Spanish");

  await page.setViewportSize({ width: 1440, height: 1100 });
  await expect(page.locator(".language-switcher-desktop .language-short").first()).toBeHidden();
  const desktopLabels = page.locator(".language-switcher-desktop .language-long");
  await expect(desktopLabels.nth(0)).toBeVisible();
  await expect(desktopLabels.nth(0)).toHaveText("English");
  await expect(desktopLabels.nth(1)).toBeVisible();
  await expect(desktopLabels.nth(1)).toHaveText("Spanish");
});

test("Spanish homepage trust links remain in the Spanish route", async ({ page }) => {
  await page.goto("/es/", { waitUntil: "domcontentloaded" });
  await expect(page.locator('.trust-ticker a[href="/es/ayuda-para-clientes/"]')).toHaveCount(1);
  await expect(page.locator('.trust-ticker a[href^="/#"]')).toHaveCount(0);
});

test("Spanish homepage schema and trust copy stay localized", async ({ page }) => {
  await page.goto("/es/", { waitUntil: "domcontentloaded" });
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const itemList = schemas.map((text) => JSON.parse(text)).find((schema) => schema["@type"] === "ItemList");
  expect(itemList?.itemListElement?.every((item) => item.url.startsWith("https://yourfamilyfirstinsurance3.com/es/"))).toBe(true);
  await expect(page.locator("#seguros-en-espanol")).toContainText("Hablamos español");
  await expect(page.locator(".trust-strip, .why-panel, .franchise-panel, .process-section, .final-cta")).toHaveCount(0);
});

test("touch-only devices do not enable desktop hover motion", async ({ browser }) => {
  test.setTimeout(60000);
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 920 } });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`, { waitUntil: "networkidle" });
  expect(await page.evaluate(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches)).toBe(false);
  const card = page.locator(".coverage-card").first();
  await card.scrollIntoViewIfNeeded();
  const before = await card.evaluate((node) => ({
    glareX: node.style.getPropertyValue("--glare-x"),
    particles: document.querySelectorAll(".liquid-particle").length
  }));
  await card.dispatchEvent("pointerenter", { clientX: 20, clientY: 20, pointerType: "touch" });
  await card.dispatchEvent("pointermove", { clientX: 20, clientY: 20, pointerType: "touch" });
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const after = await card.evaluate((node) => ({
    glareX: node.style.getPropertyValue("--glare-x"),
    particles: document.querySelectorAll(".liquid-particle").length
  }));
  expect(after).toEqual(before);
  await context.close();
});

test("keyboard focus is visible on language and quote controls", async ({ page }) => {
  await page.goto("/es/", { waitUntil: "networkidle" });
  const languageLink = page.locator('.language-switcher-desktop a[lang="en"]');
  await languageLink.focus();
  expect(await languageLink.evaluate((node) => getComputedStyle(node).outlineStyle)).not.toBe("none");
  const quoteLink = page.getByRole("link", { name: /Solicitar cotización/i }).first();
  await quoteLink.focus();
  expect(await quoteLink.evaluate((node) => getComputedStyle(node).outlineStyle)).not.toBe("none");
});

test("Spanish unknown routes return the localized noindex 404", async ({ page }) => {
  const response = await page.goto("/es/pagina-inexistente/", { waitUntil: "networkidle" });
  expect(response?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "es-US");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página no encontrada");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow, noarchive");
});

test("homepage advertises truthful agent discovery resources", async ({ request }) => {
  const homepage = await request.get("/", { headers: { Accept: "text/html" } });
  expect(homepage.status()).toBe(200);
  const link = homepage.headers().link || "";
  expect(link).toContain('rel="api-catalog"');
  expect(link).toContain('rel="service-desc"');
  expect(link).toContain('rel="service-doc"');
  expect(homepage.headers()["content-signal"]).toBe("search=yes, ai-input=yes, ai-train=no");

  const catalog = await request.get("/.well-known/api-catalog");
  expect(catalog.status()).toBe(200);
  expect(catalog.headers()["content-type"]).toContain("application/linkset+json");
  const catalogBody = await catalog.json();
  expect(catalogBody.linkset[0].anchor).toBe("https://yourfamilyfirstinsurance3.com/api/site.json");
  expect(catalogBody.linkset[0]["service-desc"][0].href).toContain("/.well-known/openapi.json");

  const metadata = await request.get("/api/site.json");
  expect(metadata.status()).toBe(200);
  const metadataBody = await metadata.json();
  expect(metadataBody.name).toBe("Your Family First Insurance Office #3");
  expect(metadataBody.contact.phone).toBe("305-910-8850");
  expect(metadataBody.quote_handoff.requires_user_confirmation).toBe(true);
});

test("homepage exposes complete social image metadata and an optimized logo preload", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "974");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "732");
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", /Office #3 family and office team in Miami/);
  await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute("content", /Office #3 family and office team in Miami/);
  await expect(page.locator('link[rel="preload"][as="image"][href$="yffi3-official-franchise-logo-240.webp"]')).toHaveCount(1);
});

test("agents can negotiate Markdown while browsers keep HTML", async ({ request }) => {
  const markdown = await request.get("/", { headers: { Accept: "text/markdown" } });
  expect(markdown.status()).toBe(200);
  expect(markdown.headers()["content-type"]).toContain("text/markdown");
  expect(markdown.headers().vary).toContain("Accept");
  expect(Number(markdown.headers()["x-markdown-tokens"])).toBeGreaterThan(100);
  expect(await markdown.text()).toContain("# Insurance in Miami");

  const html = await request.get("/", { headers: { Accept: "text/html" } });
  expect(html.headers()["content-type"]).toContain("text/html");
  expect((await html.text()).toLowerCase()).toContain("<!doctype html>");
});

test("agent skill digest is valid and nonexistent auth services stay undiscoverable", async ({ request }) => {
  const indexResponse = await request.get("/.well-known/agent-skills/index.json");
  expect(indexResponse.status()).toBe(200);
  const index = await indexResponse.json();
  expect(index.$schema).toBe("https://schemas.agentskills.io/discovery/0.2.0/schema.json");
  expect(index.skills).toHaveLength(1);
  expect(index.skills[0].digest).toMatch(/^sha256:[a-f0-9]{64}$/);
  expect((await request.get("/auth.md")).status()).toBe(200);

  for (const unavailable of [
    "/.well-known/openid-configuration",
    "/.well-known/oauth-authorization-server",
    "/.well-known/oauth-protected-resource"
  ]) {
    expect((await request.get(unavailable, { headers: { Accept: "application/json" } })).status()).toBe(404);
  }
  expect((await request.get("/.well-known/mcp/server-card.json", { headers: { Accept: "application/json" } })).status()).toBe(200);
});

test("WebMCP exposes only read-only public actions", async ({ page }) => {
  await page.addInitScript(() => {
    window.__yffi3RegisteredTools = [];
    Object.defineProperty(Document.prototype, "modelContext", {
      configurable: true,
      get() {
        return {
          registerTool(tool) {
            window.__yffi3RegisteredTools.push(tool);
            return Promise.resolve();
          }
        };
      }
    });
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect.poll(() => page.evaluate(() => window.__yffi3RegisteredTools.length)).toBe(3);
  const tools = await page.evaluate(() => window.__yffi3RegisteredTools.map((tool) => ({
    name: tool.name,
    readOnly: tool.annotations?.readOnlyHint,
    properties: Object.keys(tool.inputSchema?.properties || {})
  })));
  expect(tools.map((tool) => tool.name)).toEqual(["find_insurance_service", "get_office_contact", "get_quote_handoff"]);
  expect(tools.every((tool) => tool.readOnly === true)).toBe(true);
  expect(tools.flatMap((tool) => tool.properties)).not.toContain("ssn");
  expect(tools.flatMap((tool) => tool.properties)).not.toContain("email");
  const quoteHandoff = await page.evaluate(() => window.__yffi3RegisteredTools.find((tool) => tool.name === "get_quote_handoff").execute({ language: "es" }));
  expect(quoteHandoff.quote_help_url).toContain("/es/solicitar-cotizacion/");
  expect(quoteHandoff.requires_user_confirmation).toBe(true);
});


test("mobile Google reviews fit and expanded text stays in document flow", async ({ page }) => {
  test.setTimeout(90_000);
  for (const route of ["/", "/es/", "/about-office-3/", "/es/sobre-oficina-3/"]) {
    for (const width of [320, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(route, { waitUntil: "networkidle" });
      const panel = page.locator("#google-reviews");
      await panel.scrollIntoViewIfNeeded();
      await expect(panel).toHaveCSS("display", "grid");
      await page.locator(".review-dots [data-review-dot='1']").click();
      const card = page.locator(".real-review-card.is-active");
      await card.locator("details").first().locator("summary").click();
      await expect(card.locator("details").first()).toHaveAttribute("open", "");
      await expect(card.locator(".real-review-excerpt")).toBeHidden();
      const fits = await panel.evaluate((element) => {
        const card = element.querySelector(".real-review-card.is-active");
        const controls = element.querySelector(".review-carousel-controls");
        const box = card.getBoundingClientRect();
        return {
          page: document.documentElement.scrollWidth <= innerWidth + 1,
          panel: element.scrollWidth <= element.clientWidth + 1,
          card: card.scrollHeight <= card.clientHeight + 1,
          inside: box.left >= 0 && box.right <= innerWidth + 1,
          controls: controls.getBoundingClientRect().top >= box.bottom - 1
        };
      });
      expect(fits).toEqual({ page: true, panel: true, card: true, inside: true, controls: true });
      await card.locator(".review-source-link").scrollIntoViewIfNeeded();
      await expect(card.locator(".review-source-link")).toBeInViewport();
    }
  }
});


for (const [route, autoPath, commercialPath, spanish] of [
  ["/", "/auto-insurance/", "/commercial-insurance/", false],
  ["/es/", "/es/seguro-de-auto/", "/es/seguro-comercial/", true]
]) {
  test(`mobile service selection and quote routing work in ${spanish ? "Spanish" : "English"}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.route("https://secure.consumerratequotes.com/**", route => route.fulfill({ body: "<title>Quote form</title>" }));
    await page.goto(route, { waitUntil: "networkidle" });
    const bar = page.locator(".mobile-contact-bar");
    await expect(bar).toBeVisible();
    await expect(bar.locator("a").last()).toHaveAttribute("href", quoteDestination);
    await page.locator(`.coverage-card[href="${autoPath}"]`).click();
    await expect(page).toHaveURL(new RegExp(autoPath));
    await expect(page.locator('.motion-slide[data-active="true"] .motion-actions a')).toHaveAttribute("href", quoteDestination);
    await page.locator(".mobile-contact-bar a").last().click();
    await expect(page).toHaveURL(quoteDestination);
    await page.goto(commercialPath, { waitUntil: "networkidle" });
    await expect(page.locator(".hero .cta-row a").first()).toHaveAttribute("href", /^tel:/);
    await expect(bar.locator("a").first()).toHaveAttribute("href", "#coverage-details");
    await expect(bar.locator("a").last()).toHaveAttribute("href", /^tel:/);
  });
}

test("a selected review stays available while the customer reads it", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator(".review-dots [data-review-dot='1']").click();
  await page.evaluate(() => document.activeElement?.blur());
  await page.mouse.move(4, 4);
  await page.waitForTimeout(8500);
  await expect(page.locator('[data-review-card="1"]')).toHaveClass(/is-active/);
});


for (const route of ["/", "/es/", "/auto-insurance/", "/es/seguro-de-auto/", "/get-a-quote/", "/es/solicitar-cotizacion/"]) {
  test(`responsive media and section geometry ${route}`, async ({ page }) => {
    test.setTimeout(90_000);
    for (const width of [320, 390, 430, 600, 768, 834, 1024, 1040, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1100 });
      await page.goto(route, { waitUntil: "networkidle" });
      const geometry = await page.evaluate(() => {
        const rect = selector => document.querySelector(selector)?.getBoundingClientRect();
        const center = box => box.left + box.width / 2;
        const media = rect('.motion-slide[data-active="true"] .motion-media-link');
        const slide = rect('.motion-slide[data-active="true"]');
        const showcase = rect('.motion-showcase');
        const arrow = rect('.carousel-prev');
        const actions = rect('.header-actions');
        const sections = [...document.querySelectorAll('main > section')].map(node => {
          const box = node.getBoundingClientRect();
          return { name: node.className, center: Math.abs(center(box) - innerWidth / 2), left: box.left, right: box.right };
        });
        const panels = [...document.querySelectorAll('.quote-panel > *, .about-panel > *, .review-panel > *')].map(node => {
          const box = node.getBoundingClientRect();
          const parent = node.parentElement.getBoundingClientRect();
          return { name: node.className, fits: box.left >= parent.left - 2 && box.right <= parent.right + 2 };
        });
        return {
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          media: media ? { widthDifference: Math.abs(media.width - slide.width), centerDifference: Math.abs(center(media) - center(slide)), aspect: media.width / media.height, arrowDifference: Math.abs(arrow.top + arrow.height / 2 - (media.top + media.height / 2)), showcaseCenter: Math.abs(center(showcase) - innerWidth / 2) } : null,
          headerFits: !actions.width || (actions.left >= 0 && actions.right <= innerWidth),
          sections, panels
        };
      });
      const context = `${route} at ${width}px: ${JSON.stringify(geometry)}`;
      expect(geometry.overflow, context).toBe(false);
      expect(geometry.headerFits, context).toBe(true);
      for (const section of geometry.sections) {
        expect(section.center, context).toBeLessThanOrEqual(2);
        expect(section.left, context).toBeGreaterThanOrEqual(-2);
        expect(section.right, context).toBeLessThanOrEqual(width + 2);
      }
      expect(geometry.panels.every(panel => panel.fits), context).toBe(true);
      if (geometry.media) {
        expect(geometry.media.widthDifference, context).toBeLessThanOrEqual(2);
        expect(geometry.media.centerDifference, context).toBeLessThanOrEqual(2);
        expect(geometry.media.aspect, context).toBeCloseTo(16 / 9, 1);
        expect(geometry.media.arrowDifference, context).toBeLessThanOrEqual(4);
        if (width < 1024) expect(geometry.media.showcaseCenter, context).toBeLessThanOrEqual(2);
      }
    }
  });
}


test("the selected video stays centered through resizing and automatic rotation", async ({ page }) => {
  test.setTimeout(40_000);
  await page.setViewportSize({ width: 1280, height: 1100 });
  await page.goto("/", { waitUntil: "networkidle" });
  const carousel = page.locator("[data-insurance-carousel]");
  await expect(carousel).toHaveAttribute("data-active-slide", "home-homeowners", { timeout: 9000 });
  const centerOffset = () => page.evaluate(() => {
    const carousel = document.querySelector("[data-insurance-carousel]");
    const slide = carousel.querySelector('.motion-slide[data-active="true"]').getBoundingClientRect();
    const track = carousel.querySelector('.carousel-track').getBoundingClientRect();
    return Math.abs(slide.left + slide.width / 2 - (track.left + track.width / 2));
  });
  await expect.poll(centerOffset).toBeLessThanOrEqual(2);
  await page.locator('[data-carousel-chip][data-slide-id="home-business"]').click();
  await expect.poll(centerOffset).toBeLessThanOrEqual(2);
  for (const width of [834, 390, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1100 });
    await expect.poll(centerOffset).toBeLessThanOrEqual(2);
    await expect(carousel).toHaveAttribute("data-active-slide", "home-business");
  }
  const video = page.locator('.motion-slide[data-active="true"] .motion-video');
  await expect.poll(() => video.evaluate(node => !node.paused && node.readyState >= 2)).toBe(true);
});


test("motion controls pause videos persistently and resume in both languages", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1440, height: 1100 });
  for (const path of ["/", "/es/"]) {
    await page.goto(path, { waitUntil: "networkidle" });
    const carousel = page.locator("[data-insurance-carousel]");
    const control = carousel.locator("[data-carousel-motion]");
    const video = carousel.locator('.motion-slide[data-active="true"] .motion-video');
    await expect.poll(() => video.evaluate((node) => !node.paused && node.readyState >= 2)).toBe(true);
    await control.click();
    await expect(control).toHaveAttribute("aria-pressed", "true");
    await expect(control).toHaveText(path === "/" ? "Resume motion" : "Reanudar animación");
    await page.mouse.move(0, 0);
    await expect.poll(() => video.evaluate((node) => node.paused)).toBe(true);
    await control.press("Enter");
    await expect(control).toHaveAttribute("aria-pressed", "false");
    await expect.poll(() => video.evaluate((node) => !node.paused)).toBe(true);
  }
});

test("business search markup omits unverified office hours and franchise identity links", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const agency = schemas.map((text) => JSON.parse(text)).flatMap((schema) => schema["@graph"] || [schema]).find((schema) => schema["@type"] === "InsuranceAgency");
  expect(agency.openingHoursSpecification).toBeUndefined();
  expect(agency.sameAs).toEqual([agency.hasMap]);
  const preload = await page.locator('link[rel="preload"][as="image"]').all().then(async (links) => Promise.all(links.map(link => link.getAttribute("href"))));
  const poster = await page.locator('.motion-slide[data-active="true"] .motion-poster').getAttribute("src");
  expect(preload).toContain(poster);
});


test("mobile visitors download only the active optimized carousel poster", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const posters = new Set();
  page.on("request", (request) => {
    if (/\/media\/.*-poster\./.test(request.url())) posters.add(new URL(request.url()).pathname);
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect([...posters]).toEqual(["/media/premium-carousel/home/miami-traffic-skyline-poster.webp"]);
  await page.locator('[data-carousel-chip][data-slide-id="home-homeowners"]').click();
  await expect.poll(() => posters.size).toBe(2);
  expect([...posters]).toContain("/media/premium-carousel/home/luxury-home-aerial-poster.webp");
});


test("reviewable growth preview at desktop and phone sizes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.locator("h1")).toBeVisible();
  await page.screenshot({ path: "/tmp/yffi-growth-desktop.png", fullPage: false });
  await page.setViewportSize({ width: 390, height: 920 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.locator('.review-dots [data-review-dot="1"]').click();
  const card = page.locator(".real-review-card.is-active");
  await card.locator("details").first().locator("summary").click();
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator("details").first()).toHaveAttribute("open", "");
  await card.locator("details").first().locator("summary").click();
  await page.locator("#google-reviews").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "/tmp/yffi-growth-mobile-reviews.png", fullPage: false });
});


for (const width of [390, 768, 1096, 1440]) {
  test(`visible homepage videos autoplay and advance at ${width}px`, async ({ page }) => {
    test.setTimeout(90_000);
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(width === 768 ? "/es/" : "/", { waitUntil: "domcontentloaded" });
    const carousel = page.locator("[data-insurance-carousel]");
    await carousel.locator(".carousel-stage").scrollIntoViewIfNeeded();
    const first = carousel.locator('.motion-slide[data-active="true"] video');
    await expect.poll(() => first.evaluate(v => !v.paused && v.readyState >= 2 && v.currentTime > 0.25), { timeout: 15_000 }).toBe(true);
    for (const chip of await carousel.locator("[data-carousel-chip]").all()) {
      await chip.click();
      await carousel.locator(".carousel-stage").scrollIntoViewIfNeeded();
      const video = carousel.locator('.motion-slide[data-active="true"] video');
      await expect.poll(() => video.evaluate(v => !v.paused && v.readyState >= 2 && v.currentTime > 0.25), { timeout: 15_000 }).toBe(true);
      await expect(video).toHaveClass(/is-ready/);
      expect(await carousel.locator('.motion-slide[data-active="false"] video').evaluateAll(videos => videos.every(v => v.paused))).toBe(true);
    }
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect.poll(() => carousel.locator("video").evaluateAll(videos => videos.every(v => v.paused))).toBe(true);
    await carousel.locator(".carousel-stage").scrollIntoViewIfNeeded();
    await expect.poll(() => carousel.locator('.motion-slide[data-active="true"] video').evaluate(v => !v.paused && v.readyState >= 2)).toBe(true);
    expect(errors).toEqual([]);
    if (width === 1096) await page.screenshot({ path: "/tmp/yffi-video-autoplay.png" });
  });
}

for (const entry of pages.filter(entry => entry.service)) {
  test(`all ${entry.name} videos play on selection`, async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: entry.spanish ? 390 : 1440, height: 1000 });
    await page.goto(entry.path, { waitUntil: "domcontentloaded" });
    const carousel = page.locator("[data-insurance-carousel]");
    await carousel.locator(".carousel-stage").scrollIntoViewIfNeeded();
    await expect.poll(() => carousel.locator('.motion-slide[data-active="true"] video').evaluate(v => !v.paused && v.readyState >= 2 && v.currentTime > 0.25), { timeout: 15_000 }).toBe(true);
    for (const chip of await carousel.locator("[data-carousel-chip]").all()) {
      await chip.click();
      await carousel.locator(".carousel-stage").scrollIntoViewIfNeeded();
      const video = carousel.locator('.motion-slide[data-active="true"] video');
      await expect.poll(() => video.evaluate(v => !v.paused && v.readyState >= 2 && v.currentTime > 0.25), { timeout: 15_000 }).toBe(true);
      expect(await video.evaluate(v => v.error)).toBeNull();
    }
  });
}
