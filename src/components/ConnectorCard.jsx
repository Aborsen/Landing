import React from 'react';
import ConnectorIcon from './ConnectorIcon';

/*
 * Canonical connector card — extracted from Platform/Integrations (the source
 * of truth for connector-grid styling). One card everywhere: icon + name
 * (+ optional per-page description), with the shared "Sign in to connect"
 * frosted hover overlay.
 *
 * Look and hover behaviour come from the design system
 * (design-system/components/connector-gallery.css):
 *   .connector-card       — base card frame
 *   .has-overlay          — dims card content on hover
 *   .connector-overlay    — frosted overlay with the sign-in CTA
 *
 * Used by Platform/Integrations and every Solutions "relevant integrations"
 * grid — pages keep their own connector lists, only the card is shared.
 */
export default function ConnectorCard({ name, slug, domain, desc = null, size = 32 }) {
  return (
    <div className="connector-card has-overlay">
      <ConnectorIcon name={name} slug={slug} domain={domain} bg="var(--ins-color-white-a-04)" size={size} />
      <div style={{ minWidth: 0 }}>
        <div className="ins-text-h4" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
        {desc && (
          <div style={{ fontSize: 'var(--ins-font-size-11)', color: 'var(--ins-text-inactive)', marginTop: 'var(--ins-size-half)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{desc}</div>
        )}
      </div>
      <div className="connector-overlay">
        <a className="overlay-btn primary" href="/auth/sign-in/" onClick={(e) => e.stopPropagation()}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
          Sign in to connect
        </a>
      </div>
    </div>
  );
}
