import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import BottomCTA from '../components/BottomCTA';
import FAQAccordion from '../components/FAQAccordion';
import PainPointGrid from '../components/PainPointGrid';
import ComparisonCards from '../components/ComparisonCards';
import TestimonialCard from '../components/TestimonialCard';
import SectionHeader from '../components/SectionHeader';
import CheckIcon from '../components/CheckIcon';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/* ── CHART COMPONENTS (verbatim from AI Chat.html) ── */
function MiniBarChart({ data, color }) {
  const max = Math.max(...data);
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:'3px',height:'36px',marginTop:'10px'}}>
      {data.map((v,i) => (
        <div key={i} style={{
          flex:1, borderRadius:'2px 2px 0 0',
          background: i===data.length-1 ? color : color+'55',
          height:`${(v/max)*100}%`,
          minHeight:'4px',
        }}/>
      ))}
    </div>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section style={{padding:'96px 0 56px',position:'relative',overflow:'hidden'}}>
      {/* Background glows — copied from AI Chat hero for visual parity */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 72% 50%,rgba(9,160,157,0.09) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 20% 50%,rgba(59,31,94,0.12) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:10}}>
        <div data-hero-grid style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'64px',
          alignItems:'center',
        }}>
          {/* Left: text */}
          <div>
            <div className="fu0" style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'20px'}}>
              <span style={{color:'var(--ins-button-primary-bg-hover)',fontSize:'12px'}}>✦</span>
              <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-button-primary-bg-hover)',fontFamily:'Geist Mono,monospace'}}>For Product Teams</span>
            </div>

            <h1 className="fu1" style={{fontSize:'clamp(36px,4.5vw,58px)',fontWeight:500,letterSpacing:'-.03em',lineHeight:1.12,marginBottom:'20px'}}>
              <span style={{color:'var(--ins-text-heading-soft)'}}>Stop guessing</span>
              <br/>
              <span style={{color:'var(--ins-text-highlight)'}}>what users actually do.</span>
            </h1>

            <p className="fu2" style={{fontSize:'clamp(16px,1.2vw,18px)',color:'rgba(255,255,255,.65)',lineHeight:1.65,marginBottom:'28px',maxWidth:'480px'}}>
              Stop waiting two weeks for a data pull. Ask any product question in plain English — Insightis answers from your events, billing, and CRM in seconds.
            </p>

            <div className="fu3" style={{display:'flex',gap:'12px',flexWrap:'wrap',marginBottom:'28px'}}>
              <Button as="a" href="/auth/sign-up/" variant="primary" size="md" iconEnd={<ArrowRightIcon />}>
                Start for Free
              </Button>
            </div>

          </div>

          {/* Right: product-flavored hero visual (static) */}
          <div className="fu2" style={{position:'relative'}}>
            {/* Ambient glow — lavender-leaning to differentiate from Analytics */}
            <div style={{
              position:'absolute', inset:'-60px',
              background:'radial-gradient(circle at 25% 25%, rgba(167,139,250,.18) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(9,160,157,.12) 0%, transparent 50%)',
              pointerEvents:'none',
              filter:'blur(44px)',
              zIndex:0,
            }}/>

            {/* Main panel */}
            <div style={{
              position:'relative',
              background:'linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(15,20,28,0.92) 100%)',
              border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:'24px',
              padding:'24px',
              backdropFilter:'blur(24px)',
              WebkitBackdropFilter:'blur(24px)',
              boxShadow:'none',
              overflow:'hidden',
              zIndex:1,
              minHeight:'540px',
            }}>
              {/* Top gradient line — lavender accent */}
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(167,139,250,.55),transparent)',zIndex:1}}/>

              {/* Window chrome */}
              <div style={{
                margin:'-24px -24px 16px',
                padding:'10px 14px',
                borderBottom:'1px solid rgba(255,255,255,0.06)',
                background:'rgba(255,255,255,0.015)',
                display:'flex',
                alignItems:'center',
                position:'relative',
              }}>
                <div style={{display:'flex',gap:'6px'}}>
                  <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#FF5F57'}}/>
                  <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#FEBC2E'}}/>
                  <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#28C840'}}/>
                </div>
                <span style={{
                  position:'absolute',left:'50%',top:'50%',
                  transform:'translate(-50%,-50%)',
                  fontFamily:'Geist Mono,monospace',
                  fontSize:'10.5px',
                  color:'var(--ins-text-body)',
                  letterSpacing:'.08em',
                  whiteSpace:'nowrap',
                }}>Insightis — For Product Teams</span>
              </div>

              {/* Header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#A78BFA',boxShadow:'0 0 8px rgba(167,139,250,.6)'}}/>
                  <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10.5px',color:'var(--ins-text-body)',letterSpacing:'.08em',textTransform:'uppercase'}}>Funnel · May cohort</span>
                </div>
                <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#A78BFA',padding:'3px 9px',borderRadius:'999px',background:'rgba(167,139,250,.1)',border:'1px solid rgba(167,139,250,.25)',letterSpacing:'.08em',textTransform:'uppercase'}}>cohort</span>
              </div>

              {/* Headline + caption */}
              <h3 style={{fontSize:'17px',fontWeight:500,color:'var(--ins-color-gray-100)',marginBottom:'6px',letterSpacing:'-.015em',lineHeight:1.35}}>
                Onboarding cliff at <span style={{color:'#A78BFA'}}>step 3</span>
              </h3>
              <p style={{fontSize:'12.5px',color:'var(--ins-text-body)',lineHeight:1.6,marginBottom:'16px'}}>
                <span style={{color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',fontSize:'11.5px'}}>workspace_created</span> dropped <span style={{color:'var(--ins-status-error-fg)',fontWeight:500}}>−41%</span>. 87% on mobile. New invite flow shipped Tuesday.
              </p>

              {/* Funnel breakdown */}
              <div style={{
                background:'rgba(255,255,255,.018)',
                border:'1px solid rgba(255,255,255,.05)',
                borderRadius:'14px',
                padding:'14px 14px 12px',
                marginBottom:'14px',
              }}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'12px'}}>
                  <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#8AA6B3',letterSpacing:'.06em',textTransform:'uppercase'}}>activation funnel</span>
                  <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'var(--ins-text-body)'}}>n = 12,840</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>
                  {[
                    {label:'sign_up',           pct:100, val:'12,840', cliff:false},
                    {label:'email_verified',    pct:92,  val:'11,816', cliff:false},
                    {label:'workspace_created', pct:51,  val:'6,548',  cliff:true},
                    {label:'first_invite',      pct:38,  val:'4,879',  cliff:false},
                    {label:'activated',         pct:31,  val:'3,980',  cliff:false},
                  ].map((s,i) => (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{
                        fontFamily:'Geist Mono,monospace',
                        fontSize:'10px',
                        color:s.cliff?'var(--ins-status-error-fg)':'var(--ins-text-body)',
                        width:'112px',flexShrink:0,
                        whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',
                      }}>{s.label}</span>
                      <div style={{flex:1,height:'14px',background:'rgba(255,255,255,.04)',borderRadius:'3px',overflow:'hidden',position:'relative'}}>
                        <div style={{
                          width:`${s.pct}%`,
                          height:'100%',
                          background:s.cliff
                            ? 'linear-gradient(90deg, rgba(248,113,113,.45), rgba(248,113,113,.75))'
                            : 'linear-gradient(90deg, rgba(14,196,193,.3), rgba(14,196,193,.6))',
                          borderRadius:'3px',
                        }}/>
                      </div>
                      <span style={{
                        fontFamily:'Geist Mono,monospace',
                        fontSize:'10.5px',
                        color:s.cliff?'var(--ins-status-error-fg)':'var(--ins-color-gray-200)',
                        width:'34px',textAlign:'right',flexShrink:0,
                      }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric tiles — product-relevant */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px'}}>
                {[
                  {label:'Cliff step', val:'#3',       color:'var(--ins-status-error-fg)'},
                  {label:'Cohort',     val:'May new',  color:'#A78BFA'},
                  {label:'Mobile',     val:'87%',      color:'var(--ins-text-highlight)'},
                ].map((m,i) => (
                  <div key={i} style={{
                    background:'rgba(255,255,255,.025)',
                    border:'1px solid rgba(255,255,255,.06)',
                    borderRadius:'10px',
                    padding:'10px 12px',
                  }}>
                    <div style={{fontSize:'9.5px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'4px'}}>{m.label}</div>
                    <div style={{fontSize:'14px',fontWeight:500,color:m.color,fontFamily:'Geist Mono,monospace',letterSpacing:'-.01em'}}>{m.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating top-right: Experiment running card (lavender — distinct from Analytics) */}
            <div style={{
              position:'absolute',
              top:'-18px',
              right:'-14px',
              background:'linear-gradient(135deg, rgba(167,139,250,.22) 0%, rgba(13,17,23,0.95) 100%)',
              border:'1px solid rgba(167,139,250,.4)',
              borderRadius:'14px',
              padding:'10px 14px',
              boxShadow:'0 16px 40px rgba(167,139,250,0.18), 0 8px 24px rgba(0,0,0,0.5)',
              backdropFilter:'blur(16px)',
              WebkitBackdropFilter:'blur(16px)',
              display:'flex',alignItems:'center',gap:'10px',
              transform:'rotate(2.5deg)',
              zIndex:2,
            }}>
              <div style={{
                width:'8px',height:'8px',borderRadius:'50%',background:'#A78BFA',
                flexShrink:0,
              }}/>
              <div>
                <div style={{fontSize:'9.5px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase'}}>Experiment</div>
                <div style={{fontSize:'12.5px',color:'#A78BFA',fontWeight:500,fontFamily:'Geist Mono,monospace',marginTop:'1px'}}>onboarding_v3</div>
              </div>
            </div>

            {/* Floating bottom-left: Cohort retention curve (sparkline — distinct from Analytics' bars) */}
            <div style={{
              position:'absolute',
              bottom:'-22px',
              left:'-18px',
              background:'linear-gradient(135deg, rgba(9,160,157,.2) 0%, rgba(13,17,23,0.95) 100%)',
              border:'1px solid rgba(9,160,157,.4)',
              borderRadius:'14px',
              padding:'12px 14px',
              boxShadow:'0 16px 40px rgba(9,160,157,0.18), 0 8px 24px rgba(0,0,0,0.5)',
              backdropFilter:'blur(16px)',
              WebkitBackdropFilter:'blur(16px)',
              transform:'rotate(-2deg)',
              minWidth:'168px',
              zIndex:2,
            }}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
                <span style={{fontSize:'9.5px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase'}}>Retention</span>
                <span style={{fontSize:'10.5px',color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',fontWeight:500}}>W12 · 28%</span>
              </div>
              <svg viewBox="0 0 140 32" width="100%" height="28" preserveAspectRatio="none" style={{display:'block',marginBottom:'4px'}}>
                <defs>
                  <linearGradient id="retn-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--ins-text-highlight)" stopOpacity="0.32"/>
                    <stop offset="100%" stopColor="var(--ins-text-highlight)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,2 C20,12 40,18 60,22 C80,25 100,27 120,28 L140,28 L140,32 L0,32 Z" fill="url(#retn-fill)"/>
                <path d="M0,2 C20,12 40,18 60,22 C80,25 100,27 120,28 L140,28" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="0" cy="2" r="2" fill="var(--ins-text-highlight)"/>
                <circle cx="140" cy="28" r="2" fill="var(--ins-text-highlight)"/>
              </svg>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'9px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',letterSpacing:'.04em'}}>
                <span>W0</span><span>W4</span><span>W8</span><span>W12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PAIN POINTS ── */
function PainPoints() {
  const pains = [
    {
      title: '90% of requests are repetitive',
      body: 'Your team spends most of its time answering the same questions from sales, marketing, and product — questions that should be self-serve but aren\'t.',
    },
    {
      title: 'Every team defines metrics differently',
      body: 'Marketing defines CAC one way. Finance defines it another. Without a governed Semantic Layer, every team has their own version of the truth.',
    },
    {
      title: 'Pipeline monitoring is reactive',
      body: 'You find out about data freshness issues and pipeline failures when a stakeholder complains that their dashboard is showing wrong numbers.',
    },
    {
      title: 'Ad hoc SQL requests never stop',
      body: 'Every strategic question that can\'t be answered by an existing dashboard becomes an ad hoc SQL ticket. The backlog grows faster than it can be cleared.',
    },
    {
      title: 'Schema drift breaks things silently',
      body: 'When an upstream source changes a column name, your downstream models break — and nobody notices until a key metric drops to zero.',
    },
    {
      title: 'You can\'t show ROI on the data platform',
      body: 'Leadership asks what the data team delivered this quarter. You know you unblocked dozens of decisions, but quantifying that impact is nearly impossible.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,var(--ins-surface-page) 0%,var(--ins-surface-container) 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'14px'}}>
            <span style={{color:'var(--ins-button-primary-bg-hover)',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-button-primary-bg-hover)',fontFamily:'Geist Mono,monospace'}}>The Problem</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-.03em',marginBottom:'12px'}}>
            Data teams spend 80% of time on reporting
          </h2>
          <p style={{fontSize:'16px',color:'var(--ins-text-body)',maxWidth:'460px',margin:'0 auto',lineHeight:1.65}}>
            Sound familiar? These are the problems Insightis eliminates.
          </p>
        </div>

        <PainPointGrid items={pains} />
      </div>
    </section>
  );
}

/* ── RELEVANT INTEGRATIONS ── */
function RelevantIntegrations() {
  const connectors = [
    {
      name:'Mixpanel', bg:'rgba(120,86,255,.12)', desc:'Product analytics',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#7856ff" opacity=".15"/>
        <circle cx="8" cy="12" r="2.5" fill="#7856ff"/>
        <circle cx="16" cy="12" r="2.5" fill="#7856ff"/>
        <circle cx="12" cy="7" r="2.5" fill="#7856ff"/>
        <circle cx="12" cy="17" r="2.5" fill="#7856ff"/>
      </svg>,
    },
    {
      name:'Amplitude', bg:'rgba(25,124,230,.12)', desc:'Product analytics',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l4-8 4 10 3-6 2 4 5-12" stroke="#197ce6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
    },
    {
      name:'PostHog', bg:'rgba(245,78,0,.12)', desc:'Product analytics',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="13" width="3.5" height="8" rx="1" fill="#f54e00"/>
        <rect x="8" y="9" width="3.5" height="12" rx="1" fill="#f54e00" fillOpacity=".7"/>
        <rect x="13" y="5" width="3.5" height="16" rx="1" fill="#f54e00" fillOpacity=".55"/>
        <rect x="18" y="2" width="3" height="19" rx="1" fill="#f54e00" fillOpacity=".4"/>
      </svg>,
    },
    {
      name:'Heap', bg:'rgba(216,0,42,.12)', desc:'Auto-captured events',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="15" width="18" height="5" rx="1.2" fill="#d8002a" fillOpacity=".22" stroke="#d8002a" strokeWidth="1.3"/>
        <rect x="5" y="9.5" width="14" height="5" rx="1.2" fill="#d8002a" fillOpacity=".4" stroke="#d8002a" strokeWidth="1.3"/>
        <rect x="7.5" y="4" width="9" height="5" rx="1.2" fill="#d8002a" fillOpacity=".6" stroke="#d8002a" strokeWidth="1.3"/>
      </svg>,
    },
    {
      name:'Firebase', bg:'rgba(255,109,0,.12)', desc:'Mobile analytics',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5.5 20L8 10l3.5 4L14 6l4.5 14H5.5z" fill="#ff6d00" fillOpacity=".3" stroke="#ff6d00" strokeWidth="1.3" strokeLinejoin="round"/>
        <path d="M5.5 20L11 8l3 6" stroke="#ff9800" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M14 6l4.5 14" stroke="#ff6d00" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </svg>,
    },
    {
      name:'Segment', bg:'rgba(82,189,149,.12)', desc:'Customer data',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#52bd95" strokeWidth="1.5" fill="none"/>
        <path d="M8 12a4 4 0 0 1 4-4 4 4 0 0 1 2.83 1.17" stroke="#52bd95" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 12a4 4 0 0 1-4 4 4 4 0 0 1-2.83-1.17" stroke="#52bd95" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="17" cy="9" r="1.5" fill="#52bd95"/>
      </svg>,
    },
    {
      name:'Hotjar', bg:'rgba(252,80,29,.12)', desc:'Session insights',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#fc501d" fillOpacity=".15" stroke="#fc501d" strokeWidth="1.4"/>
        <path d="M12 5c-2 4 4 5 0 14" stroke="#fc501d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>,
    },
    {
      name:'FullStory', bg:'rgba(255,86,57,.12)', desc:'Session replay',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#ff5639" fillOpacity=".18" stroke="#ff5639" strokeWidth="1.4"/>
        <path d="M10 8.5l5 3.5-5 3.5z" fill="#ff5639"/>
      </svg>,
    },
    {
      name:'Pendo', bg:'rgba(255,79,124,.12)', desc:'In-app guidance',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M7 4h7a5 5 0 0 1 0 10h-4v6H7V4z" fill="#ff4f7c" fillOpacity=".2" stroke="#ff4f7c" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="14" cy="9" r="2" fill="#ff4f7c"/>
      </svg>,
    },
    {
      name:'Productboard', bg:'rgba(25,118,210,.12)', desc:'Roadmap & feedback',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#1976d2" strokeWidth="1.5" fill="#1976d2" fillOpacity=".15"/>
        <rect x="6" y="6" width="3" height="12" rx="1" fill="#1976d2"/>
        <rect x="11" y="6" width="3" height="8" rx="1" fill="#1976d2" fillOpacity=".7"/>
        <rect x="16" y="6" width="2.5" height="5" rx="1" fill="#1976d2" fillOpacity=".5"/>
      </svg>,
    },
    {
      name:'Jira', bg:'rgba(38,132,255,.12)', desc:'Issue tracking',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M11 2L21 12l-10 10-4-4 6-6-6-6z" fill="#2684ff" fillOpacity=".25" stroke="#2684ff" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M7 6l6 6-6 6" stroke="#2684ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>,
    },
    {
      name:'Linear', bg:'rgba(94,106,210,.12)', desc:'Issue tracking',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#5e6ad2" fillOpacity=".15" stroke="#5e6ad2" strokeWidth="1.3"/>
        <path d="M5 13l6 6M5 9l10 10M5 5l14 14M9 5l10 10M13 5l6 6" stroke="#5e6ad2" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>,
    },
    {
      name:'LaunchDarkly', bg:'rgba(64,91,255,.12)', desc:'Feature flags',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 3v18M5 4c4 0 6 3 10 3 2 0 4-.5 4-.5v8s-2 .5-4 .5c-4 0-6-3-10-3" fill="#405bff" fillOpacity=".22" stroke="#405bff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
    },
    {
      name:'Optimizely', bg:'rgba(0,125,197,.12)', desc:'A/B testing',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#007dc5" strokeWidth="1.5" fill="none"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke="#007dc5" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="#007dc5"/>
      </svg>,
    },
    {
      name:'Intercom', bg:'rgba(40,110,241,.12)', desc:'Customer feedback',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#286ef1" fillOpacity=".18"/>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="#286ef1" strokeWidth="1.5" fill="none"/>
        <circle cx="8" cy="12" r="1.5" fill="#286ef1"/>
        <circle cx="12" cy="12" r="1.5" fill="#286ef1"/>
        <circle cx="16" cy="12" r="1.5" fill="#286ef1"/>
      </svg>,
    },
    {
      name:'Notion', bg:'rgba(255,255,255,.06)', desc:'Specs & docs',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2.5" fill="#fff" fillOpacity=".06" stroke="var(--ins-color-gray-100)" strokeWidth="1.4"/>
        <path d="M8 7v10M8 7l8 10M16 7v10" stroke="var(--ins-color-gray-100)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,var(--ins-surface-container) 0%,#101620 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'56px'}}>
          <SectionHeader
            eyebrow="Your Product Stack"
            title="Connects to every product data source"
            lede="Joins event analytics, warehouse, billing, and CRM so you can see the full user journey in one answer."
            sparkle
          />
        </div>

        <div data-connectors-grid style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'32px'}}>
          {connectors.map((c,i) => (
            <div key={i} className="connector-card">
              <div className="connector-icon" style={{background:c.bg, display:'flex', alignItems:'center', justifyContent:'center'}}>
                {c.icon}
              </div>
              <div>
                <div style={{fontSize:'13px',fontWeight:500,color:'var(--ins-color-gray-100)'}}>{c.name}</div>
                <div style={{fontSize:'11px',color:'#8AA6B3',marginTop:'2px'}}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center'}}>
          <a href="/Resources/Connectors" style={{
            display:'inline-flex',alignItems:'center',gap:'6px',
            fontSize:'13px',color:'var(--ins-text-body)',
            textDecoration:'none',
            border:'1px solid rgba(255,255,255,.07)',
            borderRadius:'999px',
            padding:'8px 20px',
            background:'rgba(255,255,255,.02)',
            transition:'all .15s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.color='var(--ins-text-highlight)';e.currentTarget.style.borderColor='rgba(9,160,157,.3)';}}
          onMouseLeave={e=>{e.currentTarget.style.color='var(--ins-text-body)';e.currentTarget.style.borderColor='rgba(255,255,255,.07)';}}
          >
            See all 200+ integrations
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── METRICS ── */
function Metrics() {
  const metrics = [
    'Data Freshness','Pipeline Run Time','Model Coverage','Query Success Rate',
    'Schema Drift Alerts','Lineage Coverage','Data Quality Score','SLA Compliance',
    'Self-Serve Rate','Ticket Deflection','Query Volume','P95 Query Latency',
    'Table Row Counts','Pipeline Failure Rate','Cost per Query','Data Utilization Rate',
    'dbt Model Coverage','Sync Lag','Error Rate','Warehouse Spend',
  ];

  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,#101620 0%,var(--ins-surface-page) 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'14px'}}>
            <span style={{color:'var(--ins-button-primary-bg-hover)',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-button-primary-bg-hover)',fontFamily:'Geist Mono,monospace'}}>Metrics That Matter</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-.03em',marginBottom:'12px'}}>
            Every KPI a data team monitors
          </h2>
          <p style={{fontSize:'16px',color:'var(--ins-text-body)',maxWidth:'460px',margin:'0 auto',lineHeight:1.65}}>
            Ask about any of these — or any metric you define — in plain English.
          </p>
        </div>

        <div style={{display:'flex',flexWrap:'wrap',gap:'10px',justifyContent:'center',marginBottom:'28px'}}>
          {metrics.map((m,i) => (
            <span key={i} className="metric-pill">{m}</span>
          ))}
        </div>

        <p style={{textAlign:'center',fontSize:'13px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',fontStyle:'italic'}}>
          These are just examples — ask about any metric in plain English.
        </p>
      </div>
    </section>
  );
}

/* ── BEFORE / AFTER ── */
function BeforeAfter() {
  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,var(--ins-surface-page) 0%,var(--ins-surface-container) 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'52px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'14px'}}>
            <span style={{color:'var(--ins-button-primary-bg-hover)',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-button-primary-bg-hover)',fontFamily:'Geist Mono,monospace'}}>The Difference</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-.03em',marginBottom:'12px'}}>
            Data teams before vs. after Insightis
          </h2>
        </div>

        <ComparisonCards
          before={{
            label: 'Before Insightis',
            items: [
              'Team drowning in repetitive data requests',
              'Each team has its own metric definitions',
              'Pipeline failures found reactively',
              'Ad hoc SQL queue never empties',
              'Schema drift breaks models silently',
              'Data ROI impossible to quantify',
            ],
          }}
          after={{
            label: 'With Insightis',
            items: [
              'Business users self-serve in plain English',
              'One Semantic Layer governs all definitions',
              'Anomalies surface before anyone complains',
              'Complex questions answered without SQL',
              'Schema changes flagged automatically',
              'Data impact visible and measurable',
            ],
          }}
        />

        <div style={{textAlign:'center',marginTop:'36px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'40px',fontWeight:500,color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',lineHeight:1,flexShrink:0}}>4×</span>
            <span style={{fontSize:'15px',color:'var(--ins-text-body)',whiteSpace:'nowrap'}}>more time for real analysis. Self-serve deflects 80% of ad hoc requests.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section style={{paddingTop:'32px',paddingBottom:'64px',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <BottomCTA
          variant="form"
          title={<>Stop <BottomCTA.Highlight>guessing.</BottomCTA.Highlight> Start <BottomCTA.Highlight>shipping.</BottomCTA.Highlight></>}
          inputPlaceholder="What product question can Insightis answer for your team?"
          ctaLabel="Get Started"
        />
      </div>
    </section>
  );
}

/* ── POSITIONING BAND ── */
function Positioning() {
  return (
    <section style={{
      padding:'56px 0 64px',
      position:'relative',
      background:'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(9,160,157,.05) 0%, transparent 70%)',
    }}>
      <div style={{maxWidth:'820px',margin:'0 auto',padding:'0 24px',textAlign:'center'}}>
        <h2 style={{
          fontSize:'clamp(26px,3.4vw,38px)',
          fontWeight:500,
          color:'var(--ins-text-body)',
          letterSpacing:'-.025em',
          lineHeight:1.2,
          marginBottom:'18px',
        }}>
          Stop being a <span style={{color:'var(--ins-text-highlight)'}}>reporting service.</span> Start doing <span style={{color:'var(--ins-text-highlight)'}}>real analysis.</span>
        </h2>
        <p style={{fontSize:'17px',color:'rgba(255,255,255,.6)',lineHeight:1.65,marginBottom:'28px'}}>
          Sound familiar? These are the problems Insightis eliminates.
        </p>
        <a href="#spotlights" style={{
          display:'inline-flex',alignItems:'center',gap:'8px',
          padding:'10px 20px',borderRadius:'999px',
          border:'1px solid rgba(255,255,255,.12)',
          color:'var(--ins-color-gray-200)',fontSize:'14px',fontWeight:400,
          textDecoration:'none',
          background:'rgba(255,255,255,.03)',
          transition:'all .2s',
        }}>
          See how it works
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>
        </a>
      </div>
    </section>
  );
}

/* ── FEATURE SPOTLIGHT VISUALS ── */
function SpotlightChat() {
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'20px',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="self-serve · product" />
      <div style={{padding:'22px 20px',display:'flex',flexDirection:'column',gap:'14px',flex:1,justifyContent:'center'}}>
        {/* User question */}
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <div className="chat-bubble-user" style={{maxWidth:'82%'}}>
            How's Saved Reports adoption across plans this quarter?
          </div>
        </div>

        {/* AI reply */}
        <div className="chat-bubble-ai">
          <div style={{fontSize:'12.5px',lineHeight:1.6,marginBottom:'12px'}}>
            Adoption climbed across every plan since the <span style={{color:'var(--ins-text-highlight)',fontWeight:500}}>v2.4</span> ship in March. <span style={{color:'var(--ins-text-highlight)',fontWeight:500}}>Pro</span> leads at 78% (+34pts QoQ); <span style={{color:'var(--ins-status-error-fg)',fontWeight:500}}>Free</span> at 18% remains the soft spot. Strongest lift came from the Team plan after the in-app prompt rolled out.
          </div>

          {/* KPI blocks */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'7px',marginBottom:'10px'}}>
            {[
              {label:'Pro',     val:'78%',   color:'var(--ins-text-highlight)', sub:'best plan'},
              {label:'QoQ lift',val:'+34pt', color:'var(--ins-status-success-fg)', sub:'avg across plans'},
              {label:'Free',    val:'18%',   color:'var(--ins-status-error-fg)', sub:'soft spot'},
            ].map((k,i)=>(
              <div key={i} style={{
                background:'rgba(255,255,255,.03)',
                border:'1px solid rgba(255,255,255,.06)',
                borderRadius:'9px',
                padding:'8px 10px',
              }}>
                <div style={{fontSize:'9px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'3px'}}>{k.label}</div>
                <div style={{fontSize:'13.5px',fontWeight:500,color:k.color,fontFamily:'Geist Mono,monospace',letterSpacing:'-.01em',marginBottom:'2px'}}>{k.val}</div>
                <div style={{fontSize:'9.5px',color:'var(--ins-text-body)'}}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Source line */}
          <div style={{
            display:'flex',alignItems:'center',gap:'6px',
            paddingTop:'8px',
            borderTop:'1px solid rgba(255,255,255,.05)',
            fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#8AA6B3',
          }}>
            <span style={{letterSpacing:'.06em',textTransform:'uppercase'}}>Source</span>
            <span style={{color:'var(--ins-text-highlight)'}}>events.fct_feature_use</span>
            <span>·</span>
            <span style={{color:'var(--ins-text-highlight)'}}>billing.fct_subscriptions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChromeHeader({ label }) {
  return (
    <div style={{padding:'14px 18px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:'10px',flexShrink:0,position:'relative',zIndex:1}}>
      <div style={{display:'flex',gap:'5px'}}>
        {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
          <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.6}}/>
        ))}
      </div>
      <div style={{flex:1,textAlign:'center',fontSize:'12px',color:'#8AA6B3',fontFamily:'Geist Mono, monospace'}}>
        {label}
      </div>
    </div>
  );
}

function SpotlightSemantic() {
  const teams = [
    {team:'Marketing', def:'trial signup',  color:'var(--ins-status-warning-fg)'},
    {team:'CS',        def:'weekly login',  color:'#A78BFA'},
    {team:'Product',   def:'core action',   color:'var(--ins-status-error-fg)'},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'20px',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="metric · active_user" />
      <div style={{padding:'22px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* Section eyebrow */}
        <div style={{textAlign:'center',marginBottom:'12px'}}>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#8AA6B3',letterSpacing:'.1em',textTransform:'uppercase'}}>three teams · three definitions</span>
        </div>

        {/* Three conflicting team definitions */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'7px',marginBottom:'12px'}}>
          {teams.map((t,i)=>(
            <div key={i} style={{
              background:'rgba(255,255,255,.025)',
              border:`1px solid ${t.color}33`,
              borderRadius:'9px',
              padding:'10px 8px',
              textAlign:'center',
            }}>
              <div style={{fontFamily:'Geist Mono,monospace',fontSize:'9px',color:t.color,letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'5px'}}>{t.team}</div>
              <div style={{fontSize:'11.5px',color:'var(--ins-color-gray-200)'}}>{t.def}</div>
            </div>
          ))}
        </div>

        {/* Converging arrow */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:'10px'}}>
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
            <path d="M4 1 L14 14 L24 1" stroke="rgba(14,196,193,.35)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 8 L14 18 M14 18 L10 14 M14 18 L18 14" stroke="var(--ins-text-highlight)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* The certified definition */}
        <div style={{
          background:'linear-gradient(135deg, rgba(9,160,157,.14) 0%, rgba(9,160,157,.05) 100%)',
          border:'1px solid rgba(9,160,157,.4)',
          borderRadius:'12px',
          padding:'14px 14px',
        }}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
            <div style={{fontFamily:'Geist Mono,monospace',fontSize:'13.5px',color:'var(--ins-color-gray-100)',fontWeight:500}}>active_user</div>
            <span style={{
              display:'inline-flex',alignItems:'center',gap:'5px',
              padding:'3px 9px',borderRadius:'999px',
              background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.3)',
              fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'var(--ins-status-success-fg)',
              letterSpacing:'.06em',textTransform:'uppercase',
            }}>
              <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--ins-status-success-fg)'}}/>
              Certified · v2.4
            </span>
          </div>
          <div style={{
            fontFamily:'Geist Mono,monospace',
            fontSize:'11.5px',
            color:'var(--ins-color-gray-200)',
            background:'rgba(0,0,0,.2)',
            border:'1px solid rgba(255,255,255,.04)',
            borderRadius:'7px',
            padding:'9px 10px',
            marginBottom:'10px',
            lineHeight:1.5,
          }}>
            <span style={{color:'var(--ins-text-body)'}}>users with</span> <span style={{color:'var(--ins-text-highlight)'}}>core_action</span> <span style={{color:'var(--ins-text-body)'}}>in 7d / new_signups</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',gap:'10px',fontSize:'10.5px',color:'var(--ins-color-gray-200)'}}>
            <span><span style={{color:'#8AA6B3',fontFamily:'Geist Mono,monospace',letterSpacing:'.06em',textTransform:'uppercase',fontSize:'9px',marginRight:'5px'}}>Owned</span>Product Analytics</span>
            <span><span style={{color:'#8AA6B3',fontFamily:'Geist Mono,monospace',letterSpacing:'.06em',textTransform:'uppercase',fontSize:'9px',marginRight:'5px'}}>Used by</span>12 reports · 3 teams</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightAnomalies() {
  const segments = [
    {seg:'Mobile · iOS',     val:'−67%', color:'var(--ins-status-error-fg)', bad:true},
    {seg:'Mobile · Android', val:'−41%', color:'var(--ins-status-error-fg)', bad:true},
    {seg:'Web',              val:'−2%',  color:'var(--ins-text-body)', bad:false},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'20px',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="cohort · breakdown" />
      <div style={{padding:'20px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* User question */}
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#8AA6B3',letterSpacing:'.08em',textTransform:'uppercase'}}>asked</span>
          <span style={{fontSize:'12.5px',color:'var(--ins-color-gray-200)'}}>"Which cohort is dragging activation?"</span>
        </div>

        {/* Multi-cohort line chart */}
        <div style={{
          background:'rgba(255,255,255,.018)',
          border:'1px solid rgba(255,255,255,.05)',
          borderRadius:'10px',
          padding:'12px 12px 10px',
          marginBottom:'12px',
        }}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
            <div style={{display:'flex',gap:'10px',fontFamily:'Geist Mono,monospace',fontSize:'9.5px',alignItems:'center'}}>
              <span style={{color:'#A78BFA',display:'inline-flex',alignItems:'center',gap:'4px'}}><span style={{width:'10px',height:'2px',background:'#A78BFA',borderRadius:'1px'}}/>Apr</span>
              <span style={{color:'var(--ins-status-error-fg)',display:'inline-flex',alignItems:'center',gap:'4px'}}><span style={{width:'10px',height:'2px',background:'var(--ins-status-error-fg)',borderRadius:'1px'}}/>May</span>
              <span style={{color:'var(--ins-text-highlight)',display:'inline-flex',alignItems:'center',gap:'4px'}}><span style={{width:'10px',height:'2px',background:'var(--ins-text-highlight)',borderRadius:'1px'}}/>Jun</span>
            </div>
            <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'var(--ins-text-body)'}}>activation · D7</span>
          </div>
          <svg viewBox="0 0 280 60" width="100%" height="60" preserveAspectRatio="none" style={{display:'block'}}>
            <line x1="0" y1="18" x2="280" y2="18" stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3"/>
            <line x1="0" y1="38" x2="280" y2="38" stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3"/>
            {/* Apr cohort - lavender, steady */}
            <path d="M0,16 L40,15 L80,17 L120,16 L160,15 L200,16 L240,15 L280,16" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Jun cohort - teal, healthy */}
            <path d="M0,20 L40,18 L80,17 L120,15 L160,14 L200,13 L240,12 L280,12" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            {/* May cohort - red, dropping */}
            <path d="M0,18 L40,20 L80,22 L120,28 L160,38 L200,44 L240,48 L280,50" fill="none" stroke="var(--ins-status-error-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="280" cy="50" r="2.6" fill="var(--ins-status-error-fg)"/>
          </svg>
        </div>

        {/* Segment breakdown — pinpointing platform/segment */}
        <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
          {segments.map((r,i)=>(
            <div key={i} style={{
              display:'flex',alignItems:'center',gap:'10px',
              padding:'7px 11px',
              background:r.bad?'rgba(248,113,113,.05)':'rgba(255,255,255,.02)',
              border:`1px solid ${r.bad?'rgba(248,113,113,.2)':'rgba(255,255,255,.05)'}`,
              borderRadius:'8px',
            }}>
              <span style={{
                width:'6px',height:'6px',borderRadius:'50%',
                background:r.color,flexShrink:0,
              }}/>
              <span style={{fontSize:'11.5px',color:'var(--ins-color-gray-200)',flex:1,fontFamily:'Geist Mono,monospace'}}>{r.seg}</span>
              <span style={{fontSize:'12px',fontWeight:500,color:r.color,fontFamily:'Geist Mono,monospace'}}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotlightStack() {
  const sources = [
    { name:'Mixpanel', kind:'events', color:'#7856ff', bg:'rgba(120,86,255,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="7" r="2.4" fill="#7856ff"/>
        <circle cx="12" cy="17" r="2.4" fill="#7856ff"/>
        <circle cx="7" cy="12" r="2.4" fill="#7856ff"/>
        <circle cx="17" cy="12" r="2.4" fill="#7856ff"/>
      </svg>},
    { name:'Amplitude', kind:'events', color:'#197ce6', bg:'rgba(25,124,230,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l4-8 4 10 3-6 2 4 5-12" stroke="#197ce6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>},
    { name:'Snowflake', kind:'warehouse', color:'#29b5e8', bg:'rgba(41,181,232,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="2" x2="12" y2="22" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <line x1="2" y1="7" x2="22" y2="17" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="7" x2="2" y2="17" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2.5" fill="#29b5e8"/>
      </svg>},
    { name:'Stripe', kind:'billing', color:'#635bff', bg:'rgba(99,91,255,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" fill="#635bff"/>
      </svg>},
    { name:'Salesforce', kind:'crm', color:'#00a1e0', bg:'rgba(0,161,224,.12)',
      icon:<svg width="20" height="18" viewBox="0 0 24 18" fill="none">
        <path d="M9.5 3.4C10.4 2.5 11.6 2 12.9 2c1.7 0 3.2.9 4 2.3.7-.3 1.5-.5 2.3-.5 3 0 5.5 2.5 5.5 5.6 0 .5-.1 1-.2 1.5-.2.6-1.2.5-1.4-.1-.1-.2-.2-.4-.4-.5-.6-.5-1.5-.5-2.1.1-.4.4-.4 1 0 1.4.3.3.7.4 1.1.4.4 0 .8-.1 1.1-.4.4 1.6-.1 3.4-1.4 4.6-1.4 1.3-3.4 1.7-5.2 1-.7 1.3-2.1 2.2-3.7 2.2-.7 0-1.3-.2-1.9-.4-.8 1.1-2.1 1.8-3.6 1.8-1.6 0-3-.8-3.8-2-.4.1-.8.2-1.3.2-2.5 0-4.5-2-4.5-4.4 0-1.7 1-3.2 2.4-3.9-.1-.4-.1-.7-.1-1.1C-.1 6 1.6 4.3 3.7 4.3c1.2 0 2.3.6 3 1.5.6-.7 1.4-1.2 2.3-1.4.2-.4.4-.7.7-1z" fill="#00a1e0"/>
      </svg>},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'20px',
      boxShadow:'none',
      position:'relative',
      overflow:'hidden',
      display:'flex',
      flexDirection:'column',
    }}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 55% 70% at 80% 50%, rgba(9,160,157,.10) 0%, transparent 70%)',pointerEvents:'none'}}/>
      <ChromeHeader label="stack · flow" />
      <div style={{padding:'20px 20px',flex:1,display:'flex',alignItems:'center',gap:'4px',position:'relative'}}>
        {/* Left column: source tiles stacked vertically */}
        <div style={{flex:'1 1 46%',display:'flex',flexDirection:'column',gap:'7px',position:'relative',zIndex:2}}>
          <div style={{fontFamily:'Geist Mono,monospace',fontSize:'9px',color:'#8AA6B3',letterSpacing:'.12em',textTransform:'uppercase',marginBottom:'2px'}}>your stack</div>
          {sources.map((s,i) => (
            <div key={i} style={{
              display:'flex',alignItems:'center',gap:'10px',
              padding:'7px 10px',
              background:'rgba(255,255,255,.025)',
              border:`1px solid ${s.color}33`,
              borderRadius:'9px',
              position:'relative',
            }}>
              <div style={{
                width:'26px',height:'26px',borderRadius:'7px',
                background:s.bg,
                display:'flex',alignItems:'center',justifyContent:'center',
                flexShrink:0,
              }}>{s.icon}</div>
              <div style={{minWidth:0,flex:1}}>
                <div style={{fontSize:'11.5px',fontWeight:500,color:'var(--ins-color-gray-100)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.name}</div>
                <div style={{fontFamily:'Geist Mono,monospace',fontSize:'8.5px',color:'#8AA6B3',letterSpacing:'.08em',textTransform:'uppercase'}}>{s.kind}</div>
              </div>
              <div style={{
                width:'7px',height:'7px',borderRadius:'50%',
                background:s.color,opacity:.85,flexShrink:0,
                boxShadow:`0 0 6px ${s.color}66`,
              }}/>
            </div>
          ))}
        </div>

        {/* Middle column: SVG branch lines converging */}
        <div style={{flex:'0 0 64px',alignSelf:'stretch',position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg viewBox="0 0 64 280" preserveAspectRatio="none" width="100%" height="100%" style={{display:'block'}}>
            <defs>
              <linearGradient id="stack-flow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"  stopColor="var(--ins-text-highlight)" stopOpacity="0.15"/>
                <stop offset="60%" stopColor="var(--ins-text-highlight)" stopOpacity="0.55"/>
                <stop offset="100%" stopColor="var(--ins-text-highlight)" stopOpacity="0.85"/>
              </linearGradient>
            </defs>
            {/* 5 curved branches from each source row to a shared right-side convergence point */}
            <path d="M0,40  C28,40  36,140 64,140" stroke="url(#stack-flow)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            <path d="M0,90  C28,90  36,140 64,140" stroke="url(#stack-flow)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            <path d="M0,140 L64,140" stroke="url(#stack-flow)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            <path d="M0,190 C28,190 36,140 64,140" stroke="url(#stack-flow)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            <path d="M0,240 C28,240 36,140 64,140" stroke="url(#stack-flow)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            {/* Convergence node */}
            <circle cx="64" cy="140" r="6" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1" opacity="0.4"/>
            <circle cx="64" cy="140" r="3" fill="var(--ins-text-highlight)"/>
          </svg>
        </div>

        {/* Right column: Insightis Semantic Layer destination */}
        <div style={{flex:'1 1 36%',position:'relative',zIndex:2}}>
          <div style={{
            background:'linear-gradient(135deg, rgba(9,160,157,.18) 0%, rgba(9,160,157,.06) 100%)',
            border:'1px solid rgba(9,160,157,.45)',
            borderRadius:'12px',
            padding:'14px 12px',
            display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',
            textAlign:'center',
            boxShadow:'0 8px 24px rgba(9,160,157,.12), inset 0 1px 0 rgba(255,255,255,.05)',
          }}>
            <div style={{
              width:'42px',height:'42px',borderRadius:'10px',
              background:'rgba(9,160,157,.22)',
              border:'1px solid rgba(9,160,157,.35)',
              display:'flex',alignItems:'center',justifyContent:'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
                <path d="M25.5 10.4L21.7 12.7L25.5 15.1L12.7 22.8L0 15.1L3.8 12.7L0 10.4L5.7 6.9L7.6 8.1L3.8 10.4L12.7 15.8L21.7 10.4L17.8 8.1L19.8 6.9L25.5 10.4Z" fill="var(--ins-text-highlight)"/>
              </svg>
            </div>
            <div>
              <div style={{fontSize:'13.5px',fontWeight:600,color:'var(--ins-color-gray-100)'}}>Insightis</div>
              <div style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#8AA6B3',letterSpacing:'.08em',textTransform:'uppercase',marginTop:'2px'}}>Semantic Layer</div>
            </div>
            <span style={{
              fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'var(--ins-text-highlight)',
              padding:'3px 9px',borderRadius:'999px',
              background:'rgba(9,160,157,.12)',border:'1px solid rgba(9,160,157,.3)',
              letterSpacing:'.08em',textTransform:'uppercase',
              whiteSpace:'nowrap',
            }}>5 connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FEATURE SPOTLIGHTS ── */
function FeatureSpotlights() {
  const spots = [
    {
      eyebrow:'Self-Serve',
      title:'Skip the data ticket queue',
      body:'Ask any product question in plain English — adoption, retention, funnel drop-off — and Insightis answers from your event, billing, and CRM data in seconds.',
      bullets:['Plain-English questions across the product org','PMs unblock themselves without SQL'],
      visual:<SpotlightChat />,
    },
    {
      eyebrow:'Activation Metrics',
      title:'One definition per metric',
      body:'Marketing counts trials, CS counts logins, Product counts core actions. Define each metric once — owned, versioned, and used everywhere.',
      bullets:['One certified definition per metric','Versioning, ownership, and lineage built in'],
      visual:<SpotlightSemantic />,
    },
    {
      eyebrow:'Cohort Anomaly Detection',
      title:'Spot the breaking cohort early',
      body:'Insightis scans every answer for the cohort, segment, or platform pulling a metric the wrong way — surfaced inline, not on a dashboard you forgot to open.',
      bullets:['Outliers flagged inside every answer','Cohort and segment breakdowns automatically'],
      visual:<SpotlightAnomalies />,
    },
    {
      eyebrow:'Stack-Native',
      title:'Plugs into your existing stack',
      body:'Insightis runs on top of Mixpanel, Amplitude, your warehouse, Stripe, and Salesforce. No data movement, no parallel modeling, no extra pipeline.',
      bullets:['Works with Mixpanel, Amplitude, Segment, Firebase','Joins event, billing, and CRM data automatically'],
      visual:<SpotlightStack />,
    },
  ];

  return (
    <section id="spotlights" style={{padding:'80px 0 100px',background:'linear-gradient(180deg,var(--ins-surface-page) 0%,var(--ins-surface-container) 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'72px'}}>
          <SectionHeader
            eyebrow="How it works"
            title="Built for the way product teams actually work"
            lede="Four capabilities that turn the data layer from a bottleneck into something you can ship against."
            sparkle
          />
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'88px'}}>
          {spots.map((s,i) => {
            const reverse = i % 2 === 1;
            return (
              <div key={i} data-spotlight-grid style={{
                display:'grid',
                gridTemplateColumns:'1fr 1fr',
                gap:'64px',
                alignItems:'center',
              }}>
                <div data-spotlight-text style={{order: reverse ? 2 : 0}}>
                  <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'18px'}}>
                    <span style={{color:'var(--ins-button-primary-bg-hover)',fontSize:'12px'}}>✦</span>
                    <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-button-primary-bg-hover)',fontFamily:'Geist Mono,monospace'}}>{s.eyebrow}</span>
                  </div>
                  <h3 style={{fontSize:'clamp(24px,2.6vw,34px)',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-.025em',lineHeight:1.18,marginBottom:'18px'}}>
                    {s.title}
                  </h3>
                  <p style={{fontSize:'16px',color:'rgba(255,255,255,.62)',lineHeight:1.65,marginBottom:'22px'}}>
                    {s.body}
                  </p>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
                    {s.bullets.map((b,bi) => (
                      <li key={bi} style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',color:'var(--ins-color-gray-200)',lineHeight:1.55}}>
                        <CheckIcon size={12} style={{flexShrink:0,marginTop:'1px'}} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-spotlight-visual style={{
                  order: reverse ? 0 : 2,
                  display:'flex',
                  alignItems:'stretch',
                  height:'440px',
                }}>
                  {s.visual}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── USE CASES ── */
function UseCases() {
  const cases = [
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><path d="M9 8h6M9 12h6M9 16h4" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Feature adoption tracking',
      desc:'Did anyone actually use that feature you shipped last quarter? Get adoption, depth-of-use, and stickiness numbers without filing a data request.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 14l4-4 3 3 5-7" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title:'Cohort & retention analysis',
      desc:'Slice retention by signup channel, plan, persona, or cohort week — without writing complex SQL joins across event, user, and billing tables.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12h4l3-9 4 18 3-9h4" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title:'Onboarding funnel diagnosis',
      desc:'Find the step where new users abandon, the segment where drop-off is worst, and the cause behind it — before the cohort fully churns.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><polyline points="12 6 12 12 16 14" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title:'Time-to-value measurement',
      desc:'How long does it take a new user to hit their aha moment? Correlate sign-up, event, and retention data instantly instead of building a one-off analysis.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 18l6-6 4 4 8-10" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 6 21 6 21 13" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title:'A/B test readouts on demand',
      desc:'Get experiment readouts without waiting on the data team. Lift, confidence, and segment breakdowns from your event data in plain English.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="12" width="4" height="9" rx="1" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><rect x="9" y="7" width="4" height="14" rx="1" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><rect x="16" y="3" width="4" height="18" rx="1" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/></svg>,
      title:'Roadmap impact reporting',
      desc:'Tie the features you ship to the metrics that matter — activation, retention, expansion. Show exec stakeholders the impact in numbers, not anecdotes.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,var(--ins-surface-container) 0%,var(--ins-surface-page) 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'80px'}}>
          <div style={{
            position:'relative',borderRadius:'16px',
            border:'1px solid rgba(30,30,48,1)',
            padding:'32px 48px',overflow:'hidden',
            display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:'24px',
            flexWrap:'wrap',
            background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)',
          }}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
            <div style={{flex:'1 1 360px',minWidth:0}}>
              <h3 style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-.03em',lineHeight:1.2,marginBottom:'8px'}}>
                Ship faster with <span style={{color:'var(--ins-button-primary-bg)'}}>better data</span>.
              </h3>
              <p style={{fontSize:'14px',color:'var(--ins-text-body)',lineHeight:1.6}}>
                Connect Mixpanel, your warehouse, and Stripe — and ask the next product question yourself.
              </p>
            </div>
            <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
              Get started for free
            </Button>
          </div>
        </div>
        <div style={{marginBottom:'56px'}}>
          <SectionHeader
            eyebrow="Use cases"
            title="What product teams use Insightis for"
            sparkle
          />
        </div>

        <div data-usecase-grid style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}}>
          {cases.map((c,i) => (
            <div key={i}
              style={{
                background:'rgba(13,17,23,.6)',
                border:'1px solid rgba(255,255,255,.06)',
                borderRadius:'16px',padding:'24px',
                position:'relative',overflow:'hidden',
                transition:'all .2s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(9,160,157,.25)';e.currentTarget.style.background='rgba(9,160,157,.04)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.06)';e.currentTarget.style.background='rgba(13,17,23,.6)';}}
            >
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(9,160,157,.2),transparent)'}}/>
              <div style={{width:'38px',height:'38px',borderRadius:'10px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px'}}>
                {c.icon}
              </div>
              <h3 style={{fontSize:'15px',fontWeight:600,color:'var(--ins-color-gray-100)',marginBottom:'6px'}}>{c.title}</h3>
              <p style={{fontSize:'13.5px',color:'var(--ins-text-body)',lineHeight:1.6}}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
function Testimonials() {
  const items = [
    {
      quote:'In the first month we deflected ~70% of ad hoc SQL tickets. The team finally has time for real analysis instead of clearing a queue.',
      name:'Maya Chen',
      role:'Head of Data',
      company:'Series-B SaaS',
    },
    {
      quote:'Marketing and Finance had three different definitions of CAC. Insightis on top of our dbt models killed the debate — one metric, one owner, one source of truth.',
      name:'Daniel Okafor',
      role:'Senior Analytics Engineer',
      company:'B2B Marketplace',
    },
    {
      quote:'A schema change on Stripe used to mean a Slack-storm Monday morning. Now we see the alert and the affected dbt models before anyone notices the dashboard.',
      name:'Priya Raman',
      role:'Analytics Manager',
      company:'Consumer Fintech',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,var(--ins-surface-page) 0%,var(--ins-surface-container) 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'14px'}}>
            <span style={{color:'var(--ins-button-primary-bg-hover)',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-button-primary-bg-hover)',fontFamily:'Geist Mono,monospace'}}>Stories</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-.03em',marginBottom:'12px'}}>
            Data teams who stopped firefighting
          </h2>
        </div>

        <div data-testimonials-grid style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
          {items.map((t,i) => (
            <TestimonialCard
              key={i}
              quote={t.quote}
              name={t.name}
              role={t.role}
              company={t.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const items = [
    {
      q:'Does this replace Mixpanel or Amplitude?',
      a:'No — Insightis sits on top of them. We connect to Mixpanel, Amplitude, Segment, Firebase, and your warehouse so you can ask cross-tool questions in plain English. The dashboards your team already built keep working; Insightis answers the long-tail questions that would otherwise turn into a data ticket.',
    },
    {
      q:'How does it join event data with billing and CRM?',
      a:'Insightis joins on the user/account identifiers you already use — typically email, account_id, or a Segment user_id. Once connected, you can ask questions like "What\'s 90-day retention by plan tier and signup source" without writing the join yourself.',
    },
    {
      q:'Can PMs use it without learning SQL?',
      a:'Yes — that\'s the whole point. Ask questions in plain English: "Which features did churned users stop using before cancelling?" Insightis writes the query, runs it against your event data, and explains the result. PMs unblock themselves; the data team stops being a ticket queue.',
    },
    {
      q:'How does it handle activation, retention, and other product metrics?',
      a:'Define each metric once at the semantic layer — what counts as activation, what counts as a retained user, how cohorts are formed. From then on every team uses the same definition. No more "marketing\'s active users vs. product\'s active users" debates.',
    },
    {
      q:'Will this work with experiments and A/B test data?',
      a:'Yes. Point Insightis at your experiment exposure events and the metrics you care about, and ask for the readout in plain English. You\'ll get lift, confidence, and segment breakdowns without waiting on a data team to write a one-off analysis.',
    },
    {
      q:'How is security and PII handled?',
      a:'Insightis respects your warehouse and source-tool permissions — every query runs as the connected role, so row-level and column-level security stay in force. No event data is copied out of your sources. SOC 2 Type II compliant.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,var(--ins-surface-container) 0%,var(--ins-surface-page) 100%)'}}>
      <div style={{maxWidth:'880px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'52px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'14px'}}>
            <span style={{color:'var(--ins-button-primary-bg-hover)',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-button-primary-bg-hover)',fontFamily:'Geist Mono,monospace'}}>FAQ</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-.03em',marginBottom:'12px'}}>
            Questions product teams ask
          </h2>
        </div>

        <FAQAccordion items={items} />
      </div>
    </section>
  );
}

/* ── APP ── */
function App() {
  return (
    <div>
      <Header />
      <main>
      <Hero />
      <FeatureSpotlights />
      <UseCases />
      <RelevantIntegrations />
      <FAQ />
      <BottomCTASection />
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
