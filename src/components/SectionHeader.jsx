import React from 'react';

/**
 * SectionHeader — DS-compliant eyebrow + heading + lede triplet.
 *
 * Composes .ins-eyebrow + heading + .ins-text-body-lg. Replaces 22+ hand-rolled
 * occurrences of the same pattern across src/pages/*.jsx and src/main.jsx.
 *
 * Props
 *  eyebrow    string — optional small uppercase label above title
 *  title      string — required heading text
 *  lede       string — optional paragraph below heading
 *  align      'center' | 'left'                  (default: 'center')
 *  size       'md' | 'lg'                        (default: 'md' — h2 scale; lg = hero/h1 scale)
 *  as         'h1' | 'h2' | 'h3'                 (default: 'h2')
 *  (the eyebrow star is drawn by .ins-eyebrow::before — see components/eyebrow.css)
 *  eyebrowVariant  'pill' | 'plain'              (default: 'pill')
 *  titleId    string — id for the heading itself, so a <section> can point its
 *             aria-labelledby at the title alone. Without it the only id lands on
 *             the wrapper, and the accessible name becomes eyebrow + title + lede.
 *
 * All other props pass through to the wrapping <div>.
 */
function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'center',
  size = 'md',
  as: Heading = 'h2',
  eyebrowVariant = 'pill',
  titleId,
  className = '',
  ...rest
}) {
  const wrapperStyle = {
    textAlign: align,
    display: 'flex',
    flexDirection: 'column',
    alignItems: align === 'center' ? 'center' : 'flex-start',
    gap: '16px',
    maxWidth: align === 'center' ? '760px' : 'none',
    marginInline: align === 'center' ? 'auto' : 0,
  };

  // Both sizes render at the .ins-text-display scale (36 px mobile / 48 px desktop).
  // The size prop now only tunes letter-spacing — `lg` gets a slightly tighter track
  // for hero-prominence sections.
  // Audit #54 + #79: no inline color/letter-spacing — the .ins-text-display class
  // provides the soft heading color (--ins-text-heading-soft) and its own tracking.
  const titleClass = 'ins-text-display';
  const titleStyle = {
    textWrap: 'balance',
    margin: 0,
  };

  const eyebrowClasses = [
    'ins-eyebrow',
    eyebrowVariant === 'pill' ? 'ins-eyebrow--pill' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={className} style={wrapperStyle} {...rest}>
      {eyebrow && (
        <span className={eyebrowClasses}>
          {eyebrow}
        </span>
      )}
      <Heading id={titleId} className={titleClass} style={titleStyle}>{title}</Heading>
      {lede && (
        <p className="ins-text-body-lg" style={{ margin: 0, maxWidth: align === 'center' ? '640px' : 'none' }}>
          {lede}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
