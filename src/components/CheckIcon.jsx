import React from 'react';

/**
 * CheckIcon — single source of truth for every ✓ on the site.
 *
 * Canonical recipe: 24×24 viewBox, polyline path `20 6 9 17 4 12`,
 * stroke-based render at 2.5 width with round caps/joins. Defaults to
 * `--ins-text-highlight` (teal-400). Change any property here and it
 * propagates to every check on every page.
 *
 * Props
 *  size         number | string — defaults to 16
 *  color        CSS color value — defaults to var(--ins-text-highlight).
 *               Pass `"currentColor"` to inherit from parent.
 *  strokeWidth  number — defaults to 2.5
 *  className    string — extra classes
 *
 * All other props (style, aria-*, etc.) pass through to the <svg>.
 */
function CheckIcon({
  size = 16,
  color = 'var(--ins-text-highlight)',
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default CheckIcon;
