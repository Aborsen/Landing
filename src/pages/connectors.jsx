import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import ConnectorIcon from '../components/ConnectorIcon';
import { CATEGORIES, CONNECTORS } from '../data/connectors';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/* ── APP ── */
/* ── FLOATING CHAT BAR ── */
function FloatingChat({ onSubmit }) {
  const [value, setValue] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <div style={{
      position:'fixed', bottom:0, left:0, right:0,
      zIndex:100,
      opacity: visible ? 1 : 0,
      pointerEvents: 'none',
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity .25s, transform .25s',
    }}>
      <div className="floating-chat-wrap" style={{ pointerEvents:'all' }}>
        <div style={{
          display:'flex', alignItems:'center', gap:'8px',
          background:'rgba(16,22,30,0.96)',
          border: focused ? '1px solid rgba(9,160,157,.5)' : '1px solid rgba(255,255,255,.09)',
          borderRadius:'12px',
          padding:'6px 6px 6px 12px',
          transition:'border-color .2s',
          boxShadow:'0 8px 32px rgba(0,0,0,0.45)',
          backdropFilter:'blur(10px)',
          WebkitBackdropFilter:'blur(10px)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-body)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
            placeholder="Ask a question..."
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              fontSize:'13px', color:'var(--ins-color-gray-100)',
              fontFamily:'inherit',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              flexShrink:0,
              padding:'6px 14px', borderRadius:'7px',
              background: value.trim() ? 'var(--ins-button-primary-bg)' : 'rgba(9,160,157,.15)',
              color: value.trim() ? '#fff' : '#4A9EA0',
              border:'none', cursor: value.trim() ? 'pointer' : 'default',
              fontSize:'12px', fontWeight:600,
              fontFamily:'inherit',
              transition:'background .2s, color .2s',
            }}
            onMouseEnter={(e) => { if (value.trim()) e.currentTarget.style.background = 'var(--ins-button-primary-bg-hover)'; }}
            onMouseLeave={(e) => { if (value.trim()) e.currentTarget.style.background = 'var(--ins-button-primary-bg)'; }}
          >
            Ask AI
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── AI ASSISTANT PANEL ── */
function AssistantResponseText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i} style={{ color:'#C8E6EA', fontWeight:600 }}>{p.slice(2,-2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
}

function AIAssistantPanel({ query, onClose }) {
  const [phase, setPhase] = React.useState('searching'); // searching | reading | done
  const [input, setInput] = React.useState('');
  const [inputFocused, setInputFocused] = React.useState(false);
  const [messages, setMessages] = React.useState([{ role:'user', text: query }]);
  const [copied, setCopied] = React.useState(false);
  const bottomRef = React.useRef(null);

  const SAMPLE_RESPONSE = {
    searchTerms: query.toLowerCase().split(' ').filter(w => w.length > 2).slice(0, 3).join(', ') || 'insightis',
    intro: '**Insightis** is an AI-powered analytics workspace that lets you ask questions about your business data in plain language — and get instant, reliable answers. No SQL, no dashboards, no waiting.',
    bullets: [
      { bold: 'AI Chat', text: ' — ask anything about your data and get answers in seconds' },
      { bold: 'Semantic Layer', text: ' — define your metrics once, use them everywhere with one trusted source of truth' },
      { bold: '200+ Integrations', text: ' — connect your databases, CRMs, and SaaS tools directly' },
      { bold: 'Reports', text: ' — save and share insights with your team on a schedule' },
    ],
    outro: 'Think of it as your personal data analyst — always available, always accurate, no technical skills required.',
    links: ['Quick Start Guide', 'Connecting Your First Data Source', 'AI Chat Overview'],
  };

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase('reading'), 800);
    const t2 = setTimeout(() => {
      setPhase('done');
      setMessages(m => [...m, { role:'assistant', response: SAMPLE_RESPONSE }]);
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [messages, phase]);

  const handleFollowUp = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setInput('');
    setMessages(m => [...m, { role:'user', text: q }]);
    setPhase('searching');
    setTimeout(() => setPhase('reading'), 800);
    setTimeout(() => {
      setPhase('done');
      setMessages(m => [...m, { role:'assistant', response: SAMPLE_RESPONSE }]);
    }, 1800);
  };

  const iconBtn = (title, path) => (
    <button title={title} onClick={() => {
      if (title === 'Copy') { navigator.clipboard?.writeText(''); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    }} style={{
      background:'none', border:'none', cursor:'pointer', padding:'4px', borderRadius:'4px',
      color:'#5E8290', transition:'color .15s',
    }}
    onMouseEnter={e => e.currentTarget.style.color = 'var(--ins-text-body)'}
    onMouseLeave={e => e.currentTarget.style.color = '#5E8290'}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={path}/>
      </svg>
    </button>
  );

  return (
    <div style={{
      position:'fixed', right:0, top:0, bottom:0, width:'280px',
      background:'#0B0F16',
      borderLeft:'1px solid rgba(255,255,255,0.07)',
      display:'flex', flexDirection:'column',
      zIndex:200,
      animation:'slideInRight .25s ease',
    }}>
      {/* Header */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.07)',
        flexShrink:0,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span style={{ fontSize:'13px', fontWeight:600, color:'var(--ins-color-gray-100)' }}>Assistant</span>
        </div>
        <div style={{ display:'flex', gap:'2px' }}>
          <button onClick={onClose} style={{
            background:'none', border:'none', cursor:'pointer', padding:'4px', borderRadius:'4px',
            color:'#5E8290', transition:'color .15s', display:'flex',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--ins-color-gray-100)'}
          onMouseLeave={e => e.currentTarget.style.color = '#5E8290'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'16px 14px', display:'flex', flexDirection:'column', gap:'16px' }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.role === 'user' ? (
              <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <div style={{
                  background:'rgba(9,160,157,0.15)',
                  border:'1px solid rgba(9,160,157,0.25)',
                  borderRadius:'10px 10px 2px 10px',
                  padding:'8px 12px',
                  fontSize:'13px', color:'#C8E6EA', maxWidth:'90%',
                  lineHeight:1.5,
                }}>
                  {msg.text}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize:'12px', color:'#3A6070', marginBottom:'10px', display:'flex', flexDirection:'column', gap:'4px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    Found results for <em style={{ color:'#4A8090', fontStyle:'normal' }}>{msg.response.searchTerms}</em>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    Read 1 file
                  </div>
                </div>
                <p style={{ fontSize:'13px', color:'#8AAAB8', lineHeight:1.7, marginBottom:'10px' }}>
                  <AssistantResponseText text={msg.response.intro} />
                </p>
                <ul style={{ margin:'0 0 10px 0', padding:'0', listStyle:'none', display:'flex', flexDirection:'column', gap:'5px' }}>
                  {msg.response.bullets.map((b, i) => (
                    <li key={i} style={{ fontSize:'13px', color:'#8AAAB8', lineHeight:1.6, paddingLeft:'14px', position:'relative' }}>
                      <span style={{ position:'absolute', left:0, color:'var(--ins-text-highlight)', fontWeight:700 }}>·</span>
                      <strong style={{ color:'#C8E6EA' }}>{b.bold}</strong>{b.text}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize:'13px', color:'#8AAAB8', lineHeight:1.7, marginBottom:'12px' }}>
                  {msg.response.outro}
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:'4px', marginBottom:'12px' }}>
                  {msg.response.links.map((l, i) => (
                    <a key={i} href="#" style={{ fontSize:'12px', color:'var(--ins-button-primary-bg-hover)', textDecoration:'none' }}
                      onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                    >{l}</a>
                  ))}
                </div>
                {/* Feedback row */}
                <div style={{ display:'flex', gap:'4px', alignItems:'center' }}>
                  {iconBtn('Helpful', 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z')}
                  {iconBtn('Not helpful', 'M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z')}
                  {iconBtn('Copy', copied ? 'M20 6L9 17l-5-5' : 'M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.912 4.895 3 6 3h8c1.105 0 2 .912 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.088 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z')}
                  {iconBtn('Regenerate', 'M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15')}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading state */}
        {phase !== 'done' && (
          <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'#3A6070' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation:'pulse 1.2s ease infinite' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              {phase === 'searching' ? 'Searching docs…' : 'Reading file…'}
            </div>
            <div style={{ display:'flex', gap:'5px', paddingTop:'4px' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width:'6px', height:'6px', borderRadius:'50%',
                  background:'var(--ins-text-highlight)',
                  animation:`pulse 1.2s ease ${i * 0.2}s infinite`,
                }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Follow-up input */}
      <div style={{
        padding:'10px 14px 18px', borderTop:'1px solid rgba(255,255,255,0.07)', flexShrink:0,
      }}>
        <div style={{
          display:'flex', alignItems:'center', gap:'8px',
          background:'rgba(255,255,255,0.04)',
          border: inputFocused ? '1px solid rgba(9,160,157,.4)' : '1px solid rgba(255,255,255,.07)',
          borderRadius:'10px',
          padding:'8px 8px 8px 12px',
          transition:'border-color .2s',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onKeyDown={e => { if (e.key === 'Enter') handleFollowUp(); }}
            placeholder="Ask a question..."
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              fontSize:'13px', color:'var(--ins-color-gray-100)', fontFamily:'Geist,sans-serif',
            }}
          />
          <button onClick={handleFollowUp} style={{
            width:'28px', height:'28px', borderRadius:'7px', flexShrink:0,
            background: input.trim() ? 'var(--ins-button-primary-bg)' : 'rgba(9,160,157,.12)',
            border:'none', cursor: input.trim() ? 'pointer' : 'default',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'background .2s',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? '#fff' : '#3A7080'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── CONNECTORS DATA ── */
/* ── CONNECTORS HERO ── */
// 24 hero-matrix picks — a curated grid of recognizable brands across the
// catalog. Names match entries in the CONNECTORS list so ConnectorIcon
// resolves the same way as the gallery tiles below.
const HERO_MATRIX = [
  { name:'HubSpot',          domain:'hubspot.com'    },
  { name:'Salesforce',       domain:'salesforce.com' },
  { name:'Stripe',           domain:'stripe.com'     },
  { name:'Slack',            domain:'slack.com'      },
  { name:'PostgreSQL',       domain:'postgresql.org' },
  { name:'Snowflake',        domain:'snowflake.com'  },
  { name:'Google BigQuery',  domain:'cloud.google.com' },
  { name:'Amazon Redshift',  domain:'aws.amazon.com' },
  { name:'Google Analytics', domain:'analytics.google.com' },
  { name:'Mixpanel',         domain:'mixpanel.com'   },
  { name:'Intercom',         domain:'intercom.com'   },
  { name:'Shopify',          domain:'shopify.com'    },
  { name:'Jira',             domain:'atlassian.com'  },
  { name:'Asana',            domain:'asana.com'      },
  { name:'Notion',           domain:'notion.com'     },
  { name:'Monday.com',       domain:'monday.com'     },
  { name:'Pipedrive',        domain:'pipedrive.com'  },
  { name:'Calendly',         domain:'acuityscheduling.com' },
  { name:'Zendesk',          domain:'zendesk.com'    },
  { name:'Zoho CRM',         domain:'zoho.com'       },
  { name:'Mailchimp',        domain:'mailchimp.com'  },
  { name:'Dropbox',          domain:'dropbox.com'    },
  { name:'GitHub',           domain:'github.com'     },
  { name:'Twilio',           domain:'twilio.com'     },
];

// Each row offset slightly to produce a "scattered cluster" instead of a strict grid.
// indent = how many cells to shift right (0 = flush, 1 = half-cell, etc.)
const HERO_MATRIX_ROWS = [
  { indent: 2, picks: ['Snowflake', 'Mailchimp', 'QuickBooks Online'] },
  { indent: 1, picks: ['Shopify', 'Stripe', 'Pipedrive', 'FTP'] },
  { indent: 0, picks: ['HubSpot', 'Amazon Redshift', 'Salesforce', 'PostgreSQL', 'Google BigQuery', 'Slack'] },
  { indent: 0, picks: ['Mixpanel', 'Airtable', 'Calendly', 'GitHub', 'Notion'] },
  { indent: 1, picks: ['Google Sheets', 'Zapier-like-bolt', 'Slack'] },
  { indent: 3, picks: ['Salesforce'] },
];

function ConnectorsHero() {
  // Flatten the picks into a {name, domain} list using the existing CONNECTORS catalog.
  // Falls back to a sensible domain for the synthetic 'Zapier-like-bolt' bolt icon.
  const resolve = (name) => {
    const c = CONNECTORS.find(c => c.name === name);
    if (c) return { name, domain: c.domain };
    return { name, domain: null };
  };

  return (
    <section style={{padding:'72px 0 36px', position:'relative', zIndex:1}}>
      <div style={{maxWidth:'1240px', margin:'0 auto', padding:'0 24px', display:'grid', gridTemplateColumns:'minmax(0, 1fr) minmax(0, 1fr)', gap:'48px', alignItems:'center'}}>

        {/* LEFT — text */}
        <div>
          <div className="fu0" style={{fontSize:'12px', color:'var(--ins-text-body)', letterSpacing:'0.04em', marginBottom:'18px'}}>
            <a href="/" style={{color:'var(--ins-text-body)', textDecoration:'none'}}>Home</a>
            <span style={{margin:'0 6px', opacity:0.5}}>/</span>
            <span style={{color:'var(--ins-color-gray-100)'}}>Connectors</span>
            <span style={{margin:'0 6px', opacity:0.5}}>/</span>
          </div>
          <h1 className="fu1" style={{color:'var(--ins-text-heading-soft)',fontSize:'clamp(2.4rem,3.6vw,4rem)', fontWeight:700, fontFamily:"var(--ins-font-family-sans)", letterSpacing:'-.04em', lineHeight:1.05, marginBottom:'22px', textWrap:'balance'}}>
            <span style={{color:'var(--ins-text-highlight)'}}>Connect</span>{' '}
            <span style={{color:'var(--ins-text-heading-soft)'}}>to any source.</span>
          </h1>
          <p className="fu2 ins-text-lede ins-text--muted" style={{maxWidth:'520px', marginBottom:'30px'}}>
            Explore 200+ prebuilt connectors, create custom ones with REST and GraphQL connectors, or request the data source you're missing.
          </p>
          <Button as="a" href="/auth/sign-up/" variant="primary" size="md" iconEnd={<ArrowRightIcon />} className="fu3">
            Start for Free
          </Button>
        </div>

        {/* RIGHT — scattered connector cluster */}
        <div className="fu4" style={{display:'flex', flexDirection:'column', gap:'12px', justifySelf:'end', width:'100%', maxWidth:'520px'}}>
          {HERO_MATRIX_ROWS.map((row, ri) => (
            <div key={ri} style={{display:'flex', gap:'12px', marginLeft:`${row.indent * 48}px`}}>
              {row.picks.map((name, ci) => {
                const c = resolve(name);
                return (
                  <div key={`${ri}-${ci}-${name}`} title={c.name} style={{
                    width:'56px', height:'56px',
                    borderRadius:'50%',
                    background:'rgba(255,255,255,0.04)',
                    border:'1px solid rgba(255,255,255,0.08)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexShrink:0,
                    boxShadow:'0 4px 12px rgba(0,0,0,0.25)',
                  }}>
                    <ConnectorIcon name={c.name} slug={c.slug} domain={c.domain} bg="transparent" size={28}/>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
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
        marginTop:'20px', padding:'16px',
        borderTop:'1px solid rgba(255,255,255,0.055)',
      }}>
        <p className="ins-text-body-sm" style={{marginBottom:'10px'}}>
          Don't see what you need?
        </p>
        <button
          onClick={onRequestConnector}
          style={{
            display:'inline-flex', alignItems:'center', gap:'6px',
            width:'100%', justifyContent:'center',
            padding:'8px 12px', borderRadius:'8px',
            border:'1px solid rgba(9,160,157,.3)',
            background:'rgba(9,160,157,.08)',
            color:'var(--ins-text-highlight)', fontSize:'12.5px', fontWeight:500,
            fontFamily:'Geist, sans-serif', cursor:'pointer',
            transition:'background .15s, border-color .15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(9,160,157,.15)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(9,160,157,.08)'; }}
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
            size={32}
          />
        </div>
        <div className="connector-name" title={c.name}>{c.name}</div>
      </div>

      <div className="connector-overlay">
        <button className="overlay-btn primary" onClick={(e) => { e.stopPropagation(); onAskChat(c); }}>
          Open in a new chat
        </button>
        <button className="overlay-btn secondary" onClick={(e) => { e.stopPropagation(); onConnect(c); }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/>
            <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>
          </svg>
          Connect
        </button>
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
        border:'1px dashed rgba(255,255,255,0.08)', borderRadius:'12px',
        color:'var(--ins-text-body)', fontSize:'14px',
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

  const handleRequestConnector = () => {
    setAssistantQuery('I want to request a new data connector. How do I submit the request and what info do you need?');
  };

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
          <div className="connector-search fu2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-body)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search 200+ connectors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{background:'none',border:'none',color:'var(--ins-text-body)',cursor:'pointer',padding:'2px 6px',fontSize:'12px'}}>
                Clear
              </button>
            )}
          </div>
          <ConnectorGrid items={filtered} onAskChat={handleAskChat} onConnect={handleConnect} />

          {/* Bottom request-a-connector CTA (shown on mobile where sidebar is hidden, and as a reinforcement on desktop) */}
          <div style={{
            marginTop:'40px', padding:'24px',
            border:'1px solid rgba(9,160,157,.18)',
            borderRadius:'12px',
            background:'linear-gradient(135deg, rgba(9,160,157,0.06), rgba(16,22,30,0.4))',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            gap:'16px', flexWrap:'wrap',
          }}>
            <div>
              <h3 style={{fontSize:'16px', fontWeight:500, color:'var(--ins-text-heading-soft)', marginBottom:'4px', letterSpacing:'-.01em'}}>
                Can't find your tool?
              </h3>
              <p className="ins-text-body">
                Tell us what you use and we'll prioritize the connector.
              </p>
            </div>
            <button
              onClick={handleRequestConnector}
              style={{
                display:'inline-flex', alignItems:'center', gap:'8px',
                padding:'10px 18px', borderRadius:'8px',
                border:'none', background:'var(--ins-button-primary-bg)', color:'var(--ins-text-body)',
                fontSize:'13px', fontWeight:600, fontFamily:'Geist,sans-serif',
                cursor:'pointer', transition:'background .15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--ins-button-primary-bg-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--ins-button-primary-bg)'; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Request a connector
            </button>
          </div>
        </div>
      </div>
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
