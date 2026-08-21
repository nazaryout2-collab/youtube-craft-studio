const menuButton = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });

  document.addEventListener("click", (event) => {
    if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
      mobileMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    }
  });
}

const animatedItems = document.querySelectorAll(
  [
    ".hero-copy",
    ".hero-stage",
    ".proof-strip",
    ".section-head",
    ".compare-card",
    ".interface .pill",
    ".interface h2",
    ".interface .section-lead",
    ".interface-frame",
    ".steps article",
    ".features .pill",
    ".features h2",
    ".features .section-lead",
    ".feature-card",
    ".mini-features article",
    ".plans .pill",
    ".plans h2",
    ".plans .section-lead",
    ".plan"
  ].join(", ")
);

animatedItems.forEach((item, index) => {
  item.classList.add("motion-item");
  item.style.setProperty("--motion-delay", `${Math.min(index % 7, 6) * 65}ms`);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
);

animatedItems.forEach((item) => observer.observe(item));
