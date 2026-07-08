import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import BottomCTABlock from '../components/BottomCTA';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/*
 * About page — rebuilt to the CMO launch-pack reference (about-insightis.html).
 * CLAIMS GUARDRAILS (do not break):
 *  - "28 years" and "40,000+ companies" consistently (NOT 25 / 500K / Fortune 100).
 *  - Logos are DEVART customers, shown with an explicit disclaimer.
 *  - No "SOC 2" until certified.
 *  - Team photos pending — the photo row ships commented out until assets arrive.
 */

/* ── ABOUT HERO ── */
function AboutHero() {
  const stats = [
    { num: '40,000+',  label: 'companies trust Devart' },
    { num: '28 years', label: 'building data tooling' },
    { num: '200+',     label: 'data source integrations' },
    { num: '200+',     label: 'products built by Devart' },
  ];
  return (
    <section style={{padding:'120px 0 80px', position:'relative'}}>
      <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'100%', height:'100%', background:'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(9,160,157,.06) 0%, transparent 70%)', pointerEvents:'none'}}/>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px', textAlign:'center', position:'relative'}}>
        <div className="fu0 ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'var(--ins-size-6)'}}>
          <span style={{fontSize:'var(--ins-font-size-12)'}}>✦</span>
          <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', fontFamily:'var(--ins-font-family-mono)'}}>Insightis, a Devart product</span>
        </div>
        <h1 className="ins-text-display-xl" style={{marginBottom:'var(--ins-size-5)'}}>
          Every dataset has an insight.<br/>
          <span style={{color:'var(--ins-text-highlight)'}}>We help you find it</span>
        </h1>
        <p className="fu2 ins-text-body-xl" style={{maxWidth:'640px', margin:'0 auto'}}>
          Hi, we're Insightis — the AI analytics workspace from the team at Devart. We built it so anyone on your team can just ask a question and get a straight, trustworthy answer. No SQL. No dashboards. No waiting on the data team.
        </p>
        <p className="fu2 ins-text-body" style={{maxWidth:'640px', margin:'14px auto 0'}}>
          A new product from <span style={{color:'var(--ins-text-heading)', fontWeight:600}}>Devart</span> — trusted by 40,000+ companies for 28 years.
        </p>
        <div className="fu3" style={{marginTop:'var(--ins-size-7)'}}>
          <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
            Start for free
          </Button>
        </div>
        <div className="fu3 ins-stat-strip" style={{marginTop:'var(--ins-size-14)'}}>
          {stats.map((s, i) => (
            <div key={i} className="ins-stat-strip__item">
              <div className="ins-stat-strip__value">{s.num}</div>
              <div className="ins-stat-strip__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── MISSION / VISION ── */
function MissionVision() {
  const cards = [
    {
      eyebrow: 'Our mission',
      title: 'Close the gap between having data and understanding it',
      body: "You've got the data. Getting an answer out of it shouldn't take a ticket, a SQL query, and three days of waiting. We're here to make that gap disappear — so the answer is always just a question away.",
    },
    {
      eyebrow: 'Our vision',
      title: 'A world where anyone can just ask their data',
      body: "Picture this: churn ticks up, you type the question, and the answer's on your screen before your coffee's cold. No analyst queue, no SQL, no guesswork. That's the world we're building — where the people closest to the work can finally see what's really going on.",
    },
  ];
  return (
    <section style={{padding:'80px 0 40px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((c, i) => (
            <div key={i} className="ins-feature-card" style={{padding:'var(--ins-size-8)'}}>
              <div style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ins-text-highlight)', fontFamily:'var(--ins-font-family-mono)', marginBottom:'var(--ins-size-4)'}}>{c.eyebrow}</div>
              <h2 style={{fontSize:'clamp(22px,2.4vw,30px)', fontWeight:600, color:'var(--ins-text-heading)', letterSpacing:'-.02em', lineHeight:1.2, marginBottom:'var(--ins-size-4)'}}>{c.title}</h2>
              <p className="ins-text-body-lg">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── VALUES ── */
function MissionValues() {
  const values = [
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
      title: 'Data should be accessible',
      desc: 'Business intelligence shouldn\'t require a data team. Anyone should be able to ask a question and get an answer from their own data — in seconds, in plain English.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
      title: 'Accuracy is non-negotiable',
      desc: 'Generic AI guesses from internet averages. Insightis answers from your real data, through a certified semantic layer — so every answer is grounded, traceable, and trustworthy.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>,
      title: 'Complexity should be invisible',
      desc: 'Behind every simple answer is real work — cross-source joins, metric definitions, live data. Our job is to make that disappear so you can focus on the decision.',
    },
  ];

  return (
    <section style={{padding:'60px 0 100px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="What we believe"
            title="Three principles behind everything we build"
            sparkle
          />
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--ins-size-4)'}} className="md:grid-cols-3 grid-cols-1" >
          {values.map((v, i) => (
            <div key={i} className="ins-feature-card">
              <div style={{width:'40px', height:'40px', borderRadius:'10px', background:'var(--ins-surface-brand-tint)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'var(--ins-size-4)'}}>
                {v.icon}
              </div>
              <h3 className="ins-text-h3" style={{marginBottom:'var(--ins-size-2)'}}>{v.title}</h3>
              <p className="ins-text-body">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── OUR STORY TIMELINE ── */
function OurStory() {
  const milestones = [
    { year: '1997', title: 'Devart is founded', desc: 'It starts with a single Oracle connectivity product and one commitment: build data tools that simply work, for developers who demand reliability.' },
    { year: '2005', title: 'Data tools at scale', desc: 'The dbForge product line launches — database development and management tools now used by hundreds of thousands of developers worldwide.' },
    { year: '2014', title: 'Cloud & connectivity', desc: 'Skyvia brings cloud data integration to 200+ SaaS apps and databases — cementing Devart as a full-stack data company.' },
    { year: '2026', title: 'Insightis is born', desc: 'Built on nearly three decades of data expertise, Insightis brings conversational AI analytics to every business team. Ask in plain English. Get trusted answers instantly.' },
    { year: '∞', title: 'The journey continues', desc: 'Expanding integrations, deepening the semantic layer, and building the analytics layer every modern business deserves.' },
  ];
  return (
    <section style={{padding:'80px 0 100px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-10)'}}>
          <SectionHeader
            eyebrow="Our Story"
            title="From data tools to data intelligence"
            lede="We didn't start yesterday. Insightis is the newest chapter in a story Devart has been writing since 1997 — and the same obsession with reliability runs through all of it."
            align="left"
            sparkle
          />
        </div>
        {/* TODO(assets): team / office / culture photo row per the CMO reference —
            enable once real photos are provided.
        <div className="grid gap-4 md:grid-cols-3" style={{marginBottom:'var(--ins-size-10)'}}>
          {['Team photo','Office / culture photo','Product / work photo'].map(p => (
            <div key={p} style={{aspectRatio:'4/3', borderRadius:'var(--ins-radius-16)', border:'1px dashed var(--ins-color-white-a-10)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--ins-text-disabled)', fontSize:'var(--ins-font-size-12)', fontFamily:'var(--ins-font-family-mono)'}}>{p}</div>
          ))}
        </div>
        */}
        <div style={{position:'relative'}}>
          {/* Vertical line */}
          <div style={{position:'absolute', left:'120px', top:0, bottom:0, width:'1px', background:'linear-gradient(to bottom, transparent, rgba(9,160,157,.3) 10%, rgba(9,160,157,.3) 90%, transparent)'}} className="hidden md:block"/>
          <div style={{display:'flex', flexDirection:'column', gap:'0'}}>
            {milestones.map((m, i) => (
              <div key={i} style={{display:'flex', gap:'0', position:'relative', paddingBottom: i < milestones.length-1 ? '48px' : '0'}}>
                {/* Year label */}
                <div className="hidden md:block" style={{width:'120px', flexShrink:0, paddingTop:'var(--ins-size-1)'}}>
                  <span style={{fontSize: m.year === '∞' ? 'var(--ins-font-size-28)' : 'var(--ins-font-size-12)', fontWeight:600, color:'var(--ins-button-primary-bg-hover)', fontFamily:'var(--ins-font-family-mono)', letterSpacing:'.04em', lineHeight:1}}>{m.year}</span>
                </div>
                {/* Dot */}
                <div className="hidden md:flex" style={{width:'0', flexShrink:0, position:'relative', justifyContent:'center'}}>
                  <div style={{width:'10px', height:'10px', borderRadius:'50%', background:'var(--ins-button-primary-bg-hover)', border:'2px solid rgba(9,160,157,.3)', boxShadow:'0 0 12px rgba(9,160,157,.4)', marginTop:'6px', flexShrink:0}}/>
                </div>
                {/* Content */}
                <div style={{flex:1, paddingLeft:'var(--ins-size-10)'}}>
                  <div className="md:hidden" style={{fontSize: m.year === '∞' ? 'var(--ins-font-size-24)' : 'var(--ins-font-size-12)', fontWeight:600, color:'var(--ins-button-primary-bg-hover)', fontFamily:'var(--ins-font-family-mono)', marginBottom:'6px', letterSpacing:'.04em', lineHeight:1}}>{m.year}</div>
                  <h3 className="ins-text-h3" style={{marginBottom:'var(--ins-size-2)'}}>{m.title}</h3>
                  <p className="ins-text-body-lg" style={{maxWidth:'680px'}}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── DEVART FAMILY ── */
function DevartFamily() {
  const products = [
    { abbr: 'dF', name: 'dbForge',           desc: 'Database development and management for developers and DBAs.' },
    { abbr: '↔',  name: 'Data Connectivity', desc: 'ODBC, ADO.NET and JDBC drivers for every major data source.' },
    { abbr: 'Sk', name: 'Skyvia',            desc: 'Cloud data integration and backup across 200+ apps and databases.' },
    { abbr: 'TM', name: 'TMetric',           desc: 'Time tracking and team productivity for businesses of every size.' },
  ];
  return (
    <section style={{padding:'40px 0 100px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-12)'}}>
          <SectionHeader
            eyebrow="Part of the Devart family"
            title="Insightis is built by Devart"
            lede="This isn't a weekend AI project. Insightis comes from Devart — the team behind 200+ data tools that 40,000+ companies have trusted for nearly 30 years. Same obsession with reliability, now pointed at a new problem: making analytics something anyone can use."
            sparkle
          />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {products.map((p) => (
            <div key={p.name} className="ins-feature-card ins-feature-card--interactive">
              <div style={{width:'42px', height:'42px', borderRadius:'11px', background:'var(--ins-surface-brand-tint)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'var(--ins-size-4)', fontWeight:700, fontSize:'var(--ins-font-size-14)', color:'var(--ins-text-highlight)', fontFamily:'var(--ins-font-family-mono)'}}>{p.abbr}</div>
              <h3 className="ins-text-h3" style={{marginBottom:'var(--ins-size-2)'}}>{p.name}</h3>
              <p className="ins-text-body">{p.desc}</p>
            </div>
          ))}
        </div>
        {/* Insightis — the newest member, featured */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'var(--ins-size-6)', flexWrap:'wrap', marginTop:'var(--ins-size-4)', padding:'32px 36px', borderRadius:'var(--ins-radius-16)', border:'1px solid var(--ins-border-brand)', background:'linear-gradient(120deg, var(--ins-surface-card) 30%, rgba(9,160,157,.10))'}}>
          <div style={{minWidth:0}}>
            <div style={{display:'inline-block', fontSize:'10px', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ins-text-highlight)', border:'1px solid var(--ins-border-brand)', borderRadius:'999px', padding:'3px 10px', marginBottom:'12px', fontFamily:'var(--ins-font-family-mono)'}}>New · the latest from Devart</div>
            <h3 style={{fontSize:'var(--ins-font-size-24)', fontWeight:700, color:'var(--ins-text-heading)', letterSpacing:'-.02em', marginBottom:'6px'}}>Insightis</h3>
            <p className="ins-text-body-lg" style={{maxWidth:'540px'}}>Conversational AI analytics — trusted answers from your data, in plain English, in seconds.</p>
          </div>
          <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />} style={{whiteSpace:'nowrap', flexShrink:0}}>
            Start for free
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ── TRUSTED BY (Devart customers — with disclaimer) ── */
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
  return icons[name] || <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--ins-button-primary-bg)"><rect width="24" height="24" rx="4"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="500">{name[0]}</text></svg>;
}

function CompanyPill({ name }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12121F] border border-[var(--ins-border-strong)] rounded-full flex-shrink-0 hover:border-[#2E2E40] transition-colors">
      <div className="w-5 h-5 flex items-center justify-center">
        <CompanyIcon name={name} size={16} />
      </div>
      <span className="text-xs text-[var(--ins-text-body)] font-medium whitespace-nowrap">{name}</span>
    </div>
  );
}

function TrustedBy() {
  const companies = ['IBM', 'Amazon', 'Samsung', 'Toyota', 'Microsoft', 'Oracle', 'Siemens', 'Cisco', 'Accenture', 'Deloitte', 'SAP', 'Bosch'];
  return (
    <section style={{padding:'0 16px', margin:'0 auto', maxWidth:'1272px'}}>
      <div style={{border:'1px solid var(--ins-border-default)', background:'var(--ins-color-white-a-02)', borderRadius:'var(--ins-radius-16)', padding:'32px 32px', display:'flex', alignItems:'center', gap:'var(--ins-size-6)'}}>
        <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ins-text-disabled)', whiteSpace:'nowrap', flexShrink:0, fontFamily:'var(--ins-font-family-mono)'}}>Devart's tools power teams at</span>
        <div className="overflow-hidden flex-1 marquee-container" style={{maskImage:'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'}}>
          <div className="flex gap-3 marquee-left" style={{width:'max-content'}}>
            {[...companies, ...companies].map((name, i) => (
              <CompanyPill key={`${name}-${i}`} name={name} />
            ))}
          </div>
        </div>
      </div>
      <p className="ins-text-body-sm" style={{textAlign:'center', color:'var(--ins-text-inactive)', marginTop:'var(--ins-size-4)'}}>
        Logos represent organizations that use Devart products. Insightis is a new product within the Devart family.
      </p>
    </section>
  );
}

/* ── OFFICES ── */
function Offices() {
  const offices = [
    { code: 'us', country: 'United States',  lines: ['3422 Old Capitol Trl', 'Wilmington, Delaware', '19808'] },
    { code: 'cz', country: 'Czech Republic', lines: ['2230/44 Na Žertvách Str.', 'Prague', '180 00'] },
    { code: 'sk', country: 'Slovakia',       lines: ['Aston Building Werferova 1', 'Košice', '04011'] },
    { code: 'ua', country: 'Ukraine',        lines: ['226A Kulparkivska Str.', 'Lviv', '79071'] },
    { code: 'hk', country: 'Hong Kong',      lines: ['No. 5, 17/F, Strand 50', '50 Bonham Strand, Sheung Wan'] },
  ];
  return (
    <section style={{padding:'80px 0 60px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-10)'}}>
          <SectionHeader
            eyebrow="Insightis worldwide"
            title="Where we work"
            align="left"
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-5">
          {offices.map((o, i) => (
            <div key={i}>
              <div style={{width:'36px', height:'36px', borderRadius:'50%', overflow:'hidden', border:'1px solid var(--ins-color-white-a-10)', marginBottom:'14px', flexShrink:0}}>
                <img src={`https://flagcdn.com/w80/${o.code}.png`} alt={o.country} style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </div>
              <p className="ins-text-h3" style={{marginBottom:'10px'}}>{o.country}</p>
              {o.lines.map((line, j) => (
                <p className="ins-text-body-sm ins-text--muted ins-text--mono" key={j}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTA() {
  return (
    <section style={{paddingTop:'var(--ins-size-8)', paddingBottom:'var(--ins-size-16)', position:'relative'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{position:'relative', borderRadius:'var(--ins-radius-16)', border:'1px solid rgba(30,30,48,1)', padding:'32px 48px', overflow:'hidden', background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)'}}>
          <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
          <BottomCTABlock
            variant="buttons"
            title={<>Ready to see your data <BottomCTABlock.Highlight>clearly?</BottomCTABlock.Highlight></>}
            description="Connect your first tool free in minutes. No credit card, cancel anytime."
            ctaLabel="Start for free"
            secondaryCtaLabel="Explore Pricing"
            secondaryCtaHref="/pricing"
          />
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
      <AboutHero />
      <MissionVision />
      <MissionValues />
      <OurStory />
      <DevartFamily />
      <TrustedBy />
      <Offices />
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
