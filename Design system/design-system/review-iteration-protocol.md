# Review iteration protocol

> Companion to [review-framework.md](review-framework.md). The framework defines **what** a finding looks like (domain, severity, category, section taxonomy, insight template). This document defines **how** an iterative review runs — how to compare a new pass against prior decisions, how to handle Accepted, Declined, and Resolved decisions, how to detect resolved / regressed / newly-introduced issues, and how to roll the same machinery across multiple pages without losing decision history.
>
> Reusable for every page in the program (Homepage, Roadmap, AI Chat, About, Pricing, Privacy, Data Analytics Teams …). Each page gets its own `<page>-review-log.md` driven by this protocol.

---

## 0. Vocabulary

| Term | Meaning |
|---|---|
| **Iteration** | One review pass against a specific evidence snapshot (HTML + screenshots at a date). Iteration N+1 is always compared against iteration N. |
| **Finding** | One `ISS-NN` issue with the schema defined in §1.4 of `review-framework.md` plus the iteration fields defined in §3 below. |
| **Status** | One of: `Pending Review` · `Accepted` · `Declined` · `Discuss` · `Backlog` · `Resolved` · `Impact Review Required`. |
| **Locked decision** | A finding with status `Declined` or `Resolved`. The decision is the user's; a future iteration **never overwrites it silently**. `Accepted` findings are **not** locked — they can be directly updated or highlighted with new evidence at any time; the update must be documented transparently via a Status-history row. |
| **Declined → archived (terminal)** | A `Declined` finding is moved out of the working log into `archive/declined-findings.md` and is **never re-proposed in any future iteration**. The ID is permanently reserved (never reused, never re-filed under the same Section × Category). Re-proposal is a protocol violation; if a previously-Declined symptom genuinely surfaces under a new lens, file a **new** ISS-NN with `Linked: supersedes: ISS-OLD` and require explicit user approval to break the lock. |
| **Status history** | Every status change is recorded as a row `{date, status, rationale}` on the finding. The history is append-only. |
| **Impact Review Required** | A signal raised when an iteration detects that the page context around a decision has changed significantly enough to potentially invalidate it. Most useful for `Declined` or `Resolved` findings. For `Accepted` findings, prefer a direct Status-history update unless the context change is large enough to warrant a separate investigation block. |
| **Source of truth** | The markdown log file (`<page>-review-log.md`). Dashboards, exports, and CSV/JSON derivatives are projections — never the canonical state. |

---

## 1. Pre-iteration snapshot

Before walking any findings, capture and freeze the evidence for the iteration so a future review can reproduce it:

1. **Source HTML** — copy the page snapshot into `iterations/YYYY-MM-DD/<page>.html` (or symlink if the snapshot is already named with a date).
2. **Screenshots** — capture at canonical breakpoints (1440×900 desktop · 1024 laptop · 768 tablet · 375 mobile) into `audit-screenshots/`. Add a date suffix if you want to retain comparison evidence across iterations (e.g. `s02-hero-2026-05-20.png`).
3. **Diff vs previous iteration** — run a textual diff against the previous iteration's source HTML. Record in the log header:
   - byte delta
   - whether key markup / content strings changed
   - whether token-related CSS changed
   - any indicators that a previously-filed issue may have been touched

If the diff is *nil* (the page is byte-equal to the previous iteration), record that explicitly. It means **no issue can be proposed as Resolved on the basis of the new render** — no markup changed, so any resolution would have to come from a deliberate user decision, not from the page itself.

---

## 2. Walk every issue currently in the log

In ID order. For each existing finding, classify against the new evidence into exactly one of six outcomes:

| Outcome | When it applies | What to do |
|---|---|---|
| **No change** | Issue still reproduces in the new snapshot; surrounding context unchanged. | Append a Status-history row `{date, <same status>, "Carried forward; reproduced in iteration N"}`. |
| **Resolved** (proposed) | The conditions that produced the issue are no longer present (the markup, class, value, content, or visual symptom is gone). | Propose `Status: Resolved` with a one-line diff explanation. **Never auto-flip a non-Resolved status to Resolved without explicit user confirmation in the next session.** Mark the proposal in the Status-history as `Resolved (proposed)` until confirmed. |
| **Partially Resolved** | Some of the symptoms named in the original Current/Recommendation are addressed; others remain. | Keep current Status. Append Status-history row noting which symptoms cleared and which remain. Flag in the end-of-pass report under "Quick wins" if the remaining gap is small, or under "Partially resolved — re-review" if it needs another decision pass. |
| **Regression** | A finding previously marked `Resolved` now reproduces again. | Propose Status revert to the most-recent pre-Resolved status (typically `Accepted` or `Pending Review`). Consider a Severity bump if the regression also worsens the impact. Flag prominently in the end-of-pass report under "Regressions". |
| **Impact Review Required** | The page context around an existing decision (`Accepted` / `Declined` / `Resolved`) has changed enough that the decision may no longer be valid — but the original symptom itself hasn't changed. Example: an Accepted spacing decision in a section that has since been restructured into a multi-column grid. | For **Accepted** findings: add a Status-history row describing what changed and what new information the user should weigh — no separate sibling block needed unless the change is large and warrants a standalone investigation. For **Declined / Resolved** findings: add a separate sibling block `ISS-NN-impact-IM` (where `IM` is the iteration number) linking to the original ID; the original Status-history gets one row noting `Impact Review raised (see ISS-NN-impact-IM)`. |
| **Newly Introduced** | The new snapshot exhibits a problem that wasn't present (or wasn't visible) before. **Only file as a new ISS-NN after duplicate detection (§3) clears it.** | File a new ISS-NN entry with `Status: Pending Review` and a Status-history row dated this iteration. |

**The user, not the protocol, decides every Status transition** other than `Pending Review → Pending Review` (i.e. carry-forward). The protocol *proposes*; the user *accepts*.

### 2a. Declined findings — terminal archive rule

When the user decides `Status: Declined` for a finding:

1. **Append the final Status-history row** to the finding (date, status `Declined`, one-line rationale citing the user's reason).
2. **Move the entire finding section** (heading + metadata table + Problem + Why It Matters + Recommendation + Evidence + Status-history) out of the working log and into `archive/declined-findings.md`. The working log keeps only Accepted findings.
3. **The ID is permanently reserved.** ISS-NN of a Declined finding is never reused, never re-filed, and never re-proposed in any future iteration — not even under a different lens. The Status summary in the working log shows Declined counts but no entries.
4. **No exception for "re-evidencing".** If a new iteration sees the same symptom that was previously Declined, the protocol does **not** re-surface it. The decline is the user's standing answer to that symptom.
5. **Escape valve — supersedes a Declined ID.** If a *different* problem genuinely surfaces in the same Section × Category that happens to share surface details with a Declined finding, file a **new** ISS-NN with `Linked: supersedes: ISS-OLD`. Surface to the user with explicit "this is not the same as the Declined ISS-OLD because…" justification. Filing under this escape valve requires the user's explicit "yes, file as new" — never auto-file.
6. **Iteration walks skip Declined IDs.** In §2, when walking findings in ID order, Declined entries are absent from the working log and therefore not walked. They do not appear in end-of-pass reports.

This rule overrides the §8 "do not delete entries" anti-pattern for `Declined`-status findings specifically: archival ≠ deletion. The findings remain on disk in `archive/declined-findings.md`, read-only.

---

## 3. Duplicate detection for net-new candidate findings

Before filing any new ISS-NN, run it through:

1. **Section × Category bucket — working log.** List every Accepted finding with the same Section and same Category as the candidate. If that bucket has ≥ 1 finding, compare titles + descriptions.
2. **Section × Category bucket — Declined archive.** Repeat the same lookup against `archive/declined-findings.md`. **If the candidate matches a Declined ID, do not file it.** The decline is the user's standing answer; re-surfacing is a protocol violation per §2a.5.
3. **Title-overlap heuristic** — if the candidate's title shares ≥ 70 % of its key noun phrases with an existing title (Accepted or Declined), treat as a likely duplicate / re-surfacing attempt.
4. **Default action on suspected duplicate of an Accepted ID** — **merge into the existing ID** by:
   - appending the new evidence to the existing finding's evidence list
   - adding a Status-history row noting "re-evidenced in iteration N from <screenshot path>"
   - **not** filing a new ID
5. **Default action on suspected duplicate of a Declined ID** — **do nothing.** The candidate is dropped silently; the iteration's duplicate-detection log records `dropped: candidate matched Declined ISS-NN`.
6. **Split only on explicit user approval** — when a candidate genuinely names a *different problem* in the same Section + Category as an existing Accepted finding, surface both to the user with "duplicate? merge or split?" before filing.
7. **Escape valve against Declined** — if the candidate is genuinely distinct from a near-match Declined finding (different root cause, different lens), file a new ISS-NN with `Linked: supersedes: ISS-OLD-DECLINED` and surface to the user for explicit approval before persisting (per §2a.5).

Duplicate decisions (merges, drops against Declined, splits, supersedes-of-Declined) are all recorded in an appendix in the log: `## Duplicate detection log — iteration N`. This keeps the audit trail complete.

---

## 4. Issue relationships — the `Linked` field

Every finding has an optional `Linked` field with structured relationship verbs:

| Verb | Meaning | Example |
|---|---|---|
| `blocks: ISS-NN` | This issue must be resolved before ISS-NN can be addressed. | Token-vocabulary unification (ISS-04) blocks every per-call-site token migration. |
| `depends-on: ISS-NN` | Cannot be addressed until ISS-NN lands. (Inverse of `blocks`.) | ISS-45 (non-system grays) depends-on the token-name reconciliation in ISS-04. |
| `duplicate-of: ISS-NN` | This finding was filed but later identified as a duplicate; kept as a redirect. | Used when a duplicate is detected after Pending Review status was assigned. Status flips to `Declined — duplicate`. |
| `supersedes: ISS-NN` | This newer finding replaces an older one (broader scope, better recommendation). The older one moves to `Declined — superseded`. | Rare; needs explicit user approval. |
| `related: ISS-NN` | Same family, no formal dependency. | Footer column balance + footer copyright duplicate. |

The end-of-pass report renders dependency chains using `blocks` / `depends-on`, so the user sees "fix this one first" suggestions wired in.

---

## 5. End-of-pass report — required 10-section structure

Every iteration ends with this exact 10-section block in the log:

1. **Critical blockers** — IDs with `Severity: Critical` that are not yet `Resolved` or `Declined`. List ID + one-line "why this is blocker".
2. **Quick wins** — IDs that are Low/Medium severity, Low complexity, High confidence, and where the fix is a one-line edit. Stack-ranked.
3. **Newly introduced issues** — IDs filed in this iteration. (May be empty if duplicate-detection merged everything.)
4. **Resolved issues** — IDs proposed as `Resolved` this iteration. The user confirms in the next session.
5. **Regressions** — IDs that were `Resolved` and now reproduce. Always Critical attention.
6. **Impacted accepted decisions** — IDs where `Impact Review Required` sibling blocks were raised.
7. **Systemic UX risks** — short prose (2–4 sentences) calling out cross-finding patterns: e.g. "the page assumes the visitor knows what a semantic layer is — three findings about jargon, one about flow ambiguity, one about no in-page navigation".
8. **DS maturity gaps** — short prose citing specific DS files. Where the page is using a pattern the DS doesn't formally publish, or where the page exposes a missing component state matrix.
9. **Scalability concerns** — short prose. Patterns that break at N=3 sections, N=12 testimonials, N=4 pillars, etc.
10. **Recommended next priorities** — ordered list of IDs the user should act on next. Three to seven items. Each one-line.

---

## 6. Re-application to other pages

This protocol is **page-agnostic**. To start a review on a new page:

1. Create `<page>-review-log.md` in the project root using the structure documented in §7 below.
2. Run iteration 1 (first-pass audit) using the framework's domain/severity/category taxonomy.
3. For every subsequent iteration, follow §1–§5 above.

Cross-page systemic patterns (e.g. "the chat-input component is custom on Homepage, custom on AI Chat, and slightly different on Platform — file a DS gap once and reference it from each page log") roll up into a future `program-review-log.md`. That program-level log is out of scope until at least two page logs exist; until then, cross-page concerns live in each page's "DS maturity gaps" section.

---

## 7. Log file structure (template)

Each `<page>-review-log.md` follows this shape:

```markdown
# <Page> — persistent review log

> Source HTML: <path>.html (<date>, <description of diff vs previous iteration>)
> Evidence: audit-screenshots/* (<date>)
> Framework: review-framework.md
> Iteration protocol: review-iteration-protocol.md
> Prior baselines: archive/<archive-folder>/

## Iteration history

| # | Date | What changed | Net new | Resolved | Regressions | Impact Reviews |
|---|---|---|---|---|---|---|

## Status summary (live)

|                          | Critical | High | Medium | Low | Total |
|---|---|---|---|---|---|
| Pending Review           |   |   |   |   |   |
| Accepted                 |   |   |   |   |   |
| Declined                 |   |   |   |   |   |
| Discuss                  |   |   |   |   |   |
| Backlog                  |   |   |   |   |   |
| Resolved                 |   |   |   |   |   |
| Impact Review Required   |   |   |   |   |   |
| **Total**                |   |   |   |   |   |

## Iteration N — end-of-pass report

1. Critical blockers
2. Quick wins
3. Newly introduced
4. Resolved
5. Regressions
6. Impacted accepted decisions
7. Systemic UX risks
8. DS maturity gaps
9. Scalability concerns
10. Recommended next priorities

## Duplicate detection log — iteration N

(or "None" if every candidate cleared without merge)

## Findings

### ISS-NN — <one-line title> (<Status>)

| | |
|---|---|
| Category | <UI / UX / DS / Accessibility / Scalability — the new framework's lens> |
| Domain | <Code / Design / Code+Design — the rubric's split> |
| Severity | <Critical / High / Medium / Low> |
| Area | <Header / Hero / Trust / Pillars / How it works / Testimonials / KPI / Comparison / Final CTA / Footer / Global> |
| Section (taxonomy) | <One of the 11 sections in review-framework §1.7> |
| Complexity | <Low / Medium / High> |
| Confidence | <High / Medium / Low> |
| Linked | <blocks: ISS-NN, depends-on: ISS-NN, related: ISS-NN, …> |

**Problem** — <Current state, 2–3 sentences, cites evidence.>

**Why It Matters**
- User impact: <…>
- Accessibility impact: <…>
- Consistency impact: <…>
- Readability impact: <…>
- Scalability impact: <…>
- Enterprise UX impact: <…>

(Use only the lenses that actually apply. A pure Code finding may only list "scalability impact" or "consistency impact". A UX finding may emphasize "user impact" and "cognitive load".)

**Recommendation** — <Concrete actionable improvement. Names the token, class, value, or pattern.>

**Visual** — <screenshot reference, or compare panes if a visual diff is meaningful>

**Status history**
| Date | Status | Rationale |
|---|---|---|
| YYYY-MM-DD | <status> | <one-line rationale> |
```

When a finding is filed as `Impact Review Required` (per §2), the sibling block uses ID format `ISS-NN-impact-IM`:

```markdown
### ISS-NN-impact-3 — Impact review against ISS-NN (Impact Review Required)

| | |
|---|---|
| Triggered by | Iteration 3, <date> |
| Original finding | [ISS-NN](#iss-nn) (Status: Declined / Resolved) |
| Reason for impact review | <What changed in the page context that may invalidate the original decision.> |
| Recommended user action | <Re-review and either confirm the original decision still holds, or move the original to Pending Review and re-decide.> |
```

The original ISS-NN entry's Status-history gets one row noting `Impact review raised — see ISS-NN-impact-3`. **The Status itself does not change** — the user must explicitly re-evaluate.

> **Note for `Accepted` findings:** use a direct Status-history row on the finding itself rather than a sibling block, unless the context change is large enough to warrant a standalone investigation block. `Accepted` findings can be updated directly — the transparency requirement is met by the Status-history row, not by a separate ID.

---

## 8. Anti-patterns (do not do these)

- **Renumber IDs.** `ISS-NN` is the single canonical primary key, immutable from filing to forever. Even when a finding is `Resolved` and stale, the ID stays.
- **Edit a baseline finding in place.** All changes are append-only via Status-history. If the Current/Expected text needs amendment because the original was wrong, file a `supersedes` link to a new ID instead.
- **Delete entries.** Findings are never deleted. `Declined` findings are *archived* (moved to `archive/declined-findings.md` per §2a) — they remain on disk forever, just out of the working log. Accepted / Pending / Discuss / Backlog / Resolved findings stay in the working log.
- **Re-propose a Declined finding.** Per §2a, Declined is terminal and the ID is permanently reserved. Re-surfacing the same symptom in a future iteration is a protocol violation. If a genuinely different problem shares surface details, file a new ISS-NN with `Linked: supersedes: ISS-OLD-DECLINED` and require explicit user approval (§2a.5).
- **Auto-flip any status → Resolved without user confirmation.** Even when the symptom is gone, propose `Resolved (proposed)` and wait for explicit confirmation. This applies to all statuses including `Accepted`.
- **Silently update an Accepted finding.** `Accepted` ≠ locked — Accepted findings can be directly updated or highlighted with new evidence. But every update must be documented in a Status-history row with a rationale. "Silent" (no Status-history row) is the anti-pattern, not the update itself.
- **Re-derive a domain from a category.** The Domain (Code / Design / Code+Design) is set once at filing time per `review-framework.md` §1.1. New iterations don't re-derive it.
- **Carry forward the entire end-of-pass report from a prior iteration.** Each iteration writes its own 10-section block. Stale reports get archived inside the file (collapsible) but never overwritten in place.
- **Mix decision rationale into the Recommendation field.** Recommendation = the fix. Rationale = the Status-history row that decided the fate of the finding. Keep them separate.
