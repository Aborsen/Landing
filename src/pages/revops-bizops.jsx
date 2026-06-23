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
              style={{fontSize:c.w>200?'12px':'11px',fill:'rgba(255,255,255,.8)',fontFamily:'var(--ins-font-family-mono)'}}>
              {c.item.label}
            </text>
            {c.h>60 && <text x={c.x+c.w/2} y={c.y+c.h/2+18} textAnchor="middle" dominantBaseline="middle"
              style={{fontSize:'var(--ins-font-size-20)',fill:'#fff',fontFamily:'var(--ins-font-family-mono)',fontWeight:500}}>
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
    <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-8)',margin:'12px 0'}}>
      <svg viewBox="0 0 180 180" style={{width:'240px',height:'240px',flexShrink:0}}>
        {paths.map((p,i) => <path key={i} d={p.d} fill={p.color} opacity=".85"/>)}
      </svg>
      <div style={{display:'flex',flexDirection:'column',gap:'14px',flex:1}}>
        {paths.map((p,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{width:'12px',height:'12px',borderRadius:'3px',background:p.color,flexShrink:0}}/>
            <span style={{fontSize:'var(--ins-font-size-14)',color:'var(--ins-text-body)',fontFamily:'var(--ins-font-family-mono)',flex:1}}>{p.label}</span>
            <span style={{fontSize:'var(--ins-font-size-14)',color:'var(--ins-color-gray-100)',fontFamily:'var(--ins-font-family-mono)',fontWeight:500}}>{p.pct}%</span>
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
          <span style={{fontSize:'var(--ins-font-size-12)',color:'var(--ins-text-body)',fontFamily:'var(--ins-font-family-mono)',minWidth:'180px',textAlign:'right',flexShrink:0}}>{b.label}</span>
          <div style={{flex:1,background:'var(--ins-color-white-a-04)',borderRadius:'var(--ins-radius-4)',height:'22px',position:'relative',overflow:'hidden'}}>
            <div style={{
              width:`${(Math.abs(b.value)/maxVal)*100}%`,
              height:'100%',borderRadius:'var(--ins-radius-4)',
              background: b.color || (b.value < 0 ? 'rgba(220,80,80,.7)' : 'rgba(9,160,157,.6)'),
            }}/>
          </div>
          <span style={{fontSize:'var(--ins-font-size-12)',fontFamily:'var(--ins-font-family-mono)',color: b.value < 0 ? '#E06060' : 'var(--ins-text-highlight)',minWidth:'60px',flexShrink:0}}>{b.display}</span>
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
        {labels && labels.map((l,i) => <text key={i} x={coords[i].x} y={h-1} textAnchor="middle" style={{fontSize:'9px',fill:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)'}}>{l}</text>)}
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
function RevOpsHeroIllustration() {
  return (
    <svg viewBox="0 0 620 540" width="100%" style={{maxWidth:'580px',height:'auto',display:'block',filter:'drop-shadow(0 30px 60px rgba(0,0,0,0.55))'}} aria-hidden="true">
      <defs>
        <linearGradient id="ro_cardBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10171E"/>
          <stop offset="100%" stopColor="var(--ins-surface-page)"/>
        </linearGradient>
        <linearGradient id="ro_kpiBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A2128" stopOpacity="0.95"/>
          <stop offset="100%" stopColor="#0F1419" stopOpacity="0.95"/>
        </linearGradient>
        <linearGradient id="ro_chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ins-text-highlight)" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="var(--ins-text-highlight)" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="ro_chartStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--ins-text-highlight)"/>
          <stop offset="100%" stopColor="#34D399"/>
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
        <text x="310" y="66" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="var(--ins-text-body)">Revenue overview · Last 30 days</text>
        {/* AI active badge */}
        <rect x="478" y="55" width="76" height="18" rx="5" fill="rgba(9,160,157,0.12)" stroke="rgba(9,160,157,0.35)" strokeWidth="0.5"/>
        <circle cx="488" cy="64" r="2.5" fill="var(--ins-status-success-fg)"/>
        <text x="496" y="67" fontFamily="Geist Mono, monospace" fontSize="9" fill="var(--ins-text-highlight)" fontWeight="500">AI active</text>

        {/* KPI tiles */}
        <g>
          <rect x="68" y="100" width="156" height="86" rx="11" fill="url(#ro_kpiBg)" stroke="rgba(255,255,255,0.06)"/>
          <text x="84" y="124" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)" letterSpacing="1.5">ARR</text>
          <text x="84" y="156" fontFamily="Geist,sans-serif" fontSize="24" fill="var(--ins-color-gray-100)" fontWeight="600">$4.2M</text>
          <path d="M84 173 L88 168 L92 173" stroke="#34D399" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="98" y="175" fontFamily="Geist Mono,monospace" fontSize="10" fill="#34D399" fontWeight="500">+12.4%</text>

          <rect x="232" y="100" width="156" height="86" rx="11" fill="url(#ro_kpiBg)" stroke="rgba(255,255,255,0.06)"/>
          <text x="248" y="124" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)" letterSpacing="1.5">PIPELINE</text>
          <text x="248" y="156" fontFamily="Geist,sans-serif" fontSize="24" fill="var(--ins-color-gray-100)" fontWeight="600">$8.7M</text>
          <path d="M248 173 L252 168 L256 173" stroke="#34D399" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="262" y="175" fontFamily="Geist Mono,monospace" fontSize="10" fill="#34D399" fontWeight="500">+8.2%</text>

          <rect x="396" y="100" width="156" height="86" rx="11" fill="url(#ro_kpiBg)" stroke="rgba(255,255,255,0.06)"/>
          <text x="412" y="124" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)" letterSpacing="1.5">WIN RATE</text>
          <text x="412" y="156" fontFamily="Geist,sans-serif" fontSize="24" fill="var(--ins-color-gray-100)" fontWeight="600">32.4%</text>
          <path d="M412 168 L416 173 L420 168" stroke="var(--ins-status-error-fg)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="426" y="175" fontFamily="Geist Mono,monospace" fontSize="10" fill="var(--ins-status-error-fg)" fontWeight="500">-1.8%</text>
        </g>

        {/* Revenue trend label */}
        <text x="68" y="218" fontFamily="Geist Mono,monospace" fontSize="10" fill="var(--ins-text-body)" letterSpacing="1.5">REVENUE TREND</text>
        <text x="552" y="218" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-highlight)" letterSpacing="1">▲ TRENDING UP</text>

        {/* Grid lines */}
        <line x1="68" y1="246" x2="552" y2="246" stroke="rgba(255,255,255,0.04)"/>
        <line x1="68" y1="296" x2="552" y2="296" stroke="rgba(255,255,255,0.04)"/>
        <line x1="68" y1="346" x2="552" y2="346" stroke="rgba(255,255,255,0.04)"/>
        <line x1="68" y1="396" x2="552" y2="396" stroke="rgba(255,255,255,0.06)"/>

        {/* Chart fill */}
        <path d="M 68 380 L 122 360 L 176 350 L 230 320 L 284 312 L 338 290 L 392 278 L 446 258 L 500 238 L 552 220 L 552 396 L 68 396 Z" fill="url(#ro_chartFill)"/>
        {/* Chart line */}
        <path d="M 68 380 L 122 360 L 176 350 L 230 320 L 284 312 L 338 290 L 392 278 L 446 258 L 500 238 L 552 220" stroke="url(#ro_chartStroke)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Data points */}
        <g fill="var(--ins-text-highlight)" stroke="var(--ins-surface-page)" strokeWidth="1.5">
          <circle cx="68" cy="380" r="3"/>
          <circle cx="122" cy="360" r="3"/>
          <circle cx="176" cy="350" r="3"/>
          <circle cx="230" cy="320" r="3"/>
          <circle cx="284" cy="312" r="3"/>
          <circle cx="338" cy="290" r="3"/>
          <circle cx="392" cy="278" r="3"/>
          <circle cx="446" cy="258" r="3"/>
          <circle cx="500" cy="238" r="3"/>
        </g>
        {/* Highlight latest */}
        <circle cx="552" cy="220" r="9" fill="var(--ins-text-highlight)" opacity="0.18"/>
        <circle cx="552" cy="220" r="4.5" fill="var(--ins-text-highlight)" stroke="var(--ins-surface-page)" strokeWidth="2"/>
      </g>

      {/* Floating funnel card — bottom-left, partially overlapping */}
      <g transform="translate(14, 358)">
        <rect x="0" y="0" width="200" height="158" rx="14" fill="rgba(15,20,25,0.97)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="16" y="24" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)" letterSpacing="1.5">PIPELINE FUNNEL</text>
        <rect x="16" y="42" width="164" height="17" rx="3" fill="rgba(14,196,193,0.85)"/>
        <rect x="22" y="66" width="138" height="17" rx="3" fill="rgba(14,196,193,0.62)"/>
        <rect x="30" y="90" width="106" height="17" rx="3" fill="rgba(14,196,193,0.4)"/>
        <rect x="40" y="114" width="70" height="17" rx="3" fill="rgba(14,196,193,0.22)"/>
        <text x="172" y="54" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-color-gray-100)" fontWeight="600">2,400</text>
        <text x="152" y="78" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-color-gray-100)" fontWeight="600">980</text>
        <text x="128" y="102" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)" fontWeight="500">412</text>
        <text x="102" y="126" textAnchor="end" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)" fontWeight="500">133</text>
        <text x="16" y="146" fontFamily="Geist Mono,monospace" fontSize="8" fill="var(--ins-text-body)">Conversion · 5.5%</text>
      </g>

      {/* Floating AI insight card — bottom-right, partially overlapping */}
      <g transform="translate(390,420)">
        <rect x="0" y="0" width="220" height="84" rx="14" fill="rgba(15,20,25,0.97)" stroke="rgba(9,160,157,0.45)" strokeWidth="1"/>
        <g transform="translate(16,16)">
          <rect x="0" y="0" width="22" height="22" rx="6" fill="rgba(9,160,157,0.18)" stroke="rgba(9,160,157,0.4)" strokeWidth="0.5"/>
          <text x="11" y="16" textAnchor="middle" fontFamily="Geist Mono,monospace" fontSize="10" fontWeight="600" fill="var(--ins-text-highlight)">AI</text>
        </g>
        <text x="48" y="26" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-highlight)" fontWeight="500" letterSpacing="1">INSIGHT · LIVE</text>
        <text x="48" y="46" fontFamily="Geist,sans-serif" fontSize="12" fill="var(--ins-color-gray-100)" fontWeight="500">Enterprise pipeline grew</text>
        <text x="48" y="62" fontFamily="Geist,sans-serif" fontSize="12" fill="var(--ins-color-gray-100)" fontWeight="500">23% this quarter.</text>
        <text x="48" y="78" fontFamily="Geist Mono,monospace" fontSize="9" fill="var(--ins-text-body)">2 churn risks flagged →</text>
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section style={{padding:'120px 0 80px',position:'relative',overflow:'hidden'}}>
      {/* Background glows — copied from AI Chat hero for visual parity */}
      <div className="ins-hero-glow" />

      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',position:'relative'}}>
        <div data-hero-grid style={{
          display:'grid',
          gridTemplateColumns:'1.05fr 1fr',
          gap:'var(--ins-size-14)',
          alignItems:'center',
        }}>
            {/* Left: text */}
            <div>
              <h1 className="fu0 ins-text-display-xl">
                <span style={{color:'var(--ins-text-heading-soft)'}}>AI analytics for </span>
                <span style={{color:'var(--ins-text-highlight)'}}>RevOps &amp; BizOps</span>
              </h1>

              <p className="fu2 ins-text-body-xl" style={{marginBottom:'36px',
                maxWidth:'520px'}}>
                Ask revenue questions in plain English. Insightis answers instantly from your CRM, billing, and product data — no SQL, no dashboards to build.
              </p>

              <div className="fu3">
                <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
                  Start for free
                </Button>
              </div>
            </div>

          {/* Right: static SVG illustration */}
          <div className="fu2" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <RevOpsHeroIllustration/>
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
      title: 'Pipeline visibility takes days',
      body: 'Pulling Salesforce, cross-referencing Stripe, reconciling in spreadsheets — by the time the report is done, the data is stale.',
    },
    {
      title: 'Revenue metrics never match',
      body: 'Marketing says MRR is $48K. Finance says $46.5K. The board says $47.2K — nobody agrees because every team calculates it differently.',
    },
    {
      title: 'Forecasting is pure guesswork',
      body: 'Without real-time pipeline data correlated with historical close rates, revenue forecasts become quarterly guesses — not data-driven calls.',
    },
    {
      title: 'Cross-source analysis is impossible',
      body: 'Correlating CRM with billing and product usage requires SQL, an analyst, and a two-week turnaround — by then the question has moved on.',
    },
    {
      title: 'Reports are always out of date',
      body: 'By the time a dashboard is built and shared, the data has shifted. Static reports create a false sense of confidence in the room.',
    },
    {
      title: 'Leadership questions go unanswered',
      body: 'When the CEO asks "Why did churn spike?" you need the answer in seconds — not after a Jira ticket and a tired weekend analyst.',
    },
  ];

  return (
    <section style={{padding:'120px 0 100px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'var(--ins-size-16)'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(248,113,113,.08)',border:'1px solid rgba(248,113,113,.22)',borderRadius:'999px',marginBottom:'var(--ins-size-4)'}}>
            <span style={{color:'var(--ins-status-error-fg)',fontSize:'var(--ins-font-size-12)'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-status-error-fg)',fontFamily:'var(--ins-font-family-mono)'}}>The Problem</span>
          </div>
          <h2 className="ins-text-display" style={{marginBottom:'14px',textWrap:'balance'}}>
            RevOps is drowning in manual work
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
            title={<>Stop reconciling spreadsheets. <BottomCTA.Highlight>Start asking.</BottomCTA.Highlight></>}
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
      title: 'Connect every revenue source',
      body: 'Salesforce, HubSpot, Stripe, warehouse — wire them in once. Insightis keeps everything in sync, no ETL needed.',
      example: 'Salesforce + Stripe → unified',
    },
    {
      n: '02',
      title: 'Certify the metrics that matter',
      body: 'Define MRR, Win Rate, CAC once. Trust them everywhere. The semantic layer ends the spreadsheet debate forever.',
      example: 'MRR + CAC → certified ✓',
    },
    {
      n: '03',
      title: 'Ask anything in plain English',
      body: 'Type a revenue question, get a live chart with sources cited. Drop it into Slack — no analyst queue.',
      example: '"Why did MRR drop?" → @MRR −$1.2K',
    },
    {
      n: '04',
      title: 'Run pipelines on live data',
      body: 'Show up to QBRs and forecast calls with charts that update in the room. Argue strategy, not whose number is correct.',
      example: 'QBR deck → live, no rebuild',
    },
  ];

  return (
    <section style={{padding:'120px 0 140px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-16)'}}>
          <SectionHeader
            eyebrow="The Solution"
            title="Connect data. Certify metrics. Ask anything."
            lede="Three steps from raw revenue data to answers your team can act on."
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
            title="Pipeline reviews at the speed of standup"
            lede="Trade two-day SQL pulls for live charts in seconds — no analyst tax."
            sparkle
          />        </div>

        <ComparisonCards
          before={{
            label: 'Before Insightis',
            items: [
              'Pipeline reports take 2–3 days to build',
              'Revenue metrics differ between teams',
              'Forecast accuracy under 70%',
              'Cross-source analysis requires SQL + analyst',
              'Board deck prep takes a full week',
              'Questions get answered next sprint',
            ],
          }}
          after={{
            label: 'With Insightis',
            items: [
              'Pipeline data available in seconds',
              'One certified number for every metric',
              'Forecast grounded in real-time data',
              'Cross-source insights in plain English',
              'Board-ready reports auto-generate',
              'Any question answered instantly',
            ],
          }}
        />
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const items = [
    {
      q: 'How does Insightis handle our existing Salesforce custom fields?',
      a: 'Insightis maps every custom field, picklist, and formula in your Salesforce org during the initial sync. Custom-defined revenue and pipeline fields show up alongside standard ones — and you can reference them by name in any plain-English question.',
    },
    {
      q: 'Can we define our own metrics, or are we stuck with the defaults?',
      a: 'You can define any metric in the semantic layer. Set a custom Pipeline Coverage formula, your own win-rate logic, or a stage-conversion definition unique to your business. Once defined, Insightis uses your version every time the metric is referenced.',
    },
    {
      q: 'How fresh is the data — and how often does it sync?',
      a: 'Real-time for streaming sources like Stripe, webhooks, and event pipelines. Pull-based sources (CRM, warehouse) sync every 5 minutes by default and can be tuned down to once per minute on enterprise plans.',
    },
    {
      q: 'Does Insightis replace our existing BI tools like Looker or Tableau?',
      a: 'Not necessarily. Most teams use Insightis for ad-hoc questions and quick answers, while keeping Looker for governed dashboards. Insightis can read from the same warehouse models, so there\'s no duplicate data layer to maintain.',
    },
    {
      q: 'How long is the typical setup for a RevOps team?',
      a: 'Most teams are running real questions within an afternoon. Salesforce and Stripe connect in minutes; defining your first dozen metrics in the semantic layer takes another hour or two if you want a polished, fully-certified setup.',
    },
    {
      q: 'Where does our pipeline data live — and how is it secured?',
      a: 'Your data stays in your warehouse. Insightis runs queries on top via secure read-only connectors, with SOC 2 Type II, single sign-on, and row-level access controls. Nothing leaves your environment unless you explicitly share it.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'880px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'52px'}}>
          <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>
            <span style={{fontSize:'var(--ins-font-size-12)'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'var(--ins-font-family-mono)'}}>FAQ</span>
          </div>
          <h2 className="ins-text-display mb-3">
            Common questions from RevOps leads
          </h2>
          <p className="ins-text-body-lg" style={{maxWidth:'560px',margin:'0 auto'}}>
            Everything you need to know before plugging Insightis into your revenue stack.
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
    <section style={{paddingTop:'var(--ins-size-8)',paddingBottom:'var(--ins-size-16)',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <BottomCTA
          variant="form"
          title={<>Stop building <BottomCTA.Highlight>reports.</BottomCTA.Highlight> Start getting <BottomCTA.Highlight>answers.</BottomCTA.Highlight></>}
          inputPlaceholder="Show me pipeline by stage..."
          ctaLabel="Get started"
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
