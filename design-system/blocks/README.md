# blocks/

Reserved for **reusable composite blocks** — multi-element patterns that are larger
than a single component but repeat across pages (e.g. a hero layout, the showcase
gallery, a dashboard/insight panel, the floating-chat widget). A block composes
tokens + components; it does not introduce new raw values.

## Status: intentionally empty (Phase 3.6)

No blocks were extracted during the strict pixel-identical migration, because the
candidates can't be consolidated without changing rendering:

- **Page `<style>` blocks are per-page _variants_** — e.g. entrance animations differ
  page to page (duration, with/without opacity). Merging them into one shared block
  would change motion on some pages, violating pixel-identity.
- **`app.css` globals are app-layer + order-coupled to Tailwind** — relocating them
  here via `@import` was tested and shifts the cascade (Vite hoists `@import` above
  `@tailwind`), so it is not a no-op. They correctly stay in `src/app.css`.

## When you add a block

1. Create `design-system/blocks/<name>.css`, consuming tokens + component classes only.
2. Wire it where it belongs in the cascade. Note: a plain `@import` in `index.css`
   loads **before** Tailwind utilities; if a block must override utilities, import it
   in the app layer **after** `@tailwind` (via a JS import, to avoid `@import` hoisting).
3. Verify pixel-identity (build + compare the minified CSS bundle hash before/after) if
   you're extracting existing styles rather than adding net-new ones.

See `../MIGRATION.md` → "Known remaining item" and "What was deliberately NOT changed".
