(function () {
  "use strict";

  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  const toggle     = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function closeMenu() {
    toggle.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  mobileLinks.forEach(link => link.addEventListener("click", closeMenu));

  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  reveals.forEach(el => observer.observe(el));

  const sections = document.querySelectorAll(".section");
  const childObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll(
            ".about-text, .about-stats, .stat-card, .project-card, .skill-group, .contact-text, .contact-item, .footer-inner"
          );
          children.forEach((child, i) => {
            child.style.opacity = "0";
            child.style.transform = "translateY(20px)";
            child.style.transition = `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s`;
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                child.style.opacity = "1";
                child.style.transform = "translateY(0)";
              });
            });
          });
          childObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  sections.forEach(s => childObserver.observe(s));

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

})();
