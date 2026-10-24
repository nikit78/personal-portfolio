
/* =========================================
   NIKIT GUPTA — PORTFOLIO JAVASCRIPT
   File: script.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------------------
  // 1. Mobile navigation menu
  // ---------------------------------------

  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(!isExpanded)
      );

      menuToggle.setAttribute(
        "aria-label",
        isExpanded ? "Open navigation" : "Close navigation"
      );

      siteNav.classList.toggle("open", !isExpanded);
    });

    // Close the mobile menu when a navigation link is clicked.
    const navLinks = siteNav.querySelectorAll("a");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    // Close the menu when the user presses Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });

    // Close the mobile menu when switching to desktop width.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  // ---------------------------------------
  // 2. Hero typing animation
  // ---------------------------------------

  const typewriter = document.getElementById("typewriter");

  if (typewriter) {
    const words = [
      "backend engineering",
      "full-stack development",
      "AI-powered applications",
      "building useful products"
    ];

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      typewriter.textContent = words[0];
    } else {
      let wordIndex = 0;
      let characterIndex = words[0].length;
      let deleting = true;

      function typeEffect() {
        const currentWord = words[wordIndex];

        if (deleting) {
          characterIndex--;
        } else {
          characterIndex++;
        }

        typewriter.textContent = currentWord.slice(
          0,
          characterIndex
        );

        let delay = deleting ? 45 : 80;

        if (!deleting && characterIndex === currentWord.length) {
          deleting = true;
          delay = 1300;
        } else if (deleting && characterIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          delay = 350;
        }

        window.setTimeout(typeEffect, delay);
      }

      // Start by deleting the initially displayed text.
      window.setTimeout(typeEffect, 1300);
    }
  }

  // ---------------------------------------
  // 3. Automatically update footer year
  // ---------------------------------------

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ---------------------------------------
  // 4. Smooth navigation fallback
  // ---------------------------------------

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "auto"
            : "smooth",
          block: "start"
        });

        // Keep the URL in sync with the selected section.
        if (window.location.hash !== targetId) {
          history.replaceState(null, "", targetId);
        }
      }
    });
  });

  console.log("Nikit's portfolio is ready!");
});
