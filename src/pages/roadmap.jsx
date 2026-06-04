import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CheckIcon from '../components/CheckIcon';
import Button from '../components/Button';

/* ── ICONS ── */

/* ── TREE HERO ── */
function TreeHero() {
  const W = 1000, H = 330;
  const spineY   = 158;
  const upY      = spineY - 86;  // 72
  const downY    = spineY + 86;  // 244
  const CW = 164, CH = 52, CR = 9;

  const milestones = [
    { id: 'MVP', label: 'Insightis Public MVP', sub: 'Q2 2026',                   x: 120, dir: null,   color: 'var(--ins-text-highlight)' },
    { id: 'V1',  label: 'V1',                   sub: 'DWH & Team Support',        x: 308, dir: 'up',   color: '#A78BFA' },
    { id: 'V2',  label: 'V2',                   sub: 'MCP & Advanced Dashboards', x: 490, dir: 'down', color: '#A78BFA' },
    { id: 'V3',  label: 'V3',                   sub: 'Signals & Automations',     x: 672, dir: 'up',   color: 'var(--ins-text-body)' },
    { id: 'V4',  label: 'V4',                   sub: 'Custom Agents',             x: 854, dir: 'down', color: '#5E8290' },
  ];

  /* Dot travels from x=120 → x=854 over 2 s, starting at t=0.8 s (after spine draws) */
  const DOT_START = 0.8, DOT_DUR = 2.0;
  const SPINE_X1 = 120, SPINE_X2 = 854, SPINE_LEN = 734;
  /* When (in seconds) the travelling dot reaches milestone x */
  const at = (x) => +(DOT_START + ((x - SPINE_X1) / SPINE_LEN) * DOT_DUR).toFixed(3);

  return (
    <section style={{padding:'110px 0 48px', position:'relative', zIndex:1}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px', textAlign:'center'}}>

        <h1 className="ins-text-display-xl" style={{marginBottom:20}}>
          Our product roadmap.
        </h1>

        <p className="fu2 ins-text-body-xl" style={{maxWidth:560, margin:'0 auto 52px'}}>
          Where we're headed. The features and improvements ahead, and what we've already shipped.
        </p>

        {/* Horizontal timeline tree — all animation via SVG SMIL */}
        <div>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{overflow:'visible'}}>
            <defs>
              <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="9" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <linearGradient id="spineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="var(--ins-text-highlight)" stopOpacity="0.75"/>
                <stop offset="35%"  stopColor="#A78BFA" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#5E8290" stopOpacity="0.12"/>
              </linearGradient>
            </defs>

            {/* ── 1. BASE SPINE: draws left → right in 0.7 s ── */}
            <line x1={36} y1={spineY} x2={940} y2={spineY}
              stroke="url(#spineGrad)" strokeWidth="2" strokeLinecap="round"
              strokeDasharray="910" strokeDashoffset="910">
              <animate attributeName="stroke-dashoffset" from="910" to="0"
                dur="0.7s" begin="0s" fill="freeze"
                calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.6 1"/>
            </line>

            {/* ── 2. PROGRESSIVE GLOW: teal overlay follows the dot ── */}
            <line x1={SPINE_X1} y1={spineY} x2={SPINE_X2} y2={spineY}
              stroke="var(--ins-text-highlight)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={SPINE_LEN} strokeDashoffset={SPINE_LEN}>
              <animate attributeName="stroke-dashoffset"
                from={SPINE_LEN} to="0"
                dur={`${DOT_DUR}s`} begin={`${DOT_START}s`} fill="freeze"
                calcMode="spline" keyTimes="0;1" keySplines="0.38 0 0.62 1"/>
              <animate attributeName="stroke-opacity"
                values="0.55;0.55;0.08" keyTimes="0;0.82;1"
                dur={`${DOT_DUR}s`} begin={`${DOT_START}s`} fill="freeze"/>
            </line>

            {/* ── 3. TRAVELLING DOT ── */}
            <g transform={`translate(${SPINE_X1},${spineY})`}>
              <circle r="5" fill="var(--ins-text-highlight)" filter="url(#dotGlow)" opacity="0">
                <animateMotion
                  dur={`${DOT_DUR}s`} begin={`${DOT_START}s`} fill="freeze"
                  path={`M 0,0 L ${SPINE_LEN},0`}
                  calcMode="spline" keyTimes="0;1" keySplines="0.38 0 0.62 1"/>
                <animate attributeName="opacity"
                  values="0;1;1;0.1" keyTimes="0;0.04;0.91;1"
                  dur={`${DOT_DUR}s`} begin={`${DOT_START}s`} fill="freeze"/>
              </circle>
            </g>

            {/* ── 4. ARROW + ELLIPSIS (appear after spine) ── */}
            <g opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0.7s" fill="freeze"/>
              <path d={`M ${930},${spineY-5} L ${941},${spineY} L ${930},${spineY+5}`}
                fill="none" stroke="var(--ins-text-disabled)" strokeWidth="1.5" strokeOpacity="0.3"
                strokeLinecap="round" strokeLinejoin="round"/>
              <text x={955} y={spineY+4} fill="var(--ins-text-disabled)" fontSize="12" opacity="0.3"
                fontFamily="var(--ins-font-family-mono)">…</text>
            </g>

            {/* ── 5. MILESTONES: each triggered when dot arrives ── */}
            {milestones.map((m) => {
              const arrAt   = at(m.x);          // dot arrival time (s)
              const isMVP   = m.dir === null;
              const isUp    = m.dir === 'up';
              const isDown  = m.dir === 'down';
              const bLen    = 86;               // branch length (px)

              const branchEndY = isUp ? upY : isDown ? downY : spineY;
              const cardTopY   = isUp   ? upY   - CH - 10
                               : isDown ? downY + 10
                               : spineY - CH / 2;  // MVP straddles spine
              const nodeR = isMVP ? 9 : 5.5;

              return (
                <g key={m.id}>

                  {/* BRANCH — draws from spine outward when dot arrives */}
                  {!isMVP && (
                    <>
                      <line x1={m.x} y1={spineY} x2={m.x} y2={branchEndY}
                        stroke={m.color} strokeWidth="1.5"
                        strokeDasharray={bLen} strokeDashoffset={bLen} opacity="0">
                        <animate attributeName="stroke-dashoffset"
                          from={bLen} to="0" dur="0.75s" begin={`${arrAt}s`} fill="freeze"
                          calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.6 1"/>
                        <animate attributeName="opacity" from="0" to="0.35"
                          dur="0.2s" begin={`${arrAt}s`} fill="freeze"/>
                      </line>
                      {/* Bright flash on branch as dot passes */}
                      <line x1={m.x} y1={spineY} x2={m.x} y2={branchEndY}
                        stroke={m.color} strokeWidth="3.5" opacity="0">
                        <animate attributeName="opacity" values="0;0.85;0"
                          dur="0.55s" begin={`${arrAt}s`} fill="remove"/>
                      </line>
                    </>
                  )}

                  {/* PING RING — expands outward from spine node */}
                  <circle cx={m.x} cy={spineY} r={nodeR} fill="none"
                    stroke={m.color} strokeWidth="2.5" opacity="0">
                    <animate attributeName="r"
                      from={nodeR} to={nodeR * 4.8}
                      dur="0.9s" begin={`${arrAt}s`} fill="freeze"/>
                    <animate attributeName="opacity" from="0.65" to="0"
                      dur="0.9s" begin={`${arrAt}s`} fill="freeze"/>
                    <animate attributeName="stroke-width" from="2.5" to="0.3"
                      dur="0.9s" begin={`${arrAt}s`} fill="freeze"/>
                  </circle>

                  {/* LABEL CARD — fades in 0.2 s after dot arrives */}
                  <g opacity="0">
                    <animate attributeName="opacity" from="0" to="1"
                      dur="0.45s" begin={`${arrAt + 0.2}s`} fill="freeze"/>

                    {/* MVP heartbeat: outer ring 1 */}
                    {isMVP && (
                      <rect x={m.x - CW/2 - 6} y={cardTopY - 6} width={CW + 12} height={CH + 12} rx={CR + 5}
                        fill="none" stroke={m.color} strokeWidth="1.5" opacity="0">
                        <animate attributeName="opacity"
                          values="0;0;0.55;0"
                          keyTimes="0;0.05;0.25;1"
                          dur="2.4s" begin={`${arrAt + 0.7}s`} repeatCount="indefinite"/>
                        <animate attributeName="stroke-width"
                          values="1.5;1.5;0.5;0"
                          keyTimes="0;0.05;0.5;1"
                          dur="2.4s" begin={`${arrAt + 0.7}s`} repeatCount="indefinite"/>
                        <animate attributeName="x"
                          values={`${m.x - CW/2 - 6};${m.x - CW/2 - 6};${m.x - CW/2 - 14};${m.x - CW/2 - 14}`}
                          keyTimes="0;0.05;0.5;1"
                          dur="2.4s" begin={`${arrAt + 0.7}s`} repeatCount="indefinite"/>
                        <animate attributeName="y"
                          values={`${cardTopY - 6};${cardTopY - 6};${cardTopY - 14};${cardTopY - 14}`}
                          keyTimes="0;0.05;0.5;1"
                          dur="2.4s" begin={`${arrAt + 0.7}s`} repeatCount="indefinite"/>
                        <animate attributeName="width"
                          values={`${CW + 12};${CW + 12};${CW + 28};${CW + 28}`}
                          keyTimes="0;0.05;0.5;1"
                          dur="2.4s" begin={`${arrAt + 0.7}s`} repeatCount="indefinite"/>
                        <animate attributeName="height"
                          values={`${CH + 12};${CH + 12};${CH + 28};${CH + 28}`}
                          keyTimes="0;0.05;0.5;1"
                          dur="2.4s" begin={`${arrAt + 0.7}s`} repeatCount="indefinite"/>
                      </rect>
                    )}

                    {/* MVP heartbeat: inner ring 2 (slight delay = double-beat) */}
                    {isMVP && (
                      <rect x={m.x - CW/2 - 4} y={cardTopY - 4} width={CW + 8} height={CH + 8} rx={CR + 3}
                        fill="none" stroke={m.color} strokeWidth="1" opacity="0">
                        <animate attributeName="opacity"
                          values="0;0;0.35;0"
                          keyTimes="0;0.12;0.35;1"
                          dur="2.4s" begin={`${arrAt + 0.9}s`} repeatCount="indefinite"/>
                        <animate attributeName="stroke-width"
                          values="1;1;0.3;0"
                          keyTimes="0;0.12;0.6;1"
                          dur="2.4s" begin={`${arrAt + 0.9}s`} repeatCount="indefinite"/>
                        <animate attributeName="x"
                          values={`${m.x - CW/2 - 4};${m.x - CW/2 - 4};${m.x - CW/2 - 10};${m.x - CW/2 - 10}`}
                          keyTimes="0;0.12;0.6;1"
                          dur="2.4s" begin={`${arrAt + 0.9}s`} repeatCount="indefinite"/>
                        <animate attributeName="y"
                          values={`${cardTopY - 4};${cardTopY - 4};${cardTopY - 10};${cardTopY - 10}`}
                          keyTimes="0;0.12;0.6;1"
                          dur="2.4s" begin={`${arrAt + 0.9}s`} repeatCount="indefinite"/>
                        <animate attributeName="width"
                          values={`${CW + 8};${CW + 8};${CW + 20};${CW + 20}`}
                          keyTimes="0;0.12;0.6;1"
                          dur="2.4s" begin={`${arrAt + 0.9}s`} repeatCount="indefinite"/>
                        <animate attributeName="height"
                          values={`${CH + 8};${CH + 8};${CH + 20};${CH + 20}`}
                          keyTimes="0;0.12;0.6;1"
                          dur="2.4s" begin={`${arrAt + 0.9}s`} repeatCount="indefinite"/>
                      </rect>
                    )}

                    <rect x={m.x - CW/2} y={cardTopY} width={CW} height={CH} rx={CR}
                      fill="rgba(13,17,23,0.92)" stroke={m.color}
                      strokeOpacity={isMVP ? "0.45" : "0.22"} strokeWidth={isMVP ? "1.5" : "1"}>
                      {/* MVP card border pulses brighter on the beat */}
                      {isMVP && (
                        <animate attributeName="stroke-opacity"
                          values="0.45;0.45;0.9;0.45"
                          keyTimes="0;0.05;0.2;1"
                          dur="2.4s" begin={`${arrAt + 0.7}s`} repeatCount="indefinite"/>
                      )}
                    </rect>
                    {isDown
                      ? <line x1={m.x - CW/2 + CR} y1={cardTopY + CH}
                              x2={m.x + CW/2 - CR} y2={cardTopY + CH}
                          stroke={m.color} strokeWidth="1.5" strokeOpacity="0.5"/>
                      : <line x1={m.x - CW/2 + CR} y1={cardTopY}
                              x2={m.x + CW/2 - CR} y2={cardTopY}
                          stroke={m.color} strokeWidth="1.5" strokeOpacity="0.5"/>
                    }
                    <text x={m.x} y={cardTopY + 19}
                      textAnchor="middle" fill={m.color}
                      fontSize={isMVP ? '11' : '11'} fontWeight="600"
                      fontFamily="var(--ins-font-family-mono)" letterSpacing="0.04em">
                      {m.label}
                    </text>
                    <text x={m.x} y={cardTopY + 37}
                      textAnchor="middle" fill="var(--ins-text-body)" fontSize="10"
                      fontFamily="var(--ins-font-family-sans)">
                      {m.sub}
                    </text>
                  </g>

                  {/* SPINE NODE — pops in exactly as dot arrives (skip for MVP — no dot inside card) */}
                  {!isMVP && (
                    <>
                      <circle cx={m.x} cy={spineY} r={nodeR} fill={m.color} opacity="0">
                        <animate attributeName="opacity" from="0" to="1"
                          dur="0.3s" begin={`${arrAt}s`} fill="freeze"/>
                      </circle>
                      <circle cx={m.x} cy={spineY} r="2" fill="var(--ins-surface-page)" opacity="0">
                        <animate attributeName="opacity" from="0" to="1"
                          dur="0.3s" begin={`${arrAt}s`} fill="freeze"/>
                      </circle>
                    </>
                  )}

                  {/* BRANCH-END NODE — appears after branch finishes drawing */}
                  {!isMVP && (
                    <>
                      <circle cx={m.x} cy={branchEndY} r="4.5" fill={m.color} opacity="0">
                        <animate attributeName="opacity" from="0" to="1"
                          dur="0.3s" begin={`${arrAt + 0.6}s`} fill="freeze"/>
                      </circle>
                      <circle cx={m.x} cy={branchEndY} r="2" fill="var(--ins-surface-page)" opacity="0">
                        <animate attributeName="opacity" from="0" to="1"
                          dur="0.3s" begin={`${arrAt + 0.6}s`} fill="freeze"/>
                      </circle>
                    </>
                  )}

                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ── ROADMAP SECTIONS ── */
const ROADMAP_COLUMNS = [
  {
    key: 'now',
    label: 'Now',
    color: 'var(--ins-text-highlight)',
    glow: 'var(--ins-color-teal-a-15)',
    items: [
      { title: 'AI Connect — Private Beta',     desc: 'Pipe your Insightis data into Claude, ChatGPT, and custom agents.' },
      { title: 'Memory & Storage',              desc: 'Long-term business context so Insightis learns your company over time.' },
      { title: 'Slack & Teams Notifications',   desc: 'Push metric alerts and anomalies to your team channels.' },
    ],
  },
  {
    key: 'next',
    label: 'Next',
    color: '#A78BFA',
    glow: 'rgba(139,92,246,.12)',
    items: [
      { title: 'AI Connect — MCP Server',       desc: 'Expose your workspace to Claude, Cursor, and any MCP-compatible tool.' },
      { title: 'Custom Dashboard Builder',      desc: 'Drag-and-drop dashboards built from saved AI Chat answers.' },
      { title: 'Scheduled Reports',             desc: 'Auto-generated weekly and monthly business reports, delivered by email.' },
    ],
  },
  {
    key: 'later',
    label: 'Later',
    color: 'var(--ins-text-body)',
    glow: 'rgba(127,160,172,.08)',
    items: [
      { title: 'Multi-Workspace Support',       desc: 'Manage multiple companies or business units from one account.' },
      { title: 'Embedded Analytics',            desc: 'White-label Insightis inside your own product.' },
      { title: 'Advanced Formula Metrics',      desc: 'Window functions, cohorts, and conditional aggregations.' },
    ],
  },
];

const RECENTLY_SHIPPED = [
  { title: 'Insights Engine',       desc: 'Automated deep analysis of root causes and anomalies.' },
  { title: '200+ Data Connectors',  desc: 'HubSpot, Stripe, Postgres, Snowflake, Salesforce, and more.' },
  { title: 'Semantic Layer v2',     desc: 'Certified metrics, cross-source joins, and full documentation.' },
];

function RoadmapSections() {
  return (
    <section style={{position:'relative', zIndex:1, paddingBottom:48, paddingTop:140}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>

        {/* Section heading */}
        <div style={{marginBottom:40}}>
          <h2 className="ins-text-h1" style={{marginBottom:12}}>
            What's on deck.
          </h2>
          <p className="ins-text-body-lg" style={{maxWidth:520, margin:0}}>
            A curated look at what we're building. Curated by hand — not auto-generated.
          </p>
        </div>

        {/* Divider */}
        <div style={{height:1, background:'linear-gradient(90deg,transparent,var(--ins-color-white-a-06),transparent)', marginBottom:32}}/>

        {/* Now / Next / Later */}
        <div className="kanban-grid" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
          {ROADMAP_COLUMNS.map(col => (
            <div key={col.key}>
              <div className="col-header">
                <span style={{width:8, height:8, borderRadius:'50%', background:col.color, flexShrink:0,
                  boxShadow:`0 0 8px ${col.color}55`}}/>
                <span style={{fontSize:12, fontWeight:600, color:'var(--ins-color-gray-100)', letterSpacing:'.02em'}}>{col.label}</span>
              </div>
              <div style={{display:'flex', flexDirection:'column', gap:10}}>
                {col.items.map((item, i) => (
                  <div key={i} className="roadmap-card" style={{'--card-glow': col.glow}}>
                    <h3 style={{fontSize:14, fontWeight:500, color:'var(--ins-text-heading-soft)', lineHeight:1.4, marginBottom:6}}>{item.title}</h3>
                    <p className="ins-text-body-sm" style={{margin:0}}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recently shipped */}
        <div style={{marginTop:56}}>
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:18}}>
            <span style={{fontSize:11, fontWeight:600, color:'var(--ins-status-success-fg)', letterSpacing:'.12em', textTransform:'uppercase'}}>Recently shipped</span>
            <span style={{flex:1, height:1, background:'linear-gradient(90deg,rgba(34,197,94,.25),transparent)'}}/>
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:'14px 28px'}}>
            {RECENTLY_SHIPPED.map((item, i) => (
              <div key={i} style={{display:'flex', alignItems:'flex-start', gap:10, flex:'1 1 280px', minWidth:0}}>
                <span style={{flexShrink:0, marginTop:3, width:18, height:18, borderRadius:'50%',
                  background:'rgba(34,197,94,.1)', border:'1px solid rgba(34,197,94,.25)',
                  display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
                  <CheckIcon size={10} color="var(--ins-status-success-fg)" />
                </span>
                <div style={{minWidth:0}}>
                  <span style={{fontSize:14, fontWeight:500, color:'var(--ins-color-gray-100)'}}>{item.title}</span>
                  <span style={{fontSize:14, color:'var(--ins-text-body)'}}> — {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SUGGEST FEATURE CTA ── */
function SuggestCTA() {
  const [open, setOpen]       = useState(false);
  const [text, setText]       = useState('');
  const [files, setFiles]     = useState([]);
  const [sent, setSent]       = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef               = React.useRef();

  const canSubmit = text.trim().length > 0;

  function handleFiles(incoming) {
    const arr = Array.from(incoming);
    setFiles(prev => {
      const existing = new Set(prev.map(f => f.name + f.size));
      return [...prev, ...arr.filter(f => !existing.has(f.name + f.size))];
    });
  }

  function removeFile(idx) {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit() {
    if (!canSubmit) return;
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setTimeout(() => { setText(''); setFiles([]); setSent(false); }, 400);
    }, 2600);
  }

  function handleDrop(e) {
    e.preventDefault(); setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  /* format file size */
  function fmtSize(b) {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b/1024).toFixed(1) + ' KB';
    return (b/1048576).toFixed(1) + ' MB';
  }

  /* overlay close on backdrop click */
  function handleBackdrop(e) {
    if (e.target === e.currentTarget && !sent) setOpen(false);
  }

  return (
    <>
      {/* ── CTA STRIP ── */}
      <section style={{padding:'64px 0 80px', position:'relative', zIndex:1}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
          <div style={{
            position:'relative', borderRadius:16,
            border:'1px solid rgba(30,30,48,1)',
            padding:'32px 48px', overflow:'hidden',
            display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between',
            gap:24, flexWrap:'wrap',
            background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)',
          }}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
            <div style={{maxWidth:520}}>
              <h3 style={{fontSize:'clamp(18px,2.5vw,24px)', fontWeight:500, color:'var(--ins-text-heading-soft)', letterSpacing:'-.02em', marginBottom:8}}>
                Missing something? <span style={{color:'var(--ins-button-primary-bg)'}}>Suggest a feature.</span>
              </h3>
              <p className="ins-text-body">
                Tell us what you'd like to see in Insightis. We review every suggestion.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              radius="md"
              onClick={() => setOpen(true)}
              style={{flexShrink:0}}
              iconEnd={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>}
            >
              Request a feature
            </Button>
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {open && (
        <div onClick={handleBackdrop} style={{
          position:'fixed', inset:0, zIndex:9000,
          background:'rgba(6,10,15,.72)', backdropFilter:'blur(6px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          padding:24,
          animation:'fadeInBg .2s ease',
        }}>
          <div style={{
            width:'100%', maxWidth:520,
            background:'linear-gradient(145deg,#0E1420,var(--ins-surface-page))',
            border:'1px solid var(--ins-color-white-a-07)',
            borderRadius:18, overflow:'hidden',
            boxShadow:'none',
            animation:'modalSlideUp .25s cubic-bezier(.22,1,.36,1)',
          }}>

            {/* header */}
            <div style={{padding:'22px 28px 0', display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
              <div>
                <h2 style={{fontSize:18, fontWeight:600, color:'var(--ins-text-heading-soft)', letterSpacing:'-.02em', margin:0}}>Request a Feature</h2>
                <p className="ins-text-body" style={{margin:'4px 0 0'}}>Describe what you need — we read every request.</p>
              </div>
              <button onClick={() => { if (!sent) setOpen(false); }} style={{
                background:'none', border:'none', cursor:'pointer',
                color:'var(--ins-text-disabled)', padding:4, marginTop:-2,
                transition:'color .15s',
              }}
                onMouseEnter={e => e.currentTarget.style.color='var(--ins-color-gray-100)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--ins-text-disabled)'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            {sent ? (
              /* ── THANK YOU STATE ── */
              <div style={{padding:'48px 28px 52px', textAlign:'center'}}>
                <div style={{
                  width:56, height:56, borderRadius:'50%', margin:'0 auto 20px',
                  background:'rgba(34,197,94,.1)', border:'1px solid rgba(34,197,94,.25)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  animation:'nodeAppear .4s ease',
                }}>
                  <CheckIcon size={24} color="var(--ins-status-success-fg)" />
                </div>
                <h3 style={{fontSize:20, fontWeight:600, color:'var(--ins-text-heading-soft)', marginBottom:8, letterSpacing:'-.02em'}}>Thanks for your feedback!</h3>
                <p className="ins-text-body" style={{maxWidth:340, margin:'0 auto'}}>
                  We've received your feature request and will review it shortly.
                </p>
              </div>
            ) : (
              /* ── FORM STATE ── */
              <div style={{padding:'20px 28px 28px'}}>

                {/* textarea */}
                <div style={{marginBottom:16}}>
                  <label style={{display:'block', fontSize:12, fontWeight:500, color:'var(--ins-text-body)', letterSpacing:'.04em', marginBottom:8, textTransform:'uppercase'}}>
                    Description <span style={{color:'var(--ins-text-highlight)'}}>*</span>
                  </label>
                  <textarea
                    className="ins-textarea ins-textarea--sm"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Describe the feature you'd like to see…"
                    rows={5}
                  />
                </div>

                {/* drop zone */}
                <div style={{marginBottom:20}}>
                  <label style={{display:'block', fontSize:12, fontWeight:500, color:'var(--ins-text-body)', letterSpacing:'.04em', marginBottom:8, textTransform:'uppercase'}}>
                    Attachments <span style={{color:'var(--ins-text-disabled)', fontWeight:400, textTransform:'none', letterSpacing:0}}>(optional)</span>
                  </label>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current.click()}
                    style={{
                      borderRadius:10, padding:'18px 14px',
                      border: dragging ? '1.5px dashed rgba(14,196,193,.5)' : '1.5px dashed var(--ins-color-white-a-10)',
                      background: dragging ? 'rgba(14,196,193,.05)' : 'var(--ins-color-white-a-02)',
                      cursor:'pointer', textAlign:'center', transition:'all .15s',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-disabled)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:6}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <p className="ins-text-body-sm" style={{margin:0}}>
                      Drag & drop files or <span style={{color:'var(--ins-text-highlight)'}}>browse</span>
                    </p>
                    <p style={{fontSize:11, color:'var(--ins-text-disabled)', margin:'4px 0 0'}}>Images, PDFs, or any file — up to 20 MB each</p>
                  </div>
                  <input ref={fileRef} type="file" multiple style={{display:'none'}} onChange={e => handleFiles(e.target.files)} />

                  {/* file list */}
                  {files.length > 0 && (
                    <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:6}}>
                      {files.map((f, i) => (
                        <div key={i} style={{
                          display:'flex', alignItems:'center', justifyContent:'space-between',
                          padding:'7px 12px', borderRadius:8,
                          background:'var(--ins-color-white-a-04)', border:'1px solid var(--ins-border-default)',
                        }}>
                          <div style={{display:'flex', alignItems:'center', gap:8, minWidth:0}}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-body)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                            <span style={{fontSize:12, color:'var(--ins-color-gray-100)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{f.name}</span>
                            <span style={{fontSize:11, color:'var(--ins-text-disabled)', flexShrink:0}}>{fmtSize(f.size)}</span>
                          </div>
                          <button onClick={() => removeFile(i)} style={{
                            background:'none', border:'none', cursor:'pointer',
                            color:'var(--ins-text-disabled)', padding:'0 2px', flexShrink:0,
                            transition:'color .15s',
                          }}
                            onMouseEnter={e => e.currentTarget.style.color='var(--ins-color-gray-100)'}
                            onMouseLeave={e => e.currentTarget.style.color='var(--ins-text-disabled)'}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* actions */}
                <div style={{display:'flex', gap:10, justifyContent:'flex-end'}}>
                  <button onClick={() => setOpen(false)} style={{
                    padding:'10px 20px', borderRadius:9, border:'1px solid var(--ins-color-white-a-08)',
                    background:'transparent', color:'var(--ins-text-body)', fontSize:14, fontWeight:500,
                    cursor:'pointer', fontFamily:'var(--ins-font-family-sans)', transition:'all .15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background='var(--ins-color-white-a-05)'; e.currentTarget.style.color='var(--ins-color-gray-100)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='var(--ins-text-body)'; }}
                  >
                    Cancel
                  </button>
                  <button onClick={handleSubmit} disabled={!canSubmit} style={{
                    padding:'10px 24px', borderRadius:9, border:'none',
                    background: canSubmit ? 'linear-gradient(135deg,var(--ins-button-primary-bg),var(--ins-button-primary-bg-hover))' : 'var(--ins-color-white-a-05)',
                    color: canSubmit ? 'var(--ins-text-heading)' : 'var(--ins-text-disabled)',
                    fontSize:14, fontWeight:500, cursor: canSubmit ? 'pointer' : 'default',
                    fontFamily:'var(--ins-font-family-sans)', transition:'all .2s',
                    boxShadow: canSubmit ? '0 0 20px rgba(9,160,157,.2)' : 'none',
                    display:'inline-flex', alignItems:'center', gap:7,
                  }}>
                    Submit Request
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </button>
                </div>

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
  return (
    <div style={{position:'relative', zIndex:1}}>
      <Header />
      <main>
      <TreeHero />
      <RoadmapSections />
      <SuggestCTA />
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
