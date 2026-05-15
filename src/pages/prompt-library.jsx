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
    'AI Chat': '../Platform/AI Chat',
    'Integrations': '../Platform/Integrations',
    'Semantic Layer': '../Platform/Semantic Layer',
    'Memory & Storage': '../Platform/Memory & Storage',
    'For RevOps & BizOps': '../Solutions/RevOps BizOps',
    'For Founders & CEOs': '../Solutions/Founders CEOs',
    'For CMOs & Marketers': '../Solutions/Marketing Teams',
    'For Product Teams': '../Solutions/Product Teams',
    'For Data & Analytics Teams': '../Solutions/Data Analytics Teams',
    'For Operations & Finance': '../Solutions/Operations Finance',
    'Documentation': '../docs/',
    'Blog': '../blog/',
    'Support Center': 'Contact Support',
    'Roadmap': 'Roadmap',
    'Prompt Library': 'Prompt Library',
    'Data Connectors': 'Connectors',
    'Pricing': '../Pricing',
    'About Insightis': '../Company/About Insightis',
    'Contacts': '../Company/Contacts',
    'Success Stories': '../Company/Success Stories',
    'Press & Media': '../Company/Press Media',
  };

  const dropdowns = {
    Platform: {
      sections: [
        { heading: 'PRODUCT', items: [
          { label: 'AI Chat', desc: 'Ask anything about your data', icon: 'chat' },
          { label: 'Integrations', desc: 'Connect 200+ sources', icon: 'link' },
          { label: 'Semantic Layer', desc: 'One trusted source of truth', icon: 'bars' },
        ]},
        { heading: 'FEATURES', items: [
          { label: 'AI Connect', desc: 'Bring Insightis to your favorite AI tools', icon: 'pulse', comingSoon: true, notClickable: true },
          { label: 'Advanced Reports', desc: 'Rich, interactive reporting', icon: 'file', comingSoon: true, notClickable: true },
          { label: 'Memory & Storage', desc: 'Your business context, always remembered', icon: 'box', comingSoon: true },
        ]},
      ]
    },
    Solutions: {
      sections: [
        { heading: 'BY ROLE', items: [
          { label: 'For RevOps & BizOps', desc: 'Revenue operations and business intelligence', icon: 'dollar' },
          { label: 'For Founders & CEOs', desc: 'Strategic KPIs and company health at a glance', icon: 'star' },
          { label: 'For CMOs & Marketers', desc: 'Campaign analytics and cross-channel attribution', icon: 'pulse' },
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
          { label: 'Prompt Library', desc: 'Ready-made prompts for your data', icon: 'play' },
          { label: 'Blog', desc: 'Data analytics tips and product updates', icon: 'rss' },
        ]},
        { heading: 'CONNECT', items: [
          { label: 'Support Center', desc: 'Get help from our team', icon: 'support' },
          { label: 'Roadmap', desc: 'Follow product development in real time', icon: 'map' },
          { label: 'Data Connectors', desc: 'Browse all supported data sources', icon: 'grid' },
        ]},
      ]
    }
  };

  const hasDropdown = (link) => !!dropdowns[link];
  const anyOpen = activeDropdown !== null;

  return (
    <>
      <div style={{
        position:'sticky', top:0, zIndex:50,
        backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      }}>
      <div ref={navRef} style={{
        position:'relative',
        maxWidth:'1240px', width:'calc(100% - 32px)',
        margin:'0 auto',
        padding:'12px 0 0',
      }}>
        <nav style={{
          height:'56px', display:'flex', alignItems:'center',
          background:'rgba(10,14,19,0.92)',
          backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.08)',
          borderRadius: mobileOpen ? '24px 24px 0 0' : '50px',
          boxShadow:'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
          padding:'0 8px 0 24px',
          transition:'border-radius 0.25s ease, box-shadow 0.3s ease',
        }}>
          <div style={{width:'100%'}} className="flex items-center justify-between">
            <a href="/" aria-label="Insightis home" className="flex items-center gap-2.5 flex-shrink-0">
              <svg width="111" height="26" viewBox="0 0 111 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7"><g clipPath="url(#clip0_2673_16536)"><path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/><path d="M33.2746 17.5261V5.60823H35.5859V17.5261H33.2746Z" fill="white"/><path d="M38.2797 17.5261V8.0821H40.1758L40.1216 10.9713H40.4466C40.6152 10.261 40.8379 9.67717 41.1148 9.21971C41.4037 8.76226 41.7708 8.41917 42.2163 8.19044C42.6617 7.96171 43.1793 7.84735 43.7692 7.84735C44.8406 7.84735 45.6532 8.22656 46.207 8.98497C46.7728 9.74338 47.0557 10.9171 47.0557 12.5062V17.5261H44.7624V12.7409C44.7624 11.7177 44.6059 10.9713 44.2929 10.5018C43.9919 10.0203 43.5405 9.77949 42.9386 9.77949C42.433 9.77949 42.0056 9.94201 41.6565 10.267C41.3074 10.58 41.0365 11.0014 40.8439 11.5311C40.6633 12.0487 40.567 12.6205 40.555 13.2465V17.5261H38.2797Z" fill="white"/><path d="M53.1255 17.7609C52.4875 17.7609 51.9096 17.6947 51.392 17.5622C50.8864 17.4419 50.453 17.2673 50.0918 17.0386C49.7307 16.7978 49.4418 16.5149 49.2251 16.1899C49.0084 15.8528 48.876 15.4796 48.8278 15.0703L50.6155 14.4022C50.6396 14.7152 50.76 14.9981 50.9767 15.2509C51.1933 15.4917 51.4943 15.6843 51.8795 15.8287C52.2647 15.9732 52.7282 16.0454 53.2699 16.0454C53.8719 16.0454 54.3353 15.9551 54.6604 15.7746C54.9974 15.5819 55.166 15.3111 55.166 14.962C55.166 14.7092 55.0757 14.5105 54.8951 14.3661C54.7145 14.2096 54.4497 14.0832 54.1006 13.9869C53.7635 13.8785 53.3542 13.7762 52.8727 13.6799C52.4273 13.5836 51.9758 13.4752 51.5184 13.3549C51.073 13.2224 50.6576 13.0539 50.2724 12.8493C49.8992 12.6326 49.5922 12.3557 49.3515 12.0186C49.1228 11.6695 49.0084 11.2301 49.0084 10.7004C49.0084 10.1226 49.1589 9.623 49.4598 9.20166C49.7728 8.78032 50.2182 8.44926 50.7961 8.2085C51.386 7.96773 52.0962 7.84735 52.9269 7.84735C53.7093 7.84735 54.3835 7.9557 54.9493 8.17238C55.5271 8.38907 55.9966 8.70207 56.3578 9.11137C56.7189 9.50863 56.9476 9.98415 57.0439 10.5379L55.166 11.1338C55.1299 10.7967 55.0155 10.5138 54.8229 10.2851C54.6303 10.0443 54.3714 9.86376 54.0464 9.74338C53.7214 9.623 53.3422 9.56281 52.9088 9.56281C52.355 9.56281 51.9217 9.65911 51.6087 9.85172C51.2957 10.0443 51.1392 10.3032 51.1392 10.6282C51.1392 10.893 51.2355 11.1037 51.4281 11.2602C51.6327 11.4167 51.9096 11.5431 52.2587 11.6394C52.6199 11.7357 53.0292 11.832 53.4866 11.9283C53.9682 12.0246 54.4316 12.139 54.8771 12.2714C55.3345 12.3918 55.7438 12.5543 56.105 12.759C56.4661 12.9636 56.755 13.2345 56.9717 13.5716C57.1884 13.8966 57.2967 14.3179 57.2967 14.8356C57.2967 15.4616 57.1282 15.9973 56.7911 16.4427C56.4541 16.8761 55.9725 17.2071 55.3465 17.4358C54.7326 17.6525 53.9922 17.7609 53.1255 17.7609Z" fill="white"/><path d="M59.2115 17.5261V8.0821H61.4868V17.5261H59.2115ZM60.3492 6.60139C59.8917 6.60139 59.5366 6.50508 59.2838 6.31247C59.043 6.10782 58.9226 5.8189 58.9226 5.44571C58.9226 5.07253 59.043 4.78963 59.2838 4.59702C59.5366 4.39236 59.8917 4.29004 60.3492 4.29004C60.8307 4.29004 61.1918 4.38635 61.4326 4.57896C61.6734 4.77157 61.7937 5.06049 61.7937 5.44571C61.7937 5.8189 61.6673 6.10782 61.4145 6.31247C61.1738 6.50508 60.8186 6.60139 60.3492 6.60139Z" fill="white"/><path d="M67.709 20.7765C66.6857 20.7765 65.843 20.6982 65.1809 20.5417C64.5309 20.3852 64.0493 20.1505 63.7363 19.8375C63.4233 19.5245 63.2668 19.1393 63.2668 18.6818C63.2668 18.128 63.4835 17.6766 63.9169 17.3275C64.3623 16.9663 65.0184 16.7436 65.8852 16.6594V16.2982C65.2351 16.3103 64.7415 16.2441 64.4045 16.0996C64.0674 15.9431 63.8988 15.6963 63.8988 15.3592C63.8988 15.0342 64.0614 14.7453 64.3864 14.4925C64.7235 14.2397 65.2772 14.029 66.0477 13.8605V13.4993C65.3133 13.4632 64.7415 13.2345 64.3322 12.8131C63.9229 12.3798 63.7183 11.82 63.7183 11.1338C63.7183 10.5198 63.8868 9.97813 64.2239 9.50863C64.561 9.03914 65.0545 8.67197 65.7046 8.40713C66.3667 8.13025 67.1672 7.99181 68.1062 7.99181H72.7831V9.79755L69.8217 9.36417V9.76144C70.5681 9.88182 71.1158 10.0925 71.4649 10.3934C71.8261 10.6944 72.0066 11.1037 72.0066 11.6214C72.0066 12.1149 71.8501 12.5543 71.5371 12.9395C71.2241 13.3127 70.7667 13.6077 70.1648 13.8244C69.5749 14.029 68.8586 14.1313 68.0159 14.1313C67.8594 14.1313 67.6909 14.1253 67.5103 14.1133C67.3298 14.1012 67.0469 14.0711 66.6616 14.023C66.4088 14.2036 66.2042 14.3661 66.0477 14.5105C65.8912 14.643 65.8129 14.7694 65.8129 14.8897C65.8129 14.986 65.8731 15.0703 65.9935 15.1425C66.1139 15.2027 66.2704 15.2449 66.463 15.2689C66.6556 15.293 66.8422 15.3051 67.0228 15.3051H69.5328C69.7735 15.3051 70.0805 15.3231 70.4537 15.3592C70.8389 15.3954 71.2181 15.4917 71.5913 15.6482C71.9765 15.8047 72.2955 16.0514 72.5484 16.3885C72.8132 16.7256 72.9456 17.2011 72.9456 17.815C72.9456 18.5012 72.747 19.061 72.3497 19.4944C71.9645 19.9398 71.3806 20.2648 70.5982 20.4695C69.8277 20.6741 68.8646 20.7765 67.709 20.7765ZM67.9076 18.9346C68.654 18.9346 69.2499 18.8925 69.6953 18.8082C70.1407 18.7239 70.4597 18.5855 70.6523 18.3929C70.8449 18.2123 70.9412 17.9776 70.9412 17.6886C70.9412 17.4238 70.8811 17.2192 70.7607 17.0747C70.6403 16.9182 70.4838 16.8098 70.2912 16.7497C70.1106 16.6895 69.924 16.6534 69.7314 16.6413C69.5388 16.6293 69.3763 16.6233 69.2438 16.6233H67.0228C66.4449 16.7075 66.0356 16.87 65.7949 17.1108C65.5662 17.3516 65.4518 17.6164 65.4518 17.9053C65.4518 18.1943 65.5481 18.4109 65.7407 18.5554C65.9333 18.7119 66.2102 18.8142 66.5713 18.8624C66.9445 18.9105 67.3899 18.9346 67.9076 18.9346ZM67.9618 12.8854C68.5878 12.8854 69.0633 12.7409 69.3883 12.452C69.7133 12.151 69.8759 11.7598 69.8759 11.2783C69.8759 10.7606 69.7073 10.3393 69.3702 10.0142C69.0452 9.67717 68.5697 9.50863 67.9437 9.50863C67.3177 9.50863 66.8302 9.67115 66.4811 9.99618C66.144 10.3212 65.9755 10.7365 65.9755 11.2421C65.9755 11.5672 66.0477 11.8561 66.1921 12.1089C66.3486 12.3497 66.5713 12.5423 66.8603 12.6867C67.1612 12.8192 67.5284 12.8854 67.9618 12.8854Z" fill="white"/><path d="M74.7825 17.5261V4.70536H77.0758V7.64872C77.0758 7.90152 77.0638 8.16035 77.0397 8.42519C77.0277 8.69003 77.0036 8.96089 76.9675 9.23777C76.9314 9.51465 76.8892 9.79153 76.8411 10.0684C76.805 10.3453 76.7628 10.6222 76.7147 10.8991H77.0939C77.2624 10.249 77.4791 9.70125 77.7439 9.25583C78.0088 8.79837 78.3459 8.44926 78.7552 8.2085C79.1765 7.96773 79.6881 7.84735 80.29 7.84735C81.3855 7.84735 82.2041 8.23258 82.7459 9.00303C83.2876 9.76144 83.5584 10.9171 83.5584 12.47V17.5261H81.2651V12.7951C81.2651 11.7598 81.1087 10.9954 80.7957 10.5018C80.4947 10.0082 80.0372 9.76144 79.4233 9.76144C78.9177 9.76144 78.4963 9.91793 78.1593 10.2309C77.8222 10.5319 77.5634 10.9352 77.3828 11.4408C77.2022 11.9464 77.0939 12.5182 77.0578 13.1562V17.5261H74.7825Z" fill="white"/><path d="M89.2495 17.7428C88.2503 17.7428 87.516 17.478 87.0465 16.9483C86.577 16.4066 86.3422 15.5699 86.3422 14.4383V9.9059H84.9518L84.9879 8.10015H85.9089C86.258 8.10015 86.5168 8.04598 86.6853 7.93764C86.8539 7.82929 86.9562 7.63668 86.9923 7.3598L87.209 5.98744H88.5272V8.0821H91.0191V9.97813H88.5272V14.348C88.5272 14.7934 88.6295 15.1185 88.8342 15.3231C89.0509 15.5278 89.3699 15.6301 89.7912 15.6301C90.0199 15.6301 90.2426 15.606 90.4593 15.5579C90.6881 15.4977 90.8987 15.4014 91.0913 15.2689V17.4358C90.7182 17.5562 90.3751 17.6345 90.0621 17.6706C89.7611 17.7187 89.4903 17.7428 89.2495 17.7428Z" fill="white"/><path d="M92.9634 17.5261V8.0821H95.2386V17.5261H92.9634ZM94.101 6.60139C93.6436 6.60139 93.2884 6.50508 93.0356 6.31247C92.7949 6.10782 92.6745 5.8189 92.6745 5.44571C92.6745 5.07253 92.7949 4.78963 93.0356 4.59702C93.2884 4.39236 93.6436 4.29004 94.101 4.29004C94.5825 4.29004 94.9437 4.38635 95.1845 4.57896C95.4252 4.77157 95.5456 5.06049 95.5456 5.44571C95.5456 5.8189 95.4192 6.10782 95.1664 6.31247C94.9256 6.50508 94.5705 6.60139 94.101 6.60139Z" fill="white"/><path d="M101.461 17.7609C100.823 17.7609 100.245 17.6947 99.7273 17.5622C99.2217 17.4419 98.7883 17.2673 98.4272 17.0386C98.066 16.7978 97.7771 16.5149 97.5604 16.1899C97.3437 15.8528 97.2113 15.4796 97.1632 15.0703L98.9508 14.4022C98.9749 14.7152 99.0953 14.9981 99.312 15.2509C99.5287 15.4917 99.8296 15.6843 100.215 15.8287C100.6 15.9732 101.064 16.0454 101.605 16.0454C102.207 16.0454 102.671 15.9551 102.996 15.7746C103.333 15.5819 103.501 15.3111 103.501 14.962C103.501 14.7092 103.411 14.5105 103.23 14.3661C103.05 14.2096 102.785 14.0832 102.436 13.9869C102.099 13.8785 101.69 13.7762 101.208 13.6799C100.763 13.5836 100.311 13.4752 99.8537 13.3549C99.4083 13.2224 98.993 13.0539 98.6077 12.8493C98.2346 12.6326 97.9276 12.3557 97.6868 12.0186C97.4581 11.6695 97.3437 11.2301 97.3437 10.7004C97.3437 10.1226 97.4942 9.623 97.7952 9.20166C98.1082 8.78032 98.5536 8.44926 99.1314 8.2085C99.7213 7.96773 100.432 7.84735 101.262 7.84735C102.045 7.84735 102.719 7.9557 103.285 8.17238C103.862 8.38907 104.332 8.70207 104.693 9.11137C105.054 9.50863 105.283 9.98415 105.379 10.5379L103.501 11.1338C103.465 10.7967 103.351 10.5138 103.158 10.2851C102.966 10.0443 102.707 9.86376 102.382 9.74338C102.057 9.623 101.678 9.56281 101.244 9.56281C100.69 9.56281 100.257 9.65911 99.944 9.85172C99.631 10.0443 99.4745 10.3032 99.4745 10.6282C99.4745 10.893 99.5708 11.1037 99.7634 11.2602C99.9681 11.4167 100.245 11.5431 100.594 11.6394C100.955 11.7357 101.365 11.832 101.822 11.9283C102.303 12.0246 102.767 12.139 103.212 12.2714C103.67 12.3918 104.079 12.5543 104.44 12.759C104.801 12.9636 105.09 13.2345 105.307 13.5716C105.524 13.8966 105.632 14.3179 105.632 14.8356C105.632 15.4616 105.464 15.9973 105.126 16.4427C104.789 16.8761 104.308 17.2071 103.682 17.4358C103.068 17.6525 102.328 17.7609 101.461 17.7609Z" fill="white"/></g><defs><clipPath id="clip0_2673_16536"><rect width="111" height="25.4928" fill="white"/></clipPath></defs></svg>
            </a>

            <div className="hidden md:flex items-center" style={{gap:'2px'}}>
              {['Platform', 'Solutions', 'Resources', 'Pricing'].map(link => (
                <div key={link}>
                  {hasDropdown(link) ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link ? null : link)}
                      className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm transition-colors ${activeDropdown === link ? 'text-white bg-white/[0.08]' : 'text-[#A0A0B8] hover:text-white hover:bg-white/[0.04]'}`}
                    >
                      {link}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{transition:'transform 0.2s', transform: activeDropdown === link ? 'rotate(180deg)' : 'rotate(0deg)', opacity:0.5}}>
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                  ) : (
                    <a href={linkUrls[link] || '#'} className="flex items-center px-4 py-1.5 rounded-full text-sm text-[#A0A0B8] hover:text-white hover:bg-white/[0.04] transition-colors">
                      {link}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden md:flex items-center flex-shrink-0" style={{gap:'12px'}}>
              <a href="#" className="text-sm text-[#A0A0B8] hover:text-white transition-colors px-3 py-1.5">Sign In</a>
              <a href="#" className="text-sm font-medium text-white bg-[#07807E] hover:bg-[#09A09D] px-5 py-2 rounded-full transition-colors">Start for Free</a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {anyOpen && dropdowns[activeDropdown] && (
          <div style={{
            position:'absolute', left:0, right:0, zIndex:-1,
            marginTop:'-24px',
            background:'rgba(10,14,19,0.97)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            borderLeft:'1px solid rgba(255,255,255,0.08)',
            borderRight:'1px solid rgba(255,255,255,0.08)',
            borderBottom:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'0 0 24px 24px',
            boxShadow:'0 12px 48px rgba(0,0,0,0.5)',
          }}>
            <div style={{padding:'44px 32px 28px'}}>
              <div className="flex gap-10">
                {dropdowns[activeDropdown].sections.map((section, si) => (
                  <div key={si} style={{flex:'1'}}>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#A0A0B8] mb-4 px-3">{section.heading}</p>
                    <div className="flex flex-col gap-0.5">
                      {section.items.map((item, ii) => {
                        const inner = (<>
                          {item.icon && (
                            <div style={{
                              flexShrink:0, marginTop:'2px',
                              width:'30px', height:'30px',
                              display:'flex', alignItems:'center', justifyContent:'center',
                              borderRadius:'8px',
                              background:'rgba(10,152,150,0.1)',
                              border:'1px solid rgba(10,152,150,0.2)',
                              color:'#0EC4C1',
                            }}>
                              <NavIcon name={item.icon} />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="flex items-center gap-2">
                              <span className={`text-sm font-medium text-white transition-colors ${item.notClickable ? '' : 'group-hover:text-[#0EC4C1]'}`}>{item.label}{item.external && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</span>
                              {item.comingSoon && (
                                <span style={{fontSize:'10px', fontWeight:500, letterSpacing:'0.04em', padding:'1px 6px', borderRadius:'4px', background:'rgba(10,152,150,0.12)', border:'1px solid rgba(10,152,150,0.3)', color:'#0EC4C1', whiteSpace:'nowrap'}}>Coming Soon</span>
                              )}
                            </span>
                            <span className="text-xs text-[#A0A0B8] mt-0.5 leading-relaxed">{item.desc}</span>
                          </div>
                        </>);
                        return item.notClickable ? (
                          <div key={ii} className="flex items-start gap-3 px-3 py-2.5 rounded-xl group" style={{cursor:'default'}}>{inner}</div>
                        ) : (
                          <a key={ii} href={linkUrls[item.label] || '#'} {...(item.external ? {target:'_blank', rel:'noopener noreferrer'} : {})} onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group">{inner}</a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="md:hidden" style={{
            position:'absolute', left:0, right:0, zIndex:-1,
            marginTop:'-1px',
            background:'rgba(10,14,19,0.97)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            borderLeft:'1px solid rgba(255,255,255,0.08)',
            borderRight:'1px solid rgba(255,255,255,0.08)',
            borderBottom:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'0 0 24px 24px',
            padding:'16px 24px',
          }}>
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
        <div onClick={() => setActiveDropdown(null)} style={{
          position:'fixed', inset:0, zIndex:48,
          background:'rgba(0,0,0,0.4)',
          backdropFilter:'blur(2px)',
        }}/>
      )}
    </>
  );
}

/* ── INSIGHTIS LOGO MARK SVG ── */
function InsightisLogoMark({ size = 60, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity}}>
      <path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#0EC4C1"/>
    </svg>
  );
}

/* ── PROMPT LIBRARY HERO ── */
function PromptLibraryHero() {
  return (
    <section style={{padding:'80px 0 40px', textAlign:'center', position:'relative'}}>
      <div style={{maxWidth:'720px', margin:'0 auto', padding:'0 24px'}}>
        <div className="fu0" style={{display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 14px', borderRadius:'999px', border:'1px solid rgba(255,255,255,.07)', background:'rgba(255,255,255,.03)', fontSize:'12px', color:'#7FA0AC', fontWeight:500, letterSpacing:'0.04em', marginBottom:'24px'}}>
          ✦ PROMPT LIBRARY
        </div>
        <h1 className="fu1" style={{fontSize:'clamp(36px,5vw,56px)', fontWeight:500, letterSpacing:'-.04em', lineHeight:1.1, color:'#E8F2F5', marginBottom:'20px'}}>
          Prompts for every team.
        </h1>
        <p className="fu2" style={{fontSize:'17px', color:'#7FA0AC', lineHeight:1.6, maxWidth:'560px', margin:'0 auto'}}>
          Curated prompt templates for analytics, ops, and go-to-market teams — connected to the tools you already use.
        </p>
      </div>
    </section>
  );
}

/* ── DATA SOURCE ICONS (inline SVG marks) ── */
const DS_ICON = {
  'salesforce':        (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#00A1E0"><path d="M10.5 5.5A4.5 4.5 0 0 0 7 8a3 3 0 0 0-1 5.83A4 4 0 0 0 10 19a4 4 0 0 0 3.87-3 3.5 3.5 0 0 0 5-4A4.5 4.5 0 0 0 14.5 6.5 4.48 4.48 0 0 0 10.5 5.5z"/></svg>,
  'hubspot':           (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#FF7A59"><circle cx="17" cy="12" r="4"/><path d="M16 6V3h2v3z"/><circle cx="7" cy="7" r="2"/><path d="M7 9v10h2V9z"/></svg>,
  'snowflake':         (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#29B5E8"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/><circle cx="12" cy="12" r="2.5"/></svg>,
  'bigquery':          (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#4285F4"><circle cx="12" cy="12" r="8" fill="none" stroke="#4285F4" strokeWidth="2"/><path d="M16 16l4 4" stroke="#4285F4" strokeWidth="2" strokeLinecap="round"/></svg>,
  'google-analytics':  (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><rect x="16" y="4" width="4" height="16" rx="2" fill="#F9AB00"/><rect x="10" y="10" width="4" height="10" rx="2" fill="#E37400"/><circle cx="6" cy="18" r="2" fill="#E37400"/></svg>,
  'google-ads':        (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><path d="M10 4L4 14l6 4 6-10z" fill="#4285F4"/><circle cx="16" cy="17" r="3" fill="#34A853"/><path d="M14 4l-4 10 4 4 6-10z" fill="#FBBC04"/></svg>,
  'google-sheets':     (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#0F9D58"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4" fill="#0B8043"/><path d="M8 11h8v1H8zm0 3h8v1H8zm0 3h8v1H8z" fill="#fff"/></svg>,
  'google-drive':      (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><path d="M7 4l-5 9 3 5 5-9z" fill="#0F9D58"/><path d="M17 4H7l5 9h10z" fill="#FFCA28"/><path d="M22 13H12l-3 5h10z" fill="#4285F4"/></svg>,
  'slack':             (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><rect x="10" y="2" width="3" height="12" rx="1.5" fill="#E01E5A"/><rect x="2" y="10" width="12" height="3" rx="1.5" fill="#36C5F0"/><rect x="14" y="10" width="8" height="3" rx="1.5" fill="#2EB67D"/><rect x="10" y="14" width="3" height="8" rx="1.5" fill="#ECB22E"/></svg>,
  'jira':              (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#0052CC"><path d="M11 2L2 11l9 9 9-9zM11 8l6 6-6 6-6-6z" fillOpacity=".8"/></svg>,
  'pipedrive':         (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#000"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h4a3 3 0 0 1 0 6H10v4H8z" fill="#fff"/></svg>,
  'zoho':              (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#2098D1" strokeWidth="2"/><path d="M7 10h10M7 14h7" stroke="#E8BE2E" strokeWidth="2" strokeLinecap="round"/></svg>,
  'netsuite':          (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#1A1A1A"><rect x="3" y="3" width="18" height="18" rx="2"/><text x="12" y="15" textAnchor="middle" fontSize="8" fontWeight="700" fill="#F58220" fontFamily="Arial">N</text></svg>,
  'dynamics':          (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#002050"><path d="M3 4l9 2v12l-9 2zM13 7l8-2v14l-8-2z"/></svg>,
  'redshift':          (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#8C4FFF"><path d="M4 6l8-3 8 3v12l-8 3-8-3z" fillOpacity=".9"/><path d="M12 3v18" stroke="#fff" strokeWidth="1"/></svg>,
  'databricks':        (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#FF3621"><path d="M4 7l8 4 8-4v3l-8 4-8-4zm0 6l8 4 8-4v3l-8 4-8-4z"/></svg>,
  'azure':             (s=12)=><svg width={s} height={s} viewBox="0 0 24 24"><path d="M13 4l8 16H8l5-8-3-2z" fill="#0078D4"/><path d="M3 20l6-12h4l-5 8 3 4z" fill="#5EA0EF"/></svg>,
  'asana':             (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#F06A6A"><circle cx="12" cy="7" r="3"/><circle cx="7" cy="16" r="3"/><circle cx="17" cy="16" r="3"/></svg>,
  'freshdesk':         (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#25C16F"><circle cx="12" cy="12" r="9"/><path d="M8 12a4 4 0 0 1 8 0v4H8z" fill="#fff"/></svg>,
  'zendesk':           (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#03363D"><path d="M3 5h8v14zm10 14c0-4 4-7 8-7V5H13z"/></svg>,
  'linkedin':          (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#0A66C2"><path d="M4 4h4v16H4zM10 9h4v2a4 4 0 0 1 7 3v6h-4v-5a2 2 0 0 0-4 0v5h-3z"/><circle cx="6" cy="5" r="2"/></svg>,
  'workday':           (s=12)=><svg width={s} height={s} viewBox="0 0 24 24" fill="#0875E1"><path d="M3 8h2l2 8 2-6h2l2 6 2-8h2l-3 10h-3l-1-4-1 4H7z"/></svg>,
};

/* ── TAXONOMIES ── */

const TEAMS = [
  'Account Management','Accounting','Business Analytics',
  'Business Development','Business Intelligence','Customer Success',
  'Data Analytics','Developer Marketing','Marketing','Product Management',
  'Product Marketing','Revenue Operations','Sales Directors','Sales Leadership',
];

const PROMPTS = [
  { title:'Renewal Risk Forecasting',
    teams:['Account Management','Customer Success'],
    prompt:'For every account with a renewal due in the next 120 days, pull product usage trend (last 90 days vs prior 90), executive-sponsor activity, open support ticket severity, ARR, and contract terms. Score renewal risk 0-100 using a weighted model (40% usage, 25% support, 20% sponsor, 15% contract). Output the top 30 at-risk accounts with the two strongest negative signals, suggested save play, and the AM who owns the relationship.' },
  { title:'Expansion Opportunity Heatmap',
    teams:['Account Management'],
    prompt:'Across the AM book of business, identify accounts where product usage has grown >40% QoQ but no expansion conversation has been logged. For each, compute available headroom (licensed seats vs active users, feature-tier ceiling, adjacent products with zero usage). Output a ranked expansion target list with estimated upsell ARR and the trigger event to reference in outreach.' },
  { title:'Account Health Dashboard',
    teams:['Account Management','Customer Success'],
    prompt:'Build a quarterly account-health dashboard for every Enterprise account. Inputs: weekly active users, daily active users, feature breadth, NPS, support ticket volume, exec-sponsor engagement, payment history, expansion vs contraction ARR. Output a 4-quadrant grid (Healthy/Growing, At-Risk/Recoverable, Champion, Detractor) with each account placed once, plus a sentence explaining the placement.' },
  { title:'QBR Data Pack Generator',
    teams:['Account Management'],
    prompt:'For the next QBR, pull a 12-page data pack for the account: ARR history, seat utilization, feature adoption vs cohort, top 5 product wins, top 3 friction points (cross-referenced support tickets), executive-stakeholder activity, peer benchmark (anonymized), open opportunities, and recommended next 90-day milestones. Format as slide-ready bullets, not paragraphs.' },
  { title:'Stakeholder Engagement Map',
    teams:['Account Management'],
    prompt:'For the top 25 accounts by ARR, map every known stakeholder: role, persona (champion / decision maker / blocker / unknown), last touch date, last touch type (email / meeting / event), and current engagement level. Highlight accounts with single-thread risk (only one engaged contact) and propose the next stakeholder to multi-thread into.' },
  { title:'Adoption Plateau Detection',
    teams:['Account Management','Customer Success','Product Management'],
    prompt:'Find every account whose product usage has flatlined or declined for 6+ weeks. For each, segment by current adoption depth (Activated / Habituated / Champion). Output the accounts where a one-feature reveal or workflow nudge has historically restored growth in similar cohorts, with the specific play to run and the AM to brief.' },
  { title:'Monthly Close Progress Tracker',
    teams:['Accounting'],
    prompt:'For the current close, list every task in the close checklist with: owner, planned completion day (1-10), actual completion day, blockers, and any related journal-entry status. Flag tasks more than one day late and tasks with the same owner overloading the same day. Output a Gantt-style table and a top-3 list of items to expedite to hit a 5-day close.' },
  { title:'AR Aging Risk Analysis',
    teams:['Accounting','Revenue Operations'],
    prompt:'Pull AR aged 30/60/90/120+ days. For each invoice >90 days, attach: customer name, balance, last touch date, last response, days since last payment of any size, customer credit history, and any ongoing renewal discussion. Output a collections priority list with predicted recovery probability (High/Med/Low) and the recommended next action per account.' },
  { title:'ASC 606 Revenue Recognition Audit',
    teams:['Accounting'],
    prompt:'For every contract booked this quarter, validate the revenue recognition schedule: identify performance obligations, allocate transaction price, confirm timing (point-in-time vs over time), and reconcile against billing schedule. Flag contracts where the recognized amount diverges from expected by more than $500 or one period. Output a remediation list grouped by root cause.' },
  { title:'Expense Category Drift Alert',
    teams:['Accounting','Business Analytics'],
    prompt:'Compare each expense category this month vs the trailing 6-month average, segmented by department. Flag categories with >20% drift in either direction. For upward drift, attach the top 5 contributing transactions; for downward drift, check whether expected expenses simply have not yet been booked. Output a one-line variance note per category for the close packet.' },
  { title:'Cash Flow 13-Week Forecast',
    teams:['Accounting','Business Analytics'],
    prompt:'Build a 13-week cash flow forecast: expected receipts from open AR with collection-probability weighting, expected billings from booked contracts, planned outflows from AP and payroll, and one-time items. Output the weekly cash position with a low/expected/high band and a list of weeks where the bottom of the band falls below the minimum operating threshold.' },
  { title:'Bank Reconciliation Anomaly Sweep',
    teams:['Accounting'],
    prompt:'Reconcile every bank account against the ledger for the last 60 days. List unmatched transactions, duplicate postings, unusual round-number transfers, and any payment that breaks a typical vendor cadence. For each anomaly, propose an explanation (timing diff, missed entry, possible error) and the journal entry needed to clear it.' },
  { title:'Outbound Sequence Performance',
    teams:['Marketing'],
    prompt:'For every active outbound sequence, compute reply rate, positive reply rate, meeting-booked rate, and unsubscribe rate by step. Segment by persona and account tier. Highlight sequences with low step-1 open rates (subject line problem) vs high open but low reply (body problem) vs strong reply but low meeting-set (qualifier problem). Recommend 3 changes to test next.' },
  { title:'Meeting-Set Quality Scoring',
    teams:['Sales Directors'],
    prompt:'For meetings set by BDRs in the last 60 days, compute: AE acceptance rate, AE meeting-held rate, opportunity-creation rate, and average opportunity ARR. Score each BDR\'s meeting-set quality. Identify BDRs whose volume is healthy but quality lags, and the most common reason their meetings get rejected (wrong persona, wrong fit, wrong stage).' },
  { title:'Outbound vs Inbound Pipeline Contribution',
    teams:['Marketing'],
    prompt:'Quarter-to-date, split pipeline created by source: BDR outbound, inbound marketing, partner-sourced, AE-self-sourced. For each source, show count, total ARR, win rate, sales cycle length, and ACV. Compare to the prior two quarters. Identify whether the BDR team\'s contribution is rising or falling and propose two adjustments to the territory plan.' },
  { title:'Weekly KPI Executive Snapshot',
    teams:['Business Analytics','Sales Leadership'],
    prompt:'Every Monday 7am, generate a 1-page exec snapshot: bookings WoW and QTD vs plan, pipeline coverage, churned ARR, new logos, NPS, weekly active users, monthly active users, and gross margin. For each metric, show value, vs-plan delta, and trend arrow. Add three sentences of context explaining the biggest movers since last week. Cap at 250 words total.' },
  { title:'Department Spend vs Budget',
    teams:['Business Analytics','Accounting'],
    prompt:'Pull actual spend by department vs budget for the current quarter. Identify the three departments most over/under, decompose the variance by spend category (headcount, software, marketing programs, services, T&E), and flag any department on pace to exceed the full-year budget. Output a one-line action note per department for the CFO review.' },
  { title:'Signup Cohort Behavior Analysis',
    teams:['Business Analytics','Product Management'],
    prompt:'For users who signed up in each of the last 6 months, plot day-1, day-7, day-30, and day-90 retention. Identify the cohort with the best 90-day retention and the cohort with the worst. Compare their acquisition channels, persona mix, and feature-first-touch. Output the three actions most likely to make later cohorts look like the best one.' },
  { title:'North Star Metric Breakdown',
    teams:['Business Analytics'],
    prompt:'Decompose the company north-star metric (Weekly Active Teams) into its 4 input drivers: new teams activated, dormant teams revived, teams retained, teams expanded. For each driver, show contribution to last quarter\'s movement, current run-rate vs target, and the leading indicator that moves it. Output a single chart and 3 bullet takeaways.' },
  { title:'Funnel Conversion by Segment',
    teams:['Business Analytics','Marketing'],
    prompt:'Build the full marketing-to-revenue funnel (Visitor → MQL → SQL → Opportunity → Closed Won) for the last 90 days, segmented by company size, industry, and acquisition channel. Show absolute counts, stage-to-stage conversion rates, and median time-in-stage. Highlight the segment+channel combinations where conversion is significantly above or below average, with an explanation hypothesis.' },
  { title:'YoY Growth Attribution',
    teams:['Business Analytics','Sales Leadership'],
    prompt:'Compare this quarter\'s ARR vs the same quarter last year. Attribute the delta across: net-new logos, expansion, contraction, churn, and pricing changes. Within net-new, attribute further to channel (inbound, outbound, partner, paid). Output a waterfall chart, a one-line takeaway, and the channel/motion you would double down on next quarter.' },
  { title:'Partner-Sourced Pipeline Tracker',
    teams:['Business Development'],
    prompt:'For every partner-sourced opportunity in the last two quarters, pull partner name, source channel (referral, marketplace, co-marketing), opportunity stage, ARR, win rate, and sales-cycle length. Compare partner-sourced metrics to direct-sourced. Rank partners by sourced ARR and by win-rate improvement. Output the top 5 partners to invest more in and the bottom 5 to deprioritize.' },
  { title:'Co-Sell Opportunity Identification',
    teams:['Business Development'],
    prompt:'Cross-reference our active opportunities with the partner ecosystem: which open deals have a strategic partner already engaged at the same account, and which target accounts on our open pipeline have a partner with an existing footprint? Output a co-sell action list ranked by deal value × partner-fit score, with the recommended partner contact and play to run.' },
  { title:'Strategic Account Whitespace Map',
    teams:['Business Development'],
    prompt:'For each of the top 50 strategic accounts, list: our footprint (products owned, ARR, users), product whitespace (modules unsold), the org-chart whitespace (departments not engaged), and the partner whitespace (partners already in the account we have not engaged). Output a one-page whitespace summary per account with the single biggest unlock opportunity highlighted.' },
  { title:'Competitive Partner Activity Monitor',
    teams:['Business Development','Product Marketing'],
    prompt:'Monitor public signals from competitor-partner relationships in the last 90 days: joint announcements, integrations launched, marketplace listings added, co-marketing assets. For each, assess threat level (Low / Medium / High) to our partner motion and recommend a defensive or offensive countermove. Output a competitive briefing pack for the BD team.' },
  { title:'Channel Partner Enablement Scorecard',
    teams:['Business Development'],
    prompt:'For every active channel partner, score enablement health: trained reps, certifications, demo environments active, last training touch, pipeline registered in last 90 days, and average deal-cycle when they are involved. Identify partners who are well-enabled but underproducing, and partners who are producing despite low enablement (urgent training opportunity).' },
  { title:'Partnership ROI by Program',
    teams:['Business Development','Business Analytics'],
    prompt:'For each named partnership program (referral, technology, reseller, OEM), compute total investment (people, marketing dollars, integration eng-time), total sourced ARR, and ROI multiple. Compare against trailing 4-quarter average. Output a ranked program scorecard and recommend one program to expand and one to consolidate or close.' },
  { title:'Report Usage and Adoption Audit',
    teams:['Business Intelligence','Data Analytics'],
    prompt:'For every Looker/Tableau dashboard in production, pull: weekly viewers, monthly viewers, last view date, average view duration, and bounce rate. Identify dashboards with zero viewers in the last 90 days (deprecation candidates), dashboards with high traffic but short dwell time (potential redesign), and the top 10 most-used dashboards (protect from changes).' },
  { title:'Data Quality Scorecard by Source',
    teams:['Business Intelligence','Data Analytics'],
    prompt:'For each connected data source, compute: row freshness (median lag between source event and warehouse), null rate on critical fields, schema drift events in last 30 days, duplicate-record rate, and downstream-report breakage incidents. Output a quality scorecard with red/yellow/green per source and a top-3 list of sources that need attention this sprint.' },
  { title:'Self-Service Dashboard Inventory',
    teams:['Business Intelligence'],
    prompt:'Inventory every self-service dashboard across the company. For each, capture: owner, business unit, primary audience, last edit, certification status (Certified / Draft / Legacy), and number of distinct queries it triggers. Surface dashboards owned by departed employees, dashboards labeled "Draft" but with >50 weekly views, and duplicates measuring the same metric.' },
  { title:'Slow-Running Query Identification',
    teams:['Business Intelligence','Data Analytics'],
    prompt:'In the warehouse, find the top 25 slowest queries from the last 7 days by total compute time × frequency. For each, identify the dashboard/report that runs it, the table scan pattern, and whether a missing index, missing partition, or unused JOIN is the likely cause. Output a remediation backlog ordered by estimated compute savings.' },
  { title:'Cross-System Metric Reconciliation',
    teams:['Business Intelligence','Revenue Operations'],
    prompt:'Reconcile ARR/MRR as reported by Salesforce, NetSuite/Stripe, and the warehouse. For every account where the three numbers differ by more than $500/month, output: account name, each source\'s number, the delta, and the suspected cause (failed charge, unbilled upsell, stage timing, contract not yet activated). Sort by delta and cap at 50 rows.' },
  { title:'Stakeholder Report Request Triage',
    teams:['Business Intelligence'],
    prompt:'Across all BI tickets in the queue, classify by request type (new dashboard, dashboard fix, ad-hoc analysis, data access, training). Score each ticket by business value (requester level × downstream decision impact) and effort. Output a 2x2 triage grid (Quick Wins / Strategic / Slog / Backlog) with the top 5 to start this sprint.' },
  { title:'NPS Theme Cluster Analysis',
    teams:['Customer Success','Product Management'],
    prompt:'Pull all NPS responses from the last quarter (detractors, passives, promoters separately). Cluster open-text comments into themes. For each theme, show: count, average score, customer segment most affected, and a representative verbatim quote. Output the top 5 detractor themes with a CS-led action plan and the top 3 promoter themes to lean into for case studies.' },
  { title:'Onboarding Milestone Tracking',
    teams:['Customer Success'],
    prompt:'For every account in onboarding, track progress against the 7 standard onboarding milestones (kickoff complete, data connected, first metric defined, first dashboard shared, team invited, first AI Chat answer, first scheduled report). Flag accounts stuck on any milestone >7 days and accounts that hit "fully onboarded" but show no usage week 2.' },
  { title:'CSM Book-of-Business Workload',
    teams:['Customer Success'],
    prompt:'For each CSM, compute: number of accounts owned, total ARR managed, number of accounts in onboarding, number flagged at-risk, number due to renew in next 60 days, and weighted-workload score (account count × tier weight). Identify CSMs who are over-allocated and accounts that should be rebalanced. Recommend a new allocation plan.' },
  { title:'Adoption Gap Analysis',
    teams:['Customer Success','Product Management'],
    prompt:'For each customer segment, compare actual feature adoption against the segment\'s success profile (features that correlate with renewal). Identify the 3 features with the largest adoption gap. For each, list the accounts that have not adopted, their ARR, and an estimated revenue-at-risk if non-adoption continues. Recommend a campaign and the play per gap.' },
  { title:'Save Play Eligibility List',
    teams:['Customer Success','Account Management'],
    prompt:'For every account flagged at-risk this quarter, evaluate eligibility for each save play (training boost, exec sponsor intro, custom integration, discount-and-extend, executive air cover). Score each play by fit (history with this segment), capacity (effort needed), and ROI (ARR saved per hour). Recommend the single best play per account with the talking points.' },
  { title:'Health Score Model Tuning',
    teams:['Customer Success','Data Analytics'],
    prompt:'Back-test the current health score model against the last 12 months of renewals: at score X, what fraction actually renewed? Compute lift, precision, and recall by score band. Identify the most over- and under-weighted input signals. Recommend a new weighting and show the projected improvement in early at-risk detection (lead time before churn).' },
  { title:'Customer Segmentation Model',
    teams:['Data Analytics','Marketing'],
    prompt:'Build an unsupervised customer segmentation using: ARR tier, industry, company size, product mix, usage depth, and tenure. Aim for 5-7 clusters that maximize within-cluster similarity. For each cluster, output: persona summary, top 3 features used, top 3 features unused, average expansion rate, churn rate, and the marketing/CS play that best fits.' },
  { title:'Metric Anomaly Detection Sweep',
    teams:['Data Analytics','Business Intelligence'],
    prompt:'For every metric on the executive dashboard, run an anomaly check against its trailing 90-day baseline (z-score >2.5 or moving-average breach). Output a daily anomaly report: metric name, current value, expected band, deviation magnitude, and a hypothesis (data pipeline issue / true business change / seasonal effect). Rank by business impact.' },
  { title:'Causal Impact of Marketing Campaigns',
    teams:['Data Analytics','Marketing'],
    prompt:'For each major paid campaign in the last 90 days, build a causal impact model using a synthetic control group (matched non-targeted accounts). Compute the lift in pipeline-created and conversion-rate attributable to the campaign vs the control. Output a per-campaign causal scorecard and recommend which two to scale, which to cut, and which need a longer measurement window.' },
  { title:'Predictive Churn Risk Model',
    teams:['Data Analytics','Customer Success'],
    prompt:'Build a churn-prediction model using: product usage trends, support ticket volume and sentiment, executive engagement frequency, payment history, NPS, and account-tenure. Output: 30/60/90-day churn probability per account, the top three features driving each prediction (SHAP-style), and the segments where the model performs best vs worst.' },
  { title:'Cohort Retention Curve Generator',
    teams:['Data Analytics','Product Management'],
    prompt:'For each signup cohort in the last 12 months, plot a retention curve out to week 26. Compare cohorts on the same chart and identify cohorts that broke the trend (better or worse than expected). Cross-reference with product releases, marketing campaigns, and pricing changes to propose a causal story for the inflection.' },
  { title:'A/B Test Statistical Significance',
    teams:['Data Analytics','Product Management'],
    prompt:'For every currently-running A/B test, compute: sample size per arm, observed lift on the primary metric, current p-value, minimum-detectable-effect, and estimated days remaining to reach significance. Flag tests that have already crossed significance (recommend ship/kill), tests likely to be underpowered (recommend extend or abandon), and tests with concerning guardrail-metric movement.' },
  { title:'Developer Community Engagement Scorecard',
    teams:['Developer Marketing'],
    prompt:'Across GitHub, Slack, Discord, and forum, compute weekly: new community members, returning members, questions asked, questions answered (by us vs by community), average response time, and sentiment. Identify the top 10 most-active community members of the quarter and recommend each for an MVP/advocate program with a personalized outreach hook.' },
  { title:'Docs Search Analytics',
    teams:['Developer Marketing','Product Marketing'],
    prompt:'Pull docs-site search queries from the last 30 days. Identify: top 20 successful searches (high click-through to articles), top 20 zero-result searches (content gap), and top 20 searches followed by a support ticket within 24 hours (docs not solving the problem). Output a docs roadmap with the article to write or improve for each high-impact gap.' },
  { title:'SDK Adoption Metrics',
    teams:['Developer Marketing'],
    prompt:'For each SDK (JS, Python, Go, Ruby), compute: weekly active integrations, npm/pip/etc download trend, GitHub stars trend, version distribution across active integrations, and percentage of integrations stuck on outdated versions. Identify SDKs where the version skew indicates a breaking-change problem and recommend the next migration nudge.' },
  { title:'GitHub Activity to ARR Correlation',
    teams:['Developer Marketing','Sales Leadership'],
    prompt:'Cross-reference GitHub org activity (commits, PRs, issues filed against our SDKs) with CRM ARR. Identify accounts whose engineers are highly active on our repos but whose ARR has flatlined (expansion opportunity), and accounts where engineering activity dropped sharply (early churn signal). Output a joint list for the AE/AM team with the suggested play per account.' },
  { title:'Developer Event ROI Analysis',
    teams:['Developer Marketing'],
    prompt:'For each developer event sponsored in the last 12 months (conference booth, hackathon, meetup, talk), compute attributed signups, attributed activations, attributed accounts created, attributed pipeline ARR, and total cost (sponsorship, travel, swag, content production). Output a ranked event scorecard and recommend the 3 events to sponsor again and the 2 to drop.' },
  { title:'Community Bug to PR Conversion',
    teams:['Developer Marketing'],
    prompt:'For every bug or feature request opened by a community member on GitHub in the last 6 months, track whether it was: ignored, acknowledged by us, fixed by us, fixed by the community (PR merged), or still open. Compute the community-PR conversion rate, average time-to-merge, and identify community members whose PRs are accepted at >80% rate (advocate candidates).' },
  { title:'Multi-Touch Attribution Deep-Dive',
    teams:['Marketing','Revenue Operations'],
    prompt:'For every Closed-Won opportunity this quarter, trace every recorded marketing touchpoint from first-click to close (paid, organic, content, events, webinars, email). Apply a linear, time-decay, and W-shape attribution model in parallel and show the credit distribution by channel under each. Highlight the model where the channel mix changes most and discuss why.' },
  { title:'Content Engagement by Persona',
    teams:['Marketing','Product Marketing'],
    prompt:'For every long-form content asset published in the last 90 days, segment readers by inferred persona (job title + industry). Compute by-persona time-on-page, scroll depth, asset shares, and downstream conversion. Identify the top 3 underperforming assets for the biggest persona (revenue ops) and the top 3 high-performing assets to replicate.' },
  { title:'SEO Performance by Intent Cluster',
    teams:['Marketing'],
    prompt:'Cluster every keyword we rank on by search intent (informational, transactional, navigational, comparison). For each cluster, show: number of keywords ranking, average position, total clicks, total impressions, and click-through rate. Identify the cluster with the best CTR but worst average position (highest-ROI improvement opportunity) and propose 5 page-level optimizations.' },
  { title:'Webinar to MQL Conversion',
    teams:['Marketing'],
    prompt:'For every webinar in the last 12 months, compute: registrants, attendees, attendance rate, MQL conversion rate (within 7/30/90 days), SQL conversion, and downstream pipeline ARR. Compare to the benchmark for the topic category. Identify the topic/format combination that consistently outperforms and recommend the next three webinars to schedule.' },
  { title:'ABM Target Account Engagement Score',
    teams:['Marketing','Sales Directors'],
    prompt:'For every target account in the ABM program, compute an engagement score from: known-account web sessions, content downloads, event interactions, LinkedIn ad engagement, and meeting requests. Bucket into Cold / Warming / Engaged / Active. Output the accounts that moved up at least one bucket this month and the recommended sales play per bucket transition.' },
  { title:'Email Campaign Performance Benchmark',
    teams:['Marketing'],
    prompt:'Across the last 50 marketing emails sent, compute open rate, click rate, click-to-open ratio, unsubscribe rate, and downstream MQL conversion. Segment by campaign type (nurture, product update, event invite, content promotion). Identify the subject-line patterns and send-time windows that consistently outperform and recommend the next test to run.' },
  { title:'Feature Adoption by Segment',
    teams:['Product Management'],
    prompt:'For each major feature shipped in the last 12 months, compute: percentage of accounts that have ever used it, percentage that use it weekly, time-to-first-use from feature availability, and adoption rate by segment (size, industry, persona). Identify features with low adoption in a target segment that should adopt them, and recommend a PMM/CS play to drive adoption.' },
  { title:'Friction Point Identification',
    teams:['Product Management'],
    prompt:'For each step in the core product workflow, compute completion rate, time-to-complete, and rage-click/back-button signals. Identify the three steps where users drop off most. Cross-reference with support tickets and session-replay clusters to attach a probable cause. Output a friction-removal backlog ranked by user impact × estimated effort.' },
  { title:'Backlog Prioritization by Customer Impact',
    teams:['Product Management'],
    prompt:'Across the open Jira backlog, score each item by: number of customer requests linked, total ARR of requesting accounts, severity of related support tickets, and strategic-fit (label-based). Output a re-ranked top 50 backlog with the new score, the previous rank, and a one-line justification for each item that moved up or down by 10+ places.' },
  { title:'Beta Cohort Behavior Analysis',
    teams:['Product Management'],
    prompt:'For the current beta feature, compare beta cohort behavior to a matched control cohort: feature usage, broader product engagement, support ticket rate, NPS shift, and renewal intent (from CSM notes). Determine whether the beta is having a positive, neutral, or negative effect on adjacent metrics and recommend ship/iterate/kill with the supporting evidence.' },
  { title:'Feature Request Consolidation',
    teams:['Product Management','Customer Success'],
    prompt:'Across Zendesk, Intercom, sales calls (Gong), and the product feedback portal, cluster every feature request from the last 90 days. For each cluster, show: total request count, unique-account count, total ARR of requesting accounts, and a 1-line synthesized request. Output the top 20 clusters with a recommended PM-disposition (plan / explore / decline) and rationale.' },
  { title:'Core Loop Engagement Drill',
    teams:['Product Management','Data Analytics'],
    prompt:'For the core product loop (ask question → see answer → save / share / iterate), compute the loop-completion rate per user per week. Segment by tenure, plan, and team-size. Identify the user segment whose loop-completion is highest (model behavior) and the segment whose drop-off is steepest. Recommend the product change most likely to lift the weak segment.' },
  { title:'Launch Performance Scorecard',
    teams:['Product Marketing','Marketing'],
    prompt:'For the most recent launch, compile a 30-60-90 day scorecard: press pickups, social engagement, traffic to the launch page, demo requests, sales-team-flagged opportunities, feature activation rate, and qualitative customer feedback. Compare against the launch goals defined pre-launch. Output what worked, what missed, and three changes to bake into the next launch playbook.' },
  { title:'Win/Loss Themes by Quarter',
    teams:['Product Marketing','Sales Leadership'],
    prompt:'For every Closed-Won and Closed-Lost opportunity this quarter, extract: primary win or loss reason from the CRM, competitor (if any), and customer quote (if available from notes or Gong). Cluster into themes. Output the top 5 win themes and top 5 loss themes with the count, average deal size, and the action item for product, sales, or messaging.' },
  { title:'Positioning Effectiveness by Segment',
    teams:['Product Marketing'],
    prompt:'For each customer segment (startup, mid-market, enterprise), compare what we say (positioning page, sales decks, ad copy) to what customers actually buy us for (Closed-Won win-reason notes, NPS promoter quotes). Score positioning-to-reality fit per segment. Identify the segment with the biggest mismatch and propose three messaging changes to test.' },
  { title:'Competitive Feature Gap Analysis',
    teams:['Product Marketing'],
    prompt:'For each of the top 3 competitors, build a feature parity matrix against our product across 30 capability areas. Score each cell: better / parity / worse / not-applicable. Cross-reference with deal-loss reasons to identify the gaps that actually cost us deals (vs gaps customers do not care about). Output the 5 gaps PM should close first.' },
  { title:'Customer Story Candidate Identification',
    teams:['Product Marketing','Customer Success'],
    prompt:'Identify customers who would make great case studies. Filter by: NPS score 9 or 10, expansion ARR in last year, recognizable brand or compelling persona, public-PR willingness flag in CRM, and at least one quantifiable outcome (cost savings, time savings, revenue lift). Output a ranked list of 15 candidates with the story angle for each and the CSM to recruit them.' },
  { title:'Sales Enablement Asset Usage',
    teams:['Product Marketing','Sales Leadership'],
    prompt:'For every sales asset (deck, one-pager, ROI calculator, demo video, battle card), compute: total downloads in last 90 days, downloads per active rep, attachment to opportunities (where used), and Closed-Won rate on deals where the asset was used vs not used. Identify the top 5 assets to promote and 5 to retire.' },
  { title:'Pipeline Coverage Forecast',
    teams:['Revenue Operations','Sales Leadership'],
    prompt:'For the current quarter, compute pipeline coverage by segment (mid-market vs enterprise): open pipeline ÷ remaining quota. Compare against the segment\'s historical win rate to project a confidence-weighted forecast. Highlight segments where coverage is below 3x and propose the top 3 pipeline-generation moves to close the gap by end-of-month.' },
  { title:'Deal Stage Conversion Benchmarks',
    teams:['Revenue Operations'],
    prompt:'For every deal closed in the last 4 quarters, compute the conversion rate stage-by-stage and the median time spent in each stage. Segment by deal size band and segment. Identify the stage where conversion has the highest variance across reps (biggest coaching opportunity) and the stage where deals decay if they sit too long (biggest process opportunity).' },
  { title:'Territory Rebalancing Recommendations',
    teams:['Revenue Operations'],
    prompt:'For each territory, compute: account count, total addressable ARR, current pipeline coverage, rep capacity (activities completed vs target), and YTD attainment. Identify territories that are over-served (rep coasting) and under-served (no rep capacity). Propose a rebalancing plan with the specific accounts to move and the projected attainment improvement.' },
  { title:'Quota Attainment Forecasting',
    teams:['Revenue Operations','Sales Leadership'],
    prompt:'For every rep on quota, forecast end-of-quarter attainment using: current commit, current best-case, average historical commit-to-close conversion, days remaining, and weighted pipeline. Output a rep-level forecast (Likely / Stretch / At-Risk), the team-level roll-up, and the gap to plan. Flag reps trending under 60% as the highest-leverage coaching priority.' },
  { title:'CRM Data Hygiene Audit',
    teams:['Revenue Operations'],
    prompt:'Across Salesforce/HubSpot/Zoho, audit data hygiene: opportunities with missing close date, opportunities >$100k with no next-step, contacts without an account, accounts with no owner, duplicate accounts (by domain), and stale activity (>30 days, deal stage past Discovery). Output a hygiene scorecard by team with the top 5 fixes ranked by impact.' },
  { title:'Forecast Accuracy by Segment',
    teams:['Revenue Operations','Sales Leadership'],
    prompt:'For each segment and each rep, compare the forecast committed at week 1 of the quarter vs actual closed at end-of-quarter, for the last 4 quarters. Compute average over/under-call by rep and segment. Identify segments where commit accuracy is systemically off (under-calling vs over-calling) and recommend the forecast process fix per pattern.' },
  { title:'Rep Performance Quarterly Ranking',
    teams:['Sales Directors'],
    prompt:'Rank every rep on the team this quarter by: total bookings, win rate, average deal size, sales-cycle length, activities per week, and pipeline created. Normalize by territory difficulty. Output a single composite score, the top 3 performers, the bottom 3 (with the gating issue per rep), and one specific coaching focus for the middle quartile.' },
  { title:'Deal Review Preparation Pack',
    teams:['Sales Directors'],
    prompt:'For tomorrow\'s deal review, prepare a 1-page brief on the top 10 deals: account, stage, ARR, days in stage, last activity, last-recorded customer sentiment from Gong, competitive context, two open questions for the rep, and one action the director should approve or block. Surface the deals where the call summary contradicts the CRM stage.' },
  { title:'Coaching Opportunity Identification',
    teams:['Sales Directors'],
    prompt:'Across the team\'s call recordings (Gong) and email threads (Outreach) from the last 30 days, identify the three most-frequent missed-skills patterns: weak discovery questions, premature pricing reveal, no multi-thread ask, weak close. For each, name the reps who exhibit it most and propose a specific micro-coaching exercise per rep.' },
  { title:'Team-Level Forecast Roll-Up',
    teams:['Sales Directors'],
    prompt:'Roll up every rep\'s forecast (Commit / Best Case / Pipeline) into a team-level view. Compute the team commit, team best-case, and the gap-to-plan. Highlight the three deals whose stage change would most move the team forecast and the two reps whose forecast confidence is historically lowest (so weight their commits accordingly).' },
  { title:'Win Rate by Stage by Rep',
    teams:['Sales Directors'],
    prompt:'For each rep on the team, compute win rate at each pipeline stage over the last 4 quarters. Compare to the team median. Identify the rep+stage combinations where the rep is materially below median (highest-leverage coaching) and the rep+stage combinations where the rep is materially above (skills to extract and teach the rest of the team).' },
  { title:'Activity-to-Pipeline Ratio per Rep',
    teams:['Sales Directors'],
    prompt:'For each rep, compute the ratio of activities (calls, emails, meetings) per dollar of pipeline created in the last 90 days. Compare against team baseline. Identify reps with high activity but low pipeline yield (effectiveness gap) vs low activity but reasonable yield (capacity for more) and propose the coaching or quota assignment that matches.' },
  { title:'Quarterly Business Review Data Pack',
    teams:['Sales Leadership'],
    prompt:'Prepare the QBR data pack for the leadership team: total bookings vs plan, pipeline coverage, segment-level performance, rep ranking, win-rate trends, sales-cycle trends, win/loss themes, top 10 deals to watch, and the three biggest risks to next quarter. Format as a slide-ready 12-page deck with one chart and one takeaway per slide.' },
  { title:'Plan-to-Actual Variance Analysis',
    teams:['Sales Leadership'],
    prompt:'For the current quarter, compute plan-to-actual variance by: segment, geography, product line, rep, and channel. For every variance >10%, attribute to the dominant cause (pipeline gap, win-rate gap, deal-size gap, cycle-length gap). Output the top three variance drivers, the dollar magnitude, and the recovery move to make in the next 30 days.' },
  { title:'Productivity per Rep Trend',
    teams:['Sales Leadership'],
    prompt:'Plot productivity per rep (bookings ÷ headcount) over the last 8 quarters, segmented by tenure band. Identify the inflection where productivity tends to plateau and the tenure where productivity starts to decline (flight risk). Propose the headcount, enablement, or compensation change that addresses the dominant trend.' },
  { title:'Segment-Level Pipeline Strategy',
    teams:['Sales Leadership'],
    prompt:'For each segment (SMB, mid-market, enterprise), assess: pipeline-to-plan ratio, average deal size trend, win-rate trend, and channel mix. Identify the segment with the strongest momentum (where to invest more pipeline-gen) and the segment that is decaying (where to investigate the cause). Recommend an investment-rebalancing move.' },
  { title:'Compensation Plan Effectiveness',
    teams:['Sales Leadership'],
    prompt:'For each comp plan component (base, commission rate, accelerators, SPIFFs), compute: cost as a percentage of bookings, behavior change attributable to it, and rep satisfaction signal. Identify the components driving the most desired behavior per dollar and the components with high cost but no measurable behavior change. Recommend two changes for next year\'s plan.' },
  { title:'Headcount Investment ROI',
    teams:['Sales Leadership'],
    prompt:'For every new sales hire in the last 18 months, compute time-to-ramp, time-to-first-deal, time-to-quota, cumulative bookings, and ROI vs fully-loaded cost. Segment by source (referral, recruiter, internal transfer). Identify the source that produces the best-yielding hires and recommend the next 6 hires to prioritize by role.' },
  { title:'Territory Load Balance Audit',
    teams:['Revenue Operations'],
    prompt:'For every territory, compute: total addressable ARR, account count, named-account count, open pipeline, and current rep capacity vs target activity volume. Identify the top 3 territories that are under-resourced and the bottom 3 that are over-resourced. Propose a specific account-move plan with the dollar-yield projection per move.' },
  { title:'Lead Routing Audit',
    teams:['Marketing'],
    prompt:'Audit the lead-routing rules: median time-to-claim by source, percentage of leads with no first-touch in 24h, mis-routes (lead handed to a rep whose territory does not own the account), and unowned/queue leads. Identify the three rule changes that would have improved time-to-claim by >50% in the last 30 days.' },
  { title:'Forecast Call Accuracy Trend',
    teams:['Revenue Operations'],
    prompt:'For every forecast call in the last 6 quarters, compare week-1 commit, week-8 commit, and actual final. Compute per-rep over-call and under-call rates. Identify reps whose commits are systematically optimistic (need pressure-testing) vs sandbaggers (need to be unblocked). Output a forecast-confidence scorecard for the leadership team.' },
  { title:'Pipeline Waterfall Report',
    teams:['Revenue Operations'],
    prompt:'Build the quarterly pipeline waterfall: starting pipeline, new pipeline created, pipeline progressed in, pipeline progressed out, pipeline pushed to next quarter, pipeline lost, pipeline won. Segment by source and rep. Output the waterfall chart, the largest contributor to net pipeline change, and the three opportunities most likely to slip if no action is taken.' },
];

/* ── PROMPT LIBRARY SIDEBAR ── */
function PromptLibrarySidebar({ selectedTeams, toggleTeam, clearAll }) {
  const [openTeams, setOpenTeams] = useState(true);
  const total = selectedTeams.size;

  const groupHeader = (label, open, setOpen) => (
    <button
      onClick={() => setOpen(!open)}
      style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        width:'100%', padding:'6px 16px',
        background:'transparent', border:'none', cursor:'pointer',
        color:'#5E8290', fontSize:'11px', fontWeight:600,
        textTransform:'uppercase', letterSpacing:'0.08em',
        fontFamily:'Geist,sans-serif',
      }}
    >
      {label}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ transition:'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink:0 }}>
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
  );

  const checkboxItem = (label, checked, onToggle, leading = null) => (
    <label
      key={label}
      className={`filter-item ${checked ? 'checked' : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        style={{ position:'absolute', opacity:0, width:0, height:0 }}
      />
      <span className="filter-checkbox">
        {checked && (
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0A0E13" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </span>
      {leading}
      <span style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{label}</span>
    </label>
  );

  return (
    <aside className="prompt-sidebar-col">
      {/* Reserve fixed-height slot so the Teams list does not shift when a filter is selected */}
      <div style={{ padding:'0 16px 14px', minHeight:'42px' }}>
        <button
          onClick={clearAll}
          aria-hidden={total === 0}
          tabIndex={total === 0 ? -1 : 0}
          style={{
            fontSize:'11.5px', fontFamily:'Geist,sans-serif',
            background:'rgba(9,160,157,.08)', color:'#0EC4C1',
            border:'1px solid rgba(9,160,157,.25)',
            borderRadius:'6px', padding:'5px 10px', cursor:'pointer',
            display:'inline-flex', alignItems:'center', gap:'6px',
            visibility: total > 0 ? 'visible' : 'hidden',
            pointerEvents: total > 0 ? 'auto' : 'none',
          }}
        >
          Clear filters ({total})
        </button>
      </div>

      {/* Teams first */}
      <div style={{ marginBottom:'10px' }}>
        {groupHeader('Teams', openTeams, setOpenTeams)}
        {openTeams && (
          <div style={{ padding:'2px 0 8px' }}>
            {TEAMS.map(team =>
              checkboxItem(team, selectedTeams.has(team), () => toggleTeam(team))
            )}
          </div>
        )}
      </div>

    </aside>
  );
}

/* ── PROMPT CARD ── */
function PromptCard({ entry, index }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(entry.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <article className="prompt-card" style={{ animationDelay:`${Math.min(index,8) * 0.04}s` }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'20px', flexWrap:'wrap' }}>
        <div style={{ flex:'1 1 320px', minWidth:0 }}>
          <h3 style={{ fontSize:'15.5px', fontWeight:500, color:'#E8F2F5', lineHeight:1.4, marginBottom:'10px', letterSpacing:'-.01em' }}>
            {entry.title}
          </h3>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'10px' }}>
            {entry.teams.map(t => <span key={t} className="team-pill">{t}</span>)}
          </div>
        </div>
        <button
          className="view-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Hide Prompt' : 'View Prompts'}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition:'transform .2s', transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      {expanded && (
        <div style={{
          marginTop:'16px', padding:'14px 16px',
          background:'rgba(10,14,19,0.55)',
          border:'1px solid rgba(9,160,157,.18)',
          borderRadius:'10px',
          animation:'cardFadeIn .2s ease',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
            <span style={{ fontSize:'10.5px', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', color:'#5E8290' }}>
              Prompt
            </span>
            <button
              onClick={handleCopy}
              style={{
                display:'inline-flex', alignItems:'center', gap:'6px',
                background:'transparent', border:'1px solid rgba(9,160,157,.25)',
                color: copied ? '#8EDDBF' : '#0EC4C1',
                borderRadius:'6px', padding:'4px 10px',
                fontSize:'11.5px', fontWeight:500, cursor:'pointer',
                fontFamily:'Geist,sans-serif',
              }}
            >
              {copied ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Copied
                </>
              ) : (
                <>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <p style={{
            fontSize:'13.5px', color:'#B5CCD2', lineHeight:1.65,
            whiteSpace:'pre-wrap', margin:0,
          }}>
            {entry.prompt}
          </p>
        </div>
      )}
    </article>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTA() {
  return (
    <section style={{paddingTop:'32px',paddingBottom:'64px',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{
          position:'relative',borderRadius:'16px',
          border:'1px solid rgba(30,30,48,1)',
          padding:'32px 48px',overflow:'hidden',
          display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:'24px',
          flexWrap:'wrap',
          background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)',
        }}>
          {/* Top shimmer */}
          <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>

          <h3 style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:500,color:'#fff',letterSpacing:'-.03em',lineHeight:1.2,flexShrink:0}}>
            Stop reading about <span style={{color:'#0EC4C1'}}>analytics.</span> Start doing it.
          </h3>

          <div style={{
            display:'flex',alignItems:'center',
            width:'100%',maxWidth:'420px',
            background:'#0D0D1A',border:'1px solid rgba(46,46,64,1)',
            borderRadius:'12px',overflow:'hidden',
            flexShrink:0,
          }}>
            <input
              type="text"
              placeholder="Enter your work email"
              style={{
                flex:1,background:'transparent',fontSize:'14px',color:'#fff',
                padding:'12px 16px',outline:'none',border:'none',
                fontFamily:'Geist,sans-serif',minWidth:0,
              }}
            />
            <button style={{
              display:'inline-flex',alignItems:'center',gap:'8px',
              padding:'10px 20px',margin:'4px',
              fontSize:'13px',fontWeight:500,color:'#fff',
              background:'linear-gradient(135deg,#07807E,#09A09D)',
              borderRadius:'8px',border:'none',cursor:'pointer',
              whiteSpace:'nowrap',flexShrink:0,
              fontFamily:'Geist,sans-serif',
            }}>
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
    'AI Chat': '../Platform/AI Chat',
    'Integrations': '../Platform/Integrations',
    'Semantic Layer': '../Platform/Semantic Layer',
    'Memory & Storage': '../Platform/Memory & Storage',
    'For RevOps & BizOps': '../Solutions/RevOps BizOps',
    'For Founders & CEOs': '../Solutions/Founders CEOs',
    'For CMOs & Marketers': '../Solutions/Marketing Teams',
    'For Product Teams': '../Solutions/Product Teams',
    'For Data & Analytics Teams': '../Solutions/Data Analytics Teams',
    'For Operations & Finance': '../Solutions/Operations Finance',
    'Documentation': '../docs/',
    'Blog': '../blog/',
    'Support Center': 'Contact Support',
    'Roadmap': 'Roadmap',
    'Prompt Library': 'Prompt Library',
    'Data Connectors': 'Connectors',
  };

  const resourceLinkUrls = {
    'Documentation': '../docs/',
    'Prompt Library': 'Prompt Library',
    'Blog': '../blog/',
    'Support Center': 'Contact Support',
    'Roadmap': 'Roadmap',
    'Data Connectors': 'Connectors',
  };

  return (
    <footer className="pt-16 pb-8 border-t border-[#1E1E30]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-14 items-start">
          {/* Brand */}
          <div className="shrink-0 md:max-w-[220px]">
            <a href="/" aria-label="Insightis home" className="flex items-center gap-2.5 mb-4">
              <svg width="111" height="26" viewBox="0 0 111 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7"><g clipPath="url(#clip0_footer)"><path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/><path d="M33.2746 17.5261V5.60823H35.5859V17.5261H33.2746Z" fill="white"/><path d="M38.2797 17.5261V8.0821H40.1758L40.1216 10.9713H40.4466C40.6152 10.261 40.8379 9.67717 41.1148 9.21971C41.4037 8.76226 41.7708 8.41917 42.2163 8.19044C42.6617 7.96171 43.1793 7.84735 43.7692 7.84735C44.8406 7.84735 45.6532 8.22656 46.207 8.98497C46.7728 9.74338 47.0557 10.9171 47.0557 12.5062V17.5261H44.7624V12.7409C44.7624 11.7177 44.6059 10.9713 44.2929 10.5018C43.9919 10.0203 43.5405 9.77949 42.9386 9.77949C42.433 9.77949 42.0056 9.94201 41.6565 10.267C41.3074 10.58 41.0365 11.0014 40.8439 11.5311C40.6633 12.0487 40.567 12.6205 40.555 13.2465V17.5261H38.2797Z" fill="white"/><path d="M53.1255 17.7609C52.4875 17.7609 51.9096 17.6947 51.392 17.5622C50.8864 17.4419 50.453 17.2673 50.0918 17.0386C49.7307 16.7978 49.4418 16.5149 49.2251 16.1899C49.0084 15.8528 48.876 15.4796 48.8278 15.0703L50.6155 14.4022C50.6396 14.7152 50.76 14.9981 50.9767 15.2509C51.1933 15.4917 51.4943 15.6843 51.8795 15.8287C52.2647 15.9732 52.7282 16.0454 53.2699 16.0454C53.8719 16.0454 54.3353 15.9551 54.6604 15.7746C54.9974 15.5819 55.166 15.3111 55.166 14.962C55.166 14.7092 55.0757 14.5105 54.8951 14.3661C54.7145 14.2096 54.4497 14.0832 54.1006 13.9869C53.7635 13.8785 53.3542 13.7762 52.8727 13.6799C52.4273 13.5836 51.9758 13.4752 51.5184 13.3549C51.073 13.2224 50.6576 13.0539 50.2724 12.8493C49.8992 12.6326 49.5922 12.3557 49.3515 12.0186C49.1228 11.6695 49.0084 11.2301 49.0084 10.7004C49.0084 10.1226 49.1589 9.623 49.4598 9.20166C49.7728 8.78032 50.2182 8.44926 50.7961 8.2085C51.386 7.96773 52.0962 7.84735 52.9269 7.84735C53.7093 7.84735 54.3835 7.9557 54.9493 8.17238C55.5271 8.38907 55.9966 8.70207 56.3578 9.11137C56.7189 9.50863 56.9476 9.98415 57.0439 10.5379L55.166 11.1338C55.1299 10.7967 55.0155 10.5138 54.8229 10.2851C54.6303 10.0443 54.3714 9.86376 54.0464 9.74338C53.7214 9.623 53.3422 9.56281 52.9088 9.56281C52.355 9.56281 51.9217 9.65911 51.6087 9.85172C51.2957 10.0443 51.1392 10.3032 51.1392 10.6282C51.1392 10.893 51.2355 11.1037 51.4281 11.2602C51.6327 11.4167 51.9096 11.5431 52.2587 11.6394C52.6199 11.7357 53.0292 11.832 53.4866 11.9283C53.9682 12.0246 54.4316 12.139 54.8771 12.2714C55.3345 12.3918 55.7438 12.5543 56.105 12.759C56.4661 12.9636 56.755 13.2345 56.9717 13.5716C57.1884 13.8966 57.2967 14.3179 57.2967 14.8356C57.2967 15.4616 57.1282 15.9973 56.7911 16.4427C56.4541 16.8761 55.9725 17.2071 55.3465 17.4358C54.7326 17.6525 53.9922 17.7609 53.1255 17.7609Z" fill="white"/><path d="M59.2115 17.5261V8.0821H61.4868V17.5261H59.2115ZM60.3492 6.60139C59.8917 6.60139 59.5366 6.50508 59.2838 6.31247C59.043 6.10782 58.9226 5.8189 58.9226 5.44571C58.9226 5.07253 59.043 4.78963 59.2838 4.59702C59.5366 4.39236 59.8917 4.29004 60.3492 4.29004C60.8307 4.29004 61.1918 4.38635 61.4326 4.57896C61.6734 4.77157 61.7937 5.06049 61.7937 5.44571C61.7937 5.8189 61.6673 6.10782 61.4145 6.31247C61.1738 6.50508 60.8186 6.60139 60.3492 6.60139Z" fill="white"/><path d="M67.709 20.7765C66.6857 20.7765 65.843 20.6982 65.1809 20.5417C64.5309 20.3852 64.0493 20.1505 63.7363 19.8375C63.4233 19.5245 63.2668 19.1393 63.2668 18.6818C63.2668 18.128 63.4835 17.6766 63.9169 17.3275C64.3623 16.9663 65.0184 16.7436 65.8852 16.6594V16.2982C65.2351 16.3103 64.7415 16.2441 64.4045 16.0996C64.0674 15.9431 63.8988 15.6963 63.8988 15.3592C63.8988 15.0342 64.0614 14.7453 64.3864 14.4925C64.7235 14.2397 65.2772 14.029 66.0477 13.8605V13.4993C65.3133 13.4632 64.7415 13.2345 64.3322 12.8131C63.9229 12.3798 63.7183 11.82 63.7183 11.1338C63.7183 10.5198 63.8868 9.97813 64.2239 9.50863C64.561 9.03914 65.0545 8.67197 65.7046 8.40713C66.3667 8.13025 67.1672 7.99181 68.1062 7.99181H72.7831V9.79755L69.8217 9.36417V9.76144C70.5681 9.88182 71.1158 10.0925 71.4649 10.3934C71.8261 10.6944 72.0066 11.1037 72.0066 11.6214C72.0066 12.1149 71.8501 12.5543 71.5371 12.9395C71.2241 13.3127 70.7667 13.6077 70.1648 13.8244C69.5749 14.029 68.8586 14.1313 68.0159 14.1313C67.8594 14.1313 67.6909 14.1253 67.5103 14.1133C67.3298 14.1012 67.0469 14.0711 66.6616 14.023C66.4088 14.2036 66.2042 14.3661 66.0477 14.5105C65.8912 14.643 65.8129 14.7694 65.8129 14.8897C65.8129 14.986 65.8731 15.0703 65.9935 15.1425C66.1139 15.2027 66.2704 15.2449 66.463 15.2689C66.6556 15.293 66.8422 15.3051 67.0228 15.3051H69.5328C69.7735 15.3051 70.0805 15.3231 70.4537 15.3592C70.8389 15.3954 71.2181 15.4917 71.5913 15.6482C71.9765 15.8047 72.2955 16.0514 72.5484 16.3885C72.8132 16.7256 72.9456 17.2011 72.9456 17.815C72.9456 18.5012 72.747 19.061 72.3497 19.4944C71.9645 19.9398 71.3806 20.2648 70.5982 20.4695C69.8277 20.6741 68.8646 20.7765 67.709 20.7765ZM67.9076 18.9346C68.654 18.9346 69.2499 18.8925 69.6953 18.8082C70.1407 18.7239 70.4597 18.5855 70.6523 18.3929C70.8449 18.2123 70.9412 17.9776 70.9412 17.6886C70.9412 17.4238 70.8811 17.2192 70.7607 17.0747C70.6403 16.9182 70.4838 16.8098 70.2912 16.7497C70.1106 16.6895 69.924 16.6534 69.7314 16.6413C69.5388 16.6293 69.3763 16.6233 69.2438 16.6233H67.0228C66.4449 16.7075 66.0356 16.87 65.7949 17.1108C65.5662 17.3516 65.4518 17.6164 65.4518 17.9053C65.4518 18.1943 65.5481 18.4109 65.7407 18.5554C65.9333 18.7119 66.2102 18.8142 66.5713 18.8624C66.9445 18.9105 67.3899 18.9346 67.9076 18.9346ZM67.9618 12.8854C68.5878 12.8854 69.0633 12.7409 69.3883 12.452C69.7133 12.151 69.8759 11.7598 69.8759 11.2783C69.8759 10.7606 69.7073 10.3393 69.3702 10.0142C69.0452 9.67717 68.5697 9.50863 67.9437 9.50863C67.3177 9.50863 66.8302 9.67115 66.4811 9.99618C66.144 10.3212 65.9755 10.7365 65.9755 11.2421C65.9755 11.5672 66.0477 11.8561 66.1921 12.1089C66.3486 12.3497 66.5713 12.5423 66.8603 12.6867C67.1612 12.8192 67.5284 12.8854 67.9618 12.8854Z" fill="white"/><path d="M74.7825 17.5261V4.70536H77.0758V7.64872C77.0758 7.90152 77.0638 8.16035 77.0397 8.42519C77.0277 8.69003 77.0036 8.96089 76.9675 9.23777C76.9314 9.51465 76.8892 9.79153 76.8411 10.0684C76.805 10.3453 76.7628 10.6222 76.7147 10.8991H77.0939C77.2624 10.249 77.4791 9.70125 77.7439 9.25583C78.0088 8.79837 78.3459 8.44926 78.7552 8.2085C79.1765 7.96773 79.6881 7.84735 80.29 7.84735C81.3855 7.84735 82.2041 8.23258 82.7459 9.00303C83.2876 9.76144 83.5584 10.9171 83.5584 12.47V17.5261H81.2651V12.7951C81.2651 11.7598 81.1087 10.9954 80.7957 10.5018C80.4947 10.0082 80.0372 9.76144 79.4233 9.76144C78.9177 9.76144 78.4963 9.91793 78.1593 10.2309C77.8222 10.5319 77.5634 10.9352 77.3828 11.4408C77.2022 11.9464 77.0939 12.5182 77.0578 13.1562V17.5261H74.7825Z" fill="white"/><path d="M89.2495 17.7428C88.2503 17.7428 87.516 17.478 87.0465 16.9483C86.577 16.4066 86.3422 15.5699 86.3422 14.4383V9.9059H84.9518L84.9879 8.10015H85.9089C86.258 8.10015 86.5168 8.04598 86.6853 7.93764C86.8539 7.82929 86.9562 7.63668 86.9923 7.3598L87.209 5.98744H88.5272V8.0821H91.0191V9.97813H88.5272V14.348C88.5272 14.7934 88.6295 15.1185 88.8342 15.3231C89.0509 15.5278 89.3699 15.6301 89.7912 15.6301C90.0199 15.6301 90.2426 15.606 90.4593 15.5579C90.6881 15.4977 90.8987 15.4014 91.0913 15.2689V17.4358C90.7182 17.5562 90.3751 17.6345 90.0621 17.6706C89.7611 17.7187 89.4903 17.7428 89.2495 17.7428Z" fill="white"/><path d="M92.9634 17.5261V8.0821H95.2386V17.5261H92.9634ZM94.101 6.60139C93.6436 6.60139 93.2884 6.50508 93.0356 6.31247C92.7949 6.10782 92.6745 5.8189 92.6745 5.44571C92.6745 5.07253 92.7949 4.78963 93.0356 4.59702C93.2884 4.39236 93.6436 4.29004 94.101 4.29004C94.5825 4.29004 94.9437 4.38635 95.1845 4.57896C95.4252 4.77157 95.5456 5.06049 95.5456 5.44571C95.5456 5.8189 95.4192 6.10782 95.1664 6.31247C94.9256 6.50508 94.5705 6.60139 94.101 6.60139Z" fill="white"/><path d="M101.461 17.7609C100.823 17.7609 100.245 17.6947 99.7273 17.5622C99.2217 17.4419 98.7883 17.2673 98.4272 17.0386C98.066 16.7978 97.7771 16.5149 97.5604 16.1899C97.3437 15.8528 97.2113 15.4796 97.1632 15.0703L98.9508 14.4022C98.9749 14.7152 99.0953 14.9981 99.312 15.2509C99.5287 15.4917 99.8296 15.6843 100.215 15.8287C100.6 15.9732 101.064 16.0454 101.605 16.0454C102.207 16.0454 102.671 15.9551 102.996 15.7746C103.333 15.5819 103.501 15.3111 103.501 14.962C103.501 14.7092 103.411 14.5105 103.23 14.3661C103.05 14.2096 102.785 14.0832 102.436 13.9869C102.099 13.8785 101.69 13.7762 101.208 13.6799C100.763 13.5836 100.311 13.4752 99.8537 13.3549C99.4083 13.2224 98.993 13.0539 98.6077 12.8493C98.2346 12.6326 97.9276 12.3557 97.6868 12.0186C97.4581 11.6695 97.3437 11.2301 97.3437 10.7004C97.3437 10.1226 97.4942 9.623 97.7952 9.20166C98.1082 8.78032 98.5536 8.44926 99.1314 8.2085C99.7213 7.96773 100.432 7.84735 101.262 7.84735C102.045 7.84735 102.719 7.9557 103.285 8.17238C103.862 8.38907 104.332 8.70207 104.693 9.11137C105.054 9.50863 105.283 9.98415 105.379 10.5379L103.501 11.1338C103.465 10.7967 103.351 10.5138 103.158 10.2851C102.966 10.0443 102.707 9.86376 102.382 9.74338C102.057 9.623 101.678 9.56281 101.244 9.56281C100.69 9.56281 100.257 9.65911 99.944 9.85172C99.631 10.0443 99.4745 10.3032 99.4745 10.6282C99.4745 10.893 99.5708 11.1037 99.7634 11.2602C99.9681 11.4167 100.245 11.5431 100.594 11.6394C100.955 11.7357 101.365 11.832 101.822 11.9283C102.303 12.0246 102.767 12.139 103.212 12.2714C103.67 12.3918 104.079 12.5543 104.44 12.759C104.801 12.9636 105.09 13.2345 105.307 13.5716C105.524 13.8966 105.632 14.3179 105.632 14.8356C105.632 15.4616 105.464 15.9973 105.126 16.4427C104.789 16.8761 104.308 17.2071 103.682 17.4358C103.068 17.6525 102.328 17.7609 101.461 17.7609Z" fill="white"/></g><defs><clipPath id="clip0_footer"><rect width="111" height="25.4928" fill="white"/></clipPath></defs></svg>
            </a>
            <p className="text-xs font-medium text-[#09A09D] uppercase tracking-wider mb-2">AI Analytics Workspace for instant insights</p>
            <p className="text-sm text-[#7878A8] leading-relaxed">Every data has an insight. We help you find them, without the complexity.</p>
          </div>

          {/* 5 text columns */}
          <div className="md:ml-auto grid grid-cols-2 gap-8 md:flex md:flex-row md:gap-16">

            {/* Platform */}
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9090C0] mb-4 whitespace-nowrap">Platform</h3>
              <ul className="flex flex-col gap-2.5">
                {['AI Chat', 'Integrations', 'Semantic Layer'].map(link => (
                  <li key={link}><a href={linkUrls[link] || '#'} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9090C0] mb-4 whitespace-nowrap">Solutions</h3>
              <ul className="flex flex-col gap-2.5">
                {['For RevOps & BizOps', 'For Founders & CEOs', 'For CMOs & Marketers', 'For Product Teams', 'For Data & Analytics Teams', 'For Operations & Finance'].map(link => (
                  <li key={link}><a href={linkUrls[link] || '#'} {...(link === 'Video Tutorials' ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link}{link === 'Video Tutorials' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9090C0] mb-4 whitespace-nowrap">Resources</h3>
              <ul className="flex flex-col gap-2.5">
                {['Documentation', 'Prompt Library', 'Blog', 'Support Center', 'Roadmap', 'Data Connectors'].map(link => (
                  <li key={link}><a href={resourceLinkUrls[link] || '#'} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9090C0] mb-4 whitespace-nowrap">Company</h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'About Insightis', href: '../Company/About Insightis' },
                  { label: 'About Devart', href: 'https://www.devart.com/company/' },
                  { label: 'Careers', href: 'https://www.devart.com/vacancies/' },
                  { label: 'Contacts', href: '../Company/Contacts' },
                ].map(link => (
                  <li key={link.label}><a href={link.href} {...(link.href.startsWith('http') ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link.label}{link.href.startsWith('http') && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#9090C0] mb-4 whitespace-nowrap">Legal</h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Privacy', href: '../Security/Privacy' },
                  { label: 'Terms', href: '../Security/Terms' },
                  { label: 'Security', href: '../Security/Security' },
                  { label: 'Cookie Settings', href: '../Security/Cookie Settings' },
                ].map(link => (
                  <li key={link.label}><a href={link.href} {...(link.href.startsWith('http') ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link.label}{link.href.startsWith('http') && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E1E30] pt-6 flex items-center justify-between">
          <p className="text-xs text-[#7878A8]">&copy; Copyright &copy; Devart 2026</p>
          <div className="flex items-center gap-4">
            <a href="https://x.com/Insightisai" target="_blank" rel="noopener noreferrer" aria-label="Insightis on X (formerly Twitter)" className="hover:opacity-80 transition-opacity"><TwitterXIcon size={18} color="#7878A8" /></a>
            <a href="https://www.tiktok.com/@insightisai" target="_blank" rel="noopener noreferrer" aria-label="Insightis on TikTok" className="hover:opacity-80 transition-opacity"><TikTokIcon size={18} color="#7878A8" /></a>
            <a href="https://www.youtube.com/@InsightisAI" target="_blank" rel="noopener noreferrer" aria-label="Insightis on YouTube" className="hover:opacity-80 transition-opacity"><YouTubeIcon size={18} color="#7878A8" /></a>
            <a href="https://www.linkedin.com/company/112025589" target="_blank" rel="noopener noreferrer" aria-label="Insightis on LinkedIn" className="hover:opacity-80 transition-opacity"><LinkedInIcon size={18} color="#7878A8" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── FLOATING CHAT ── */
function FloatingChat({ onSubmit }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <div style={{
      position:'fixed', bottom:0, left:0, right:0,
      zIndex:100,
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity .25s, transform .25s',
    }}>
      <div className="floating-chat-wrap" style={{ pointerEvents:'all' }}>
        <div style={{
          display:'flex', alignItems:'center', gap:'8px',
          background:'rgba(16,22,30,0.96)',
          border: focused ? '1px solid rgba(9,160,157,.5)' : '1px solid rgba(255,255,255,.09)',
          borderRadius:'12px',
          padding:'6px 6px 6px 12px',
          transition:'border-color .2s',
          boxShadow:'0 8px 32px rgba(0,0,0,0.45)',
          backdropFilter:'blur(10px)',
          WebkitBackdropFilter:'blur(10px)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7FA0AC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
            placeholder="Ask for a prompt or a custom workflow..."
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              fontSize:'13px', color:'#E8F2F5',
              fontFamily:'inherit',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              flexShrink:0,
              padding:'6px 14px', borderRadius:'7px',
              background: value.trim() ? '#07807E' : 'rgba(9,160,157,.15)',
              color: value.trim() ? '#fff' : '#4A9EA0',
              border:'none', cursor: value.trim() ? 'pointer' : 'default',
              fontSize:'12px', fontWeight:600,
              fontFamily:'inherit',
              transition:'background .2s, color .2s',
            }}
            onMouseEnter={(e) => { if (value.trim()) e.currentTarget.style.background = '#09A09D'; }}
            onMouseLeave={(e) => { if (value.trim()) e.currentTarget.style.background = '#07807E'; }}
          >
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── AI ASSISTANT PANEL ── */
function AssistantResponseText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i} style={{ color:'#C8E6EA', fontWeight:600 }}>{p.slice(2,-2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
}

function AIAssistantPanel({ query, onClose }) {
  const [phase, setPhase] = useState('searching');
  const [input, setInput] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [messages, setMessages] = useState([{ role:'user', text: query }]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);

  const SAMPLE_RESPONSE = {
    searchTerms: query.toLowerCase().split(' ').filter(w => w.length > 2).slice(0, 3).join(', ') || 'prompts',
    intro: 'I found a few **prompt templates** that match what you\'re looking for. Each one is pre-wired to the right data sources so you can run it with a single click.',
    bullets: [
      { bold: 'Pipeline Velocity by Source', text: ' — measure velocity per channel across Salesforce + HubSpot + ads' },
      { bold: 'Churn Risk Scoring', text: ' — score every renewal using usage, tickets, and ARR trend' },
      { bold: 'Campaign Attribution Deep-Dive', text: ' — multi-touch attribution all the way to Closed-Won' },
      { bold: 'Exec Weekly Revenue Narrative', text: ' — a 250-word Monday-morning summary for leadership' },
    ],
    outro: 'Want me to customize one for your team\'s stack, or generate a brand-new prompt from scratch?',
    links: ['Browse all 15 prompts', 'Connect a new data source', 'Build a custom prompt'],
  };

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reading'), 800);
    const t2 = setTimeout(() => {
      setPhase('done');
      setMessages(m => [...m, { role:'assistant', response: SAMPLE_RESPONSE }]);
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [messages, phase]);

  const handleFollowUp = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setInput('');
    setMessages(m => [...m, { role:'user', text: q }]);
    setPhase('searching');
    setTimeout(() => setPhase('reading'), 800);
    setTimeout(() => {
      setPhase('done');
      setMessages(m => [...m, { role:'assistant', response: SAMPLE_RESPONSE }]);
    }, 1800);
  };

  const iconBtn = (title, path) => (
    <button title={title} onClick={() => {
      if (title === 'Copy') { navigator.clipboard?.writeText(''); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    }} style={{
      background:'none', border:'none', cursor:'pointer', padding:'4px', borderRadius:'4px',
      color:'#5E8290', transition:'color .15s',
    }}
    onMouseEnter={e => e.currentTarget.style.color = '#7FA0AC'}
    onMouseLeave={e => e.currentTarget.style.color = '#5E8290'}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={path}/>
      </svg>
    </button>
  );

  return (
    <div style={{
      position:'fixed', right:0, top:0, bottom:0, width:'320px',
      background:'#0B0F16',
      borderLeft:'1px solid rgba(255,255,255,0.07)',
      display:'flex', flexDirection:'column',
      zIndex:200,
      animation:'slideInRight .25s ease',
    }}>
      {/* Header */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.07)',
        flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span style={{ fontSize:'13px', fontWeight:600, color:'#E8F2F5' }}>Assistant</span>
        </div>
        <div style={{ display:'flex', gap:'2px' }}>
          <button onClick={onClose} style={{
            background:'none', border:'none', cursor:'pointer', padding:'4px', borderRadius:'4px',
            color:'#5E8290', transition:'color .15s', display:'flex',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#E8F2F5'}
          onMouseLeave={e => e.currentTarget.style.color = '#5E8290'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'16px 14px', display:'flex', flexDirection:'column', gap:'16px' }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.role === 'user' ? (
              <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <div style={{
                  background:'rgba(9,160,157,0.15)',
                  border:'1px solid rgba(9,160,157,0.25)',
                  borderRadius:'10px 10px 2px 10px',
                  padding:'8px 12px',
                  fontSize:'13px', color:'#C8E6EA', maxWidth:'90%',
                  lineHeight:1.5,
                }}>
                  {msg.text}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize:'12px', color:'#3A6070', marginBottom:'10px', display:'flex', flexDirection:'column', gap:'4px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    Found prompts for <em style={{ color:'#4A8090', fontStyle:'normal' }}>{msg.response.searchTerms}</em>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    Scanned 15 templates
                  </div>
                </div>
                <p style={{ fontSize:'13px', color:'#8AAAB8', lineHeight:1.7, marginBottom:'10px' }}>
                  <AssistantResponseText text={msg.response.intro} />
                </p>
                <ul style={{ margin:'0 0 10px 0', padding:'0', listStyle:'none', display:'flex', flexDirection:'column', gap:'5px' }}>
                  {msg.response.bullets.map((b, i) => (
                    <li key={i} style={{ fontSize:'13px', color:'#8AAAB8', lineHeight:1.6, paddingLeft:'14px', position:'relative' }}>
                      <span style={{ position:'absolute', left:0, color:'#0EC4C1', fontWeight:700 }}>·</span>
                      <strong style={{ color:'#C8E6EA' }}>{b.bold}</strong>{b.text}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize:'13px', color:'#8AAAB8', lineHeight:1.7, marginBottom:'12px' }}>
                  {msg.response.outro}
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:'4px', marginBottom:'12px' }}>
                  {msg.response.links.map((l, i) => (
                    <a key={i} href="#" style={{ fontSize:'12px', color:'#09A09D', textDecoration:'none' }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                    >{l}</a>
                  ))}
                </div>
                <div style={{ display:'flex', gap:'4px', alignItems:'center' }}>
                  {iconBtn('Helpful', 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z')}
                  {iconBtn('Not helpful', 'M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z')}
                  {iconBtn('Copy', copied ? 'M20 6L9 17l-5-5' : 'M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.912 4.895 3 6 3h8c1.105 0 2 .912 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.088 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z')}
                  {iconBtn('Regenerate', 'M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15')}
                </div>
              </div>
            )}
          </div>
        ))}

        {phase !== 'done' && (
          <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'#3A6070' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation:'pulse 1.2s ease infinite' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              {phase === 'searching' ? 'Searching prompt library…' : 'Reading templates…'}
            </div>
            <div style={{ display:'flex', gap:'5px', paddingTop:'4px' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width:'6px', height:'6px', borderRadius:'50%',
                  background:'#0EC4C1',
                  animation:`pulse 1.2s ease ${i * 0.2}s infinite`,
                }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Follow-up input */}
      <div style={{
        padding:'10px 14px 18px', borderTop:'1px solid rgba(255,255,255,0.07)', flexShrink:0,
      }}>
        <div style={{
          display:'flex', alignItems:'center', gap:'8px',
          background:'rgba(255,255,255,0.04)',
          border: inputFocused ? '1px solid rgba(9,160,157,.4)' : '1px solid rgba(255,255,255,.07)',
          borderRadius:'10px',
          padding:'8px 8px 8px 12px',
          transition:'border-color .2s',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onKeyDown={e => { if (e.key === 'Enter') handleFollowUp(); }}
            placeholder="Ask a follow-up..."
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              fontSize:'13px', color:'#E8F2F5', fontFamily:'Geist,sans-serif',
            }}
          />
          <button onClick={handleFollowUp} style={{
            width:'28px', height:'28px', borderRadius:'7px', flexShrink:0,
            background: input.trim() ? '#07807E' : 'rgba(9,160,157,.12)',
            border:'none', cursor: input.trim() ? 'pointer' : 'default',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'background .2s',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? '#fff' : '#3A7080'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── APP ── */
function App() {
  const [selectedTeams, setSelectedTeams] = useState(() => new Set());
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleTeam = (team) => setSelectedTeams(prev => {
    const next = new Set(prev);
    if (next.has(team)) next.delete(team); else next.add(team);
    return next;
  });
  const clearAll = () => { setSelectedTeams(new Set()); setQuery(''); };

  const q = query.trim().toLowerCase();
  const filtered = PROMPTS.filter(p => {
    if (selectedTeams.size && !p.teams.some(t => selectedTeams.has(t))) return false;
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.prompt.toLowerCase().includes(q) ||
      p.teams.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <Header />
      <main>
      <PromptLibraryHero />
      <div className="prompt-layout">
        <PromptLibrarySidebar
          selectedTeams={selectedTeams}
          toggleTeam={toggleTeam}
          clearAll={clearAll}
        />
        <div className="prompt-content">
          <div style={{
            display:'flex', alignItems:'center', gap:'10px',
            background:'rgba(16,22,30,0.7)',
            border: searchFocused ? '1px solid rgba(9,160,157,.5)' : '1px solid rgba(255,255,255,0.07)',
            borderRadius:'12px',
            padding:'11px 14px',
            width:'100%',
            marginBottom:'20px',
            transition:'border-color .2s',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7FA0AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search prompts by title, team, or data source..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                flex:1, background:'transparent', border:'none', outline:'none',
                fontSize:'14px', color:'#E8F2F5', fontFamily:"'Geist', sans-serif",
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{
                background:'none', border:'none', cursor:'pointer',
                color:'#7FA0AC', padding:'2px 6px', fontSize:'12px',
                fontFamily:"'Geist', sans-serif",
              }}>
                Clear
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            filtered.map((entry, i) => (
              <PromptCard key={entry.title} entry={entry} index={i} />
            ))
          ) : (
            <div style={{
              padding:'40px 24px', textAlign:'center',
              border:'1px dashed rgba(255,255,255,0.08)', borderRadius:'12px',
              color:'#7FA0AC', fontSize:'14px',
            }}>
              No prompts match your search — try different keywords or clear a filter.
            </div>
          )}
        </div>
      </div>
      <BottomCTA />
            </main>
      <Footer />
    </div>
  );
}

export default App;
if (typeof window !== 'undefined') {
  const el = document.getElementById('root');
  if (el && el.hasChildNodes()) {
    ReactDOM.hydrateRoot(el, <App />);
  } else if (el) {
    ReactDOM.createRoot(el).render(<App />);
  }
}
