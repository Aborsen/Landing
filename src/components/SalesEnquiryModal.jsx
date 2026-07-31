import React from 'react';
import CheckIcon from './CheckIcon';

/**
 * SalesEnquiryModal — the "Talk to sales" dialog.
 *
 * A sibling of SupportTicketModal: same shell, same field styling, same
 * submit/error/success mechanics. Three questions only — name, work email, and an
 * optional note. Company and team size were asked for originally and dropped on
 * 2026-07-31: the shorter the lead form, the more leads it returns, and sales can
 * ask the rest in the reply.
 *
 * NOTE ON THE ZOHO KEYS: the form upstream still has five fields, so the payload
 * skips SingleLine1 (company) and SingleLine3 (team size) rather than renumbering.
 * See server/contact-sales.js — closing those gaps would misfile every address.
 *
 * Posts to /api/contact-sales, which forwards to the Zoho ContactSales form
 * server-side — the browser never sees the Zoho URL, because that endpoint takes
 * unauthenticated writes and would otherwise be a spam funnel for anyone who read
 * the bundle. See server/contact-sales.js.
 *
 * This replaced the demo half of contacts.jsx's ModalForm, which composed a
 * mailto: link — so a visitor without a configured mail client clicked "Request
 * demo" and nothing happened at all.
 *
 * Props
 *  open      boolean — renders nothing when false, so a closed dialog costs a
 *                      prerendered page nothing and hydration has nothing to
 *                      reconcile
 *  onClose   () => void
 */

const EMPTY = { name: '', email: '', details: '' };

/* The endpoint answers with a short machine code, never a sentence, so the copy
   lives here and the server stays silent about its internals. Anything unmapped
   falls through to a generic line plus the email address — a visitor cannot act
   on the difference between a missing env var and an upstream timeout. */
const ERROR_COPY = {
  name: 'Please enter your name as plain text.',
  email: 'Please enter a valid work email so we can reply.',
  length: 'That is longer than the form accepts. Please shorten it and try again.',
  invalid: 'Something in the form was rejected. Please check it and try again.',
  rate: 'That is several requests in quick succession. Please try again in a few minutes.',
};

const SALES_EMAIL = 'sales@insightis.io';

function SalesEnquiryModal({ open, onClose }) {
  const [step, setStep] = React.useState('form');
  const [form, setForm] = React.useState(EMPTY);
  const [focused, setFocused] = React.useState(null);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');
  const honeypotRef = React.useRef(null);
  /* When the dialog opened. Only the elapsed difference is sent — a wall-clock
     time would be both useless to us and correlatable. */
  const openedAtRef = React.useRef(0);

  React.useEffect(() => {
    if (open) openedAtRef.current = Date.now();
  }, [open]);

  const close = () => {
    onClose();
    /* Reset after the dialog has visually gone, so the fields do not visibly
       empty themselves on the way out. */
    setTimeout(() => {
      setStep('form');
      setForm(EMPTY);
      setError('');
      setSending(false);
      setFocused(null);
      if (honeypotRef.current) honeypotRef.current.value = '';
    }, 300);
  };

  /* Mirrors the server's rules so the visitor is told what is wrong before a
     round trip. The server re-checks everything regardless — this is courtesy,
     not a control. */
  const ready = form.name.trim().length >= 2
    && /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/.test(form.email.trim());

  const submit = async () => {
    if (sending || !ready) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/contact-sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          details: form.details,
          /* Empty unless a script filled the off-screen field in. */
          hp: honeypotRef.current ? honeypotRef.current.value : '',
          elapsedMs: Date.now() - openedAtRef.current,
        }),
      });
      /* A misrouted /api on a new host answers with an HTML 404, so never assume
         the body is JSON. */
      let payload = null;
      try { payload = await res.json(); } catch { /* left null on purpose */ }
      if (res.ok && payload && payload.ok === true) {
        setStep('done');
        return;
      }
      setError(ERROR_COPY[payload && payload.error] || 'We could not send that just now.');
    } catch {
      setError('We could not send that just now.');
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (field) => ({
    width: '100%', boxSizing: 'border-box',
    background: 'var(--ins-color-white-a-04)',
    border: focused === field ? '1px solid var(--ins-color-teal-a-50)' : '1px solid var(--ins-color-white-a-08)',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: 'var(--ins-font-size-14)', color: 'var(--ins-color-gray-100)',
    fontFamily: 'inherit', outline: 'none',
    transition: 'border-color .2s',
    resize: 'none',
  });

  const labelStyle = {
    fontSize: 'var(--ins-font-size-12)', fontWeight: 600, color: '#9BBAC5',
    letterSpacing: '.04em', display: 'block', marginBottom: '6px',
  };

  if (!open) return null;

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 'var(--ins-z-sticky)',
        background: 'rgba(5,8,12,0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'var(--ins-size-6)',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--ins-surface-container)',
          border: '1px solid var(--ins-color-white-a-08)',
          borderRadius: '18px',
          width: '100%', maxWidth: '520px',
          padding: 'var(--ins-size-8)',
          animation: 'fadeUp .22s ease',
          position: 'relative',
          margin: 'auto',
        }}
      >
        {/* Close */}
        <button
          onClick={close}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--ins-text-disabled)', padding: 'var(--ins-size-1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 'var(--ins-radius-6)',
          }}
          aria-label="Close dialog"
          onMouseEnter={e => e.currentTarget.style.color = 'var(--ins-color-gray-100)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--ins-text-disabled)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        {step === 'form' ? (
          <>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ins-size-3)', marginBottom: 'var(--ins-size-6)' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                background: 'var(--ins-color-teal-a-10)', border: '1px solid rgba(14,196,193,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ins-text-highlight)',
              }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 'var(--ins-font-size-16)', fontWeight: 700, color: 'var(--ins-color-gray-100)' }}>Talk to Sales</div>
                <div style={{ fontSize: 'var(--ins-font-size-14)', color: 'var(--ins-text-body)', marginTop: 'var(--ins-size-half)' }}>Tell us about your team and we'll tailor the demo.</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ins-size-4)' }}>

              {/* Full name */}
              <div>
                <label htmlFor="sales-name" style={labelStyle}>YOUR NAME *</label>
                <input
                  id="sales-name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="e.g. Alex Morgan"
                  autoComplete="name"
                  maxLength={80}
                  style={inputStyle('name')}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="sales-email" style={labelStyle}>WORK EMAIL *</label>
                <input
                  id="sales-email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  maxLength={254}
                  style={inputStyle('email')}
                />
              </div>

              {/* Details */}
              <div>
                <label htmlFor="sales-details" style={labelStyle}>ANYTHING WE SHOULD KNOW?</label>
                <textarea
                  id="sales-details"
                  rows={3}
                  value={form.details}
                  onChange={e => setForm(f => ({ ...f, details: e.target.value }))}
                  onFocus={() => setFocused('details')}
                  onBlur={() => setFocused(null)}
                  placeholder="Questions, the data sources you use, what you'd like the demo to cover..."
                  maxLength={2000}
                  style={inputStyle('details')}
                />
              </div>
            </div>

            {/* Honeypot. Off-screen rather than display:none — bots that skip
                hidden fields still see this one, and no human can reach it: out of
                the tab order and hidden from assistive tech. */}
            <input
              ref={honeypotRef}
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
            />

            {error && (
              <div
                role="alert"
                aria-live="assertive"
                style={{
                  marginTop: 'var(--ins-size-4)', padding: '9px 12px',
                  borderRadius: 'var(--ins-radius-8)',
                  background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.28)',
                  fontSize: 'var(--ins-font-size-13)', color: '#F87171', lineHeight: 1.5,
                }}
              >
                {error}
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'var(--ins-size-6)' }}>
              <button
                onClick={close}
                style={{
                  flex: 1, padding: '11px', borderRadius: '9px',
                  background: 'var(--ins-color-white-a-05)', border: '1px solid var(--ins-color-white-a-08)',
                  color: 'var(--ins-text-body)', fontSize: 'var(--ins-font-size-14)', fontWeight: 500,
                  fontFamily: 'inherit', cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--ins-color-white-a-08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--ins-color-white-a-05)'}
              >Cancel</button>
              <button
                onClick={submit}
                disabled={!ready || sending}
                aria-busy={sending}
                style={{
                  flex: 2, padding: '11px', borderRadius: '9px',
                  background: ready && !sending ? 'var(--ins-button-primary-bg)' : 'rgba(9,160,157,.18)',
                  border: 'none',
                  color: ready && !sending ? 'var(--ins-text-heading)' : 'var(--ins-color-teal-a-40)',
                  fontSize: 'var(--ins-font-size-14)', fontWeight: 600,
                  fontFamily: 'inherit', cursor: ready && !sending ? 'pointer' : 'default',
                  transition: 'background .18s, color .18s',
                }}
                onMouseEnter={e => { if (ready && !sending) e.currentTarget.style.background = 'var(--ins-button-primary-bg-hover)'; }}
                onMouseLeave={e => { if (ready && !sending) e.currentTarget.style.background = 'var(--ins-button-primary-bg)'; }}
              >{sending ? 'Sending…' : 'Request a demo'}</button>
            </div>

            <div style={{ fontSize: 'var(--ins-font-size-12)', color: 'var(--ins-text-disabled)', textAlign: 'center', marginTop: 'var(--ins-size-4)' }}>
              Or email us at <a href={`mailto:${SALES_EMAIL}`} style={{ color: 'var(--ins-text-highlight)' }}>{SALES_EMAIL}</a>
            </div>
          </>
        ) : (
          /* Success */
          <div style={{ textAlign: 'center', padding: '16px 0' }} role="status" aria-live="polite">
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: 'var(--ins-color-teal-a-10)', border: '1px solid rgba(14,196,193,0.22)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', color: 'var(--ins-text-highlight)',
            }}>
              <CheckIcon size={22} color="currentColor" strokeWidth={2} />
            </div>
            <div style={{ fontSize: 'var(--ins-font-size-17)', fontWeight: 700, color: 'var(--ins-color-gray-100)', marginBottom: 'var(--ins-size-2)' }}>Request received</div>
            <div style={{ fontSize: 'var(--ins-font-size-14)', color: 'var(--ins-text-body)', lineHeight: 1.6, marginBottom: 'var(--ins-size-7)' }}>
              Thanks — we'll be in touch shortly to arrange a demo tailored to your team.
            </div>
            <button
              onClick={close}
              style={{
                padding: '10px 28px', borderRadius: '9px',
                background: 'var(--ins-color-white-a-06)', border: '1px solid var(--ins-color-white-a-10)',
                color: 'var(--ins-color-gray-100)', fontSize: 'var(--ins-font-size-14)', fontWeight: 500,
                fontFamily: 'inherit', cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--ins-color-white-a-10)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--ins-color-white-a-06)'}
            >Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalesEnquiryModal;
