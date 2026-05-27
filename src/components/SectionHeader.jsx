import React from 'react';

/**
 * SectionHeader — DS-compliant eyebrow + heading + lede triplet.
 *
 * Composes .ins-eyebrow + heading + .ins-text-lede. Replaces 22+ hand-rolled
 * occurrences of the same pattern across src/pages/*.jsx and src/main.jsx.
 *
 * Props
 *  eyebrow    string — optional small uppercase label above title
 *  title      string — required heading text
 *  lede       string — optional paragraph below heading
 *  align      'center' | 'left'                  (default: 'center')
 *  size       'md' | 'lg'                        (default: 'md' — h2 scale; lg = hero/h1 scale)
 *  as         'h1' | 'h2' | 'h3'                 (default: 'h2')
 *  sparkle    boolean — prefix eyebrow with the Lucide Sparkles icon
 *  eyebrowVariant  'pill' | 'plain'              (default: 'pill')
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
  sparkle = false,
  eyebrowVariant = 'pill',
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

  // Marketing pages need bigger headings than the app DS provides.
  // size="md" → .ins-text-display (36/48 px). size="lg" → .ins-text-display-xl (44/60 px).
  const titleClass = size === 'lg' ? 'ins-text-display-xl' : 'ins-text-display';
  const titleStyle = {
    color: 'var(--ins-text-heading)',
    letterSpacing: size === 'lg' ? '-0.04em' : '-0.03em',
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
          {sparkle && (
            <svg className="ins-eyebrow__sparkle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
            </svg>
          )}
          {eyebrow}
        </span>
      )}
      <Heading className={titleClass} style={titleStyle}>{title}</Heading>
      {lede && (
        <p className="ins-text-lede" style={{ color: 'var(--ins-text-body)', fontSize: '16px', lineHeight: 1.65, margin: 0, maxWidth: align === 'center' ? '640px' : 'none' }}>
          {lede}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
