/* No hooks imported: removing the suggest-a-feature modal took all of this page's state,
   refs and callbacks with it. The timeline animates entirely in SVG SMIL. */
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import BottomCTA from '../components/BottomCTA';
import CheckIcon from '../components/CheckIcon';

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
    { id: 'V1',  label: 'V1',                   sub: 'DWH & MCP',                 x: 308, dir: 'up',   color: '#A78BFA' },
    { id: 'V2',  label: 'V2',                   sub: 'Team Support & Dashboard',  x: 490, dir: 'down', color: '#A78BFA' },
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
          Our product roadmap
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
      { title: 'AI Chat',                       desc: 'Ask any business question in plain English and get a sourced answer back in seconds.' },
      { title: 'Connectors',                    desc: 'Prebuilt sources across CRM, billing and analytics, plus REST and GraphQL for the rest.' },
      { title: 'Semantic Layer (metrics)',      desc: 'One certified definition per metric, versioned and shared across every team that asks.' },
    ],
  },
  {
    key: 'next',
    label: 'Next',
    color: '#A78BFA',
    glow: 'rgba(139,92,246,.12)',
    items: [
      { title: 'AI Connect — MCP Server',       desc: 'Expose your workspace to Claude, Cursor, and any other MCP-compatible tool you use.' },
      { title: 'Memory & Storage',              desc: 'Long-term business context, so Insightis learns how your company works over time.' },
      { title: 'Scheduled Reports',             desc: 'Weekly and monthly business reports generated for you and delivered straight to email.' },
    ],
  },
  {
    key: 'later',
    label: 'Later',
    color: 'var(--ins-text-body)',
    glow: 'rgba(127,160,172,.08)',
    items: [
      { title: 'Multi-Workspace Support',       desc: 'Manage several companies or business units from a single Insightis account.' },
      { title: 'Custom Agents',                 desc: 'Purpose-built agents that watch a metric for you and act on the rules you set.' },
      { title: 'Alerts',                        desc: 'Threshold and anomaly alerts pushed to Slack, Teams, or email the moment they fire.' },
    ],
  },
];

const RECENTLY_SHIPPED = [
  { title: 'Insights Engine',       desc: 'Automated deep analysis that finds root causes and anomalies without being asked.' },
  { title: '200+ Data Connectors',  desc: 'HubSpot, Stripe, PostgreSQL, Snowflake, Salesforce and nearly two hundred more.' },
  { title: 'Semantic Layer v2',     desc: 'Certified metrics, cross-source joins, and full documentation for every definition.' },
];

function RoadmapSections() {
  return (
    <section style={{position:'relative', zIndex:1, paddingBottom:48, paddingTop:140}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>

        {/* Section heading — SectionHeader supplies the eyebrow pill (its star is drawn by
            .ins-eyebrow::before), the centred alignment and the centred measure. */}
        <div style={{marginBottom:40}}>
          <SectionHeader
            eyebrow="What we're building"
            title="What's on deck"
            lede="A curated look at what we're building. Curated by hand — not auto-generated."
          />
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

/* ── BOTTOM CTA ── */
/* Was SuggestCTA: a feature-suggestion form in a modal, plus a bespoke CTA strip that opened
   it. The form is gone at the owner's request, so what remains is the shared BottomCTA — and
   none of the state, refs or drag-and-drop handlers the form needed. The <section> is the
   single root now, so the fragment that used to wrap it is gone too.
   .ins-bottom-cta already draws the border, radius, gradient, top hairline and glow the old
   strip hand-rolled with hardcoded rgba values and a clamp() heading. */
function RoadmapBottomCTA() {
  return (
      <section style={{padding:'64px 0 80px', position:'relative', zIndex:1}}>
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
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
    <div style={{position:'relative', zIndex:1}}>
      <Header />
      <main>
      <TreeHero />
      <RoadmapSections />
      <RoadmapBottomCTA />
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
