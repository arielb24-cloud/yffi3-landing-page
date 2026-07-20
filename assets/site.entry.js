import EmblaCarousel from "embla-carousel";
import Fade from "embla-carousel-fade";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  if (reducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    document.documentElement.classList.add("motion-ready");
    gsap.registerPlugin(ScrollTrigger);
    revealItems.forEach((item) => {
      const direction = item.getAttribute("data-reveal");
      const x = direction === "left" ? -24 : direction === "right" ? 24 : 0;
      gsap.fromTo(item,
        { autoAlpha: 0, x, y: direction === "left" || direction === "right" ? 0 : 24 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.72,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform",
          onComplete: () => item.classList.add("is-visible"),
          scrollTrigger: { trigger: item, start: "top 88%", once: true }
        }
      );
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

document.querySelectorAll("[data-service-carousel]").forEach((root) => {
  const viewport = root.querySelector("[data-carousel-viewport]");
  const slides = Array.from(root.querySelectorAll("[data-carousel-slide]"));
  const dots = Array.from(root.querySelectorAll("[data-carousel-dot]"));
  const previous = root.querySelector("[data-carousel-prev]");
  const next = root.querySelector("[data-carousel-next]");
  const toggle = root.querySelector("[data-carousel-toggle]");
  const toggleSymbol = root.querySelector("[data-carousel-toggle-symbol]");
  const status = root.querySelector("[data-carousel-status]");
  if (!viewport || slides.length < 2) return;

  const saveData = Boolean(navigator.connection && navigator.connection.saveData);
  const embla = EmblaCarousel(viewport, { loop: true, align: "start", duration: 34 }, [Fade()]);
  let timer = 0;
  let userPaused = false;
  let hovered = false;
  let focused = false;
  let inView = true;

  const hydrateVideo = (video) => {
    let changed = false;
    video.querySelectorAll("source[data-src]").forEach((source) => {
      if (!source.src) {
        source.src = source.dataset.src;
        changed = true;
      }
    });
    if (changed) video.load();
  };

  const canRotate = () => !reducedMotion && !saveData && !userPaused && !hovered && !focused && inView && !document.hidden;
  const clearTimer = () => {
    if (timer) window.clearTimeout(timer);
    timer = 0;
  };
  const schedule = () => {
    clearTimer();
    if (!canRotate()) return;
    timer = window.setTimeout(() => embla.scrollNext(), 6500);
  };
  const announce = (message) => {
    if (status) status.textContent = message;
  };

  const updateMedia = (selected) => {
    const nextIndex = (selected + 1) % slides.length;
    slides.forEach((slide, index) => {
      const video = slide.querySelector("video");
      if (!video) return;
      if (!saveData && inView && (index === selected || index === nextIndex)) hydrateVideo(video);
      if (index === selected && inView && !document.hidden && !reducedMotion && !saveData) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };

  const updateToggle = () => {
    if (!toggle) return;
    const unavailable = reducedMotion || saveData;
    toggle.hidden = unavailable;
    toggle.setAttribute("aria-pressed", String(userPaused));
    toggle.setAttribute("aria-label", userPaused ? "Resume automatic rotation" : "Pause automatic rotation");
    if (toggleSymbol) toggleSymbol.textContent = userPaused ? "▶" : "Ⅱ";
  };

  const onSelect = () => {
    const selected = embla.selectedScrollSnap();
    slides.forEach((slide, index) => slide.setAttribute("aria-hidden", String(index !== selected)));
    dots.forEach((dot, index) => {
      if (index === selected) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    updateMedia(selected);
    if (!reducedMotion) {
      const activeMedia = slides[selected] && slides[selected].querySelector("img, video");
      if (activeMedia) gsap.fromTo(activeMedia, { scale: 1.026 }, { scale: 1.002, duration: 1.25, ease: "power2.out", overwrite: true });
    }
    schedule();
  };

  previous && previous.addEventListener("click", () => {
    embla.scrollPrev();
    announce("Previous visual selected.");
  });
  next && next.addEventListener("click", () => {
    embla.scrollNext();
    announce("Next visual selected.");
  });
  dots.forEach((dot, index) => dot.addEventListener("click", () => {
    embla.scrollTo(index);
    announce("Visual " + (index + 1) + " of " + slides.length + " selected.");
  }));
  toggle && toggle.addEventListener("click", () => {
    userPaused = !userPaused;
    updateToggle();
    announce(userPaused ? "Automatic rotation paused." : "Automatic rotation resumed.");
    schedule();
  });
  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      embla.scrollPrev();
      announce("Previous visual selected.");
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      embla.scrollNext();
      announce("Next visual selected.");
    }
  });
  root.addEventListener("pointerenter", () => {
    hovered = true;
    schedule();
  });
  root.addEventListener("pointerleave", () => {
    hovered = false;
    schedule();
  });
  root.addEventListener("focusin", () => {
    focused = true;
    schedule();
  });
  root.addEventListener("focusout", () => {
    window.setTimeout(() => {
      focused = root.contains(document.activeElement);
      schedule();
    }, 0);
  });
  document.addEventListener("visibilitychange", () => {
    updateMedia(embla.selectedScrollSnap());
    schedule();
  });

  if ("IntersectionObserver" in window) {
    const carouselObserver = new IntersectionObserver((entries) => {
      inView = entries[0] ? entries[0].isIntersecting : true;
      updateMedia(embla.selectedScrollSnap());
      schedule();
    }, { rootMargin: "120px 0px", threshold: 0.05 });
    carouselObserver.observe(root);
  }

  embla.on("select", onSelect);
  embla.on("reInit", onSelect);
  updateToggle();
  onSelect();
  root.dataset.ready = "true";
});

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
