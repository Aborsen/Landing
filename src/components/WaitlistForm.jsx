import React from 'react';

/**
 * WaitlistForm — one email field, on the auth "coming soon" cards.
 *
 * Posts to /api/waitlist, which forwards to the Zoho Waitlist form server-side.
 * The browser never sees the Zoho URL: that endpoint takes unauthenticated
 * writes, and it accepts a blank submission with a 200, so validation here and in
 * server/waitlist.js is the only thing keeping the list usable.
 *
 * DELIBERATELY NOT SHAPED LIKE A LOGIN. AuthCard was written with no form at all,
 * on the reasoning that a sign-in page carrying input fields can trip Safe
 * Browsing's "deceptive page" heuristics — it looks like credential harvesting.
 * That risk is about pages IMPERSONATING a login, so this stays unmistakably a
 * mailing-list signup:
 *   - one field, type="email", labelled "Email"; no password field anywhere
 *   - the button says "Join the waitlist", never "Sign in" or "Continue"
 *   - autoComplete="email", so no browser offers to fill a credential here
 *   - the heading above it already states sign-in is not live
 * Keep it that way. Adding a second field, or relabelling the button as a
 * sign-in action, is what would make the page misleading.
 */

const ERROR_COPY = {
  email: 'Please enter a valid email address.',
  rate: 'That address is already queued — no need to send it twice.',
  length: 'That address is longer than the form accepts.',
  invalid: 'Please check the address and try again.',
};

export default function WaitlistForm() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle | sending | done | error
  const [error, setError] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const honeypotRef = React.useRef(null);
  /* Only the elapsed difference is sent, never a wall-clock time. */
  const openedAtRef = React.useRef(0);

  React.useEffect(() => { openedAtRef.current = Date.now(); }, []);

  const valid = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/.test(email.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending' || !valid) return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          hp: honeypotRef.current ? honeypotRef.current.value : '',
          elapsedMs: Date.now() - openedAtRef.current,
        }),
      });
      /* A misrouted /api on a new host answers with an HTML 404. */
      let payload = null;
      try { payload = await res.json(); } catch { /* left null on purpose */ }
      if (res.ok && payload && payload.ok === true) {
        setStatus('done');
        return;
      }
      setStatus('error');
      setError(ERROR_COPY[payload && payload.error] || 'We could not add you just now.');
    } catch {
      setStatus('error');
      setError('We could not add you just now.');
    }
  };

  if (status === 'done') {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          margin: '0 0 28px',
          padding: '14px 16px',
          borderRadius: '10px',
          background: 'rgba(9,160,157,0.10)',
          border: '1px solid rgba(9,160,157,0.30)',
          fontSize: 'var(--ins-font-size-14)',
          lineHeight: 1.55,
          color: 'var(--ins-text-heading)',
        }}
      >
        <strong style={{ fontWeight: 600 }}>You&rsquo;re on the list.</strong><br />
        We&rsquo;ll email you the moment Insightis opens up.
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={submit} style={{ margin: '0 0 24px', textAlign: 'left' }} noValidate>
      <label
        htmlFor="waitlist-email"
        style={{
          display: 'block', marginBottom: '6px',
          fontSize: 'var(--ins-font-size-12)', fontWeight: 600,
          letterSpacing: '.04em', color: '#9BBAC5',
        }}
      >
        EMAIL
      </label>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status === 'error') { setStatus('idle'); setError(''); } }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={sending}
          placeholder="you@company.com"
          aria-describedby={status === 'error' ? 'waitlist-error' : undefined}
          style={{
            flex: '1 1 200px', minWidth: 0, boxSizing: 'border-box',
            background: 'rgba(255,255,255,0.04)',
            border: `1px solid ${status === 'error' ? 'rgba(239,68,68,.5)' : focused ? 'rgba(14,196,193,.5)' : 'rgba(255,255,255,0.10)'}`,
            borderRadius: '10px',
            padding: '11px 14px',
            /* 16px keeps iOS from zooming the viewport on focus. */
            fontSize: '16px',
            color: 'var(--ins-color-gray-100)',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color .2s',
          }}
        />
        <button
          type="submit"
          disabled={!valid || sending}
          aria-busy={sending}
          style={{
            flex: '0 0 auto',
            padding: '11px 20px',
            borderRadius: '10px',
            border: 'none',
            background: valid && !sending
              ? 'linear-gradient(180deg, #0EC4C1 0%, #07807E 100%)'
              : 'rgba(9,160,157,.18)',
            color: valid && !sending ? 'var(--ins-text-body)' : 'var(--ins-color-teal-a-40)',
            fontSize: 'var(--ins-font-size-14)', fontWeight: 600,
            fontFamily: 'inherit',
            cursor: valid && !sending ? 'pointer' : 'default',
            transition: 'background .18s, color .18s',
          }}
        >
          {sending ? 'Joining…' : 'Join the waitlist'}
        </button>
      </div>

      {/* Honeypot. Off-screen rather than display:none — bots that skip hidden
          fields still see this one, and no human can reach it. */}
      <input
        ref={honeypotRef}
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      <p
        id="waitlist-error"
        role="alert"
        aria-live="assertive"
        style={{
          minHeight: '1.2em', marginTop: '8px',
          fontSize: 'var(--ins-font-size-12)', lineHeight: 1.5,
          color: '#F87171',
        }}
      >
        {status === 'error' ? error : ''}
      </p>
    </form>
  );
}
