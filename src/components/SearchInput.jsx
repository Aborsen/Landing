import React from 'react';

/**
 * SearchInput — the single DS search field used across the site (audit #19):
 * docs sidebar, connectors, support, prompt library. One component = one set of
 * styles + behaviour everywhere.
 *
 * Composes the DS input-wrap pattern: a magnifier leading icon, the DS `.ins-input`,
 * and a × clear action that appears once there's a value. Filtering stays on the
 * page — this is the input shell only.
 *
 * Props
 *  value       string — controlled value (REQUIRED)
 *  onChange    function — receives the input change event. The × clear fires
 *              onChange with `{ target: { value: '' } }` so a plain
 *              `e => setX(e.target.value)` handler clears correctly.
 *  placeholder string  (default: 'Search…')
 *  size        'sm' | 'md' | 'lg'   (default: 'md')
 *  ariaLabel   string — defaults to the placeholder
 *  className / style — applied to the wrapping .ins-input-wrap (width, margin, fade-up, etc.)
 *  All other props pass through to the wrapper.
 */
function SearchInput({ value, onChange, placeholder = 'Search…', size = 'md', ariaLabel, className = '', ...rest }) {
  const wrapClass = ['ins-input-wrap', className].filter(Boolean).join(' ');
  const inputClass = [
    'ins-input',
    `ins-input--${size}`,
    'ins-input--with-leading',
    value ? 'ins-input--with-trailing is-filled' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapClass} {...rest}>
      <svg
        className="ins-input-wrap__icon ins-input-wrap__icon--leading"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="text"
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel || placeholder}
      />
      {value ? (
        <button
          type="button"
          className="ins-input-wrap__action"
          onClick={() => onChange({ target: { value: '' } })}
          aria-label="Clear search"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}

export default SearchInput;
