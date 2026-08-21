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
    ".hero-copy .pill",
    ".hero-copy h1",
    ".hero-copy p",
    ".hero-actions a",
    ".hero-stage",
    ".signal-card",
    ".yc-core",
    ".gallery-card",
    ".gallery-card div",
    ".proof-strip",
    ".proof-strip div",
    ".section-head",
    ".section-head .pill",
    ".section-head h2",
    ".section-head p",
    ".compare-card",
    ".interface .pill",
    ".interface h2",
    ".interface .section-lead",
    ".interface-frame",
    ".steps article",
    ".steps article i",
    ".steps article b",
    ".steps article span",
    ".features .pill",
    ".features h2",
    ".features .section-lead",
    ".feature-card",
    ".feature-card .tag",
    ".feature-card .icon",
    ".feature-card h3",
    ".feature-card p",
    ".feature-card li",
    ".mini-features article",
    ".mini-features article b",
    ".mini-features article strong",
    ".mini-features article span",
    ".plans .pill",
    ".plans h2",
    ".plans .section-lead",
    ".plan",
    ".plan .plan-icon",
    ".plan h3",
    ".plan b",
    ".plan small",
    ".plan a"
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
