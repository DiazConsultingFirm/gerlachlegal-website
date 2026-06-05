/* Gerlach Legal — primary nav controller.
   Hamburger toggle for mobile, plus tap-to-expand on the Practice
   Areas dropdown when the viewport is below the desktop breakpoint.
   Desktop hover/focus is handled by CSS (no JS needed for that path). */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.getElementById('primary-menu');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
    }

    var triggers = document.querySelectorAll('.has-dropdown .dropdown-trigger');
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        // Only intercept when in mobile/accordion mode — desktop uses :hover.
        if (window.matchMedia('(max-width: 768px)').matches) {
          e.preventDefault();
          var parent = trigger.parentElement;
          var expanded = parent.classList.toggle('is-expanded');
          trigger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
      });
    });

    // Close mobile menu when clicking outside.
    document.addEventListener('click', function (e) {
      if (!links || !toggle) return;
      if (!links.classList.contains('is-open')) return;
      if (links.contains(e.target) || toggle.contains(e.target)) return;
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    });
  });
})();
