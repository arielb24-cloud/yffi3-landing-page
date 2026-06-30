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
