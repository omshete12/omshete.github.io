(function () {
  "use strict";

  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  const toggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    toggle.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  toggle.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    toggle.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  document.querySelectorAll(".mobile-link").forEach(l => l.addEventListener("click", closeMenu));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add("in"), i * 60);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function (e) {
      const t = document.querySelector(this.getAttribute("href"));
      if (t) { e.preventDefault(); closeMenu(); t.scrollIntoView({ behavior: "smooth" }); }
    });
  });

  const bars = document.querySelectorAll(".cefr-fill");
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = e.target.style.width;
        e.target.style.width = "0%";
        setTimeout(() => { e.target.style.width = target; }, 200);
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => barObserver.observe(b));

})();
