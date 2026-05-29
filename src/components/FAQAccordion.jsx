import React, { useState } from 'react';

/**
 * FAQAccordion — DS-compliant FAQ list with chevron-toggle accordion behavior.
 *
 * Renders one .ins-faq__row per item. Open row gets a teal-tinted border;
 * closed rows use the default surface border. Only one row open at a time.
 *
 * Optionally emits FAQPage JSON-LD for SEO (schema.org structured data).
 *
 * Text-preservation principle: each call site supplies its own questions
 * and answers via the `items` prop. The component supplies no copy.
 *
 * Props
 *  items              [{ q: string, a: string }] — REQUIRED
 *  defaultOpenIndex   number — which item is open initially. -1 = all closed.
 *                     (default: 0 — first item open)
 *  schemaInJsonLd     boolean — emit FAQPage JSON-LD (default: true)
 *  className          string — extra classes on outer .ins-faq
 *  id                 string — id for the outer container
 *
 * All other props pass through to the outer container.
 */
function FAQAccordion({
  items = [],
  defaultOpenIndex = 0,
  schemaInJsonLd = true,
  className = '',
  ...rest
}) {
  const [openIdx, setOpenIdx] = useState(defaultOpenIndex);

  const classes = ['ins-faq', className].filter(Boolean).join(' ');

  // Build FAQPage JSON-LD. We strip surrounding whitespace from answers but
  // preserve their text verbatim — no normalization, no truncation.
  const jsonLd = schemaInJsonLd && items.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map(({ q, a }) => ({
      '@type': 'Question',
      'name': q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': a,
      },
    })),
  } : null;

  return (
    <>
      <div className={classes} {...rest}>
        {items.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className={`ins-faq__row${isOpen ? ' is-open' : ''}`}>
              <button
                type="button"
                className="ins-faq__question"
                aria-expanded={isOpen}
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <svg
                  className="ins-faq__chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isOpen && (
                <div className="ins-text-body ins-faq__answer">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {jsonLd && (
        <script
          type="application/ld+json"
          data-faq="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}

export default FAQAccordion;
