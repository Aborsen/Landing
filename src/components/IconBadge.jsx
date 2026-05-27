import React from 'react';

/**
 * IconBadge — circular tinted icon container. Composes .ins-icon-badge classes.
 *
 * Used by:
 *  - PainPointGrid (red ✕ cards)
 *  - ComparisonCards (red ✕ / teal ✓ checklists)
 *  - StepsProcess (teal numbered circles, size="xl")
 *  - Feature cards (teal icon cards)
 *  - Hero stat tiles
 *
 * Props
 *  tone     'teal' | 'red' | 'amber' | 'green' | 'purple' | 'neutral'  (default: 'neutral')
 *  size     'sm' | 'md' | 'lg' | 'xl'                                  (default: 'md')
 *  icon     React node — SVG or text (e.g. "01" for numbered step circles)
 *  as       'span' | 'div'                                              (default: 'span')
 *
 * If `aria-label` is not provided, the badge is treated as decorative (aria-hidden=true).
 * All other props pass through.
 */
function IconBadge({
  tone = 'neutral',
  size = 'md',
  icon,
  as: Component = 'span',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'ins-icon-badge',
    size !== 'md' ? `ins-icon-badge--${size}` : '',
    tone !== 'neutral' ? `ins-icon-badge--${tone}` : '',
    className,
  ].filter(Boolean).join(' ');

  const a11yProps = rest['aria-label'] || rest['aria-labelledby']
    ? {}
    : { 'aria-hidden': 'true' };

  return (
    <Component className={classes} {...a11yProps} {...rest}>
      {icon || children}
    </Component>
  );
}

export default IconBadge;
