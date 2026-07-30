import React from 'react';
import CheckIcon from './CheckIcon';

/**
 * SupportTicketModal — the support-ticket dialog, shared by the pages that offer
 * one: /resources/contact-support and /company/contacts.
 *
 * Extracted so both pages open the SAME form. Before this, contacts.jsx had its
 * own support dialog that composed a mailto: link, which meant two different
 * "open a support ticket" experiences and only one of them reaching Zoho.
 *
 * Posts to /api/contact-support, which forwards to the Zoho support form
 * server-side — the browser never sees the Zoho URL, because that endpoint takes
 * unauthenticated writes. See server/contact-support.js for the reasoning and
 * for why attachments are names-only today.
 *
 * Props
 *  open      boolean — renders nothing when false, so a closed dialog costs a
 *                      prerendered page nothing and hydration has nothing to
 *                      reconcile
 *  onClose   () => void
 */

/* Module scope: this list is constant, and rebuilding six objects with inline SVG
   on every render of every page that mounts the dialog is waste. */
const CATEGORIES = [
    {
      id: 'general', label: 'General Question', color: 'var(--ins-text-highlight)',
      subjectPlaceholder: 'e.g. How do I export a report as PDF?...',
      descLabel: 'DETAILS', descPlaceholder: 'Any additional context...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    },
    {
      id: 'bug', label: 'Report a Bug', color: '#EF4444',
      subjectPlaceholder: 'e.g. Chart not loading on Reports page...',
      descLabel: 'STEPS TO REPRODUCE', descPlaceholder: '1. Go to Reports tab\n2. Click Export\n3. See error...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    },
    {
      id: 'billing', label: 'Billing & Account', color: '#818CF8',
      subjectPlaceholder: 'e.g. I was charged twice this month...',
      descLabel: 'DETAILS', descPlaceholder: 'Any additional context...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    },
    {
      id: 'connection', label: 'Data Connections', color: '#14A8B9',
      subjectPlaceholder: 'e.g. My Salesforce connection keeps failing...',
      descLabel: 'DETAILS', descPlaceholder: 'Any additional context...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
    },
    {
      id: 'feature', label: 'Feature Request', color: '#F97316',
      subjectPlaceholder: "e.g. I'd love to see scheduled email reports...",
      descLabel: 'TELL US MORE', descPlaceholder: 'Describe the feature and why it matters to you...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    },
    {
      id: 'other', label: 'Other', color: '#6B7280',
      subjectPlaceholder: 'e.g. Brief description of your request...',
      descLabel: 'DETAILS', descPlaceholder: 'Any additional context...',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
    },
];

function SupportTicketModal({ open, onClose }) {
  const [step, setStep] = React.useState('form');
  const [form, setForm] = React.useState({ category: 'general', title: '', desc: '', email: '' });
  const [focused, setFocused] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const [dragOver, setDragOver] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');
  const fileRef = React.useRef(null);
  const honeypotRef = React.useRef(null);
  /* When the dialog opened. Only the elapsed difference is sent — a wall-clock
     time would be both useless to us and correlatable. */
  const openedAtRef = React.useRef(0);

  const cat = CATEGORIES.find(c => c.id === form.category);

  const addFiles = (incoming) => {
    const arr = Array.from(incoming).filter(f => f.size < 10 * 1024 * 1024);
    setFiles(prev => {
      const names = new Set(prev.map(f => f.name));
      return [...prev, ...arr.filter(f => !names.has(f.name))].slice(0, 5);
    });
  };
  const removeFile = (name) => setFiles(f => f.filter(x => x.name !== name));
  const fmt = (b) => b < 1024 * 1024 ? `${(b/1024).toFixed(0)} KB` : `${(b/1024/1024).toFixed(1)} MB`;

  const close = () => {
    onClose();
    setTimeout(() => {
      setStep('form');
      setForm({ category: 'general', title: '', desc: '', email: '' });
      setFiles([]);
      setError('');
      setSending(false);
      if (honeypotRef.current) honeypotRef.current.value = '';
    }, 300);
  };

  /* Posts to /api/contact-support, which forwards to the Zoho support form
     server-side. The browser never sees the Zoho URL: that endpoint takes
     unauthenticated writes, so shipping it in the bundle would hand anyone a
     spam funnel. See server/contact-support.js.
     This used to be `setStep('done')` and nothing else — the success screen
     appeared while the ticket went nowhere. */
  const ERROR_COPY = {
    length: 'That is longer than the form accepts. Please shorten it and try again.',
    email: 'That email address does not look right.',
    rate: 'That is several tickets in quick succession. Please try again in a few minutes.',
    invalid: 'Something in the form was rejected. Please check it and try again.',
  };

  const submit = async () => {
    if (sending) return;
    if (!form.title.trim()) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/contact-support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: form.category,
          subject: form.title,
          details: form.desc,
          email: form.email,
          /* Names only. The bytes cannot be forwarded yet — Zoho's FileUpload
             field wants a path from a separate, browser-session-authenticated
             upload channel. The names ride along in Details so the choice is not
             silently dropped and support knows to ask for the files. */
          fileNames: files.map((f) => f.name),
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


  /* Stamp the open time here rather than in each page's trigger — the timing
     check must work identically wherever the dialog is mounted. */
  React.useEffect(() => {
    if (open) openedAtRef.current = Date.now();
  }, [open]);

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
              onMouseEnter={e => e.currentTarget.style.color = 'var(--ins-color-gray-100)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--ins-text-disabled)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
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
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--ins-font-size-16)', fontWeight: 700, color: 'var(--ins-color-gray-100)' }}>Contact Support</div>
                    <div style={{ fontSize: 'var(--ins-font-size-14)', color: 'var(--ins-text-body)', marginTop: 'var(--ins-size-half)' }}>We'll get back to you as soon as possible.</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ins-size-4)' }}>

                  {/* Category pills */}
                  <div>
                    <label style={{ fontSize: 'var(--ins-font-size-12)', fontWeight: 600, color: '#9BBAC5', letterSpacing: '.04em', display: 'block', marginBottom: 'var(--ins-size-2)' }}>CATEGORY</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {CATEGORIES.map(c => {
                        const active = form.category === c.id;
                        return (
                          <button
                            key={c.id}
                            onClick={() => setForm(f => ({ ...f, category: c.id, title: '', desc: '' }))}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '5px',
                              padding: '5px 12px', borderRadius: '999px',
                              background: active ? `rgba(${c.id === 'bug' ? '239,68,68' : c.id === 'billing' ? '129,140,248' : c.id === 'connection' ? '20,168,185' : c.id === 'feature' ? '249,115,22' : c.id === 'other' ? '107,114,128' : '14,196,193'},0.12)` : 'var(--ins-color-white-a-04)',
                              border: active ? `1px solid ${c.color}44` : '1px solid var(--ins-color-white-a-07)',
                              color: active ? c.color : 'var(--ins-text-body)',
                              fontSize: 'var(--ins-font-size-12)', fontWeight: active ? 600 : 400,
                              fontFamily: 'inherit', cursor: 'pointer',
                              transition: 'all .15s',
                            }}
                            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(255,255,255,.14)'; e.currentTarget.style.color = '#C8E6EA'; } }}
                            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'var(--ins-color-white-a-07)'; e.currentTarget.style.color = 'var(--ins-text-body)'; } }}
                          >
                            <span style={{ lineHeight: 0 }}>{c.icon}</span>
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={{ fontSize: 'var(--ins-font-size-12)', fontWeight: 600, color: '#9BBAC5', letterSpacing: '.04em', display: 'block', marginBottom: '6px' }}>SUBJECT *</label>
                    <input
                      value={form.title}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      onFocus={() => setFocused('title')}
                      onBlur={() => setFocused(null)}
                      placeholder={cat.subjectPlaceholder}
                      style={inputStyle('title')}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{ fontSize: 'var(--ins-font-size-12)', fontWeight: 600, color: '#9BBAC5', letterSpacing: '.04em', display: 'block', marginBottom: '6px' }}>{cat.descLabel}</label>
                    <textarea
                      rows={3}
                      value={form.desc}
                      onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                      onFocus={() => setFocused('desc')}
                      onBlur={() => setFocused(null)}
                      placeholder={cat.descPlaceholder}
                      style={{ ...inputStyle('desc') }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ fontSize: 'var(--ins-font-size-12)', fontWeight: 600, color: '#9BBAC5', letterSpacing: '.04em', display: 'block', marginBottom: '6px' }}>YOUR EMAIL <span style={{ color: 'var(--ins-text-disabled)', fontWeight: 400 }}>(optional, for follow-up)</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="you@company.com..."
                      style={inputStyle('email')}
                    />
                  </div>

                  {/* Attachments */}
                  <div>
                    <label style={{ fontSize: 'var(--ins-font-size-12)', fontWeight: 600, color: '#9BBAC5', letterSpacing: '.04em', display: 'block', marginBottom: '6px' }}>ATTACHMENTS <span style={{ color: 'var(--ins-text-disabled)', fontWeight: 400 }}>(up to 5 files, 10 MB each)</span></label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={e => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                      style={{
                        border: dragOver ? '1px dashed rgba(9,160,157,.6)' : '1px dashed var(--ins-color-white-a-12)',
                        borderRadius: '10px', padding: 'var(--ins-size-4)',
                        background: dragOver ? 'rgba(9,160,157,.06)' : 'var(--ins-color-white-a-02)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                        cursor: 'pointer', transition: 'border-color .18s, background .18s',
                      }}
                      onMouseEnter={e => { if (!dragOver) e.currentTarget.style.borderColor = 'rgba(255,255,255,.22)'; }}
                      onMouseLeave={e => { if (!dragOver) e.currentTarget.style.borderColor = 'var(--ins-color-white-a-12)'; }}
                    >
                      <input ref={fileRef} type="file" multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-disabled)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                      </svg>
                      <span style={{ fontSize: 'var(--ins-font-size-14)', color: 'var(--ins-text-disabled)' }}>
                        {dragOver ? 'Drop files here' : 'Click or drag files to attach'}
                      </span>
                    </div>
                    {files.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'var(--ins-size-2)' }}>
                        {files.map(f => (
                          <div key={f.name} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--ins-size-2)',
                            background: 'var(--ins-color-white-a-04)', border: '1px solid var(--ins-color-white-a-07)',
                            borderRadius: 'var(--ins-radius-8)', padding: '7px 10px',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ins-size-2)', minWidth: 0 }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-disabled)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>
                              </svg>
                              <span style={{ fontSize: 'var(--ins-font-size-14)', color: '#9BBAC5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                              <span style={{ fontSize: 'var(--ins-font-size-11)', color: 'var(--ins-text-disabled)', flexShrink: 0 }}>{fmt(f.size)}</span>
                            </div>
                            <button
                              onClick={() => removeFile(f.name)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ins-text-disabled)', padding: 'var(--ins-size-half)', display: 'flex', flexShrink: 0 }}
                              onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                              onMouseLeave={e => e.currentTarget.style.color = 'var(--ins-text-disabled)'}
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Honeypot. Off-screen rather than display:none — bots that skip
                    hidden fields still see this one, and no human can reach it:
                    out of the tab order and hidden from assistive tech. */}
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
                    disabled={!form.title.trim() || sending}
                    aria-busy={sending}
                    style={{
                      flex: 2, padding: '11px', borderRadius: '9px',
                      background: form.title.trim() && !sending ? 'var(--ins-button-primary-bg)' : 'rgba(9,160,157,.18)',
                      border: 'none',
                      color: form.title.trim() && !sending ? 'var(--ins-text-heading)' : 'var(--ins-color-teal-a-40)',
                      fontSize: 'var(--ins-font-size-14)', fontWeight: 600,
                      fontFamily: 'inherit', cursor: form.title.trim() && !sending ? 'pointer' : 'default',
                      transition: 'background .18s, color .18s',
                    }}
                    onMouseEnter={e => { if (form.title.trim() && !sending) e.currentTarget.style.background = 'var(--ins-button-primary-bg-hover)'; }}
                    onMouseLeave={e => { if (form.title.trim() && !sending) e.currentTarget.style.background = 'var(--ins-button-primary-bg)'; }}
                  >{sending ? 'Sending…' : 'Submit Request'}</button>
                </div>
              </>
            ) : (
              /* Success */
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'var(--ins-color-teal-a-10)', border: '1px solid rgba(14,196,193,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px', color: 'var(--ins-text-highlight)',
                }}>
                  <CheckIcon size={22} color="currentColor" strokeWidth={2} />
                </div>
                <div style={{ fontSize: 'var(--ins-font-size-17)', fontWeight: 700, color: 'var(--ins-color-gray-100)', marginBottom: 'var(--ins-size-2)' }}>Request submitted</div>
                <div style={{ fontSize: 'var(--ins-font-size-14)', color: 'var(--ins-text-body)', lineHeight: 1.6, marginBottom: 'var(--ins-size-7)' }}>
                  Thanks for reaching out. Our team will review your request and follow up shortly.
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

export default SupportTicketModal;
