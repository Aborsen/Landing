import React from 'react';

/**
 * XIcon — single source of truth for every ✕ on the site (mirror of CheckIcon).
 *
 * Canonical recipe: 24×24 viewBox, two crossing lines, stroke-based render at
 * 2.5 width with round caps/joins. Defaults to `--ins-status-error-fg`.
 * Change any property here and it propagates to every ✕ on every page.
 *
 * Props
 *  size         number | string — defaults to 16
 *  color        CSS color value — defaults to var(--ins-status-error-fg).
 *               Pass `"currentColor"` to inherit from parent.
 *  strokeWidth  number — defaults to 2.5
 *  className    string — extra classes
 *
 * All other props (style, aria-*, etc.) pass through to the <svg>.
 */
function XIcon({
  size = 16,
  color = 'var(--ins-status-error-fg)',
  strokeWidth = 2.5,
  className = '',
  ...rest
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default XIcon;
