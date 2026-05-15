import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { motion, useInView, AnimatePresence } = (typeof window !== 'undefined' ? window["framer-motion"] : null) || { motion: { div: 'div', span: 'span', p: 'p', h1: 'h1', h2: 'h2', h3: 'h3', button: 'button', a: 'a', section: 'section', nav: 'nav', header: 'header', li: 'li', img: 'img' }, useInView: () => true, AnimatePresence: ({ children }) => children };
const MotionDiv = motion.div;

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <MotionDiv ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </MotionDiv>
  );
}

/* ── CHAT UI HELPERS ── */
function InsightisIcon({size=20}) {
  return (
    <svg width={size} height={Math.round(size*0.895)} viewBox="0 0 25.5 22.84" fill="none">
      <path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/>
    </svg>
  );
}
function GridIcon({size=36, color='#0EC4C1'}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  );
}
function HubSpotMark({size=20}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="22.5" cy="22" r="5.2" stroke="#FF7A59" strokeWidth="2.4" fill="rgba(255,122,89,0.18)"/>
      <circle cx="22.5" cy="9.5" r="2.5" fill="#FF7A59"/>
      <path d="M13.2 13.8l6.4 5.2" stroke="#FF7A59" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="10" cy="15" r="3.8" stroke="#FF7A59" strokeWidth="2.2" fill="none"/>
    </svg>
  );
}

/* ── CHAOS → ORDER ANIMATION ── */
// simpleicons.org removes brand assets when companies request — these slugs
// reliably 404 and produce console noise. Use the clearbit/abbreviation fallback.
const SIMPLEICONS_BAD = new Set([
  'close', 'salesforce', 'drift', 'clari', 'apollostack', 'outreach',
  'copper', 'gong', 'chargebee', 'freshworks', 'docusign', 'mondaydotcom',
  'pipedrive', 'salesloft',
]);

function BrandTile({name, slug, domain, color, size=22}) {
  const [idx, setIdx] = useState(0);
  const hex = color.replace('#','').toLowerCase();
  const sources = [
    slug && !SIMPLEICONS_BAD.has(slug) ? `https://cdn.simpleicons.org/${slug}/${hex}` : null,
    domain ? `https://logo.clearbit.com/${domain}?size=512` : null,
  ].filter(Boolean);
  const imgSize = Math.round(size * 0.72);
  const fallbackSize = Math.round(size * 0.6);
  return (
    <span style={{
      width:`${size}px`,height:`${size}px`,borderRadius: size >= 28 ? '8px' : '6px',
      background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',
      display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
      overflow:'hidden',
    }}>
      {idx < sources.length ? (
        <img
          key={sources[idx]}
          src={sources[idx]}
          width={imgSize} height={imgSize} alt=""
          draggable="false"
          onError={() => setIdx(idx + 1)}
          style={{display:'block',objectFit:'contain'}}
        />
      ) : (
        <svg width={fallbackSize} height={fallbackSize} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="6" rx="8" ry="3"/>
          <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>
        </svg>
      )}
    </span>
  );
}

function ConnectionChatAnimation() {
  const SOURCES = [
    {name:'HubSpot',    slug:'hubspot',        domain:'hubspot.com',    color:'#FF7A59', desc:'CRM'},
    {name:'Stripe',     slug:'stripe',         domain:'stripe.com',     color:'#635BFF', desc:'Payments'},
    {name:'Zoho CRM',   slug:'zoho',           domain:'zoho.com',       color:'#E42527', desc:'CRM'},
    {name:'PostgreSQL', slug:'postgresql',     domain:'postgresql.org', color:'#4169E1', desc:'Database'},
    {name:'BigQuery',   slug:'googlebigquery', domain:null,             color:'#669DF6', desc:'Warehouse'},
    {name:'Snowflake',  slug:'snowflake',      domain:'snowflake.com',  color:'#29B5E8', desc:'Warehouse'},
    {name:'Mixpanel',   slug:'mixpanel',       domain:'mixpanel.com',   color:'#7856FF', desc:'Analytics'},
    {name:'Jira',       slug:'jira',           domain:'atlassian.com',  color:'#2684FF', desc:'Tickets'},
  ];

  const CHAOS_END   = 2800;
  const ORDER_END   = 4000;
  const BEAMS_ON    = 4200;

  const containerRef = useRef(null);
  const sourceRefs   = useRef([]);
  const [phase, setPhase] = useState('chaos');
  const [size, setSize]   = useState({ W: 600, H: 500 });
  const [ring, setRing]   = useState([]); // [{tx, ty}] one per source

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let W = el.clientWidth;
    let H = el.clientHeight;
    const cardW = 150, cardH = 52;
    const centerBoxX = 90, centerBoxY = 90;

    const recalc = () => { W = el.clientWidth; H = el.clientHeight; };
    window.addEventListener('resize', recalc);

    const items = SOURCES.map((s, i) => {
      const isMobile = W < 640;
      const ringRx = isMobile ? Math.min(W * 0.32, W / 2 - 78) : Math.min(W * 0.44, 260);
      const ringRy = isMobile ? Math.min((H - 60) * 0.36, 130) : Math.min((H - 60) * 0.44, 195);
      const angle = (i / SOURCES.length) * Math.PI * 2 - Math.PI / 2;
      let rx, ry;
      do {
        rx = (Math.random() - 0.5) * (W - cardW - 20);
        ry = (Math.random() - 0.5) * (H - cardH - 80);
      } while (Math.abs(rx) < centerBoxX + 40 && Math.abs(ry) < centerBoxY + 20);
      return {
        x: rx, y: ry,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        tx: ringRx * Math.cos(angle),
        ty: ringRy * Math.sin(angle),
      };
    });

    setSize({ W, H });
    setRing(items.map(p => ({ tx: p.tx, ty: p.ty })));

    const phaseRef = { current: 'chaos' };
    let raf, start = null;

    function loop(ts) {
      if (!start) start = ts;
      const t = ts - start;

      if (t >= CHAOS_END && phaseRef.current === 'chaos') {
        phaseRef.current = 'ordering';
        setPhase('ordering');
        const ringRx = Math.min(W * 0.36, 220);
        const ringRy = Math.min((H - 60) * 0.36, 160);
        items.forEach((p, i) => {
          const angle = (i / SOURCES.length) * Math.PI * 2 - Math.PI / 2;
          p.tx = ringRx * Math.cos(angle);
          p.ty = ringRy * Math.sin(angle);
        });
        setRing(items.map(p => ({ tx: p.tx, ty: p.ty })));
      }
      if (t >= ORDER_END && phaseRef.current === 'ordering') {
        phaseRef.current = 'ordered';
        setPhase('ordered');
      }

      if (phaseRef.current === 'chaos') {
        const bx = (W - cardW) / 2 - 4;
        const by = (H - cardH) / 2 - 34;
        items.forEach((p, i) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < -bx || p.x > bx) { p.vx *= -1; p.x = Math.max(-bx, Math.min(bx, p.x)); }
          if (p.y < -by || p.y > by) { p.vy *= -1; p.y = Math.max(-by, Math.min(by, p.y)); }
          const n = sourceRefs.current[i];
          if (n) {
            n.style.transition = 'none';
            n.style.transform = `translate(-50%, -50%) translate(${Math.round(p.x)}px, ${Math.round(p.y)}px)`;
          }
        });
      } else if (phaseRef.current === 'ordering') {
        items.forEach((p, i) => {
          const n = sourceRefs.current[i];
          if (n) {
            n.style.transition = 'transform 1.1s cubic-bezier(0.34, 1.25, 0.5, 1)';
            n.style.transform = `translate(-50%, -50%) translate(${Math.round(p.tx)}px, ${Math.round(p.ty)}px)`;
          }
        });
      }

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', recalc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cx = size.W / 2;
  const cy = size.H / 2 + 10;
  const beamsOn = phase === 'ordered';

  return (
    <div ref={containerRef} style={{
      position:'relative',
      height:'500px',
      borderRadius:'16px',
      border:'1px solid rgba(255,255,255,0.09)',
      background:'#0C1117',
      overflow:'hidden',
      boxShadow:'0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)',
    }}>
      {/* Background */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',background:'radial-gradient(ellipse 55% 50% at 50% 55%, rgba(14,196,193,0.09) 0%, transparent 65%)'}}/>

      {/* Header */}
      <div style={{position:'absolute',top:0,left:0,right:0,padding:'13px 18px',borderBottom:'1px solid rgba(255,255,255,0.07)',display:'flex',alignItems:'center',gap:'9px',background:'rgba(255,255,255,0.015)',zIndex:10}}>
        <div style={{display:'flex',gap:'7px'}}>
          {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
            <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.6}}/>
          ))}
        </div>
        <div style={{flex:1,textAlign:'center',fontSize:'12px',color:'#8AA6B3',fontFamily:'Geist Mono, monospace',letterSpacing:'.02em'}}>
          insightis — integrations
        </div>
        <div style={{width:'46px'}}/>
      </div>

      {/* SVG beams from each ring source to center, with animated colored particles */}
      <svg
        width={size.W}
        height={size.H}
        viewBox={`0 0 ${size.W} ${size.H}`}
        preserveAspectRatio="none"
        style={{
          position:'absolute',
          inset:0,
          pointerEvents:'none',
          zIndex:2,
          opacity: beamsOn ? 1 : 0,
          transition: 'opacity .8s ease',
        }}
      >
        {ring.map((p, i) => {
          const sx = cx + p.tx;
          const sy = cy + p.ty;
          // Stop the beam at the edge of the engine box (144x144, half = 72; +6px margin)
          const dx = cx - sx, dy = cy - sy;
          const absDx = Math.abs(dx), absDy = Math.abs(dy);
          const halfBox = 64;
          const t = absDx > absDy ? halfBox / absDx : halfBox / absDy;
          const ex = cx - dx * t;
          const ey = cy - dy * t;
          const d  = `M${sx.toFixed(1)},${sy.toFixed(1)} L${ex.toFixed(1)},${ey.toFixed(1)}`;
          const color = SOURCES[i].color;
          const dur = (3.4 + (i % 4) * 0.5).toFixed(2);
          const begin = (i * 0.27).toFixed(2);
          return (
            <g key={i}>
              <path d={d} stroke={color} strokeWidth="1" fill="none" opacity="0.32">
                <animate attributeName="opacity" values="0.18;0.45;0.18" dur={`${4 + (i % 3) * 0.7}s`} repeatCount="indefinite"/>
              </path>
              <circle r="2.4" fill={color} opacity="0.9" style={{filter:`drop-shadow(0 0 4px ${color})`}}>
                <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d}/>
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Central engine — home-style */}
      <div style={{
        position:'absolute',
        left:'50%', top:'calc(50% + 10px)',
        transform: `translate(-50%, -50%) scale(${phase === 'chaos' ? 0.55 : 1})`,
        opacity: phase === 'chaos' ? 0.25 : 1,
        transition: 'opacity .8s ease, transform 1s cubic-bezier(0.34,1.56,0.64,1)',
        display:'flex', flexDirection:'column', alignItems:'center', gap:'8px',
        zIndex:4,
      }}>
        <div style={{
          width:'116px', height:'116px',
          borderRadius:'16px',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'8px',
          border:'1px solid rgba(7,128,126,0.5)',
          background:'linear-gradient(135deg, rgba(7,128,126,0.25), rgba(7,128,126,0.08))',
          animation: phase === 'ordered' ? 'corePulse 3s ease-in-out infinite' : 'none',
        }}>
          <GridIcon size={30} color="#0EC4C1"/>
          <span style={{fontSize:'12px', fontWeight:500, color:'#0EC4C1', textAlign:'center', lineHeight:1.2}}>Insightis<br/>Semantic AI</span>
        </div>
      </div>

      {/* Source cards (home-style: icon-tile + title + subtitle, animated chaotic→ring) */}
      {SOURCES.map((s, i) => (
        <div key={i} ref={el => sourceRefs.current[i] = el} style={{
          position:'absolute',
          left:'50%', top:'calc(50% + 10px)',
          display:'inline-flex', alignItems:'center',
          gap:'11px',
          padding:'10px 14px',
          background:'#131820',
          border:'1px solid rgba(255,255,255,0.06)',
          borderRadius:'12px',
          boxShadow:'0 1px 3px rgba(0,0,0,0.30), 0 4px 12px rgba(0,0,0,0.20)',
          willChange:'transform',
          zIndex:5,
        }}>
          <BrandTile name={s.name} slug={s.slug} domain={s.domain} color={s.color} size={40}/>
          <div style={{display:'flex', flexDirection:'column', gap:'1px'}}>
            <span style={{fontSize:'13px', fontWeight:600, color:'#FFFFFF', letterSpacing:'-0.01em', whiteSpace:'nowrap', lineHeight:1.2}}>{s.name}</span>
            <span style={{fontSize:'11px', fontWeight:400, color:'#7A8A9A', letterSpacing:'-0.005em', whiteSpace:'nowrap', lineHeight:1.2}}>{s.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── HERO ── */
function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(()=>{ const t=setTimeout(()=>setVis(true),300); return()=>clearTimeout(t); },[]);
  return (
    <section style={{display:'flex',alignItems:'flex-start',position:'relative',overflow:'hidden',padding:'120px 0 160px'}}>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 72% 50%,rgba(9,160,157,0.09) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 20% 50%,rgba(59,31,94,0.12) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>

      <div className="hero-grid" style={{position:'relative',zIndex:10,maxWidth:'1240px',width:'calc(100% - 32px)',margin:'0 auto',display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:'60px',alignItems:'center'}}>

        {/* LEFT: Text */}
        <div style={{
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 0',
        }}>
          <h1 style={{fontSize:'clamp(2.2rem,3.2vw,3.6rem)',fontWeight:700,fontFamily:"'Outfit', sans-serif",letterSpacing:'-.04em',lineHeight:1.1,marginBottom:'22px'}}>
            <span style={{color:'#FFFFFF'}}>Connect everything.</span><br/>
            <span style={{color:'#0EC4C1'}}>Understand</span><br/>
            <span style={{color:'#0EC4C1'}}>anything.</span>
          </h1>
          <p style={{fontSize:'clamp(16px,1.2vw,18px)',color:'rgba(255,255,255,.75)',lineHeight:1.7,marginBottom:'36px',maxWidth:'480px'}}>
            Plug in your CRM, warehouse, ads and product tools. Query every source in plain English — no SQL, no waiting.
          </p>
          <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap',marginBottom:'24px'}}>
            <a href="#" className="cta-btn" style={{display:'inline-flex',alignItems:'center',gap:'7px',padding:'12px 28px',borderRadius:'999px',background:'linear-gradient(135deg,#09A09D,#07807E)',color:'#fff',fontWeight:600,fontSize:'14px',textDecoration:'none',boxShadow:'0 0 30px rgba(9,160,157,.25), 0 4px 12px rgba(0,0,0,.3)'}}>
              Start for free
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'18px',flexWrap:'wrap'}}>
            {['Free plan','No SQL required','Setup in minutes'].map(t=>(
              <span key={t} style={{display:'flex',alignItems:'center',gap:'5px',fontSize:'12px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',fontVariantNumeric:'tabular-nums'}}>
                <span style={{color:'#09A09D'}}>✓</span>{t}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT: Connection → chat animation */}
        <div className="hero-anim">
          <ConnectionChatAnimation/>
        </div>
      </div>
    </section>
  );
}

/* ── CONNECTORS DATA ── */
const CONNECTORS = {
  'RevOps & BizOps': [
    { name:'Stripe',      slug:'stripe',          abbr:'S',   color:'#6772e5', bg:'rgba(103,114,229,.12)', desc:'Revenue, MRR & subscriptions' },
    { name:'HubSpot',     slug:'hubspot',         abbr:'H',   color:'#ff7a59', bg:'rgba(255,122,89,.12)',  desc:'CRM, deals & pipeline' },
    { name:'Salesforce',  slug:'salesforce',      abbr:'SF',  color:'#00a1e0', bg:'rgba(0,161,224,.12)',   desc:'Enterprise CRM & opportunities' },
    { name:'Chargebee',   slug:'chargebee',       abbr:'CB',  color:'#f76d2b', bg:'rgba(247,109,43,.12)',  desc:'Subscription billing' },
    { name:'Pipedrive',   slug:'pipedrive',       abbr:'PD',  color:'#1f9e42', bg:'rgba(31,158,66,.12)',   desc:'Sales pipeline management' },
    { name:'Close',       slug:'close',           abbr:'CL',  color:'#5c90d2', bg:'rgba(92,144,210,.12)',  desc:'Sales CRM & sequences' },
    { name:'Zoho CRM',    slug:'zoho',            abbr:'ZH',  color:'#e42527', bg:'rgba(228,37,39,.12)',   desc:'Mid-market CRM & pipeline' },
    { name:'Zendesk Sell',slug:'zendesk',         abbr:'ZS',  color:'#03363d', bg:'rgba(3,54,61,.18)',     desc:'Support-led sales CRM' },
    { name:'Freshsales',  slug:'freshworks',      abbr:'FS',  color:'#ff5a1f', bg:'rgba(255,90,31,.12)',   desc:'SMB CRM & sequences' },
    { name:'Outreach',    slug:'outreach',        abbr:'OR',  color:'#5952ff', bg:'rgba(89,82,255,.12)',   desc:'Sales engagement & plays' },
    { name:'Gong',        slug:'gong',            abbr:'GN',  color:'#7d3cf4', bg:'rgba(125,60,244,.12)',  desc:'Call intelligence & coaching' },
    { name:'Clari',       slug:'clari',           abbr:'CR',  color:'#fa8d00', bg:'rgba(250,141,0,.12)',   desc:'Forecast & revenue ops' },
    { name:'Copper',      slug:'copper',          abbr:'CP',  color:'#ff6f61', bg:'rgba(255,111,97,.12)',  desc:'Google-native CRM' },
    { name:'Monday',      slug:'mondaydotcom',    abbr:'MD',  color:'#ff3d57', bg:'rgba(255,61,87,.12)',   desc:'Sales ops & workflows' },
    { name:'DocuSign',    slug:'docusign',        abbr:'DS',  color:'#ffcc22', bg:'rgba(255,204,34,.12)',  desc:'Contracts & e-signatures' },
    { name:'Calendly',    slug:'calendly',        abbr:'CA',  color:'#006bff', bg:'rgba(0,107,255,.12)',   desc:'Meeting scheduling data' },
    { name:'Apollo',      slug:'apollostack',     abbr:'AP',  color:'#1e3a8a', bg:'rgba(30,58,138,.18)',   desc:'Prospecting & sales intel' },
    { name:'Salesloft',   slug:'salesloft',       abbr:'SL',  color:'#1a1a1a', bg:'rgba(255,255,255,.06)', desc:'Sales engagement platform' },
    { name:'Aircall',     slug:'aircall',         abbr:'AI',  color:'#00b388', bg:'rgba(0,179,136,.12)',   desc:'Cloud phone & call data' },
    { name:'Drift',       slug:'drift',           abbr:'DF',  color:'#ff5c35', bg:'rgba(255,92,53,.12)',   desc:'Conversational marketing' },
  ],
  'Founders & CEOs': [
    { name:'Stripe',      slug:'stripe',          abbr:'S',   color:'#6772e5', bg:'rgba(103,114,229,.12)', desc:'Revenue & growth metrics' },
    { name:'QuickBooks',  slug:'quickbooks',      abbr:'QB',  color:'#2ca01c', bg:'rgba(44,160,28,.12)',   desc:'P&L, cash flow & burn rate' },
    { name:'PostgreSQL',  slug:'postgresql',      abbr:'PG',  color:'#336791', bg:'rgba(51,103,145,.12)',  desc:'Core business database' },
    { name:'HubSpot',     slug:'hubspot',         abbr:'H',   color:'#ff7a59', bg:'rgba(255,122,89,.12)',  desc:'Pipeline & customer health' },
    { name:'Mixpanel',    slug:'mixpanel',        abbr:'MP',  color:'#a855f7', bg:'rgba(168,85,247,.12)',  desc:'Product & retention metrics' },
    { name:'Xero',        slug:'xero',            abbr:'X',   color:'#13b5ea', bg:'rgba(19,181,234,.12)',  desc:'Accounting & financials' },
    { name:'NetSuite',    slug:'netsuite',        abbr:'NS',  color:'#009ee2', bg:'rgba(0,158,226,.12)',   desc:'ERP & consolidated finance' },
    { name:'Brex',        slug:'brex',            abbr:'BX',  color:'#d4c0a8', bg:'rgba(212,192,168,.14)', desc:'Corporate spend & cards' },
    { name:'Ramp',        slug:'ramp',            abbr:'RM',  color:'#fff27a', bg:'rgba(255,242,122,.12)', desc:'Spend management & AP' },
    { name:'Mercury',     slug:'mercury',         abbr:'MC',  color:'#5465ff', bg:'rgba(84,101,255,.12)',  desc:'Banking & cash position' },
    { name:'Carta',       slug:'carta',           abbr:'CT',  color:'#2d91df', bg:'rgba(45,145,223,.12)',  desc:'Cap table & equity' },
    { name:'Plaid',       slug:'plaid',           abbr:'PL',  color:'#111111', bg:'rgba(255,255,255,.06)', desc:'Bank & payments data' },
    { name:'Chargebee',   slug:'chargebee',       abbr:'CB',  color:'#f76d2b', bg:'rgba(247,109,43,.12)',  desc:'Subscription economics' },
    { name:'Gusto',       slug:'gusto',           abbr:'GU',  color:'#f45d48', bg:'rgba(244,93,72,.12)',   desc:'Headcount & payroll' },
    { name:'Snowflake',   slug:'snowflake',       abbr:'SN',  color:'#29b5e8', bg:'rgba(41,181,232,.12)',  desc:'Unified data warehouse' },
    { name:'Salesforce',  slug:'salesforce',      abbr:'SF',  color:'#00a1e0', bg:'rgba(0,161,224,.12)',   desc:'Enterprise pipeline' },
    { name:'Asana',       slug:'asana',           abbr:'AS',  color:'#f06a6a', bg:'rgba(240,106,106,.12)', desc:'Company-wide priorities' },
    { name:'Notion',      slug:'notion',          abbr:'NT',  color:'#ffffff', bg:'rgba(255,255,255,.08)', desc:'Strategy & team wiki' },
    { name:'AWS',         slug:'amazonaws',       abbr:'AW',  color:'#ff9900', bg:'rgba(255,153,0,.12)',   desc:'Cloud infra & billing' },
    { name:'ClickUp',     slug:'clickup',         abbr:'CU',  color:'#7b68ee', bg:'rgba(123,104,238,.12)', desc:'Company OKRs & roadmap' },
  ],
  'CMOs & Marketers': [
    { name:'GA4',         slug:'googleanalytics', abbr:'GA',  color:'#f9ab00', bg:'rgba(249,171,0,.12)',   desc:'Website traffic & conversions' },
    { name:'Google Ads',  slug:'googleads',       abbr:'GD',  color:'#4285f4', bg:'rgba(66,133,244,.12)',  desc:'Ad spend & campaign ROI' },
    { name:'Meta Ads',    slug:'meta',            abbr:'FB',  color:'#1877f2', bg:'rgba(24,119,242,.12)',  desc:'Facebook & Instagram ads' },
    { name:'LinkedIn Ads',slug:'linkedin',        abbr:'LI',  color:'#0a66c2', bg:'rgba(10,102,194,.12)',  desc:'B2B ad performance' },
    { name:'Mailchimp',   slug:'mailchimp',       abbr:'MC',  color:'#e8a320', bg:'rgba(232,163,32,.12)',  desc:'Email campaigns & lists' },
    { name:'Klaviyo',     slug:'klaviyo',         abbr:'KL',  color:'#9b4dca', bg:'rgba(155,77,202,.12)',  desc:'Email & SMS automation' },
    { name:'TikTok Ads',  slug:'tiktok',          abbr:'TT',  color:'#ff0050', bg:'rgba(255,0,80,.12)',    desc:'Short-form ad spend & ROAS' },
    { name:'Pinterest Ads',slug:'pinterest',      abbr:'PI',  color:'#e60023', bg:'rgba(230,0,35,.12)',    desc:'Discovery ad performance' },
    { name:'X Ads',       slug:'x',               abbr:'X',   color:'#ffffff', bg:'rgba(255,255,255,.08)', desc:'Twitter/X campaigns' },
    { name:'Marketo',     slug:'marketo',         abbr:'MK',  color:'#5c4c9f', bg:'rgba(92,76,159,.12)',   desc:'B2B marketing automation' },
    { name:'Braze',       slug:'braze',           abbr:'BZ',  color:'#ffa300', bg:'rgba(255,163,0,.12)',   desc:'Cross-channel messaging' },
    { name:'Customer.io', slug:'customerio',      abbr:'CI',  color:'#7c30eb', bg:'rgba(124,48,235,.12)',  desc:'Behavioral messaging' },
    { name:'ActiveCampaign',slug:'activecampaign',abbr:'AC',  color:'#356ae6', bg:'rgba(53,106,230,.12)',  desc:'Email & CRM automation' },
    { name:'Iterable',    slug:'iterable',        abbr:'IT',  color:'#ffb400', bg:'rgba(255,180,0,.12)',   desc:'Growth marketing platform' },
    { name:'Intercom',    slug:'intercom',        abbr:'IC',  color:'#1f8ded', bg:'rgba(31,141,237,.12)',  desc:'In-app & lifecycle messages' },
    { name:'HubSpot',     slug:'hubspot',         abbr:'H',   color:'#ff7a59', bg:'rgba(255,122,89,.12)',  desc:'Inbound & nurture campaigns' },
    { name:'Segment',     slug:'segment',         abbr:'SG',  color:'#52bd94', bg:'rgba(82,189,148,.12)',  desc:'Customer data pipeline' },
    { name:'Shopify',     slug:'shopify',         abbr:'SH',  color:'#96bf48', bg:'rgba(150,191,72,.12)',  desc:'Storefront & commerce data' },
    { name:'YouTube',     slug:'youtube',         abbr:'YT',  color:'#ff0000', bg:'rgba(255,0,0,.12)',     desc:'Video ads & channel metrics' },
    { name:'SendGrid',    slug:'sendgrid',        abbr:'SD',  color:'#1a82e2', bg:'rgba(26,130,226,.12)',  desc:'Transactional email' },
  ],
  'Product Teams': [
    { name:'Mixpanel',    slug:'mixpanel',        abbr:'MP',  color:'#a855f7', bg:'rgba(168,85,247,.12)',  desc:'User events & funnels' },
    { name:'Amplitude',   slug:'amplitude',       abbr:'AM',  color:'#2196f3', bg:'rgba(33,150,243,.12)',  desc:'Behavioral analytics' },
    { name:'Segment',     slug:'segment',         abbr:'SG',  color:'#52bd95', bg:'rgba(82,189,149,.12)',  desc:'Customer data pipeline' },
    { name:'Heap',        slug:'heap',            abbr:'HP',  color:'#7c3aed', bg:'rgba(124,58,237,.12)',  desc:'Auto-captured user actions' },
    { name:'Intercom',    slug:'intercom',        abbr:'IC',  color:'#286ef1', bg:'rgba(40,110,241,.12)',  desc:'Support & onboarding data' },
    { name:'Pendo',       slug:'pendo',           abbr:'PN',  color:'#ff4081', bg:'rgba(255,64,129,.12)',  desc:'Feature adoption & NPS' },
    { name:'PostHog',     slug:'posthog',         abbr:'PH',  color:'#f54e00', bg:'rgba(245,78,0,.12)',    desc:'Product analytics & session' },
    { name:'Hotjar',      slug:'hotjar',          abbr:'HJ',  color:'#ff3c00', bg:'rgba(255,60,0,.12)',    desc:'Heatmaps & session recordings' },
    { name:'FullStory',   slug:'fullstory',       abbr:'FY',  color:'#ff5700', bg:'rgba(255,87,0,.12)',    desc:'Digital experience analytics' },
    { name:'LogRocket',   slug:'logrocket',       abbr:'LR',  color:'#764abc', bg:'rgba(118,74,188,.12)',  desc:'Session replay & errors' },
    { name:'LaunchDarkly',slug:'launchdarkly',    abbr:'LD',  color:'#405bff', bg:'rgba(64,91,255,.12)',   desc:'Feature flags & experiments' },
    { name:'Split',       slug:'split',           abbr:'SP',  color:'#5551ff', bg:'rgba(85,81,255,.12)',   desc:'Experimentation platform' },
    { name:'Appcues',     slug:'appcues',         abbr:'AP',  color:'#5c5cff', bg:'rgba(92,92,255,.12)',   desc:'In-product onboarding' },
    { name:'Userpilot',   slug:'userpilot',       abbr:'UP',  color:'#ff5050', bg:'rgba(255,80,80,.12)',   desc:'Onboarding & product tours' },
    { name:'June',        slug:'june',            abbr:'JN',  color:'#ffc94a', bg:'rgba(255,201,74,.12)',  desc:'Auto-generated insights' },
    { name:'Plausible',   slug:'plausible',       abbr:'PL',  color:'#5850ec', bg:'rgba(88,80,236,.12)',   desc:'Privacy-first analytics' },
    { name:'Datadog',     slug:'datadog',         abbr:'DD',  color:'#632ca6', bg:'rgba(99,44,166,.12)',   desc:'Performance & observability' },
    { name:'Sentry',      slug:'sentry',          abbr:'SN',  color:'#362d59', bg:'rgba(54,45,89,.18)',    desc:'Error tracking & release' },
    { name:'Zendesk',     slug:'zendesk',         abbr:'ZD',  color:'#03363d', bg:'rgba(3,54,61,.18)',     desc:'Support ticket signals' },
    { name:'Figma',       slug:'figma',           abbr:'FG',  color:'#f24e1e', bg:'rgba(242,78,30,.12)',   desc:'Design & prototype usage' },
  ],
  'Data & Analytics': [
    { name:'PostgreSQL',  slug:'postgresql',      abbr:'PG',  color:'#336791', bg:'rgba(51,103,145,.12)',  desc:'Relational SQL database' },
    { name:'Snowflake',   slug:'snowflake',       abbr:'SN',  color:'#29b5e8', bg:'rgba(41,181,232,.12)',  desc:'Cloud data warehouse' },
    { name:'BigQuery',    slug:'googlebigquery',  abbr:'BQ',  color:'#4285f4', bg:'rgba(66,133,244,.12)',  desc:'Google analytics warehouse' },
    { name:'Redshift',    slug:'amazonredshift',  abbr:'RS',  color:'#d13212', bg:'rgba(209,50,18,.12)',   desc:'AWS data warehouse' },
    { name:'MongoDB',     slug:'mongodb',         abbr:'MG',  color:'#47a248', bg:'rgba(71,162,72,.12)',   desc:'Document database' },
    { name:'dbt',         slug:'dbt',             abbr:'dbt', color:'#f76d2b', bg:'rgba(247,109,43,.12)',  desc:'Transformation & modeling' },
    { name:'Databricks',  slug:'databricks',      abbr:'DB',  color:'#ff3621', bg:'rgba(255,54,33,.12)',   desc:'Lakehouse & ML platform' },
    { name:'MySQL',       slug:'mysql',           abbr:'MY',  color:'#4479a1', bg:'rgba(68,121,161,.12)',  desc:'Open-source SQL database' },
    { name:'ClickHouse',  slug:'clickhouse',      abbr:'CH',  color:'#ffcc00', bg:'rgba(255,204,0,.12)',   desc:'Columnar analytics DB' },
    { name:'Fivetran',    slug:'fivetran',        abbr:'FT',  color:'#2196f3', bg:'rgba(33,150,243,.12)',  desc:'Managed data pipelines' },
    { name:'Airbyte',     slug:'airbyte',         abbr:'AB',  color:'#615eff', bg:'rgba(97,94,255,.12)',   desc:'Open-source data ingest' },
    { name:'Hex',         slug:'hex',             abbr:'HX',  color:'#5c5cff', bg:'rgba(92,92,255,.12)',   desc:'Collaborative notebooks' },
    { name:'Metabase',    slug:'metabase',        abbr:'MB',  color:'#509ee3', bg:'rgba(80,158,227,.12)',  desc:'Open-source BI & dashboards' },
    { name:'Looker',      slug:'looker',          abbr:'LK',  color:'#4285f4', bg:'rgba(66,133,244,.12)',  desc:'Modern BI & LookML' },
    { name:'Tableau',     slug:'tableau',         abbr:'TB',  color:'#e97627', bg:'rgba(233,118,39,.12)',  desc:'Enterprise visualization' },
    { name:'Power BI',    slug:'powerbi',         abbr:'PB',  color:'#f2c811', bg:'rgba(242,200,17,.12)',  desc:'Microsoft BI suite' },
    { name:'Supabase',    slug:'supabase',        abbr:'SB',  color:'#3ecf8e', bg:'rgba(62,207,142,.12)',  desc:'Postgres-as-a-service' },
    { name:'Elastic',     slug:'elastic',         abbr:'EL',  color:'#005571', bg:'rgba(0,85,113,.18)',    desc:'Search & log analytics' },
    { name:'Kafka',       slug:'apachekafka',     abbr:'KF',  color:'#231f20', bg:'rgba(255,255,255,.06)', desc:'Event streaming platform' },
    { name:'Airflow',     slug:'apacheairflow',   abbr:'AF',  color:'#017cee', bg:'rgba(1,124,238,.12)',   desc:'Data orchestration & DAGs' },
  ],
  'Ops & Finance': [
    { name:'QuickBooks',  slug:'quickbooks',      abbr:'QB',  color:'#2ca01c', bg:'rgba(44,160,28,.12)',   desc:'Accounting & reports' },
    { name:'Xero',        slug:'xero',            abbr:'X',   color:'#13b5ea', bg:'rgba(19,181,234,.12)',  desc:'Cloud accounting' },
    { name:'NetSuite',    slug:'netsuite',        abbr:'NS',  color:'#009ee2', bg:'rgba(0,158,226,.12)',   desc:'ERP & finance management' },
    { name:'Gusto',       slug:'gusto',           abbr:'GU',  color:'#f45d48', bg:'rgba(244,93,72,.12)',   desc:'Payroll & HR data' },
    { name:'Jira',        slug:'jira',            abbr:'JR',  color:'#0052cc', bg:'rgba(0,82,204,.12)',    desc:'Sprint & project tracking' },
    { name:'Linear',      slug:'linear',          abbr:'LN',  color:'#5e6ad2', bg:'rgba(94,106,210,.12)',  desc:'Engineering velocity' },
    { name:'Asana',       slug:'asana',           abbr:'AS',  color:'#f06a6a', bg:'rgba(240,106,106,.12)', desc:'Task & project management' },
    { name:'Monday',      slug:'mondaydotcom',    abbr:'MD',  color:'#ff3d57', bg:'rgba(255,61,87,.12)',   desc:'Work OS & operations' },
    { name:'Notion',      slug:'notion',          abbr:'NT',  color:'#ffffff', bg:'rgba(255,255,255,.08)', desc:'Docs, wikis & workflows' },
    { name:'Rippling',    slug:'rippling',        abbr:'RP',  color:'#f9b917', bg:'rgba(249,185,23,.12)',  desc:'HR, IT & finance OS' },
    { name:'Deel',        slug:'deel',            abbr:'DL',  color:'#001e3c', bg:'rgba(0,30,60,.18)',     desc:'Global payroll & EOR' },
    { name:'BambooHR',    slug:'bamboohr',        abbr:'BH',  color:'#73c41d', bg:'rgba(115,196,29,.12)',  desc:'HR info & records' },
    { name:'Workday',     slug:'workday',         abbr:'WD',  color:'#f38c00', bg:'rgba(243,140,0,.12)',   desc:'Enterprise HCM & finance' },
    { name:'Bill.com',    slug:'bill',            abbr:'BL',  color:'#ee3524', bg:'rgba(238,53,36,.12)',   desc:'AP / AR automation' },
    { name:'Expensify',   slug:'expensify',       abbr:'EX',  color:'#03d47c', bg:'rgba(3,212,124,.12)',   desc:'Expense management' },
    { name:'Slack',       slug:'slack',           abbr:'SL',  color:'#4a154b', bg:'rgba(74,21,75,.18)',    desc:'Team comms & alerts' },
    { name:'ClickUp',     slug:'clickup',         abbr:'CU',  color:'#7b68ee', bg:'rgba(123,104,238,.12)', desc:'Tasks, docs & goals' },
    { name:'Trello',      slug:'trello',          abbr:'TR',  color:'#0052cc', bg:'rgba(0,82,204,.12)',    desc:'Kanban boards & workflows' },
    { name:'Confluence',  slug:'confluence',      abbr:'CF',  color:'#172b4d', bg:'rgba(23,43,77,.18)',    desc:'Team docs & knowledge base' },
    { name:'Zoom',        slug:'zoom',            abbr:'ZM',  color:'#2d8cff', bg:'rgba(45,140,255,.12)',  desc:'Meetings & webinar data' },
  ],
};

/* ── CONNECTOR ICON ── */
function ConnectorIcon({ name, slug, abbr, color, bg }) {
  const [failed, setFailed] = useState(false);
  const useIcon = slug && !SIMPLEICONS_BAD.has(slug) && !failed;
  return (
    <div className="connector-icon" style={{background: bg, color: color}}>
      {useIcon
        ? <img
            src={`https://cdn.simpleicons.org/${slug}`}
            width="20" height="20"
            alt={name}
            draggable="false"
            onError={() => setFailed(true)}
            style={{display:'block', objectFit:'contain'}}
          />
        : <span>{abbr}</span>
      }
    </div>
  );
}

/* ── CONNECTORS GALLERY ── */
function ConnectorsGallery() {
  const cats = Object.keys(CONNECTORS);
  const [activeCat, setActiveCat] = useState(cats[0]);

  return (
    <section style={{padding:'100px 0 120px', background:'linear-gradient(180deg,#0D1117 0%,#101620 100%)'}}>
      <div style={{maxWidth:'80rem',margin:'0 auto',padding:'0 1.5rem'}}>

        {/* Heading */}
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'16px'}}>
            <span style={{color:'#09A09D',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'#09A09D',fontFamily:'Geist Mono,monospace'}}>Built for every team</span>
          </div>
          <h2 style={{fontSize:'clamp(2.25rem,4vw,3.25rem)',fontWeight:700,fontFamily:"'Outfit', sans-serif",color:'#fff',letterSpacing:'-.04em',lineHeight:1.05,marginBottom:'16px',textWrap:'balance'}}>
            Which data sources does Insightis integrate with?
          </h2>
          <p style={{fontSize:'clamp(1rem,1.8vw,1.19rem)',color:'rgba(255,255,255,0.7)',maxWidth:'42rem',margin:'0 auto',lineHeight:1.7}}>
            200+ connectors across CRMs, warehouses, and finance — synced live, ready to query.
          </p>
        </div>

        {/* Category tabs */}
        <div style={{display:'flex',justifyContent:'center',gap:'8px',marginBottom:'28px',flexWrap:'wrap'}}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)} style={{
              padding:'7px 18px',borderRadius:'999px',fontSize:'13px',fontWeight:500,
              cursor:'pointer',fontFamily:'Geist,sans-serif',transition:'all .15s',
              border:`1px solid ${cat===activeCat?'rgba(9,160,157,.5)':'rgba(255,255,255,.08)'}`,
              background: cat===activeCat?'rgba(9,160,157,.08)':'transparent',
              color: cat===activeCat?'#0EC4C1':'#7FA0AC',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))',
          gap:'10px',
        }}>
          {CONNECTORS[activeCat].map((c, i) => (
            <div key={c.name} className="connector-card">
              <ConnectorIcon name={c.name} slug={c.slug} abbr={c.abbr} color={c.color} bg={c.bg}/>
              <div style={{minWidth:0}}>
                <div style={{fontSize:'0.875rem',fontWeight:500,color:'#fff',marginBottom:'3px'}}>{c.name}</div>
                <div style={{fontSize:'12px',color:'#8A9BA4',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.desc}</div>
              </div>
              <div style={{marginLeft:'auto',flexShrink:0,width:6,height:6,borderRadius:'50%',background:'#22C55E',boxShadow:'0 0 6px rgba(34,197,94,.6)'}}/>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{textAlign:'center',marginTop:'32px'}}>
          <span style={{fontSize:'12.5px',color:'#8A9BA4',fontFamily:'Geist Mono,monospace'}}>
            + 200 more connectors available ·{' '}
            <a href="#" style={{color:'rgba(9,160,157,.7)',textDecoration:'none'}}>see full list →</a>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── HOW SYNC WORKS ── */
function HowSyncWorks() {
  const steps = [
    {
      // TODO SEO [P2]: Reconcile connector count with hero/FAQ ("200+" everywhere else).
      // Hero says "200+", FAQ draft says "200+", this step card says "40+". Pick one truthful number
      // and use it consistently across hero copy, this step, the FAQ answer, and SoftwareApplication schema.
      // Assumed canonical = "200+" per the audit's "Out of scope" reconciliation note; change if product confirms "40+".
      n:'01', title:'Connect in minutes',
      desc:'Authenticate with OAuth or API key. 200+ read-only connectors live in under 5 minutes — SOC 2 secured.',
      example:'OAuth / API key → 200+ connectors in 5 min, read-only & SOC 2 secured',
    },
    {
      n:'02', title:'Semantic layer maps it',
      desc:'Insightis maps fields to certified metrics like MRR, CAC, NRR, WAU — one trusted truth across every connected source.',
      example:'MRR · CAC · NRR · WAU → auto-mapped with conflict resolution',
    },
    {
      n:'03', title:'Ask in plain English',
      desc:'Your team asks questions in plain English. Insightis joins the right sources and returns a precise answer — no SQL, no ticket.',
      example:'"Why did CAC spike last week?" → precise answer with drill-down and follow-ups',
    },
  ];

  return (
    <section style={{padding:'120px 0 140px',background:'#0A0E13'}}>
      <div style={{maxWidth:'80rem',margin:'0 auto',padding:'0 1.5rem'}}>
        <div style={{textAlign:'center',marginBottom:'64px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'16px'}}>
            <span style={{color:'#09A09D',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'#09A09D',fontFamily:'Geist Mono,monospace'}}>How it works</span>
          </div>
          <h2 style={{fontSize:'clamp(2.25rem,4vw,3.25rem)',fontWeight:700,fontFamily:"'Outfit', sans-serif",color:'#fff',letterSpacing:'-.04em',lineHeight:1.05,textWrap:'balance'}}>
            How does Insightis connect to your data sources?
          </h2>
        </div>

        {/* Horizontal stepper */}
        <div data-steps-grid style={{display:'grid',gridTemplateColumns:`repeat(${steps.length}, 1fr)`,gap:'24px',position:'relative'}}>
          {steps.map((s,i) => (
            <div key={i} data-step-cell style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',padding:'0 8px'}}>
              {/* Connector line — to the right of every step except the last */}
              {i < steps.length - 1 && (
                <div data-step-connector style={{position:'absolute',top:'28px',left:'calc(50% + 36px)',right:'calc(-50% + 36px)',height:'1px',background:'linear-gradient(90deg, rgba(9,160,157,.45) 0%, rgba(9,160,157,.18) 100%)',zIndex:0}}/>
              )}

              {/* Numbered circle */}
              <div style={{
                position:'relative',zIndex:1,
                width:'56px',height:'56px',borderRadius:'50%',
                border:'1px solid rgba(9,160,157,.45)',
                background:'radial-gradient(circle at 50% 30%, rgba(9,160,157,.18) 0%, rgba(13,17,23,.95) 75%)',
                display:'flex',alignItems:'center',justifyContent:'center',
                boxShadow:'0 0 28px rgba(9,160,157,.18), inset 0 1px 0 rgba(255,255,255,.05)',
                marginBottom:'22px',
              }}>
                <span style={{fontSize:'18px',fontWeight:600,color:'#0EC4C1',fontFamily:"'Outfit', sans-serif",letterSpacing:'-.02em',fontVariantNumeric:'tabular-nums'}}>{s.n}</span>
              </div>

              {/* Title */}
              <h3 style={{fontSize:'18px',fontWeight:700,fontFamily:"'Outfit', sans-serif",color:'#fff',letterSpacing:'-.02em',margin:'0 0 10px',lineHeight:1.2}}>
                {s.title}
              </h3>

              {/* Description */}
              <p style={{fontSize:'14px',color:'#7FA0AC',lineHeight:1.7,margin:'0 0 16px',width:'100%',maxWidth:'320px'}}>
                {s.desc}
              </p>

              {/* Example chip */}
              <div style={{padding:'10px 14px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(255,255,255,.06)',borderRadius:'8px',fontSize:'12px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',fontStyle:'italic',width:'100%',maxWidth:'320px',boxSizing:'border-box'}}>
                {s.example}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile responsive overrides */}
        <style>{`
          @media (max-width: 768px) {
            [data-steps-grid] {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
            }
            [data-steps-grid] [data-step-connector] {
              display: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ── INTEGRATION IMPACT ── */
function IntegrationImpact() {
  const STATS = [
    { display:'12×',  label:'faster time to insight',              sub:'vs. manual exports & BI tools' },
    { display:'90%',  label:'fewer data requests',  sub:'teams self-serve in plain English' },
  ];

  return (
    <section style={{padding:'120px 0 140px', background:'linear-gradient(180deg,#101620 0%,#0A0E13 100%)'}}>
      <div style={{maxWidth:'80rem',margin:'0 auto',padding:'0 1.5rem'}}>

        {/* Heading */}
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'16px'}}>
            <span style={{color:'#09A09D',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'#09A09D',fontFamily:'Geist Mono,monospace'}}>Why direct integration matters</span>
          </div>
          <h2 style={{fontSize:'clamp(2.25rem,4vw,3.25rem)',fontWeight:700,fontFamily:"'Outfit', sans-serif",color:'#fff',letterSpacing:'-.04em',lineHeight:1.05,marginBottom:'14px',textWrap:'balance'}}>
            Tools guess. Insightis answers.
          </h2>
          <p style={{fontSize:'17px',color:'rgba(255,255,255,.7)',maxWidth:'500px',margin:'0 auto',lineHeight:1.7}}>
            One source of truth. Answers in seconds.
          </p>
          {/* TODO SEO [P1]: Replace the two <div>-based comparison cards below with a semantic <table>
              for AI/SERP extraction. Columns: "Dimension | Disconnected data | Insightis".
              Rows from audit:
                Time to one answer        | 3-5 days              | Seconds
                Analyst hours/week lost   | 8 hrs                 | 0 (self-serve)
                Tools touched per request | 4                     | 1 (Insightis)
                Source of truth           | Scattered             | Semantic layer
              Keep the visual gradient/colored styling on the <tr>/<td>s via CSS; the current colored
              cards can stay visually, but the <table> must also render so crawlers can extract it. */}
        </div>

        {/* Comparison cards */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',alignItems:'stretch'}}>
          {/* Disconnected data */}
          <div className="compare-card" style={{background:'rgba(248,113,113,.04)',border:'1px solid rgba(248,113,113,.15)',borderRadius:'16px',padding:'32px',display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'22px'}}>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#F87171'}}/>
              <span style={{fontSize:'13px',fontWeight:600,color:'#F87171'}}>Disconnected data</span>
            </div>
            <div style={{flex:1,background:'rgba(0,0,0,.3)',borderRadius:'10px',padding:'16px',marginBottom:'12px',fontFamily:'Geist Mono,monospace',display:'flex',flexDirection:'column'}}>
              <div style={{fontSize:'11px',color:'#8AA6B3',marginBottom:'10px'}}>→ "Which channel drove the most signups last month?"</div>
              
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {[
                  {display:'3–5 days', label:'to produce one number',            sub:'export CSVs, VLOOKUP, reconcile by hand'},
                  {display:'4 tools',  label:'to query for a request',   sub:'HubSpot, Stripe and the warehouse'},
                ].map((s, i) => (
                  <div key={i} style={{display:'flex',alignItems:'baseline',gap:'12px',fontSize:'12.5px',lineHeight:1.45}}>
                    <span style={{color:'#F87171',fontWeight:600,minWidth:'64px',flexShrink:0,fontVariantNumeric:'tabular-nums',letterSpacing:'-.02em'}}>
                      {s.display}
                    </span>
                    <span style={{minWidth:0}}>
                      <span style={{color:'#8A8A9A'}}>{s.label}</span>
                      <span style={{color:'#5E5E70'}}> — {s.sub}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{fontSize:'12px',color:'rgba(248,113,113,.6)',fontStyle:'italic'}}>Exports, manual joins, copy-pasted dashboards. Stale by the time they land.</p>
          </div>

          {/* Insightis */}
          <div className="compare-card" style={{background:'rgba(9,160,157,.05)',border:'1px solid rgba(9,160,157,.25)',borderRadius:'16px',padding:'32px',position:'relative',boxShadow:'0 8px 40px rgba(9,160,157,0.06)',display:'flex',flexDirection:'column'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(9,160,157,.6),transparent)',borderRadius:'16px 16px 0 0'}}/>
            <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'22px'}}>
              <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#0EC4C1',boxShadow:'0 0 8px #0EC4C1'}}/>
              <span style={{fontSize:'13px',fontWeight:500,color:'#0EC4C1'}}>Insightis</span>
            </div>
            <div style={{flex:1,background:'rgba(0,0,0,.3)',borderRadius:'10px',padding:'16px',marginBottom:'12px',fontFamily:'Geist Mono,monospace',display:'flex',flexDirection:'column'}}>
             
              <div style={{fontSize:'12.5px',color:'#C0D4DC',lineHeight:1.6,marginBottom:'14px'}}>
                Answered in seconds. What direct integration unlocks:
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {STATS.map((s, i) => (
                  <div key={i} style={{display:'flex',alignItems:'baseline',gap:'12px',fontSize:'12.5px',lineHeight:1.45}}>
                    <span style={{color:'#0EC4C1',fontWeight:600,minWidth:'64px',flexShrink:0,fontVariantNumeric:'tabular-nums',letterSpacing:'-.02em'}}>
                      {s.display}
                    </span>
                    <span style={{minWidth:0}}>
                      <span style={{color:'#C0D4DC'}}>{s.label}</span>
                      <span style={{color:'#8AA6B3'}}> — {s.sub}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{fontSize:'12px',color:'rgba(9,160,157,.6)',fontStyle:'italic'}}>Direct connectors + Semantic Layer. Real numbers, refreshed continuously.</p>
          </div>
        </div>

        {/* Headline callout */}
        <div style={{textAlign:'center',marginTop:'40px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'14px',flexWrap:'wrap',justifyContent:'center'}}>
            <span style={{fontSize:'40px',fontWeight:500,color:'#0EC4C1',fontFamily:'Geist Mono,monospace',lineHeight:1,flexShrink:0}}>60s</span>
            <span style={{fontSize:'15px',color:'#7FA0AC',whiteSpace:'nowrap'}}>to connect a new source — OAuth, no pipelines to maintain.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── CTA SECTION ── */

/* ── MID-PAGE CTA BANNER ── */
function MidCTA() {
  return (
    <section style={{padding:'80px 0',position:'relative',overflow:'hidden'}}>
      {/* Soft teal glow */}
      <div style={{
        position:'absolute',top:'50%',left:'50%',
        transform:'translate(-50%,-50%)',
        width:'700px',height:'420px',
        background:'radial-gradient(ellipse, rgba(9,160,157,0.13) 0%, transparent 70%)',
        pointerEvents:'none',
      }}/>

      <div style={{maxWidth:'820px',margin:'0 auto',padding:'0 24px',position:'relative',textAlign:'center'}}>
        <h2 style={{
          fontSize:'clamp(22px,2.6vw,34px)',
          fontWeight:500,
          letterSpacing:'-.025em',
          lineHeight:1.2,
          marginBottom:'32px',
          whiteSpace:'nowrap',
        }}>
          <span style={{color:'#E8F2F5'}}>Skip the data engineering. </span>
          <span style={{color:'#0EC4C1'}}>Start asking.</span>
        </h2>
        <div style={{display:'flex',justifyContent:'center'}}>
          <a href="#" style={{
            display:'inline-flex',alignItems:'center',gap:'10px',
            padding:'16px 32px',borderRadius:'999px',
            background:'linear-gradient(135deg,#09A09D,#07807E)',
            color:'#fff',fontSize:'15px',fontWeight:500,
            textDecoration:'none',
            boxShadow:'0 0 32px rgba(9,160,157,.35), 0 8px 24px rgba(0,0,0,.4)',
            transition:'all .2s',
            letterSpacing:'.01em',
          }}>
            Get started for free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="pt-8 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 id="cta-heading" style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>Start connecting your stack</h2>
        <div className="relative rounded-2xl border border-[var(--ins-border-default)] py-8 px-8 md:px-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6" style={{background:'linear-gradient(135deg, rgba(18,18,31,0.95) 0%, rgba(13,13,26,0.98) 50%, rgba(18,18,31,0.95) 100%)'}}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--ins-color-teal-600)]/30 to-transparent"></div>
          <p className="text-2xl md:text-3xl font-medium text-white tracking-tight leading-tight flex-shrink-0 m-0">
            Your data is already there.<span style={{color:'rgba(7, 128, 126)'}}> Connect it in minutes.</span>
          </p>
          <div className="flex items-center w-full md:w-auto md:min-w-[400px] bg-[var(--ins-color-promo-solid)] border border-[var(--ins-border-hover)] rounded-xl overflow-hidden focus-within:border-[var(--ins-color-teal-600)]/60 transition-colors">
            <label htmlFor="cta-connector-input" style={{position:'absolute',width:'1px',height:'1px',padding:0,margin:'-1px',overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>Which tool do you want to connect?</label>
            <input id="cta-connector-input" type="text" placeholder="Which tool do you want to connect?" aria-label="Which tool do you want to connect?" className="flex-1 bg-transparent text-sm text-white placeholder-[var(--ins-text-inactive)] px-4 py-3 outline-none min-w-0"/>
            <button aria-label="Get started" className="inline-flex items-center gap-2 px-5 py-2.5 m-1 text-sm font-medium text-white bg-gradient-to-r from-[var(--ins-color-teal-600)] to-[var(--ins-color-teal-500)] rounded-lg hover:shadow-[0_0_24px_rgba(7,128,126,0.5)] transition-all flex-shrink-0">
              Get Started
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── APP ── */
function App() {
  return (
    <div>
      <Header/>
      <main>
      <Hero/>
      {/* TODO SEO [P0]: Add TL;DR / Executive Summary block here (80-100 words, format: Problem -> Insightis -> Key Benefit).
          Build a <TLDR/> component that renders a <section aria-label="Summary"> with one answer-first paragraph, then mount it below.
          Verbatim draft copy from audit "Suggested rewrites -> TL;DR block":

          "Scattered data slows every team down. Answers live in five tools - HubSpot, Stripe, the warehouse,
          the ad platforms, product analytics - and pulling them together takes days of CSV exports and VLOOKUPs.
          Insightis fixes that at the source: 200+ certified connectors (OAuth, read-only, SOC 2) feed a semantic
          layer that unifies MRR, CAC, NRR, WAU and every other metric your team asks about. You ask in plain
          English; Insightis queries the right sources, joins the data, and returns a precise answer in seconds
          - no SQL, no tickets, no waiting." (96 words)

          See audit: C:/Users/victorg/.claude/plans/d-landing-new-integrations-2-html-using-smooth-cupcake.md */}
      <HowSyncWorks/>
      <MidCTA/>
      <ConnectorsGallery/>
      <IntegrationImpact/>
      {/* TODO SEO [P1]: Insert FAQ section here (5 Q&A, answers 40-60 words each) before the CTA.
          JSON-LD FAQPage is already emitted in <head>; on-page copy must match it word-for-word so
          Google's validator doesn't flag a mismatch. Build an <FAQ/> component rendering one <h2>
          ("Frequently asked questions") plus five <details>/<summary> pairs.

          Verbatim draft Q&As from audit "Suggested rewrites -> FAQ entries":

          Q1. How long does it take to connect a data source to Insightis?
          A. Most connectors go live in under five minutes. You authenticate with OAuth or an API key,
          pick the objects you want, and Insightis starts syncing immediately. Connections are read-only,
          SOC 2 secured, and refreshed continuously - no engineering work or pipeline maintenance required.

          Q2. Which data sources does Insightis integrate with?
          A. Insightis supports 200+ connectors across CRMs (HubSpot, Salesforce, Pipedrive),
          warehouses (Snowflake, BigQuery, Redshift), ad platforms (Google Ads, Meta, LinkedIn),
          product analytics (Mixpanel, Amplitude, PostHog), finance (Stripe, QuickBooks, NetSuite)
          and ops tools (Jira, Linear, Slack). New connectors are added monthly based on customer demand.

          Q3. Do I need SQL or a data engineer to use Insightis integrations?
          A. No. Insightis' semantic layer maps every connected source to certified business metrics -
          MRR, CAC, NRR, WAU - so your team asks questions in plain English and gets a precise answer.
          SQL is optional for power users, never a requirement for daily use.

          Q4. Is my data secure once it's connected?
          A. Yes. All connectors are read-only and authenticated via OAuth or scoped API keys.
          Insightis is SOC 2 Type II compliant, encrypts data in transit and at rest, and never writes
          back to your source systems. You can revoke a connection at any time from the admin panel.

          Q5. What happens when fields or metrics conflict across sources?
          A. The semantic layer resolves conflicts automatically. It reconciles naming (deal vs opportunity),
          time zones, currencies, and duplicate records so the answer stays consistent whether the question
          starts in Stripe, HubSpot, or Snowflake. Certified metrics are versioned, so changes are auditable.

          See audit: C:/Users/victorg/.claude/plans/d-landing-new-integrations-2-html-using-smooth-cupcake.md */}
      <CTA/>
      </main>
      <Footer/>
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
