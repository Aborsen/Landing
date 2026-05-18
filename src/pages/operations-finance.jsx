import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 72% 50%,rgba(9,160,157,0.09) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 20% 50%,rgba(59,31,94,0.12) 0%,transparent 70%)',pointerEvents:'none',zIndex:1}}/>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',position:'relative',zIndex:10}}>
        <div data-hero-grid style={{
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:'64px',
          alignItems:'center',
        }}>
          {/* Left: text */}
          <div>
            <div className="fu0" style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'20px'}}>
              <span style={{color:'#09A09D',fontSize:'12px'}}>✦</span>
              <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'#09A09D',fontFamily:'Geist Mono,monospace'}}>For Operations &amp; Finance</span>
            </div>

            <h1 className="fu1" style={{fontSize:'clamp(36px,4.5vw,58px)',fontWeight:500,letterSpacing:'-.03em',lineHeight:1.12,marginBottom:'20px'}}>
              <span style={{color:'#E8F2F5'}}>Stop chasing numbers</span>
              <br/>
              <span style={{color:'#0EC4C1'}}>across spreadsheets.</span>
            </h1>

            <p className="fu2" style={{fontSize:'clamp(16px,1.2vw,18px)',color:'rgba(255,255,255,.65)',lineHeight:1.65,marginBottom:'28px',maxWidth:'480px'}}>
              Stop reconciling AP, HR, and billing tools by hand. Ask any cost question in plain English — Insightis consolidates spend instantly.
            </p>

            <div className="fu3" style={{display:'flex',gap:'12px',flexWrap:'wrap',marginBottom:'28px'}}>
              <a href="#" style={{
                display:'inline-flex',alignItems:'center',gap:'8px',
                padding:'12px 24px',borderRadius:'999px',
                background:'linear-gradient(135deg,#09A09D,#07807E)',
                color:'#fff',fontSize:'14px',fontWeight:500,
                textDecoration:'none',
                boxShadow:'0 0 24px rgba(9,160,157,.3)',
                transition:'all .2s',
              }}>
                Start for Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </a>
              <a href="#" style={{
                display:'inline-flex',alignItems:'center',gap:'8px',
                padding:'12px 24px',borderRadius:'999px',
                border:'1px solid rgba(255,255,255,.12)',
                color:'#C0D4DC',fontSize:'14px',fontWeight:400,
                textDecoration:'none',
                background:'rgba(255,255,255,.03)',
                transition:'all .2s',
              }}>
                See how it works
              </a>
            </div>

          </div>

          {/* Right: ops & finance hero visual (static) */}
          <div className="fu2" style={{position:'relative'}}>
            {/* Ambient glow — amber-leaning to differentiate from other persona pages */}
            <div style={{
              position:'absolute', inset:'-60px',
              background:'radial-gradient(circle at 25% 30%, rgba(251,191,36,.16) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(9,160,157,.12) 0%, transparent 50%)',
              pointerEvents:'none',
              filter:'blur(44px)',
              zIndex:0,
            }}/>

            {/* Main panel */}
            <div style={{
              position:'relative',
              background:'linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(15,20,28,0.92) 100%)',
              border:'1px solid rgba(255,255,255,0.08)',
              borderRadius:'24px',
              padding:'24px',
              backdropFilter:'blur(24px)',
              WebkitBackdropFilter:'blur(24px)',
              boxShadow:'0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)',
              overflow:'hidden',
              zIndex:1,
              minHeight:'540px',
            }}>
              {/* Top gradient line — amber accent */}
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(251,191,36,.55),transparent)',zIndex:1}}/>

              {/* Window chrome */}
              <div style={{
                margin:'-24px -24px 16px',
                padding:'10px 14px',
                borderBottom:'1px solid rgba(255,255,255,0.06)',
                background:'rgba(255,255,255,0.015)',
                display:'flex',
                alignItems:'center',
                position:'relative',
              }}>
                <div style={{display:'flex',gap:'6px'}}>
                  <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#FF5F57'}}/>
                  <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#FEBC2E'}}/>
                  <div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#28C840'}}/>
                </div>
                <span style={{
                  position:'absolute',left:'50%',top:'50%',
                  transform:'translate(-50%,-50%)',
                  fontFamily:'Geist Mono,monospace',
                  fontSize:'10.5px',
                  color:'#7FA0AC',
                  letterSpacing:'.08em',
                  whiteSpace:'nowrap',
                }}>Insightis — For Operations &amp; Finance</span>
              </div>

              {/* Header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#FBBF24',boxShadow:'0 0 8px rgba(251,191,36,.6)'}}/>
                  <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10.5px',color:'#7FA0AC',letterSpacing:'.08em',textTransform:'uppercase'}}>Q2 budget · MTD</span>
                </div>
                <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#FBBF24',padding:'3px 9px',borderRadius:'999px',background:'rgba(251,191,36,.1)',border:'1px solid rgba(251,191,36,.3)',letterSpacing:'.08em',textTransform:'uppercase'}}>variance</span>
              </div>

              {/* Headline + caption */}
              <h3 style={{fontSize:'17px',fontWeight:500,color:'#E8F2F5',marginBottom:'6px',letterSpacing:'-.015em',lineHeight:1.35}}>
                Cloud infra running <span style={{color:'#F87171'}}>+41%</span> over budget
              </h3>
              <p style={{fontSize:'12.5px',color:'#7FA0AC',lineHeight:1.6,marginBottom:'16px'}}>
                Reconciled across <span style={{color:'#FBBF24',fontFamily:'Geist Mono,monospace',fontSize:'11.5px'}}>AP · HR · Billing</span> in real time. Two categories tracking past plan; rest on or under.
              </p>

              {/* Variance butterfly chart — bars pivot from a centered "plan" baseline */}
              <div style={{
                background:'rgba(255,255,255,.018)',
                border:'1px solid rgba(255,255,255,.05)',
                borderRadius:'14px',
                padding:'14px 14px 12px',
                marginBottom:'14px',
              }}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
                  <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#8AA6B3',letterSpacing:'.06em',textTransform:'uppercase'}}>variance · vs plan</span>
                  <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#7FA0AC'}}>Q2 · MTD</span>
                </div>

                {/* Axis header: −50% / plan / +50% */}
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'6px'}}>
                  <span style={{width:'92px',flexShrink:0}}/>
                  <div style={{flex:1,display:'flex',justifyContent:'space-between'}}>
                    <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9px',color:'#8AA6B3',letterSpacing:'.06em'}}>−50%</span>
                    <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9px',color:'#FBBF24',letterSpacing:'.06em',fontWeight:500}}>plan</span>
                    <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9px',color:'#8AA6B3',letterSpacing:'.06em'}}>+50%</span>
                  </div>
                  <span style={{width:'48px',flexShrink:0}}/>
                </div>

                <div style={{display:'flex',flexDirection:'column',gap:'7px'}}>
                  {[
                    {label:'Cloud Infra',  v:+41},
                    {label:'Contractors',  v:+18},
                    {label:'Salaries',     v:+1},
                    {label:'SaaS',         v:-8},
                    {label:'Travel',       v:-22},
                  ].map((r,i) => {
                    const cap = 50;
                    const abs = Math.abs(r.v);
                    const barPct = Math.min(abs, cap) / cap * 50; // % of full bar width to fill, max 50% (one half)
                    const isOver = r.v > 1;
                    const isUnder = r.v < -1;
                    const isNeutral = !isOver && !isUnder;
                    const labelColor = isOver ? '#F87171' : isNeutral ? '#C0D4DC' : '#7FA0AC';
                    const valColor = isOver ? '#F87171' : isNeutral ? '#C0D4DC' : '#22C55E';
                    return (
                      <div key={i} style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <span style={{
                          fontFamily:'Geist Mono,monospace',
                          fontSize:'10px',
                          color:labelColor,
                          width:'92px',flexShrink:0,
                          whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',
                        }}>{r.label}</span>

                        {/* Butterfly bar */}
                        <div style={{flex:1,height:'14px',background:'rgba(255,255,255,.04)',borderRadius:'3px',position:'relative',overflow:'hidden'}}>
                          {/* Center "plan" line */}
                          <div style={{
                            position:'absolute',
                            top:'-2px',bottom:'-2px',
                            left:'50%',
                            width:'1px',
                            background:'rgba(251,191,36,.7)',
                          }}/>
                          {/* Variance bar — pivots from center */}
                          <div style={{
                            position:'absolute',
                            top:0,bottom:0,
                            left: isOver ? '50%' : `${50 - barPct}%`,
                            width: `${barPct}%`,
                            background: isOver
                              ? 'linear-gradient(90deg, rgba(248,113,113,.45), rgba(248,113,113,.8))'
                              : isNeutral
                                ? 'linear-gradient(90deg, rgba(192,212,220,.2), rgba(192,212,220,.32))'
                                : 'linear-gradient(90deg, rgba(34,197,94,.55), rgba(34,197,94,.32))',
                            borderRadius: isOver ? '0 3px 3px 0' : isUnder ? '3px 0 0 3px' : '3px',
                          }}/>
                        </div>

                        <span style={{
                          fontFamily:'Geist Mono,monospace',
                          fontSize:'10.5px',
                          color:valColor,
                          width:'48px',textAlign:'right',flexShrink:0,
                        }}>{r.v > 0 ? '+' : ''}{r.v}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Metric tiles — finance flavored */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px'}}>
                {[
                  {label:'Overage',  val:'+$24K',  color:'#F87171'},
                  {label:'Sources',  val:'AP·HR·Billing', color:'#FBBF24'},
                  {label:'On plan',  val:'3 / 5',   color:'#22C55E'},
                ].map((m,i) => (
                  <div key={i} style={{
                    background:'rgba(255,255,255,.025)',
                    border:'1px solid rgba(255,255,255,.06)',
                    borderRadius:'10px',
                    padding:'10px 12px',
                  }}>
                    <div style={{fontSize:'9.5px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:'4px'}}>{m.label}</div>
                    <div style={{fontSize:m.val.length>8?'11.5px':'14px',fontWeight:500,color:m.color,fontFamily:'Geist Mono,monospace',letterSpacing:'-.01em'}}>{m.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating top-right: amber Over Budget card (distinct from green/lavender on other persona pages) */}
            <div style={{
              position:'absolute',
              top:'-18px',
              right:'-14px',
              background:'linear-gradient(135deg, rgba(251,191,36,.22) 0%, rgba(13,17,23,0.95) 100%)',
              border:'1px solid rgba(251,191,36,.4)',
              borderRadius:'14px',
              padding:'10px 14px',
              boxShadow:'0 16px 40px rgba(251,191,36,0.18), 0 8px 24px rgba(0,0,0,0.5)',
              backdropFilter:'blur(16px)',
              WebkitBackdropFilter:'blur(16px)',
              display:'flex',alignItems:'center',gap:'10px',
              transform:'rotate(2.5deg)',
              zIndex:2,
            }}>
              <div style={{
                width:'8px',height:'8px',borderRadius:'50%',background:'#FBBF24',
                flexShrink:0,
              }}/>
              <div>
                <div style={{fontSize:'9.5px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase'}}>Over budget</div>
                <div style={{fontSize:'12.5px',color:'#FBBF24',fontWeight:500,fontFamily:'Geist Mono,monospace',marginTop:'1px'}}>cloud_infra +$24K</div>
              </div>
            </div>

            {/* Floating bottom-left: Q2 close progress checklist (different from product retention curve) */}
            <div style={{
              position:'absolute',
              bottom:'-22px',
              left:'-18px',
              background:'linear-gradient(135deg, rgba(9,160,157,.2) 0%, rgba(13,17,23,0.95) 100%)',
              border:'1px solid rgba(9,160,157,.4)',
              borderRadius:'14px',
              padding:'12px 14px',
              boxShadow:'0 16px 40px rgba(9,160,157,0.18), 0 8px 24px rgba(0,0,0,0.5)',
              backdropFilter:'blur(16px)',
              WebkitBackdropFilter:'blur(16px)',
              transform:'rotate(-2deg)',
              minWidth:'180px',
              zIndex:2,
            }}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
                <span style={{fontSize:'9.5px',color:'#8AA6B3',fontFamily:'Geist Mono,monospace',letterSpacing:'.08em',textTransform:'uppercase'}}>Q2 close</span>
                <span style={{fontSize:'10.5px',color:'#0EC4C1',fontFamily:'Geist Mono,monospace',fontWeight:500}}>5 / 7 done</span>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:'3px'}}>
                {[
                  {step:'AP reconciliation', done:true},
                  {step:'Payroll posted',    done:true},
                  {step:'Accruals booked',   done:true},
                  {step:'Variance review',   done:false},
                ].map((s,i)=>(
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'7px'}}>
                    <div style={{
                      width:'10px',height:'10px',borderRadius:'3px',
                      background:s.done?'rgba(14,196,193,.18)':'rgba(255,255,255,.04)',
                      border:`1px solid ${s.done?'rgba(14,196,193,.5)':'rgba(255,255,255,.1)'}`,
                      display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
                    }}>
                      {s.done && <svg width="6" height="6" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span style={{fontSize:'10.5px',color:s.done?'#C0D4DC':'#7FA0AC',fontFamily:'Geist Mono,monospace'}}>{s.step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FEATURE SPOTLIGHT VISUALS ── */
function ChromeHeader({ label }) {
  return (
    <div style={{padding:'14px 18px',borderBottom:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',gap:'10px',flexShrink:0,position:'relative',zIndex:1}}>
      <div style={{display:'flex',gap:'5px'}}>
        {['#FF5F57','#FFBD2E','#28C840'].map((c,i) => (
          <div key={i} style={{width:'10px',height:'10px',borderRadius:'50%',background:c,opacity:.6}}/>
        ))}
      </div>
      <div style={{flex:1,textAlign:'center',fontSize:'12px',color:'#8AA6B3',fontFamily:'Geist Mono, monospace'}}>
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
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'20px',
      overflow:'hidden',
      boxShadow:'0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="fp&a · inbox" />
      <div style={{padding:'18px 20px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>

        {/* Inbox header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#8AA6B3',letterSpacing:'.1em',textTransform:'uppercase'}}>requests · today</span>
          <span style={{
            fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#22C55E',
            padding:'2px 8px',borderRadius:'999px',
            background:'rgba(34,197,94,.1)',border:'1px solid rgba(34,197,94,.3)',
            letterSpacing:'.08em',textTransform:'uppercase',
          }}>3 auto-answered</span>
        </div>

        {/* Expanded request: CFO */}
        <div style={{
          background:'linear-gradient(135deg, rgba(9,160,157,.08) 0%, rgba(9,160,157,.02) 100%)',
          border:'1px solid rgba(9,160,157,.32)',
          borderRadius:'11px',
          padding:'12px 13px',
          marginBottom:'8px',
        }}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px',gap:'8px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',minWidth:0}}>
              <div style={{
                width:'22px',height:'22px',borderRadius:'50%',
                background:'rgba(9,160,157,.22)',
                border:'1px solid rgba(9,160,157,.4)',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:'Geist Mono,monospace',fontSize:'9.5px',fontWeight:500,color:'#0EC4C1',
                flexShrink:0,
              }}>CF</div>
              <span style={{fontSize:'11.5px',fontWeight:500,color:'#E8F2F5'}}>CFO</span>
              <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#8AA6B3'}}>10:42</span>
            </div>
            <span style={{
              fontFamily:'Geist Mono,monospace',fontSize:'9px',color:'#22C55E',
              padding:'2px 7px',borderRadius:'999px',
              background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.25)',
              letterSpacing:'.06em',textTransform:'uppercase',whiteSpace:'nowrap',flexShrink:0,
            }}>✓ 4s</span>
          </div>

          {/* Question */}
          <div style={{fontSize:'12.5px',color:'#C0D4DC',marginBottom:'8px',lineHeight:1.5}}>
            "Where are we vs plan this month?"
          </div>

          {/* Answer — single compact line */}
          <div style={{
            display:'flex',alignItems:'center',gap:'8px',
            fontFamily:'Geist Mono,monospace',fontSize:'11.5px',
            paddingTop:'8px',
            borderTop:'1px dashed rgba(255,255,255,.06)',
          }}>
            <span style={{color:'#0EC4C1'}}>↳</span>
            <span style={{color:'#E8F2F5'}}>$187K</span>
            <span style={{color:'#8AA6B3'}}>vs</span>
            <span style={{color:'#7FA0AC'}}>$178K plan</span>
            <span style={{color:'#8AA6B3'}}>·</span>
            <span style={{color:'#F87171',fontWeight:500}}>+$9K (cloud_infra)</span>
          </div>
        </div>

        {/* Other auto-answered requests */}
        {[
          {who:'Head of Sales',  init:'HS', q:'Headcount cost by team Q2?',     when:'09:18', tone:'#A78BFA'},
          {who:'COO',            init:'CO', q:'Contractor rollup since June?',   when:'08:55', tone:'#FBBF24'},
        ].map((r,i)=>(
          <div key={i} style={{
            display:'flex',alignItems:'center',gap:'10px',
            padding:'8px 11px',
            background:'rgba(255,255,255,.02)',
            border:'1px solid rgba(255,255,255,.05)',
            borderRadius:'9px',
            marginTop: i===0 ? '0' : '5px',
          }}>
            <div style={{
              width:'22px',height:'22px',borderRadius:'50%',
              background:`${r.tone}1a`,
              border:`1px solid ${r.tone}55`,
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:'Geist Mono,monospace',fontSize:'9px',fontWeight:500,color:r.tone,
              flexShrink:0,
            }}>{r.init}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                <span style={{fontSize:'11px',fontWeight:500,color:'#C0D4DC',whiteSpace:'nowrap'}}>{r.who}</span>
                <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9px',color:'#8AA6B3'}}>{r.when}</span>
              </div>
              <div style={{fontSize:'11px',color:'#7FA0AC',marginTop:'1px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>"{r.q}"</div>
            </div>
            <span style={{
              fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#22C55E',flexShrink:0,
            }}>✓</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpotlightSemantic() {
  const versions = [
    {ver:'v3.2', state:'certified', owner:'FP&A',     when:'2 weeks ago',  note:'payroll + saas + infra (full stack)'},
    {ver:'v3.0', state:'deprecated', owner:'FP&A',    when:'Q1 2026',       note:'missing infra spend'},
    {ver:'v2.4', state:'deprecated', owner:'Finance', when:'Q4 2025',       note:'payroll + saas only'},
    {ver:'v1.0', state:'deprecated', owner:'Marketing', when:'Q2 2025',     note:'CMO\'s spreadsheet definition'},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'20px',
      overflow:'hidden',
      boxShadow:'0 24px 80px rgba(0,0,0,0.5)',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="metric · gross_burn_rate" />
      <div style={{padding:'22px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* Eyebrow */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#8AA6B3',letterSpacing:'.1em',textTransform:'uppercase'}}>version history</span>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#7FA0AC'}}>4 revisions</span>
        </div>

        {/* Vertical timeline */}
        <div style={{position:'relative',paddingLeft:'22px'}}>
          {/* Spine line */}
          <div style={{
            position:'absolute',
            left:'7px',top:'8px',bottom:'8px',
            width:'1px',
            background:'linear-gradient(180deg, rgba(34,197,94,.5) 0%, rgba(255,255,255,.06) 30%, rgba(255,255,255,.06) 100%)',
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
                  background: isCertified ? 'rgba(34,197,94,.15)' : 'rgba(255,255,255,.04)',
                  border: isCertified ? '2px solid #22C55E' : '1px solid rgba(255,255,255,.18)',
                  boxShadow: isCertified ? '0 0 0 4px rgba(34,197,94,.08)' : 'none',
                }}/>

                {/* Card */}
                <div style={{
                  background: isCertified ? 'linear-gradient(135deg, rgba(34,197,94,.08) 0%, rgba(34,197,94,.02) 100%)' : 'rgba(255,255,255,.02)',
                  border: isCertified ? '1px solid rgba(34,197,94,.32)' : '1px solid rgba(255,255,255,.06)',
                  borderRadius:'9px',
                  padding:'9px 12px',
                  opacity: isCertified ? 1 : 0.66,
                }}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px',marginBottom:'3px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                      <span style={{fontFamily:'Geist Mono,monospace',fontSize:'12px',fontWeight:500,color:'#E8F2F5'}}>{v.ver}</span>
                      {isCertified && (
                        <span style={{
                          fontFamily:'Geist Mono,monospace',fontSize:'8.5px',color:'#22C55E',
                          padding:'2px 7px',borderRadius:'999px',
                          background:'rgba(34,197,94,.12)',border:'1px solid rgba(34,197,94,.4)',
                          letterSpacing:'.1em',textTransform:'uppercase',fontWeight:500,
                        }}>certified</span>
                      )}
                      {!isCertified && (
                        <span style={{fontFamily:'Geist Mono,monospace',fontSize:'8.5px',color:'#7FA0AC',letterSpacing:'.1em',textTransform:'uppercase'}}>deprecated</span>
                      )}
                    </div>
                    <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#8AA6B3',whiteSpace:'nowrap'}}>{v.owner} · {v.when}</span>
                  </div>
                  <div style={{
                    fontSize:'11px',
                    color:isCertified?'#C0D4DC':'#7FA0AC',
                    fontFamily: isCertified ? 'Geist Mono,monospace' : 'inherit',
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
    {sev:'high', label:'Cloud Infra +$24K',     when:'Tue 14:32', why:'unplanned scale-up · compute', tag:'infra_spend'},
    {sev:'med',  label:'Contractors +$13K',     when:'Mon 09:15', why:'new vendor · marketing ops',   tag:'contractor_spend'},
    {sev:'med',  label:'SaaS auto-renew $8K',   when:'Sun 22:00', why:'expected · annual seat reset',  tag:'saas_spend'},
    {sev:'ok',   label:'Payroll on plan',       when:'Today',     why:'matches Gusto run',              tag:'payroll'},
  ];
  const sevConfig = {
    high: {color:'#F87171', bg:'rgba(248,113,113,.06)', border:'rgba(248,113,113,.28)', icon:'!', iconBg:'rgba(248,113,113,.18)', iconBorder:'#F87171'},
    med:  {color:'#FBBF24', bg:'rgba(251,191,36,.05)',  border:'rgba(251,191,36,.25)',  icon:'!', iconBg:'rgba(251,191,36,.16)', iconBorder:'#FBBF24'},
    ok:   {color:'#22C55E', bg:'rgba(255,255,255,.02)', border:'rgba(255,255,255,.05)', icon:'✓', iconBg:'rgba(34,197,94,.14)',  iconBorder:'rgba(34,197,94,.5)'},
  };
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'20px',
      overflow:'hidden',
      boxShadow:'0 24px 80px rgba(0,0,0,0.5)',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="watchlist · this week" />
      <div style={{padding:'20px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>
        {/* Eyebrow row */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#8AA6B3',letterSpacing:'.1em',textTransform:'uppercase'}}>flagged before close</span>
          <div style={{display:'flex',gap:'10px',fontFamily:'Geist Mono,monospace',fontSize:'9.5px'}}>
            <span style={{color:'#F87171'}}>● 1 high</span>
            <span style={{color:'#FBBF24'}}>● 2 med</span>
            <span style={{color:'#22C55E'}}>● 1 ok</span>
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
                  fontFamily:'Geist Mono,monospace',
                  fontSize:'10px',fontWeight:600,
                  color:c.color,
                }}>{c.icon}</div>

                {/* Body */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <span style={{fontSize:'12px',color:'#E8F2F5',fontWeight:500}}>{it.label}</span>
                    <span style={{
                      fontFamily:'Geist Mono,monospace',fontSize:'8.5px',
                      color:'#8AA6B3',
                      padding:'2px 6px',borderRadius:'4px',
                      background:'rgba(255,255,255,.04)',
                      letterSpacing:'.04em',
                    }}>{it.tag}</span>
                  </div>
                  <div style={{fontSize:'10.5px',color:'#7FA0AC',marginTop:'2px'}}>{it.why}</div>
                </div>

                {/* Timestamp */}
                <span style={{
                  fontFamily:'Geist Mono,monospace',
                  fontSize:'10px',color:'#8AA6B3',
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
    {label:'Payroll',     amt:'$98K', src:'Gusto',      detail:'142 entries',  owner:'HR',  ts:'06:30 UTC'},
    {label:'SaaS spend',  amt:'$32K', src:'Ramp',       detail:'18 vendors',   owner:'IT',  ts:'06:30 UTC'},
    {label:'Infra spend', amt:'$42K', src:'QuickBooks', detail:'24 line-items',owner:'Eng', ts:'06:30 UTC'},
    {label:'Contractors', amt:'$15K', src:'QuickBooks', detail:'6 vendors',    owner:'Ops', ts:'06:30 UTC'},
  ];
  return (
    <div style={{
      width:'100%',
      background:'rgba(13,17,23,0.9)',
      border:'1px solid rgba(255,255,255,0.08)',
      borderRadius:'20px',
      overflow:'hidden',
      boxShadow:'0 24px 80px rgba(0,0,0,0.5)',
      display:'flex',
      flexDirection:'column',
    }}>
      <ChromeHeader label="audit · gross_burn_rate" />
      <div style={{padding:'20px 22px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center'}}>

        {/* Headline KPI with audit stamp */}
        <div style={{
          background:'linear-gradient(135deg, rgba(9,160,157,.10) 0%, rgba(9,160,157,.02) 100%)',
          border:'1px solid rgba(9,160,157,.32)',
          borderRadius:'11px',
          padding:'12px 14px',
          marginBottom:'12px',
          display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px',
        }}>
          <div style={{minWidth:0}}>
            <div style={{display:'flex',alignItems:'baseline',gap:'10px'}}>
              <span style={{fontFamily:'Geist Mono,monospace',fontSize:'22px',fontWeight:500,color:'#E8F2F5',letterSpacing:'-.01em'}}>$187K</span>
              <span style={{fontFamily:'Geist Mono,monospace',fontSize:'11px',color:'#7FA0AC'}}>gross_burn · Q2 MTD</span>
            </div>
            <div style={{fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#8AA6B3',letterSpacing:'.06em',textTransform:'uppercase',marginTop:'4px'}}>
              FP&amp;A · v3.2 · 4 source systems
            </div>
          </div>
          <span style={{
            display:'inline-flex',alignItems:'center',gap:'5px',
            padding:'4px 10px',borderRadius:'999px',
            background:'rgba(34,197,94,.08)',border:'1px solid rgba(34,197,94,.3)',
            fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#22C55E',
            letterSpacing:'.08em',textTransform:'uppercase',whiteSpace:'nowrap',flexShrink:0,
          }}>
            <span style={{width:'5px',height:'5px',borderRadius:'50%',background:'#22C55E'}}/>
            audit-ready
          </span>
        </div>

        {/* Trace eyebrow */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'7px'}}>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'10px',color:'#8AA6B3',letterSpacing:'.1em',textTransform:'uppercase'}}>↳ trace to source</span>
          <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#7FA0AC'}}>4 components</span>
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
                border:'1px solid rgba(255,255,255,.06)',
                borderRadius:'8px',
                padding:'8px 11px',
                display:'flex',alignItems:'center',gap:'10px',
              }}>
                <span style={{fontSize:'11.5px',color:'#E8F2F5',fontWeight:500,minWidth:'92px',flexShrink:0}}>{t.label}</span>
                <span style={{fontFamily:'Geist Mono,monospace',fontSize:'12px',color:'#0EC4C1',fontWeight:500,minWidth:'46px',flexShrink:0}}>{t.amt}</span>
                <div style={{flex:1,minWidth:0,display:'flex',alignItems:'center',gap:'6px',fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#7FA0AC'}}>
                  <span style={{
                    color:'#FBBF24',
                    padding:'1px 6px',borderRadius:'4px',
                    background:'rgba(251,191,36,.08)',
                    border:'1px solid rgba(251,191,36,.22)',
                    letterSpacing:'.04em',
                    flexShrink:0,
                  }}>{t.src}</span>
                  <span style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.detail} · {t.owner}</span>
                </div>
                <span style={{fontFamily:'Geist Mono,monospace',fontSize:'9px',color:'#8AA6B3',whiteSpace:'nowrap',flexShrink:0,letterSpacing:'.04em'}}>{t.ts}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Audit footer */}
        <div style={{
          marginTop:'12px',
          paddingTop:'10px',
          borderTop:'1px dashed rgba(255,255,255,.06)',
          display:'flex',alignItems:'center',justifyContent:'space-between',
          fontFamily:'Geist Mono,monospace',fontSize:'9.5px',color:'#8AA6B3',
          letterSpacing:'.04em',
        }}>
          <span style={{display:'inline-flex',alignItems:'center',gap:'6px'}}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
            <span>SOX-ready trail</span>
          </span>
          <span>signed off by FP&amp;A · 06:42 UTC</span>
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
      title:'Finance answers on demand',
      body:'Type any cost or budget question conversationally and get an answer rooted in your real ledger — no spreadsheet maze, no FP&A wait.',
      bullets:['Conversational answers across budget, payroll, and spend','CFO and ops leads finally self-serve'],
      visual:<SpotlightChat />,
    },
    {
      eyebrow:'Unified Cost Model',
      title:'Every metric has one definition',
      body:'Marketing and Finance often define the same metric differently. Insightis aligns burn, margin, and headcount under a single agreed definition.',
      bullets:['Burn, margin, headcount agreed across teams','Versioning, ownership, and lineage built in'],
      visual:<SpotlightSemantic />,
    },
    {
      eyebrow:'Variance & Anomaly Detection',
      title:'Spot overruns before month-end',
      body:'Insightis scans every spend answer for variance, one-time charges, and regime shifts — overruns surface inline, not after the close.',
      bullets:['Budget overruns flagged inside every answer','Unusual vendor or contractor spend called out'],
      visual:<SpotlightAnomalies />,
    },
    {
      eyebrow:'Audit-Ready',
      title:'Audit-ready answers, all in one place',
      body:'Every figure carries its transactions, owners, and timestamps in one place — auditors and finance see the same trail without a reconciliation pass.',
      bullets:['Full lineage from KPI down to source transaction','Owner, timestamp, and version stamped on every figure'],
      visual:<SpotlightStack />,
    },
  ];

  return (
    <section id="spotlights" style={{padding:'80px 0 100px',background:'linear-gradient(180deg,#0A0E13 0%,#0D1117 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'72px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'14px'}}>
            <span style={{color:'#09A09D',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'#09A09D',fontFamily:'Geist Mono,monospace'}}>How it works</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:500,color:'#fff',letterSpacing:'-.03em',marginBottom:'12px'}}>
            Built for the way finance teams actually work
          </h2>
          <p style={{fontSize:'16px',color:'rgba(255,255,255,.7)',maxWidth:'560px',margin:'0 auto',lineHeight:1.65}}>
            Four capabilities that turn finance from a spreadsheet pipeline into a real-time control function.
          </p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'88px'}}>
          {spots.map((s,i) => {
            const reverse = i % 2 === 1;
            return (
              <div key={i} data-spotlight-grid style={{
                display:'grid',
                gridTemplateColumns:'1fr 1fr',
                gap:'64px',
                alignItems:'center',
              }}>
                <div data-spotlight-text style={{order: reverse ? 2 : 0}}>
                  <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'18px'}}>
                    <span style={{color:'#09A09D',fontSize:'12px'}}>✦</span>
                    <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'#09A09D',fontFamily:'Geist Mono,monospace'}}>{s.eyebrow}</span>
                  </div>
                  <h3 style={{fontSize:'clamp(24px,2.6vw,34px)',fontWeight:500,color:'#fff',letterSpacing:'-.025em',lineHeight:1.18,marginBottom:'18px'}}>
                    {s.title}
                  </h3>
                  <p style={{fontSize:'16px',color:'rgba(255,255,255,.62)',lineHeight:1.65,marginBottom:'22px'}}>
                    {s.body}
                  </p>
                  <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:'10px'}}>
                    {s.bullets.map((b,bi) => (
                      <li key={bi} style={{display:'flex',alignItems:'flex-start',gap:'10px',fontSize:'14px',color:'#C0D4DC',lineHeight:1.55}}>
                        <span style={{color:'#0EC4C1',flexShrink:0,marginTop:'1px'}}>✓</span>
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
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3v18h18" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 14l4-4 4 4 5-6" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title:'Live budget vs. actuals',
      desc:'Live budget vs. actuals available anytime — no more waiting until Wednesday for Monday\'s numbers. Every department, every line item, real-time.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 3H5a2 2 0 0 0-2 2v3m6-5h6M8 3v18m8-18v18M16 3h3a2 2 0 0 1 2 2v3M2 9h20M2 15h20M2 21h3m16 0h3" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Governed cost definitions',
      desc:'One unified cost model governs every metric — burn rate, gross margin, COGS — owned and versioned by Finance. No more arguments about whose number is right.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Proactive overrun alerts',
      desc:'Overspend flagged before it compounds. The moment a department or vendor breaks plan, you know — not three weeks later when the bill hits.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="#0EC4C1" strokeWidth="1.5"/><path d="M7 9h10M7 13h6" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Ad hoc finance analysis without Excel',
      desc:'Any finance question answered instantly — gross margin by product, fully-loaded cost by team, runway under different burn scenarios. No more pivot-table archaeology.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2" stroke="#0EC4C1" strokeWidth="1.5"/><line x1="3" y1="10" x2="21" y2="10" stroke="#0EC4C1" strokeWidth="1.5"/><line x1="8" y1="3" x2="8" y2="9" stroke="#0EC4C1" strokeWidth="1.5"/><line x1="16" y1="3" x2="16" y2="9" stroke="#0EC4C1" strokeWidth="1.5"/></svg>,
      title:'Vendor &amp; SaaS contract tracking',
      desc:'Vendor obligations tracked automatically — past-due invoices, auto-renewing SaaS contracts, unused licenses. Stop discovering them on a renewal email.',
    },
    {
      icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="#0EC4C1" strokeWidth="1.5"/><path d="M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" stroke="#0EC4C1" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      title:'Fully-loaded headcount cost in seconds',
      desc:'Fully-loaded cost by team in seconds — pulling from HR, payroll, and benefits automatically. The kind of answer that used to take a day, before the CEO asked again.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,#0D1117 0%,#0A0E13 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'80px'}}>
          <div style={{
            position:'relative',borderRadius:'16px',
            border:'1px solid rgba(30,30,48,1)',
            padding:'32px 48px',overflow:'hidden',
            display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:'24px',
            flexWrap:'wrap',
            background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)',
          }}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
            <div style={{flex:'1 1 360px',minWidth:0}}>
              <h3 style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:500,color:'#fff',letterSpacing:'-.03em',lineHeight:1.2,marginBottom:'8px'}}>
                See it on <span style={{color:'#07807E'}}>your own ledger</span>.
              </h3>
              <p style={{fontSize:'14px',color:'#7FA0AC',lineHeight:1.6}}>
                Connect QuickBooks or Xero and ask Insightis the cost question that always takes too long to answer.
              </p>
            </div>
            <button style={{
              display:'inline-flex',alignItems:'center',gap:'8px',
              padding:'14px 26px',flexShrink:0,
              fontSize:'14px',fontWeight:600,color:'#fff',
              background:'linear-gradient(135deg,#07807E,#09A09D)',
              borderRadius:'10px',border:'none',cursor:'pointer',
              whiteSpace:'nowrap',
              fontFamily:'Geist,sans-serif',
              boxShadow:'0 8px 24px rgba(9,160,157,.25)',
            }}>
              Get started for free
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'14px'}}>
            <span style={{color:'#09A09D',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'#09A09D',fontFamily:'Geist Mono,monospace'}}>Use cases</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:500,color:'#fff',letterSpacing:'-.03em',marginBottom:'12px'}}>
            What ops &amp; finance teams use Insightis for
          </h2>
        </div>

        <div data-usecase-grid style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}}>
          {cases.map((c,i) => (
            <div key={i}
              style={{
                background:'rgba(13,17,23,.6)',
                border:'1px solid rgba(255,255,255,.06)',
                borderRadius:'16px',padding:'24px',
                position:'relative',overflow:'hidden',
                transition:'all .2s',
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(9,160,157,.25)';e.currentTarget.style.background='rgba(9,160,157,.04)';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.06)';e.currentTarget.style.background='rgba(13,17,23,.6)';}}
            >
              <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(9,160,157,.2),transparent)'}}/>
              <div style={{width:'38px',height:'38px',borderRadius:'10px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'14px'}}>
                {c.icon}
              </div>
              <h3 style={{fontSize:'15px',fontWeight:600,color:'#E8F2F5',marginBottom:'6px'}}>{c.title}</h3>
              <p style={{fontSize:'13.5px',color:'#7FA0AC',lineHeight:1.6}}>{c.desc}</p>
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
    {
      name:'QuickBooks', bg:'rgba(44,160,28,.12)', desc:'Accounting',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#2ca01c" opacity=".2"/>
        <path d="M10 8h4a2 2 0 0 1 0 4H10V8z" fill="#2ca01c"/>
        <path d="M10 12h4a2 2 0 0 1 0 4H10v-4z" fill="#2ca01c" opacity=".7"/>
        <line x1="12" y1="6" x2="12" y2="7.5" stroke="#2ca01c" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="12" y1="16.5" x2="12" y2="18" stroke="#2ca01c" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>,
    },
    {
      name:'Xero', bg:'rgba(19,181,234,.12)', desc:'Accounting',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#13b5ea" opacity=".2"/>
        <line x1="8" y1="8" x2="16" y2="16" stroke="#13b5ea" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="16" y1="8" x2="8" y2="16" stroke="#13b5ea" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>,
    },
    {
      name:'Stripe', bg:'rgba(99,91,255,.12)', desc:'Billing & revenue',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" fill="#635bff"/>
      </svg>,
    },
    {
      name:'Chargebee', bg:'rgba(249,171,0,.12)', desc:'Subscription mgmt',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#f9ab00" opacity=".18"/>
        <path d="M15.5 8.5A5 5 0 1 0 15.5 15.5" stroke="#f9ab00" strokeWidth="2" strokeLinecap="round"/>
      </svg>,
    },
    {
      name:'Gusto', bg:'rgba(244,93,72,.12)', desc:'Payroll',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.5" fill="#f45d48" opacity=".9"/>
        <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#f45d48" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <circle cx="12" cy="20" r="1.5" fill="#f45d48" opacity=".5"/>
      </svg>,
    },
    {
      name:'Rippling', bg:'rgba(255,107,0,.12)', desc:'HR & payroll',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 8 Q12 5 20 8" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M4 12 Q12 9 20 12" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M4 16 Q12 13 20 16" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>,
    },
    {
      name:'Expensify', bg:'rgba(12,138,1,.12)', desc:'Expense mgmt',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#0c8a01" opacity=".18"/>
        <path d="M8 8h8v2H8z M8 11h6v2H8z M8 14h4v2H8z" fill="#0c8a01"/>
        <path d="M16 15l2 2" stroke="#0c8a01" strokeWidth="2" strokeLinecap="round"/>
      </svg>,
    },
    {
      name:'Ramp', bg:'rgba(0,212,168,.12)', desc:'Corporate cards',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="#00d4a8" strokeWidth="1.8" fill="none"/>
        <line x1="3" y1="11" x2="21" y2="11" stroke="#00d4a8" strokeWidth="1.8"/>
        <rect x="6" y="14" width="5" height="2" rx="0.5" fill="#00d4a8"/>
      </svg>,
    },
    {
      name:'PostgreSQL', bg:'rgba(51,103,145,.12)', desc:'Data warehouse',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#336791" strokeWidth="1.5" fill="#336791" fillOpacity=".15"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#336791" strokeWidth="1.5" fill="none"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="#336791" strokeWidth="1.2" fill="none"/>
        <circle cx="18" cy="8" r="2.5" fill="#336791" fillOpacity=".6" stroke="#336791" strokeWidth="1"/>
      </svg>,
    },
    {
      name:'BigQuery', bg:'rgba(66,133,244,.12)', desc:'Cloud analytics',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285f4"/>
        <path d="M2 17l10 5 10-5" stroke="#34a853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M2 12l10 5 10-5" stroke="#fbbc04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>,
    },
    {
      name:'Snowflake', bg:'rgba(41,181,232,.12)', desc:'Data platform',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="2" x2="12" y2="22" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <line x1="2" y1="7" x2="22" y2="17" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="7" x2="2" y2="17" stroke="#29b5e8" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="2" r="1.5" fill="#29b5e8"/>
        <circle cx="12" cy="22" r="1.5" fill="#29b5e8"/>
        <circle cx="2" cy="7" r="1.5" fill="#29b5e8"/>
        <circle cx="22" cy="17" r="1.5" fill="#29b5e8"/>
        <circle cx="22" cy="7" r="1.5" fill="#29b5e8"/>
        <circle cx="2" cy="17" r="1.5" fill="#29b5e8"/>
        <circle cx="12" cy="12" r="2.5" fill="#29b5e8"/>
      </svg>,
    },
    {
      name:'Google Sheets', bg:'rgba(15,157,88,.12)', desc:'Spreadsheet data',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="2" width="13" height="16" rx="1.5" fill="#0f9d58" opacity=".2" stroke="#0f9d58" strokeWidth="1.5"/>
        <path d="M16 2l5 5v15a1 1 0 0 1-1 1H5" stroke="#0f9d58" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <line x1="3" y1="10" x2="16" y2="10" stroke="#0f9d58" strokeWidth="1.2"/>
        <line x1="3" y1="14" x2="16" y2="14" stroke="#0f9d58" strokeWidth="1.2"/>
        <line x1="9" y1="6" x2="9" y2="18" stroke="#0f9d58" strokeWidth="1.2"/>
      </svg>,
    },
    {
      name:'HubSpot', bg:'rgba(255,122,89,.12)', desc:'CRM revenue data',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="#ff7a59"/>
        <line x1="12" y1="3.5" x2="12" y2="9" stroke="#ff7a59" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="12" y1="15" x2="12" y2="20.5" stroke="#ff7a59" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="3.5" y1="12" x2="9" y2="12" stroke="#ff7a59" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="15" y1="12" x2="20.5" y2="12" stroke="#ff7a59" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="12" cy="3.5" r="1.8" fill="#ff7a59"/>
        <circle cx="12" cy="20.5" r="1.8" fill="#ff7a59"/>
        <circle cx="3.5" cy="12" r="1.8" fill="#ff7a59"/>
        <circle cx="20.5" cy="12" r="1.8" fill="#ff7a59"/>
      </svg>,
    },
    {
      name:'Salesforce', bg:'rgba(0,161,224,.12)', desc:'CRM & accounts',
      icon: <svg width="22" height="16" viewBox="0 0 66 46" fill="none">
        <path d="M27.5 5.8a13.2 13.2 0 0 1 9.7-4.3c5 0 9.4 2.8 11.7 6.9a14.6 14.6 0 0 1 6.7-1.6C62.7 6.8 69 13.1 69 21s-6.3 14.2-14.4 14.2H15C7.7 35.2 1.8 29.3 1.8 22c0-6.5 4.7-11.9 10.9-13.3a13.2 13.2 0 0 1 14.8-2.9z" fill="#00a1e0"/>
      </svg>,
    },
    {
      name:'dbt', bg:'rgba(255,105,74,.12)', desc:'Data transforms',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 L22 19 L2 19 Z" fill="#ff694a" opacity=".2" stroke="#ff694a" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="12" cy="14" r="3" fill="#ff694a"/>
        <line x1="12" y1="2" x2="12" y2="11" stroke="#ff694a" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>,
    },
    {
      name:'Notion', bg:'rgba(232,242,245,.06)', desc:'Reports & docs',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="#E8F2F5" strokeWidth="1.5" opacity=".5" fill="none"/>
        <line x1="7" y1="8" x2="17" y2="8" stroke="#E8F2F5" strokeWidth="1.2" opacity=".5"/>
        <line x1="7" y1="11" x2="17" y2="11" stroke="#E8F2F5" strokeWidth="1.2" opacity=".5"/>
        <line x1="7" y1="14" x2="13" y2="14" stroke="#E8F2F5" strokeWidth="1.2" opacity=".5"/>
        <line x1="7" y1="17" x2="11" y2="17" stroke="#E8F2F5" strokeWidth="1.2" opacity=".5"/>
      </svg>,
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,#0D1117 0%,#101620 100%)'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'14px'}}>
            <span style={{color:'#09A09D',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'#09A09D',fontFamily:'Geist Mono,monospace'}}>Your Finance Stack</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:500,color:'#fff',letterSpacing:'-.03em',marginBottom:'12px'}}>
            Works with every accounting, payroll, and billing tool
          </h2>
          <p style={{fontSize:'16px',color:'rgba(255,255,255,.7)',maxWidth:'460px',margin:'0 auto',lineHeight:1.65}}>
            Insightis integrates with your accounting, billing, payroll, and warehouse stack.
          </p>
        </div>

        <div data-connectors-grid style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'10px',marginBottom:'32px'}}>
          {connectors.map((c,i) => (
            <div key={i} className="connector-card">
              <div className="connector-icon" style={{background:c.bg, display:'flex', alignItems:'center', justifyContent:'center'}}>
                {c.icon}
              </div>
              <div>
                <div style={{fontSize:'13px',fontWeight:500,color:'#E8F2F5'}}>{c.name}</div>
                <div style={{fontSize:'11px',color:'#8AA6B3',marginTop:'2px'}}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center'}}>
          <a href="#" style={{
            display:'inline-flex',alignItems:'center',gap:'6px',
            fontSize:'13px',color:'#7FA0AC',
            textDecoration:'none',
            border:'1px solid rgba(255,255,255,.07)',
            borderRadius:'999px',
            padding:'8px 20px',
            background:'rgba(255,255,255,.02)',
            transition:'all .15s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.color='#0EC4C1';e.currentTarget.style.borderColor='rgba(9,160,157,.3)';}}
          onMouseLeave={e=>{e.currentTarget.style.color='#7FA0AC';e.currentTarget.style.borderColor='rgba(255,255,255,.07)';}}
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
  const [open, setOpen] = useState(0);
  const items = [
    {
      q:'Does Insightis replace QuickBooks or Xero, or sit on top?',
      a:'It sits on top. Insightis reads your accounting, payroll, billing, and warehouse data in place — no shadow ledger, no parallel chart of accounts. QuickBooks or Xero stays your system of record, owned by Finance.',
    },
    {
      q:'What happens when teams have conflicting metric definitions?',
      a:'Definitions are resolved at the unified cost model, not in the spreadsheet. Each metric — burn rate, gross margin, fully-loaded headcount cost — has one certified version, an owner, and a version history. When someone asks for "burn" in chat, Insightis answers using the governed definition and links to the source.',
    },
    {
      q:'How does it handle late-arriving journals and month-end close adjustments?',
      a:'Insightis re-reads your ledger continuously, so accruals, reclasses, and late-arriving journals flow through automatically. Numbers update as your close progresses — no manual refresh, no stale reports sitting in Drive.',
    },
    {
      q:'Will this coexist with our existing FP&A or BI tool (Mosaic, Cube, Looker)?',
      a:'Yes. Most teams keep their FP&A or BI tool for the curated board and forecast deck, and use Insightis for the long-tail finance questions that would otherwise become a Slack thread or another spreadsheet. Both can read the same unified cost model.',
    },
    {
      q:'How long does implementation take?',
      a:'Most finance teams are answering real questions within a week — connect QuickBooks or Xero plus your payroll and billing tools, register your top 10–20 metrics in the cost model, and start asking. Broader rollout to ops and department leads typically follows in the second or third week.',
    },
    {
      q:'How is security and access handled?',
      a:'Insightis respects the permissions in your source systems and warehouse — every query runs as the connected role, so role-level and column-level security stays in force. No financial data is moved out of your warehouse, and full audit trails are preserved.',
    },
  ];

  return (
    <section style={{padding:'100px 0',background:'linear-gradient(180deg,#0D1117 0%,#0A0E13 100%)'}}>
      <div style={{maxWidth:'820px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'rgba(9,160,157,.08)',border:'1px solid rgba(9,160,157,.2)',borderRadius:'999px',marginBottom:'14px'}}>
            <span style={{color:'#09A09D',fontSize:'12px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'#09A09D',fontFamily:'Geist Mono,monospace'}}>FAQ</span>
          </div>
          <h2 style={{fontSize:'clamp(28px,4vw,44px)',fontWeight:500,color:'#fff',letterSpacing:'-.03em',marginBottom:'12px'}}>
            Questions ops &amp; finance teams ask
          </h2>
        </div>

        <div>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="faq-row">
                <button className={`faq-q${isOpen ? ' open' : ''}`} onClick={()=>setOpen(isOpen ? -1 : i)}>
                  {it.q}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div className={`faq-a${isOpen ? ' open' : ''}`}>
                  {it.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTA() {
  return (
    <section style={{paddingTop:'32px',paddingBottom:'64px',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{
          position:'relative',borderRadius:'16px',
          border:'1px solid rgba(30,30,48,1)',
          padding:'32px 48px',overflow:'hidden',
          display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:'24px',
          flexWrap:'wrap',
          background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)',
        }}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>
          <h3 style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:500,color:'#fff',letterSpacing:'-.03em',lineHeight:1.2,flexShrink:0}}>
            Stop reconciling <span style={{color:'#07807E'}}>spreadsheets.</span> Start controlling <span style={{color:'#07807E'}}> costs.</span>
          </h3>
          <div style={{
            display:'flex',alignItems:'center',
            width:'100%',maxWidth:'420px',
            background:'#0D0D1A',border:'1px solid rgba(46,46,64,1)',
            borderRadius:'12px',overflow:'hidden',
            flex:'1 1 340px',
          }}>
            <input
              type="text"
              placeholder="What cost or finance question can Insightis answer for your team?"
              style={{
                flex:1,background:'transparent',fontSize:'14px',color:'#fff',
                padding:'12px 16px',outline:'none',border:'none',
                fontFamily:'Geist,sans-serif',minWidth:0,
              }}
            />
            <button style={{
              display:'inline-flex',alignItems:'center',gap:'8px',
              padding:'10px 20px',margin:'4px',
              fontSize:'13px',fontWeight:600,color:'#fff',
              background:'linear-gradient(135deg,#07807E,#09A09D)',
              borderRadius:'8px',border:'none',cursor:'pointer',
              whiteSpace:'nowrap',flexShrink:0,
              fontFamily:'Geist,sans-serif',
            }}>
              Get Started
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
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
      <Header />
      <main>
      <Hero />
      <FeatureSpotlights />
      <UseCases />
      <RelevantIntegrations />
      <FAQ />
      <BottomCTA />
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
