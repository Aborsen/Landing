import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import '../app.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Real blog posts — each .md is a published article with a matching
// /blog/<slug> page rendered by src/pages/blog-<slug>.jsx.
import whatIsAiMd                  from '../../blog/Articles/what-is-ai-data-analysis.md?raw';
import bestAiToolsMd               from '../../blog/Articles/best-ai-data-analysis-tools.md?raw';
import marketingAnalyticsMd        from '../../blog/Articles/marketing-analytics-tools.md?raw';
import selfServiceBiMd             from '../../blog/Articles/self-service-bi-guide.md?raw';

function parseFrontmatter(raw) {
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

// Build the post list from real markdown files. Each post knows its own
// /blog/<slug> URL because the slug matches the .md filename and the
// blog-<slug>.html entry registered in vite.config.js.
const POSTS = [
  { slug: 'what-is-ai-data-analysis',    md: whatIsAiMd },
  { slug: 'best-ai-data-analysis-tools', md: bestAiToolsMd },
  { slug: 'marketing-analytics-tools',   md: marketingAnalyticsMd },
  { slug: 'self-service-bi-guide',       md: selfServiceBiMd },
].map(({ slug, md }) => {
  const { meta, body } = parseFrontmatter(md);
  return {
    slug,
    url: `/blog/${slug}`,
    title: meta.title || slug,
    description: meta.description || '',
    category: meta.category || 'Article',
    date: formatDate(meta.publishDate || meta.date),
    readTime: `${readingMinutes(body)} min`,
  };
});

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
          {categories.map(cat => (
            <button
              key={cat}
              className={`q-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
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

function BlogGrid({ activeCategory }) {
  const filtered = activeCategory === 'All'
    ? POSTS
    : POSTS.filter(a => a.category === activeCategory);

  return (
    <section style={{padding:'0 0 20px'}}>
      <div style={{maxWidth:'1280px', margin:'0 auto', padding:'0 24px'}}>
        <div className="blog-grid">
          {filtered.map((article, i) => (
            <a href={article.url} key={article.slug} className="blog-card blog-fade-in" style={{animationDelay:`${i * 0.05}s`}}>
              {/* Article cover — token-driven gradient placeholder (cover image assets not yet shipped) */}
              <div style={{
                height:'160px',
                background:'linear-gradient(135deg, var(--ins-color-teal-900), var(--ins-color-teal-700) 60%, var(--ins-color-teal-400))',
                borderBottom:'1px solid var(--ins-border-default)',
                position:'relative',
                overflow:'hidden',
              }}>
                <div style={{
                  position:'absolute', inset:0,
                  background:'radial-gradient(ellipse 60% 50% at 30% 30%, rgba(255,255,255,0.15), transparent 60%)',
                }}/>
                <div style={{
                  position:'absolute', bottom:14, left:18,
                  fontFamily:'var(--ins-font-family-mono)',
                  fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase',
                  color:'var(--ins-color-white)', opacity:0.9,
                }}>Insightis · Blog</div>
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
      <button style={{
        border:'1px solid rgba(255,255,255,.1)',
        background:'transparent',
        color:'var(--ins-text-inactive)',
        borderRadius:'999px',
        padding:'11px 24px',
        fontSize:'14px',
        cursor:'pointer',
        fontFamily:"'Geist', sans-serif",
        transition:'all .2s',
      }}
        onMouseEnter={e => e.target.style.color = '#fff'}
        onMouseLeave={e => e.target.style.color = 'var(--ins-text-inactive)'}
      >
        Load More Articles
      </button>
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
            <input
              type="text"
              placeholder="Enter your work email"
              style={{
                flex:1,background:'transparent',fontSize:'14px',color:'#fff',
                padding:'12px 16px',outline:'none',border:'none',
                fontFamily:'Geist,sans-serif',minWidth:0,
              }}
            />
            <button style={{
              display:'inline-flex',alignItems:'center',gap:'8px',
              padding:'10px 20px',margin:'4px',
              fontSize:'13px',fontWeight:500,color:'#fff',
              background:'linear-gradient(135deg,var(--ins-button-primary-bg),var(--ins-button-primary-bg-hover))',
              borderRadius:'8px',border:'none',cursor:'pointer',
              whiteSpace:'nowrap',flexShrink:0,
              fontFamily:'Geist,sans-serif',
            }}>
              Start for Free
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── APP ── */
function App() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div>
      <Header />
      <BlogHero />
      <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <BlogGrid activeCategory={activeCategory} />
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
