import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ── APP ── */
/* ── PRICING HERO ── */
function PricingHero() {
  return (
    <section style={{padding:'120px 0 40px',position:'relative',textAlign:'center'}}>
      <div style={{maxWidth:'820px',margin:'0 auto',padding:'0 24px',position:'relative'}}>
        <div className="fu0" style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'18px'}}>
          <span style={{color:'#09A09D',fontSize:'12px'}}>✦</span>
          <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'#09A09D',fontFamily:'Geist Mono,monospace'}}>Pricing</span>
        </div>
        <h1 className="fu1" style={{fontSize:'clamp(36px,4.8vw,62px)',fontWeight:500,letterSpacing:'-.03em',lineHeight:1.08,marginBottom:'20px'}}>
          <span style={{color:'#E8F2F5'}}>Simple pricing. </span>
          <span style={{color:'#0EC4C1'}}>Powerful insights.</span>
        </h1>
        <p className="fu2" style={{fontSize:'clamp(16px,1.4vw,19px)',color:'rgba(255,255,255,.65)',lineHeight:1.65,maxWidth:'620px',margin:'0 auto'}}>
          Start free. Scale as your team grows. Every plan includes the Semantic Layer, AI Chat, and 200+ connectors.
        </p>
      </div>
    </section>
  );
}

/* ── PRICING CARDS ── */
function PricingCards() {
  const plans = [
    {
      name:'Free',
      tag:'For getting started',
      price:0,
      cta:'Start for free',
      ctaStyle:'outline',
      features:[
        '1 user',
        '500 AI tokens / month',
        'Up to 3 data connectors',
        '24-hour data refresh',
        'Community support',
      ],
    },
    {
      name:'Starter',
      tag:'For small teams',
      price:9.99,
      originalPrice:19.99,
      discount:'50% OFF',
      cta:'Start free trial',
      ctaStyle:'outline',
      features:[
        'Up to 5 users',
        '5,000 AI tokens / month',
        'Unlimited data connectors',
        '1-hour data refresh',
        'Custom semantic layer',
        'Priority email support',
      ],
    },
    {
      name:'Pro',
      tag:'For growing teams',
      price:19.99,
      originalPrice:39.99,
      discount:'50% OFF',
      cta:'Start free trial',
      ctaStyle:'primary',
      highlight:true,
      features:[
        'Unlimited users',
        '25,000 AI tokens / month',
        'Unlimited data connectors',
        '15-minute data refresh',
        'Full semantic-layer governance',
        'API access + 99.5% SLA',
        'Email + live-chat support',
      ],
    },
  ];

  return (
    <section style={{padding:'24px 0 80px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px'}}>
        <div data-pricing-grid style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}}>
          {plans.map((plan,i) => {
            const isHighlight = plan.highlight;
            return (
              <div key={plan.name} className={`fu${i}`} style={{
                position:'relative',
                background: isHighlight ? 'linear-gradient(180deg, rgba(9,160,157,0.06) 0%, rgba(13,17,23,0.9) 100%)' : 'rgba(13,17,23,0.7)',
                border: isHighlight ? '1px solid rgba(9,160,157,0.5)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius:'18px',
                padding:'28px 22px',
                display:'flex',flexDirection:'column',
                boxShadow: isHighlight ? '0 8px 32px rgba(9,160,157,0.08)' : 'none',
              }}>
                {isHighlight && (
                  <div style={{position:'absolute',top:0,left:'50%',transform:'translate(-50%,-50%)',padding:'4px 12px',background:'linear-gradient(135deg,#09A09D,#07807E)',color:'#fff',fontSize:'11px',fontWeight:500,letterSpacing:'.05em',borderRadius:'999px',textTransform:'uppercase'}}>
                    Most popular
                  </div>
                )}
                <h3 style={{fontSize:'22px',fontWeight:600,color:'#fff',marginBottom:'4px',letterSpacing:'-0.02em'}}>{plan.name}</h3>
                <p style={{fontSize:'13px',color:'rgba(255,255,255,0.7)',marginBottom:'24px'}}>{plan.tag}</p>
                <div style={{marginBottom:'24px',minHeight:'104px'}}>
                  {plan.price === 0 ? (
                    <div>
                      <span style={{fontSize:'40px',fontWeight:500,color:'#fff',letterSpacing:'-0.03em'}}>$0</span>
                      <span style={{fontSize:'14px',color:'rgba(255,255,255,0.7)',marginLeft:'6px'}}>forever</span>
                    </div>
                  ) : (
                    <div>
                      <div style={{display:'flex',alignItems:'baseline',gap:'10px',flexWrap:'wrap'}}>
                        <span style={{fontSize:'40px',fontWeight:500,color:'#fff',letterSpacing:'-0.03em'}}>${plan.price}</span>
                        {plan.originalPrice && (
                          <span style={{fontSize:'18px',color:'rgba(255,255,255,0.35)',textDecoration:'line-through'}}>${plan.originalPrice}</span>
                        )}
                      </div>
                      <div style={{fontSize:'13px',color:'rgba(255,255,255,0.7)',marginTop:'2px'}}>per user / month</div>
                      {plan.discount && (
                        <div style={{marginTop:'6px',display:'inline-flex',alignItems:'center',gap:'5px',padding:'2px 8px',background:'rgba(9,160,157,0.12)',border:'1px solid rgba(9,160,157,0.35)',borderRadius:'4px',fontSize:'10px',fontFamily:'Geist Mono,monospace',color:'#0EC4C1',fontWeight:600,letterSpacing:'.04em'}}>
                          {plan.discount}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <a href="/auth/sign-up/" style={{
                  display:'inline-flex',alignItems:'center',justifyContent:'center',gap:'7px',
                  padding:'12px 20px',borderRadius:'999px',
                  fontSize:'14px',fontWeight:500,
                  textDecoration:'none',
                  marginBottom:'24px',
                  background: plan.ctaStyle === 'primary' ? 'linear-gradient(135deg,#09A09D,#07807E)' : 'transparent',
                  color: plan.ctaStyle === 'primary' ? '#fff' : '#0EC4C1',
                  border: plan.ctaStyle === 'primary' ? 'none' : '1px solid rgba(9,160,157,0.4)',
                  boxShadow: plan.ctaStyle === 'primary' ? '0 0 24px rgba(9,160,157,0.25)' : 'none',
                  transition:'all .2s',
                }}>
                  {plan.cta}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </a>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px',padding:0,margin:0}}>
                  {plan.features.map((f,fi) => (
                    <li key={fi} style={{display:'flex',alignItems:'flex-start',gap:'9px',fontSize:'13.5px',color:'#C0D4DC',lineHeight:1.55}}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:'3px'}}><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <style>{`
          @media (max-width: 900px) {
            [data-pricing-grid] { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ── FEATURE COMPARISON ── */
function FeatureComparison() {
  const sections = [
    {
      title: 'AI & Analytics',
      rows: [
        { label:'AI Chat',                          values:[true, true, true] },
        { label:'Insightis AI model',               values:[true, true, true] },
        { label:'AI tokens',                        values:['500 / mo', '5,000 / mo', '25,000 / mo'] },
      ]
    },
    {
      title: 'Data connections',
      rows: [
        { label:'Data connectors',                  values:['Up to 3', 'Unlimited', 'Unlimited'] },
        { label:'Several sources at the same time', values:[false, true, true] },
        { label:'Data upload (CSV, Excel)',         values:[true, true, true] },
      ]
    },
    {
      title: 'Semantic Layer',
      rows: [
        { label:'Metric definitions',       values:['Read-only', 'Full access', 'Full access'] },
        { label:'Custom metrics',           values:[false, true, true] },
        { label:'Auto-certification',       values:[false, true, true] },
      ]
    },
    {
      title: 'Support & security',
      rows: [
        { label:'Support',                  values:['Community', 'Priority email', 'Email + live chat'] },
        { label:'SLA',                      values:[false, false, '99.5%'] },
        { label:'Data encryption',          values:[true, true, true] },
      ]
    },
  ];
  const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
  const Dash = () => <span style={{color:'rgba(255,255,255,0.18)'}}>—</span>;
  const cols = '1.6fr 1fr 1fr 1fr';
  return (
    <section style={{padding:'80px 0 60px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'clamp(26px,3.4vw,38px)',fontWeight:500,color:'#fff',letterSpacing:'-.025em',marginBottom:'10px'}}>Compare features</h2>
          <p style={{fontSize:'15px',color:'rgba(255,255,255,.55)'}}>Everything you get on every plan.</p>
        </div>
        <div data-compare-wrap style={{border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',overflow:'hidden',background:'rgba(13,17,23,0.5)'}}>
          {/* Column headers */}
          <div style={{display:'grid',gridTemplateColumns:cols,padding:'18px 20px',background:'rgba(255,255,255,0.025)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <span style={{fontSize:'12px',fontWeight:500,letterSpacing:'.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.7)',fontFamily:'Geist Mono,monospace'}}>Feature</span>
            {['Free','Starter','Pro'].map(p => (
              <span key={p} style={{textAlign:'center',fontSize:'13px',fontWeight:600,color:'#fff'}}>{p}</span>
            ))}
          </div>
          {/* Sectioned rows */}
          {sections.map((section, si) => (
            <div key={si}>
              {/* Section heading row */}
              <div style={{padding:'14px 20px 10px',background:'rgba(255,255,255,0.015)',borderTop: si > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none'}}>
                <span style={{fontSize:'11px',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'#0EC4C1',fontFamily:'Geist Mono,monospace'}}>{section.title}</span>
              </div>
              {/* Feature rows */}
              {section.rows.map((row, ri) => (
                <div key={ri} style={{display:'grid',gridTemplateColumns:cols,padding:'12px 20px',borderTop:'1px solid rgba(255,255,255,0.04)',alignItems:'center'}}>
                  <span style={{fontSize:'14px',color:'#C0D4DC'}}>{row.label}</span>
                  {row.values.map((v, vi) => (
                    <span key={vi} style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'13.5px',color:'#C0D4DC'}}>
                      {v === true ? <Check /> : v === false ? <Dash /> : v}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
          {/* Choose-your-plan footer */}
          <div style={{display:'grid',gridTemplateColumns:cols,padding:'18px 20px',background:'rgba(255,255,255,0.025)',borderTop:'1px solid rgba(255,255,255,0.06)',alignItems:'center'}}>
            <span style={{fontSize:'13px',color:'rgba(255,255,255,0.7)'}}>Choose your plan</span>
            {[
              { label:'Start for Free',   primary:false },
              { label:'Start Free Trial', primary:false },
              { label:'Start Free Trial', primary:true  },
            ].map((cta, i) => (
              <div key={i} style={{display:'flex',justifyContent:'center'}}>
                <a href="/auth/sign-up/" style={{
                  display:'inline-flex',alignItems:'center',gap:'6px',
                  padding:'9px 16px',borderRadius:'999px',
                  fontSize:'13px',fontWeight:500,
                  textDecoration:'none',
                  background: cta.primary ? 'linear-gradient(135deg,#09A09D,#07807E)' : 'transparent',
                  color: cta.primary ? '#fff' : '#0EC4C1',
                  border: cta.primary ? 'none' : '1px solid rgba(9,160,157,0.4)',
                }}>{cta.label}</a>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            [data-compare-wrap] { font-size: 12px; }
            [data-compare-wrap] > div > div { padding: 11px 12px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const items = [
    { q:'Can I switch plans later?',
      a:'Yes — upgrades take effect immediately, downgrades at the start of your next billing cycle. You can also pause or cancel anytime from the admin panel.' },
    { q:'Do you offer a free trial of paid plans?',
      a:'Pro and Team include a 14-day free trial — no card required. Stay on the free plan as long as you like.' },
    { q:'What does "data source" mean?',
      a:'A connected system — Stripe, HubSpot, Postgres, BigQuery, etc. Connectors authenticate via OAuth or read-only API keys and sync continuously.' },
    { q:'Is my data secure?',
      a:'Insightis is SOC 2 Type II and HIPAA-ready. All connections are read-only, all traffic is TLS-encrypted, and your data never leaves your warehouse on Enterprise plans.' },
    { q:'How does annual billing work?',
      a:'Pay for 12 months up front, save 20% per seat. Invoices and ACH/wire transfer available on Team and Enterprise.' },
    { q:'Can I bring my own LLM?',
      a:'On Enterprise plans you can route AI Chat through OpenAI, Anthropic, Azure OpenAI, or your own VPC-hosted model.' },
  ];
  return (
    <section style={{padding:'60px 0 80px'}}>
      <div style={{maxWidth:'820px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <h2 style={{fontSize:'clamp(26px,3.4vw,38px)',fontWeight:500,color:'#fff',letterSpacing:'-.025em',marginBottom:'10px'}}>Frequently asked questions</h2>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {items.map((item,i) => (
            <details key={i} style={{background:'rgba(13,17,23,0.6)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:'12px',padding:'14px 18px'}}>
              <summary style={{cursor:'pointer',fontSize:'15px',fontWeight:500,color:'#E8F2F5',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span>{item.q}</span>
                <span style={{color:'#0EC4C1',fontSize:'16px',marginLeft:'12px'}}>+</span>
              </summary>
              <p style={{marginTop:'12px',fontSize:'14px',color:'rgba(255,255,255,0.65)',lineHeight:1.65}}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTA() {
  return (
    <section style={{padding:'80px 0 100px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'700px',height:'420px',background:'radial-gradient(ellipse, rgba(9,160,157,0.13) 0%, transparent 70%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'820px',margin:'0 auto',padding:'0 24px',position:'relative',textAlign:'center'}}>
        <h2 style={{fontSize:'clamp(22px,2.6vw,34px)',fontWeight:500,letterSpacing:'-.025em',lineHeight:1.2,marginBottom:'28px'}}>
          <span style={{color:'#E8F2F5'}}>Start free. </span>
          <span style={{color:'#0EC4C1'}}>Upgrade when you're ready.</span>
        </h2>
        <div style={{display:'flex',justifyContent:'center',gap:'12px',flexWrap:'wrap'}}>
          <a href="/auth/sign-up/" style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'15px 28px',borderRadius:'999px',background:'linear-gradient(135deg,#09A09D,#07807E)',color:'#fff',fontSize:'15px',fontWeight:500,textDecoration:'none',boxShadow:'0 0 32px rgba(9,160,157,.35), 0 8px 24px rgba(0,0,0,.4)'}}>
            Get started for free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
          <a href="/Company/Contacts" style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'15px 26px',borderRadius:'999px',background:'rgba(255,255,255,0.02)',color:'#C0D4DC',fontSize:'15px',fontWeight:500,textDecoration:'none',border:'1px solid rgba(255,255,255,0.12)'}}>
            Talk to sales
          </a>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div>
      <Header />
      <main>
      <PricingHero />
      <PricingCards />
      <FeatureComparison />
      <FAQ />
      <BottomCTA />
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
