import React, { useId } from 'react';

/**
 * Input — DS-compliant text input / textarea. Composes `.ins-input` / `.ins-textarea`.
 *
 * Always renders a <label>. Pass `hideLabel` to visually hide it (still readable
 * by assistive tech) — fulfills ISS-23 (every input must have an associated label).
 *
 * Props
 *  label         string — required, used for accessibility even when hidden
 *  hideLabel     boolean — visually hide label, keep it for screen readers
 *  multiline     boolean — renders <textarea>
 *  size          'sm' | 'md' | 'lg'                       (default: 'md')
 *  error         boolean — error state (red border + ring)
 *  iconLeading   React node — icon inside left edge
 *  iconTrailing  React node — icon inside right edge
 *  id            string — auto-generated if not passed
 *
 * All other props pass through (placeholder, value, onChange, onKeyDown, etc.).
 */
function Input({
  label,
  hideLabel = false,
  multiline = false,
  size = 'md',
  error = false,
  iconLeading,
  iconTrailing,
  id,
  className = '',
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const baseClass = multiline ? 'ins-textarea' : 'ins-input';

  const inputClasses = [
    baseClass,
    size !== 'md' ? `${baseClass}--${size}` : '',
    iconLeading && !multiline ? `${baseClass}--with-leading` : '',
    iconTrailing && !multiline ? `${baseClass}--with-trailing` : '',
    error ? 'is-error' : '',
    className,
  ].filter(Boolean).join(' ');

  const Field = multiline
    ? <textarea id={inputId} className={inputClasses} {...rest} />
    : <input id={inputId} className={inputClasses} {...rest} />;

  const labelEl = (
    <label
      htmlFor={inputId}
      className={hideLabel ? 'ins-u-sr-only' : 'ins-text-label-sm'}
      style={hideLabel ? undefined : { display: 'block', marginBottom: '6px' }}
    >
      {label}
    </label>
  );

  // Wrap with icon positioning if leading/trailing icons present (non-multiline only)
  if ((iconLeading || iconTrailing) && !multiline) {
    return (
      <>
        {labelEl}
        <span className="ins-input-wrap">
          {iconLeading && (
            <span className="ins-input-wrap__icon ins-input-wrap__icon--leading" aria-hidden="true">
              {iconLeading}
            </span>
          )}
          {Field}
          {iconTrailing && (
            <span className="ins-input-wrap__icon ins-input-wrap__icon--trailing" aria-hidden="true">
              {iconTrailing}
            </span>
          )}
        </span>
      </>
    );
  }

  return (
    <>
      {labelEl}
      {Field}
    </>
  );
}

export default Input;
