import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { INTEGRATIONS } from '../components/IntegrationsStrip';
import ConnectorIcon from '../components/ConnectorIcon';
import { CONNECTORS as MASTER_CONNECTORS } from '../data/connectors';
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
function GridIcon({size=36, color='var(--ins-text-highlight)'}) {
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
// Renders the same canonical brand SVG as <IntegrationsStrip /> by looking up
// the integration by name. Keeps the visual hero animation in lockstep with
// the strip — edit src/components/IntegrationsStrip.jsx and both update.
function BrandTile({name, color, size=22}) {
  const integration = INTEGRATIONS.find(i => i.name === name);
  const Icon = integration?.Icon;
  const iconSize = Math.round(size * 0.72);
  const fallbackSize = Math.round(size * 0.6);
  return (
    <span style={{
      width:`${size}px`,height:`${size}px`,borderRadius: size >= 28 ? '8px' : '6px',
      background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',
      display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
      overflow:'hidden',
    }}>
      {Icon ? (
        <Icon size={iconSize}/>
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
    {name:'Intercom',   slug:'intercom',       domain:'intercom.com',   color:'#1F8DED', desc:'Support'},
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
    const isMobileLayout = W < 640;
    const cardW = isMobileLayout ? 100 : 150;
    const cardH = isMobileLayout ? 36 : 52;
    const centerBoxX = isMobileLayout ? 60 : 90;
    const centerBoxY = isMobileLayout ? 60 : 90;

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
  const isMobile = size.W < 640;
  const engineBox = isMobile ? 80 : 116;
  const gridSize = isMobile ? 22 : 30;
  const engineFont = isMobile ? 10 : 12;
  const tileSize = isMobile ? 26 : 40;
  const cardPadV = isMobile ? 6 : 10;
  const cardPadH = isMobile ? 9 : 14;
  const cardGap = isMobile ? 7 : 11;
  const titleFont = isMobile ? 11 : 13;
  const descFont = isMobile ? 10 : 11;

  return (
    <div ref={containerRef} style={{
      position:'relative',
      height:'500px',
      borderRadius:'16px',
      border:'1px solid rgba(255,255,255,0.09)',
      background:'#0C1117',
      overflow:'hidden',
      boxShadow:'none',
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
        <div style={{flex:1,textAlign:'center',fontSize:'12px',color:'var(--ins-text-inactive)',fontFamily:'Geist Mono, monospace',letterSpacing:'.02em'}}>
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
              <path d={d} stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="4 4" strokeLinecap="round" fill="none" opacity="0.85">
                <animate attributeName="opacity" values="0.55;0.95;0.55" dur={`${4 + (i % 3) * 0.7}s`} repeatCount="indefinite"/>
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
          width:`${engineBox}px`, height:`${engineBox}px`,
          borderRadius:'16px',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'6px',
          border:'1px solid rgba(7,128,126,0.5)',
          background:'linear-gradient(135deg, rgba(7,128,126,0.25), rgba(7,128,126,0.08))',
          animation: phase === 'ordered' ? 'corePulse 3s ease-in-out infinite' : 'none',
        }}>
          <GridIcon size={gridSize} color="var(--ins-text-highlight)"/>
          <span style={{fontSize:`${engineFont}px`, fontWeight:500, color:'var(--ins-text-highlight)', textAlign:'center', lineHeight:1.2}}>Insightis<br/>Semantic AI</span>
        </div>
      </div>

      {/* Source cards (home-style: icon-tile + title + subtitle, animated chaotic→ring) */}
      {SOURCES.map((s, i) => (
        <div key={i} ref={el => sourceRefs.current[i] = el} style={{
          position:'absolute',
          left:'50%', top:'calc(50% + 10px)',
          display:'inline-flex', alignItems:'center',
          gap:`${cardGap}px`,
          padding:`${cardPadV}px ${cardPadH}px`,
          background:'var(--ins-surface-card)',
          border:'1px solid rgba(255,255,255,0.06)',
          borderRadius:'12px',
          boxShadow:'0 1px 3px rgba(0,0,0,0.30), 0 4px 12px rgba(0,0,0,0.20)',
          willChange:'transform',
          zIndex:5,
        }}>
          <BrandTile name={s.name} color={s.color} size={tileSize}/>
          <div style={{display:'flex', flexDirection:'column', gap:'1px'}}>
            <span style={{fontSize:`${titleFont}px`, fontWeight:600, color:'#FFFFFF', letterSpacing:'-0.01em', whiteSpace:'nowrap', lineHeight:1.2}}>{s.name}</span>
            {!isMobile && (
              <span style={{fontSize:`${descFont}px`, fontWeight:400, color:'#7A8A9A', letterSpacing:'-0.005em', whiteSpace:'nowrap', lineHeight:1.2}}>{s.desc}</span>
            )}
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
          <h1 className="ins-text-display-xl">
            <span style={{color:'var(--ins-text-heading-soft)'}}>Connect everything.</span><br/>
            <span style={{color:'var(--ins-text-highlight)'}}>Understand</span><br/>
            <span style={{color:'var(--ins-text-highlight)'}}>anything.</span>
          </h1>
          <p className="ins-text-body-xl" style={{marginBottom:'36px',maxWidth:'520px'}}>
            Plug in your CRM, warehouse, ads and product tools. Query every source in plain English — no SQL, no waiting.
          </p>
          <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap',marginBottom:'24px'}}>
            <Button as="a" href="https://insightis-app.devart.info/register" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
              Start for Free
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

        {/* RIGHT: Connection → chat animation */}
        <div className="hero-anim">
          <ConnectionChatAnimation/>
        </div>
      </div>
    </section>
  );
}

/* ── CONNECTORS DATA ── */
const AUDIENCE_TABS = {
  "RevOps & BizOps": [
    { name: "Stripe", desc: "Revenue, MRR & subscriptions" },
    { name: "HubSpot", desc: "CRM, deals & pipeline" },
    { name: "Salesforce", desc: "Enterprise CRM & opportunities" },
    { name: "Recurly", desc: "Subscription billing & dunning" },
    { name: "Pipeline CRM", desc: "Sales pipeline management" },
    { name: "Close", desc: "Sales CRM & sequences" },
    { name: "Zoho CRM", desc: "Mid-market CRM & pipeline" },
    { name: "Keap", desc: "SMB sales & marketing CRM" },
    { name: "Freshsales Suite", desc: "SMB CRM & sequences" },
    { name: "Outreach", desc: "Sales engagement & plays" },
    { name: "Gong", desc: "Call intelligence & coaching" },
    { name: "Monday.com", desc: "Sales ops & workflows" },
    { name: "Calendly", desc: "Meeting scheduling data" },
    { name: "Dynamics 365", desc: "Microsoft CRM stack" },
    { name: "ActiveCampaign", desc: "Sales + marketing automation" },
    { name: "Affinity", desc: "Relationship-based CRM" },
    { name: "Insightly CRM", desc: "Project-aware CRM" },
    { name: "Capsule", desc: "Lightweight CRM" },
    { name: "Streak", desc: "Gmail-native CRM" },
    { name: "Reply", desc: "Multichannel sales engagement" },
  ],
  "Founders & CEOs": [
    { name: "Stripe", desc: "Revenue & growth metrics" },
    { name: "QuickBooks Online", desc: "P&L, cash flow & burn rate" },
    { name: "NetSuite", desc: "Enterprise financials" },
    { name: "Xero", desc: "SMB accounting" },
    { name: "Snowflake", desc: "Core business warehouse" },
    { name: "Google BigQuery", desc: "Cloud-scale analytics" },
    { name: "Amazon Redshift", desc: "Warehouse on AWS" },
    { name: "Salesforce", desc: "Pipeline & forecast" },
    { name: "HubSpot", desc: "Funnel & ICP signals" },
    { name: "Slack", desc: "Team activity & alerts" },
    { name: "Google Analytics", desc: "Web traffic & conversion" },
    { name: "Amplitude", desc: "Product & retention" },
    { name: "FullStory", desc: "User journeys" },
    { name: "Notion", desc: "Strategy docs & wiki" },
    { name: "Sage Accounting", desc: "Books & GL" },
    { name: "Maxio Billing", desc: "Recurring revenue ops" },
    { name: "ChartMogul", desc: "Subscription analytics" },
    { name: "Recurly", desc: "Billing & retention" },
    { name: "Asana", desc: "Cross-team initiatives" },
    { name: "Confluence Cloud", desc: "Company wiki & decisions" },
  ],
  "CMOs & Marketers": [
    { name: "HubSpot", desc: "Inbound + nurture engine" },
    { name: "Mailchimp", desc: "Email campaigns & lists" },
    { name: "Klaviyo", desc: "E-commerce email & SMS" },
    { name: "ActiveCampaign", desc: "Marketing automation" },
    { name: "Marketo", desc: "Enterprise nurture" },
    { name: "Salesforce Marketing Cloud", desc: "Cross-channel orchestration" },
    { name: "Google Ads", desc: "Paid search performance" },
    { name: "Facebook Ads", desc: "Paid social — Meta" },
    { name: "LinkedIn Ads", desc: "B2B paid social" },
    { name: "TikTok Ads", desc: "Short-video paid social" },
    { name: "X Ads", desc: "X / Twitter paid" },
    { name: "Pinterest", desc: "Visual discovery ads" },
    { name: "Google Analytics", desc: "Web traffic & conversion" },
    { name: "Google Analytics 4", desc: "GA4 event stream" },
    { name: "Constant Contact", desc: "SMB email + events" },
    { name: "Brevo", desc: "Email + SMS + CRM" },
    { name: "Campaign Monitor", desc: "Brand email design" },
    { name: "GetResponse", desc: "Email + automation" },
    { name: "AWeber", desc: "SMB email lists" },
    { name: "MailerLite", desc: "Simple email + landing" },
  ],
  "Product Teams": [
    { name: "Amplitude", desc: "Product analytics & cohorts" },
    { name: "FullStory", desc: "Session replay & friction" },
    { name: "Google Analytics", desc: "Traffic & funnel data" },
    { name: "GitHub", desc: "Code, PRs & deploys" },
    { name: "Jira", desc: "Tickets & sprint state" },
    { name: "Jira Software Cloud", desc: "Engineering velocity" },
    { name: "PagerDuty", desc: "Incident & on-call" },
    { name: "Notion", desc: "Specs, RFCs & wiki" },
    { name: "Slack", desc: "Channels & alerts" },
    { name: "Intercom", desc: "Customer feedback & chat" },
    { name: "Asana", desc: "Cross-team roadmap" },
    { name: "ClickUp", desc: "Project + task tracking" },
    { name: "Confluence Cloud", desc: "Engineering wiki" },
    { name: "Monday.com", desc: "Visual roadmap boards" },
    { name: "Trello", desc: "Lightweight Kanban" },
    { name: "Productive.io", desc: "Project profitability" },
    { name: "Aha!", desc: "Strategy & release planning" },
    { name: "Smartsheet", desc: "Sheet-based PM" },
    { name: "Float", desc: "Resource planning" },
    { name: "ProdPad", desc: "Idea & feedback management" },
  ],
  "Data & Analytics": [
    { name: "Snowflake", desc: "Cloud data warehouse" },
    { name: "Google BigQuery", desc: "Serverless analytics warehouse" },
    { name: "Amazon Redshift", desc: "AWS data warehouse" },
    { name: "Databricks", desc: "Lakehouse & ML platform" },
    { name: "Azure Synapse", desc: "Microsoft warehouse" },
    { name: "PostgreSQL", desc: "Open-source relational DB" },
    { name: "MySQL", desc: "Open-source relational DB" },
    { name: "MariaDB", desc: "MySQL fork" },
    { name: "Amazon Aurora", desc: "AWS-managed Postgres/MySQL" },
    { name: "AlloyDB", desc: "Google-managed Postgres" },
    { name: "Heroku Postgres", desc: "Managed Postgres on Heroku" },
    { name: "Azure MySQL", desc: "Managed MySQL on Azure" },
    { name: "Azure PostgreSQL", desc: "Managed Postgres on Azure" },
    { name: "SQL Server", desc: "Microsoft SQL Server" },
    { name: "Oracle", desc: "Oracle Database" },
    { name: "Elasticsearch", desc: "Search & log analytics" },
    { name: "Hive", desc: "Hadoop-warehouse SQL" },
    { name: "GC SQL for PostgreSQL", desc: "Managed Postgres on GCP" },
    { name: "Excel Online", desc: "Sheet-based modelling" },
    { name: "Google Sheets", desc: "Collaborative sheets" },
  ],
  "Ops & Finance": [
    { name: "QuickBooks Online", desc: "Accounting & invoicing" },
    { name: "QuickBooks Desktop", desc: "On-prem accounting" },
    { name: "QuickBooks Time", desc: "Time tracking & payroll" },
    { name: "Xero", desc: "SMB accounting" },
    { name: "Stripe", desc: "Payments & invoicing" },
    { name: "Recurly", desc: "Subscription billing & dunning" },
    { name: "NetSuite", desc: "Enterprise financials" },
    { name: "Sage Accounting", desc: "GL & books" },
    { name: "Zoho Books", desc: "SMB accounting" },
    { name: "Avalara", desc: "Sales tax compliance" },
    { name: "FreshBooks", desc: "Service-business books" },
    { name: "Maxio Billing", desc: "Recurring revenue ops" },
    { name: "ChartMogul", desc: "Subscription analytics" },
    { name: "Exact Online", desc: "EU SMB accounting" },
    { name: "Paddle", desc: "Merchant of record billing" },
    { name: "Zuora", desc: "Enterprise subscription" },
    { name: "Square", desc: "POS & payments" },
    { name: "BambooHR", desc: "HR & people ops" },
    { name: "Greenhouse", desc: "Hiring & ATS" },
    { name: "Asana", desc: "Cross-functional ops" },
  ],
};

/* ── CONNECTORS GALLERY ── */
function ConnectorsGallery() {
  const cats = Object.keys(AUDIENCE_TABS);
  const [activeCat, setActiveCat] = useState(cats[0]);

  return (
    <section style={{padding:'100px 0 120px', background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'80rem',margin:'0 auto',padding:'0 1.5rem'}}>

        {/* Heading */}
        <div style={{marginBottom:'32px'}}>
          <SectionHeader
            eyebrow="Built for every team"
            title="Which data sources does Insightis integrate with?"
            lede="200+ connectors across CRMs, warehouses, and finance — synced live, ready to query."
            sparkle
            size="lg"
          />
        </div>

        {/* Category tabs */}
        <div style={{display:'flex',justifyContent:'center',gap:'8px',marginBottom:'28px',flexWrap:'wrap'}}>
          {cats.map(cat => {
            const isActive = cat === activeCat;
            return (
              <Chip
                key={cat}
                as="button"
                variant="tab"
                onClick={() => setActiveCat(cat)}
                aria-pressed={isActive}
                style={{padding:'7px 18px', fontSize:'13px', fontWeight:500}}
              >
                {cat}
              </Chip>
            );
          })}
        </div>

        {/* Cards grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))',
          gridAutoRows:'72px',
          gap:'10px',
        }}>
          {AUDIENCE_TABS[activeCat].map((c, i) => {
            const master = MASTER_CONNECTORS.find(m => m.name === c.name);
            return (
            <div key={`${activeCat}-${i}-${c.name}`} className="connector-card">
              <ConnectorIcon name={c.name} slug={master?.slug} domain={master?.domain} bg="rgba(255,255,255,0.04)"/>
              <div style={{minWidth:0}}>
                <div className="ins-text-h4" style={{marginBottom:'3px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.name}</div>
                <div style={{fontSize:'12px',color:'#8A9BA4',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.desc}</div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{textAlign:'center',marginTop:'32px'}}>
          <span style={{fontSize:'12.5px',color:'var(--ins-text-body)',fontFamily:'Geist Mono,monospace'}}>
            + 200 more connectors available ·{' '}
            <a href="/Resources/Connectors" style={{color:'var(--ins-text-highlight)',textDecoration:'none'}}>see full list →</a>
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
      body:'Authenticate with OAuth or API key. 200+ read-only connectors live in under 5 minutes — SOC 2 secured.',
      example:'OAuth / API key → 200+ connectors in 5 min, read-only & SOC 2 secured',
    },
    {
      n:'02', title:'Semantic layer maps it',
      body:'Insightis maps fields to certified metrics like MRR, CAC, NRR, WAU — one trusted truth across every connected source.',
      example:'MRR · CAC · NRR · WAU → auto-mapped with conflict resolution',
    },
    {
      n:'03', title:'Ask in plain English',
      body:'Your team asks questions in plain English. Insightis joins the right sources and returns a precise answer — no SQL, no ticket.',
      example:'"Why did CAC spike last week?" → answer with drill-down',
    },
  ];

  return (
    <section style={{padding:'120px 0 140px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'80rem',margin:'0 auto',padding:'0 1.5rem'}}>
        <div style={{marginBottom:'64px'}}>
          <SectionHeader
            eyebrow="How it works"
            title="How does Insightis connect to your data sources?"
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

/* ── INTEGRATION IMPACT ── */
function IntegrationImpact() {
  const STATS = [
    { display:'12×',  label:'faster time to insight',              sub:'vs. manual exports & BI tools' },
    { display:'90%',  label:'fewer data requests',  sub:'teams self-serve in plain English' },
  ];

  return (
    <section style={{padding:'120px 0 140px', background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'80rem',margin:'0 auto',padding:'0 1.5rem'}}>

        {/* Heading */}
        <div style={{marginBottom:'56px'}}>
          <SectionHeader
            eyebrow="Direct integration"
            title="Tools guess. Insightis answers."
            lede="One source of truth. Answers in seconds."
            sparkle
            size="lg"
          />
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
          <Card variant="glow" className="ins-card--glow--error compare-card" style={{padding:'32px',display:'flex',flexDirection:'column'}}>
            <div className="ins-card__header" style={{marginBottom:'22px'}}>Disconnected data</div>
            <CodeChip
              variant="panel"
              style={{flex:1,marginBottom:'12px'}}
              query="Which channel drove the most signups last month?"
              response={
                <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                  {[
                    {display:'3–5 days', label:'to produce one number',            sub:'export CSVs, VLOOKUP, reconcile by hand'},
                    {display:'4 tools',  label:'to query for a request',   sub:'HubSpot, Stripe and the warehouse'},
                  ].map((s, i) => (
                    <div key={i} style={{display:'flex',alignItems:'baseline',gap:'12px',fontSize:'12.5px',lineHeight:1.45}}>
                      <span style={{color:'var(--ins-status-error-fg)',fontWeight:600,minWidth:'64px',flexShrink:0,fontVariantNumeric:'tabular-nums',letterSpacing:'-.02em'}}>
                        {s.display}
                      </span>
                      <span style={{minWidth:0}}>
                        <span style={{color:'var(--ins-text-body)'}}>{s.label}</span>
                        <span style={{color:'var(--ins-text-inactive)'}}> — {s.sub}</span>
                      </span>
                    </div>
                  ))}
                </div>
              }
            />
            <p className="ins-text-body-sm ins-text--italic" style={{color:'var(--ins-text-error)'}}>Exports, manual joins, copy-pasted dashboards. Stale by the time they land.</p>
          </Card>

          {/* Insightis */}
          <Card variant="glow" className="ins-card--glow--brand compare-card" style={{padding:'32px',display:'flex',flexDirection:'column'}}>
            <div className="ins-card__header" style={{marginBottom:'22px'}}>Insightis</div>
            <CodeChip
              variant="panel"
              style={{flex:1,marginBottom:'12px'}}
              response={
                <>
                  <div style={{fontSize:'12.5px',color:'var(--ins-text-body)',lineHeight:1.6,marginBottom:'14px'}}>
                    Answered in seconds. What direct integration unlocks:
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                    {STATS.map((s, i) => (
                      <div key={i} style={{display:'flex',alignItems:'baseline',gap:'12px',fontSize:'12.5px',lineHeight:1.45}}>
                        <span style={{color:'var(--ins-text-highlight)',fontWeight:600,minWidth:'64px',flexShrink:0,fontVariantNumeric:'tabular-nums',letterSpacing:'-.02em'}}>
                          {s.display}
                        </span>
                        <span style={{minWidth:0}}>
                          <span style={{color:'var(--ins-text-body)'}}>{s.label}</span>
                          <span style={{color:'var(--ins-text-inactive)'}}> — {s.sub}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              }
            />
            <p className="ins-text-body-sm ins-text--italic" style={{color:'var(--ins-text-highlight-muted)'}}>Direct connectors + Semantic Layer. Real numbers, refreshed continuously.</p>
          </Card>
        </div>

        {/* Headline callout */}
        <div style={{textAlign:'center',marginTop:'40px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'14px',flexWrap:'wrap',justifyContent:'center'}}>
            <span style={{fontSize:'40px',fontWeight:500,color:'var(--ins-text-highlight)',fontFamily:'Geist Mono,monospace',lineHeight:1,flexShrink:0}}>60s</span>
            <span className="ins-text-body-lg" style={{whiteSpace:'nowrap'}}>to connect a new source — OAuth, no pipelines to maintain.</span>
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
    <section className="pt-16 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="fade-up is-visible">
          <BottomCTA
            variant="text"
            title={<>Skip the data engineering. <BottomCTA.Highlight>Start asking.</BottomCTA.Highlight></>}
            ctaLabel="Get started for free"
          />
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function CTA() {
  return (
    <section className="pt-8 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <BottomCTA
          variant="form"
          title={<>Your data is already there.<BottomCTA.Highlight> Connect it in minutes.</BottomCTA.Highlight></>}
          inputPlaceholder="Which tool do you want to connect..."
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
