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
          <div style={{flex:1,background:'rgba(255,255,255,.04)',borderRadius:'4px',height:'22px',position:'relative',overflow:'hidden'}}>
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
        {labels && labels.map((l,i) => <text key={i} x={coords[i].x} y={h-1} textAnchor="middle" style={{fontSize:'9px',fill:'#8AA6B3',fontFamily:'Geist Mono,monospace'}}>{l}</text>)}
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
function FoundersHeroIllustration() {
  const cohorts = [
    { label: "Q1 '25", v: [100, 94, 88, 82, 78, 74] },
    { label: "Q2 '25", v: [100, 95, 90, 84, 80, null] },
    { label: "Q3 '25", v: [100, 96, 91, 86, null, null] },
    { label: "Q4 '25", v: [100, 97, 93, null, null, null] },
    { label: "Q1 '26", v: [100, null, null, null, null, null] },
  ];
  const months = ['M0', 'M1', 'M3', 'M6', 'M9', 'M12'];
  const cellW = 65, cellH = 26, gapX = 4, gapY = 6;
  const xStart = 140, yStart = 168;

  const cellFill = (v) => {
    if (v == null) return 'rgba(255,255,255,0.04)';
    if (v >= 95) return 'rgba(14,196,193,0.85)';
    if (v >= 85) return 'rgba(14,196,193,0.6)';
    if (v >= 75) return 'rgba(14,196,193,0.38)';
    return 'rgba(14,196,193,0.22)';
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
        <text x="310" y="66" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="var(--ins-text-body)">Company health · Live</text>
        <rect x="478" y="55" width="76" height="18" rx="5" fill="rgba(9,160,157,0.12)" stroke="rgba(9,160,157,0.35)" strokeWidth="0.5"/>
        <circle cx="488" cy="64" r="2.5" fill="var(--ins-status-success-fg)"/>
        <text x="496" y="67" fontFamily="Geist Mono, monospace" fontSize="9" fill="var(--ins-text-highlight)" fontWeight="500">AI active</text>

        {/* Section title row */}
        <text x="68" y="112" fontFamily="Geist Mono,monospace" fontSize="10" fill="var(--ins-text-body)" letterSpacing="1.5">COHORT RETENTION</text>
        <text x="552" y="112" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-highlight)" letterSpacing="1">▲ Net retention 112%</text>

        {/* Column headers */}
        {months.map((m, j) => (
          <text key={m}
            x={xStart + j * (cellW + gapX) + cellW / 2}
            y="142"
            textAnchor="middle"
            fontFamily="Geist Mono,monospace"
            fontSize="10"
            fill="#8AA6B3"
            fontWeight="500"
          >{m}</text>
        ))}

        {/* Cohort rows */}
        {cohorts.map((c, i) => (
          <g key={c.label}>
            <text
              x="124"
              y={yStart + i * (cellH + gapY) + cellH / 2 + 4}
              textAnchor="end"
              fontFamily="Geist Mono,monospace"
              fontSize="10"
              fill="var(--ins-text-body)"
              fontWeight="500"
            >{c.label}</text>
            {c.v.map((val, j) => (
              <g key={j}>
                <rect
                  x={xStart + j * (cellW + gapX)}
                  y={yStart + i * (cellH + gapY)}
                  width={cellW}
                  height={cellH}
                  rx="4"
                  fill={cellFill(val)}
                />
                {val != null && (
                  <text
                    x={xStart + j * (cellW + gapX) + cellW / 2}
                    y={yStart + i * (cellH + gapY) + cellH / 2 + 4}
                    textAnchor="middle"
                    fontFamily="Geist Mono,monospace"
                    fontSize="10"
                    fill={val >= 85 ? 'var(--ins-surface-page)' : 'var(--ins-color-gray-100)'}
                    fontWeight="600"
                  >{val}%</text>
                )}
              </g>
            ))}
          </g>
        ))}

        {/* Summary line */}
        <text x="68" y="412" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)" letterSpacing="1">142 customers · 5 cohorts · M0–M12 retention</text>
      </g>

      {/* Floating donut card — bottom-left, partially overlapping */}
      <g transform="translate(14, 358)">
        <rect x="0" y="0" width="180" height="158" rx="14" fill="rgba(15,20,25,0.97)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="14" y="24" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)" letterSpacing="1.5">REVENUE BY SEGMENT</text>

        {/* Donut */}
        <g transform="translate(46, 92) rotate(-90)">
          <circle r="22" fill="none" stroke="var(--ins-text-highlight)" strokeWidth="14" strokeDasharray="69.12 138.23" strokeDashoffset="0"/>
          <circle r="22" fill="none" stroke="#34D399" strokeWidth="14" strokeDasharray="41.47 138.23" strokeDashoffset="-69.12"/>
          <circle r="22" fill="none" stroke="var(--ins-text-body)" strokeWidth="14" strokeDasharray="27.65 138.23" strokeDashoffset="-110.59"/>
        </g>
        {/* Donut center */}
        <text x="46" y="89" textAnchor="middle" fontFamily="Geist Mono,monospace" fontSize="8" fill="var(--ins-text-body)">ARR</text>
        <text x="46" y="103" textAnchor="middle" fontFamily="Geist,sans-serif" fontSize="12" fontWeight="600" fill="var(--ins-color-gray-100)">$24M</text>

        {/* Legend */}
        <g transform="translate(86, 56)">
          <circle cx="0" cy="0" r="3" fill="var(--ins-text-highlight)"/>
          <text x="9" y="3" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-color-gray-100)">Enterprise</text>
          <text x="84" y="3" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)">50%</text>

          <circle cx="0" cy="22" r="3" fill="#34D399"/>
          <text x="9" y="25" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-color-gray-100)">Mid-market</text>
          <text x="84" y="25" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)">30%</text>

          <circle cx="0" cy="44" r="3" fill="var(--ins-text-body)"/>
          <text x="9" y="47" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-color-gray-100)">SMB</text>
          <text x="84" y="47" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)">20%</text>
        </g>

        {/* Footer */}
        <text x="14" y="146" fontFamily="Geist Mono,monospace" fontSize="8" fill="var(--ins-text-body)">ACV $42K · 142 customers</text>
      </g>

      {/* Floating AI insight card — bottom-right, partially overlapping */}
      <g transform="translate(390,420)">
        <rect x="0" y="0" width="220" height="84" rx="14" fill="rgba(15,20,25,0.97)" stroke="rgba(9,160,157,0.45)" strokeWidth="1"/>
        <g transform="translate(16,16)">
          <rect x="0" y="0" width="22" height="22" rx="6" fill="rgba(9,160,157,0.18)" stroke="rgba(9,160,157,0.4)" strokeWidth="0.5"/>
          <text x="11" y="16" textAnchor="middle" fontFamily="Geist Mono,monospace" fontSize="10" fontWeight="600" fill="var(--ins-text-highlight)">AI</text>
        </g>
        <text x="48" y="26" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-highlight)" fontWeight="500" letterSpacing="1">INSIGHT · LIVE</text>
        <text x="48" y="46" fontFamily="Geist,sans-serif" fontSize="12" fill="var(--ins-color-gray-100)" fontWeight="500">Q3 cohort retains 12 pp</text>
        <text x="48" y="62" fontFamily="Geist,sans-serif" fontSize="12" fill="var(--ins-color-gray-100)" fontWeight="500">better — onboarding wins.</text>
        <text x="48" y="78" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)">Enterprise mix +8 pp →</text>
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
                <span style={{color:'var(--ins-text-highlight)'}}>Founders &amp; CEOs</span>
              </h1>

              <p className="fu2" style={{
                fontSize:'clamp(16px,1.25vw,19px)',
                color:'var(--ins-text-body)',
                lineHeight:1.6,
                marginBottom:'36px',
                maxWidth:'520px',
              }}>
                Strategic answers in seconds. Ask in plain English — runway, ARR growth, NRR, burn — and walk into your board meeting with live numbers, not last week's deck.
              </p>

              <div className="fu3">
                <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
                  Start for Free
                </Button>
              </div>
            </div>

          {/* Right: static SVG illustration */}
          <div className="fu2" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <FoundersHeroIllustration/>
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
      title: 'Board prep eats your week',
      body: 'Pulling ARR, runway, NRR, and burn for the deck means stitching exports from finance, ops, and sales — by Sunday they\'re already stale.',
    },
    {
      title: 'Numbers never agree across teams',
      body: 'Finance says $4.2M. RevOps says $4.4M. The deck rounds to $4.3M — every team calculates ARR a slightly different way, and you sign off on all three.',
    },
    {
      title: 'Strategic questions wait for days',
      body: 'When an investor asks why NRR slipped 3 points, you need the answer in the call — not after a Jira ticket and a tired analyst.',
    },
    {
      title: 'No live picture of company health',
      body: 'Dashboards refresh weekly at best. Between updates the board, finance, and you all guess at what\'s happening.',
    },
    {
      title: 'Forecasting always needs an analyst',
      body: 'Building a credible 12-month plan means cornering an analyst, defending the assumptions, and waiting two weeks. The model lands already out of date.',
    },
    {
      title: 'Cohort signals get lost in tabs',
      body: 'Retention curves, magic number, CAC payback — they live in five spreadsheets and BI tools. The pattern is buried.',
    },
  ];

  return (
    <section style={{padding:'120px 0 100px',background:'linear-gradient(180deg,var(--ins-surface-page) 0%,var(--ins-surface-container) 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'64px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(248,113,113,.08)',border:'1px solid rgba(248,113,113,.22)',borderRadius:'999px',marginBottom:'16px'}}>
            <span style={{color:'var(--ins-status-error-fg)',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-status-error-fg)',fontFamily:'Geist Mono,monospace'}}>The Problem</span>
          </div>
          <h2 className="ins-text-display" style={{marginBottom:'14px',textWrap:'balance'}}>
            Founders fly blind between board meetings
          </h2>
          <p style={{fontSize:'16px',color:'var(--ins-text-body)',maxWidth:'480px',margin:'0 auto',lineHeight:1.65}}>
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
            title={<>Skip the board prep marathon. <BottomCTA.Highlight>Start asking.</BottomCTA.Highlight></>}
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
      title: 'Plug in your entire revenue stack',
      body: 'Pull in CRM, billing, accounting, and your warehouse in one click. Every source stays in sync — no late-night CSV exports.',
      example: 'CRM + Billing → in sync',
    },
    {
      n: '02',
      title: 'Settle the math once and for all',
      body: 'Lock in ARR, NRR, Runway, and Burn Multiple in a semantic layer. Finance, the board, and you read the same number.',
      example: 'ARR + NRR → one source',
    },
    {
      n: '03',
      title: 'Strategic answers, fast',
      body: 'Type the question on your mind and Insightis returns a chart with sources cited. No analyst, no waiting.',
      example: '"How much runway?" → 18 mos',
    },
    {
      n: '04',
      title: 'Present with confidence',
      body: 'Walk into board meetings with live numbers — not month-old slides. Answer deep-dive questions on the spot.',
      example: 'Board Q&A → answered live',
    },
  ];

  return (
    <section style={{padding:'120px 0 140px',background:'linear-gradient(180deg,var(--ins-surface-container) 0%,#101620 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'64px'}}>
          <SectionHeader
            eyebrow="The Solution"
            title="Wire it in. Lock it down. Run the company."
            lede="Three steps from scattered systems to numbers fit for the boardroom."
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
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,var(--ins-surface-page) 0%,var(--ins-surface-container) 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'52px'}}>
          <SectionHeader
            eyebrow="The old way VS Insightis"
            title="Two ways to run the company"
            lede="Same metrics, two operating speeds — only one keeps pace with the board."
            sparkle
          />
        </div>

        <ComparisonCards
          before={{
            label: 'Before Insightis',
            items: [
              'Building the board deck eats five business days',
              'Every deck cites a different ARR',
              'Forecasts only refresh at quarter close',
              'Every strategic ask sits in the analyst queue',
              'Investors are reading numbers from the last close',
              'Cohort signals hide across five BI tools',
            ],
          }}
          after={{
            label: 'With Insightis',
            items: [
              'Boardroom-ready answers in seconds',
              'One agreed ARR every team trusts',
              'Forecasts built on live company data',
              'Strategic asks answered in the meeting itself',
              'Investor numbers refreshed this morning',
              'Cohort patterns surface from a single ask',
            ],
          }}
        />

        <div style={{textAlign:'center',marginTop:'36px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'40px',fontWeight:500,color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',lineHeight:1,flexShrink:0}}>7×</span>
            <span style={{fontSize:'15px',color:'var(--ins-text-body)',whiteSpace:'nowrap'}}>faster strategic answers. Zero analyst handoffs.</span>
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
      q: 'How accurate are the numbers compared to what finance reports?',
      a: 'Identical. Insightis pulls from the same source-of-truth systems your finance team uses — your warehouse, your billing system, your CRM. The numbers reconcile down to the cent, and every answer cites the source so anyone can trace it back.',
    },
    {
      q: 'Can investors and the board see the same data we see?',
      a: 'Yes. Generate a board-ready link from any chart with view-only access, or export a static snapshot for the deck. Live links update in real time when new data arrives, so the board always sees the freshest read — never last month\'s numbers.',
    },
    {
      q: 'How does Insightis fit alongside our finance team and existing tools?',
      a: 'Insightis amplifies finance, it does not replace it. The team continues to own metric definitions in the semantic layer; you and the rest of the company query against those certified definitions. Everyone reads the same number, every time.',
    },
    {
      q: 'Can we trust the AI for board-level decisions?',
      a: 'Every answer shows its work — the underlying SQL, the data sources, and the time range. Nothing is generated from public benchmarks; only your real numbers. If an answer surprises you, the trace back to source is one click away.',
    },
    {
      q: 'What happens to our metric definitions as we scale or pivot?',
      a: 'The semantic layer is versioned. When ARR definition changes — say, after acquiring a new product line — historical answers reflect both old and new definitions. No more retroactive number changes that confuse the board between meetings.',
    },
    {
      q: 'What\'s the security and compliance posture for sharing financials?',
      a: 'SOC 2 Type II, encryption at rest and in transit, single sign-on with MFA, granular role-based access. Your data never leaves your warehouse — Insightis queries on top of it. Audit logs track every view and every share.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,var(--ins-surface-container) 0%,#101620 100%)'}}>
      <div style={{maxWidth:'880px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'52px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'14px'}}>
            <span style={{color:'var(--ins-button-primary-bg-hover)',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-button-primary-bg-hover)',fontFamily:'Geist Mono,monospace'}}>FAQ</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:500,color:'var(--ins-text-body)',letterSpacing:'-.03em',marginBottom:'12px'}}>
            What founders and CEOs ask first
          </h2>
          <p style={{fontSize:'16px',color:'var(--ins-text-body)',maxWidth:'560px',margin:'0 auto',lineHeight:1.65}}>
            Six things on every founder’s mind before bringing Insightis into the boardroom.
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
          inputPlaceholder="What company question do you need answered?..."
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
