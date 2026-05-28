import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';

/* ── PRESS HERO ── */
function PressHero() {
  return (
    <section style={{padding:'120px 0 60px', position:'relative'}}>
      <div className="max-w-7xl mx-auto px-6 text-center relative">
        <SectionHeader
          eyebrow="Press & Media"
          title="Insightis in the news."
          lede="Press resources, brand assets, and media inquiries. Everything you need to write about Insightis."
          as="h1"
          size="lg"
          sparkle
        />
      </div>
    </section>
  );
}

/* ── MEDIA CONTACT ── */
function MediaContact() {
  return (
    <section className="py-20" style={{position:'relative'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left column */}
          <div className="md:w-[35%] flex-shrink-0">
            <h2 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:500, color:'var(--ins-text-highlight)', letterSpacing:'-.03em', lineHeight:1.15}}>
              Media Contact
            </h2>
            <h3 style={{fontSize:'20px', fontWeight:600, color:'var(--ins-color-gray-100)', marginTop:'12px', marginBottom:'12px'}}>
              Get in touch
            </h3>
            <p style={{fontSize:'15px', color:'rgba(255,255,255,.5)', lineHeight:1.65}}>
              For press inquiries, interviews, or partnership announcements — reach our communications team.
            </p>
          </div>
          {/* Right column */}
          <div className="md:w-[65%]">
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ins-button-primary-bg-hover)', fontFamily:'Geist Mono,monospace'}}>Contact</span>
            <div style={{borderTop:'1px solid rgba(255,255,255,0.08)', marginTop:'8px', marginBottom:'24px'}} />
            <div style={{background:'rgba(9,160,157,.04)', border:'1px solid rgba(9,160,157,.2)', borderRadius:'16px', padding:'32px', position:'relative', overflow:'hidden'}}>
              <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(9,160,157,.4),transparent)'}}/>
              <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'16px'}}>
                <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'rgba(9,160,157,.1)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <a href="mailto:press@insightis.io" style={{display:'block', fontSize:'18px', fontWeight:500, color:'var(--ins-text-highlight)', fontFamily:'Geist Mono,monospace', textDecoration:'none'}}>
                    press@insightis.io
                  </a>
                  <p style={{fontSize:'12px', color:'var(--ins-text-disabled)', fontFamily:'Geist Mono,monospace', marginTop:'4px'}}>We aim to respond within 4 hours for press inquiries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── BRAND ASSETS ── */
function BrandAssets() {
  const LogoSVG = ({ inverted }) => (
    <svg width="90" height="22" viewBox="0 0 111 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip_brand)">
        <path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/>
        <path d="M33.2746 17.5261V5.60823H35.5859V17.5261H33.2746Z" fill={inverted ? '#222' : 'white'}/>
        <path d="M38.2797 17.5261V8.0821H40.1758L40.1216 10.9713H40.4466C40.6152 10.261 40.8379 9.67717 41.1148 9.21971C41.4037 8.76226 41.7708 8.41917 42.2163 8.19044C42.6617 7.96171 43.1793 7.84735 43.7692 7.84735C44.8406 7.84735 45.6532 8.22656 46.207 8.98497C46.7728 9.74338 47.0557 10.9171 47.0557 12.5062V17.5261H44.7624V12.7409C44.7624 11.7177 44.6059 10.9713 44.2929 10.5018C43.9919 10.0203 43.5405 9.77949 42.9386 9.77949C42.433 9.77949 42.0056 9.94201 41.6565 10.267C41.3074 10.58 41.0365 11.0014 40.8439 11.5311C40.6633 12.0487 40.567 12.6205 40.555 13.2465V17.5261H38.2797Z" fill={inverted ? '#222' : 'white'}/>
        <path d="M53.1255 17.7609C52.4875 17.7609 51.9096 17.6947 51.392 17.5622C50.8864 17.4419 50.453 17.2673 50.0918 17.0386C49.7307 16.7978 49.4418 16.5149 49.2251 16.1899C49.0084 15.8528 48.876 15.4796 48.8278 15.0703L50.6155 14.4022C50.6396 14.7152 50.76 14.9981 50.9767 15.2509C51.1933 15.4917 51.4943 15.6843 51.8795 15.8287C52.2647 15.9732 52.7282 16.0454 53.2699 16.0454C53.8719 16.0454 54.3353 15.9551 54.6604 15.7746C54.9974 15.5819 55.166 15.3111 55.166 14.962C55.166 14.7092 55.0757 14.5105 54.8951 14.3661C54.7145 14.2096 54.4497 14.0832 54.1006 13.9869C53.7635 13.8785 53.3542 13.7762 52.8727 13.6799C52.4273 13.5836 51.9758 13.4752 51.5184 13.3549C51.073 13.2224 50.6576 13.0539 50.2724 12.8493C49.8992 12.6326 49.5922 12.3557 49.3515 12.0186C49.1228 11.6695 49.0084 11.2301 49.0084 10.7004C49.0084 10.1226 49.1589 9.623 49.4598 9.20166C49.7728 8.78032 50.2182 8.44926 50.7961 8.2085C51.386 7.96773 52.0962 7.84735 52.9269 7.84735C53.7093 7.84735 54.3835 7.9557 54.9493 8.17238C55.5271 8.38907 55.9966 8.70207 56.3578 9.11137C56.7189 9.50863 56.9476 9.98415 57.0439 10.5379L55.166 11.1338C55.1299 10.7967 55.0155 10.5138 54.8229 10.2851C54.6303 10.0443 54.3714 9.86376 54.0464 9.74338C53.7214 9.623 53.3422 9.56281 52.9088 9.56281C52.355 9.56281 51.9217 9.65911 51.6087 9.85172C51.2957 10.0443 51.1392 10.3032 51.1392 10.6282C51.1392 10.893 51.2355 11.1037 51.4281 11.2602C51.6327 11.4167 51.9096 11.5431 52.2587 11.6394C52.6199 11.7357 53.0292 11.832 53.4866 11.9283C53.9682 12.0246 54.4316 12.139 54.8771 12.2714C55.3345 12.3918 55.7438 12.5543 56.105 12.759C56.4661 12.9636 56.755 13.2345 56.9717 13.5716C57.1884 13.8966 57.2967 14.3179 57.2967 14.8356C57.2967 15.4616 57.1282 15.9973 56.7911 16.4427C56.4541 16.8761 55.9725 17.2071 55.3465 17.4358C54.7326 17.6525 53.9922 17.7609 53.1255 17.7609Z" fill={inverted ? '#222' : 'white'}/>
        <path d="M59.2115 17.5261V8.0821H61.4868V17.5261H59.2115ZM60.3492 6.60139C59.8917 6.60139 59.5366 6.50508 59.2838 6.31247C59.043 6.10782 58.9226 5.8189 58.9226 5.44571C58.9226 5.07253 59.043 4.78963 59.2838 4.59702C59.5366 4.39236 59.8917 4.29004 60.3492 4.29004C60.8307 4.29004 61.1918 4.38635 61.4326 4.57896C61.6734 4.77157 61.7937 5.06049 61.7937 5.44571C61.7937 5.8189 61.6673 6.10782 61.4145 6.31247C61.1738 6.50508 60.8186 6.60139 60.3492 6.60139Z" fill={inverted ? '#222' : 'white'}/>
      </g>
      <defs><clipPath id="clip_brand"><rect width="111" height="25.4928" fill="white"/></clipPath></defs>
    </svg>
  );

  const IconMark = () => (
    <svg width="36" height="36" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/>
    </svg>
  );

  const assets = [
    { label: 'Insightis Logo \u2014 for dark backgrounds', preview: 'dark', formats: 'SVG  PNG' },
    { label: 'Insightis Logo \u2014 for light backgrounds', preview: 'light', formats: 'SVG  PNG' },
    { label: 'Icon Mark', preview: 'icon', formats: 'SVG  PNG' },
    { label: 'Brand Colors', preview: 'colors', formats: '' },
  ];

  const colors = [
    { hex: 'var(--ins-surface-page)', name: 'Background' },
    { hex: 'var(--ins-button-primary-bg-hover)', name: 'Primary Teal' },
    { hex: 'var(--ins-text-highlight)', name: 'Accent Teal' },
    { hex: 'var(--ins-color-gray-100)', name: 'Text' },
  ];

  const AssetCard = ({ a }) => (
    <div style={{background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:'12px', overflow:'hidden'}}>
      <div style={{height:'140px', display:'flex', alignItems:'center', justifyContent:'center', background: a.preview === 'light' ? '#F0F0F0' : a.preview === 'colors' ? 'rgba(255,255,255,.03)' : 'rgba(10,14,19,.8)'}}>
        {a.preview === 'dark' && <LogoSVG inverted={false} />}
        {a.preview === 'light' && <LogoSVG inverted={true} />}
        {a.preview === 'icon' && <IconMark />}
        {a.preview === 'colors' && (
          <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
            {colors.map((c, ci) => (
              <div key={ci} style={{textAlign:'center'}}>
                <div style={{width:'44px', height:'44px', borderRadius:'8px', background:c.hex, border:'1px solid rgba(255,255,255,.1)', marginBottom:'6px'}}/>
                <div style={{fontSize:'9px', color:'var(--ins-text-body)', fontFamily:'Geist Mono,monospace'}}>{c.hex}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{padding:'16px'}}>
        <p style={{fontSize:'13px', color:'var(--ins-color-gray-100)', marginBottom:'4px'}}>{a.label}</p>
        {a.formats && (
          <div style={{display:'flex', gap:'12px'}}>
            {a.formats.split('  ').map((f, fi) => (
              <span key={fi} style={{fontSize:'12px', color:'var(--ins-text-highlight)', fontFamily:'Geist Mono,monospace', cursor:'pointer'}}>{f}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-20" style={{position:'relative'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left column */}
          <div className="md:w-[35%] flex-shrink-0">
            <h2 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:500, color:'var(--ins-text-highlight)', letterSpacing:'-.03em', lineHeight:1.15}}>
              Brand Assets
            </h2>
            <h3 style={{fontSize:'20px', fontWeight:600, color:'var(--ins-color-gray-100)', marginTop:'12px', marginBottom:'12px'}}>
              Logos and brand resources
            </h3>
            <p style={{fontSize:'15px', color:'rgba(255,255,255,.5)', lineHeight:1.65}}>
              Download official Insightis logos and brand assets for your coverage.
            </p>
          </div>
          {/* Right column */}
          <div className="md:w-[65%]">
            {/* Logo Assets */}
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ins-button-primary-bg-hover)', fontFamily:'Geist Mono,monospace'}}>Logo Assets</span>
            <div style={{borderTop:'1px solid rgba(255,255,255,0.08)', marginTop:'8px', marginBottom:'24px'}} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{marginBottom:'32px'}}>
              <AssetCard a={assets[0]} />
              <AssetCard a={assets[1]} />
            </div>

            {/* Icon Mark */}
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ins-button-primary-bg-hover)', fontFamily:'Geist Mono,monospace'}}>Icon Mark</span>
            <div style={{borderTop:'1px solid rgba(255,255,255,0.08)', marginTop:'8px', marginBottom:'24px'}} />
            <div style={{marginBottom:'32px', maxWidth:'380px'}}>
              <AssetCard a={assets[2]} />
            </div>

            {/* Brand Colors */}
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ins-button-primary-bg-hover)', fontFamily:'Geist Mono,monospace'}}>Brand Colors</span>
            <div style={{borderTop:'1px solid rgba(255,255,255,0.08)', marginTop:'8px', marginBottom:'24px'}} />
            <AssetCard a={assets[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── COMPANY FACTS ── */
function CompanyFacts() {
  const facts = [
    { label: 'Company', value: 'Insightis by Devart' },
    { label: 'Founded', value: '2024' },
    { label: 'Parent Company', value: 'Devart (est. 1997)' },
    { label: 'Headquarters', value: 'Europe (Remote-first)' },
    { label: 'Category', value: 'AI Analytics Platform' },
    { label: 'Key Features', value: 'AI Chat, Semantic Layer, Insights Engine, 200+ Integrations' },
    { label: 'Target Users', value: 'RevOps, Founders, Marketing, Product, Data, Finance teams' },
    { label: 'Pricing', value: 'Free tier available, Pro from $39/mo' },
    { label: 'Website', value: 'insightis.io' },
  ];

  return (
    <section className="py-20" style={{position:'relative'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left column */}
          <div className="md:w-[35%] flex-shrink-0">
            <h2 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:500, color:'var(--ins-text-highlight)', letterSpacing:'-.03em', lineHeight:1.15}}>
              Company Facts
            </h2>
            <h3 style={{fontSize:'20px', fontWeight:600, color:'var(--ins-color-gray-100)', marginTop:'12px', marginBottom:'12px'}}>
              Quick reference
            </h3>
            <p style={{fontSize:'15px', color:'rgba(255,255,255,.5)', lineHeight:1.65}}>
              Key information about Insightis for press coverage and reference.
            </p>
          </div>
          {/* Right column */}
          <div className="md:w-[65%]">
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ins-button-primary-bg-hover)', fontFamily:'Geist Mono,monospace'}}>Fact Sheet</span>
            <div style={{borderTop:'1px solid rgba(255,255,255,0.08)', marginTop:'8px', marginBottom:'24px'}} />
            {facts.map((f, i) => (
              <div key={i} style={{display:'flex', padding:'14px 0', borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                <div style={{width:'200px', flexShrink:0, fontSize:'12px', fontFamily:'Geist Mono,monospace', color:'var(--ins-text-body)', textTransform:'uppercase'}}>{f.label}</div>
                <div style={{fontSize:'14px', color:'var(--ins-color-gray-100)'}}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── BOILERPLATE ── */
function Boilerplate() {
  const [copied, setCopied] = useState(false);
  const boilerplateText = "Insightis is an AI-powered analytics workspace that lets business teams ask questions about their data in plain English and get instant, accurate answers. Built on a certified Semantic Layer, Insightis connects to 200+ data sources \u2014 including CRMs, billing platforms, data warehouses, and product analytics tools \u2014 and delivers answers grounded in real company data, not internet averages. Features include AI Chat for instant Q&A, Insights Engine for deep root-cause analysis, Memory & Storage for persistent business context, and automated reporting. Insightis is built by Devart, a software company with 25+ years of experience in data connectivity and database tooling. For more information, visit insightis.io.";

  const handleCopy = () => {
    navigator.clipboard.writeText(boilerplateText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20" style={{position:'relative'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Left column */}
          <div className="md:w-[35%] flex-shrink-0">
            <h2 style={{fontSize:'clamp(28px,4vw,44px)', fontWeight:500, color:'var(--ins-text-highlight)', letterSpacing:'-.03em', lineHeight:1.15}}>
              Boilerplate
            </h2>
            <h3 style={{fontSize:'20px', fontWeight:600, color:'var(--ins-color-gray-100)', marginTop:'12px', marginBottom:'12px'}}>
              About Insightis
            </h3>
            <p style={{fontSize:'15px', color:'rgba(255,255,255,.5)', lineHeight:1.65}}>
              Copy-ready for press releases and articles.
            </p>
          </div>
          {/* Right column */}
          <div className="md:w-[65%]">
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ins-button-primary-bg-hover)', fontFamily:'Geist Mono,monospace'}}>Press Copy</span>
            <div style={{borderTop:'1px solid rgba(255,255,255,0.08)', marginTop:'8px', marginBottom:'24px'}} />
            <div style={{background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:'16px', padding:'32px', position:'relative'}}>
              <button onClick={handleCopy} style={{position:'absolute', top:'16px', right:'16px', fontSize:'12px', fontWeight:500, color: copied ? 'var(--ins-status-success-fg)' : 'var(--ins-text-highlight)', background:'transparent', border:'1px solid ' + (copied ? 'rgba(34,197,94,.3)' : 'rgba(14,196,193,.2)'), borderRadius:'8px', padding:'6px 12px', cursor:'pointer', fontFamily:'Geist Mono,monospace', transition:'all .15s'}}>
                {copied ? 'Copied \u2713' : 'Copy to clipboard'}
              </button>
              <p style={{fontSize:'15px', color:'var(--ins-color-gray-200)', lineHeight:1.75, paddingRight:'120px'}}>
                {boilerplateText}
              </p>
            </div>
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
      <div className="max-w-7xl mx-auto px-6">
        <div style={{position:'relative', borderRadius:'16px', border:'1px solid rgba(30,30,48,1)', padding:'32px 48px', overflow:'hidden', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:'24px', flexWrap:'wrap', background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)'}}>
          <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
          <h3 style={{fontSize:'clamp(22px,3vw,30px)', fontWeight:500, color:'var(--ins-text-body)', letterSpacing:'-.03em', lineHeight:1.2, flexShrink:0}}>
            Ready to see your data <span style={{color:'var(--ins-button-primary-bg)'}}>clearly?</span>
          </h3>
          <div style={{display:'flex', alignItems:'center', width:'100%', maxWidth:'420px', background:'#0D0D1A', border:'1px solid rgba(46,46,64,1)', borderRadius:'12px', overflow:'hidden', flex:'1 1 340px'}}>
            <input type="email" placeholder="Enter your work email" style={{flex:1, background:'transparent', fontSize:'14px', color:'var(--ins-text-body)', padding:'12px 16px', outline:'none', border:'none', fontFamily:'Geist,sans-serif', minWidth:0}} />
            <button style={{display:'inline-flex', alignItems:'center', gap:'8px', padding:'10px 20px', margin:'4px', fontSize:'13px', fontWeight:600, color:'var(--ins-text-body)', background:'linear-gradient(135deg,var(--ins-button-primary-bg),var(--ins-button-primary-bg-hover))', borderRadius:'8px', border:'none', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, fontFamily:'Geist,sans-serif'}}>
              Start for Free
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── APP ── */
function App() {
  return (
    <div>
      <Header />
      <PressHero />
      <MediaContact />
      <BrandAssets />
      <CompanyFacts />
      <Boilerplate />
      <BottomCTA />
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
