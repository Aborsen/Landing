import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Input from '../components/Input';
import BottomCTABlock from '../components/BottomCTA';
// Single source of truth: POSTS is built once in BlogPost.jsx from the real
// markdown files. The listing here and the related-articles section on each
// /blog/<slug> page consume the same list.
import { POSTS } from '../components/BlogPost';


/* ── INSIGHTIS LOGO MARK SVG ── */

/* ── BLOG HERO ── */
function BlogHero() {
  return (
    <section style={{padding:'120px 0 60px', textAlign:'center', position:'relative'}}>
      <div style={{maxWidth:'720px', margin:'0 auto', padding:'0 24px'}}>
        <div className="fu0 ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'var(--ins-size-6)'}}>Blog</div>
        <h1 className="ins-text-display" style={{marginBottom:'var(--ins-size-5)'}}>
          Insights about insights
        </h1>
        <p className="fu2 ins-text-body-xl" style={{maxWidth:'540px', margin:'0 auto'}}>
          Data analytics tips, product updates, and deep dives into how teams are using AI to replace spreadsheet chaos.
        </p>
      </div>
    </section>
  );
}

/* ── FEATURED POST ── */

/* ── CATEGORY FILTER ── */
function CategoryFilter({ activeCategory, setActiveCategory }) {
  // Derived from the real POSTS so we only show buttons that match content.
  const categories = ['All', ...Array.from(new Set(POSTS.map(p => p.category)))];

  // #34 — when the content has a single category, "All" + that one tab are redundant; hide the row.
  if (categories.length <= 2) return null;

  return (
    <section style={{padding:'0 0 40px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{display:'flex', justifyContent:'center', gap:'var(--ins-size-2)', flexWrap:'wrap', overflowX:'auto'}}>
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <Chip
                key={cat}
                as="button"
                variant={isActive ? 'brand' : 'neutral'}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                style={{cursor:'pointer', padding:'8px 14px', fontSize:'var(--ins-font-size-12)'}}
              >
                {cat}
              </Chip>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── BLOG GRID ── */
function BlogGrid({ activeCategory, activeTag }) {
  let filtered = activeCategory === 'All'
    ? POSTS
    : POSTS.filter(a => a.category === activeCategory);
  if (activeTag) {
    filtered = filtered.filter(p => Array.isArray(p.tags) && p.tags.includes(activeTag));
  }

  return (
    <section style={{padding:'0 0 20px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div className="blog-grid">
          {filtered.map((article, i) => (
            <a href={article.url} key={article.slug} className="ins-article-card blog-fade-in" style={{animationDelay:`${i * 0.05}s`}}>
              {/* Article cover */}
              <div style={{
                height:'180px',
                background:'var(--ins-surface-card)',
                borderBottom:'1px solid var(--ins-border-default)',
                overflow:'hidden',
                position:'relative',
              }}>
                {article.image ? (
                  <img
                    src={article.image}
                    alt=""
                    loading="lazy"
                    style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                  />
                ) : (
                  <div style={{
                    width:'100%', height:'100%',
                    background:'linear-gradient(135deg, var(--ins-color-teal-900), var(--ins-color-teal-700) 60%, var(--ins-color-teal-400))',
                  }}/>
                )}
              </div>
              {/* Content */}
              <div style={{padding:'var(--ins-size-5)', display:'flex', flexDirection:'column', flex:1}}>
                <div style={{marginBottom:'10px'}}>
                  <span style={{fontSize:'10px', padding:'3px 8px', borderRadius:'999px', background:'var(--ins-surface-brand-tint)', border:'1px solid var(--ins-border-brand)', color:'var(--ins-text-highlight)', fontWeight:500, letterSpacing:'0.04em'}}>{article.category}</span>
                </div>
                <h3 className="ins-text-h3" style={{marginBottom:'var(--ins-size-2)', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical'}}>
                  {article.title}
                </h3>
                <p className="ins-text-body" style={{marginBottom:'var(--ins-size-3)', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical'}}>
                  {article.description}
                </p>
                <div style={{fontSize:'var(--ins-font-size-11)', color:'var(--ins-text-disabled)', fontFamily:'var(--ins-font-family-mono)', marginTop:'auto'}}>
                  {article.date} &middot; {article.readTime} read
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── LOAD MORE ── */

/* ── BOTTOM CTA ── */
function BottomCTA() {
  return (
    <section style={{paddingTop:'var(--ins-size-8)',paddingBottom:'var(--ins-size-16)',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <BottomCTABlock
          variant="buttons"
          title={<>Stop reading about <BottomCTABlock.Highlight>analytics.</BottomCTABlock.Highlight> Start doing it</>}
          description="Turn the ideas on this blog into real answers from your own data — ask a question, get an insight, no dashboards to wrangle. Free to start, no credit card required."
          ctaLabel="Start for free"
          secondaryCtaLabel="Explore Pricing"
          secondaryCtaHref="/pricing"
        />
      </div>
    </section>
  );
}

/* ── APP ── */
function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('');

  // Deep-link from a blog-post Topics sidebar / tag chip: read ?category= and
  // ?tag= from the URL on mount and pre-filter the grid. Done in useEffect
  // (not in useState initializer) because the prerender runs without `window`
  // and the initializer doesn't re-run during hydration.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      if (cat) {
        const match = POSTS.find(post => post.category === cat);
        if (match) setActiveCategory(match.category);
      }
      const tag = params.get('tag');
      if (tag) setActiveTag(tag);
    } catch { /* ignore malformed URLSearchParams */ }
  }, []);

  const clearTag = () => {
    setActiveTag('');
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('tag');
      window.history.replaceState({}, '', url);
    }
  };

  return (
    <div>
      <Header />
      <BlogHero />
      <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      {activeTag && (
        <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px 16px', display:'flex', justifyContent:'center'}}>
          <Chip
            variant="brand"
            onRemove={clearTag}
            aria-label="Clear tag filter"
            style={{fontSize:'var(--ins-font-size-12)', padding:'8px 14px'}}
          >
            Filtered by tag:&nbsp;<strong style={{fontWeight:600}}>#{activeTag}</strong>
          </Chip>
        </div>
      )}
      <BlogGrid activeCategory={activeCategory} activeTag={activeTag} />
      <BottomCTA />
      <Footer />
    </div>
  );
}

export default App;
if (typeof window !== 'undefined') {
  const el = document.getElementById('root');
  if (el && el.hasChildNodes()) {
    ReactDOM.hydrateRoot(el, <App />);
  } else if (el) {
    ReactDOM.createRoot(el).render(<App />);
  }
}
