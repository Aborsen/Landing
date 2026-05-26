# Insightis Review Framework

A single rubric for auditing every surface in the program — marketing pages, the design system, and the web app. Apply it once per surface, file the findings into the shared structure, and the results stay comparable across owners, pages, and time.

> This file is **rubric-only**. It does not change per page.
> Per-page findings go into their own `*-audit-summary.md` (see `homepage-audit-summary.md` for the first instance).

---

## 1.1 Issue domain — Code vs Design

Every finding is tagged with **one** primary domain. This is the most important split — it routes the issue to the right owner and queue.

| Domain | What it covers | Owner |
|---|---|---|
| **Code** | Implementation problems that are invisible in a design tool but show up in HTML / CSS / JS: invalid markup, broken token references, mismatched token vocabularies between source files, off-grid inline values, missing `aria-*`, missing `<label>`, animation that ignores `prefers-reduced-motion`, etc. *Fix lives in code.* | Front-end engineer |
| **Design** | Visual / behavioral / UX inconsistencies visible to a user: wrong heading hierarchy, inconsistent CTA treatment, weak visual signal between paired cards, copy capitalisation drift, unclear placeholder copy, missing dropdown affordance, stock portrait usage, mixed iconography. *Fix lives in Figma first, then in code.* | Designer (with eng follow-up) |
| **Code + Design** | Dual — neither owner can drop it. Example: focus rings are both a token in the DS and a CSS rule on the page. | Joint |

---

## 1.2 Issue category (sub-tag, free for filtering)

| Category | Examples |
|---|---|
| Tokens | Two competing token vocabularies, unresolvable `var()`, raw hex / rgba bypassing alpha tokens |
| Typography | Off-scale font sizes, mixed font families, mono misuse, capitalisation drift, eyebrow rhythm |
| Color | Non-system grays, accent overuse, comparison cards without color signal |
| Spacing | Off the 4-px grid, uneven vertical rhythm between sections |
| Radius | Off-scale radii, inconsistent radius across the same component role |
| Components | Avatar shows image *and* initials, button corner radius drifts across roles, three styling systems mixed |
| Icons | Emoji as icons, mixed stroke widths, hard-coded stroke colors, unicode glyph eyebrows |
| Imagery | Stock portraits, vendor logos unbalanced in marquee |
| Navigation | Dropdown without affordance, CTAs to `#`, URLs with unencoded spaces |
| Accessibility | No `:focus-visible`, marquee duplicate not `aria-hidden`, sub-44 px tap targets, inputs without `<label>`, `prefers-reduced-motion` ignored |
| Heading hierarchy | Block-level inside `<h1>`, h2 mixing rule across sections, double-numbered steps |
| Content | Truncated placeholder, hero claim vs KPI mismatch, fragment CTA copy, duplicate copyright, raw social URLs as link text |
| Responsive | Legacy 600/900 px breakpoints vs canonical 480/768/1024/1280 |

---

## 1.3 Severity rubric

Use the **same** four-level scale for every page in the program.

| Severity | Definition | Example |
|---|---|---|
| **Critical** | Breaks the experience or actively misinforms the user. Visible to anyone in 5 s of viewing. Ship-blocker. | KPI strip reads "0x / 0% / 0+" instead of real values |
| **High** | Significantly deviates from the DS or causes friction. Erodes trust on close inspection. Should be fixed before the next public release. | Hero `<h1>` uses a font that isn't loaded; 5-feature list renders twice |
| **Medium** | Inconsistency, polish, partial-accessibility gap. Noticeable to a designer or a power user. | Button radius drifts across roles; marquee duplicate not `aria-hidden`; eyebrow capitalisation drift |
| **Low** | Cosmetic, taste-level, or low-impact accessibility. Address opportunistically. | Duplicate copyright symbol in footer; "99" decorative glyph in testimonials |

---

## 1.4 Insight structure — every entry uses these fields

Copy this block when adding a new finding. Empty fields are allowed; **Title / Domain / Severity / Section / Category / Current / Expected** are required.

```
ID            ISS-NN
Domain        Code | Design | Code + Design
Severity      Critical | High | Medium | Low
Section       <Page section the user sees, top-to-bottom>
Category      <One of the sub-tags from 1.2>
Title         <One line, present tense, factual>
Current       <2–3 sentences describing what is on the page now>
Expected      <2–3 sentences describing the DS / UX best-practice
              expectation; cites a token, rule, or WCAG criterion>
Visual        <Side-by-side render: "current" pane vs "per design system"
              pane. REQUIRED for every Design-domain entry. Optional for
              pure-Code entries where the visual is identical
              (e.g., aria-hidden tweaks).>
Notes         <Optional product-thinking note: scalability, why it
              matters, what we lose by leaving it.>
```

The `Visual` field is already implemented in [design-system-audit.html](design-system-audit.html) via the `compare: { bad, good }` object on each SEED item — the panes render automatically.

---

## 1.5 Out-of-scope (so we never re-flag them)

- **Third-party brand colors and logos** — vendor connector chips, integration marks, app-store badges. These are not our platform; the brand owner dictates the asset. Raw `#FF7A59` HubSpot orange is acceptable.
- **Placeholder copy / unfinished content** while a section is explicitly under construction — we flag *missing* placeholders (where nothing is there at all), not in-progress ones.
- **Backend / data behavior** — KPI counter animation logic, form submission flows, auth state. We flag the visible symptom only.

---

## 1.6 How the framework re-applies

| Re-use target | What changes between surfaces |
|---|---|
| Next marketing pages (Roadmap, AI Chat, About, Pricing, Privacy, Data Analytics Teams) | The Section list (1.7) is rewritten per page; categories + severity + insight template stay identical. |
| Design system itself ([design-system/](design-system/)) | Section list becomes "Foundations / Components / Patterns". Domains become "DS-Code" (token CSS) and "DS-Design" (component spec). Same severity + insight template. |
| Web app (post-login product surfaces) | Section list becomes "App shell / Page templates / Data views". Same categories + severity + insight template. |

The single shared rubric is the unlock — every finding across the program lands in one comparable taxonomy.

---

## 1.7 Page-section taxonomy (marketing pages)

Walk each marketing page **top to bottom** using this canonical list. Skip what doesn't apply; never invent a new section without first checking whether an existing one fits.

1. Header / Nav
2. Hero
3. Trust / proof strip (logos, stats)
4. Primary value pillar(s)
5. How it works / step list
6. Social proof / testimonials
7. KPI / numbers strip
8. Comparison / "Why us"
9. Final CTA
10. Footer
11. Global (cross-section concerns: tokens, focus rings, motion, responsive)

---

## Starter template for the next page

Paste this skeleton into `<page>-audit-summary.md` to start a fresh review with zero edits to this framework.

```markdown
# <Page name> — visual + UX audit

> Framework: see `review-framework.md`.
> Source: `<source filename>`. Verified <YYYY-MM-DD>. Breakpoints in scope: desktop, laptop, tablet, mobile.

## Severity totals
- Critical · High · Medium · Low · **Total**
- Code · Design

## Code domain — engineering queue
| ID | Sev | Section | Category | Title |
|---|---|---|---|---|

## Design domain — design queue (each entry has a visual recommendation)
| ID | Sev | Section | Category | Title | Visual recommendation (preview) |
|---|---|---|---|---|---|

## Sequencing
1. Stabilize — Criticals + token unblockers
2. Standardize — Highs (Code + Design)
3. Polish — Medium and Low, bundled per category
```
