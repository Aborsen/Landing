import React from 'react';
import { marked } from 'marked';
import Header from './Header';
import Footer from './Footer';

/* Minimal YAML-ish frontmatter parser — same shape used by src/pages/docs.jsx. */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  m[1].split(/\r?\n/).forEach(line => {
    const eq = line.indexOf(':');
    if (eq > 0) {
      const k = line.slice(0, eq).trim();
      let v = line.slice(eq + 1).trim();
      // strip wrapping single or double quotes
      v = v.replace(/^["'](.*)["']$/, '$1');
      meta[k] = v;
    }
  });
  return { meta, body: m[2] };
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return iso; }
}

function readingMinutes(text) {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

// Topic-relevant cover photos, exported so blog.jsx can render the same
// image on the listing cards. Swap to `/assets/blog/<slug>.webp` once real
// cover assets are produced.
export const COVER_IMAGES = {
  'what-is-ai-data-analysis':    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&h=840&fit=crop&q=80',
  'best-ai-data-analysis-tools': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=840&fit=crop&q=80',
  'marketing-analytics-tools':   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=840&fit=crop&q=80',
  'self-service-bi-guide':       'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&h=840&fit=crop&q=80',
};

/**
 * BlogPost — renders a single markdown article (with YAML frontmatter) inside
 * the standard site chrome. Typography is scoped to .blog-prose so styles
 * don't leak into the rest of the site.
 *
 * Props
 *  markdown  raw markdown string (with YAML frontmatter) — required
 *  slug      slug used to look up a cover image from COVER_IMAGES — optional
 */
export default function BlogPost({ markdown, slug }) {
  const { meta, body } = parseFrontmatter(markdown);
  // Strip a leading `# ...` heading if present — it duplicates the frontmatter
  // title we render in the page header. Demotes the article to a single H1.
  const bodySansH1 = body.replace(/^\s*#\s+[^\n]*\n+/, '');
  const html = marked.parse(bodySansH1);
  const minutes = readingMinutes(bodySansH1);
  const cover = (slug && COVER_IMAGES[slug]) || null;

  return (
    <div className="font-body">
      <Header />
      <main style={{ paddingTop: '40px' }}>
        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 24px 80px' }}>
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
              <img
                src={cover}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
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
            {meta.publishDate && <span>{formatDate(meta.publishDate)}</span>}
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
          }}>
            {meta.title || 'Untitled'}
          </h1>

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

          {/* Author */}
          {meta.author && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              color: 'var(--ins-text-inactive)',
              marginBottom: '40px',
              paddingBottom: '24px',
              borderBottom: '1px solid var(--ins-border-default)',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--ins-text-highlight), var(--ins-color-teal-650))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ins-color-white)',
                flexShrink: 0,
              }}>{(meta.author || '?').slice(0, 1)}</div>
              <div>By <span style={{ color: 'var(--ins-text-heading)', fontWeight: 500 }}>{meta.author}</span></div>
            </div>
          )}

          {/* Body */}
          <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </main>

      {/* Scoped prose typography — runs after app.css so wins specificity ties. */}
      <style>{`
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
