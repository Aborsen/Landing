import React from 'react';
import Button from './Button';
import SectionHeader from './SectionHeader';
import ArrowRightIcon from './ArrowRightIcon';


/**
 * UseCases — the "What <role> teams use Insightis for" section: a full-width
 * promo banner, a SectionHeader, then a 3×2 grid of icon cards.
 *
 * Extracted from six byte-identical copies in src/pages/*-teams.jsx. The promo
 * banner is part of this shell rather than a separate component because it never
 * appears without the grid; the six pages differ only in copy, the two glow
 * recipes, and the six card icons.
 *
 * Why the icons are passed in rather than owned here: each page picks its own
 * six inline SVGs and none repeats across pages, so an icon set living here
 * would be six disjoint sets in one file. They arrive as `cases[].icon` nodes.
 *
 * Props
 *  cases           array — REQUIRED. One card each, in order:
 *                  { icon: ReactNode, title: string, desc: string }
 *  background      string — REQUIRED. The section's `background` CSS. Two glow
 *                  recipes are in the wild (a tight 38%/0.20 ellipse on four
 *                  pages, a wider 60%/0.38 one on product- and analytics-teams);
 *                  it is a prop so the extraction cannot silently normalise one
 *                  page's glow into the other's.
 *  promoTitle      ReactNode — REQUIRED. Banner heading. Wrap the tinted phrase
 *                  in <UseCases.Highlight> — e.g.
 *                  <>See it on <UseCases.Highlight>your own ledger</UseCases.Highlight></>
 *  promoDesc       string — REQUIRED. Banner supporting sentence.
 *  title           string — REQUIRED. SectionHeader heading.
 *  eyebrow         string — SectionHeader eyebrow (default: 'Use cases', which is
 *                  what all six pages use).
 *  ctaLabel        string — banner button label (default: 'Start for free')
 *  ctaHref         string — banner button href (default: '/auth/sign-up/')
 *
 * Example:
 *   <UseCases
 *     cases={cases}
 *     background="var(--ins-glow-section)"
 *     promoTitle={<>See it on <UseCases.Highlight>your own campaigns</UseCases.Highlight></>}
 *     promoDesc="Connect Google Ads and ask Insightis the campaign question that always takes too long."
 *     title="What marketing teams use Insightis for"
 *   />
 */
function UseCases({
  cases,
  /* The site-wide section wash. Kept a prop so a page can opt out, but no page
     should need its own recipe — that is how ten of them accumulated. */
  background = 'var(--ins-glow-section)',
  promoTitle,
  promoDesc,
  title,
  eyebrow = 'Use cases',
  ctaLabel = 'Start for free',
  ctaHref = '/auth/sign-up/',
}) {
  return (
    <section style={{padding:'100px 0',background}}>
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
                {promoTitle}
              </h3>
              <p className="ins-text-body">
                {promoDesc}
              </p>
            </div>
            <Button as="a" href={ctaHref} variant="primary" size="lg" iconEnd={<ArrowRightIcon />}>
              {ctaLabel}
            </Button>
          </div>
        </div>
        <div style={{marginBottom:'var(--ins-size-14)'}}>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
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

/**
 * Highlight — the teal phrase inside the promo heading. Deliberately style-only
 * with no class of its own: the six pages shipped a bare
 * <span style={{color:'var(--ins-button-primary-bg)'}}>, and adding a className
 * here would change the rendered markup on all of them.
 */
function Highlight({ children }) {
  return <span style={{color:'var(--ins-button-primary-bg)'}}>{children}</span>;
}

UseCases.Highlight = Highlight;

export default UseCases;
export { Highlight };
