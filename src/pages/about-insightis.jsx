import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SectionHeader from '../components/SectionHeader';
import CheckIcon from '../components/CheckIcon';
import StepsProcess from '../components/StepsProcess';
import StatStrip from '../components/StatStrip';
import BottomCTA from '../components/BottomCTA';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/*
 * About page — rebuilt to the CMO launch-pack reference (about-insightis.html).
 * CLAIMS GUARDRAILS (do not break):
 *  - "28 years" and "40,000+ companies" consistently (NOT 25 / 500K / Fortune 100).
 *  - Logos are DEVART customers, shown with an explicit disclaimer.
 *  - No "SOC 2" until certified.
 *  - Team photos pending — the photo row ships commented out until assets arrive.
 *
 * LAYOUT NOTE: every text block on this page is centred (headings, ledes, card
 * bodies, the timeline, the product cards). Centred prose needs a measure, so
 * long paragraphs carry a maxWidth + marginInline:'auto' rather than running the
 * full container width — the same pattern the solutions pages use.
 */

/* ── ABOUT HERO ── */
function AboutHero() {
  // These four figures are the contractual claims above. The count-up lands on
  // exactly these end values — see src/components/StatStrip.jsx.
  // "28 years" ships as target 28 + suffix ' years' (not label 'years building
  // data tooling'): the big teal number then still reads as the claim string
  // "28 years" on its own, and a bare "28" next to "40,000+" and "200+" would be
  // ambiguous. It also keeps all four values on one line, so the four-across
  // strip stays visually even.
  const stats = [
    { target: 40000, suffix: '+',      label: 'companies trust Devart' },
    { target: 28,    suffix: ' years', label: 'building data tooling' },
    { target: 200,   suffix: '+',      label: 'data source integrations' },
    { target: 200,   suffix: '+',      label: 'products built by Devart' },
  ];
  return (
    <section style={{paddingTop:'var(--ins-size-32)', paddingBottom:'var(--ins-size-20)', position:'relative', overflow:'hidden'}}>
      {/* Centred glow, restored: the DS alignment pass (46847cb) swapped this for
          .ins-hero-glow, whose two ellipses sit at 72%/20% — this page's glow was
          always centred on the block. Same recipe as before that commit. */}
      <div style={{position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(9,160,157,.30) 0%, transparent 70%)', pointerEvents:'none'}}/>
      <div className="ins-container" style={{textAlign:'center', position:'relative', zIndex:10}}>
        <div className="fu0 ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'var(--ins-size-6)'}}>
          Insightis, a Devart product
        </div>
        <h1 className="ins-text-display-xl" style={{marginBottom:'var(--ins-size-5)'}}>
          Every dataset has an insight.<br/>
          <span style={{color:'var(--ins-text-highlight)'}}>We help you find it</span>
        </h1>
        <p className="fu2 ins-text-body-xl" style={{maxWidth:'640px', marginInline:'auto'}}>
          Hi, we're Insightis — the AI analytics workspace from the team at Devart. We built it so anyone on your team can just ask a question and get a straight, trustworthy answer. No SQL. No dashboards. No waiting on the data team.
        </p>
        <p className="fu2 ins-text-body" style={{maxWidth:'640px', marginInline:'auto', marginTop:'var(--ins-size-3)'}}>
          A new product from <span style={{color:'var(--ins-text-heading)', fontWeight:'var(--ins-font-weight-600)'}}>Devart</span> — trusted by 40,000+ companies for 28 years.
        </p>
        <div className="fu3" style={{marginTop:'var(--ins-size-7)'}}>
          <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
            Start for free
          </Button>
        </div>
        <StatStrip stats={stats} className="fu3" style={{marginTop:'var(--ins-size-14)'}} />
      </div>
    </section>
  );
}

/* ── MISSION / VISION ── */
function MissionVision() {
  const cards = [
    {
      eyebrow: 'Our mission',
      title: 'Close the gap between having data and understanding it',
      body: "You've got the data. Getting an answer out of it shouldn't take a ticket, a SQL query, and three days of waiting. We're here to make that gap disappear — so the answer is always just a question away.",
    },
    {
      eyebrow: 'Our vision',
      title: 'A world where anyone can just ask their data',
      body: "Picture this: churn ticks up, you type the question, and the answer's on your screen before your coffee's cold. No analyst queue, no SQL, no guesswork. That's the world we're building — where the people closest to the work can finally see what's really going on.",
    },
  ];
  return (
    <section style={{paddingTop:'var(--ins-size-20)', paddingBottom:'var(--ins-size-10)'}}>
      <div className="ins-container" style={{textAlign:'center'}}>
        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((c, i) => (
            <div key={i} className="ins-feature-card">
              {/* .ins-eyebrow is inline-flex, so text-align:center centres it. */}
              <div className="ins-eyebrow" style={{marginBottom:'var(--ins-size-4)'}}>{c.eyebrow}</div>
              <h2 className="ins-text-h2" style={{marginBottom:'var(--ins-size-4)'}}>{c.title}</h2>
              <p className="ins-text-body-lg" style={{maxWidth:'520px', marginInline:'auto'}}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── VALUES ── */
/* Rendered with the shared <StepsProcess> — the numbered-circle-and-connector treatment the
   platform pages use for "From question to answer in seconds" — rather than the three icon
   cards this was. Each body is tuned to render exactly THREE lines in the ~360px step column;
   the previous copy ran to four on two of the three, which is what made the row look ragged.
   Re-measure if you edit one: three lines is the spec, character count only approximates it. */
function MissionValues() {
  const steps = [
    {
      n: '01',
      title: 'Data should be accessible',
      body: 'Business intelligence should not need a data team. Anyone should be able to ask a question and get an answer from their own data, in plain English.',
      example: 'plain English in → answer out',
    },
    {
      n: '02',
      title: 'Accuracy is non-negotiable',
      body: 'Generic AI guesses from internet averages. Insightis answers from your data through a certified semantic layer, so every answer is traceable.',
      example: 'your data + certified metrics → grounded',
    },
    {
      n: '03',
      title: 'Complexity should be invisible',
      body: 'Behind every simple answer is real work: cross-source joins, metric definitions, live data. Our job is to hide all of it so you can decide.',
      example: 'joins + definitions → hidden',
    },
  ];

  return (
    <section style={{paddingTop:'var(--ins-size-16)', paddingBottom:'var(--ins-size-24)'}}>
      <div className="ins-container" style={{textAlign:'center'}}>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="What we believe"
            title="Three principles behind everything we build"
          />
        </div>
        <StepsProcess steps={steps} />
      </div>
    </section>
  );
}

/* ── OUR STORY TIMELINE ── */
function OurStory() {
  /* Timeline structure kept (owner's choice) with the solutions-page spotlight STYLING laid
     over it: the year is an eyebrow pill, the body sits at the spotlight type scale, and each
     milestone carries two check-bullets. Every bullet restates something the milestone's own
     description already said — this page's claims guardrails are at the top of the file, and
     no new company history is asserted here. */
  const milestones = [
    {
      year: '1997',
      title: 'Devart is founded',
      desc: 'It starts with a single Oracle connectivity product and one commitment: build data tools that simply work.',
      bullets: ['One Oracle connectivity product to begin with', 'Built for developers who demand reliability'],
    },
    {
      year: '2005',
      title: 'Data tools at scale',
      desc: 'The dbForge product line launches — database development and management, now used worldwide.',
      bullets: ['dbForge covers development and management', 'Hundreds of thousands of developers using it'],
    },
    {
      year: '2014',
      title: 'Cloud & connectivity',
      desc: 'Skyvia brings cloud data integration to hundreds of SaaS apps and databases.',
      bullets: ['Cloud integration across apps and databases', 'Devart becomes a full-stack data company'],
    },
    {
      year: '2025',
      title: 'Insightis is born',
      desc: 'Nearly three decades of data expertise, pointed at conversational analytics for every team.',
      bullets: ['Ask in plain English, get a trusted answer', 'Built for business teams, not just analysts'],
    },
    {
      year: '∞',
      title: 'The journey continues',
      desc: 'Expanding integrations, deepening the semantic layer, building the analytics layer every business deserves.',
      bullets: ['More integrations, a deeper semantic layer', 'The analytics layer modern business deserves'],
    },
  ];
  return (
    <section style={{paddingTop:'var(--ins-size-20)', paddingBottom:'var(--ins-size-24)'}}>
      <div className="ins-container" style={{textAlign:'center'}}>
        <div style={{marginBottom:'var(--ins-size-10)'}}>
          <SectionHeader
            eyebrow="Our Story"
            title="From data tools to data intelligence"
            lede="We didn't start yesterday. Insightis is the newest chapter in a story Devart has been writing since 1997 — and the same obsession with reliability runs through all of it."
          />
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'var(--ins-size-12)'}}>
          {milestones.map((m, i) => (
            <div key={i}>
              {/* The year as an eyebrow pill, exactly as the spotlights label each capability.
                  .ins-eyebrow is inline-flex, so the centred text-align centres it. */}
              <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'var(--ins-size-4)'}}>
                {m.year}
              </div>
              <h3 className="ins-text-h2" style={{marginBottom:'var(--ins-size-3)'}}>{m.title}</h3>
              <p className="ins-text-body-lg" style={{maxWidth:'640px', marginInline:'auto'}}>{m.desc}</p>
              {/* Check-bullets, centred as a stack of inline-flex rows: a centred <ul> with
                  left-hanging markers reads as broken, which is why each row is its own
                  inline-flex and the column centres them. */}
              <ul style={{listStyle:'none', padding:0, margin:'var(--ins-size-4) 0 0', display:'flex', flexDirection:'column', gap:'var(--ins-size-2)', alignItems:'center'}}>
                {m.bullets.map((b, j) => (
                  <li key={j} style={{display:'inline-flex', alignItems:'center', gap:'var(--ins-size-2)', textAlign:'left'}}>
                    <CheckIcon />
                    <span className="ins-text-body">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── DEVART FAMILY ── */
function DevartFamily() {
  const products = [
    { name: 'dbForge', href: 'https://www.devart.com/dbforge/',           desc: 'Database development and management for developers and DBAs.' },
    { name: 'Data Connectivity', href: 'https://www.devart.com/data-connectivity/', desc: 'ODBC, ADO.NET and JDBC drivers for every major data source.' },
    { name: 'Skyvia', href: 'https://skyvia.com/',            desc: 'Cloud data integration and backup across 200+ apps and databases.' },
    { name: 'TMetric', href: 'https://tmetric.com/',           desc: 'Time tracking and team productivity for businesses of every size.' },
  ];
  return (
    <section style={{paddingTop:'var(--ins-size-10)', paddingBottom:'var(--ins-size-24)'}}>
      <div className="ins-container" style={{textAlign:'center'}}>
        <div style={{marginBottom:'var(--ins-size-12)'}}>
          <SectionHeader
            eyebrow="Part of the Devart family"
            title="Insightis is built by Devart"
            lede="This isn't a weekend AI project. Insightis comes from Devart — the team behind 200+ data tools that 40,000+ companies have trusted for nearly 30 years. Same obsession with reliability, now pointed at a new problem: making analytics something anyone can use."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {products.map((p) => (
            /* Anchor, not a div: the cards name real products and a reader had no way to
               reach them. External, so target=_blank with rel=noopener noreferrer. */
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ins-feature-card ins-feature-card--interactive"
              style={{textDecoration:'none', display:'block'}}
            >
              <h3 className="ins-text-h3" style={{marginBottom:'var(--ins-size-2)'}}>{p.name}</h3>
              <p className="ins-text-body" style={{maxWidth:'320px', marginInline:'auto'}}>{p.desc}</p>
            </a>
          ))}
        </div>
        {/* Insightis — the newest member, featured. Centred column: the old layout
            was a space-between row with the CTA pinned hard right, where
            text-align was a no-op. */}
      </div>
    </section>
  );
}

/* ── TRUSTED BY (Devart customers — with disclaimer) ── */
function CompanyIcon({ name, size = 16 }) {
  const icons = {
    IBM: <svg width={size} height={size} viewBox="0 0 24 24" fill="#1F70C1"><path d="M0 6.8h2.4v.8H0zm0 1.6h2.4v.8H0zm0 1.6h2.4v.8H0zm3.2-3.2h5.6c.4.8.6 1.6.6 2.4s-.2 1.6-.6 2.4H3.2v-.8h4.9c.2-.5.3-1 .3-1.6s-.1-1.1-.3-1.6H3.2zm0 1.6h4.2v.8H3.2zm7.6-1.6h5.6c.4.8.6 1.6.6 2.4s-.2 1.6-.6 2.4h-5.6v-.8h4.9c.2-.5.3-1 .3-1.6s-.1-1.1-.3-1.6h-4.9zm0 1.6h4.2v.8h-4.2zm7.6-1.6H24v.8h-2.4v-.8zm0 1.6H24v.8h-2.4v-.8zm0 1.6H24v.8h-2.4v-.8zM18.8 8.4h2.4v.8h-2.4v-.8z"/></svg>,
    Amazon: <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF9900"><path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.699-3.182v.685zm3.186 7.705a.661.661 0 0 1-.748.075c-1.052-.873-1.238-1.279-1.814-2.111-1.732 1.766-2.958 2.295-5.204 2.295-2.658 0-4.726-1.641-4.726-4.923 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.384-2.294-.385-.579-1.124-.82-1.776-.82-1.207 0-2.284.619-2.548 1.902-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.548-.266-.472-.66C6.487 2.309 9.373 1.5 11.957 1.5c1.322 0 3.049.352 4.091 1.353 1.322 1.234 1.196 2.881 1.196 4.675v4.231c0 1.272.527 1.832 1.024 2.52.173.245.211.537-.011.719l-1.113.797zm2.56 2.274C17.559 21.995 14.951 23 12.67 23c-3.183 0-6.083-1.178-8.266-3.14-.172-.155-.019-.367.188-.247 2.351 1.369 5.257 2.191 8.263 2.191 2.026 0 4.252-.421 6.3-1.288.309-.131.568.203.549.553z"/></svg>,
    Samsung: <svg width={size} height={size} viewBox="0 0 24 24" fill="#1428A0"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.8 14.4c-.4 1.2-1.6 1.8-2.8 1.8H9c-1.2 0-2.4-.6-2.8-1.8-.2-.6-.2-1.2-.2-1.8V11c0-.6 0-1.2.2-1.8.4-1.2 1.6-1.8 2.8-1.8h6c1.2 0 2.4.6 2.8 1.8.2.6.2 1.2.2 1.8v1.6c0 .6 0 1.2-.2 1.8z"/><path d="M9.5 10.5h1v3h-1zm1.8 0h1v3h-1zm1.9 0h1v3h-1zm1.8.5v2h1v-2h-1z" fill="var(--ins-color-white)"/></svg>,
    Toyota: <svg width={size} height={size} viewBox="0 0 24 24" fill="#EB0A1E"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 .45 3 1s-1.34 1-3 1-3-.45-3-1 1.34-1 3-1zm-6 6.5c0-1.1 2.69-2 6-2s6 .9 6 2v1c0 1.1-2.69 2-6 2s-6-.9-6-2v-1zm6 6.5c-3.31 0-6-.9-6-2v-1c1.29.8 3.52 1.3 6 1.3s4.71-.5 6-1.3v1c0 1.1-2.69 2-6 2z"/></svg>,
    Microsoft: <svg width={size} height={size} viewBox="0 0 24 24"><path d="M11.4 2H2v9.4h9.4V2z" fill="#F25022"/><path d="M22 2h-9.4v9.4H22V2z" fill="#7FBA00"/><path d="M11.4 12.6H2V22h9.4v-9.4z" fill="#00A4EF"/><path d="M22 12.6h-9.4V22H22v-9.4z" fill="#FFB900"/></svg>,
    Oracle: <svg width={size} height={size} viewBox="0 0 24 24" fill="#F80000"><path d="M12 4a8 8 0 1 0 0 16A8 8 0 0 0 12 4zm0 2a6 6 0 1 1 0 12A6 6 0 0 1 12 6z"/></svg>,
    Siemens: <svg width={size} height={size} viewBox="0 0 24 24" fill="#009999"><path d="M2 12h4v2H2zm4-4h4v10H6zm4-4h4v18h-4zm4 4h4v10h-4zm4 4h4v2h-4z"/></svg>,
    Cisco: <svg width={size} height={size} viewBox="0 0 24 24" fill="#1BA0D7"><path d="M1 9h2v6H1zm3.5-2h2v10h-2zm3.5-3h2v16H8zm3.5 3h2v10h-2zm3.5-3h2v16H15zm3.5 2h2v10h-2zm3.5 3h2v6h-2z"/></svg>,
    Accenture: <svg width={size} height={size} viewBox="0 0 24 24" fill="#A100FF"><path d="M12 2L22 20H2L12 2zm0 4L5 18h14L12 6z"/></svg>,
    Deloitte: <svg width={size} height={size} viewBox="0 0 24 24" fill="#86BC25"><path d="M3 6h2v12H3zm4-2h2v16H7zm4 3h2v10h-4z"/><circle cx="18" cy="12" r="4" fill="#86BC25"/></svg>,
    SAP: <svg width={size} height={size} viewBox="0 0 24 24" fill="#0070F2"><path d="M2 4h20v16H2V4zm2 2v12h16V6H4zm2 2h5v2H6zm0 4h8v2H6zm6-4h4v6h-4z"/></svg>,
    Bosch: <svg width={size} height={size} viewBox="0 0 24 24" fill="#EA0016"><circle cx="12" cy="12" r="10" fill="none" stroke="#EA0016" strokeWidth="2"/><circle cx="12" cy="12" r="5"/></svg>,
  };
  return icons[name] || <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--ins-button-primary-bg)"><rect width="24" height="24" rx="4"/><text x="12" y="16" textAnchor="middle" fill="var(--ins-color-white)" fontSize="12" fontWeight="500">{name[0]}</text></svg>;
}

function CompanyPill({ name }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--ins-surface-card)] border border-[var(--ins-border-default)] rounded-full flex-shrink-0 hover:border-[var(--ins-border-hover)] transition-colors">
      <div className="w-5 h-5 flex items-center justify-center">
        <CompanyIcon name={name} size={16} />
      </div>
      <span className="text-xs text-[var(--ins-text-body)] font-medium whitespace-nowrap">{name}</span>
    </div>
  );
}

function TrustedBy() {
  const companies = ['IBM', 'Amazon', 'Samsung', 'Toyota', 'Microsoft', 'Oracle', 'Siemens', 'Cisco', 'Accenture', 'Deloitte', 'SAP', 'Bosch'];
  return (
    <section>
      <div className="ins-container" style={{textAlign:'center'}}>
        {/* Label above the marquee rather than beside it — as a flex row the label
            sat hard left and text-align could not touch it. */}
        <div className="ins-feature-card">
          <span className="ins-text-overline" style={{display:'block', marginBottom:'var(--ins-size-4)'}}>Devart's tools power teams at</span>
          <div className="overflow-hidden marquee-container" style={{maskImage:'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'}}>
            <div className="flex gap-3 marquee-left" style={{width:'max-content'}}>
              {[...companies, ...companies].map((name, i) => (
                <CompanyPill key={`${name}-${i}`} name={name} />
              ))}
            </div>
          </div>
        </div>
        <p className="ins-text-body-sm ins-text--muted" style={{maxWidth:'640px', marginInline:'auto', marginTop:'var(--ins-size-4)'}}>
          Logos represent organizations that use Devart products. Insightis is a new product within the Devart family.
        </p>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section style={{paddingTop:'var(--ins-size-8)', paddingBottom:'var(--ins-size-32)', position:'relative'}}>
      <div className="ins-container">
        {/* .ins-bottom-cta already draws the card — border, radius, gradient, the
            top hairline (::before) and the left glow (::after). No wrapper. */}
        <BottomCTA
          variant="buttons"
          title={<>Get answers from your data <BottomCTA.Highlight>in seconds</BottomCTA.Highlight>, not days</>}
          description="Ask your first question in under two minutes — no SQL, no analyst queue, no waiting. Free to start, no credit card required."
          ctaLabel="Start for free"
          secondaryCtaLabel="Explore Pricing"
          secondaryCtaHref="/pricing"
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
      <AboutHero />
      <MissionVision />
      <MissionValues />
      {/* TrustedBy sits directly above Our Story: the customer logos are the proof that
          earns the history that follows. It replaced the connector marquee here — this
          page is about the company, not the integration catalogue. */}
      <TrustedBy />
      <OurStory />
      <DevartFamily />
      <BottomCTASection />
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
