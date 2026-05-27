import React from 'react';

/**
 * Section — DS-compliant section wrapper. Composes .ins-section classes.
 *
 * Renders <section class="ins-section ins-section--{padding} ins-section--container-{container} ins-section--{tone}">
 *           <div class="ins-section__inner">{children}</div>
 *         </section>
 *
 * Tokenizes the `py-* max-w-* mx-auto px-6` Tailwind pattern repeated 30+ times across the site.
 *
 * Props
 *  padding    'sm' | 'md' | 'lg' | 'xl'        (default: 'lg' — 80 px mobile / 96 px desktop)
 *  container  '5xl' | '6xl' | '7xl'            (default: '7xl' — 1280 px)
 *  tone       'default' | 'tint' | 'dark'      (default: 'default' — transparent)
 *  as         tag name                          (default: 'section')
 *  innerClassName  string — extra classes on the inner container
 *
 * All other props pass through (id, aria-*, etc).
 */
function Section({
  padding = 'lg',
  container = '7xl',
  tone = 'default',
  as: Component = 'section',
  className = '',
  innerClassName = '',
  children,
  ...rest
}) {
  const classes = [
    'ins-section',
    `ins-section--${padding}`,
    `ins-section--container-${container}`,
    tone !== 'default' ? `ins-section--${tone}` : '',
    className,
  ].filter(Boolean).join(' ');

  const innerClasses = ['ins-section__inner', innerClassName].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...rest}>
      <div className={innerClasses}>{children}</div>
    </Component>
  );
}

export default Section;
