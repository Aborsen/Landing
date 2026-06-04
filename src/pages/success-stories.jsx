import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';

/* ── STORIES HERO ── */
function StoriesHero() {
  const featuredStories = [
    {
      company: 'Meridian Analytics',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=360&fit=crop',
      quote: '"Insightis increased the speed of development by 50% after switching to AI Chat for data queries..."',
      product: 'AI Chat',
      icon: 'chat',
    },
    {
      company: 'Apex Growth Partners',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=360&fit=crop',
      quote: '"The simplicity it gives with creating and modifying dashboards and creating reports are fantastic..."',
      product: 'Reports',
      icon: 'file',
    },
    {
      company: 'Vantage Data Co.',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=360&fit=crop',
      quote: '"It has saved my time, which is money. And now my stakeholders get a better response time from me."',
      product: 'Insights Engine',
      icon: 'pulse',
    },
  ];

  return (
    <section style={{padding:'120px 0 0', position:'relative'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px', position:'relative'}}>
        {/* Hero heading */}
        <div style={{maxWidth:'640px', marginBottom:'var(--ins-size-12)'}}>
          <h1 className="ins-text-display" style={{marginBottom:'var(--ins-size-5)'}}>
            <span style={{color:'var(--ins-text-highlight)'}}>100+</span> companies use Insightis to accomplish more
          </h1>
          <p className="fu2 ins-text-body-xl ins-text--muted">
            Read the stories of our customers on how they saved time, became more productive, and transformed the way they work with Insightis.
          </p>
        </div>

        {/* Featured success stories */}
        <div style={{marginBottom:'var(--ins-size-20)'}}>
          <h2 className="fu2" style={{fontSize:'var(--ins-font-size-22)', fontWeight:500, color:'var(--ins-text-heading-soft)', letterSpacing:'-.02em', marginBottom:'var(--ins-size-7)'}}>Featured success stories</h2>
          <div style={{display:'grid', gap:'var(--ins-size-5)'}} className="md:grid-cols-3 grid-cols-1">
            {featuredStories.map((story, i) => (
              <div key={i} className={`fu${i+2}`} style={{background:'var(--ins-color-white-a-03)', border:'1px solid var(--ins-color-white-a-07)', borderRadius:'var(--ins-radius-16)', overflow:'hidden', transition:'all .25s'}}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(9,160,157,.3)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--ins-color-white-a-07)'; e.currentTarget.style.transform='translateY(0)'; }}>
                {/* Image cover */}
                <div style={{height:'180px', position:'relative', overflow:'hidden'}}>
                  <img src={story.image} alt={story.company} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
                </div>
                {/* Content */}
                <div style={{padding:'var(--ins-size-5)'}}>
                  <h3 style={{fontSize:'var(--ins-font-size-15)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'var(--ins-size-2)'}}>{story.company}</h3>
                  <p className="ins-text-body ins-text--italic" style={{marginBottom:'var(--ins-size-4)'}}>{story.quote}</p>
                  <div style={{display:'inline-flex', alignItems:'center', gap:'6px', padding:'5px 12px', background:'var(--ins-surface-brand-tint)', border:'1px solid rgba(9,160,157,.18)', borderRadius:'999px'}}>
                    <span style={{width:'6px', height:'6px', borderRadius:'50%', background:'var(--ins-text-highlight)', flexShrink:0}}/>
                    <span style={{fontSize:'var(--ins-font-size-11)', fontWeight:500, color:'var(--ins-button-primary-bg-hover)', fontFamily:'var(--ins-font-family-mono)'}}>{story.product}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── STORY GRID ── */
function StoryGrid() {
  const stories = [
    { type: 'B2B SaaS', size: '120 employees', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=280&fit=crop', challenge: 'Revenue and marketing teams used different MRR numbers, causing board meeting confusion.', solution: 'Insightis Semantic Layer unified all metric definitions across Stripe, HubSpot, and their data warehouse.', result: '1 source of truth', resultLabel: 'across all teams', team: 'RevOps' },
    { type: 'E-commerce', size: '30 employees', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=280&fit=crop', challenge: 'Manually pulling Shopify + GA4 data into spreadsheets every Monday took the founder 4 hours.', solution: 'Connected both sources to Insightis. Now asks "How did we perform last week?" every Monday morning.', result: '4 hours \u2192 3 minutes', resultLabel: 'weekly reporting', team: 'Founder & CEO' },
    { type: 'FinTech', size: '200 employees', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=280&fit=crop', challenge: 'Data team was overwhelmed with ad-hoc requests from product and marketing.', solution: 'Insightis gave every team self-serve access to certified data. Ad-hoc requests dropped dramatically.', result: '74% fewer', resultLabel: 'analyst tickets', team: 'Data & Analytics' },
    { type: 'Marketing Agency', size: '15 employees', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=280&fit=crop', challenge: 'Client reporting across 8 ad platforms required 2 full days of manual work per month.', solution: 'Connected all ad platforms to Insightis. Generates client-ready answers and exports in minutes.', result: '2 days \u2192 20 minutes', resultLabel: 'client reporting', team: 'Marketing' },
    { type: 'Health Tech', size: '80 employees', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=280&fit=crop', challenge: 'Product team couldn\'t correlate feature usage with retention without filing a data request.', solution: 'Insightis cross-references Mixpanel usage data with Stripe billing. Product team asks questions directly.', result: '3x faster', resultLabel: 'product decisions', team: 'Product Team' },
    { type: 'Logistics', size: '50 employees', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=280&fit=crop', challenge: 'Finance needed real-time burn rate and runway calculations but only got monthly spreadsheet updates.', solution: 'Connected QuickBooks and payroll data. CFO now asks "What\'s our runway?" anytime and gets a live answer.', result: 'Real-time', resultLabel: 'financial visibility', team: 'Ops & Finance' },
  ];

  return (
    <section style={{padding:'40px 0 80px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="More Stories"
            title="How teams use Insightis"
            sparkle
          />
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--ins-size-4)'}} className="md:grid-cols-3 grid-cols-1">
          {stories.map((s, i) => (
            <div key={i} style={{background:'var(--ins-color-white-a-03)', border:'1px solid var(--ins-color-white-a-07)', borderRadius:'var(--ins-radius-16)', overflow:'hidden', transition:'all .2s'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(9,160,157,.3)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='var(--ins-color-white-a-07)'}>
              <div style={{height:'140px', overflow:'hidden'}}>
                <img src={s.image} alt={s.type} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
              </div>
              <div style={{padding:'var(--ins-size-7)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'var(--ins-size-4)'}}>
                <span style={{fontSize:'var(--ins-font-size-11)', padding:'3px 10px', background:'var(--ins-surface-brand-tint)', border:'1px solid rgba(9,160,157,.15)', borderRadius:'999px', color:'var(--ins-button-primary-bg-hover)', fontFamily:'var(--ins-font-family-mono)'}}>{s.type}</span>
                <span style={{fontSize:'10px', color:'var(--ins-text-disabled)', fontFamily:'var(--ins-font-family-mono)'}}>{s.size}</span>
              </div>
              <p className="ins-text-body" style={{marginBottom:'var(--ins-size-3)'}}>{s.challenge}</p>
              <p className="ins-text-body" style={{marginBottom:'var(--ins-size-5)'}}>{s.solution}</p>
              <div style={{fontSize:'var(--ins-font-size-28)', fontWeight:500, color:'var(--ins-text-highlight)', fontFamily:'var(--ins-font-family-mono)', marginBottom:'var(--ins-size-1)'}}>{s.result}</div>
              <div style={{fontSize:'var(--ins-font-size-12)', color:'var(--ins-text-body)', fontFamily:'var(--ins-font-family-mono)', marginBottom:'var(--ins-size-4)'}}>{s.resultLabel}</div>
              <div style={{fontSize:'var(--ins-font-size-11)', color:'var(--ins-text-disabled)', fontFamily:'var(--ins-font-family-mono)', paddingTop:'var(--ins-size-3)', borderTop:'1px solid var(--ins-border-default)'}}>{s.team}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── RESULTS BANNER ── */
function useCountUp(target, duration, started) {
  const [display, setDisplay] = React.useState('0');
  React.useEffect(() => {
    if (!started) return;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const startTime = performance.now();
    const tick = 16; // ~60fps
    const id = setInterval(() => {
      const progress = Math.min((performance.now() - startTime) / duration, 1);
      setDisplay(String(Math.round(easeOut(progress) * target)));
      if (progress >= 1) clearInterval(id);
    }, tick);
    return () => clearInterval(id);
  }, [started, target, duration]);
  return display;
}

function AnimatedStat({ num, prefix, suffix, label, started, delay }) {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);

  const count = useCountUp(num, 1600, active);

  return (
    <div style={{textAlign:'center', minWidth:'140px'}}>
      <div style={{
        height:'64px', display:'flex', alignItems:'center', justifyContent:'center',
        marginBottom:'var(--ins-size-2)',
        transition:'opacity .4s', opacity: active ? 1 : 0,
      }}>
        <span style={{
          fontSize:'clamp(28px,3.5vw,40px)', fontWeight:500, color:'var(--ins-text-highlight)',
          fontFamily:'var(--ins-font-family-mono)',
        }}>{prefix}{count}{suffix}</span>
      </div>
      <div style={{fontSize:'var(--ins-font-size-14)', color:'var(--ins-text-body)', lineHeight:1.5}}>{label}</div>
    </div>
  );
}

function TextStat({ from, to, label, started, delay }) {
  const [phase, setPhase] = React.useState(0); // 0=hidden, 1=from shown, 2=to revealed
  React.useEffect(() => {
    if (!started) return;
    const t1 = setTimeout(() => setPhase(1), delay);
    const t2 = setTimeout(() => setPhase(2), delay + 650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [started, delay]);

  return (
    <div style={{textAlign:'center', minWidth:'140px'}}>
      {/* Fixed 64px value area — same as AnimatedStat */}
      <div style={{
        height:'64px', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', gap:'var(--ins-size-half)',
        marginBottom:'var(--ins-size-2)',
      }}>
        {/* "3 days" — fades in then gets struck through */}
        <span style={{
          fontSize:'clamp(16px,2vw,20px)', fontWeight:500,
          fontFamily:'var(--ins-font-family-mono)',
          color: phase === 2 ? 'rgba(14,196,193,.35)' : 'var(--ins-text-highlight)',
          textDecoration: phase === 2 ? 'line-through' : 'none',
          textDecorationColor: 'var(--ins-color-teal-a-40)',
          opacity: phase >= 1 ? 1 : 0,
          transition:'opacity .35s, color .4s, text-decoration .4s',
        }}>{from}</span>
        {/* "→ minutes" — slides up and fades in */}
        <span style={{
          fontSize:'clamp(22px,2.8vw,34px)', fontWeight:500,
          fontFamily:'var(--ins-font-family-mono)', color:'var(--ins-text-highlight)',
          display:'inline-flex', alignItems:'center', gap:'6px',
          opacity: phase === 2 ? 1 : 0,
          transform: phase === 2 ? 'translateY(0)' : 'translateY(6px)',
          transition:'opacity .4s, transform .4s',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity:.7}}>
            <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
          </svg>
          {to}
        </span>
      </div>
      <div style={{fontSize:'var(--ins-font-size-14)', color:'var(--ins-text-body)', lineHeight:1.5}}>{label}</div>
    </div>
  );
}

function ResultsBanner() {
  const sectionRef = React.useRef(null);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    function check() {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60 && rect.bottom > 0) {
        setStarted(true);
        cleanup();
      }
    }

    let observer;
    function cleanup() {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', check, true);
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setStarted(true); cleanup(); } },
        { threshold: 0, rootMargin: '0px 0px -60px 0px' }
      );
      observer.observe(el);
    }

    // Scroll-event fallback (also fires on initial load if already visible)
    window.addEventListener('scroll', check, { passive: true, capture: true });
    check(); // run immediately in case already in viewport

    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding:'56px 0',
      background:'rgba(9,160,157,.04)',
      borderTop:'1px solid rgba(9,160,157,.1)',
      borderBottom:'1px solid rgba(9,160,157,.1)',
    }}>
      <div style={{maxWidth:'1240px', width:'calc(100% - 32px)', margin:'0 auto'}}>
        <div style={{textAlign:'center', marginBottom:'var(--ins-size-10)'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'var(--ins-font-size-12)'}}>&#10022;</span>
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', fontFamily:'var(--ins-font-family-mono)'}}>Verified Impact</span>
          </div>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:'clamp(32px,6vw,80px)', flexWrap:'wrap'}}>
          <AnimatedStat num={10}  suffix="x"  label="Faster time to insight"       started={started} delay={0}   />
          <AnimatedStat num={74}  suffix="%"  label="Fewer ad-hoc data requests"   started={started} delay={180} />
          <TextStat from="3 days" to="minutes" label="Report turnaround"             started={started} delay={360} />
          <AnimatedStat num={200} suffix="+" label="Data sources supported"        started={started} delay={540} />
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTA() {
  return (
    <section style={{paddingTop:'var(--ins-size-8)', paddingBottom:'var(--ins-size-16)', position:'relative'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{position:'relative', borderRadius:'var(--ins-radius-16)', border:'1px solid rgba(30,30,48,1)', padding:'32px 48px', overflow:'hidden', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', gap:'var(--ins-size-6)', flexWrap:'wrap', background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)'}}>
          <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
          <h3 style={{fontSize:'clamp(22px,3vw,30px)', fontWeight:500, color:'var(--ins-text-heading)', letterSpacing:'-.03em', lineHeight:1.2, flexShrink:0}}>
            Join teams who <span style={{color:'var(--ins-button-primary-bg)'}}>stopped guessing.</span>
          </h3>
          <div style={{display:'flex', alignItems:'center', width:'100%', maxWidth:'420px', background:'#0D0D1A', border:'1px solid rgba(46,46,64,1)', borderRadius:'var(--ins-radius-12)', overflow:'hidden', flex:'1 1 340px'}}>
            <input type="email" placeholder="Enter your work email..." style={{flex:1, background:'transparent', fontSize:'var(--ins-font-size-14)', color:'var(--ins-text-body)', padding:'12px 16px', outline:'none', border:'none', fontFamily:'var(--ins-font-family-sans)', minWidth:0}} />
            <button style={{display:'inline-flex', alignItems:'center', gap:'var(--ins-size-2)', padding:'10px 20px', margin:'var(--ins-size-1)', fontSize:'var(--ins-font-size-12)', fontWeight:600, color:'var(--ins-text-body)', background:'linear-gradient(135deg,var(--ins-button-primary-bg),var(--ins-button-primary-bg-hover))', borderRadius:'var(--ins-radius-8)', border:'none', cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, fontFamily:'var(--ins-font-family-sans)'}}>
              Start for free
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── APP ── */
function App() {
  return (
    <div>
      <Header />
      <StoriesHero />
      <ResultsBanner />
      <StoryGrid />
      <BottomCTA />
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
