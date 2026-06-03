# Design System Migration

How the scattered styling was consolidated into `design-system/`, what moved
where, and every value→token mapping applied. The migration was a **strict,
pixel-identical refactor**: only values that map 1:1 to an existing token were
swapped; nothing that would alter rendering was touched.

## Before → after (locations)

| Before | After |
|---|---|
| `public/Design system/…/assets/tokens.css` (imported by app) **and** repo-root `Design system/…/tokens.css` (storybook) — diverged | `design-system/tokens/*.css` (one file per concern) — **single source** |
| `…/base.css` | `design-system/global.css` |
| `…/components.css` (one 2,920-line monolith) | `design-system/components/*.css` (39 per-component files + `index.css`) |
| `src/app.css` `@import`ed three diverged files | `src/app.css` `@import`s `../design-system/index.css` (one line) |
| `auth/*.html` re-`<link>`ed the diverged copy on top of the bundle | links removed — auth pages get styling from the React bundle only |
| ~2,800 hardcoded values inline across 39 `src` files + page `<style>` + `*.html` | replaced with `var(--ins-*)` where an exact-match token exists |

## Phases (each is one commit; all verified build 31/31 + pixel-identical)

| Commit | Phase | What |
|---|---|---|
| `e37edb1` | 1 — Audit | Wrote `AUDIT.md`; paused for approval. No code change. |
| `8d8cfcd` | 2a — Single source | Relocated canonical CSS into `design-system/`; rewired `app.css`; detached auth pages. |
| `07733a9` | 2b — Split tokens | `tokens.css` → 9 per-concern files + `tokens/index.css`. 386 tokens, byte-identical. |
| `b8bedfe` | 3.1 — Animations | Removed 4 dead duplicate `@keyframes` in `app.css` (later defs win → earlier were unreachable). |
| `56dee15` | 3.2 — Colors | 338 exact-match color literals → tokens (collapsed the 3-way teal). |
| `bb50386` | 3.3 — Typography | ~698 swaps: font-family (`'Geist…'`) + on-grid font-size → tokens. |
| `15797ff` | 3.4a — Radii + z-index | 206 swaps: `border-radius`{2,4,6,8,12,16,20}, `z-index`{0,100,200}. box-shadow: 0 exact matches. |
| `0b7bff9` | 3.4b — Spacing | 703 swaps: single-value `padding`/`margin`/`gap` → `var(--ins-size-N)`. |
| `6b8d238` | 3.5 — Split components | `components.css` → 39 files. Proven no-op: minified CSS bundle byte-identical. |
| (this) | 3.6 + docs | `blocks/` evaluated (deferred — see below); `README.md` + `MIGRATION.md`. |

## Value → token mappings applied

**Colors (3.2)** — exact-match only:
- `#0EC4C1` → `var(--ins-color-teal-400)` (the 3-way teal collapsed: `#0EC4C1`, the named alias, and bright-teal rgba all unified)
- `rgba(255,255,255,0.06)` → `var(--ins-color-white-a-06)` (and the other named white/teal/red alphas)
- *Left literal:* off-grid alphas like `rgba(9,160,157,0.2)`, one-off hexes, `#fff`, all third-party brand colors, and every SVG `fill=`/`stroke=`/`stop-color=` **attribute** (var() invalid there).

**Typography (3.3):**
- `'Geist Mono,monospace'` / `'Geist Mono'` / `"'Geist Mono', monospace"` → `var(--ins-font-family-mono)`
- `'Geist,sans-serif'` / `'Geist'` → `var(--ins-font-family-sans)` (renders identically — Geist is preloaded)
- `font-size: <N>px` → `var(--ins-font-size-<N>)` for N ∈ {11,12,14,15,16,17,18,20,22,24,28,…,60}
- *Left literal:* off-grid sizes **8, 9, 10, 13, 40px** (+ fractionals) — no token; `@font-face` family definitions; all `font-size=`/`font-family=` **attributes**; font-weight/line-height/letter-spacing (out of scope).

**Radii + z-index (3.4a):**
- `border-radius: <N>px` → `var(--ins-radius-<N>)` for N ∈ {2,4,6,8,12,16,20}
- `z-index: <N>` → `var(--ins-z-{base|dropdown|sticky|…})` for N ∈ {0,100,200,300,…}
- *Left literal:* `999px`/`50%` (pills/circles — no exact token), off-grid radii (3/5/7/9/10/14/24px), off-grid z-index (1/2/10/…), multi-value `border-radius` shorthands, SVG `rx=`/`ry=`.

**Spacing (3.4b):**
- single-value `gap`/`row-gap`/`column-gap`/`padding`(+longhands)/`margin`(+longhands) `<N>px`
  → `var(--ins-size-N)` per the 4px grid (note **name ≠ value**: `--ins-size-4` = 16px).

  | px | token | px | token | px | token |
  |---|---|---|---|---|---|
  | 2 | size-half | 16 | size-4 | 48 | size-12 |
  | 4 | size-1 | 20 | size-5 | 56 | size-14 |
  | 8 | size-2 | 24 | size-6 | 64 | size-16 |
  | 12 | size-3 | 28 | size-7 | 80 | size-20 |
  |  |  | 32 | size-8 | 96 | size-24 |
  |  |  | 40 | size-10 | 128 | size-32 |

- *Left literal:* **multi-value shorthands** (`padding: 12px 16px`), **sizing properties**
  (`width`/`height`/`top`/`inset`/`flex` — tokenizing those to the spacing scale would wrongly
  couple sizing to spacing), off-grid px (3/5/6/7/9/10/11/14/18/36/52/60/100/120…), bare `0`,
  negatives, and bare JSX numbers. Verified pixel-identical by canonicalization (reverse every
  `var(--ins-size-X)` to px on both HEAD and working tree → byte-identical, 0/42 files differ).

## What was deliberately NOT changed (and why)

- **Off-grid values** (sizes, radii, alphas listed above) — no exact token exists; snapping
  to the nearest would shift pixels. Left literal by design.
- **Third-party brand colors** — external constants, not design tokens.
- **SVG / HTML presentation attributes** — `var()` is invalid in attributes; only CSS contexts
  were touched. (Discriminator used everywhere: colon = swap, equals = never.)
- **Per-page `<style>` animation variants** — page entrance animations differ per page
  (`fadeUp` 0.5s vs 0.7s, with/without opacity, etc.). Consolidating them would change motion,
  so they stay per-page.
- **`app.css` app/home globals** — these are app-layer styles (orchestration, showcase, nav
  chrome) and are order-coupled to Tailwind. Relocating them via `@import` was tested and
  **changes the cascade** (Vite hoists `@import` above `@tailwind`) → not pixel-identical.
  They correctly remain in the app layer.

## Known remaining item — storybook duplication (needs a decision)

Two non-canonical copies of the old DS CSS still exist:

- `Design system/design-system/…` — the **storybook source** (component-preview `*.html` + its own CSS copy).
- `public/Design system/design-system/…` — a **deployed** copy. ⚠️ Its `assets/fonts/` and
  `assets/img/noise.svg` are **still served and referenced by the live `@font-face` / noise URL**,
  so this folder cannot simply be deleted.

The **live site no longer uses either copy's CSS** (it is 100% single-sourced from
`design-system/`); these are only the storybook's stylesheets, now stale. Options to fully
reconcile (pick one):

1. **Repoint + prune** — point the storybook `*.html` `<link>`s at the canonical
   `design-system/` and delete the duplicate CSS (keep `public/.../assets/fonts` + `img`).
2. **Generate** — add a build step that emits the storybook's `components.css` (concatenated
   from `design-system/components/*.css`) so the copy is a generated artifact, not hand-maintained.
3. **Leave as-is** — storybook stays frozen/separate; duplication is isolated and harmless to
   the live site.

No pixel impact on the live site either way — deferred pending the serving decision.
