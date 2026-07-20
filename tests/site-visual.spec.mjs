import fs from "node:fs";
import path from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const screenshotDir = path.resolve("playwright-screenshots");
const quoteDestination = "https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868";
const pages = [
  { name: "home", path: "/" },
  { name: "quote", path: "/get-a-quote/" },
  { name: "auto", path: "/auto-insurance/", service: true },
  { name: "homeowners", path: "/home-insurance/", service: true },
  { name: "commercial", path: "/commercial-insurance/", service: true },
  { name: "life", path: "/life-insurance/", service: true },
  { name: "renters", path: "/renters-insurance/", service: true }
];
const viewports = [
  { name: "mobile", width: 390, height: 920 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1100 }
];

test.beforeAll(() => {
  fs.mkdirSync(screenshotDir, { recursive: true });
});

for (const viewport of viewports) {
  for (const pageInfo of pages) {
    test(`${pageInfo.name} renders at ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(pageInfo.path, { waitUntil: "networkidle" });

      await expect(page.locator("header.site-header")).toBeVisible();
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('img[alt*="official franchise logo"], .brand-logo img').first()).toBeVisible();
      await expect(page.locator('#site-nav a[href="/home-insurance/"]')).toHaveText("Homeowners");
      await expect(page.locator('#site-nav a[href="/"]')).toHaveText("Home");

      const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
      expect(hasHorizontalOverflow).toBe(false);

      const logoBox = await page.locator(".brand-logo img").first().boundingBox();
      expect(logoBox?.width || 0).toBeGreaterThan(60);
      expect(logoBox?.height || 0).toBeGreaterThan(28);

      if (pageInfo.name === "home") {
        await expect(page.getByRole("link", { name: /Get My Free Quote/i }).first()).toBeVisible();
        await expect(page.locator('img[alt*="Real family and office photo"]').first()).toBeVisible();
        const principalAgentPhoto = page.locator('img[alt*="Ariel Busutil"]').first();
        await principalAgentPhoto.scrollIntoViewIfNeeded();
        await expect(principalAgentPhoto).toBeVisible();
        const originalFranchiseLogo = page.locator('img[alt*="Original Your Family First Insurance"]').first();
        await originalFranchiseLogo.scrollIntoViewIfNeeded();
        await expect(originalFranchiseLogo).toBeVisible();
        await expect(page.locator(".trust-ticker")).toBeVisible();
      }

      if (pageInfo.name === "quote") {
        const quoteForm = page.locator('[data-quote-form]');
        await quoteForm.scrollIntoViewIfNeeded();
        await expect(quoteForm).toBeVisible();
        await expect(page.locator('[name="companyWebsite"]')).toHaveCount(1);
        await expect(page.locator('label:has([name="phone"])')).toBeVisible();
      }

      if (pageInfo.service) {
        await expect(page.locator(".service-gallery")).toBeVisible();
        await expect(page.locator(".service-slide")).toHaveCount(4);
        await expect(page.locator(".service-slide video")).toHaveCount(1);
        await expect(page.locator(".service-slide img")).toHaveCount(3);
        await expect(page.locator(".service-slide video").first()).toHaveAttribute("poster", /\/assets\/yffi3\/media\/.*-poster\.webp/);
        await expect(page.locator(".service-slide img").first()).toHaveAttribute("src", /service-.*-slide-1\.jpg/);
        await expect(page.locator(".service-gallery")).toHaveAttribute("aria-roledescription", "carousel");
        await expect(page.locator(".service-gallery-dots button")).toHaveCount(4);
        await expect(page.locator("[data-carousel-prev]")).toBeVisible();
        await expect(page.locator("[data-carousel-next]")).toBeVisible();
        const searchIntentPanel = page.locator(".search-intent-panel");
        await searchIntentPanel.scrollIntoViewIfNeeded();
        await expect(searchIntentPanel).toBeVisible();
        await expect(page.locator(".intent-card")).toHaveCount(4);
        await expect(page.locator(".faq-list details")).toHaveCount(8);
      }

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
});

test("header ticker contains trusted links and pauses on hover", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/", { waitUntil: "networkidle" });

  const ticker = page.locator(".trust-ticker");
  await expect(ticker).toBeVisible();
  await expect(ticker.locator('a[href="/auto-insurance/"]').first()).toBeVisible();
  await expect(ticker.locator('a[href="/#flood-insurance"]').first()).toBeVisible();
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

  const carousel = page.locator("[data-service-carousel]");
  await expect(carousel).toHaveAttribute("data-ready", "true");
  await expect(carousel.locator("[data-carousel-slide]").nth(0)).toHaveAttribute("aria-hidden", "false");
  await expect(carousel.locator("[data-carousel-dot]").nth(0)).toHaveAttribute("aria-current", "true");

  await carousel.locator("[data-carousel-next]").click();
  await expect(carousel.locator("[data-carousel-slide]").nth(1)).toHaveAttribute("aria-hidden", "false");
  await expect(carousel.locator("[data-carousel-dot]").nth(1)).toHaveAttribute("aria-current", "true");

  const pause = carousel.locator("[data-carousel-toggle]");
  await pause.click();
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  await expect(carousel.locator("[data-carousel-status]")).toContainText("paused");
});

test("reduced-motion preference disables automatic carousel rotation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/home-insurance/", { waitUntil: "networkidle" });

  const carousel = page.locator("[data-service-carousel]");
  await expect(carousel.locator("[data-carousel-toggle]")).toBeHidden();
  const initialCurrent = await carousel.locator("[data-carousel-dot][aria-current=\"true\"]").getAttribute("data-carousel-dot");
  await page.waitForTimeout(7000);
  await expect(carousel.locator("[data-carousel-dot][aria-current=\"true\"]")).toHaveAttribute("data-carousel-dot", initialCurrent || "0");
});

test("Save-Data keeps carousel video paused and unhydrated", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "connection", {
      configurable: true,
      get: () => ({ saveData: true })
    });
  });
  await page.goto("/auto-insurance/", { waitUntil: "networkidle" });

  const carousel = page.locator("[data-service-carousel]");
  await expect(carousel.locator("[data-carousel-toggle]")).toBeHidden();
  await expect(carousel.locator("video source[src]")).toHaveCount(0);
  expect(await carousel.locator("video").evaluate((video) => video.paused)).toBe(true);
});

test("service carousel media requests remain self-hosted", async ({ page }) => {
  const loadedMediaUrls = [];
  page.on("request", (request) => {
    if (["image", "media"].includes(request.resourceType())) loadedMediaUrls.push(request.url());
  });

  for (const pageInfo of pages.filter((pageInfo) => pageInfo.service)) {
    await page.goto(pageInfo.path, { waitUntil: "networkidle" });
    await expect(page.locator("[data-service-carousel]")).toHaveAttribute("data-ready", "true");
  }

  const localOrigin = new URL(page.url()).origin;
  const remoteMediaUrls = loadedMediaUrls.filter((url) => {
    const parsed = new URL(url);
    return parsed.protocol !== "data:" && parsed.origin !== localOrigin;
  });
  expect(remoteMediaUrls).toEqual([]);
});
