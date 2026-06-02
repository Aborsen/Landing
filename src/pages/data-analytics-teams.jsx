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
            <div className="fu0 ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'20px'}}>
              <span style={{fontSize:'12px'}}>✦</span>
              <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace'}}>For Data &amp; Analytics</span>
            </div>

            <h1 className="fu1" style={{fontSize:'clamp(36px,4.5vw,58px)',fontWeight:500,color:'var(--ins-text-heading-soft)',letterSpacing:'-.03em',lineHeight:1.12,marginBottom:'20px'}}>
              <span style={{color:'var(--ins-text-heading-soft)'}}>Stop answering</span>
              <br/>
              <span style={{color:'var(--ins-text-highlight)'}}>repeat questions.</span>
            </h1>

            <p className="fu2 ins-text-body-xl" style={{marginBottom:'28px',maxWidth:'480px'}}>
              Empower every team to self-serve their data. Insightis sits on top of your Semantic Layer and answers questions in plain English — so you focus on analysis, not reporting.
            </p>

            <div className="fu3" style={{display:'flex',gap:'12px',flexWrap:'wrap',marginBottom:'28px'}}>
              <Button as="a" href="https://insightis-app.devart.info/register" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
                Start for Free
              </Button>
            </div>

          </div>

          {/* Right: modern hero visual */}
          <div className="fu2" style={{position:'relative'}}>
            {/* Ambient glow */}
            <div style={{
              position:'absolute', inset:'-60px',
              background:'radial-gradient(circle at 30% 30%, rgba(9,160,157,.18) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(110,60,200,.10) 0%, transparent 50%)',
              pointerEvents:'none',
              filter:'blur(40px)',
              zIndex:0,
            }}/>

            {/* Main insight panel */}
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
              {/* Top gradient line */}
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(14,196,193,.55),transparent)',zIndex:1}}/>

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
                }}>Insightis — For Data Analytics</span>
              </div>

              {/* Header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'18px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--ins-status-success-fg)',boxShadow:'0 0 8px var(--ins-status-success-fg)'}}/>
                  <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10.5px',color:'var(--ins-text-body)',letterSpacing:'.08em',textTransform:'uppercase'}}>Live insight · 2m ago</span>
                </div>
                <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'var(--ins-text-highlight)',padding:'3px 9px',borderRadius:'999px',background:'rgba(9,160,157,.1)',border:'1px solid rgba(9,160,157,.25)',letterSpacing:'.08em',textTransform:'uppercase'}}>auto</span>
              </div>

              {/* Headline + caption */}
              <h3 style={{fontSize:'17px',fontWeight:500,color:'var(--ins-text-heading-soft)',marginBottom:'8px',letterSpacing:'-.015em',lineHeight:1.35}}>
                Paid acquisition decelerating mid-funnel
              </h3>
              <p className="ins-text-body-sm" style={{marginBottom:'18px'}}>
                <span style={{color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',fontSize:'11.5px'}}>checkout_complete</span> dropped <span style={{color:'var(--ins-status-error-fg)',fontWeight:500}}>−41%</span> between 14:00–16:00 UTC. Linked to a Stripe webhook delay. Resolved at 18:30 UTC.
              </p>

              {/* Chart */}
              <div style={{
                background:'rgba(255,255,255,.018)',
                border:'1px solid rgba(255,255,255,.05)',
                borderRadius:'14px',
                padding:'16px 14px 12px',
                marginBottom:'14px',
                position:'relative',
              }}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                  <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'var(--ins-text-inactive)',letterSpacing:'.06em',textTransform:'uppercase'}}>events / 30min</span>
                  <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'var(--ins-text-body)'}}>last 24h</span>
                </div>
                <svg viewBox="0 0 280 84" width="100%" height="84" preserveAspectRatio="none" style={{display:'block'}}>
                  <defs>
                    <linearGradient id="hero-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--ins-text-highlight)" stopOpacity="0.32"/>
                      <stop offset="100%" stopColor="var(--ins-text-highlight)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="22" x2="280" y2="22" stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3"/>
                  <line x1="0" y1="52" x2="280" y2="52" stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3"/>
                  <path d="M0,32 L18,30 L36,34 L54,28 L72,22 L90,26 L108,20 L126,16 L144,18 L162,22 L168,58 L180,54 L198,50 L216,52 L234,46 L252,42 L270,40 L280,38 L280,84 L0,84 Z" fill="url(#hero-area-grad)"/>
                  <path d="M0,32 L18,30 L36,34 L54,28 L72,22 L90,26 L108,20 L126,16 L144,18 L162,22" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M162,22 L168,58 L180,54 L198,50 L216,52 L234,46 L252,42 L270,40 L280,38" fill="none" stroke="var(--ins-status-error-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="168" y1="0" x2="168" y2="84" stroke="rgba(248,113,113,0.25)" strokeDasharray="2,2"/>
                  <circle cx="168" cy="58" r="3.5" fill="var(--ins-status-error-fg)"/>
                </svg>
              </div>

              {/* Metric tiles */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px'}}>
                {[
                  {label:'Drop',     val:'−41%',     color:'var(--ins-status-error-fg)'},
                  {label:'Window',   val:'2h 14m',   color:'var(--ins-status-warning-fg)'},
                  {label:'Resolved', val:'18:30',    color:'var(--ins-status-success-fg)'},
                ].map((m,i) => (
                  <div key={i} style={{
                    background:'rgba(255,255,255,.025)',
                    border:'1px solid rgba(255,255,255,.06)',
                    borderRadius:'10px',
                    padding:'10px 12px',
                  }}>
                    <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'4px'}}>{m.label}</div>
                    <div style={{fontSize:'14px',fontWeight:500,color:m.color,fontFamily:'Geist Mono,monospace',letterSpacing:'-.01em'}}>{m.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating top-right resolved badge */}
            <div style={{
              position:'absolute',
              top:'-18px',
              right:'-14px',
              background:'linear-gradient(135deg, rgba(34,197,94,.2) 0%, rgba(13,17,23,0.95) 100%)',
              border:'1px solid rgba(34,197,94,.4)',
              borderRadius:'14px',
              padding:'10px 14px',
              boxShadow:'0 16px 40px rgba(34,197,94,0.18), 0 8px 24px rgba(0,0,0,0.5)',
              backdropFilter:'blur(16px)',
              WebkitBackdropFilter:'blur(16px)',
              display:'flex',alignItems:'center',gap:'10px',
              transform:'rotate(2.5deg)',
              zIndex:2,
            }}>
              <div style={{
                width:'8px',height:'8px',borderRadius:'50%',background:'var(--ins-status-success-fg)',
                flexShrink:0,
              }}/>
              <div>
                <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase'}}>Resolved</div>
                <div style={{fontSize:'12.5px',color:'var(--ins-status-success-fg)',fontWeight:500,fontFamily:'Geist Mono,monospace',marginTop:'1px'}}>checkout_complete</div>
              </div>
            </div>

            {/* Floating bottom-left ticket-deflection card */}
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
              minWidth:'160px',
              zIndex:2,
            }}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
                <span style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase'}}>Self-serve</span>
                <span style={{fontSize:'10.5px',color:'var(--ins-status-success-fg)',fontFamily:'Geist Mono,monospace',fontWeight:500}}>+72%</span>
              </div>
              <div style={{display:'flex',alignItems:'flex-end',gap:'2.5px',height:'24px',marginBottom:'6px'}}>
                {[40,52,48,60,72,68,82,78,92].map((v,i)=>(
                  <div key={i} style={{
                    flex:1,
                    height:`${v}%`,
                    background: i>=6 ? 'linear-gradient(180deg,var(--ins-text-highlight),var(--ins-button-primary-bg-hover))' : 'rgba(14,196,193,0.32)',
                    borderRadius:'2px 2px 0 0',
                    minHeight:'4px',
                  }}/>
                ))}
              </div>
              <div style={{fontSize:'11px',color:'var(--ins-text-body)',fontWeight:400}}>Ad hoc tickets ↓ this week</div>
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
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace'}}>The Problem</span>
          </div>
          <h2 className="ins-text-display mb-3">
            Data teams spend 80% of time on reporting
          </h2>
          <p className="ins-text-body-lg" style={{maxWidth:'460px',margin:'0 auto'}}>
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
      name:'PostgreSQL', bg:'rgba(51,103,145,.12)', desc:'Data warehouse',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#336791" strokeWidth="1.5" fill="#336791" fillOpacity=".15"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#336791" strokeWidth="1.5" fill="none"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="#336791" strokeWidth="1.2" fill="none"/>
        <circle cx="18" cy="8" r="2.5" fill="#336791" fillOpacity=".6" stroke="#336791" strokeWidth="1"/>
      </svg>,
    },
    {
      name:'BigQuery', bg:'rgba(66,133,244,.12)', desc:'Cloud analytics',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285f4"/>
        <path d="M2 17l10 5 10-5" stroke="#34a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M2 12l10 5 10-5" stroke="#fbbc04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>,
    },
    {
      name:'Snowflake', bg:'rgba(41,181,232,.12)', desc:'Data platform',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="2" x2="12" y2="22" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <line x1="2" y1="7" x2="22" y2="17" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="7" x2="2" y2="17" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="2" r="1.5" fill="#29b5e8"/>
        <circle cx="12" cy="22" r="1.5" fill="#29b5e8"/>
        <circle cx="2" cy="7" r="1.5" fill="#29b5e8"/>
        <circle cx="22" cy="17" r="1.5" fill="#29b5e8"/>
        <circle cx="22" cy="7" r="1.5" fill="#29b5e8"/>
        <circle cx="2" cy="17" r="1.5" fill="#29b5e8"/>
        <circle cx="12" cy="12" r="2.5" fill="#29b5e8"/>
      </svg>,
    },
    {
      name:'Redshift', bg:'rgba(140,79,255,.12)', desc:'Data warehouse',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="7" rx="9" ry="3" stroke="#8c4fff" strokeWidth="1.5" fill="#8c4fff" opacity=".15"/>
        <path d="M3 7v5c0 1.66 4.03 3 9 3s9-1.34 9-3V7" stroke="#8c4fff" strokeWidth="1.5" fill="none"/>
        <path d="M3 12v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5" stroke="#8c4fff" strokeWidth="1.5" fill="none"/>
      </svg>,
    },
    {
      name:'Databricks', bg:'rgba(228,23,63,.12)', desc:'Data lakehouse',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 8v8l-10 6L2 16V8L12 2z" fill="#e4173f" fillOpacity=".15" stroke="#e4173f" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 2v20M2 8l10 6 10-6" stroke="#e4173f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
    },
    {
      name:'Fivetran', bg:'rgba(0,115,230,.12)', desc:'Data pipelines',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7" stroke="#0073e6" strokeWidth="1.5" fill="none"/>
      </svg>,
    },
    {
      name:'Airbyte', bg:'rgba(97,94,240,.12)', desc:'Open-source ELT',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 12L12 4l8 8-8 8-8-8z" fill="#615ef0" fillOpacity=".15" stroke="#615ef0" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 4l4 4-4 4-4-4 4-4z" fill="#615ef0" fillOpacity=".6"/>
        <line x1="12" y1="12" x2="12" y2="20" stroke="#615ef0" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>,
    },
    {
      name:'Stripe', bg:'rgba(99,91,255,.12)', desc:'Billing data',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" fill="#635bff"/>
      </svg>,
    },
    {
      name:'HubSpot', bg:'rgba(255,122,89,.12)', desc:'CRM data',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="#ff7a59"/>
        <line x1="12" y1="3.5" x2="12" y2="9" stroke="#ff7a59" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="12" y1="15" x2="12" y2="20.5" stroke="#ff7a59" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="3.5" y1="12" x2="9" y2="12" stroke="#ff7a59" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="15" y1="12" x2="20.5" y2="12" stroke="#ff7a59" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="12" cy="3.5" r="1.8" fill="#ff7a59"/>
        <circle cx="12" cy="20.5" r="1.8" fill="#ff7a59"/>
        <circle cx="3.5" cy="12" r="1.8" fill="#ff7a59"/>
        <circle cx="20.5" cy="12" r="1.8" fill="#ff7a59"/>
      </svg>,
    },
    {
      name:'Salesforce', bg:'rgba(0,161,224,.12)', desc:'CRM data',
      icon: <svg width="22" height="16" viewBox="0 0 66 46" fill="none">
        <path d="M27.5 5.8a13.2 13.2 0 0 1 9.7-4.3c5 0 9.4 2.8 11.7 6.9a14.6 14.6 0 0 1 6.7-1.6C62.7 6.8 69 13.1 69 21s-6.3 14.2-14.4 14.2H15C7.7 35.2 1.8 29.3 1.8 22c0-6.5 4.7-11.9 10.9-13.3a13.2 13.2 0 0 1 14.8-2.9z" fill="#00a1e0"/>
      </svg>,
    },
    {
      name:'Mixpanel', bg:'rgba(120,86,255,.12)', desc:'Event data',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#7856ff" opacity=".15"/>
        <circle cx="8" cy="12" r="2.5" fill="#7856ff"/>
        <circle cx="16" cy="12" r="2.5" fill="#7856ff"/>
        <circle cx="12" cy="7" r="2.5" fill="#7856ff"/>
        <circle cx="12" cy="17" r="2.5" fill="#7856ff"/>
      </svg>,
    },
    {
      name:'Amplitude', bg:'rgba(25,124,230,.12)', desc:'Behavioral data',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l4-8 4 10 3-6 2 4 5-12" stroke="#197ce6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
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
      name:'Looker', bg:'rgba(161,66,244,.12)', desc:'BI & dashboards',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="6" stroke="#a142f4" strokeWidth="1.5" fill="none"/>
        <circle cx="12" cy="12" r="3" fill="#a142f4" fillOpacity=".4" stroke="#a142f4" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="1.2" fill="#a142f4"/>
      </svg>,
    },
    {
      name:'Tableau', bg:'rgba(233,118,39,.12)', desc:'Data visualization',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="8" width="3.5" height="13" rx="1" fill="#e97627"/>
        <rect x="8.5" y="4" width="3.5" height="17" rx="1" fill="#e97627" fillOpacity=".7"/>
        <rect x="14" y="11" width="3.5" height="10" rx="1" fill="#e97627" fillOpacity=".5"/>
        <rect x="19.5" y="6" width="2" height="15" rx="1" fill="#4e7ec2" fillOpacity=".6"/>
      </svg>,
    },
    {
      name:'ClickHouse', bg:'rgba(255,204,1,.12)', desc:'Columnar warehouse',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2.5" y="3" width="3.2" height="18" rx="0.5" fill="#FFCC01"/>
        <rect x="7" y="3" width="3.2" height="18" rx="0.5" fill="#FFCC01"/>
        <rect x="11.5" y="3" width="3.2" height="18" rx="0.5" fill="#FFCC01"/>
        <rect x="16" y="3" width="3.2" height="18" rx="0.5" fill="#FFCC01"/>
        <rect x="20.5" y="10" width="1.2" height="4" rx="0.4" fill="#FFCC01"/>
      </svg>,
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'56px'}}>
          <SectionHeader
            eyebrow="Your Data Sources"
            title="Connects to your entire data stack"
            lede="Insightis integrates with your warehouses, transformation tools, and source systems."
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
                <div style={{fontSize:'11px',color:'var(--ins-text-inactive)',marginTop:'2px'}}>{c.desc}</div>
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
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace'}}>Metrics That Matter</span>
          </div>
          <h2 className="ins-text-display mb-3">
            Every KPI a data team monitors
          </h2>
          <p className="ins-text-body-lg" style={{maxWidth:'460px',margin:'0 auto'}}>
            Ask about any of these — or any metric you define — in plain English.
          </p>
        </div>

        <div style={{display:'flex',flexWrap:'wrap',gap:'10px',justifyContent:'center',marginBottom:'28px'}}>
          {metrics.map((m,i) => (
            <span key={i} className="metric-pill">{m}</span>
          ))}
        </div>

        <p className="ins-text-body-sm ins-text--muted ins-text--mono ins-text--italic" style={{textAlign:'center'}}>
          These are just examples — ask about any metric in plain English.
        </p>
      </div>
    </section>
  );
}

/* ── BEFORE / AFTER ── */
function BeforeAfter() {
  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'52px'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace'}}>The Difference</span>
          </div>
          <h2 className="ins-text-display mb-3">
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
              'Every metric has one definition',
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
            <span className="ins-text-body-lg" style={{whiteSpace:'nowrap'}}>more time for real analysis. Self-serve deflects 80% of ad hoc requests.</span>
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
          title={<>Stop being a <BottomCTA.Highlight>reporting service.</BottomCTA.Highlight> Start doing <BottomCTA.Highlight> real analysis.</BottomCTA.Highlight></>}
          inputPlaceholder="What data question can Insightis answer for your team..."
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
          color:'var(--ins-text-heading)',
          letterSpacing:'-.025em',
          lineHeight:1.2,
          marginBottom:'18px',
        }}>
          Stop being a <span style={{color:'var(--ins-text-highlight)'}}>reporting service.</span> Start doing <span style={{color:'var(--ins-text-highlight)'}}>real analysis.</span>
        </h2>
        <p className="ins-text-body-lg" style={{marginBottom:'28px'}}>
          Sound familiar? These are the problems Insightis eliminates.
        </p>
        <a href="#spotlights" style={{
          display:'inline-flex',alignItems:'center',gap:'8px',
          padding:'10px 20px',borderRadius:'999px',
          border:'1px solid rgba(255,255,255,.12)',
          color:'var(--ins-text-body)',fontSize:'14px',fontWeight:400,
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
      <div style={{padding:'14px 18px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:'10px',flexShrink:0}}>
        <div style={{display:'flex',gap:'5px'}}>
          {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
            <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.6}}/>
          ))}
        </div>
        <div style={{flex:1,textAlign:'center',fontSize:'12px',color:'var(--ins-text-inactive)',fontFamily:'Geist Mono, monospace'}}>
          self-serve · marketing
        </div>
      </div>
      <div style={{padding:'22px 18px',display:'flex',flexDirection:'column',gap:'12px',flex:1,justifyContent:'center'}}>
        <div className="chat-bubble-user">
          What's our blended CAC by channel for Q1?
        </div>
        <div className="chat-bubble-ai">
          Blended CAC for Q1 across paid channels: $148. Paid Search $132, Paid Social $164, Display $189. Sourced from <span style={{color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',fontSize:'12px'}}>marketing.fct_cac</span> — governed by your Semantic Layer.
          <MiniBarChart data={[132, 164, 189, 148]} color="var(--ins-text-highlight)"/>
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
      <div style={{flex:1,textAlign:'center',fontSize:'12px',color:'var(--ins-text-inactive)',fontFamily:'Geist Mono, monospace'}}>
        {label}
      </div>
    </div>
  );
}

function SpotlightSemantic() {
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
      <ChromeHeader label="semantic layer · cac" />
      <div style={{padding:'26px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'18px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{width:'34px',height:'34px',borderRadius:'9px',background:'rgba(9,160,157,.1)',border:'1px solid rgba(9,160,157,.25)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h12"/></svg>
            </div>
            <div>
              <div style={{fontFamily:'Geist Mono,monospace',fontSize:'14px',color:'var(--ins-color-gray-100)',fontWeight:500}}>customer_acquisition_cost</div>
              <div style={{fontSize:'11px',color:'var(--ins-text-inactive)',marginTop:'2px'}}>Owned by Data Engineering · v3.2</div>
            </div>
          </div>
          <span style={{
            display:'inline-flex',alignItems:'center',gap:'5px',
            padding:'4px 10px',borderRadius:'999px',
            background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.3)',
            fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'var(--ins-status-success-fg)',
            letterSpacing:'.06em',textTransform:'uppercase',
          }}>
            <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--ins-status-success-fg)',boxShadow:'0 0 6px var(--ins-status-success-fg)'}}/>
            Certified
          </span>
        </div>
        <div style={{
          background:'rgba(255,255,255,.025)',
          border:'1px solid rgba(255,255,255,.06)',
          borderRadius:'10px',
          padding:'14px',
          marginBottom:'14px',
          fontFamily:'Geist Mono,monospace',
          fontSize:'12.5px',
          lineHeight:1.6,
          color:'var(--ins-text-body)',
        }}>
          <span style={{color:'var(--ins-text-body)'}}>SUM</span>(<span style={{color:'var(--ins-text-highlight)'}}>marketing_spend</span>) <span style={{color:'var(--ins-text-body)'}}>/</span> <span style={{color:'var(--ins-text-body)'}}>COUNT</span>(<span style={{color:'var(--ins-text-highlight)'}}>new_customers</span>)
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {[
            {label:'Source', val:'marketing.fct_spend, sales.dim_customers'},
            {label:'Lineage', val:'Snowflake → Semantic Layer → Insightis'},
            {label:'Used by', val:'17 reports · 4 teams'},
          ].map((row,i) => (
            <div key={i} style={{display:'flex',gap:'12px',fontSize:'12px'}}>
              <span style={{minWidth:'70px',color:'var(--ins-text-inactive)',fontFamily:'Geist Mono,monospace',letterSpacing:'.04em',textTransform:'uppercase',fontSize:'10px',paddingTop:'2px'}}>{row.label}</span>
              <span style={{color:'var(--ins-text-body)'}}>{row.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotlightAnomalies() {
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
      <ChromeHeader label="analysis · revenue" />
      <div style={{padding:'20px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* User question */}
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'10px'}}>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'var(--ins-text-inactive)',letterSpacing:'.08em',textTransform:'uppercase'}}>asked</span>
          <span style={{fontSize:'12.5px',color:'var(--ins-text-body)'}}>"Why was revenue lower last week?"</span>
        </div>

        {/* Headline finding */}
        <div style={{
          display:'flex',alignItems:'center',gap:'10px',
          padding:'10px 12px',marginBottom:'12px',
          background:'rgba(248,113,113,.06)',border:'1px solid rgba(248,113,113,.22)',
          borderRadius:'10px',
        }}>
          <span style={{
            width:'8px',height:'8px',borderRadius:'50%',background:'var(--ins-status-error-fg)',
            boxShadow:'0 0 8px var(--ins-status-error-fg)',flexShrink:0,
          }}/>
          <span style={{fontSize:'12.5px',color:'var(--ins-color-gray-100)',lineHeight:1.45}}>
            <span style={{fontWeight:500,color:'var(--ins-status-error-fg)'}}>−41%</span> drop in <span style={{fontFamily:'Geist Mono,monospace',color:'var(--ins-text-highlight)',fontSize:'11.5px'}}>checkout_complete</span> on Tue, 14:00–16:00 UTC
          </span>
        </div>

        {/* Chart with annotated anomaly */}
        <div style={{
          background:'rgba(255,255,255,.018)',
          border:'1px solid rgba(255,255,255,.05)',
          borderRadius:'10px',
          padding:'12px 12px 8px',
          marginBottom:'12px',
          position:'relative',
        }}>
          <svg viewBox="0 0 280 60" width="100%" height="60" preserveAspectRatio="none" style={{display:'block'}}>
            <defs>
              <linearGradient id="anom-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--ins-text-highlight)" stopOpacity="0.32"/>
                <stop offset="100%" stopColor="var(--ins-text-highlight)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <line x1="0" y1="18" x2="280" y2="18" stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3"/>
            <line x1="0" y1="38" x2="280" y2="38" stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3"/>
            <path d="M0,24 L20,22 L40,26 L60,20 L80,18 L100,22 L120,16 L140,14 L160,18 L168,46 L180,42 L200,38 L220,40 L240,34 L260,30 L280,28 L280,60 L0,60 Z" fill="url(#anom-area)"/>
            <path d="M0,24 L20,22 L40,26 L60,20 L80,18 L100,22 L120,16 L140,14 L160,18" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M160,18 L168,46 L180,42 L200,38 L220,40 L240,34 L260,30 L280,28" fill="none" stroke="var(--ins-status-error-fg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="168" y1="0" x2="168" y2="60" stroke="rgba(248,113,113,0.3)" strokeDasharray="2,2"/>
            <circle cx="168" cy="46" r="3" fill="var(--ins-status-error-fg)"/>
            <circle cx="168" cy="46" r="3" fill="none" stroke="var(--ins-status-error-fg)" strokeWidth="1.2" opacity="0.5">
              <animate attributeName="r" from="3" to="11" dur="1.6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" from="0.6" to="0" dur="1.6s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        {/* 2 explanatory micro-cards */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
          <div style={{
            background:'rgba(255,255,255,.025)',
            border:'1px solid rgba(255,255,255,.06)',
            borderRadius:'10px',
            padding:'9px 11px',
          }}>
            <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'3px'}}>Where</div>
            <div style={{fontSize:'12px',color:'var(--ins-color-gray-100)'}}>87% on mobile</div>
          </div>
          <div style={{
            background:'rgba(255,255,255,.025)',
            border:'1px solid rgba(255,255,255,.06)',
            borderRadius:'10px',
            padding:'9px 11px',
          }}>
            <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'3px'}}>Recovered</div>
            <div style={{fontSize:'12px',color:'var(--ins-status-success-fg)'}}>18:30 UTC</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightStack() {
  const sources = [
    { name:'Snowflake', color:'#29b5e8', bg:'rgba(41,181,232,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="2" x2="12" y2="22" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <line x1="2" y1="7" x2="22" y2="17" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="7" x2="2" y2="17" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2.5" fill="#29b5e8"/>
      </svg>},
    { name:'BigQuery', color:'#4285f4', bg:'rgba(66,133,244,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285f4"/>
        <path d="M2 17l10 5 10-5" stroke="#34a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M2 12l10 5 10-5" stroke="#fbbc04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>},
    { name:'Redshift', color:'#8c4fff', bg:'rgba(140,79,255,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="7" rx="9" ry="3" stroke="#8c4fff" strokeWidth="1.5" fill="#8c4fff" opacity=".2"/>
        <path d="M3 7v5c0 1.66 4.03 3 9 3s9-1.34 9-3V7" stroke="#8c4fff" strokeWidth="1.5" fill="none"/>
        <path d="M3 12v5c0 1.66 4.03 3 9 3s9-1.34 9-3v-5" stroke="#8c4fff" strokeWidth="1.5" fill="none"/>
      </svg>},
    { name:'Databricks', color:'#e4173f', bg:'rgba(228,23,63,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L22 8v8l-10 6L2 16V8L12 2z" fill="#e4173f" fillOpacity=".18" stroke="#e4173f" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 2v20M2 8l10 6 10-6" stroke="#e4173f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
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
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(9,160,157,.06) 0%, transparent 70%)',pointerEvents:'none'}}/>
      <ChromeHeader label="stack · architecture" />
      <div style={{padding:'24px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center',position:'relative'}}>
        {/* Section label */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:'10px'}}>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'var(--ins-text-inactive)',letterSpacing:'.1em',textTransform:'uppercase'}}>your warehouse</span>
        </div>

        {/* Source tiles row */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px',marginBottom:'14px'}}>
          {sources.map((s,i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,.025)',
              border:`1px solid ${s.color}33`,
              borderRadius:'12px',
              padding:'12px 6px',
              display:'flex',flexDirection:'column',alignItems:'center',gap:'7px',
              minWidth:0,
            }}>
              <div style={{
                width:'34px',height:'34px',borderRadius:'9px',
                background:s.bg,
                display:'flex',alignItems:'center',justifyContent:'center',
              }}>{s.icon}</div>
              <div style={{fontSize:'11px',fontWeight:500,color:'var(--ins-color-gray-100)',textAlign:'center'}}>{s.name}</div>
            </div>
          ))}
        </div>

        {/* Connector arrow */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:'10px'}}>
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <path d="M7 1v18m0 0l-5-5m5 5l5-5" stroke="var(--ins-text-highlight)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity=".55"/>
          </svg>
        </div>

        {/* Insightis destination */}
        <div style={{
          background:'linear-gradient(135deg, rgba(9,160,157,.14) 0%, rgba(9,160,157,.06) 100%)',
          border:'1px solid rgba(9,160,157,.35)',
          borderRadius:'12px',
          padding:'12px 14px',
          display:'flex',alignItems:'center',gap:'12px',
        }}>
          <div style={{
            width:'36px',height:'36px',borderRadius:'10px',
            background:'rgba(9,160,157,.18)',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
          }}>
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none">
              <path d="M25.5 10.4L21.7 12.7L25.5 15.1L12.7 22.8L0 15.1L3.8 12.7L0 10.4L5.7 6.9L7.6 8.1L3.8 10.4L12.7 15.8L21.7 10.4L17.8 8.1L19.8 6.9L25.5 10.4Z" fill="var(--ins-text-highlight)"/>
            </svg>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:'13px',fontWeight:600,color:'var(--ins-color-gray-100)'}}>Insightis</div>
            <div style={{fontSize:'10.5px',color:'var(--ins-text-inactive)',fontFamily:'Geist Mono,monospace',letterSpacing:'.04em',textTransform:'uppercase',marginTop:'2px'}}>Semantic Layer</div>
          </div>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'var(--ins-text-highlight)',padding:'3px 9px',borderRadius:'999px',background:'rgba(9,160,157,.1)',border:'1px solid rgba(9,160,157,.25)',letterSpacing:'.08em',textTransform:'uppercase'}}>connected</span>
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
      title:'Stop the repeat questions',
      body:'Insightis sits on top of your Semantic Layer and answers business questions in plain English — so your team focuses on analysis, not reporting.',
      bullets:['Conversational answers across every team','Backlog of ad hoc SQL stops growing'],
      visual:<SpotlightChat />,
    },
    {
      eyebrow:'Semantic Layer',
      title:'One source of truth',
      body:'Marketing and Finance define CAC differently. With a governed Semantic Layer, every team works from the same numbers — owned and versioned.',
      bullets:['One certified definition per metric','Versioning, ownership, and lineage built in'],
      visual:<SpotlightSemantic />,
    },
    {
      eyebrow:'Anomaly Detection',
      title:'Spot what dashboards miss',
      body:'Insightis scans every answer for outliers, regime shifts, and breakdowns that explain what changed — no separate dashboard required.',
      bullets:['Outliers flagged inside every answer','Drill into causes without writing SQL'],
      visual:<SpotlightAnomalies />,
    },
    {
      eyebrow:'Stack-Native',
      title:'Connect any warehouse, any source',
      body:'Insightis runs on top of Snowflake, BigQuery, Redshift, or Databricks. No data movement — permissions and lineage stay where they belong.',
      bullets:['Works with every major data warehouse','Zero data movement, zero shadow modeling'],
      visual:<SpotlightStack />,
    },
  ];

  return (
    <section id="spotlights" style={{padding:'80px 0 100px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'72px'}}>
          <SectionHeader
            eyebrow="How it works"
            title="Built for how data teams work"
            lede="Four capabilities that turn the data team from a reporting service into a strategic function."
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
                  <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'18px'}}>
                    <span style={{fontSize:'12px'}}>✦</span>
                    <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace'}}>{s.eyebrow}</span>
                  </div>
                  <h3 className="ins-text-h2" style={{marginBottom:'18px'}}>
                    {s.title}
                  </h3>
                  <p className="ins-text-body-lg" style={{marginBottom:'22px'}}>
                    {s.body}
                  </p>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
                    {s.bullets.map((b,bi) => (
                      <li key={bi} style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',color:'var(--ins-text-body)',lineHeight:1.55}}>
                        <CheckIcon size={12} style={{flexShrink:0,marginTop:'4px'}} />
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
      title:'Self-serve for non-technical teams',
      desc:'Business users self-serve in plain English — sales, marketing, and product stop pinging the data team for repetitive questions.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 3H5a2 2 0 0 0-2 2v3m6-5h6M8 3v18m8-18v18M16 3h3a2 2 0 0 1 2 2v3M2 9h20M2 15h20M2 21h3m16 0h3" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Governed metric definitions',
      desc:'One Semantic Layer governs all definitions — every team works from the same numbers, owned and versioned by your data team.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Proactive pipeline monitoring',
      desc:'Anomalies surface before anyone complains. Freshness, drops, and schema changes flag the moment they happen.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><path d="M7 9h10M7 13h6" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Ad hoc analysis without SQL',
      desc:'Complex questions answered without SQL — the team spends time on real analysis instead of clearing a never-ending ticket queue.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><line x1="12" y1="9" x2="12" y2="13" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="var(--ins-text-highlight)" strokeWidth="2" strokeLinecap="round"/></svg>,
      title:'Schema drift caught automatically',
      desc:'Schema changes flagged automatically — when an upstream column changes, you know which downstream models break before the metric does.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="12" width="4" height="9" rx="1" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><rect x="9" y="7" width="4" height="14" rx="1" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><rect x="16" y="3" width="4" height="18" rx="1" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/></svg>,
      title:'Measurable data team impact',
      desc:'Data impact visible and measurable — see deflected requests, decisions unblocked, and the ROI of the data platform.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
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
              <h3 style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:500,color:'var(--ins-text-heading)',letterSpacing:'-.03em',lineHeight:1.2,marginBottom:'8px'}}>
                See it on <span style={{color:'var(--ins-button-primary-bg)'}}>your own data</span>.
              </h3>
              <p className="ins-text-body">
                Connect your warehouse and ask Insightis a real question your team gets every week.
              </p>
            </div>
            <Button as="a" href="https://insightis-app.devart.info/register" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
              Get started for free
            </Button>
          </div>
        </div>
        <div style={{marginBottom:'56px'}}>
          <SectionHeader
            eyebrow="Use cases"
            title="What data teams use Insightis for"
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
              <h3 style={{fontSize:'15px',fontWeight:600,color:'var(--ins-text-heading-soft)',marginBottom:'6px'}}>{c.title}</h3>
              <p className="ins-text-body">{c.desc}</p>
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
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace'}}>Stories</span>
          </div>
          <h2 className="ins-text-display mb-3">
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
      q:'Does Insightis replace our existing data models or sit on top of them?',
      a:'It sits on top. Insightis reads your warehouse models directly — no shadow modeling, no parallel definitions. Your Semantic Layer stays where it belongs, in your warehouse, owned by your data team.',
    },
    {
      q:'What happens when teams have conflicting metric definitions?',
      a:'Definitions are resolved at the Semantic Layer, not in the BI tool. Each metric has one certified version, an owner, and a version history. When someone tries to redefine CAC in a chat, Insightis answers using the governed definition and links to the source.',
    },
    {
      q:'How does it handle schema drift on upstream sources?',
      a:'When you ask a question, Insightis surfaces upstream changes that affected the answer — renamed columns, dropped tables, type changes — alongside the downstream blast radius (which models, which reports, which metrics). You see it inside the analysis instead of after a dashboard breaks.',
    },
    {
      q:'Will this coexist with our existing BI tool (Looker, Tableau)?',
      a:'Yes. Most teams keep Looker or Tableau for curated dashboards and use Insightis for the long-tail questions that would otherwise become SQL tickets. Both can read the same Semantic Layer.',
    },
    {
      q:'How long does implementation take?',
      a:'Most data teams are answering real questions within a week — connect your warehouse, register your top 10–20 metrics in the Semantic Layer, and start asking. Broader rollout to business teams typically follows in the second or third week.',
    },
    {
      q:'How is security and access handled?',
      a:'Insightis respects your warehouse permissions — every query runs as the connected role, so row-level and column-level security you already have stays in force. No data is moved out of your warehouse.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'880px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'52px'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace'}}>FAQ</span>
          </div>
          <h2 className="ins-text-display mb-3">
            Questions data teams ask
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
