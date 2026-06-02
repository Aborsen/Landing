import React, { useState, useEffect } from 'react';

/*
 * Shared placeholder card for /auth/sign-in and /auth/sign-up.
 *
 * Insightis auth is not live yet, so these are NON-functional "coming soon"
 * pages: a single email field for an early-access waitlist. Deliberately NO
 * password field and NO third-party (Google) login button — a non-working
 * email+password form on a public domain reads as credential-harvesting and
 * trips Safe Browsing "deceptive page" detection. An email-only waitlist does
 * not. Submitting just shows a 4s confirmation toast; there is no backend.
 *
 * Props:
 *   title:        heading text
 *   blurb:        one-line explanation under the heading
 *   ctaLabel:     submit-button text
 *   toastMsg:     confirmation toast text
 */
export default function AuthCard({ title, blurb, ctaLabel, toastMsg }) {
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <section style={{
      flex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px',
    }}>
      <form
        onSubmit={(e) => { e.preventDefault(); setToast(toastMsg); }}
        className="fu0"
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px',
          padding: '36px 28px 32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
        }}
      >
        {/* Coming-soon pill */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:'7px',
          padding:'5px 12px', marginBottom:'18px',
          borderRadius:'999px',
          background:'rgba(9,160,157,0.12)',
          border:'1px solid rgba(9,160,157,0.35)',
          color:'#0EC4C1', fontSize:'11px', fontWeight:600,
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
          fontSize:'22px', fontWeight:600, color:'var(--ins-text-heading)',
          marginBottom:'8px',
          fontFamily:"var(--ins-font-family-sans)", letterSpacing:'-.01em',
        }}>{title}</h1>

        {/* Blurb */}
        <p style={{
          fontSize:'14px', lineHeight:1.5, color:'var(--ins-text-inactive)',
          margin:'0 0 24px',
        }}>{blurb}</p>

        {/* Email */}
        <label style={{display:'block', fontSize:'12px', color:'var(--ins-text-inactive)', marginBottom:'6px'}}>Email</label>
        <InputRow icon={<MailIcon/>}>
          <input
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            style={inputStyle}
          />
        </InputRow>

        {/* CTA */}
        <button
          type="submit"
          style={{
            width: '100%',
            marginTop: '20px',
            padding: '12px 16px',
            border: 'none',
            borderRadius: '10px',
            background: 'linear-gradient(180deg, #0EC4C1 0%, #07807E 100%)',
            color: 'var(--ins-text-body)',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'transform .15s ease, box-shadow .15s ease',
          }}
        >
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </button>

        {/* Back to home */}
        <div style={{textAlign:'center', marginTop:'20px', fontSize:'13px'}}>
          <a href="/" style={{color:'var(--ins-text-inactive)', textDecoration:'none', fontWeight:500}}>← Back to home</a>
        </div>
      </form>

      {/* Confirmation toast */}
      {toast && (
        <div
          role="status"
          style={{
            position: 'fixed', top: '92px', right: '20px',
            background: 'rgba(9,160,157,0.14)',
            border: '1px solid rgba(9,160,157,0.4)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: '#E8F2F5',
            fontSize: '13px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            zIndex: 200,
            maxWidth: '320px',
          }}
        >
          {toast}
        </div>
      )}
    </section>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 0',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: '#E8F2F5',
  fontSize: '14px',
  fontFamily: "'Geist', sans-serif",
};

function InputRow({ icon, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '0 14px',
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '10px',
      transition: 'border-color .15s ease',
    }}
    onFocus={e => e.currentTarget.style.borderColor = 'rgba(9,160,157,0.5)'}
    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
    >
      <span style={{display:'flex', color:'#7FA0AC'}}>{icon}</span>
      <div style={{flex:1}}>{children}</div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2"/>
      <path d="M3 7l9 6 9-6"/>
    </svg>
  );
}
