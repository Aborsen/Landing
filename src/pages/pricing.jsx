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
import BillingToggle from '../components/BillingToggle';
import { PLANS, DEFAULT_CYCLE, priceFor, standardFor, yearlyTotalFor, badgeFor } from '../data/pricing';

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
          title={<><span>Simple pricing. </span><span style={{color:'var(--ins-text-highlight)'}}>Powerful insights</span></>}
          lede="Start free. Scale as your team grows. Every plan includes the Semantic Layer, AI Chat, and 200+ connectors."
          as="h1"
          size="lg"
        />
      </div>
    </section>
  );
}

/* ── PRICING CARDS ── */
// Plans, prices and the cycle toggle all come from src/data/pricing.js.

function PricingCards() {
  const [cycle, setCycle] = useState(DEFAULT_CYCLE);

  const plans = PLANS;

  return (
    <section style={{padding:'24px 0 80px'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        {/* Billing-cycle toggle */}
        <div style={{display:'flex',justifyContent:'center',marginBottom:'var(--ins-size-8)'}}>
          <BillingToggle cycle={cycle} onChange={setCycle} />
        </div>
        <div data-pricing-grid style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'var(--ins-size-5)'}}>
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
                  <div style={{position:'absolute',top:0,left:'50%',transform:'translate(-50%,-50%)',padding:'4px 12px',background:'linear-gradient(135deg,var(--ins-button-primary-bg-hover),var(--ins-button-primary-bg))',color:'var(--ins-text-body)',fontSize:'var(--ins-font-size-11)',fontWeight:500,letterSpacing:'.05em',borderRadius:'999px',textTransform:'uppercase'}}>
                    Most popular
                  </div>
                )}
                <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)',marginBottom:'var(--ins-size-1)'}}>
                  <h3 style={{fontSize:'var(--ins-font-size-22)',fontWeight:600,color:'var(--ins-text-heading)',letterSpacing:'-0.02em',margin:0}}>{plan.name}</h3>
                  {badgeFor(plan) && (
                    <span style={{display:'inline-flex',alignItems:'center',padding:'2px 8px',background:'var(--ins-surface-brand-tint)',border:'1px solid var(--ins-border-brand)',borderRadius:'var(--ins-radius-sm)',fontSize:'10px',fontFamily:'var(--ins-font-family-mono)',color:'var(--ins-text-highlight)',fontWeight:600,letterSpacing:'.04em'}}>{badgeFor(plan)}</span>
                  )}
                </div>
                <p className="ins-text-body" style={{marginBottom:'var(--ins-size-3)'}}>{plan.tag}</p>
                {/* Every card renders the same three rows — price, per-user, billed-annually —
                    and hides the ones that do not apply instead of omitting them. That keeps
                    the block's height identical across plans AND billing cycles, so nothing
                    reflows when you switch and the CTAs stay on one baseline. A min-height
                    magic number used to do this job and was 7px short of the yearly state. */}
                <div style={{marginBottom:'var(--ins-size-4)'}}>
                  <div style={{display:'flex',alignItems:'baseline',gap:'10px',flexWrap:'wrap'}}>
                    <span style={{fontSize:'40px',fontWeight:500,color:'var(--ins-text-heading)',letterSpacing:'-0.03em'}}>
                      {plan.free ? '$0' : `$${priceFor(plan, cycle)}`}
                    </span>
                    <span style={{fontSize:'var(--ins-font-size-18)',color:'var(--ins-text-inactive)',textDecoration:'line-through',visibility:plan.free?'hidden':'visible'}}>
                      {plan.free ? ' ' : `$${standardFor(plan, cycle)}`}
                    </span>
                  </div>
                  <div style={{fontSize:'var(--ins-font-size-14)',color:'var(--ins-text-body)',marginTop:'var(--ins-size-half)',visibility:plan.free?'hidden':'visible'}}>per user / month</div>
                  <div style={{fontSize:'var(--ins-font-size-12)',color:'var(--ins-text-inactive)',marginTop:'var(--ins-size-half)',visibility:(!plan.free && cycle==='yearly')?'visible':'hidden'}}>
                    {plan.free ? ' ' : `billed annually · $${yearlyTotalFor(plan).toFixed(2)}/yr`}
                  </div>
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
                    <li key={fi} style={{display:'flex',alignItems:'flex-start',gap:'9px',fontSize:'var(--ins-font-size-14)',color:'var(--ins-text-body)',lineHeight:1.55}}>
                      <CheckIcon size={14} style={{flexShrink:0,marginTop:'3px'}} />
                      {f}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          /* Align CTAs across cards: each button sits directly below the
             equal-height price block. Overrides the DS rule
             .ins-card--pricing .ins-btn{margin-top:auto} — with the button placed
             above the feature list, that auto-margin would push each card's button
             down by its leftover space and misalign them by feature count. */
          [data-pricing-grid] .ins-card--pricing .ins-btn { margin-top: 0; }
          @media (max-width: 900px) {
            [data-pricing-grid] { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
          }
        ` }} />
      </div>
    </section>
  );
}

/* ── FEATURE COMPARISON ── */
function FeatureComparison() {
  // Rows that restate a plan limit read it from src/data/pricing.js, so the table
  // cannot contradict the cards above it.
  const sections = [
    {
      title: 'AI & Analytics',
      rows: [
        { label:'AI Chat',                          values:[true, true, true] },
        { label:'Insightis AI model',               values:[true, true, true] },
        { label:'AI tokens',                        values:PLANS.map(p => p.limits.tokens) },
      ]
    },
    {
      title: 'Data connections',
      rows: [
        { label:'Data connectors',                  values:PLANS.map(p => p.limits.connectors) },
        { label:'Several sources at the same time', values:[false, true, true] },
        { label:'Data upload (CSV, Excel)',         values:[true, true, true] },
      ]
    },
    {
      title: 'Semantic Layer',
      rows: [
        { label:'Metric definitions',       values:['Read-only', 'Full access', 'Full access'] },
        { label:'Custom metrics',           values:[false, true, true] },
        { label:'Predefined Metrics',         values:[true, true, true] },
      ]
    },
    {
      title: 'Support & security',
      rows: [
        { label:'Support',                  values:PLANS.map(p => p.limits.support) },
        { label:'SLA',                      values:[false, false, '99.5%'] },
        { label:'Data encryption',          values:[true, true, true] },
      ]
    },
  ];
  const Dash = () => <span style={{color:'var(--ins-text-disabled)'}}>—</span>;
  const cols = '1.6fr 1fr 1fr 1fr';
  return (
    <section style={{padding:'80px 0 60px'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-12)'}}>
          <SectionHeader title="Compare features" lede="Everything you get on every plan." />
        </div>
        <div data-compare-wrap style={{border:'1px solid var(--ins-color-white-a-08)',borderRadius:'var(--ins-radius-2xl)',overflow:'hidden',background:'rgba(13,17,23,0.5)'}}>
          {/* Column headers */}
          <div style={{display:'grid',gridTemplateColumns:cols,padding:'18px 20px',background:'var(--ins-color-white-a-03)',borderBottom:'1px solid var(--ins-border-default)'}}>
            <span style={{fontSize:'var(--ins-font-size-12)',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-text-body)',fontFamily:'var(--ins-font-family-mono)'}}>Feature</span>
            {PLANS.map(({ name: p }) => (
              <span key={p} style={{textAlign:'center',fontSize:'var(--ins-font-size-14)',fontWeight:600,color:'var(--ins-text-heading)'}}>{p}</span>
            ))}
          </div>
          {/* Sectioned rows */}
          {sections.map((section, si) => (
            <div key={si}>
              {/* Section heading row */}
              <div style={{padding:'14px 20px 10px',background:'var(--ins-color-white-a-02)',borderTop: si > 0 ? '1px solid var(--ins-border-default)' : 'none'}}>
                <span style={{fontSize:'var(--ins-font-size-11)',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-text-highlight)',fontFamily:'var(--ins-font-family-mono)'}}>{section.title}</span>
              </div>
              {/* Feature rows */}
              {section.rows.map((row, ri) => (
                <div key={ri} style={{display:'grid',gridTemplateColumns:cols,padding:'12px 20px',borderTop:'1px solid var(--ins-color-white-a-04)',alignItems:'center'}}>
                  <span style={{fontSize:'var(--ins-font-size-14)',color:'var(--ins-text-heading)'}}>{row.label}</span>
                  {row.values.map((v, vi) => (
                    <span key={vi} style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'var(--ins-font-size-14)',color:'var(--ins-text-body)'}}>
                      {v === true ? <CheckIcon size={16} /> : v === false ? <Dash /> : v}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          ))}
          {/* Choose-your-plan footer */}
          <div style={{display:'grid',gridTemplateColumns:cols,padding:'18px 20px',background:'var(--ins-color-white-a-03)',borderTop:'1px solid var(--ins-border-default)',alignItems:'center'}}>
            <span style={{fontSize:'var(--ins-font-size-14)',color:'var(--ins-text-body)'}}>Choose your plan</span>
            {[
              { label:'Start for free',   primary:false },
              { label:'Start for free', primary:false },
              { label:'Start for free', primary:true  },
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
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            [data-compare-wrap] { font-size: 12px; }
            [data-compare-wrap] > div > div { padding: 11px 12px !important; }
          }
        ` }} />
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
      a:'All connections are read-only, all traffic is TLS-encrypted, your data is never used to train AI models — and it never leaves your warehouse on Enterprise plans.' },
    { q:'How does annual billing work?',
      a:'Pay for 12 months up front, save 20% per seat. Invoices and ACH/wire transfer available on Team and Enterprise.' },
    { q:'Can I bring my own LLM?',
      a:'On Enterprise plans you can route AI Chat through OpenAI, Anthropic, Azure OpenAI, or your own VPC-hosted model.' },
  ];
  return (
    <section style={{padding:'60px 0 80px'}}>
      <div style={{maxWidth:'880px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-10)'}}>
          <SectionHeader title="Frequently asked questions" />
        </div>
        <FAQAccordion items={items} />
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section style={{padding:'80px 0 100px', position:'relative', overflow:'hidden'}}>
      {/* Centred glow behind the CTA, restored: the header-standardisation pass
          (d928c22, June 2) dropped it while swapping in the shared BottomCTA.
          Same 700x420 centred ellipse it had before that commit. */}
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:'700px',height:'420px',background:'radial-gradient(ellipse, rgba(9,160,157,0.44) 0%, transparent 70%)',pointerEvents:'none'}}/>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',position:'relative'}}>
        <BottomCTA
          variant="buttons"
          title={<>Start free. <BottomCTA.Highlight>Upgrade when you're ready</BottomCTA.Highlight></>}
          description="Pick the plan that fits your team today and change it the moment your needs do — every tier ships with the Semantic Layer, AI Chat, and 200+ connectors. Free to start, no credit card required."
          ctaLabel="Start for free"
          ctaHref="/auth/sign-up/"
          secondaryCtaLabel="Talk to sales"
          secondaryCtaHref="/company/contacts"
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
