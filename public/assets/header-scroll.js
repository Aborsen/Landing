/* ============================================================
   Mobile + tablet header: hide on scroll-down, show on scroll-up.
   Works across every page that uses the same sticky nav pattern.
   Idle near the top of the page → always show.
   ============================================================ */
(function () {
  if (window.matchMedia('(min-width: 1024px)').matches) return; // desktop = no auto-hide

  var header = null;
  var lastY = window.scrollY || 0;
  var ticking = false;
  var attached = false;

  function findHeader() {
    var nodes = document.querySelectorAll('div[style]');
    for (var i = 0; i < nodes.length; i++) {
      var s = nodes[i].getAttribute('style') || '';
      if (s.indexOf('position: sticky') !== -1 || s.indexOf('position:sticky') !== -1) {
        if (s.indexOf('top: 0') !== -1 || s.indexOf('top:0') !== -1) {
          return nodes[i];
        }
      }
    }
    return null;
  }

  function onScroll() {
    if (ticking || !header) return;
    ticking = true;
    requestAnimationFrame(function () {
      var cur = window.scrollY || 0;
      var delta = cur - lastY;
      if (cur < 80) {
        header.style.transform = 'translateY(0)';
      } else if (delta > 4) {
        header.style.transform = 'translateY(-110%)';
      } else if (delta < -4) {
        header.style.transform = 'translateY(0)';
      }
      lastY = cur;
      ticking = false;
    });
  }

  function attach() {
    if (attached || !header) return;
    attached = true;
    header.style.willChange = 'transform';
    header.style.transition = 'transform 0.25s ease';
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function tryInit() {
    if (header) return;
    header = findHeader();
    if (header) attach();
  }

  // Try right away (in case React already hydrated)
  tryInit();

  // Otherwise watch the DOM until the sticky nav appears
  if (!header) {
    var obs = new MutationObserver(function () {
      tryInit();
      if (header) obs.disconnect();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(function () { obs.disconnect(); }, 12000);
  }
})();
