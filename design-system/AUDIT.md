# Styling Audit — Insightis marketing site

> **Phase 1 of the design-system consolidation.** Read-only audit of where styling comes from today, every value and where it's defined, and the duplicates/conflicts that cause "edit one spot, only some elements update." No code was changed to produce this document.

## TL;DR

The **bones of a design system already exist** — a comprehensive `tokens.css`, a `.ins-text-*` type scale in `base.css`, ~23 `.ins-*` React components, and a Tailwind config that already references `var(--ins-*)` (so Tailwind is **not** a second source of truth). The problem is the system is **duplicated, monolithic, and bypassed**:

1. **Two diverging copies** of the DS CSS (app uses `public/…`; storybook uses repo-root `Design system/…`).
2. **~2,800 hardcoded inline values** across 39 `src` files bypass the tokens.
3. **Duplicate/conflicting CSS** — keyframes and `.fu*` classes redefined across ~33 page `<style>` blocks; `flowRight` defined twice; `.sc-step` means two different layouts.
4. **Monolithic files** — one giant `tokens.css`; an ~1,100-line `app.css` catch-all.

---

## 1. Styling sources (the map)

| Source | Role | Tokens? | Loaded by | Status |
|---|---|---|---|---|
| `tailwind.config.js` | Theme extension (color/radius/font aliases) | All `var(--ins-*)` (no hardcoded hex) | Vite build | **Active** |
| `src/app.css` | Global stylesheet + legacy showcase/panels + many keyframes | Consumes `--ins-*` | React entry (all pages) | **Active** |
| `public/Design system/design-system/assets/tokens.css` | Token definitions (`:root`) | **Defines** `--ins-*` | `@import` in app.css | **Active (canonical)** |
| `public/…/base.css` | Reset + `.ins-text-*` type scale + `@font-face` | Consumes `--ins-*` | `@import` in app.css | **Active** |
| `public/…/components.css` | `.ins-*` component classes (~2,920 lines) | Consumes `--ins-*` | `@import` in app.css | **Active** |
| `public/assets/responsive.css` | FOUC guard + mobile (`@media 768px`) resets | minimal | `<link>` in every `*.html` | **Active** |
| `Design system/design-system/assets/{tokens,base,components}.css` | **Diverged duplicate** (storybook) | defines/consumes `--ins-*` | storybook `*.html` (not the app) | **Stale copy** |
| `dist/Design system/…` | build artifact | — | — | **Stale (ignore)** |
| Per-page `<style>` blocks (~33 `*.html` entries + 4 `src` `<style>`) | Page decoration, keyframes, `.fu*`, body/heading base | mixed tokens + hardcoded | inline per page | **Active (scattered)** |
| `public/showcase.js` + `index.html <template>` | Vanilla "How it works" showcase | via `.sc-*` classes + inline styles | `index.html` | **Active** |
| `src/components/*.jsx` (~23) | React primitives emitting `.ins-*` classes | via classes + inline styles | React bundle | **Active** |

**CSS load graph (runtime):** every page `<link>`s `responsive.css`, then the React bundle imports `src/app.css` → `@import` tokens.css → base.css → components.css → `@tailwind base/components/utilities` → app.css's own globals. Page `<style>` blocks layer on top. Storybook `*.html` separately link the **repo-root** copy.

---

## 2. Token inventory (defined in `tokens.css` / `base.css`)

Well-structured and comprehensive. Summary (full values live in the files):

- **Colors** — primitives: gray `50–950`, teal `100–950`, status (green/amber/red/blue/purple), white-alpha `a-02…a-45`, teal-alpha `a-04…a-60` (two bases: `14,196,193` and `9,160,157`), red-alpha, composites/overlays. Semantic aliases: `--ins-text-{heading,heading-soft,body,inactive,disabled,highlight}`, `--ins-surface-{page,container,card,elevated,overlay,brand-tint,glass,navbar-*}`, `--ins-border-{default,hover,prominent,strong,brand,focus,error}`, `--ins-button-*`, `--ins-status-*`, `--ins-chart-1…6`, focus rings.
- **Typography** — `--ins-font-family-{sans,mono}`; size scale `--ins-font-size-{11,12,14,15,16,17,18,20,22,24,28,32,36,44,48,56,60,76}`; weights `400/500/600/700`; line-heights `tight/snug/normal/relaxed`; letter-spacing `tighter…wider`. Type classes in base.css: `.ins-text-display{-xl}/-hero/-h1..h4/-body{-xl,-lg,-sm,-xs}/-label{-lg,-sm}/-caption/-overline/-mono*`, `.ins-stat`, modifiers `.ins-text--{muted,mono,italic,success,medium,semibold}`.
- **Spacing** — size primitives `--ins-size-0…32` (4px grid) + aliases `--ins-space-{2xs…6xl}` + legacy numeric aliases + layout (`--ins-container-max 1280`, padding, navbar height, grid gutters).
- **Radii** — `--ins-radius-{2,4,6,8,12,16,20,full}` + aliases `xs/sm/md/lg/xl/2xl/3xl/pill/badge/card/input`.
- **Shadows** — `--ins-elevation-0…4`, glows (`--ins-glow-{brand,success,error,dot}`), `--ins-shadow-{xs..lg, navbar, mega-menu}`.
- **Z-index** — `--ins-z-{base,dropdown,sticky,fixed,modal,popover,toast,tooltip}` (0–700).
- **Breakpoints** — `--ins-bp-{480,768,1024,1280}` (+ aliases). (CSS `@media` uses px literals — a CSS limitation.)
- **Motion** — durations `--ins-duration-{fast,base,slow,xslow}`; easings `--ins-easing-{standard,accelerate,decelerate}`.
- **Other** — opacity, border-width, blur, icon-size primitives.

**Token divergence between the two copies:** only **`--ins-glow-error`** differs — `0 0 12px rgba(248,113,113,0.30)` (public, canonical) vs `0 0 20px rgba(248,113,113,0.28)` (repo-root). All other tokens match.

---

## 3. Hardcoded values bypassing the tokens (the scatter)

Counts across `src/**`:

| Category | Count | Notes |
|---|---|---|
| Files with inline `style={{` | 39 | heaviest: ai-chat, semantic-layer, pricing, data-analytics, the role/legal pages |
| Raw hex colors `#xxxxxx` | ~915 | incl. `#0EC4C1` ×230, plus third-party brand hexes |
| `rgba()/rgb()` literals | ~1,036 | white-alpha + teal + dark panels |
| Inline px `fontSize:'NNpx'` | ~649 | |
| `font-family` literals | ~298 | `'Geist Mono,monospace'`, `'Geist,sans-serif'` (3 quote/spacing variants) |

**Top repeated raw values (change-doesn't-propagate offenders):**

| Value | ~Occurrences |
|---|---|
| `#0EC4C1` (teal accent) | 230 |
| `rgba(7,128,126,0.08)` | 51 |
| `rgba(255,255,255,.06)` | 34 |
| `rgba(255,255,255,.05)` / `.04` | 32 / 32 |
| `rgba(9,160,157,.2)` | 31 |
| `rgba(255,255,255,0.08)` | 25 |
| `rgba(9,160,157,.25)` | 23 |
| `rgba(13,17,23,.6)` (dark panel) | 22 |
| `rgba(255,255,255,.1)` / `.07` | 20 / 20 |
| `rgba(18,18,31,.95)` | 20 |
| `rgba(9,160,157,.3)` / `.4` | 19 / 18 |
| `rgba(7,128,126,.3)` | 16 |
| third-party brand hexes (`#4285F4`, `#ff7a59`, `#29b5e8`, `#818CF8`…) | 25–31 each |

---

## 4. Duplicated keyframes & classes

- **`.fu0–.fu6`** stagger classes + entrance **`@keyframes`** (`fadeUp`, `fadeIn`, `slideUp`, `pulse`, `blink`…) are **redefined in ~33 page `<style>` blocks** (and in app.css).
- **`@keyframes` redefined with different values:** `flowRight`/`flowLeft` defined **twice in app.css** (`-30%→130%` vs `-40%→140%`); `spin`, `blink`, `cursorClick` duplicated across files.
- 4 `src` files embed `<style>` blocks: `ai-chat.jsx`, `pricing.jsx`, `contact-support.jsx`, `BlogPost.jsx` (+ `semantic-layer.jsx`'s showcase CSS).

---

## 5. Conflicts (root causes — same concept, multiple definitions)

1. **Two diverging DS CSS copies.** `public/…` (app, canonical) vs repo-root `Design system/…` (storybook). `components.css` differs by **~859 lines**, `base.css` ~89, `tokens.css` ~40, `--ins-glow-error` value differs. Editing one doesn't touch the other.
2. **Teal brand color expressed 3 ways.** `#0EC4C1` (×230) vs `rgba(9,160,157,…)` (×100+) vs `var(--ins-text-highlight)`. Changing the token leaves the literals untouched.
3. **`.sc-step` = two different components.** `src/app.css` (vertical list, showcase) vs `src/pages/semantic-layer.jsx` `<style>` (horizontal 5-col stepper). Same class name, opposite layouts.
4. **`flowRight`/`flowLeft` double-defined** in `app.css` with different offsets — the later wins; the earlier is dead.
5. **Mixed rgba formats** — `rgba(255,255,255,.06)` (×34) vs `rgba(255,255,255,0.06)` (×20). A single find-replace misses one form.
6. **`font-family` literal vs token** — `'Geist Mono,monospace'` (×298, 3 variants) vs `var(--ins-font-family-mono)`.
7. **Dark panel `rgba(13,17,23,.6)`** (×22 in hover/active states) — no token; `--ins-surface-*` exists but isn't used here.
8. **Undefined `--mint`** referenced in `semantic-layer.jsx` — a phantom token.
9. **`--ins-glow-error`** divergence between the two token copies (§2).
10. **Duplicated entrance animations** (§4) — `.fu*` + keyframes copy-pasted across ~33 page `<style>` blocks instead of one shared source.

---

## 6. Why edits don't propagate (the answer)

A single brand-teal change must currently be made in: ~230 `#0EC4C1` literals, ~100+ `rgba(9,160,157,X)` literals, the `--ins-text-highlight` token, **and** potentially two diverging CSS copies — across 39 files + 33 page `<style>` blocks. Whichever you miss is the element that "didn't update."

**Fix:** one `design-system/` folder as the single source (tokens split per concern, exposed once via `:root`, Tailwind referencing the same vars), the duplicate copies collapsed into it, conflicting keyframes/classes deduped, and every hardcoded value migrated to a token reference. See the plan: structure (Phase 2) + exhaustive incremental migration (Phase 3), and `MIGRATION.md` for the old→new mapping.
