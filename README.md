# Insightis Landing

Marketing site for Insightis — AI analytics workspace by [Devart](https://www.devart.com/).

Live: <https://insightis-landing.vercel.app>

## Stack

- **Vite + React 18** for the home page (`index.html` ← `src/main.jsx`)
- **Static HTML + Babel-CDN inline JSX** for every other page under `public/` (Pricing, Platform/*, Solutions/*, Resources/*, Security/*, blog, docs). Each page is self-contained — its own React/Tailwind via CDN, no build step.
- **Tailwind CSS** — compiled via `@tailwind` directives in `src/app.css` for the home page; loaded from `cdn.tailwindcss.com` in the standalone pages.
- **`public/showcase.js`** drives the 5-step animated showcase on the home page (Data Sources → Semantic Layer → AI Chat → Drill in → Audit Trail).

## Layout

```
index.html              — Vite entry; root <div id="root"> mounts main.jsx
src/
  main.jsx              — full home page (Header, Hero, Features, Pricing teaser, Footer)
  app.css               — Tailwind + page styles
public/
  Pricing.html          — /Pricing.html
  blog/index.html       — /blog/  (clean URL, future posts at /blog/<slug>)
  docs/index.html       — /docs/
  Platform/*.html       — /Platform/AI Chat.html, /Platform/Integrations.html, /Platform/Semantic Layer.html
  Resources/*.html      — Connectors, Contact Support, Prompt Library, Roadmap
  Solutions/*.html      — RevOps BizOps, Founders CEOs, Marketing Teams, Product Teams, Data Analytics Teams, Operations Finance
  Security/*.html       — Privacy, Terms, Security, Cookie Settings
  Design system/        — design tokens, fonts, components reference
  showcase.js           — home page showcase animation
```

Anything in `public/` is copied verbatim to `dist/` by Vite. URL paths mirror the folder layout.

## Header / Footer

The canonical Header + Footer block lives in `public/Resources/Connectors.html` (the `function MenuIcon` ... `function Footer` region). All other standalone pages copy this block with `linkUrls` adjusted for their depth (`../Platform/...` from `Resources/`, etc.). The home page uses an equivalent React version inside `src/main.jsx`.

When updating navigation, edit the canonical first, then propagate. If `Blog` or `Documentation` ever moves out of `/blog/` or `/docs/`, update every `linkUrls` map.

## Develop

```bash
npm install
npm run dev          # Vite dev server (home page hot-reloads; static pages need a hard refresh)
npm run build        # → dist/
npm run preview      # serve dist/ locally
```

The Vite dev server only hot-reloads the home page. The standalone pages under `public/` are served as-is — edit and refresh.

## Deploy

Vercel project `insightis-landing`, auto-deploys on push to `master`:

```bash
git push origin master
```

Force a production deploy without waiting for the GitHub trigger:

```bash
npx vercel --prod --yes
```

`vercel.json` sets `framework: vite`, build command `npm run build`, output `dist/`.

## Conventions

- **Don't add backwards-compatibility shims**. If something is unused, delete it.
- **No section redesigns inside a content tweak**. Stay scoped.
- Headers, footers, and the showcase share components/templates — verify in a browser before claiming done. The showcase in particular has fragile absolute-positioned panels; don't bulk-delete DOM that `public/showcase.js` references.
- Don't put React-built routes under `public/` — that folder is for the static Babel-CDN pages and assets.
