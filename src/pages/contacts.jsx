import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Section from '../components/Section';
import Button from '../components/Button';
import IconBadge from '../components/IconBadge';
import SectionHeader from '../components/SectionHeader';
import BottomCTA from '../components/BottomCTA';
import SupportTicketModal from '../components/SupportTicketModal';
import SalesEnquiryModal from '../components/SalesEnquiryModal';

/* One support address for the whole page — same one contact-support.jsx quotes. */
const SUPPORT_EMAIL = 'support@insightis.io';

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
          title={<>Get answers from your data <BottomCTA.Highlight>in seconds</BottomCTA.Highlight>, not days</>}
          description="Ask your first question in under two minutes — no SQL, no analyst queue, no waiting. Free to start, no credit card required."
          ctaLabel="Start for free"
          secondaryCtaLabel="Explore Pricing"
          secondaryCtaHref="/pricing"
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
      {/* Both dialogs are now shared components that file to Zoho. They replaced
          this page's ModalForm, whose two branches each composed a mailto: link —
          so on a machine with no mail client configured, clicking either button
          did nothing at all. */}
      <SalesEnquiryModal open={modalType === 'demo'} onClose={() => setModalType(null)} />
      <SupportTicketModal open={modalType === 'support'} onClose={() => setModalType(null)} />
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
