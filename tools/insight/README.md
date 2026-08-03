# Insight — local map of this site

A localhost dashboard answering two questions: **what is connected to what**, and
**what should we do about it**.

```bash
npm run insight
```

→ <http://localhost:4318>. Re-run and refresh to update; nothing is cached.

```bash
npm run insight:build    # regenerate data.json only
npm run insight:check    # regenerate, then assert the analyzer is not lying
```

## The five tabs

| Tab | Answers |
| --- | --- |
| **Relations** | Shell → page module → shared components → stylesheets, resolved. Fan-in per shared component, so you can see the blast radius before editing one. |
| **Not used** | Files nothing imports, components never rendered, orphaned stylesheets, byte-identical duplicates, class names never mentioned. |
| **Combine** | Component names defined in more than one file, split into *identical* (replaceable with an import today) and *variants* (drifted, needs a prop). |
| **Health** | The wiring that has actually broken production: the four places an `/api` route must be registered, the env vars the server reads vs the ones the container is given, and drift between the two hand-maintained entry maps. |
| **Actions & ideas** | The backlog, with evidence per item — plus the non-goals, so a later pass doesn't redo analysis that already concluded "don't". |

## Why this exists alongside graphify

Graphify gives an accurate JS **import** graph. That leaves the three things this
repo keeps breaking invisible:

- **JSX usage.** `<Hero />` is neither a call nor an import, so no AST edge exists
  for it. Ask an import graph which components are unused and it returns 341
  candidates including `App()` in every page file. Resolving JSX element usage is
  what makes that list short enough to act on — here it is 64.
- **CSS.** 63 stylesheets reached through a four-level `@import` chain from
  `src/app.css` plus one `<link>` per shell. No AST graph sees any of it.
- **Config parity.** Both waitlist outages were a registration missing from one of
  several files. Neither is a code edge.

## Trusting the numbers

`analyze.mjs` is a scanner, not a compiler. Strings, comments and regex literals
are blanked before any structural pattern is applied, which removes the whole
class of "matched something inside a comment" error. Everything that went wrong
while building it is now a permanent assertion in `verify.mjs`:

- reported line numbers really contain the definition they name — offsets drifted
  by one per emoji, because `Array.from` walks code points and String indices
  count UTF-16 units
- no component span is absurd — `</svg>` parsed as a regex literal ate hundreds of
  lines at a time
- components that provably render are absent from the dead list — an apostrophe in
  JSX text opened a string that swallowed the next brace
- braces balance in every file after blanking; any file that fails is published on
  the Health tab as **parsed with doubt**, because a dashboard that quietly guesses
  is worse than one that admits a gap

Run `npm run insight:check` after touching the analyzer. It exits non-zero.

## Files

| | |
| --- | --- |
| `analyze.mjs` | all measurement; writes `data.json` |
| `verify.mjs` | assertions against `data.json` |
| `serve.mjs` | static server, node built-ins only, serves this directory |
| `backlog.json` | **hand-maintained.** Edit directly; `"status": "done"` strikes an item through |
| `index.html` `app.js` `styles.css` | the dashboard; no build step, no dependencies |
| `data.json` | generated, git-ignored |

Deliberately depends on nothing: no Vite, no npm packages, no network. Half of
what this tool is for is diagnosing the site's own toolchain, so it cannot need it.
