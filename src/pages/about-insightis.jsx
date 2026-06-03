import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Input from '../components/Input';
import SectionHeader from '../components/SectionHeader';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

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
        <h1 className="fu1" style={{color:'var(--ins-text-heading-soft)',fontSize:'clamp(32px,5vw,56px)', fontWeight:500, letterSpacing:'-.03em', lineHeight:1.15, marginBottom:'var(--ins-size-5)'}}>
          Every dataset has an insight.<br/>
          <span style={{color:'var(--ins-text-highlight)'}}>We help you find it.</span>
        </h1>
        <p className="fu2 ins-text-body-xl" style={{maxWidth:'580px', margin:'0 auto'}}>
          Insightis is the AI analytics workspace that lets anyone — not just analysts — ask questions about their data and get instant, accurate answers. No SQL. No dashboards. No waiting.
        </p>
        <div className="fu3" style={{display:'flex', justifyContent:'center', gap:'0', marginTop:'var(--ins-size-14)', borderTop:'1px solid var(--ins-border-default)', borderBottom:'1px solid var(--ins-border-default)', flexWrap:'wrap'}}>
          {stats.map((s, i) => (
            <div key={i} style={{flex:'1 1 160px', padding:'28px 24px', textAlign:'center', borderRight: i < stats.length-1 ? '1px solid var(--ins-border-default)' : 'none'}}>
              <div style={{fontSize:'clamp(28px,3.5vw,44px)', fontWeight:600, color:'var(--ins-text-highlight)', letterSpacing:'-.02em', lineHeight:1}}>{s.num}</div>
              <div style={{fontSize:'var(--ins-font-size-12)', color:'var(--ins-color-white-a-45)', marginTop:'var(--ins-size-2)', letterSpacing:'.02em'}}>{s.label}</div>
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
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
      title: 'Data should be accessible',
      desc: 'Business intelligence shouldn\'t require a data team. We believe every team member should be able to ask questions and get answers from their own data — in seconds, in plain English.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
      title: 'Accuracy is non-negotiable',
      desc: 'Generic AI guesses from internet averages. Insightis answers from your real data, through a certified Semantic Layer. Every answer is grounded, traceable, and trustworthy.',
    },
    {
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/></svg>,
      title: 'Complexity should be invisible',
      desc: 'Behind every simple answer is a sophisticated data pipeline — cross-source joins, metric certification, context memory. Our job is to make all of that disappear so you can focus on decisions.',
    },
  ];

  return (
    <section style={{padding:'80px 0 100px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="Our Values"
            title="Built on three principles"
            sparkle
          />
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--ins-size-4)'}} className="md:grid-cols-3 grid-cols-1" >
          {values.map((v, i) => (
            <div key={i} style={{background:'rgba(13,17,23,.6)', border:'1px solid var(--ins-border-default)', borderRadius:'var(--ins-radius-16)', padding:'var(--ins-size-7)', position:'relative', overflow:'hidden', transition:'all .2s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(9,160,157,.25)';e.currentTarget.style.background='rgba(9,160,157,.04)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--ins-border-default)';e.currentTarget.style.background='rgba(13,17,23,.6)';}}>
              <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(9,160,157,.2),transparent)'}}/>
              <div style={{width:'40px', height:'40px', borderRadius:'10px', background:'var(--ins-surface-brand-tint)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'var(--ins-size-4)'}}>
                {v.icon}
              </div>
              <h3 style={{fontSize:'var(--ins-font-size-17)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'var(--ins-size-2)'}}>{v.title}</h3>
              <p className="ins-text-body">{v.desc}</p>
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
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, name: 'AI Chat', desc: 'Ask anything in plain English' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5M9 8V2M15 8V2M18 8H6a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3z"/></svg>, name: 'Integrations', desc: '200+ data sources connected' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12l8.58 3.91a2 2 0 0 0 1.66 0L21 12"/><path d="M2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17"/></svg>, name: 'Semantic Layer', desc: 'One certified truth' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, name: 'Insights Engine', desc: 'Deep root-cause analysis' },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M12 3v9"/><path d="M20 7.5l-8 4.5"/><path d="M4 7.5l8 4.5"/></svg>, name: 'Memory & Storage', desc: 'AI that learns your business' },
  ];

  return (
    <section style={{padding:'80px 0 100px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="The Platform"
            title="One workspace for every data question"
            sparkle
          />
        </div>
        <div className="hidden md:flex" style={{alignItems:'flex-start', justifyContent:'space-between', gap:'0', position:'relative'}}>
          {pillars.map((p, i) => (
            <React.Fragment key={i}>
              <div style={{display:'flex', flexDirection:'column', alignItems: i===0 ? 'flex-start' : i===pillars.length-1 ? 'flex-end' : 'center', textAlign: i===0 ? 'left' : i===pillars.length-1 ? 'right' : 'center', flex:1}}>
                <div className="hb" style={{width:'64px', height:'64px', borderRadius:'var(--ins-radius-16)', background:'var(--ins-surface-brand-tint)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'14px', animationDelay:`${i * 0.4}s`}}>
                  {p.icon}
                </div>
                <h4 style={{fontSize:'var(--ins-font-size-15)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'var(--ins-size-1)'}}>{p.name}</h4>
                <p className="ins-text-body-sm">{p.desc}</p>
              </div>
              {i < pillars.length - 1 && (
                <div style={{display:'flex', alignItems:'center', paddingTop:'var(--ins-size-6)', flexShrink:0, minWidth:'32px', flex:'0 0 auto'}}>
                  <div style={{width:'100%', minWidth:'32px', height:'1px', borderTop:'2px dashed rgba(9,160,157,.25)'}}/>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex md:hidden" style={{flexDirection:'column', alignItems:'center', gap:'var(--ins-size-4)'}}>
          {pillars.map((p, i) => (
            <React.Fragment key={i}>
              <div style={{display:'flex', alignItems:'center', gap:'var(--ins-size-4)', width:'100%', maxWidth:'320px'}}>
                <div className="hb" style={{width:'48px', height:'48px', borderRadius:'var(--ins-radius-12)', background:'var(--ins-surface-brand-tint)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, animationDelay:`${i * 0.4}s`}}>
                  {p.icon}
                </div>
                <div>
                  <h4 style={{fontSize:'var(--ins-font-size-14)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'var(--ins-size-half)'}}>{p.name}</h4>
                  <p className="ins-text-body-sm">{p.desc}</p>
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
        <div style={{marginBottom:'var(--ins-size-12)'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'var(--ins-size-4)'}}>
            <span style={{fontSize:'var(--ins-font-size-12)'}}>✦</span>
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', fontFamily:'var(--ins-font-family-mono)'}}>Our Mission</span>
          </div>
          <h2 className="ins-text-display" style={{maxWidth:'700px'}}>Precise analytics for everyone</h2>
        </div>
        {/* Two-column text grid */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px 48px'}}>
          <p className="ins-text-body-lg">
            Backed by <span style={{color:'var(--ins-text-highlight)', fontWeight:500}}>Devart</span> and 25+ years of data expertise, we built Insightis with a single mission: make precise, trustworthy analytics accessible to every person in every team — no technical skills required.
          </p>
          <p className="ins-text-body-lg">
            We believe data insights shouldn't be locked behind complex dashboards or reserved for analysts. Every founder, marketer, operator, and team lead deserves instant, accurate answers from their own data — in plain English, in seconds. That's the future we're building.
          </p>
          <p className="ins-text-body-lg">
            Insightis combines AI that understands your questions with a certified Semantic Layer that guarantees accuracy. The result: analytics you can trust, delivered at the speed of conversation — so you can focus on making decisions, not waiting for reports.
          </p>
          <p className="ins-text-body-lg">
            We connect to over 200 data sources, unify metrics through a single source of truth, and let AI handle the complexity — from cross-source joins to deep root-cause analysis. Every answer is grounded in your real data, fully traceable, and gets smarter with every conversation.
          </p>
          <p className="ins-text-body-lg">
            Our goal is simple: eliminate the gap between having data and understanding it. Whether you're tracking revenue, monitoring churn, or exploring a new market segment — Insightis turns your questions into answers in seconds, not days.
          </p>
          <p className="ins-text-body-lg">
            We're not building another BI tool. We're building the analytics layer that every modern business deserves — one that speaks your language, learns your business, and delivers the right answer every time you ask.
          </p>
          <p className="ins-text-body-lg">
            Speed matters. The organizations that act on data fastest win. Insightis removes every bottleneck between a question and its answer — no waiting for a data engineer, no building a dashboard, no interpreting raw query results. Just ask, and know.
          </p>
          <p className="ins-text-body-lg">
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
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="Our Story"
            title="From data tools to data intelligence"
            align="left"
            sparkle
          />
        </div>
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
                  <div style={{width:'10px', height:'10px', borderRadius:'50%', background:'var(--ins-button-primary-bg-hover)', border:'2px solid rgba(9,160,157,.3)', boxShadow:'0 0 12px rgba(9,160,157,.4)', marginLeft:'-5px', marginTop:'6px', flexShrink:0}}/>
                </div>
                {/* Content */}
                <div style={{flex:1, paddingLeft:'var(--ins-size-10)'}}>
                  <div className="md:hidden" style={{fontSize: m.year === '∞' ? 'var(--ins-font-size-24)' : 'var(--ins-font-size-12)', fontWeight:600, color:'var(--ins-button-primary-bg-hover)', fontFamily:'var(--ins-font-family-mono)', marginBottom:'6px', letterSpacing:'.04em', lineHeight:1}}>{m.year}</div>
                  <h3 style={{fontSize:'var(--ins-font-size-18)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'var(--ins-size-2)', letterSpacing:'-.01em'}}>{m.title}</h3>
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
  return icons[name] || <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--ins-button-primary-bg)"><rect width="24" height="24" rx="4"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="500">{name[0]}</text></svg>;
}

function ConnectorPill({ name }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12121F] border border-[var(--ins-border-strong)] rounded-full flex-shrink-0 hover:border-[#2E2E40] transition-colors">
      <div className="w-5 h-5 flex items-center justify-center">
        <ConnectorIcon name={name} size={16} />
      </div>
      <span className="text-xs text-[var(--ins-text-body)] font-medium whitespace-nowrap">{name}</span>
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
        <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ins-text-disabled)', whiteSpace:'nowrap', flexShrink:0, fontFamily:'var(--ins-font-family-mono)'}}>Trusted by teams at</span>
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
    <section style={{paddingTop:'var(--ins-size-8)', paddingBottom:'var(--ins-size-16)', position:'relative'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{position:'relative', borderRadius:'var(--ins-radius-16)', border:'1px solid rgba(30,30,48,1)', padding:'32px 48px', overflow:'hidden', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:'var(--ins-size-6)', flexWrap:'wrap', background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)'}}>
          <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
          <h3 style={{fontSize:'clamp(22px,3vw,30px)', fontWeight:500, color:'var(--ins-text-heading)', letterSpacing:'-.03em', lineHeight:1.2, flexShrink:0}}>
            Ready to see your data <span style={{color:'var(--ins-button-primary-bg)'}}>clearly?</span>
          </h3>
          <div style={{display:'flex', alignItems:'center', width:'100%', maxWidth:'420px', background:'#0D0D1A', border:'1px solid rgba(46,46,64,1)', borderRadius:'var(--ins-radius-12)', overflow:'hidden', flex:'1 1 340px'}}>
            <Input hideLabel label="Work email" type="email" placeholder="Enter your work email..." style={{flex:1, background:'transparent', fontSize:'var(--ins-font-size-14)', color:'var(--ins-text-body)', padding:'12px 16px', outline:'none', border:'none', fontFamily:'var(--ins-font-family-sans)', minWidth:0, height:'auto', borderRadius:0, boxShadow:'none'}} />
            <Button variant="primary" size="sm" radius="lg" iconEnd={<ArrowRightIcon />} className="m-1 flex-shrink-0">
              Start for Free
            </Button>
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

export default App;
if (typeof window !== 'undefined') {
  const el = document.getElementById('root');
  if (el && el.hasChildNodes()) {
    ReactDOM.hydrateRoot(el, <App />);
  } else if (el) {
    ReactDOM.createRoot(el).render(<App />);
  }
}
