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
import ConnectorCard from '../components/ConnectorCard';
import HeroMockup from '../components/HeroMockup';

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
              <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'var(--ins-font-family-mono)'}}>For Executive Teams</span>
            </div>

            <h1 className="ins-text-display-xl" style={{marginBottom:'var(--ins-size-5)'}}>
              <span style={{color:'var(--ins-text-heading-soft)'}}>Stop running the company</span>
              <br/>
              <span style={{color:'var(--ins-text-highlight)'}}>on stale numbers</span>
            </h1>

            <p className="fu2 ins-text-body-xl" style={{marginBottom:'var(--ins-size-7)',maxWidth:'480px'}}>
              Strategic answers in seconds. Ask in plain English — runway, ARR growth, NRR, burn — and walk into the board meeting with live numbers, not last week's deck.
            </p>

            <div className="fu3" style={{display:'flex',gap:'var(--ins-size-3)',flexWrap:'wrap',marginBottom:'var(--ins-size-7)'}}>
              <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
                Start for free
              </Button>
            </div>

          </div>

          {/* Right: hero section image — shared HeroMockup shell */}
          <HeroMockup
            title="Insightis — For Executive Teams"
            accentLine="rgba(14,196,193,.55)"
            glow="radial-gradient(circle at 30% 30%, rgba(9,160,157,.18) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(110,60,200,.10) 0%, transparent 50%)"
            badge={
              <HeroMockup.Badge accentRgb="34,197,94">
                <div style={{
                  width:'8px',height:'8px',borderRadius:'50%',background:'var(--ins-status-success-fg)',
                  flexShrink:0,
                }}/>
                <div>
                  <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase'}}>Board-ready</div>
                  <div style={{fontSize:'12.5px',color:'var(--ins-status-success-fg)',fontWeight:500,fontFamily:'var(--ins-font-family-mono)',marginTop:'1px'}}>metrics certified</div>
                </div>
              </HeroMockup.Badge>
            }
            card={
              <HeroMockup.FloatCard accentRgb="9,160,157">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'var(--ins-size-2)'}}>
                  <span style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase'}}>Runway</span>
                  <span style={{fontSize:'10.5px',color:'var(--ins-status-success-fg)',fontFamily:'var(--ins-font-family-mono)',fontWeight:500}}>19 mo</span>
                </div>
                <div style={{display:'flex',alignItems:'flex-end',gap:'2.5px',height:'24px',marginBottom:'6px'}}>
                  {[92,88,84,80,74,70,64,58,52].map((v,i)=>(
                    <div key={i} style={{
                      flex:1,
                      height:`${v}%`,
                      background: i>=6 ? 'linear-gradient(180deg,var(--ins-text-highlight),var(--ins-button-primary-bg-hover))' : 'rgba(14,196,193,0.32)',
                      borderRadius:'2px 2px 0 0',
                      minHeight:'4px',
                    }}/>
                  ))}
                </div>
                <div style={{fontSize:'var(--ins-font-size-11)',color:'var(--ins-text-body)',fontWeight:400}}>Cash burn ↓ at current spend</div>
              </HeroMockup.FloatCard>
            }
          >

              {/* Header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--ins-status-success-fg)',boxShadow:'0 0 8px var(--ins-status-success-fg)'}}/>
                  <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10.5px',color:'var(--ins-text-body)',letterSpacing:'.08em',textTransform:'uppercase'}}>Company health · live</span>
                </div>
                <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-highlight)',padding:'3px 9px',borderRadius:'999px',background:'rgba(9,160,157,.1)',border:'1px solid rgba(9,160,157,.25)',letterSpacing:'.08em',textTransform:'uppercase'}}>board</span>
              </div>

              {/* Headline + caption */}
              <h3 style={{fontSize:'var(--ins-font-size-17)',fontWeight:500,color:'var(--ins-text-heading-soft)',marginBottom:'6px',letterSpacing:'-.015em',lineHeight:1.35}}>
                Net revenue retention climbed to <span style={{color:'var(--ins-status-success-fg)'}}>128%</span>
              </h3>
              <p className="ins-text-body-sm" style={{marginBottom:'var(--ins-size-4)'}}>
                <span style={{color:'var(--ins-text-highlight)',fontFamily:'var(--ins-font-family-mono)',fontSize:'11.5px'}}>net_revenue_retention</span> rose <span style={{color:'var(--ins-status-success-fg)',fontWeight:500}}>+9pts</span> QoQ as expansion outpaced churn. Reconciled across CRM, billing, and product in real time.
              </p>

              {/* Chart */}
              <div style={{
                background:'rgba(255,255,255,.018)',
                border:'1px solid var(--ins-color-white-a-05)',
                borderRadius:'14px',
                padding:'16px 14px 12px',
                marginBottom:'14px',
                position:'relative',
              }}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'var(--ins-size-2)'}}>
                  <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-inactive)',letterSpacing:'.06em',textTransform:'uppercase'}}>NRR / quarter</span>
                  <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-body)'}}>last 8 qtrs</span>
                </div>
                <svg viewBox="0 0 280 84" width="100%" height="126" preserveAspectRatio="none" style={{display:'block'}}>
                  <defs>
                    <linearGradient id="hero-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--ins-text-highlight)" stopOpacity="0.32"/>
                      <stop offset="100%" stopColor="var(--ins-text-highlight)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="22" x2="280" y2="22" stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3"/>
                  <line x1="0" y1="52" x2="280" y2="52" stroke="rgba(255,255,255,0.04)" strokeDasharray="2,3"/>
                  <path d="M0,60 L18,58 L36,56 L54,54 L72,50 L90,48 L108,44 L126,42 L144,40 L162,36 L180,32 L198,30 L216,26 L234,22 L252,18 L270,16 L280,14 L280,84 L0,84 Z" fill="url(#hero-area-grad)"/>
                  <path d="M0,60 L18,58 L36,56 L54,54 L72,50 L90,48 L108,44 L126,42 L144,40 L162,36" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M162,36 L180,32 L198,30 L216,26 L234,22 L252,18 L270,16 L280,14" fill="none" stroke="var(--ins-status-success-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="162" y1="0" x2="162" y2="84" stroke="rgba(34,197,94,0.25)" strokeDasharray="2,2"/>
                  <circle cx="280" cy="14" r="3.5" fill="var(--ins-status-success-fg)"/>
                </svg>
              </div>

              {/* Metric tiles */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'var(--ins-size-2)'}}>
                {[
                  {label:'ARR',     val:'$8.4M',    color:'var(--ins-status-success-fg)'},
                  {label:'NRR',     val:'128%',     color:'var(--ins-status-success-fg)'},
                  {label:'Runway',  val:'19 mo',    color:'var(--ins-text-highlight)'},
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
    { name:'Salesforce',  desc:'CRM & pipeline' },
    { name:'HubSpot',     desc:'CRM & marketing' },
    { name:'Stripe',      desc:'Billing & revenue' },
    { name:'NetSuite',    desc:'Finance & ERP' },
    { name:'QuickBooks',  desc:'Finance data' },
    { name:'Xero',        desc:'Finance data' },
    { name:'Snowflake',   desc:'Data warehouse' },
    { name:'BigQuery',    desc:'Cloud analytics' },
    { name:'PostgreSQL',  desc:'Data warehouse' },
    { name:'Segment',     desc:'Customer data' },
    { name:'Amplitude',   desc:'Product analytics' },
    { name:'Google Analytics', desc:'Web analytics' },
    { name:'Databricks',  desc:'Lakehouse & BI' },
    { name:'ChartMogul',  desc:'Subscription analytics' },
    { name:'Zuora',       desc:'Subscription billing' },
    { name:'Notion',      desc:'Docs & planning' },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="Your Company Stack"
            title="Connects to every source of company truth"
            lede="Insightis integrates with your CRM, billing, finance, product, and warehouse stack."
            sparkle
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

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section style={{paddingTop:'var(--ins-size-8)',paddingBottom:'var(--ins-size-32)',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <BottomCTA
          variant="buttons"
          title={<>Stop waiting on <BottomCTA.Highlight>decks.</BottomCTA.Highlight> Start seeing <BottomCTA.Highlight> live numbers</BottomCTA.Highlight></>}
          description="Ask your board and revenue questions in plain English and get certified answers in seconds — no analyst queue, no stale slides. Free to start, no credit card required."
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
      <div style={{padding:'14px 18px',borderBottom:'1px solid var(--ins-color-white-a-06)',display:'flex',alignItems:'center',gap:'10px',flexShrink:0}}>
        <div style={{display:'flex',gap:'5px'}}>
          {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
            <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.6}}/>
          ))}
        </div>
        <div style={{flex:1,textAlign:'center',fontSize:'var(--ins-font-size-12)',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)'}}>
          board prep · founder
        </div>
      </div>
      <div style={{padding:'22px 18px',display:'flex',flexDirection:'column',gap:'var(--ins-size-3)',flex:1,justifyContent:'center'}}>
        <div className="chat-bubble-user">
          What's our net revenue retention this quarter?
        </div>
        <div className="chat-bubble-ai">
          NRR is 128% in Q2, up 9pts QoQ — expansion outpaced churn across every segment. Runway sits at 19 months at current burn. Sourced from <span style={{color:'var(--ins-text-highlight)',fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-12)'}}>finance.fct_nrr</span> — certified in your semantic layer.
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
      <ChromeHeader label="semantic layer · nrr" />
      <div style={{padding:'26px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'18px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{width:'34px',height:'34px',borderRadius:'9px',background:'rgba(9,160,157,.1)',border:'1px solid rgba(9,160,157,.25)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.8"><path d="M3 6h18M3 12h18M3 18h12"/></svg>
            </div>
            <div>
              <div style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-14)',color:'var(--ins-color-gray-100)',fontWeight:500}}>net_revenue_retention</div>
              <div style={{fontSize:'var(--ins-font-size-11)',color:'var(--ins-text-inactive)',marginTop:'var(--ins-size-half)'}}>Owned by Finance · v3.2</div>
            </div>
          </div>
          <span style={{
            display:'inline-flex',alignItems:'center',gap:'5px',
            padding:'4px 10px',borderRadius:'999px',
            background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.3)',
            fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-status-success-fg)',
            letterSpacing:'.06em',textTransform:'uppercase',
          }}>
            <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--ins-status-success-fg)',boxShadow:'0 0 6px var(--ins-status-success-fg)'}}/>
            Certified
          </span>
        </div>
        <div style={{
          background:'rgba(255,255,255,.025)',
          border:'1px solid var(--ins-color-white-a-06)',
          borderRadius:'10px',
          padding:'14px',
          marginBottom:'14px',
          fontFamily:'var(--ins-font-family-mono)',
          fontSize:'12.5px',
          lineHeight:1.6,
          color:'var(--ins-text-body)',
        }}>
          (<span style={{color:'var(--ins-text-highlight)'}}>starting_arr</span> <span style={{color:'var(--ins-text-body)'}}>+</span> <span style={{color:'var(--ins-text-highlight)'}}>expansion</span> <span style={{color:'var(--ins-text-body)'}}>−</span> <span style={{color:'var(--ins-text-highlight)'}}>churn</span>) <span style={{color:'var(--ins-text-body)'}}>/</span> <span style={{color:'var(--ins-text-highlight)'}}>starting_arr</span>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'var(--ins-size-2)'}}>
          {[
            {label:'Source', val:'billing.fct_subscriptions, crm.dim_accounts'},
            {label:'Lineage', val:'Stripe → Semantic Layer → Insightis'},
            {label:'Used by', val:'Board deck · investor update · 3 teams'},
          ].map((row,i) => (
            <div key={i} style={{display:'flex',gap:'var(--ins-size-3)',fontSize:'var(--ins-font-size-12)'}}>
              <span style={{minWidth:'70px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.04em',textTransform:'uppercase',fontSize:'10px',paddingTop:'var(--ins-size-half)'}}>{row.label}</span>
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
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="watchlist · before the board call" />
      <div style={{padding:'20px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* User question */}
        <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)',marginBottom:'10px'}}>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',letterSpacing:'.08em',textTransform:'uppercase'}}>flagged</span>
          <span style={{fontSize:'12.5px',color:'var(--ins-text-body)'}}>"Any KPI risk before the board call?"</span>
        </div>

        {/* Headline finding */}
        <div style={{
          display:'flex',alignItems:'center',gap:'10px',
          padding:'10px 12px',marginBottom:'var(--ins-size-3)',
          background:'var(--ins-color-red-a-06)',border:'1px solid rgba(248,113,113,.22)',
          borderRadius:'10px',
        }}>
          <span style={{
            width:'8px',height:'8px',borderRadius:'50%',background:'var(--ins-status-error-fg)',
            boxShadow:'0 0 8px var(--ins-status-error-fg)',flexShrink:0,
          }}/>
          <span style={{fontSize:'12.5px',color:'var(--ins-color-gray-100)',lineHeight:1.45}}>
            <span style={{fontWeight:500,color:'var(--ins-status-error-fg)'}}>−6pts</span> dip in <span style={{fontFamily:'var(--ins-font-family-mono)',color:'var(--ins-text-highlight)',fontSize:'11.5px'}}>enterprise_nrr</span> as two top accounts contracted
          </span>
        </div>

        {/* Chart with annotated anomaly */}
        <div style={{
          background:'rgba(255,255,255,.018)',
          border:'1px solid var(--ins-color-white-a-05)',
          borderRadius:'10px',
          padding:'12px 12px 8px',
          marginBottom:'var(--ins-size-3)',
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
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--ins-size-2)'}}>
          <div style={{
            background:'rgba(255,255,255,.025)',
            border:'1px solid var(--ins-color-white-a-06)',
            borderRadius:'10px',
            padding:'9px 11px',
          }}>
            <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'3px'}}>Where</div>
            <div style={{fontSize:'var(--ins-font-size-12)',color:'var(--ins-color-gray-100)'}}>2 enterprise accounts</div>
          </div>
          <div style={{
            background:'rgba(255,255,255,.025)',
            border:'1px solid var(--ins-color-white-a-06)',
            borderRadius:'10px',
            padding:'9px 11px',
          }}>
            <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'3px'}}>ARR at risk</div>
            <div style={{fontSize:'var(--ins-font-size-12)',color:'var(--ins-status-error-fg)'}}>$240K</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpotlightStack() {
  const sources = [
    { name:'CRM', color:'#0EC4C1', bg:'rgba(14,196,193,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" stroke="#0EC4C1" strokeWidth="1.6"/>
        <path d="M4 20a5 5 0 0 1 10 0" stroke="#0EC4C1" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M16 6a3 3 0 0 1 0 6" stroke="#0EC4C1" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>},
    { name:'Billing', color:'#22C55E', bg:'rgba(34,197,94,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="#22C55E" strokeWidth="1.6"/>
        <path d="M3 10h18" stroke="#22C55E" strokeWidth="1.6"/>
        <path d="M7 14h4" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>},
    { name:'Finance', color:'#A78BFA', bg:'rgba(167,139,250,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 3v18h18" stroke="#A78BFA" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M7 14l4-4 3 3 4-6" stroke="#A78BFA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>},
    { name:'Product', color:'#FBBF24', bg:'rgba(251,191,36,.12)',
      icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="12" width="4" height="8" rx="1" stroke="#FBBF24" strokeWidth="1.6"/>
        <rect x="10" y="7" width="4" height="13" rx="1" stroke="#FBBF24" strokeWidth="1.6"/>
        <rect x="17" y="3" width="4" height="17" rx="1" stroke="#FBBF24" strokeWidth="1.6"/>
      </svg>},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      boxShadow:'none',
      position:'relative',
      overflow:'hidden',
      display:'flex',
      flexDirection:'column',
    }}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(9,160,157,.06) 0%, transparent 70%)',pointerEvents:'none'}}/>
      <ChromeHeader label="lineage · board-ready" />
      <div style={{padding:'24px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center',position:'relative'}}>
        {/* Section label */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:'10px'}}>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',letterSpacing:'.1em',textTransform:'uppercase'}}>your company data</span>
        </div>

        {/* Source tiles row */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'var(--ins-size-2)',marginBottom:'14px'}}>
          {sources.map((s,i) => (
            <div key={i} style={{
              background:'rgba(255,255,255,.025)',
              border:`1px solid ${s.color}33`,
              borderRadius:'var(--ins-radius-12)',
              padding:'12px 6px',
              display:'flex',flexDirection:'column',alignItems:'center',gap:'7px',
              minWidth:0,
            }}>
              <div style={{
                width:'34px',height:'34px',borderRadius:'9px',
                background:s.bg,
                display:'flex',alignItems:'center',justifyContent:'center',
              }}>{s.icon}</div>
              <div style={{fontSize:'var(--ins-font-size-11)',fontWeight:500,color:'var(--ins-color-gray-100)',textAlign:'center'}}>{s.name}</div>
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
          borderRadius:'var(--ins-radius-12)',
          padding:'12px 14px',
          display:'flex',alignItems:'center',gap:'var(--ins-size-3)',
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
            <div style={{fontSize:'10.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.04em',textTransform:'uppercase',marginTop:'var(--ins-size-half)'}}>Semantic Layer</div>
          </div>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-highlight)',padding:'3px 9px',borderRadius:'999px',background:'rgba(9,160,157,.1)',border:'1px solid rgba(9,160,157,.25)',letterSpacing:'.08em',textTransform:'uppercase'}}>connected</span>
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
      title:'Board answers on demand',
      body:'Ask any company-health question in plain English and get an answer rooted in your real numbers — runway, ARR growth, NRR, burn — no analyst, no waiting for the next deck.',
      bullets:['Conversational answers across every company metric','Walk into the board meeting with live numbers'],
      visual:<SpotlightChat />,
    },
    {
      eyebrow:'Board Metrics',
      title:'One definition for ARR, NRR, and runway',
      body:'Finance, the board, and the founder shouldn\'t argue about whose number is right. Insightis aligns ARR, NRR, and runway under a single certified definition the whole company trusts.',
      bullets:['ARR, NRR, and runway agreed across the company','One certified number for every board metric'],
      visual:<SpotlightSemantic />,
    },
    {
      eyebrow:'KPI Risk Watch',
      title:'Spot KPI risk before the board call',
      body:'Insightis scans every answer for churn spikes, NRR dips, and burn drift — risks surface inline, so nothing surprises you in front of the board.',
      bullets:['Churn and KPI risk flagged inside every answer','Unusual burn or retention movement called out'],
      visual:<SpotlightAnomalies />,
    },
    {
      eyebrow:'Full Lineage',
      title:'Board-ready answers, with full lineage',
      body:'Every number carries its sources, owners, and timestamps — the board and your finance team see the same trail, with no reconciliation pass before the meeting.',
      bullets:['Full lineage from metric down to the source system','Every figure shows its owner and last change'],
      visual:<SpotlightStack />,
    },
  ];

  return (
    <section id="spotlights" style={{padding:'80px 0 100px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'72px'}}>
          <SectionHeader
            eyebrow="How it works"
            title="Built for the way leadership actually runs the company"
            lede="Four capabilities that put live company metrics at the founder's and the board's fingertips."
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
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><path d="M9 8h6M9 12h6M9 16h4" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Board prep in minutes, not days',
      desc:'Build the board deck and investor update on live data — charts that update in the room. Walk in with answers, not last month\'s export.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 3H5a2 2 0 0 0-2 2v3m6-5h6M8 3v18m8-18v18M16 3h3a2 2 0 0 1 2 2v3M2 9h20M2 15h20M2 21h3m16 0h3" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Certified company metrics',
      desc:'One semantic layer governs every metric — ARR, NRR, runway, burn — owned and versioned by finance. No more arguments about whose number is right.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Runway & burn scenarios',
      desc:'Model runway and burn under different hiring and spend plans — and get flagged the moment a KPI drifts, not at the end-of-quarter board call.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><path d="M7 9h10M7 13h6" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'NRR & cohort health',
      desc:'Any retention question answered instantly — NRR by segment, cohort expansion, logo churn — no analyst queue or pivot-table archaeology.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><line x1="12" y1="9" x2="12" y2="13" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="var(--ins-text-highlight)" strokeWidth="2" strokeLinecap="round"/></svg>,
      title:'Fundraising metrics, ready to share',
      desc:'Every metric investors ask for — ARR, growth rate, magic number, CAC payback — reconciled to source and ready to drop into the data room.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="12" width="4" height="9" rx="1" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><rect x="9" y="7" width="4" height="14" rx="1" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><rect x="16" y="3" width="4" height="18" rx="1" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/></svg>,
      title:'Cross-source company view',
      desc:'Correlate CRM, billing, finance, and product usage in one question — no SQL, no analyst, no two-week turnaround. The whole company\'s health in one place.',
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
                See it on <span style={{color:'var(--ins-button-primary-bg)'}}>your own numbers</span>
              </h3>
              <p className="ins-text-body">
                Connect your CRM and billing and ask Insightis the company-health question you need answered before the next board meeting.
              </p>
            </div>
            <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
              Start for free
            </Button>
          </div>
        </div>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="Use cases"
            title="What executive teams use Insightis for"
            sparkle
          />
        </div>

        <div data-usecase-grid style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}}>
          {cases.map((c,i) => (
            <div key={i}
              style={{
                background:'rgba(13,17,23,.6)',
                border:'1px solid var(--ins-color-white-a-06)',
                borderRadius:'var(--ins-radius-16)',padding:'var(--ins-size-6)',
                position:'relative',overflow:'hidden',
                transition:'all .2s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(9,160,157,.25)';e.currentTarget.style.background='rgba(9,160,157,.04)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--ins-color-white-a-06)';e.currentTarget.style.background='rgba(13,17,23,.6)';}}
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

/* ── FAQ ── */
function FAQ() {
  const items = [
    {
      q:'How accurate are the numbers compared to what finance reports?',
      a:'Identical. Insightis pulls from the same source-of-truth systems your finance team uses — your warehouse, your billing system, your CRM. The numbers reconcile down to the cent, and every answer cites the source so anyone can trace it back.',
    },
    {
      q:'Can investors and the board see the same data we see?',
      a:'Yes. Generate a board-ready link from any chart with view-only access, or export a static snapshot for the deck. Live links update in real time when new data arrives, so the board always sees the freshest read — never last month\'s numbers.',
    },
    {
      q:'How does Insightis fit alongside our finance team and existing tools?',
      a:'Insightis amplifies finance, it does not replace it. The team continues to own metric definitions in the semantic layer; you and the rest of the company query against those certified definitions. Everyone reads the same number, every time.',
    },
    {
      q:'Can we trust the AI for board-level decisions?',
      a:'Every answer shows its work — the underlying SQL, the data sources, and the time range. Nothing is generated from public benchmarks; only your real numbers. If an answer surprises you, the trace back to source is one click away.',
    },
    {
      q:'What happens to our metric definitions as we scale or pivot?',
      a:'The semantic layer is versioned. When an ARR definition changes — say, after acquiring a new product line — historical answers reflect both old and new definitions. No more retroactive number changes that confuse the board between meetings.',
    },
    {
      q:'What\'s the security and compliance posture for sharing financials?',
      a:'Encryption at rest and in transit, single sign-on with MFA, granular role-based access — and your data is never used to train AI models. Your data never leaves your warehouse — Insightis queries on top of it. Audit logs track every view and every share.',
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
            Questions executive teams ask
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
