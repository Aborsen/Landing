import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';

/* ── HEADER ── */
function MenuIcon({ size = 24, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
}
function CloseIcon({ size = 24, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const NAV_ICONS = {
    chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8 11h.01 M12 11h.01 M16 11h.01',
    link: 'M12 22v-5 M9 8V2 M15 8V2 M18 8H6a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3z',
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 18v-4 M12 18v-2 M16 18v-6',
    bars: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z M2 12l8.58 3.91a2 2 0 0 0 1.66 0L21 12 M2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17',
    box: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z M12 3v9 M20 7.5l-8 4.5 M4 7.5l8 4.5',
    dollar: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
    star: 'M2 20H22 M5 20L7 12L12 17L17 12L19 20H5Z',
    pulse: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    settings: 'M21 4H8 M3 4h1 M4 4a3 3 0 1 0 6 0 3 3 0 0 0-6 0 M21 12h-5 M3 12h8 M16 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0 M21 20H8 M3 20h1 M4 20a3 3 0 1 0 6 0 3 3 0 0 0-6 0',
    play: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M10 8l6 4-6 4V8z',
    rss: 'M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z M16 6l2 2 M2 21.5l6.36-6.36',
    support: 'M3 18v-6a9 9 0 0 1 18 0v6 M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z',
    grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
    map: 'M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6z M12 12v8 M12 2v4',
  };

  function NavIcon({ name }) {
    const d = NAV_ICONS[name];
    if (!d) return null;
    const paths = d.split(' M').map((p, i) => i === 0 ? p : 'M' + p);
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {paths.map((p, i) => <path key={i} d={p} />)}
      </svg>
    );
  }

  const linkUrls = {
    'AI Chat': '../Platform/AI Chat.html',
    'Integrations': '../Platform/Integrations.html',
    'Insights Engine': '../Platform/Insights Engine.html',
    'Semantic Layer': '../Platform/Semantic Layer.html',
    'Reports': '../Platform/Reports.html',
    'Memory & Storage': '../Platform/Memory & Storage.html',
    'For RevOps & BizOps': '../Solutions/RevOps BizOps.html',
    'For Founders & CEOs': '../Solutions/Founders CEOs.html',
    'For Marketing Teams': '../Solutions/Marketing Teams.html',
    'For Product Teams': '../Solutions/Product Teams.html',
    'For Data & Analytics Teams': '../Solutions/Data Analytics Teams.html',
    'For Operations & Finance': '../Solutions/Operations Finance.html',
    'Pricing': '../Pricing.html',
    'Documentation': '../Resources/Documentation.html',
    'Blog': '../Resources/Blog.html',
    'Support Center': '../Resources/Contact Support.html',
    'Community': '../Resources/Community.html',
    'Roadmap': '../Resources/Roadmap.html',
    'About Insightis': '../Company/About Insightis.html',
    'Contacts': '../Company/Contacts.html',
    'Success Stories': '../Company/Success Stories.html',
    'Press & Media': '../Company/Press Media.html',
    'Video Tutorials': 'https://www.youtube.com/@InsightisAI',
  };

  const dropdowns = {
    Platform: {
      sections: [
        { heading: 'PRODUCT', items: [
          { label: 'AI Chat', desc: 'Ask anything about your data', icon: 'chat' },
          { label: 'Integrations', desc: 'Connect 200+ sources', icon: 'link' },
          { label: 'Insights Engine', desc: 'Automated insights from your data', icon: 'pulse' },
        ]},
        { heading: 'FEATURES', items: [
          { label: 'Semantic Layer', desc: 'One trusted source of truth', icon: 'bars' },
          { label: 'Reports', desc: 'Save and share answers with your team', icon: 'file' },
          { label: 'Memory & Storage', desc: 'Your business context, always remembered', icon: 'box', comingSoon: true },
        ]},
      ]
    },
    Solutions: {
      sections: [
        { heading: 'BY ROLE', items: [
          { label: 'For RevOps & BizOps', desc: 'Revenue operations and business intelligence', icon: 'dollar' },
          { label: 'For Founders & CEOs', desc: 'Strategic KPIs and company health at a glance', icon: 'star' },
          { label: 'For Marketing Teams', desc: 'Campaign analytics and cross-channel attribution', icon: 'pulse' },
        ]},
        { heading: 'BY TEAM', items: [
          { label: 'For Product Teams', desc: 'Usage metrics and feature adoption tracking', icon: 'box' },
          { label: 'For Data & Analytics Teams', desc: 'Advanced querying and data exploration', icon: 'bars' },
          { label: 'For Operations & Finance', desc: 'Cost tracking and operational efficiency', icon: 'settings' },
        ]},
      ]
    },
    Resources: {
      sections: [
        { heading: 'LEARN', items: [
          { label: 'Documentation', desc: 'Setup guides and API reference', icon: 'file' },
          { label: 'Video Tutorials', desc: 'Step-by-step walkthroughs', icon: 'play', external: true },
          { label: 'Blog', desc: 'Data analytics tips and product updates', icon: 'rss' },
        ]},
        { heading: 'CONNECT', items: [
          { label: 'Support Center', desc: 'Get help from our team', icon: 'support' },
          { label: 'Roadmap', desc: 'Follow product development in real time', icon: 'map' },
          { label: 'Community', desc: 'Join our community', icon: 'grid' },
        ]},
      ]
    }
  };

  const hasDropdown = (link) => !!dropdowns[link];
  const anyOpen = activeDropdown !== null;

  return (
    <>
      <div style={{position:'sticky', top:0, zIndex:50, backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)'}}>
      <div ref={navRef} style={{position:'relative', maxWidth:'1240px', width:'calc(100% - 32px)', margin:'0 auto', padding:'12px 0 0'}}>
        <nav style={{height:'56px', display:'flex', alignItems:'center', background:'rgba(10,14,19,0.92)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.08)', borderRadius: mobileOpen ? '24px 24px 0 0' : '50px', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)', padding:'0 8px 0 24px', transition:'border-radius 0.25s ease, box-shadow 0.3s ease'}}>
          <div style={{width:'100%'}} className="flex items-center justify-between">
            <a href="../index.html" className="flex items-center gap-2.5 flex-shrink-0">
              <svg width="111" height="26" viewBox="0 0 111 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7"><g clipPath="url(#clip0_2673_16536)"><path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/><path d="M33.2746 17.5261V5.60823H35.5859V17.5261H33.2746Z" fill="white"/><path d="M38.2797 17.5261V8.0821H40.1758L40.1216 10.9713H40.4466C40.6152 10.261 40.8379 9.67717 41.1148 9.21971C41.4037 8.76226 41.7708 8.41917 42.2163 8.19044C42.6617 7.96171 43.1793 7.84735 43.7692 7.84735C44.8406 7.84735 45.6532 8.22656 46.207 8.98497C46.7728 9.74338 47.0557 10.9171 47.0557 12.5062V17.5261H44.7624V12.7409C44.7624 11.7177 44.6059 10.9713 44.2929 10.5018C43.9919 10.0203 43.5405 9.77949 42.9386 9.77949C42.433 9.77949 42.0056 9.94201 41.6565 10.267C41.3074 10.58 41.0365 11.0014 40.8439 11.5311C40.6633 12.0487 40.567 12.6205 40.555 13.2465V17.5261H38.2797Z" fill="white"/><path d="M53.1255 17.7609C52.4875 17.7609 51.9096 17.6947 51.392 17.5622C50.8864 17.4419 50.453 17.2673 50.0918 17.0386C49.7307 16.7978 49.4418 16.5149 49.2251 16.1899C49.0084 15.8528 48.876 15.4796 48.8278 15.0703L50.6155 14.4022C50.6396 14.7152 50.76 14.9981 50.9767 15.2509C51.1933 15.4917 51.4943 15.6843 51.8795 15.8287C52.2647 15.9732 52.7282 16.0454 53.2699 16.0454C53.8719 16.0454 54.3353 15.9551 54.6604 15.7746C54.9974 15.5819 55.166 15.3111 55.166 14.962C55.166 14.7092 55.0757 14.5105 54.8951 14.3661C54.7145 14.2096 54.4497 14.0832 54.1006 13.9869C53.7635 13.8785 53.3542 13.7762 52.8727 13.6799C52.4273 13.5836 51.9758 13.4752 51.5184 13.3549C51.073 13.2224 50.6576 13.0539 50.2724 12.8493C49.8992 12.6326 49.5922 12.3557 49.3515 12.0186C49.1228 11.6695 49.0084 11.2301 49.0084 10.7004C49.0084 10.1226 49.1589 9.623 49.4598 9.20166C49.7728 8.78032 50.2182 8.44926 50.7961 8.2085C51.386 7.96773 52.0962 7.84735 52.9269 7.84735C53.7093 7.84735 54.3835 7.9557 54.9493 8.17238C55.5271 8.38907 55.9966 8.70207 56.3578 9.11137C56.7189 9.50863 56.9476 9.98415 57.0439 10.5379L55.166 11.1338C55.1299 10.7967 55.0155 10.5138 54.8229 10.2851C54.6303 10.0443 54.3714 9.86376 54.0464 9.74338C53.7214 9.623 53.3422 9.56281 52.9088 9.56281C52.355 9.56281 51.9217 9.65911 51.6087 9.85172C51.2957 10.0443 51.1392 10.3032 51.1392 10.6282C51.1392 10.893 51.2355 11.1037 51.4281 11.2602C51.6327 11.4167 51.9096 11.5431 52.2587 11.6394C52.6199 11.7357 53.0292 11.832 53.4866 11.9283C53.9682 12.0246 54.4316 12.139 54.8771 12.2714C55.3345 12.3918 55.7438 12.5543 56.105 12.759C56.4661 12.9636 56.755 13.2345 56.9717 13.5716C57.1884 13.8966 57.2967 14.3179 57.2967 14.8356C57.2967 15.4616 57.1282 15.9973 56.7911 16.4427C56.4541 16.8761 55.9725 17.2071 55.3465 17.4358C54.7326 17.6525 53.9922 17.7609 53.1255 17.7609Z" fill="white"/><path d="M59.2115 17.5261V8.0821H61.4868V17.5261H59.2115ZM60.3492 6.60139C59.8917 6.60139 59.5366 6.50508 59.2838 6.31247C59.043 6.10782 58.9226 5.8189 58.9226 5.44571C58.9226 5.07253 59.043 4.78963 59.2838 4.59702C59.5366 4.39236 59.8917 4.29004 60.3492 4.29004C60.8307 4.29004 61.1918 4.38635 61.4326 4.57896C61.6734 4.77157 61.7937 5.06049 61.7937 5.44571C61.7937 5.8189 61.6673 6.10782 61.4145 6.31247C61.1738 6.50508 60.8186 6.60139 60.3492 6.60139Z" fill="white"/><path d="M67.709 20.7765C66.6857 20.7765 65.843 20.6982 65.1809 20.5417C64.5309 20.3852 64.0493 20.1505 63.7363 19.8375C63.4233 19.5245 63.2668 19.1393 63.2668 18.6818C63.2668 18.128 63.4835 17.6766 63.9169 17.3275C64.3623 16.9663 65.0184 16.7436 65.8852 16.6594V16.2982C65.2351 16.3103 64.7415 16.2441 64.4045 16.0996C64.0674 15.9431 63.8988 15.6963 63.8988 15.3592C63.8988 15.0342 64.0614 14.7453 64.3864 14.4925C64.7235 14.2397 65.2772 14.029 66.0477 13.8605V13.4993C65.3133 13.4632 64.7415 13.2345 64.3322 12.8131C63.9229 12.3798 63.7183 11.82 63.7183 11.1338C63.7183 10.5198 63.8868 9.97813 64.2239 9.50863C64.561 9.03914 65.0545 8.67197 65.7046 8.40713C66.3667 8.13025 67.1672 7.99181 68.1062 7.99181H72.7831V9.79755L69.8217 9.36417V9.76144C70.5681 9.88182 71.1158 10.0925 71.4649 10.3934C71.8261 10.6944 72.0066 11.1037 72.0066 11.6214C72.0066 12.1149 71.8501 12.5543 71.5371 12.9395C71.2241 13.3127 70.7667 13.6077 70.1648 13.8244C69.5749 14.029 68.8586 14.1313 68.0159 14.1313C67.8594 14.1313 67.6909 14.1253 67.5103 14.1133C67.3298 14.1012 67.0469 14.0711 66.6616 14.023C66.4088 14.2036 66.2042 14.3661 66.0477 14.5105C65.8912 14.643 65.8129 14.7694 65.8129 14.8897C65.8129 14.986 65.8731 15.0703 65.9935 15.1425C66.1139 15.2027 66.2704 15.2449 66.463 15.2689C66.6556 15.293 66.8422 15.3051 67.0228 15.3051H69.5328C69.7735 15.3051 70.0805 15.3231 70.4537 15.3592C70.8389 15.3954 71.2181 15.4917 71.5913 15.6482C71.9765 15.8047 72.2955 16.0514 72.5484 16.3885C72.8132 16.7256 72.9456 17.2011 72.9456 17.815C72.9456 18.5012 72.747 19.061 72.3497 19.4944C71.9645 19.9398 71.3806 20.2648 70.5982 20.4695C69.8277 20.6741 68.8646 20.7765 67.709 20.7765ZM67.9076 18.9346C68.654 18.9346 69.2499 18.8925 69.6953 18.8082C70.1407 18.7239 70.4597 18.5855 70.6523 18.3929C70.8449 18.2123 70.9412 17.9776 70.9412 17.6886C70.9412 17.4238 70.8811 17.2192 70.7607 17.0747C70.6403 16.9182 70.4838 16.8098 70.2912 16.7497C70.1106 16.6895 69.924 16.6534 69.7314 16.6413C69.5388 16.6293 69.3763 16.6233 69.2438 16.6233H67.0228C66.4449 16.7075 66.0356 16.87 65.7949 17.1108C65.5662 17.3516 65.4518 17.6164 65.4518 17.9053C65.4518 18.1943 65.5481 18.4109 65.7407 18.5554C65.9333 18.7119 66.2102 18.8142 66.5713 18.8624C66.9445 18.9105 67.3899 18.9346 67.9076 18.9346ZM67.9618 12.8854C68.5878 12.8854 69.0633 12.7409 69.3883 12.452C69.7133 12.151 69.8759 11.7598 69.8759 11.2783C69.8759 10.7606 69.7073 10.3393 69.3702 10.0142C69.0452 9.67717 68.5697 9.50863 67.9437 9.50863C67.3177 9.50863 66.8302 9.67115 66.4811 9.99618C66.144 10.3212 65.9755 10.7365 65.9755 11.2421C65.9755 11.5672 66.0477 11.8561 66.1921 12.1089C66.3486 12.3497 66.5713 12.5423 66.8603 12.6867C67.1612 12.8192 67.5284 12.8854 67.9618 12.8854Z" fill="white"/><path d="M74.7825 17.5261V4.70536H77.0758V7.64872C77.0758 7.90152 77.0638 8.16035 77.0397 8.42519C77.0277 8.69003 77.0036 8.96089 76.9675 9.23777C76.9314 9.51465 76.8892 9.79153 76.8411 10.0684C76.805 10.3453 76.7628 10.6222 76.7147 10.8991H77.0939C77.2624 10.249 77.4791 9.70125 77.7439 9.25583C78.0088 8.79837 78.3459 8.44926 78.7552 8.2085C79.1765 7.96773 79.6881 7.84735 80.29 7.84735C81.3855 7.84735 82.2041 8.23258 82.7459 9.00303C83.2876 9.76144 83.5584 10.9171 83.5584 12.47V17.5261H81.2651V12.7951C81.2651 11.7598 81.1087 10.9954 80.7957 10.5018C80.4947 10.0082 80.0372 9.76144 79.4233 9.76144C78.9177 9.76144 78.4963 9.91793 78.1593 10.2309C77.8222 10.5319 77.5634 10.9352 77.3828 11.4408C77.2022 11.9464 77.0939 12.5182 77.0578 13.1562V17.5261H74.7825Z" fill="white"/><path d="M89.2495 17.7428C88.2503 17.7428 87.516 17.478 87.0465 16.9483C86.577 16.4066 86.3422 15.5699 86.3422 14.4383V9.9059H84.9518L84.9879 8.10015H85.9089C86.258 8.10015 86.5168 8.04598 86.6853 7.93764C86.8539 7.82929 86.9562 7.63668 86.9923 7.3598L87.209 5.98744H88.5272V8.0821H91.0191V9.97813H88.5272V14.348C88.5272 14.7934 88.6295 15.1185 88.8342 15.3231C89.0509 15.5278 89.3699 15.6301 89.7912 15.6301C90.0199 15.6301 90.2426 15.606 90.4593 15.5579C90.6881 15.4977 90.8987 15.4014 91.0913 15.2689V17.4358C90.7182 17.5562 90.3751 17.6345 90.0621 17.6706C89.7611 17.7187 89.4903 17.7428 89.2495 17.7428Z" fill="white"/><path d="M92.9634 17.5261V8.0821H95.2386V17.5261H92.9634ZM94.101 6.60139C93.6436 6.60139 93.2884 6.50508 93.0356 6.31247C92.7949 6.10782 92.6745 5.8189 92.6745 5.44571C92.6745 5.07253 92.7949 4.78963 93.0356 4.59702C93.2884 4.39236 93.6436 4.29004 94.101 4.29004C94.5825 4.29004 94.9437 4.38635 95.1845 4.57896C95.4252 4.77157 95.5456 5.06049 95.5456 5.44571C95.5456 5.8189 95.4192 6.10782 95.1664 6.31247C94.9256 6.50508 94.5705 6.60139 94.101 6.60139Z" fill="white"/><path d="M101.461 17.7609C100.823 17.7609 100.245 17.6947 99.7273 17.5622C99.2217 17.4419 98.7883 17.2673 98.4272 17.0386C98.066 16.7978 97.7771 16.5149 97.5604 16.1899C97.3437 15.8528 97.2113 15.4796 97.1632 15.0703L98.9508 14.4022C98.9749 14.7152 99.0953 14.9981 99.312 15.2509C99.5287 15.4917 99.8296 15.6843 100.215 15.8287C100.6 15.9732 101.064 16.0454 101.605 16.0454C102.207 16.0454 102.671 15.9551 102.996 15.7746C103.333 15.5819 103.501 15.3111 103.501 14.962C103.501 14.7092 103.411 14.5105 103.23 14.3661C103.05 14.2096 102.785 14.0832 102.436 13.9869C102.099 13.8785 101.69 13.7762 101.208 13.6799C100.763 13.5836 100.311 13.4752 99.8537 13.3549C99.4083 13.2224 98.993 13.0539 98.6077 12.8493C98.2346 12.6326 97.9276 12.3557 97.6868 12.0186C97.4581 11.6695 97.3437 11.2301 97.3437 10.7004C97.3437 10.1226 97.4942 9.623 97.7952 9.20166C98.1082 8.78032 98.5536 8.44926 99.1314 8.2085C99.7213 7.96773 100.432 7.84735 101.262 7.84735C102.045 7.84735 102.719 7.9557 103.285 8.17238C103.862 8.38907 104.332 8.70207 104.693 9.11137C105.054 9.50863 105.283 9.98415 105.379 10.5379L103.501 11.1338C103.465 10.7967 103.351 10.5138 103.158 10.2851C102.966 10.0443 102.707 9.86376 102.382 9.74338C102.057 9.623 101.678 9.56281 101.244 9.56281C100.69 9.56281 100.257 9.65911 99.944 9.85172C99.631 10.0443 99.4745 10.3032 99.4745 10.6282C99.4745 10.893 99.5708 11.1037 99.7634 11.2602C99.9681 11.4167 100.245 11.5431 100.594 11.6394C100.955 11.7357 101.365 11.832 101.822 11.9283C102.303 12.0246 102.767 12.139 103.212 12.2714C103.67 12.3918 104.079 12.5543 104.44 12.759C104.801 12.9636 105.09 13.2345 105.307 13.5716C105.524 13.8966 105.632 14.3179 105.632 14.8356C105.632 15.4616 105.464 15.9973 105.126 16.4427C104.789 16.8761 104.308 17.2071 103.682 17.4358C103.068 17.6525 102.328 17.7609 101.461 17.7609Z" fill="white"/></g><defs><clipPath id="clip0_2673_16536"><rect width="111" height="25.4928" fill="white"/></clipPath></defs></svg>
            </a>
            <div className="hidden md:flex items-center" style={{gap:'2px'}}>
              {['Platform', 'Solutions', 'Resources', 'Pricing'].map(link => (
                <div key={link}>
                  {hasDropdown(link) ? (
                    <button onClick={() => setActiveDropdown(activeDropdown === link ? null : link)} className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm transition-colors ${activeDropdown === link ? 'text-white bg-white/[0.08]' : 'text-[#A0A0B8] hover:text-white hover:bg-white/[0.04]'}`}>
                      {link}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{transition:'transform 0.2s', transform: activeDropdown === link ? 'rotate(180deg)' : 'rotate(0deg)', opacity:0.5}}><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                  ) : (
                    <a href={linkUrls[link] || '#'} className="flex items-center px-4 py-1.5 rounded-full text-sm text-[#A0A0B8] hover:text-white hover:bg-white/[0.04] transition-colors">{link}</a>
                  )}
                </div>
              ))}
            </div>
            <div className="hidden md:flex items-center flex-shrink-0" style={{gap:'12px'}}>
              <a href="#" className="text-sm text-[#A0A0B8] hover:text-white transition-colors px-3 py-1.5">Sign In</a>
              <a href="#" className="text-sm font-medium text-white bg-[#07807E] hover:bg-[#09A09D] px-5 py-2 rounded-full transition-colors">Start for Free</a>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
        {anyOpen && dropdowns[activeDropdown] && (
          <div style={{position:'absolute', left:0, right:0, zIndex:-1, marginTop:'-24px', background:'rgba(10,14,19,0.97)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', borderLeft:'1px solid rgba(255,255,255,0.08)', borderRight:'1px solid rgba(255,255,255,0.08)', borderBottom:'1px solid rgba(255,255,255,0.08)', borderRadius:'0 0 24px 24px', boxShadow:'0 12px 48px rgba(0,0,0,0.5)'}}>
            <div style={{padding:'44px 32px 28px'}}>
              <div className="flex gap-10">
                {dropdowns[activeDropdown].sections.map((section, si) => (
                  <div key={si} style={{flex:'1'}}>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#A0A0B8] mb-4 px-3">{section.heading}</p>
                    <div className="flex flex-col gap-0.5">
                      {section.items.map((item, ii) => (
                        <a key={ii} href={linkUrls[item.label] || '#'} {...(item.external ? {target:'_blank', rel:'noopener noreferrer'} : {})} onClick={() => setActiveDropdown(null)} className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group">
                          {item.icon && (
                            <div style={{flexShrink:0, marginTop:'2px', width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'8px', background:'rgba(10,152,150,0.1)', border:'1px solid rgba(10,152,150,0.2)', color:'#0EC4C1'}}>
                              <NavIcon name={item.icon} />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white group-hover:text-[#0EC4C1] transition-colors">{item.label}{item.external && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</span>
                              {item.comingSoon && (<span style={{fontSize:'10px', fontWeight:500, letterSpacing:'0.04em', padding:'1px 6px', borderRadius:'4px', background:'rgba(10,152,150,0.12)', border:'1px solid rgba(10,152,150,0.3)', color:'#0EC4C1', whiteSpace:'nowrap'}}>Coming Soon</span>)}
                            </span>
                            <span className="text-xs text-[#A0A0B8] mt-0.5 leading-relaxed">{item.desc}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {mobileOpen && (
          <div className="md:hidden" style={{position:'absolute', left:0, right:0, zIndex:-1, marginTop:'-1px', background:'rgba(10,14,19,0.97)', backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)', borderLeft:'1px solid rgba(255,255,255,0.08)', borderRight:'1px solid rgba(255,255,255,0.08)', borderBottom:'1px solid rgba(255,255,255,0.08)', borderRadius:'0 0 24px 24px', padding:'16px 24px'}}>
            {['Platform', 'Solutions', 'Resources', 'Pricing'].map(link => {
              const dd = dropdowns[link];
              if (!dd) {
                return <a key={link} href={linkUrls[link] || '#'} className="block py-3 text-[#A0A0B8] hover:text-white transition-colors">{link}</a>;
              }
              return (
                <details key={link} name="mobile-nav" style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                  <summary className="py-3 text-[#A0A0B8] cursor-pointer flex items-center justify-between" style={{listStyle:'none'}}>
                    <span>{link}</span>
                    <span style={{opacity:0.5,fontSize:'12px'}}>▾</span>
                  </summary>
                  <div style={{paddingLeft:'12px',paddingBottom:'8px'}}>
                    {dd.sections.flatMap(s => s.items).map(item => (
                      item.notClickable
                        ? <div key={item.label} className="block py-2 text-sm" style={{color:'#7878A8'}}>{item.label}{item.comingSoon && <span style={{marginLeft:'8px',fontSize:'9px',padding:'1px 6px',borderRadius:'4px',background:'rgba(10,152,150,0.12)',border:'1px solid rgba(10,152,150,0.3)',color:'#0EC4C1'}}>Coming soon</span>}</div>
                        : <a key={item.label} href={linkUrls[item.label] || '#'} className="block py-2 text-sm hover:text-white transition-colors" style={{color: item.comingSoon ? '#7878A8' : '#A0A0B8'}}>{item.label}{item.comingSoon && <span style={{marginLeft:'8px',fontSize:'9px',padding:'1px 6px',borderRadius:'4px',background:'rgba(10,152,150,0.12)',border:'1px solid rgba(10,152,150,0.3)',color:'#0EC4C1'}}>Coming soon</span>}</a>
                    ))}
                  </div>
                </details>
              );
            })}
            <div className="mt-4 pt-4 border-t border-[#1E1E30] flex flex-col gap-3">
              <a href="#" className="text-sm text-[#A0A0B8] text-center py-2">Sign In</a>
              <a href="#" className="text-sm font-medium text-white bg-[#07807E] px-5 py-2.5 rounded-full text-center">Start for Free</a>
            </div>
          </div>
        )}
      </div>
      </div>
      {anyOpen && (
        <div onClick={() => setActiveDropdown(null)} style={{position:'fixed', inset:0, zIndex:48, background:'rgba(0,0,0,0.4)', backdropFilter:'blur(2px)'}}/>
      )}
    </>
  );
}

/* ── ABOUT HERO ── */
function AboutHero() {
  const stats = [
    { num: '500K+', label: 'Devart users worldwide' },
    { num: '65%',   label: 'Fortune 100 customers' },
    { num: '200+',  label: 'Data source integrations' },
    { num: '25+',   label: 'Years of data expertise' },
  ];
  return (
    <section style={{padding:'120px 0 80px', position:'relative'}}>
      <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'100%', height:'100%', background:'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(9,160,157,.06) 0%, transparent 70%)', pointerEvents:'none'}}/>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px', textAlign:'center', position:'relative'}}>
        <h1 className="fu1" style={{fontSize:'clamp(32px,5vw,56px)', fontWeight:500, letterSpacing:'-.03em', lineHeight:1.15, marginBottom:'20px'}}>
          Every dataset has an insight.<br/>
          <span style={{color:'#0EC4C1'}}>We help you find it.</span>
        </h1>
        <p className="fu2" style={{fontSize:'17px', color:'rgba(255,255,255,.5)', maxWidth:'580px', margin:'0 auto', lineHeight:1.65}}>
          Insightis is the AI analytics workspace that lets anyone — not just analysts — ask questions about their data and get instant, accurate answers. No SQL. No dashboards. No waiting.
        </p>
        <div className="fu3" style={{display:'flex', justifyContent:'center', gap:'0', marginTop:'56px', borderTop:'1px solid rgba(255,255,255,.06)', borderBottom:'1px solid rgba(255,255,255,.06)', flexWrap:'wrap'}}>
          {stats.map((s, i) => (
            <div key={i} style={{flex:'1 1 160px', padding:'28px 24px', textAlign:'center', borderRight: i < stats.length-1 ? '1px solid rgba(255,255,255,.06)' : 'none'}}>
              <div style={{fontSize:'clamp(28px,3.5vw,42px)', fontWeight:600, color:'#0EC4C1', letterSpacing:'-.02em', lineHeight:1}}>{s.num}</div>
              <div style={{fontSize:'13px', color:'rgba(255,255,255,.4)', marginTop:'8px', letterSpacing:'.02em'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── MISSION VALUES ── */
function MissionValues() {
  const values = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
      title: 'Data should be accessible',
      desc: 'Business intelligence shouldn\'t require a data team. We believe every team member should be able to ask questions and get answers from their own data — in seconds, in plain English.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
      title: 'Accuracy is non-negotiable',
      desc: 'Generic AI guesses from internet averages. Insightis answers from your real data, through a certified Semantic Layer. Every answer is grounded, traceable, and trustworthy.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>,
      title: 'Complexity should be invisible',
      desc: 'Behind every simple answer is a sophisticated data pipeline — cross-source joins, metric certification, context memory. Our job is to make all of that disappear so you can focus on decisions.',
    },
  ];

  return (
    <section style={{padding:'80px 0 100px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{textAlign:'center', marginBottom:'56px'}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:5, padding:'4px 12px', background:'rgba(9,160,157,.08)', border:'1px solid rgba(9,160,157,.2)', borderRadius:'999px', marginBottom:'14px'}}>
            <span style={{color:'#09A09D', fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'#09A09D', fontFamily:'Geist Mono,monospace'}}>Our Values</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:500, color:'#fff', letterSpacing:'-.03em'}}>Built on three principles</h2>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px'}} className="md:grid-cols-3 grid-cols-1" >
          {values.map((v, i) => (
            <div key={i} style={{background:'rgba(13,17,23,.6)', border:'1px solid rgba(255,255,255,.06)', borderRadius:'16px', padding:'28px', position:'relative', overflow:'hidden', transition:'all .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(9,160,157,.25)';e.currentTarget.style.background='rgba(9,160,157,.04)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.06)';e.currentTarget.style.background='rgba(13,17,23,.6)';}}>
              <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(9,160,157,.2),transparent)'}}/>
              <div style={{width:'40px', height:'40px', borderRadius:'10px', background:'rgba(9,160,157,.08)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px'}}>
                {v.icon}
              </div>
              <h3 style={{fontSize:'17px', fontWeight:600, color:'#E8F2F5', marginBottom:'8px'}}>{v.title}</h3>
              <p style={{fontSize:'14px', color:'#7FA0AC', lineHeight:1.65}}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WHAT WE BUILT ── */
function WhatWeBuilt() {
  const pillars = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, name: 'AI Chat', desc: 'Ask anything in plain English' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5M9 8V2M15 8V2M18 8H6a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3z"/></svg>, name: 'Integrations', desc: '200+ data sources connected' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12l8.58 3.91a2 2 0 0 0 1.66 0L21 12"/><path d="M2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17"/></svg>, name: 'Semantic Layer', desc: 'One certified truth' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, name: 'Insights Engine', desc: 'Deep root-cause analysis' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 3v9"/><path d="M20 7.5l-8 4.5"/><path d="M4 7.5l8 4.5"/></svg>, name: 'Memory & Storage', desc: 'AI that learns your business' },
  ];

  return (
    <section style={{padding:'80px 0 100px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{textAlign:'center', marginBottom:'56px'}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:5, padding:'4px 12px', background:'rgba(9,160,157,.08)', border:'1px solid rgba(9,160,157,.2)', borderRadius:'999px', marginBottom:'14px'}}>
            <span style={{color:'#09A09D', fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'#09A09D', fontFamily:'Geist Mono,monospace'}}>The Platform</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:500, color:'#fff', letterSpacing:'-.03em'}}>One workspace for every data question</h2>
        </div>
        <div className="hidden md:flex" style={{alignItems:'flex-start', justifyContent:'space-between', gap:'0', position:'relative'}}>
          {pillars.map((p, i) => (
            <React.Fragment key={i}>
              <div style={{display:'flex', flexDirection:'column', alignItems: i===0 ? 'flex-start' : i===pillars.length-1 ? 'flex-end' : 'center', textAlign: i===0 ? 'left' : i===pillars.length-1 ? 'right' : 'center', flex:1}}>
                <div className="hb" style={{width:'64px', height:'64px', borderRadius:'16px', background:'rgba(9,160,157,.08)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'14px', animationDelay:`${i * 0.4}s`}}>
                  {p.icon}
                </div>
                <h4 style={{fontSize:'15px', fontWeight:600, color:'#E8F2F5', marginBottom:'4px'}}>{p.name}</h4>
                <p style={{fontSize:'12px', color:'#7FA0AC', lineHeight:1.5}}>{p.desc}</p>
              </div>
              {i < pillars.length - 1 && (
                <div style={{display:'flex', alignItems:'center', paddingTop:'24px', flexShrink:0, minWidth:'32px', flex:'0 0 auto'}}>
                  <div style={{width:'100%', minWidth:'32px', height:'1px', borderTop:'2px dashed rgba(9,160,157,.25)'}}/>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex md:hidden" style={{flexDirection:'column', alignItems:'center', gap:'16px'}}>
          {pillars.map((p, i) => (
            <React.Fragment key={i}>
              <div style={{display:'flex', alignItems:'center', gap:'16px', width:'100%', maxWidth:'320px'}}>
                <div className="hb" style={{width:'48px', height:'48px', borderRadius:'12px', background:'rgba(9,160,157,.08)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, animationDelay:`${i * 0.4}s`}}>
                  {p.icon}
                </div>
                <div>
                  <h4 style={{fontSize:'14px', fontWeight:600, color:'#E8F2F5', marginBottom:'2px'}}>{p.name}</h4>
                  <p style={{fontSize:'12px', color:'#7FA0AC', lineHeight:1.5}}>{p.desc}</p>
                </div>
              </div>
              {i < pillars.length - 1 && (
                <div style={{width:'1px', height:'20px', borderLeft:'2px dashed rgba(9,160,157,.25)'}}/>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── OUR MISSION ── */
function BackedBy() {
  return (
    <section style={{padding:'80px 0 100px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        {/* Header row */}
        <div style={{marginBottom:'48px'}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:5, padding:'4px 12px', background:'rgba(9,160,157,.08)', border:'1px solid rgba(9,160,157,.2)', borderRadius:'999px', marginBottom:'16px'}}>
            <span style={{color:'#09A09D', fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'#09A09D', fontFamily:'Geist Mono,monospace'}}>Our Mission</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:500, color:'#fff', letterSpacing:'-.03em', maxWidth:'700px'}}>Precise analytics for everyone</h2>
        </div>
        {/* Two-column text grid */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px 48px'}}>
          <p style={{fontSize:'16px', color:'#C0D4DC', lineHeight:1.75}}>
            Backed by <span style={{color:'#0EC4C1', fontWeight:500}}>Devart</span> and 25+ years of data expertise, we built Insightis with a single mission: make precise, trustworthy analytics accessible to every person in every team — no technical skills required.
          </p>
          <p style={{fontSize:'16px', color:'#C0D4DC', lineHeight:1.75}}>
            We believe data insights shouldn't be locked behind complex dashboards or reserved for analysts. Every founder, marketer, operator, and team lead deserves instant, accurate answers from their own data — in plain English, in seconds. That's the future we're building.
          </p>
          <p style={{fontSize:'16px', color:'#C0D4DC', lineHeight:1.75}}>
            Insightis combines AI that understands your questions with a certified Semantic Layer that guarantees accuracy. The result: analytics you can trust, delivered at the speed of conversation — so you can focus on making decisions, not waiting for reports.
          </p>
          <p style={{fontSize:'16px', color:'#C0D4DC', lineHeight:1.75}}>
            We connect to over 200 data sources, unify metrics through a single source of truth, and let AI handle the complexity — from cross-source joins to deep root-cause analysis. Every answer is grounded in your real data, fully traceable, and gets smarter with every conversation.
          </p>
          <p style={{fontSize:'16px', color:'#C0D4DC', lineHeight:1.75}}>
            Our goal is simple: eliminate the gap between having data and understanding it. Whether you're tracking revenue, monitoring churn, or exploring a new market segment — Insightis turns your questions into answers in seconds, not days.
          </p>
          <p style={{fontSize:'16px', color:'#C0D4DC', lineHeight:1.75}}>
            We're not building another BI tool. We're building the analytics layer that every modern business deserves — one that speaks your language, learns your business, and delivers the right answer every time you ask.
          </p>
          <p style={{fontSize:'16px', color:'#C0D4DC', lineHeight:1.75}}>
            Speed matters. The organizations that act on data fastest win. Insightis removes every bottleneck between a question and its answer — no waiting for a data engineer, no building a dashboard, no interpreting raw query results. Just ask, and know.
          </p>
          <p style={{fontSize:'16px', color:'#C0D4DC', lineHeight:1.75}}>
            Trust matters even more. Every insight Insightis delivers is backed by your certified data model — not AI guesswork. You always know where the answer came from, what data it's based on, and how confident you should be. That's what precision analytics means to us.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── OUR STORY TIMELINE ── */
function OurStory() {
  const milestones = [
    { year: '1997', title: 'Devart founded', desc: 'Started with a single Oracle connectivity product and a commitment to building data tools that simply work — for developers who demand reliability.' },
    { year: '2005', title: 'Data tools at scale', desc: 'Launched the dbForge product line — database management and development tools now used by hundreds of thousands of developers and organizations worldwide.' },
    { year: '2014', title: 'Cloud & connectivity', desc: 'Introduced Skyvia, bringing cloud data integration and backup to 200+ SaaS and cloud databases, cementing our position as a full-stack data company.' },
    { year: '2026', title: 'Insightis is born', desc: 'Built on 25 years of data expertise, Insightis brings conversational AI analytics to every business team. Ask in plain English. Get trusted answers instantly.' },
    { year: '∞', title: 'The journey continues', desc: 'Expanding integrations, deepening the Semantic Layer, and building the AI analytics platform that lets any person — in any role — understand their data.' },
  ];
  return (
    <section style={{padding:'80px 0 100px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{marginBottom:'56px'}}>
          <div style={{display:'inline-flex', alignItems:'center', gap:5, padding:'4px 12px', background:'rgba(9,160,157,.08)', border:'1px solid rgba(9,160,157,.2)', borderRadius:'999px', marginBottom:'16px'}}>
            <span style={{color:'#09A09D', fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'#09A09D', fontFamily:'Geist Mono,monospace'}}>Our Story</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:500, color:'#fff', letterSpacing:'-.03em'}}>From data tools to data intelligence</h2>
        </div>
        <div style={{position:'relative'}}>
          {/* Vertical line */}
          <div style={{position:'absolute', left:'120px', top:0, bottom:0, width:'1px', background:'linear-gradient(to bottom, transparent, rgba(9,160,157,.3) 10%, rgba(9,160,157,.3) 90%, transparent)'}} className="hidden md:block"/>
          <div style={{display:'flex', flexDirection:'column', gap:'0'}}>
            {milestones.map((m, i) => (
              <div key={i} style={{display:'flex', gap:'0', position:'relative', paddingBottom: i < milestones.length-1 ? '48px' : '0'}}>
                {/* Year label */}
                <div className="hidden md:block" style={{width:'120px', flexShrink:0, paddingTop:'4px'}}>
                  <span style={{fontSize: m.year === '∞' ? '26px' : '13px', fontWeight:600, color:'#09A09D', fontFamily:'Geist Mono,monospace', letterSpacing:'.04em', lineHeight:1}}>{m.year}</span>
                </div>
                {/* Dot */}
                <div className="hidden md:flex" style={{width:'0', flexShrink:0, position:'relative', justifyContent:'center'}}>
                  <div style={{width:'10px', height:'10px', borderRadius:'50%', background:'#09A09D', border:'2px solid rgba(9,160,157,.3)', boxShadow:'0 0 12px rgba(9,160,157,.4)', marginLeft:'-5px', marginTop:'6px', flexShrink:0}}/>
                </div>
                {/* Content */}
                <div style={{flex:1, paddingLeft:'40px'}}>
                  <div className="md:hidden" style={{fontSize: m.year === '∞' ? '24px' : '12px', fontWeight:600, color:'#09A09D', fontFamily:'Geist Mono,monospace', marginBottom:'6px', letterSpacing:'.04em', lineHeight:1}}>{m.year}</div>
                  <h3 style={{fontSize:'18px', fontWeight:600, color:'#E8F2F5', marginBottom:'8px', letterSpacing:'-.01em'}}>{m.title}</h3>
                  <p style={{fontSize:'15px', color:'#7FA0AC', lineHeight:1.7, maxWidth:'680px'}}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CONNECTOR ICONS (from index) ── */
function ConnectorIcon({ name, size = 20 }) {
  const icons = {
    HubSpot: <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF7A59"><path d="M18.16 5.67V3.39a1.71 1.71 0 0 0 1-1.55 1.72 1.72 0 0 0-3.44 0 1.71 1.71 0 0 0 1 1.55v2.28a5.55 5.55 0 0 0-2.8 1.5l-8.28-6.4a2.07 2.07 0 0 0 .05-.44 2.05 2.05 0 1 0-2.05 2.05 2.03 2.03 0 0 0 1.16-.37l8.13 6.27a5.56 5.56 0 0 0 .06 5.86l-2.49 2.49a1.87 1.87 0 0 0-.54-.08 1.88 1.88 0 1 0 1.88 1.88 1.87 1.87 0 0 0-.08-.54l2.45-2.45a5.59 5.59 0 1 0 3.95-9.87zm0 8.82a3.23 3.23 0 1 1 3.23-3.23 3.23 3.23 0 0 1-3.23 3.23z"/></svg>,
    AWS: <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF9900"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.583.16-.863.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.024c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167 4.593 4.593 0 0 1 1.005-.36 4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.44.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .535-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.128 0 .2.064.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.264-.168.312a.549.549 0 0 1-.32.08h-.687c-.152 0-.256-.024-.32-.08-.063-.056-.12-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.248-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247a.456.456 0 0 1 .144.024c.048.016.12.048.2.08.27.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.336-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.176 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.694 0 .223.08.415.24.567.16.152.454.304.87.44l1.133.358c.574.184.99.44 1.237.767.248.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/><path d="M21.384 17.752a22.372 22.372 0 0 1-9.263 2.024c-4.31 0-8.189-1.373-11.12-3.66-.23-.192-.024-.455.256-.303 3.167 1.843 7.085 2.955 11.133 2.955 2.73 0 5.732-.567 8.494-1.748.415-.184.766.272.5.732z" fill="#FF9900"/></svg>,
    Google: <svg width={size} height={size} viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
    Slack: <svg width={size} height={size} viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/><path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/><path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 0 1-2.52 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.52 2.522v6.312z" fill="#2EB67D"/><path d="M15.165 18.956a2.528 2.528 0 0 1 2.52 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.521-2.522v-2.522h2.521zm0-1.271a2.527 2.527 0 0 1-2.521-2.52 2.527 2.527 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.52h-6.313z" fill="#ECB22E"/></svg>,
    Salesforce: <svg width={size} height={size} viewBox="0 0 24 24" fill="#00A1E0"><path d="M10.006 5.16a4.182 4.182 0 0 1 3.16-1.456 4.2 4.2 0 0 1 3.924 2.712 5.073 5.073 0 0 1 1.728-.303 5.09 5.09 0 0 1 5.09 5.09 5.09 5.09 0 0 1-5.09 5.089h-.218a3.927 3.927 0 0 1-3.52 2.187 3.908 3.908 0 0 1-1.924-.504A4.476 4.476 0 0 1 9.038 20.5a4.455 4.455 0 0 1-1.136-.147 3.635 3.635 0 0 1-3.298 2.126A3.644 3.644 0 0 1 .96 18.835c0-.97.385-1.85 1.01-2.497a4.4 4.4 0 0 1-.409-1.858A4.426 4.426 0 0 1 4.62 10.1a4.4 4.4 0 0 1 1.374.219A4.69 4.69 0 0 1 10.006 5.16z"/></svg>,
    Stripe: <svg width={size} height={size} viewBox="0 0 24 24" fill="#635BFF"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.918 3.757 7.093c0 3.774 2.268 5.335 5.984 6.765 2.374.913 3.128 1.607 3.128 2.617 0 .936-.794 1.543-2.189 1.543-1.869 0-4.932-1.005-6.913-2.263l-.93 5.56C4.487 22.419 7.322 24 11.405 24c2.633 0 4.752-.655 6.282-1.894 1.678-1.349 2.543-3.354 2.543-5.815 0-3.884-2.363-5.462-6.254-7.141z"/></svg>,
    PostgreSQL: <svg width={size} height={size} viewBox="0 0 24 24" fill="#336791"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.825 2.865.356 4.471.476 6.636c.035.636.182 1.32.337 2.022.327 1.49.791 3.1 1.357 4.416.283.66.612 1.263 1.025 1.745.206.242.468.472.793.637.324.165.724.25 1.1.177.748-.146 1.202-.727 1.541-1.321.164-.288.302-.6.424-.912l.014.007c.76.366 1.628.474 2.469.36.14-.019.278-.046.413-.08l-.006.082c-.065.877-.036 1.755.09 2.63.202 1.388.632 2.86 1.756 3.876.052.047.108.085.163.126a1.966 1.966 0 0 0-.093.252c-.16.538-.125 1.08.215 1.528.34.448.876.648 1.39.685.516.037 1.07-.036 1.608-.169a5.867 5.867 0 0 0 1.55-.66c.509-.306.966-.712 1.196-1.265.142-.342.172-.711.065-1.073l-.002-.008c.314-.194.584-.424.822-.673.613-.642.975-1.422 1.197-2.2.439-1.538.464-3.19.453-4.26a.317.317 0 0 0 0-.032c.03-.019.06-.037.09-.057.475-.31.874-.734 1.167-1.235.518-.886.785-1.96.838-3.07.053-1.11-.1-2.28-.462-3.265a6.355 6.355 0 0 0-1.2-2.064C19.865.633 18.701.134 17.376.015 17.293.008 17.21.003 17.128 0z"/></svg>,
    BigQuery: <svg width={size} height={size} viewBox="0 0 24 24"><path d="M6.22 13.84l-3.76 3.76a10.48 10.48 0 0 0 7.23 4.15l2.72-4.58a5.93 5.93 0 0 1-6.19-3.33z" fill="#4285F4"/><path d="M21.73 10.49a10.46 10.46 0 0 0-3.31-6.03L14.6 8.28a5.93 5.93 0 0 1 2.23 5.71h4.91c.09-.49.09-.99-.01-3.5z" fill="#4285F4"/><path d="M12 17.91a5.91 5.91 0 0 1-5.59-3.93L2.46 17.6A10.49 10.49 0 0 0 12 22.44c1.67 0 3.27-.4 4.71-1.13l-3.82-3.82a5.9 5.9 0 0 1-.89.42z" fill="#4285F4"/><circle cx="12" cy="12" r="3.45" fill="#4285F4"/><path d="M12 1.56A10.49 10.49 0 0 0 2.46 6.4l3.82 3.82A5.91 5.91 0 0 1 12 6.09a5.87 5.87 0 0 1 2.73.68l3.69-3.69A10.45 10.45 0 0 0 12 1.56z" fill="#4285F4"/></svg>,
    Snowflake: <svg width={size} height={size} viewBox="0 0 24 24" fill="#29B5E8"><path d="M12.394 23.4a1.963 1.963 0 0 1-.979-.263L7.7 20.96a.492.492 0 0 1 .488-.854l3.715 2.177a.982.982 0 0 0 .982 0l3.715-2.177a.492.492 0 0 1 .488.854l-3.715 2.177a1.963 1.963 0 0 1-.979.263zM5.51 19.384a.492.492 0 0 1-.492-.492v-4.343a.492.492 0 0 1 .984 0v4.343a.492.492 0 0 1-.492.492zm12.768 0a.492.492 0 0 1-.492-.492v-4.343a.492.492 0 0 1 .984 0v4.343a.492.492 0 0 1-.492.492zm-6.384-3.684a1.963 1.963 0 0 1-.979-.263l-3.715-2.177a1.963 1.963 0 0 1-.979-1.7V7.2c0-.702.373-1.35.979-1.7L10.915 3.32a1.963 1.963 0 0 1 1.958 0l3.715 2.18c.606.35.979.998.979 1.7v4.36c0 .702-.373 1.35-.979 1.7l-3.715 2.177a1.963 1.963 0 0 1-.979.263zm0-14.16a.982.982 0 0 0-.49.132L7.69 3.852a.982.982 0 0 0-.49.85v4.36c0 .35.187.675.49.85l3.715 2.18a.982.982 0 0 0 .982 0l3.715-2.18a.982.982 0 0 0 .49-.85V4.7a.982.982 0 0 0-.49-.85L12.384 1.672a.982.982 0 0 0-.49-.132z"/></svg>,
    Redshift: <svg width={size} height={size} viewBox="0 0 24 24" fill="#8C4FFF"><path d="M1.463 8.586L12 14.12l10.537-5.534L12 3.051 1.463 8.586zm10.025 6.586L1.463 9.894v5.534L11.488 20.95v-5.778zm1.024 0v5.778l10.025-5.522V9.894l-10.025 5.278z"/></svg>,
  };
  return icons[name] || <svg width={size} height={size} viewBox="0 0 24 24" fill="#07807E"><rect width="24" height="24" rx="4"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="500">{name[0]}</text></svg>;
}

function ConnectorPill({ name }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12121F] border border-[#1E1E30] rounded-full flex-shrink-0 hover:border-[#2E2E40] transition-colors">
      <div className="w-5 h-5 flex items-center justify-center">
        <ConnectorIcon name={name} size={16} />
      </div>
      <span className="text-xs text-[#A0A0B8] font-medium whitespace-nowrap">{name}</span>
    </div>
  );
}

/* ── TRUSTED BY ── */
function CompanyIcon({ name, size = 16 }) {
  const icons = {
    IBM: <svg width={size} height={size} viewBox="0 0 24 24" fill="#1F70C1"><path d="M0 6.8h2.4v.8H0zm0 1.6h2.4v.8H0zm0 1.6h2.4v.8H0zm3.2-3.2h5.6c.4.8.6 1.6.6 2.4s-.2 1.6-.6 2.4H3.2v-.8h4.9c.2-.5.3-1 .3-1.6s-.1-1.1-.3-1.6H3.2zm0 1.6h4.2v.8H3.2zm7.6-1.6h5.6c.4.8.6 1.6.6 2.4s-.2 1.6-.6 2.4h-5.6v-.8h4.9c.2-.5.3-1 .3-1.6s-.1-1.1-.3-1.6h-4.9zm0 1.6h4.2v.8h-4.2zm7.6-1.6H24v.8h-2.4v-.8zm0 1.6H24v.8h-2.4v-.8zm0 1.6H24v.8h-2.4v-.8zM18.8 8.4h2.4v.8h-2.4v-.8z"/></svg>,
    Amazon: <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF9900"><path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705a.661.661 0 0 1-.748.075c-1.052-.873-1.238-1.279-1.814-2.111-1.732 1.766-2.958 2.295-5.204 2.295-2.658 0-4.726-1.641-4.726-4.923 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.384-2.294-.385-.579-1.124-.82-1.776-.82-1.207 0-2.284.619-2.548 1.902-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.548-.266-.472-.66C6.487 2.309 9.373 1.5 11.957 1.5c1.322 0 3.049.352 4.091 1.353 1.322 1.234 1.196 2.881 1.196 4.675v4.231c0 1.272.527 1.832 1.024 2.52.173.245.211.537-.011.719l-1.113.797zm2.56 2.274C17.559 21.995 14.951 23 12.67 23c-3.183 0-6.083-1.178-8.266-3.14-.172-.155-.019-.367.188-.247 2.351 1.369 5.257 2.191 8.263 2.191 2.026 0 4.252-.421 6.3-1.288.309-.131.568.203.549.553z"/></svg>,
    Samsung: <svg width={size} height={size} viewBox="0 0 24 24" fill="#1428A0"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.8 14.4c-.4 1.2-1.6 1.8-2.8 1.8H9c-1.2 0-2.4-.6-2.8-1.8-.2-.6-.2-1.2-.2-1.8V11c0-.6 0-1.2.2-1.8.4-1.2 1.6-1.8 2.8-1.8h6c1.2 0 2.4.6 2.8 1.8.2.6.2 1.2.2 1.8v1.6c0 .6 0 1.2-.2 1.8z"/><path d="M9.5 10.5h1v3h-1zm1.8 0h1v3h-1zm1.9 0h1v3h-1zm1.8.5v2h1v-2h-1z" fill="#fff"/></svg>,
    Toyota: <svg width={size} height={size} viewBox="0 0 24 24" fill="#EB0A1E"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 .45 3 1s-1.34 1-3 1-3-.45-3-1 1.34-1 3-1zm-6 6.5c0-1.1 2.69-2 6-2s6 .9 6 2v1c0 1.1-2.69 2-6 2s-6-.9-6-2v-1zm6 6.5c-3.31 0-6-.9-6-2v-1c1.29.8 3.52 1.3 6 1.3s4.71-.5 6-1.3v1c0 1.1-2.69 2-6 2z"/></svg>,
    Microsoft: <svg width={size} height={size} viewBox="0 0 24 24"><path d="M11.4 2H2v9.4h9.4V2z" fill="#F25022"/><path d="M22 2h-9.4v9.4H22V2z" fill="#7FBA00"/><path d="M11.4 12.6H2V22h9.4v-9.4z" fill="#00A4EF"/><path d="M22 12.6h-9.4V22H22v-9.4z" fill="#FFB900"/></svg>,
    Oracle: <svg width={size} height={size} viewBox="0 0 24 24" fill="#F80000"><path d="M12 4a8 8 0 1 0 0 16A8 8 0 0 0 12 4zm0 2a6 6 0 1 1 0 12A6 6 0 0 1 12 6z"/></svg>,
    Siemens: <svg width={size} height={size} viewBox="0 0 24 24" fill="#009999"><path d="M2 12h4v2H2zm4-4h4v10H6zm4-4h4v18h-4zm4 4h4v10h-4zm4 4h4v2h-4z"/></svg>,
    Cisco: <svg width={size} height={size} viewBox="0 0 24 24" fill="#1BA0D7"><path d="M1 9h2v6H1zm3.5-2h2v10h-2zm3.5-3h2v16H8zm3.5 3h2v10h-2zm3.5-3h2v16H15zm3.5 2h2v10h-2zm3.5 3h2v6h-2z"/></svg>,
    Accenture: <svg width={size} height={size} viewBox="0 0 24 24" fill="#A100FF"><path d="M12 2L22 20H2L12 2zm0 4L5 18h14L12 6z"/></svg>,
    Deloitte: <svg width={size} height={size} viewBox="0 0 24 24" fill="#86BC25"><path d="M3 6h2v12H3zm4-2h2v16H7zm4 3h2v10h-4z"/><circle cx="18" cy="12" r="4" fill="#86BC25"/></svg>,
    SAP: <svg width={size} height={size} viewBox="0 0 24 24" fill="#0070F2"><path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm2 2h5v2H6zm0 4h8v2H6zm6-4h4v6h-4z"/></svg>,
    Bosch: <svg width={size} height={size} viewBox="0 0 24 24" fill="#EA0016"><circle cx="12" cy="12" r="10" fill="none" stroke="#EA0016" strokeWidth="2"/><circle cx="12" cy="12" r="5"/></svg>,
  };
  return icons[name] || <svg width={size} height={size} viewBox="0 0 24 24" fill="#07807E"><rect width="24" height="24" rx="4"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="500">{name[0]}</text></svg>;
}

function CompanyPill({ name }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12121F] border border-[#1E1E30] rounded-full flex-shrink-0 hover:border-[#2E2E40] transition-colors">
      <div className="w-5 h-5 flex items-center justify-center">
        <CompanyIcon name={name} size={16} />
      </div>
      <span className="text-xs text-[#A0A0B8] font-medium whitespace-nowrap">{name}</span>
    </div>
  );
}

function TrustedBy() {
  const companies = ['IBM', 'Amazon', 'Samsung', 'Toyota', 'Microsoft', 'Oracle', 'Siemens', 'Cisco', 'Accenture', 'Deloitte', 'SAP', 'Bosch'];
  return (
    <section style={{padding:'0 16px', margin:'0 auto', maxWidth:'1272px'}}>
      <div style={{border:'1px solid rgba(255,255,255,.06)', background:'rgba(255,255,255,.02)', borderRadius:'16px', padding:'32px 32px', display:'flex', alignItems:'center', gap:'24px'}}>
        <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'#7878A8', whiteSpace:'nowrap', flexShrink:0, fontFamily:'Geist Mono,monospace'}}>Trusted by teams at</span>
        <div className="overflow-hidden flex-1 marquee-container" style={{maskImage:'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'}}>
          <div className="flex gap-3 marquee-left" style={{width:'max-content'}}>
            {[...companies, ...companies].map((name, i) => (
              <CompanyPill key={`${name}-${i}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTA() {
  return (
    <section style={{paddingTop:'32px', paddingBottom:'64px', position:'relative'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{position:'relative', borderRadius:'16px', border:'1px solid rgba(30,30,48,1)', padding:'32px 48px', overflow:'hidden', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:'24px', flexWrap:'wrap', background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)'}}>
          <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
          <h3 style={{fontSize:'clamp(22px,3vw,30px)', fontWeight:500, color:'#fff', letterSpacing:'-.03em', lineHeight:1.2, flexShrink:0}}>
            Ready to see your data <span style={{color:'#07807E'}}>clearly?</span>
          </h3>
          <div style={{display:'flex', alignItems:'center', width:'100%', maxWidth:'420px', background:'#0D0D1A', border:'1px solid rgba(46,46,64,1)', borderRadius:'12px', overflow:'hidden', flex:'1 1 340px'}}>
            <input type="email" placeholder="Enter your work email" style={{flex:1, background:'transparent', fontSize:'14px', color:'#fff', padding:'12px 16px', outline:'none', border:'none', fontFamily:'Geist,sans-serif', minWidth:0}} />
            <button style={{display:'inline-flex', alignItems:'center', gap:'8px', padding:'10px 20px', margin:'4px', fontSize:'13px', fontWeight:600, color:'#fff', background:'linear-gradient(135deg,#07807E,#09A09D)', borderRadius:'8px', border:'none', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, fontFamily:'Geist,sans-serif'}}>
              Start for Free
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function TwitterXIcon({ size = 16, color = "#A0A0B8" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function LinkedInIcon({ size = 16, color = "#A0A0B8" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
function YouTubeIcon({ size = 16, color = "#A0A0B8" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
}
function TikTokIcon({ size = 16, color = "#A0A0B8" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 005.58 2.17v-3.4a4.85 4.85 0 01-1-.16l.01-.02V6.69h.99z"/></svg>;
}

function Footer() {
  const linkUrls = {
    'AI Chat': '../Platform/AI Chat.html',
    'Integrations': '../Platform/Integrations.html',
    'Insights Engine': '../Platform/Insights Engine.html',
    'Semantic Layer': '../Platform/Semantic Layer.html',
    'Reports': '../Platform/Reports.html',
    'Memory & Storage': '../Platform/Memory & Storage.html',
    'For RevOps & BizOps': '../Solutions/RevOps BizOps.html',
    'For Founders & CEOs': '../Solutions/Founders CEOs.html',
    'For Marketing Teams': '../Solutions/Marketing Teams.html',
    'For Product Teams': '../Solutions/Product Teams.html',
    'For Data & Analytics Teams': '../Solutions/Data Analytics Teams.html',
    'For Operations & Finance': '../Solutions/Operations Finance.html',
  };
  return (
    <footer className="pt-16 pb-8 border-t border-[#1E1E30]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-14 items-start">
          <div className="shrink-0 md:max-w-[220px]">
            <a href="../index.html" className="flex items-center gap-2.5 mb-4">
              <svg width="111" height="26" viewBox="0 0 111 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7"><g clipPath="url(#clip0_footer)"><path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/><path d="M33.2746 17.5261V5.60823H35.5859V17.5261H33.2746Z" fill="white"/><path d="M38.2797 17.5261V8.0821H40.1758L40.1216 10.9713H40.4466C40.6152 10.261 40.8379 9.67717 41.1148 9.21971C41.4037 8.76226 41.7708 8.41917 42.2163 8.19044C42.6617 7.96171 43.1793 7.84735 43.7692 7.84735C44.8406 7.84735 45.6532 8.22656 46.207 8.98497C46.7728 9.74338 47.0557 10.9171 47.0557 12.5062V17.5261H44.7624V12.7409C44.7624 11.7177 44.6059 10.9713 44.2929 10.5018C43.9919 10.0203 43.5405 9.77949 42.9386 9.77949C42.433 9.77949 42.0056 9.94201 41.6565 10.267C41.3074 10.58 41.0365 11.0014 40.8439 11.5311C40.6633 12.0487 40.567 12.6205 40.555 13.2465V17.5261H38.2797Z" fill="white"/><path d="M53.1255 17.7609C52.4875 17.7609 51.9096 17.6947 51.392 17.5622C50.8864 17.4419 50.453 17.2673 50.0918 17.0386C49.7307 16.7978 49.4418 16.5149 49.2251 16.1899C49.0084 15.8528 48.876 15.4796 48.8278 15.0703L50.6155 14.4022C50.6396 14.7152 50.76 14.9981 50.9767 15.2509C51.1933 15.4917 51.4943 15.6843 51.8795 15.8287C52.2647 15.9732 52.7282 16.0454 53.2699 16.0454C53.8719 16.0454 54.3353 15.9551 54.6604 15.7746C54.9974 15.5819 55.166 15.3111 55.166 14.962C55.166 14.7092 55.0757 14.5105 54.8951 14.3661C54.7145 14.2096 54.4497 14.0832 54.1006 13.9869C53.7635 13.8785 53.3542 13.7762 52.8727 13.6799C52.4273 13.5836 51.9758 13.4752 51.5184 13.3549C51.073 13.2224 50.6576 13.0539 50.2724 12.8493C49.8992 12.6326 49.5922 12.3557 49.3515 12.0186C49.1228 11.6695 49.0084 11.2301 49.0084 10.7004C49.0084 10.1226 49.1589 9.623 49.4598 9.20166C49.7728 8.78032 50.2182 8.44926 50.7961 8.2085C51.386 7.96773 52.0962 7.84735 52.9269 7.84735C53.7093 7.84735 54.3835 7.9557 54.9493 8.17238C55.5271 8.38907 55.9966 8.70207 56.3578 9.11137C56.7189 9.50863 56.9476 9.98415 57.0439 10.5379L55.166 11.1338C55.1299 10.7967 55.0155 10.5138 54.8229 10.2851C54.6303 10.0443 54.3714 9.86376 54.0464 9.74338C53.7214 9.623 53.3422 9.56281 52.9088 9.56281C52.355 9.56281 51.9217 9.65911 51.6087 9.85172C51.2957 10.0443 51.1392 10.3032 51.1392 10.6282C51.1392 10.893 51.2355 11.1037 51.4281 11.2602C51.6327 11.4167 51.9096 11.5431 52.2587 11.6394C52.6199 11.7357 53.0292 11.832 53.4866 11.9283C53.9682 12.0246 54.4316 12.139 54.8771 12.2714C55.3345 12.3918 55.7438 12.5543 56.105 12.759C56.4661 12.9636 56.755 13.2345 56.9717 13.5716C57.1884 13.8966 57.2967 14.3179 57.2967 14.8356C57.2967 15.4616 57.1282 15.9973 56.7911 16.4427C56.4541 16.8761 55.9725 17.2071 55.3465 17.4358C54.7326 17.6525 53.9922 17.7609 53.1255 17.7609Z" fill="white"/><path d="M59.2115 17.5261V8.0821H61.4868V17.5261H59.2115ZM60.3492 6.60139C59.8917 6.60139 59.5366 6.50508 59.2838 6.31247C59.043 6.10782 58.9226 5.8189 58.9226 5.44571C58.9226 5.07253 59.043 4.78963 59.2838 4.59702C59.5366 4.39236 59.8917 4.29004 60.3492 4.29004C60.8307 4.29004 61.1918 4.38635 61.4326 4.57896C61.6734 4.77157 61.7937 5.06049 61.7937 5.44571C61.7937 5.8189 61.6673 6.10782 61.4145 6.31247C61.1738 6.50508 60.8186 6.60139 60.3492 6.60139Z" fill="white"/><path d="M67.709 20.7765C66.6857 20.7765 65.843 20.6982 65.1809 20.5417C64.5309 20.3852 64.0493 20.1505 63.7363 19.8375C63.4233 19.5245 63.2668 19.1393 63.2668 18.6818C63.2668 18.128 63.4835 17.6766 63.9169 17.3275C64.3623 16.9663 65.0184 16.7436 65.8852 16.6594V16.2982C65.2351 16.3103 64.7415 16.2441 64.4045 16.0996C64.0674 15.9431 63.8988 15.6963 63.8988 15.3592C63.8988 15.0342 64.0614 14.7453 64.3864 14.4925C64.7235 14.2397 65.2772 14.029 66.0477 13.8605V13.4993C65.3133 13.4632 64.7415 13.2345 64.3322 12.8131C63.9229 12.3798 63.7183 11.82 63.7183 11.1338C63.7183 10.5198 63.8868 9.97813 64.2239 9.50863C64.561 9.03914 65.0545 8.67197 65.7046 8.40713C66.3667 8.13025 67.1672 7.99181 68.1062 7.99181H72.7831V9.79755L69.8217 9.36417V9.76144C70.5681 9.88182 71.1158 10.0925 71.4649 10.3934C71.8261 10.6944 72.0066 11.1037 72.0066 11.6214C72.0066 12.1149 71.8501 12.5543 71.5371 12.9395C71.2241 13.3127 70.7667 13.6077 70.1648 13.8244C69.5749 14.029 68.8586 14.1313 68.0159 14.1313C67.8594 14.1313 67.6909 14.1253 67.5103 14.1133C67.3298 14.1012 67.0469 14.0711 66.6616 14.023C66.4088 14.2036 66.2042 14.3661 66.0477 14.5105C65.8912 14.643 65.8129 14.7694 65.8129 14.8897C65.8129 14.986 65.8731 15.0703 65.9935 15.1425C66.1139 15.2027 66.2704 15.2449 66.463 15.2689C66.6556 15.293 66.8422 15.3051 67.0228 15.3051H69.5328C69.7735 15.3051 70.0805 15.3231 70.4537 15.3592C70.8389 15.3954 71.2181 15.4917 71.5913 15.6482C71.9765 15.8047 72.2955 16.0514 72.5484 16.3885C72.8132 16.7256 72.9456 17.2011 72.9456 17.815C72.9456 18.5012 72.747 19.061 72.3497 19.4944C71.9645 19.9398 71.3806 20.2648 70.5982 20.4695C69.8277 20.6741 68.8646 20.7765 67.709 20.7765ZM67.9076 18.9346C68.654 18.9346 69.2499 18.8925 69.6953 18.8082C70.1407 18.7239 70.4597 18.5855 70.6523 18.3929C70.8449 18.2123 70.9412 17.9776 70.9412 17.6886C70.9412 17.4238 70.8811 17.2192 70.7607 17.0747C70.6403 16.9182 70.4838 16.8098 70.2912 16.7497C70.1106 16.6895 69.924 16.6534 69.7314 16.6413C69.5388 16.6293 69.3763 16.6233 69.2438 16.6233H67.0228C66.4449 16.7075 66.0356 16.87 65.7949 17.1108C65.5662 17.3516 65.4518 17.6164 65.4518 17.9053C65.4518 18.1943 65.5481 18.4109 65.7407 18.5554C65.9333 18.7119 66.2102 18.8142 66.5713 18.8624C66.9445 18.9105 67.3899 18.9346 67.9076 18.9346ZM67.9618 12.8854C68.5878 12.8854 69.0633 12.7409 69.3883 12.452C69.7133 12.151 69.8759 11.7598 69.8759 11.2783C69.8759 10.7606 69.7073 10.3393 69.3702 10.0142C69.0452 9.67717 68.5697 9.50863 67.9437 9.50863C67.3177 9.50863 66.8302 9.67115 66.4811 9.99618C66.144 10.3212 65.9755 10.7365 65.9755 11.2421C65.9755 11.5672 66.0477 11.8561 66.1921 12.1089C66.3486 12.3497 66.5713 12.5423 66.8603 12.6867C67.1612 12.8192 67.5284 12.8854 67.9618 12.8854Z" fill="white"/><path d="M74.7825 17.5261V4.70536H77.0758V7.64872C77.0758 7.90152 77.0638 8.16035 77.0397 8.42519C77.0277 8.69003 77.0036 8.96089 76.9675 9.23777C76.9314 9.51465 76.8892 9.79153 76.8411 10.0684C76.805 10.3453 76.7628 10.6222 76.7147 10.8991H77.0939C77.2624 10.249 77.4791 9.70125 77.7439 9.25583C78.0088 8.79837 78.3459 8.44926 78.7552 8.2085C79.1765 7.96773 79.6881 7.84735 80.29 7.84735C81.3855 7.84735 82.2041 8.23258 82.7459 9.00303C83.2876 9.76144 83.5584 10.9171 83.5584 12.47V17.5261H81.2651V12.7951C81.2651 11.7598 81.1087 10.9954 80.7957 10.5018C80.4947 10.0082 80.0372 9.76144 79.4233 9.76144C78.9177 9.76144 78.4963 9.91793 78.1593 10.2309C77.8222 10.5319 77.5634 10.9352 77.3828 11.4408C77.2022 11.9464 77.0939 12.5182 77.0578 13.1562V17.5261H74.7825Z" fill="white"/><path d="M89.2495 17.7428C88.2503 17.7428 87.516 17.478 87.0465 16.9483C86.577 16.4066 86.3422 15.5699 86.3422 14.4383V9.9059H84.9518L84.9879 8.10015H85.9089C86.258 8.10015 86.5168 8.04598 86.6853 7.93764C86.8539 7.82929 86.9562 7.63668 86.9923 7.3598L87.209 5.98744H88.5272V8.0821H91.0191V9.97813H88.5272V14.348C88.5272 14.7934 88.6295 15.1185 88.8342 15.3231C89.0509 15.5278 89.3699 15.6301 89.7912 15.6301C90.0199 15.6301 90.2426 15.606 90.4593 15.5579C90.6881 15.4977 90.8987 15.4014 91.0913 15.2689V17.4358C90.7182 17.5562 90.3751 17.6345 90.0621 17.6706C89.7611 17.7187 89.4903 17.7428 89.2495 17.7428Z" fill="white"/><path d="M92.9634 17.5261V8.0821H95.2386V17.5261H92.9634ZM94.101 6.60139C93.6436 6.60139 93.2884 6.50508 93.0356 6.31247C92.7949 6.10782 92.6745 5.8189 92.6745 5.44571C92.6745 5.07253 92.7949 4.78963 93.0356 4.59702C93.2884 4.39236 93.6436 4.29004 94.101 4.29004C94.5825 4.29004 94.9437 4.38635 95.1845 4.57896C95.4252 4.77157 95.5456 5.06049 95.5456 5.44571C95.5456 5.8189 95.4192 6.10782 95.1664 6.31247C94.9256 6.50508 94.5705 6.60139 94.101 6.60139Z" fill="white"/><path d="M101.461 17.7609C100.823 17.7609 100.245 17.6947 99.7273 17.5622C99.2217 17.4419 98.7883 17.2673 98.4272 17.0386C98.066 16.7978 97.7771 16.5149 97.5604 16.1899C97.3437 15.8528 97.2113 15.4796 97.1632 15.0703L98.9508 14.4022C98.9749 14.7152 99.0953 14.9981 99.312 15.2509C99.5287 15.4917 99.8296 15.6843 100.215 15.8287C100.6 15.9732 101.064 16.0454 101.605 16.0454C102.207 16.0454 102.671 15.9551 102.996 15.7746C103.333 15.5819 103.501 15.3111 103.501 14.962C103.501 14.7092 103.411 14.5105 103.23 14.3661C103.05 14.2096 102.785 14.0832 102.436 13.9869C102.099 13.8785 101.69 13.7762 101.208 13.6799C100.763 13.5836 100.311 13.4752 99.8537 13.3549C99.4083 13.2224 98.993 13.0539 98.6077 12.8493C98.2346 12.6326 97.9276 12.3557 97.6868 12.0186C97.4581 11.6695 97.3437 11.2301 97.3437 10.7004C97.3437 10.1226 97.4942 9.623 97.7952 9.20166C98.1082 8.78032 98.5536 8.44926 99.1314 8.2085C99.7213 7.96773 100.432 7.84735 101.262 7.84735C102.045 7.84735 102.719 7.9557 103.285 8.17238C103.862 8.38907 104.332 8.70207 104.693 9.11137C105.054 9.50863 105.283 9.98415 105.379 10.5379L103.501 11.1338C103.465 10.7967 103.351 10.5138 103.158 10.2851C102.966 10.0443 102.707 9.86376 102.382 9.74338C102.057 9.623 101.678 9.56281 101.244 9.56281C100.69 9.56281 100.257 9.65911 99.944 9.85172C99.631 10.0443 99.4745 10.3032 99.4745 10.6282C99.4745 10.893 99.5708 11.1037 99.7634 11.2602C99.9681 11.4167 100.245 11.5431 100.594 11.6394C100.955 11.7357 101.365 11.832 101.822 11.9283C102.303 12.0246 102.767 12.139 103.212 12.2714C103.67 12.3918 104.079 12.5543 104.44 12.759C104.801 12.9636 105.09 13.2345 105.307 13.5716C105.524 13.8966 105.632 14.3179 105.632 14.8356C105.632 15.4616 105.464 15.9973 105.126 16.4427C104.789 16.8761 104.308 17.2071 103.682 17.4358C103.068 17.6525 102.328 17.7609 101.461 17.7609Z" fill="white"/></g><defs><clipPath id="clip0_footer"><rect width="111" height="25.4928" fill="white"/></clipPath></defs></svg>
            </a>
            <p className="text-xs font-medium text-[#09A09D] uppercase tracking-wider mb-2">AI Analytics Workspace for instant insights</p>
            <p className="text-sm text-[#7878A8] leading-relaxed">Every data has an insight. We help you find them, without the complexity.</p>
          </div>
          <div className="md:ml-auto grid grid-cols-2 gap-8 md:flex md:flex-row md:gap-16">
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#7878A8] mb-4 whitespace-nowrap">Platform</h4>
              <ul className="flex flex-col gap-2.5">
                {['AI Chat', 'Integrations', 'Semantic Layer'].map(link => (
                  <li key={link}><a href={linkUrls[link] || '#'} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#7878A8] mb-4 whitespace-nowrap">Solutions</h4>
              <ul className="flex flex-col gap-2.5">
                {['For RevOps & BizOps', 'For Founders & CEOs', 'For Marketing Teams', 'For Product Teams', 'For Data & Analytics Teams', 'For Operations & Finance'].map(link => (
                  <li key={link}><a href={linkUrls[link] || '#'} {...(link === 'Video Tutorials' ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link}{link === 'Video Tutorials' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#7878A8] mb-4 whitespace-nowrap">Resources</h4>
              <ul className="flex flex-col gap-2.5">
                {['Documentation', 'Video Tutorials', 'Blog', 'Support Center', 'Roadmap', 'Community'].map(link => (
                  <li key={link}><a href={linkUrls[link] || '#'} {...(link === 'Video Tutorials' ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link}{link === 'Video Tutorials' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#7878A8] mb-4 whitespace-nowrap">Company</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'About Insightis', href: 'About Insightis.html' },
                  { label: 'About Devart', href: 'https://www.devart.com/company/' },
                  { label: 'Careers', href: 'https://www.devart.com/vacancies/' },
                  { label: 'Contacts', href: 'Contacts.html' },
                ].map(link => (
                  <li key={link.label}><a href={link.href} {...(link.href.startsWith('http') ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link.label}{link.href.startsWith('http') && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#7878A8] mb-4 whitespace-nowrap">Legal</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Privacy', href: '../Security/Privacy.html' },
                  { label: 'Terms', href: '../Security/Terms.html' },
                  { label: 'Security', href: '../Security/Security.html' },
                  { label: 'Cookie Settings', href: '../Security/Cookie Settings.html' },
                ].map(link => (
                  <li key={link.label}><a href={link.href} {...(link.href.startsWith('http') ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link.label}{link.href.startsWith('http') && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-[#1E1E30] pt-6 flex items-center justify-between">
          <p className="text-xs text-[#7878A8]">&copy; Copyright &copy; Devart 2026</p>
          <div className="flex items-center gap-4">
            <a href="https://x.com/Insightisai" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><TwitterXIcon size={18} color="#7878A8" /></a>
            <a href="https://www.tiktok.com/@insightisai" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><TikTokIcon size={18} color="#7878A8" /></a>
            <a href="https://www.youtube.com/@InsightisAI" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><YouTubeIcon size={18} color="#7878A8" /></a>
            <a href="https://www.linkedin.com/company/112025589" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><LinkedInIcon size={18} color="#7878A8" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── APP ── */
function App() {
  return (
    <div>
      <Header />
      <AboutHero />
      <MissionValues />
      <WhatWeBuilt />
      <OurStory />
      <TrustedBy />
      <BackedBy />
      <BottomCTA />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
