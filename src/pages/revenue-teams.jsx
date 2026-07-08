import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import BottomCTA from '../components/BottomCTA';
import FAQAccordion from '../components/FAQAccordion';
import SectionHeader from '../components/SectionHeader';
import CheckIcon from '../components/CheckIcon';
import ConnectorCard from '../components/ConnectorCard';
import HeroMockup from '../components/HeroMockup';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/* ── MINI BAR CHART ── */
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

/* ── HERO ── */
function Hero() {
  return (
    <section style={{padding:'96px 0 56px',position:'relative',overflow:'hidden'}}>
      {/* Background glows — copied from AI Chat hero for visual parity */}
      <div className="ins-hero-glow" />
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:10}}>
        <div data-hero-grid style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'var(--ins-size-16)',
          alignItems:'center',
        }}>
          {/* Left: text */}
          <div>
            <div className="fu0 ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'var(--ins-size-5)'}}>
              <span style={{fontSize:'var(--ins-font-size-12)'}}>✦</span>
              <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'var(--ins-font-family-mono)'}}>For Revenue Teams</span>
            </div>

            <h1 className="ins-text-display-xl" style={{marginBottom:'var(--ins-size-5)'}}>
              <span style={{color:'var(--ins-text-heading-soft)'}}>Stop stitching revenue</span>
              <br/>
              <span style={{color:'var(--ins-text-highlight)'}}>together by hand</span>
            </h1>

            <p className="fu2 ins-text-body-xl" style={{marginBottom:'var(--ins-size-7)',maxWidth:'480px'}}>
              Ask any revenue question in plain English — Insightis answers from your CRM, billing, and product data in seconds.
            </p>

            <div className="fu3" style={{display:'flex',gap:'var(--ins-size-3)',flexWrap:'wrap',marginBottom:'var(--ins-size-7)'}}>
              <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
                Start for free
              </Button>
            </div>

          </div>

          {/* Right: hero section image — shared HeroMockup shell */}
          <HeroMockup
            title="Insightis — For Revenue Teams"
            accentLine="rgba(14,196,193,.55)"
            glow="radial-gradient(circle at 25% 30%, rgba(14,196,193,.16) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(167,139,250,.12) 0%, transparent 50%)"
            badge={
              <HeroMockup.Badge accentRgb="251,191,36">
                <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'var(--ins-status-warning-fg)',flexShrink:0}}/>
                <div>
                  <div style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase'}}>Churn risk</div>
                  <div style={{fontSize:'12.5px',color:'var(--ins-status-warning-fg)',fontWeight:500,fontFamily:'var(--ins-font-family-mono)',marginTop:'1px'}}>2 accounts flagged</div>
                </div>
              </HeroMockup.Badge>
            }
            card={
              <HeroMockup.FloatCard accentRgb="9,160,157">
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'var(--ins-size-2)'}}>
                  <span style={{fontSize:'9.5px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase'}}>QBR prep</span>
                  <span style={{fontSize:'10.5px',color:'var(--ins-text-highlight)',fontFamily:'var(--ins-font-family-mono)',fontWeight:500}}>5 / 7 done</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
                  {[
                    {step:'Pipeline synced',   done:true},
                    {step:'Numbers signed off', done:true},
                    {step:'Forecast updated',  done:true},
                    {step:'QBR deck',          done:false},
                  ].map((s,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:'7px'}}>
                      <div style={{
                        width:'10px',height:'10px',borderRadius:'3px',
                        background:s.done?'var(--ins-color-teal-a-18)':'var(--ins-color-white-a-04)',
                        border:`1px solid ${s.done?'rgba(14,196,193,.5)':'var(--ins-color-white-a-10)'}`,
                        display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
                      }}>
                        {s.done && <svg width="6" height="6" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                      <span style={{fontSize:'10.5px',lineHeight:1,color:'var(--ins-text-body)',fontFamily:'var(--ins-font-family-mono)'}}>{s.step}</span>
                    </div>
                  ))}
                </div>
              </HeroMockup.FloatCard>
            }
          >

              {/* Status row — label with a dot */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'var(--ins-text-highlight)',boxShadow:'0 0 8px rgba(14,196,193,.6)'}}/>
                  <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10.5px',color:'var(--ins-text-body)',letterSpacing:'.08em',textTransform:'uppercase'}}>Pipeline · live</span>
                </div>
                <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-highlight)',padding:'3px 9px',borderRadius:'999px',background:'var(--ins-color-teal-a-08)',border:'1px solid rgba(14,196,193,.3)',letterSpacing:'.08em',textTransform:'uppercase'}}>Q2 · MTD</span>
              </div>

              {/* Headline + caption */}
              <h3 style={{fontSize:'var(--ins-font-size-17)',fontWeight:500,color:'var(--ins-text-heading-soft)',marginBottom:'6px',letterSpacing:'-.015em',lineHeight:1.35}}>
                Net new ARR tracking <span style={{color:'var(--ins-status-success-fg)'}}>+18%</span> ahead of plan
              </h3>
              <p className="ins-text-body-sm" style={{marginBottom:'var(--ins-size-5)'}}>
                Reconciled across <span style={{color:'var(--ins-text-highlight)',fontFamily:'var(--ins-font-family-mono)',fontSize:'11.5px'}}>CRM · Billing · Product</span> in real time.
              </p>

              {/* KPI blocks — 3 × 2 grid */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px'}}>
                {[
                  {label:'ARR',           val:'$24.0M', delta:'▲ +18% YoY',  hl:false},
                  {label:'Net New ARR',   val:'$4.2M',  delta:'▲ +12% QoQ',  hl:false},
                  {label:'Win Rate',      val:'32%',    delta:'▲ +3 pts',    hl:false},
                  {label:'NRR',           val:'118%',   delta:'▲ expansion', hl:false},
                  {label:'Pipeline Cov.', val:'3.4×',   delta:'on target',   hl:true},
                  {label:'CAC Payback',   val:'14 mo',  delta:'▼ faster',    hl:false},
                ].map((m,i) => (
                  <div key={i} style={{
                    background:'rgba(255,255,255,.025)',
                    border:'1px solid var(--ins-color-white-a-06)',
                    borderRadius:'12px',
                    padding:'16px 14px',
                  }}>
                    <div style={{fontSize:'9px',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'10px',whiteSpace:'nowrap'}}>{m.label}</div>
                    <div style={{fontSize:'21px',fontWeight:500,color:'var(--ins-text-heading)',fontFamily:'var(--ins-font-family-mono)',letterSpacing:'-.02em',lineHeight:1}}>{m.val}</div>
                    <div style={{fontSize:'9.5px',color:m.hl?'var(--ins-text-highlight)':'var(--ins-status-success-fg)',fontFamily:'var(--ins-font-family-mono)',marginTop:'8px'}}>{m.delta}</div>
                  </div>
                ))}
              </div>

              {/* Insight footer */}
              <div style={{marginTop:'24px',paddingTop:'12px',borderTop:'1px dashed var(--ins-color-white-a-06)',display:'flex',alignItems:'center',gap:'8px',fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-body)',letterSpacing:'.02em'}}>
                <span style={{color:'var(--ins-text-highlight)'}}>↳</span>
                <span>Enterprise pipeline +23% this quarter · 2 churn risks flagged</span>
              </div>
          </HeroMockup>
        </div>
      </div>
    </section>
  );
}

/* ── FEATURE SPOTLIGHT VISUALS ── */
function ChromeHeader({ label }) {
  return (
    <div style={{padding:'14px 18px',borderBottom:'1px solid var(--ins-color-white-a-06)',display:'flex',alignItems:'center',gap:'10px',flexShrink:0,position:'relative',zIndex:1}}>
      <div style={{display:'flex',gap:'5px'}}>
        {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
          <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.6}}/>
        ))}
      </div>
      <div style={{flex:1,textAlign:'center',fontSize:'var(--ins-font-size-12)',color:'var(--ins-text-inactive)',fontFamily:'var(--ins-font-family-mono)'}}>
        {label}
      </div>
    </div>
  );
}

function SpotlightChat() {
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="revops · inbox" />
      <div style={{padding:'18px 20px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>

        {/* Inbox header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'var(--ins-size-3)'}}>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-inactive)',letterSpacing:'.1em',textTransform:'uppercase'}}>revenue asks · today</span>
          <span style={{
            fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-status-success-fg)',
            padding:'2px 8px',borderRadius:'999px',
            background:'var(--ins-color-status-success-bg)',border:'1px solid rgba(34,197,94,.3)',
            letterSpacing:'.08em',textTransform:'uppercase',
          }}>4 auto-answered</span>
        </div>

        {/* Expanded request: CFO */}
        <div style={{
          background:'linear-gradient(135deg, var(--ins-color-teal-a-08) 0%, rgba(9,160,157,.02) 100%)',
          border:'1px solid rgba(9,160,157,.32)',
          borderRadius:'11px',
          padding:'12px 13px',
          marginBottom:'var(--ins-size-2)',
        }}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px',gap:'var(--ins-size-2)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)',minWidth:0}}>
              <div style={{
                width:'22px',height:'22px',borderRadius:'50%',
                background:'rgba(9,160,157,.22)',
                border:'1px solid rgba(9,160,157,.4)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',fontWeight:500,color:'var(--ins-text-highlight)',
                flexShrink:0,
              }}>CR</div>
              <span style={{fontSize:'11.5px',fontWeight:500,color:'var(--ins-color-gray-100)'}}>CRO</span>
              <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)'}}>10:42</span>
            </div>
            <span style={{
              fontFamily:'var(--ins-font-family-mono)',fontSize:'9px',color:'var(--ins-status-success-fg)',
              padding:'2px 7px',borderRadius:'999px',
              background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.25)',
              letterSpacing:'.06em',textTransform:'uppercase',whiteSpace:'nowrap',flexShrink:0,
            }}>✓ 4s</span>
          </div>

          {/* Question */}
          <div style={{fontSize:'12.5px',color:'var(--ins-text-body)',marginBottom:'var(--ins-size-2)',lineHeight:1.5}}>
            "Why did net MRR dip last week?"
          </div>

          {/* Answer — single compact line */}
          <div style={{
            display:'flex',alignItems:'center',gap:'var(--ins-size-2)',
            fontFamily:'var(--ins-font-family-mono)',fontSize:'11.5px',
            paddingTop:'var(--ins-size-2)',
            borderTop:'1px dashed var(--ins-color-white-a-06)',
          }}>
            <span style={{color:'var(--ins-text-highlight)'}}>↳</span>
            <span style={{color:'var(--ins-color-gray-100)'}}>$48.2K</span>
            <span style={{color:'var(--ins-text-inactive)'}}>vs</span>
            <span style={{color:'var(--ins-text-body)'}}>$49.6K last wk</span>
            <span style={{color:'var(--ins-text-inactive)'}}>·</span>
            <span style={{color:'var(--ins-status-error-fg)',fontWeight:500}}>−$1.4K (2 churns)</span>
          </div>
        </div>

        {/* Other auto-answered requests */}
        {[
          {who:'VP Partnerships', init:'VP', q:'Win rate by segment this quarter?', when:'09:18', tone:'#A78BFA'},
          {who:'BizOps',         init:'BO', q:'CAC by channel since June?',        when:'08:55', tone:'var(--ins-status-warning-fg)'},
        ].map((r,i)=>(
          <div key={i} style={{
            display:'flex',alignItems:'center',gap:'10px',
            padding:'8px 11px',
            background:'var(--ins-color-white-a-02)',
            border:'1px solid var(--ins-color-white-a-05)',
            borderRadius:'9px',
            marginTop: i===0 ? '0' : '5px',
          }}>
            <div style={{
              width:'22px',height:'22px',borderRadius:'50%',
              background:`${r.tone}1a`,
              border:`1px solid ${r.tone}55`,
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:'var(--ins-font-family-mono)',fontSize:'9px',fontWeight:500,color:r.tone,
              flexShrink:0,
            }}>{r.init}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                <span style={{fontSize:'var(--ins-font-size-11)',fontWeight:500,color:'var(--ins-text-body)',whiteSpace:'nowrap'}}>{r.who}</span>
                <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9px',color:'var(--ins-text-inactive)'}}>{r.when}</span>
              </div>
              <div style={{fontSize:'var(--ins-font-size-11)',color:'var(--ins-text-body)',marginTop:'1px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>"{r.q}"</div>
            </div>
            <span style={{
              fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-status-success-fg)',flexShrink:0,
            }}><CheckIcon size={8} color="currentColor" /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpotlightSemantic() {
  const versions = [
    {ver:'v3.2', state:'certified', owner:'RevOps',   when:'2 weeks ago',  note:'new logo + expansion − churn (full)'},
    {ver:'v3.0', state:'deprecated', owner:'RevOps',  when:'Q1 2026',       note:'missing mid-cycle expansion'},
    {ver:'v2.4', state:'deprecated', owner:'Sales Ops', when:'Q4 2025',       note:'bookings-based, not recognized'},
    {ver:'v1.0', state:'deprecated', owner:'Sales',   when:'Q2 2025',       note:'sales team\'s spreadsheet definition'},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="metric · net_mrr" />
      <div style={{padding:'22px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* Eyebrow */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-inactive)',letterSpacing:'.1em',textTransform:'uppercase'}}>definition history</span>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-body)'}}>4 revisions</span>
        </div>

        {/* Vertical timeline */}
        <div style={{position:'relative',paddingLeft:'22px'}}>
          {/* Spine line */}
          <div style={{
            position:'absolute',
            left:'7px',top:'8px',bottom:'8px',
            width:'1px',
            background:'linear-gradient(180deg, rgba(34,197,94,.5) 0%, var(--ins-color-white-a-06) 30%, var(--ins-color-white-a-06) 100%)',
          }}/>

          {versions.map((v,i)=>{
            const isCertified = v.state === 'certified';
            return (
              <div key={i} style={{position:'relative',marginBottom:i<versions.length-1?'14px':'0'}}>
                {/* Bullet */}
                <div style={{
                  position:'absolute',
                  left:'-22px',top:'4px',
                  width:'15px',height:'15px',borderRadius:'50%',
                  background: isCertified ? 'rgba(34,197,94,.15)' : 'var(--ins-color-white-a-04)',
                  border: isCertified ? '2px solid var(--ins-status-success-fg)' : '1px solid rgba(255,255,255,.18)',
                  boxShadow: isCertified ? '0 0 0 4px rgba(34,197,94,.08)' : 'none',
                }}/>

                {/* Card */}
                <div style={{
                  background: isCertified ? 'linear-gradient(135deg, rgba(34,197,94,.08) 0%, rgba(34,197,94,.02) 100%)' : 'var(--ins-color-white-a-02)',
                  border: isCertified ? '1px solid rgba(34,197,94,.32)' : '1px solid var(--ins-color-white-a-06)',
                  borderRadius:'9px',
                  padding:'9px 12px',
                  opacity: isCertified ? 1 : 0.66,
                }}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px',marginBottom:'3px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
                      <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-12)',fontWeight:500,color:'var(--ins-color-gray-100)'}}>{v.ver}</span>
                      {isCertified && (
                        <span style={{
                          fontFamily:'var(--ins-font-family-mono)',fontSize:'8.5px',color:'var(--ins-status-success-fg)',
                          padding:'2px 7px',borderRadius:'999px',
                          background:'rgba(34,197,94,.12)',border:'1px solid rgba(34,197,94,.4)',
                          letterSpacing:'.1em',textTransform:'uppercase',fontWeight:500,
                        }}>certified</span>
                      )}
                      {!isCertified && (
                        <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'8.5px',color:'var(--ins-text-body)',letterSpacing:'.1em',textTransform:'uppercase'}}>deprecated</span>
                      )}
                    </div>
                    <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',whiteSpace:'nowrap'}}>{v.owner} · {v.when}</span>
                  </div>
                  <div style={{
                    fontSize:'var(--ins-font-size-11)',
                    color:isCertified?'var(--ins-text-body)':'var(--ins-text-body)',
                    fontFamily: isCertified ? 'var(--ins-font-family-mono)' : 'inherit',
                  }}>{v.note}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SpotlightAnomalies() {
  const items = [
    {sev:'high', label:'SMB churn +$14K',        when:'Tue 14:32', why:'3 logos lost · onboarding gap',  tag:'churn'},
    {sev:'med',  label:'Win rate −6pts · ENT',   when:'Mon 09:15', why:'slipping at procurement stage', tag:'win_rate'},
    {sev:'med',  label:'CAC up 18% · paid',      when:'Sun 22:00', why:'rising CPC · Q4 ramp',           tag:'cac'},
    {sev:'ok',   label:'Pipeline coverage 3.4×', when:'Today',     why:'on track for target',            tag:'coverage'},
  ];
  const sevConfig = {
    high: {color:'var(--ins-status-error-fg)', bg:'var(--ins-color-red-a-06)', border:'rgba(248,113,113,.28)', icon:'!', iconBg:'rgba(248,113,113,.18)', iconBorder:'var(--ins-status-error-fg)'},
    med:  {color:'var(--ins-status-warning-fg)', bg:'rgba(251,191,36,.05)',  border:'rgba(251,191,36,.25)',  icon:'!', iconBg:'rgba(251,191,36,.16)', iconBorder:'var(--ins-status-warning-fg)'},
    ok:   {color:'var(--ins-status-success-fg)', bg:'var(--ins-color-white-a-02)', border:'var(--ins-color-white-a-05)', icon:'✓', iconBg:'rgba(34,197,94,.14)',  iconBorder:'rgba(34,197,94,.5)'},
  };
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="watchlist · before the QBR" />
      <div style={{padding:'20px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* Eyebrow row */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'var(--ins-size-3)'}}>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-inactive)',letterSpacing:'.1em',textTransform:'uppercase'}}>flagged before the QBR</span>
          <div style={{display:'flex',gap:'10px',fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px'}}>
            <span style={{color:'var(--ins-status-error-fg)'}}>● 1 high</span>
            <span style={{color:'var(--ins-status-warning-fg)'}}>● 2 med</span>
            <span style={{color:'var(--ins-status-success-fg)'}}>● 1 ok</span>
          </div>
        </div>

        {/* List rows */}
        <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
          {items.map((it,i)=>{
            const c = sevConfig[it.sev];
            return (
              <div key={i} style={{
                display:'flex',alignItems:'center',gap:'10px',
                padding:'8px 11px',
                background:c.bg,
                border:`1px solid ${c.border}`,
                borderRadius:'9px',
              }}>
                {/* Severity icon */}
                <div style={{
                  width:'18px',height:'18px',borderRadius:'5px',
                  background:c.iconBg,
                  border:`1px solid ${c.iconBorder}`,
                  display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
                  fontFamily:'var(--ins-font-family-mono)',
                  fontSize:'10px',fontWeight:600,
                  color:c.color,
                }}>{c.icon}</div>

                {/* Body */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:'var(--ins-size-2)'}}>
                    <span style={{fontSize:'var(--ins-font-size-12)',color:'var(--ins-color-gray-100)',fontWeight:500}}>{it.label}</span>
                    <span style={{
                      fontFamily:'var(--ins-font-family-mono)',fontSize:'8.5px',
                      color:'var(--ins-text-inactive)',
                      padding:'2px 6px',borderRadius:'var(--ins-radius-4)',
                      background:'var(--ins-color-white-a-04)',
                      letterSpacing:'.04em',
                    }}>{it.tag}</span>
                  </div>
                  <div style={{fontSize:'10.5px',color:'var(--ins-text-body)',marginTop:'var(--ins-size-half)'}}>{it.why}</div>
                </div>

                {/* Timestamp */}
                <span style={{
                  fontFamily:'var(--ins-font-family-mono)',
                  fontSize:'10px',color:'var(--ins-text-inactive)',
                  flexShrink:0,
                  letterSpacing:'.04em',
                }}>{it.when}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SpotlightStack() {
  const trace = [
    {label:'New logos',   amt:'+$31K', src:'Salesforce', detail:'18 deals',     owner:'Sales', ts:'06:30 UTC'},
    {label:'Expansion',   amt:'+$22K', src:'Stripe',     detail:'42 upgrades',  owner:'CS',    ts:'06:30 UTC'},
    {label:'Contraction', amt:'−$3K',  src:'Stripe',     detail:'7 downgrades', owner:'CS',    ts:'06:30 UTC'},
    {label:'Churn',       amt:'−$2K',  src:'Salesforce', detail:'3 logos',      owner:'CS',    ts:'06:30 UTC'},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid var(--ins-color-white-a-08)',
      borderRadius:'var(--ins-radius-20)',
      overflow:'hidden',
      boxShadow:'none',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="audit · net_mrr" />
      <div style={{padding:'20px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>

        {/* Headline KPI with audit stamp */}
        <div style={{
          background:'linear-gradient(135deg, rgba(9,160,157,.10) 0%, rgba(9,160,157,.02) 100%)',
          border:'1px solid rgba(9,160,157,.32)',
          borderRadius:'11px',
          padding:'12px 14px',
          marginBottom:'var(--ins-size-3)',
          display:'flex',alignItems:'center',justifyContent:'space-between',gap:'var(--ins-size-3)',
        }}>
          <div style={{minWidth:0}}>
            <div style={{display:'flex',alignItems:'baseline',gap:'10px'}}>
              <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-22)',fontWeight:500,color:'var(--ins-color-gray-100)',letterSpacing:'-.01em'}}>$48.2K</span>
              <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-11)',color:'var(--ins-text-body)'}}>net_mrr · Q2 MTD</span>
            </div>
            <div style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',letterSpacing:'.06em',textTransform:'uppercase',marginTop:'var(--ins-size-1)'}}>
              RevOps · v3.2 · 4 source systems
            </div>
          </div>
          <span style={{
            display:'inline-flex',alignItems:'center',gap:'5px',
            padding:'4px 10px',borderRadius:'999px',
            background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.3)',
            fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-status-success-fg)',
            letterSpacing:'.08em',textTransform:'uppercase',whiteSpace:'nowrap',flexShrink:0,
          }}>
            <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'var(--ins-status-success-fg)'}}/>
            audit-ready
          </span>
        </div>

        {/* Trace eyebrow */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'7px'}}>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-inactive)',letterSpacing:'.1em',textTransform:'uppercase'}}>↳ drill to source</span>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-body)'}}>4 revenue drivers</span>
        </div>

        {/* Lineage rows */}
        <div style={{position:'relative',paddingLeft:'14px'}}>
          {/* Tree spine */}
          <div style={{
            position:'absolute',
            left:'4px',top:'4px',bottom:'14px',
            width:'1px',
            background:'rgba(14,196,193,.25)',
          }}/>

          {trace.map((t,i)=>(
            <div key={i} style={{position:'relative',marginBottom:i<trace.length-1?'5px':'0'}}>
              {/* Branch tick */}
              <div style={{
                position:'absolute',
                left:'-10px',top:'14px',
                width:'10px',height:'1px',
                background:'rgba(14,196,193,.32)',
              }}/>
              <div style={{
                background:'rgba(255,255,255,.022)',
                border:'1px solid var(--ins-color-white-a-06)',
                borderRadius:'var(--ins-radius-8)',
                padding:'8px 11px',
                display:'flex',alignItems:'center',gap:'10px',
              }}>
                <span style={{fontSize:'11.5px',color:'var(--ins-color-gray-100)',fontWeight:500,minWidth:'92px',flexShrink:0}}>{t.label}</span>
                <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-12)',color:'var(--ins-text-highlight)',fontWeight:500,minWidth:'46px',flexShrink:0}}>{t.amt}</span>
                <div style={{flex:1,minWidth:0,display:'flex',alignItems:'center',gap:'6px',fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-body)'}}>
                  <span style={{
                    color:'var(--ins-status-warning-fg)',
                    padding:'1px 6px',borderRadius:'var(--ins-radius-4)',
                    background:'rgba(251,191,36,.08)',
                    border:'1px solid rgba(251,191,36,.22)',
                    letterSpacing:'.04em',
                    flexShrink:0,
                  }}>{t.src}</span>
                  <span style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.detail} · {t.owner}</span>
                </div>
                <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9px',color:'var(--ins-text-inactive)',whiteSpace:'nowrap',flexShrink:0,letterSpacing:'.04em'}}>{t.ts}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Audit footer */}
        <div style={{
          marginTop:'var(--ins-size-3)',
          paddingTop:'10px',
          borderTop:'1px dashed var(--ins-color-white-a-06)',
          display:'flex',alignItems:'center',justifyContent:'space-between',
          fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',
          letterSpacing:'.04em',
        }}>
          <span style={{display:'inline-flex',alignItems:'center',gap:'6px'}}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--ins-status-success-fg)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
            <span>Audit trail</span>
          </span>
          <span>signed off by RevOps · 06:42 UTC</span>
        </div>
      </div>
    </div>
  );
}

/* ── FEATURE SPOTLIGHTS ── */
function FeatureSpotlights() {
  const spots = [
    {
      eyebrow:'Self-Serve',
      title:'Revenue answers on demand',
      body:'Type any pipeline or revenue question conversationally and get an answer rooted in your real CRM and billing data — no SQL, no dashboard backlog, no analyst wait.',
      bullets:['Conversational answers across pipeline, MRR, and CAC','Sales, CS, and ops leads finally self-serve'],
      visual:<SpotlightChat />,
    },
    {
      eyebrow:'Versioned Metrics',
      title:'One revenue definition, versioned',
      body:'Sales, Finance, and Marketing each define MRR a little differently. Insightis aligns MRR, win rate, and CAC under a single certified definition the whole company trusts.',
      bullets:['MRR, win rate, and CAC agreed across teams','Definition changes tracked with owner and date'],
      visual:<SpotlightSemantic />,
    },
    {
      eyebrow:'Pipeline Risk Alerts',
      title:'Spot revenue risk before the QBR',
      body:'Insightis scans every revenue answer for churn spikes, win-rate dips, and CAC drift — risks surface inline, not after the quarter has slipped.',
      bullets:['Churn and slippage flagged inside every answer','Unusual CAC or pipeline movement called out'],
      visual:<SpotlightAnomalies />,
    },
    {
      eyebrow:'Deal-Level Audit',
      title:'QBR-ready numbers, end to end',
      body:'Every number carries its deals, owners, and timestamps in one place — the board and finance see the same trail without a reconciliation pass.',
      bullets:['Full lineage from metric down to the deal','Every number carries its owner and sign-off'],
      visual:<SpotlightStack />,
    },
  ];

  return (
    <section id="spotlights" style={{padding:'80px 0 100px',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'72px'}}>
          <SectionHeader
            eyebrow="How it works"
            title="Built for the way revenue teams actually work"
            lede="Four capabilities that turn RevOps from a reporting queue into a real-time revenue engine."
            sparkle
          />
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'88px'}}>
          {spots.map((s,i) => {
            const reverse = i % 2 === 1;
            return (
              <div key={i} data-spotlight-grid style={{
                display:'grid',
                gridTemplateColumns:'1fr 1fr',
                gap:'var(--ins-size-16)',
                alignItems:'center',
              }}>
                <div data-spotlight-text style={{order: reverse ? 2 : 0}}>
                  <div className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'18px'}}>
                    <span style={{fontSize:'var(--ins-font-size-12)'}}>✦</span>
                    <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',fontFamily:'var(--ins-font-family-mono)'}}>{s.eyebrow}</span>
                  </div>
                  <h3 className="ins-text-h2" style={{marginBottom:'18px'}}>
                    {s.title}
                  </h3>
                  <p className="ins-text-body-lg" style={{marginBottom:'22px'}}>
                    {s.body}
                  </p>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
                    {s.bullets.map((b,bi) => (
                      <li key={bi} style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'var(--ins-font-size-14)',color:'var(--ins-text-body)',lineHeight:1.55}}>
                        <CheckIcon size={12} style={{flexShrink:0,marginTop:'var(--ins-size-1)'}} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-spotlight-visual style={{
                  order: reverse ? 0 : 2,
                  display:'flex',
                  alignItems:'stretch',
                  height:'440px',
                }}>
                  {s.visual}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── USE CASES ── */
function UseCases() {
  const cases = [
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 14l4-4 4 4 5-6" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title:'Live pipeline vs. plan',
      desc:'Live pipeline and bookings vs. plan anytime — no more waiting until Wednesday for Monday\'s numbers. Every stage, every segment, real-time.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 3H5a2 2 0 0 0-2 2v3m6-5h6M8 3v18m8-18v18M16 3h3a2 2 0 0 1 2 2v3M2 9h20M2 15h20M2 21h3m16 0h3" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Certified revenue metrics',
      desc:'One semantic layer governs every metric — MRR, win rate, CAC — owned and versioned by RevOps. No more arguments about whose number is right.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Proactive churn & risk alerts',
      desc:'Revenue risk flagged before it compounds. The moment a segment churns or a deal slips, you know — not at the end-of-quarter QBR.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><path d="M7 9h10M7 13h6" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Ad hoc revenue analysis without SQL',
      desc:'Any revenue question answered instantly — win rate by segment, CAC by channel, NRR under different scenarios. No more analyst queue or pivot-table archaeology.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><line x1="3" y1="10" x2="21" y2="10" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><line x1="8" y1="3" x2="8" y2="9" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><line x1="16" y1="3" x2="16" y2="9" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/></svg>,
      title:'Forecast &amp; QBR prep in minutes',
      desc:'Board decks and forecast calls built on live data — charts that update in the room. Walk in with answers, not last week\'s export.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="var(--ins-text-highlight)" strokeWidth="1.5"/><path d="M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" stroke="var(--ins-text-highlight)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Cross-source revenue analysis',
      desc:'Correlate CRM with billing and product usage in one question — no SQL, no analyst, no two-week turnaround. Pipeline, revenue, and retention in one place.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-20)'}}>
          <div style={{
            position:'relative',borderRadius:'var(--ins-radius-16)',
            border:'1px solid rgba(30,30,48,1)',
            padding:'32px 48px',overflow:'hidden',
            display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:'var(--ins-size-6)',
            flexWrap:'wrap',
            background:'linear-gradient(135deg,var(--ins-color-promo-a) 0%,var(--ins-color-promo-b) 50%,var(--ins-color-promo-a) 100%)',
          }}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
            <div style={{flex:'1 1 360px',minWidth:0}}>
              <h3 style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:500,color:'var(--ins-text-heading)',letterSpacing:'-.03em',lineHeight:1.2,marginBottom:'var(--ins-size-2)'}}>
                See it on <span style={{color:'var(--ins-button-primary-bg)'}}>your own pipeline</span>
              </h3>
              <p className="ins-text-body">
                Connect Salesforce or HubSpot and ask Insightis the revenue question that always takes too long to answer.
              </p>
            </div>
            <Button as="a" href="/auth/sign-up/" variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
              Start for free
            </Button>
          </div>
        </div>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="Use cases"
            title="What revenue teams use Insightis for"
            sparkle
          />
        </div>

        <div data-usecase-grid style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}}>
          {cases.map((c,i) => (
            <div key={i}
              style={{
                background:'rgba(13,17,23,.6)',
                border:'1px solid var(--ins-color-white-a-06)',
                borderRadius:'var(--ins-radius-16)',padding:'var(--ins-size-6)',
                position:'relative',overflow:'hidden',
                transition:'all .2s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(9,160,157,.25)';e.currentTarget.style.background='rgba(9,160,157,.04)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--ins-color-white-a-06)';e.currentTarget.style.background='rgba(13,17,23,.6)';}}
            >
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(9,160,157,.2),transparent)'}}/>
              <div style={{width:'38px',height:'38px',borderRadius:'10px',background:'var(--ins-color-teal-a-08)',border:'1px solid rgba(9,160,157,.2)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px'}}>
                {c.icon}
              </div>
              <h3 style={{fontSize:'var(--ins-font-size-15)',fontWeight:600,color:'var(--ins-text-heading-soft)',marginBottom:'6px'}}>{c.title}</h3>
              <p className="ins-text-body">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── RELEVANT INTEGRATIONS ── */
function RelevantIntegrations() {
  const connectors = [
    { name:'Salesforce',  desc:'CRM & pipeline' },
    { name:'HubSpot',     desc:'CRM & marketing' },
    { name:'Stripe',      desc:'Billing & revenue' },
    { name:'Chargebee',   desc:'Subscription billing' },
    { name:'Zuora',       desc:'Subscription billing' },
    { name:'Pipedrive',   desc:'Sales CRM' },
    { name:'Outreach',    desc:'Sales engagement' },
    { name:'Gong',        desc:'Revenue intelligence' },
    { name:'ChartMogul',  desc:'Subscription analytics' },
    { name:'Snowflake',   desc:'Data warehouse' },
    { name:'BigQuery',    desc:'Cloud analytics' },
    { name:'PostgreSQL',  desc:'Data warehouse' },
    { name:'Segment',     desc:'Customer data' },
    { name:'NetSuite',    desc:'Finance & ERP' },
    { name:'QuickBooks',  desc:'Finance data' },
    { name:'Xero',        desc:'Finance data' },
  ];

  return (
    <section style={{padding:'100px 0',background:'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow="Your Revenue Stack"
            title="Works with every CRM, billing, and finance tool"
            lede="Insightis integrates with your CRM, billing, subscription, finance, and warehouse stack."
            sparkle
          />
        </div>

        <div data-connectors-grid style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'var(--ins-size-8)'}}>
          {connectors.map((c,i) => (
            <ConnectorCard key={i} name={c.name} desc={c.desc} />
          ))}
        </div>

        <div style={{textAlign:'center'}}>
          <a href="/resources/connectors" style={{
            display:'inline-flex',alignItems:'center',gap:'6px',
            fontSize:'13px',color:'var(--ins-text-body)',
            textDecoration:'none',
            border:'1px solid var(--ins-color-white-a-07)',
            borderRadius:'999px',
            padding:'8px 20px',
            background:'var(--ins-color-white-a-02)',
            transition:'all .15s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.color='var(--ins-text-highlight)';e.currentTarget.style.borderColor='rgba(9,160,157,.3)';}}
          onMouseLeave={e=>{e.currentTarget.style.color='var(--ins-text-body)';e.currentTarget.style.borderColor='var(--ins-color-white-a-07)';}}
          >
            See all 200+ integrations
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
function FAQ() {
  const items = [
    {
      q:'How does Insightis handle our existing Salesforce custom fields?',
      a:'Insightis maps every custom field, picklist, and formula in your Salesforce org during the initial sync. Custom-defined revenue and pipeline fields show up alongside standard ones — and you can reference them by name in any plain-English question.',
    },
    {
      q:'Can we define our own metrics, or are we stuck with the defaults?',
      a:'You can define any metric in the semantic layer. Set a custom Pipeline Coverage formula, your own win-rate logic, or a stage-conversion definition unique to your business. Once defined, Insightis uses your version every time the metric is referenced.',
    },
    {
      q:'How fresh is the data — and how often does it sync?',
      a:'Real-time for streaming sources like Stripe, webhooks, and event pipelines. Pull-based sources (CRM, warehouse) sync every 5 minutes by default and can be tuned down to once per minute on enterprise plans.',
    },
    {
      q:'Does Insightis replace our existing BI tools like Looker or Tableau?',
      a:'Not necessarily. Most teams use Insightis for ad-hoc questions and quick answers, while keeping Looker for governed dashboards. Insightis can read from the same warehouse models, so there\'s no duplicate data layer to maintain.',
    },
    {
      q:'How long is the typical setup for a RevOps team?',
      a:'Most teams are running real questions within an afternoon. Salesforce and Stripe connect in minutes; defining your first dozen metrics in the semantic layer takes another hour or two if you want a polished, fully-certified setup.',
    },
    {
      q:'Where does our pipeline data live — and how is it secured?',
      a:'Your data stays in your warehouse. Insightis runs queries on top via secure read-only connectors, with encryption in transit and at rest, single sign-on, and row-level access controls. Nothing leaves your environment unless you explicitly share it.',
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
            Questions revenue teams ask
          </h2>
        </div>

        <FAQAccordion items={items} />
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTASection() {
  return (
    <section style={{paddingTop:'var(--ins-size-8)',paddingBottom:'var(--ins-size-32)',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <BottomCTA
          variant="buttons"
          title={<>Stop chasing <BottomCTA.Highlight>numbers.</BottomCTA.Highlight> Start trusting <BottomCTA.Highlight> them</BottomCTA.Highlight></>}
          description="Give every rep and RevOps lead a single, trusted view of pipeline, forecast, and revenue — answered in seconds, straight from your warehouse. Free to start, no credit card required."
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
    <div>
      <Header />
      <main>
      <Hero />
      <FeatureSpotlights />
      <UseCases />
      <RelevantIntegrations />
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
