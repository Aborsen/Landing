import React, { useState } from 'react';
import { INTEGRATIONS } from './IntegrationsStrip';

/*
 * Shared connector-icon renderer used by the gallery blocks on Platform/
 * Integrations and the Solutions/by-role pages.
 *
 * Source chain (first hit wins):
 *   1. INTEGRATIONS canonical map (lossless inline SVG — Slack 4-color, etc.)
 *   2. Iconify "logos" collection (multi-color official brand logo, if present)
 *   3. Simple Icons CDN, colored — `cdn.simpleicons.org/{slug}/{color}`
 *   4. Abbreviation fallback (styled with the brand color)
 *
 * Slug aliasing handles brands whose CDN slug differs from the project's slug
 * (e.g., apollostack → apollographql on Simple Icons; mondaydotcom → monday
 * on Iconify).
 */

// Verified 404 on cdn.simpleicons.org — skip the network round-trip for these.
const SIMPLEICONS_404 = new Set([
  'close', 'closeio', 'drift', 'clari', 'apollostack', 'outreach',
  'copper', 'gong', 'chargebee', 'freshworks', 'freshsales',
  'mondaydotcom', 'monday', 'pipedrive', 'salesloft', 'zendesksell',
  'docusign',
]);

// Verified available on Iconify's "logos" collection (multi-color official logos).
const ICONIFY_LOGOS = new Set([
  'chargebee', 'pipedrive', 'close', 'monday', 'drift',
]);

// Available on the Iconify-hosted simple-icons + CoreUI brands (cib) mirrors,
// even when cdn.simpleicons.org doesn't serve them.
const ICONIFY_CIB = new Set([
  'docusign',
]);

// Aliases for slugs whose canonical CDN id differs from the project slug.
const SLUG_ALIASES = {
  apollostack: 'apollographql',      // Simple Icons publishes apollographql
  mondaydotcom: 'monday',            // Iconify lists "monday"
  zendesksell: 'zendesk',            // Zendesk Sell is just Zendesk
};

function resolveSlug(slug) {
  if (!slug) return null;
  return SLUG_ALIASES[slug] || slug;
}

// Derive a probable Simple-Icons / Iconify slug from a brand name when no
// explicit slug is provided (e.g., "Amazon Redshift" → "amazonredshift").
function deriveSlugFromName(name) {
  if (!name) return null;
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function ConnectorIcon({ name, slug, domain, color = '#0EC4C1', abbr, bg, size = 20 }) {
  // 1. Canonical INTEGRATIONS inline SVG (brand-correct, lossless).
  const canonical = INTEGRATIONS.find(i => i.name === name);
  if (canonical) {
    const { Icon } = canonical;
    return (
      <div className="connector-icon" style={{ background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={size} />
      </div>
    );
  }

  // 2-3. External image chain.
  const rSlug = resolveSlug(slug) || deriveSlugFromName(name);
  const hex = (color || '#0EC4C1').replace('#', '').toLowerCase();
  const sources = [
    rSlug && ICONIFY_LOGOS.has(rSlug)
      ? `https://api.iconify.design/logos:${rSlug}.svg`
      : null,
    rSlug && !SIMPLEICONS_404.has(rSlug)
      ? `https://cdn.simpleicons.org/${rSlug}/${hex}`
      : null,
    rSlug && ICONIFY_CIB.has(rSlug)
      ? `https://api.iconify.design/cib:${rSlug}.svg?color=%23${hex}`
      : null,
    // Last-resort favicon for pages that only have a domain (Resources/Connectors).
    domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null,
  ].filter(Boolean);

  const [idx, setIdx] = useState(0);

  return (
    <div className="connector-icon" style={{ background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {idx < sources.length ? (
        <img
          key={sources[idx]}
          src={sources[idx]}
          width={size}
          height={size}
          alt={name}
          draggable="false"
          onError={() => setIdx(idx + 1)}
          style={{ display: 'block', objectFit: 'contain' }}
        />
      ) : (
        <span>{abbr || (name ? name[0] : '?')}</span>
      )}
    </div>
  );
}
