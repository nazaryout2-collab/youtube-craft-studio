const menuButton = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
});

document.addEventListener("click", (event) => {
  if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
    mobileMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
  }
});
