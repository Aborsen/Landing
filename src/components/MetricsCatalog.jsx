import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import Chip from './Chip';
import { isDarkLogo } from '../data/connector-sprite-map';
import { METRIC_FAMILIES, METRIC_SOURCES, CATALOG_TOTAL, CATALOG_SOURCES } from '../data/metrics-catalog';

/**
 * MetricsCatalog — browse the shipped metric library: source-family tabs, a grid
 * of metrics, and a detail panel for the selected one.
 *
 * Everything rendered here is the library's own text, straight from
 * built-in-metrics.xlsx via src/data/metrics-catalog.js. That constrains the
 * design in three ways worth knowing before editing:
 *
 *  - Tabs are source families, not audiences. The library has no audience
 *    column; each metric belongs to the connector it is computed from.
 *  - The badge reads "Built-in", not "Certified v1". There is no version field,
 *    and inventing one on a section about trustworthy definitions would
 *    undercut the point.
 *  - There is no example-question field, so the panel tells you how to ask
 *    (@alias) instead of quoting a question the product never wrote.
 *
 * The grid is a single-select listbox: cards are options, the panel is the
 * live region that describes the selected one.
 */

/* Straight to the sprite cell named in METRIC_SOURCES rather than through the
   name-derived lookup in ConnectorIcon: that lookup returns nothing for "Zoho CRM"
   or "Meta Ads" (there is no zohocrm / metaads cell), so both silently fell back to
   a remote favicon. This renders the same sprite span the connectors page uses. */
function SourceLogo({ src, size }) {
  const cls = `ins-connector-logo ${src.sprite}${isDarkLogo(src.sprite) ? ' is-dark' : ''}`;
  return <span className={cls} style={{ '--ins-connector-size': `${size}px` }} role="img" aria-label={src.label} />;
}

function MetricsCatalog({
  eyebrow = 'Metrics catalog',
  title = 'Define, certify, and version your metrics',
  lede = 'Every metric defined once, computed the same way for every team, and answered from your live data.',
  headingId = 'metrics-catalog-heading',
}) {
  const [famIdx, setFamIdx] = useState(0);
  const [metIdx, setMetIdx] = useState(0);

  const fam = METRIC_FAMILIES[famIdx];
  const metric = fam.metrics[metIdx];
  const src = METRIC_SOURCES[metric.p];

  const pickFamily = (i) => { setFamIdx(i); setMetIdx(0); };

  /* The section carries the centred teal glow — the same recipe the home page
     sections and this page's sibling sections use. The old metrics section had
     it, and the catalog rebuild (0d387d3) dropped it by accident. */
  return (
    <section
      className="py-24 relative"
      style={{ background: 'radial-gradient(ellipse 38% 42% at 50% 60%, rgba(7,128,126,0.20) 0%, transparent 100%)' }}
      aria-labelledby={headingId}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ marginBottom: 'var(--ins-size-7)' }}>
          <SectionHeader eyebrow={eyebrow} title={title} lede={lede} size="lg" titleId={headingId} />
        </div>

        {/* Source-family tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--ins-size-2)', marginBottom: 'var(--ins-size-7)', flexWrap: 'wrap' }}>
          {METRIC_FAMILIES.map((f, i) => (
            <Chip
              key={f.label}
              as="button"
              variant="tab"
              onClick={() => pickFamily(i)}
              aria-pressed={i === famIdx}
              style={{ padding: '7px 18px', fontSize: '13px', fontWeight: 500 }}
            >
              {f.label}
            </Chip>
          ))}
        </div>

        <div className="ins-mcat">
          <div className="ins-mcat__grid" role="listbox" aria-label={`${fam.label} metrics`}>
            {fam.metrics.map((m, i) => (
              <button
                key={m.alias}
                type="button"
                role="option"
                aria-selected={i === metIdx}
                className="ins-mcat__card"
                onClick={() => setMetIdx(i)}
              >
                <span className="ins-mcat__tile">
                  <SourceLogo src={METRIC_SOURCES[m.p]} size={28} />
                </span>
                <span className="ins-mcat__txt">
                  <span className="ins-mcat__alias">{m.alias}</span>
                  <span className="ins-mcat__cardsub">{m.short}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="ins-mcat__detail">
            {/* aria-live: selecting a card rewrites this panel in place */}
            <div className="ins-mcat__dinner" aria-live="polite">
              <div className="ins-mcat__dtop">
                <span className="ins-mcat__dalias">{metric.alias}</span>
                <span className="ins-mcat__badge">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1.5l5.5 2v4c0 3.6-2.4 6.4-5.5 7.5C4.9 13.9 2.5 11.1 2.5 7.5v-4L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    <path d="M5.6 7.8l1.7 1.7 3.1-3.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Built-in
                </span>
              </div>

              <div className="ins-mcat__dname">{metric.name}</div>
              <div className="ins-mcat__dsrc">
                <SourceLogo src={src} size={16} />
                {src.label}
              </div>

              <p className="ins-mcat__ddesc">{metric.desc}</p>

              {/* hidden when the definition carries its formula inline instead */}
              {metric.sql && (
                <>
                  <div className="ins-mcat__label">How it is computed</div>
                  <div className="ins-mcat__sql">{metric.sql}</div>
                </>
              )}

              <div className="ins-mcat__label">Ask for it in AI Chat</div>
              <div className="ins-mcat__ask">
                Ask <code>@{metric.alias}</code> — answered from your live data, not an average.
              </div>
            </div>
          </div>
        </div>

        <div className="ins-mcat__foot">
          <span><b>{CATALOG_TOTAL}</b> built-in metrics</span>
          <span className="ins-mcat__dot" />
          <span>across <b>{CATALOG_SOURCES}</b> sources</span>
          <span className="ins-mcat__dot" />
          <span>plus your own, defined in plain English</span>
        </div>
      </div>
    </section>
  );
}

export default MetricsCatalog;
