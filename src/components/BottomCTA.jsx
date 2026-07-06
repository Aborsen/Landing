import React from 'react';
import Button from './Button';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/**
 * BottomCTA — flagship organism for the above-footer call-to-action section.
 *
 * Three variants:
 *   - "form"    : title + form-input + submit button (16 page-level uses)
 *   - "buttons" : title + primary CTA + optional secondary CTA (pricing-style)
 *   - "text"    : title + single CTA button (no form, no secondary)
 *
 * Text-preservation principle: every call site supplies its own title,
 * input placeholder, button labels, and form action. The component is a
 * STYLING shell only — no copy gets duplicated across pages.
 *
 * Props
 *  variant            'form' | 'buttons' | 'text'   (default: 'form')
 *  title              ReactNode — REQUIRED. Can include <BottomCTA.Highlight>
 *                     for the teal-tinted phrase.
 *  inputPlaceholder   string — REQUIRED for variant="form"
 *  inputAriaLabel     string — defaults to inputPlaceholder
 *  inputName          string — form input `name` attribute (default: "q")
 *  ctaLabel           string — submit button label (default: "Get started"
 *                     for form variant; required for other variants)
 *  ctaHref            string — form action / anchor href (default: "/auth/sign-up/")
 *  secondaryCtaLabel  string — for "buttons" variant
 *  secondaryCtaHref   string — for "buttons" variant
 *  className          string — extra classes on outer .ins-bottom-cta
 *  style              object — extra inline styles
 *
 * Examples:
 *   <BottomCTA
 *     variant="form"
 *     title={<>Stop arguing about <BottomCTA.Highlight>which number</BottomCTA.Highlight> is right.</>}
 *     inputPlaceholder="What metric do you want to unify?"
 *     ctaLabel="Get started"
 *   />
 *
 *   <BottomCTA
 *     variant="buttons"
 *     title="Start free. Upgrade when you're ready."
 *     ctaLabel="Get started for free"
 *     secondaryCtaLabel="Talk to sales"
 *     secondaryCtaHref="/company/contacts"
 *   />
 */
function BottomCTA({
  variant = 'form',
  title,
  inputPlaceholder,
  inputAriaLabel,
  inputName = 'q',
  ctaLabel = 'Get started',
  ctaHref = '/auth/sign-up/',
  secondaryCtaLabel,
  secondaryCtaHref,
  className = '',
  style,
  ...rest
}) {
  const classes = [
    'ins-bottom-cta',
    variant !== 'form' ? `ins-bottom-cta--${variant}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} {...rest}>
      <h2 className="ins-bottom-cta__title">{title}</h2>

      {variant === 'form' && (
        <form
          action={ctaHref}
          method="get"
          className="ins-bottom-cta__form"
        >
          <input
            className="ins-bottom-cta__input"
            name={inputName}
            type="text"
            required
            placeholder={inputPlaceholder}
            aria-label={inputAriaLabel || inputPlaceholder}
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            iconEnd={<ArrowRightIcon />}
            className="flex-shrink-0"
          >
            {ctaLabel}
          </Button>
        </form>
      )}

      {variant === 'buttons' && (
        <div className="ins-bottom-cta__actions">
          <Button
            as="a"
            href={ctaHref}
            variant="primary"
            size="lg"
            iconEnd={<ArrowRightIcon />}
          >
            {ctaLabel}
          </Button>
          {secondaryCtaLabel && (
            <Button
              as="a"
              href={secondaryCtaHref || '#'}
              variant="secondary"
              size="lg"
            >
              {secondaryCtaLabel}
            </Button>
          )}
        </div>
      )}

      {variant === 'text' && (
        <div className="ins-bottom-cta__actions">
          <Button
            as="a"
            href={ctaHref}
            variant="primary"
            size="lg"
            iconEnd={<ArrowRightIcon />}
          >
            {ctaLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

/**
 * Highlight — teal-tinted inline span for emphasized phrases inside the title.
 */
function Highlight({ children, className = '', ...rest }) {
  const classes = ['ins-bottom-cta__highlight', className].filter(Boolean).join(' ');
  return <span className={classes} {...rest}>{children}</span>;
}

BottomCTA.Highlight = Highlight;

export default BottomCTA;
export { Highlight };
