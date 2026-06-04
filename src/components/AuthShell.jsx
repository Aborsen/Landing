import React from 'react';

/*
 * Minimal page chrome used by the placeholder /auth/sign-in and
 * /auth/sign-up pages. No nav dropdowns, no Sign in / Start-for-Free CTAs
 * (those would link back to the same page), no footer.
 *
 * Just a slim top bar with the Insightis mark on the left (linked to /)
 * and a centered card slot below.
 */
export default function AuthShell({ children }) {
  return (
    <div className="font-body" style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          background: 'rgba(13,17,23,0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <a
          href="/"
          aria-label="Insightis home"
          style={{display:'inline-flex', alignItems:'center', gap:'10px', textDecoration:'none'}}
        >
          <InsightisMark size={28}/>
          <span style={{
            color:'#E8F2F5', fontWeight:600, fontSize:'var(--ins-font-size-16)',
            fontFamily:"var(--ins-font-family-sans)", letterSpacing:'-.01em',
          }}>Insightis</span>
        </a>
      </header>

      <main style={{flex:1, display:'flex', flexDirection:'column'}}>
        {children}
      </main>
    </div>
  );
}

function InsightisMark({ size = 28 }) {
  return (
    <svg width={size} height={Math.round(size * 0.895)} viewBox="0 0 25.5 22.84" fill="none" aria-hidden="true">
      <path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/>
    </svg>
  );
}
