import fs from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const screenshotDir = path.resolve("playwright-screenshots");
const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4175";
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
  { name: "home-es", path: "/es/", spanish: true },
  { name: "quote-es", path: "/es/solicitar-cotizacion/", spanish: true },
  { name: "auto-es", path: "/es/seguro-de-auto/", spanish: true, service: true },
  { name: "homeowners-es", path: "/es/seguro-de-vivienda/", spanish: true, service: true },
  { name: "commercial-es", path: "/es/seguro-comercial/", spanish: true, service: true },
  { name: "life-es", path: "/es/seguro-de-vida/", spanish: true, service: true },
  { name: "renters-es", path: "/es/seguro-de-inquilinos/", spanish: true, service: true },
  { name: "about-es", path: "/es/sobre-oficina-3/", spanish: true },
  { name: "privacy-es", path: "/es/privacidad/", spanish: true },
  { name: "terms-es", path: "/es/terminos/", spanish: true }
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
  ["/terms/", "/es/terminos/"]
];

test.beforeAll(() => {
  fs.mkdirSync(screenshotDir, { recursive: true });
});

test.beforeEach(async ({ page }) => {
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
        const originalFranchiseLogo = page.locator(pageInfo.spanish ? 'img[alt*="Logotipo familiar original"]' : 'img[alt*="Original Your Family First Insurance"]').first();
        await originalFranchiseLogo.scrollIntoViewIfNeeded();
        await expect(originalFranchiseLogo).toBeVisible();
        await expect(page.locator(".trust-ticker")).toBeVisible();
      }

      if (["quote", "quote-es"].includes(pageInfo.name)) {
        const quoteForm = page.locator('[data-quote-form]');
        await quoteForm.scrollIntoViewIfNeeded();
        await expect(quoteForm).toBeVisible();
        await expect(page.locator('[name="companyWebsite"]')).toHaveCount(1);
        await expect(page.locator('label:has([name="phone"])')).toBeVisible();
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
        const searchIntentPanel = page.locator(".search-intent-panel");
        await searchIntentPanel.scrollIntoViewIfNeeded();
        await expect(searchIntentPanel).toBeVisible();
        await expect(page.locator(".intent-card")).toHaveCount(4);
        expect(await page.locator(".faq-list details").count()).toBeGreaterThanOrEqual(8);
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

  await page.locator(".search-intent-panel").scrollIntoViewIfNeeded();
  await expect(page.locator(".search-intent-panel h2")).toContainText("Homeowners Insurance");
  await expect(page.locator(".intent-card").first()).toBeVisible();

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
    expect(before.sections[index].top).toBeGreaterThanOrEqual(before.sections[index - 1].bottom - 1);
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

test("mobile carousel engagement does not move the page and enables its video", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 920 });
  await page.goto("/", { waitUntil: "networkidle" });
  const carousel = page.locator("[data-insurance-carousel]");
  const nextControl = carousel.locator("[data-carousel-next]");
  await nextControl.scrollIntoViewIfNeeded();
  await expect(carousel.locator(".motion-video source")).toHaveCount(0);
  const beforeY = await page.evaluate(() => window.scrollY);

  await nextControl.click();

  await expect(carousel).toHaveAttribute("data-active-slide", "home-homeowners");
  await expect(carousel.locator(".motion-video source")).toHaveCount(1);
  const afterY = await page.evaluate(() => window.scrollY);
  expect(Math.abs(afterY - beforeY)).toBeLessThanOrEqual(1);
});

test("quote form validates safe contact fields", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 920 });
  await page.route("https://secure.ConsumerRateQuotes.com/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<!doctype html><title>Secure Quote</title><h1>Secure Consumer Quote</h1>"
    });
  });
  await page.goto("/get-a-quote/", { waitUntil: "networkidle" });

  await page.locator("[data-quote-form]").scrollIntoViewIfNeeded();
  await page.locator('[name="name"]').fill("Ariel Test");
  await page.locator('[name="phone"]').fill("3059108850");
  await page.locator('[name="email"]').fill("ariel@example.com");
  await page.locator('[name="insuranceType"]').selectOption({ label: "Auto" });
  await page.locator('[name="zip"]').fill("33174");
  await page.locator('[name="bestTime"]').selectOption({ label: "Morning" });
  await page.locator('[name="notes"]').fill("I want to compare auto coverage options.");
  await page.getByRole("button", { name: /Continue to Secure Quote Form/i }).click();

  await expect(page).toHaveURL(quoteDestination);
});

test("quote buttons and form route to the secure quote destination", async ({ page }) => {
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
  await expect(page.locator("[data-quote-form]")).toHaveAttribute("action", quoteDestination);
  await expect(page.locator("[data-quote-form]")).toHaveAttribute("data-quote-destination", quoteDestination);
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
  await page.evaluate(() => {
    window.dataLayer = [];
    document.addEventListener("submit", (event) => event.preventDefault(), true);
    document.querySelector("[data-quote-form]").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });

  const formEvents = await page.evaluate(() => window.dataLayer.filter((entry) => entry?.event === "form_submit"));
  expect(formEvents).toHaveLength(1);
  expect(Object.keys(formEvents[0]).sort()).toEqual(["cta_location", "event", "page_language", "page_path", "product_category"]);
  expect(formEvents[0]).toEqual({
    event: "form_submit",
    page_path: "/get-a-quote/",
    page_language: "en",
    product_category: "general",
    cta_location: "quote_form"
  });

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
    expect(Object.keys(event).sort()).toEqual(["cta_location", "event", "page_language", "page_path", "product_category"]);
    expect(JSON.stringify(event)).not.toMatch(/name|address|insurance_details|form_contents|3059108850|ariel@example\.com/i);
  }
});

test("header ticker contains trusted links and pauses on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/", { waitUntil: "networkidle" });

  const ticker = page.locator(".trust-ticker");
  await expect(ticker).toBeVisible();
  await expect(ticker.locator('a[href="/auto-insurance/"]').first()).toBeVisible();
  await expect(ticker.locator('a[href="/#general-liability-insurance"]').first()).toBeVisible();
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
    if (await page.locator(".faq-list details").count()) expect(schemaText).toContain("FAQPage");
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedRequests).toEqual([]);
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
  expect(redirect.status()).toBe(308);
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
  const localizedAnchors = page.locator('.trust-ticker a[href^="/es/#"]');
  await expect(localizedAnchors).toHaveCount(10);
  await expect(page.locator('.trust-ticker a[href^="/#"]')).toHaveCount(0);
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
  expect(await markdown.text()).toContain("# Florida Insurance Made Simple for Your Family");

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
