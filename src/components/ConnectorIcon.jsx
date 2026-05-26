import React, { useState, useEffect, useMemo } from 'react';
import { INTEGRATIONS } from './IntegrationsStrip';

/*
 * Shared connector-icon renderer used by the Resources/Connectors gallery,
 * the Platform/Integrations "Built for every team" tabs, and Solutions/by-role.
 *
 * Source chain (first hit wins):
 *   1. INTEGRATIONS canonical map (lossless inline SVG — Slack 4-color, etc.)
 *   2. Iconify "logos" collection (multi-color official brand logo).
 *   3. Simple Icons CDN, colored — cdn.simpleicons.org/{slug}/{color}
 *   4. Iconify "cib" collection (CoreUI brand mirror).
 *   5. Google favicon by domain (last-resort).
 *
 * cdn.simpleicons.org returns HTTP 200 + a 0×0 SVG for missing slugs (not 404),
 * so we must treat naturalWidth === 0 after `load` as a miss.
 *
 * Resolution strategy: preload each candidate via `new Image()` until one
 * loads with naturalWidth > 0, then render the actual <img>. This decouples
 * load detection from React's render cycle and avoids races with the
 * synthetic event system on cached images. While probing, an abbreviation
 * placeholder is visible; if every source fails the placeholder remains.
 */

const SIMPLEICONS_404 = new Set([
  'close', 'closeio', 'drift', 'clari', 'apollostack', 'outreach',
  'copper', 'gong', 'chargebee', 'freshworks', 'freshsales',
  'mondaydotcom', 'monday', 'pipedrive', 'salesloft', 'zendesksell',
  'docusign', 'recurly',
]);

const ICONIFY_LOGOS = new Set([
  'chargebee', 'pipedrive', 'close', 'monday', 'drift',
]);

const ICONIFY_CIB = new Set([
  'docusign',
]);

const SLUG_ALIASES = {
  apollostack: 'apollographql',
  mondaydotcom: 'monday',
  zendesksell: 'zendesk',
};

function resolveSlug(slug) {
  if (!slug) return null;
  return SLUG_ALIASES[slug] || slug;
}

function deriveSlugFromName(name) {
  if (!name) return null;
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function deriveAbbr(name) {
  if (!name) return '?';
  const skip = new Set(['&', 'the', '-', 'and', 'of', 'for']);
  const words = name.split(/[\s.]+/).filter(w => w && !skip.has(w.toLowerCase()));
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function buildSources(name, slug, domain, hex) {
  const rSlug = slug ? resolveSlug(slug) : (resolveSlug(deriveSlugFromName(name)) || deriveSlugFromName(name));
  return [
    rSlug && ICONIFY_LOGOS.has(rSlug)
      ? `https://api.iconify.design/logos:${rSlug}.svg`
      : null,
    rSlug && !SIMPLEICONS_404.has(rSlug)
      ? `https://cdn.simpleicons.org/${rSlug}/${hex}`
      : null,
    rSlug && ICONIFY_CIB.has(rSlug)
      ? `https://api.iconify.design/cib:${rSlug}.svg?color=%23${hex}`
      : null,
    domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` : null,
  ].filter(Boolean);
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

  const hex = (color || '#0EC4C1').replace('#', '').toLowerCase();
  const sources = useMemo(
    () => buildSources(name, slug, domain, hex),
    [name, slug, domain, hex]
  );

  // Probe each source with a hidden Image(). When one loads with non-zero
  // dimensions, that's our resolvedSrc. Browser caches the bytes so the
  // subsequent <img> render is instant (no flash, no second network hit).
  const [resolvedSrc, setResolvedSrc] = useState(null);

  useEffect(() => {
    if (sources.length === 0) {
      setResolvedSrc(null);
      return;
    }
    let cancelled = false;
    const tryAt = (i) => {
      if (cancelled) return;
      if (i >= sources.length) {
        setResolvedSrc(null);
        return;
      }
      const probe = new Image();
      probe.onload = () => {
        if (cancelled) return;
        if (probe.naturalWidth > 0) setResolvedSrc(sources[i]);
        else tryAt(i + 1);
      };
      probe.onerror = () => {
        if (!cancelled) tryAt(i + 1);
      };
      probe.src = sources[i];
    };
    setResolvedSrc(null);
    tryAt(0);
    return () => { cancelled = true; };
  }, [sources]);

  const placeholder = abbr || deriveAbbr(name);
  const abbrFontSize = Math.max(9, Math.round(size * 0.5));

  return (
    <div
      className="connector-icon"
      style={{
        background: bg,
        color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {resolvedSrc ? (
        <img
          src={resolvedSrc}
          width={size}
          height={size}
          alt=""
          draggable="false"
          style={{ display: 'block', width: size, height: size, objectFit: 'contain' }}
        />
      ) : (
        <span
          aria-hidden="true"
          style={{
            fontSize: `${abbrFontSize}px`,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color,
            opacity: 0.85,
            lineHeight: 1,
            fontFamily: "var(--ins-font-family-sans)",
          }}
        >
          {placeholder}
        </span>
      )}
    </div>
  );
}
