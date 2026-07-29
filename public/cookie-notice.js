/* Cookie notice bar.
 *
 * Vanilla, not React, on purpose: it has to appear on all 44 built pages, and six of the
 * page entries do not mount the shared Header/Footer components (the four blog posts,
 * sign-in and sign-up). A script referenced from every HTML shell reaches all of them
 * without touching thirty page files.
 *
 * The bar is BUILT here rather than shipped in the prerendered HTML. If the markup were in
 * the HTML it would paint for a fraction of a second on every page load for someone who
 * dismissed it months ago, then vanish. Constructing it only when the flag is absent means
 * a returning visitor never sees a flash.
 *
 * It is Devart's standard implied-consent notice, the same one TMetric ships: dismissal
 * records acknowledgement, it gates nothing. The cookies it refers to are listed at
 * /security/cookie-settings — the Devart analytics/advertising stack (GA, LinkedIn Insight,
 * Microsoft UET, ActiveCampaign) planned for this site, per the owner's 2026-07-29 decision.
 * This file ships verbatim from public/, comments included, so keep this note accurate.
 */
(function () {
  'use strict';

  var KEY = 'ins_cookie_notice';
  var VALUE = 'dismissed';

  // Private mode and hardened browsers throw on storage access rather than returning null.
  function readFlag() {
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function writeFlag() {
    try { window.localStorage.setItem(KEY, VALUE); } catch (e) { /* nothing to fall back to */ }
  }

  function build() {
    var bar = document.createElement('div');
    bar.className = 'ins-cookie-notice';
    // region, not alertdialog: it is not modal, it interrupts nothing, and it must not
    // steal focus from whatever the visitor was doing.
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie notice');

    var text = document.createElement('p');
    text.className = 'ins-cookie-notice__text';
    // TMetric's exact wording, at the product owner's direction (2026-07-29): insightis.ai
    // will run the same Devart stack as TMetric (Google Analytics, LinkedIn Insight,
    // Microsoft UET, ActiveCampaign), so this is the group's standard implied-consent
    // notice and the Cookies Policy lists those partners' cookies with opt-out links.
    // Counsel should still review the implied-consent posture for GDPR before EU launch.
    text.appendChild(document.createTextNode(
      'We use cookies on this website. By using this site you agree that we may store and '
      + 'access cookies on your device as explained in our '
    ));
    var link = document.createElement('a');
    link.className = 'ins-cookie-notice__link';
    link.href = '/security/cookie-settings';
    link.appendChild(document.createTextNode('Cookies Policy'));
    text.appendChild(link);
    text.appendChild(document.createTextNode('.'));

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ins-cookie-notice__btn';
    btn.appendChild(document.createTextNode('Got It'));
    btn.setAttribute('aria-label', 'Dismiss cookie notice');

    bar.appendChild(text);
    bar.appendChild(btn);

    function dismiss() {
      writeFlag();
      // Return focus somewhere sane rather than dropping it on a removed node.
      var wasFocused = document.activeElement === btn;
      bar.parentNode && bar.parentNode.removeChild(bar);
      document.documentElement.classList.remove('has-ins-cookie-notice');
      if (wasFocused && document.body) {
        document.body.setAttribute('tabindex', '-1');
        document.body.focus();
        document.body.removeAttribute('tabindex');
      }
    }

    btn.addEventListener('click', dismiss);
    // Escape dismisses, but only while focus is inside the bar, so it cannot swallow the
    // key from a dialog or menu elsewhere on the page.
    bar.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); dismiss(); }
    });

    document.body.appendChild(bar);
    // Reserves space at the bottom of the page so the bar cannot permanently sit on top of
    // the footer's own links.
    document.documentElement.classList.add('has-ins-cookie-notice');
  }

  function start() {
    if (readFlag() === VALUE) return;
    if (document.body) build();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
