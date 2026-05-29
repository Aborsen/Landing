import React from 'react';
import XIcon from './XIcon';

/**
 * PainPointGrid — DS-compliant 2×3 grid of pain cards.
 *
 * Each card composes <IconBadge tone="red" icon={<XIcon/>}/> + title + body.
 * The grid is responsive: 3 cols on desktop, 2 on tablet, 1 on mobile.
 *
 * Text-preservation principle: each call site supplies its own page-specific
 * `items` array — every pain title and body comes from the page. The component
 * is a STYLING shell, not a copy source.
 *
 * Props
 *  items     [{ title: string, body: string }] — REQUIRED. 6 items is canonical.
 *  className string — extra classes on outer .ins-pain-grid
 *  id        string — id for the grid container
 *
 * All other props pass through to the outer container.
 *
 * Example:
 *   <PainPointGrid items={[
 *     { title: 'Pipeline visibility takes days', body: 'Pulling Salesforce...' },
 *     ...
 *   ]} />
 */
function PainPointGrid({
  items = [],
  className = '',
  ...rest
}) {
  const classes = ['ins-pain-grid', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {items.map((p, i) => (
        <div key={i} className="ins-pain-card">
          <div className="ins-pain-card__header">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)' }}>
              <XIcon size={18} color="var(--ins-status-error-fg)" />
            </span>
            <h3 className="ins-pain-card__title">{p.title}</h3>
          </div>
          <p className="ins-text-body ins-pain-card__body">{p.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PainPointGrid;
