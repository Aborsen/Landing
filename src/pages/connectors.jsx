import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import SearchInput from '../components/SearchInput';
import ConnectorIcon from '../components/ConnectorIcon';
import RequestConnectorModal from '../components/RequestConnectorModal';
import { CATEGORIES, CONNECTORS } from '../data/connectors';
import ArrowRightIcon from '../components/ArrowRightIcon';

/* ── APP ── */
/* ── FLOATING CHAT BAR ── */

/* ── AI ASSISTANT PANEL ── */

/* ── CONNECTORS DATA ── */
/* ── CONNECTORS HERO ── */

function ConnectorsHero() {
  return (
    <section style={{padding:'80px 0 40px', textAlign:'center', position:'relative', zIndex:1}}>
      <div style={{maxWidth:'720px', margin:'0 auto', padding:'0 24px'}}>
        <div className="fu0 ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'var(--ins-size-6)'}}>Data Connectors</div>
        <h1 className="ins-text-display" style={{marginBottom:'var(--ins-size-5)'}}>
          <span style={{color:'var(--ins-text-highlight)'}}>Connect</span> to any source
        </h1>
        <p className="fu2 ins-text-body-xl" style={{maxWidth:'560px', margin:'0 auto var(--ins-size-6)'}}>
          Explore 200+ prebuilt connectors, create custom ones with REST and GraphQL, or request the data source you're missing.
        </p>
        <Button as="a" href="/auth/sign-up/" variant="primary" size="md" iconEnd={<ArrowRightIcon />} className="fu3">
          Start for free
        </Button>
      </div>
    </section>
  );
}

/* ── CATEGORY SIDEBAR ── */
function ConnectorCategorySidebar({ active, setActive, counts, onRequestConnector }) {
  return (
    <aside className="connectors-sidebar-col">
      <div className="cat-group-header">Categories</div>
      <div>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`cat-item ${active === cat ? 'active' : ''}`}
          >
            <span style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{cat}</span>
            <span className="count">{counts[cat] || 0}</span>
          </button>
        ))}
      </div>

      {/* Request a connector */}
      <div style={{
        marginTop:'var(--ins-size-5)', padding:'var(--ins-size-4)',
        borderTop:'1px solid var(--ins-border-default)',
      }}>
        <p className="ins-text-body-sm" style={{marginBottom:'10px'}}>
          Don't see what you need?
        </p>
        <button
          onClick={onRequestConnector}
          style={{
            display:'inline-flex', alignItems:'center', gap:'6px',
            width:'100%', justifyContent:'center',
            padding:'8px 12px', borderRadius:'var(--ins-radius-8)',
            border:'1px solid rgba(9,160,157,.3)',
            background:'var(--ins-surface-brand-tint)',
            color:'var(--ins-text-highlight)', fontSize:'var(--ins-font-size-12)', fontWeight:500,
            fontFamily:'var(--ins-font-family-sans)', cursor:'pointer',
            transition:'background .15s, border-color .15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(9,160,157,.15)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ins-surface-brand-tint)'; }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Request a connector
        </button>
      </div>
    </aside>
  );
}

/* ── CONNECTOR TILE ── */
function ConnectorTile({ c, index, onAskChat, onConnect }) {
  const initials = c.name.split(' ').filter(w => !['&','the','-'].includes(w.toLowerCase())).slice(0,2).map(w => w[0]).join('').toUpperCase();

  return (
    <div className="connector-tile" style={{ animationDelay:`${Math.min(index,12) * 0.02}s` }}>
      <div className="connector-face">
        <div className="connector-logo">
          <ConnectorIcon
            name={c.name}
            slug={c.slug}
            domain={c.domain}
            color={c.color}
            abbr={initials}
            bg="transparent"
            size={52}
            sprite
          />
        </div>
        <div className="connector-name" title={c.name}>{c.name}</div>
      </div>

      <div className="connector-overlay">
        <a className="ins-btn ins-btn--secondary ins-btn--sm" href="/auth/sign-in/" onClick={(e) => e.stopPropagation()}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          Sign in to connect
        </a>
      </div>
    </div>
  );
}

/* ── CONNECTOR GRID ── */
function ConnectorGrid({ items, onAskChat, onConnect }) {
  if (items.length === 0) {
    return (
      <div style={{
        padding:'40px 24px', textAlign:'center',
        border:'1px dashed var(--ins-color-white-a-08)', borderRadius:'var(--ins-radius-12)',
        color:'var(--ins-text-body)', fontSize:'var(--ins-font-size-14)',
      }}>
        No connectors match your search.
      </div>
    );
  }
  return (
    <div className="connector-grid">
      {items.map((c, i) => (
        <ConnectorTile key={c.name} c={c} index={i} onAskChat={onAskChat} onConnect={onConnect} />
      ))}
    </div>
  );
}

/* ── APP ── */
function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [assistantQuery, setAssistantQuery] = useState(null);
  const [requestOpen, setRequestOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = CONNECTORS.filter(c =>
    (category === 'All' || c.category === category) &&
    (!q || c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
  );

  const handleAskChat = (c) => {
    const url = `Chat.html?connector=${encodeURIComponent(c.name)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const handleConnect = (c) => {
    setAssistantQuery(`Walk me through connecting ${c.name} to Insightis step by step.`);
  };

  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'All' ? CONNECTORS.length : CONNECTORS.filter(c => c.category === cat).length;
    return acc;
  }, {});

  /* Both triggers — the sidebar button and the bottom CTA — open the real form.
     They used to hand the visitor a canned line for the demo assistant panel,
     which told them how to ask rather than letting them ask. */
  const handleRequestConnector = () => setRequestOpen(true);

  return (
    <div>
      <Header />
      <main>
      <ConnectorsHero />
      <div className="connectors-layout">
        <ConnectorCategorySidebar
          active={category}
          setActive={setCategory}
          counts={counts}
          onRequestConnector={handleRequestConnector}
        />
        <div className="connectors-content">
          <SearchInput
            className="fu2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 200+ connectors..."
            style={{marginBottom:'var(--ins-size-6)'}}
          />
          <ConnectorGrid items={filtered} onAskChat={handleAskChat} onConnect={handleConnect} />

          {/* Bottom request-a-connector CTA (shown on mobile where sidebar is hidden, and as a reinforcement on desktop) */}
          <div style={{
            marginTop:'var(--ins-size-10)', padding:'var(--ins-size-6)',
            border:'1px solid rgba(9,160,157,.18)',
            borderRadius:'var(--ins-radius-12)',
            background:'linear-gradient(135deg, rgba(9,160,157,0.06), rgba(16,22,30,0.4))',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            gap:'var(--ins-size-4)', flexWrap:'wrap',
          }}>
            <div>
              <h3 style={{fontSize:'var(--ins-font-size-16)', fontWeight:500, color:'var(--ins-text-heading-soft)', marginBottom:'var(--ins-size-1)', letterSpacing:'-.01em'}}>
                Can't find your tool?
              </h3>
              <p className="ins-text-body">
                Tell us what you use and we'll prioritize the connector.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              radius="md"
              onClick={handleRequestConnector}
              iconStart={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}
            >
              Request a connector
            </Button>
          </div>
        </div>
      </div>
            </main>
      <Footer />
      {/* Renders nothing while closed, so the prerendered HTML is unchanged and
          hydration has nothing to reconcile. */}
      <RequestConnectorModal open={requestOpen} onClose={() => setRequestOpen(false)} />
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
