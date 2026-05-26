import React from 'react';

/**
 * Card — DS-compliant container. Composes `.ins-card` classes.
 *
 * Props
 *  variant      'default' | 'feature' | 'pricing' | 'accent' | 'glow' | 'metric' | 'connector'
 *               (default: 'default' — bare .ins-card)
 *  interactive  boolean — adds .ins-card--interactive (cursor pointer, focus ring)
 *  selected     boolean — adds .ins-card--selected (brand border + tint)
 *  as           tag name (default: 'div')
 *
 * All other props pass through.
 */
function Card({
  variant = 'default',
  interactive = false,
  selected = false,
  as: Component = 'div',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'ins-card',
    variant !== 'default' ? `ins-card--${variant}` : '',
    interactive ? 'ins-card--interactive' : '',
    selected ? 'ins-card--selected' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

export default Card;
