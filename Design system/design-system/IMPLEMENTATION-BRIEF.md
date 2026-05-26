# Homepage — Implementation Brief (Iteration 3, 2026-05-20)

> One-page handoff for the engineer / agent implementing the iteration-3 review decisions.
> Assumes the project tree is already available (Homepage source, `design-system/`, `colors_and_type.css`, `Homepage_files/`, `audit-screenshots/`).

---

## 1. What to read first

- **[homepage-review-log.md](homepage-review-log.md)** — source of truth for all 97 findings and their per-finding Status.
- **[review-framework.md](review-framework.md)** — taxonomy (Category / Domain / Severity / Section).
- **[design-system/](design-system/)** — canonical tokens (`assets/tokens.css`) and component reference (`components/*.html`, `foundations/*.html`).

---

## 2. Scope rule (read carefully)

**Implement everything in `homepage-review-log.md`.** All 57 findings in the working log are `Status: Accepted` and ready to land.

What's NOT in the working log:
- **40 Declined findings** have been moved to [`archive/declined-findings.md`](archive/declined-findings.md). They are **never re-proposed** in future iterations — IDs are permanently reserved. **Do not implement anything from the declined archive**, even if a symptom looks similar to an Accepted finding.
- **0 Pending Review.** Iteration is fully decided.

If something in the declined archive looks like it *must* be fixed in passing while implementing an Accepted finding, **stop and flag it back to the user**. Do not silently fix declined items.

---

## 3. Order of operations (dependency-gated)

PRs land in this sequence. Each gate blocks the next.

### Gate 1 — Critical (single PR each)
- **ISS-01** — Hero `<h1>` block-level children (WCAG 1.3.1).
- **ISS-02** — KPI strip zero-flash on initial render (SEO + no-JS).

### Gate 2 — Token vocabulary unification (blocks ALL token migrations)
- **ISS-04** — `tokens.css` is canonical. Add legacy aliases in `colors_and_type.css` so the canonical file is self-sufficient. **Call sites use semantic tokens only — never primitives from either file.**
- **ISS-44** — Pick one font-family naming convention; alias the other.

### Gate 3 — Text hierarchy sweep (depends on Gate 2)
- **ISS-91** — Full audit: replace all 36 raw-hex text classes with semantic tokens.
- **ISS-90** — Apply `--ins-text-body` (= `var(--ins-gray-300)`) to `.sc-desc`, `.section-sub`, testimonial quotes, Final CTA supporting copy.
- **ISS-45** — Non-system grays in Tailwind arbitrary classes → semantic tokens.
- **ISS-93** — Headline word-highlights: use `--ins-text-highlight: var(--ins-color-teal-400)` (NOT `--ins-primary-400`). Apply to hero H1, mid-page CTA, Final CTA.
- **ISS-55** — Distinguish visual typography tokens from semantic HTML heading structure.
- **ISS-65** — KPI numbers `font-weight: 500` → `700`.
- **ISS-57** — Eyebrow color drift → `--ins-text-highlight`.

### Gate 4 — Accessibility sweep
- **ISS-24** + **ISS-77** — Global `:focus-visible` ring per DS (`outline: 1.5px solid var(--ins-border-focus)` + `box-shadow: 0 0 0 3px rgba(9,160,157,.2)`).
- **ISS-23** — Inputs need associated `<label>` (visually-hidden if needed).
- **ISS-48** — Respect `prefers-reduced-motion`.
- **ISS-72** — Mobile hamburger → `.ins-btn--icon` (44×44 default).
- **ISS-03** — Marquee respects `prefers-reduced-motion`.

### Gate 5 — Hero chat-widget DS pass
- **ISS-92** — Nav "Start for Free" → `.ins-btn.ins-btn--primary`.
- **ISS-76** — Send button: inactive (empty input) → active/teal (input filled). Use DS `.ins-btn` state matrix. **Not** disabled→enabled; rather inactive→active.
- **ISS-99** — Connectors / Gemini Pro chips: `--ins-text-body` text, `1px solid var(--ins-border-default)` border, `--ins-surface-hover` background, hover lifts to `--ins-border-hover`. Use `.ins-chip` or `.ins-badge--interactive` if published.
- **ISS-52** — Send button tier per DS.
- **ISS-39** — Hero trust-line layout cleanup.

### Gate 6 — Quick-win batch (one PR, low risk)
ISS-14 (footer duplicate ©) · ISS-43 (drop inline `font-family: 'Outfit'`) · ISS-69 (Final CTA span whitespace) · ISS-31 (Lucide SVG instead of ✦) · ISS-34 (**remove → from all CTAs — do not add to more**) · ISS-50 (CTA copy).

### Gate 7 — Component / layout polish
- **ISS-36** — Container geometry principle (see §4).
- **ISS-37** — Connector logos: wrap each in 32×32 container, render monochrome via `currentColor` at `--ins-text-body`.
- **ISS-58** — Eyebrows: banners and hero exempt; **content sections required**.
- **ISS-19** — Replace emoji glyphs with Lucide SVG icons.
- **ISS-94** — Mid-page CTA placeholder: replace generic meta-question with concrete query example.

### Gate 8 — Remaining accepted items
Everything else with `Status: Accepted` not listed above (Trust, Pillars, Testimonials, Comparison, Footer cleanup ISS-95/96/98).

---

## 4. Five systemic principles (read before any PR)

These came out of the user's review and apply across the page, not just to the individual findings that triggered them:

1. **Semantic tokens only at call sites.** Never reference `--ins-primary-*`, `--ins-color-teal-*`, `--ins-gray-*` directly. Use `--ins-text-body`, `--ins-text-heading`, `--ins-text-highlight`, `--ins-text-inactive`, `--ins-text-disabled`, `--ins-surface-page`, `--ins-border-default`, `--ins-interactive-primary`, etc.

2. **DS state tokens drive interactive elements.** Every chip / button / input reads its visual state from a DS token. The four states are **inactive** (empty / passive) · **active** (engaged / filled) · **hover** · **focus** · **disabled** (genuinely unavailable). Do **not** conflate inactive with disabled.

3. **Container geometry — nested elements respect parent roundness.** If a parent container uses rounded corners, nested interactive elements visually respect the same geometry. Rounding need not be identical but must feel intentionally related. Avoid sharp/mismatched corners that break the softness of the surrounding container.

4. **Decoration vocabulary is uniform.** Lucide SVG icons only — no Unicode glyphs (✦, →, emoji). Trailing arrows on CTAs were explicitly **removed**, not added to more.

5. **Mocks / placeholders / pre-launch content are exempt from page-level rules.** Sub-12 px text inside illustrative mocks, mock buttons under 44×44, `href="#"` on pre-launch CTAs, footer routes with spaces — all explicitly declined. Don't "fix" them.

---

## 5. Token reference (canonical, from `design-system/assets/tokens.css`)

| Role | Token | Value |
|---|---|---|
| Heading text | `--ins-text-heading` | white (19.35:1) |
| Body / paragraph / description | `--ins-text-body` | `var(--ins-color-gray-200)` = `#A8BFC8` (6.94:1) |
| Placeholder / passive text | `--ins-text-inactive` | `var(--ins-color-gray-300)` = `#7FA0AC` (6.94:1) |
| Disabled interactive element | `--ins-text-disabled` | `var(--ins-color-gray-400)` = `#6E8D9A` (5.04:1, WCAG-exempt) |
| Link / accent / headline highlight | `--ins-text-highlight` | `var(--ins-color-teal-400)` = `#0EC4C1` (8.92:1) |

`text-inactive` ≠ `text-disabled`. `text-inactive` is for placeholder/passive (e.g. unfilled input value); `text-disabled` is for genuinely disabled elements only.

---

## 6. Verification

For each Accepted PR:

1. The Status-history row in the finding's log entry lists the user's exact recommendation — implement what it says.
2. Visual check against `audit-screenshots/` for findings flagged with screenshot evidence.
3. Token check: `grep -E "color:\s*#[0-9a-fA-F]" <changed-file>` — should return 0 hits after a text-hierarchy PR.
4. WCAG contrast: any text-color change preserves AA contrast on `--ins-surface-page`.
5. Component check: any `.ins-btn` / `.ins-chip` / `.ins-avatar` usage matches the published prop API in `design-system/components/`.

---

## 7. Out of scope for this iteration

- Renumbering `ISS-NN` IDs (they're immutable).
- Editing the `Problem` / `Recommendation` / `Why It Matters` fields in `homepage-review-log.md` — those are append-only via Status-history rows.
- Implementing Pending Review or Declined findings.
- Updating `review-framework.md` (a separate task per ISS-55's accepted note about semantic-vs-visual heading distinction).

---

## 8. After PRs merge

When all Accepted findings are landed and the page has new HTML / new screenshots, open **iteration 4** by following [review-iteration-protocol.md](review-iteration-protocol.md) §1–§5. The first comparison pass should diff against the iteration-3 post-review state captured in this log.
