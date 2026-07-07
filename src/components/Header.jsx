import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import Button from './Button';
import Chip from './Chip';
import { getCurrentPath, normalizePath } from './currentPath';

function MenuIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
}
function CloseIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}

export default function Header() {
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
    'AI Chat': '/platform/ai-chat',
    'Integrations': '/platform/integrations',
    'Semantic Layer': '/platform/semantic-layer',
    'Memory & Storage': '/platform/memory-storage',
    'For Revenue Operations Teams': '/solutions/revops-bizops',
    'For Executive Teams': '/solutions/founders-ceos',
    'For Marketing Teams': '/solutions/marketing-teams',
    'For Product Teams': '/solutions/product-teams',
    'For Data & Analytics Teams': '/solutions/data-analytics-teams',
    'For Operations & Finance Teams': '/solutions/operations-finance',
    'Pricing': '/pricing',
    'Documentation': '/docs/',
    'Blog': '/blog/',
    'Support Center': '/resources/contact-support',
    'Roadmap': '/resources/roadmap',
    'Prompt Library': '/resources/prompt-library',
    'Data Connectors': '/resources/connectors',
    'About Insightis': '/company/about-insightis',
    'Contacts': '/company/contacts',
    'Success Stories': '/company/success-stories',
    'Press & Media': '/company/press-media',
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
          { label: 'Memory & Storage', desc: 'Your business context, always remembered', icon: 'box', comingSoon: true, notClickable: true },
        ]},
      ]
    },
    Solutions: {
      sections: [
        { heading: 'GROWTH', items: [
          { label: 'For Revenue Operations Teams', desc: 'Revenue operations and business intelligence', icon: 'dollar' },
          { label: 'For Executive Teams', desc: 'Strategic KPIs and company health at a glance', icon: 'star' },
          { label: 'For Marketing Teams', desc: 'Campaign analytics and cross-channel attribution', icon: 'pulse' },
        ]},
        { heading: 'OPERATIONS', items: [
          { label: 'For Product Teams', desc: 'Usage metrics and feature adoption tracking', icon: 'box' },
          { label: 'For Data & Analytics Teams', desc: 'Advanced querying and data exploration', icon: 'bars' },
          { label: 'For Operations & Finance Teams', desc: 'Cost tracking and operational efficiency', icon: 'settings' },
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

  // QA: mark the link to the page we're on (mega-menu + mobile) with
  // aria-current="page". getCurrentPath works during prerender too, so the
  // attribute lands in the static HTML.
  const currentPath = getCurrentPath();
  const isActive = (label) => !!linkUrls[label] && normalizePath(linkUrls[label]) === currentPath;

  return (
    <>
      <div style={{
        position:'sticky', top:0, zIndex:50,
        backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
        willChange:'transform',
        transition:'transform 0.25s ease',
        transform:'translateY(0)',
      }}>
      <div ref={navRef} style={{
        position:'relative',
        maxWidth:'1240px', width:'calc(100% - 32px)',
        margin:'0 auto',
        padding:'12px 0 0',
      }}>
        <nav style={{
          height:'56px', display:'flex', alignItems:'center',
          background:'var(--ins-surface-navbar-glass)',
          backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          border:'1px solid var(--ins-border-default)',
          borderRadius: mobileOpen ? '24px 24px 0 0' : '50px',
          boxShadow:'inset 0 1px 0 var(--ins-color-white-a-06), 0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
          padding:'0 8px 0 24px',
          transition:'border-radius 0.25s ease, box-shadow 0.3s ease',
        }}>
          <div style={{width:'100%'}} className="flex items-center justify-between">
            <a href="/" aria-label="Insightis home" className="flex items-center gap-2.5 flex-shrink-0">
              <Logo height={26}/>
            </a>

            <div className="hidden md:flex items-center" style={{gap:'var(--ins-size-half)'}}>
              {['Platform', 'Solutions', 'Resources', 'Pricing'].map(link => (
                <div key={link}>
                  {hasDropdown(link) ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link ? null : link)}
                      className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm transition-colors ${activeDropdown === link ? 'text-text-primary bg-surface-hover' : 'text-text-muted hover:text-text-primary hover:bg-surface-hover'}`}
                    >
                      {link}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{transition:'transform 0.2s', transform: activeDropdown === link ? 'rotate(180deg)' : 'rotate(0deg)', opacity:0.5}}>
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                  ) : (
                    <a href={linkUrls[link] || '#'} aria-current={isActive(link) ? 'page' : undefined} className={`flex items-center px-4 py-1.5 rounded-full text-sm hover:bg-surface-hover transition-colors ${isActive(link) ? 'text-text-primary' : 'text-text-muted hover:!text-text-primary'}`}>
                      {link}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden md:flex items-center flex-shrink-0" style={{gap:'var(--ins-size-3)'}}>
              <Button as="a" href="/auth/sign-in/" variant="ghost" size="sm">Sign in</Button>
              <Button as="a" href="/auth/sign-up/" variant="primary" size="sm">Start for free</Button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center text-text-primary"
              style={{ minWidth: '44px', minHeight: '44px' }}
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
            background:'var(--ins-surface-navbar-dropdown)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            borderLeft:'1px solid var(--ins-border-default)',
            borderRight:'1px solid var(--ins-border-default)',
            borderBottom:'1px solid var(--ins-border-default)',
            borderRadius:'0 0 24px 24px',
            boxShadow:'none',
          }}>
            <div style={{padding:'44px 32px 28px'}}>
              <div className="flex gap-10">
                {dropdowns[activeDropdown].sections.map((section, si) => (
                  <div key={si} style={{flex:'1'}}>
                    {section.heading && <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted mb-4 px-3">{section.heading}</p>}
                    <div className="flex flex-col gap-0.5">
                      {section.items.map((item, ii) => {
                        const inner = (<>
                          {item.icon && (
                            <div style={{
                              flexShrink:0,
                              width:'36px', height:'36px',
                              display:'flex', alignItems:'center', justifyContent:'center',
                              borderRadius:'var(--ins-radius-8)',
                              background:'var(--ins-surface-brand-tint)',
                              border:'1px solid var(--ins-border-brand)',
                              color:'var(--ins-text-highlight)',
                            }}>
                              <NavIcon name={item.icon} />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="flex items-center gap-2">
                              <span className={`text-sm font-medium text-text-primary transition-colors ${item.notClickable ? '' : 'group-hover:text-text-highlight'}`}>{item.label}{item.external && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'var(--ins-size-1)',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</span>
                              {item.comingSoon && (
                                <Chip variant="brand" style={{ fontSize: '10px', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>Coming Soon</Chip>
                              )}
                            </span>
                            <span className="text-xs text-text-muted mt-0.5 leading-relaxed">{item.desc}</span>
                          </div>
                        </>);
                        return item.notClickable ? (
                          <div key={ii} className="flex items-start gap-3 px-3 py-2.5 rounded-xl group" aria-disabled="true">{inner}</div>
                        ) : (
                          <a key={ii} href={linkUrls[item.label] || '#'} aria-current={isActive(item.label) ? 'page' : undefined} {...(item.external ? {target:'_blank', rel:'noopener noreferrer'} : {})} onClick={() => setActiveDropdown(null)}
                            className={`flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-hover transition-colors group ${isActive(item.label) ? 'bg-surface-hover' : ''}`}>{inner}</a>
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
            background:'var(--ins-surface-navbar-dropdown)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            borderLeft:'1px solid var(--ins-border-default)',
            borderRight:'1px solid var(--ins-border-default)',
            borderBottom:'1px solid var(--ins-border-default)',
            borderRadius:'0 0 24px 24px',
            padding:'16px 24px',
          }}>
            {['Platform', 'Solutions', 'Resources', 'Pricing'].map(link => {
              const dd = dropdowns[link];
              if (!dd) {
                return <a key={link} href={linkUrls[link] || '#'} aria-current={isActive(link) ? 'page' : undefined} className={`block py-3 transition-colors ${isActive(link) ? 'text-text-primary' : 'text-text-muted hover:!text-text-primary'}`}>{link}</a>;
              }
              return (
                <details key={link} name="mobile-nav" style={{borderBottom:'1px solid var(--ins-border-default)'}}>
                  <summary className="py-3 text-text-muted cursor-pointer flex items-center justify-between" style={{listStyle:'none'}}>
                    <span>{link}</span>
                    <span style={{opacity:0.5,fontSize:'var(--ins-font-size-12)'}}>▾</span>
                  </summary>
                  <div style={{paddingLeft:'var(--ins-size-3)',paddingBottom:'var(--ins-size-2)'}}>
                    {dd.sections.flatMap(s => s.items).map(item => (
                      item.notClickable
                        ? <div key={item.label} aria-disabled="true" className="block py-2 text-sm text-text-disabled">{item.label}{item.comingSoon && <Chip variant="brand" className="ml-2" style={{ fontSize: '9px' }}>Coming soon</Chip>}</div>
                        : <a key={item.label} href={linkUrls[item.label] || '#'} aria-current={isActive(item.label) ? 'page' : undefined} className={`block py-2 text-sm hover:text-text-primary transition-colors ${item.comingSoon ? 'text-text-disabled' : (isActive(item.label) ? 'text-text-primary' : 'text-text-muted')}`}>{item.label}{item.comingSoon && <Chip variant="brand" className="ml-2" style={{ fontSize: '9px' }}>Coming soon</Chip>}</a>
                    ))}
                  </div>
                </details>
              );
            })}
            <div className="mt-4 pt-4 border-t border-border-strong flex flex-col gap-3">
              <Button as="a" href="/auth/sign-in/" variant="ghost" size="md" className="text-center">Sign in</Button>
              <Button as="a" href="/auth/sign-up/" variant="primary" size="md" className="text-center">Start for free</Button>
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
