(function () {
  "use strict";

  // ----- Theme toggle -----
  const themeToggle = document.querySelector(".theme-toggle");
  const html = document.documentElement;
  const STORAGE_KEY = "portfolio-theme";

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  setTheme(getPreferredTheme());

  themeToggle?.addEventListener("click", function () {
    const current = html.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    setTheme(next);
  });

  // ----- Header scroll state -----
  const header = document.querySelector(".header");
  function updateHeader() {
    if (window.scrollY > 50) header?.classList.add("scrolled");
    else header?.classList.remove("scrolled");
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // ----- Reveal on scroll -----
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelector(".nav.open")?.classList.remove("open");
      }
    });
  });

  // ----- Mobile menu -----
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  menuToggle?.addEventListener("click", function () {
    nav?.classList.toggle("open");
    menuToggle.setAttribute("aria-label", nav?.classList.contains("open") ? "Close menu" : "Open menu");
  });

  // ----- Footer year -----
  const yearEl = document.querySelector(".year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Optional: subtle tilt on project cards -----
  document.querySelectorAll(".project-card[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * 8;
      const tiltY = (x - 0.5) * -8;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });
})();
