import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Input from '../components/Input';
import SectionHeader from '../components/SectionHeader';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/* ── CONTACT HERO ── */
function ContactHero() {
  return (
    <section style={{padding:'120px 0 60px', position:'relative'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px', textAlign:'center', position:'relative'}}>
        <h1 className="ins-text-display" style={{marginBottom:'var(--ins-size-5)'}}>
          Let's talk
        </h1>
        <p className="fu1 ins-text-body-lg" style={{maxWidth:'520px', margin:'0 auto'}}>
          Whether you have a question, need a demo, or want to discuss Enterprise pricing — we'd love to hear from you.
        </p>
      </div>
    </section>
  );
}

/* ── CONTACT OPTIONS ── */
function ContactOptions({ onOpenDemo, onOpenSupport }) {
  const cardStyle = {padding:'var(--ins-size-8)'};

  return (
    <section style={{padding:'40px 0 80px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'var(--ins-size-4)'}} className="md:grid-cols-3 grid-cols-1">

          {/* Talk to Sales */}
          <div className="ins-feature-card ins-feature-card--interactive" style={cardStyle}>
            <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'rgba(9,160,157,.1)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'var(--ins-size-5)'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <h3 style={{fontSize:'var(--ins-font-size-18)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'10px'}}>Talk to Sales</h3>
            <p className="ins-text-body" style={{marginBottom:'var(--ins-size-5)'}}>Get a personalized demo of Insightis for your team. We'll show you exactly how it works with your data sources.</p>
            <Button variant="primary" onClick={onOpenDemo}>
              Book a demo
            </Button>
            <p className="ins-text-body-xs ins-text--muted ins-text--mono" style={{marginTop:'14px'}}>Typically responds within 2 hours</p>
          </div>

          {/* Get Support */}
          <div className="ins-feature-card ins-feature-card--interactive" style={cardStyle}>
            <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'rgba(9,160,157,.1)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'var(--ins-size-5)'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
            </div>
            <h3 style={{fontSize:'var(--ins-font-size-18)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'10px'}}>Get Support</h3>
            <p className="ins-text-body" style={{marginBottom:'var(--ins-size-5)'}}>Already using Insightis? Our support team can help with setup, integrations, troubleshooting, and best practices.</p>
            <button onClick={onOpenSupport} style={{display:'inline-flex', alignItems:'center', gap:'var(--ins-size-2)', padding:'10px 24px', fontSize:'var(--ins-font-size-12)', fontWeight:600, color:'var(--ins-color-gray-100)', background:'transparent', borderRadius:'999px', border:'1px solid var(--ins-color-white-a-12)', cursor:'pointer', fontFamily:'var(--ins-font-family-sans)', transition:'all .15s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(9,160,157,.4)';e.currentTarget.style.color='var(--ins-text-highlight)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--ins-color-white-a-12)';e.currentTarget.style.color='var(--ins-color-gray-100)';}}>
              Open Support Ticket
            </button>
            <p className="ins-text-body-xs ins-text--muted ins-text--mono" style={{marginTop:'14px'}}>Pro & Team: priority support included</p>
          </div>

          {/* Help Center */}
          <div className="ins-feature-card ins-feature-card--interactive" style={cardStyle}>
            <div style={{width:'48px', height:'48px', borderRadius:'50%', background:'rgba(9,160,157,.1)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'var(--ins-size-5)'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3 style={{fontSize:'var(--ins-font-size-18)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'10px'}}>Help Center</h3>
            <p className="ins-text-body" style={{marginBottom:'var(--ins-size-5)'}}>Browse our knowledge base for guides, FAQs, troubleshooting tips, and everything you need to get the most out of Insightis.</p>
            <Button as="a" href="/resources/contact-support" variant="primary">
              Visit help center
            </Button>
            <p className="ins-text-body-xs ins-text--muted ins-text--mono" style={{marginTop:'14px'}}>Guides, FAQs & troubleshooting</p>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── MODAL FORM ── */
function ModalForm({ open, onClose, type }) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) { setSubmitted(false); document.body.style.overflow = 'hidden'; }
    else { document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); }, 2500);
  };

  const inputStyle = {
    width:'100%', background:'var(--ins-color-white-a-04)', border:'1px solid var(--ins-color-white-a-08)',
    borderRadius:'10px', padding:'12px 16px', fontSize:'var(--ins-font-size-14)', color:'var(--ins-color-gray-100)',
    fontFamily:'var(--ins-font-family-sans)', outline:'none', transition:'border-color .15s',
  };
  const labelStyle = {
    display:'block', fontSize:'var(--ins-font-size-11)', fontWeight:600, letterSpacing:'.08em',
    textTransform:'uppercase', color:'var(--ins-text-body)', fontFamily:'var(--ins-font-family-mono)',
    marginBottom:'6px',
  };
  const selectStyle = {...inputStyle, appearance:'none', backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237FA0AC' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat:'no-repeat', backgroundPosition:'right 16px center'};

  const isDemo = type === 'demo';

  return (
    <div style={{position:'fixed', inset:0, zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:'var(--ins-size-6)'}}
      onClick={onClose}>
      <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,.7)', backdropFilter:'blur(6px)'}}/>
      <div style={{position:'relative', width:'100%', maxWidth:'520px', maxHeight:'90vh', overflowY:'auto', background:'var(--ins-surface-container)', border:'1px solid var(--ins-color-white-a-08)', borderRadius:'var(--ins-radius-20)', padding:'36px'}}
        onClick={e => e.stopPropagation()}>
        {/* Close button */}
        <button onClick={onClose} style={{position:'absolute', top:'16px', right:'16px', background:'none', border:'none', cursor:'pointer', padding:'var(--ins-size-1)', color:'var(--ins-text-body)'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Header */}
        <div style={{marginBottom:'var(--ins-size-7)'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'10px', fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', fontFamily:'var(--ins-font-family-mono)'}}>
              {isDemo ? 'Demo Request' : 'Support Ticket'}
            </span>
          </div>
          <h2 style={{fontSize:'var(--ins-font-size-24)', fontWeight:500, color:'var(--ins-text-heading)', letterSpacing:'-.02em'}}>
            {isDemo ? 'Book a personalized demo' : 'Submit a support ticket'}
          </h2>
          <p className="ins-text-body ins-text--muted" style={{marginTop:'var(--ins-size-2)'}}>
            {isDemo ? 'Tell us about your team and we\'ll tailor the demo to your needs.' : 'Describe your issue and our team will get back to you as soon as possible.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'18px'}}>
          <div>
            <Input label="Name" type="text" placeholder="Your name..." />
          </div>
          <div>
            <Input label="Work Email" type="email" placeholder="you@company.com..." />
          </div>
          <div>
            <Input label="Company" type="text" placeholder="Your company name..." />
          </div>

          {isDemo ? (
            <>
              <div>
                <Input label="Job Title" type="text" placeholder="e.g. Data Lead, CTO..." />
              </div>
              <div>
                <label style={labelStyle}>Team Size</label>
                <select style={selectStyle}
                  onFocus={e=>e.target.style.borderColor='rgba(9,160,157,.4)'} onBlur={e=>e.target.style.borderColor='var(--ins-color-white-a-08)'}>
                  <option value="" style={{background:'var(--ins-surface-container)'}}>Select team size</option>
                  <option value="1-10" style={{background:'var(--ins-surface-container)'}}>1–10</option>
                  <option value="11-50" style={{background:'var(--ins-surface-container)'}}>11–50</option>
                  <option value="51-200" style={{background:'var(--ins-surface-container)'}}>51–200</option>
                  <option value="200+" style={{background:'var(--ins-surface-container)'}}>200+</option>
                </select>
              </div>
              <div>
                <Input
                  multiline
                  label={<>Message <span style={{fontWeight:400, textTransform:'none', letterSpacing:0}}>(optional)</span></>}
                  placeholder="Anything specific you'd like us to cover?..."
                  rows={3}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label style={labelStyle}>Product</label>
                <select style={selectStyle}
                  onFocus={e=>e.target.style.borderColor='rgba(9,160,157,.4)'} onBlur={e=>e.target.style.borderColor='var(--ins-color-white-a-08)'}>
                  <option value="" style={{background:'var(--ins-surface-container)'}}>Select product</option>
                  <option value="insightis" style={{background:'var(--ins-surface-container)'}}>Insightis</option>
                  <option value="ai-connect" style={{background:'var(--ins-surface-container)'}}>AI Connect</option>
                  <option value="other" style={{background:'var(--ins-surface-container)'}}>Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Priority</label>
                <select style={selectStyle}
                  onFocus={e=>e.target.style.borderColor='rgba(9,160,157,.4)'} onBlur={e=>e.target.style.borderColor='var(--ins-color-white-a-08)'}>
                  <option value="" style={{background:'var(--ins-surface-container)'}}>Select priority</option>
                  <option value="low" style={{background:'var(--ins-surface-container)'}}>Low</option>
                  <option value="medium" style={{background:'var(--ins-surface-container)'}}>Medium</option>
                  <option value="high" style={{background:'var(--ins-surface-container)'}}>High</option>
                  <option value="critical" style={{background:'var(--ins-surface-container)'}}>Critical</option>
                </select>
              </div>
              <div>
                <Input label="Subject" type="text" placeholder="Brief summary of your issue..." />
              </div>
              <div>
                <Input multiline label="Description" placeholder="Describe the issue in detail..." rows={4} />
              </div>
            </>
          )}

          <Button type="submit" variant="primary" size="md" radius="lg" className="w-full mt-1">
            {isDemo ? 'Request Demo' : 'Submit Ticket'}
          </Button>
          {submitted && (
            <p className="ins-text-body ins-text--success ins-text--medium" style={{textAlign:'center'}}>
              {isDemo ? 'Demo request sent! We\'ll be in touch shortly.' : 'Ticket submitted! Our team will respond soon.'}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

/* ── QUICK LINKS ── */
function QuickLinks() {
  const links = [
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
      title: 'Video Guides',
      desc: 'Step-by-step walkthroughs to help you get started and master advanced features.',
      href: '/docs/',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
      title: 'Documentation',
      desc: 'In-depth technical docs, API references, and integration guides.',
      href: '/docs/',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
      title: 'Community',
      desc: 'Join discussions, share ideas, and connect with other Insightis users.',
      href: '/resources/contact-support',
    },
    {
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
      title: 'Roadmap',
      desc: 'See what\'s coming next and vote on features that matter to you.',
      href: '/resources/roadmap',
    },
  ];

  return (
    <section style={{padding:'60px 0 80px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-10)'}}>
          <SectionHeader
            eyebrow="Resources"
            title="Find answers faster"
          />
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'var(--ins-size-4)'}} className="md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {links.map((l, i) => (
            <a key={i} href={l.href} className="ins-feature-card ins-feature-card--interactive">
              <div style={{width:'44px', height:'44px', borderRadius:'50%', background:'rgba(9,160,157,.1)', border:'1px solid rgba(9,160,157,.2)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'var(--ins-size-4)'}}>
                {l.icon}
              </div>
              <h3 style={{fontSize:'var(--ins-font-size-16)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'var(--ins-size-2)'}}>{l.title}</h3>
              <p className="ins-text-body">{l.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── OUR OFFICES ── */
function OurOffices() {
  const offices = [
    {
      code: 'us',
      country: 'United States',
      lines: ['3422 Old Capitol Trl', 'Wilmington,', 'Delaware, USA', '19808'],
    },
    {
      code: 'cz',
      country: 'Czech Republic',
      lines: ['2230/44 Na Žertvách Str.', 'Prague', 'Czech Republic', '180 00'],
    },
    {
      code: 'sk',
      country: 'Slovakia',
      lines: ['Aston Building Werferova 1,', 'Košice', 'Slovakia', '04011'],
    },
    {
      code: 'ua',
      country: 'Ukraine',
      lines: ['226A Kulparkivska Str.', 'Lviv', 'Ukraine', '79071'],
    },
    {
      code: 'hk',
      country: 'Hong Kong',
      lines: ['No. 5, 17/F', 'Strand 50, 50 Bonham Strand', 'Sheung Wan'],
    },
  ];

  return (
    <section style={{padding:'40px 0 60px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <h2 style={{fontSize:'var(--ins-font-size-20)', fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:'var(--ins-size-8)'}}>Our offices</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'var(--ins-size-6)'}}>
          {offices.map((o, i) => (
            <div key={i}>
              <div style={{width:'36px', height:'36px', borderRadius:'50%', overflow:'hidden', border:'1px solid var(--ins-color-white-a-10)', marginBottom:'14px', flexShrink:0}}>
                <img src={`https://flagcdn.com/w80/${o.code}.png`} alt={o.country} style={{width:'100%', height:'100%', objectFit:'cover'}} />
              </div>
              <p className="ins-text-h3" style={{marginBottom:'10px'}}>{o.country}</p>
              {o.lines.map((line, j) => (
                <p className="ins-text-body-sm ins-text--muted ins-text--mono" key={j}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA BANNER ── */
function CtaBanner() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section style={{padding:'8px 0 64px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{position:'relative', overflow:'hidden', borderRadius:'var(--ins-radius-16)', padding:'var(--ins-size-8)', background:'linear-gradient(135deg, rgba(18,18,31,.95) 0%, rgba(13,13,26,.98) 50%, rgba(18,18,31,.95) 100%)', border:'1px solid rgba(30,30,48,1)', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'var(--ins-size-5)'}}>
          <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
          <div style={{flexShrink:0}}>
            <h3 style={{fontSize:'clamp(18px,2.5vw,26px)', fontWeight:500, color:'var(--ins-text-heading)', letterSpacing:'-.02em', lineHeight:1.3, marginBottom:'6px'}}>
              Still have questions?
            </h3>
            <p className="ins-text-body-sm ins-text--muted ins-text--mono">Drop your email — we'll get back to you ASAP.</p>
          </div>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{display:'flex', alignItems:'center', flex:'1 1 400px', maxWidth:'460px', background:'rgba(13,13,26,1)', border:'1px solid rgba(46,46,64,1)', borderRadius:'var(--ins-radius-12)', overflow:'hidden', transition:'border-color .15s'}}
              onFocus={e=>e.currentTarget.style.borderColor='rgba(7,128,126,.6)'}
              onBlur={e=>e.currentTarget.style.borderColor='rgba(46,46,64,1)'}>
              <Input
                hideLabel
                label="Your email address"
                type="email"
                placeholder="you@company.com..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{flex:1, background:'transparent', border:'none', padding:'12px 16px', fontSize:'var(--ins-font-size-14)', color:'var(--ins-color-gray-100)', fontFamily:'var(--ins-font-family-sans)', outline:'none', minWidth:0, height:'auto', borderRadius:0, boxShadow:'none'}}
              />
              <Button type="submit" variant="primary" size="sm" radius="lg" iconEnd={<ArrowRightIcon />} className="m-1 flex-shrink-0">
                Get in Touch
              </Button>
            </form>
          ) : (
            <div style={{display:'flex', alignItems:'center', gap:'var(--ins-size-2)'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ins-status-success-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <p className="ins-text-body ins-text--success ins-text--medium">Thanks! We'll be in touch shortly.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── APP ── */
function App() {
  const [modalType, setModalType] = useState(null);

  return (
    <div>
      <Header />
      <ContactHero />
      <ContactOptions onOpenDemo={() => setModalType('demo')} onOpenSupport={() => setModalType('support')} />
      <QuickLinks />
      <OurOffices />
      <CtaBanner />
      <Footer />
      <ModalForm open={modalType !== null} onClose={() => setModalType(null)} type={modalType} />
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
