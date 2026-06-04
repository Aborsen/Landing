import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import Header from './Header';
import Footer from './Footer';
import CheckIcon from './CheckIcon';

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
function YouTubeIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>; }
function TikTokIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 005.58 2.17v-3.4a4.85 4.85 0 01-1-.16l.01-.02V6.69h.99z"/></svg>; }
function RedditIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.067 13.137a1.624 1.624 0 0 1-1.624 1.624c-.42 0-.8-.16-1.085-.42-1.058.762-2.518 1.252-4.143 1.314l.7-3.293 2.287.48a1.16 1.16 0 1 0 .115-.55l-2.554-.543a.275.275 0 0 0-.325.213l-.778 3.66c-1.652-.054-3.138-.545-4.207-1.315a1.62 1.62 0 0 1-1.084.42 1.624 1.624 0 0 1-.66-3.107c-.054-.21-.082-.43-.082-.658 0-2.227 2.59-4.033 5.78-4.033 3.19 0 5.78 1.806 5.78 4.033 0 .224-.028.443-.082.65a1.622 1.622 0 0 1 .961 1.485zm-9.78-.13a1.16 1.16 0 1 1 2.32 0 1.16 1.16 0 0 1-2.32 0zm6.59 2.65a4.65 4.65 0 0 1-2.873.954 4.65 4.65 0 0 1-2.872-.953.275.275 0 1 1 .354-.42 4.1 4.1 0 0 0 2.518.83 4.1 4.1 0 0 0 2.519-.83.275.275 0 0 1 .354.42zm.092-1.49a1.16 1.16 0 1 1 0-2.32 1.16 1.16 0 0 1 0 2.32z"/></svg>; }
function LinkIcon({ size = 16 })  { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>; }
// CheckIcon imported from ./CheckIcon (canonical recipe).
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
    display: 'inline-flex', alignItems: 'center', gap: 'var(--ins-size-2)',
    padding: '8px 14px',
    background: 'var(--ins-surface-card)',
    border: '1px solid var(--ins-border-default)',
    borderRadius: 'var(--ins-radius-pill)',
    color: 'var(--ins-text-body)',
    fontSize: 'var(--ins-font-size-14)', fontWeight: 500,
    textDecoration: 'none',
    fontFamily: 'var(--ins-font-family-sans)',
    cursor: 'pointer',
    transition: 'border-color 180ms, color 180ms',
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--ins-size-2)', margin: '32px 0', paddingTop: 'var(--ins-size-6)', borderTop: '1px solid var(--ins-border-default)' }}>
      <span style={{ fontSize: 'var(--ins-font-size-14)', color: 'var(--ins-text-body)', marginRight: 'var(--ins-size-1)' }}>Share</span>
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

  // Topics list — counts per category from the shared POSTS list.
  const topicCounts = POSTS.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const topicEntries = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);

  const socials = [
    { label: 'Insightis on X (formerly Twitter)', href: 'https://x.com/Insightisai',                  Icon: XIcon },
    { label: 'Insightis on TikTok',               href: 'https://www.tiktok.com/@insightisai',        Icon: TikTokIcon },
    { label: 'Insightis on YouTube',              href: 'https://www.youtube.com/@InsightisAI',       Icon: YouTubeIcon },
    { label: 'Insightis on LinkedIn',             href: 'https://www.linkedin.com/company/112025589', Icon: LinkedInIcon },
  ];

  return (
    <aside className="blog-toc">
      <div style={{
        position: 'sticky',
        top: '96px',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
        paddingRight: 'var(--ins-size-2)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ins-size-7)',
      }}>
        {/* On this page (TOC) */}
        {items.length > 0 && (
          <div>
            <p className="ins-text-overline" style={{marginBottom: 'var(--ins-size-3)'}}>On this page</p>
            {/* src/app.css:119 has a global `nav { display:flex; padding:0 48px;
                height:58px; ... }` rule originally for the site-wide top nav.
                Inside this TOC sidebar `<nav>` it nukes layout — the 96px
                horizontal padding collapses the inner <ul> to ~166px. Override
                every relevant property here to neutralize the cascade. */}
            <nav style={{
              display: 'block',
              width: '100%',
              padding: 0,
              height: 'auto',
              position: 'static',
              background: 'transparent',
              borderBottom: 'none',
            }}>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: 'var(--ins-size-1)',
              }}>
                {items.map(item => (
                  <li key={item.id} style={{ width: '100%' }}>
                    <a
                      href={`#${item.id}`}
                      title={item.text}
                      style={{
                        display: 'block',
                        boxSizing: 'border-box',
                        width: '100%',
                        padding: '6px 10px',
                        borderLeft: '2px solid',
                        borderLeftColor: active === item.id ? 'var(--ins-text-highlight)' : 'transparent',
                        fontSize: 'var(--ins-font-size-14)',
                        lineHeight: 1.45,
                        color: active === item.id ? 'var(--ins-text-heading)' : 'var(--ins-text-body)',
                        textDecoration: 'none',
                        transition: 'color 150ms, border-color 150ms',
                        wordBreak: 'break-word',
                      }}
                    >{item.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Topics */}
        <div>
          <p className="ins-text-overline" style={{marginBottom: 'var(--ins-size-3)'}}>Topics</p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 0,
            borderTop: '1px solid var(--ins-border-default)',
          }}>
            {topicEntries.map(([category, count]) => (
              <li key={category} style={{ width: '100%' }}>
                <a
                  href={`/blog/?category=${encodeURIComponent(category)}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--ins-size-2)',
                    padding: '10px 4px',
                    borderBottom: '1px solid var(--ins-border-default)',
                    fontSize: 'var(--ins-font-size-14)',
                    lineHeight: 1.4,
                    color: 'var(--ins-text-body)',
                    textDecoration: 'none',
                    transition: 'color 150ms',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--ins-text-heading)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--ins-text-body)'}
                >
                  <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{category}</span>
                  <span style={{ color: 'var(--ins-text-disabled)', fontFamily: 'var(--ins-font-family-mono)', fontSize: 'var(--ins-font-size-12)', flexShrink: 0 }}>{count}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <p className="ins-text-overline" style={{marginBottom: 'var(--ins-size-3)'}}>Social</p>
          <div style={{ display: 'flex', gap: 'var(--ins-size-2)', flexWrap: 'wrap' }}>
            {socials.map(({ label, href, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--ins-surface-card)',
                  border: '1px solid var(--ins-border-default)',
                  color: 'var(--ins-text-body)',
                  textDecoration: 'none',
                  transition: 'color 150ms, border-color 150ms',
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ───────────────────────── right sidebar: Topics + Social ───────────────────────── */

function TopicsSidebar({ currentSlug }) {
  // Count posts per category from the shared POSTS list.
  const counts = POSTS.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  const items = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const socials = [
    { label: 'Insightis on X (formerly Twitter)', href: 'https://x.com/Insightisai',                  Icon: XIcon },
    { label: 'Insightis on TikTok',               href: 'https://www.tiktok.com/@insightisai',        Icon: TikTokIcon },
    { label: 'Insightis on YouTube',              href: 'https://www.youtube.com/@InsightisAI',       Icon: YouTubeIcon },
    { label: 'Insightis on LinkedIn',             href: 'https://www.linkedin.com/company/112025589', Icon: LinkedInIcon },
  ];
  return (
    <aside className="blog-side-right">
      <div style={{
        position: 'sticky',
        top: '96px',
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
        paddingRight: 'var(--ins-size-2)',
      }}>
        {/* Topics */}
        <div>
          <p className="ins-text-overline" style={{marginBottom: 'var(--ins-size-3)'}}>Topics</p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 'var(--ins-size-half)',
            borderTop: '1px solid var(--ins-border-default)',
          }}>
            {items.map(([category, count]) => (
              <li key={category} style={{ width: '100%' }}>
                <a
                  href={`/blog/?category=${encodeURIComponent(category)}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--ins-size-2)',
                    padding: '10px 4px',
                    borderBottom: '1px solid var(--ins-border-default)',
                    fontSize: 'var(--ins-font-size-14)',
                    lineHeight: 1.4,
                    color: 'var(--ins-text-body)',
                    textDecoration: 'none',
                    transition: 'color 150ms',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--ins-text-heading)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--ins-text-body)'}
                >
                  <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{category}</span>
                  <span style={{ color: 'var(--ins-text-disabled)', fontFamily: 'var(--ins-font-family-mono)', fontSize: 'var(--ins-font-size-12)', flexShrink: 0 }}>{count}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div style={{ marginTop: 'var(--ins-size-8)' }}>
          <p className="ins-text-overline" style={{marginBottom: 'var(--ins-size-3)'}}>Social</p>
          <div style={{ display: 'flex', gap: 'var(--ins-size-2)', flexWrap: 'wrap' }}>
            {socials.map(({ label, href, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--ins-surface-card)',
                  border: '1px solid var(--ins-border-default)',
                  color: 'var(--ins-text-body)',
                  textDecoration: 'none',
                  transition: 'color 150ms, border-color 150ms',
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ───────────────────────── Back-to-top floating button ───────────────────────── */

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'var(--ins-surface-card)',
        border: '1px solid var(--ins-border-default)',
        color: 'var(--ins-text-body)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 60,
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 200ms ease, transform 200ms ease, color 150ms, border-color 150ms',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--ins-text-heading)'; e.currentTarget.style.borderColor = 'var(--ins-border-hover)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--ins-text-body)'; e.currentTarget.style.borderColor = 'var(--ins-border-default)'; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="19" x2="12" y2="5"/>
        <polyline points="5 12 12 5 19 12"/>
      </svg>
    </button>
  );
}

function CTABanner() {
  return (
    <section style={{
      marginTop: 'var(--ins-size-16)',
      borderRadius: 'var(--ins-radius-xl)',
      border: '1px solid var(--ins-border-brand)',
      background: 'linear-gradient(135deg, var(--ins-surface-brand-tint) 0%, var(--ins-surface-card) 60%, var(--ins-surface-brand-tint) 100%)',
      padding: '32px 32px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--ins-color-teal-a-50), transparent)' }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--ins-size-5)' }}>
        <div style={{ flex: '1 1 280px' }}>
          <h3 style={{
            fontSize: 'var(--ins-font-size-22)',
            fontWeight: 600,
            color: 'var(--ins-text-heading)',
            letterSpacing: '-0.02em',
            marginBottom: 'var(--ins-size-2)',
          }}>Ready to stop exporting CSVs?</h3>
          <p className="ins-text-body" style={{maxWidth: '420px'}}>
            Insightis connects your stack and gives every team instant, governed answers — no SQL, no analyst queue. Free to start.
          </p>
        </div>
        <a
          href="/auth/sign-up/"
          className="ins-btn ins-btn--primary ins-btn--md"
          style={{ flexShrink: 0 }}
        >
          Start for free <ArrowRightIcon />
        </a>
      </div>
    </section>
  );
}

function RelatedArticles({ currentSlug }) {
  const others = POSTS.filter(p => p.slug !== currentSlug).slice(0, 3);
  if (others.length === 0) return null;
  return (
    <aside aria-label="Related articles" style={{ marginTop: 'var(--ins-size-20)', borderTop: '1px solid var(--ins-border-default)', paddingTop: 'var(--ins-size-10)' }}>
      {/* div (not h2) so the related-articles block doesn't pollute the
          article's outline / heading hierarchy — SEO-clean per QA. */}
      <div style={{
        fontSize: 'var(--ins-font-size-11)',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--ins-text-body)',
        marginBottom: 'var(--ins-size-5)',
      }}>Related articles</div>
      <div className="blog-related-grid">
        {others.map(p => (
          <a key={p.slug} href={p.url} className="ins-article-card blog-related-card">
            <div className="blog-related-cover">
              {p.image && <img src={p.image} alt="" loading="lazy" />}
            </div>
            <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 'var(--ins-size-2)' }}>
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
              {/* p (not h3) for the same reason — keeps article outline clean. */}
              <p className="ins-text-h4" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                margin: 0,
              }}>{p.title}</p>
              <div style={{ fontSize: 'var(--ins-font-size-11)', color: 'var(--ins-text-disabled)', fontFamily: 'var(--ins-font-family-mono)', marginTop: 'auto' }}>
                {p.date} · {p.readTime} read
              </div>
            </div>
          </a>
        ))}
      </div>
    </aside>
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
  // marked.parse() emits HTML-encoded entities (&amp;, &#39;, etc.); decode
  // them before showing in the TOC so the label reads "Schema & HTML"
  // instead of "Schema &amp; HTML".
  const decodeEntities = (s) => s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  const toc = [];
  const usedIds = new Set();
  let html = rawHtml.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (_match, attrs, inner) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, '')).trim();
    let id = slugify(text) || `section-${toc.length + 1}`;
    let candidate = id, n = 2;
    while (usedIds.has(candidate)) { candidate = `${id}-${n++}`; }
    id = candidate;
    usedIds.add(id);
    toc.push({ id, text });
    return `<h2 id="${id}"${attrs || ''}>${inner}</h2>`;
  });

  // ── TL;DR callout ───────────────────────────────────────────
  // Find the first H3 whose text matches "TL;DR" (and variants like
  // "BTL;DR / Executive Summary") and wrap that heading + the content
  // up to the next heading in a bordered <aside> with data-tldr for
  // AI scrapers. Keeps the heading inside so the article outline still
  // shows it, but the visual frame makes it pop.
  html = html.replace(
    /<h3(\s[^>]*)?>([^<]*?(?:tl;?dr|btl;?dr|executive summary)[\s\S]*?)<\/h3>([\s\S]*?)(?=<h[123][\s>])/i,
    (_m, attrs, headingInner, bodyContent) => {
      const headingText = decodeEntities(headingInner.replace(/<[^>]+>/g, '')).trim();
      return `<aside class="blog-tldr" role="note" aria-label="TL;DR" data-tldr="executive-summary">
        <div class="blog-tldr-badge">TL;DR</div>
        <h3${attrs || ''}>${headingText}</h3>
        ${bodyContent.trim()}
      </aside>`;
    }
  );

  // ── FAQ accordion + JSON-LD ─────────────────────────────────
  // Find the H2 "FAQ Section" (or just "FAQ") and the H3/paragraph
  // pairs that follow until the next H2. Convert each pair to a
  // <details>/<summary> accordion item inside a bordered wrapper.
  // Build a FAQPage JSON-LD schema from the extracted Q&As to be
  // emitted alongside the article.
  const faqItems = [];
  html = html.replace(
    // Anchored: the h2's inner text must literally start with "FAQ"
    // (optionally followed by "Section"). Without this anchor the
    // `[\s\S]*?` would slurp from the article's first h2 all the way
    // through to the FAQ h2 and destroy every section in between.
    /<h2(\s[^>]*)?>\s*FAQ(?:\s+Section)?\s*<\/h2>([\s\S]*?)(?=<h2[\s>]|$)/i,
    (_m, h2Attrs, faqBody) => {
      // Pair every <h3>...</h3> with the HTML that follows it until the next <h3> (or end).
      const pairRe = /<h3(?:\s[^>]*)?>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[\s>]|$)/g;
      let pair;
      const items = [];
      while ((pair = pairRe.exec(faqBody)) !== null) {
        const question = decodeEntities(pair[1].replace(/<[^>]+>/g, '')).trim();
        const answerHtml = pair[2].trim();
        // Schema.org wants plain text answers; strip outer <p> tags but keep
        // the inner HTML so links/lists survive in the rendered accordion.
        const answerText = decodeEntities(answerHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim();
        if (!question || !answerText) continue;
        items.push({ question, answerHtml, answerText });
      }
      if (items.length === 0) return _m;
      faqItems.push(...items);
      const accordion = items.map((it, i) => `
        <details class="blog-faq-item"${i === 0 ? ' open' : ''}>
          <summary>
            <span class="blog-faq-q">${it.question}</span>
            <span class="blog-faq-chev" aria-hidden="true">+</span>
          </summary>
          <div class="blog-faq-a">${it.answerHtml}</div>
        </details>`).join('');
      const id = 'faq';
      return `<h2 id="${id}"${h2Attrs || ''}>FAQ</h2>
        <div class="blog-faq">${accordion}</div>`;
    }
  );

  // Re-track the FAQ entry in the TOC if we rewrote it (so the sidebar
  // still links to it cleanly).
  if (faqItems.length > 0 && !toc.some(t => t.id === 'faq')) {
    toc.push({ id: 'faq', text: 'FAQ' });
  }

  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(it => ({
      "@type": "Question",
      "name": it.question,
      "acceptedAnswer": { "@type": "Answer", "text": it.answerText },
    })),
  } : null;

  const minutes = readingMinutes(bodySansH1);
  const cover = (slug && COVER_IMAGES[slug]) || null;
  const tags = Array.isArray(meta.tags) ? meta.tags : [];

  // Raw frontmatter date — keep YYYY-MM-DD as-is to avoid UTC-shift bugs
  // (QA item 15). publishDate / date are the two field names used in the
  // .md files we have today.
  const rawPublishDate = (meta.publishDate || meta.date || '').slice(0, 10);
  const isDraft = String(meta.draft).toLowerCase() === 'true';

  // QA item 14 — flip the <meta name="robots"> tag at runtime when the
  // article is marked draft in its frontmatter. The static HTML wrapper
  // ships `index,follow` so this is a runtime-only fix; crawlers reading
  // the prerendered HTML still see indexable until scripts/prerender.mjs
  // is extended to read each .md and patch the meta during build.
  // TODO(prerender): for full crawler correctness, have prerender.mjs
  // inspect blog/Articles/<slug>.md and rewrite dist/blog/<slug>.html
  // robots meta when draft === true.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    let tag = document.querySelector('meta[name="robots"]');
    const created = !tag;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'robots');
      document.head.appendChild(tag);
    }
    const before = tag.getAttribute('content');
    if (isDraft) tag.setAttribute('content', 'noindex,nofollow');
    return () => {
      // Restore the original content if this component unmounts (SPA-style
      // navigation back to a non-blog page) so we don't leak noindex.
      if (created) tag.remove();
      else if (before != null) tag.setAttribute('content', before);
    };
  }, [isDraft]);

  // QA items 11 + 15 — BlogPosting JSON-LD with default author and
  // date-only `datePublished`. Rendered inside <body>; Google supports
  // either <head> or <body> placement.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title || '',
    description: meta.description || '',
    datePublished: rawPublishDate || undefined,
    author: {
      '@type': meta.authorType || 'Organization',
      name: meta.author || 'Insightis Team',
    },
    image: cover || undefined,
    mainEntityOfPage: slug ? {
      '@type': 'WebPage',
      '@id': `https://insightis.ai/blog/${slug}`,
    } : undefined,
  };

  // BreadcrumbList JSON-LD — pairs with the visible Home › Blog ›
  // Article-Title chain rendered above the cover image. Same domain
  // pattern as the BlogPosting block above.
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://insightis.ai/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://insightis.ai/blog/' },
      ...(slug ? [{ '@type': 'ListItem', position: 3, name: meta.title || '', item: `https://insightis.ai/blog/${slug}` }] : []),
    ],
  };

  return (
    <div className="font-body">
      <Header />
      {/* QA #11 + #15 — BlogPosting JSON-LD. Inside <body> is supported
          by Google. datePublished is date-only YYYY-MM-DD to avoid the
          UTC shift `new Date(...).toISOString()` would introduce. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <main style={{ paddingTop: 'var(--ins-size-8)' }}>
        <div className="blog-shell">
          {/* Left: TOC */}
          <TableOfContents items={toc} />

          {/* Center: article */}
          <article className="blog-article">
            {/* Breadcrumbs — reuse the DS .ins-breadcrumbs (same component as docs).
                Current page (article title) intentionally omitted per audit #37.
                A <div> (not <nav>) sidesteps the global app.css `nav {…}` rule. */}
            <div className="ins-breadcrumbs" role="navigation" aria-label="Breadcrumb" style={{ marginBottom: 'var(--ins-size-6)' }}>
              <span className="ins-breadcrumbs__item"><a href="/">Home</a></span>
              <span className="ins-breadcrumbs__separator" aria-hidden="true">/</span>
              <span className="ins-breadcrumbs__item"><a href="/blog/">Blog</a></span>
            </div>

            {/* Cover image */}
            {cover && (
              <div style={{
                marginBottom: 'var(--ins-size-8)',
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
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--ins-size-3)', marginBottom: 'var(--ins-size-5)', fontSize: 'var(--ins-font-size-14)', color: 'var(--ins-text-body)' }}>
              {meta.category && (
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--ins-radius-pill)',
                  background: 'var(--ins-surface-brand-tint)',
                  border: '1px solid var(--ins-border-brand)',
                  color: 'var(--ins-text-highlight)',
                  fontSize: 'var(--ins-font-size-11)',
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
              color: 'var(--ins-text-heading-soft)',
              marginBottom: 'var(--ins-size-4)',
              textWrap: 'balance',
            }}>{meta.title || 'Untitled'}</h1>

            {/* Description */}
            {meta.description && (
              <p className="ins-text-body-lg" style={{marginBottom: 'var(--ins-size-6)',
                textWrap: 'pretty'}}>{meta.description}</p>
            )}

            {/* Tags — clickable, route to /blog/?tag=... to filter the index */}
            {tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'var(--ins-size-6)' }}>
                {tags.map(t => (
                  <a key={t} href={`/blog/?tag=${encodeURIComponent(t)}`} style={{
                    fontSize: 'var(--ins-font-size-11)',
                    padding: '3px 9px',
                    borderRadius: 'var(--ins-radius-pill)',
                    background: 'var(--ins-surface-card)',
                    border: '1px solid var(--ins-border-default)',
                    color: 'var(--ins-text-body)',
                    textDecoration: 'none',
                    transition: 'all .15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--ins-text-highlight)'; e.currentTarget.style.borderColor = 'var(--ins-border-brand)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--ins-text-body)'; e.currentTarget.style.borderColor = 'var(--ins-border-default)'; }}
                  >#{t}</a>
                ))}
              </div>
            )}

            {/* Author */}
            {meta.author && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: 'var(--ins-font-size-14)',
                color: 'var(--ins-text-body)',
                marginBottom: 'var(--ins-size-8)',
                paddingBottom: 'var(--ins-size-6)',
                borderBottom: '1px solid var(--ins-border-default)',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--ins-text-highlight), var(--ins-color-teal-650))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'var(--ins-font-size-12)', fontWeight: 600, color: 'var(--ins-color-white)', flexShrink: 0,
                }}>{(meta.author || '?').slice(0, 1)}</div>
                <div>By <span style={{ color: 'var(--ins-text-heading)', fontWeight: 500 }}>{meta.author}</span></div>
              </div>
            )}

            {/* Body */}
            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />

            {/* FAQPage JSON-LD — emitted only when the article actually
                has a FAQ section. Validated against schema.org / Google
                Rich Results. */}
            {faqSchema && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
              />
            )}

            {/* Share — bottom */}
            <ShareButtons slug={slug} title={meta.title} />

            {/* CTA banner */}
            <CTABanner />

            {/* Related articles */}
            <RelatedArticles currentSlug={slug} />
          </article>
        </div>
      </main>

      {/* Floating back-to-top button (appears once scrolled > 400px) */}
      <BackToTop />

      <style>{`
        /* Grid shell — left sidebar (TOC + Topics + Social) + article.
           Outer dimensions match the Header / docs pattern exactly:
              max-width: 1240px; width: calc(100% - 32px); margin: 0 auto;
           so the blog page's left/right visual edges align with the
           navbar chrome.
           Inside the 1240 frame the columns total 1176 (240 + 56 + 880)
           centred, leaving ~32px slack each side — keeps the layout
           symmetric and the article wide enough that its right edge
           sits close to the navbar's right edge.
           Breakpoints:
             <1100  : 1 column, article only (sidebar hidden)
             >=1100 : 2 columns, sidebar | article
           align-items defaults to stretch so the aside grows to the
           article's full height, giving position:sticky room to track
           scroll all the way down. */
        .blog-shell {
          max-width: 1240px;
          width: calc(100% - 32px);
          margin: 0 auto;
          padding: 40px 0 80px;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: var(--ins-size-8);
        }
        .blog-article { min-width: 0; }
        .blog-toc { display: none; }

        @media (min-width: 1100px) {
          .blog-shell {
            grid-template-columns: 240px minmax(0, 880px);
            gap: var(--ins-size-14);
            justify-content: center;
          }
          .blog-toc { display: block; }
        }

        /* Related-articles grid */
        .blog-related-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--ins-size-4);
        }
        @media (min-width: 720px) {
          .blog-related-grid { grid-template-columns: repeat(3, 1fr); }
        }
        /* .blog-related-card shell moved to DS .ins-article-card (audit #40) */
        .blog-related-cover {
          aspect-ratio: 16 / 9;
          background: var(--ins-surface-elevated);
          overflow: hidden;
        }
        .blog-related-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }

        /* TL;DR callout — bordered aside that wraps the H3 + the
           summary paragraphs/lists below it. data-tldr attribute helps
           AI scrapers identify the executive summary block cleanly. */
        .blog-tldr {
          margin: 28px 0 32px;
          padding: 20px 22px 22px;
          background: linear-gradient(135deg, rgba(9,160,157,0.06), rgba(9,160,157,0.02));
          border: 1px solid var(--ins-border-brand);
          border-left: 3px solid var(--ins-text-highlight);
          border-radius: var(--ins-radius-lg);
          position: relative;
        }
        .blog-tldr-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--ins-text-highlight);
          font-family: var(--ins-font-family-mono);
          background: var(--ins-surface-brand-tint);
          border: 1px solid var(--ins-border-brand);
          border-radius: var(--ins-radius-pill);
          padding: 3px 10px;
          margin-bottom: var(--ins-size-3);
        }
        .blog-tldr > h3 {
          margin-top: 0 !important;
          font-size: var(--ins-font-size-18);
          color: var(--ins-text-heading);
        }
        .blog-tldr > * + * { margin-top: var(--ins-size-3); }
        .blog-tldr p, .blog-tldr ul, .blog-tldr ol { color: var(--ins-text-body); }

        /* FAQ accordion — reuses the marketing .ins-faq look (audit #41):
           separate bordered rows with a gap, teal border when open. */
        .blog-faq {
          display: flex;
          flex-direction: column;
          gap: var(--ins-space-sm);
          margin: 24px 0 8px;
        }
        .blog-faq-item {
          background: var(--ins-color-black-a-30, rgba(13, 17, 23, 0.6));
          border: 1px solid var(--ins-color-white-a-06);
          border-radius: var(--ins-radius-xl);
          overflow: hidden;
          transition: border-color 180ms;
        }
        .blog-faq-item[open] { border-color: var(--ins-color-teal-a-30); }
        .blog-faq-item > summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--ins-size-4);
          padding: 16px 24px;
          cursor: pointer;
          list-style: none;
          color: var(--ins-color-gray-100);
          font-weight: 500;
          font-size: var(--ins-font-size-15);
          transition: color 180ms;
        }
        .blog-faq-item > summary::-webkit-details-marker { display: none; }
        .blog-faq-item > summary:hover { color: var(--ins-text-heading); }
        .blog-faq-item[open] > summary { color: var(--ins-text-heading); }
        .blog-faq-q { flex: 1; }
        .blog-faq-chev {
          font-size: var(--ins-font-size-20);
          font-weight: 300;
          color: var(--ins-text-inactive);
          line-height: 1;
          flex-shrink: 0;
          transition: transform 180ms, color 180ms;
        }
        .blog-faq-item[open] > summary .blog-faq-chev { transform: rotate(45deg); color: var(--ins-text-highlight); }
        .blog-faq-a {
          padding: 0 24px 18px;
          color: var(--ins-text-body);
          font-size: var(--ins-font-size-15);
          line-height: 1.65;
        }
        .blog-faq-a > * + * { margin-top: var(--ins-size-3); }
        .blog-faq-a a { color: var(--ins-text-highlight); text-decoration: underline; }
        .blog-faq-a code { font-family: var(--ins-font-family-mono); font-size: 0.92em; background: var(--ins-surface-elevated); border-radius: var(--ins-radius-sm); padding: 1px 6px; }

        /* Prose typography */
        .blog-prose {
          color: var(--ins-text-body);
          font-size: var(--ins-font-size-16);
          line-height: 1.65;
        }
        .blog-prose > * + * { margin-top: var(--ins-size-4); }
        .blog-prose h1, .blog-prose h2, .blog-prose h3, .blog-prose h4 {
          color: var(--ins-text-heading);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.25;
          scroll-margin-top: 96px;
        }
        .blog-prose h2 { font-size: var(--ins-font-size-28); margin-top: var(--ins-size-12); margin-bottom: var(--ins-size-2); }
        .blog-prose h3 { font-size: var(--ins-font-size-20); margin-top: var(--ins-size-8); margin-bottom: var(--ins-size-1); }
        .blog-prose h4 { font-size: var(--ins-font-size-17); margin-top: var(--ins-size-6); margin-bottom: var(--ins-size-half); }
        .blog-prose p  { color: var(--ins-text-body); }
        .blog-prose a  { color: var(--ins-text-highlight); text-decoration: underline; text-decoration-color: var(--ins-color-teal-a-50); text-underline-offset: 3px; }
        .blog-prose a:hover { color: var(--ins-color-teal-300); text-decoration-color: currentColor; }
        .blog-prose strong { color: var(--ins-text-body); font-weight: 600; }
        .blog-prose em { color: var(--ins-text-body); font-style: italic; }
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
          padding: var(--ins-size-4);
          overflow-x: auto;
          font-size: var(--ins-font-size-14);
          line-height: 1.55;
        }
        .blog-prose pre code { background: none; border: none; padding: 0; }
        .blog-prose ul, .blog-prose ol { padding-left: var(--ins-size-6); color: var(--ins-text-body); }
        .blog-prose li { margin-top: 6px; }
        .blog-prose ul li { list-style: disc; }
        .blog-prose ol li { list-style: decimal; }
        .blog-prose blockquote {
          border-left: 3px solid var(--ins-border-brand);
          padding: 4px 16px;
          margin-left: 0;
          color: var(--ins-text-body);
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
          margin-top: var(--ins-size-2);
        }
        .blog-prose table {
          border-collapse: collapse;
          width: 100%;
          font-size: var(--ins-font-size-14);
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
