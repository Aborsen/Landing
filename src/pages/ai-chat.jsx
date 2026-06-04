import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';
import Chip from '../components/Chip';
import CodeChip from '../components/CodeChip';
import BottomCTA from '../components/BottomCTA';
import StepsProcess from '../components/StepsProcess';
import SectionHeader from '../components/SectionHeader';
import CheckIcon from '../components/CheckIcon';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/* ── AMBIENT DATA FIELD ── */
const AMBIENT_ITEMS = [
  '$47.2K','↑ 12.4%','NRR 113%','CAC $430','LTV $2.9K','ARR $564K',
  '2.1% churn','38 deals','↓ 0.8pp','MRR $47K','Win rate 38%',
  '350 leads','MAU 1,280','↑ 7.3%','$73% GM','85 trials','ROAS 3.4x',
  'NPS 44','↑ $12K MoM','Payback 8mo','$8.2K new rev','3,300 ADS',
];

// Deterministic pseudo-random — keeps SSR and client renders identical
// (Math.random() would mismatch and trigger React hydration error #418)
function detRand(seed) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

function AmbientField() {
  const items = [];
  for (let i = 0; i < 28; i++) {
    const left = detRand(i * 4 + 1) * 100;
    const top  = detRand(i * 4 + 2) * 100;
    const dur  = 8 + detRand(i * 4 + 3) * 12;
    const delay = detRand(i * 4 + 4) * 8;
    const text = AMBIENT_ITEMS[i % AMBIENT_ITEMS.length];
    items.push(
      <div key={i} className="ambient-item" style={{
        left:`${left}%`, top:`${top}%`,
        animationDuration:`${dur}s`,
        animationDelay:`${delay}s`,
      }}>{text}</div>
    );
  }
  return <div className="ambient-field">{items}</div>;
}

/* ── ANIMATED CHAT MOCK ── */
const CONVERSATIONS = [
  {
    q: "Why did our MRR drop last week?",
    a: "Your MRR dropped by $1,240 last week, mainly from 3 churned Starter accounts. The primary reason was plan downgrade after trial expiry — these accounts averaged 4 logins in their last 30 days.",
    chart: true,
    chartData: [82,78,80,77,74,71,68,72],
    chartColor: 'var(--ins-status-error-fg)',
  },
  {
    q: "Which channel has the best CAC?",
    a: "Organic search has your lowest CAC at $180 — 2.4× better than paid social ($430). Content-attributed signups also show 34% higher 6-month retention.",
    chart: false,
  },
  {
    q: "What's our NRR this quarter?",
    a: "Your Net Revenue Retention is 113% this quarter, up from 108% last quarter. Expansion revenue from Starter → Pro upgrades drove the improvement — 22 accounts upgraded in Q1.",
    chart: true,
    chartData: [96,99,101,103,106,108,110,113],
    chartColor: 'var(--ins-status-success-fg)',
  },
];

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

function ChatMock() {
  const [phase, setPhase]       = useState('idle');   // idle → typing-q → q → typing-a → a → pause
  const [convIdx, setConvIdx]   = useState(0);
  const [typedQ, setTypedQ]     = useState('');
  const [typedA, setTypedA]     = useState('');
  const [showChart, setShowChart] = useState(false);

  const conv = CONVERSATIONS[convIdx];

  useEffect(() => {
    let timeout;
    if (phase === 'idle') {
      setTypedQ(''); setTypedA(''); setShowChart(false);
      timeout = setTimeout(() => setPhase('typing-q'), 800);
    }
    else if (phase === 'typing-q') {
      if (typedQ.length < conv.q.length) {
        timeout = setTimeout(() => setTypedQ(conv.q.slice(0, typedQ.length + 1)), 38);
      } else {
        timeout = setTimeout(() => setPhase('q'), 400);
      }
    }
    else if (phase === 'q') {
      timeout = setTimeout(() => setPhase('typing-a'), 900);
    }
    else if (phase === 'typing-a') {
      if (typedA.length < conv.a.length) {
        timeout = setTimeout(() => setTypedA(conv.a.slice(0, typedA.length + 2)), 18);
      } else {
        timeout = setTimeout(() => { setShowChart(true); setPhase('a'); }, 200);
      }
    }
    else if (phase === 'a') {
      timeout = setTimeout(() => {
        setPhase('idle');
        setConvIdx((convIdx + 1) % CONVERSATIONS.length);
      }, 3500);
    }
    return () => clearTimeout(timeout);
  }, [phase, typedQ, typedA, convIdx]);

  return (
    <div style={{
      background:'rgba(13,17,23,0.9)',
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      backdropFilter:'blur(20px)',
      boxShadow:'none',
    }}>
      {/* Chat header */}
      <div style={{padding:'14px 18px',borderBottom:'1px solid var(--ins-color-white-a-06)',display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{display:'flex',gap:'5px'}}>
          {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
            <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.6}}/>
          ))}
        </div>
        <div style={{flex:1,textAlign:'center',fontSize:'var(--ins-font-size-12)',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)'}}>
          insightis — ai chat
        </div>
        <div style={{display:'flex',alignItems:'center',gap:5,padding:'3px 8px',background:'var(--ins-color-teal-a-08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'5px'}}>
          <div style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--ins-status-success-fg)',boxShadow:'0 0 6px var(--ins-status-success-fg)'}}/>
          <span style={{fontSize:'10px',fontFamily:'var(--ins-font-family-mono)',color:'var(--ins-text-highlight)',fontWeight:500}}>Gemini Pro</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{padding:'18px',display:'flex',flexDirection:'column',gap:'10px',minHeight:'200px'}}>
        {/* User bubble */}
        {(phase !== 'idle') && (
          <div className="chat-bubble-user" style={{animation:'slideUp .25s ease both'}}>
            {typedQ}
            {phase === 'typing-q' && (
              <span style={{display:'inline-block',width:'2px',height:'13px',background:'var(--ins-text-highlight)',marginLeft:'var(--ins-size-half)',verticalAlign:'middle',animation:'blink .7s ease-in-out infinite'}}/>
            )}
          </div>
        )}

        {/* AI response */}
        {(phase === 'typing-a' || phase === 'a') && (
          <div className="chat-bubble-ai" style={{animation:'slideUp .25s ease both'}}>
            {phase === 'typing-a' && typedA.length === 0 ? (
              <div style={{display:'flex',gap:'5px',alignItems:'center',padding:'2px 0'}}>
                <div className="typing-dot"/>
                <div className="typing-dot"/>
                <div className="typing-dot"/>
              </div>
            ) : (
              <>
                <span>{typedA}</span>
                {phase === 'typing-a' && (
                  <span style={{display:'inline-block',width:'2px',height:'13px',background:'var(--ins-text-body)',marginLeft:'var(--ins-size-half)',verticalAlign:'middle',animation:'blink .7s ease-in-out infinite'}}/>
                )}
                {showChart && conv.chart && (
                  <MiniBarChart data={conv.chartData} color={conv.chartColor}/>
                )}
              </>
            )}
          </div>
        )}

        {/* Idle state */}
        {phase === 'idle' && (
          <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--ins-text-inactive)',fontSize:'var(--ins-font-size-12)',fontFamily:'var(--ins-font-family-mono)'}}>
            Ask anything about your data...
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{padding:'12px 16px',borderTop:'1px solid var(--ins-color-white-a-06)',display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
        <div style={{flex:1,background:'var(--ins-color-white-a-04)',border:'1px solid var(--ins-color-white-a-08)',borderRadius:'10px',padding:'9px 12px',fontSize:'13px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-sans)'}}>
          Ask anything about your data…
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'5px'}}>
          <div style={{width:'28px',height:'28px',borderRadius:'7px',background:'var(--ins-color-white-a-04)',border:'1px solid var(--ins-color-white-a-08)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M14 10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h1l2-2h2l2 2h1a2 2 0 012 2v4z" stroke="var(--ins-text-inactive)" strokeWidth="1.3"/></svg>
          </div>
          <div style={{width:'28px',height:'28px',borderRadius:'7px',background:'linear-gradient(135deg,var(--ins-button-primary-bg-hover),var(--ins-button-primary-bg))',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'0 0 10px rgba(9,160,157,.3)'}}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── INLINE CHART COMPONENTS ── */
function TreemapChart({ items }) {
  const colors = ['var(--ins-text-highlight)','var(--ins-button-primary-bg-hover)','#818CF8','var(--ins-status-warning-fg)','var(--ins-status-error-fg)','#34D399','#60A5FA'];
  const sorted = [...items].sort((a,b) => b.value - a.value);
  const total = sorted.reduce((s,i) => s + i.value, 0);
  const W = 860, H = 210, gap = 4;
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
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:'220px'}}>
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
      <svg viewBox="0 0 180 180" style={{width:'200px',height:'200px',flexShrink:0}}>
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

function GroupedBarChart({ groups }) {
  const maxVal = Math.max(...groups.flatMap(g => [g.actual, g.budget]));
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'10px',margin:'12px 0'}}>
      {groups.map((g,i) => (
        <div key={i}>
          <div style={{fontSize:'var(--ins-font-size-11)',color:'var(--ins-text-body)',fontFamily:'var(--ins-font-family-mono)',marginBottom:'var(--ins-size-1)'}}>{g.label}</div>
          <div style={{display:'flex',gap:'var(--ins-size-1)',flexDirection:'column'}}>
            <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
              <div style={{width:'100%',background:'var(--ins-color-white-a-04)',borderRadius:'3px',height:'16px',position:'relative',overflow:'hidden'}}>
                <div style={{width:`${(g.actual/maxVal)*100}%`,height:'100%',borderRadius:'3px',background: g.actual > g.budget ? 'rgba(220,80,80,.65)' : 'rgba(9,160,157,.55)'}}/>
              </div>
              <span style={{fontSize:'var(--ins-font-size-11)',fontFamily:'var(--ins-font-family-mono)',color: g.actual > g.budget ? '#E06060' : 'var(--ins-text-highlight)',minWidth:'40px',flexShrink:0}}>${g.actual}K</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
              <div style={{width:'100%',background:'var(--ins-color-white-a-04)',borderRadius:'3px',height:'16px',position:'relative',overflow:'hidden'}}>
                <div style={{width:`${(g.budget/maxVal)*100}%`,height:'100%',borderRadius:'3px',background:'var(--ins-color-white-a-12)'}}/>
              </div>
              <span style={{fontSize:'var(--ins-font-size-11)',fontFamily:'var(--ins-font-family-mono)',color:'var(--ins-text-inactive)',minWidth:'40px',flexShrink:0}}>${g.budget}K</span>
            </div>
          </div>
        </div>
      ))}
      <div style={{display:'flex',gap:'var(--ins-size-4)',marginTop:'var(--ins-size-1)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'5px'}}><div style={{width:'8px',height:'8px',borderRadius:'var(--ins-radius-2)',background:'rgba(9,160,157,.55)'}}/><span style={{fontSize:'10px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)'}}>Actual</span></div>
        <div style={{display:'flex',alignItems:'center',gap:'5px'}}><div style={{width:'8px',height:'8px',borderRadius:'var(--ins-radius-2)',background:'var(--ins-color-white-a-12)'}}/><span style={{fontSize:'10px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)'}}>Budget</span></div>
      </div>
    </div>
  );
}

function RetainedVsChurnedChart({ bars }) {
  const maxVal = Math.max(...bars.flatMap(b => [b.retained, b.churned]));
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'10px',margin:'12px 0'}}>
      {bars.map((b,i) => (
        <div key={i}>
          <div style={{fontSize:'var(--ins-font-size-11)',color:'var(--ins-text-body)',fontFamily:'var(--ins-font-family-mono)',marginBottom:'var(--ins-size-1)'}}>{b.label}</div>
          <div style={{display:'flex',gap:'var(--ins-size-1)',flexDirection:'column'}}>
            <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
              <div style={{width:'100%',background:'var(--ins-color-white-a-04)',borderRadius:'3px',height:'16px',position:'relative',overflow:'hidden'}}>
                <div style={{width:`${(b.retained/maxVal)*100}%`,height:'100%',borderRadius:'3px',background:'rgba(9,160,157,.6)'}}/>
              </div>
              <span style={{fontSize:'var(--ins-font-size-11)',fontFamily:'var(--ins-font-family-mono)',color:'var(--ins-text-highlight)',minWidth:'35px',flexShrink:0}}>{b.retained}%</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
              <div style={{width:'100%',background:'var(--ins-color-white-a-04)',borderRadius:'3px',height:'16px',position:'relative',overflow:'hidden'}}>
                <div style={{width:`${(b.churned/maxVal)*100}%`,height:'100%',borderRadius:'3px',background:'rgba(220,80,80,.55)'}}/>
              </div>
              <span style={{fontSize:'var(--ins-font-size-11)',fontFamily:'var(--ins-font-family-mono)',color:'#E06060',minWidth:'35px',flexShrink:0}}>{b.churned}%</span>
            </div>
          </div>
        </div>
      ))}
      <div style={{display:'flex',gap:'var(--ins-size-4)',marginTop:'var(--ins-size-1)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'5px'}}><div style={{width:'8px',height:'8px',borderRadius:'var(--ins-radius-2)',background:'rgba(9,160,157,.6)'}}/><span style={{fontSize:'10px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)'}}>Retained (12+ mo)</span></div>
        <div style={{display:'flex',alignItems:'center',gap:'5px'}}><div style={{width:'8px',height:'8px',borderRadius:'var(--ins-radius-2)',background:'rgba(220,80,80,.55)'}}/><span style={{fontSize:'10px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)'}}>Churned</span></div>
      </div>
    </div>
  );
}

/* ── QUESTIONS DATA ── */
const GALLERY_DATA = {
  'RevOps & BizOps': {
    questions: [
      'Why did MRR drop last week?',
      'Which deals risk slipping?',
      'Sales cycle by deal size?',
      'Highest pipeline drop-off?',
      'CAC trend vs. 6 months ago?',
    ],
    replies: [
      {
        type: 'graph', chart: 'horizontalBar',
        chartData: [
          { label:'Trial expiry (activation)', value:-740, display:'-$740' },
          { label:'Pro \u2192 Starter downgrade', value:-260, display:'-$260' },
          { label:'Low engagement churn', value:-240, display:'-$240' },
          { label:'Annual \u2192 Monthly switch', value:-180, display:'-$180' },
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
        caption: 'CAC has dropped $88 over 6 months \u2014 PLG improvements and better lead quality are compounding each other.',
        action: 'Double down on PLG onboarding investment to sustain the downward CAC trend into Q3',
      },
    ],
  },
  'Founders & CEOs': {
    questions: [
      'ARR and growth trajectory?',
      'Fastest-growing segment?',
      'How much runway is left?',
      'NRR this quarter?',
      'Top product by gross margin?',
    ],
    replies: [
      {
        type: 'graph', chart: 'line',
        chartData: [1.8, 1.95, 2.1, 2.2, 2.32, 2.4],
        chartLabels: ['Nov','Dec','Jan','Feb','Mar','Apr'],
        caption: 'ARR reached $2.4M this month \u2014 34% YoY growth, accelerating over the last quarter.',
        action: 'Review Mid-Market expansion capacity before Q3 planning',
      },
      {
        type: 'graph', chart: 'horizontalBar',
        chartData: [
          { label:'Mid-Market', value:48, display:'+48% QoQ' },
          { label:'Self-Serve / PLG', value:35, display:'+35% QoQ' },
          { label:'SMB', value:21, display:'+21% QoQ' },
          { label:'Enterprise', value:12, display:'+12% QoQ' },
          { label:'Channel Partners', value:8, display:'+8% QoQ' },
          { label:'Gov / Nonprofit', value:5, display:'+5% QoQ' },
        ],
        caption: 'Mid-Market is outpacing every other segment \u2014 driven by self-serve upgrades from the PLG motion launched in January.',
        action: 'Allocate additional AE capacity to Mid-Market before Q3 to capitalise on momentum',
      },
      {
        type: 'graph', chart: 'treemap',
        chartData: [
          { label:'Payroll', value:112, display:'$112K', color:'#818CF8' },
          { label:'Cloud & Infra', value:34, display:'$34K', color:'var(--ins-text-highlight)' },
          { label:'Contractors', value:21, display:'$21K', color:'var(--ins-status-warning-fg)' },
          { label:'Marketing', value:12, display:'$12K', color:'var(--ins-button-primary-bg-hover)' },
          { label:'Other', value:8, display:'$8K', color:'#8AA6B3' },
        ],
        caption: '$187K/month burn, $4.2M in bank = 22.5 months runway. Payroll is 60% of total spend.',
        action: 'Model two hiring-pace scenarios (full plan vs. 70%) ahead of the board meeting',
      },
      {
        type: 'paragraph',
        text: "Net Revenue Retention this quarter is 112%, up from 108% last quarter and 103% a year ago — a consistent upward trend driven by systematic expansion motions. Expansion revenue from seat upgrades and plan upsells contributed $38K, while gross churn held at 1.4%. Mid-Market accounts are the primary driver — NRR for that segment is 124%, vs. 98% for SMB and 107% for Enterprise. The top 20 expanding accounts each showed a usage spike of 40%+ in the 60 days before their upgrade. Enterprise NRR is lagging partly due to two non-renewals in January worth $22K ARR combined, both citing lack of SSO support.",
        action: 'Build an expansion playbook targeting the top 20 accounts showing usage spikes this month',
      },
      {
        type: 'graph', chart: 'pie',
        chartData: [
          { label:'Analytics Suite', value:64, color:'var(--ins-text-highlight)' },
          { label:'Integrations Add-on', value:51, color:'#818CF8' },
          { label:'Pro Plan (base)', value:38, color:'var(--ins-button-primary-bg-hover)' },
          { label:'Professional Services', value:22, color:'var(--ins-status-warning-fg)' },
        ],
        caption: 'Analytics Suite delivers the highest gross margin — its infrastructure cost is largely fixed while revenue scales with seats.',
        action: 'Prioritise Analytics Suite in the next sales enablement refresh and bundle with Pro upsell',
      },
    ],
  },
  'CMOs & Marketers': {
    questions: [
      'Top campaign for MQLs?',
      'Blended CAC by channel?',
      'Top-converting landing page?',
      'Organic vs. paid traffic trend?',
      'MQL→SQL rate by source?',
    ],
    replies: [
      {
        type: 'graph', chart: 'treemap',
        chartData: [
          { label:'Webinar Series', value:214, display:'214 MQLs', color:'var(--ins-text-highlight)' },
          { label:'LinkedIn Ads', value:67, display:'67 MQLs', color:'#818CF8' },
          { label:'Organic Search', value:58, display:'58 MQLs', color:'var(--ins-button-primary-bg-hover)' },
          { label:'G2 / Reviews', value:34, display:'34 MQLs', color:'var(--ins-status-warning-fg)' },
          { label:'Google Ads', value:21, display:'21 MQLs', color:'var(--ins-status-error-fg)' },
        ],
        caption: "Webinar series generated 214 MQLs at $18/lead — 5× cheaper than LinkedIn Ads.",
        action: 'Schedule 2 additional webinars targeting the same ICP segment in Q3',
      },
      {
        type: 'graph', chart: 'horizontalBar',
        chartData: [
          { label:'Webinars', value:18, display:'$18' },
          { label:'SEO / Organic', value:34, display:'$34' },
          { label:'G2 & Review Sites', value:61, display:'$61' },
          { label:'LinkedIn Ads', value:94, display:'$94' },
          { label:'Google Ads', value:127, display:'$127' },
        ],
        caption: 'Blended CAC is $58. Owned channels are 3\u00d7 more efficient than paid \u2014 shifting 15% of paid budget to content would materially improve unit economics.',
        action: 'Reallocate $8K/month from Google Ads to webinar production and SEO content',
      },
      {
        type: 'paragraph',
        text: "The \u2018Start for free\u2019 landing page converts at 8.4% \u2014 the highest of any tracked page. The pricing page is second at 4.1%, followed by the integration directory at 2.9%. The blog-to-trial CTA added in February contributed an additional 0.8 percentage points to organic conversion, making it the 4th-highest converting entry point. Mobile conversion across all pages remains 2.1\u00d7 lower than desktop, with the largest gap on the pricing page (1.9% mobile vs. 5.8% desktop). Pages with a single primary CTA outperform multi-CTA pages by 2.3\u00d7 — a pattern consistent across the last three quarters.",
        action: 'Run an A/B test on the hero headline for the Start for free page to push past 9%',
      },
      {
        type: 'graph', chart: 'line',
        chartData: [18400, 21200, 24800, 28100, 31600, 36200],
        chartLabels: ['Oct','Nov','Dec','Jan','Feb','Mar'],
        caption: 'Organic sessions grew 97% in 6 months while paid spend held flat \u2014 content investment is compounding month over month.',
        action: 'Publish 4 additional pillar pages targeting high-intent keywords before end of Q2',
      },
      {
        type: 'graph', chart: 'pie',
        chartData: [
          { label:'Webinar', value:41, color:'var(--ins-text-highlight)' },
          { label:'Organic Search', value:28, color:'#818CF8' },
          { label:'G2 / Review Sites', value:22, color:'var(--ins-button-primary-bg-hover)' },
          { label:'LinkedIn Ads', value:14, color:'var(--ins-status-warning-fg)' },
          { label:'Google Ads', value:9, color:'var(--ins-status-error-fg)' },
        ],
        caption: 'Webinar-sourced leads convert to SQL at 41% — nearly 3× the rate of paid search, reflecting much stronger intent.',
        action: 'Add a post-webinar nurture sequence with a 3-day trial CTA to capture intent at peak',
      },
    ],
  },
  'Product Teams': {
    questions: [
      'Top features for retained users?',
      'Lowest 30-day activation cohort?',
      'Onboarding completed this week?',
      'Average time-to-value?',
      'Top feature requests in tickets?',
    ],
    replies: [
      {
        type: 'graph', chart: 'retainedVsChurned',
        chartData: [
          { label:'Saved Reports', retained:78, churned:21 },
          { label:'Slack Alerts', retained:61, churned:18 },
          { label:'CSV Export', retained:44, churned:40 },
        ],
        caption: "Retained customers use Saved Reports 3.7\u00d7 more than churned accounts \u2014 it\u2019s your strongest activation signal.",
        action: 'Add Saved Reports to the onboarding checklist for all new trials',
      },
      {
        type: 'graph', chart: 'horizontalBar',
        chartData: [
          { label:'Mar cohort (API signups)', value:-18, display:'18%' },
          { label:'Feb cohort (Paid ads)', value:-29, display:'29%' },
          { label:'Jan cohort (Organic)', value:-44, display:'44%' },
          { label:'Dec cohort (Webinar)', value:-55, display:'55%' },
          { label:'Nov cohort (Trial)', value:-61, display:'61%' },
          { label:'Oct cohort (Outbound)', value:-72, display:'72%' },
        ],
        caption: "API signups activate at 18% \u2014 lowest of any cohort. They skip the setup wizard, so they rarely reach the first \u2018aha\u2019 moment.",
        action: 'Add an API-specific onboarding flow that surfaces the first query result within 5 minutes',
      },
      {
        type: 'graph', chart: 'treemap',
        chartData: [
          { label:'Step 3 — Connect Source', value:31, display:'31% drop', color:'var(--ins-status-error-fg)' },
          { label:'Step 5 — Invite Team', value:14, display:'14% drop', color:'var(--ins-status-warning-fg)' },
          { label:'Step 4 — First Query', value:11, display:'11% drop', color:'var(--ins-status-warning-fg)' },
          { label:'Step 2 — Profile Setup', value:6, display:'6% drop', color:'var(--ins-button-primary-bg-hover)' },
          { label:'Step 1 — Verify Email', value:4, display:'4% drop', color:'#34D399' },
        ],
        caption: '312 users onboarded this week (+18%). Step 3 (connect source) causes 31% abandonment — worst on mobile.',
        action: 'Add a "connect later" skip option at step 3 to reduce mobile abandonment',
      },
      {
        type: 'paragraph',
        text: "Average time-to-value for new signups is 4.2 days \u2014 defined as the first saved report or shared insight. Users who connect a data source on day 1 reach value in 1.8 days on average; users who defer connection average 9.4 days, and 62% churn before ever reaching their first insight. The onboarding cohort that received the in-app data-connection prompt on the welcome screen converted at 34% vs. 19% for the control group. Teams with 3+ members invited during signup retain at 91% over 30 days vs. 54% for solo users. Each 1-day reduction in time-to-value correlates with a 6-point improvement in 90-day retention based on the last 8 cohorts.",
        action: 'Gate the welcome email sequence on data-source connection to incentivise same-day setup',
      },
      {
        type: 'graph', chart: 'pie',
        chartData: [
          { label:'Custom date filters', value:87, color:'var(--ins-text-highlight)' },
          { label:'PDF/PPT export', value:64, color:'#818CF8' },
          { label:'Multi-dashboard view', value:51, color:'var(--ins-status-warning-fg)' },
          { label:'Role-based permissions', value:38, color:'var(--ins-status-error-fg)' },
        ],
        caption: 'Custom date filters lead by a wide margin — strong signal for Q3 prioritisation across all customer segments.',
        action: 'Add custom date range filters to the Q3 roadmap and notify the 87 requesters on release',
      },
    ],
  },
  'Data & Analytics': {
    questions: [
      "Anomalies in yesterday's data?",
      'Metrics over 2\u03c3 this week?',
      'Data freshness across pipelines?',
      'Stale but heavily queried tables?',
      'Login frequency vs. LTV?',
    ],
    replies: [
      {
        type: 'graph', chart: 'treemap',
        chartData: [
          { label:'checkout_complete', value:41, display:'-41%', color:'var(--ins-status-error-fg)' },
          { label:'page_view (bot filter)', value:18, display:'-18%', color:'var(--ins-status-warning-fg)' },
          { label:'session_start', value:9, display:'-9%', color:'var(--ins-status-warning-fg)' },
          { label:'feature_activated', value:5, display:'−5%', color:'#8AA6B3' },
        ],
        caption: '3 anomalies in yesterday\'s pipeline. checkout_complete −41% (14:00–16:00 UTC) — Stripe webhook delay. All resolved by 18:30 UTC.',
        action: 'Confirm Stripe webhook backfill completed and close the incident log',
      },
      {
        type: 'graph', chart: 'horizontalBar',
        chartData: [
          { label:'checkout_complete', value:-41, display:'-4.1\u03c3' },
          { label:'trial_start rate', value:-34, display:'-3.4\u03c3' },
          { label:'session_duration', value:-18, display:'-1.8\u03c3' },
          { label:'api_calls', value:12, display:'+1.2\u03c3' },
          { label:'invite_sent', value:31, display:'+3.1\u03c3' },
          { label:'feature_activated', value:28, display:'+2.8\u03c3' },
        ],
        caption: 'Two metrics are in significant negative deviation \u2014 both linked to Tuesday\u2019s webhook delay. The positive spikes in activation and invites are genuine growth signals.',
        action: 'Add automated alerting for checkout_complete drops exceeding 2\u03c3 within any 2-hour window',
      },
      {
        type: 'paragraph',
        text: "All 6 data pipelines are currently healthy and processing within normal thresholds. Stripe sync is current as of 2 minutes ago; HubSpot last synced 8 minutes ago. The PostgreSQL warehouse refresh completed on schedule at 03:00 UTC with zero row-level errors. The only anomaly was the Salesforce pipeline \u2014 delayed 47 minutes overnight due to API rate limiting during the batch window, but now fully caught up. Over the past 30 days, average pipeline latency across all sources is 6.2 minutes, down from 11.4 minutes in January following the async queue refactor. Data freshness SLA (under 15 minutes) has been met 99.1% of the time this month.",
        action: 'Stagger the Salesforce sync start time to 02:15 UTC to avoid API rate-limit collisions',
      },
      {
        type: 'graph', chart: 'horizontalBar',
        chartData: [
          { label:'events_raw', value:94, display:'94 qps / 6h old' },
          { label:'user_sessions', value:78, display:'78 qps / 4h old' },
          { label:'billing_snapshots', value:61, display:'61 qps / 18h old' },
          { label:'feature_flags', value:44, display:'44 qps / 31h old' },
          { label:'product_events', value:38, display:'38 qps / 2h old' },
          { label:'identity_sync', value:22, display:'22 qps / 45m old' },
        ],
        caption: 'billing_snapshots and feature_flags are queried heavily but refreshed infrequently \u2014 stale reads may be skewing downstream dashboards.',
        action: 'Increase refresh cadence for billing_snapshots to every 4 hours and feature_flags to every 2 hours',
      },
      {
        type: 'graph', chart: 'pie',
        chartData: [
          { label:'4+ logins/wk → $2,840 LTV', value:2840, color:'var(--ins-text-highlight)' },
          { label:'2–3 logins/wk → $1,420 LTV', value:1420, color:'var(--ins-button-primary-bg-hover)' },
          { label:'<2 logins/wk → $610 LTV', value:610, color:'var(--ins-status-error-fg)' },
        ],
        caption: 'Strong correlation (r=0.74). 4+ weekly logins → $2,840 LTV vs $610 for low-engagement. Days 8–14 login frequency is the strongest 12-month retention predictor.',
        action: 'Add login-frequency triggers to the lifecycle email sequence starting at day 8 for low-engagement users',
      },
    ],
  },
  'Ops & Finance': {
    questions: [
      'Burn rate vs. budget?',
      'Vendors past payment terms?',
      'Headcount cost by department?',
      'Forecast vs. actual revenue?',
      'Cost centers over budget?',
    ],
    replies: [
      {
        type: 'graph', chart: 'groupedBar',
        chartData: [
          { label:'Cloud Infra', actual:48, budget:34 },
          { label:'Headcount', actual:92, budget:95 },
          { label:'Contractors', actual:31, budget:18 },
          { label:'Other', actual:16, budget:18 },
        ],
        caption: 'Cloud infrastructure and unplanned contractor spend account for the full $22K budget overrun this month.',
        action: 'Submit contractor budget amendment and review cloud cost allocation with engineering',
      },
      {
        type: 'graph', chart: 'treemap',
        chartData: [
          { label:'Cloudflare', value:4200, display:'$4,200', color:'var(--ins-status-error-fg)' },
          { label:'Segment', value:2800, display:'$2,800', color:'var(--ins-status-warning-fg)' },
          { label:'SaaS Auto-renew #1', value:1400, display:'$1,400', color:'#818CF8' },
          { label:'SaaS Auto-renew #2', value:1000, display:'$1,000', color:'#818CF8' },
        ],
        caption: '$9,400 total exposure across 4 vendors. Cloudflare 18 days past due — 1.5%/month penalty kicks in at 30 days.',
        action: 'Process Cloudflare and Segment payments today and flag auto-renewals for AP policy review',
      },
      {
        type: 'graph', chart: 'horizontalBar',
        chartData: [
          { label:'Engineering', value:68, display:'$68K' },
          { label:'Sales', value:41, display:'$41K' },
          { label:'Marketing', value:28, display:'$28K' },
          { label:'Product', value:22, display:'$22K' },
          { label:'G&A', value:18, display:'$18K' },
        ],
        caption: 'Engineering is 43% of total headcount cost. Two open reqs in Sales, if filled, will shift the balance toward revenue-generating roles.',
        action: 'Prioritise the two open Sales AE roles to rebalance headcount ratio toward revenue capacity',
      },
      {
        type: 'graph', chart: 'line',
        chartData: [148, 162, 171, 183, 194, 208],
        chartLabels: ['Oct','Nov','Dec','Jan','Feb','Mar'],
        caption: 'Actual revenue has exceeded forecast every month for 6 consecutive months \u2014 the model is consistently 6\u20138% conservative.',
        action: 'Recalibrate the revenue forecast model to reduce systematic underestimation ahead of Q2 board review',
      },
      {
        type: 'graph', chart: 'pie',
        chartData: [
          { label:'Contractors +72% over', value:72, color:'var(--ins-status-error-fg)' },
          { label:'Cloud Infra +41% over', value:41, color:'var(--ins-status-warning-fg)' },
          { label:'T&E +18% over', value:18, color:'#818CF8' },
          { label:'Software Licences 4% under', value:4, color:'#34D399' },
          { label:'Headcount 3% under', value:3, color:'var(--ins-text-highlight)' },
        ],
        caption: 'Contractors are the most over-budget at 72% above plan — 3 unplanned engineering engagements approved outside the budget cycle.',
        action: 'Require CFO sign-off for any contractor engagement exceeding $5K not in the approved budget',
      },
    ],
  },
};

/* ── QUESTIONS GALLERY ── */
function QuestionsGallery() {
  const cats = Object.keys(GALLERY_DATA);
  const [activeCat, setActiveCat] = React.useState(cats[0]);
  const [activeQ, setActiveQ]     = React.useState(0);
  const cat = GALLERY_DATA[activeCat];

  const handleCat = (c) => { setActiveCat(c); setActiveQ(0); };

  const renderReply = (reply) => {
    if (reply.type === 'paragraph') {
      return <p className="ins-text-body-lg">{reply.text}</p>;
    }
    if (reply.chart === 'horizontalBar') {
      return <HorizontalBarChart bars={reply.chartData}/>;
    }
    if (reply.chart === 'line') {
      return <LineChart points={reply.chartData} labels={reply.chartLabels}/>;
    }
    if (reply.chart === 'groupedBar') {
      return <GroupedBarChart groups={reply.chartData}/>;
    }
    if (reply.chart === 'retainedVsChurned') {
      return <RetainedVsChurnedChart bars={reply.chartData}/>;
    }
    if (reply.chart === 'pie') {
      return <PieChart slices={reply.chartData}/>;
    }
    if (reply.chart === 'treemap') {
      return <TreemapChart items={reply.chartData}/>;
    }
    return null;
  };

  return (
    <section style={{padding:'120px 0 140px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div style={{marginBottom:'var(--ins-size-7)'}}>
          <SectionHeader
            eyebrow="What you can ask"
            title="What kind of questions can you ask Insightis?"
            lede={"From daily standups to board meetings \u2014 ask in plain English, get precise answers."}
            sparkle
            size="lg"
          />
        </div>

        {/* Category pills */}
        <div style={{display:'flex',justifyContent:'center',gap:'var(--ins-size-2)',marginBottom:'var(--ins-size-6)',flexWrap:'wrap'}}>
          {cats.map(c => (
            <Chip
              key={c}
              as="button"
              variant="tab"
              onClick={() => handleCat(c)}
              aria-pressed={c === activeCat}
              style={{padding:'7px 18px', fontSize:'13px', fontWeight:500}}
            >
              {c}
            </Chip>
          ))}
        </div>

        {/* Grid: left tabs + right chat panel */}
        <div data-gallery-grid className="showcase fade-in visible">
          <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(9,160,157,.6),var(--ins-color-white-a-10),rgba(9,160,157,.6),transparent)',zIndex:20,pointerEvents:'none'}}/>

          {/* LEFT */}
          <div data-gallery-left style={{display:'flex',flexDirection:'column',background:'rgba(10,14,19,.95)',borderRight:'1px solid var(--ins-color-white-a-05)'}}>
            <div style={{flex:1,display:'flex',flexDirection:'column'}}>
              {cat.questions.map((q,i) => (
                <div
                  key={activeCat+i}
                  onClick={() => setActiveQ(i)}
                  className={i === activeQ ? 'sc-step active' : 'sc-step'}
                >
                  <span className="sc-lbl" style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',display:'block'}}>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div key={activeCat+activeQ} style={{
            background:'radial-gradient(ellipse 100% 80% at 30% 30%, rgba(9,160,157,.05) 0%, transparent 60%), rgba(10,14,19,.97)',
            display:'flex', flexDirection:'column',
            animation:'fadeIn .15s ease both',
            height:'520px', overflow:'hidden',
          }}>
            <div style={{flex:1, padding:'24px 32px', display:'flex', flexDirection:'column', gap:'var(--ins-size-3)', overflow:'hidden'}}>

              {/* User bubble */}
              <div style={{
                alignSelf:'flex-end', maxWidth:'80%',
                background:'rgba(9,160,157,.15)', border:'1px solid rgba(9,160,157,.3)',
                borderRadius:'16px 16px 4px 16px', padding:'12px 16px',
                fontSize:'var(--ins-font-size-14)', color:'var(--ins-color-gray-100)', lineHeight:1.5,
              }}>
                {cat.questions[activeQ]}
              </div>

              {/* AI reply card */}
              <div data-ai-reply-card style={{
                alignSelf:'stretch', width:'100%',
                background:'var(--ins-color-white-a-03)', border:'1px solid var(--ins-color-white-a-07)',
                borderRadius:'4px 16px 16px 16px', padding:'20px 24px',
                flex:'1 1 auto', minHeight:0,
                display:'flex', flexDirection:'column',
                overflowY:'auto',
              }}>
                {/* Header */}
                <div style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'14px'}}>
                  <div style={{width:'20px',height:'20px',borderRadius:'var(--ins-radius-6)',background:'rgba(9,160,157,.12)',border:'1px solid rgba(9,160,157,.25)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                    <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M8 1l2 5h5l-4 3 1.5 5L8 11l-4.5 3L5 9 1 6h5z" stroke="var(--ins-text-highlight)" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{fontSize:'var(--ins-font-size-11)',fontFamily:'var(--ins-font-family-mono)',color:'var(--ins-text-highlight)',fontWeight:500}}>Insightis</span>
                  <div style={{marginLeft:'auto',fontSize:'10px',fontFamily:'var(--ins-font-family-mono)',color:'var(--ins-text-inactive)',display:'flex',alignItems:'center',gap:4}}>
                    <div style={{width:5,height:5,borderRadius:'50%',background:'var(--ins-status-success-fg)',boxShadow:'0 0 5px var(--ins-status-success-fg)'}}/>
                    live data
                  </div>
                </div>

                {/* Chart or paragraph */}
                <>
                  {renderReply(cat.replies[activeQ])}
                  {cat.replies[activeQ].caption && (
                    <p style={{fontSize:'var(--ins-font-size-14)',color:'#8FB8C4',lineHeight:1.6,marginTop:'var(--ins-size-2)'}}>{cat.replies[activeQ].caption}</p>
                  )}
                </>

                {/* Action chip */}
                {cat.replies[activeQ].action && (
                  <div style={{display:'flex',alignItems:'flex-start',gap:'var(--ins-size-2)',background:'rgba(9,160,157,.05)',border:'1px solid rgba(9,160,157,.15)',borderRadius:'10px',padding:'12px 16px',marginTop:'var(--ins-size-4)'}}>
                    <span style={{color:'var(--ins-button-primary-bg-hover)',fontSize:'13px',flexShrink:0}}>{"\u2606"}</span>
                    <span style={{fontSize:'13px',color:'var(--ins-text-body)',lineHeight:1.55}}>{"\u2192"} {cat.replies[activeQ].action}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile responsive overrides */}
        <style>{`
          @media (max-width: 768px) {
            [data-gallery-grid] {
              grid-template-columns: 1fr !important;
              min-height: auto !important;
            }
            [data-gallery-left] {
              flex-direction: row !important;
              overflow-x: auto !important;
              border-right: none !important;
              border-bottom: 1px solid var(--ins-color-white-a-05) !important;
              padding: 12px !important;
              gap: 8px !important;
            }
            [data-gallery-left] > div { flex-direction: row !important; gap: 8px !important; }
            [data-gallery-left] > div > div {
              flex: none !important;
              padding: 8px 14px !important;
              border-bottom: none !important;
              border-radius: 999px !important;
              border: 1px solid var(--ins-color-white-a-08) !important;
              white-space: nowrap !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
/* ── HOW IT WORKS ── */
function HowItWorks() {
  const steps = [
    {
      n:'01', title:'You ask',
      body:'Type any business question in plain English — the same way you would ask a colleague. No SQL, no dashboards, no analyst required.',
      example:'"Which acquisition channel has the best CAC this quarter?"',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    },
    {
      n:'02', title:'AI Engine goes to work',
      body:'Insightis validates and analyzes data across every connected source, applying your business logic for accurate, grounded results.',
      example:'CRM + payments + product data → validated insight',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><path d="M8 21h8M12 17v4" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    },
    {
      n:'03', title:'You get a precise answer',
      body:'Get an instant answer with visualization and suggested follow-ups. Save any answer as a live report in one click — no BI tool required.',
      example:'Answer + chart + "Why did this change?" suggestion',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
  ];

  return (
    <section style={{padding:'120px 0 140px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{marginBottom:'var(--ins-size-16)'}}>
          <SectionHeader
            eyebrow="How it works"
            title="From question to answer in seconds"
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

/* ── ACCURACY COMPARISON ── */
function AccuracyComparison() {
  return (
    <section style={{padding:'120px 0 140px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="Accuracy"
            title="Not the internet. Your data."
            lede="Generic AI guesses. Insightis knows."
            sparkle
            size="lg"
          />
        </div>

        {/* TODO SEO [P1]: Emit a semantic <table> companion to the comparison cards below.
            Rule: Block 4 comparison must be a <table> (AI prioritizes tabular data).
            Suggested columns + rows (from plan):
              | Feature                         | Generic AI                          | Insightis                                              |
              | Source of truth                 | Public internet averages            | Your live data via Semantic Layer                      |
              | Example answer to "churn rate"  | 3–8% industry avg                   | 2.1% in March (down from 2.8%)                         |
              | Accuracy on your numbers        | ~generic                            | 3× higher                                              |
              | SQL required                    | n/a (no data access)                | No — plain-English questions translated by the engine  |
            The table can be visually hidden (sr-only) or styled as the existing cards — either way, emit the markup so crawlers/AI see it.
        */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--ins-size-4)',alignItems:'stretch'}}>
          {/* Generic AI */}
          <Card variant="glow" className="ins-card--glow--error compare-card" style={{padding:'var(--ins-size-8)',display:'flex',flexDirection:'column'}}>
            <div className="ins-card__header" style={{marginBottom:'22px'}}>Generic AI</div>
            <CodeChip
              variant="panel"
              style={{flex:1,marginBottom:'var(--ins-size-3)'}}
              query="What's our churn rate?"
              response={<span style={{color:'#505068'}}>The average SaaS churn rate is typically between <span style={{color:'var(--ins-status-error-fg)'}}>3–8% monthly</span>, depending on your segment and pricing tier. Companies in the SMB market typically see higher rates. This estimate may or may not reflect your situation.</span>}
            />
            <p className="ins-text-body-sm ins-text--italic" style={{color:'var(--ins-text-error)'}}>Searches the internet. Returns industry averages. Not your numbers.</p>
          </Card>

          {/* Insightis */}
          <Card variant="glow" className="ins-card--glow--brand compare-card" style={{padding:'var(--ins-size-8)',display:'flex',flexDirection:'column'}}>
            <div className="ins-card__header" style={{marginBottom:'22px'}}>Insightis</div>
            <CodeChip
              variant="panel"
              style={{flex:1,marginBottom:'var(--ins-size-3)'}}
              query="What's our churn rate?"
              response={<>Your churn rate in March was <CodeChip.Highlight>2.1%</CodeChip.Highlight> — down from 2.8% in February. Main driver: reduced churn in Starter plan (↓ 0.9pp). 3 accounts churned vs 5 last month.</>}
            />
            <p className="ins-text-body-sm ins-text--italic" style={{color:'var(--ins-text-highlight-muted)'}}>Queries your Stripe + PostgreSQL through Semantic Layer. Always your numbers.</p>
          </Card>
        </div>

        {/* 3x badge */}
        <div style={{textAlign:'center',marginTop:'36px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'var(--ins-size-3)'}}>
            <span style={{fontSize:'40px',fontWeight:500,color:'var(--ins-text-highlight)',fontFamily:'var(--ins-font-family-mono)',lineHeight:1,flexShrink:0}}>3×</span>
            <span className="ins-text-body-lg" style={{whiteSpace:'nowrap'}}>more accurate because it knows your data, not the internet's.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── MID-PAGE CTA BANNER ── */
function MidCTA() {
  return (
    <section className="pt-16 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="fade-up is-visible">
          <BottomCTA
            variant="text"
            title={<>Skip the analyst queue. <BottomCTA.Highlight>Start asking.</BottomCTA.Highlight></>}
            ctaLabel="Get started for free"
          />
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section className="pt-8 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <BottomCTA
          variant="form"
          title={<>Still waiting on <BottomCTA.Highlight> insights</BottomCTA.Highlight> that take <BottomCTA.Highlight> days?</BottomCTA.Highlight></>}
          inputPlaceholder="What are you looking for..."
          ctaLabel="Get started"
        />
      </div>
    </section>
  );
}

/* ── HERO ── */

function InsightisIcon({size=20}) {
  return (
    <svg width={size} height={Math.round(size*0.895)} viewBox="0 0 25.5 22.84" fill="none">
      <path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#0EC4C1"/>
    </svg>
  );
}

function ChatMockAnimation() {
  // Defer animation rendering until after hydration. The SSR pass and the
  // first client render both emit an empty chat-window shell, which keeps
  // hydration safe (no diff possible). The full animated content fades in
  // after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) {
    return (
      <div style={{
        borderRadius:'var(--ins-radius-16)',
        border:'1px solid rgba(255,255,255,0.09)',
        background:'#0C1117',
        overflow:'hidden',
        display:'flex',
        flexDirection:'column',
        height:'500px',
        boxShadow:'none',
      }} aria-hidden="true"/>
    );
  }
  return <ChatMockAnimationInner/>;
}

function ChatMockAnimationInner() {
  const QUESTION = "Why our MRR dropped?";
  const REPLY_LINE1 = "MRR dropped $1,240 from 3 churned accounts.";
  const REPLY_LINE2 = "Main driver: trial expiry without activation.";
  const REPLY_LEN = REPLY_LINE1.length + REPLY_LINE2.length;

  const TYPING_START = 700;
  const TYPING_SPEED = 72;
  const TYPING_END = TYPING_START + QUESTION.length * TYPING_SPEED;
  const SEND_TIME = TYPING_END + 380;
  const THINKING_START = SEND_TIME + 480;
  const STEP1_TIME = THINKING_START + 600;
  const STEP2_TIME = THINKING_START + 1300;
  const STEP3_TIME = THINKING_START + 2000;
  const REPLY_START = STEP3_TIME + 600;
  const REPLY_SPEED = 28;
  const REPLY_END = REPLY_START + REPLY_LEN * REPLY_SPEED;
  const CHART_TIME   = REPLY_END + 300;
  const SOURCES_TIME = CHART_TIME + 700;
  const FINAL_STATE  = SOURCES_TIME + 600;

  const startRef = useRef(null);
  const [tick, setTick] = React.useState(0);

  useEffect(() => {
    let raf;
    function loop(ts) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      if (elapsed >= FINAL_STATE) {
        setTick(FINAL_STATE);
        return;
      }
      setTick(elapsed);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    const doneTimer = setTimeout(() => setTick(FINAL_STATE), FINAL_STATE + 300);
    return () => { cancelAnimationFrame(raf); clearTimeout(doneTimer); };
  }, []);

  const t = tick;
  const windowOpacity = Math.min(1, t / 380);
  const inputText = (t >= TYPING_START && t < SEND_TIME)
    ? QUESTION.slice(0, Math.min(QUESTION.length, Math.floor((t - TYPING_START) / TYPING_SPEED)))
    : '';
  const showCursor = t < SEND_TIME;
  const showUserBubble = t >= SEND_TIME;
  const showThinking = t >= THINKING_START;
  const thinkingDone = t >= REPLY_START;
  const showStep1 = showThinking && t >= STEP1_TIME;
  const showStep2 = showThinking && t >= STEP2_TIME;
  const showStep3 = showThinking && t >= STEP3_TIME;
  const step1Done = showStep2 || thinkingDone;
  const step2Done = showStep3 || thinkingDone;
  const step3Done = thinkingDone;
  const replyChars = t >= REPLY_START ? Math.min(REPLY_LEN, Math.floor((t - REPLY_START) / REPLY_SPEED)) : 0;
  const l1chars = Math.min(REPLY_LINE1.length, replyChars);
  const l2chars = Math.max(0, replyChars - REPLY_LINE1.length);
  const showReply = showUserBubble && replyChars > 0;
  const showSources = t >= SOURCES_TIME;
  const showChart = t >= CHART_TIME;

  const ACTIONS = [
    'Extend trial by 7 days for 3 churned accounts',
    'Send re-engagement email to 8 at-risk accounts',
  ];

  return (
    <div style={{
      borderRadius: 'var(--ins-radius-16)',
      border: '1px solid rgba(255,255,255,0.09)',
      background: '#0C1117',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '500px',
      boxShadow: 'none',
    }}>

      {/* ── Header ── */}
      <div style={{padding:'13px 18px', borderBottom:'1px solid var(--ins-color-white-a-07)', display:'flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,0.015)', flexShrink:0}}>
        <div style={{display:'flex', gap:'6px'}}>
          {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
            <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.6}}/>
          ))}
        </div>
        <div style={{flex:1, textAlign:'center', fontSize:'var(--ins-font-size-12)', color:'var(--ins-text-inactive)', fontFamily:'var(--ins-font-family-mono)', letterSpacing:'.02em'}}>
          insightis — ai chat
        </div>
        <div style={{width:'46px'}}/>
      </div>

      {/* ── Messages ── */}
      <div style={{flex:1, padding:'20px 18px 16px', display:'flex', flexDirection:'column', gap:'var(--ins-size-4)', overflowY:'hidden'}}>

        {showUserBubble && (
          <div style={{
            alignSelf:'flex-end', maxWidth:'78%',
            background:'var(--ins-chat-user-bg)', border:'1px solid var(--ins-chat-user-border)',
            borderRadius:'14px 14px 3px 14px',
            padding:'11px 15px', fontSize:'var(--ins-font-size-14)', color:'var(--ins-text-heading)',
            animation:'slideUp .25s ease both',
          }}>
            {QUESTION}
          </div>
        )}

        {showThinking && (
          <div style={{animation:'fadeIn .2s ease both'}}>
            {/* Thinking header */}
            <div style={{display:'flex', alignItems:'center', gap:'var(--ins-size-2)', paddingLeft:'var(--ins-size-half)'}}>
              <InsightisIcon size={18}/>
              <span style={{fontSize:'var(--ins-font-size-12)', color: thinkingDone ? 'var(--ins-text-highlight-muted)' : 'var(--ins-text-highlight)', fontWeight:500, transition:'color .4s ease'}}>Thinking</span>
              {!thinkingDone ? (
                <div style={{display:'flex', gap:'3px', alignItems:'center', marginLeft:'1px'}}>
                  {[0, 0.2, 0.4].map(d => (
                    <span key={d} style={{width:'4.5px',height:'4.5px',borderRadius:'50%',background:'var(--ins-text-highlight)',display:'block',animation:`pulse 1.2s ease-in-out ${d}s infinite`}}/>
                  ))}
                </div>
              ) : (
                <span style={{width:'14px',height:'14px',borderRadius:'50%',background:'rgba(14,196,193,0.12)',border:'1px solid rgba(14,196,193,0.28)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'8px',fontWeight:700,color:'var(--ins-text-highlight)',flexShrink:0}}><CheckIcon size={8} color="currentColor" /></span>
              )}
            </div>
            {/* Steps list — collapses when thinking is done */}
            {showStep1 && (
              <div style={{
                overflow:'hidden',
                maxHeight: thinkingDone ? '0px' : '120px',
                opacity: thinkingDone ? 0 : 1,
                marginTop: thinkingDone ? '0px' : '10px',
                transition: 'max-height 0.35s ease, opacity 0.25s ease, margin-top 0.35s ease',
              }}>
              <div style={{marginLeft:'5px', paddingLeft:'18px', borderLeft:'1px solid rgba(9,160,157,0.2)', display:'flex', flexDirection:'column', gap:'7px'}}>
                {[
                  { visible: showStep1, done: step1Done, label: 'Connecting data-sources' },
                  { visible: showStep2, done: step2Done, label: 'Analyzing last week activity' },
                  { visible: showStep3, done: step3Done, label: 'Checking results' },
                ].filter(s => s.visible).map(({done, label}, i) => (
                  <div key={label} style={{display:'flex', alignItems:'center', gap:'7px', fontSize:'var(--ins-font-size-12)', color: done ? 'var(--ins-text-highlight)' : 'var(--ins-text-body)', animation:'slideUp .22s ease both', transition:'color .3s ease'}}>
                    <span style={{
                      width:'16px', height:'16px', borderRadius:'var(--ins-radius-4)', flexShrink:0,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:'9px', fontWeight:700,
                      background: done ? 'rgba(14,196,193,0.12)' : 'var(--ins-color-white-a-04)',
                      border: done ? '1px solid rgba(14,196,193,0.28)' : '1px solid rgba(255,255,255,0.09)',
                      color: done ? 'var(--ins-text-highlight)' : 'var(--ins-text-inactive)',
                      transition:'all .3s ease',
                    }}>
                      {done ? '✓' : (i + 1)}
                    </span>
                    {label}
                  </div>
                ))}
              </div>
              </div>
            )}
          </div>
        )}

        {showReply && (
          <div style={{animation:'slideUp .3s ease both'}}>
            <div style={{
              maxWidth:'90%',
              background:'rgba(255,255,255,0.033)', border:'1px solid var(--ins-color-white-a-07)',
              borderRadius:'3px 14px 14px 14px',
              padding:'11px 14px', fontSize:'var(--ins-font-size-12)', color:'var(--ins-text-body)', lineHeight:'var(--ins-line-height-relaxed)',
            }}>
              {REPLY_LINE1.slice(0, l1chars)}
              {l1chars >= REPLY_LINE1.length && l2chars > 0 && (
                <div style={{marginTop:'var(--ins-size-1)'}}>{REPLY_LINE2.slice(0, l2chars)}</div>
              )}
            </div>
            {showChart && (
              <div style={{
                maxWidth:'90%', marginTop:'var(--ins-size-2)',
                background:'rgba(220,60,60,0.04)', border:'1px solid rgba(255,90,90,0.1)',
                borderRadius:'10px', padding:'8px 11px',
                opacity:0, animation:'slideUp .35s ease .1s both',
              }}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'6px'}}>
                  <span style={{fontSize:'9px', color:'var(--ins-text-disabled)', fontFamily:'var(--ins-font-family-mono)', letterSpacing:'0.07em', textTransform:'uppercase'}}>MRR · Last 8 weeks</span>
                  <span style={{fontSize:'10px', fontWeight:700, color:'var(--ins-status-error-fg)', fontFamily:'var(--ins-font-family-mono)'}}>↓ $1,240</span>
                </div>
                <svg width="100%" height="38" viewBox="0 0 240 38" preserveAspectRatio="none" style={{display:'block'}}>
                  <defs>
                    <linearGradient id="mrrAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.22"/>
                      <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.02"/>
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="0" x2="240" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <line x1="0" y1="19" x2="240" y2="19" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <line x1="0" y1="38" x2="240" y2="38" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
                  <path d="M0,20 L34,13 L68,17 L103,6 L137,13 L171,10 L206,22 L240,38 L240,38 L0,38 Z" fill="url(#mrrAreaGrad)"/>
                  <path d="M0,20 L34,13 L68,17 L103,6 L137,13 L171,10 L206,22 L240,38" fill="none" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="240" cy="38" r="2.5" fill="#FF6B6B"/>
                </svg>
                <div style={{display:'flex', justifyContent:'space-between', marginTop:'var(--ins-size-1)'}}>
                  <span style={{fontSize:'8px', color:'var(--ins-text-disabled)', fontFamily:'var(--ins-font-family-mono)'}}>8w ago</span>
                  <span style={{fontSize:'8px', color:'var(--ins-text-disabled)', fontFamily:'var(--ins-font-family-mono)'}}>now</span>
                </div>
              </div>
            )}
            {showSources && (
              <div style={{
                marginTop:'10px',
                maxWidth:'90%',
                background:'rgba(9,160,157,0.07)',
                border:'1px solid rgba(9,160,157,0.22)',
                borderRadius:'10px',
                padding:'9px 12px',
                opacity:0, animation:'slideUp .35s ease .15s both',
              }}>
                <div style={{display:'flex', alignItems:'center', gap:'5px', marginBottom:'7px'}}>
                  <span style={{fontSize:'var(--ins-font-size-11)', color:'var(--ins-text-highlight)', fontWeight:600, letterSpacing:'0.07em', textTransform:'uppercase', fontFamily:'var(--ins-font-family-mono)'}}>⚡ Suggested actions</span>
                </div>
                {ACTIONS.map((action, i) => (
                  <div key={i} style={{
                    display:'flex', alignItems:'flex-start', gap:'7px',
                    fontSize:'var(--ins-font-size-12)', color:'var(--ins-text-body)', lineHeight:'1.45',
                    marginTop: i > 0 ? '5px' : '0',
                    opacity:0, animation:`fadeIn .3s ease ${0.2 + i * 0.12}s both`,
                  }}>
                    <span style={{color:'var(--ins-text-highlight)', flexShrink:0, fontWeight:700, fontSize:'var(--ins-font-size-11)', marginTop:'1px'}}>→</span>
                    {action}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Input (display only, not interactive) ── */}
      <div style={{padding:'10px 14px 13px', borderTop:'1px solid var(--ins-color-white-a-06)', flexShrink:0}}>
        <div style={{
          background:'rgba(255,255,255,0.038)', border:'1px solid var(--ins-color-white-a-08)',
          borderRadius:'9px', padding:'10px 13px',
          fontSize:'var(--ins-font-size-14)', color:'var(--ins-text-heading)',
          display:'flex', alignItems:'center', minHeight:'38px',
          pointerEvents:'none', userSelect:'none',
        }}>
          {inputText ? (
            <span>{inputText}</span>
          ) : (
            <span style={{color:'var(--ins-text-disabled)', fontSize:'var(--ins-font-size-14)'}}>Ask anything…</span>
          )}
          {showCursor && (
            <span style={{display:'inline-block',width:'1.5px',height:'15px',background:'var(--ins-text-highlight)',marginLeft:'1px',animation:'blink 1s step-end infinite',verticalAlign:'middle'}}/>
          )}
        </div>
      </div>

    </div>
  );
}

function Hero() {
  const [vis, setVis] = React.useState(false);
  useEffect(()=>{ const t = setTimeout(()=>setVis(true), 300); return ()=>clearTimeout(t); },[]);
  return (
    <section style={{display:'flex',alignItems:'flex-start',position:'relative',overflow:'hidden',padding:'120px 0 160px'}}>
      {/* Background glows */}
      <div className="ins-hero-glow" />

      <div className="hero-grid" style={{position:'relative',zIndex:10,maxWidth:'1240px',width:'calc(100% - 32px)',margin:'0 auto',display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:'60px',alignItems:'center'}}>

        {/* LEFT: Text */}
        <div style={{
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 0',
        }}>
          <h1 className="ins-text-display-xl">
            <span style={{color:'var(--ins-text-heading-soft)'}}>Ask anything.</span><br/>
            <span style={{color:'var(--ins-text-highlight)'}}>Get answers in</span><br/>
            <span style={{color:'var(--ins-text-highlight)'}}>seconds.</span>
          </h1>
          <p className="ins-text-body-xl" style={{marginBottom:'36px',maxWidth:'520px'}}>
            Type any business question in plain English. Insightis queries your real data — no SQL, no analyst, no waiting.
          </p>
          <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-3)',flexWrap:'wrap',marginBottom:'var(--ins-size-6)'}}>
            <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
              Start for free
            </Button>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'18px',flexWrap:'wrap'}}>
            {['Free plan','No SQL required','Setup in minutes'].map(t=>(
              <span key={t} className="ins-text-caption ins-text--mono" style={{display:'flex',alignItems:'center',gap:'5px'}}>
                <CheckIcon size={12} />{t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: Chat animation */}
        <div>
          <ChatMockAnimation/>
        </div>

      </div>
    </section>
  );
}
function App() {
  return (
    <div>
      <Header />
      <main>
      <Hero />
      {/* TODO SEO [P0]: Insert <TLDR/> component here (between Hero and HowItWorks).
          Required: Block 0 executive summary, 80–100 words, format Problem → Insightis → Benefit.
          Draft copy (88 words) from audit:
          "Business teams wait days for analysts to run reports, and generic AI tools answer with internet averages, not your numbers.
          Insightis AI Chat lets anyone on your team ask data questions in plain English and get precise answers grounded in your real data —
          across Stripe, HubSpot, Postgres, and 20+ sources — in seconds. Answers include charts, contributing factors, and one-click save
          as a live report. Three-times more accurate than generic AI because it queries your Semantic Layer, not the web."
          See plan: C:\Users\victorg\.claude\plans\snappy-rolling-hedgehog.md
      */}
      <HowItWorks />
      <MidCTA />
      <QuestionsGallery />
      <AccuracyComparison />
      {/* TODO SEO [P1]: Insert <FAQ/> component here (between AccuracyComparison and BottomCTA).
          Required: H2 "Frequently asked questions" + 6 Q&A pairs, each answer 40–60 words.
          FAQPage JSON-LD is already emitted in <head> with 3 entries — extend JSON-LD to match visible Q&A list.
          Drafted questions (from plan):
            1. What is Insightis AI Chat?
            2. How is Insightis different from ChatGPT or generic AI?
            3. Do I need SQL to use Insightis?
            4. Which data sources does Insightis connect to?
            5. How accurate are the answers?
            6. Is my data safe?
          Drafted answers for #1–#3 are in the <head> FAQPage JSON-LD — render the same text visibly so the schema matches the DOM.
          Answers #4–#6 still need author copy.
      */}
      <BottomCTASection />
      </main>
      <Footer />
    </div>
  );
}

/* TODO SEO [P1]: replace every href="#" before launch.
   Current placeholder count is ~20 (Sign in, Start for free, nav items, CTAs, mobile drawer).
   Per plan, replace with:
     - Internal (Devart inlinks, descriptive anchors):
         Integrations.html  → "See all 30+ integrations"
         Pricing.html       → "Compare plans"
         index.html         → "Back to Insightis overview"
     - Product link: "Start for free" / "Start for free" → real trial URL
     - Authority outlinks: when the page mentions Stripe / HubSpot / Postgres, link to their official docs once each
   See plan: C:\Users\victorg\.claude\plans\snappy-rolling-hedgehog.md (§ "Placeholder links everywhere")
*/

export default App;
if (typeof window !== 'undefined') {
  const el = document.getElementById('root');
  if (el && el.hasChildNodes()) {
    ReactDOM.hydrateRoot(el, <App />);
  } else if (el) {
    ReactDOM.createRoot(el).render(<App />);
  }
}
