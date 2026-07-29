// The six solutions pages, in one place.
//
// Consumers: src/components/SolutionsAccordion.jsx, rendered on the home page only.
// src/components/Header.jsx and Footer.jsx still carry their own
// label→URL nav maps covering all ~22 site links — folding those into this module
// means restructuring the whole nav config, which is a separate job.
//
// `desc` is the Solutions nav dropdown's copy verbatim, so a page describes itself the
// same way wherever you meet it. `short` is the tail of the CTA ("Solutions for
// revenue teams"), kept separate because the card title is capitalised differently.
//
// `image` is a 610×520 WebP in public/assets/solutions/, named after the page slug.
// A null image is not a bug — the panel falls back to a brand-tinted gradient.
//
// Provenance, since these are the first local photos in the repo:
//   revenue / product / analytics / finance — devart.com's own home-page accordion set
//     (cdn0.devart.com/images/home/accordion/{database-developer, software-developer,
//     data-analyst, database-administrator}.webp). Same company, reused with permission.
//   executive  — Unsplash photo-1541746972996-4e0b0f43e02a
//   marketing  — Unsplash photo-1758873269035-aae0e1fd3422
// Both Unsplash images are standard Unsplash License (free, commercial use, no
// attribution required) — NOT Unsplash+/premium_photo, which is separately licensed.
// Everything is stored locally rather than hotlinked; the remaining Unsplash hotlinks
// in BlogPost.jsx/blog.jsx/success-stories.jsx are still outstanding (see the TODO at
// src/components/BlogPost.jsx).
//
// URLs are written without a trailing slash to match Header.jsx/Footer.jsx. Note
// public/sitemap.xml and the canonical tags use a trailing slash; vercel.json sets
// cleanUrls, so both resolve. Pre-existing inconsistency, not introduced here.

export const SOLUTIONS = [
  {
    id: 'revenue',
    title: 'For Revenue Teams',
    short: 'revenue teams',
    desc: 'Revenue operations and business intelligence',
    href: '/solutions/revenue-teams',
    image: '/assets/solutions/revenue-teams.webp',
  },
  {
    id: 'executive',
    title: 'For Executive Teams',
    short: 'executive teams',
    desc: 'Strategic KPIs and company health at a glance',
    href: '/solutions/executive-teams',
    image: '/assets/solutions/executive-teams.webp',
  },
  {
    id: 'marketing',
    title: 'For Marketing Teams',
    short: 'marketing teams',
    desc: 'Campaign analytics and cross-channel attribution',
    href: '/solutions/marketing-teams',
    image: '/assets/solutions/marketing-teams.webp',
  },
  {
    id: 'product',
    title: 'For Product Teams',
    short: 'product teams',
    desc: 'Usage metrics and feature adoption tracking',
    href: '/solutions/product-teams',
    image: '/assets/solutions/product-teams.webp',
  },
  {
    id: 'analytics',
    title: 'For Analytics Teams',
    short: 'analytics teams',
    desc: 'Advanced querying and data exploration',
    href: '/solutions/analytics-teams',
    image: '/assets/solutions/analytics-teams.webp',
  },
  {
    id: 'finance',
    title: 'For Finance Teams',
    short: 'finance teams',
    desc: 'Cost tracking and operational efficiency',
    href: '/solutions/finance-teams',
    image: '/assets/solutions/finance-teams.webp',
  },
];

// Copy for the home page. The component takes title/lede overrides if the section is
// ever mounted somewhere the "six starting points" pitch does not fit.
// Not "Built for …": the Features section immediately above this one on the home page
// is already "Built for decision velocity", and two adjacent headings opening on the
// same word read as a template.
export const SOLUTIONS_HEADING = 'Made for every team';
export const SOLUTIONS_LEDE =
  'Six starting points, one semantic layer. Pick the team you are on and see the metrics, connectors and questions Insightis already handles.';
