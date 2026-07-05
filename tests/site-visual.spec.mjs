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
        await expect(page.locator('img[alt*="Ariel Busutil"]').first()).toBeVisible();
        await expect(page.locator('img[alt*="Original Your Family First Insurance"]').first()).toBeVisible();
        await expect(page.locator(".trust-ticker")).toBeVisible();
      }

      if (pageInfo.name === "quote") {
        await expect(page.locator('[data-quote-form]')).toBeVisible();
        await expect(page.locator('[name="companyWebsite"]')).toHaveCount(1);
        await expect(page.locator('label:has([name="phone"])')).toBeVisible();
      }

      if (pageInfo.service) {
        await expect(page.locator(".service-gallery")).toBeVisible();
        await expect(page.locator(".service-motion-video")).toHaveCount(1);
        await expect(page.locator(".service-motion-video source")).toHaveAttribute("src", /service-.*-motion\.webm/);
        await expect(page.locator(".service-motion-gif")).toHaveAttribute("src", /service-.*-motion\.gif/);
        await expect(page.locator(".service-motion-gif")).toHaveAttribute("alt", /Animated .* insurance motion loop/i);
        await expect(page.locator(".service-slide")).toHaveCount(3);
        await expect(page.locator(".service-slide img")).toHaveCount(3);
        await expect(page.locator(".service-slide img").first()).toHaveAttribute("src", /service-.*-slide-1\.jpg/);
        await expect(page.locator(".service-gallery-dots span")).toHaveCount(4);
        await expect(page.locator(".search-intent-panel")).toBeVisible();
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

test("pages satisfy Bing SEO basics", async ({ page }) => {
  for (const pageInfo of pages) {
    await page.goto(pageInfo.path, { waitUntil: "networkidle" });
    const seo = await page.evaluate(() => ({
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute("content") || "",
      h1Count: document.querySelectorAll("h1").length,
      missingAlt: [...document.querySelectorAll("img")]
        .filter((img) => !img.hasAttribute("alt") || !img.getAttribute("alt")?.trim())
        .map((img) => img.outerHTML),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || ""
    }));
    expect(seo.title.length).toBeGreaterThan(10);
    expect(seo.metaDescription.length).toBeGreaterThan(60);
    expect(seo.h1Count).toBe(1);
    expect(seo.missingAlt).toEqual([]);
    expect(seo.canonical).toContain("https://yourfamilyfirstinsurance3.com");
  }
});

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

test("homepage mobile first viewport has no clipping or overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 920 });
  await page.goto("/", { waitUntil: "networkidle" });
  const metrics = await page.evaluate(() => {
    const header = document.querySelector(".site-header")?.getBoundingClientRect();
    const phone = document.querySelector(".mobile-call")?.getBoundingClientRect();
    const cta = document.querySelector(".hero .button.warm")?.getBoundingClientRect();
    return {
      overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      headerHeight: header?.height || 0,
      phoneWidth: phone?.width || 0,
      phoneRight: phone?.right || 0,
      ctaTop: cta?.top || 0,
      ctaBottom: cta?.bottom || 0
    };
  });
  expect(metrics.overflow).toBe(false);
  expect(metrics.headerHeight).toBeLessThan(170);
  expect(metrics.phoneWidth).toBeGreaterThan(118);
  expect(metrics.phoneRight).toBeLessThanOrEqual(390);
  expect(metrics.ctaTop).toBeGreaterThan(0);
  expect(metrics.ctaBottom).toBeLessThan(920);
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

test("backend-looking paths do not render public frontend pages", async ({ page }) => {
  for (const sourcePath of ["/package.json", "/server.js", "/DEPLOYMENT.md", "/yffi3-godaddy-upload.zip"]) {
    const response = await page.goto(sourcePath, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(404);
    const robots = response?.headers()["x-robots-tag"] || "";
    expect(robots).toContain("noindex");
    const body = await page.locator("body").innerText();
    expect(body).not.toContain("GoDaddy Beta Apps Deployment Guide");
    expect(body).not.toContain("express");
    expect(body).not.toContain('"scripts"');
  }
});
