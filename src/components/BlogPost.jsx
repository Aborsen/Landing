import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import Header from './Header';
import Footer from './Footer';

import whatIsAiMd           from '../../blog/Articles/what-is-ai-data-analysis.md?raw';
import bestAiToolsMd        from '../../blog/Articles/best-ai-data-analysis-tools.md?raw';
import marketingAnalyticsMd from '../../blog/Articles/marketing-analytics-tools.md?raw';
import selfServiceBiMd      from '../../blog/Articles/self-service-bi-guide.md?raw';

/* ───────────────────────── helpers ───────────────────────── */

export function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  m[1].split(/\r?\n/).forEach(line => {
    const eq = line.indexOf(':');
    if (eq > 0) {
      const k = line.slice(0, eq).trim();
      let v = line.slice(eq + 1).trim();
      v = v.replace(/^["'](.*)["']$/, '$1');
      meta[k] = v;
    }
  });
  // Best-effort tag-array parse (line is something like: tags: ["a", "b"])
  if (typeof meta.tags === 'string' && meta.tags.startsWith('[')) {
    try { meta.tags = JSON.parse(meta.tags); } catch { /* leave as string */ }
  }
  return { meta, body: m[2] };
}

export function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return iso; }
}

export function readingMinutes(text) {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function slugify(s) {
  return (s || '').toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/* ───────────────────────── shared data ───────────────────────── */

// Topic-relevant cover photos. Swap to /assets/blog/<slug>.webp once real
// assets are produced.
export const COVER_IMAGES = {
  'what-is-ai-data-analysis':    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&h=840&fit=crop&q=80',
  'best-ai-data-analysis-tools': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=840&fit=crop&q=80',
  'marketing-analytics-tools':   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=840&fit=crop&q=80',
  'self-service-bi-guide':       'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&h=840&fit=crop&q=80',
};

const _SOURCES = [
  { slug: 'what-is-ai-data-analysis',    md: whatIsAiMd },
  { slug: 'best-ai-data-analysis-tools', md: bestAiToolsMd },
  { slug: 'marketing-analytics-tools',   md: marketingAnalyticsMd },
  { slug: 'self-service-bi-guide',       md: selfServiceBiMd },
];

export const POSTS = _SOURCES.map(({ slug, md }) => {
  const { meta, body } = parseFrontmatter(md);
  return {
    slug,
    url: `/blog/${slug}`,
    title: meta.title || slug,
    description: meta.description || '',
    category: meta.category || 'Article',
    date: formatDate(meta.publishDate || meta.date),
    readTime: `${readingMinutes(body)} min`,
    image: COVER_IMAGES[slug] || '',
    tags: Array.isArray(meta.tags) ? meta.tags : [],
  };
});

/* ───────────────────────── icons ───────────────────────── */

function XIcon({ size = 16 })  { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>; }
function LinkedInIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>; }
function RedditIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.067 13.137a1.624 1.624 0 0 1-1.624 1.624c-.42 0-.8-.16-1.085-.42-1.058.762-2.518 1.252-4.143 1.314l.7-3.293 2.287.48a1.16 1.16 0 1 0 .115-.55l-2.554-.543a.275.275 0 0 0-.325.213l-.778 3.66c-1.652-.054-3.138-.545-4.207-1.315a1.62 1.62 0 0 1-1.084.42 1.624 1.624 0 0 1-.66-3.107c-.054-.21-.082-.43-.082-.658 0-2.227 2.59-4.033 5.78-4.033 3.19 0 5.78 1.806 5.78 4.033 0 .224-.028.443-.082.65a1.622 1.622 0 0 1 .961 1.485zm-9.78-.13a1.16 1.16 0 1 1 2.32 0 1.16 1.16 0 0 1-2.32 0zm6.59 2.65a4.65 4.65 0 0 1-2.873.954 4.65 4.65 0 0 1-2.872-.953.275.275 0 1 1 .354-.42 4.1 4.1 0 0 0 2.518.83 4.1 4.1 0 0 0 2.519-.83.275.275 0 0 1 .354.42zm.092-1.49a1.16 1.16 0 1 1 0-2.32 1.16 1.16 0 0 1 0 2.32z"/></svg>; }
function LinkIcon({ size = 16 })  { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>; }
function CheckIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>; }
function ArrowRightIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>; }

/* ───────────────────────── sub-components ───────────────────────── */

function ShareButtons({ slug, title }) {
  const [copied, setCopied] = useState(false);
  const fullUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://insightis.ai/blog/${slug}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title || '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const baseBtn = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '8px 14px',
    background: 'var(--ins-surface-card)',
    border: '1px solid var(--ins-border-default)',
    borderRadius: 'var(--ins-radius-pill)',
    color: 'var(--ins-text-body)',
    fontSize: '13px', fontWeight: 500,
    textDecoration: 'none',
    fontFamily: 'var(--ins-font-family-sans)',
    cursor: 'pointer',
    transition: 'border-color 180ms, color 180ms',
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', margin: '32px 0', paddingTop: '24px', borderTop: '1px solid var(--ins-border-default)' }}>
      <span style={{ fontSize: '13px', color: 'var(--ins-text-inactive)', marginRight: '4px' }}>Share</span>
      <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" style={baseBtn}><XIcon /> X</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" style={baseBtn}><LinkedInIcon /> LinkedIn</a>
      <a href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Reddit" style={baseBtn}><RedditIcon /> Reddit</a>
      <button onClick={handleCopy} aria-label="Copy article URL" style={{ ...baseBtn, color: copied ? 'var(--ins-text-highlight)' : 'var(--ins-text-body)' }}>
        {copied ? <CheckIcon /> : <LinkIcon />} {copied ? 'Copied' : 'Copy URL'}
      </button>
    </div>
  );
}

function TableOfContents({ items }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    if (items.length === 0 || typeof window === 'undefined') return;
    const obs = new IntersectionObserver((entries) => {
      // Pick the topmost intersecting entry; fall back to last one we saw above the viewport.
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  if (items.length === 0) return null;
  return (
    <aside className="blog-toc">
      <div style={{ position: 'sticky', top: '96px' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ins-text-inactive)', marginBottom: '12px' }}>On this page</p>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {items.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  style={{
                    display: 'block',
                    padding: '6px 10px',
                    borderLeft: '2px solid',
                    borderLeftColor: active === item.id ? 'var(--ins-text-highlight)' : 'transparent',
                    fontSize: '13px',
                    lineHeight: 1.45,
                    color: active === item.id ? 'var(--ins-text-heading)' : 'var(--ins-text-inactive)',
                    textDecoration: 'none',
                    transition: 'color 150ms, border-color 150ms',
                  }}
                >{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

function CTABanner() {
  return (
    <section style={{
      marginTop: '64px',
      borderRadius: 'var(--ins-radius-xl)',
      border: '1px solid var(--ins-border-brand)',
      background: 'linear-gradient(135deg, var(--ins-surface-brand-tint) 0%, var(--ins-surface-card) 60%, var(--ins-surface-brand-tint) 100%)',
      padding: '32px 32px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--ins-color-teal-a-50), transparent)' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <div style={{ flex: '1 1 280px' }}>
          <h3 style={{
            fontSize: '22px',
            fontWeight: 600,
            color: 'var(--ins-text-heading)',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}>Ready to stop exporting CSVs?</h3>
          <p style={{ fontSize: '14px', color: 'var(--ins-text-body)', lineHeight: 1.55, maxWidth: '420px' }}>
            Insightis connects your stack and gives every team instant, governed answers — no SQL, no analyst queue. Free to start.
          </p>
        </div>
        <a
          href="/auth/sign-up/"
          className="ins-btn ins-btn--primary ins-btn--md"
          style={{ flexShrink: 0 }}
        >
          Start for Free <ArrowRightIcon />
        </a>
      </div>
    </section>
  );
}

function RelatedArticles({ currentSlug }) {
  const others = POSTS.filter(p => p.slug !== currentSlug).slice(0, 3);
  if (others.length === 0) return null;
  return (
    <section style={{ marginTop: '80px', borderTop: '1px solid var(--ins-border-default)', paddingTop: '40px' }}>
      <h2 style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--ins-text-inactive)',
        marginBottom: '20px',
      }}>Related articles</h2>
      <div className="blog-related-grid">
        {others.map(p => (
          <a key={p.slug} href={p.url} className="blog-related-card">
            <div className="blog-related-cover">
              {p.image && <img src={p.image} alt="" loading="lazy" />}
            </div>
            <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{
                alignSelf: 'flex-start',
                fontSize: '10px',
                padding: '3px 8px',
                borderRadius: 'var(--ins-radius-pill)',
                background: 'var(--ins-surface-brand-tint)',
                border: '1px solid var(--ins-border-brand)',
                color: 'var(--ins-text-highlight)',
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}>{p.category}</span>
              <h3 style={{
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--ins-text-heading)',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>{p.title}</h3>
              <div style={{ fontSize: '11px', color: 'var(--ins-text-disabled)', fontFamily: 'var(--ins-font-family-mono)', marginTop: 'auto' }}>
                {p.date} · {p.readTime} read
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── BlogPost ───────────────────────── */

/**
 * BlogPost — single article layout:
 *  Header
 *  └── grid: <article> + sticky TOC sidebar (desktop)
 *       ├── cover, meta, title, description, author, share (top)
 *       ├── prose body (with anchor IDs on h2 for TOC)
 *       ├── share (bottom)
 *       ├── CTA banner
 *       └── related articles
 *  Footer
 */
export default function BlogPost({ markdown, slug }) {
  const { meta, body } = parseFrontmatter(markdown);
  const bodySansH1 = body.replace(/^\s*#\s+[^\n]*\n+/, '');
  const rawHtml = marked.parse(bodySansH1);

  // Inject id attributes on H2 elements + build the TOC list from them.
  const toc = [];
  const usedIds = new Set();
  const html = rawHtml.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (_match, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    let id = slugify(text) || `section-${toc.length + 1}`;
    let candidate = id, n = 2;
    while (usedIds.has(candidate)) { candidate = `${id}-${n++}`; }
    id = candidate;
    usedIds.add(id);
    toc.push({ id, text });
    return `<h2 id="${id}"${attrs || ''}>${inner}</h2>`;
  });

  const minutes = readingMinutes(bodySansH1);
  const cover = (slug && COVER_IMAGES[slug]) || null;
  const tags = Array.isArray(meta.tags) ? meta.tags : [];

  return (
    <div className="font-body">
      <Header />
      <main style={{ paddingTop: '32px' }}>
        <div className="blog-shell">
          <article className="blog-article">
            {/* Cover image */}
            {cover && (
              <div style={{
                marginBottom: '32px',
                borderRadius: 'var(--ins-radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--ins-border-default)',
                aspectRatio: '16 / 9',
                background: 'var(--ins-surface-card)',
              }}>
                <img src={cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            )}

            {/* Meta strip */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', marginBottom: '20px', fontSize: '13px', color: 'var(--ins-text-inactive)' }}>
              {meta.category && (
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--ins-radius-pill)',
                  background: 'var(--ins-surface-brand-tint)',
                  border: '1px solid var(--ins-border-brand)',
                  color: 'var(--ins-text-highlight)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}>{meta.category}</span>
              )}
              {(meta.publishDate || meta.date) && <span>{formatDate(meta.publishDate || meta.date)}</span>}
              <span>· {minutes} min read</span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--ins-text-heading)',
              marginBottom: '16px',
              textWrap: 'balance',
            }}>{meta.title || 'Untitled'}</h1>

            {/* Description */}
            {meta.description && (
              <p style={{
                fontSize: '17px',
                lineHeight: 1.55,
                color: 'var(--ins-text-body)',
                marginBottom: '24px',
                textWrap: 'pretty',
              }}>{meta.description}</p>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {tags.map(t => (
                  <span key={t} style={{
                    fontSize: '11px',
                    padding: '3px 9px',
                    borderRadius: 'var(--ins-radius-pill)',
                    background: 'var(--ins-surface-card)',
                    border: '1px solid var(--ins-border-default)',
                    color: 'var(--ins-text-inactive)',
                  }}>#{t}</span>
                ))}
              </div>
            )}

            {/* Author */}
            {meta.author && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13px',
                color: 'var(--ins-text-inactive)',
                marginBottom: '32px',
                paddingBottom: '24px',
                borderBottom: '1px solid var(--ins-border-default)',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--ins-text-highlight), var(--ins-color-teal-650))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 600, color: 'var(--ins-color-white)', flexShrink: 0,
                }}>{(meta.author || '?').slice(0, 1)}</div>
                <div>By <span style={{ color: 'var(--ins-text-heading)', fontWeight: 500 }}>{meta.author}</span></div>
              </div>
            )}

            {/* Body */}
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />

            {/* Share — bottom */}
            <ShareButtons slug={slug} title={meta.title} />

            {/* CTA banner */}
            <CTABanner />

            {/* Related articles */}
            <RelatedArticles currentSlug={slug} />
          </article>

          <TableOfContents items={toc} />
        </div>
      </main>

      <style>{`
        /* Grid shell — article + TOC sidebar */
        .blog-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 80px;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 32px;
        }
        @media (min-width: 1100px) {
          .blog-shell {
            grid-template-columns: minmax(0, 760px) 240px;
            gap: 64px;
            justify-content: center;
          }
        }
        .blog-article { min-width: 0; }
        .blog-toc { display: none; }
        @media (min-width: 1100px) {
          .blog-toc { display: block; }
        }

        /* Related-articles grid */
        .blog-related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 720px) {
          .blog-related-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .blog-related-card {
          background: var(--ins-surface-card);
          border: 1px solid var(--ins-border-default);
          border-radius: var(--ins-radius-xl);
          overflow: hidden;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          transition: border-color 180ms, transform 180ms;
        }
        .blog-related-card:hover { border-color: var(--ins-border-hover); transform: translateY(-2px); }
        .blog-related-cover {
          aspect-ratio: 16 / 9;
          background: var(--ins-surface-elevated);
          overflow: hidden;
        }
        .blog-related-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* Prose typography */
        .blog-prose {
          color: var(--ins-text-body);
          font-size: 16px;
          line-height: 1.65;
        }
        .blog-prose > * + * { margin-top: 16px; }
        .blog-prose h1, .blog-prose h2, .blog-prose h3, .blog-prose h4 {
          color: var(--ins-text-heading);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.25;
          scroll-margin-top: 96px;
        }
        .blog-prose h2 { font-size: 28px; margin-top: 48px; margin-bottom: 8px; }
        .blog-prose h3 { font-size: 20px; margin-top: 32px; margin-bottom: 4px; }
        .blog-prose h4 { font-size: 17px; margin-top: 24px; margin-bottom: 2px; }
        .blog-prose p  { color: var(--ins-text-body); }
        .blog-prose a  { color: var(--ins-text-highlight); text-decoration: underline; text-decoration-color: var(--ins-color-teal-a-50); text-underline-offset: 3px; }
        .blog-prose a:hover { color: var(--ins-color-teal-300); text-decoration-color: currentColor; }
        .blog-prose strong { color: var(--ins-text-heading); font-weight: 600; }
        .blog-prose em { color: var(--ins-text-heading); font-style: italic; }
        .blog-prose code {
          font-family: var(--ins-font-family-mono);
          font-size: 0.92em;
          background: var(--ins-surface-card);
          border: 1px solid var(--ins-border-default);
          border-radius: var(--ins-radius-sm);
          padding: 1px 6px;
          color: var(--ins-text-heading);
        }
        .blog-prose pre {
          background: var(--ins-surface-container);
          border: 1px solid var(--ins-border-default);
          border-radius: var(--ins-radius-md);
          padding: 16px;
          overflow-x: auto;
          font-size: 13px;
          line-height: 1.55;
        }
        .blog-prose pre code { background: none; border: none; padding: 0; }
        .blog-prose ul, .blog-prose ol { padding-left: 24px; color: var(--ins-text-body); }
        .blog-prose li { margin-top: 6px; }
        .blog-prose ul li { list-style: disc; }
        .blog-prose ol li { list-style: decimal; }
        .blog-prose blockquote {
          border-left: 3px solid var(--ins-border-brand);
          padding: 4px 16px;
          margin-left: 0;
          color: var(--ins-text-inactive);
          font-style: italic;
        }
        .blog-prose hr {
          border: none;
          border-top: 1px solid var(--ins-border-default);
          margin: 32px 0;
        }
        .blog-prose img {
          max-width: 100%;
          height: auto;
          border-radius: var(--ins-radius-md);
          margin-top: 8px;
        }
        .blog-prose table {
          border-collapse: collapse;
          width: 100%;
          font-size: 14px;
        }
        .blog-prose th, .blog-prose td {
          border: 1px solid var(--ins-border-default);
          padding: 8px 12px;
          text-align: left;
        }
        .blog-prose th { background: var(--ins-surface-card); color: var(--ins-text-heading); font-weight: 600; }
      `}</style>

      <Footer />
    </div>
  );
}
