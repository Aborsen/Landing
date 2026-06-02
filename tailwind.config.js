export default {
  content: [
    './index.html',
    './src/**/*.{jsx,js}',
    './Platform/**/*.html',
    './Solutions/**/*.html',
    './Pricing.html',
    './Resources/**/*.html',
    './Company/**/*.html',
    './Security/**/*.html',
    './blog/**/*.html',
    './docs/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        card:             'var(--ins-surface-card)',
        'card-border':    'var(--ins-border-default)',
        'surface-hover':  'var(--ins-surface-hover)',
        'surface-navbar': 'var(--ins-surface-navbar-glass)',
        teal:             { DEFAULT: 'var(--ins-button-primary-bg)',
                            hover:   'var(--ins-button-primary-bg-hover)' },
        'text-primary':   'var(--ins-text-heading)',
        'text-secondary': 'var(--ins-text-body)',
        'text-muted':     'var(--ins-text-inactive)',
        'text-disabled':  'var(--ins-text-disabled)',
        'text-highlight': 'var(--ins-text-highlight)',
        'border-strong':  'var(--ins-border-strong)',
        'border-hover':   'var(--ins-border-hover)',
        'border-focus':   'var(--ins-border-focus)',
        'button-primary':       'var(--ins-button-primary-bg)',
        'button-primary-hover': 'var(--ins-button-primary-bg-hover)',
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
