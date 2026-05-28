# Insightis shared component library

Fourteen DS-compliant React components that cover every recurring pattern across the Insightis landing site. Built incrementally across PRs 0–13. Each component is a **styling shell** — all text content (labels, headings, body copy, items) comes from the call site, never from the component.

**Three rules that govern this library:**
1. **Canonical recipe per variant.** Every component picks one teal gradient, one radius, one shadow, one type scale. Changing it in one place propagates everywhere.
2. **Text preservation per page.** Components supply layout, sizing, and color; the call site supplies every word. Two pages using the same component on the same section can — and usually do — show entirely different text.
3. **One PR = one component = one visual change.** A regression in any single component can be reverted independently without touching the rest of the library.

---

## Table of contents

**Tier A — Layout atoms** (PR 1)
- [`<Section>`](#section)
- [`<SectionHeader>`](#sectionheader)
- [`<IconBadge>`](#iconbadge)

**Tier B — DS primitives** (pre-existing, migrated in PRs 2–5)
- [`<Button>`](#button)
- [`<Card>`](#card)
- [`<Chip>`](#chip)
- [`<Input>`](#input)

**Tier C — Molecules** (PR 6)
- [`<CodeChip>`](#codechip)

**Tier D — Organisms** (PRs 7–12)
- [`<BottomCTA>`](#bottomcta)
- [`<FAQAccordion>`](#faqaccordion)
- [`<PainPointGrid>`](#painpointgrid)
- [`<ComparisonCards>`](#comparisoncards)
- [`<StepsProcess>`](#stepsprocess)
- [`<TestimonialCard>`](#testimonialcard)

---

## When to use which

| You need to render… | Use |
|---|---|
| The outer `<section>` wrapper with padding and max-width container | `<Section>` |
| Eyebrow pill + h2 + lede triplet above any section | `<SectionHeader>` |
| A small circular icon container (red ✕, teal ✓, numbered step, etc.) | `<IconBadge>` |
| A clickable primary/secondary/ghost/icon/link CTA | `<Button>` |
| A bordered card surface (feature, pricing tier, metric tile, glow panel) | `<Card>` |
| A small inline pill (status badge, filter chip, dot label) | `<Chip>` |
| A text input or textarea with a label | `<Input>` |
| A dark mono query/response box or single-line italic example | `<CodeChip>` |
| The bottom-of-page CTA section (form input + button, or button pair, or single CTA) | `<BottomCTA>` |
| FAQ list with chevron-toggle accordion behavior + FAQPage JSON-LD | `<FAQAccordion>` |
| 2×3 grid of "the problem" cards with red ✕ icons | `<PainPointGrid>` |
| Side-by-side "Before / After" checklist with ✕ and ✓ marks | `<ComparisonCards>` |
| Numbered horizontal process (01 → 02 → 03 → 04) with connector lines | `<StepsProcess>` |
| A customer-quote card with name/role/company or stars/avatar | `<TestimonialCard>` |

---

## Tier A — Layout atoms

### `<Section>`

Section wrapper that tokenizes the `py-* max-w-7xl mx-auto px-6` pattern repeated 30+ times across the site.

```jsx
import Section from './Section';

<Section padding="lg" container="7xl" tone="default">
  ...
</Section>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `padding` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'lg'` | Vertical padding tier (48 / 64 / 80 / 96 px on mobile; bumps on desktop) |
| `container` | `'5xl' \| '6xl' \| '7xl'` | `'7xl'` | Inner max-width: 1024 / 1152 / **1280** px |
| `tone` | `'default' \| 'tint' \| 'dark'` | `'default'` | Background treatment. `tint` = subtle teal radial-glow; `dark` = deeper surface |
| `as` | tag name | `'section'` | Element to render |
| `innerClassName` | string | — | Extra classes on the `<div class="ins-section__inner">` container |

Renders `<section class="ins-section ins-section--{padding} ins-section--container-{container} ins-section--{tone}"><div class="ins-section__inner">{children}</div></section>`.

---

### `<SectionHeader>`

Eyebrow pill + heading + optional lede paragraph. Replaces the 22+ hand-rolled trios that recurred across pages.

```jsx
import SectionHeader from './SectionHeader';

<SectionHeader
  eyebrow="Architecture"
  title="The semantic intelligence layer"
  lede="Bring all your data sources..."
  sparkle
  size="lg"
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `eyebrow` | string | — | Small uppercase label rendered above the heading |
| `title` | string \| ReactNode | required | The heading. Pass JSX (`<>…<span>…</span>…</>`) for inline highlight spans |
| `lede` | string | — | Optional paragraph below the heading |
| `align` | `'center' \| 'left'` | `'center'` | Header alignment |
| `size` | `'md' \| 'lg'` | `'md'` | Both render at `.ins-text-display` (36/48 px); `lg` adds slightly tighter letter-spacing for hero-prominence sections |
| `as` | `'h1' \| 'h2' \| 'h3'` | `'h2'` | Heading level — use `h1` only for page hero |
| `sparkle` | boolean | `false` | Prefix the eyebrow with the `✦` sparkle icon |
| `eyebrowVariant` | `'pill' \| 'plain'` | `'pill'` | Pill outline around the eyebrow |

---

### `<IconBadge>`

Circular tinted icon container — used by `<PainPointGrid>`, `<ComparisonCards>`, `<StepsProcess>`, feature cards.

```jsx
import IconBadge from './IconBadge';

<IconBadge tone="red" size="sm" icon={<XIcon />} />
<IconBadge tone="teal" size="md" icon={<CheckIcon />} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `tone` | `'teal' \| 'red' \| 'amber' \| 'green' \| 'purple' \| 'neutral'` | `'neutral'` | Tint family (bg + border + icon color) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 30 / 40 / 52 / 64 px diameter |
| `icon` | ReactNode | — | The icon or text content inside |

If `aria-label` is not provided, the badge is decorative (`aria-hidden="true"`).

---

## Tier B — DS primitives

These components existed before the shared-lib refactor and are already DS-compliant. PRs 2–5 migrated 60+ hand-rolled call sites onto them.

### `<Button>`

```jsx
import Button from './Button';

<Button as="a" href="/auth/sign-up/" variant="primary" size="md" iconEnd={<ArrowRightIcon />}>
  Start for free
</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'icon' \| 'link'` | `'primary'` | |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Heights: 32 / 40 / 48 px |
| `as` | `'button' \| 'a'` | `'button'` | |
| `radius` | `'sm' \| 'md' \| 'lg' \| 'pill'` | `'pill'` (default class) | Override the default pill radius |
| `loading` | boolean | `false` | Show spinner, preserve width |
| `iconStart` / `iconEnd` | ReactNode | — | Slotted icons before/after label |
| `disabled` | boolean | `false` | Also sets `aria-disabled` on anchors |

**Canonical primary recipe:** teal-600 solid background, teal-650 on hover with brand-glow shadow (`var(--ins-button-primary-shadow-hover)`), pill radius.

---

### `<Card>`

```jsx
import Card from './Card';

<Card variant="pricing" selected={isHighlighted}>...</Card>
<Card variant="glow">...</Card>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'feature' \| 'pricing' \| 'accent' \| 'glow' \| 'metric' \| 'connector'` | `'default'` | |
| `interactive` | boolean | `false` | Cursor pointer + focus ring + hover lift |
| `selected` | boolean | `false` | Brand-tinted border + bg (e.g., highlighted pricing tier) |
| `as` | tag name | `'div'` | |

`variant="glow"` adds a brand-tinted background + top brand-glow line via `::before` pseudo-element. To pick a theme, append a DS modifier class via `className`:

- `className="ins-card--glow--brand"` — teal brand-tint + brand glow shadow (default visual for AI responses, branded callouts)
- `className="ins-card--glow--error"` — red error-tint + red border + red glow shadow (negative outcomes, warnings, drops)

Do NOT use inline `style={{background:..., borderColor:...}}` overrides — the DS modifiers carry the canonical bg + border + shadow + top gradient-line all together.

---

### `<Chip>`

```jsx
import Chip from './Chip';

<Chip variant="brand" dot dotPulse>Insightis</Chip>
<Chip variant="error" dot>Generic AI</Chip>
<Chip as="button" variant="brand" aria-pressed={isActive} onClick={...}>Filter</Chip>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'success' \| 'warning' \| 'error' \| 'info' \| 'planned' \| 'shipped' \| 'brand' \| 'count' \| 'trend' \| 'neutral'` | `'neutral'` | |
| `dot` | boolean | `false` | Colored dot prefix |
| `dotPulse` | boolean | `false` | Animate the dot |
| `onRemove` | function | — | Show a remove (×) button |
| `as` | tag name | `'span'` | Use `as="button"` for interactive filter chips |

---

### `<Input>`

```jsx
import Input from './Input';

<Input label="Email" type="email" placeholder="you@company.com" required />
<Input multiline label="Message" placeholder="..." rows={4} />
<Input hideLabel label="Search" placeholder="..." />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | string \| ReactNode | required | Always required — pass `hideLabel` to visually hide while keeping a11y |
| `hideLabel` | boolean | `false` | Visually hide the label (still in the a11y tree) |
| `multiline` | boolean | `false` | Renders `<textarea>` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `error` | boolean | `false` | Red border + ring |
| `iconLeading` / `iconTrailing` | ReactNode | — | Icons inside the input edges (non-multiline only) |

---

## Tier C — Molecules

### `<CodeChip>`

Dark mono query/response box (panel variant) or single-line italic example (inline variant). Replaces the legacy `.aw` CSS block.

```jsx
import CodeChip from './CodeChip';

<CodeChip variant="inline">@CAC = @Spend ÷ @New_Customers</CodeChip>

<CodeChip
  variant="panel"
  query="What is our churn rate?"
  response={<>Your churn rate in March was <CodeChip.Highlight>2.1%</CodeChip.Highlight> — down from 2.8%...</>}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'inline' \| 'panel'` | `'inline'` | `inline` for one-line examples; `panel` for query+response boxes inside `<Card variant="glow">` comparisons |
| `query` | string | — | Panel only — rendered as `→ "{query}"` |
| `response` | ReactNode | — | Panel only — paragraph body. Wrap emphasized values in `<CodeChip.Highlight>` |
| `children` | ReactNode | — | Inline body (alternative to `response`) |

---

## Tier D — Organisms

### `<BottomCTA>`

Flagship above-footer call-to-action. Three variants.

```jsx
import BottomCTA from './BottomCTA';

// Form variant (most pages — input + submit)
<BottomCTA
  variant="form"
  title={<>Stop arguing about <BottomCTA.Highlight>which number</BottomCTA.Highlight> is right.</>}
  inputPlaceholder="What metric do you want to unify?"
  ctaLabel="Get Started"
/>

// Buttons variant (e.g., pricing — primary + secondary)
<BottomCTA
  variant="buttons"
  title="Start free. Upgrade when you're ready."
  ctaLabel="Get started for free"
  secondaryCtaLabel="Talk to sales"
  secondaryCtaHref="/Company/Contacts"
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'form' \| 'buttons' \| 'text'` | `'form'` | |
| `title` | ReactNode | required | Use `<BottomCTA.Highlight>` for teal-tinted phrases |
| `inputPlaceholder` | string | — | Required for `form` variant |
| `inputName` | string | `'q'` | Input `name` attribute |
| `ctaLabel` | string | `'Get Started'` | Primary CTA label |
| `ctaHref` | string | `'/auth/sign-up/'` | Form action / anchor href |
| `secondaryCtaLabel` / `secondaryCtaHref` | string | — | For `buttons` variant |

Form variant submits to `ctaHref` via GET with `name="q"`, rejects empty submissions via `required`.

---

### `<FAQAccordion>`

Chevron-toggle accordion with optional FAQPage JSON-LD emission. Only one row open at a time.

```jsx
import FAQAccordion from './FAQAccordion';

<FAQAccordion
  items={[
    { q: 'How accurate are the numbers?', a: 'Identical to what finance reports...' },
    { q: 'Can investors see the same data?', a: 'Yes...' },
  ]}
  defaultOpenIndex={0}
  schemaInJsonLd
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `[{ q: string, a: string }]` | required | Page-specific Q&A pairs |
| `defaultOpenIndex` | number | `0` | `-1` = all closed |
| `schemaInJsonLd` | boolean | `true` | Emit FAQPage structured data inside `<script data-faq>` |

Renders one `.ins-faq__row` per item. Open row gets a teal-tinted border.

---

### `<PainPointGrid>`

2×3 (or 1×N) grid of "the problem" cards with red ✕ `IconBadge` + title + body. Used on Solutions pages.

```jsx
import PainPointGrid from './PainPointGrid';

<PainPointGrid items={[
  { title: 'Pipeline visibility takes days', body: 'Pulling Salesforce, cross-referencing Stripe...' },
  { title: 'Revenue metrics never match', body: 'Marketing says MRR is $48K. Finance says $46.5K...' },
  // ... 6 items canonical
]} />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `[{ title: string, body: string }]` | required | Each page supplies its own pain points |

Responsive: 3 cols (desktop) → 2 cols (tablet) → 1 col (mobile). Each card has a faint red top-line accent via `::before`.

---

### `<ComparisonCards>`

Side-by-side Before / After checklist with red ✕ and teal ✓ marks. The teal "after" panel gets a top brand-glow line.

```jsx
import ComparisonCards from './ComparisonCards';

<ComparisonCards
  before={{
    label: 'Before Insightis',
    items: [
      'Pipeline reports take 2–3 days to build',
      'Revenue metrics differ between teams',
      // ...
    ],
  }}
  after={{
    label: 'With Insightis',
    items: [
      'Pipeline data available in seconds',
      'One certified number for every metric',
      // ...
    ],
  }}
/>
```

| Prop | Type | Description |
|---|---|---|
| `before` | `{ label: string, items: string[] }` | Red-tinted panel with ✕ marks |
| `after` | `{ label: string, items: string[] }` | Teal-tinted panel with ✓ marks + top glow line |

For the *code-mock* comparison pattern (Generic AI vs Insightis with `CodeChip` query/response), use two `<Card variant="glow">` panels directly — not `<ComparisonCards>`. See main.jsx / ai-chat.jsx / semantic-layer.jsx / integrations.jsx for examples.

---

### `<StepsProcess>`

Numbered horizontal process — 56 px teal radial-glow circles connected by gradient lines, each with title + body + optional inline `CodeChip`.

```jsx
import StepsProcess from './StepsProcess';

<StepsProcess steps={[
  { n: '01', title: 'Connect every revenue source', body: 'Salesforce, HubSpot, Stripe...', example: 'Salesforce + Stripe → unified' },
  { n: '02', title: 'Certify the metrics that matter', body: 'Define MRR once...', example: 'MRR + CAC → certified ✓' },
  { n: '03', title: 'Ask anything in plain English', body: 'Type a revenue question...' },
  { n: '04', title: 'Run pipeline reviews on live data', body: 'QBRs and forecast calls...', example: 'QBR deck → live, no rebuild' },
]} />
```

| Prop | Type | Description |
|---|---|---|
| `steps` | `[{ n: string, title: string, body: string, example?: string }]` | Each step's `example` renders as `<CodeChip variant="inline">` |

Responsive: 4-up desktop → 2-up tablet (connectors hidden) → 1-up mobile. Grid columns auto-scale via `--ins-steps-count` CSS custom property.

---

### `<TestimonialCard>`

Customer-quote card. Two visual idioms driven by props:
- **Solutions style** (default): opening-quote SVG + paragraph + name/role/company pill
- **Homepage style**: 5-star row + decorative `&ldquo;` corner + avatar circle

```jsx
import TestimonialCard from './TestimonialCard';

// Solutions style (with company pill, no avatar)
<TestimonialCard
  quote="In the first month we deflected ~70% of ad hoc SQL tickets..."
  name="Maya Chen"
  role="Head of Data"
  company="Series-B SaaS"
/>

// Homepage style (with avatar + stars)
<TestimonialCard
  quote="Insightis transformed how we make decisions..."
  name="Sarah Chen"
  role="VP of Analytics · Meridian Health"
  avatar="https://example.com/avatar.jpg"
  initials="SC"
  showStars
/>
```

| Prop | Type | Description |
|---|---|---|
| `quote` | string | required — body text |
| `name` | string | required |
| `role` | string | required |
| `company` | string | Optional — renders as mono uppercase pill below role |
| `avatar` | string | Optional URL — circular image in footer |
| `initials` | string | Fallback letters when the avatar image fails |
| `showStars` | boolean | 5-star row above the quote |
| `showCornerMark` | boolean | Decorative `&ldquo;` in top-right (defaults to `showStars`) |
| `hideIcon` | boolean | Hide the default opening-quote SVG icon |

---

## CSS source

All visual treatments live in `public/Design system/design-system/assets/components.css`:

| Section | Range | Component |
|---|---|---|
| §1 | lines 1–164 | `.ins-btn` |
| §3 | lines 165–250 | `.ins-input` / `.ins-textarea` |
| §6 | lines 505–675 | `.ins-card` + variants |
| §14 | lines 1170–1240 | `.ins-badge` (Chip) |
| §31 | new (PR 0) | `.ins-eyebrow` |
| §32 | new (PR 0) | `.ins-icon-badge` |
| §33 | new (PR 6) | `.ins-code-chip` |
| §34 | new (PR 7) | `.ins-bottom-cta` |
| §35 | new (PR 8) | `.ins-faq` |
| §36 | new (PR 9) | `.ins-pain-grid` + `.ins-pain-card` |
| §37 | new (PR 10) | `.ins-compare` |
| §38 | new (PR 11) | `.ins-steps` |
| §39 | new (PR 12) | `.ins-testimonial` |

Layout primitives (`.ins-section*`) live in `public/Design system/design-system/assets/base.css` lines 268–315.

Tokens that the components consume are in `public/Design system/design-system/assets/tokens.css` — search for `--ins-button-primary-*`, `--ins-color-{teal,red,amber,green,purple}-a-*`, `--ins-text-*`, `--ins-radius-*`, `--ins-space-*`.

---

## Single-source-of-change test

To verify the library actually delivers the "change once, apply everywhere" goal:

```bash
# Change the canonical primary-button color in tokens.css
sed -i 's/--ins-button-primary-bg:.*$/--ins-button-primary-bg: var(--ins-color-purple-400);/' \
  "public/Design system/design-system/assets/tokens.css"
npm run build
# Every primary button across all 31 pages now renders purple.
git checkout -- "public/Design system/design-system/assets/tokens.css"
```

Same approach works for `--ins-radius-pill`, `--ins-button-primary-shadow-hover`, `--ins-color-teal-a-25`, etc.
