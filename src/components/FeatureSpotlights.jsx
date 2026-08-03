import React from 'react';
import SectionHeader from './SectionHeader';
import CheckIcon from './CheckIcon';

/**
 * FeatureSpotlights — the alternating text/visual "How it works" section that
 * every Solutions page runs below its hero.
 *
 * Extracted from six byte-identical copies in src/pages/*-teams.jsx. The shell
 * (section, container, SectionHeader slot, and the alternating two-column rows)
 * is the same on all six; only the copy and the four mockups differ, so the
 * mockups arrive as elements inside `spots[].visual`.
 *
 * Why the mockups are passed in rather than owned here: SpotlightChat,
 * SpotlightSemantic and SpotlightAnomalies are per-page illustrations with
 * page-specific data and no shared shell worth extracting. Pulling them in
 * would drag six pages' worth of fake data into the component library for no
 * dedup win, so this component only ever receives them as rendered nodes.
 *
 * Props
 *  spots       array — REQUIRED. One entry per row, rendered in order, with
 *              the visual alternating left/right (odd indexes reverse):
 *                { eyebrow, title, body, bullets: string[], visual: ReactNode }
 *  background  string — REQUIRED. The section's `background` CSS. Two glow
 *              recipes are in the wild (a tight 38%/0.20 ellipse on four pages,
 *              a wider 60%/0.38 one on product- and analytics-teams). It is a
 *              prop rather than a canonical constant because the extraction must
 *              not silently normalise one page's glow into the other's — pick a
 *              winner in a deliberate visual change, not in a refactor.
 *  title       string — REQUIRED. SectionHeader heading.
 *  lede        string — REQUIRED. SectionHeader supporting paragraph.
 *  eyebrow     string — SectionHeader eyebrow (default: 'How it works', which is
 *              what all six pages use; override for a page that needs its own).
 *  id          string — section anchor id (default: 'spotlights' — in-page nav
 *              on the Solutions pages links to #spotlights).
 *
 * Example:
 *   <FeatureSpotlights
 *     spots={spots}
 *     background="var(--ins-glow-section)"
 *     title="Built for the way marketing teams actually work"
 *     lede="Four capabilities that turn marketing data into answers you can act on today."
 *   />
 */
function FeatureSpotlights({
  spots,
  /* Tall by default: this section stacks one full-width row per spotlight and
     runs past 2000px, where the standard ellipse scales up into a wash over the
     whole viewport instead of a glow behind the heading. */
  background = 'var(--ins-glow-section)',
  title,
  lede,
  eyebrow = 'How it works',
  id = 'spotlights',
}) {
  return (
    <section id={id} style={{padding:'80px 0 100px',background}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'72px'}}>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            lede={lede}
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

export default FeatureSpotlights;
