# Insightis Design System

The **single source of truth** for the site's styling. Every color, font, size,
radius, shadow, z-index, and component lives here exactly once. Change a value in
one place and it propagates everywhere — across hand-written CSS **and** Tailwind
(Tailwind references the same `var(--ins-*)` tokens; it is *not* a second source).

```
design-system/
├── index.css            Aggregator → @imports tokens/ → global.css → components/
├── tokens/              The values (CSS custom properties on :root), one file per concern
│   ├── index.css        @imports the 9 concern files below
│   ├── colors.css       primitives (gray / teal / status / named alphas) + semantic (text / surface / border / icon / button / status / chart)
│   ├── typography.css   font-family (sans / mono), font-size 11–76, font-weight, line-height, letter-spacing
│   ├── spacing.css      --ins-size-* (4px grid + 2px half) + semantic --ins-space-* + grid/container/navbar
│   ├── radii.css        --ins-radius-2…20 + full, semantic xs…3xl/pill, component (card/input/badge)
│   ├── shadows.css      elevation 0–4, glow (brand/success/error/dot), focus rings, semantic shadows
│   ├── motion.css       durations (fast/base/slow/xslow) + easings (standard/accelerate/decelerate)
│   ├── breakpoints.css  480 / 768 / 1024 / 1280 + min-viewport
│   ├── z-index.css      base / dropdown / sticky / fixed / modal / popover / toast / tooltip (0–700)
│   └── misc.css         opacity, border-width, blur, icon-size primitives
├── global.css           Reset + body/font defaults + @font-face (Geist / Geist Mono) + .ins-text-* type scale
├── components/          One file per component (39), wired by components/index.css in cascade order
│   ├── index.css        @imports every component file (ORDER = cascade order — do not reorder)
│   ├── button.css  input.css  card.css  modal.css  navbar.css  footer.css  badge.css  …
│   └── … (see the folder; bottom-cta, faq-accordion, steps-process, testimonial-card, etc.)
├── blocks/              Reserved for reusable composite blocks (see blocks/README.md)
├── AUDIT.md             The Phase-1 audit that scoped this refactor
└── MIGRATION.md         What moved where + every value→token mapping + decisions
```

## How it's wired

```
src/app.css
  └─ @import '../design-system/index.css'   ← tokens, global, components (in that order)
  └─ @tailwind base / components / utilities ← Tailwind reads var(--ins-*) from the tokens above
  └─ app/home-page globals                   ← app-layer styles (NOT part of the DS; see note)

design-system/index.css
  └─ @import tokens/index.css  → 9 concern files (defines all --ins-* on :root)
  └─ @import global.css        → reset, @font-face, .ins-text-* scale (consumes tokens)
  └─ @import components/index.css → 39 component files (consume tokens)
```

`tailwind.config.js` maps its theme to `var(--ins-*)` — so Tailwind utilities and DS
classes always agree, from one source. Fonts (Geist) are served from
`public/Design system/design-system/assets/fonts/` (referenced by absolute URL in
`global.css`'s `@font-face`).

## Using tokens

**In any CSS context** — a `.css` file, a `<style>` block, or a React inline
`style={{}}` object — reference a token with `var()`:

```css
.thing { color: var(--ins-text-highlight); padding: var(--ins-size-4); border-radius: var(--ins-radius-12); }
```
```jsx
<div style={{ color: 'var(--ins-text-body)', gap: 'var(--ins-size-2)' }} />
```

**⚠️ Never use `var()` in an SVG or HTML presentation _attribute_** (`fill=`,
`stroke=`, `stop-color=`, `font-size=`, `rx=`, …). `var()` is only valid in CSS,
not in attributes — it silently breaks the value there. Use the literal in
attributes, or move the styling into a `style={{}}`/CSS context. **Rule of thumb:
colon (`fill: var(…)`) = OK; equals (`fill="var(…)"`) = broken.**

## Adding or changing a token

1. Edit the matching file in `tokens/` (e.g. a new brand shade → `colors.css`).
2. That's it — every consumer (CSS `var()` + Tailwind) picks it up. No other edits.
3. Prefer **semantic** names at call sites (`--ins-text-body`, `--ins-radius-card`)
   over primitives (`--ins-color-gray-300`, `--ins-radius-12`) where a semantic
   alias exists; semantics let you re-theme without touching markup.

Do **not** add a literal value to a component or page if a token already carries
it. Do **not** tokenize third-party brand colors (connector logos: Google
`#4285F4`, HubSpot `#ff7a59`, Snowflake `#29b5e8`, Stripe `#635BFF`, …) — those are
external brand constants, not design decisions.

## Adding a component

Add `components/<name>.css`, then add one `@import url('./<name>.css');` line to
`components/index.css` **at the correct cascade position** (import order is the
cascade order — a later component can override an earlier one). Keep it consuming
tokens only (no raw hex / px).

## Conventions

- **Two teal bases.** Bright `--ins-color-teal-400` (`#0EC4C1`) has alpha tokens at
  .04–.60; the darker `rgba(9,160,157,…)` only has tokens at .08 and .50. Other dark-teal
  opacities have no exact token — leave them literal rather than snapping (that would shift color).
- **4px spacing grid.** `--ins-size-N` where value = `N×4px` (so `--ins-size-4` = 16px),
  plus a 2px `--ins-size-half`. Off-grid spacing (10/13/etc.) has no token by design.
- **Type scale is curated** (11,12,14,15,16,17,18,20,22,24,28,32,36,44,48,56,60,76).
  Sizes off this list (8/9/10/13/40/…) are intentionally not tokens.

See `MIGRATION.md` for the full history and the exact value→token mappings.
