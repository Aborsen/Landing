import React, { useState, useEffect, useId, useRef } from 'react';
import Button from './Button';
import Input from './Input';

/**
 * RequestConnectorModal — one field, one button, one thank-you.
 *
 * Posts to /api/request-connector, which forwards to the Zoho form server-side.
 * The browser never sees the Zoho URL: the endpoint it hides accepts
 * unauthenticated writes, so publishing it in the bundle would hand anyone a
 * spam funnel. See server/request-connector.js for the reasoning.
 *
 * The path stays relative so it survives a change of host — keep
 * /api/request-connector mapped to the function wherever the site lands next.
 *
 * Dialog mechanics here — focus trap, Escape, scroll lock, focus return — are the
 * fullest of the three dialogs. SupportTicketModal and SalesEnquiryModal came from
 * a hand-styled page component and still lack the trap and the Escape handler;
 * this is the shape to converge on, not the other way round.
 */

const ENDPOINT = '/api/request-connector';
const SUPPORT_EMAIL = 'support@insightis.io';
const MAX_LEN = 80;

/* The endpoint answers with a short machine code, never a sentence — copy lives
   here so the server can stay silent about its internals. Anything unmapped
   (unavailable, upstream, origin, server) falls through to GENERIC: a visitor
   cannot act on the difference between "our env var is missing" and "Zoho timed
   out", but they can act on an email address. */
const ERROR_COPY = {
  length: `Please keep the name between 2 and ${MAX_LEN} characters.`,
  invalid: 'Plain text only, please — no links or markup.',
  rate: 'That is several requests in quick succession. Please try again in a few minutes.',
};
const GENERIC = 'We could not send that just now.';

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
);

function RequestConnectorModal({ open, onClose }) {
  const titleId = useId();
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');
  const [sentName, setSentName] = useState('');

  const dialogRef = useRef(null);
  const honeypotRef = useRef(null);
  const returnFocusRef = useRef(null);
  /* When the dialog opened, used to prove a human spent time here. Never sent as
     a wall-clock time — only the difference — so no clock skew and nothing to
     correlate a visitor against. */
  const openedAtRef = useRef(0);

  /* onClose is a fresh arrow on every parent render; held in a ref so the effect
     below keys off `open` alone and a re-render cannot wipe a half-typed name. */
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  /* Input is a plain function component, so it cannot hold a ref — the field is
     reached through the dialog instead. Same constraint contacts.jsx notes for
     Button. */
  const field = () => dialogRef.current?.querySelector('input[name="connector"]');

  useEffect(() => {
    if (!open) return undefined;

    setValue('');
    setStatus('idle');
    setError('');
    setSentName('');
    if (honeypotRef.current) honeypotRef.current.value = '';
    openedAtRef.current = Date.now();

    returnFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => { if (e.key === 'Escape') onCloseRef.current(); };
    document.addEventListener('keydown', onKeyDown);
    /* Focus the field, not the dialog: this form is one input, so putting the
       caret where the visitor must type saves a keystroke and announces the
       labelled field to a screen reader. */
    const focusTimer = window.setTimeout(() => { field()?.focus(); }, 0);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = '';
      const trigger = returnFocusRef.current;
      if (trigger && typeof trigger.focus === 'function') trigger.focus();
    };
  }, [open]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const name = value.replace(/\s+/g, ' ').trim();
    if (name.length < 2) {
      setStatus('error');
      setError('Please enter the connector name.');
      field()?.focus();
      return;
    }

    setStatus('sending');
    setError('');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
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
        setSentName(name);
        setStatus('done');
        return;
      }

      setStatus('error');
      setError(ERROR_COPY[payload && payload.error] || GENERIC);
    } catch {
      /* Offline, DNS, or a blocked request — the visitor's name is still in the
         field, so retrying costs them nothing. */
      setStatus('error');
      setError(GENERIC);
    }
  };

  /* Keep Tab inside the dialog. The honeypot carries tabIndex -1 and is excluded
     here too, or Shift+Tab would park focus on an invisible field. */
  const trapTab = (e) => {
    if (e.key !== 'Tab') return;
    const nodes = dialogRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled])'
    );
    if (!nodes || nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  const sending = status === 'sending';

  return (
    <div className="ins-modal" onClick={onClose} role="presentation">
      <div
        ref={dialogRef}
        className="ins-modal__dialog ins-modal--sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapTab}
        tabIndex={-1}
        style={{ position: 'relative', maxWidth: '480px' }}
      >
        <Button
          variant="icon"
          size="sm"
          aria-label="Close dialog"
          onClick={onClose}
          style={{ position: 'absolute', top: 'var(--ins-space-md)', right: 'var(--ins-space-md)', zIndex: 1 }}
        >
          <CloseIcon />
        </Button>

        <div className="ins-modal__body" style={{ textAlign: 'center' }}>
          {status === 'done' ? (
            /* The whole form is replaced rather than annotated: there is nothing
               left to do here, and a lingering field invites a second submit. */
            <div role="status" aria-live="polite">
              <span
                className="ins-text--success"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '48px', height: '48px', borderRadius: '50%',
                  border: '1px solid var(--ins-border-default)',
                  background: 'var(--ins-surface-brand-tint)',
                  marginBottom: 'var(--ins-size-5)',
                }}
              >
                <CheckIcon />
              </span>
              <h2 id={titleId} className="ins-text-h1" style={{ marginBottom: 'var(--ins-size-2)' }}>
                Thanks — request received
              </h2>
              <p className="ins-text-body ins-text--muted" style={{ marginBottom: 'var(--ins-size-6)' }}>
                We logged your request for <strong style={{ color: 'var(--ins-text-heading)' }}>{sentName}</strong>. Connectors are
                prioritised by how often they are asked for, so this counts.
              </p>
              <Button variant="secondary" size="md" radius="lg" onClick={onClose}>
                Close
              </Button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 'var(--ins-size-6)' }}>
                <span className="ins-eyebrow ins-eyebrow--pill ins-eyebrow--center">
                  Connector request
                </span>
                <h2 id={titleId} className="ins-text-h1" style={{ marginTop: 'var(--ins-size-4)' }}>
                  Request a connector
                </h2>
                <p className="ins-text-body ins-text--muted" style={{ marginTop: 'var(--ins-size-2)' }}>
                  Tell us which data source you need and we will add it to the queue.
                </p>
              </div>

              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ins-size-4)', textAlign: 'center' }} noValidate>
                <div>
                  <Input
                    label="Connector name"
                    name="connector"
                    type="text"
                    placeholder="e.g. Pipedrive"
                    autoComplete="off"
                    maxLength={MAX_LEN}
                    required
                    error={status === 'error'}
                    aria-describedby={status === 'error' ? `${titleId}-err` : undefined}
                    value={value}
                    onChange={(e) => { setValue(e.target.value); if (status === 'error') { setStatus('idle'); setError(''); } }}
                    disabled={sending}
                    style={{ textAlign: 'left' }}
                  />
                </div>

                {/* Honeypot. Off-screen rather than display:none — bots that skip
                    hidden fields still see this one, and no human can reach it:
                    it is out of the tab order and hidden from assistive tech. */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />

                <Button type="submit" variant="primary" size="md" radius="lg" className="w-full" loading={sending} disabled={sending}>
                  {sending ? 'Sending' : 'Send'}
                </Button>

                {/* Kept mounted so a screen reader announces the change rather
                    than a new region appearing. */}
                <p
                  id={`${titleId}-err`}
                  className="ins-text-body-sm"
                  style={{ color: 'var(--ins-text-danger, #f87171)', minHeight: '1.25em' }}
                  role="alert"
                  aria-live="assertive"
                >
                  {status === 'error' ? error : ''}
                </p>

                <p className="ins-text-body-sm ins-text--muted ins-text--mono">
                  Or email us at <a className="ins-link--inline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestConnectorModal;
