import React, { useState, useEffect, useId, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Section from '../components/Section';
import Button from '../components/Button';
import Input from '../components/Input';
import IconBadge from '../components/IconBadge';
import SectionHeader from '../components/SectionHeader';
import BottomCTA from '../components/BottomCTA';

/* One support address for the whole page — same one contact-support.jsx quotes. */
const SUPPORT_EMAIL = 'support@insightis.io';

/* The page is centred, and so are the form's own labels and helper text — but the
   value a visitor types stays left-aligned. Centred field text drags the caret
   mid-word, hides the left reading edge (worst on email / company), turns the
   multiline description into centred prose, and slides <option> text under the
   select chevron. Pinned explicitly so no future centred ancestor can leak in. */
const FIELD_TEXT_LEFT = { textAlign: 'left' };

/* Native <option> lists don't inherit the dark surface — tint them from the token. */
const OPTION_STYLE = { background: 'var(--ins-surface-card)' };

/* ── ICONS ── */
/* No stroke colour: .ins-icon-badge--teal supplies it via currentColor, and
   .ins-icon-badge > svg sizes them. */
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const HeadsetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
);
const HelpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

/* ── CONTACT HERO ── */
function ContactHero() {
  return (
    <Section padding="xl" style={{paddingBottom:'var(--ins-space-4xl)'}}>
      <div style={{textAlign:'center'}}>
        <h1 className="fu0 ins-text-display" style={{marginBottom:'var(--ins-size-5)'}}>
          Let's talk
        </h1>
        <p className="fu1 ins-text-body-xl" style={{maxWidth:'34rem', marginInline:'auto'}}>
          Whether you have a question, need a demo, or want to talk pricing — we'd love to hear from you.
        </p>
        <p className="fu2 ins-text-body ins-text--muted ins-text--mono" style={{marginTop:'var(--ins-size-5)'}}>
          Prefer email? <a className="ins-link--inline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
      </div>
    </Section>
  );
}

/* ── CONTACT OPTIONS ── */
function ContactOptions({ onOpenDemo, onOpenSupport }) {
  /* textAlign centres the copy, the inline-flex IconBadge and the inline-flex
     Buttons in one go — no per-element margin-inline needed. */
  const cardStyle = {textAlign:'center'};

  return (
    <Section padding="md">
      <div className="grid md:grid-cols-3" style={{gap:'var(--ins-size-4)'}}>

        {/* Talk to sales */}
        <div className="ins-feature-card" style={cardStyle}>
          <IconBadge tone="teal" size="lg" icon={<CalendarIcon />} style={{marginBottom:'var(--ins-size-5)'}} />
          <h3 className="ins-text-h3" style={{marginBottom:'var(--ins-size-3)'}}>Talk to sales</h3>
          <p className="ins-text-body" style={{marginBottom:'var(--ins-size-5)'}}>Get a personalized demo of Insightis for your team. We'll show you exactly how it works with your data sources.</p>
          <Button variant="primary" onClick={onOpenDemo}>
            Book a demo
          </Button>
          <p className="ins-text-body-xs ins-text--muted ins-text--mono" style={{marginTop:'var(--ins-size-4)'}}>Typically responds within 2 hours</p>
        </div>

        {/* Get support */}
        <div className="ins-feature-card" style={cardStyle}>
          <IconBadge tone="teal" size="lg" icon={<HeadsetIcon />} style={{marginBottom:'var(--ins-size-5)'}} />
          <h3 className="ins-text-h3" style={{marginBottom:'var(--ins-size-3)'}}>Get support</h3>
          <p className="ins-text-body" style={{marginBottom:'var(--ins-size-5)'}}>Already using Insightis? Our support team can help with setup, integrations, troubleshooting, and best practices.</p>
          <Button variant="secondary" onClick={onOpenSupport}>
            Open a support ticket
          </Button>
          <p className="ins-text-body-xs ins-text--muted ins-text--mono" style={{marginTop:'var(--ins-size-4)'}}>Pro plan: priority support included</p>
        </div>

        {/* Help center */}
        <div className="ins-feature-card" style={cardStyle}>
          <IconBadge tone="teal" size="lg" icon={<HelpIcon />} style={{marginBottom:'var(--ins-size-5)'}} />
          <h3 className="ins-text-h3" style={{marginBottom:'var(--ins-size-3)'}}>Help center</h3>
          <p className="ins-text-body" style={{marginBottom:'var(--ins-size-5)'}}>Browse our knowledge base for guides, FAQs, troubleshooting tips, and everything you need to get the most out of Insightis.</p>
          <Button as="a" href="/resources/contact-support" variant="secondary">
            Visit help center
          </Button>
          <p className="ins-text-body-xs ins-text--muted ins-text--mono" style={{marginTop:'var(--ins-size-4)'}}>Guides, FAQs &amp; troubleshooting</p>
        </div>

      </div>
    </Section>
  );
}

/* ── SELECT FIELD ──
   Input.jsx has no select mode, so this mirrors its label + field shape using the
   kit .ins-select (which ships its own chevron, focus ring and 16px iOS-safe size). */
function SelectField({ label, name, value, onChange, required, children }) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className="ins-text-label-sm" style={{display:'block', marginBottom:'var(--ins-size-2)'}}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="ins-select"
        style={FIELD_TEXT_LEFT}
      >
        {children}
      </select>
    </>
  );
}

const EMPTY_VALUES = {
  name: '', email: '', company: '', jobTitle: '', teamSize: '', message: '',
  product: '', priority: '', subject: '', description: '',
};

/* ── MODAL FORM ── */
function ModalForm({ open, onClose, type }) {
  const isDemo = type === 'demo';
  const titleId = useId();
  const [values, setValues] = useState(EMPTY_VALUES);
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);

  /* onClose arrives as a fresh arrow on every App render. Held in a ref so the
     open/close effect below keys off `open` alone — otherwise a parent re-render
     would wipe the half-filled form and yank focus back to the trigger. */
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    setValues(EMPTY_VALUES);
    setSubmitted(false);
    returnFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => { if (e.key === 'Escape') onCloseRef.current(); };
    document.addEventListener('keydown', onKeyDown);
    /* Focus the dialog itself (tabIndex -1) rather than a child: Button is a plain
       function component, so it cannot take a ref. */
    const focusTimer = window.setTimeout(() => { dialogRef.current?.focus(); }, 0);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = '';
      const trigger = returnFocusRef.current;
      if (trigger && typeof trigger.focus === 'function') trigger.focus();
    };
  }, [open]);

  if (!open) return null;

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  /* Real delivery, no stub: the filled-in fields are handed to the visitor's mail
     client addressed to SUPPORT_EMAIL, so a submitted form actually reaches a human.
     Swap this for a POST the day an endpoint exists — every field already has a name. */
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = isDemo
      ? `Demo request — ${values.company || values.name}`
      : `Support ticket — ${values.subject}`;
    const lines = isDemo
      ? [
          `Name: ${values.name}`,
          `Work email: ${values.email}`,
          `Company: ${values.company}`,
          `Job title: ${values.jobTitle}`,
          `Team size: ${values.teamSize}`,
          '',
          'Message:',
          values.message || '—',
        ]
      : [
          `Name: ${values.name}`,
          `Work email: ${values.email}`,
          `Company: ${values.company}`,
          `Product: ${values.product}`,
          `Priority: ${values.priority}`,
          `Subject: ${values.subject}`,
          '',
          'Description:',
          values.description,
        ];
    window.location.href = `mailto:${SUPPORT_EMAIL}`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(lines.join('\r\n'))}`;
    setSubmitted(true);
  };

  /* Keep Tab inside the dialog while it owns the screen. */
  const trapTab = (e) => {
    if (e.key !== 'Tab') return;
    const nodes = dialogRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
    );
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <div className="ins-modal" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className="ins-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapTab}
        tabIndex={-1}
        style={{position:'relative'}}
      >
        <Button
          variant="icon"
          size="sm"
          aria-label="Close dialog"
          onClick={onClose}
          style={{position:'absolute', top:'var(--ins-space-md)', right:'var(--ins-space-md)', zIndex:1}}
        >
          <CloseIcon />
        </Button>

        {/* Centred dialog header — eyebrow + title + lede by hand rather than
            SectionHeader: this is a dialog, not a page section, and SectionHeader
            renders its title at the 36px .ins-text-display scale. */}
        <div className="ins-modal__body" style={{textAlign:'center'}}>
          <div style={{marginBottom:'var(--ins-size-7)'}}>
            {/* The eyebrow star comes from .ins-eyebrow::before — never hand-added.
                Spacing lives on the h2 below: the pill is inline-flex, so its own
                margin-bottom would not affect the line box. */}
            <span className="ins-eyebrow ins-eyebrow--pill ins-eyebrow--center">
              {isDemo ? 'Demo request' : 'Support ticket'}
            </span>
            <h2 id={titleId} className="ins-text-h1" style={{marginTop:'var(--ins-size-4)'}}>
              {isDemo ? 'Book a personalized demo' : 'Submit a support ticket'}
            </h2>
            <p className="ins-text-body ins-text--muted" style={{marginTop:'var(--ins-size-2)'}}>
              {isDemo
                ? 'Tell us about your team and we\'ll tailor the demo to your needs.'
                : 'Describe your issue and our team will get back to you as soon as possible.'}
            </p>
          </div>

          {/* textAlign:center is inherited by the labels only — every field pins
              text-align:left through FIELD_TEXT_LEFT. */}
          <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'var(--ins-size-4)', textAlign:'center'}}>
            <div>
              <Input label="Name" name="name" type="text" placeholder="Your name" required value={values.name} onChange={set('name')} style={FIELD_TEXT_LEFT} />
            </div>
            <div>
              <Input label="Work email" name="email" type="email" placeholder="you@company.com" required value={values.email} onChange={set('email')} style={FIELD_TEXT_LEFT} />
            </div>
            <div>
              <Input label="Company" name="company" type="text" placeholder="Your company name" required value={values.company} onChange={set('company')} style={FIELD_TEXT_LEFT} />
            </div>

            {isDemo ? (
              <>
                <div>
                  <Input label="Job title" name="jobTitle" type="text" placeholder="e.g. Data Lead, CTO" required value={values.jobTitle} onChange={set('jobTitle')} style={FIELD_TEXT_LEFT} />
                </div>
                <div>
                  <SelectField label="Team size" name="teamSize" required value={values.teamSize} onChange={set('teamSize')}>
                    <option value="" style={OPTION_STYLE}>Select team size</option>
                    <option value="1-10" style={OPTION_STYLE}>1–10</option>
                    <option value="11-50" style={OPTION_STYLE}>11–50</option>
                    <option value="51-200" style={OPTION_STYLE}>51–200</option>
                    <option value="200+" style={OPTION_STYLE}>200+</option>
                  </SelectField>
                </div>
                <div>
                  <Input
                    multiline
                    label={<>Message <span style={{fontWeight:'var(--ins-font-weight-400)', textTransform:'none', letterSpacing:0}}>(optional)</span></>}
                    name="message"
                    placeholder="Anything specific you'd like us to cover?"
                    rows={3}
                    value={values.message}
                    onChange={set('message')}
                    style={FIELD_TEXT_LEFT}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <SelectField label="Product" name="product" required value={values.product} onChange={set('product')}>
                    <option value="" style={OPTION_STYLE}>Select product</option>
                    <option value="insightis" style={OPTION_STYLE}>Insightis</option>
                    <option value="other" style={OPTION_STYLE}>Other</option>
                  </SelectField>
                </div>
                <div>
                  <SelectField label="Priority" name="priority" required value={values.priority} onChange={set('priority')}>
                    <option value="" style={OPTION_STYLE}>Select priority</option>
                    <option value="low" style={OPTION_STYLE}>Low</option>
                    <option value="medium" style={OPTION_STYLE}>Medium</option>
                    <option value="high" style={OPTION_STYLE}>High</option>
                    <option value="critical" style={OPTION_STYLE}>Critical</option>
                  </SelectField>
                </div>
                <div>
                  <Input label="Subject" name="subject" type="text" placeholder="Brief summary of your issue" required value={values.subject} onChange={set('subject')} style={FIELD_TEXT_LEFT} />
                </div>
                <div>
                  <Input multiline label="Description" name="description" placeholder="Describe the issue in detail" rows={4} required value={values.description} onChange={set('description')} style={FIELD_TEXT_LEFT} />
                </div>
              </>
            )}

            <Button type="submit" variant="primary" size="md" radius="lg" className="w-full">
              {isDemo ? 'Request demo' : 'Submit ticket'}
            </Button>

            <p className="ins-text-body-sm ins-text--muted ins-text--mono">
              Or email us directly at <a className="ins-link--inline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </p>

            <p className="ins-text-body ins-text--success ins-text--medium" role="status" aria-live="polite">
              {submitted
                ? 'Your email app is opening with these details filled in — send it and we\'ll reply shortly.'
                : ''}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ── QUICK LINKS ── */
function QuickLinks() {
  const links = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
      title: 'Documentation',
      desc: 'In-depth technical docs, API references, and integration guides.',
      href: '/docs/',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16v12H5.5L4 17.5z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="13" y2="13"/></svg>,
      title: 'Prompt library',
      desc: 'Ready-made questions to copy, adapt and run against your own data.',
      href: '/resources/prompt-library',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="8" height="8" rx="2"/><rect x="14" y="13" width="8" height="8" rx="2"/><path d="M6 11v4a2 2 0 0 0 2 2h6"/></svg>,
      title: 'Data connectors',
      desc: 'See every source Insightis reads from, and what each one unlocks.',
      href: '/resources/connectors',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
      title: 'Roadmap',
      desc: 'See what\'s coming next and vote on features that matter to you.',
      href: '/resources/roadmap',
    },
  ];

  return (
    <Section padding="lg">
      {/* Wrapper carries the spacing: SectionHeader applies its own inline style
          (textAlign / flex / marginInline:auto), which a passed-in `style` would replace. */}
      <div style={{marginBottom:'var(--ins-size-10)'}}>
        <SectionHeader
          eyebrow="Resources"
          title="Find answers faster"
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4" style={{gap:'var(--ins-size-4)'}}>
        {links.map((l) => (
          <a key={l.title} href={l.href} className="ins-feature-card ins-feature-card--interactive" style={{textAlign:'center'}}>
            <IconBadge tone="teal" icon={l.icon} style={{marginBottom:'var(--ins-size-4)'}} />
            <h3 className="ins-text-h4" style={{marginBottom:'var(--ins-size-2)'}}>{l.title}</h3>
            <p className="ins-text-body">{l.desc}</p>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* ── OUR OFFICES ──
   Same five offices as about-insightis.jsx, rendered from the same shape: the
   country is the heading, so it is not repeated inside the address lines. */
function OurOffices() {
  const offices = [
    { code: 'us', country: 'United States',  lines: ['3422 Old Capitol Trl', 'Wilmington, Delaware', '19808'] },
    { code: 'cz', country: 'Czech Republic', lines: ['2230/44 Na Žertvách Str.', 'Prague', '180 00'] },
    { code: 'sk', country: 'Slovakia',       lines: ['Aston Building Werferova 1', 'Košice', '04011'] },
    { code: 'ua', country: 'Ukraine',        lines: ['226A Kulparkivska Str.', 'Lviv', '79071'] },
    { code: 'hk', country: 'Hong Kong',      lines: ['No. 5, 17/F, Strand 50', '50 Bonham Strand, Sheung Wan'] },
  ];

  return (
    <Section padding="md">
      <div style={{marginBottom:'var(--ins-size-10)'}}>
        <SectionHeader
          eyebrow="Insightis worldwide"
          title="Our offices"
          lede={<>Insightis is built by Devart. Every office below reaches the same team — or write to <a className="ins-link--inline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</>}
        />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-5" style={{gap:'var(--ins-size-6)'}}>
        {offices.map((o) => (
          <div key={o.code} style={{textAlign:'center'}}>
            <div style={{width:'var(--ins-size-10)', height:'var(--ins-size-10)', borderRadius:'var(--ins-radius-pill)', overflow:'hidden', border:'var(--ins-border-width-1) solid var(--ins-border-hover)', marginBottom:'var(--ins-size-4)', marginInline:'auto', flexShrink:0}}>
              <img src={`https://flagcdn.com/w80/${o.code}.png`} alt={`${o.country} flag`} width="40" height="40" loading="lazy" style={{width:'100%', height:'100%', objectFit:'cover'}} />
            </div>
            <p className="ins-text-h3" style={{marginBottom:'var(--ins-size-3)'}}>{o.country}</p>
            {o.lines.map((line) => (
              <p className="ins-text-body-sm ins-text--muted ins-text--mono" key={line}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── BOTTOM CTA ──
   Shared BottomCTA in the bottom-of-page slot, the way the solutions pages use it:
   "Start for free" → /auth/sign-up/. The --buttons variant is column + centred at
   every width, which the old two-column banner could never be. */
function BottomCTASection() {
  return (
    <Section padding="md" tone="tint">
      <BottomCTA
        variant="buttons"
        title={<>Still have <BottomCTA.Highlight>questions?</BottomCTA.Highlight></>}
        description="Start free in minutes and see it on your own data — or email us and someone on the team will get back to you."
        ctaLabel="Start for free"
        ctaHref="/auth/sign-up/"
        secondaryCtaLabel="Email support"
        secondaryCtaHref={`mailto:${SUPPORT_EMAIL}`}
        trustNote="Free plan · No credit card required"
      />
    </Section>
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
      <BottomCTASection />
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
