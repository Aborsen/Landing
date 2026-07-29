import React, { useState, useRef } from 'react';
import { SOLUTIONS, SOLUTIONS_HEADING, SOLUTIONS_LEDE } from '../data/solutions';

/**
 * SolutionsAccordion — "who is this for": a row of photo panels, one expanded at a
 * time. Click a collapsed panel to open it; the previous one collapses to a title
 * strip. Modelled on the devart.com home-page section.
 *
 * ARIA: this is a single-select DISCLOSURE set, not tabs. Each panel is a
 * <button aria-expanded> header plus an aria-labelledby'd role="region". Tabs would
 * be wrong twice over — role="tab" must not contain interactive descendants (our open
 * panel holds a real <a>), and tabs mandate a roving tabindex, which would make five
 * of the six panels unreachable by Tab.
 *
 * Every region stays in the DOM with the `hidden` attribute rather than being
 * conditionally rendered. That keeps aria-controls a valid reference, keeps collapsed
 * links out of the tab order and the a11y tree, and — the reason that matters here —
 * keeps all six hrefs in the prerendered HTML for crawlers. The cost is that the
 * content cannot cross-fade (`hidden` is display:none, which no transition can cross);
 * the panel's width animation carries the motion instead.
 *
 * The open header is aria-disabled — focusable but a no-op — because one panel must
 * always be open, so "collapse everything" is not a reachable state.
 *
 * Below lg (1024px) the accordion is replaced by a plain stacked list of links: no
 * widget, every title and description visible. Same desktop/mobile idiom as the
 * Architecture section in src/main.jsx (hidden lg:flex / lg:hidden).
 *
 * Two panels have no photo yet. Devart's accordion library is exactly four images and
 * they depict technical roles, so Revenue / Product / Analytics / Finance are covered
 * and Executive / Marketing fall back to a brand-tinted gradient. Dropping a
 * 610×520 WebP into public/assets/solutions/ and setting `image` in
 * src/data/solutions.js is the whole fix.
 *
 * Props
 *  items     array from src/data/solutions.js   (default: SOLUTIONS)
 *  eyebrow   small uppercase label              (default: 'Solutions')
 *  title     h2 text                            (default: SOLUTIONS_HEADING)
 *  lede      paragraph under the heading        (default: SOLUTIONS_LEDE)
 *  headingId id for the h2, wired to the section's aria-labelledby
 *  ctaHref / ctaLabel  optional bottom-right button
 *
 * All other props pass through to the <section>.
 */
function SolutionsAccordion({
  items = SOLUTIONS,
  eyebrow = 'Solutions',
  title = SOLUTIONS_HEADING,
  lede = SOLUTIONS_LEDE,
  headingId = 'solutions-heading',
  ctaHref,
  ctaLabel,
  className = '',
  ...rest
}) {
  const [active, setActive] = useState(0);
  const triggers = useRef([]);

  // Arrow keys move focus only — they never open a panel. Activation stays on
  // Enter/Space, which the native <button> already handles, so there is no key
  // handling for those here.
  const onKeyDown = (i) => (e) => {
    const last = items.length - 1;
    let next = null;
    if (e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
    else if (e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    triggers.current[next]?.focus();
  };

  return (
    <section className={`py-24 relative ${className}`} aria-labelledby={headingId} {...rest}>
      <div className="max-w-7xl mx-auto px-6">
        {/* centered, matching every other section header on the home page */}
        <div className="flex flex-col items-center gap-4 text-center mb-9">
          <span className="ins-eyebrow ins-eyebrow--pill">{eyebrow}</span>
          <h2 id={headingId} className="text-3xl md:text-4xl lg:text-5xl font-medium text-[var(--ins-text-heading)] tracking-tight">
            {title}
          </h2>
          {lede && <p className="ins-text-body-lg max-w-2xl mx-auto">{lede}</p>}
        </div>

        {/* Desktop — the accordion */}
        <div className="ins-solacc hidden lg:flex">
          {items.map((item, i) => {
            const open = i === active;
            const hdId = `solacc-hd-${item.id}`;
            const rgId = `solacc-rg-${item.id}`;
            // The accordion shows the bare role everywhere — "Executive", never "For
            // Executive Teams". Collapsed strips are 104-116px, so one word is what holds
            // a line; and the open panel drops the framing too (owner call, 2026-07-29):
            // it repeats on all six panels, and the link line below already reads
            // "Solutions for executive teams". Derived here rather than in the data so
            // the full title stays the single string the mobile cards keep using.
            const label = item.title.replace(/^For /, '').replace(/ Teams$/, '');
            return (
              <div key={item.id} className="ins-solacc__panel" data-open={open || undefined}>
                {item.image ? (
                  /* alt="" — the panel's heading is already the accessible name, so a
                     description here would just be read twice. */
                  <img
                    className="ins-solacc__img"
                    src={item.image}
                    alt=""
                    width="610"
                    height="520"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="ins-solacc__img ins-solacc__img--placeholder" aria-hidden="true" />
                )}
                <div className="ins-solacc__scrim" aria-hidden="true" />
                <div className="ins-solacc__body">
                  <h3 className="ins-solacc__hd">
                    <button
                      type="button"
                      id={hdId}
                      className="ins-solacc__trigger"
                      aria-expanded={open}
                      aria-controls={rgId}
                      aria-disabled={open || undefined}
                      onClick={() => !open && setActive(i)}
                      onKeyDown={onKeyDown(i)}
                      ref={(el) => { triggers.current[i] = el; }}
                    >
                      {/* the label is a separate span so the collapsed rule can restyle the
                          title without touching the button: a transform on the button would
                          make it the containing block for its own ::after — which is what
                          stretches the hit area over the whole panel */}
                      <span className="ins-solacc__label">{label}</span>
                    </button>
                  </h3>
                  <div className="ins-solacc__region" id={rgId} role="region" aria-labelledby={hdId} hidden={!open}>
                    <p className="ins-solacc__desc">{item.desc}</p>
                    <a className="ins-solacc__link" href={item.href}>
                      Solutions for {item.short}
                      <svg className="ins-solacc__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / tablet — no widget, everything visible, whole card is the link */}
        <div className="lg:hidden flex flex-col gap-4">
          {items.map((item) => (
            <a key={item.id} href={item.href} className="ins-solacc-card">
              {item.image ? (
                <img className="ins-solacc-card__img" src={item.image} alt="" width="610" height="520" loading="lazy" decoding="async" />
              ) : (
                <div className="ins-solacc-card__img ins-solacc__img--placeholder" aria-hidden="true" />
              )}
              <div className="ins-solacc-card__body">
                <h3 className="ins-solacc-card__title">{item.title}</h3>
                <p className="ins-solacc__desc">{item.desc}</p>
                <span className="ins-solacc__link" aria-hidden="true">
                  Solutions for {item.short}
                  <svg className="ins-solacc__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {ctaHref && ctaLabel && (
          <div className="ins-solacc__cta">
            <a href={ctaHref} className="ins-btn ins-btn--secondary ins-btn--lg">{ctaLabel}</a>
          </div>
        )}
      </div>
    </section>
  );
}

export default SolutionsAccordion;
