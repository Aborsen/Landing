import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import BottomCTA from '../components/BottomCTA';
import FAQAccordion from '../components/FAQAccordion';
import SectionHeader from '../components/SectionHeader';
import CheckIcon from '../components/CheckIcon';
import ConnectorIcon from '../components/ConnectorIcon';
import HeroMockup from '../components/HeroMockup';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/* ── MINI BAR CHART ── */
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
      <div className="ins-hero-glow" />
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:10}}>
        <div data-hero-grid style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'var(--ins-size-16)',
          alignItems:'center',
        }}>
          {/* Left: text */}
          <div>
            <div className="fu0 ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'var(--ins-size-5)'}}>
              <span style={{fontSize:'var(--ins-font-size-12)'}}>✦</span>
              <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'var(--ins-font-family-mono)'}}>For Marketing Teams</span>
            </div>

            <h1 className="ins-text-display-xl" style={{marginBottom:'var(--ins-size-5)'}}>
              <span style={{color:'var(--ins-text-heading-soft)'}}>Stop guessing which channel</span>
              <br/>
              <span style={{color:'var(--ins-text-highlight)'}}>actually works.</span>
            </h1>

            <p className="fu2 ins-text-body-xl" style={{marginBottom:'var(--ins-size-7)',maxWidth:'480px'}}>
              Live answers on every campaign, channel, and dollar of spend. Ask in plain English — ROAS, CAC, attribution — no more Monday data dumps.
            </p>

            <div className="fu3" style={{display:'flex',gap:'var(--ins-size-3)',flexWrap:'wrap',marginBottom:'var(--ins-size-7)'}}>
              <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
                Start for free
              </Button>
            </div>

          </div>

          {/* Right: marketing-flavored hero visual — shared HeroMockup shell */}
          <HeroMockup
            title="Insightis — For Marketing Teams"
            accentLine="rgba(167,139,250,.55)"
            glow="radial-gradient(circle at 25% 25%, rgba(167,139,250,.18) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(9,160,157,.12) 0%, transparent 50%)"
            badge={
              <HeroMockup.Badge accentRgb="167,139,250">
                <div style={{
                  width:'8px',height:'8px',borderRadius:'50%',background:'var(--ins-color-purple-400)',
                  flexShrink:0,
                }}/>
                <div>
                  <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase'}}>Best ROAS</div>
                  <div style={{fontSize:'12.5px',color:'var(--ins-color-purple-400)',fontWeight:500,fontFamily:'var(--ins-font-family-mono)',marginTop:'1px'}}>Search · 6.2×</div>
                </div>
              </HeroMockup.Badge>
            }
            card={
              <HeroMockup.FloatCard accentRgb="248,113,113">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'var(--ins-size-2)'}}>
                  <span style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase'}}>CAC alert</span>
                  <span style={{fontSize:'10.5px',color:'var(--ins-status-error-fg)',fontFamily:'var(--ins-font-family-mono)',fontWeight:500}}>Paid · +38%</span>
                </div>
                <svg viewBox="0 0 140 32" width="100%" height="28" preserveAspectRatio="none" style={{display:'block',marginBottom:'var(--ins-size-1)'}}>
                  <defs>
                    <linearGradient id="cac-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--ins-status-error-fg)" stopOpacity="0.32"/>
                      <stop offset="100%" stopColor="var(--ins-status-error-fg)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,28 C20,26 40,24 60,20 C80,15 100,10 120,5 L140,2 L140,32 L0,32 Z" fill="url(#cac-fill)"/>
                  <path d="M0,28 C20,26 40,24 60,20 C80,15 100,10 120,5 L140,2" fill="none" stroke="var(--ins-status-error-fg)" strokeWidth="1.6" strokeLinecap="round"/>
                  <circle cx="0" cy="28" r="2" fill="var(--ins-status-error-fg)"/>
                  <circle cx="140" cy="2" r="2" fill="var(--ins-status-error-fg)"/>
                </svg>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'9px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.04em'}}>
                  <span>W0</span><span>W4</span><span>W8</span><span>W12</span>
                </div>
              </HeroMockup.FloatCard>
            }
          >

              {/* Status row — label with a dot */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--ins-color-purple-400)',boxShadow:'0 0 8px rgba(167,139,250,.6)'}}/>
                  <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10.5px',color:'var(--ins-text-body)',letterSpacing:'.08em',textTransform:'uppercase'}}>Campaigns · live</span>
                </div>
                <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-color-purple-400)',padding:'3px 9px',borderRadius:'999px',background:'rgba(167,139,250,.1)',border:'1px solid rgba(167,139,250,.25)',letterSpacing:'.08em',textTransform:'uppercase'}}>Last 90d</span>
              </div>

              {/* Headline + caption */}
              <h3 style={{fontSize:'var(--ins-font-size-17)',fontWeight:500,color:'var(--ins-text-heading-soft)',marginBottom:'6px',letterSpacing:'-.015em',lineHeight:1.35}}>
                Top-of-funnel widening — pipeline <span style={{color:'var(--ins-status-success-fg)'}}>+28%</span>
              </h3>
              <p className="ins-text-body-sm" style={{marginBottom:'var(--ins-size-5)'}}>
                Tracked across <span style={{color:'var(--ins-color-purple-400)',fontFamily:'var(--ins-font-family-mono)',fontSize:'11.5px'}}>Ads · GA4 · CRM</span> in real time.
              </p>

              {/* Conversion funnel — tapering bars with stage-to-stage drop-off */}
              <div style={{display:'flex',flexDirection:'column'}}>
                {[
                  {label:'Visits', val:'124K', w:100, drop:'↓ 6.6% lead capture'},
                  {label:'Leads',  val:'8.2K', w:80,  drop:'↓ 29% qualified'},
                  {label:'MQLs',   val:'2.4K', w:63,  drop:'↓ 41% sales-accepted'},
                  {label:'SQLs',   val:'980',  w:48,  drop:'↓ 32% close rate'},
                  {label:'Won',    val:'312',  w:36,  drop:null},
                ].map((s,i) => (
                  <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{
                      width:`${s.w}%`,
                      height:'30px',
                      borderRadius:'8px',
                      background:'linear-gradient(90deg, var(--ins-color-teal-a-30), var(--ins-color-teal-a-60))',
                      border:'1px solid rgba(14,196,193,.35)',
                      display:'flex',alignItems:'center',justifyContent:'space-between',
                      padding:'0 16px',
                      boxSizing:'border-box',
                    }}>
                      <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'11px',color:'var(--ins-text-heading-soft)',letterSpacing:'.06em',textTransform:'uppercase'}}>{s.label}</span>
                      <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'13px',fontWeight:600,color:'var(--ins-text-heading)'}}>{s.val}</span>
                    </div>
                    {s.drop && (
                      <div style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',padding:'3px 0',letterSpacing:'.04em'}}>{s.drop}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{marginTop:'14px',paddingTop:'12px',borderTop:'1px dashed var(--ins-color-white-a-06)',textAlign:'center',fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-inactive)',letterSpacing:'.04em'}}>
                5 stages · 0.25% top-to-won · 32-day cycle
              </div>
          </HeroMockup>
        </div>
      </div>
    </section>
  );
}

/* ── FEATURE SPOTLIGHT VISUALS ── */
function ChromeHeader({ label }) {
  return (
    <div style={{padding:'14px 18px',borderBottom:'1px solid var(--ins-color-white-a-06)',display:'flex',alignItems:'center',gap:'10px',flexShrink:0,position:'relative',zIndex:1}}>
      <div style={{display:'flex',gap:'5px'}}>
        {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
          <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.6}}/>
        ))}
      </div>
      <div style={{flex:1,textAlign:'center',fontSize:'var(--ins-font-size-12)',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)'}}>
        {label}
      </div>
    </div>
  );
}

function SpotlightChat() {
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="self-serve · marketing" />
      <div style={{padding:'22px 20px',display:'flex',flexDirection:'column',gap:'14px',flex:1,justifyContent:'center'}}>
        {/* User question */}
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <div className="chat-bubble-user" style={{maxWidth:'82%'}}>
            What's ROAS by channel this quarter?
          </div>
        </div>

        {/* AI reply */}
        <div className="chat-bubble-ai">
          <div style={{fontSize:'12.5px',lineHeight:1.6,marginBottom:'var(--ins-size-3)'}}>
            ROAS held up across the board since the <span style={{color:'var(--ins-text-highlight)',fontWeight:500}}>Q2</span> budget shift. <span style={{color:'var(--ins-text-highlight)',fontWeight:500}}>Search</span> leads at 6.2× (+1.4× QoQ); <span style={{color:'var(--ins-status-error-fg)',fontWeight:500}}>Paid social</span> at 2.1× is the soft spot. Biggest lift came from retargeting after the new creative shipped.
          </div>

          {/* KPI blocks */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'7px',marginBottom:'10px'}}>
            {[
              {label:'Search',      val:'6.2×',  color:'var(--ins-text-highlight)', sub:'best ROAS'},
              {label:'QoQ lift',    val:'+1.4×', color:'var(--ins-status-success-fg)', sub:'avg across channels'},
              {label:'Paid social', val:'2.1×',  color:'var(--ins-status-error-fg)', sub:'soft spot'},
            ].map((k,i)=>(
              <div key={i} style={{
                background:'var(--ins-color-white-a-03)',
                border:'1px solid var(--ins-color-white-a-06)',
                borderRadius:'9px',
                padding:'8px 10px',
              }}>
                <div style={{fontSize:'9px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'3px'}}>{k.label}</div>
                <div style={{fontSize:'13.5px',fontWeight:500,color:k.color,fontFamily:'var(--ins-font-family-mono)',letterSpacing:'-.01em',marginBottom:'var(--ins-size-half)'}}>{k.val}</div>
                <div style={{fontSize:'9.5px',color:'var(--ins-text-body)'}}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Source line */}
          <div style={{
            display:'flex',alignItems:'center',gap:'6px',
            paddingTop:'var(--ins-size-2)',
            borderTop:'1px solid var(--ins-color-white-a-05)',
            fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-inactive)',
          }}>
            <span style={{letterSpacing:'.06em',textTransform:'uppercase'}}>Source</span>
            <span style={{color:'var(--ins-text-highlight)'}}>ads.fct_spend</span>
            <span>·</span>
            <span style={{color:'var(--ins-text-highlight)'}}>crm.fct_pipeline</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightSemantic() {
  const teams = [
    {team:'Demand Gen', def:'last-touch',  color:'var(--ins-status-warning-fg)'},
    {team:'Brand',      def:'first-touch', color:'#A78BFA'},
    {team:'Finance',    def:'blended CAC', color:'var(--ins-status-error-fg)'},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="metric · cac" />
      <div style={{padding:'22px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* Section eyebrow */}
        <div style={{textAlign:'center',marginBottom:'var(--ins-size-3)'}}>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',letterSpacing:'.1em',textTransform:'uppercase'}}>three teams · three definitions</span>
        </div>

        {/* Three conflicting team definitions */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'7px',marginBottom:'var(--ins-size-3)'}}>
          {teams.map((t,i)=>(
            <div key={i} style={{
              background:'rgba(255,255,255,.025)',
              border:`1px solid ${t.color}33`,
              borderRadius:'9px',
              padding:'10px 8px',
              textAlign:'center',
            }}>
              <div style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9px',color:t.color,letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'5px'}}>{t.team}</div>
              <div style={{fontSize:'11.5px',color:'var(--ins-text-body)'}}>{t.def}</div>
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
          borderRadius:'var(--ins-radius-12)',
          padding:'14px 14px',
        }}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
            <div style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'13.5px',color:'var(--ins-color-gray-100)',fontWeight:500}}>blended_cac</div>
            <span style={{
              display:'inline-flex',alignItems:'center',gap:'5px',
              padding:'3px 9px',borderRadius:'999px',
              background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.3)',
              fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-status-success-fg)',
              letterSpacing:'.06em',textTransform:'uppercase',
            }}>
              <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--ins-status-success-fg)'}}/>
              Certified · v2.4
            </span>
          </div>
          <div style={{
            fontFamily:'var(--ins-font-family-mono)',
            fontSize:'11.5px',
            color:'var(--ins-text-body)',
            background:'rgba(0,0,0,.2)',
            border:'1px solid var(--ins-color-white-a-04)',
            borderRadius:'7px',
            padding:'9px 10px',
            marginBottom:'10px',
            lineHeight:1.5,
          }}>
            <span style={{color:'var(--ins-text-body)'}}>total</span> <span style={{color:'var(--ins-text-highlight)'}}>marketing_spend</span> <span style={{color:'var(--ins-text-body)'}}>/ new_customers</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',gap:'10px',fontSize:'10.5px',color:'var(--ins-text-body)'}}>
            <span><span style={{color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.06em',textTransform:'uppercase',fontSize:'9px',marginRight:'5px'}}>Owned</span>Marketing Ops</span>
            <span><span style={{color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.06em',textTransform:'uppercase',fontSize:'9px',marginRight:'5px'}}>Used by</span>12 reports · 3 teams</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightAnomalies() {
  const segments = [
    {seg:'Paid social · Meta',   val:'+52%', color:'var(--ins-status-error-fg)', bad:true},
    {seg:'Paid social · TikTok', val:'+38%', color:'var(--ins-status-error-fg)', bad:true},
    {seg:'Search',               val:'+3%',  color:'var(--ins-text-body)', bad:false},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="channel · breakdown" />
      <div style={{padding:'20px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* User question */}
        <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)',marginBottom:'var(--ins-size-3)'}}>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',letterSpacing:'.08em',textTransform:'uppercase'}}>asked</span>
          <span style={{fontSize:'12.5px',color:'var(--ins-text-body)'}}>"Which channel is dragging CAC up?"</span>
        </div>

        {/* Multi-channel CAC line chart */}
        <div style={{
          background:'rgba(255,255,255,.018)',
          border:'1px solid var(--ins-color-white-a-05)',
          borderRadius:'10px',
          padding:'12px 12px 10px',
          marginBottom:'var(--ins-size-3)',
        }}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'var(--ins-size-2)'}}>
            <div style={{display:'flex',gap:'10px',fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',alignItems:'center'}}>
              <span style={{color:'var(--ins-color-purple-400)',display:'inline-flex',alignItems:'center',gap:'var(--ins-size-1)'}}><span style={{width:'10px',height:'2px',background:'var(--ins-color-purple-400)',borderRadius:'1px'}}/>Email</span>
              <span style={{color:'var(--ins-status-error-fg)',display:'inline-flex',alignItems:'center',gap:'var(--ins-size-1)'}}><span style={{width:'10px',height:'2px',background:'var(--ins-status-error-fg)',borderRadius:'1px'}}/>Paid social</span>
              <span style={{color:'var(--ins-text-highlight)',display:'inline-flex',alignItems:'center',gap:'var(--ins-size-1)'}}><span style={{width:'10px',height:'2px',background:'var(--ins-text-highlight)',borderRadius:'1px'}}/>Search</span>
            </div>
            <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-body)'}}>CAC · 12 wk</span>
          </div>
          <svg viewBox="0 0 280 60" width="100%" height="60" preserveAspectRatio="none" style={{display:'block'}}>
            <line x1="0" y1="18" x2="280" y2="18" stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3"/>
            <line x1="0" y1="38" x2="280" y2="38" stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3"/>
            {/* Email - lavender, steady */}
            <path d="M0,16 L40,15 L80,17 L120,16 L160,15 L200,16 L240,15 L280,16" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Search - teal, healthy/low CAC */}
            <path d="M0,20 L40,18 L80,17 L120,15 L160,14 L200,13 L240,12 L280,12" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            {/* Paid social - red, CAC climbing */}
            <path d="M0,18 L40,20 L80,22 L120,28 L160,38 L200,44 L240,48 L280,50" fill="none" stroke="var(--ins-status-error-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="280" cy="50" r="2.6" fill="var(--ins-status-error-fg)"/>
          </svg>
        </div>

        {/* Segment breakdown — pinpointing channel/platform */}
        <div style={{display:'flex',flexDirection:'column',gap:'5px'}}>
          {segments.map((r,i)=>(
            <div key={i} style={{
              display:'flex',alignItems:'center',gap:'10px',
              padding:'7px 11px',
              background:r.bad?'rgba(248,113,113,.05)':'var(--ins-color-white-a-02)',
              border:`1px solid ${r.bad?'rgba(248,113,113,.2)':'var(--ins-color-white-a-05)'}`,
              borderRadius:'var(--ins-radius-8)',
            }}>
              <span style={{
                width:'6px',height:'6px',borderRadius:'50%',
                background:r.color,flexShrink:0,
              }}/>
              <span style={{fontSize:'11.5px',color:'var(--ins-text-body)',flex:1,fontFamily:'var(--ins-font-family-mono)'}}>{r.seg}</span>
              <span style={{fontSize:'var(--ins-font-size-12)',fontWeight:500,color:r.color,fontFamily:'var(--ins-font-family-mono)'}}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpotlightStack() {
  const trace = [
    {label:'Search',      amt:'$58K', src:'Google Ads', detail:'271 customers', owner:'Demand Gen', ts:'06:30 UTC'},
    {label:'Paid social', amt:'$41K', src:'Meta Ads',   detail:'92 customers',  owner:'Demand Gen', ts:'06:30 UTC'},
    {label:'Email',       amt:'$6K',  src:'Klaviyo',    detail:'118 customers', owner:'Lifecycle',  ts:'06:30 UTC'},
    {label:'Organic',     amt:'$0',   src:'GA4',        detail:'204 customers', owner:'Content',    ts:'06:30 UTC'},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="audit · cac" />
      <div style={{padding:'20px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>

        {/* Headline KPI with audit stamp */}
        <div style={{
          background:'linear-gradient(135deg, rgba(9,160,157,.10) 0%, rgba(9,160,157,.02) 100%)',
          border:'1px solid rgba(9,160,157,.32)',
          borderRadius:'11px',
          padding:'12px 14px',
          marginBottom:'var(--ins-size-3)',
          display:'flex',alignItems:'center',justifyContent:'space-between',gap:'var(--ins-size-3)',
        }}>
          <div style={{minWidth:0}}>
            <div style={{display:'flex',alignItems:'baseline',gap:'10px'}}>
              <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-22)',fontWeight:500,color:'var(--ins-color-gray-100)',letterSpacing:'-.01em'}}>$214</span>
              <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-11)',color:'var(--ins-text-body)'}}>blended_cac · Q2 MTD</span>
            </div>
            <div style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',letterSpacing:'.06em',textTransform:'uppercase',marginTop:'var(--ins-size-1)'}}>
              Marketing Ops · v2.4 · 4 channels
            </div>
          </div>
          <span style={{
            display:'inline-flex',alignItems:'center',gap:'5px',
            padding:'4px 10px',borderRadius:'999px',
            background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.3)',
            fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-status-success-fg)',
            letterSpacing:'.08em',textTransform:'uppercase',whiteSpace:'nowrap',flexShrink:0,
          }}>
            <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--ins-status-success-fg)'}}/>
            audit-ready
          </span>
        </div>

        {/* Trace eyebrow */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'7px'}}>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-inactive)',letterSpacing:'.1em',textTransform:'uppercase'}}>↳ trace to spend</span>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-body)'}}>4 channels</span>
        </div>

        {/* Lineage rows */}
        <div style={{position:'relative',paddingLeft:'14px'}}>
          {/* Tree spine */}
          <div style={{
            position:'absolute',
            left:'4px',top:'4px',bottom:'14px',
            width:'1px',
            background:'rgba(14,196,193,.25)',
          }}/>

          {trace.map((t,i)=>(
            <div key={i} style={{position:'relative',marginBottom:i<trace.length-1?'5px':'0'}}>
              {/* Branch tick */}
              <div style={{
                position:'absolute',
                left:'-10px',top:'14px',
                width:'10px',height:'1px',
                background:'rgba(14,196,193,.32)',
              }}/>
              <div style={{
                background:'rgba(255,255,255,.022)',
                border:'1px solid var(--ins-color-white-a-06)',
                borderRadius:'var(--ins-radius-8)',
                padding:'8px 11px',
                display:'flex',alignItems:'center',gap:'10px',
              }}>
                <span style={{fontSize:'11.5px',color:'var(--ins-color-gray-100)',fontWeight:500,minWidth:'92px',flexShrink:0}}>{t.label}</span>
                <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-12)',color:'var(--ins-text-highlight)',fontWeight:500,minWidth:'46px',flexShrink:0}}>{t.amt}</span>
                <div style={{flex:1,minWidth:0,display:'flex',alignItems:'center',gap:'6px',fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-body)'}}>
                  <span style={{
                    color:'var(--ins-status-warning-fg)',
                    padding:'1px 6px',borderRadius:'var(--ins-radius-4)',
                    background:'rgba(251,191,36,.08)',
                    border:'1px solid rgba(251,191,36,.22)',
                    letterSpacing:'.04em',
                    flexShrink:0,
                  }}>{t.src}</span>
                  <span style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.detail} · {t.owner}</span>
                </div>
                <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9px',color:'var(--ins-text-inactive)',whiteSpace:'nowrap',flexShrink:0,letterSpacing:'.04em'}}>{t.ts}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Audit footer */}
        <div style={{
          marginTop:'var(--ins-size-3)',
          paddingTop:'10px',
          borderTop:'1px dashed var(--ins-color-white-a-06)',
          display:'flex',alignItems:'center',justifyContent:'space-between',
          fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',
          letterSpacing:'.04em',
        }}>
          <span style={{display:'inline-flex',alignItems:'center',gap:'6px'}}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--ins-status-success-fg)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
            <span>SOC 2 trail</span>
          </span>
          <span>signed off by Marketing Ops · 06:42 UTC</span>
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
      title:'Campaign answers on demand',
      body:'Ask any campaign, channel, or spend question in plain English — ROAS, CAC, funnel drop-off — and Insightis answers from your ad platforms, analytics, and CRM in seconds.',
      bullets:['Plain-English questions across every channel','Marketers unblock themselves without SQL or exports'],
      visual:<SpotlightChat />,
    },
    {
      eyebrow:'Certified Metrics',
      title:'One attribution model everyone trusts',
      body:'Demand Gen counts last-touch, Brand counts first-touch, Finance counts blended CAC. Insightis aligns ROAS and CAC under one certified attribution model the whole company trusts.',
      bullets:['ROAS and CAC agreed across teams','Attribution model defined once, applied everywhere'],
      visual:<SpotlightSemantic />,
    },
    {
      eyebrow:'Risk & Anomaly Detection',
      title:'Catch CAC drift before quarter-end',
      body:'Insightis scans every answer for the channel quietly running CAC up or letting ROAS decay — surfaced inline, not on a dashboard you only open at the QBR.',
      bullets:['CAC drift and channel decline flagged inside every answer','Channel and platform breakdowns automatically'],
      visual:<SpotlightAnomalies />,
    },
    {
      eyebrow:'Trace to Source',
      title:'Every number traced to the spend',
      body:'Every ROAS and CAC figure carries its channels, spend, and timestamps in one place — finance and the board see the same trail without a reconciliation pass.',
      bullets:['Full lineage from metric down to the campaign','Channel, spend, and timestamp stamped on every figure'],
      visual:<SpotlightStack />,
    },
  ];

  return (
    <section id="spotlights" style={{padding:'80px 0 100px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'72px'}}>
          <SectionHeader
            eyebrow="How it works"
            title="Built for the way marketing teams actually work"
            lede="Four capabilities that turn marketing data from a Monday-morning bottleneck into answers you can act on today."
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
                gap:'var(--ins-size-16)',
                alignItems:'center',
              }}>
                <div data-spotlight-text style={{order: reverse ? 2 : 0}}>
                  <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'18px'}}>
                    <span style={{fontSize:'var(--ins-font-size-12)'}}>✦</span>
                    <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'var(--ins-font-family-mono)'}}>{s.eyebrow}</span>
                  </div>
                  <h3 className="ins-text-h2" style={{marginBottom:'18px'}}>
                    {s.title}
                  </h3>
                  <p className="ins-text-body-lg" style={{marginBottom:'22px'}}>
                    {s.body}
                  </p>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
                    {s.bullets.map((b,bi) => (
                      <li key={bi} style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'var(--ins-font-size-14)',color:'var(--ins-text-body)',lineHeight:1.55}}>
                        <CheckIcon size={12} style={{flexShrink:0,marginTop:'var(--ins-size-1)'}} />
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
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 14l4-4 4 4 5-6" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title:'Live ROAS by channel',
      desc:'Live ROAS and spend by channel anytime — no more waiting for the agency deck or a Monday pull. Every platform, every campaign, real-time.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 3H5a2 2 0 0 0-2 2v3m6-5h6M8 3v18m8-18v18M16 3h3a2 2 0 0 1 2 2v3M2 9h20M2 15h20M2 21h3m16 0h3" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'One attribution model',
      desc:'One semantic layer governs every metric — ROAS, CAC, blended CAC — under a single attribution model owned by Marketing Ops. No more arguments about whose number is right.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Funnel drop-off alerts',
      desc:'Funnel leaks flagged before they compound. The moment a stage starts converting worse — Click → MQL, MQL → SQL — you know, not at the end-of-quarter review.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><path d="M7 9h10M7 13h6" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Same-day budget reallocation',
      desc:'See which channels are over- and under-performing and shift budget the same day — no analyst queue, no pivot-table archaeology, no waiting for the weekly report.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><line x1="3" y1="10" x2="21" y2="10" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><line x1="8" y1="3" x2="8" y2="9" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><line x1="16" y1="3" x2="16" y2="9" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/></svg>,
      title:'Campaign cohort analysis',
      desc:'Slice retention and payback by acquisition campaign, channel, or cohort week — without writing complex joins across ad, analytics, and billing tables.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><path d="M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Cross-source MQL → customer view',
      desc:'Correlate ad spend with analytics and CRM in one question — how many MQLs from paid social became paying customers. No SQL, no analyst, no two-week turnaround.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-20)'}}>
          <div style={{
            position:'relative',borderRadius:'var(--ins-radius-16)',
            border:'1px solid rgba(30,30,48,1)',
            padding:'32px 48px',overflow:'hidden',
            display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:'var(--ins-size-6)',
            flexWrap:'wrap',
            background:'linear-gradient(135deg,var(--ins-color-promo-a) 0%,var(--ins-color-promo-b) 50%,var(--ins-color-promo-a) 100%)',
          }}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
            <div style={{flex:'1 1 360px',minWidth:0}}>
              <h3 style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:500,color:'var(--ins-text-heading)',letterSpacing:'-.03em',lineHeight:1.2,marginBottom:'var(--ins-size-2)'}}>
                See it on <span style={{color:'var(--ins-button-primary-bg)'}}>your own campaigns</span>.
              </h3>
              <p className="ins-text-body">
                Connect Google Ads or Meta and ask Insightis the campaign question that always takes too long to answer.
              </p>
            </div>
            <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
              Get started for free
            </Button>
          </div>
        </div>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="Use cases"
            title="What marketing teams use Insightis for"
            sparkle
          />
        </div>

        <div data-usecase-grid style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}}>
          {cases.map((c,i) => (
            <div key={i}
              className="ins-prompt-card"
              style={{padding:'var(--ins-size-6)', position:'relative', overflow:'hidden'}}
            >
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(9,160,157,.2),transparent)'}}/>
              <div style={{width:'38px',height:'38px',borderRadius:'10px',background:'var(--ins-color-teal-a-08)',border:'1px solid rgba(9,160,157,.2)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px'}}>
                {c.icon}
              </div>
              <h3 style={{fontSize:'var(--ins-font-size-15)',fontWeight:600,color:'var(--ins-text-heading-soft)',marginBottom:'6px'}}>{c.title}</h3>
              <p className="ins-text-body">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── RELEVANT INTEGRATIONS ── */
function RelevantIntegrations() {
  const connectors = [
    { name:'Google Ads',     desc:'Paid search' },
    { name:'Facebook Ads',   desc:'Paid social' },
    { name:'LinkedIn Ads',   desc:'B2B ads' },
    { name:'TikTok Ads',     desc:'Paid social' },
    { name:'Google Analytics', desc:'Web analytics' },
    { name:'HubSpot',        desc:'Marketing & CRM' },
    { name:'Salesforce',     desc:'CRM & pipeline' },
    { name:'Marketo',        desc:'Marketing automation' },
    { name:'Klaviyo',        desc:'Email & SMS' },
    { name:'Mailchimp',      desc:'Email marketing' },
    { name:'Pinterest',      desc:'Paid social' },
    { name:'Segment',        desc:'Customer data' },
    { name:'Amplitude',      desc:'Product analytics' },
    { name:'Stripe',         desc:'Revenue data' },
    { name:'Snowflake',      desc:'Data warehouse' },
    { name:'BigQuery',       desc:'Cloud analytics' },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="Your Marketing Stack"
            title="Connects to every ad platform and channel"
            lede="Insightis integrates with your ad platforms, analytics, CRM, and warehouse stack."
            sparkle
          />
        </div>

        <div data-connectors-grid style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'var(--ins-size-8)'}}>
          {connectors.map((c,i) => (
            <div key={i} className="connector-card">
              <ConnectorIcon name={c.name} size={32} />
              <div>
                <div style={{fontSize:'13px',fontWeight:500,color:'var(--ins-color-gray-100)'}}>{c.name}</div>
                <div style={{fontSize:'var(--ins-font-size-11)',color:'var(--ins-text-inactive)',marginTop:'var(--ins-size-half)'}}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center'}}>
          <a href="/Resources/Connectors" style={{
            display:'inline-flex',alignItems:'center',gap:'6px',
            fontSize:'13px',color:'var(--ins-text-body)',
            textDecoration:'none',
            border:'1px solid var(--ins-color-white-a-07)',
            borderRadius:'999px',
            padding:'8px 20px',
            background:'var(--ins-color-white-a-02)',
            transition:'all .15s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.color='var(--ins-text-highlight)';e.currentTarget.style.borderColor='rgba(9,160,157,.3)';}}
          onMouseLeave={e=>{e.currentTarget.style.color='var(--ins-text-body)';e.currentTarget.style.borderColor='var(--ins-color-white-a-07)';}}
          >
            See all 200+ integrations
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const items = [
    {
      q:'How does Insightis handle multi-touch attribution?',
      a:'Insightis supports first-touch, last-touch, linear, time-decay, and custom-weight attribution models — applied consistently across every channel. Define the model once in the semantic layer; every question respects it from then on.',
    },
    {
      q:'Will it work with our existing Google Ads, Meta, and LinkedIn setup?',
      a:'Yes. Native connectors for Google Ads, Meta, LinkedIn, TikTok, and 200+ other ad platforms. Spend, impressions, clicks, and conversions sync automatically — no UTM-tagging gymnastics or manual exports required.',
    },
    {
      q:'How quickly can it surface a CAC anomaly across channels?',
      a:'Same day. Insightis flags channel-level CAC drift the moment it crosses your defined threshold — by Slack, email, or in the AI Chat insights feed. No more month-end surprises buried under blended numbers.',
    },
    {
      q:'Does this replace our existing analytics stack (GA4, Adobe, Mixpanel)?',
      a:'No, it sits on top. Insightis reads from your existing analytics tools and unifies them with CRM and billing data — so you can ask "how many MQLs from paid social converted to paying customers?" in a single question.',
    },
    {
      q:'What about marketing data privacy and PII?',
      a:'PII fields can be masked, hashed, or excluded from queries via field-level access controls. SOC 2 Type II certified, GDPR-aligned, with full audit logs on every query and share. Your data never leaves your warehouse.',
    },
    {
      q:'How long until our marketing team uses it daily?',
      a:'Most marketing teams have campaigns wired up and are asking real questions within a day. Setting up custom attribution models takes another half-day if your business needs go beyond the first-touch and last-touch defaults.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'880px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'52px'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'var(--ins-font-size-12)'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'var(--ins-font-family-mono)'}}>FAQ</span>
          </div>
          <h2 className="ins-text-display mb-3">
            Questions every CMO asks first
          </h2>
        </div>

        <FAQAccordion items={items} />
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section style={{paddingTop:'var(--ins-size-8)',paddingBottom:'var(--ins-size-32)',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <BottomCTA
          variant="form"
          title={<>Stop building <BottomCTA.Highlight>reports.</BottomCTA.Highlight> Start getting <BottomCTA.Highlight>answers.</BottomCTA.Highlight></>}
          inputPlaceholder="Show me CAC by channel..."
          ctaLabel="Get started"
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
