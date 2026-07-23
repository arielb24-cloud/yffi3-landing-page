const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  siteNav.querySelectorAll("a").forEach((link, index) => {
    link.style.setProperty("--nav-delay", Math.min(index * 24, 160) + "ms");
  });
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.getAttribute("data-open") === "true";
    siteNav.setAttribute("data-open", String(!isOpen));
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
  });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("[data-reveal]");

if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  const cursorOrb = document.createElement("span");
  cursorOrb.className = "cursor-orb";
  cursorOrb.setAttribute("aria-hidden", "true");
  document.body.append(cursorOrb);

  let cursorFrame = 0;
  let cursorX = -80;
  let cursorY = -80;
  const syncCursor = () => {
    cursorFrame = 0;
    cursorOrb.style.setProperty("--cursor-x", (cursorX - 11) + "px");
    cursorOrb.style.setProperty("--cursor-y", (cursorY - 11) + "px");
  };

  window.addEventListener("pointermove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    cursorOrb.classList.add("is-visible");
    if (!cursorFrame) cursorFrame = window.requestAnimationFrame(syncCursor);
  }, { passive: true });
  window.addEventListener("pointerleave", () => cursorOrb.classList.remove("is-visible", "is-active"));

  document.querySelectorAll("a, button, input, select, textarea, summary, .motion-media-link, .coverage-card, .detail-card, .intent-card").forEach((target) => {
    target.addEventListener("pointerenter", () => cursorOrb.classList.add("is-active"));
    target.addEventListener("pointerleave", () => cursorOrb.classList.remove("is-active"));
  });
}

if (revealItems.length) {
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = Math.min(index * 35, 160) + "ms";
      observer.observe(item);
    });
  }
}

const animatedItems = document.querySelectorAll("[data-animate]");
if (animatedItems.length) {
  const syncMotionMedia = (item, shouldPlay) => {
    if (item.matches("[data-insurance-carousel]")) return;
    item.querySelectorAll("video").forEach((video) => {
      if (shouldPlay && !reducedMotion) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };
  if (reducedMotion || !("IntersectionObserver" in window)) {
    animatedItems.forEach((item) => {
      item.setAttribute("data-in-view", "true");
      syncMotionMedia(item, false);
    });
  } else {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.setAttribute("data-in-view", String(entry.isIntersecting));
        syncMotionMedia(entry.target, entry.isIntersecting);
      });
    }, { rootMargin: "96px 0px", threshold: 0.01 });
    animatedItems.forEach((item) => {
      syncMotionMedia(item, item.getAttribute("data-in-view") === "true");
      animationObserver.observe(item);
    });
  }
}

if (!reducedMotion && "IntersectionObserver" in window) {
  const depthSurfaces = Array.from(document.querySelectorAll("[data-insurance-carousel]"));
  const visibleDepthSurfaces = new Set();
  let depthFrame = 0;

  const syncDepth = () => {
    depthFrame = 0;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
    visibleDepthSurfaces.forEach((surface) => {
      const rect = surface.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const normalized = Math.max(-1, Math.min(1, (center - viewportHeight / 2) / viewportHeight));
      const scrollDepth = normalized * -18;
      surface.style.setProperty("--scroll-depth", scrollDepth.toFixed(2) + "px");
      surface.style.setProperty("--media-scroll-y", (scrollDepth * -0.26).toFixed(2) + "px");
      surface.style.setProperty("--depth-y", (scrollDepth * -0.18).toFixed(2) + "px");
      surface.style.setProperty("--media-rotate-x", (normalized * -1.35).toFixed(2) + "deg");
    });
  };

  const requestDepthSync = () => {
    if (!depthFrame) depthFrame = window.requestAnimationFrame(syncDepth);
  };

  const depthObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visibleDepthSurfaces.add(entry.target);
      else {
        visibleDepthSurfaces.delete(entry.target);
        entry.target.style.setProperty("--scroll-depth", "0px");
        entry.target.style.setProperty("--media-scroll-y", "0px");
        entry.target.style.setProperty("--depth-y", "0px");
        entry.target.style.setProperty("--media-rotate-x", "0deg");
      }
    });
    requestDepthSync();
  }, { rootMargin: "180px 0px", threshold: 0.01 });

  depthSurfaces.forEach((surface) => depthObserver.observe(surface));
  window.addEventListener("scroll", requestDepthSync, { passive: true });
  window.addEventListener("resize", requestDepthSync, { passive: true });
}

document.querySelectorAll("[data-insurance-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".motion-slide"));
  const track = carousel.querySelector(".carousel-track");
  const chips = Array.from(carousel.querySelectorAll("[data-carousel-chip]"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const delay = 6800;
  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.dataset.active === "true"));
  let inView = carousel.getAttribute("data-in-view") === "true";
  let paused = reducedMotion;
  let interactionHoldUntil = 0;
  let dragging = false;
  let didDrag = false;
  let startX = 0;
  let startScrollLeft = 0;
  let scrollFrame = 0;

  const isTemporarilyPaused = () => paused || Date.now() < interactionHoldUntil;

  const hydrateVideo = (slide) => {
    const video = slide?.querySelector(".motion-video");
    if (!video || video.dataset.loaded === "true") return video;
    const webm = video.dataset.src;
    const mp4 = video.dataset.mp4;
    if (webm) {
      const source = document.createElement("source");
      source.src = webm;
      source.type = "video/webm";
      video.append(source);
    }
    if (mp4) {
      const source = document.createElement("source");
      source.src = mp4;
      source.type = "video/mp4";
      video.append(source);
    }
    video.dataset.loaded = "true";
    video.addEventListener("canplay", () => video.classList.add("is-ready"), { once: true });
    video.load();
    return video;
  };

  const syncVideos = () => {
    slides.forEach((slide, index) => {
      const video = slide.querySelector(".motion-video");
      if (index === activeIndex) hydrateVideo(slide);
      if (!video) return;
      const shouldPlay = index === activeIndex && inView && !isTemporarilyPaused() && !reducedMotion;
      if (shouldPlay) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };

  const setPaused = (value) => {
    paused = value || reducedMotion;
    carousel.setAttribute("data-paused", String(paused));
    syncVideos();
  };

  const setActive = (index, options = {}) => {
    if (!slides.length) return;
    activeIndex = (index + slides.length) % slides.length;
    const activeSlide = slides[activeIndex];
    carousel.setAttribute("data-active-slide", activeSlide.dataset.slideId || "");
    slides.forEach((slide, slideIndex) => {
      slide.dataset.active = String(slideIndex === activeIndex);
      if (slideIndex === activeIndex) {
        slide.removeAttribute("inert");
      } else {
        slide.setAttribute("inert", "");
      }
    });
    chips.forEach((chip) => {
      chip.setAttribute("aria-selected", String(chip.dataset.slideId === activeSlide.dataset.slideId));
    });
    dots.forEach((dot) => {
      dot.setAttribute("aria-current", String(dot.dataset.slideId === activeSlide.dataset.slideId));
    });
    hydrateVideo(activeSlide);
    hydrateVideo(slides[(activeIndex + 1) % slides.length]);
    syncVideos();
    if (options.scroll !== false) {
      activeSlide.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
    }
  };

  const holdAfterInteraction = () => {
    interactionHoldUntil = Date.now() + 9000;
    carousel.setAttribute("data-paused", "true");
    syncVideos();
  };

  const goToSlideId = (slideId) => {
    const index = slides.findIndex((slide) => slide.dataset.slideId === slideId);
    if (index >= 0) {
      holdAfterInteraction();
      setActive(index);
    }
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => goToSlideId(chip.dataset.slideId));
  });
  dots.forEach((dot) => {
    dot.addEventListener("click", () => goToSlideId(dot.dataset.slideId));
  });
  prev?.addEventListener("click", () => {
    holdAfterInteraction();
    setActive(activeIndex - 1);
  });
  next?.addEventListener("click", () => {
    holdAfterInteraction();
    setActive(activeIndex + 1);
  });

  track?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      holdAfterInteraction();
      setActive(activeIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      holdAfterInteraction();
      setActive(activeIndex - 1);
    }
  });

  track?.addEventListener("scroll", () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      const trackBox = track.getBoundingClientRect();
      const trackCenter = trackBox.left + trackBox.width / 2;
      let closestIndex = activeIndex;
      let closestDistance = Infinity;
      slides.forEach((slide, index) => {
        const box = slide.getBoundingClientRect();
        const distance = Math.abs(box.left + box.width / 2 - trackCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      if (closestIndex !== activeIndex) {
        holdAfterInteraction();
        setActive(closestIndex, { scroll: false });
      }
    });
  }, { passive: true });

  track?.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") return;
    dragging = true;
    didDrag = false;
    startX = event.clientX;
    startScrollLeft = track.scrollLeft;
    track.setPointerCapture?.(event.pointerId);
  });
  track?.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 4) didDrag = true;
    track.scrollLeft = startScrollLeft - delta;
  });
  const endDrag = (event) => {
    if (!dragging) return;
    dragging = false;
    track.releasePointerCapture?.(event.pointerId);
    if (didDrag) holdAfterInteraction();
  };
  track?.addEventListener("pointerup", endDrag);
  track?.addEventListener("pointercancel", endDrag);
  track?.addEventListener("click", (event) => {
    if (didDrag) {
      event.preventDefault();
      event.stopPropagation();
      didDrag = false;
    }
  }, true);

  carousel.addEventListener("mouseenter", () => setPaused(true));
  carousel.addEventListener("mouseleave", () => setPaused(false));
  carousel.addEventListener("focusin", () => setPaused(true));
  carousel.addEventListener("focusout", () => setPaused(false));

  if ("IntersectionObserver" in window) {
    const carouselObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting;
        carousel.setAttribute("data-in-view", String(inView));
        syncVideos();
      });
    }, { rootMargin: "160px 0px", threshold: 0.12 });
    carouselObserver.observe(carousel);
  } else {
    inView = true;
    carousel.setAttribute("data-in-view", "true");
  }

  if (!reducedMotion) {
    window.setInterval(() => {
      const shouldHold = isTemporarilyPaused() || !inView || document.hidden;
      carousel.setAttribute("data-paused", String(shouldHold));
      if (!shouldHold) setActive(activeIndex + 1);
      syncVideos();
    }, delay);
  }

  setActive(activeIndex, { scroll: false });
  setPaused(reducedMotion);
});

document.querySelectorAll("[data-google-review-carousel]").forEach((carousel) => {
  const cards = Array.from(carousel.querySelectorAll("[data-review-card]"));
  const dots = Array.from(carousel.querySelectorAll("[data-review-dot]"));
  const prev = carousel.querySelector("[data-review-prev]");
  const next = carousel.querySelector("[data-review-next]");
  if (!cards.length) return;
  let activeIndex = 0;
  let paused = reducedMotion;
  let inView = true;
  const delay = 5400;

  const setActive = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      const isActive = cardIndex === activeIndex;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-hidden", String(!isActive));
      card.toggleAttribute("inert", !isActive);
      card.querySelectorAll("a, button, summary").forEach((control) => {
        control.tabIndex = isActive ? 0 : -1;
      });
    });
    dots.forEach((dot, dotIndex) => {
      const isActiveDot = Number(dot.dataset.reviewDot || 0) === activeIndex;
      dot.setAttribute("aria-selected", String(isActiveDot));
      dot.classList.toggle("is-active", isActiveDot);
    });
  };

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      paused = true;
      setActive(Number(dot.dataset.reviewDot || 0));
      window.setTimeout(() => { paused = reducedMotion; }, 8000);
    });
  });
  prev?.addEventListener("click", () => {
    paused = true;
    setActive(activeIndex - 1);
    window.setTimeout(() => { paused = reducedMotion; }, 8000);
  });
  next?.addEventListener("click", () => {
    paused = true;
    setActive(activeIndex + 1);
    window.setTimeout(() => { paused = reducedMotion; }, 8000);
  });
  carousel.addEventListener("mouseenter", () => { paused = true; });
  carousel.addEventListener("mouseleave", () => { paused = reducedMotion; });
  carousel.addEventListener("focusin", () => { paused = true; });
  carousel.addEventListener("focusout", () => { paused = reducedMotion; });

  if ("IntersectionObserver" in window) {
    const reviewObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        inView = entry.isIntersecting;
      });
    }, { rootMargin: "140px 0px", threshold: 0.12 });
    reviewObserver.observe(carousel);
  }

  if (!reducedMotion) {
    window.setInterval(() => {
      if (!paused && inView && !document.hidden) setActive(activeIndex + 1);
    }, delay);
  }
  setActive(0);
});

if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  const particleColors = [
    "rgba(154, 220, 247, 0.88)",
    "rgba(255, 224, 161, 0.82)",
    "rgba(255, 125, 101, 0.76)",
    "rgba(119, 231, 220, 0.78)"
  ];
  let liveParticles = 0;
  const spawnLiquidParticles = (event, count = 5, mode = "burst") => {
    if (!event?.currentTarget || document.hidden || liveParticles > 64) return;
    const surface = event.currentTarget;
    const now = Date.now();
    const stampKey = mode === "trail" ? "particleTrailAt" : "particleAt";
    const last = Number(surface.dataset[stampKey] || 0);
    const cooldown = mode === "trail" ? 160 : 175;
    if (now - last < cooldown) return;
    surface.dataset[stampKey] = String(now);
    const rect = surface.getBoundingClientRect();
    const baseX = Math.max(rect.left, Math.min(event.clientX || rect.left + rect.width / 2, rect.right));
    const baseY = Math.max(rect.top, Math.min(event.clientY || rect.top + rect.height / 2, rect.bottom));
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("span");
      const angle = (Math.PI * 2 * index) / Math.max(1, count) + Math.random() * 0.74;
      const distance = (mode === "trail" ? 12 : 20) + Math.random() * (mode === "trail" ? 18 : 42);
      const size = (mode === "trail" ? 2.4 : 3.4) + Math.random() * (mode === "trail" ? 3.1 : 5.8);
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];
      particle.className = "liquid-particle";
      particle.style.setProperty("--particle-x", (baseX + (Math.random() - 0.5) * 20).toFixed(1) + "px");
      particle.style.setProperty("--particle-y", (baseY + (Math.random() - 0.5) * 16).toFixed(1) + "px");
      particle.style.setProperty("--particle-dx", (Math.cos(angle) * distance).toFixed(1) + "px");
      particle.style.setProperty("--particle-dy", (Math.sin(angle) * distance - 22 - Math.random() * 16).toFixed(1) + "px");
      particle.style.setProperty("--particle-size", size.toFixed(1) + "px");
      particle.style.setProperty("--particle-color", color);
      particle.style.setProperty("--particle-angle", ((angle * 180) / Math.PI).toFixed(1) + "deg");
      particle.style.setProperty("--particle-spin", (40 + Math.random() * 120).toFixed(1) + "deg");
      particle.style.setProperty("--particle-tail", (12 + distance * 0.38).toFixed(1) + "px");
      particle.style.setProperty("--particle-duration", (mode === "trail" ? 660 + Math.random() * 220 : 820 + Math.random() * 300).toFixed(0) + "ms");
      liveParticles += 1;
      document.body.append(particle);
      particle.addEventListener("animationend", () => {
        liveParticles = Math.max(0, liveParticles - 1);
        particle.remove();
      }, { once: true });
    }
  };

  const hoverSurfaceSelector = [
    ".liquid-tilt",
    ".motion-carousel",
    ".button",
    ".coverage-card",
    ".detail-card",
    ".intent-card",
    ".quote-form",
    ".service-cta",
    ".trust-strip article",
    ".why-grid article",
    ".language-grid article",
    ".review-signal-grid article",
    ".review-card",
    ".real-review-card",
    ".real-review-mini",
    ".review-source-card",
    ".review-qr-card",
    ".notice-card",
    ".callout",
    ".qr-card",
    ".faq details",
    ".about-media",
    ".franchise-card"
  ].join(",");

  document.querySelectorAll(hoverSurfaceSelector).forEach((surface) => {
    let frame = 0;
    let lastEvent = null;

    surface.addEventListener("pointerenter", (event) => {
      const stronger = surface.matches(".button, .motion-carousel, .real-review-card, .coverage-card, .review-qr-card");
      spawnLiquidParticles(event, stronger ? 10 : 5);
    }, { passive: true });

    surface.addEventListener("click", (event) => {
      if (surface.matches("a, button, .button, .carousel-chip, .real-review-mini")) {
        spawnLiquidParticles(event, 13);
      }
    });

    surface.addEventListener("pointermove", (event) => {
      lastEvent = event;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (!lastEvent) return;
        const rect = surface.getBoundingClientRect();
        const x = (lastEvent.clientX - rect.left) / rect.width;
        const y = (lastEvent.clientY - rect.top) / rect.height;
        surface.style.setProperty("--glare-x", Math.round(x * 100) + "%");
        surface.style.setProperty("--glare-y", Math.round(y * 100) + "%");
        if (surface.matches(".button, .motion-carousel, .coverage-card, .review-source-card, .review-qr-card") && liveParticles < 38) {
          spawnLiquidParticles(lastEvent, 1, "trail");
        }
        if (surface.classList.contains("liquid-tilt")) {
          surface.style.setProperty("--tilt-x", ((x - 0.5) * 7).toFixed(2) + "deg");
          surface.style.setProperty("--tilt-y", ((0.5 - y) * 6).toFixed(2) + "deg");
        }
        if (surface.classList.contains("motion-carousel")) {
          surface.style.setProperty("--parallax-x", ((x - 0.5) * 16).toFixed(2) + "px");
          surface.style.setProperty("--parallax-y", ((y - 0.5) * 12).toFixed(2) + "px");
          surface.style.setProperty("--depth-x", ((x - 0.5) * -5).toFixed(2) + "px");
          surface.style.setProperty("--media-rotate-y", ((x - 0.5) * 1.6).toFixed(2) + "deg");
        }
        if (surface.classList.contains("magnetic-button")) {
          surface.style.setProperty("--magnet-x", ((x - 0.5) * 5).toFixed(2) + "px");
          surface.style.setProperty("--magnet-y", ((y - 0.5) * 4).toFixed(2) + "px");
        }
      });
    });

    surface.addEventListener("pointerleave", () => {
      lastEvent = null;
      surface.style.setProperty("--tilt-x", "0deg");
      surface.style.setProperty("--tilt-y", "0deg");
      surface.style.setProperty("--glare-x", "50%");
      surface.style.setProperty("--glare-y", "0%");
      surface.style.setProperty("--parallax-x", "0px");
      surface.style.setProperty("--parallax-y", "0px");
      surface.style.setProperty("--depth-x", "0px");
      surface.style.setProperty("--media-rotate-y", "0deg");
      surface.style.setProperty("--magnet-x", "0px");
      surface.style.setProperty("--magnet-y", "0px");
    });
  });
}

const quoteFieldLimits = {
  name: 80,
  phone: 24,
  email: 120,
  insuranceType: 40,
  zip: 5,
  bestTime: 40,
  notes: 600,
  companyWebsite: 140
};
const sensitiveQuoteTerms = [
  "ssn",
  "social security",
  "date of birth",
  "dob",
  "driver license",
  "drivers license",
  "driver's license",
  "vin",
  "vehicle identification",
  "credit card",
  "card number",
  "bank account",
  "routing number",
  "password",
  "passcode",
  "medical record",
  "claim number",
  "policy number"
];
const approvedQuoteDestination = new URL("https://secure.ConsumerRateQuotes.com/ConsumerV2?id=64868", window.location.href);

function cleanPlainText(value, limit = 600) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F<>\x60]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function normalizedSensitiveText(value) {
  return cleanPlainText(value, 600).toLowerCase().replace(/[^a-z0-9]+/g, " ");
}

function containsSensitiveQuoteData(value) {
  const normalized = normalizedSensitiveText(value);
  return sensitiveQuoteTerms.some((term) => normalized.includes(normalizedSensitiveText(term)));
}

function normalizeQuoteField(field) {
  if (!field || !("value" in field)) return;
  const limit = quoteFieldLimits[field.name] || 160;
  field.setCustomValidity("");
  if (field.matches("select")) return;
  if (field.name === "phone") {
    field.value = cleanPlainText(field.value, limit).replace(/[^0-9+().\-\s]/g, "").trim();
    return;
  }
  if (field.name === "zip") {
    field.value = cleanPlainText(field.value, limit).replace(/\D/g, "").slice(0, 5);
    return;
  }
  field.value = cleanPlainText(field.value, limit);
  if (field.name === "notes" && containsSensitiveQuoteData(field.value)) {
    field.setCustomValidity("Please do not include sensitive details here. Continue sensitive information only through the secure approved quote process.");
  }
}

function approvedQuoteUrl(destination) {
  try {
    const url = new URL(destination || "", window.location.href);
    return url.protocol === "https:" &&
      url.hostname.toLowerCase() === "secure.consumerratequotes.com" &&
      url.pathname === "/ConsumerV2" &&
      url.searchParams.get("id") === "64868"
      ? url.href
      : "";
  } catch {
    return "";
  }
}

function markValidity(field) {
  if (!field || !("checkValidity" in field)) return;
  const shouldMark = field.matches("input, select, textarea") && field.required;
  if (shouldMark) field.setAttribute("aria-invalid", String(!field.checkValidity()));
}

document.querySelectorAll("[data-quote-form]").forEach((form) => {
  const fields = form.querySelectorAll("input, select, textarea");
  fields.forEach((field) => {
    field.addEventListener("blur", () => {
      normalizeQuoteField(field);
      markValidity(field);
    });
    field.addEventListener("input", () => {
      field.setCustomValidity("");
      markValidity(field);
    });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const honeypot = form.querySelector('[name="companyWebsite"]');
    fields.forEach(normalizeQuoteField);
    fields.forEach(markValidity);
    if (honeypot && honeypot.value) {
      if (status) status.textContent = "Thanks. The request has been received.";
      form.reset();
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      const sensitiveMessage = form.querySelector('[name="notes"]')?.validationMessage || "";
      if (status) status.textContent = sensitiveMessage || "Please complete the required contact fields before sending.";
      return;
    }
    const destination = approvedQuoteUrl(form.dataset.quoteDestination || form.action || approvedQuoteDestination.href);
    if (!destination) {
      if (status) status.textContent = "The secure quote path could not be verified. Please call the office instead.";
      return;
    }
    if (status) status.textContent = "Opening the secure ConsumerRateQuotes form...";
    window.location.assign(destination);
  });
});
