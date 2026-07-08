import React from 'react';
import Logo from './Logo';
import { getCurrentPath, normalizePath } from './currentPath';


function TwitterXIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function LinkedInIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
function YouTubeIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
}

export default function Footer() {
  const linkUrls = {
    'AI Chat': '/platform/ai-chat',
    'Integrations': '/platform/integrations',
    'Semantic Layer': '/platform/semantic-layer',
    'Memory & Storage': '/platform/memory-storage',
    'For Revenue Teams': '/solutions/revenue-teams',
    'For Executive Teams': '/solutions/executive-teams',
    'For Marketing Teams': '/solutions/marketing-teams',
    'For Product Teams': '/solutions/product-teams',
    'For Analytics Teams': '/solutions/analytics-teams',
    'For Finance Teams': '/solutions/finance-teams',
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
  // QA: mark the link to the page we're on with aria-current="page".
  // getCurrentPath works during prerender too (static HTML carries it).
  const currentPath = getCurrentPath();
  const isActiveUrl = (url) => !!url && !url.startsWith('http') && normalizePath(url) === currentPath;
  const isActive = (label) => isActiveUrl(linkUrls[label]);
  return (
    <footer className="pt-16 pb-8 border-t border-border-strong">
      <div className="max-w-7xl mx-auto px-6">
        {/* Row layout only from lg — at md widths (768–1023px) the five link
            columns don't fit next to the brand block and get clipped (QA #1). */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-14 items-start">
          {/* Brand */}
          <div className="shrink-0 lg:w-[220px]">
            <a href="/" aria-label="Insightis home" className="flex items-center gap-2.5 mb-4">
              <Logo height={26}/>
            </a>
            <p className="text-xs font-medium text-text-highlight uppercase tracking-wider mb-2">AI Analytics Workspace for instant insights</p>
            <p className="text-sm text-text-secondary leading-relaxed" style={{ textWrap: 'pretty' }}>Built by the Devart team — the trusted data partner of 40,000+ companies worldwide for over 28 years.</p>
          </div>

          {/* 5 text columns — pushed to the right edge */}
          <div className="lg:ml-auto grid grid-cols-2 gap-8 lg:flex lg:flex-row lg:gap-16">

            {/* Platform */}
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-primary mb-4 whitespace-nowrap">Platform</div>
              <ul className="flex flex-col gap-2.5">
                {['AI Chat', 'Integrations', 'Semantic Layer'].map(link => (
                  <li key={link}><a href={linkUrls[link] || '#'} aria-current={isActive(link) ? 'page' : undefined} className={`text-sm hover:text-text-primary transition-colors whitespace-nowrap ${isActive(link) ? 'text-text-primary' : 'text-text-secondary'}`}>{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-primary mb-4 whitespace-nowrap">Solutions</div>
              <ul className="flex flex-col gap-2.5">
                {['For Revenue Teams', 'For Executive Teams', 'For Marketing Teams', 'For Product Teams', 'For Analytics Teams', 'For Finance Teams'].map(link => (
                  <li key={link}><a href={linkUrls[link] || '#'} aria-current={isActive(link) ? 'page' : undefined} className={`text-sm hover:text-text-primary transition-colors whitespace-nowrap ${isActive(link) ? 'text-text-primary' : 'text-text-secondary'}`}>{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-primary mb-4 whitespace-nowrap">Resources</div>
              <ul className="flex flex-col gap-2.5">
                {['Documentation', 'Prompt Library', 'Blog', 'Support Center', 'Roadmap', 'Data Connectors'].map(link => (
                  <li key={link}><a href={linkUrls[link] || '#'} aria-current={isActive(link) ? 'page' : undefined} className={`text-sm hover:text-text-primary transition-colors whitespace-nowrap ${isActive(link) ? 'text-text-primary' : 'text-text-secondary'}`}>{link}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-primary mb-4 whitespace-nowrap">Company</div>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'About Insightis', href: '/company/about-insightis' },
                  { label: 'About Devart', href: 'https://www.devart.com/company/' },
                  { label: 'Careers', href: 'https://www.devart.com/vacancies/' },
                  { label: 'Contacts', href: '/company/contacts' },
                ].map(link => (
                  <li key={link.label}><a href={link.href} aria-current={isActiveUrl(link.href) ? 'page' : undefined} {...(link.href.startsWith('http') ? {target:'_blank', rel:'noopener noreferrer'} : {})} className={`text-sm hover:text-text-primary transition-colors whitespace-nowrap ${isActiveUrl(link.href) ? 'text-text-primary' : 'text-text-secondary'}`}>{link.label}{link.href.startsWith('http') && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-text-primary mb-4 whitespace-nowrap">Legal</div>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Privacy', href: '/security/privacy' },
                  { label: 'Terms', href: '/security/terms' },
                  { label: 'Security', href: '/security/security' },
                  { label: 'Cookie Settings', href: '/security/cookie-settings' },
                ].map(link => (
                  <li key={link.label}><a href={link.href} aria-current={isActiveUrl(link.href) ? 'page' : undefined} className={`text-sm hover:text-text-primary transition-colors whitespace-nowrap ${isActiveUrl(link.href) ? 'text-text-primary' : 'text-text-secondary'}`}>{link.label}</a></li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border-strong pt-6 flex items-center justify-between">
          <p className="text-xs text-text-secondary">&copy; Devart 2026</p>
          <div className="flex items-center gap-4 text-text-disabled">
            <a href="https://x.com/Insightisai" target="_blank" rel="noopener noreferrer" aria-label="Insightis on X (formerly Twitter)" className="hover:text-text-secondary transition-colors"><TwitterXIcon size={18} /></a>
            <a href="https://www.youtube.com/@InsightisAI" target="_blank" rel="noopener noreferrer" aria-label="Insightis on YouTube" className="hover:text-text-secondary transition-colors"><YouTubeIcon size={18} /></a>
            <a href="https://www.linkedin.com/company/112025589" target="_blank" rel="noopener noreferrer" aria-label="Insightis on LinkedIn" className="hover:text-text-secondary transition-colors"><LinkedInIcon size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
