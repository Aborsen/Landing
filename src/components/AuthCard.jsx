import React from 'react';

/*
 * Shared placeholder for /auth/sign-in and /auth/sign-up.
 *
 * Insightis auth is not live yet, so these are a plain "coming soon" notice:
 * NO form, NO email field, NO password, NO data collection of any kind. There
 * is nothing a user can submit, so the page cannot be mistaken for a
 * credential- or contact-harvesting form (which is what trips Safe Browsing
 * "deceptive page" detection). Just a message and a link back home.
 *
 * Props:
 *   title: heading text
 *   blurb: explanatory copy under the heading
 */
export default function AuthCard({ title, blurb }) {
  return (
    <section style={{
      flex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px',
    }}>
      <div
        className="fu0"
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 'var(--ins-radius-16)',
          padding: '40px 32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
          textAlign: 'center',
        }}
      >
        {/* Coming-soon pill */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:'7px',
          padding:'5px 12px', marginBottom:'20px',
          borderRadius:'999px',
          background:'rgba(9,160,157,0.12)',
          border:'1px solid rgba(9,160,157,0.35)',
          color:'#0EC4C1', fontSize:'var(--ins-font-size-11)', fontWeight:600,
          letterSpacing:'.06em', textTransform:'uppercase',
        }}>
          <span style={{
            width:'6px', height:'6px', borderRadius:'50%',
            background:'#0EC4C1', display:'inline-block',
          }} aria-hidden="true"/>
          Coming soon
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize:'var(--ins-font-size-24)', fontWeight:600, color:'var(--ins-text-heading)',
          marginBottom:'12px',
          fontFamily:"var(--ins-font-family-sans)", letterSpacing:'-.01em',
        }}>{title}</h1>

        {/* Blurb */}
        <p style={{
          fontSize:'var(--ins-font-size-15)', lineHeight:1.6, color:'var(--ins-text-inactive)',
          margin:'0 auto 28px', maxWidth:'34ch',
        }}>{blurb}</p>

        {/* Back to home */}
        <a href="/" style={{
          display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'8px',
          padding:'12px 22px',
          borderRadius:'10px',
          background:'linear-gradient(180deg, #0EC4C1 0%, #07807E 100%)',
          color:'var(--ins-text-body)', textDecoration:'none',
          fontSize:'var(--ins-font-size-14)', fontWeight:600,
        }}>
          <span aria-hidden="true">←</span>
          Back to home
        </a>
      </div>
    </section>
  );
}
