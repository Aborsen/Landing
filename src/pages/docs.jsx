import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { marked } from 'marked';
import '../app.css';

import aiChatMd from '../../docs/content/ai-chat.md?raw';
import metricsMd from '../../docs/content/metrics.md?raw';
import dataConnectorsMd from '../../docs/content/data-connectors.md?raw';
import copyrightsMd from '../../docs/content/copyrights.md?raw';
import dataStorageMd from '../../docs/content/data-storage.md?raw';
import welcomeMd from '../../docs/content/welcome.md?raw';
import createAccountMd from '../../docs/content/create-an-account.md?raw';
import plansCreditsMd from '../../docs/content/plans-and-credits.md?raw';
import promptingBestPracticesMd from '../../docs/content/prompting-best-practices.md?raw';
import quickStartMd from '../../docs/content/quick-start.md?raw';
import aiModelMd from '../../docs/content/ai-model.md?raw';
import managingAccountMd from '../../docs/content/managing-your-account.md?raw';
import securityMd from '../../docs/content/security.md?raw';
import paymentsBillingMd from '../../docs/content/payments-billing.md?raw';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

function slugifyHeading(s) {
  return s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  m[1].split(/\r?\n/).forEach(line => {
    const eq = line.indexOf(':');
    if (eq > 0) {
      const k = line.slice(0, eq).trim();
      meta[k] = line.slice(eq + 1).trim();
    }
  });
  return { meta, body: m[2] };
}

function mdToPage(raw) {
  const { meta, body } = parseFrontmatter(raw);
  const parts = body.split(/^## /m).map(p => p).filter(p => p.trim().length);
  const sections = parts.map(part => {
    const nl = part.indexOf('\n');
    const heading = (nl > -1 ? part.slice(0, nl) : part).trim();
    const rest = nl > -1 ? part.slice(nl + 1) : '';
    return {
      id: slugifyHeading(heading),
      heading,
      html: marked.parse(rest),
      markdown: rest.trim(),
    };
  });
  return {
    breadcrumb: (meta.breadcrumb || '').split('/').map(s => s.trim()).filter(Boolean),
    title: meta.title || '',
    description: meta.description || '',
    toc: sections.map(s => ({ id: s.id, label: s.heading })),
    sections,
  };
}


/* ── DATA ── */
const DOC_TABS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'features', label: 'Features' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'tips', label: 'Tips & Tricks' },
  { id: 'changelog', label: 'Changelog' },
];

const SIDEBAR_NAV = [
  {
    section: 'Getting started',
    items: [
      { id: 'welcome', label: 'Welcome to Insightis' },
      { id: 'create-an-account', label: 'Create an account' },
      { id: 'plans-and-credits', label: 'Plans and credits' },
      { id: 'prompting-best-practices', label: 'Prompting best practices' },
      { id: 'quick-start', label: 'Quick start' },
    ],
  },
  {
    section: 'Insightis Workspace',
    items: [
      { id: 'ai-chat-overview', label: 'AI Chat' },
      { id: 'data-connectors', label: 'Data Connectors' },
      { id: 'metrics', label: 'Metrics' },
    ],
  },
  {
    section: 'Reference',
    items: [
      { id: 'ai-model', label: 'AI Model' },
      { id: 'copyrights', label: 'Copyrights' },
      { id: 'data-storage', label: 'Data Storage' },
    ],
  },
  {
    section: 'Account',
    items: [
      { id: 'managing-your-account', label: 'Managing Your Account' },
      { id: 'security', label: 'Security' },
      { id: 'payments-billing', label: 'Payments & Billing' },
    ],
  },
];

const PAGES = {
  'welcome':                  mdToPage(welcomeMd),
  'create-an-account':        mdToPage(createAccountMd),
  'plans-and-credits':        mdToPage(plansCreditsMd),
  'prompting-best-practices': mdToPage(promptingBestPracticesMd),
  'quick-start':              mdToPage(quickStartMd),
  'ai-chat-overview':         mdToPage(aiChatMd),
  'data-connectors':          mdToPage(dataConnectorsMd),
  'metrics':                  mdToPage(metricsMd),
  'ai-model':                 mdToPage(aiModelMd),
  'copyrights':               mdToPage(copyrightsMd),
  'data-storage':             mdToPage(dataStorageMd),
  'managing-your-account':    mdToPage(managingAccountMd),
  'security':                 mdToPage(securityMd),
  'payments-billing':         mdToPage(paymentsBillingMd),
};

/* ── DOCS TABS ── */
function DocsTabs({ activeTab, setActiveTab }) {
  return (
    <div className="docs-tabs-bar">
      <div style={{ maxWidth:'1440px', margin:'0 auto', overflowX:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', padding:'0 24px', gap:'0' }}>
          {DOC_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding:'12px 18px',
                fontSize:'13.5px',
                fontWeight: activeTab === tab.id ? 500 : 400,
                color: activeTab === tab.id ? 'var(--ins-color-gray-100)' : 'var(--ins-text-inactive)',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--ins-color-teal-700)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
                whiteSpace: 'nowrap',
                fontFamily: 'Geist,sans-serif',
                marginBottom: '-1px',
              }}
              onMouseEnter={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--ins-color-gray-100)'; }}
              onMouseLeave={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--ins-text-inactive)'; }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ── DOCS SIDEBAR ── */
function DocsSidebar({ activePage, setActivePage, expandedSections, setExpandedSections, sidebarSearch, setSidebarSearch }) {
  const q = sidebarSearch.toLowerCase().trim();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredNav = SIDEBAR_NAV.map(group => ({
    ...group,
    items: q ? group.items.filter(item => item.label.toLowerCase().includes(q)) : group.items,
  })).filter(group => !q || group.items.length > 0);

  return (
    <div className="docs-sidebar-col">
      {/* Search */}
      <div style={{ padding:'0 16px 20px' }}>
        <div style={{
          display:'flex', alignItems:'center', gap:'8px',
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:'8px',
          padding:'7px 10px',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5E8290" strokeWidth="2" style={{flexShrink:0}}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            placeholder="Search..."
            value={sidebarSearch}
            onChange={(e) => setSidebarSearch(e.target.value)}
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              fontSize:'13px', color:'var(--ins-color-gray-100)', fontFamily:'Geist,sans-serif',
            }}
          />
        </div>
      </div>

      {/* Nav sections */}
      {filteredNav.map((group) => (
        <div key={group.section} style={{ marginBottom:'4px' }}>
          <button
            onClick={() => toggleSection(group.section)}
            style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              width:'100%', padding:'6px 16px',
              background:'transparent', border:'none', cursor:'pointer',
              color:'#5E8290', fontSize:'11px', fontWeight:600,
              textTransform:'uppercase', letterSpacing:'0.08em',
              fontFamily:'Geist,sans-serif',
            }}
          >
            {group.section}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition:'transform 0.15s', transform: (expandedSections[group.section] || q) ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink:0 }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {(expandedSections[group.section] || q) && (
            <div style={{ padding:'2px 0 8px' }}>
              {group.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  style={{
                    display:'block', width:'100%', textAlign:'left',
                    padding:'6px 16px 6px 20px',
                    background: activePage === item.id ? 'rgba(10,152,150,0.08)' : 'transparent',
                    border:'none',
                    borderLeft: activePage === item.id ? '2px solid var(--ins-color-teal-700)' : '2px solid transparent',
                    color: activePage === item.id ? 'var(--ins-color-gray-100)' : 'var(--ins-text-inactive)',
                    fontSize:'13px', cursor:'pointer',
                    transition:'all 0.15s',
                    fontFamily:'Geist,sans-serif',
                    lineHeight: 1.5,
                  }}
                  onMouseEnter={(e) => { if (activePage !== item.id) { e.currentTarget.style.color = 'var(--ins-color-gray-100)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}}
                  onMouseLeave={(e) => { if (activePage !== item.id) { e.currentTarget.style.color = 'var(--ins-text-inactive)'; e.currentTarget.style.background = 'transparent'; }}}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


/* ── DOCS TOC ── */
function DocsTOC({ toc, activeSection, setActiveSection }) {
  if (!toc || !toc.length) return <div className="docs-toc-col" />;
  return (
    <div className="docs-toc-col">
      <p style={{
        fontSize:'11px', fontWeight:600, color:'#5E8290',
        textTransform:'uppercase', letterSpacing:'0.08em',
        marginBottom:'14px',
      }}>
        On this page
      </p>
      <div style={{ display:'flex', flexDirection:'column', gap:'1px' }}>
        {toc.map(item => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveSection(item.id);
              const el = document.getElementById(item.id);
              if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
            }}
            style={{
              display:'block',
              padding:'5px 0 5px 12px',
              fontSize:'13px',
              color: activeSection === item.id ? 'var(--ins-text-highlight)' : '#5E8290',
              borderLeft: activeSection === item.id ? '2px solid var(--ins-color-teal-700)' : '2px solid transparent',
              textDecoration:'none',
              transition:'color 0.15s, border-color 0.15s',
              lineHeight:1.5,
            }}
            onMouseEnter={(e) => { if (activeSection !== item.id) e.currentTarget.style.color = 'var(--ins-text-inactive)'; }}
            onMouseLeave={(e) => { if (activeSection !== item.id) e.currentTarget.style.color = '#5E8290'; }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}


/* ── DOCS ASK QUESTION ── */
function DocsAskQuestion() {
  const [question, setQuestion] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = '../Platform/AI Chat';
  };
  return (
    <div style={{
      padding:'24px',
      background:'rgba(255,255,255,0.025)',
      border:'1px solid rgba(255,255,255,0.07)',
      borderRadius:'12px',
    }}>
      <p style={{ fontSize:'13px', color:'#5E8290', marginBottom:'12px', fontWeight:500 }}>
        Didn't find what you were looking for?
      </p>
      <form onSubmit={handleSubmit} style={{
        display:'flex', alignItems:'center', gap:'8px',
        background:'rgba(255,255,255,0.04)',
        border:'1px solid rgba(255,255,255,0.08)',
        borderRadius:'10px',
        padding:'4px 4px 4px 14px',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-inactive)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        <input
          placeholder="Ask a question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            flex:1, background:'transparent', border:'none', outline:'none',
            fontSize:'14px', color:'var(--ins-color-gray-100)', fontFamily:'Geist,sans-serif',
            padding:'9px 4px',
          }}
        />
        <Button type="submit" variant="primary" size="sm" radius="lg" className="flex-shrink-0">
          Ask AI
        </Button>
      </form>
    </div>
  );
}


/* ── PAGE FEEDBACK ── */
function PageFeedback() {
  const [vote, setVote] = React.useState(null); // null | 'up' | 'down'
  const [showForm, setShowForm] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [text, setText] = React.useState('');
  const [focused, setFocused] = React.useState(false);

  const handleVote = (v) => {
    setVote(v);
    setShowForm(true);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setShowForm(false);
  };

  const handleSkip = () => {
    setShowForm(false);
  };

  const prompts = {
    up: { label: 'What did you like?', placeholder: 'Tell us what was helpful…' },
    down: { label: 'What can we improve?', placeholder: 'Tell us what was missing or unclear…' },
  };

  return (
    <div style={{
      marginTop:'48px', marginBottom:'8px',
      paddingTop:'32px',
      borderTop:'1px solid rgba(255,255,255,0.055)',
    }}>
      {submitted ? (
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span style={{ fontSize:'13px', color:'#5E8290' }}>Thanks for your feedback!</span>
        </div>
      ) : (
        <>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ fontSize:'13px', color:'#5E8290' }}>Was this page helpful?</span>
            <div style={{ display:'flex', gap:'6px' }}>
              <button
                onClick={() => handleVote('up')}
                style={{
                  display:'flex', alignItems:'center', gap:'5px',
                  padding:'5px 12px', borderRadius:'6px',
                  background: vote === 'up' ? 'rgba(14,196,193,0.15)' : 'rgba(255,255,255,0.04)',
                  border: vote === 'up' ? '1px solid rgba(14,196,193,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  color: vote === 'up' ? 'var(--ins-text-highlight)' : '#5E8290',
                  cursor:'pointer', fontSize:'12px', fontFamily:'Geist,sans-serif',
                  transition:'all .15s',
                }}
                onMouseEnter={e => { if (vote !== 'up') { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.color='var(--ins-text-inactive)'; }}}
                onMouseLeave={e => { if (vote !== 'up') { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='#5E8290'; }}}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
                  <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                </svg>
                Yes
              </button>
              <button
                onClick={() => handleVote('down')}
                style={{
                  display:'flex', alignItems:'center', gap:'5px',
                  padding:'5px 12px', borderRadius:'6px',
                  background: vote === 'down' ? 'rgba(220,80,80,0.12)' : 'rgba(255,255,255,0.04)',
                  border: vote === 'down' ? '1px solid rgba(220,80,80,0.35)' : '1px solid rgba(255,255,255,0.08)',
                  color: vote === 'down' ? '#E07070' : '#5E8290',
                  cursor:'pointer', fontSize:'12px', fontFamily:'Geist,sans-serif',
                  transition:'all .15s',
                }}
                onMouseEnter={e => { if (vote !== 'down') { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.color='var(--ins-text-inactive)'; }}}
                onMouseLeave={e => { if (vote !== 'down') { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='#5E8290'; }}}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z"/>
                  <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                </svg>
                No
              </button>
            </div>
          </div>

          {showForm && vote && (
            <div style={{
              marginTop:'16px',
              padding:'18px 20px',
              background:'rgba(255,255,255,0.03)',
              border:'1px solid rgba(255,255,255,0.07)',
              borderRadius:'10px',
              animation:'fadeUp .2s ease',
            }}>
              <form onSubmit={handleSubmit}>
                <label style={{ display:'block', fontSize:'13px', color:'var(--ins-text-inactive)', fontWeight:500, marginBottom:'10px' }}>
                  {prompts[vote].label}
                </label>
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder={prompts[vote].placeholder}
                  rows={3}
                  style={{
                    width:'100%', resize:'vertical',
                    background:'rgba(255,255,255,0.04)',
                    border: focused ? '1px solid rgba(9,160,157,.4)' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius:'8px', padding:'10px 12px',
                    fontSize:'13px', color:'var(--ins-color-gray-100)', lineHeight:1.6,
                    fontFamily:'Geist,sans-serif',
                    outline:'none', transition:'border-color .2s',
                    boxSizing:'border-box',
                  }}
                />
                <div style={{ display:'flex', gap:'8px', marginTop:'10px', justifyContent:'flex-end' }}>
                  <button type="button" onClick={handleSkip} style={{
                    padding:'6px 14px', borderRadius:'6px',
                    background:'transparent', border:'1px solid rgba(255,255,255,0.08)',
                    color:'#5E8290', fontSize:'12px', cursor:'pointer',
                    fontFamily:'Geist,sans-serif', transition:'color .15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--ins-text-inactive)'}
                  onMouseLeave={e => e.currentTarget.style.color='#5E8290'}
                  >
                    Skip
                  </button>
                  <Button type="submit" variant="primary" size="sm" radius="md">
                    Send feedback
                  </Button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ── DOCS CONTENT ── */
function CopyPageButton({ page }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    // Rebuild the full page as Markdown from the structured data.
    const parts = [];
    if (page.breadcrumb && page.breadcrumb.length) parts.push(`> ${page.breadcrumb.join(' › ')}`);
    if (page.title) parts.push(`# ${page.title}`);
    if (page.description) parts.push(page.description);
    for (const s of page.sections || []) {
      parts.push(`## ${s.heading}`);
      if (s.markdown) parts.push(s.markdown);
      else if (s.content) parts.push(s.content);
    }
    const text = parts.join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      title="Copy link to this page"
      style={{
        display:'inline-flex', alignItems:'center', gap:'5px',
        padding:'5px 10px', borderRadius:'6px',
        background: copied ? 'rgba(9,160,157,.15)' : 'rgba(255,255,255,.05)',
        border: copied ? '1px solid rgba(9,160,157,.35)' : '1px solid rgba(255,255,255,.08)',
        color: copied ? 'var(--ins-text-highlight)' : '#5E8290',
        fontSize:'12px', fontWeight:500, cursor:'pointer',
        fontFamily:'inherit', flexShrink:0,
        transition:'all .15s',
      }}
      onMouseEnter={(e) => { if (!copied) { e.currentTarget.style.background='rgba(255,255,255,.08)'; e.currentTarget.style.color='var(--ins-text-inactive)'; }}}
      onMouseLeave={(e) => { if (!copied) { e.currentTarget.style.background='rgba(255,255,255,.05)'; e.currentTarget.style.color='#5E8290'; }}}
    >
      {copied ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      )}
      {copied ? 'Copied!' : 'Copy page'}
    </button>
  );
}

function DocsContent({ page, activePage, setActivePage, activeSection, setActiveSection }) {
  useEffect(() => {
    const headings = document.querySelectorAll('.doc-section-heading');
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); },
      { rootMargin: '-120px 0px -60% 0px' }
    );
    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, [activePage]);

  if (!page) return <div className="docs-content-col" />;

  return (
    <div className="docs-content-col">
      {/* Breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'28px', flexWrap:'wrap' }}>
        {page.breadcrumb.map((crumb, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color:'#3A5260', fontSize:'13px' }}>/</span>}
            <span style={{ fontSize:'13px', color: i === page.breadcrumb.length - 1 ? 'var(--ins-text-inactive)' : '#5E8290' }}>{crumb}</span>
          </React.Fragment>
        ))}
      </div>

      {/* Title */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
        <h1 style={{
          fontSize:'32px', fontWeight:700, letterSpacing:'-0.02em',
          color:'var(--ins-color-gray-100)', lineHeight:1.2, margin:0,
        }}>
          {page.title}
        </h1>
        <CopyPageButton page={page} />
      </div>

      {/* Description */}
      <p style={{
        fontSize:'16px', color:'var(--ins-text-inactive)', lineHeight:1.75,
        marginBottom:'36px',
      }}>
        {page.description}
      </p>

      {/* Video placeholder */}
      {page.videoTitle && (
        <div style={{
          position:'relative', borderRadius:'14px', overflow:'hidden',
          border:'1px solid rgba(255,255,255,0.08)',
          background:'var(--ins-surface-page)',
          backgroundImage:'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80")',
          backgroundSize:'cover', backgroundPosition:'center',
          marginBottom:'52px', aspectRatio:'16/9',
          display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'16px',
        }}>
          {/* Dark overlay */}
          <div style={{ position:'absolute', inset:0, background:'rgba(5,10,16,0.55)' }}/>
          <div style={{
            position:'absolute', top:0, left:0, right:0, zIndex:1,
            display:'flex', alignItems:'center', gap:'12px',
            padding:'14px 18px',
            background:'rgba(0,0,0,0.5)', backdropFilter:'blur(8px)',
          }}>
            <div style={{
              width:'32px', height:'32px', borderRadius:'8px',
              background:'linear-gradient(135deg,var(--ins-text-highlight),var(--ins-color-teal-700))',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
              </svg>
            </div>
            <span style={{ fontSize:'13px', fontWeight:500, color:'var(--ins-color-gray-100)' }}>{page.videoTitle}</span>
          </div>
          <div style={{
            width:'64px', height:'64px', borderRadius:'50%', position:'relative', zIndex:1,
            background:'rgba(255,255,255,0.15)',
            border:'1px solid rgba(255,255,255,0.3)',
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
            backdropFilter:'blur(4px)',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{marginLeft:'3px'}}>
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
          <span style={{ fontSize:'13px', color:'rgba(255,255,255,0.7)', position:'relative', zIndex:1 }}>Watch on YouTube</span>
        </div>
      )}

      {/* Content sections */}
      <div>
        {page.sections.map((section) => (
          <div key={section.id} style={{ marginBottom:'40px' }}>
            <h2
              id={section.id}
              className="doc-section-heading"
              style={{
                fontSize:'21px', fontWeight:600, color:'var(--ins-color-gray-100)',
                letterSpacing:'-0.01em', marginBottom:'12px',
                scrollMarginTop:'140px',
              }}
            >
              {section.heading}
            </h2>
            {section.html ? (
              <div
                className="doc-section-body"
                dangerouslySetInnerHTML={{ __html: section.html }}
              />
            ) : (
              <p style={{ fontSize:'15px', color:'var(--ins-text-inactive)', lineHeight:1.8 }}>
                {section.content}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Page Feedback */}
      <PageFeedback key={activePage} />

      {/* Prev / Next */}
      {page.prevNext && (
        <div style={{
          display:'flex', gap:'12px', marginTop:'48px',
          borderTop:'1px solid rgba(255,255,255,0.055)',
          paddingTop:'32px', marginBottom:'36px',
        }}>
          {page.prevNext.prev && (
            <button
              onClick={() => setActivePage(page.prevNext.prev.id)}
              style={{
                flex:1, display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'4px',
                padding:'16px 20px', borderRadius:'10px',
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.07)',
                cursor:'pointer', transition:'border-color 0.15s', fontFamily:'Geist,sans-serif',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(10,152,150,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <span style={{ fontSize:'11px', color:'#5E8290', fontWeight:500 }}>← Previous</span>
              <span style={{ fontSize:'13px', color:'var(--ins-color-gray-100)', fontWeight:500 }}>{page.prevNext.prev.label}</span>
              <span style={{ fontSize:'11px', color:'#5E8290' }}>{page.prevNext.prev.section}</span>
            </button>
          )}
          {page.prevNext.next && (
            <button
              onClick={() => setActivePage(page.prevNext.next.id)}
              style={{
                flex:1, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'4px',
                padding:'16px 20px', borderRadius:'10px',
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.07)',
                cursor:'pointer', transition:'border-color 0.15s', fontFamily:'Geist,sans-serif',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(10,152,150,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <span style={{ fontSize:'11px', color:'#5E8290', fontWeight:500 }}>Next →</span>
              <span style={{ fontSize:'13px', color:'var(--ins-color-gray-100)', fontWeight:500 }}>{page.prevNext.next.label}</span>
              <span style={{ fontSize:'11px', color:'#5E8290' }}>{page.prevNext.next.section}</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
}


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
      <div style={{
        maxWidth:'760px', margin:'0 auto',
        pointerEvents:'all',
        padding:'16px 24px 20px',
      }}>
        <div style={{
          display:'flex', alignItems:'center', gap:'10px',
          background:'rgba(16,22,30,0.96)',
          border: focused ? '1px solid rgba(9,160,157,.5)' : '1px solid rgba(255,255,255,.09)',
          borderRadius:'14px',
          padding:'10px 10px 10px 16px',
          transition:'border-color .2s',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-inactive)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
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
              fontSize:'14px', color:'var(--ins-color-gray-100)',
              fontFamily:'inherit',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              flexShrink:0,
              padding:'8px 20px', borderRadius:'8px',
              background: value.trim() ? 'var(--ins-button-primary-bg)' : 'rgba(9,160,157,.15)',
              color: value.trim() ? '#fff' : '#4A9EA0',
              border:'none', cursor: value.trim() ? 'pointer' : 'default',
              fontSize:'13px', fontWeight:600,
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
    onMouseEnter={e => e.currentTarget.style.color = 'var(--ins-text-inactive)'}
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

function App() {
  const [activeTab, setActiveTab] = useState('introduction');
  const [activePage, setActivePage] = useState('welcome');
  const [expandedSections, setExpandedSections] = useState({ 'Getting started': true });
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [assistantQuery, setAssistantQuery] = useState(null);

  const currentPage = PAGES[activePage] || PAGES['welcome'];

  useEffect(() => {
    setActiveSection('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.querySelector('.docs-sidebar-col input');
        if (input) input.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div>
      <Header />
      <main>
      <div style={{ maxWidth:'1240px', width:'calc(100% - 32px)', margin:'0 auto' }}>
      <div className="docs-layout">
        <DocsSidebar
          activePage={activePage}
          setActivePage={(id) => { setActivePage(id); setSidebarSearch(''); }}
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
          sidebarSearch={sidebarSearch}
          setSidebarSearch={setSidebarSearch}
        />
        <DocsContent
          page={currentPage}
          activePage={activePage}
          setActivePage={setActivePage}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <DocsTOC
          toc={currentPage.toc || []}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>
      </div>
            </main>
      <Footer />
      <FloatingChat onSubmit={(q) => setAssistantQuery(q)} />
      {assistantQuery && (
        <AIAssistantPanel
          query={assistantQuery}
          onClose={() => setAssistantQuery(null)}
        />
      )}
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
