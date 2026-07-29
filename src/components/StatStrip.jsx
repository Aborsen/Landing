import React from 'react';

/**
 * StatStrip — the bordered "by the numbers" metric band, with count-up values.
 *
 * Why this exists: the homepage ("What you get with Insightis") and the About
 * hero both render the same `.ins-stat-strip` surface, and the homepage grew a
 * local count-up component to animate its four figures. Rather than copy that
 * animation into a second page, both the markup and the count-up live here once.
 * The CSS is unchanged — `.ins-stat-strip` and its `__item / __value / __label /
 * __sub` children are already defined in design-system/components/card.css, so
 * this component adds no new styles.
 *
 * Text-preservation principle: every label, sub-label, prefix and suffix comes
 * from the call site verbatim. No defaults, no copy baked into the component.
 *
 * Two behaviours are load-bearing and easy to break when editing:
 *
 *  - Prerender / no-JS correctness (ISS-02). Pages are rendered to HTML at build
 *    time by scripts/prerender.mjs, so the value state INITIALIZES AT `target`:
 *    the shipped HTML — and the first hydrated paint — carry the real figures.
 *    Crawlers and no-JS visitors see "40,000+", never "0+". The count-up is pure
 *    enhancement, armed in a LAYOUT effect (never during render, which must not
 *    touch `window` or IntersectionObserver) so the reset to 0 lands before the
 *    browser paints and the real figure never flashes. See the comment on that
 *    effect — doing this in a passive effect instead is what forced the previous
 *    version to skip animating anything above the fold.
 *  - prefers-reduced-motion. If the visitor asked for less motion we simply
 *    never arm the animation, which leaves the final number on screen.
 *
 * Props (StatStrip)
 *  stats      [{ target: number, suffix?: string, prefix?: string,
 *                label: string, sub?: string }] — REQUIRED
 *  className  string — extra classes on the outer .ins-stat-strip element
 *
 * Example:
 *   <StatStrip stats={[
 *     { target: 200,   suffix: '+', label: 'Connectors',        sub: 'supported out-of-the-box' },
 *     { target: 40000, suffix: '+', label: 'Companies',         sub: 'rely on Devart data tools' },
 *   ]} />
 */

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * AnimatedStat — one count-up number. Exported for call sites that need the
 * figure on its own, outside the strip surface.
 *
 * Props
 *  target    number — the final value; also the value rendered on the server
 *  prefix    string — rendered before the number (e.g. '$')
 *  suffix    string — rendered after the number (e.g. '+', '%', 'x')
 *  duration  number — count-up length in ms (default 1800)
 */
export function AnimatedStat({ target, suffix = '', prefix = '', duration = 1800 }) {
  const [count, setCount] = React.useState(target);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef(null);

  // Arm the animation, or leave the final number in place.
  //
  // useLayoutEffect, not useEffect, and this is the whole trick: the value state
  // initialises at `target` so the prerendered HTML carries the real figure, which
  // means the client's first render also shows the real figure. Resetting to 0 in a
  // passive effect would therefore paint `40,000+` and only then jump to `0` — a
  // visible flash. A layout effect runs after the commit but BEFORE the browser
  // paints, so the reset is invisible and the visitor sees the count start at 0.
  //
  // The earlier version dodged the flash by skipping the animation for anything
  // already on screen at mount. That silently disabled it wherever the strip sits
  // above the fold — which is exactly where it is on the About page, so the figures
  // never moved. Hence the layout effect: it animates everywhere instead.
  //
  // Still nothing here runs during SSR / prerender: React does not invoke layout
  // effects on the server, and the guards below cover a non-DOM environment.
  React.useLayoutEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    if (prefersReducedMotion()) return;

    setCount(0);

    // Already on screen: start immediately rather than waiting for an intersection
    // that has, in effect, already happened.
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setStarted(true);
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!started) return;
    let frame = null;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
      else setCount(target);
    };
    frame = requestAnimationFrame(step);
    return () => { if (frame) cancelAnimationFrame(frame); };
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-US')}{suffix}
    </span>
  );
}

function StatStrip({ stats = [], className = '', ...rest }) {
  const classes = ['ins-stat-strip', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {stats.map((s, i) => (
        <div key={i} className="ins-stat-strip__item">
          <p className="ins-stat-strip__value">
            {/* Staggered durations so the four figures don't land in lockstep. */}
            <AnimatedStat
              target={s.target}
              prefix={s.prefix}
              suffix={s.suffix}
              duration={1800 + i * 150}
            />
          </p>
          <p className="ins-stat-strip__label">{s.label}</p>
          {s.sub && <p className="ins-stat-strip__sub">{s.sub}</p>}
        </div>
      ))}
    </div>
  );
}

export default StatStrip;
