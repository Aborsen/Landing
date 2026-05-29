import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';
import BottomCTA from '../components/BottomCTA';
import FAQAccordion from '../components/FAQAccordion';
import SectionHeader from '../components/SectionHeader';
import CheckIcon from '../components/CheckIcon';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/* ── APP ── */
/* ── PRICING HERO ── */
function PricingHero() {
  return (
    <section style={{padding:'120px 0 40px',position:'relative',textAlign:'center'}}>
      <div style={{maxWidth:'820px',margin:'0 auto',padding:'0 24px',position:'relative'}}>
        <SectionHeader
          eyebrow="Pricing"
          title={<><span style={{color:'var(--ins-color-gray-100)'}}>Simple pricing. </span><span style={{color:'var(--ins-text-highlight)'}}>Powerful insights.</span></>}
          lede="Start free. Scale as your team grows. Every plan includes the Semantic Layer, AI Chat, and 200+ connectors."
          as="h1"
          size="lg"
          sparkle
        />
      </div>
    </section>
  );
}

/* ── PRICING CARDS ── */

// 20% discount when paying yearly. Per-month-equivalent price = monthly * (1 - YEARLY_DISCOUNT).
const YEARLY_DISCOUNT = 0.20;

function BillingToggle({ cycle, onChange }) {
  const segment = (label, value) => {
    const active = cycle === value;
    return (
      <button
        type="button"
        role="tab"
        aria-selected={active}
        onClick={() => onChange(value)}
        style={{
          padding: '9px 18px',
          borderRadius: '999px',
          border: 'none',
          background: active ? 'var(--ins-surface-elevated)' : 'transparent',
          color: active ? 'var(--ins-text-heading)' : 'var(--ins-text-body)',
          fontSize: '13px',
          fontWeight: 500,
          fontFamily: 'var(--ins-font-family-sans)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background-color 180ms, color 180ms',
        }}
      >
        {label}
        {value === 'yearly' && (
          <span style={{
            padding: '2px 8px',
            borderRadius: '999px',
            background: 'var(--ins-surface-brand-tint)',
            border: '1px solid var(--ins-border-brand)',
            color: 'var(--ins-text-highlight)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            fontFamily: 'var(--ins-font-family-mono)',
          }}>SAVE -{Math.round(YEARLY_DISCOUNT * 100)}%</span>
        )}
      </button>
    );
  };
  return (
    <div role="tablist" aria-label="Billing cycle" style={{
      display: 'inline-flex',
      padding: '4px',
      background: 'var(--ins-surface-card)',
      border: '1px solid var(--ins-border-default)',
      borderRadius: '999px',
      gap: '4px',
    }}>
      {segment('Yearly', 'yearly')}
      {segment('Monthly', 'monthly')}
    </div>
  );
}

function PricingCards() {
  const [cycle, setCycle] = useState('monthly');

  const plans = [
    {
      name:'Free',
      tag:'For getting started',
      price:0,
      cta:'Start for Free',
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

  const displayPrice = (monthly) => {
    if (cycle === 'monthly') return monthly;
    // Yearly: per-month-equivalent at YEARLY_DISCOUNT off.
    return Math.round(monthly * (1 - YEARLY_DISCOUNT) * 100) / 100;
  };
  // Compute yearly total from the rounded monthly so the displayed math
  // is consistent ($7.99 × 12 = $95.88, not $95.90 from raw multiplication).
  const yearlyTotal = (monthly) => Math.round(displayPrice(monthly) * 12 * 100) / 100;

  return (
    <section style={{padding:'24px 0 80px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px'}}>
        {/* Billing-cycle toggle */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:'32px'}}>
          <BillingToggle cycle={cycle} onChange={setCycle} />
        </div>
        <div data-pricing-grid style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}}>
          {plans.map((plan,i) => {
            const isHighlight = plan.highlight;
            return (
              <Card
                key={plan.name}
                variant="pricing"
                selected={isHighlight}
                className={`fu${i}`}
                style={{position:'relative',padding:'28px 22px'}}
              >
                {isHighlight && (
                  <div style={{position:'absolute',top:0,left:'50%',transform:'translate(-50%,-50%)',padding:'4px 12px',background:'linear-gradient(135deg,var(--ins-button-primary-bg-hover),var(--ins-button-primary-bg))',color:'var(--ins-text-body)',fontSize:'11px',fontWeight:500,letterSpacing:'.05em',borderRadius:'999px',textTransform:'uppercase'}}>
                    Most popular
                  </div>
                )}
                <h3 style={{fontSize:'22px',fontWeight:600,color:'var(--ins-text-body)',marginBottom:'4px',letterSpacing:'-0.02em'}}>{plan.name}</h3>
                <p style={{fontSize:'13px',color:'rgba(255,255,255,0.7)',marginBottom:'24px'}}>{plan.tag}</p>
                <div style={{marginBottom:'24px',minHeight:'120px'}}>
                  {plan.price === 0 ? (
                    <div>
                      <span style={{fontSize:'40px',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-0.03em'}}>$0</span>
                      <span style={{fontSize:'14px',color:'rgba(255,255,255,0.7)',marginLeft:'6px'}}>forever</span>
                    </div>
                  ) : (
                    <div>
                      <div style={{display:'flex',alignItems:'baseline',gap:'10px',flexWrap:'wrap'}}>
                        <span style={{fontSize:'40px',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-0.03em'}}>${displayPrice(plan.price)}</span>
                        {plan.originalPrice && (
                          <span style={{fontSize:'18px',color:'rgba(255,255,255,0.35)',textDecoration:'line-through'}}>${plan.originalPrice}</span>
                        )}
                      </div>
                      <div style={{fontSize:'13px',color:'rgba(255,255,255,0.7)',marginTop:'2px'}}>per user / month</div>
                      {cycle === 'yearly' && (
                        <div style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'2px'}}>
                          billed annually · ${yearlyTotal(plan.price).toFixed(2)}/yr
                        </div>
                      )}
                      {plan.discount && (
                        <div style={{marginTop:'6px',display:'inline-flex',alignItems:'center',gap:'5px',padding:'2px 8px',background:'rgba(9,160,157,0.12)',border:'1px solid rgba(9,160,157,0.35)',borderRadius:'4px',fontSize:'10px',fontFamily:'Geist Mono,monospace',color:'var(--ins-text-highlight)',fontWeight:600,letterSpacing:'.04em'}}>
                          {plan.discount}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Button
                  as="a"
                  href="/auth/sign-up/"
                  variant={plan.ctaStyle === 'primary' ? 'primary' : 'secondary'}
                  size="md"
                  iconEnd={<ArrowRightIcon />}
                  className="justify-center mb-6 w-full"
                >
                  {plan.cta}
                </Button>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px',padding:0,margin:0}}>
                  {plan.features.map((f,fi) => (
                    <li key={fi} style={{display:'flex',alignItems:'flex-start',gap:'9px',fontSize:'13.5px',color:'var(--ins-color-gray-200)',lineHeight:1.55}}>
                      <CheckIcon size={14} style={{flexShrink:0,marginTop:'3px'}} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
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
  const Dash = () => <span style={{color:'rgba(255,255,255,0.18)'}}>—</span>;
  const cols = '1.6fr 1fr 1fr 1fr';
  return (
    <section style={{padding:'80px 0 60px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'clamp(26px,3.4vw,38px)',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-.025em',marginBottom:'10px'}}>Compare features</h2>
          <p style={{fontSize:'15px',color:'rgba(255,255,255,.55)'}}>Everything you get on every plan.</p>
        </div>
        <div data-compare-wrap style={{border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',overflow:'hidden',background:'rgba(13,17,23,0.5)'}}>
          {/* Column headers */}
          <div style={{display:'grid',gridTemplateColumns:cols,padding:'18px 20px',background:'rgba(255,255,255,0.025)',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
            <span style={{fontSize:'12px',fontWeight:500,letterSpacing:'.08em',textTransform:'uppercase',color:'rgba(255,255,255,0.7)',fontFamily:'Geist Mono,monospace'}}>Feature</span>
            {['Free','Starter','Pro'].map(p => (
              <span key={p} style={{textAlign:'center',fontSize:'13px',fontWeight:600,color:'var(--ins-text-body)'}}>{p}</span>
            ))}
          </div>
          {/* Sectioned rows */}
          {sections.map((section, si) => (
            <div key={si}>
              {/* Section heading row */}
              <div style={{padding:'14px 20px 10px',background:'rgba(255,255,255,0.015)',borderTop: si > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none'}}>
                <span style={{fontSize:'11px',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace'}}>{section.title}</span>
              </div>
              {/* Feature rows */}
              {section.rows.map((row, ri) => (
                <div key={ri} style={{display:'grid',gridTemplateColumns:cols,padding:'12px 20px',borderTop:'1px solid rgba(255,255,255,0.04)',alignItems:'center'}}>
                  <span style={{fontSize:'14px',color:'var(--ins-color-gray-200)'}}>{row.label}</span>
                  {row.values.map((v, vi) => (
                    <span key={vi} style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'13.5px',color:'var(--ins-color-gray-200)'}}>
                      {v === true ? <CheckIcon size={16} /> : v === false ? <Dash /> : v}
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
                <Button
                  as="a"
                  href="/auth/sign-up/"
                  variant={cta.primary ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {cta.label}
                </Button>
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
      <div style={{maxWidth:'880px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'40px'}}>
          <h2 style={{fontSize:'clamp(26px,3.4vw,38px)',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-.025em',marginBottom:'10px'}}>Frequently asked questions</h2>
        </div>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section style={{padding:'80px 0 100px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'700px',height:'420px',background:'radial-gradient(ellipse, rgba(9,160,157,0.13) 0%, transparent 70%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'820px',margin:'0 auto',padding:'0 24px',position:'relative',textAlign:'center'}}>
        <BottomCTA
          variant="buttons"
          title={<>Start free. <BottomCTA.Highlight>Upgrade when you're ready.</BottomCTA.Highlight></>}
          ctaLabel="Get started for free"
          ctaHref="/auth/sign-up/"
          secondaryCtaLabel="Talk to sales"
          secondaryCtaHref="/Company/Contacts"
        />
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
