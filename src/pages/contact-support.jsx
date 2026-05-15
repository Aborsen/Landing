import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* ── SUPPORT HERO ── */
function SupportHero({ search, setSearch }) {
  return (
    <section style={{ padding:'120px 0 60px', textAlign:'center', position:'relative', zIndex:1 }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'0 24px' }}><div style={{ maxWidth:'720px', margin:'0 auto' }}>
        <div className="fu0" style={{
          display:'inline-flex', alignItems:'center', gap:'8px',
          padding:'6px 14px', borderRadius:'999px',
          border:'1px solid rgba(255,255,255,.06)',
          background:'rgba(255,255,255,.02)',
          fontSize:'12px', color:'#22C55E', fontWeight:500,
          marginBottom:'24px',
        }}>
          <div style={{
            width:'7px', height:'7px', borderRadius:'50%',
            background:'#22C55E',
            boxShadow:'0 0 6px #22C55E',
            animation:'statusPulse 2s ease infinite',
            flexShrink:0,
          }} />
          <span style={{ fontFamily:'Geist Mono, monospace' }}>All systems operational</span>
          <span style={{ color:'#7FA0AC', fontWeight:400 }}>· Last checked: 2 minutes ago</span>
        </div>

        <h1 className="fu1" style={{
          fontSize:'clamp(32px,5vw,52px)', fontWeight:700,
          lineHeight:1.1, letterSpacing:'-0.03em',
          marginBottom:'16px',
        }}>
          How can we help?
        </h1>

        <p className="fu2" style={{
          fontSize:'17px', color:'#7FA0AC', lineHeight:1.6,
          maxWidth:'520px', margin:'0 auto 32px',
        }}>
          Search our help resources or reach out to the support team directly.
        </p>

        <div className="fu3" style={{
          display:'flex', alignItems:'center',
          background:'rgba(255,255,255,.025)', border:'1px solid rgba(255,255,255,.06)',
          borderRadius:'12px', padding:'4px', maxWidth:'580px', margin:'0 auto',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8AA6B3" strokeWidth="2" style={{marginLeft:'14px',flexShrink:0}}>
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            placeholder="Search help topics..."
            onChange={e => setSearch(e.target.value)}
            value={search}
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              padding:'12px 14px', fontSize:'15px', color:'#E8F2F5', fontFamily:'Geist,sans-serif',
            }}
          />
        </div>
      </div></div>
    </section>
  );
}

/* ── HELP TOPICS ── */
function HelpTopics({ search }) {
  const q = search.toLowerCase().trim();

  const topics = [
    {
      title: 'Account & Billing',
      color: 'rgba(99,102,241,',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      items: ['Reset my password','Change my plan','Update billing information','Cancel my subscription','Request an invoice'],
    },
    {
      title: 'Connecting Data Sources',
      color: 'rgba(20,168,185,',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
      ),
      items: ['My connection failed','Authentication errors','Data not syncing','Supported data sources','Request a new connector'],
    },
    {
      title: 'AI Chat & Answers',
      color: 'rgba(14,196,193,',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      items: ['My answer seems wrong','AI doesn\'t understand my question','Charts not displaying','Export not working','Token usage questions'],
    },
    {
      title: 'Semantic Layer',
      color: 'rgba(168,85,247,',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
          <path d="M2 12l8.58 3.91a2 2 0 0 0 1.66 0L21 12"/>
          <path d="M2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17"/>
        </svg>
      ),
      items: ['Metric definition errors','Cross-source join issues','Certification failed','Formula not calculating','Duplicate metric names'],
    },
    {
      title: 'Reports',
      color: 'rgba(251,146,60,',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="8" y1="13" x2="16" y2="13"/>
          <line x1="8" y1="17" x2="12" y2="17"/>
        </svg>
      ),
      items: ['Schedule a report','Export formats','Share with team','Report not generating','Edit saved reports'],
    },
    {
      title: 'Security & Privacy',
      color: 'rgba(52,211,153,',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      items: ['SSO setup (Enterprise)','Data retention questions','Export my data','Delete my account','Compliance documentation'],
    },
  ];

  const filteredTopics = topics.map(topic => {
    if (!q) return { ...topic, visible: true };
    const titleMatch = topic.title.toLowerCase().includes(q);
    if (titleMatch) return { ...topic, visible: true };
    const matchingItems = topic.items.filter(item => item.toLowerCase().includes(q));
    if (matchingItems.length > 0) return { ...topic, items: matchingItems, visible: true };
    return { ...topic, visible: false };
  });

  return (
    <section style={{ padding:'0 0 80px', position:'relative', zIndex:1 }}>
      <div style={{
        maxWidth:'1280px', margin:'0 auto', padding:'0 24px',
        display:'grid',
        gridTemplateColumns:'repeat(3, 1fr)',
        gap:'20px',
      }}>
        {filteredTopics.map((topic, i) => (
          <div key={i} style={{
            background:'rgba(255,255,255,.02)',
            border: '1px solid rgba(255,255,255,.05)',
            borderRadius:'14px',
            overflow:'hidden',
            opacity: topic.visible ? 1 : 0,
            maxHeight: topic.visible ? '600px' : '0px',
            transition:'opacity .3s ease, max-height .3s ease, border-color .2s ease',
            cursor:'default',
            padding:'20px',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.05)'; }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
              <div style={{
                width:'32px', height:'32px', borderRadius:'10px',
                background:`${topic.color}0.08)`,
                border:`1px solid ${topic.color}0.18)`,
                color:`${topic.color}0.95)`,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                {topic.icon}
              </div>
              <h3 style={{ fontSize:'14px', fontWeight:600, color:'#E8F2F5' }}>{topic.title}</h3>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:'0px' }}>
              {topic.items.map((item, j) => (
                <a key={j} href="#" style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'5px 0',
                  borderBottom: j < topic.items.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
                  fontSize:'13px', color:'#7FA0AC',
                  textDecoration:'none',
                  transition:'color .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0EC4C1'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#7FA0AC'; }}
                >
                  <span>{item}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0, opacity:.5 }}>
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="grid"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          section > div[style*="grid"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── FLOATING CHAT ── */
function FloatingChat({ onSubmit, hidden }) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
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
      opacity: visible && !hidden ? 1 : 0,
      pointerEvents: 'none',
      transform: visible && !hidden ? 'translateY(0)' : 'translateY(12px)',
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7FA0AC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
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
              fontSize:'14px', color:'#E8F2F5',
              fontFamily:'inherit',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              flexShrink:0,
              padding:'8px 20px', borderRadius:'8px',
              background: value.trim() ? '#07807E' : 'rgba(9,160,157,.15)',
              color: value.trim() ? '#fff' : '#4A9EA0',
              border:'none', cursor: value.trim() ? 'pointer' : 'default',
              fontSize:'13px', fontWeight:600,
              fontFamily:'inherit',
              transition:'background .2s, color .2s',
            }}
            onMouseEnter={(e) => { if (value.trim()) e.currentTarget.style.background = '#09A09D'; }}
            onMouseLeave={(e) => { if (value.trim()) e.currentTarget.style.background = '#07807E'; }}
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
  const [phase, setPhase] = useState('searching');
  const [input, setInput] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [messages, setMessages] = useState([{ role:'user', text: query }]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);

  const SAMPLE_RESPONSE = {
    searchTerms: query.toLowerCase().split(' ').filter(w => w.length > 2).slice(0, 3).join(', ') || 'insightis',
    intro: '**Insightis** support is here to help. Based on your question, here is what we found in our knowledge base.',
    bullets: [
      { bold: 'Help Center', text: ' — browse common topics like billing, connections, and AI chat' },
      { bold: 'Email Support', text: ' — reach us at support@insightis.io for detailed assistance' },
      { bold: 'Documentation', text: ' — step-by-step guides for setup, integrations, and features' },
      { bold: 'Community', text: ' — connect with other Insightis users for tips and best practices' },
    ],
    outro: 'If you need more specific help, feel free to ask a follow-up question or contact our support team directly.',
    links: ['Getting Started Guide', 'Troubleshooting Connections', 'AI Chat Best Practices'],
  };

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reading'), 800);
    const t2 = setTimeout(() => {
      setPhase('done');
      setMessages(m => [...m, { role:'assistant', response: SAMPLE_RESPONSE }]);
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
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
    onMouseEnter={e => e.currentTarget.style.color = '#7FA0AC'}
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
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0EC4C1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span style={{ fontSize:'13px', fontWeight:600, color:'#E8F2F5' }}>AI Assistant</span>
        </div>
        <button onClick={onClose} style={{
          background:'none', border:'none', cursor:'pointer', padding:'4px', borderRadius:'4px',
          color:'#5E8290', transition:'color .15s', display:'flex',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#E8F2F5'}
        onMouseLeave={e => e.currentTarget.style.color = '#5E8290'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
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
                      <span style={{ position:'absolute', left:0, color:'#0EC4C1', fontWeight:700 }}>·</span>
                      <strong style={{ color:'#C8E6EA' }}>{b.bold}</strong>{b.text}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize:'13px', color:'#8AAAB8', lineHeight:1.7, marginBottom:'12px' }}>
                  {msg.response.outro}
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:'4px', marginBottom:'12px' }}>
                  {msg.response.links.map((l, i) => (
                    <a key={i} href="#" style={{ fontSize:'12px', color:'#09A09D', textDecoration:'none' }}
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
              {phase === 'searching' ? 'Searching docs...' : 'Reading file...'}
            </div>
            <div style={{ display:'flex', gap:'5px', paddingTop:'4px' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width:'6px', height:'6px', borderRadius:'50%',
                  background:'#0EC4C1',
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
              fontSize:'13px', color:'#E8F2F5', fontFamily:'Geist,sans-serif',
            }}
          />
          <button onClick={handleFollowUp} style={{
            width:'28px', height:'28px', borderRadius:'7px', flexShrink:0,
            background: input.trim() ? '#07807E' : 'rgba(9,160,157,.12)',
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

/* ── SUPPORT STATUS ── */
function SupportStatus() {
  return (
    <div style={{
      background:'rgba(34,197,94,.04)',
      borderTop:'1px solid rgba(34,197,94,.15)',
      borderBottom:'1px solid rgba(34,197,94,.15)',
      padding:'16px 24px',
      position:'relative', zIndex:1,
    }}>
      <div style={{
        maxWidth:'1280px', margin:'0 auto',
        display:'flex', alignItems:'center', justifyContent:'center',
        gap:'12px', flexWrap:'wrap',
      }}>
        <div style={{
          width:'8px', height:'8px', borderRadius:'50%',
          background:'#22C55E',
          boxShadow:'0 0 8px #22C55E',
          animation:'statusPulse 2s ease infinite',
          flexShrink:0,
        }} />
        <span style={{
          fontSize:'13px', color:'#22C55E',
          fontFamily:'Geist Mono, monospace',
        }}>All systems operational</span>
        <span style={{
          fontSize:'11px', color:'#8AA6B3',
        }}>Last checked: 2 minutes ago</span>
      </div>
    </div>
  );
}

/* ── CONTACT SUPPORT ── */
function ContactSupport() {
  const CATEGORIES = [
    {
      id: 'general', label: 'General Question', color: '#0EC4C1',
      subjectPlaceholder: 'e.g. How do I export a report as PDF?',
      descLabel: 'DETAILS', descPlaceholder: 'Any additional context...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    },
    {
      id: 'bug', label: 'Report a Bug', color: '#EF4444',
      subjectPlaceholder: 'e.g. Chart not loading on Reports page',
      descLabel: 'STEPS TO REPRODUCE', descPlaceholder: '1. Go to Reports tab\n2. Click Export\n3. See error',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    },
    {
      id: 'billing', label: 'Billing & Account', color: '#818CF8',
      subjectPlaceholder: 'e.g. I was charged twice this month',
      descLabel: 'DETAILS', descPlaceholder: 'Any additional context...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    },
    {
      id: 'connection', label: 'Data Connections', color: '#14A8B9',
      subjectPlaceholder: 'e.g. My Salesforce connection keeps failing',
      descLabel: 'DETAILS', descPlaceholder: 'Any additional context...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    },
    {
      id: 'feature', label: 'Feature Request', color: '#F97316',
      subjectPlaceholder: "e.g. I'd love to see scheduled email reports",
      descLabel: 'TELL US MORE', descPlaceholder: 'Describe the feature and why it matters to you...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    },
    {
      id: 'other', label: 'Other', color: '#6B7280',
      subjectPlaceholder: 'e.g. Brief description of your request',
      descLabel: 'DETAILS', descPlaceholder: 'Any additional context...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState('form');
  const [form, setForm] = React.useState({ category: 'general', title: '', desc: '', email: '' });
  const [focused, setFocused] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const [dragOver, setDragOver] = React.useState(false);
  const fileRef = React.useRef(null);

  const cat = CATEGORIES.find(c => c.id === form.category);

  const addFiles = (incoming) => {
    const arr = Array.from(incoming).filter(f => f.size < 10 * 1024 * 1024);
    setFiles(prev => {
      const names = new Set(prev.map(f => f.name));
      return [...prev, ...arr.filter(f => !names.has(f.name))].slice(0, 5);
    });
  };
  const removeFile = (name) => setFiles(f => f.filter(x => x.name !== name));
  const fmt = (b) => b < 1024 * 1024 ? `${(b/1024).toFixed(0)} KB` : `${(b/1024/1024).toFixed(1)} MB`;

  const close = () => {
    setOpen(false);
    setTimeout(() => { setStep('form'); setForm({ category: 'general', title: '', desc: '', email: '' }); setFiles([]); }, 300);
  };
  const submit = () => { if (!form.title.trim()) return; setStep('done'); };

  const inputStyle = (field) => ({
    width: '100%', boxSizing: 'border-box',
    background: 'rgba(255,255,255,.04)',
    border: focused === field ? '1px solid rgba(9,160,157,.5)' : '1px solid rgba(255,255,255,.08)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px', color: '#E8F2F5',
    fontFamily: 'inherit', outline: 'none',
    transition: 'border-color .2s',
    resize: 'none',
  });

  return (
    <>
      {/* ── Banner ── */}
      <section style={{ padding: '0 0 32px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
            background: 'rgba(255,255,255,.02)',
            border: '1px solid rgba(255,255,255,.06)',
            borderRadius: '12px',
            padding: '16px 20px',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                background: 'rgba(14,196,193,0.08)', border: '1px solid rgba(14,196,193,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#0EC4C1',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#E8F2F5', marginBottom: '2px' }}>Still need help?</div>
                <div style={{ fontSize: '13px', color: '#7FA0AC' }}>Our support team is here — reach out and we'll respond within 24 hours.</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              style={{
                padding: '9px 18px', borderRadius: '9px', flexShrink: 0,
                background: 'rgba(14,196,193,0.08)', border: '1px solid rgba(14,196,193,0.2)',
                color: '#0EC4C1', fontSize: '13px', fontWeight: 600,
                fontFamily: 'inherit', cursor: 'pointer',
                transition: 'background .18s, border-color .18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(14,196,193,0.14)'; e.currentTarget.style.borderColor = 'rgba(14,196,193,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(14,196,193,0.08)'; e.currentTarget.style.borderColor = 'rgba(14,196,193,0.2)'; }}
            >Contact Support →</button>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(5,8,12,0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            overflowY: 'auto',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0D1117',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: '18px',
              width: '100%', maxWidth: '520px',
              padding: '32px',
              animation: 'fadeUp .22s ease',
              position: 'relative',
              margin: 'auto',
            }}
          >
            {/* Close */}
            <button
              onClick={close}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#4A7A8A', padding: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '6px',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#E8F2F5'}
              onMouseLeave={e => e.currentTarget.style.color = '#4A7A8A'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            {step === 'form' ? (
              <>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(14,196,193,0.1)', border: '1px solid rgba(14,196,193,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0EC4C1',
                  }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#E8F2F5' }}>Contact Support</div>
                    <div style={{ fontSize: '13px', color: '#7FA0AC', marginTop: '2px' }}>We'll get back to you as soon as possible.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  {/* Category pills */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#9BBAC5', letterSpacing: '.04em', display: 'block', marginBottom: '8px' }}>CATEGORY</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {CATEGORIES.map(c => {
                        const active = form.category === c.id;
                        return (
                          <button
                            key={c.id}
                            onClick={() => setForm(f => ({ ...f, category: c.id, title: '', desc: '' }))}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '5px',
                              padding: '5px 12px', borderRadius: '999px',
                              background: active ? `rgba(${c.id === 'bug' ? '239,68,68' : c.id === 'billing' ? '129,140,248' : c.id === 'connection' ? '20,168,185' : c.id === 'feature' ? '249,115,22' : c.id === 'other' ? '107,114,128' : '14,196,193'},0.12)` : 'rgba(255,255,255,.04)',
                              border: active ? `1px solid ${c.color}44` : '1px solid rgba(255,255,255,.07)',
                              color: active ? c.color : '#7FA0AC',
                              fontSize: '12px', fontWeight: active ? 600 : 400,
                              fontFamily: 'inherit', cursor: 'pointer',
                              transition: 'all .15s',
                            }}
                            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(255,255,255,.14)'; e.currentTarget.style.color = '#C8E6EA'; } }}
                            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.color = '#7FA0AC'; } }}
                          >
                            <span style={{ lineHeight: 0 }}>{c.icon}</span>
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#9BBAC5', letterSpacing: '.04em', display: 'block', marginBottom: '6px' }}>SUBJECT *</label>
                    <input
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      onFocus={() => setFocused('title')}
                      onBlur={() => setFocused(null)}
                      placeholder={cat.subjectPlaceholder}
                      style={inputStyle('title')}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#9BBAC5', letterSpacing: '.04em', display: 'block', marginBottom: '6px' }}>{cat.descLabel}</label>
                    <textarea
                      rows={3}
                      value={form.desc}
                      onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                      onFocus={() => setFocused('desc')}
                      onBlur={() => setFocused(null)}
                      placeholder={cat.descPlaceholder}
                      style={{ ...inputStyle('desc') }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#9BBAC5', letterSpacing: '.04em', display: 'block', marginBottom: '6px' }}>YOUR EMAIL <span style={{ color: '#4A7A8A', fontWeight: 400 }}>(optional, for follow-up)</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="you@company.com"
                      style={inputStyle('email')}
                    />
                  </div>

                  {/* Attachments */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#9BBAC5', letterSpacing: '.04em', display: 'block', marginBottom: '6px' }}>ATTACHMENTS <span style={{ color: '#4A7A8A', fontWeight: 400 }}>(up to 5 files, 10 MB each)</span></label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                      style={{
                        border: dragOver ? '1px dashed rgba(9,160,157,.6)' : '1px dashed rgba(255,255,255,.12)',
                        borderRadius: '10px', padding: '16px',
                        background: dragOver ? 'rgba(9,160,157,.06)' : 'rgba(255,255,255,.02)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                        cursor: 'pointer', transition: 'border-color .18s, background .18s',
                      }}
                      onMouseEnter={e => { if (!dragOver) e.currentTarget.style.borderColor = 'rgba(255,255,255,.22)'; }}
                      onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; }}
                    >
                      <input ref={fileRef} type="file" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A7A8A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                      </svg>
                      <span style={{ fontSize: '13px', color: '#4A7A8A' }}>
                        {dragOver ? 'Drop files here' : 'Click or drag files to attach'}
                      </span>
                    </div>
                    {files.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                        {files.map(f => (
                          <div key={f.name} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
                            background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)',
                            borderRadius: '8px', padding: '7px 10px',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4A7A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
                              </svg>
                              <span style={{ fontSize: '13px', color: '#9BBAC5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                              <span style={{ fontSize: '11px', color: '#4A7A8A', flexShrink: 0 }}>{fmt(f.size)}</span>
                            </div>
                            <button
                              onClick={() => removeFile(f.name)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4A7A8A', padding: '2px', display: 'flex', flexShrink: 0 }}
                              onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                              onMouseLeave={e => e.currentTarget.style.color = '#4A7A8A'}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                  <button
                    onClick={close}
                    style={{
                      flex: 1, padding: '11px', borderRadius: '9px',
                      background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)',
                      color: '#7FA0AC', fontSize: '14px', fontWeight: 500,
                      fontFamily: 'inherit', cursor: 'pointer',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
                  >Cancel</button>
                  <button
                    onClick={submit}
                    style={{
                      flex: 2, padding: '11px', borderRadius: '9px',
                      background: form.title.trim() ? '#07807E' : 'rgba(9,160,157,.18)',
                      border: 'none',
                      color: form.title.trim() ? '#fff' : 'rgba(14,196,193,0.4)',
                      fontSize: '14px', fontWeight: 600,
                      fontFamily: 'inherit', cursor: form.title.trim() ? 'pointer' : 'default',
                      transition: 'background .18s, color .18s',
                    }}
                    onMouseEnter={e => { if (form.title.trim()) e.currentTarget.style.background = '#09A09D'; }}
                    onMouseLeave={e => { if (form.title.trim()) e.currentTarget.style.background = '#07807E'; }}
                  >Submit Request</button>
                </div>
              </>
            ) : (
              /* Success */
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'rgba(14,196,193,0.1)', border: '1px solid rgba(14,196,193,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', color: '#0EC4C1',
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div style={{ fontSize: '17px', fontWeight: 700, color: '#E8F2F5', marginBottom: '8px' }}>Request submitted</div>
                <div style={{ fontSize: '14px', color: '#7FA0AC', lineHeight: 1.6, marginBottom: '28px' }}>
                  Thanks for reaching out. Our team will review your request and follow up shortly.
                </div>
                <button
                  onClick={close}
                  style={{
                    padding: '10px 28px', borderRadius: '9px',
                    background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
                    color: '#E8F2F5', fontSize: '14px', fontWeight: 500,
                    fontFamily: 'inherit', cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.06)'}
                >Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ── APP ── */
function App() {
  const [search, setSearch] = useState('');
  const [assistantQuery, setAssistantQuery] = useState(null);

  return (
    <div>
      <Header />
      <main>
      <SupportHero search={search} setSearch={setSearch} />
      <HelpTopics search={search} />
      <ContactSupport />
            </main>
      <Footer />
      <FloatingChat onSubmit={(q) => setAssistantQuery(q)} hidden={!!assistantQuery} />
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
