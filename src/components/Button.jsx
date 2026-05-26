import React from 'react';

/**
 * Button — DS-compliant. Composes `.ins-btn` classes from the design system.
 *
 * Props
 *  variant   'primary' | 'secondary' | 'ghost' | 'icon' | 'link'  (default: 'primary')
 *  size      'sm' | 'md' | 'lg'                                   (default: 'md')
 *  as        'button' | 'a'                                        (default: 'button')
 *  radius    'sm' | 'md' | 'lg' | 'pill'                           (default: 'pill' — class default)
 *  loading   boolean — replaces label with spinner, preserves width
 *  iconStart React node — slotted before label
 *  iconEnd   React node — slotted after label
 *  disabled  boolean — also reflected via aria-disabled
 *
 * All other props pass through (href, onClick, type, aria-*, etc).
 */
function Button({
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  radius,
  loading = false,
  iconStart,
  iconEnd,
  disabled,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'ins-btn',
    `ins-btn--${variant}`,
    `ins-btn--${size}`,
    radius ? `ins-btn--radius-${radius}` : '',
    loading ? 'is-loading' : '',
    className,
  ].filter(Boolean).join(' ');

  // For <a> tags, semantic-disable via aria-disabled (anchors don't honor `disabled`)
  const extraProps = Component === 'a' && disabled
    ? { 'aria-disabled': 'true', tabIndex: -1, onClick: (e) => e.preventDefault() }
    : Component === 'button'
      ? { disabled, type: rest.type || 'button' }
      : {};

  return (
    <Component className={classes} {...extraProps} {...rest}>
      {iconStart && <span className="ins-btn__icon ins-btn__icon--leading" aria-hidden="true">{iconStart}</span>}
      {children}
      {iconEnd && <span className="ins-btn__icon ins-btn__icon--trailing" aria-hidden="true">{iconEnd}</span>}
    </Component>
  );
}

export default Button;
