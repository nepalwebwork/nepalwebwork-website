/* =========================================================
   Nepal Webwork — script.js
   Shared behavior across all pages:
   1. Mobile nav toggle (open/close + auto-close on link tap)
   2. Sticky header shadow on scroll
   3. Contact form placeholder handling
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close the menu after tapping a link (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. Header shadow on scroll ---------- */
  const header = document.querySelector('.site-header');

  if (header) {
    const setScrolledState = function () {
      if (window.scrollY > 8) {
        header.style.boxShadow = '0 1px 0 rgba(28,35,51,0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
    };
    setScrolledState();
    window.addEventListener('scroll', setScrolledState, { passive: true });
  }

  /* ---------- 3. Contact form placeholder ---------- */
  const contactForm = document.querySelector('.contact-grid form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      // Placeholder: replace this block with a real submission,
      // e.g. fetch('https://formspree.io/f/your-id', { method: 'POST', body: new FormData(contactForm) })
      setTimeout(function () {
        submitBtn.textContent = 'Message sent';
        contactForm.reset();
        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2200);
      }, 700);
    });
  }

  /* ---------- 4. FAQ: only one open at a time (contact page) ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length) {
    faqItems.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) {
          faqItems.forEach(function (other) {
            if (other !== item) other.open = false;
          });
        }
      });
    });
  }

});