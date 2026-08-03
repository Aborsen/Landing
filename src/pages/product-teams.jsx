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
import ConnectorCard from '../components/ConnectorCard';
import HeroMockup from '../components/HeroMockup';

/* The three section shells below are shared. Each page keeps a same-named local
   wrapper that supplies its own data and copy, so App()'s composition never
   changes and the page-local mockups (SpotlightChat/Semantic/Anomalies and
   ChromeHeader) stay page-local. Aliased on import to leave those wrapper names
   free. */
import SharedFeatureSpotlights from '../components/FeatureSpotlights';
import SharedUseCases from '../components/UseCases';
import SharedSpotlightStack from '../components/SpotlightStack';
import ArrowRightIcon from '../components/ArrowRightIcon';

/* ── CHART COMPONENTS (verbatim from AI Chat.html) ── */

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
              <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'var(--ins-font-family-mono)'}}>For Product Teams</span>
            </div>

            <h1 className="ins-text-display-xl" style={{marginBottom:'var(--ins-size-5)'}}>
              <span style={{color:'var(--ins-text-heading-soft)'}}>Stop guessing what users</span>
              <br/>
              <span style={{color:'var(--ins-text-highlight)'}}>actually do</span>
            </h1>

            <p className="fu2 ins-text-body-xl" style={{marginBottom:'var(--ins-size-7)',maxWidth:'480px'}}>
              Stop waiting two weeks for a data pull. Ask any product question in plain English — Insightis answers from your events, billing, and CRM in seconds.
            </p>

            <div className="fu3" style={{display:'flex',gap:'var(--ins-size-3)',flexWrap:'wrap',marginBottom:'var(--ins-size-7)'}}>
              <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
                Start for free
              </Button>
            </div>

          </div>

          {/* Right: product-flavored hero visual (static) — shared HeroMockup shell */}
          <HeroMockup
            title="Insightis — For Product Teams"
            accentLine="rgba(167,139,250,.55)"
            glow="radial-gradient(circle at 25% 25%, rgba(167,139,250,.18) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(9,160,157,.12) 0%, transparent 50%)"
            badge={
              <HeroMockup.Badge accentRgb="167,139,250">
                <div style={{
                  width:'8px',height:'8px',borderRadius:'50%',background:'var(--ins-color-purple-400)',
                  flexShrink:0,
                }}/>
                <div>
                  <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase'}}>Experiment</div>
                  <div style={{fontSize:'12.5px',color:'var(--ins-color-purple-400)',fontWeight:500,fontFamily:'var(--ins-font-family-mono)',marginTop:'1px'}}>onboarding_v3</div>
                </div>
              </HeroMockup.Badge>
            }
            card={
              <HeroMockup.FloatCard accentRgb="9,160,157">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'var(--ins-size-2)'}}>
                  <span style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase'}}>Retention</span>
                  <span style={{fontSize:'10.5px',color:'var(--ins-text-highlight)',fontFamily:'var(--ins-font-family-mono)',fontWeight:500}}>W12 · 28%</span>
                </div>
                <svg viewBox="0 0 140 32" width="100%" height="28" preserveAspectRatio="none" style={{display:'block',marginBottom:'var(--ins-size-1)'}}>
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
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'9px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.04em'}}>
                  <span>W0</span><span>W4</span><span>W8</span><span>W12</span>
                </div>
              </HeroMockup.FloatCard>
            }
          >

              {/* Header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--ins-color-purple-400)',boxShadow:'0 0 8px rgba(167,139,250,.6)'}}/>
                  <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10.5px',color:'var(--ins-text-body)',letterSpacing:'.08em',textTransform:'uppercase'}}>Funnel · May cohort</span>
                </div>
                <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-color-purple-400)',padding:'3px 9px',borderRadius:'999px',background:'rgba(167,139,250,.1)',border:'1px solid rgba(167,139,250,.25)',letterSpacing:'.08em',textTransform:'uppercase'}}>cohort</span>
              </div>

              {/* Headline + caption */}
              <h3 style={{fontSize:'var(--ins-font-size-17)',fontWeight:500,color:'var(--ins-text-heading-soft)',marginBottom:'6px',letterSpacing:'-.015em',lineHeight:1.35}}>
                Onboarding cliff at <span style={{color:'var(--ins-color-purple-400)'}}>step 3</span>
              </h3>
              <p className="ins-text-body-sm" style={{marginBottom:'var(--ins-size-4)'}}>
                <span style={{color:'var(--ins-text-highlight)',fontFamily:'var(--ins-font-family-mono)',fontSize:'11.5px'}}>workspace_created</span> dropped <span style={{color:'var(--ins-status-error-fg)',fontWeight:500}}>−41%</span>. 87% on mobile.<br/>New invite flow shipped Tuesday.
              </p>

              {/* Funnel breakdown */}
              <div style={{
                background:'rgba(255,255,255,.018)',
                border:'1px solid var(--ins-color-white-a-05)',
                borderRadius:'14px',
                padding:'14px 14px 18px',
                marginBottom:'14px',
              }}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'var(--ins-size-3)'}}>
                  <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-inactive)',letterSpacing:'.06em',textTransform:'uppercase'}}>activation funnel</span>
                  <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-body)'}}>n = 12,840</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {label:'sign_up',           pct:100, val:'12,840', cliff:false},
                    {label:'email_verified',    pct:92,  val:'11,816', cliff:false},
                    {label:'workspace_created', pct:51,  val:'6,548',  cliff:true},
                    {label:'first_invite',      pct:38,  val:'4,879',  cliff:false},
                    {label:'activated',         pct:31,  val:'3,980',  cliff:false},
                  ].map((s,i) => (
                    <div key={i} style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{
                        fontFamily:'var(--ins-font-family-mono)',
                        fontSize:'10px',
                        color:s.cliff?'var(--ins-status-error-fg)':'var(--ins-text-body)',
                        width:'112px',flexShrink:0,
                        whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',
                      }}>{s.label}</span>
                      <div style={{flex:1,height:'14px',background:'var(--ins-color-white-a-04)',borderRadius:'3px',overflow:'hidden',position:'relative'}}>
                        <div style={{
                          width:`${s.pct}%`,
                          height:'100%',
                          background:s.cliff
                            ? 'linear-gradient(90deg, rgba(248,113,113,.45), rgba(248,113,113,.75))'
                            : 'linear-gradient(90deg, var(--ins-color-teal-a-30), var(--ins-color-teal-a-60))',
                          borderRadius:'3px',
                        }}/>
                      </div>
                      <span style={{
                        fontFamily:'var(--ins-font-family-mono)',
                        fontSize:'10.5px',
                        color:s.cliff?'var(--ins-status-error-fg)':'var(--ins-text-body)',
                        width:'34px',textAlign:'right',flexShrink:0,
                      }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric tiles — product-relevant */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'var(--ins-size-2)'}}>
                {[
                  {label:'Cliff step', val:'#3',       color:'var(--ins-status-error-fg)'},
                  {label:'Cohort',     val:'May new',  color:'var(--ins-color-purple-400)'},
                  {label:'Mobile',     val:'87%',      color:'var(--ins-text-highlight)'},
                ].map((m,i) => (
                  <div key={i} style={{
                    background:'rgba(255,255,255,.025)',
                    border:'1px solid var(--ins-color-white-a-06)',
                    borderRadius:'10px',
                    padding:'10px 12px',
                  }}>
                    <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'var(--ins-size-1)'}}>{m.label}</div>
                    <div style={{fontSize:'var(--ins-font-size-14)',fontWeight:500,color:m.color,fontFamily:'var(--ins-font-family-mono)',letterSpacing:'-.01em'}}>{m.val}</div>
                  </div>
                ))}
              </div>
          </HeroMockup>
        </div>
      </div>
    </section>
  );
}

/* ── RELEVANT INTEGRATIONS ── */
function RelevantIntegrations() {
  const connectors = [
    { name:'Amplitude',   desc:'Product analytics' },
    { name:'Segment',     desc:'Customer data' },
    { name:'Google Analytics', desc:'Web analytics' },
    { name:'FullStory',   desc:'Session replay' },
    { name:'Intercom',    desc:'Customer messaging' },
    { name:'Zendesk',     desc:'Support tickets' },
    { name:'Jira',        desc:'Issue tracking' },
    { name:'GitHub',      desc:'Source & releases' },
    { name:'Slack',       desc:'Team comms' },
    { name:'Notion',      desc:'Docs & planning' },
    { name:'Salesforce',  desc:'CRM & pipeline' },
    { name:'HubSpot',     desc:'CRM & marketing' },
    { name:'Stripe',      desc:'Billing & revenue' },
    { name:'Snowflake',   desc:'Data warehouse' },
    { name:'Google BigQuery', desc:'Cloud analytics' },
    { name:'PostgreSQL',  desc:'Database' },
  ];

  return (
    <section style={{padding:'100px 0',background:'var(--ins-glow-section)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="Your Product Stack"
            title="Connects to every product data source"
            lede="Insightis integrates with your event analytics, billing, CRM, and warehouse stack."
          />
        </div>

        <div data-connectors-grid style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'var(--ins-size-8)'}}>
          {connectors.map((c,i) => (
            <ConnectorCard key={i} name={c.name} desc={c.desc} />
          ))}
        </div>

        <div style={{textAlign:'center'}}>
          <a href="/resources/connectors" style={{
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

/* ── BEFORE / AFTER ── */

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section style={{paddingTop:'var(--ins-size-8)',paddingBottom:'var(--ins-size-32)',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <BottomCTA
          variant="buttons"
          title={<>Stop <BottomCTA.Highlight>guessing.</BottomCTA.Highlight> Start <BottomCTA.Highlight>shipping</BottomCTA.Highlight></>}
          description="Activation, retention and feature adoption in seconds — no SQL, no data-team queue. Free to start, no credit card required."
          ctaLabel="Start for free"
          secondaryCtaLabel="Explore Pricing"
          secondaryCtaHref="/pricing"
        />
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
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
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
          <div style={{fontSize:'12.5px',lineHeight:1.6,marginBottom:'var(--ins-size-3)'}}>
            Adoption climbed across every plan since the <span style={{color:'var(--ins-text-highlight)',fontWeight:500}}>v2.4</span> ship in March. <span style={{color:'var(--ins-text-highlight)',fontWeight:500}}>Pro</span> leads at 78% (+34pts QoQ); <span style={{color:'var(--ins-status-error-fg)',fontWeight:500}}>Free</span> at 18% remains the soft spot. Strongest lift came from the Team plan after the in-app prompt rolled out.
          </div>

          {/* KPI blocks */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'7px',marginBottom:'10px'}}>
            {[
              {label:'Pro',     val:'78%',   color:'var(--ins-text-highlight)', sub:'best plan'},
              {label:'QoQ lift',val:'+34pt', color:'var(--ins-status-success-fg)', sub:'on Pro'},
              {label:'Free',    val:'18%',   color:'var(--ins-status-error-fg)', sub:'soft spot'},
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
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="metric · active_user" />
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
            <div style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'13.5px',color:'var(--ins-color-gray-100)',fontWeight:500}}>active_user</div>
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
            <span style={{color:'var(--ins-text-body)'}}>count(distinct user_id) with</span> <span style={{color:'var(--ins-text-highlight)'}}>core_action</span> <span style={{color:'var(--ins-text-body)'}}>in last 7d</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',gap:'10px',fontSize:'10.5px',color:'var(--ins-text-body)'}}>
            <span><span style={{color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.06em',textTransform:'uppercase',fontSize:'9px',marginRight:'5px'}}>Owned</span>Product Analytics</span>
            <span><span style={{color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.06em',textTransform:'uppercase',fontSize:'9px',marginRight:'5px'}}>Used by</span>12 reports · 3 teams</span>
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
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="cohort · breakdown" />
      <div style={{padding:'20px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* User question */}
        <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)',marginBottom:'var(--ins-size-3)'}}>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',letterSpacing:'.08em',textTransform:'uppercase'}}>asked</span>
          <span style={{fontSize:'12.5px',color:'var(--ins-text-body)'}}>"Which cohort is dragging activation?"</span>
        </div>

        {/* Multi-cohort line chart */}
        <div style={{
          background:'rgba(255,255,255,.018)',
          border:'1px solid var(--ins-color-white-a-05)',
          borderRadius:'10px',
          padding:'12px 12px 10px',
          marginBottom:'var(--ins-size-3)',
        }}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'var(--ins-size-2)'}}>
            <div style={{display:'flex',gap:'10px',fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',alignItems:'center'}}>
              <span style={{color:'var(--ins-color-purple-400)',display:'inline-flex',alignItems:'center',gap:'var(--ins-size-1)'}}><span style={{width:'10px',height:'2px',background:'var(--ins-color-purple-400)',borderRadius:'1px'}}/>Apr</span>
              <span style={{color:'var(--ins-status-error-fg)',display:'inline-flex',alignItems:'center',gap:'var(--ins-size-1)'}}><span style={{width:'10px',height:'2px',background:'var(--ins-status-error-fg)',borderRadius:'1px'}}/>May</span>
              <span style={{color:'var(--ins-text-highlight)',display:'inline-flex',alignItems:'center',gap:'var(--ins-size-1)'}}><span style={{width:'10px',height:'2px',background:'var(--ins-text-highlight)',borderRadius:'1px'}}/>Jun</span>
            </div>
            <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-body)'}}>activation · D7</span>
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
    {label:'Sign-ups',  amt:'12,840', src:'Segment',   detail:'sign_up',           owner:'Growth',  ts:'06:30 UTC'},
    {label:'Verified',  amt:'11,816', src:'Segment',   detail:'email_verified',    owner:'Growth',  ts:'06:30 UTC'},
    {label:'Workspace', amt:'6,548',  src:'Amplitude', detail:'workspace_created', owner:'Product', ts:'06:30 UTC'},
    {label:'Activated', amt:'3,980',  src:'Amplitude', detail:'core_action in 7d', owner:'Product', ts:'06:30 UTC'},
  ];
  return (
    <SharedSpotlightStack
      chrome={<ChromeHeader label="audit · activation_rate" />}
      kpiValue="31.0%"
      kpiMeta="activation_rate · May cohort"
      ownerLine="Product Analytics · v2.4 · 2 source systems"
      traceEyebrow="drill to source"
      traceCount="4 funnel steps"
      trace={trace}
      footerLabel="Audit trail"
      signoff="signed off by Product Analytics · 06:42 UTC"
    />
  );
}

/* ── FEATURE SPOTLIGHTS ── */
function FeatureSpotlights() {
  const spots = [
    {
      eyebrow:'Self-Serve',
      title:'Product answers on demand',
      body:'Ask any product question in plain English — adoption, retention, funnel drop-off — and Insightis answers from your event, billing, and CRM data in seconds.',
      bullets:['Plain-English questions across the product org','PMs unblock themselves without SQL'],
      visual:<SpotlightChat />,
    },
    {
      eyebrow:'Semantic Layer',
      title:'One definition per metric',
      body:'Marketing counts trials, CS counts logins, Product counts core actions. Define each metric once — owned, versioned, and used everywhere.',
      bullets:['Certify a metric once, reuse it everywhere','Owned definitions with full change history'],
      visual:<SpotlightSemantic />,
    },
    {
      eyebrow:'Cohort Anomaly Detection',
      title:'Spot the breaking cohort early',
      body:'Insightis scans every answer for the cohort, segment, or platform pulling a metric the wrong way — surfaced inline, not on a dashboard you forgot to open.',
      bullets:['Unusual movement surfaced as you ask','Cohort and segment breakdowns automatically'],
      visual:<SpotlightAnomalies />,
    },
    {
      eyebrow:'Full Lineage',
      title:'Review-ready answers, with full lineage',
      body:'Every number carries its events, owners, and timestamps in one place — the data team and your exec stakeholders see the same trail without a reconciliation pass.',
      bullets:['Full lineage from metric down to the event','Owner, timestamp, and version stamped on every figure'],
      visual:<SpotlightStack />,
    },
  ];

  return (
    <SharedFeatureSpotlights
      spots={spots}
      background="var(--ins-glow-section)"
      title="Built for the way product teams actually work"
      lede="Four capabilities that turn the data layer from a bottleneck into something you can ship against."
    />
  );
}

/* ── USE CASES ── */
function UseCases() {
  const cases = [
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 14l4-4 4 4 5-6" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title:'Live feature adoption by cohort',
      desc:'Live adoption and retention by cohort anytime — no more waiting two weeks on a data ticket for the numbers. Every plan, every persona, real-time.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 3H5a2 2 0 0 0-2 2v3m6-5h6M8 3v18m8-18v18M16 3h3a2 2 0 0 1 2 2v3M2 9h20M2 15h20M2 21h3m16 0h3" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Certified product metrics',
      desc:'One Semantic Layer governs activation, retention, and adoption — owned and versioned by the data team. No more arguing whose number is right.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Proactive cohort risk alerts',
      desc:'Cohort risk flagged before it compounds. The moment retention dips or drop-off spikes, you know — not at the next quarterly review.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><path d="M7 9h10M7 13h6" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Ad hoc product analysis without SQL',
      desc:'Any product question answered instantly — retention by plan, adoption by persona, time-to-value by cohort. No analyst queue, no pivot-table archaeology.',
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
    <SharedUseCases
      cases={cases}
      background="var(--ins-glow-section)"
      promoTitle={<>See it on <SharedUseCases.Highlight>your own product data</SharedUseCases.Highlight></>}
      promoDesc="Connect Amplitude or Segment and ask Insightis the product question that always takes too long to answer."
      title="What product teams use Insightis for"
    />
  );
}

/* ── TESTIMONIALS ── */

/* ── FAQ ── */
function FAQ() {
  const items = [
    {
      q:'Does this replace Amplitude or Google Analytics 4?',
      a:'No — Insightis sits on top of them. We connect to Amplitude, Segment, FullStory, Google Analytics 4, and your warehouse so you can ask cross-tool questions in plain English. The dashboards your team already built keep working; Insightis answers the long-tail questions that would otherwise turn into a data ticket.',
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
      a:'Define each metric once in the Semantic Layer — what counts as activation, what counts as a retained user, how cohorts are formed. From then on every team uses the same definition. No more "marketing\'s active users vs. product\'s active users" debates.',
    },
    {
      q:'Will this work with experiments and A/B test data?',
      a:'Yes. Point Insightis at your experiment exposure events and the metrics you care about, and ask for the readout in plain English. You\'ll get lift, confidence, and segment breakdowns without waiting on a data team to write a one-off analysis.',
    },
    {
      q:'How is security and PII handled?',
      a:'Insightis respects your warehouse and source-tool permissions — every query runs as the connected role, so row-level and column-level security stay in force. No event data is copied out of your sources, and your data is never used to train AI models.',
    },
  ];

  return (
    <section style={{padding:'100px 0'}}>
      <div style={{maxWidth:'880px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'52px'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'var(--ins-font-family-mono)'}}>FAQ</span>
          </div>
          <h2 className="ins-text-display mb-3">
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
    <div className="ins-bg-noise">
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
