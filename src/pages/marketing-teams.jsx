import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import IntegrationsStrip from '../components/IntegrationsStrip';
import CodeChip from '../components/CodeChip';
import BottomCTA from '../components/BottomCTA';
import FAQAccordion from '../components/FAQAccordion';
import PainPointGrid from '../components/PainPointGrid';
import ComparisonCards from '../components/ComparisonCards';
import StepsProcess from '../components/StepsProcess';
import SectionHeader from '../components/SectionHeader';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/* ── CHART COMPONENTS (verbatim from AI Chat.html) ── */
function MiniBarChart({ data, color }) {
  const max = Math.max(...data);
  return (
    <div style={{display:'flex',alignItems:'flex-end',gap:'3px',height:'36px',marginTop:'10px'}}>
      {data.map((v,i) => (
        <div key={i} style={{
          flex:1, borderRadius:'2px 2px 0 0',
          background: i===data.length-1 ? color : color+'55',
          height:`${(v/max)*100}%`,
          minHeight:'4px',
        }}/>
      ))}
    </div>
  );
}

function TreemapChart({ items }) {
  const colors = ['var(--ins-text-highlight)','var(--ins-button-primary-bg-hover)','#818CF8','var(--ins-status-warning-fg)','var(--ins-status-error-fg)','#34D399','#60A5FA'];
  const sorted = [...items].sort((a,b) => b.value - a.value);
  const total = sorted.reduce((s,i) => s + i.value, 0);
  const W = 860, H = 270, gap = 4;
  const leftW = Math.round((sorted[0].value / total) * W);
  const rest = sorted.slice(1);
  const restTotal = rest.reduce((s,i) => s + i.value, 0) || 1;
  const cells = [{ x:0, y:0, w:leftW - gap, h:H, item:sorted[0], color:sorted[0].color || colors[0] }];
  let y = 0;
  rest.forEach((item, i) => {
    const h = Math.round((item.value / restTotal) * H);
    cells.push({ x:leftW, y, w:W - leftW, h:h - gap, item, color:item.color || colors[i+1] });
    y += h;
  });
  return (
    <div style={{margin:'12px 0'}}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:'280px'}}>
        {cells.map((c,i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={c.w} height={c.h} fill={c.color} opacity=".78" rx="6"/>
            <text x={c.x+c.w/2} y={c.y+c.h/2-(c.h>60?16:0)} textAnchor="middle" dominantBaseline="middle"
              style={{fontSize:c.w>200?'12px':'11px',fill:'rgba(255,255,255,.8)',fontFamily:'Geist Mono,monospace'}}>
              {c.item.label}
            </text>
            {c.h>60 && <text x={c.x+c.w/2} y={c.y+c.h/2+18} textAnchor="middle" dominantBaseline="middle"
              style={{fontSize:'20px',fill:'#fff',fontFamily:'Geist Mono,monospace',fontWeight:500}}>
              {c.item.display}
            </text>}
          </g>
        ))}
      </svg>
    </div>
  );
}

function PieChart({ slices }) {
  const total = slices.reduce((s, d) => s + Math.abs(d.value), 0);
  const colors = ['var(--ins-text-highlight)','var(--ins-button-primary-bg-hover)','var(--ins-status-error-fg)','var(--ins-status-warning-fg)','#818CF8','#34D399'];
  let angle = -Math.PI / 2;
  const cx = 90, cy = 90, r = 75, ri = 38;
  const paths = slices.map((s, i) => {
    const sweep = (Math.abs(s.value) / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle + sweep), y2 = cy + r * Math.sin(angle + sweep);
    const xi1 = cx + ri * Math.cos(angle), yi1 = cy + ri * Math.sin(angle);
    const xi2 = cx + ri * Math.cos(angle + sweep), yi2 = cy + ri * Math.sin(angle + sweep);
    const large = sweep > Math.PI ? 1 : 0;
    const d = `M${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} L${xi2},${yi2} A${ri},${ri} 0 ${large},0 ${xi1},${yi1} Z`;
    angle += sweep;
    return { d, color: s.color || colors[i % colors.length], label: s.label, pct: Math.round((Math.abs(s.value)/total)*100) };
  });
  return (
    <div style={{display:'flex',alignItems:'center',gap:'32px',margin:'12px 0'}}>
      <svg viewBox="0 0 180 180" style={{width:'240px',height:'240px',flexShrink:0}}>
        {paths.map((p,i) => <path key={i} d={p.d} fill={p.color} opacity=".85"/>)}
      </svg>
      <div style={{display:'flex',flexDirection:'column',gap:'14px',flex:1}}>
        {paths.map((p,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{width:'12px',height:'12px',borderRadius:'3px',background:p.color,flexShrink:0}}/>
            <span style={{fontSize:'14px',color:'var(--ins-text-body)',fontFamily:'Geist Mono,monospace',flex:1}}>{p.label}</span>
            <span style={{fontSize:'14px',color:'var(--ins-color-gray-100)',fontFamily:'Geist Mono,monospace',fontWeight:500}}>{p.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HorizontalBarChart({ bars }) {
  const maxVal = Math.max(...bars.map(b => Math.abs(b.value)));
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'10px',margin:'12px 0'}}>
      {bars.map((b,i) => (
        <div key={i} style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <span style={{fontSize:'12px',color:'var(--ins-text-body)',fontFamily:'Geist Mono,monospace',minWidth:'180px',textAlign:'right',flexShrink:0}}>{b.label}</span>
          <div style={{flex:1,background:'var(--ins-color-white-a-04)',borderRadius:'4px',height:'22px',position:'relative',overflow:'hidden'}}>
            <div style={{
              width:`${(Math.abs(b.value)/maxVal)*100}%`,
              height:'100%',borderRadius:'4px',
              background: b.color || (b.value < 0 ? 'rgba(220,80,80,.7)' : 'rgba(9,160,157,.6)'),
            }}/>
          </div>
          <span style={{fontSize:'12px',fontFamily:'Geist Mono,monospace',color: b.value < 0 ? '#E06060' : 'var(--ins-text-highlight)',minWidth:'60px',flexShrink:0}}>{b.display}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ points, labels }) {
  const max = Math.max(...points);
  const min = Math.min(...points) * 0.9;
  const range = max - min || 1;
  const w = 420, h = 120, px = 30, py = 10;
  const chartW = w - px*2, chartH = h - py*2;
  const coords = points.map((v,i) => ({
    x: px + (i / (points.length-1)) * chartW,
    y: py + chartH - ((v - min) / range) * chartH,
  }));
  const line = coords.map((c,i) => `${i===0?'M':'L'}${c.x},${c.y}`).join(' ');
  const area = line + ` L${coords[coords.length-1].x},${h-py} L${coords[0].x},${h-py} Z`;
  return (
    <div style={{margin:'12px 0'}}>
      <svg viewBox={`0 0 ${w} ${h}`} style={{width:'100%',height:'auto'}}>
        <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--ins-button-primary-bg-hover)" stopOpacity=".25"/><stop offset="100%" stopColor="var(--ins-button-primary-bg-hover)" stopOpacity=".02"/></linearGradient></defs>
        {[0,.25,.5,.75,1].map(f => <line key={f} x1={px} y1={py+chartH*f} x2={w-px} y2={py+chartH*f} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>)}
        <path d={area} fill="url(#areaFill)"/>
        <path d={line} fill="none" stroke="var(--ins-text-highlight)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {coords.map((c,i) => <circle key={i} cx={c.x} cy={c.y} r="3" fill="var(--ins-text-highlight)" stroke="var(--ins-surface-page)" strokeWidth="1.5"/>)}
        {labels && labels.map((l,i) => <text key={i} x={coords[i].x} y={h-1} textAnchor="middle" style={{fontSize:'9px',fill:'var(--ins-text-inactive)',fontFamily:'Geist Mono,monospace'}}>{l}</text>)}
      </svg>
    </div>
  );
}

/* ── REVOPS Q&A DATA (verbatim from AI Chat.html GALLERY_DATA['RevOps & BizOps']) ── */
const REVOPS_QA = {
  questions: [
    'Why did MRR drop last week?',
    'Which deals are at risk of slipping this quarter?',
    "What's our average sales cycle by deal size?",
    'Which pipeline stage has the highest drop-off rate?',
    'How is our CAC trending vs. 6 months ago?',
  ],
  replies: [
    {
      type: 'graph', chart: 'horizontalBar',
      chartData: [
        { label:'Trial expiry (activation)', value:-740, display:'-$740' },
        { label:'Pro → Starter downgrade', value:-260, display:'-$260' },
        { label:'Low engagement churn', value:-240, display:'-$240' },
        { label:'Annual → Monthly switch', value:-180, display:'-$180' },
        { label:'Seat count reduction', value:-120, display:'-$120' },
        { label:'Late payment write-off', value:-80, display:'-$80' },
      ],
      caption: "Trial expiry without activation drove 60% of last week's $1,240 MRR drop. Six distinct causes identified.",
      action: 'Trigger a re-engagement sequence for accounts with <5 logins in the last 14 days',
    },
    {
      type: 'graph', chart: 'treemap',
      chartData: [
        { label:'NovaCorp', value:52, display:'$52K', color:'var(--ins-status-error-fg)' },
        { label:'AlphaBase', value:38, display:'$38K', color:'var(--ins-status-warning-fg)' },
        { label:'Meridian', value:31, display:'$31K', color:'var(--ins-status-error-fg)' },
        { label:'Quell Inc.', value:28, display:'$28K', color:'var(--ins-status-warning-fg)' },
        { label:'Vertexio', value:22, display:'$22K', color:'#818CF8' },
        { label:'Others', value:13, display:'$13K', color:'#8AA6B3' },
      ],
      caption: '7 deals totalling $184K at risk of slipping past Q2. NovaCorp ($52K) untouched for 21 days.',
      action: 'Schedule executive business reviews for the top 3 at-risk deals before end of week',
    },
    {
      type: 'paragraph',
      text: "Average sales cycle is 18 days for small deals (<$5K), 34 days for mid-market ($5K–$20K), and 67 days for enterprise ($20K+). Enterprise deals take 3.7× longer — the proposal-to-legal handoff is the single biggest drag, accounting for 28 of those 67 days on average. This quarter, mid-market cycles improved by 4 days vs. Q4, driven by the mutual action plan template adopted in January. Enterprise cycles remain flat. Deals re-engaged within 5 business days of proposal stall close at 68% — that rate drops to 31% after 10 days. Accelerating the legal handoff phase alone could unlock an estimated $140K in deals currently sitting idle.",
      action: 'Build a 2-touch mid-market sequence targeting legal sign-off to cut 5–7 days from the cycle',
    },
    {
      type: 'graph', chart: 'pie',
      chartData: [
        { label:'Prospect → MQL drop-off', value:71, color:'var(--ins-status-error-fg)' },
        { label:'MQL → SQL drop-off', value:38, color:'var(--ins-status-warning-fg)' },
        { label:'SQL → Proposal drop-off', value:22, color:'#818CF8' },
        { label:'Proposal → Closed Won drop-off', value:14, color:'#34D399' },
      ],
      caption: '71% of prospects never qualify — improving lead scoring at the top of funnel unlocks the most pipeline without additional spend.',
      action: 'Refine ICP scoring criteria in HubSpot to filter low-intent leads at the MQL stage',
    },
    {
      type: 'graph', chart: 'line',
      chartData: [410, 395, 378, 355, 338, 322],
      chartLabels: ['Oct','Nov','Dec','Jan','Feb','Mar'],
      caption: 'CAC has dropped $88 over 6 months — PLG improvements and better lead quality are compounding each other.',
      action: 'Double down on PLG onboarding investment to sustain the downward CAC trend into Q3',
    },
  ],
};

/* ── HERO ── */
function MarketingHeroIllustration() {
  // Funnel data — 5 stages with widths decreasing for the iconic funnel shape
  const funnel = [
    { label: 'Visits', value: '124K',  width: 460, fill: 0.85, conv: null },
    { label: 'Leads',  value: '8.2K',  width: 360, fill: 0.7,  conv: '↓ 6.6% lead capture' },
    { label: 'MQLs',   value: '2.4K',  width: 270, fill: 0.55, conv: '↓ 29% qualified' },
    { label: 'SQLs',   value: '980',   width: 190, fill: 0.4,  conv: '↓ 41% sales-accepted' },
    { label: 'Won',    value: '312',   width: 120, fill: 0.25, conv: '↓ 32% close rate' },
  ];
  const barH = 32;

  // Sparkline KPI data (8 weeks each)
  const sparklines = [
    { label: 'CAC',  data: [218, 215, 212, 205, 198, 192, 188, 182], cur: '$182', delta: '−16%', color: '#34D399' },
    { label: 'ROAS', data: [4.8, 4.9, 5.1, 5.4, 5.6, 5.9, 6.2, 6.4],  cur: '6.4×', delta: '+33%', color: '#34D399' },
    { label: 'MQLs', data: [1820, 1950, 2080, 2150, 2240, 2310, 2360, 2400], cur: '2.4K', delta: '+32%', color: '#34D399' },
  ];

  const sparkPath = (data, x0, y0, w, h) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    return data.map((v, i) => {
      const x = x0 + (i / (data.length - 1)) * w;
      const y = y0 + h - ((v - min) / range) * h;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };
  const sparkLast = (data, y0, h) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    return y0 + h - ((data[data.length - 1] - min) / range) * h;
  };

  return (
    <svg viewBox="0 0 620 540" width="100%" style={{maxWidth:'580px',height:'auto',display:'block',filter:'drop-shadow(0 30px 60px rgba(0,0,0,0.55))'}} aria-hidden="true">
      <defs>
        <linearGradient id="ro_cardBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10171E"/>
          <stop offset="100%" stopColor="var(--ins-surface-page)"/>
        </linearGradient>
        <radialGradient id="ro_glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--ins-text-highlight)" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="var(--ins-text-highlight)" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Soft glow behind */}
      <ellipse cx="310" cy="270" rx="290" ry="200" fill="url(#ro_glow)"/>

      {/* Main dashboard card */}
      <g>
        <rect x="50" y="40" width="520" height="400" rx="18" fill="url(#ro_cardBg)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>

        {/* Header strip */}
        <rect x="50" y="40" width="520" height="44" rx="18" fill="rgba(255,255,255,0.025)"/>
        <rect x="50" y="68" width="520" height="16" fill="rgba(255,255,255,0.025)"/>
        <line x1="50" y1="84" x2="570" y2="84" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
        <circle cx="70" cy="62" r="4" fill="#FF5F57" opacity="0.55"/>
        <circle cx="84" cy="62" r="4" fill="#FFBD2E" opacity="0.55"/>
        <circle cx="98" cy="62" r="4" fill="#28C840" opacity="0.55"/>
        <text x="310" y="66" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="var(--ins-text-body)">Marketing performance · Live</text>
        <rect x="478" y="55" width="76" height="18" rx="5" fill="rgba(9,160,157,0.12)" stroke="rgba(9,160,157,0.35)" strokeWidth="0.5"/>
        <circle cx="488" cy="64" r="2.5" fill="var(--ins-status-success-fg)"/>
        <text x="496" y="67" fontFamily="Geist Mono, monospace" fontSize="9" fill="var(--ins-text-highlight)" fontWeight="500">AI active</text>

        {/* Section title row */}
        <text x="68" y="112" fontFamily="Geist Mono,monospace" fontSize="10" fill="var(--ins-text-body)" letterSpacing="1.5">CONVERSION FUNNEL · LAST 90 DAYS</text>
        <text x="552" y="112" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-highlight)" letterSpacing="1">▲ Pipeline +28%</text>

        {/* Funnel bars */}
        {funnel.map((stage, i) => {
          const barY = 144 + i * (barH + 16);
          const barX = 310 - stage.width / 2;
          const textColor = stage.fill >= 0.55 ? 'var(--ins-surface-page)' : 'var(--ins-color-gray-100)';
          return (
            <g key={i}>
              <rect x={barX} y={barY} width={stage.width} height={barH} rx="5" fill={`rgba(14,196,193,${stage.fill})`}/>
              {/* Right-anchored "Stage · Value" */}
              <text
                x={barX + stage.width - 14}
                y={barY + barH / 2 + 4}
                textAnchor="end"
                fontFamily="Geist,sans-serif"
                fontSize="13"
                fontWeight="600"
                fill={textColor}
              >
                {stage.label} · {stage.value}
              </text>
              {/* Conversion arrow text below bar (centered, uses next stage's conv) */}
              {i < funnel.length - 1 && funnel[i + 1].conv && (
                <text
                  x="310"
                  y={barY + barH + 13}
                  textAnchor="middle"
                  fontFamily="Geist Mono,monospace"
                  fontSize="9"
                  fill="var(--ins-text-body)"
                >
                  {funnel[i + 1].conv}
                </text>
              )}
            </g>
          );
        })}

        {/* Footer summary */}
        <text x="552" y="412" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)" letterSpacing="1">5 stages · 0.25% top-to-won · 32-day cycle</text>
      </g>

      {/* Floating sparkline KPI card — bottom-left, partially overlapping */}
      <g transform="translate(14, 358)">
        <rect x="0" y="0" width="200" height="158" rx="14" fill="rgba(15,20,25,0.97)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="14" y="22" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)" letterSpacing="1.5">KPI TRENDS · 8 WEEKS</text>

        {sparklines.map((s, i) => {
          const rowY = 36 + i * 36;
          const sparkX = 56;
          const sparkY = rowY;
          const sparkW = 90;
          const sparkH = 22;
          return (
            <g key={s.label}>
              <text
                x="14"
                y={rowY + 14}
                fontFamily="Geist Mono,monospace"
                fontSize="9"
                fontWeight="600"
                fill="var(--ins-color-gray-100)"
                letterSpacing="1"
              >{s.label}</text>
              <path
                d={sparkPath(s.data, sparkX, sparkY, sparkW, sparkH)}
                stroke="var(--ins-text-highlight)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx={sparkX + sparkW}
                cy={sparkLast(s.data, sparkY, sparkH)}
                r="2.5"
                fill="var(--ins-text-highlight)"
              />
              <text
                x="186"
                y={rowY + 10}
                textAnchor="end"
                fontFamily="Geist Mono,monospace"
                fontSize="9"
                fontWeight="600"
                fill="var(--ins-color-gray-100)"
              >{s.cur}</text>
              <text
                x="186"
                y={rowY + 22}
                textAnchor="end"
                fontFamily="Geist Mono,monospace"
                fontSize="8"
                fill={s.color}
              >{s.delta}</text>
            </g>
          );
        })}

        {/* Footer */}
        <text x="14" y="148" fontFamily="Geist Mono,monospace" fontSize="8" fill="var(--ins-text-body)">All trending in your favor</text>
      </g>

      {/* Floating AI insight card — bottom-right, partially overlapping */}
      <g transform="translate(390,420)">
        <rect x="0" y="0" width="220" height="84" rx="14" fill="rgba(15,20,25,0.97)" stroke="rgba(9,160,157,0.45)" strokeWidth="1"/>
        <g transform="translate(16,16)">
          <rect x="0" y="0" width="22" height="22" rx="6" fill="rgba(9,160,157,0.18)" stroke="rgba(9,160,157,0.4)" strokeWidth="0.5"/>
          <text x="11" y="16" textAnchor="middle" fontFamily="Geist Mono,monospace" fontSize="10" fontWeight="600" fill="var(--ins-text-highlight)">AI</text>
        </g>
        <text x="48" y="26" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-highlight)" fontWeight="500" letterSpacing="1">INSIGHT · LIVE</text>
        <text x="48" y="46" fontFamily="Geist,sans-serif" fontSize="12" fill="var(--ins-color-gray-100)" fontWeight="500">Lead capture hit 6.6% —</text>
        <text x="48" y="62" fontFamily="Geist,sans-serif" fontSize="12" fill="var(--ins-color-gray-100)" fontWeight="500">top of funnel widening.</text>
        <text x="48" y="78" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)">CAC −16% · ROAS +33% →</text>
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section style={{padding:'120px 0 80px',position:'relative',overflow:'hidden'}}>
      {/* Background glows — copied from AI Chat hero for visual parity */}
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 72% 50%,rgba(9,160,157,0.09) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 20% 50%,rgba(59,31,94,0.12) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>

      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',position:'relative'}}>
        <div data-hero-grid style={{
          display:'grid',
          gridTemplateColumns:'1.05fr 1fr',
          gap:'56px',
          alignItems:'center',
        }}>
            {/* Left: text */}
            <div>
              <h1 className="fu0 ins-text-display-xl">
                <span style={{color:'var(--ins-text-heading-soft)'}}>AI analytics for </span>
                <span style={{color:'var(--ins-text-highlight)'}}>CMOs &amp; Marketers</span>
              </h1>

              <p className="fu2 ins-text-body-xl" style={{marginBottom:'36px',
                maxWidth:'520px'}}>
                Live answers about every campaign, channel, and dollar of spend. Ask in plain English — ROAS, CAC, attribution, funnel — and stop the Monday-morning data dumps.
              </p>

              <div className="fu3">
                <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
                  Start for Free
                </Button>
              </div>
            </div>

          {/* Right: static SVG illustration */}
          <div className="fu2" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <MarketingHeroIllustration/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── INTEGRATIONS STRIP (marquee) ── */
/* ── PAIN POINTS ── */
function PainPoints() {
  const pains = [
    {
      title: 'Attribution lives in three tools',
      body: 'Google Analytics, the ads platforms, and the CRM each report a different number. Every Monday review starts with deciding which one to trust this week.',
    },
    {
      title: 'ROAS dashboards refresh weekly',
      body: 'Spend decisions get made on data that\'s four to seven days old. By the time a campaign tanks, most of the budget is already burnt.',
    },
    {
      title: 'Funnel breaks are invisible',
      body: 'MQL → SQL drop-offs only surface in the monthly QBR. By then the lost pipeline is already a hole in next quarter\'s number — and nobody saw it forming.',
    },
    {
      title: 'Pipeline credit gets fought over',
      body: 'Sales says marketing took the leads. Marketing says sales fumbled them. Nobody can prove either side because the attribution model lives in a slide deck.',
    },
    {
      title: 'Campaign learnings come too late',
      body: 'By the time the analyst pulls cohort lift for the Q3 campaign, Q4 has already kicked off — repeating mistakes nobody had time to surface in time.',
    },
    {
      title: 'CAC creep shows up at quarter-end',
      body: 'Channel-level CAC drift hides under blended numbers until close. The board asks why CAC is up 30% — and the answer takes a week.',
    },
  ];

  return (
    <section style={{padding:'120px 0 100px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'64px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(248,113,113,.08)',border:'1px solid rgba(248,113,113,.22)',borderRadius:'999px',marginBottom:'16px'}}>
            <span style={{color:'var(--ins-status-error-fg)',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-status-error-fg)',fontFamily:'Geist Mono,monospace'}}>The Problem</span>
          </div>
          <h2 className="ins-text-display" style={{marginBottom:'14px',textWrap:'balance'}}>
            Marketing decisions wait on the data team
          </h2>
          <p className="ins-text-body-lg" style={{maxWidth:'480px',margin:'0 auto'}}>
            Sound familiar? These are the problems Insightis eliminates.
          </p>
        </div>

        <PainPointGrid items={pains} />
      </div>
    </section>
  );
}

/* ── MID CTA ── */
function MidCTA() {
  return (
    <section className="pt-16 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="fade-up is-visible">
          <BottomCTA
            variant="text"
            title={<>Skip the Monday review. <BottomCTA.Highlight>Start asking.</BottomCTA.Highlight></>}
            ctaLabel="Get started for free"
          />
        </div>
      </div>
    </section>
  );
}

/* ── HOW INSIGHTIS HELPS ── */
/* ── QUESTIONS FOR REVOPS ── */
/* ── HOW IT WORKS ── */
function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Stitch every channel together',
      body: 'Pipe every ad platform, GA4, HubSpot, and CRM into one live feed. Spend and revenue stay reconciled.',
      example: 'Google Ads + Meta → live feed',
    },
    {
      n: '02',
      title: 'Lock in one attribution model',
      body: 'Encode CAC, ROAS, attribution, and funnel stages in a shared layer. Every team pulls the same number.',
      example: 'ROAS + CAC → one model',
    },
    {
      n: '03',
      title: 'Ship answers in seconds',
      body: 'Type a campaign question. Insightis renders a live chart with sources cited. No analyst, no dashboard wait.',
      example: '"Best ROAS?" → LinkedIn 6.3×',
    },
    {
      n: '04',
      title: 'Reallocate spend the same day',
      body: 'Spot a tanking channel mid-campaign? Shift budget the same day. Catch a breakout? Double down on it.',
      example: 'Meta CAC ↑ → shift to LinkedIn',
    },
  ];

  return (
    <section style={{padding:'120px 0 140px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'64px'}}>
          <SectionHeader
            eyebrow="The Solution"
            title="Wire channels. Anchor metrics. Steer spend."
            lede="Three moves from disconnected channel data to live decisions on every dollar."
            sparkle
            size="lg"
          />
        </div>

        {/* Horizontal stepper */}
        <StepsProcess steps={steps} />
      </div>
    </section>
  );
}

/* ── BEFORE / AFTER ── */
function BeforeAfter() {
  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'52px'}}>
          <SectionHeader
            eyebrow="The old way VS Insightis"
            title="Campaign answers at the speed of the spend"
            lede="Trade reviews for live attribution — react before the budget is gone."
            sparkle
          />
        </div>

        <ComparisonCards
          before={{
            label: 'Before Insightis',
            items: [
              'Performance reports take all morning to build',
              'Attribution depends on which tool you trust',
              'Channel ROAS lives in five spreadsheets',
              'MQL → SQL handoff settled by Slack argument',
              'Budget reallocations wait for the Monday review',
              'CAC anomalies surface at month-end close',
            ],
          }}
          after={{
            label: 'With Insightis',
            items: [
              'Live performance the moment the spend lands',
              'One unified attribution model everyone trusts',
              'Channel ROAS surfaced in a single ask',
              'MQL → SQL settled by data, not a Slack thread',
              'Budget moves the day the signal hits',
              'CAC drift flagged the same day it happens',
            ],
          }}
        />

        <div style={{textAlign:'center',marginTop:'36px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'40px',fontWeight:500,color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',lineHeight:1,flexShrink:0}}>8×</span>
            <span className="ins-text-body-lg" style={{whiteSpace:'nowrap'}}>faster campaign answers. Zero data-team handoffs.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const items = [
    {
      q: 'How does Insightis handle multi-touch attribution?',
      a: 'Insightis supports first-touch, last-touch, linear, time-decay, and custom-weight attribution models — applied consistently across every channel. Define the model once in the semantic layer; every question respects it from then on.',
    },
    {
      q: 'Will it work with our existing Google Ads, Meta, and LinkedIn setup?',
      a: 'Yes. Native connectors for Google Ads, Meta, LinkedIn, TikTok, and 200+ other ad platforms. Spend, impressions, clicks, and conversions sync automatically — no UTM-tagging gymnastics or manual exports required.',
    },
    {
      q: 'How quickly can it surface a CAC anomaly across channels?',
      a: 'Same day. Insightis flags channel-level CAC drift the moment it crosses your defined threshold — by Slack, email, or in the AI Chat insights feed. No more month-end surprises buried under blended numbers.',
    },
    {
      q: 'Does this replace our existing analytics stack (GA4, Adobe, Mixpanel)?',
      a: 'No, it sits on top. Insightis reads from your existing analytics tools and unifies them with CRM and billing data — so you can ask "how many MQLs from paid social converted to paying customers?" in a single question.',
    },
    {
      q: 'What about marketing data privacy and PII?',
      a: 'PII fields can be masked, hashed, or excluded from queries via field-level access controls. SOC 2 Type II certified, GDPR-aligned, with full audit logs on every query and share. Your data never leaves your warehouse.',
    },
    {
      q: 'How long until our marketing team uses it daily?',
      a: 'Most marketing teams have campaigns wired up and are asking real questions within a day. Setting up custom attribution models takes another half-day if your business needs go beyond the first-touch and last-touch defaults.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'880px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'52px'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace'}}>FAQ</span>
          </div>
          <h2 className="ins-text-display mb-3">
            Questions every CMO asks first
          </h2>
          <p className="ins-text-body-lg" style={{maxWidth:'560px',margin:'0 auto'}}>
            What attribution, integrations, and time-to-value look like once Insightis is in the marketing stack.
          </p>
        </div>

        <FAQAccordion items={items} />
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section style={{paddingTop:'32px',paddingBottom:'64px',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <BottomCTA
          variant="form"
          title={<>Stop building <BottomCTA.Highlight>reports.</BottomCTA.Highlight> Start getting <BottomCTA.Highlight>answers.</BottomCTA.Highlight></>}
          inputPlaceholder="Show me CAC by channel..."
          ctaLabel="Get Started"
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
      <main>
      <Hero />
      <IntegrationsStrip />
      <PainPoints />
      <HowItWorks />
      <MidCTA />
      <BeforeAfter />
      <FAQ />
      <BottomCTASection />
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
