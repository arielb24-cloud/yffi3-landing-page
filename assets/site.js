const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.getAttribute("data-open") === "true";
    siteNav.setAttribute("data-open", String(!isOpen));
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
  });
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll("[data-reveal]");

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
  if (reducedMotion || !("IntersectionObserver" in window)) {
    animatedItems.forEach((item) => item.setAttribute("data-in-view", "true"));
  } else {
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.setAttribute("data-in-view", String(entry.isIntersecting));
      });
    }, { rootMargin: "96px 0px", threshold: 0.01 });
    animatedItems.forEach((item) => animationObserver.observe(item));
  }
}

if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  const hoverSurfaceSelector = [
    ".liquid-tilt",
    ".button",
    ".coverage-card",
    ".detail-card",
    ".intent-card",
    ".quote-form",
    ".service-cta",
    ".trust-strip article",
    ".why-grid article",
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
        if (surface.classList.contains("liquid-tilt")) {
          surface.style.setProperty("--tilt-x", ((x - 0.5) * 7).toFixed(2) + "deg");
          surface.style.setProperty("--tilt-y", ((0.5 - y) * 6).toFixed(2) + "deg");
        }
      });
    });

    surface.addEventListener("pointerleave", () => {
      lastEvent = null;
      surface.style.setProperty("--tilt-x", "0deg");
      surface.style.setProperty("--tilt-y", "0deg");
      surface.style.setProperty("--glare-x", "50%");
      surface.style.setProperty("--glare-y", "0%");
    });
  });
}

function markValidity(field) {
  if (!field || !("checkValidity" in field)) return;
  const shouldMark = field.matches("input, select, textarea") && field.required;
  if (shouldMark) field.setAttribute("aria-invalid", String(!field.checkValidity()));
}

document.querySelectorAll("[data-quote-form]").forEach((form) => {
  const fields = form.querySelectorAll("input, select, textarea");
  fields.forEach((field) => {
    field.addEventListener("blur", () => markValidity(field));
    field.addEventListener("input", () => markValidity(field));
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const honeypot = form.querySelector('[name="companyWebsite"]');
    fields.forEach(markValidity);
    if (honeypot && honeypot.value) {
      if (status) status.textContent = "Thanks. The request has been received.";
      form.reset();
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) status.textContent = "Please complete the required contact fields before sending.";
      return;
    }
    if (status) status.textContent = "Opening the secure quote form...";
    window.location.assign(form.dataset.quoteDestination || form.action);
  });
});
