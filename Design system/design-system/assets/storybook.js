/* ══════════════════════════════════════════════════════════════════
   STORYBOOK INTERACTIVITY — v1.0.0
   Copy-to-clipboard, state toggles, modal demo, scroll-spy, contrast.
   Framework-free. Load at end of <body>.
   ══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const supportsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Render shared sidebar ────────────────────────────────────
  const sidebarHost = document.querySelector('[data-sb-render-sidebar]');
  if (sidebarHost) {
    const depth = sidebarHost.dataset.sbRenderSidebar || '';   // '' for root, '../' for subdirs
    const p = depth;   // path prefix
    sidebarHost.innerHTML = `
      <a class="sb-sidebar__brand" href="${p}index.html">
        <svg width="92" height="22" viewBox="0 0 111 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Insightis"><g clipPath="url(#sb_logo_clip)"><path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#0EC4C1"/><path d="M33.2746 17.5261V5.60823H35.5859V17.5261H33.2746Z" fill="white"/><path d="M38.2797 17.5261V8.0821H40.1758L40.1216 10.9713H40.4466C40.6152 10.261 40.8379 9.67717 41.1148 9.21971C41.4037 8.76226 41.7708 8.41917 42.2163 8.19044C42.6617 7.96171 43.1793 7.84735 43.7692 7.84735C44.8406 7.84735 45.6532 8.22656 46.207 8.98497C46.7728 9.74338 47.0557 10.9171 47.0557 12.5062V17.5261H44.7624V12.7409C44.7624 11.7177 44.6059 10.9713 44.2929 10.5018C43.9919 10.0203 43.5405 9.77949 42.9386 9.77949C42.433 9.77949 42.0056 9.94201 41.6565 10.267C41.3074 10.58 41.0365 11.0014 40.8439 11.5311C40.6633 12.0487 40.567 12.6205 40.555 13.2465V17.5261H38.2797Z" fill="white"/><path d="M53.1255 17.7609C52.4875 17.7609 51.9096 17.6947 51.392 17.5622C50.8864 17.4419 50.453 17.2673 50.0918 17.0386C49.7307 16.7978 49.4418 16.5149 49.2251 16.1899C49.0084 15.8528 48.876 15.4796 48.8278 15.0703L50.6155 14.4022C50.6396 14.7152 50.76 14.9981 50.9767 15.2509C51.1933 15.4917 51.4943 15.6843 51.8795 15.8287C52.2647 15.9732 52.7282 16.0454 53.2699 16.0454C53.8719 16.0454 54.3353 15.9551 54.6604 15.7746C54.9974 15.5819 55.166 15.3111 55.166 14.962C55.166 14.7092 55.0757 14.5105 54.8951 14.3661C54.7145 14.2096 54.4497 14.0832 54.1006 13.9869C53.7635 13.8785 53.3542 13.7762 52.8727 13.6799C52.4273 13.5836 51.9758 13.4752 51.5184 13.3549C51.073 13.2224 50.6576 13.0539 50.2724 12.8493C49.8992 12.6326 49.5922 12.3557 49.3515 12.0186C49.1228 11.6695 49.0084 11.2301 49.0084 10.7004C49.0084 10.1226 49.1589 9.623 49.4598 9.20166C49.7728 8.78032 50.2182 8.44926 50.7961 8.2085C51.386 7.96773 52.0962 7.84735 52.9269 7.84735C53.7093 7.84735 54.3835 7.9557 54.9493 8.17238C55.5271 8.38907 55.9966 8.70207 56.3578 9.11137C56.7189 9.50863 56.9476 9.98415 57.0439 10.5379L55.166 11.1338C55.1299 10.7967 55.0155 10.5138 54.8229 10.2851C54.6303 10.0443 54.3714 9.86376 54.0464 9.74338C53.7214 9.623 53.3422 9.56281 52.9088 9.56281C52.355 9.56281 51.9217 9.65911 51.6087 9.85172C51.2957 10.0443 51.1392 10.3032 51.1392 10.6282C51.1392 10.893 51.2355 11.1037 51.4281 11.2602C51.6327 11.4167 51.9096 11.5431 52.2587 11.6394C52.6199 11.7357 53.0292 11.832 53.4866 11.9283C53.9682 12.0246 54.4316 12.139 54.8771 12.2714C55.3345 12.3918 55.7438 12.5543 56.105 12.759C56.4661 12.9636 56.755 13.2345 56.9717 13.5716C57.1884 13.8966 57.2967 14.3179 57.2967 14.8356C57.2967 15.4616 57.1282 15.9973 56.7911 16.4427C56.4541 16.8761 55.9725 17.2071 55.3465 17.4358C54.7326 17.6525 53.9922 17.7609 53.1255 17.7609Z" fill="white"/><path d="M59.2115 17.5261V8.0821H61.4868V17.5261H59.2115ZM60.3492 6.60139C59.8917 6.60139 59.5366 6.50508 59.2838 6.31247C59.043 6.10782 58.9226 5.8189 58.9226 5.44571C58.9226 5.07253 59.043 4.78963 59.2838 4.59702C59.5366 4.39236 59.8917 4.29004 60.3492 4.29004C60.8307 4.29004 61.1918 4.38635 61.4326 4.57896C61.6734 4.77157 61.7937 5.06049 61.7937 5.44571C61.7937 5.8189 61.6673 6.10782 61.4145 6.31247C61.1738 6.50508 60.8186 6.60139 60.3492 6.60139Z" fill="white"/><path d="M67.709 20.7765C66.6857 20.7765 65.843 20.6982 65.1809 20.5417C64.5309 20.3852 64.0493 20.1505 63.7363 19.8375C63.4233 19.5245 63.2668 19.1393 63.2668 18.6818C63.2668 18.128 63.4835 17.6766 63.9169 17.3275C64.3623 16.9663 65.0184 16.7436 65.8852 16.6594V16.2982C65.2351 16.3103 64.7415 16.2441 64.4045 16.0996C64.0674 15.9431 63.8988 15.6963 63.8988 15.3592C63.8988 15.0342 64.0614 14.7453 64.3864 14.4925C64.7235 14.2397 65.2772 14.029 66.0477 13.8605V13.4993C65.3133 13.4632 64.7415 13.2345 64.3322 12.8131C63.9229 12.3798 63.7183 11.82 63.7183 11.1338C63.7183 10.5198 63.8868 9.97813 64.2239 9.50863C64.561 9.03914 65.0545 8.67197 65.7046 8.40713C66.3667 8.13025 67.1672 7.99181 68.1062 7.99181H72.7831V9.79755L69.8217 9.36417V9.76144C70.5681 9.88182 71.1158 10.0925 71.4649 10.3934C71.8261 10.6944 72.0066 11.1037 72.0066 11.6214C72.0066 12.1149 71.8501 12.5543 71.5371 12.9395C71.2241 13.3127 70.7667 13.6077 70.1648 13.8244C69.5749 14.029 68.8586 14.1313 68.0159 14.1313C67.8594 14.1313 67.6909 14.1253 67.5103 14.1133C67.3298 14.1012 67.0469 14.0711 66.6616 14.023C66.4088 14.2036 66.2042 14.3661 66.0477 14.5105C65.8912 14.643 65.8129 14.7694 65.8129 14.8897C65.8129 14.986 65.8731 15.0703 65.9935 15.1425C66.1139 15.2027 66.2704 15.2449 66.463 15.2689C66.6556 15.293 66.8422 15.3051 67.0228 15.3051H69.5328C69.7735 15.3051 70.0805 15.3231 70.4537 15.3592C70.8389 15.3954 71.2181 15.4917 71.5913 15.6482C71.9765 15.8047 72.2955 16.0514 72.5484 16.3885C72.8132 16.7256 72.9456 17.2011 72.9456 17.815C72.9456 18.5012 72.747 19.061 72.3497 19.4944C71.9645 19.9398 71.3806 20.2648 70.5982 20.4695C69.8277 20.6741 68.8646 20.7765 67.709 20.7765ZM67.9076 18.9346C68.654 18.9346 69.2499 18.8925 69.6953 18.8082C70.1407 18.7239 70.4597 18.5855 70.6523 18.3929C70.8449 18.2123 70.9412 17.9776 70.9412 17.6886C70.9412 17.4238 70.8811 17.2192 70.7607 17.0747C70.6403 16.9182 70.4838 16.8098 70.2912 16.7497C70.1106 16.6895 69.924 16.6534 69.7314 16.6413C69.5388 16.6293 69.3763 16.6233 69.2438 16.6233H67.0228C66.4449 16.7075 66.0356 16.87 65.7949 17.1108C65.5662 17.3516 65.4518 17.6164 65.4518 17.9053C65.4518 18.1943 65.5481 18.4109 65.7407 18.5554C65.9333 18.7119 66.2102 18.8142 66.5713 18.8624C66.9445 18.9105 67.3899 18.9346 67.9076 18.9346ZM67.9618 12.8854C68.5878 12.8854 69.0633 12.7409 69.3883 12.452C69.7133 12.151 69.8759 11.7598 69.8759 11.2783C69.8759 10.7606 69.7073 10.3393 69.3702 10.0142C69.0452 9.67717 68.5697 9.50863 67.9437 9.50863C67.3177 9.50863 66.8302 9.67115 66.4811 9.99618C66.144 10.3212 65.9755 10.7365 65.9755 11.2421C65.9755 11.5672 66.0477 11.8561 66.1921 12.1089C66.3486 12.3497 66.5713 12.5423 66.8603 12.6867C67.1612 12.8192 67.5284 12.8854 67.9618 12.8854Z" fill="white"/><path d="M74.7825 17.5261V4.70536H77.0758V7.64872C77.0758 7.90152 77.0638 8.16035 77.0397 8.42519C77.0277 8.69003 77.0036 8.96089 76.9675 9.23777C76.9314 9.51465 76.8892 9.79153 76.8411 10.0684C76.805 10.3453 76.7628 10.6222 76.7147 10.8991H77.0939C77.2624 10.249 77.4791 9.70125 77.7439 9.25583C78.0088 8.79837 78.3459 8.44926 78.7552 8.2085C79.1765 7.96773 79.6881 7.84735 80.29 7.84735C81.3855 7.84735 82.2041 8.23258 82.7459 9.00303C83.2876 9.76144 83.5584 10.9171 83.5584 12.47V17.5261H81.2651V12.7951C81.2651 11.7598 81.1087 10.9954 80.7957 10.5018C80.4947 10.0082 80.0372 9.76144 79.4233 9.76144C78.9177 9.76144 78.4963 9.91793 78.1593 10.2309C77.8222 10.5319 77.5634 10.9352 77.3828 11.4408C77.2022 11.9464 77.0939 12.5182 77.0578 13.1562V17.5261H74.7825Z" fill="white"/><path d="M89.2495 17.7428C88.2503 17.7428 87.516 17.478 87.0465 16.9483C86.577 16.4066 86.3422 15.5699 86.3422 14.4383V9.9059H84.9518L84.9879 8.10015H85.9089C86.258 8.10015 86.5168 8.04598 86.6853 7.93764C86.8539 7.82929 86.9562 7.63668 86.9923 7.3598L87.209 5.98744H88.5272V8.0821H91.0191V9.97813H88.5272V14.348C88.5272 14.7934 88.6295 15.1185 88.8342 15.3231C89.0509 15.5278 89.3699 15.6301 89.7912 15.6301C90.0199 15.6301 90.2426 15.606 90.4593 15.5579C90.6881 15.4977 90.8987 15.4014 91.0913 15.2689V17.4358C90.7182 17.5562 90.3751 17.6345 90.0621 17.6706C89.7611 17.7187 89.4903 17.7428 89.2495 17.7428Z" fill="white"/><path d="M92.9634 17.5261V8.0821H95.2386V17.5261H92.9634ZM94.101 6.60139C93.6436 6.60139 93.2884 6.50508 93.0356 6.31247C92.7949 6.10782 92.6745 5.8189 92.6745 5.44571C92.6745 5.07253 92.7949 4.78963 93.0356 4.59702C93.2884 4.39236 93.6436 4.29004 94.101 4.29004C94.5825 4.29004 94.9437 4.38635 95.1845 4.57896C95.4252 4.77157 95.5456 5.06049 95.5456 5.44571C95.5456 5.8189 95.4192 6.10782 95.1664 6.31247C94.9256 6.50508 94.5705 6.60139 94.101 6.60139Z" fill="white"/><path d="M101.461 17.7609C100.823 17.7609 100.245 17.6947 99.7273 17.5622C99.2217 17.4419 98.7883 17.2673 98.4272 17.0386C98.066 16.7978 97.7771 16.5149 97.5604 16.1899C97.3437 15.8528 97.2113 15.4796 97.1632 15.0703L98.9508 14.4022C98.9749 14.7152 99.0953 14.9981 99.312 15.2509C99.5287 15.4917 99.8296 15.6843 100.215 15.8287C100.6 15.9732 101.064 16.0454 101.605 16.0454C102.207 16.0454 102.671 15.9551 102.996 15.7746C103.333 15.5819 103.501 15.3111 103.501 14.962C103.501 14.7092 103.411 14.5105 103.23 14.3661C103.05 14.2096 102.785 14.0832 102.436 13.9869C102.099 13.8785 101.69 13.7762 101.208 13.6799C100.763 13.5836 100.311 13.4752 99.8537 13.3549C99.4083 13.2224 98.993 13.0539 98.6077 12.8493C98.2346 12.6326 97.9276 12.3557 97.6868 12.0186C97.4581 11.6695 97.3437 11.2301 97.3437 10.7004C97.3437 10.1226 97.4942 9.623 97.7952 9.20166C98.1082 8.78032 98.5536 8.44926 99.1314 8.2085C99.7213 7.96773 100.432 7.84735 101.262 7.84735C102.045 7.84735 102.719 7.9557 103.285 8.17238C103.862 8.38907 104.332 8.70207 104.693 9.11137C105.054 9.50863 105.283 9.98415 105.379 10.5379L103.501 11.1338C103.465 10.7967 103.351 10.5138 103.158 10.2851C102.966 10.0443 102.707 9.86376 102.382 9.74338C102.057 9.623 101.678 9.56281 101.244 9.56281C100.69 9.56281 100.257 9.65911 99.944 9.85172C99.631 10.0443 99.4745 10.3032 99.4745 10.6282C99.4745 10.893 99.5708 11.1037 99.7634 11.2602C99.9681 11.4167 100.245 11.5431 100.594 11.6394C100.955 11.7357 101.365 11.832 101.822 11.9283C102.303 12.0246 102.767 12.139 103.212 12.2714C103.67 12.3918 104.079 12.5543 104.44 12.759C104.801 12.9636 105.09 13.2345 105.307 13.5716C105.524 13.8966 105.632 14.3179 105.632 14.8356C105.632 15.4616 105.464 15.9973 105.126 16.4427C104.789 16.8761 104.308 17.2071 103.682 17.4358C103.068 17.6525 102.328 17.7609 101.461 17.7609Z" fill="white"/></g><defs><clipPath id="sb_logo_clip"><rect width="111" height="25.4928" fill="white"/></clipPath></defs></svg>
        <span class="sb-sidebar__version">v1.0.0</span>
      </a>
      <nav class="sb-sidebar__section" aria-label="Overview">
        <span class="sb-sidebar__section-title">Overview</span>
        <a class="sb-sidebar__link" href="${p}index.html">Introduction</a>
      </nav>
      <nav class="sb-sidebar__section" aria-label="Foundations">
        <span class="sb-sidebar__section-title">Foundations</span>
        <a class="sb-sidebar__link" href="${p}foundations/colors.html">Colors</a>
        <a class="sb-sidebar__link" href="${p}foundations/typography.html">Typography</a>
        <a class="sb-sidebar__link" href="${p}foundations/spacing.html">Spacing</a>
        <a class="sb-sidebar__link" href="${p}foundations/radius.html">Radius</a>
        <a class="sb-sidebar__link" href="${p}foundations/elevation.html">Elevation</a>
        <a class="sb-sidebar__link" href="${p}foundations/borders.html">Borders</a>
        <a class="sb-sidebar__link" href="${p}foundations/blur.html">Blur</a>
        <a class="sb-sidebar__link" href="${p}foundations/breakpoints.html">Breakpoints</a>
        <a class="sb-sidebar__link" href="${p}foundations/grid.html">Grid</a>
        <a class="sb-sidebar__link" href="${p}foundations/layout.html">Layout blocks</a>
        <a class="sb-sidebar__link" href="${p}foundations/motion.html">Motion</a>
        <a class="sb-sidebar__link" href="${p}foundations/atmosphere.html">Atmosphere</a>
        <a class="sb-sidebar__link" href="${p}foundations/performance.html">Performance &amp; SEO</a>
        <a class="sb-sidebar__link" href="${p}foundations/icons.html">Icons</a>
        <a class="sb-sidebar__link" href="${p}foundations/logo.html">Logo</a>
      </nav>
      <nav class="sb-sidebar__section" aria-label="Inputs">
        <span class="sb-sidebar__section-title">Inputs</span>
        <a class="sb-sidebar__link" href="${p}components/buttons.html">Button</a>
        <a class="sb-sidebar__link" href="${p}components/inputs.html">Input</a>
        <a class="sb-sidebar__link" href="${p}components/textareas.html">Textarea</a>
        <a class="sb-sidebar__link" href="${p}components/select.html">Select</a>
        <a class="sb-sidebar__link" href="${p}components/checkbox-radio-toggle.html">Checkbox / Radio / Toggle</a>
        <a class="sb-sidebar__link" href="${p}components/segmented-control.html">Segmented control</a>
        <a class="sb-sidebar__link" href="${p}components/form-group.html">Form group</a>
      </nav>
      <nav class="sb-sidebar__section" aria-label="Data display">
        <span class="sb-sidebar__section-title">Data display</span>
        <a class="sb-sidebar__link" href="${p}components/cards.html">Card</a>
        <a class="sb-sidebar__link" href="${p}components/stat-kpi.html">Stat / KPI</a>
        <a class="sb-sidebar__link" href="${p}components/dividers.html">Divider</a>
        <a class="sb-sidebar__link" href="${p}components/tables.html">Table</a>
        <a class="sb-sidebar__link" href="${p}components/tabs.html">Tabs</a>
        <a class="sb-sidebar__link" href="${p}components/accordion.html">Accordion</a>
        <a class="sb-sidebar__link" href="${p}components/comparison-grid.html">Comparison grid</a>
      </nav>
      <nav class="sb-sidebar__section" aria-label="Feedback">
        <span class="sb-sidebar__section-title">Feedback</span>
        <a class="sb-sidebar__link" href="${p}components/modals.html">Modal</a>
        <a class="sb-sidebar__link" href="${p}components/alerts.html">Alert / Toast</a>
        <a class="sb-sidebar__link" href="${p}components/banner.html">Banner</a>
        <a class="sb-sidebar__link" href="${p}components/badges.html">Badge</a>
        <a class="sb-sidebar__link" href="${p}components/avatars.html">Avatar</a>
        <a class="sb-sidebar__link" href="${p}components/tooltips.html">Tooltip</a>
        <a class="sb-sidebar__link" href="${p}components/loaders.html">Loader</a>
        <a class="sb-sidebar__link" href="${p}components/empty-states.html">Empty state</a>
      </nav>
      <nav class="sb-sidebar__section" aria-label="Navigation">
        <span class="sb-sidebar__section-title">Navigation</span>
        <a class="sb-sidebar__link" href="${p}components/navbar.html">Navbar</a>
        <a class="sb-sidebar__link" href="${p}components/sidebar.html">Sidebar</a>
        <a class="sb-sidebar__link" href="${p}components/footer.html">Footer</a>
        <a class="sb-sidebar__link" href="${p}components/pagination.html">Pagination</a>
        <a class="sb-sidebar__link" href="${p}components/breadcrumbs.html">Breadcrumbs</a>
        <a class="sb-sidebar__link" href="${p}components/scroll-spy-toc.html">Scroll-spy TOC</a>
      </nav>
      <nav class="sb-sidebar__section" aria-label="Marketing">
        <span class="sb-sidebar__section-title">Marketing</span>
        <a class="sb-sidebar__link" href="${p}components/chat-bubble.html">Chat bubble</a>
        <a class="sb-sidebar__link" href="${p}components/marquee.html">Marquee</a>
      </nav>
      <nav class="sb-sidebar__section" aria-label="Content">
        <span class="sb-sidebar__section-title">Content</span>
        <a class="sb-sidebar__link" href="${p}components/code.html">Code</a>
        <a class="sb-sidebar__link" href="${p}components/kbd.html">Kbd</a>
      </nav>
      <nav class="sb-sidebar__section" aria-label="Patterns">
        <span class="sb-sidebar__section-title">Patterns</span>
        <a class="sb-sidebar__link" href="${p}patterns/hero.html">Hero</a>
        <a class="sb-sidebar__link" href="${p}patterns/feature-grid.html">Feature grid</a>
        <a class="sb-sidebar__link" href="${p}patterns/pricing-section.html">Pricing section</a>
        <a class="sb-sidebar__link" href="${p}patterns/cta-block.html">CTA block</a>
        <a class="sb-sidebar__link" href="${p}patterns/promo-banner.html">Promo banner</a>
        <a class="sb-sidebar__link" href="${p}patterns/newsletter-block.html">Newsletter block</a>
        <a class="sb-sidebar__link" href="${p}patterns/stats-strip.html">Stats strip</a>
        <a class="sb-sidebar__link" href="${p}patterns/team-grid.html">Team grid</a>
        <a class="sb-sidebar__link" href="${p}patterns/sidebar-content.html">Sidebar + content</a>
        <a class="sb-sidebar__link" href="${p}patterns/testimonial-row.html">Testimonial row</a>
        <a class="sb-sidebar__link" href="${p}patterns/logo-wall.html">Logo wall</a>
        <a class="sb-sidebar__link" href="${p}patterns/faq-block.html">FAQ block</a>
        <a class="sb-sidebar__link" href="${p}patterns/legal-prose.html">Legal prose</a>
      </nav>
    `;
  }

  // ── Copy-to-clipboard on every .sb-code block ─────────────────
  document.querySelectorAll('.sb-code').forEach(block => {
    if (block.querySelector('.sb-code__copy')) return;
    const btn = document.createElement('button');
    btn.className = 'sb-code__copy';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code');
    btn.addEventListener('click', async () => {
      const code = block.querySelector('pre, code');
      const text = code ? code.textContent : block.textContent;
      try {
        await navigator.clipboard.writeText(text.trim());
        btn.textContent = 'Copied';
        btn.classList.add('is-copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('is-copied'); }, 1400);
      } catch { btn.textContent = 'Copy failed'; }
    });
    block.appendChild(btn);
  });

  // ── State toggles — [data-sb-state-group] controls sibling [data-sb-state-target] ──
  document.querySelectorAll('[data-sb-state-group]').forEach(group => {
    const target = document.querySelector(group.dataset.sbStateTarget || '');
    group.querySelectorAll('[data-sb-state]').forEach(btn => {
      btn.addEventListener('click', () => {
        const state = btn.dataset.sbState;
        // Update active pill
        group.querySelectorAll('[data-sb-state]').forEach(b => b.classList.toggle('is-active', b === btn));
        if (!target) return;
        // Apply state — clear all prior is-* and data-state
        target.querySelectorAll('.sb-preview [class*="ins-"]').forEach(el => {
          el.classList.remove('is-hover', 'is-focus', 'is-active', 'is-disabled', 'is-error', 'is-loading', 'is-open');
          el.removeAttribute('disabled');
          el.removeAttribute('aria-disabled');
          el.removeAttribute('aria-invalid');
        });
        if (state === 'default') return;
        target.querySelectorAll('.sb-preview [class*="ins-"]').forEach(el => {
          if (state === 'hover')    el.classList.add('is-hover');
          if (state === 'focus')    { el.classList.add('is-focus'); el.style.boxShadow = 'var(--ins-focus-ring)'; }
          if (state === 'active')   el.classList.add('is-active');
          if (state === 'disabled') { el.setAttribute('disabled', ''); el.setAttribute('aria-disabled', 'true'); }
          if (state === 'error')    { el.classList.add('is-error'); el.setAttribute('aria-invalid', 'true'); }
          if (state === 'loading')  el.classList.add('is-loading');
        });
      });
    });
  });

  // ── Modal open/close ──────────────────────────────────────────
  document.querySelectorAll('[data-sb-open]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modal = document.querySelector(trigger.dataset.sbOpen);
      if (!modal) return;
      modal.setAttribute('aria-hidden', 'false');
      const first = modal.querySelector('button, [href], input, select, textarea, [tabindex]');
      if (first) first.focus();
    });
  });
  document.querySelectorAll('[data-sb-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.ins-modal');
      if (modal) modal.setAttribute('aria-hidden', 'true');
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.classList.contains('ins-modal')) return;
    e.target.setAttribute('aria-hidden', 'true');
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.ins-modal[aria-hidden="false"]').forEach(m => m.setAttribute('aria-hidden', 'true'));
  });

  // ── Accordion ─────────────────────────────────────────────────
  document.querySelectorAll('.ins-accordion').forEach(acc => {
    const allowMultiple = acc.dataset.allowMultiple === 'true';
    acc.querySelectorAll('.ins-accordion__trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.ins-accordion__item');
        if (!item) return;
        const isOpen = item.getAttribute('aria-expanded') === 'true';
        if (!allowMultiple) {
          acc.querySelectorAll('.ins-accordion__item').forEach(i => i.setAttribute('aria-expanded', 'false'));
        }
        item.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    });
  });

  // ── Tabs (button role=tab) ────────────────────────────────────
  document.querySelectorAll('.ins-tabs').forEach(tabset => {
    const tabs = tabset.querySelectorAll('.ins-tabs__tab');
    const panels = tabset.querySelectorAll('.ins-tabs__panel');
    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
        panels.forEach(p => p.hidden = true);
        tab.setAttribute('aria-selected', 'true');
        if (panels[idx]) panels[idx].hidden = false;
      });
      tab.addEventListener('keydown', e => {
        let next = idx;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (idx - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        else return;
        e.preventDefault();
        tabs[next].focus();
        tabs[next].click();
      });
    });
  });

  // ── Toggle button (mobile menu / sidebar) ─────────────────────
  document.querySelectorAll('[data-sb-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.sbToggle);
      if (!target) return;
      const open = target.getAttribute('data-open') === 'true';
      target.setAttribute('data-open', open ? 'false' : 'true');
    });
  });

  // ── Scroll-spy TOC (Privacy / legal pages) ────────────────────
  document.querySelectorAll('[data-sb-scrollspy]').forEach(toc => {
    const links = toc.querySelectorAll('.ins-toc__link');
    const targets = [...links].map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
    if (!targets.length) return;
    const byId = new Map(targets.map((el, i) => [el.id, links[i]]));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(l => l.removeAttribute('aria-current'));
        const link = byId.get(entry.target.id);
        if (link) link.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    targets.forEach(t => observer.observe(t));
  });

  // ── Marquee pause when off-screen (perf) ──────────────────────
  document.querySelectorAll('.ins-marquee').forEach(m => {
    const track = m.querySelector('.ins-marquee__track');
    if (!track) return;
    const io = new IntersectionObserver(([entry]) => {
      track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
    });
    io.observe(m);
  });

  // ── Contrast ratio widget for foundations/colors.html ─────────
  // Takes any [data-sb-contrast fg="#..." bg="#..."] element and
  // fills it with the ratio + an AA badge.
  function parseColor(input) {
    if (!input) return null;
    const el = document.createElement('div');
    el.style.color = input;
    document.body.appendChild(el);
    const rgb = getComputedStyle(el).color;
    document.body.removeChild(el);
    const m = rgb.match(/\d+(\.\d+)?/g);
    if (!m) return null;
    return [parseFloat(m[0]), parseFloat(m[1]), parseFloat(m[2]), m[3] !== undefined ? parseFloat(m[3]) : 1];
  }
  function relLuminance([r, g, b]) {
    const a = [r, g, b].map(v => {
      v = v / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function contrast(fg, bg) {
    const l1 = relLuminance(fg);
    const l2 = relLuminance(bg);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  function compositeOver(fg, bg) {
    const a = fg[3];
    if (a === 1) return fg;
    return [
      Math.round(fg[0] * a + bg[0] * (1 - a)),
      Math.round(fg[1] * a + bg[1] * (1 - a)),
      Math.round(fg[2] * a + bg[2] * (1 - a)),
      1
    ];
  }
  window.__insContrast = function insContrast(fgHex, bgHex) {
    const fg = parseColor(fgHex);
    const bg = parseColor(bgHex);
    if (!fg || !bg) return null;
    const flat = compositeOver(fg, bg);
    const ratio = contrast(flat, bg);
    return {
      ratio: Math.round(ratio * 100) / 100,
      pass: ratio >= 4.5,
      passLarge: ratio >= 3 && ratio < 4.5,
      fail: ratio < 3
    };
  };
  document.querySelectorAll('[data-sb-contrast]').forEach(el => {
    const fg = el.getAttribute('data-fg');
    const bg = el.getAttribute('data-bg');
    const exempt = el.hasAttribute('data-exempt');
    const result = window.__insContrast(fg, bg);
    if (!result) return;
    const badgeClass = exempt
      ? 'sb-swatch__badge--exempt'
      : result.pass ? 'sb-swatch__badge--pass'
      : result.passLarge ? 'sb-swatch__badge--large'
      : 'sb-swatch__badge--fail';
    const badgeLabel = exempt ? 'Exempt' : result.pass ? 'AA' : result.passLarge ? 'AA Large' : 'Fail';
    el.innerHTML = `<span class="sb-swatch__ratio">${result.ratio}:1</span>&nbsp;<span class="sb-swatch__badge ${badgeClass}">${badgeLabel}</span>`;
  });

  // ── Highlight current sidebar link on storybook pages ─────────
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.sb-sidebar__link').forEach(l => {
    if (l.getAttribute('href') === path || l.getAttribute('href')?.endsWith('/' + path)) {
      l.classList.add('is-active');
    }
  });

  // ── Scroll main content to top on load (fresh page navigation) ─
  // Storybook pages are multi-page; when user clicks a sidebar link and the new page loads,
  // focus/scroll the <main> top so long scroll state doesn't bleed across pages.
  const mainEl = document.getElementById('main');
  if (mainEl) {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }

  // ── Code block copy button — opt-in via data-copy="true" ──────
  document.querySelectorAll('.ins-code-block[data-copy="true"]').forEach(block => {
    if (block.querySelector('.ins-code-block__copy')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ins-code-block__copy';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code');
    btn.addEventListener('click', async () => {
      const code = block.querySelector('pre, code');
      try {
        await navigator.clipboard.writeText((code ? code.textContent : block.textContent).trim());
        btn.textContent = 'Copied';
        btn.classList.add('is-copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('is-copied'); }, 1400);
      } catch { btn.textContent = 'Failed'; }
    });
    block.appendChild(btn);
  });

  // ── Grid overlay toggle (press G) ─────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key !== 'g' && e.key !== 'G') return;
    if (e.target.matches('input, textarea, select, [contenteditable]')) return;
    document.body.classList.toggle('sb-show-grid');
  });

  // ── Viewport switcher — wraps [data-sb-viewport-preview] and adds a mobile/tablet/desktop control
  document.querySelectorAll('[data-sb-viewport-preview]').forEach(preview => {
    if (preview.querySelector('.sb-viewport__toolbar')) return;
    const widths = { mobile: 360, tablet: 768, desktop: 1200 };
    const toolbar = document.createElement('div');
    toolbar.className = 'sb-viewport__toolbar';
    toolbar.setAttribute('role', 'tablist');
    toolbar.innerHTML = `
      <button type="button" role="tab" aria-selected="true"  data-vp="desktop">Desktop</button>
      <button type="button" role="tab" aria-selected="false" data-vp="tablet">Tablet</button>
      <button type="button" role="tab" aria-selected="false" data-vp="mobile">Mobile</button>
    `;
    const frame = document.createElement('div');
    frame.className = 'sb-viewport__frame';
    while (preview.firstChild) frame.appendChild(preview.firstChild);
    preview.appendChild(toolbar);
    preview.appendChild(frame);
    toolbar.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const size = widths[btn.dataset.vp];
        toolbar.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', b === btn ? 'true' : 'false'));
        frame.style.maxWidth = size + 'px';
        frame.style.margin = btn.dataset.vp === 'desktop' ? '' : '0 auto';
      });
    });
  });

  // ── Input clear-icon handler (data-sb-clearable on wrap) ──────
  document.querySelectorAll('[data-sb-clearable] .ins-input-wrap__action').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('.ins-input');
      if (input) { input.value = ''; input.focus(); input.classList.remove('is-filled'); }
    });
  });
  document.querySelectorAll('[data-sb-clearable] .ins-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.toggle('is-filled', input.value.length > 0);
    });
  });

  // ── Newsletter composer: disable submit until valid email ─────
  document.querySelectorAll('[data-sb-validate-email]').forEach(composer => {
    const input = composer.querySelector('input[type="email"]');
    const btn   = composer.querySelector('button[type="submit"], button:not([type])');
    if (!input || !btn) return;
    const check = () => { btn.disabled = !input.checkValidity() || input.value.length === 0; };
    input.addEventListener('input', check);
    check();
  });

})();
