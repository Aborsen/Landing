# Home Page — Design-System Compliance Audit

> Iteration 3 + post-sync. Source state: `master` @ `4ec63d4` (2026-05-26). All paths below are post-`git pull --ff-only`.

## Sync status
- ✅ Fast-forwarded 65 commits from `origin/master`.
- ✅ Local `package.json` / `package-lock.json` accidental reverts restored (`marked` dep + `node scripts/prerender.mjs` build step back in place).
- ⚠ Untracked SVGs `src/Insightis_Black.svg` and `src/Rectangle 23.svg` remain — not in scope; leave for the user to commit or remove.

---

## 1a. Fonts on the Home page render path

### Currently registered (`public/Design system/design-system/assets/base.css:8-31`)
| Family | File | Loaded? |
|---|---|---|
| `Geist` | `fonts/Geist-Variable.ttf` | ✅ Self-host, preloaded in `index.html:30` |
| `Geist Mono` | `fonts/GeistMono-Variable.ttf` | ✅ Self-host, preloaded in `index.html:31` |
| `Outfit` | `fonts/Outfit-Variable.woff2` | ✅ Self-host, NOT preloaded |

### What the brief said
> "There should be exactly **2** fonts. Identify which two."
> "Replace all ad-hoc font declarations with the 2 design-system fonts only. No exceptions."

### What the DS token layer actually defines (`tokens.css`)
| Token | Value |
|---|---|
| `--ins-font-family-sans` | `'Geist', system-ui, sans-serif, ...` |
| `--ins-font-family-mono` | `'Geist Mono', ui-monospace, ...` |
| `--ins-font-family-display` | **MISSING** |

### Findings
- **3 fonts ship in `base.css`** — the brief's "2 fonts" rule is currently violated at the DS level.
- **Outfit was added recently** via commit `4aed11b` ("Platform pages: self-host Outfit, drop Google Fonts to fix LCP critical chain"). Used in 2 places:
  - `src/main.jsx:218` — Hero `<h1>` (Home page, in scope)
  - `src/pages/semantic-layer.jsx:611` — `.sc-num` step numbers (out of scope this pass)
- Both call sites reference Outfit as a **raw `font-family: 'Outfit', sans-serif'` literal**, not a token (violates the call-site-uses-tokens-only rule per IMPLEMENTATION-BRIEF §4.1).
- The token layer has **no `--ins-font-family-display`** to point Outfit at — the path to using Outfit cleanly would require adding one.
- **ISS-43** (iteration-3) already flagged this Hero literal as a bug to remove.

### Decision (recorded this turn)
**Strip Outfit usage on the Home page; swap to Geist via `--ins-font-family-sans`.**

This pass: edit `src/main.jsx:218` to remove `fontFamily: "'Outfit', sans-serif"` from the inline style. The Hero `<h1>` inherits `--ins-font-family-sans` from `body`.

### Side-effect to flag
- `src/pages/semantic-layer.jsx:611` step numbers also reference `'Outfit'`. Touching it is out of scope ("Home page only, other pages come later").
- **Recommended**: leave `base.css` `@font-face`, the woff2 file, and `semantic-layer.jsx` untouched in this PR. Outfit stays loaded in the network waterfall (one extra woff2 = ~32KB) until semantic-layer's refactor pass strips its Outfit usage, then we delete the `@font-face` and the file together.
- **Alternative** (more aggressive): also rip `@font-face` + woff2 now. Semantic-layer step numbers silently fall back to Geist on the next build — a visual regression on a page we did not audit. Flagging for you to override the conservative default.

### Other font literals to clean up on Home
None found. `src/main.jsx` body, paragraphs, KPI numbers, and footer all inherit `var(--ins-font-family-sans)` via `body` (in `base.css:45`) or via `.ins-text-*` classes (which use tokens). No rogue `'Inter'`, `'Roboto'`, `'Space Mono'`, or Google Fonts CDN imports detected.

`Design system/design-system/colors_and_type.css` (now tracked at root, recently added) defines a parallel naming convention (`--ins-font-ui`, `--ins-font-display`, `--ins-font-marketing`) plus an `@import url('https://fonts.googleapis.com/...')` for Space Mono. **Not imported anywhere at runtime** — confirmed via grep across all `.css`, `.html`, `.js`, `.jsx`. Recommend deleting (decision captured in plan).

---

## 1b. Raw color literals to swap

### Token mapping table

| Raw value | Replacement |
|---|---|
| `#A0A0B8` | `var(--ins-text-inactive)` |
| `#7878A8` | `var(--ins-text-disabled)` |
| `#9090C0` | `var(--ins-text-inactive)` (footer headings) |
| `#07807E` | `var(--ins-button-primary-bg)` |
| `#09A09D` | `var(--ins-button-primary-bg-hover)` |
| `#0EC4C1` | `var(--ins-text-highlight)` |
| `#1E1E30` | `var(--ins-border-strong)` |
| `#606078` / `#4A6670` / `#4A6070` | `var(--ins-text-inactive)` or `currentColor` |
| `#3E3E50` | `var(--ins-border-hover)` |
| `#7A8A9A` | `var(--ins-text-inactive)` |
| `rgba(255,255,255,0.04)` | `var(--ins-surface-hover)` |
| `rgba(255,255,255,0.06)` / `0.08` | `var(--ins-border-default)` / `--ins-border-hover` |
| `rgba(255,255,255,0.05)` / `0.12` | `var(--ins-surface-hover)` / `--ins-border-hover` |
| `rgba(10,14,19,0.92)` | **NEW token** `--ins-surface-navbar-glass` |
| `rgba(10,152,150,0.10)` / `0.12` / `0.15` / `0.20` / `0.25` / `0.30` | `var(--ins-color-teal-a-08…a-30)` (already in tokens.css) |
| `rgba(7,128,126,0.06…0.50)` | `var(--ins-color-teal-a-*)` family or `var(--ins-surface-brand-tint)` |
| `rgba(0,0,0,0.3…0.7)` overlays | `var(--ins-surface-overlay)` or kept as documented shadow rgba |
| Connector brand hex (`#FF7A59`, `#FF9900`, `#4285F4`, `#00A1E0`, `#635BFF`, `#336791`, `#29B5E8`, `#8C4FFF`, `#E01E5A`, `#2EB67D`, `#ECB22E`, `#36C5F0`, `#4A154B`, `#13D4D1`) | **Keep** — third-party brand colors are exempt per framework §1.5 |

### Hits per file (post-sync line numbers)

**`src/components/Header.jsx` (311 lines)**
- `#fff` defaults on `MenuIcon`/`CloseIcon` (L4, L7) → keep (white, semantic = text-on-primary, but no exact token; OK).
- `text-[#A0A0B8]` × 6 (L169, L178, L187, L218, L242, L275, L279, L294) → `text-[var(--ins-text-inactive)]` (or new Tailwind alias `text-text-muted`).
- `bg-[#07807E] hover:bg-[#09A09D]` (L188, L295) → `bg-[var(--ins-button-primary-bg)] hover:bg-[var(--ins-button-primary-bg-hover)]` — or replaced via new `<Button variant="primary">`.
- `color:'#0EC4C1'` × 4 (L230, L239, L286, L287) — dropdown icon container + Coming Soon span text.
- `style={{color:'#7878A8'}}` (L286, L287) — mobile dropdown coming-soon items.
- `border-[#1E1E30]` (L293) — mobile menu border.
- Inline `rgba(10,14,19,0.92)` (L160) — **navbar glass; add new `--ins-surface-navbar-glass` token**.
- Multiple `rgba(255,255,255,*)` for nav chrome borders/shadows (L156–168, L172, L177, L181, etc.) — token swap per table above.
- Multiple `rgba(10,152,150,*)` for dropdown icon backgrounds (L223–229) — token swap.
- `rgba(0,0,0,0.3)` / `0.4` / `0.5` shadow rgba (L161, L168) — kept as documented or moved to shadow token.

**`src/components/Footer.jsx` (134 lines)**
- `#A0A0B8` defaults on `TwitterXIcon`/`LinkedInIcon`/`YouTubeIcon`/`TikTokIcon` (L5, L8, L11, L14) → change to `currentColor` so anchor color drives it.
- `border-[#1E1E30]` (L43, L122) → `border-[var(--ins-border-strong)]`.
- `text-[#09A09D]` (L51) — tagline accent → `text-[var(--ins-text-highlight)]`. **Confirm in audit**: semantically this is teal, but `--ins-text-highlight` is `--ins-color-teal-400` (`#0EC4C1`), brighter than `#09A09D`. Visual shift will be slightly more vivid. If preserving the exact muted teal matters, use `var(--ins-color-teal-500)` instead.
- `text-[#7878A8]` × 2 (L52, L123) → `text-[var(--ins-text-disabled)]`.
- `text-[#9090C0]` × 5 (L60, L70, L80, L90, L105) — column headings. Semantically inactive. Use `text-[var(--ins-text-inactive)]`.
- `text-[#A0A0B8]` × 5 (L63, L73, L83, L98, L113) — link rows → `text-[var(--ins-text-inactive)]`.
- Social icon `color="#7878A8"` × 4 (L125–128) → use `currentColor`.
- `&copy; Copyright © Devart 2026` (L123) — **ISS-14 duplicate © symbol still unfixed**. Change to `© Devart 2026`.

**`src/components/ConnectorIcon.jsx` (173 lines)**
- All hex inside `<svg>` paths are connector brand colors → keep.
- Fallback placeholder uses `fill="var(--ins-color-teal-600)"` — primitive at call site; swap to `fill="var(--ins-text-highlight)"` for consistency with the semantic layer.

**`src/main.jsx` (1149 lines) — Home page React shell**
- Hero `<h1>` (L218–221) — `fontFamily:"'Outfit', sans-serif"` inline literal + `<div>` block-level children (ISS-01 + ISS-43). Strip the Outfit literal; replace the two `<div>` with `<span style={{display:'block'}}>`.
- Local `ConnectorIcon` (L105–118) and `ConnectorPill` (L127–136) — **duplicates** of the extracted `src/components/ConnectorIcon.jsx`. Delete the local copies, import from `./components/ConnectorIcon`.
- `SearchIcon` default `color="#7878A8"` (L91) → `var(--ins-text-disabled)`.
- Hero chat-widget attach button raw color `#606078` (L265) → `var(--ins-text-inactive)`.
- Chat-widget SVG strokes `stroke="#7878A8"` (L281, L282 in template-side panels) → use `currentColor`.
- Toggle border `border: '1px solid #3E3E50'` (L324) → `border-color: var(--ins-border-hover)`.
- Send button inline rgba (L390–398) — already implements ISS-76 state matrix correctly (grey when empty, teal-gradient when filled). Swap `rgba(255,255,255,0.08)` to `var(--ins-border-default)` and `rgba(7,128,126,0.35)` to a token.
- Architecture section (L519–540) chaos-swarm + chaos lines — uses connector brand hex + decorative line stroke `#2A3A4A` (L608). The connector hex stays; `#2A3A4A` → `var(--ins-border-strong)` or remove (it's a decorative line, visible).
- Architecture section decorative stream colors `#FF6B6B`, `#FF9900`, `#635BFF`, `#4285F4` (L633–657) — these are decorative semaphore colors for the "chaos to order" stream, mapped to connector brand colors. **Keep** — they are intentional brand-colored particles, exempt as decorative/illustrative.
- `#13D4D1` (L477) — stream pulse gradient endpoint — primitive at call site; swap to `var(--ins-color-teal-300)`.
- `core-sub` color `var(--ins-text-inactive)` already used at L667 but text content reads `"AI Engine"` against `#7A8A9A` → already a semantic token.

**`index.html` (1011 lines, showcase `<template>`)**
- Lines 96–1011 are static HTML. Many `style="..."` inline blocks. Most use `var(--ins-*)` tokens already (post-iteration-3 work).
- Remaining literals to sweep:
  - `#4A6670` / `#4A6070` stroke colors → `currentColor` (per token mapping above).
  - `#3E3E50` toggle borders → `var(--ins-border-hover)`.
  - `#FFF` text on connector brand icon containers → keep (white-on-color contrast).
  - Connector brand backgrounds → keep.
- Emoji glyphs (`📊 📈 💳 ☁️ 🟠 🛒 🛒`) in dropdown items (L180–204, L527–531) — ISS-19 unfixed. Replace with inline SVG mirroring `ConnectorIcon`. **Caveat**: template is static HTML, can't import React, so SVG must be inlined raw.

**`src/app.css` (1087 lines)**
- Most usages already token-based. A handful of remaining raw values inside long-form selectors:
  - `.btn-primary` (L139–161) — uses `var(--ins-color-teal-*)` primitives directly. Allowed for the legacy class, but call sites should migrate to `<Button>`. After migration, delete the class.
  - `.testi-av` (L375) — gradient end `var(--ins-color-teal-650)` is a primitive — acceptable inside a gradient definition.
  - `color:#fff` × many (L318, L327, L375, L495, L606, L777, L785) — white on brand fills, semantically text-on-primary, no exact token. Acceptable.
  - `.ctx-menu` (L646) — `background:var(--ins-color-gray-800)` primitive. Should be `var(--ins-surface-card)`.
  - `.modal` (L677) — `background:var(--ins-color-gray-800)` primitive. Should be `var(--ins-surface-card)`.
  - `color:#60A5FA` / `#A78BFA` on `.badge.revops` / `.badge.finance` (L619, L620) — non-system blues/purples for badge category colors. Raw hex bypasses tokens. Should map to status tokens or add a category-color token group.

---

## 1c. Components — current usage → target shared component

| Current usage | Target |
|---|---|
| `<a className="...bg-[#07807E] hover:bg-[#09A09D]...">Start for Free</a>` (Header.jsx:188, 295) | `<Button as="a" variant="primary" size="md">` |
| `<a className="text-[#A0A0B8]...">Sign In</a>` (Header.jsx:187, 294) | `<Button as="a" variant="ghost" size="md">` |
| `<span style={{background:'rgba(10,152,150,0.12)',border:'1px solid rgba(10,152,150,0.3)',color:'#0EC4C1'...}}>Coming Soon</span>` (Header.jsx:239, 286, 287) | `<Chip variant="status-brand" size="sm">` |
| Hero chat `<textarea>` (main.jsx:239–247) | `<Input multiline aria-label="...">` |
| Hero "Connectors" / "Gemini Pro" pill buttons (main.jsx:292–384) | `<Chip variant="interactive">` (or keep inline; both have specific dropdowns) |
| Local `ConnectorIcon` + `ConnectorPill` (main.jsx:105–136) | Delete local copies, import from `./components/ConnectorIcon` |
| `.btn-primary` / `.btn-ghost` / `.btn-outline` classes (app.css:136–161, L400) | All replaced by `<Button>` variants |
| `.src-card`, `.out-card`, `.testi-card`, `.mdc`, `.tok-bad`, `.tok-good` (app.css) | `<Card variant="..." padding="...">` |
| Hero `<h1>` block-level `<div>` children + `'Outfit'` literal (main.jsx:218–221) | Fix inline — strip Outfit, replace `<div>` with `<span style={{display:'block'}}>` |

---

## 1d. DS items missing in code (or already present)

| Item | Status |
|---|---|
| Global `:focus-visible` ring (ISS-24, ISS-77) | ✅ **Already present** in `base.css:96-100`, uses `--ins-focus-ring` token (`tokens.css:337`). No work needed. |
| Global `prefers-reduced-motion` (ISS-48, ISS-03) | ✅ **Already present** in `base.css:353-366`. No work needed. |
| Mobile hamburger ≥44×44 (ISS-72) | ❌ Header.jsx:281 still `p-2` (~36×36). Fix: `p-2.5 min-w-11 min-h-11`. |
| Input `<label>` (ISS-23) | ❌ Hero textarea (main.jsx:239) has `aria-label` but no `<label>` element. The new `<Input>` component will provide visually-hidden labels. |
| Chat-widget Send state matrix (ISS-76) | ✅ **Already implemented** at main.jsx:388-401 (grey-when-empty, teal-gradient-when-filled). Just needs hex/rgba inside to swap to tokens. |
| KPI numbers font-weight 700 (ISS-65) | ⚠ KPI strip not yet identified in main.jsx — need to grep for the strip element to confirm. May already use `.ins-stat` class which is weight 700 per `base.css:210`. |
| KPI prerender real values (ISS-02) | ✅ Likely **resolved by `scripts/prerender.mjs`** — verify by reading `dist/index.html` after build. |
| Eyebrow color drift (ISS-57) | Audit during refactor — `app.css:172` uses `var(--ins-color-teal-500)` primitive for the `✦` glyph. Should be `var(--ins-text-highlight)`. |
| Trailing `→` glyph on CTAs (ISS-34) | Hero `<TooltipPopup>` (main.jsx:205) still renders `<ArrowRightIcon size={12} />` next to "Sign Up Free" — this is an SVG, not a glyph; per the brief that's the right replacement. Need to also audit any text `→` characters. |
| Emoji glyphs in showcase template (ISS-19) | ❌ index.html `<template>` still has `📊 📈 💳 ☁️ 🟠 🛒` (lines 527-531) — needs inline SVG swap. |
| ISS-04 / ISS-44 (token vocabulary unification) | Mostly resolved. Outstanding: delete `colors_and_type.css` (now tracked but not imported), confirm no call sites reference legacy `--ins-font-ui` / `--ins-font-display` / `--ins-font-marketing`. |
| ISS-15 (footer URL spaces) | Out of scope this pass (separate routing PR with Vercel rewrites). |
| `--ins-surface-navbar-glass` token | ❌ Not present. Add to `tokens.css` under the surface semantic block. Value: `rgba(10,14,19,0.92)`. |

---

## Plan adjustments from the audit

1. **Step 2 (Token reconciliation)** shrinks substantially:
   - Skip the `:focus-visible` rule (already done).
   - Skip the `prefers-reduced-motion` rule (already done).
   - Add `--ins-surface-navbar-glass` to `tokens.css`.
   - Delete `Design system/design-system/colors_and_type.css`.
   - Extend `tailwind.config.js` with the semantic-token color aliases listed in the plan.

2. **Step 3 (Build shared components)** — unchanged. Build `Button`, `Card`, `Chip`, `Input` in `src/components/`.

3. **Step 4 (Refactor)** picks up:
   - All hex/rgba swaps per the table in §1b.
   - Hero `<h1>` fix (drop `'Outfit'`, fix `<div>` → `<span>`).
   - Delete local `ConnectorIcon`/`ConnectorPill` in main.jsx, import from shared.
   - Header CTA → `<Button>`, Coming Soon → `<Chip>`, hamburger → 44×44.
   - Footer ©© fix, hex swap.
   - Showcase template emoji → SVG.
   - Verify the eyebrow-glyph token swap (ISS-57) and the `.ctx-menu` / `.modal` primitive-to-semantic swap in app.css.

4. **Step 5 (Verify)** — unchanged. Build, dev server, preview tools, grep for remaining hex, font-count check.

---

## Open question

**Outfit font handling.** Decision recorded above is the conservative path (swap Home page literal to Geist; leave `base.css` `@font-face` + woff2 + `semantic-layer.jsx` untouched until semantic-layer's own refactor). If you'd rather rip Outfit entirely now and accept the silent visual regression on `semantic-layer.jsx`'s step numbers, say so and I'll bundle the `@font-face` + woff2 removal into this PR's Step 4.

---

**Pause here. Awaiting approval to proceed to Step 2.**
