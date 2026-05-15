import React from 'react';
import logoUrl from '../assets/insightis-logo.svg?url';

export default function Logo({ height = 26 }) {
  return (
    <img
      src={logoUrl}
      alt="Insightis"
      height={height}
      style={{ height: `${height}px`, width: 'auto', display: 'block' }}
      draggable="false"
    />
  );
}
