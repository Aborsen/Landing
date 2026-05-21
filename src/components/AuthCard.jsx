import React, { useState, useEffect } from 'react';

/*
 * Shared sign-in / sign-up card. Dark-themed adaptation of the reference
 * screenshot — these are placeholder pages until real auth ships.
 *
 * Buttons fire a 4-second "Coming soon" toast. No backend wiring.
 *
 * Props:
 *   mode: 'sign-up' | 'sign-in'
 *   title: heading text
 *   googleLabel: text inside the Google button
 *   tailLeading: copy before the link ("Already have an account?" etc.)
 *   tailLinkText: link label ("Sign in")
 *   tailHref: where the link goes
 */
export default function AuthCard({ mode, title, googleLabel, tailLeading, tailLinkText, tailHref }) {
  const [showPw, setShowPw] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const fire = (msg) => (e) => {
    if (e) e.preventDefault();
    setToast(msg);
  };

  return (
    <section style={{
      flex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px',
    }}>
      <form
        onSubmit={fire('Sign-up is coming soon — stay tuned!')}
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
        {/* Heading */}
        <h1 style={{
          fontSize:'22px', fontWeight:600, color:'#fff',
          textAlign:'center', marginBottom:'24px',
          fontFamily:"'Outfit', sans-serif", letterSpacing:'-.01em',
        }}>{title}</h1>

        {/* Email */}
        <label style={{display:'block', fontSize:'12px', color:'#8AA6B3', marginBottom:'6px'}}>Email</label>
        <InputRow icon={<MailIcon/>}>
          <input
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            style={inputStyle}
          />
        </InputRow>

        {/* Password */}
        <label style={{display:'block', fontSize:'12px', color:'#8AA6B3', marginTop:'14px', marginBottom:'6px'}}>Password</label>
        <InputRow icon={<LockIcon/>} trailing={
          <button
            type="button"
            aria-label={showPw ? 'Hide password' : 'Show password'}
            onClick={() => setShowPw(v => !v)}
            style={{background:'transparent', border:'none', cursor:'pointer', padding:'4px', color:'#7FA0AC', display:'flex'}}
          >{showPw ? <EyeIcon/> : <EyeOffIcon/>}</button>
        }>
          <input
            type={showPw ? 'text' : 'password'}
            placeholder="Enter your password"
            autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
            style={inputStyle}
          />
        </InputRow>

        {/* Continue */}
        <button
          type="submit"
          style={{
            width: '100%',
            marginTop: '20px',
            padding: '12px 16px',
            border: 'none',
            borderRadius: '10px',
            background: 'linear-gradient(180deg, #0EC4C1 0%, #07807E 100%)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'transform .15s ease, box-shadow .15s ease',
          }}
        >
          Continue
          <span aria-hidden="true">→</span>
        </button>

        {/* OR divider */}
        <div style={{
          display:'flex', alignItems:'center', gap:'12px',
          margin:'20px 0', color:'#7FA0AC',
          fontSize:'11px', fontWeight:500, letterSpacing:'.06em',
        }}>
          <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.08)'}}/>
          OR
          <div style={{flex:1, height:'1px', background:'rgba(255,255,255,0.08)'}}/>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={fire(mode === 'sign-in' ? 'Google sign-in is coming soon!' : 'Google sign-up is coming soon!')}
          style={{
            width: '100%',
            padding: '11px 16px',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.03)',
            color: '#E8F2F5',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          }}
        >
          <GoogleG/>
          {googleLabel}
        </button>

        {/* Tail link */}
        <div style={{textAlign:'center', marginTop:'20px', fontSize:'13px', color:'#8AA6B3'}}>
          {tailLeading}{' '}
          <a href={tailHref} style={{color:'#0EC4C1', textDecoration:'none', fontWeight:500}}>{tailLinkText}</a>
        </div>
      </form>

      {/* Coming-soon toast */}
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

function InputRow({ icon, trailing, children }) {
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
      {trailing}
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

function LockIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2"/>
      <path d="M8 11V8a4 4 0 0 1 8 0v3"/>
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a18.5 18.5 0 0 1 5.05-5.94"/>
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19"/>
      <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88"/>
      <path d="M1 1l22 22"/>
    </svg>
  );
}

function GoogleG() {
  return (
    <svg width={18} height={18} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.6 8.4 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C40.7 35.7 44 30.4 44 24c0-1.3-.1-2.4-.4-3.5z"/>
    </svg>
  );
}
