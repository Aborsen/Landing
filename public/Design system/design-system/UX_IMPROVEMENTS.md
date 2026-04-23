# UX Improvements

Issues found in the existing source HTML pages and how this kit addresses them. Use this as the migration punch-list when retrofitting production pages to the kit.

## P0 — Accessibility

| # | Issue | Resolution |
|---|---|---|
| 1 | No visible focus rings anywhere | Global `:focus-visible` rule in `base.css` applies `--ins-focus-ring` to every interactive element |
| 2 | Icon-only buttons missing `aria-label` | Kit snippets include `aria-label` on every `.ins-btn--icon` |
| 3 | Modals missing `role="dialog"` + `aria-modal` + `aria-labelledby` | Modal component markup includes all three; `storybook.js` handles focus trap + ESC |
| 4 | Tabs missing `role="tab"` / `role="tabpanel"` | Component markup includes ARIA; keyboard arrows wired in `storybook.js` |
| 5 | Touch targets 14–15px in source (below WCAG 44×44) | `.ins-btn--icon` has `min-width: 44px; min-height: 44px` below 768px; interactive components inherit touch-target padding |
| 6 | `text-inactive` contrast 4.4:1 on `surface-card` | Scoped to disabled/placeholder-only (WCAG 1.4.3 exception); `text-body` used for normal prose in cards |
| 7 | No skip-to-content link | `.ins-u-skip-link` utility in `base.css`, documented in every storybook page |

## P1 — Consistency

| # | Issue | Resolution |
|---|---|---|
| 8 | Mixed heading fonts (Clash Display + Inter + Instrument Sans) | Kit uses **Geist everywhere** — documented in [foundations/typography.html](foundations/typography.html) |
| 9 | Mono font split (Space Mono / JetBrains Mono) | Kit uses **Geist Mono** for all mono contexts; `font-variant-numeric: tabular-nums` baked into `.ins-text-mono` / `.ins-stat` / `.ins-badge--trend` |
| 10 | Ad-hoc breakpoints (600/900) in source | Kit uses `480/768/1024/1280`. Existing pages using 600/900 need per-page retrofit as they're updated |
| 11 | Raw hex/rgba sprinkled in component CSS | Every alpha-blend is a named primitive (`--ins-color-white-a-06` etc.); semantic tokens never reference raw values |
| 12 | Mixed lifecycle + semantic status names | Canonical set = `success/warning/error/info`; lifecycle aliases (`live/shipped/planned/coming-soon`) map to semantic |
| 13 | Glow shadow used on CTAs and focus states | Removed. Focus visibility comes from `--ins-focus-ring` (3px teal-50% ring) |
| 14 | Primary button gradient + glow on landing | Flat `--ins-color-teal-600`. Landing CTAs will look flatter; consider this a brand simplification |

## P2 — Polish

| # | Issue | Resolution |
|---|---|---|
| 15 | Loading buttons change width when spinner replaces label | `.ins-btn.is-loading` reserves `min-width: 80px`; spinner absolutely positioned |
| 16 | Interactive cards have no focus-visible | `.ins-card--interactive:focus-visible` applies the focus ring (keyboard-accessible) |
| 17 | No documented loading/empty/error triad for data views | [Empty states](components/empty-states.html), [Loaders](components/loaders.html), [Alerts](components/alerts.html) all show the triad |
| 18 | Animations run on mobile (battery drain, low-end jank) | Decorative animations gated behind `@media (min-width: 768px)`; state-communicating animations always on |
| 19 | Marquee runs 24/7 even when off-screen | `IntersectionObserver` in `storybook.js` pauses `.ins-marquee__track` when off-screen |
| 20 | Noise SVG filter painted every frame on source pages | Ship as static `assets/img/noise.svg` (baked texture, no filter cost); `background-attachment: scroll` (not fixed) |

## Page-by-page migration notes

### Landing ([index 11.html](../index%2011.html))
- Replace hero font with `.ins-text-display-xl`
- Swap gradient CTA button → flat `.ins-btn--primary.ins-btn--lg`
- Replace custom feature grid → `.ins-grid` + `.ins-card.ins-card--feature`
- Newsletter row → `.ins-banner-newsletter`
- Logo strip → `.ins-marquee`
- Bottom CTA block → `.ins-banner-promo`

### Roadmap ([Roadmap.html](../Roadmap.html))
- Kanban column cards → `.ins-card.ins-card--roadmap`
- Status badges → `.ins-badge--success/--info/--shipped/--planned`
- Filter bar → `.ins-segmented`
- Breakpoint audit: `(min-width: 900px)` → `(min-width: 1024px)`

### AI Chat ([AI Chat.html](../AI%20Chat.html))
- Hero chat demo → `.ins-chat` + `.ins-chat__bubble`
- Typing loader → `.ins-typing.ins-motion-state`
- Input composer → `.ins-input-group`
- Comparison section → `.ins-comparison`

### About ([About Insightis.html](../About%20Insightis.html))
- Hero → `.ins-text-display-xl` optionally wrapped in `.ins-bg-aurora`
- Stats strip → `.ins-stat-strip`
- Team grid → `.ins-card.ins-card--team-member` inside `.ins-grid`
- Logo marquee → `.ins-marquee`
- Timeline → custom, not in kit scope (build from `.ins-card--interactive`)

### Privacy ([Privacy.html](../Privacy.html))
- Sticky TOC → `.ins-toc` with `data-sb-scrollspy`
- Long-form prose: use `.ins-text-body-lg` for lead, `.ins-text-body` for body
- Section anchors rely on `[id]` getting `scroll-margin-top: var(--ins-scroll-margin)` automatically

### Data Analytics Teams ([Data Analytics Teams.html](../Data%20Analytics%20Teams.html))
- Pain-point cards → `.ins-card.ins-card--pain-point`
- Comparison grid → `.ins-comparison`
- Metric pills → `.ins-badge.ins-badge--metric-pill`
- Connector tiles → `.ins-card.ins-card--connector`
- Chat demo → same as AI Chat page

## Visible changes from source

Dev team should expect these differences after retrofit. See the Risk register in the plan file for severity.

1. **Heading font** Clash Display → Geist (biggest single visual shift)
2. **Mono font** Space Mono → Geist Mono
3. **Primary button** gradient + glow → flat teal-600
4. **Breakpoints** 600/900 → 480/768/1024/1280
5. **Mobile animations** previously always-on → decorative disabled <768, state-communicating always on
6. **Surface colors**, spacing, radius: unchanged (kit preserves the source values)

Document these before/after in stakeholder review so there are no surprises.
