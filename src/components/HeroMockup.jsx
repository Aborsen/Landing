import React from 'react';

/*
 * Shared hero "section image" used across the six Solutions pages.
 *
 * Owns the dimensions/structure that must stay identical everywhere — the
 * panel frame (540px min-height, 24px radius, gradient + blur), the macOS
 * window chrome, and the two floating accent cards (top-right Badge,
 * bottom-left FloatCard, both at the standardized 180px footprint). Per-page
 * concerns are passed in:
 *   - `title`      chrome label, e.g. "Insightis — For RevOps & BizOps"
 *   - `accentLine` color of the top hairline (string)
 *   - `glow`       full CSS background for the ambient glow behind the panel
 *   - `children`   the bespoke panel content (chart / KPIs / funnel …)
 *   - `badge`      <HeroMockup.Badge> for the top-right pill
 *   - `card`       <HeroMockup.FloatCard> for the bottom-left card
 *
 * Badge/FloatCard take `accentRgb` (a bare "r,g,b" string) so each page keeps
 * its own semantic accent (warning amber, success green, brand teal, …) while
 * sharing one set of dimensions. Change a dimension here and all six pages move
 * together.
 */

export default function HeroMockup({ title, accentLine = 'rgba(14,196,193,.55)', glow, children, badge = null, card = null }) {
  return (
    <div className="fu2" style={{ position: 'relative' }}>
      {/* Ambient glow removed — its blurred box was rendering a faint rectangle/line behind the panel. */}

      {/* Main panel */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(15,20,28,0.92) 100%)',
        border: '1px solid var(--ins-color-white-a-08)',
        borderRadius: '24px',
        padding: 'var(--ins-size-6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: 'none',
        overflow: 'hidden',
        zIndex: 1,
        minHeight: '540px',
      }}>
        {/* Top accent hairline */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg,transparent,${accentLine},transparent)`, zIndex: 1 }} />

        {/* Window chrome */}
        <div style={{
          margin: '-24px -24px 16px',
          padding: '10px 14px',
          borderBottom: '1px solid var(--ins-color-white-a-06)',
          background: 'rgba(255,255,255,0.015)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FEBC2E' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28C840' }} />
          </div>
          <span style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'var(--ins-font-family-mono)',
            fontSize: '10.5px',
            color: 'var(--ins-text-body)',
            letterSpacing: '.08em',
            whiteSpace: 'nowrap',
          }}>{title}</span>
        </div>

        {children}
      </div>

      {badge}
      {card}
    </div>
  );
}

/* Top-right floating pill. */
HeroMockup.Badge = function Badge({ accentRgb = '251,191,36', children }) {
  return (
    <div style={{
      position: 'absolute',
      top: '-18px',
      right: '-14px',
      // Accent tint layered over a near-opaque dark base — the card must stay
      // solid without backdrop-filter (removed: it blurred the rotated text).
      background: `linear-gradient(135deg, rgba(${accentRgb},.22) 0%, rgba(${accentRgb},0) 65%), rgba(13,17,23,0.97)`,
      border: `1px solid rgba(${accentRgb},.4)`,
      borderRadius: '14px',
      padding: '10px 14px',
      boxShadow: `0 8px 24px var(--ins-color-black-a-50)`,
      // No backdrop-filter here: combined with rotate() it forces the browser
      // to rasterize the card (text included) into a texture and resample it,
      // which blurs the type. Without it, rotated text stays sharp.
      display: 'flex', alignItems: 'center', gap: '10px',
      minWidth: '185px', minHeight: '64px',
      transform: 'rotate(2.5deg)',
      zIndex: 2,
    }}>{children}</div>
  );
};

/* Bottom-left floating card (standardized 180px footprint). */
HeroMockup.FloatCard = function FloatCard({ accentRgb = '9,160,157', children }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '-22px',
      left: '-18px',
      background: `linear-gradient(135deg, rgba(${accentRgb},.2) 0%, rgba(${accentRgb},0) 65%), rgba(13,17,23,0.97)`,
      border: `1px solid rgba(${accentRgb},.4)`,
      borderRadius: '14px',
      padding: '12px 14px',
      boxShadow: `0 8px 24px var(--ins-color-black-a-50)`,
      // No backdrop-filter — see Badge above; it softens rotated text.
      transform: 'rotate(-2deg)',
      minWidth: '185px',
      minHeight: '128px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      zIndex: 2,
    }}>{children}</div>
  );
};
