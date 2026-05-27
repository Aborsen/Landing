import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Input from '../components/Input';
// Single source of truth: POSTS is built once in BlogPost.jsx from the real
// markdown files. The listing here and the related-articles section on each
// /blog/<slug> page consume the same list.
import { POSTS } from '../components/BlogPost';

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

/* ── INSIGHTIS LOGO MARK SVG ── */
function InsightisLogoMark({ size = 60, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity}}>
      <path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="var(--ins-text-highlight)"/>
    </svg>
  );
}

/* ── BLOG HERO ── */
function BlogHero() {
  return (
    <section style={{padding:'120px 0 60px', textAlign:'center', position:'relative'}}>
      <div style={{maxWidth:'720px', margin:'0 auto', padding:'0 24px'}}>
        <div className="fu0" style={{display:'inline-flex', alignItems:'center', gap:'6px', padding:'6px 14px', borderRadius:'999px', border:'1px solid rgba(255,255,255,.07)', background:'rgba(255,255,255,.03)', fontSize:'12px', color:'var(--ins-text-inactive)', fontWeight:500, letterSpacing:'0.04em', marginBottom:'24px'}}>
          ✦ BLOG
        </div>
        <h1 className="fu1" style={{fontSize:'clamp(36px,5vw,56px)', fontWeight:500, letterSpacing:'-.04em', lineHeight:1.1, color:'var(--ins-color-gray-100)', marginBottom:'20px'}}>
          Insights about insights.
        </h1>
        <p className="fu2" style={{fontSize:'17px', color:'var(--ins-text-inactive)', lineHeight:1.6, maxWidth:'540px', margin:'0 auto'}}>
          Data analytics tips, product updates, and deep dives into how teams are using AI to replace spreadsheet chaos.
        </p>
      </div>
    </section>
  );
}

/* ── FEATURED POST ── */
function FeaturedPost() {
  return (
    <section style={{padding:'0 0 60px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{
          position:'relative',
          background:'rgba(255,255,255,.03)',
          border:'1px solid rgba(255,255,255,.07)',
          borderRadius:'16px',
          padding:'0',
          overflow:'hidden',
        }}>
          {/* Top glow line */}
          <div style={{position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>

          <div style={{display:'flex', flexWrap:'wrap'}}>
            {/* Left: Text content (60%) */}
            <div style={{flex:'1 1 340px', padding:'36px 40px', display:'flex', flexDirection:'column', justifyContent:'center', gap:'16px'}}>
              <div>
                <span style={{fontSize:'11px', padding:'4px 10px', borderRadius:'999px', background:'rgba(9,160,157,.1)', border:'1px solid rgba(9,160,157,.25)', color:'var(--ins-text-highlight)', fontWeight:500, letterSpacing:'0.04em'}}>Product Update</span>
              </div>
              <h2 style={{fontSize:'24px', fontWeight:500, color:'var(--ins-color-gray-100)', lineHeight:1.35, letterSpacing:'-.02em'}}>
                Introducing Insights Engine: From Surface Answers to Root Causes
              </h2>
              <p style={{fontSize:'14px', color:'var(--ins-text-inactive)', lineHeight:1.6}}>
                AI Chat gives you the what. Insights Engine tells you the why. Today we're launching the deep analysis layer that connects dots across your entire data ecosystem.
              </p>
              <div style={{fontSize:'12px', color:'var(--ins-text-disabled)', fontFamily:"'Geist Mono', monospace"}}>
                Apr 1, 2026 &middot; 6 min read
              </div>
              <a href="#" style={{fontSize:'14px', color:'var(--ins-text-highlight)', textDecoration:'none', fontWeight:500, marginTop:'4px'}}>
                Read Article &rarr;
              </a>
            </div>

            {/* Right: Featured image */}
            <div style={{flex:'0 0 40%', minHeight:'280px', overflow:'hidden', borderLeft:'1px solid rgba(9,160,157,.15)'}}>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=560&fit=crop" alt="" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CATEGORY FILTER ── */
function CategoryFilter({ activeCategory, setActiveCategory }) {
  // Derived from the real POSTS so we only show buttons that match content.
  const categories = ['All', ...Array.from(new Set(POSTS.map(p => p.category)))];

  return (
    <section style={{padding:'0 0 40px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{display:'flex', justifyContent:'center', gap:'8px', flexWrap:'wrap', overflowX:'auto'}}>
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <Chip
                key={cat}
                as="button"
                variant={isActive ? 'brand' : 'neutral'}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                style={{cursor:'pointer', padding:'8px 14px', fontSize:'13px'}}
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

/* ── BLOG GRID — legacy hardcoded list left for reference, no longer rendered ── */
// eslint-disable-next-line no-unused-vars
const _LEGACY_ARTICLES = [
  { title: 'Introducing Insights Engine: From Surface Answers to Root Causes', category: 'Product Updates', date: 'Apr 1, 2026', readTime: '6 min', excerpt: 'AI Chat gives you the what. Insights Engine tells you the why. Launching the deep analysis layer for your data ecosystem.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=320&fit=crop' },
  { title: 'How to Write Better Questions for AI Chat', category: 'Guides & Tutorials', date: 'Mar 28, 2026', readTime: '4 min', excerpt: 'Get more accurate, actionable answers by structuring your queries with context, constraints, and clarity.', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=320&fit=crop' },
  { title: "Why Your MRR Numbers Don't Match (And How to Fix It)", category: 'Data Analytics', date: 'Mar 22, 2026', readTime: '8 min', excerpt: 'The three most common reasons your monthly recurring revenue looks different across tools, and a framework to reconcile them.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=320&fit=crop' },
  { title: 'What is a Semantic Layer? A Non-Technical Explanation', category: 'Guides & Tutorials', date: 'Mar 15, 2026', readTime: '5 min', excerpt: 'Think of it as a universal translator between your messy data and the clean metrics your team actually needs.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=320&fit=crop' },
  { title: 'How a Series A SaaS Replaced Looker with Insightis', category: 'Customer Stories', date: 'Mar 10, 2026', readTime: '7 min', excerpt: 'A 40-person team cut their analytics stack cost by 60% and got answers 10x faster. Here is their playbook.', image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=320&fit=crop' },
  { title: 'Building the Memory System: How Insightis Learns Your Business', category: 'Engineering', date: 'Mar 5, 2026', readTime: '10 min', excerpt: 'A deep dive into the architecture behind contextual memory, entity resolution, and persistent business knowledge.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=320&fit=crop' },
  { title: '5 Revenue Metrics Every RevOps Team Should Track Weekly', category: 'Data Analytics', date: 'Feb 28, 2026', readTime: '6 min', excerpt: 'Pipeline velocity, net revenue retention, and three more KPIs that separate guessing from knowing.', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=320&fit=crop' },
  { title: 'New: 50 More Data Source Connectors', category: 'Product Updates', date: 'Feb 20, 2026', readTime: '3 min', excerpt: 'From Notion to NetSuite, we just made it easier to plug in the tools your team already uses every day.', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=320&fit=crop' },
  { title: 'The Future of Business Intelligence is Conversational', category: 'Data Analytics', date: 'Feb 14, 2026', readTime: '9 min', excerpt: 'Dashboards were built for an era of patience. AI chat is built for an era of speed. Here is what changes.', image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&h=320&fit=crop' },
];

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
            <a href={article.url} key={article.slug} className="blog-card blog-fade-in" style={{animationDelay:`${i * 0.05}s`}}>
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
              <div style={{padding:'20px', display:'flex', flexDirection:'column', flex:1}}>
                <div style={{marginBottom:'10px'}}>
                  <span style={{fontSize:'10px', padding:'3px 8px', borderRadius:'999px', background:'var(--ins-surface-brand-tint)', border:'1px solid var(--ins-border-brand)', color:'var(--ins-text-highlight)', fontWeight:500, letterSpacing:'0.04em'}}>{article.category}</span>
                </div>
                <h3 style={{fontSize:'16px', fontWeight:500, color:'var(--ins-color-gray-100)', lineHeight:1.4, marginBottom:'8px', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical'}}>
                  {article.title}
                </h3>
                <p style={{fontSize:'13px', color:'var(--ins-text-inactive)', lineHeight:1.5, marginBottom:'12px', overflow:'hidden', display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical'}}>
                  {article.description}
                </p>
                <div style={{fontSize:'11px', color:'var(--ins-text-disabled)', fontFamily:"'Geist Mono', monospace", marginTop:'auto'}}>
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
function LoadMore() {
  return (
    <div style={{padding:'40px 0 60px', textAlign:'center'}}>
      <Button variant="secondary" size="md">Load More Articles</Button>
    </div>
  );
}

/* ── BOTTOM CTA ── */
function BottomCTA() {
  return (
    <section style={{paddingTop:'32px',paddingBottom:'64px',position:'relative'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{
          position:'relative',borderRadius:'16px',
          border:'1px solid rgba(30,30,48,1)',
          padding:'32px 48px',overflow:'hidden',
          display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:'24px',
          flexWrap:'wrap',
          background:'linear-gradient(135deg,rgba(18,18,31,.95) 0%,rgba(13,13,26,.98) 50%,rgba(18,18,31,.95) 100%)',
        }}>
          {/* Top shimmer */}
          <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(7,128,126,.3),transparent)'}}/>

          <h3 style={{fontSize:'clamp(22px,3vw,30px)',fontWeight:500,color:'#fff',letterSpacing:'-.03em',lineHeight:1.2,flexShrink:0}}>
            Stop reading about <span style={{color:'var(--ins-text-highlight)'}}>analytics.</span> Start doing it.
          </h3>

          <div style={{
            display:'flex',alignItems:'center',
            width:'100%',maxWidth:'420px',
            background:'#0D0D1A',border:'1px solid rgba(46,46,64,1)',
            borderRadius:'12px',overflow:'hidden',
            flexShrink:0,
          }}>
            <Input
              hideLabel
              label="Your work email"
              type="text"
              placeholder="Enter your work email"
              style={{
                flex:1,background:'transparent',fontSize:'14px',color:'#fff',
                padding:'12px 16px',outline:'none',border:'none',
                fontFamily:'Geist,sans-serif',minWidth:0,
                height:'auto',borderRadius:0,boxShadow:'none',
              }}
            />
            <Button variant="primary" size="sm" radius="lg" iconEnd={<ArrowRightIcon />} className="m-1 flex-shrink-0">
              Start for Free
            </Button>
          </div>
        </div>
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
            style={{fontSize:'13px', padding:'8px 14px'}}
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
