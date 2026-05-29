import React from 'react';
import Card from './Card';
import CheckIcon from './CheckIcon';
import XIcon from './XIcon';

/**
 * ComparisonCards — DS-compliant 2-column before/after comparison.
 *
 * Single source of truth for the "Before/Traditional vs With Insightis" glow
 * cards used on the homepage AND every Solutions page. Renders the canonical
 * glow-card recipe (.ins-card--glow--error / --brand) with an icon-badge
 * header and a ✕/✓ checklist body — so updating this one component (or the
 * shared .ins-card--glow--* classes / XIcon / CheckIcon) updates them all.
 *
 * Text-preservation principle: pass each page's own copy verbatim.
 *
 * Props
 *  before    { label, subtitle?, items[] } — REQUIRED. Red glow card, ✕ marks.
 *  after     { label, subtitle?, items[] } — REQUIRED. Teal glow card, ✓ marks.
 *  className string — extra classes on the outer .ins-compare grid.
 *
 * `subtitle` is optional (the homepage uses it; Solutions pages omit it).
 *
 * Example:
 *   <ComparisonCards
 *     before={{ label: 'Before Insightis', items: ['Pipeline reports take 2–3 days', …] }}
 *     after={{  label: 'With Insightis',   items: ['Pipeline data available in seconds', …] }}
 *   />
 */
function ComparisonCards({ before, after, className = '', ...rest }) {
  const classes = ['ins-compare', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <Panel kind="before" label={before?.label} subtitle={before?.subtitle} items={before?.items || []} />
      <Panel kind="after"  label={after?.label}  subtitle={after?.subtitle}  items={after?.items  || []} />
    </div>
  );
}

function Panel({ kind, label, subtitle, items }) {
  const isBefore = kind === 'before';
  const Icon = isBefore ? XIcon : CheckIcon;
  const iconColor = isBefore ? 'var(--ins-status-error-fg)' : 'var(--ins-color-teal-400)';
  const badgeStyle = isBefore
    ? { background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)' }
    : { background: 'rgba(14,196,193,0.15)', border: '1px solid rgba(14,196,193,0.30)' };

  return (
    <Card variant="glow" className={`ins-card--glow--${isBefore ? 'error' : 'brand'} p-6 md:p-7`}>
      <div className="flex items-center gap-3 mb-7">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={badgeStyle}>
          <Icon size={18} color={iconColor} />
        </div>
        <div>
          <h3 className="text-base font-medium" style={{ color: 'var(--ins-text-heading)' }}>{label}</h3>
          {subtitle && <p className="text-xs text-[var(--ins-text-body)]">{subtitle}</p>}
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-[var(--ins-text-heading)]">
            <Icon size={14} color={iconColor} className="flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default ComparisonCards;
