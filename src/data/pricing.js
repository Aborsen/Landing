/*
 * Single source of truth for plan pricing.
 *
 * Annual billing is 20% off the standard rate, and the 50% launch discount then applies
 * on top of whichever rate you are on:
 *
 *   cycle    standard          launch price        annual total
 *   monthly  $19.99 / $39.99   $9.99  / $19.99     —
 *   yearly   $15.99 / $31.99   $7.99  / $15.99     $95.88 / $191.88
 *
 * Both figures are stated explicitly per cycle rather than derived. These are marketing
 * price points that all end in .99, and deriving them does not land on that
 * (19.99 × 0.8 × 0.5 = 7.996, which rounds to $8.00). A formula would need fudging.
 *
 * Consumed by the /pricing cards, the /pricing comparison table and the home-page
 * pricing section, so the two can never
 * disagree — they previously carried separate hard-coded copies and drifted apart.
 */

export const LAUNCH_BADGE = '50% OFF';

export const BILLING_CYCLES = [
  { value: 'yearly', label: 'Yearly' },
  { value: 'monthly', label: 'Monthly' },
];

// Yearly leads: it is the first segment in the toggle and the price we quote.
export const DEFAULT_CYCLE = 'yearly';

export const PLANS = [
  {
    name: 'Free',
    tag: 'For getting started',
    free: true,
    cta: 'Start for free',
    ctaStyle: 'outline',
    features: [
      '500 AI tokens / month',
      '1 data connector',
      'Built-in Metrics',
      'Community support',
    ],
    // terse forms of the same facts, for the comparison table on /pricing
    limits: { tokens: '500 / mo', connectors: '1', support: 'Community' },
  },
  {
    name: 'Starter',
    tag: 'For small teams',
    monthly: { price: 9.99, standard: 19.99 },
    yearly: { price: 7.99, standard: 15.99 },
    cta: 'Start for free',
    ctaStyle: 'outline',
    features: [
      '5,000 AI tokens / month',
      'Up to 10 data connectors',
      'Built-in + Custom Metrics',
      'Standard support',
    ],
    limits: { tokens: '5,000 / mo', connectors: 'Up to 10', support: 'Standard' },
  },
  {
    name: 'Pro',
    tag: 'For growing teams',
    monthly: { price: 19.99, standard: 39.99 },
    yearly: { price: 15.99, standard: 31.99 },
    cta: 'Start for free',
    ctaStyle: 'primary',
    highlight: true,
    features: [
      '15,000 AI tokens / month',
      'Unlimited data connectors',
      'Built-in + Custom Metrics',
      'Priority Support',
    ],
    limits: { tokens: '15,000 / mo', connectors: 'Unlimited', support: 'Priority' },
  },
];

/** The rate for a plan on a cycle. Undefined for Free, which has no rates. */
export const rateFor = (plan, cycle) => plan[cycle];

/** Launch price shown as the headline figure. */
export const priceFor = (plan, cycle) => rateFor(plan, cycle).price;

/** Standard rate for the same cycle — the struck-through figure. */
export const standardFor = (plan, cycle) => rateFor(plan, cycle).standard;

/** Annual total derived from the displayed per-month figure, so the maths on screen adds up. */
export const yearlyTotalFor = (plan) => Math.round(priceFor(plan, 'yearly') * 12 * 100) / 100;

/** Free is free on both cycles — only paid plans carry the launch badge. */
export const badgeFor = (plan) => (plan.free ? null : LAUNCH_BADGE);
