import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import Card from '../components/Card';
import Chip from '../components/Chip';
import CodeChip from '../components/CodeChip';
import BottomCTA from '../components/BottomCTA';
import StepsProcess from '../components/StepsProcess';
import CheckIcon from '../components/CheckIcon';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/* ── HERO CANVAS — Chaotic data connections calming down ── */
/* ── HERO CANVAS — Sources converge → green orb → disappear ── */
/* ── HERO CANVAS ── */
/* ── HERO CANVAS ── */
/* ── HERO CANVAS ── */
/* ── HERO CANVAS ── */
function InsightisIcon({size=20}) {
  return (
    <svg width={size} height={Math.round(size*0.895)} viewBox="0 0 25.5 22.84" fill="none">
      <path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/>
    </svg>
  );
}

function SemanticLayerMockAnimation() {
  const RAW_METRICS = [
    { source:'Stripe',     short:'S',  color:'#635BFF', name:'Revenue',  value:'$47,200' },
    { source:'Sheets',     short:'G',  color:'#0F9D58', name:'Revenue',  value:'$52,000' },
    { source:'HubSpot',    short:'H',  color:'#FF7A59', name:'Revenue',  value:'$44,800' },
    { source:'Postgres',   short:'P',  color:'#4C9AD6', name:'MRR',      value:'???'     },
    { source:'GA4',        short:'G4', color:'#E37400', name:'CAC',      value:'$445'    },
    { source:'HubSpot',    short:'H',  color:'#FF7A59', name:'CAC',      value:'$312'    },
    { source:'Salesforce', short:'SF', color:'#00A1E0', name:'Pipeline', value:'$1.2M'   },
    { source:'Mixpanel',   short:'M',  color:'#7856FF', name:'Churn',    value:'3.4%'    },
    { source:'Zendesk',    short:'Z',  color:'#03363D', name:'Churn',    value:'2.1%'    },
  ];
  const CERT_METRICS = [
    { name:'@Revenue',  value:'$47,200', source:'Stripe · certified' },
    { name:'@MRR',      value:'$12,400', source:'Formula · certified' },
    { name:'@CAC',      value:'$431',    source:'Formula · certified' },
    { name:'@Churn',    value:'2.8%',    source:'Blended · certified' },
    { name:'@Pipeline', value:'$1.2M',   source:'Salesforce · certified' },
    { name:'@LTV',      value:'$2,900',  source:'Formula · certified' },
  ];
  const THINK_STEPS = [
    'Resolving naming conflicts (3 Revenue → 1)',
    'Analyzing semantic structure',
    'Checking fields description',
    'Aligning results across sources',
    'Certifying canonical metrics',
  ];

  const STREAM_START   = 700;
  const STREAM_STEP    = 500;
  const STREAM_END     = STREAM_START + RAW_METRICS.length * STREAM_STEP;
  const RAW_COLLAPSE   = STREAM_END + 1300;
  const THINKING_START = RAW_COLLAPSE + 900;
  const STEP_GAP       = 1100;
  const STEP_TIMES     = THINK_STEPS.map((_,i) => THINKING_START + 600 + i * STEP_GAP);
  const THINK_DONE     = STEP_TIMES[STEP_TIMES.length - 1] + 1100;
  const THINK_COLLAPSE = THINK_DONE + 750;
  const CERT_START     = THINK_COLLAPSE + 800;
  const CERT_STEP      = 450;
  const FINAL_STATE    = CERT_START + CERT_METRICS.length * CERT_STEP + 1400;

  const startRef = useRef(null);
  const [tick, setTick] = React.useState(0);

  useEffect(() => {
    let raf;
    function loop(ts){
      if(!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      if(elapsed >= FINAL_STATE){ setTick(FINAL_STATE); return; }
      setTick(elapsed);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    const doneTimer = setTimeout(()=>setTick(FINAL_STATE), FINAL_STATE + 300);
    return ()=>{ cancelAnimationFrame(raf); clearTimeout(doneTimer); };
  }, []);

  const t = tick;
  const windowOpacity = Math.min(1, t / 380);
  const shownRaw = Math.max(0, Math.min(RAW_METRICS.length, Math.floor((t - STREAM_START) / STREAM_STEP) + 1));

  const showRawScreen      = t < RAW_COLLAPSE + 350;
  const rawCollapsing      = t >= RAW_COLLAPSE;
  const showThinkScreen    = t >= THINKING_START && t < THINK_COLLAPSE + 350;
  const thinkCollapsing    = t >= THINK_COLLAPSE;
  const showCertScreen     = t >= CERT_START;

  const stepsDone  = STEP_TIMES.map((_, i) => t >= (STEP_TIMES[i + 1] || THINK_DONE));
  const stepsShown = STEP_TIMES.map(time => t >= time);
  const allStepsDone = t >= THINK_DONE;

  const rawByName = {};
  RAW_METRICS.slice(0, shownRaw).forEach(m => { rawByName[m.name] = (rawByName[m.name] || 0) + 1; });
  const conflictPhase = shownRaw >= 3 && !rawCollapsing;
  const conflictCount = Object.values(rawByName).filter(c => c > 1).length +
                        (RAW_METRICS.slice(0, shownRaw).some(m => m.value === '???') ? 1 : 0);

  // Header label reflects the active phase
  const phaseLabel = showCertScreen ? 'certified' : (t >= THINKING_START ? 'processing' : 'ingesting');
  const phaseColor = showCertScreen ? 'rgba(14,196,193,0.85)' : (t >= THINKING_START ? 'rgba(255,180,100,0.9)' : 'rgba(255,255,255,0.7)');
  const phaseDot   = showCertScreen ? 'var(--ins-text-highlight)' : (t >= THINKING_START ? '#FFB464' : '#9BBEC8');

  return (
    <div style={{
      borderRadius:'16px',
      border:'1px solid rgba(255,255,255,0.09)',
      background:'#0C1117',
      overflow:'hidden',
      display:'flex',
      flexDirection:'column',
      height:'500px',
      boxShadow:'none',
    }}>

      {/* ── Header ── */}
      <div style={{padding:'12px 18px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,0.015)', flexShrink:0}}>
        <div style={{display:'flex', gap:'6px'}}>
          {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
            <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.6}}/>
          ))}
        </div>
        <div style={{flex:1, textAlign:'center', fontSize:'12px', color:'#8AA6B3', fontFamily:'Geist Mono, monospace', letterSpacing:'.02em'}}>
          insightis — semantic layer
        </div>
        <div style={{width:'46px'}}/>
      </div>

      {/* ── Body: one screen at a time ── */}
      <div style={{flex:1, position:'relative', overflow:'hidden'}}>

        {/* Screen 1: Raw ingest */}
        <div style={{
          position:'absolute', inset:0, padding:'14px 16px',
          display:'flex', flexDirection:'column', justifyContent:'center',
          opacity: rawCollapsing ? 0 : 1,
          transform: rawCollapsing ? 'translateY(-12px)' : 'translateY(0)',
          transition:'opacity .4s ease, transform .5s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: showRawScreen ? 'auto' : 'none',
        }}>
          <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px', paddingLeft:'2px'}}>
            <span style={{fontSize:'9.5px', color:'rgba(255,255,255,0.4)', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'Geist Mono,monospace'}}>Incoming from sources</span>
            {conflictPhase && (
              <span style={{
                display:'inline-flex', alignItems:'center', gap:'4px',
                padding:'2px 7px', borderRadius:'999px',
                background:'rgba(255,150,70,0.1)', border:'1px solid rgba(255,150,70,0.3)',
                fontSize:'9.5px', color:'rgba(255,180,100,0.95)', fontFamily:'Geist Mono,monospace', fontWeight:600, letterSpacing:'0.04em',
                animation:'fadeIn .3s ease both',
              }}>
                <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#FFB464',animation:'pulse 1.2s ease-in-out infinite'}}/>
                {conflictCount} conflict{conflictCount===1?'':'s'} detected
              </span>
            )}
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
            {RAW_METRICS.slice(0, shownRaw).map((m, i) => {
              const isConflict = conflictPhase && (rawByName[m.name] > 1 || m.value === '???');
              return (
                <div key={i} style={{
                  display:'grid', gridTemplateColumns:'82px 1fr 82px 12px', alignItems:'center', gap:'10px',
                  padding:'5px 10px', borderRadius:'8px',
                  background: isConflict ? 'rgba(255,150,70,0.045)' : 'rgba(255,255,255,0.025)',
                  border: isConflict ? '1px solid rgba(255,150,70,0.22)' : '1px solid rgba(255,255,255,0.06)',
                  animation:'slideUp .28s ease both',
                  transition:'background .35s ease, border-color .35s ease',
                }}>
                  <div style={{display:'flex', alignItems:'center', gap:'6px', minWidth:0}}>
                    <span style={{
                      width:'16px', height:'16px', borderRadius:'4px', flexShrink:0,
                      background:`${m.color}22`, border:`1px solid ${m.color}55`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'8.5px', fontWeight:700, color:m.color, fontFamily:'Geist Mono,monospace',
                    }}>{m.short}</span>
                    <span style={{fontSize:'10.5px', color:'rgba(255,255,255,0.7)', fontFamily:'Geist Mono,monospace', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{m.source}</span>
                  </div>
                  <span style={{fontSize:'12px', color:'#D2E2E8', fontWeight:500}}>{m.name}</span>
                  <span style={{
                    fontSize:'12px', fontFamily:'Geist Mono,monospace',
                    color: m.value === '???' ? 'rgba(255,180,100,0.95)' : (isConflict ? 'rgba(255,205,150,0.92)' : '#9BBEC8'),
                    textAlign:'right', fontVariantNumeric:'tabular-nums', fontWeight:500,
                  }}>{m.value}</span>
                  <span style={{fontSize:'10px', color: isConflict ? 'rgba(255,180,100,0.85)' : 'rgba(255,255,255,0.2)', textAlign:'center'}}>
                    {isConflict ? '⚠' : '·'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Screen 2: Thinking (dedicated) */}
        <div style={{
          position:'absolute', inset:0, padding:'18px 20px',
          display:'flex', flexDirection:'column', justifyContent:'center',
          opacity: (t >= THINKING_START && !thinkCollapsing) ? 1 : 0,
          transform: thinkCollapsing ? 'translateY(-12px)' : (t >= THINKING_START ? 'translateY(0)' : 'translateY(12px)'),
          transition:'opacity .45s ease, transform .55s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: showThinkScreen ? 'auto' : 'none',
        }}>
          {/* Centered header */}
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', marginBottom:'22px'}}>
            <div style={{
              width:'52px', height:'52px', borderRadius:'14px',
              background:'radial-gradient(circle, rgba(14,196,193,0.18) 0%, rgba(14,196,193,0.04) 70%)',
              border:'1px solid rgba(14,196,193,0.22)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 32px rgba(14,196,193,0.18), inset 0 0 20px rgba(14,196,193,0.04)',
              animation:'corePulse 2.4s ease-in-out infinite',
            }}>
              <InsightisIcon size={26}/>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'9px'}}>
              <span style={{fontSize:'15px', color: allStepsDone ? 'rgba(14,196,193,0.8)' : '#E0EDF2', fontWeight:600, fontFamily:"var(--ins-font-family-sans)", letterSpacing:'-0.01em', transition:'color .4s ease'}}>
                {allStepsDone ? 'Structured' : 'Structuring metrics'}
              </span>
              {!allStepsDone && (
                <div style={{display:'flex', gap:'3px', alignItems:'center'}}>
                  {[0, 0.2, 0.4].map(d => (
                    <span key={d} style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--ins-text-highlight)',display:'block',animation:`pulse 1.2s ease-in-out ${d}s infinite`}}/>
                  ))}
                </div>
              )}
            </div>
            <span style={{fontSize:'11px', color:'rgba(255,255,255,0.4)', fontFamily:'Geist Mono,monospace', letterSpacing:'0.04em'}}>
              {shownRaw} raw inputs · {conflictCount} conflict{conflictCount===1?'':'s'} to resolve
            </span>
          </div>

          {/* Steps list */}
          <div style={{maxWidth:'400px', width:'100%', margin:'0 auto', display:'flex', flexDirection:'column', gap:'9px'}}>
            {THINK_STEPS.map((label, i) => {
              const shown = stepsShown[i];
              const done = stepsDone[i];
              const active = shown && !done;
              return (
                <div key={label} style={{
                  display:'flex', alignItems:'center', gap:'10px',
                  padding:'8px 12px', borderRadius:'8px',
                  background: done ? 'rgba(14,196,193,0.05)' : (active ? 'rgba(14,196,193,0.025)' : 'rgba(255,255,255,0.015)'),
                  border: done ? '1px solid rgba(14,196,193,0.22)' : (active ? '1px solid rgba(14,196,193,0.14)' : '1px solid rgba(255,255,255,0.05)'),
                  opacity: shown ? 1 : 0.35,
                  transform: shown ? 'translateX(0)' : 'translateX(-4px)',
                  transition:'all .35s ease',
                }}>
                  <span style={{
                    width:'18px', height:'18px', borderRadius:'50%', flexShrink:0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'9px', fontWeight:800,
                    background: done ? 'rgba(14,196,193,0.18)' : (active ? 'transparent' : 'rgba(255,255,255,0.04)'),
                    border: done ? '1px solid rgba(14,196,193,0.45)' : (active ? '1.5px solid rgba(14,196,193,0.7)' : '1px solid rgba(255,255,255,0.1)'),
                    color: done ? 'var(--ins-text-highlight)' : (active ? 'var(--ins-text-highlight)' : '#8AA6B3'),
                    transition:'all .3s ease',
                    animation: active ? 'pulse 1.3s ease-in-out infinite' : 'none',
                  }}>
                    {done ? '✓' : (i + 1)}
                  </span>
                  <span style={{
                    fontSize:'12.5px',
                    color: done ? 'rgba(14,196,193,0.85)' : (active ? '#E0EDF2' : 'var(--ins-text-inactive)'),
                    fontWeight: active ? 500 : 400,
                    transition:'color .35s ease',
                  }}>
                    {label}
                  </span>
                  {active && (
                    <span style={{marginLeft:'auto', fontSize:'10px', color:'rgba(14,196,193,0.7)', fontFamily:'Geist Mono,monospace', letterSpacing:'0.05em'}}>
                      running…
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Screen 3: Certified */}
        <div style={{
          position:'absolute', inset:0, padding:'14px 16px',
          display:'flex', flexDirection:'column', justifyContent:'center',
          opacity: showCertScreen ? 1 : 0,
          transform: showCertScreen ? 'translateY(0)' : 'translateY(12px)',
          transition:'opacity .45s ease, transform .55s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: showCertScreen ? 'auto' : 'none',
        }}>
          <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px', paddingLeft:'2px'}}>
            <span style={{fontSize:'9.5px', color:'rgba(14,196,193,0.9)', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'Geist Mono,monospace'}}>Certified semantic layer</span>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
            {CERT_METRICS.map((m, i) => {
              const shown = t >= CERT_START + i * CERT_STEP;
              if (!shown) return null;
              return (
                <div key={i} style={{
                  display:'grid', gridTemplateColumns:'94px 92px 1fr 14px', alignItems:'center', gap:'10px',
                  padding:'8px 12px', borderRadius:'9px',
                  background:'rgba(9,160,157,0.06)', border:'1px solid rgba(9,160,157,0.24)',
                  boxShadow:'0 0 20px rgba(9,160,157,0.05)',
                  opacity:0, animation:`slideUp .35s ease ${i*0.03}s both`,
                }}>
                  <span style={{fontSize:'12.5px', color:'var(--ins-text-highlight)', fontFamily:'Geist Mono,monospace', fontWeight:600}}>{m.name}</span>
                  <span style={{fontSize:'12.5px', fontFamily:'Geist Mono,monospace', color:'var(--ins-color-gray-100)', fontWeight:600, fontVariantNumeric:'tabular-nums'}}>{m.value}</span>
                  <span style={{fontSize:'10.5px', color:'rgba(255,255,255,0.4)', fontFamily:'Geist Mono,monospace', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{m.source}</span>
                  <span style={{
                    width:'14px', height:'14px', borderRadius:'50%',
                    background:'rgba(14,196,193,0.15)', border:'1px solid rgba(14,196,193,0.4)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'8px', fontWeight:800, color:'var(--ins-text-highlight)',
                  }}><CheckIcon size={8} color="currentColor" /></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

function Hero() {
  const [vis, setVis] = React.useState(false);
  useEffect(()=>{ const t = setTimeout(()=>setVis(true), 300); return ()=>clearTimeout(t); },[]);

  return (
    <section style={{display:'flex',alignItems:'flex-start',position:'relative',overflow:'hidden',padding:'120px 0 160px'}}>
      {/* Background glows */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 72% 50%,rgba(9,160,157,0.09) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 20% 50%,rgba(59,31,94,0.12) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>

      <div className="hero-grid" style={{position:'relative',zIndex:10,maxWidth:'1240px',width:'calc(100% - 32px)',margin:'0 auto',display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:'60px',alignItems:'center'}}>

        {/* LEFT: Text */}
        <div style={{
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 0',
        }}>
          <h1 style={{fontSize:'clamp(2.2rem,3.2vw,3.6rem)',fontWeight:700,fontFamily:"var(--ins-font-family-sans)",letterSpacing:'-.04em',lineHeight:1.1,marginBottom:'22px'}}>
            <span style={{color:'#FFFFFF'}}>One platform.</span><br/>
            <span style={{color:'var(--ins-text-highlight)'}}>Every team's</span><br/>
            <span style={{color:'var(--ins-text-highlight)'}}>numbers.</span>
          </h1>
          <p style={{fontSize:'clamp(16px,1.2vw,18px)',color:'var(--ins-text-body)',lineHeight:1.7,marginBottom:'36px',maxWidth:'480px'}}>
            Your Semantic Layer certifies every metric once. Not generic guesses — your actual data, your exact logic.
          </p>
          <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap',marginBottom:'24px'}}>
            <Button as="a" href="/auth/sign-up/" variant="primary" size="md" iconEnd={<ArrowRightIcon />}>
              Start for free
            </Button>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'18px',flexWrap:'wrap'}}>
            {['Single source of truth','Zero conflicting numbers','Every team aligned'].map(t=>(
              <span key={t} style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'12px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',fontVariantNumeric:'tabular-nums'}}>
                <CheckIcon size={12} />{t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: Semantic Layer animation */}
        <div>
          <SemanticLayerMockAnimation/>
        </div>

      </div>
    </section>
  );
}


/* ── WHAT THE SEMANTIC LAYER DOES ── */
function WhatItDoes() {
  const features = [
    {
      n:'01', title:'Unified metric definitions',
      body:'Revenue means one thing across every team. One canonical name, one formula, one source of truth — no more four versions of MRR living in four dashboards with three different answers by Monday morning.',
      example:'Stripe + Sheets + HubSpot Revenue → @Revenue',
    },
    {
      n:'02', title:'Auto-certified data',
      body:'Every metric passes validation rules before being served. Freshness, completeness, and business-logic checks run on every query, so if the data is stale or broken you know instantly — not after the board meeting.',
      example:'freshness · completeness · lineage → certified ✓',
    },
    {
      n:'03', title:'AI-ready foundation',
      body:'The Semantic Layer feeds every AI Chat answer with your certified logic, not internet averages. It is the reason Insightis answers are 3× more accurate than generic AI on your real business data.',
      example:'"What\u2019s our churn?" → @Churn = 2.8% (March, blended)',
    },
  ];

  return (
    <section style={{padding:'120px 0 140px',background:'linear-gradient(180deg,var(--ins-surface-page) 0%,var(--ins-surface-container) 100%)'}}>
      <div className="max-w-7xl mx-auto px-6">
        {/* PR 1 canary — replaces hand-rolled eyebrow + h2 with <SectionHeader> */}
        <div style={{marginBottom:'64px'}}>
          <SectionHeader
            eyebrow="How it works"
            title="One layer. Every metric. Always right."
            sparkle
            size="lg"
          />
        </div>

        {/* Horizontal stepper */}
        <StepsProcess steps={features} />
      </div>
    </section>
  );
}


/* ── METRICS DATA — grouped by team ── */
const CONNECTORS = {
  'RevOps & BizOps': [
    { name:'MRR',                  abbr:'MRR', color:'#6772e5', bg:'rgba(103,114,229,.12)', desc:'Recurring revenue normalized per month' },
    { name:'Pipeline Velocity',    abbr:'PV',  color:'#ff7a59', bg:'rgba(255,122,89,.12)',  desc:'Rate deals move through sales stages' },
    { name:'Win Rate',             abbr:'WR',  color:'#00a1e0', bg:'rgba(0,161,224,.12)',   desc:'Percentage of deals closed won' },
    { name:'ARR Churn',            abbr:'CH',  color:'#f76d2b', bg:'rgba(247,109,43,.12)',  desc:'Annualized revenue lost to cancellations' },
    { name:'Deal Cycle Length',    abbr:'DC',  color:'#1f9e42', bg:'rgba(31,158,66,.12)',   desc:'Average days from first touch to close' },
    { name:'Net Rev Retention',    abbr:'NRR', color:'#5c90d2', bg:'rgba(92,144,210,.12)',  desc:'Revenue retained plus expansion' },
    { name:'Quota Attainment',     abbr:'QA',  color:'#2ca01c', bg:'rgba(44,160,28,.12)',   desc:'Percent of reps hitting quota' },
    { name:'Pipeline Coverage',    abbr:'PC',  color:'#f9ab00', bg:'rgba(249,171,0,.12)',   desc:'Pipeline dollars vs quarterly target' },
    { name:'ACV',                  abbr:'ACV', color:'#a855f7', bg:'rgba(168,85,247,.12)',  desc:'Average contract value per new customer' },
    { name:'Stage Duration',       abbr:'SD',  color:'#13b5ea', bg:'rgba(19,181,234,.12)',  desc:'Days spent in each funnel stage' },
    { name:'Gross Churn',          abbr:'GC',  color:'#4285f4', bg:'rgba(66,133,244,.12)',  desc:'Revenue lost before any expansion' },
    { name:'Logo Retention',       abbr:'LR',  color:'#9b4dca', bg:'rgba(155,77,202,.12)',  desc:'Customers renewing contracts' },
    { name:'Expansion MRR',        abbr:'EMR', color:'#7c3aed', bg:'rgba(124,58,237,.12)',  desc:'Upsell + cross-sell revenue per month' },
    { name:'Lead-to-Opp Rate',     abbr:'L2O', color:'#52bd95', bg:'rgba(82,189,149,.12)',  desc:'Qualified leads converting to opps' },
    { name:'Rep Productivity',     abbr:'RP',  color:'#ff4081', bg:'rgba(255,64,129,.12)',  desc:'Revenue generated per sales rep' },
    { name:'Territory Coverage',   abbr:'TC',  color:'#286ef1', bg:'rgba(40,110,241,.12)',  desc:'Accounts worked per territory' },
    { name:'Forecast Accuracy',    abbr:'FA',  color:'#0a66c2', bg:'rgba(10,102,194,.12)',  desc:'Predicted vs actual quarterly revenue' },
    { name:'Pipeline Aging',       abbr:'PA',  color:'#47a248', bg:'rgba(71,162,72,.12)',   desc:'Deals stagnant over 60 days' },
    { name:'Meeting-to-Opp',       abbr:'M2O', color:'#d13212', bg:'rgba(209,50,18,.12)',   desc:'Meetings generating new pipeline' },
    { name:'Account Health',       abbr:'AHS', color:'#5e6ad2', bg:'rgba(94,106,210,.12)',  desc:'Composite account health signal' },
  ],
  'Founders & CEOs': [
    { name:'ARR',                  abbr:'ARR', color:'#6772e5', bg:'rgba(103,114,229,.12)', desc:'Total annualized subscription revenue' },
    { name:'CAC',                  abbr:'CAC', color:'#2ca01c', bg:'rgba(44,160,28,.12)',   desc:'Cost to acquire one new customer' },
    { name:'LTV:CAC Ratio',        abbr:'LTV', color:'#f9ab00', bg:'rgba(249,171,0,.12)',   desc:'Lifetime value vs acquisition cost' },
    { name:'Burn Rate',            abbr:'BR',  color:'#ff7a59', bg:'rgba(255,122,89,.12)',  desc:'Monthly cash spend vs revenue' },
    { name:'Runway',               abbr:'RW',  color:'#a855f7', bg:'rgba(168,85,247,.12)',  desc:'Months of cash at current burn' },
    { name:'Gross Margin',         abbr:'GM',  color:'#13b5ea', bg:'rgba(19,181,234,.12)',  desc:'Revenue minus cost of goods sold' },
    { name:'Rule of 40',           abbr:'R40', color:'#4285f4', bg:'rgba(66,133,244,.12)',  desc:'Growth rate plus profit margin' },
    { name:'Net Burn',             abbr:'NB',  color:'#5c90d2', bg:'rgba(92,144,210,.12)',  desc:'Cash consumption after revenue' },
    { name:'Cash Balance',         abbr:'CB',  color:'#52bd95', bg:'rgba(82,189,149,.12)',  desc:'Current cash on hand' },
    { name:'Magic Number',         abbr:'MN',  color:'#9b4dca', bg:'rgba(155,77,202,.12)',  desc:'SaaS sales efficiency ratio' },
    { name:'Quick Ratio',          abbr:'QR',  color:'#7c3aed', bg:'rgba(124,58,237,.12)',  desc:'Growth efficiency per dollar lost' },
    { name:'CAC Payback',          abbr:'CPB', color:'#f76d2b', bg:'rgba(247,109,43,.12)',  desc:'Months to recover acquisition cost' },
    { name:'Growth Rate',          abbr:'GR',  color:'#00a1e0', bg:'rgba(0,161,224,.12)',   desc:'Year-over-year revenue growth' },
    { name:'EBITDA Margin',        abbr:'EBT', color:'#d13212', bg:'rgba(209,50,18,.12)',   desc:'Operating profit before int. and tax' },
    { name:'Headcount Growth',     abbr:'HCG', color:'#ff4081', bg:'rgba(255,64,129,.12)',  desc:'Monthly team expansion rate' },
    { name:'Revenue per FTE',      abbr:'RFT', color:'#286ef1', bg:'rgba(40,110,241,.12)',  desc:'Revenue per full-time employee' },
    { name:'Top-line Growth',      abbr:'TLG', color:'#47a248', bg:'rgba(71,162,72,.12)',   desc:'Total revenue growth across products' },
    { name:'Customer Concentration',abbr:'CC', color:'#0a66c2', bg:'rgba(10,102,194,.12)',  desc:'Revenue from top 10 accounts' },
    { name:'Board NPS',            abbr:'BNP', color:'#1f9e42', bg:'rgba(31,158,66,.12)',   desc:'Board satisfaction and alignment' },
    { name:'Valuation Multiple',   abbr:'VM',  color:'#5e6ad2', bg:'rgba(94,106,210,.12)',  desc:'Revenue multiple vs peer set' },
  ],
  'CMOs & Marketers': [
    { name:'CAC by Channel',       abbr:'CAC', color:'#f9ab00', bg:'rgba(249,171,0,.12)',   desc:'Acquisition cost by channel' },
    { name:'ROAS',                 abbr:'ROA', color:'#4285f4', bg:'rgba(66,133,244,.12)',  desc:'Revenue per dollar of ad spend' },
    { name:'MQL Conv. Rate',       abbr:'MQL', color:'#1877f2', bg:'rgba(24,119,242,.12)',  desc:'MQLs converting to pipeline' },
    { name:'Blended CPL',          abbr:'CPL', color:'#0a66c2', bg:'rgba(10,102,194,.12)',  desc:'Cost per lead across channels' },
    { name:'Email Open Rate',      abbr:'EOR', color:'#e8a320', bg:'rgba(232,163,32,.12)',  desc:'Emails opened by recipients' },
    { name:'Attribution Rev.',     abbr:'ATR', color:'#9b4dca', bg:'rgba(155,77,202,.12)',  desc:'Revenue per marketing touchpoint' },
    { name:'Cost Per Click',       abbr:'CPC', color:'#13b5ea', bg:'rgba(19,181,234,.12)',  desc:'Average CPC across paid campaigns' },
    { name:'Click-Through Rate',   abbr:'CTR', color:'#00a1e0', bg:'rgba(0,161,224,.12)',   desc:'CTR across ads and emails' },
    { name:'Conversion Rate',      abbr:'CVR', color:'#52bd95', bg:'rgba(82,189,149,.12)',  desc:'Visitor to lead conversion' },
    { name:'Landing Page CVR',     abbr:'LPC', color:'#7c3aed', bg:'rgba(124,58,237,.12)',  desc:'Landing page conversion rate' },
    { name:'Bounce Rate',          abbr:'BNR', color:'#ff7a59', bg:'rgba(255,122,89,.12)',  desc:'Visitors leaving after one page' },
    { name:'Organic Sessions',     abbr:'OS',  color:'#1f9e42', bg:'rgba(31,158,66,.12)',   desc:'Unpaid web traffic sessions' },
    { name:'Paid Sessions',        abbr:'PS',  color:'#f76d2b', bg:'rgba(247,109,43,.12)',  desc:'Traffic from paid campaigns' },
    { name:'Sourced Pipeline',     abbr:'MSP', color:'#286ef1', bg:'rgba(40,110,241,.12)',  desc:'Pipeline attributed to marketing' },
    { name:'Content Engagement',   abbr:'CEN', color:'#a855f7', bg:'rgba(168,85,247,.12)',  desc:'Time on content per visitor' },
    { name:'Webinar Attendance',   abbr:'WA',  color:'#d13212', bg:'rgba(209,50,18,.12)',   desc:'Registrants who attended live' },
    { name:'SQL Conv. Rate',       abbr:'SQL', color:'#5c90d2', bg:'rgba(92,144,210,.12)',  desc:'SQLs converting to opportunities' },
    { name:'Pipeline Contribution',abbr:'PCT', color:'#47a248', bg:'rgba(71,162,72,.12)',   desc:'Marketing share of pipeline' },
    { name:'Influenced Revenue',   abbr:'IRV', color:'#ff4081', bg:'rgba(255,64,129,.12)',  desc:'Revenue influenced by marketing' },
    { name:'Brand Search Volume',  abbr:'BSV', color:'#6772e5', bg:'rgba(103,114,229,.12)', desc:'Monthly branded search queries' },
  ],
  'Product Teams': [
    { name:'DAU / MAU',            abbr:'D/M', color:'#a855f7', bg:'rgba(168,85,247,.12)',  desc:'Daily vs monthly active ratio' },
    { name:'Feature Adoption',     abbr:'FA',  color:'#2196f3', bg:'rgba(33,150,243,.12)',  desc:'Users activating a feature' },
    { name:'Time to Activate',     abbr:'TTA', color:'#52bd95', bg:'rgba(82,189,149,.12)',  desc:'Sign-up to first value moment' },
    { name:'D30 Retention',        abbr:'D30', color:'#7c3aed', bg:'rgba(124,58,237,.12)',  desc:'Users still active after 30 days' },
    { name:'NPS Score',            abbr:'NPS', color:'#286ef1', bg:'rgba(40,110,241,.12)',  desc:'Net promoter score from surveys' },
    { name:'Session Depth',        abbr:'SD',  color:'#ff4081', bg:'rgba(255,64,129,.12)',  desc:'Actions per user session' },
    { name:'WAU',                  abbr:'WAU', color:'#4285f4', bg:'rgba(66,133,244,.12)',  desc:'Weekly active users' },
    { name:'Stickiness',           abbr:'ST',  color:'#f9ab00', bg:'rgba(249,171,0,.12)',   desc:'DAU over MAU ratio' },
    { name:'Power User %',         abbr:'PUP', color:'#1f9e42', bg:'rgba(31,158,66,.12)',   desc:'Users in top activity decile' },
    { name:'Cohort Churn',         abbr:'CCH', color:'#ff7a59', bg:'rgba(255,122,89,.12)',  desc:'Retention across signup cohorts' },
    { name:'Activation Rate',      abbr:'AR',  color:'#9b4dca', bg:'rgba(155,77,202,.12)',  desc:'Users completing onboarding' },
    { name:'Feature Usage Freq.',  abbr:'FUF', color:'#13b5ea', bg:'rgba(19,181,234,.12)',  desc:'Times a feature used per user' },
    { name:'Tickets per User',     abbr:'TPU', color:'#d13212', bg:'rgba(209,50,18,.12)',   desc:'Support volume per active user' },
    { name:'Time in App',          abbr:'TIA', color:'#5c90d2', bg:'rgba(92,144,210,.12)',  desc:'Average session length per user' },
    { name:'Onboarding Completion',abbr:'OC',  color:'#47a248', bg:'rgba(71,162,72,.12)',   desc:'Users completing setup flow' },
    { name:'Trial-to-Paid',        abbr:'T2P', color:'#6772e5', bg:'rgba(103,114,229,.12)', desc:'Trial users converting to paid' },
    { name:'Feature Discovery',    abbr:'FD',  color:'#2ca01c', bg:'rgba(44,160,28,.12)',   desc:'Discovered within first 7 days' },
    { name:'Viral Coefficient',    abbr:'VC',  color:'#f76d2b', bg:'rgba(247,109,43,.12)',  desc:'Invites sent per active user' },
    { name:'Upgrade Rate',         abbr:'UR',  color:'#0a66c2', bg:'rgba(10,102,194,.12)',  desc:'Free to paid upgrade conversions' },
    { name:'PQLs',                 abbr:'PQL', color:'#5e6ad2', bg:'rgba(94,106,210,.12)',  desc:'Accounts hitting usage threshold' },
  ],
  'Data & Analytics': [
    { name:'Data Freshness',       abbr:'DF',  color:'#336791', bg:'rgba(51,103,145,.12)',  desc:'Age of most recent sync' },
    { name:'Pipeline Run Time',    abbr:'PRT', color:'#29b5e8', bg:'rgba(41,181,232,.12)',  desc:'End-to-end ETL duration' },
    { name:'Model Coverage',       abbr:'MC',  color:'#4285f4', bg:'rgba(66,133,244,.12)',  desc:'Metrics backed by dbt models' },
    { name:'Query Success Rate',   abbr:'QSR', color:'#d13212', bg:'rgba(209,50,18,.12)',   desc:'Queries completing without error' },
    { name:'Schema Drift',         abbr:'SCH', color:'#47a248', bg:'rgba(71,162,72,.12)',   desc:'Upstream source schema changes' },
    { name:'Lineage Coverage',     abbr:'LCO', color:'#f76d2b', bg:'rgba(247,109,43,.12)',  desc:'Metrics with full lineage traced' },
    { name:'Dashboard Latency',    abbr:'DL',  color:'#a855f7', bg:'rgba(168,85,247,.12)',  desc:'Average dashboard load time' },
    { name:'Query Volume',         abbr:'QV',  color:'#5c90d2', bg:'rgba(92,144,210,.12)',  desc:'Queries executed per day' },
    { name:'Data Quality Score',   abbr:'DQS', color:'#52bd95', bg:'rgba(82,189,149,.12)',  desc:'Composite correctness score' },
    { name:'Null Rate',            abbr:'NR',  color:'#ff7a59', bg:'rgba(255,122,89,.12)',  desc:'Nulls in key columns' },
    { name:'Duplicate Rate',       abbr:'DR',  color:'#ff4081', bg:'rgba(255,64,129,.12)',  desc:'Duplicate records detected' },
    { name:'SLA Compliance',       abbr:'SLA', color:'#1f9e42', bg:'rgba(31,158,66,.12)',   desc:'Pipelines hitting SLAs' },
    { name:'Warehouse Spend',      abbr:'WS',  color:'#f9ab00', bg:'rgba(249,171,0,.12)',   desc:'Monthly warehouse cost' },
    { name:'Compute Utilization',  abbr:'CU',  color:'#00a1e0', bg:'rgba(0,161,224,.12)',   desc:'Warehouse capacity in use' },
    { name:'Test Coverage',        abbr:'TC',  color:'#7c3aed', bg:'rgba(124,58,237,.12)',  desc:'Models with dbt tests' },
    { name:'Doc Coverage',         abbr:'DOC', color:'#13b5ea', bg:'rgba(19,181,234,.12)',  desc:'Models with documentation' },
    { name:'Certified Metric %',   abbr:'CM',  color:'#6772e5', bg:'rgba(103,114,229,.12)', desc:'Metrics with certification' },
    { name:'Self-Serve Adoption',  abbr:'SSA', color:'#286ef1', bg:'rgba(40,110,241,.12)',  desc:'Teams using self-serve BI' },
    { name:'Incident MTTR',        abbr:'MTT', color:'#0a66c2', bg:'rgba(10,102,194,.12)',  desc:'Mean time to resolve incidents' },
    { name:'Model Build Success',  abbr:'MBS', color:'#5e6ad2', bg:'rgba(94,106,210,.12)',  desc:'dbt builds passing' },
  ],
  'Ops & Finance': [
    { name:'Gross Burn',           abbr:'GB',  color:'#2ca01c', bg:'rgba(44,160,28,.12)',   desc:'Total monthly cash outflow' },
    { name:'Headcount Cost',       abbr:'HC',  color:'#13b5ea', bg:'rgba(19,181,234,.12)',  desc:'Fully-loaded cost per employee' },
    { name:'Budget vs Act.',       abbr:'BvA', color:'#009ee2', bg:'rgba(0,158,226,.12)',   desc:'Spend deviation from budget' },
    { name:'DSO',                  abbr:'DSO', color:'#f45d48', bg:'rgba(244,93,72,.12)',   desc:'Days to collect after invoice' },
    { name:'Op. Margin',           abbr:'OM',  color:'#0052cc', bg:'rgba(0,82,204,.12)',    desc:'Operating income as % of revenue' },
    { name:'Cash Conv. Cycle',     abbr:'CCC', color:'#5e6ad2', bg:'rgba(94,106,210,.12)',  desc:'Cash out to cash collected' },
    { name:'AR Aging',             abbr:'ARA', color:'#f76d2b', bg:'rgba(247,109,43,.12)',  desc:'Age distribution of receivables' },
    { name:'AP Aging',             abbr:'APA', color:'#ff7a59', bg:'rgba(255,122,89,.12)',  desc:'Age distribution of payables' },
    { name:'Inventory Turnover',   abbr:'IT',  color:'#4285f4', bg:'rgba(66,133,244,.12)',  desc:'Inventory sold and replaced' },
    { name:'COGS',                 abbr:'CG',  color:'#9b4dca', bg:'rgba(155,77,202,.12)',  desc:'Direct cost of delivering product' },
    { name:'R&D Spend',            abbr:'RDS', color:'#7c3aed', bg:'rgba(124,58,237,.12)',  desc:'Engineering and product investment' },
    { name:'G&A Ratio',            abbr:'GnA', color:'#52bd95', bg:'rgba(82,189,149,.12)',  desc:'General & admin as % of revenue' },
    { name:'Opex Growth',          abbr:'OG',  color:'#286ef1', bg:'rgba(40,110,241,.12)',  desc:'Month-over-month opex growth' },
    { name:'Burn Multiple',        abbr:'BM',  color:'#ff4081', bg:'rgba(255,64,129,.12)',  desc:'Net burn vs net new ARR' },
    { name:'Payroll Ratio',        abbr:'PR',  color:'#1f9e42', bg:'rgba(31,158,66,.12)',   desc:'Payroll as % of revenue' },
    { name:'Revenue per Employee', abbr:'RPE', color:'#6772e5', bg:'rgba(103,114,229,.12)', desc:'Annual revenue per FTE' },
    { name:'Vendor Spend',         abbr:'VS',  color:'#f9ab00', bg:'rgba(249,171,0,.12)',   desc:'Monthly third-party vendor cost' },
    { name:'License Utilization',  abbr:'LU',  color:'#47a248', bg:'rgba(71,162,72,.12)',   desc:'Licensed seats actually used' },
    { name:'Invoice Lead Time',    abbr:'ILT', color:'#a855f7', bg:'rgba(168,85,247,.12)',  desc:'Days from trigger to sent invoice' },
    { name:'Compliance Incidents', abbr:'CI',  color:'#d13212', bg:'rgba(209,50,18,.12)',   desc:'SOC2/GDPR issues per quarter' },
  ],
};


/* ── FEATURES SHOWCASE (V10 style) ── */
const SHOWCASE_CSS = `
.sc-wrap{max-width:1060px;margin:0 auto;display:flex;flex-direction:column;gap:36px;position:relative}
.sc-stepper{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;position:relative;padding:0 8px}
.sc-step{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;cursor:pointer;background:transparent;border:none;color:inherit;padding:0 6px;font-family:inherit}
.sc-step-connector{position:absolute;top:28px;left:calc(50% + 36px);right:calc(-50% + 36px);height:1px;background:linear-gradient(90deg,rgba(9,160,157,.45) 0%,rgba(9,160,157,.18) 100%);z-index:0}
.sc-circle{position:relative;z-index:1;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:14px;border:1px solid rgba(9,160,157,.35);background:radial-gradient(circle at 50% 30%,rgba(9,160,157,.10) 0%,rgba(13,17,23,.95) 75%);box-shadow:0 0 18px rgba(9,160,157,.10), inset 0 1px 0 rgba(255,255,255,.05);transition:border-color .25s,box-shadow .25s,background .25s}
.sc-step.active .sc-circle{border-color:rgba(9,160,157,.7);background:radial-gradient(circle at 50% 30%,rgba(9,160,157,.22) 0%,rgba(13,17,23,.95) 75%);box-shadow:0 0 28px rgba(9,160,157,.25), inset 0 1px 0 rgba(255,255,255,.06)}
.sc-num{font-size:18px;font-weight:600;font-family:var(--ins-font-family-sans);letter-spacing:-.02em;color:rgba(14,196,193,.55);font-variant-numeric:tabular-nums;transition:color .25s}
.sc-step.active .sc-num{color:var(--ins-text-highlight)}
.sc-step-label{font-size:13.5px;font-weight:600;letter-spacing:-.01em;color:rgba(255,255,255,.45);margin-bottom:6px;transition:color .25s;line-height:1.25}
.sc-step.active .sc-step-label{color:#fff}
.sc-step-desc{font-size:11.5px;color:rgba(255,255,255,.4);line-height:1.5;max-height:0;overflow:hidden;opacity:0;transition:max-height .35s ease,opacity .35s ease}
.sc-step.active .sc-step-desc{max-height:60px;opacity:1;color:rgba(255,255,255,.55)}
.sc-panel-wrap{position:relative;background:radial-gradient(ellipse 100% 80% at 30% 30%,rgba(10,152,150,.06) 0%,transparent 60%),rgba(10,14,19,.97);border-radius:16px;border:1px solid rgba(255,255,255,.07);box-shadow:0 4px 6px rgba(0,0,0,.5),0 32px 100px rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:28px;overflow:hidden;height:520px}
.sc-panel-wrap::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(10,152,150,.6),rgba(255,255,255,.1),rgba(10,152,150,.6),transparent);z-index:20;pointer-events:none}
@media (max-width:768px){
  .sc-stepper{grid-template-columns:1fr;gap:24px}
  .sc-step-connector{display:none}
}
`;

// ── PANEL 1: Metrics Catalog (table view) ──
function Panel1() {
  const metrics = [
    { name:'Customer Acquisition Cost', short:'@CAC',      cat:'Marketing', src:'Google Analytics', active:true  },
    { name:'Conversion Rate',           short:'@ConvRate',  cat:'Marketing', src:'Stripe',           active:true  },
    { name:'MQL Score',                 short:'@MQL',       cat:'Marketing', src:'PostgreSQL',        active:true  },
    { name:'Cost Per Click',            short:'@CPC',       cat:'Marketing', src:'Salesforce',        active:true  },
    { name:'Net Revenue Retention',     short:'@NRR',       cat:'RevOps',    src:'Stripe',           active:true  },
    { name:'Return on Ad Spend',        short:'@ROAS',      cat:'Marketing', src:'PostgreSQL',        active:false },
  ];
  const CAT_COLORS = { Marketing:'rgba(14,196,193,.12)', RevOps:'rgba(99,91,255,.12)' };
  const CAT_TEXT   = { Marketing:'var(--ins-text-highlight)', RevOps:'#8b7cf8' };

  return (
    <div style={{width:'100%',background:'rgba(10,14,19,.95)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'14px',overflow:'hidden',boxShadow:'none'}}>
      {/* Toolbar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 16px',background:'rgba(255,255,255,.02)',borderBottom:'1px solid rgba(255,255,255,.06)'}}>
        <div style={{display:'flex',gap:5}}>
          {['All 12','Marketing 10','RevOps 2'].map((l,i)=>(
            <div key={i} style={{padding:'3px 10px',borderRadius:'999px',fontSize:'11px',fontWeight:600,fontFamily:'Geist Mono,monospace',background:i===0?'var(--mint)':'rgba(255,255,255,.04)',color:i===0?'#fff':'rgba(255,255,255,.4)',border:`1px solid ${i===0?'var(--mint)':'rgba(255,255,255,.07)'}`}}>{l}</div>
          ))}
        </div>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'5px 12px',background:'rgba(9,160,157,.1)',border:'1px solid rgba(9,160,157,.3)',borderRadius:'8px',fontSize:'11.5px',fontWeight:600,color:'var(--ins-text-highlight)',cursor:'pointer'}}>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
          + New Metric
        </div>
      </div>
      {/* Table header */}
      <div style={{display:'grid',gridTemplateColumns:'40px 1fr 100px 90px 110px 36px',padding:'6px 16px',borderBottom:'1px solid rgba(255,255,255,.05)'}}>
        {['','Metric Name','Short Name','Category','Source',''].map((h,i)=>(
          <div key={i} style={{fontSize:'10px',fontFamily:'Geist Mono,monospace',fontWeight:600,color:'rgba(255,255,255,.4)',textTransform:'uppercase',letterSpacing:'.08em'}}>{h}</div>
        ))}
      </div>
      {/* Rows */}
      {metrics.map((m,i)=>(
        <div key={i} style={{display:'grid',gridTemplateColumns:'40px 1fr 100px 90px 110px 36px',padding:'9px 16px',borderBottom:'1px solid rgba(255,255,255,.03)',alignItems:'center',background:i===0?'rgba(9,160,157,.05)':'transparent'}}>
          <div style={{width:'28px',height:'16px',borderRadius:'8px',background:m.active?'rgba(9,160,157,.15)':'rgba(255,255,255,.06)',border:`1px solid ${m.active?'rgba(9,160,157,.4)':'rgba(255,255,255,.1)'}`,position:'relative'}}>
            <div style={{position:'absolute',top:'2px',width:'10px',height:'10px',borderRadius:'50%',background:m.active?'var(--ins-text-highlight)':'rgba(255,255,255,.25)',transition:'left .2s',left:m.active?'14px':'2px'}}/>
          </div>
          <div style={{fontSize:'12px',color:'rgba(232,242,245,.85)',fontWeight:500,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',paddingRight:'8px'}}>{m.name}</div>
          <div style={{fontSize:'11px',fontFamily:'Geist Mono,monospace',color:'var(--ins-text-highlight)',background:'rgba(9,160,157,.07)',padding:'2px 6px',borderRadius:'4px',width:'fit-content'}}>{m.short}</div>
          <div style={{fontSize:'11px',padding:'2px 8px',borderRadius:'4px',background:CAT_COLORS[m.cat]||'rgba(255,255,255,.06)',color:CAT_TEXT[m.cat]||'var(--ins-text-inactive)',width:'fit-content'}}>{m.cat}</div>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,.4)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.src}</div>
          <div style={{color:'rgba(255,255,255,.2)',fontSize:'14px',cursor:'pointer'}}>···</div>
        </div>
      ))}
    </div>
  );
}

// ── PANEL 2: AI Auto-Mapping ──
function Panel2() {
  const [step, setStep] = React.useState(0);
  useEffect(()=>{
    const t = setInterval(()=> setStep(s => s<4 ? s+1 : 0), 1200);
    return () => clearInterval(t);
  },[]);

  const fields = ['@marketing_spend','@sales_spend','@new_customers'];
  const mapped = ['Amount (SUM)','Spend (SUM)','Customers (COUNT)'];
  const srcs   = ['Google Analytics','Stripe','HubSpot'];

  return (
    <div style={{width:'100%',maxWidth:'420px',background:'rgba(10,14,19,.95)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'14px',overflow:'hidden',boxShadow:'none',padding:'20px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'16px'}}>
        <div style={{width:'22px',height:'22px',borderRadius:'6px',background:'rgba(9,160,157,.12)',border:'1px solid rgba(9,160,157,.25)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z" stroke="var(--ins-text-highlight)" strokeWidth="1.2" strokeLinejoin="round"/></svg>
        </div>
        <span style={{fontSize:'12px',fontWeight:600,color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace'}}>AI Auto-Mapping</span>
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:'4px',fontSize:'10px',color:'rgba(34,197,94,.8)',fontFamily:'Geist Mono,monospace'}}>
          <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--ins-status-success-fg)',boxShadow:'0 0 5px var(--ins-status-success-fg)',animation:'pulse 1.5s infinite'}}/>
          mapping...
        </div>
      </div>

      <div style={{fontSize:'12px',color:'rgba(255,255,255,.35)',marginBottom:'12px',fontFamily:'Geist Mono,monospace'}}>Customer Acquisition Cost → CAC</div>

      <div style={{fontSize:'11.5px',color:'rgba(255,255,255,.7)',marginBottom:'12px',lineHeight:1.6}}>
        Connecting <span style={{color:'var(--ins-text-highlight)'}}>(@marketing_spend + @sales_spend) / @new_customers</span>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
        {fields.map((f,i) => {
          const done = step > i;
          const active = step === i;
          return (
            <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',padding:'9px 12px',borderRadius:'10px',border:`1px solid ${done?'rgba(9,160,157,.3)':active?'rgba(9,160,157,.15)':'rgba(255,255,255,.06)'}`,background:done?'rgba(9,160,157,.06)':active?'rgba(9,160,157,.03)':'rgba(255,255,255,.02)',transition:'all .3s'}}>
              <div style={{fontFamily:'Geist Mono,monospace',fontSize:'11px',color:done?'var(--ins-text-highlight)':'rgba(255,255,255,.4)',flex:1}}>{f}</div>
              {(done||active) && (
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{flexShrink:0,opacity:active?0.5:1}}><path d="M3 8h10M9 4l4 4-4 4" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
              {done && (
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
                  <div style={{fontSize:'10.5px',color:'rgba(255,255,255,.6)',fontFamily:'Geist Mono,monospace'}}>{srcs[i]}</div>
                  <div style={{fontSize:'10px',color:'rgba(9,160,157,.7)',fontFamily:'Geist Mono,monospace'}}>{mapped[i]}</div>
                </div>
              )}
              {active && (
                <div style={{display:'flex',gap:'3px',alignItems:'center'}}>
                  {[0,1,2].map(d=><div key={d} style={{width:'4px',height:'4px',borderRadius:'50%',background:'var(--ins-text-highlight)',animation:`pulse ${0.9+d*0.15}s ease-in-out infinite`,animationDelay:`${d*0.15}s`}}/>)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {step >= 4 && (
        <div style={{marginTop:'12px',padding:'10px 14px',borderRadius:'10px',background:'rgba(34,197,94,.06)',border:'1px solid rgba(34,197,94,.2)',display:'flex',alignItems:'center',gap:'8px',animation:'slideUp .3s ease both'}}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><polyline points="2 8 6 12 14 4" stroke="var(--ins-status-success-fg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{fontSize:'12px',color:'rgba(34,197,94,.9)',fontWeight:500}}>All fields mapped — metric certified ✓</span>
        </div>
      )}
    </div>
  );
}

// ── PANEL 3: Create Metric modal ──
function Panel3() {
  return (
    <div style={{width:'100%',maxWidth:'380px',background:'rgba(13,17,23,.97)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'14px',overflow:'hidden',boxShadow:'none',padding:'24px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
        <span style={{fontSize:'15px',fontWeight:600,color:'var(--ins-color-gray-100)'}}>Create New Metric</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </div>
      {[{label:'Name',ph:'e.g., Customer Acquisition Cost'},{label:'Short name',ph:'@CAC'}].map((f,i)=>(
        <div key={i} style={{marginBottom:'14px'}}>
          <div style={{fontSize:'11.5px',color:'rgba(255,255,255,.4)',marginBottom:'6px',fontFamily:'Geist Mono,monospace'}}>{f.label}</div>
          <div style={{padding:'9px 12px',borderRadius:'8px',border:'1px solid rgba(255,255,255,.1)',background:'rgba(255,255,255,.04)',fontSize:'13px',color:'rgba(255,255,255,.6)',fontFamily:'Geist Mono,monospace'}}>{i===0?'Customer Acquisition Cost':f.ph}</div>
        </div>
      ))}
      <div style={{marginBottom:'14px'}}>
        <div style={{fontSize:'11.5px',color:'rgba(255,255,255,.4)',marginBottom:'6px',fontFamily:'Geist Mono,monospace'}}>Definition Method</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',borderRadius:'8px',overflow:'hidden',border:'1px solid rgba(255,255,255,.08)'}}>
          <div style={{padding:'8px',textAlign:'center',background:'rgba(255,255,255,.08)',fontSize:'12px',color:'var(--ins-color-gray-100)',fontWeight:500,display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Direct Mapping
          </div>
          <div style={{padding:'8px',textAlign:'center',background:'transparent',fontSize:'12px',color:'rgba(255,255,255,.3)',display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M4 12l8-8M8 4h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Formula
          </div>
        </div>
      </div>
      <div style={{padding:'14px',borderRadius:'10px',border:'1px solid rgba(255,255,255,.07)',background:'rgba(255,255,255,.03)'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:'8px',alignItems:'center',marginBottom:'10px'}}>
          <div>
            <div style={{fontSize:'10px',color:'rgba(255,255,255,.3)',marginBottom:'4px',fontFamily:'Geist Mono,monospace'}}>Source</div>
            <div style={{padding:'6px 10px',borderRadius:'7px',border:'1px solid rgba(255,255,255,.1)',background:'rgba(255,255,255,.04)',fontSize:'11.5px',color:'rgba(255,255,255,.6)',display:'flex',alignItems:'center',gap:'5px'}}>
              <span style={{fontSize:'9px'}}>📊</span> Google Analytics
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="rgba(9,160,157,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div>
            <div style={{fontSize:'10px',color:'rgba(255,255,255,.3)',marginBottom:'4px',fontFamily:'Geist Mono,monospace'}}>Object</div>
            <div style={{padding:'6px 10px',borderRadius:'7px',border:'1px solid rgba(9,160,157,.3)',background:'rgba(9,160,157,.06)',fontSize:'11.5px',color:'var(--ins-text-highlight)'}}>Charges</div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:'8px',alignItems:'center'}}>
          <div>
            <div style={{fontSize:'10px',color:'rgba(255,255,255,.3)',marginBottom:'4px',fontFamily:'Geist Mono,monospace'}}>Field</div>
            <div style={{padding:'6px 10px',borderRadius:'7px',border:'1px solid rgba(9,160,157,.3)',background:'rgba(9,160,157,.06)',fontSize:'11.5px',color:'var(--ins-text-highlight)'}}>Amount</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="rgba(9,160,157,.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div>
            <div style={{fontSize:'10px',color:'rgba(255,255,255,.3)',marginBottom:'4px',fontFamily:'Geist Mono,monospace'}}>Aggregation</div>
            <div style={{padding:'6px 10px',borderRadius:'7px',border:'1px solid rgba(255,255,255,.1)',background:'rgba(255,255,255,.04)',fontSize:'11.5px',color:'rgba(255,255,255,.6)'}}>SUM</div>
          </div>
        </div>
      </div>
      <div style={{display:'flex',gap:'8px',marginTop:'16px'}}>
        <div style={{flex:1,padding:'9px',borderRadius:'8px',border:'1px solid rgba(255,255,255,.1)',textAlign:'center',fontSize:'13px',color:'rgba(255,255,255,.4)',cursor:'pointer'}}>Cancel</div>
        <div style={{flex:1,padding:'9px',borderRadius:'8px',background:'linear-gradient(135deg,var(--ins-button-primary-bg-hover),var(--ins-button-primary-bg))',textAlign:'center',fontSize:'13px',fontWeight:600,color:'var(--ins-text-body)',cursor:'pointer',boxShadow:'0 0 12px rgba(9,160,157,.3)'}}>Create Metric</div>
      </div>
    </div>
  );
}

// ── PANEL 4: Formula metric (CAC = @Sales_Spend / @New_Orders) ──
function Panel4() {
  const [solved, setSolved] = React.useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setSolved(true),1200); return()=>clearTimeout(t); },[]);
  const parts = [
    { label:'@Marketing_Spend', value:'$28,400', color:'#6772E5' },
    { label:'@Sales_Spend',     value:'$18,200', color:'#FF7A59' },
    { label:'@New_Customers',   value:'108',      color:'var(--ins-text-highlight)' },
  ];
  return (
    <div style={{width:'100%',maxWidth:'420px',background:'rgba(10,14,19,.95)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'14px',overflow:'hidden',boxShadow:'none',padding:'22px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'18px'}}>
        <div style={{fontSize:'13px',fontWeight:600,color:'var(--ins-color-gray-100)'}}>Customer Acquisition Cost</div>
        <div style={{fontSize:'10px',fontFamily:'Geist Mono,monospace',color:'var(--ins-text-highlight)',background:'rgba(9,160,157,.08)',padding:'2px 7px',borderRadius:'4px'}}>@CAC</div>
      </div>

      {/* Formula */}
      <div style={{background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'10px',padding:'14px 16px',marginBottom:'16px'}}>
        <div style={{fontSize:'10px',fontFamily:'Geist Mono,monospace',color:'rgba(255,255,255,.3)',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'.08em'}}>Formula</div>
        <div style={{fontSize:'13px',fontFamily:'Geist Mono,monospace',color:'var(--ins-text-body)',lineHeight:1.6}}>
          <span style={{color:'#6772E5'}}>@Marketing_Spend</span>
          <span style={{color:'rgba(255,255,255,.35)'}}> + </span>
          <span style={{color:'#FF7A59'}}>@Sales_Spend</span>
          <span style={{color:'rgba(255,255,255,.35)'}}> / </span>
          <span style={{color:'var(--ins-text-highlight)'}}>@New_Customers</span>
        </div>
      </div>

      {/* Live values */}
      <div style={{fontSize:'10px',fontFamily:'Geist Mono,monospace',color:'rgba(255,255,255,.3)',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'.08em'}}>Live values — Nov 2024</div>
      <div style={{display:'flex',flexDirection:'column',gap:'7px',marginBottom:'16px'}}>
        {parts.map((p,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'8px 12px',borderRadius:'8px',background:'rgba(255,255,255,.025)',border:'1px solid rgba(255,255,255,.05)'}}>
            <div style={{width:'3px',height:'20px',borderRadius:'2px',background:p.color,flexShrink:0}}/>
            <span style={{fontSize:'12px',fontFamily:'Geist Mono,monospace',color:p.color,flex:1}}>{p.label}</span>
            <span style={{fontSize:'12px',fontFamily:'Geist Mono,monospace',color:'rgba(255,255,255,.7)',fontWeight:600}}>{p.value}</span>
          </div>
        ))}
      </div>

      {/* Result */}
      <div style={{
        padding:'12px 16px',borderRadius:'10px',
        background: solved?'rgba(9,160,157,.08)':'rgba(255,255,255,.03)',
        border:`1px solid ${solved?'rgba(9,160,157,.3)':'rgba(255,255,255,.07)'}`,
        display:'flex',alignItems:'center',justifyContent:'space-between',
        transition:'all .5s ease',
      }}>
        <div style={{fontSize:'11px',fontFamily:'Geist Mono,monospace',color:'rgba(255,255,255,.4)'}}>@CAC =</div>
        <div style={{fontSize:'22px',fontWeight:500,fontFamily:'Geist Mono,monospace',color:solved?'var(--ins-text-highlight)':'rgba(255,255,255,.2)',transition:'color .5s ease'}}>
          {solved ? '$431' : '...'}
        </div>
        {solved && <div style={{fontSize:'10px',color:'rgba(34,197,94,.8)',background:'rgba(34,197,94,.06)',border:'1px solid rgba(34,197,94,.2)',padding:'2px 8px',borderRadius:'4px',fontFamily:'Geist Mono,monospace'}}>● certified</div>}
      </div>
    </div>
  );
}

// ── PANEL 5: AI Chat with @ metric mention ──
function Panel5() {
  const [step, setStep] = React.useState(0);
  useEffect(()=>{
    const timers = [
      setTimeout(()=>setStep(1), 600),
      setTimeout(()=>setStep(2), 1400),
      setTimeout(()=>setStep(3), 2400),
    ];
    return()=>timers.forEach(clearTimeout);
  },[]);

  return (
    <div style={{width:'100%',maxWidth:'440px',background:'rgba(10,14,19,.95)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'14px',overflow:'hidden',boxShadow:'none'}}>
      {/* Chat header */}
      <div style={{padding:'12px 16px',borderBottom:'1px solid rgba(255,255,255,.06)',display:'flex',alignItems:'center',gap:'8px'}}>
        <div style={{width:'20px',height:'20px',borderRadius:'6px',background:'rgba(9,160,157,.12)',border:'1px solid rgba(9,160,157,.25)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z" stroke="var(--ins-text-highlight)" strokeWidth="1.2" strokeLinejoin="round"/></svg>
        </div>
        <span style={{fontSize:'12px',fontWeight:600,color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace'}}>Insightis AI</span>
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:4,fontSize:'10px',color:'rgba(34,197,94,.8)',fontFamily:'Geist Mono,monospace'}}>
          <div style={{width:5,height:5,borderRadius:'50%',background:'var(--ins-status-success-fg)',boxShadow:'0 0 4px var(--ins-status-success-fg)'}}/>live
        </div>
      </div>

      <div style={{padding:'16px',display:'flex',flexDirection:'column',gap:'10px',minHeight:'220px'}}>
        {/* User message with @ mention */}
        {step >= 1 && (
          <div style={{alignSelf:'flex-end',background:'rgba(9,160,157,.1)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'14px 14px 3px 14px',padding:'9px 13px',fontSize:'13px',color:'var(--ins-color-gray-100)',maxWidth:'90%',animation:'slideUp .2s ease both'}}>
            Why did{' '}
            <span style={{background:'rgba(9,160,157,.15)',border:'1px solid rgba(9,160,157,.3)',borderRadius:'4px',padding:'1px 6px',color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',fontSize:'12px',fontWeight:600}}>@CAC</span>
            {' '}spike last month?
          </div>
        )}

        {/* AI typing */}
        {step === 2 && (
          <div style={{alignSelf:'flex-start',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'3px 14px 14px 14px',padding:'10px 13px',animation:'slideUp .2s ease both'}}>
            <div style={{display:'flex',gap:4,alignItems:'center'}}>
              {[0,1,2].map(d=><div key={d} style={{width:5,height:5,borderRadius:'50%',background:'var(--ins-text-highlight)',animation:`pulse ${0.9+d*0.15}s ease-in-out infinite`,animationDelay:`${d*0.15}s`}}/>)}
            </div>
          </div>
        )}

        {/* AI answer */}
        {step >= 3 && (
          <div style={{alignSelf:'flex-start',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',borderRadius:'3px 14px 14px 14px',padding:'10px 13px',fontSize:'13px',color:'var(--ins-color-gray-200)',maxWidth:'95%',lineHeight:1.65,animation:'slideUp .2s ease both'}}>
            <span style={{color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',fontSize:'12px',fontWeight:600,background:'rgba(9,160,157,.08)',padding:'1px 6px',borderRadius:'4px'}}>@CAC</span>
            {' '}rose to <strong style={{color:'var(--ins-color-gray-100)'}}>$431</strong> in Nov — up from $394 in Oct (+9.4%). Main driver: <strong style={{color:'var(--ins-color-gray-100)'}}>@Marketing_Spend</strong> increased $4.2K while <strong style={{color:'var(--ins-color-gray-100)'}}>@New_Customers</strong> grew only 3%.
            <div style={{marginTop:'8px',display:'flex',gap:5}}>
              {['Stripe','HubSpot','PostgreSQL'].map(s=>(
                <span key={s} style={{fontSize:'10px',fontFamily:'Geist Mono,monospace',padding:'2px 6px',borderRadius:'4px',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',color:'var(--ins-text-inactive)'}}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{padding:'10px 14px',borderTop:'1px solid rgba(255,255,255,.06)',display:'flex',alignItems:'center',gap:'8px'}}>
        <div style={{flex:1,background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'8px',padding:'8px 12px',fontSize:'12.5px',color:'var(--ins-text-inactive)',fontFamily:'Geist,sans-serif'}}>
          Ask anything... use <span style={{color:'rgba(9,160,157,.5)',fontFamily:'Geist Mono,monospace'}}>@</span> to reference metrics
        </div>
        <div style={{width:'26px',height:'26px',borderRadius:'7px',background:'linear-gradient(135deg,var(--ins-button-primary-bg-hover),var(--ins-button-primary-bg))',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
    </div>
  );
}

const SHOWCASE_STEPS = [
  { n:'01', title:'Metrics Catalog',    body:'All your team metrics in one place — with descriptions, sources and certification status.',                          example:'@CAC · @MRR · @Churn — defined once, used everywhere' },
  { n:'02', title:'AI Auto-Mapping',    body:'Insightis AI automatically finds the right fields in your source and sets up mapping — no manual wiring.',              example:'Stripe.amount → @Revenue (auto-mapped)' },
  { n:'03', title:'Formula Metrics',    body:'Calculate metrics automatically from existing ones. CAC = @Marketing_Spend + @Sales_Spend / @New_Customers.',            example:'@CAC = @Spend ÷ @New_Customers' },
  { n:'04', title:'Custom Metrics',     body:'Add and configure any metric quickly — direct mapping or formula, no SQL or analysts needed.',                            example:'Define & map any metric in minutes' },
  { n:'05', title:'Chat with @ Metrics',body:'Ask in chat with a reference to a specific metric via @ for 100% accurate answers from certified data.',                  example:'"@MRR by month" → certified answer' },
];
function FeaturesShowcase() {
  return (
    <section style={{padding:'120px 0 140px',background:'linear-gradient(180deg,var(--ins-surface-page) 0%,var(--ins-surface-container) 100%)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{marginBottom:'64px'}}>
          <SectionHeader
            eyebrow="How it works"
            title="Your Semantic Layer, fully in control"
            sparkle
            size="lg"
          />
        </div>

        {/* Horizontal stepper */}
        <StepsProcess steps={SHOWCASE_STEPS} />
      </div>
    </section>
  );
}

function ConnectorGallery() {
  const cats = Object.keys(CONNECTORS);
  const [activeCat, setActiveCat] = useState(cats[0]);

  return (
    <section style={{padding:'80px 0 100px', background:'linear-gradient(180deg,var(--ins-surface-container) 0%,#101620 100%)'}}>
      <div className="max-w-7xl mx-auto px-6">

        {/* PR 1 canary — replaces hand-rolled eyebrow + h2 + lede with <SectionHeader> */}
        <div style={{marginBottom:'28px'}}>
          <SectionHeader
            eyebrow="Metrics catalog"
            title="Define, certify, and version your metrics"
            lede="Every metric defined once, certified, and used by every team — across RevOps, Finance, and Marketing."
            sparkle
            size="lg"
          />
        </div>

        {/* Category tabs */}
        <div style={{display:'flex',justifyContent:'center',gap:'8px',marginBottom:'28px',flexWrap:'wrap'}}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} style={{
              padding:'7px 18px',borderRadius:'999px',fontSize:'13px',fontWeight:500,
              cursor:'pointer',fontFamily:'Geist,sans-serif',transition:'all .15s',
              border:`1px solid ${cat===activeCat?'rgba(9,160,157,.5)':'rgba(255,255,255,.08)'}`,
              background: cat===activeCat?'rgba(9,160,157,.08)':'transparent',
              color: cat===activeCat?'var(--ins-text-highlight)':'var(--ins-text-inactive)',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(5,minmax(0,1fr))',
          gap:'10px',
        }}>
          {CONNECTORS[activeCat].map((c, i) => (
            <div key={c.name} className="connector-card">
              <div
                className="connector-icon"
                style={{
                  background:'rgba(9,160,157,.12)',
                  color:'var(--ins-text-highlight)',
                  border:'1px solid rgba(9,160,157,.25)',
                  fontSize:'15px',
                  fontWeight:600,
                  fontFamily:"'Geist Mono', monospace",
                }}
                aria-hidden="true"
              >
                @
              </div>
              <div style={{minWidth:0}}>
                <div style={{fontSize:'0.875rem',fontWeight:500,color:'var(--ins-text-body)',marginBottom:'3px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>@{c.name}</div>
                <div style={{fontSize:'12px',color:'#8A9BA4',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.desc}</div>
              </div>
              <div style={{marginLeft:'auto',flexShrink:0,width:6,height:6,borderRadius:'50%',background:'var(--ins-status-success-fg)',boxShadow:'0 0 6px rgba(34,197,94,.6)'}}/>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{textAlign:'center',marginTop:'32px'}}>
          <span style={{fontSize:'12.5px',color:'#8A9BA4',fontFamily:'Geist Mono,monospace'}}>
            the only source of truth you need
          </span>
        </div>
      </div>
    </section>
  );
}


/* ── BEFORE / AFTER — Without vs With Semantic Layer ── */
function BeforeAfter() {
  return (
    <section style={{padding:'120px 0 140px',background:'linear-gradient(180deg,#101620 0%,var(--ins-surface-page) 100%)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{marginBottom:'56px'}}>
          <SectionHeader
            eyebrow="The difference"
            title="Without vs with Semantic Layer"
            lede="Four teams guess. Insightis certifies."
            sparkle
            size="lg"
          />
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',alignItems:'stretch'}}>
          {/* Without */}
          <Card variant="glow" className="ins-card--glow--error compare-card" style={{padding:'32px',display:'flex',flexDirection:'column'}}>
            <div className="ins-card__header" style={{fontSize:'13px',fontWeight:600,marginBottom:'22px'}}>Without Semantic Layer</div>
            <CodeChip
              variant="panel"
              style={{flex:1,marginBottom:'12px'}}
              query="What's our MRR this month?"
              response={<span style={{color:'#505068'}}>Finance says <span style={{color:'var(--ins-status-error-fg)'}}>$52,000</span>. RevOps says <span style={{color:'var(--ins-status-error-fg)'}}>$47,200</span>. The CEO dashboard shows <span style={{color:'var(--ins-status-error-fg)'}}>$44,800</span>. Analysts spend Monday reconciling four spreadsheets before anyone can answer.</span>}
            />
            <p style={{fontSize:'12px',color:'rgba(248,113,113,.6)',fontStyle:'italic'}}>Four definitions of "revenue". Four dashboards. Four different numbers.</p>
          </Card>

          {/* With Insightis */}
          <Card variant="glow" className="ins-card--glow--brand compare-card" style={{padding:'32px',display:'flex',flexDirection:'column'}}>
            <div className="ins-card__header" style={{fontSize:'13px',fontWeight:500,marginBottom:'22px'}}>With Insightis Semantic Layer</div>
            <CodeChip
              variant="panel"
              style={{flex:1,marginBottom:'12px'}}
              query="What's our MRR this month?"
              response={<>@MRR = <CodeChip.Highlight>$42,400</CodeChip.Highlight> — March, blended across Stripe + HubSpot + Postgres. Every dashboard, chat, and board deck reads the same certified definition. Analysts ship insights, not reconciliations.</>}
            />
            <p style={{fontSize:'12px',color:'rgba(9,160,157,.6)',fontStyle:'italic'}}>One certified definition. Queried through the Semantic Layer. Always your numbers.</p>
          </Card>
        </div>

        {/* 5x badge */}
        <div style={{textAlign:'center',marginTop:'36px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'40px',fontWeight:500,color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',lineHeight:1,flexShrink:0}}>5×</span>
            <span style={{fontSize:'15px',color:'var(--ins-text-inactive)',whiteSpace:'nowrap'}}>faster reporting because every metric is certified once, used everywhere.</span>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ── MID-PAGE CTA BANNER ── */
function MidCTA() {
  return (
    <section className="pt-16 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="fade-up is-visible">
          <BottomCTA
            variant="text"
            title={<>Skip the metric debates. <BottomCTA.Highlight>Start asking.</BottomCTA.Highlight></>}
            ctaLabel="Get started for free"
          />
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section className="pt-8 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <BottomCTA
          variant="form"
          title={<>Stop arguing about <BottomCTA.Highlight> which number</BottomCTA.Highlight> is right.</>}
          inputPlaceholder="What metric do you want to unify?"
          ctaLabel="Get Started"
        />
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
      <WhatItDoes />
      <MidCTA />
      <ConnectorGallery />
      <BeforeAfter />
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
