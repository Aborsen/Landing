export default {
  content: ['./index.html', './src/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        base:             'var(--ins-surface-page)',
        card:             'var(--ins-surface-card)',
        'card-border':    'var(--ins-border-default)',
        teal:             { DEFAULT: 'var(--ins-button-primary-bg)',
                            hover:   'var(--ins-button-primary-bg-hover)' },
        'text-primary':   'var(--ins-text-heading)',
        'text-secondary': 'var(--ins-text-body)',
        'text-muted':     'var(--ins-text-inactive)',
        success:          'var(--ins-status-success-fg)',
        danger:           'var(--ins-status-error-fg)',
        warning:          'var(--ins-status-warning-fg)',
      },
      fontFamily: { body: ['Geist', 'system-ui', 'sans-serif'] },
      borderRadius: { card: 'var(--ins-radius-card)',
                      btn:  'var(--ins-radius-lg)',
                      pill: 'var(--ins-radius-pill)' },
    }
  }
}
