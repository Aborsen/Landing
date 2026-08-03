import React from 'react';

/**
 * SpotlightStack — the "full lineage" mockup: a window pane with a headline KPI,
 * an audit-ready badge, a tree of source rows, and a sign-off footer.
 *
 * Extracted from five byte-identical copies (marketing-, revenue-, product-,
 * analytics- and finance-teams). executive-teams.jsx keeps its own local
 * SpotlightStack on purpose: it shares the name and nothing else — a different
 * visual with a different internal structure — so folding it in would mean a
 * second shell behind a variant flag for one call site.
 *
 * Every difference between the five copies was a string literal, so every one of
 * them is a prop. Nothing here supplies its own copy.
 *
 * Props
 *  chrome        ReactNode — REQUIRED. The window title bar, i.e. the page's
 *                <ChromeHeader label="audit · cac" />. Passed in rather than
 *                rendered here because ChromeHeader is still defined per page
 *                (six identical copies awaiting their own extraction) — taking a
 *                node keeps this component out of that decision.
 *  kpiValue      string — REQUIRED. Big mono figure, e.g. '$214'.
 *  kpiMeta       string — REQUIRED. Mono caption beside it, e.g. 'blended_cac · Q2 MTD'.
 *  ownerLine     string — REQUIRED. Uppercase provenance line under the KPI,
 *                e.g. 'Marketing Ops · v3.2 · 4 channels'.
 *  traceEyebrow  string — REQUIRED. Label above the rows, WITHOUT the ↳ glyph —
 *                e.g. 'trace to spend'. The glyph is shell decoration, and it is
 *                joined into one string rather than rendered as a sibling text
 *                node because two adjacent text children would make React insert
 *                a <!-- --> separator into the markup.
 *  traceCount    string — REQUIRED. Right-hand count, e.g. '4 channels'.
 *  trace         array — REQUIRED. The lineage rows, in order:
 *                { label, amt, src, detail, owner, ts }
 *  footerLabel   string — REQUIRED. Footer badge text, e.g. 'Audit trail'
 *                (finance-teams ships 'SOX-ready trail').
 *  signoff       string — REQUIRED. Footer right-hand text, e.g.
 *                'signed off by Marketing Ops · 06:42 UTC'.
 */
function SpotlightStack({
  chrome,
  kpiValue,
  kpiMeta,
  ownerLine,
  traceEyebrow,
  traceCount,
  trace,
  footerLabel,
  signoff,
}) {
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
      {chrome}
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
              <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-22)',fontWeight:500,color:'var(--ins-color-gray-100)',letterSpacing:'-.01em'}}>{kpiValue}</span>
              <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'var(--ins-font-size-11)',color:'var(--ins-text-body)'}}>{kpiMeta}</span>
            </div>
            <div style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-inactive)',letterSpacing:'.06em',textTransform:'uppercase',marginTop:'var(--ins-size-1)'}}>
              {ownerLine}
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
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'10px',color:'var(--ins-text-inactive)',letterSpacing:'.1em',textTransform:'uppercase'}}>{`↳ ${traceEyebrow}`}</span>
          <span style={{fontFamily:'var(--ins-font-family-mono)',fontSize:'9.5px',color:'var(--ins-text-body)'}}>{traceCount}</span>
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
            <span>{footerLabel}</span>
          </span>
          <span>{signoff}</span>
        </div>
      </div>
    </div>
  );
}

export default SpotlightStack;
