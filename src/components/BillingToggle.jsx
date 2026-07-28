import React from 'react';
import { BILLING_CYCLES } from '../data/pricing';

/*
 * Yearly / Monthly segmented control. Shared by the /pricing cards and the home-page
 * pricing section so both surfaces switch cycles the same way.
 */
export default function BillingToggle({ cycle, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Billing cycle"
      style={{
        display: 'inline-flex',
        padding: 'var(--ins-size-1)',
        background: 'var(--ins-surface-card)',
        border: '1px solid var(--ins-border-default)',
        borderRadius: '999px',
        gap: 'var(--ins-size-1)',
      }}
    >
      {BILLING_CYCLES.map(({ value, label }) => {
        const active = cycle === value;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(value)}
            style={{
              padding: '9px 18px',
              borderRadius: '999px',
              border: 'none',
              background: active ? 'var(--ins-surface-elevated)' : 'transparent',
              color: active ? 'var(--ins-text-heading)' : 'var(--ins-text-body)',
              fontSize: 'var(--ins-font-size-14)',
              fontWeight: 500,
              fontFamily: 'var(--ins-font-family-sans)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--ins-size-2)',
              transition: 'background-color 180ms, color 180ms',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
