import React from 'react';

/**
 * ComparisonCards — DS-compliant 2-column before/after checklist grid.
 *
 * Each Solutions page has its own page-specific "Before Insightis" vs
 * "With Insightis" copy. This component renders the visual shell; every
 * label and every item string comes from the call site.
 *
 * Text-preservation principle: pass each page's items array verbatim.
 * The component does not supply any copy.
 *
 * Props
 *  before    { label: string, items: string[] } — REQUIRED. Red-tinted panel
 *            with ✕ marks. `label` is rendered next to the colored dot.
 *  after     { label: string, items: string[] } — REQUIRED. Teal-tinted panel
 *            with ✓ marks plus the top brand-glow line.
 *  className string — extra classes on outer .ins-compare grid
 *
 * Example:
 *   <ComparisonCards
 *     before={{
 *       label: 'Before Insightis',
 *       items: [
 *         'Pipeline reports take 2–3 days to build',
 *         'Revenue metrics differ between teams',
 *         ...
 *       ],
 *     }}
 *     after={{
 *       label: 'With Insightis',
 *       items: [
 *         'Pipeline data available in seconds',
 *         'One certified number for every metric',
 *         ...
 *       ],
 *     }}
 *   />
 */
function ComparisonCards({
  before,
  after,
  className = '',
  ...rest
}) {
  const classes = ['ins-compare', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <Panel kind="before" label={before?.label} items={before?.items || []} mark="✕" />
      <Panel kind="after"  label={after?.label}  items={after?.items  || []} mark="✓" />
    </div>
  );
}

function Panel({ kind, label, items, mark }) {
  return (
    <div className={`ins-compare__panel ins-compare__panel--${kind}`}>
      <div className="ins-compare__header">
        <span className="ins-compare__dot" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <ul className="ins-compare__list">
        {items.map((text, i) => (
          <li key={i} className="ins-compare__item">
            <span className="ins-compare__mark" aria-hidden="true">{mark}</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ComparisonCards;
