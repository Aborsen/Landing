import React from 'react';
import Logo from './Logo';


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

export default function Footer() {
  const linkUrls = {
    'AI Chat': '/Platform/AI Chat',
    'Integrations': '/Platform/Integrations',
    'Semantic Layer': '/Platform/Semantic Layer',
    'Memory & Storage': '/Platform/Memory & Storage',
    'For RevOps & BizOps': '/Solutions/RevOps BizOps',
    'For Founders & CEOs': '/Solutions/Founders CEOs',
    'For CMOs & Marketers': '/Solutions/Marketing Teams',
    'For Product Teams': '/Solutions/Product Teams',
    'For Data & Analytics Teams': '/Solutions/Data Analytics Teams',
    'For Operations & Finance': '/Solutions/Operations Finance',
    'Pricing': '/Pricing',
    'Documentation': '/docs/',
    'Blog': '/blog/',
    'Support Center': '/Resources/Contact Support',
    'Roadmap': '/Resources/Roadmap',
    'Prompt Library': '/Resources/Prompt Library',
    'Data Connectors': '/Resources/Connectors',
    'About Insightis': '/Company/About Insightis',
    'Contacts': '/Company/Contacts',
    'Success Stories': '/Company/Success Stories',
    'Press & Media': '/Company/Press Media',
  };
  return (
    <footer className="pt-16 pb-8 border-t border-[#1E1E30]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-14 items-start">
          {/* Brand */}
          <div className="shrink-0 md:max-w-[220px]">
            <a href="/" aria-label="Insightis home" className="flex items-center gap-2.5 mb-4">
              <Logo height={26}/>
            </a>
            <p className="text-xs font-medium text-[#09A09D] uppercase tracking-wider mb-2">AI Analytics Workspace for instant insights</p>
            <p className="text-sm text-[#7878A8] leading-relaxed">Every data has an insight. We help you find them, without the complexity.</p>
          </div>

          {/* 5 text columns — pushed to the right edge */}
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
                  <li key={link}><a href={linkUrls[link] || '#'} {...(link === 'Video Tutorials' ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link}{link === 'Video Tutorials' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
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
          <p className="text-xs text-[#7878A8]">&copy; Copyright © Devart 2026</p>
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
