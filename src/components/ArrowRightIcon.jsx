import React from 'react';

/**
 * ArrowRightIcon — the arrow that trails a call-to-action label.
 *
 * Extracted on 2026-08-03 from fourteen byte-identical copies across the pages
 * and two shared components. It takes no props on purpose: `stroke="currentColor"`
 * inherits the button's text colour, and the size comes from the slot it sits in
 * (Button's `iconEnd`, which sizes its own children), so every call site wanted
 * exactly this and nothing more.
 *
 * TWO OTHER ARROWS EXIST AND ARE NOT THIS ONE — do not fold them in:
 *   src/main.jsx           takes size and color, drawn for the hero's dark panel
 *   src/components/BlogPost.jsx  takes size and uses line+polyline geometry
 * Both render visibly differently, and collapsing them into this would change how
 * they look rather than just where they live.
 *
 * `aria-hidden` because it is decoration beside a label that already says where
 * the link goes; announcing "arrow" after "Start for free" adds nothing.
 */
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
);

export default ArrowRightIcon;
