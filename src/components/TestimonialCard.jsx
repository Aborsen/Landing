import React, { useState } from 'react';

const QuoteIcon = () => (
  <svg className="ins-testimonial__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h2c1 0 2 .75 2 2v.5C8 19 6 19 3 19v2zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h2c1 0 2 .75 2 2v.5c0 3.5-2 3.5-5 3.5v2z" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/**
 * TestimonialCard — DS-compliant customer quote card.
 *
 * Two visual configurations driven by props:
 *  - Solutions style: opening-quote SVG + paragraph + name/role above
 *                     an optional company pill badge
 *  - Homepage style:  5-star row + decorative corner mark + avatar circle
 *                     to the left of name/role
 *
 * Text-preservation principle: every quote, name, role, company string
 * is per-page copy passed via props. The component supplies no copy.
 *
 * Props
 *  quote      string — REQUIRED. Quote body text.
 *  name       string — REQUIRED.
 *  role       string — REQUIRED.
 *  company    string — optional. If passed, renders as a mono pill
 *                      below role (Solutions style).
 *  avatar     string — optional URL. If passed, shows avatar circle
 *                      in the footer (homepage style).
 *  initials   string — fallback letters when the avatar image fails.
 *  showStars  boolean — show a 5-star row above the quote.
 *  showCornerMark boolean — show the decorative &ldquo; mark in the
 *                           top-right corner (defaults true when
 *                           showStars is true).
 *  hideIcon   boolean — hide the default opening-quote SVG icon.
 *  className  string — extra classes on the outer .ins-testimonial card.
 *
 * Example (Solutions style):
 *   <TestimonialCard
 *     quote="In the first month we deflected ~70% of ad hoc SQL tickets..."
 *     name="Maya Chen"
 *     role="Head of Data"
 *     company="Series-B SaaS"
 *   />
 *
 * Example (homepage style):
 *   <TestimonialCard
 *     quote="Insightis transformed how we make decisions..."
 *     name="Sarah Chen"
 *     role="VP of Analytics · Meridian Health"
 *     avatar="https://randomuser.me/api/portraits/women/44.jpg"
 *     initials="SC"
 *     showStars
 *   />
 */
function TestimonialCard({
  quote,
  name,
  role,
  company,
  avatar,
  initials,
  showStars = false,
  showCornerMark,
  hideIcon = false,
  className = '',
  ...rest
}) {
  const [avatarFailed, setAvatarFailed] = useState(false);

  const classes = [
    'ins-testimonial',
    avatar || initials ? 'ins-testimonial--has-avatar' : '',
    className,
  ].filter(Boolean).join(' ');

  // Default the corner mark on if stars are shown (homepage idiom).
  const renderCornerMark = showCornerMark ?? showStars;

  return (
    <div className={classes} {...rest}>
      {renderCornerMark && (
        <span className="ins-testimonial__corner" aria-hidden="true">&ldquo;</span>
      )}

      {showStars && (
        <div className="ins-testimonial__stars" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map(i => <StarIcon key={i} />)}
        </div>
      )}

      {!hideIcon && !showStars && <QuoteIcon />}

      <p className="ins-testimonial__quote">{quote}</p>

      <div className="ins-testimonial__footer">
        {(avatar || initials) && (
          <>
            {avatar && !avatarFailed ? (
              <img
                className="ins-testimonial__avatar"
                src={avatar}
                alt={name}
                width="36"
                height="36"
                loading="lazy"
                onError={() => setAvatarFailed(true)}
              />
            ) : initials ? (
              <span className="ins-testimonial__avatar-fallback" aria-hidden="true">{initials}</span>
            ) : null}
          </>
        )}
        <div>
          <div className="ins-testimonial__name">{name}</div>
          <div className="ins-testimonial__role">{role}</div>
          {company && <div className="ins-testimonial__company">{company}</div>}
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
