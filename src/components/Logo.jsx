import React from 'react';

// SVG lives in public/assets/ so it's served at /assets/insightis-logo.svg
// without Vite hashing. This keeps the SSR-rendered URL identical to the
// client-side URL — no hydration mismatch, no manifest lookup needed.
export default function Logo({ height = 26 }) {
  return (
    <img
      src="/assets/insightis-logo.svg"
      alt="Insightis"
      height={height}
      style={{ height: `${height}px`, width: 'auto', display: 'block' }}
      draggable="false"
    />
  );
}
