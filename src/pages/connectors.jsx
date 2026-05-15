import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';


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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7FA0AC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
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
              fontSize:'13px', color:'#E8F2F5',
              fontFamily:'inherit',
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              flexShrink:0,
              padding:'6px 14px', borderRadius:'7px',
              background: value.trim() ? '#07807E' : 'rgba(9,160,157,.15)',
              color: value.trim() ? '#fff' : '#4A9EA0',
              border:'none', cursor: value.trim() ? 'pointer' : 'default',
              fontSize:'12px', fontWeight:600,
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
          <span style={{ fontSize:'13px', fontWeight:600, color:'#E8F2F5' }}>Assistant</span>
        </div>
        <div style={{ display:'flex', gap:'2px' }}>
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
              {phase === 'searching' ? 'Searching docs…' : 'Reading file…'}
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

/* ── CONNECTORS DATA ── */
const CATEGORIES = [
  'All',
  'Databases & Warehouses',
  'CRM',
  'Marketing & Ads',
  'Support',
  'Productivity',
  'Finance & E-commerce',
  'HR & People',
  'Product Analytics',
  'Cloud & Storage',
  'Developer Tools',
  'Communication & Email',
  'Security & Identity',
  'Data Pipelines & ETL',
];

// domain = clearbit logo domain; color = fallback bubble color
const CONNECTORS = [
  // Databases & Warehouses (30)
  { name:'Amazon Redshift',   category:'Databases & Warehouses', domain:'aws.amazon.com',       color:'#8C4FFF' },
  { name:'Amazon Athena',     category:'Databases & Warehouses', domain:'aws.amazon.com',       color:'#F58220' },
  { name:'Amazon DynamoDB',   category:'Databases & Warehouses', domain:'aws.amazon.com',       color:'#3B48CC' },
  { name:'Snowflake',         category:'Databases & Warehouses', domain:'snowflake.com',        color:'#29B5E8' },
  { name:'Google BigQuery',   category:'Databases & Warehouses', domain:'cloud.google.com',     color:'#4285F4' },
  { name:'Databricks',        category:'Databases & Warehouses', domain:'databricks.com',       color:'#FF3621' },
  { name:'Azure Synapse',     category:'Databases & Warehouses', domain:'azure.microsoft.com',  color:'#0078D4' },
  { name:'Azure SQL',         category:'Databases & Warehouses', domain:'azure.microsoft.com',  color:'#0078D4' },
  { name:'AlloyDB',           category:'Databases & Warehouses', domain:'cloud.google.com',     color:'#4285F4' },
  { name:'PostgreSQL',        category:'Databases & Warehouses', domain:'postgresql.org',       color:'#336791' },
  { name:'MySQL',             category:'Databases & Warehouses', domain:'mysql.com',            color:'#00758F' },
  { name:'MariaDB',           category:'Databases & Warehouses', domain:'mariadb.org',          color:'#003545' },
  { name:'MongoDB',           category:'Databases & Warehouses', domain:'mongodb.com',          color:'#47A248' },
  { name:'Oracle',            category:'Databases & Warehouses', domain:'oracle.com',           color:'#F80000' },
  { name:'SQL Server',        category:'Databases & Warehouses', domain:'microsoft.com',        color:'#CC2927' },
  { name:'SAP HANA',          category:'Databases & Warehouses', domain:'sap.com',              color:'#008FD3' },
  { name:'IBM Db2',           category:'Databases & Warehouses', domain:'ibm.com',              color:'#054ADA' },
  { name:'Teradata',          category:'Databases & Warehouses', domain:'teradata.com',         color:'#F05D40' },
  { name:'Vertica',           category:'Databases & Warehouses', domain:'vertica.com',          color:'#1A5E9A' },
  { name:'ClickHouse',        category:'Databases & Warehouses', domain:'clickhouse.com',       color:'#FFCC00' },
  { name:'Elasticsearch',     category:'Databases & Warehouses', domain:'elastic.co',           color:'#005571' },
  { name:'Firebolt',          category:'Databases & Warehouses', domain:'firebolt.io',          color:'#FF3C4A' },
  { name:'SingleStore',       category:'Databases & Warehouses', domain:'singlestore.com',      color:'#AA00FF' },
  { name:'CockroachDB',       category:'Databases & Warehouses', domain:'cockroachlabs.com',    color:'#6933FF' },
  { name:'TimescaleDB',       category:'Databases & Warehouses', domain:'timescale.com',        color:'#FDB515' },
  { name:'InfluxDB',          category:'Databases & Warehouses', domain:'influxdata.com',       color:'#22ADF6' },
  { name:'Neo4j',             category:'Databases & Warehouses', domain:'neo4j.com',            color:'#008CC1' },
  { name:'Couchbase',         category:'Databases & Warehouses', domain:'couchbase.com',        color:'#ED2226' },
  { name:'Redis',             category:'Databases & Warehouses', domain:'redis.io',             color:'#DC382D' },
  { name:'Supabase',          category:'Databases & Warehouses', domain:'supabase.com',         color:'#3ECF8E' },

  // CRM (15)
  { name:'Salesforce',        category:'CRM',                    domain:'salesforce.com',       color:'#00A1E0' },
  { name:'HubSpot',           category:'CRM',                    domain:'hubspot.com',          color:'#FF7A59' },
  { name:'Pipedrive',         category:'CRM',                    domain:'pipedrive.com',        color:'#1A1A1A' },
  { name:'Zoho CRM',          category:'CRM',                    domain:'zoho.com',             color:'#E42527' },
  { name:'Microsoft Dynamics',category:'CRM',                    domain:'microsoft.com',        color:'#002050' },
  { name:'Copper',            category:'CRM',                    domain:'copper.com',           color:'#FF6F31' },
  { name:'Close',             category:'CRM',                    domain:'close.com',            color:'#0A6AFF' },
  { name:'Freshsales',        category:'CRM',                    domain:'freshworks.com',       color:'#2F9CEE' },
  { name:'Insightly',         category:'CRM',                    domain:'insightly.com',        color:'#F99F2B' },
  { name:'Nimble',            category:'CRM',                    domain:'nimble.com',           color:'#F16522' },
  { name:'Nutshell',          category:'CRM',                    domain:'nutshell.com',         color:'#C8332D' },
  { name:'Keap',              category:'CRM',                    domain:'keap.com',             color:'#3ECF22' },
  { name:'Sugar CRM',         category:'CRM',                    domain:'sugarcrm.com',         color:'#ED1C24' },
  { name:'Capsule CRM',       category:'CRM',                    domain:'capsulecrm.com',       color:'#1DC3D3' },
  { name:'Creatio',           category:'CRM',                    domain:'creatio.com',          color:'#FF4F27' },

  // Marketing & Ads (22)
  { name:'Google Ads',        category:'Marketing & Ads',        domain:'ads.google.com',       color:'#4285F4' },
  { name:'Google Analytics',  category:'Marketing & Ads',        domain:'analytics.google.com', color:'#F9AB00' },
  { name:'Bing Ads',          category:'Marketing & Ads',        domain:'microsoft.com',        color:'#008373' },
  { name:'LinkedIn Ads',      category:'Marketing & Ads',        domain:'linkedin.com',         color:'#0A66C2' },
  { name:'Facebook Ads',      category:'Marketing & Ads',        domain:'facebook.com',         color:'#1877F2' },
  { name:'TikTok Ads',        category:'Marketing & Ads',        domain:'tiktok.com',           color:'#000000' },
  { name:'Pinterest Ads',     category:'Marketing & Ads',        domain:'pinterest.com',        color:'#E60023' },
  { name:'Snapchat Ads',      category:'Marketing & Ads',        domain:'snapchat.com',         color:'#FFFC00' },
  { name:'Reddit Ads',        category:'Marketing & Ads',        domain:'reddit.com',           color:'#FF4500' },
  { name:'Criteo',            category:'Marketing & Ads',        domain:'criteo.com',           color:'#F8903E' },
  { name:'Taboola',           category:'Marketing & Ads',        domain:'taboola.com',          color:'#0067DB' },
  { name:'Outbrain',          category:'Marketing & Ads',        domain:'outbrain.com',         color:'#F26B24' },
  { name:'Mailchimp',         category:'Marketing & Ads',        domain:'mailchimp.com',        color:'#FFE01B' },
  { name:'SendGrid',          category:'Marketing & Ads',        domain:'sendgrid.com',         color:'#1A82E2' },
  { name:'Klaviyo',           category:'Marketing & Ads',        domain:'klaviyo.com',          color:'#000000' },
  { name:'Marketo',           category:'Marketing & Ads',        domain:'marketo.com',          color:'#5C4C9F' },
  { name:'Pardot',            category:'Marketing & Ads',        domain:'pardot.com',           color:'#00A1E0' },
  { name:'ActiveCampaign',    category:'Marketing & Ads',        domain:'activecampaign.com',   color:'#356AE6' },
  { name:'Braze',             category:'Marketing & Ads',        domain:'braze.com',            color:'#FFA524' },
  { name:'Iterable',          category:'Marketing & Ads',        domain:'iterable.com',         color:'#7F56D9' },
  { name:'Customer.io',       category:'Marketing & Ads',        domain:'customer.io',          color:'#7B40F2' },
  { name:'Omnisend',          category:'Marketing & Ads',        domain:'omnisend.com',         color:'#15BC71' },

  // Support (12)
  { name:'Zendesk',           category:'Support',                domain:'zendesk.com',          color:'#03363D' },
  { name:'Freshdesk',         category:'Support',                domain:'freshworks.com',       color:'#25C16F' },
  { name:'Intercom',          category:'Support',                domain:'intercom.com',         color:'#1F8DED' },
  { name:'Help Scout',        category:'Support',                domain:'helpscout.com',        color:'#1292EE' },
  { name:'Kustomer',          category:'Support',                domain:'kustomer.com',         color:'#FFBF00' },
  { name:'Gorgias',           category:'Support',                domain:'gorgias.com',          color:'#0E1E1A' },
  { name:'Drift',             category:'Support',                domain:'drift.com',            color:'#1D0E5F' },
  { name:'Zoho Desk',         category:'Support',                domain:'zoho.com',             color:'#E42527' },
  { name:'Front',             category:'Support',                domain:'front.com',            color:'#A857F8' },
  { name:'Crisp',             category:'Support',                domain:'crisp.chat',           color:'#1972F5' },
  { name:'Gladly',            category:'Support',                domain:'gladly.com',           color:'#EA5E3F' },
  { name:'ServiceNow',        category:'Support',                domain:'servicenow.com',       color:'#62D84E' },

  // Productivity (18)
  { name:'Slack',             category:'Productivity',           domain:'slack.com',            color:'#4A154B' },
  { name:'Microsoft Teams',   category:'Productivity',           domain:'teams.microsoft.com',  color:'#6264A7' },
  { name:'Asana',             category:'Productivity',           domain:'asana.com',            color:'#F06A6A' },
  { name:'Trello',            category:'Productivity',           domain:'trello.com',           color:'#0079BF' },
  { name:'Jira',              category:'Productivity',           domain:'atlassian.com',        color:'#0052CC' },
  { name:'Confluence',        category:'Productivity',           domain:'atlassian.com',        color:'#172B4D' },
  { name:'Notion',            category:'Productivity',           domain:'notion.so',            color:'#000000' },
  { name:'Airtable',          category:'Productivity',           domain:'airtable.com',         color:'#FCB400' },
  { name:'Monday.com',        category:'Productivity',           domain:'monday.com',           color:'#FF3D57' },
  { name:'ClickUp',           category:'Productivity',           domain:'clickup.com',          color:'#7B68EE' },
  { name:'Smartsheet',        category:'Productivity',           domain:'smartsheet.com',       color:'#0073EC' },
  { name:'Basecamp',          category:'Productivity',           domain:'basecamp.com',         color:'#1D2D35' },
  { name:'Wrike',             category:'Productivity',           domain:'wrike.com',            color:'#08BB67' },
  { name:'Coda',              category:'Productivity',           domain:'coda.io',              color:'#F46A54' },
  { name:'Figma',             category:'Productivity',           domain:'figma.com',            color:'#F24E1E' },
  { name:'Miro',              category:'Productivity',           domain:'miro.com',             color:'#FFD02F' },
  { name:'Lucidchart',        category:'Productivity',           domain:'lucid.co',             color:'#F68D42' },
  { name:'Loom',              category:'Productivity',           domain:'loom.com',             color:'#625DF5' },

  // Finance & E-commerce (25)
  { name:'Stripe',            category:'Finance & E-commerce',   domain:'stripe.com',           color:'#635BFF' },
  { name:'QuickBooks',        category:'Finance & E-commerce',   domain:'quickbooks.intuit.com',color:'#2CA01C' },
  { name:'Xero',              category:'Finance & E-commerce',   domain:'xero.com',             color:'#13B5EA' },
  { name:'NetSuite',          category:'Finance & E-commerce',   domain:'netsuite.com',         color:'#F58220' },
  { name:'Sage',              category:'Finance & E-commerce',   domain:'sage.com',             color:'#00D639' },
  { name:'Square',            category:'Finance & E-commerce',   domain:'squareup.com',         color:'#3E4348' },
  { name:'PayPal',            category:'Finance & E-commerce',   domain:'paypal.com',           color:'#003087' },
  { name:'Adyen',             category:'Finance & E-commerce',   domain:'adyen.com',            color:'#0ABF53' },
  { name:'Braintree',         category:'Finance & E-commerce',   domain:'braintreepayments.com',color:'#000000' },
  { name:'Chargebee',         category:'Finance & E-commerce',   domain:'chargebee.com',        color:'#FF7846' },
  { name:'Recurly',           category:'Finance & E-commerce',   domain:'recurly.com',          color:'#5C068C' },
  { name:'Zuora',             category:'Finance & E-commerce',   domain:'zuora.com',            color:'#DE2332' },
  { name:'Paddle',            category:'Finance & E-commerce',   domain:'paddle.com',           color:'#FFD00E' },
  { name:'Expensify',         category:'Finance & E-commerce',   domain:'expensify.com',        color:'#0185FF' },
  { name:'Bill.com',          category:'Finance & E-commerce',   domain:'bill.com',             color:'#ED2224' },
  { name:'Ramp',              category:'Finance & E-commerce',   domain:'ramp.com',             color:'#FFE900' },
  { name:'Brex',              category:'Finance & E-commerce',   domain:'brex.com',             color:'#FF5500' },
  { name:'Coupa',             category:'Finance & E-commerce',   domain:'coupa.com',            color:'#083166' },
  { name:'Shopify',           category:'Finance & E-commerce',   domain:'shopify.com',          color:'#96BF48' },
  { name:'BigCommerce',       category:'Finance & E-commerce',   domain:'bigcommerce.com',      color:'#34313F' },
  { name:'Magento',           category:'Finance & E-commerce',   domain:'magento.com',          color:'#EE672F' },
  { name:'WooCommerce',       category:'Finance & E-commerce',   domain:'woocommerce.com',      color:'#7F54B3' },
  { name:'Amazon Marketplace',category:'Finance & E-commerce',   domain:'sellercentral.amazon.com', color:'#FF9900' },
  { name:'Wix',               category:'Finance & E-commerce',   domain:'wix.com',              color:'#0C6EFC' },
  { name:'Squarespace',       category:'Finance & E-commerce',   domain:'squarespace.com',      color:'#000000' },

  // HR & People (15)
  { name:'Workday',           category:'HR & People',            domain:'workday.com',          color:'#0875E1' },
  { name:'BambooHR',          category:'HR & People',            domain:'bamboohr.com',         color:'#73C41D' },
  { name:'Gusto',             category:'HR & People',            domain:'gusto.com',            color:'#F45D48' },
  { name:'Rippling',          category:'HR & People',            domain:'rippling.com',         color:'#FECE00' },
  { name:'ADP',               category:'HR & People',            domain:'adp.com',              color:'#D0271D' },
  { name:'Paychex',           category:'HR & People',            domain:'paychex.com',          color:'#004B8D' },
  { name:'Paylocity',         category:'HR & People',            domain:'paylocity.com',        color:'#3078C2' },
  { name:'Justworks',         category:'HR & People',            domain:'justworks.com',        color:'#00A1DF' },
  { name:'TriNet',            category:'HR & People',            domain:'trinet.com',           color:'#E31E38' },
  { name:'UKG',               category:'HR & People',            domain:'ukg.com',              color:'#005EB8' },
  { name:'Ceridian Dayforce', category:'HR & People',            domain:'ceridian.com',         color:'#005EB8' },
  { name:'Greenhouse',        category:'HR & People',            domain:'greenhouse.io',        color:'#23AA49' },
  { name:'Lever',             category:'HR & People',            domain:'lever.co',             color:'#5B2AE8' },
  { name:'Workable',          category:'HR & People',            domain:'workable.com',         color:'#0F996D' },
  { name:'SAP SuccessFactors',category:'HR & People',            domain:'sap.com',              color:'#008FD3' },

  // Product Analytics (12)
  { name:'Mixpanel',          category:'Product Analytics',      domain:'mixpanel.com',         color:'#7856FF' },
  { name:'Amplitude',         category:'Product Analytics',      domain:'amplitude.com',        color:'#1E61F0' },
  { name:'Segment',           category:'Product Analytics',      domain:'segment.com',          color:'#52BD94' },
  { name:'Heap',              category:'Product Analytics',      domain:'heap.io',              color:'#4F43DC' },
  { name:'Pendo',             category:'Product Analytics',      domain:'pendo.io',             color:'#FF4876' },
  { name:'Hotjar',            category:'Product Analytics',      domain:'hotjar.com',           color:'#FF3C00' },
  { name:'FullStory',         category:'Product Analytics',      domain:'fullstory.com',        color:'#FF4A00' },
  { name:'LogRocket',         category:'Product Analytics',      domain:'logrocket.com',        color:'#764ABC' },
  { name:'Sentry',            category:'Product Analytics',      domain:'sentry.io',            color:'#362D59' },
  { name:'PostHog',           category:'Product Analytics',      domain:'posthog.com',          color:'#1D4AFF' },
  { name:'June',              category:'Product Analytics',      domain:'june.so',              color:'#161B22' },
  { name:'Smartlook',         category:'Product Analytics',      domain:'smartlook.com',        color:'#FBA50A' },

  // Cloud & Storage (12)
  { name:'Amazon S3',         category:'Cloud & Storage',        domain:'aws.amazon.com',       color:'#E25444' },
  { name:'Azure Data Lake',   category:'Cloud & Storage',        domain:'azure.microsoft.com',  color:'#0078D4' },
  { name:'Azure Blob Storage',category:'Cloud & Storage',        domain:'azure.microsoft.com',  color:'#0078D4' },
  { name:'Google Cloud Storage', category:'Cloud & Storage',     domain:'cloud.google.com',     color:'#4285F4' },
  { name:'Google Drive',      category:'Cloud & Storage',        domain:'drive.google.com',     color:'#0F9D58' },
  { name:'Google Sheets',     category:'Cloud & Storage',        domain:'sheets.google.com',    color:'#0F9D58' },
  { name:'Dropbox',           category:'Cloud & Storage',        domain:'dropbox.com',          color:'#0061FF' },
  { name:'Box',               category:'Cloud & Storage',        domain:'box.com',              color:'#0061D5' },
  { name:'OneDrive',          category:'Cloud & Storage',        domain:'onedrive.live.com',    color:'#0364B8' },
  { name:'Backblaze B2',      category:'Cloud & Storage',        domain:'backblaze.com',        color:'#EE3027' },
  { name:'Wasabi',            category:'Cloud & Storage',        domain:'wasabi.com',           color:'#01CD3E' },
  { name:'Cloudflare R2',     category:'Cloud & Storage',        domain:'cloudflare.com',       color:'#F6821F' },

  // Developer Tools (15)
  { name:'GitHub',            category:'Developer Tools',        domain:'github.com',           color:'#181717' },
  { name:'GitLab',            category:'Developer Tools',        domain:'gitlab.com',           color:'#FC6D26' },
  { name:'Bitbucket',         category:'Developer Tools',        domain:'bitbucket.org',        color:'#0052CC' },
  { name:'CircleCI',          category:'Developer Tools',        domain:'circleci.com',         color:'#343434' },
  { name:'Jenkins',           category:'Developer Tools',        domain:'jenkins.io',           color:'#D24939' },
  { name:'Azure DevOps',      category:'Developer Tools',        domain:'azure.microsoft.com',  color:'#0078D4' },
  { name:'Vercel',            category:'Developer Tools',        domain:'vercel.com',           color:'#000000' },
  { name:'Netlify',           category:'Developer Tools',        domain:'netlify.com',          color:'#00AD9F' },
  { name:'Heroku',            category:'Developer Tools',        domain:'heroku.com',           color:'#430098' },
  { name:'Render',            category:'Developer Tools',        domain:'render.com',           color:'#46E3B7' },
  { name:'Cloudflare',        category:'Developer Tools',        domain:'cloudflare.com',       color:'#F6821F' },
  { name:'Fastly',            category:'Developer Tools',        domain:'fastly.com',           color:'#FF282D' },
  { name:'Datadog',           category:'Developer Tools',        domain:'datadoghq.com',        color:'#632CA6' },
  { name:'New Relic',         category:'Developer Tools',        domain:'newrelic.com',         color:'#00AC69' },
  { name:'PagerDuty',         category:'Developer Tools',        domain:'pagerduty.com',        color:'#06AC38' },

  // Communication & Email (12)
  { name:'Gmail',             category:'Communication & Email',  domain:'mail.google.com',      color:'#EA4335' },
  { name:'Outlook',           category:'Communication & Email',  domain:'outlook.com',          color:'#0078D4' },
  { name:'Calendly',          category:'Communication & Email',  domain:'calendly.com',         color:'#006BFF' },
  { name:'Cal.com',           category:'Communication & Email',  domain:'cal.com',              color:'#111827' },
  { name:'Zoom',              category:'Communication & Email',  domain:'zoom.us',              color:'#2D8CFF' },
  { name:'Google Meet',       category:'Communication & Email',  domain:'meet.google.com',      color:'#00897B' },
  { name:'Webex',             category:'Communication & Email',  domain:'webex.com',            color:'#00A0D2' },
  { name:'RingCentral',       category:'Communication & Email',  domain:'ringcentral.com',      color:'#FF7A00' },
  { name:'Dialpad',           category:'Communication & Email',  domain:'dialpad.com',          color:'#7E44FA' },
  { name:'Aircall',           category:'Communication & Email',  domain:'aircall.io',           color:'#00B388' },
  { name:'Twilio',            category:'Communication & Email',  domain:'twilio.com',           color:'#F22F46' },
  { name:'Mailgun',           category:'Communication & Email',  domain:'mailgun.com',          color:'#F06B66' },

  // Security & Identity (8)
  { name:'Okta',              category:'Security & Identity',    domain:'okta.com',             color:'#007DC1' },
  { name:'Auth0',             category:'Security & Identity',    domain:'auth0.com',            color:'#EB5424' },
  { name:'OneLogin',          category:'Security & Identity',    domain:'onelogin.com',         color:'#1D252C' },
  { name:'JumpCloud',         category:'Security & Identity',    domain:'jumpcloud.com',        color:'#3ACE01' },
  { name:'Duo',               category:'Security & Identity',    domain:'duo.com',              color:'#6BBE45' },
  { name:'1Password',         category:'Security & Identity',    domain:'1password.com',        color:'#0572EC' },
  { name:'LastPass',          category:'Security & Identity',    domain:'lastpass.com',         color:'#D32D27' },
  { name:'Cloudflare Access', category:'Security & Identity',    domain:'cloudflare.com',       color:'#F6821F' },

  // Data Pipelines & ETL (10)
  { name:'Fivetran',          category:'Data Pipelines & ETL',   domain:'fivetran.com',         color:'#0070FF' },
  { name:'Stitch Data',       category:'Data Pipelines & ETL',   domain:'stitchdata.com',       color:'#FF6700' },
  { name:'Airbyte',           category:'Data Pipelines & ETL',   domain:'airbyte.com',          color:'#615EFF' },
  { name:'dbt',               category:'Data Pipelines & ETL',   domain:'getdbt.com',           color:'#FF694A' },
  { name:'Matillion',         category:'Data Pipelines & ETL',   domain:'matillion.com',        color:'#19E57F' },
  { name:'Hevo Data',         category:'Data Pipelines & ETL',   domain:'hevodata.com',         color:'#FFC043' },
  { name:'Talend',            category:'Data Pipelines & ETL',   domain:'talend.com',           color:'#FF6D70' },
  { name:'Informatica',       category:'Data Pipelines & ETL',   domain:'informatica.com',      color:'#FF4D00' },
  { name:'Rivery',            category:'Data Pipelines & ETL',   domain:'rivery.io',            color:'#0B50F8' },
  { name:'Dataiku',           category:'Data Pipelines & ETL',   domain:'dataiku.com',          color:'#2AB1AC' },
];

/* ── CONNECTORS HERO ── */
function ConnectorsHero() {
  return (
    <section style={{padding:'80px 0 36px', textAlign:'center', position:'relative', zIndex:1}}>
      <div style={{maxWidth:'760px', margin:'0 auto', padding:'0 24px'}}>
        <div className="fu0" style={{display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 14px', borderRadius:'999px', border:'1px solid rgba(255,255,255,.07)', background:'rgba(255,255,255,.03)', fontSize:'12px', color:'#7FA0AC', fontWeight:500, letterSpacing:'0.04em', marginBottom:'24px'}}>
          ✦ DATA CONNECTORS
        </div>
        <h1 className="fu1" style={{fontSize:'clamp(2.2rem,3.2vw,3.6rem)', fontWeight:700, fontFamily:"'Outfit', sans-serif", letterSpacing:'-.04em', lineHeight:1.1, color:'#E8F2F5', marginBottom:'18px', textWrap:'balance'}}>
          Connect to everything you run on.
        </h1>
        <p className="fu2" style={{fontSize:'16px', color:'#7FA0AC', lineHeight:1.6, maxWidth:'580px', margin:'0 auto'}}>
          200+ data connectors across your CRM, warehouse, ads, finance, product, and developer stack. Plug one in and start asking questions in plain English.
        </p>
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
        <p style={{
          fontSize:'11.5px', color:'#7FA0AC', lineHeight:1.5, marginBottom:'10px',
        }}>
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
            color:'#0EC4C1', fontSize:'12.5px', fontWeight:500,
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
  const [imgFailed, setImgFailed] = useState(false);
  const initials = c.name.split(' ').filter(w => !['&','the','-'].includes(w.toLowerCase())).slice(0,2).map(w => w[0]).join('').toUpperCase();

  return (
    <div className="connector-tile" style={{ animationDelay:`${Math.min(index,12) * 0.02}s` }}>
      <div className="connector-face">
        <div className="connector-logo">
          {imgFailed ? (
            <div className="fallback" style={{ background: c.color, color: '#fff', borderRadius: 6 }}>
              {initials}
            </div>
          ) : (
            <img
              src={`https://logo.clearbit.com/${c.domain}`}
              alt={c.name}
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          )}
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
        color:'#7FA0AC', fontSize:'14px',
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7FA0AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search 200+ connectors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{background:'none',border:'none',color:'#7FA0AC',cursor:'pointer',padding:'2px 6px',fontSize:'12px'}}>
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
              <h3 style={{fontSize:'16px', fontWeight:500, color:'#E8F2F5', marginBottom:'4px', letterSpacing:'-.01em'}}>
                Can't find your tool?
              </h3>
              <p style={{fontSize:'13.5px', color:'#7FA0AC', lineHeight:1.5}}>
                Tell us what you use and we'll prioritize the connector.
              </p>
            </div>
            <button
              onClick={handleRequestConnector}
              style={{
                display:'inline-flex', alignItems:'center', gap:'8px',
                padding:'10px 18px', borderRadius:'8px',
                border:'none', background:'#07807E', color:'#fff',
                fontSize:'13px', fontWeight:600, fontFamily:'Geist,sans-serif',
                cursor:'pointer', transition:'background .15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#09A09D'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#07807E'; }}
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
