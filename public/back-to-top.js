/* Back-to-top button, site-wide.
 *
 * Vanilla, not React, and referenced from every HTML shell — the same approach as
 * public/cookie-notice.js and for the same reason: six page entries (the four blog
 * posts, sign-in and sign-up) never mount the shared Header/Footer, so a React
 * component placed there would silently miss them. One script reaches all 44 pages.
 *
 * This replaces the React BackToTop that lived inside src/components/BlogPost.jsx.
 * That one is deleted — otherwise blog posts would render two buttons stacked on
 * each other.
 *
 * The button is BUILT here rather than shipped in the prerendered HTML, so a page
 * loaded at scroll position 0 never paints it and no-JS visitors get nothing
 * non-functional. Behaviour matches the blog original: appears past 400px.
 */
(function () {
  'use strict';

  var SHOW_AFTER = 400;

  function build() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ins-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"'
      + ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';

    btn.addEventListener('click', function () {
      var reduce = window.matchMedia
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Honour the OS setting: a full-page smooth scroll is exactly the kind of motion
      // "reduce" is asking us not to do.
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      // Send focus back to the top of the document, or a keyboard user is left with
      // focus on a button that has just faded out.
      var target = document.querySelector('h1') || document.body;
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.removeAttribute('tabindex');
    });

    document.body.appendChild(btn);

    var shown = false;
    var ticking = false;
    function apply() {
      var next = window.scrollY > SHOW_AFTER;
      if (next !== shown) {
        shown = next;
        btn.classList.toggle('is-visible', shown);
      }
      ticking = false;
    }
    // rAF-throttled: this listener runs on every scroll frame on every page.
    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(apply); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    apply();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
