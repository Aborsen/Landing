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
import MetricsCatalog from '../components/MetricsCatalog';
import ArrowRightIcon from '../components/ArrowRightIcon';
import MidCTA from '../components/MidCTA';

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
    { source:'Amplitude',  short:'A',  color:'#1F6FFF', name:'Churn',    value:'3.4%'    },
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
      borderRadius:'var(--ins-radius-16)',
      border:'1px solid rgba(255,255,255,0.09)',
      background:'#0C1117',
      overflow:'hidden',
      display:'flex',
      flexDirection:'column',
      height:'500px',
      boxShadow:'none',
    }}>

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
          <div style={{display:'flex', alignItems:'center', gap:'var(--ins-size-2)', marginBottom:'10px', paddingLeft:'var(--ins-size-half)'}}>
            <span style={{fontSize:'9.5px', color:'rgba(255,255,255,0.4)', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'var(--ins-font-family-mono)'}}>Incoming from sources</span>
            {conflictPhase && (
              <span style={{
                display:'inline-flex', alignItems:'center', gap:'var(--ins-size-1)',
                padding:'2px 7px', borderRadius:'999px',
                background:'rgba(255,150,70,0.1)', border:'1px solid rgba(255,150,70,0.3)',
                fontSize:'9.5px', color:'rgba(255,180,100,0.95)', fontFamily:'var(--ins-font-family-mono)', fontWeight:600, letterSpacing:'0.04em',
                animation:'fadeIn .3s ease both',
              }}>
                <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#FFB464',animation:'pulse 1.2s ease-in-out infinite'}}/>
                {conflictCount} conflict{conflictCount===1?'':'s'} detected
              </span>
            )}
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'var(--ins-size-1)'}}>
            {RAW_METRICS.slice(0, shownRaw).map((m, i) => {
              const isConflict = conflictPhase && (rawByName[m.name] > 1 || m.value === '???');
              return (
                <div key={i} style={{
                  display:'grid', gridTemplateColumns:'82px 1fr 82px 12px', alignItems:'center', gap:'10px',
                  padding:'5px 10px', borderRadius:'var(--ins-radius-8)',
                  background: isConflict ? 'rgba(255,150,70,0.045)' : 'rgba(255,255,255,0.025)',
                  border: isConflict ? '1px solid rgba(255,150,70,0.22)' : '1px solid var(--ins-color-white-a-06)',
                  animation:'slideUp .28s ease both',
                  transition:'background .35s ease, border-color .35s ease',
                }}>
                  <div style={{display:'flex', alignItems:'center', gap:'6px', minWidth:0}}>
                    <span style={{
                      width:'16px', height:'16px', borderRadius:'var(--ins-radius-4)', flexShrink:0,
                      background:`${m.color}22`, border:`1px solid ${m.color}55`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'8.5px', fontWeight:700, color:m.color, fontFamily:'var(--ins-font-family-mono)',
                    }}>{m.short}</span>
                    <span style={{fontSize:'10.5px', color:'var(--ins-text-body)', fontFamily:'var(--ins-font-family-mono)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{m.source}</span>
                  </div>
                  <span style={{fontSize:'var(--ins-font-size-12)', color:'#D2E2E8', fontWeight:500}}>{m.name}</span>
                  <span style={{
                    fontSize:'var(--ins-font-size-12)', fontFamily:'var(--ins-font-family-mono)',
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
              background:'radial-gradient(circle, var(--ins-color-teal-a-18) 0%, var(--ins-color-teal-a-04) 70%)',
              border:'1px solid rgba(14,196,193,0.22)',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 32px var(--ins-color-teal-a-18), inset 0 0 20px var(--ins-color-teal-a-04)',
              animation:'corePulse 2.4s ease-in-out infinite',
            }}>
              <InsightisIcon size={26}/>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'9px'}}>
              <span style={{fontSize:'var(--ins-font-size-15)', color: allStepsDone ? 'rgba(14,196,193,0.8)' : '#E0EDF2', fontWeight:600, fontFamily:"var(--ins-font-family-sans)", letterSpacing:'-0.01em', transition:'color .4s ease'}}>
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
            <span style={{fontSize:'var(--ins-font-size-11)', color:'rgba(255,255,255,0.4)', fontFamily:'var(--ins-font-family-mono)', letterSpacing:'0.04em'}}>
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
                  padding:'8px 12px', borderRadius:'var(--ins-radius-8)',
                  background: done ? 'rgba(14,196,193,0.05)' : (active ? 'rgba(14,196,193,0.025)' : 'rgba(255,255,255,0.015)'),
                  border: done ? '1px solid rgba(14,196,193,0.22)' : (active ? '1px solid rgba(14,196,193,0.14)' : '1px solid var(--ins-color-white-a-05)'),
                  opacity: shown ? 1 : 0.35,
                  transform: shown ? 'translateX(0)' : 'translateX(-4px)',
                  transition:'all .35s ease',
                }}>
                  <span style={{
                    width:'18px', height:'18px', borderRadius:'50%', flexShrink:0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'9px', fontWeight:800,
                    background: done ? 'var(--ins-color-teal-a-18)' : (active ? 'transparent' : 'var(--ins-color-white-a-04)'),
                    border: done ? '1px solid rgba(14,196,193,0.45)' : (active ? '1.5px solid rgba(14,196,193,0.7)' : '1px solid var(--ins-color-white-a-10)'),
                    color: done ? 'var(--ins-text-highlight)' : (active ? 'var(--ins-text-highlight)' : 'var(--ins-text-inactive)'),
                    transition:'all .3s ease',
                    animation: active ? 'pulse 1.3s ease-in-out infinite' : 'none',
                  }}>
                    {done ? '✓' : (i + 1)}
                  </span>
                  <span style={{
                    fontSize:'12.5px',
                    color: done ? 'rgba(14,196,193,0.85)' : (active ? '#E0EDF2' : 'var(--ins-text-body)'),
                    fontWeight: active ? 500 : 400,
                    transition:'color .35s ease',
                  }}>
                    {label}
                  </span>
                  {active && (
                    <span style={{marginLeft:'auto', fontSize:'10px', color:'rgba(14,196,193,0.7)', fontFamily:'var(--ins-font-family-mono)', letterSpacing:'0.05em'}}>
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
          <div style={{display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px', paddingLeft:'var(--ins-size-half)'}}>
            <span style={{fontSize:'9.5px', color:'rgba(14,196,193,0.9)', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'var(--ins-font-family-mono)'}}>Certified semantic layer</span>
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
                  <span style={{fontSize:'12.5px', color:'var(--ins-text-highlight)', fontFamily:'var(--ins-font-family-mono)', fontWeight:600}}>{m.name}</span>
                  <span style={{fontSize:'12.5px', fontFamily:'var(--ins-font-family-mono)', color:'var(--ins-color-gray-100)', fontWeight:600, fontVariantNumeric:'tabular-nums'}}>{m.value}</span>
                  <span style={{fontSize:'10.5px', color:'rgba(255,255,255,0.4)', fontFamily:'var(--ins-font-family-mono)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{m.source}</span>
                  <span style={{
                    width:'14px', height:'14px', borderRadius:'50%',
                    background:'var(--ins-color-teal-a-15)', border:'1px solid var(--ins-color-teal-a-40)',
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
      <div className="ins-hero-glow" />

      <div className="hero-grid" style={{position:'relative',zIndex:10,maxWidth:'1240px',width:'calc(100% - 32px)',margin:'0 auto',display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:'60px',alignItems:'center'}}>

        {/* LEFT: Text */}
        <div style={{
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 0',
        }}>
          <div>
          <div className="fu0 ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'var(--ins-size-5)'}}>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'var(--ins-font-family-mono)'}}>Semantic Layer</span>
          </div>
          <h1 className="ins-text-display-xl">
            <span style={{color:'var(--ins-text-heading-soft)'}}>The same numbers.</span><br/>
            <span style={{color:'var(--ins-text-highlight)'}}>Every team.</span><br/>
            <span style={{color:'var(--ins-text-highlight)'}}>Any report</span>
          </h1>
          </div>
          <p className="ins-text-body-xl" style={{marginBottom:'36px',maxWidth:'520px'}}>
            Insightis locks in one definition for every metric — your actual data and logic, not generic AI guesses.
          </p>
          <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-3)',flexWrap:'wrap',marginBottom:'var(--ins-size-6)'}}>
            <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
              Start for free
            </Button>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'18px',flexWrap:'wrap'}}>
            {['Single source of truth','Zero conflicting numbers','Every team aligned'].map(t=>(
              <span key={t} className="ins-text-caption ins-text--mono" style={{display:'flex',alignItems:'center',gap:'5px'}}>
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
      body:'Revenue means one thing across every team — one canonical name, one formula, one source of truth. No more four versions of MRR in four dashboards.',
      example:'Stripe + Sheets + HubSpot Revenue → certified @Revenue',
    },
    {
      n:'02', title:'Auto-certified data',
      body:'Freshness, completeness, and business-logic checks run on every query — so you know the instant data goes stale or breaks, not after the board meeting.',
      example:'Freshness · completeness · logic · lineage → certified ✓',
    },
    {
      n:'03', title:'AI-ready foundation',
      body:'The Semantic Layer feeds every AI Chat answer with your certified logic, not internet averages — the reason Insightis is 3× more accurate on real data.',
      example:'"What\u2019s our churn?" → @Churn = 2.8% (March, blended)',
    },
  ];

  return (
    <section style={{padding:'120px 0 140px',background:'var(--ins-glow-section)'}}>
      <div className="max-w-7xl mx-auto px-6">
        {/* PR 1 canary — replaces hand-rolled eyebrow + h2 with <SectionHeader> */}
        <div style={{marginBottom:'var(--ins-size-16)'}}>
          <SectionHeader
            eyebrow="How it works"
            title="One layer. Every metric. Always right"
            size="lg"
          />
        </div>

        {/* Horizontal stepper */}
        <StepsProcess steps={features} />
      </div>
    </section>
  );
}

// ── PANEL 2: AI Auto-Mapping ──

// ── PANEL 3: Create Metric modal ──

// ── PANEL 4: Formula metric (CAC = @Sales_Spend / @New_Orders) ──

// ── PANEL 5: AI Chat with @ metric mention ──

const SHOWCASE_STEPS = [
  { n:'01', title:'Metrics Catalog',    body:'All your team metrics in one place — with descriptions, sources and certification status.',                          example:'@CAC · @MRR · @Churn — defined once, used everywhere' },
  { n:'02', title:'AI Auto-Mapping',    body:'Insightis AI automatically finds the right fields in your source and sets up mapping — no manual wiring.',              example:'Stripe.amount → @Revenue (auto-mapped)' },
  { n:'03', title:'Formula Metrics',    body:'Calculate metrics automatically from existing ones. CAC = @Marketing_Spend + @Sales_Spend / @New_Customers.',            example:'@CAC = @Spend ÷ @New_Customers' },
  { n:'04', title:'Custom Metrics',     body:'Add and configure any metric quickly — direct mapping or formula, no SQL or analysts needed.',                            example:'Define & map any metric in minutes' },
  { n:'05', title:'Chat with @ Metrics',body:'Ask in chat with a reference to a specific metric via @ for 100% accurate answers from certified data.',                  example:'"@MRR by month" → certified answer' },
];

function BeforeAfter() {
  return (
    <section style={{padding:'120px 0 140px',background:'var(--ins-glow-section)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="The difference"
            title="Without vs with Semantic Layer"
            lede="Four teams guess. Insightis certifies."
            size="lg"
          />        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--ins-size-4)',alignItems:'stretch'}}>
          {/* Without */}
          <Card variant="glow" className="ins-card--glow--error compare-card" style={{padding:'var(--ins-size-8)',display:'flex',flexDirection:'column'}}>
            <div className="ins-card__header" style={{marginBottom:'22px'}}>Without Semantic Layer</div>
            <CodeChip
              variant="panel"
              style={{flex:1,marginBottom:'var(--ins-size-3)'}}
              query="What's our MRR this month?"
              response={<span style={{color:'#505068'}}>Finance says <span style={{color:'var(--ins-status-error-fg)'}}>$52,000</span>. RevOps says <span style={{color:'var(--ins-status-error-fg)'}}>$47,200</span>. The CEO dashboard shows <span style={{color:'var(--ins-status-error-fg)'}}>$44,800</span>. Analysts spend Monday reconciling four spreadsheets before anyone can answer.</span>}
            />
            <p className="ins-text-body-sm ins-text--italic" style={{color:'var(--ins-text-error)'}}>Four definitions of "revenue". Four dashboards. Four different numbers.</p>
          </Card>

          {/* With Insightis */}
          <Card variant="glow" className="ins-card--glow--brand compare-card" style={{padding:'var(--ins-size-8)',display:'flex',flexDirection:'column'}}>
            <div className="ins-card__header" style={{marginBottom:'22px'}}>With Insightis Semantic Layer</div>
            <CodeChip
              variant="panel"
              style={{flex:1,marginBottom:'var(--ins-size-3)'}}
              query="What's our MRR this month?"
              response={<>@MRR = <CodeChip.Highlight>$42,400</CodeChip.Highlight> — March, blended across Stripe + HubSpot + Postgres. Every dashboard, chat, and board deck reads the same certified definition. Analysts ship insights, not reconciliations.</>}
            />
            <p className="ins-text-body-sm ins-text--italic" style={{color:'var(--ins-text-highlight-muted)'}}>One certified definition. Queried through the Semantic Layer. Always your numbers.</p>
          </Card>
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
          variant="buttons"
          title={<>Stop arguing about <BottomCTA.Highlight> which number</BottomCTA.Highlight> is right</>}
          description="Define each metric once and every dashboard, report and chat agrees. Free to start, no credit card required."
          ctaLabel="Start for free"
          secondaryCtaLabel="Explore Pricing"
          secondaryCtaHref="/pricing"
        />
      </div>
    </section>
  );
}

/* ── APP ── */
function App() {
  return (
    <div className="ins-bg-noise">
      <Header />
      <main>
      <Hero />
      <WhatItDoes />
      <MidCTA lead="Skip the metric debates." />
      <MetricsCatalog />
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
