import React from 'react';

/**
 * Chip / Badge — DS-compliant. Composes `.ins-badge` classes.
 *
 * Used for status badges ("Live", "Coming Soon"), interactive filter chips,
 * and decorative tags. For brand-colored "Coming Soon" use variant="brand".
 *
 * Props
 *  variant   'success' | 'warning' | 'error' | 'info' | 'planned' | 'shipped'
 *            | 'brand' | 'count' | 'trend' | 'neutral'                  (default: 'neutral')
 *  dot       boolean — prefix with a status dot
 *  dotPulse  boolean — animate the dot
 *  onRemove  function — show a remove (×) button at the end
 *  as        tag name (default: 'span')
 *
 * Interactive chips (clickable filter) should use as="button" plus onClick.
 */
function Chip({
  variant = 'neutral',
  dot = false,
  dotPulse = false,
  onRemove,
  as: Component = 'span',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'ins-badge',
    variant !== 'neutral' ? `ins-badge--${variant}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...rest}>
      {dot && (
        <span
          className={`ins-badge__dot${dotPulse ? ' ins-badge__dot--pulse' : ''}`}
          aria-hidden="true"
        />
      )}
      {children}
      {onRemove && (
        <button
          type="button"
          className="ins-badge__remove"
          aria-label="Remove"
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </Component>
  );
}

export default Chip;
