import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './app.css'
import Header from './components/Header';
import Footer from './components/Footer';
import IntegrationsStrip from './components/IntegrationsStrip';
import Button from './components/Button';
import Card from './components/Card';
import SolutionsAccordion from './components/SolutionsAccordion';
import BottomCTA from './components/BottomCTA';
import CheckIcon from './components/CheckIcon';
import ComparisonCards from './components/ComparisonCards';
import StatStrip from './components/StatStrip';
import RealConnectorIcon from './components/ConnectorIcon';

/* Single shared IntersectionObserver for all fade-ups.
   Replaces 33 per-component framer-motion `useInView` observers + re-render cascades.
   CSS handles the opacity/translate transition; no JS re-render on reveal. */
const fadeObserver = typeof window !== 'undefined'
  ? new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            fadeObserver.unobserve(e.target);
          }
        }
      },
      { rootMargin: '-80px' }
    )
  : null;

function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !fadeObserver) return;
    fadeObserver.observe(el);
    return () => fadeObserver.unobserve(el);
  }, []);
  return (
    <div
      ref={ref}
      className={`fade-up ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

// ─── ICONS (SVG inline, replacing Lucide) ───
// CheckIcon is imported from src/components/CheckIcon.jsx (canonical recipe).
function ArrowRightIcon({ size = 20, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
}
function ArrowUpRightIcon({ size = 16, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>;
}
function StarIcon({ size = 14, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
}
function SparkleIcon({ size = 20, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/></svg>;
}
// The Insightis mark itself (same geometry as public/favicon.svg). Used where the
// brand needs to appear as a glyph rather than the full lockup — the <Logo> component
// renders the lockup with the wordmark, which would duplicate adjacent "Insightis" text.
function InsightisMark({ size = 32, color = "var(--ins-color-teal-500)" }) {
  return (
    <svg width={size} height={size * (22.84 / 25.5)} viewBox="0 0 25.5 22.84" aria-hidden="true">
      <path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill={color}/>
    </svg>
  );
}
function GridIcon({ size = 24, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
}
function BrainIcon({ size = 28, color = "var(--ins-color-teal-500)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A5.5 5.5 0 0 0 4 7.5c0 1.58.7 3 1.81 3.97L12 17.5l6.19-6.03A5.48 5.48 0 0 0 20 7.5 5.5 5.5 0 0 0 14.5 2c-1.56 0-2.94.65-3.94 1.69A5.49 5.49 0 0 0 9.5 2z"/><path d="M12 17.5V22"/><path d="M6.5 12H4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2"/><path d="M17.5 12H20a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2"/></svg>;
}
function ZapIcon({ size = 16, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
}
function BarChartIcon({ size = 16, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>;
}
function BellIcon({ size = 16, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
}
function DatabaseIcon({ size = 16, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>;
}
function UsersIcon({ size = 16, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function SendIcon({ size = 18, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
}
function LinkIcon({ size = 16, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
}
function SearchIcon({ size = 16, color = "var(--ins-text-disabled)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function LayersIcon({ size = 16, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
}
function ShieldCheckIcon({ size = 16, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
}

// Social icons
function InstagramIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
}
// Connector SVG brand icons
function ConnectorIcon({ name, size = 20 }) {
  const icons = {
    HubSpot: <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF7A59"><path d="M18.16 5.67V3.39a1.71 1.71 0 0 0 1-1.55 1.72 1.72 0 0 0-3.44 0 1.71 1.71 0 0 0 1 1.55v2.28a5.55 5.55 0 0 0-2.8 1.5l-8.28-6.4a2.07 2.07 0 0 0 .05-.44 2.05 2.05 0 1 0-2.05 2.05 2.03 2.03 0 0 0 1.16-.37l8.13 6.27a5.56 5.56 0 0 0 .06 5.86l-2.49 2.49a1.87 1.87 0 0 0-.54-.08 1.88 1.88 0 1 0 1.88 1.88 1.87 1.87 0 0 0-.08-.54l2.45-2.45a5.59 5.59 0 1 0 3.95-9.87zm0 8.82a3.23 3.23 0 1 1 3.23-3.23 3.23 3.23 0 0 1-3.23 3.23z"/></svg>,
    Slack: <svg width={size} height={size} viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/><path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/><path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 0 1-2.52 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.52 2.522v6.312z" fill="#2EB67D"/><path d="M15.165 18.956a2.528 2.528 0 0 1 2.52 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.521-2.522v-2.522h2.521zm0-1.271a2.527 2.527 0 0 1-2.521-2.52 2.527 2.527 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.52h-6.313z" fill="#ECB22E"/></svg>,
    Salesforce: <svg width={size} height={size} viewBox="0 0 24 24" fill="#00A1E0"><path d="M10.006 5.16a4.182 4.182 0 0 1 3.16-1.456 4.2 4.2 0 0 1 3.924 2.712 5.073 5.073 0 0 1 1.728-.303 5.09 5.09 0 0 1 5.09 5.09 5.09 5.09 0 0 1-5.09 5.089h-.218a3.927 3.927 0 0 1-3.52 2.187 3.908 3.908 0 0 1-1.924-.504A4.476 4.476 0 0 1 9.038 20.5a4.455 4.455 0 0 1-1.136-.147 3.635 3.635 0 0 1-3.298 2.126A3.644 3.644 0 0 1 .96 18.835c0-.97.385-1.85 1.01-2.497a4.4 4.4 0 0 1-.409-1.858A4.426 4.426 0 0 1 4.62 10.1a4.4 4.4 0 0 1 1.374.219A4.69 4.69 0 0 1 10.006 5.16z"/></svg>,
    Stripe: <svg width={size} height={size} viewBox="0 0 24 24" fill="#635BFF"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.918 3.757 7.093c0 3.774 2.268 5.335 5.984 6.765 2.374.913 3.128 1.607 3.128 2.617 0 .936-.794 1.543-2.189 1.543-1.869 0-4.932-1.005-6.913-2.263l-.93 5.56C4.487 22.419 7.322 24 11.405 24c2.633 0 4.752-.655 6.282-1.894 1.678-1.349 2.543-3.354 2.543-5.815 0-3.884-2.363-5.462-6.254-7.141z"/></svg>,
    PostgreSQL: <svg width={size} height={size} viewBox="0 0 24 24" fill="#336791"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.825 2.865.356 4.471.476 6.636c.035.636.182 1.32.337 2.022.327 1.49.791 3.1 1.357 4.416.283.66.612 1.263 1.025 1.745.206.242.468.472.793.637.324.165.724.25 1.1.177.748-.146 1.202-.727 1.541-1.321.164-.288.302-.6.424-.912l.014.007c.76.366 1.628.474 2.469.36.14-.019.278-.046.413-.08l-.006.082c-.065.877-.036 1.755.09 2.63.202 1.388.632 2.86 1.756 3.876.052.047.108.085.163.126a1.966 1.966 0 0 0-.093.252c-.16.538-.125 1.08.215 1.528.34.448.876.648 1.39.685.516.037 1.07-.036 1.608-.169a5.867 5.867 0 0 0 1.55-.66c.509-.306.966-.712 1.196-1.265.142-.342.172-.711.065-1.073l-.002-.008c.314-.194.584-.424.822-.673.613-.642.975-1.422 1.197-2.2.439-1.538.464-3.19.453-4.26a.317.317 0 0 0 0-.032c.03-.019.06-.037.09-.057.475-.31.874-.734 1.167-1.235.518-.886.785-1.96.838-3.07.053-1.11-.1-2.28-.462-3.265a6.355 6.355 0 0 0-1.2-2.064C19.865.633 18.701.134 17.376.015 17.293.008 17.21.003 17.128 0z"/></svg>,
    'Google BigQuery': <svg width={size} height={size} viewBox="0 0 24 24"><path d="M6.22 13.84l-3.76 3.76a10.48 10.48 0 0 0 7.23 4.15l2.72-4.58a5.93 5.93 0 0 1-6.19-3.33z" fill="#4285F4"/><path d="M21.73 10.49a10.46 10.46 0 0 0-3.31-6.03L14.6 8.28a5.93 5.93 0 0 1 2.23 5.71h4.91c.09-.49.09-.99-.01-3.5z" fill="#4285F4"/><path d="M12 17.91a5.91 5.91 0 0 1-5.59-3.93L2.46 17.6A10.49 10.49 0 0 0 12 22.44c1.67 0 3.27-.4 4.71-1.13l-3.82-3.82a5.9 5.9 0 0 1-.89.42z" fill="#4285F4"/><circle cx="12" cy="12" r="3.45" fill="#4285F4"/><path d="M12 1.56A10.49 10.49 0 0 0 2.46 6.4l3.82 3.82A5.91 5.91 0 0 1 12 6.09a5.87 5.87 0 0 1 2.73.68l3.69-3.69A10.45 10.45 0 0 0 12 1.56z" fill="#4285F4"/></svg>,
    Snowflake: <svg width={size} height={size} viewBox="0 0 24 24" fill="#29B5E8"><path d="M12.394 23.4a1.963 1.963 0 0 1-.979-.263L7.7 20.96a.492.492 0 0 1 .488-.854l3.715 2.177a.982.982 0 0 0 .982 0l3.715-2.177a.492.492 0 0 1 .488.854l-3.715 2.177a1.963 1.963 0 0 1-.979.263zM5.51 19.384a.492.492 0 0 1-.492-.492v-4.343a.492.492 0 0 1 .984 0v4.343a.492.492 0 0 1-.492.492zm12.768 0a.492.492 0 0 1-.492-.492v-4.343a.492.492 0 0 1 .984 0v4.343a.492.492 0 0 1-.492.492zm-6.384-3.684a1.963 1.963 0 0 1-.979-.263l-3.715-2.177a1.963 1.963 0 0 1-.979-1.7V7.2c0-.702.373-1.35.979-1.7L10.915 3.32a1.963 1.963 0 0 1 1.958 0l3.715 2.18c.606.35.979.998.979 1.7v4.36c0 .702-.373 1.35-.979 1.7l-3.715 2.177a1.963 1.963 0 0 1-.979.263zm0-14.16a.982.982 0 0 0-.49.132L7.69 3.852a.982.982 0 0 0-.49.85v4.36c0 .35.187.675.49.85l3.715 2.18a.982.982 0 0 0 .982 0l3.715-2.18a.982.982 0 0 0 .49-.85V4.7a.982.982 0 0 0-.49-.85L12.384 1.672a.982.982 0 0 0-.49-.132zM2.836 8.784a.492.492 0 0 1-.243-.065L.736 7.592a.492.492 0 0 1 .488-.854l1.857 1.127a.492.492 0 0 1-.245.919zm18.116 0a.492.492 0 0 1-.245-.919l1.857-1.127a.492.492 0 0 1 .488.854l-1.857 1.127a.492.492 0 0 1-.243.065z"/></svg>,
    Redshift: <svg width={size} height={size} viewBox="0 0 24 24" fill="#8C4FFF"><path d="M1.463 8.586L12 14.12l10.537-5.534L12 3.051 1.463 8.586zm10.025 6.586L1.463 9.894v5.534L11.488 20.95v-5.778zm1.024 0v5.778l10.025-5.522V9.894l-10.025 5.278z"/></svg>,
  };
  return icons[name] || <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--ins-color-teal-600)"><rect width="24" height="24" rx="4"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="500">{name[0]}</text></svg>;
}

const connectorColors = {
  HubSpot: '#FF7A59', Databricks: '#FF3621', 'Google Analytics': '#E37400', Slack: '#4A154B',
  Salesforce: '#00A1E0', Stripe: '#635BFF', PostgreSQL: '#336791',
  'Google BigQuery': '#4285F4', Snowflake: '#29B5E8', Redshift: '#8C4FFF',
};

function ConnectorPill({ name, small = false }) {
  return (
    <div className={`flex items-center gap-2 ${small ? 'px-3 py-1.5' : 'px-4 py-2'} bg-[var(--ins-surface-card)] border border-[var(--ins-border-default)] rounded-full flex-shrink-0 hover:border-[var(--ins-border-hover)] transition-colors`}>
      <div className={`${small ? 'w-5 h-5' : 'w-6 h-6'} flex items-center justify-center`}>
        <ConnectorIcon name={name} size={small ? 16 : 18} />
      </div>
      <span className={`${small ? 'text-xs' : 'text-sm'} text-[var(--ins-text-body)] font-medium whitespace-nowrap`}>{name}</span>
    </div>
  );
}

// ─── HEADER ───
// ─── HERO ───
function Hero() {
  const questions = [
    "Why did our MRR drop last week?",
    "Which channel has the best CAC?",
    "What's driving churn this quarter?",
    "Show me net revenue retention"
  ];
  const [currentQ, setCurrentQ] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [userText, setUserText] = useState("");
  const [tooltip, setTooltip] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isActive) return;
    const fullText = questions[currentQ];
    let timeout;

    if (!isDeleting && displayText.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 40 + Math.random() * 30);
    } else if (!isDeleting && displayText.length === fullText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 20);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentQ((currentQ + 1) % questions.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentQ, isActive]);

  const handleChatClick = () => {
    if (!isActive) {
      setIsActive(true);
      setUserText("");
      setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
    }
  };

  const showTooltip = (e, id) => {
    e.stopPropagation();
    setTooltip(tooltip === id ? null : id);
  };

  useEffect(() => {
    if (!tooltip) return;
    const close = () => setTooltip(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [tooltip]);

  const integrations = ['HubSpot', 'Databricks', 'Google Analytics', 'Slack', 'Salesforce', 'Stripe', 'PostgreSQL', 'Google BigQuery', 'Snowflake', 'Redshift'];

  const TooltipPopup = () => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-[var(--ins-color-gray-800)] border border-[var(--ins-border-hover)] rounded-xl p-4 z-[100]" onClick={e => e.stopPropagation()} style={{ boxShadow: 'none' }}>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[var(--ins-color-gray-800)] border-l border-t border-[var(--ins-border-hover)] rotate-45 mb-[-5px]"></div>
      <p className="ins-text-emphasise-sm mb-1">Unlock full access</p>
      <p className="text-[var(--ins-text-body)] text-xs mb-3">Get more after registration — connect your data sources and explore AI insights.</p>
      <Button as="a" href="/auth/sign-up/" variant="primary" size="sm">Sign Up Free</Button>
    </div>
  );

  return (
    <>
    <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{minHeight: 'min(100vh, 900px)', paddingTop: 'var(--ins-size-20)', paddingBottom: 'var(--ins-size-10)'}}>
      {/* Hero glow, sized and centred to sit behind the content. (Teal, not
          purple — the old label was left over from an earlier palette.)

          Was `38% 42% at 50% 60%`, which read as a wide off-centre pool. The
          radii are a share of the SECTION, and the section is full-bleed, so 38%
          meant a 1446px-wide glow behind a ~540px column — nearly three times the
          content. 26% brings that to ~990px, still a soft halo wider than the
          text but recognisably behind it.

          The centre moved 60% -> 52% because 60% was not where the content is.
          The section is min(100vh,900px) with 80px/40px padding and centres its
          content in what is left, which puts the content's midpoint at ~52.5% of
          the section height — so the old glow sat roughly 60px low.

          No blur: it widened the glow, which is the complaint here, and it was
          never what fixed the contour rings. The noise layer on the page wrapper
          does that. Tightening actually helps the banding slightly too — the same
          ~23 levels now span 495px instead of 723px, so the steps sit closer
          together and read less like arcs. */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 26% 32% at 50% 52%, rgba(7,128,126,0.20) 0%, transparent 100%)' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Headline */}
        <FadeUp delay={0.1}>
          <h1 className="ins-text-hero text-center mb-6">
            <span style={{display:'block'}} className="text-[var(--ins-text-heading-soft)]">Talk to your data</span>
            <span style={{display:'block',color:'var(--ins-text-highlight)'}}>It already knows the answer</span>
          </h1>
        </FadeUp>

        {/* Description */}
        <FadeUp delay={0.17}>
          <p className="ins-text-body-lg max-w-2xl mx-auto mb-8">
            Connect your tools and ask in plain English. Insightis gives you trusted, source-linked answers in seconds — no SQL, no CSV exports, no guessing.
          </p>
        </FadeUp>
        {/* Chat Mockup */}
        <FadeUp delay={0.2}>
          <div className="max-w-[720px] mx-auto mb-8">
            <div className="bg-[var(--ins-surface-card)] backdrop-blur-xl border border-[var(--ins-border-hover)] rounded-2xl" style={{ boxShadow: '0 12px 40px -16px var(--ins-color-black-a-50)' }}>

              {/* Input area */}
              <div className="px-5 pt-5 pb-3 cursor-text" onClick={handleChatClick} style={{ minHeight: '180px' }}>
                <div className="flex items-start min-h-[160px]">
                  {isActive ? (
                    <textarea
                      ref={inputRef}
                      value={userText}
                      onChange={e => setUserText(e.target.value)}
                      placeholder="Ask anything about your data..."
                      aria-label="Ask anything about your data"
                      className="flex-1 bg-transparent text-[var(--ins-text-heading)] text-base outline-none focus-visible:outline-none focus-visible:shadow-none placeholder-[var(--ins-text-disabled)] resize-none h-[160px]"
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && userText.trim()) { e.preventDefault(); window.location.href = '/auth/sign-up/'; } }}
                    />
                  ) : (
                    <div className="flex items-start">
                      <span className="text-white/90 text-base">{displayText}</span>
                      <span className="text-[var(--ins-color-teal-500)] text-xl ml-0.5" style={{ animation: 'blink 1s step-end infinite' }}>|</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--ins-border-default)]">
                <div className="flex items-center gap-1">

                  {/* Attach button — enabled; opens a sign-in-gated popover */}
                  <div className="relative">
                    <button
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 hover:bg-white/5"
                      style={{ color: tooltip === 'attach' ? 'var(--ins-text-highlight)' : 'var(--ins-text-body)', background: tooltip === 'attach' ? 'var(--ins-surface-brand-tint)' : 'transparent' }}
                      aria-label="Attach data"
                      aria-haspopup="true"
                      aria-expanded={tooltip === 'attach'}
                      onClick={e => { e.stopPropagation(); setTooltip(tooltip === 'attach' ? null : 'attach'); }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                    </button>
                    {tooltip === 'attach' && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-[var(--ins-surface-card)] border border-[var(--ins-border-hover)] rounded-2xl shadow-2xl z-[100] overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="px-3 py-3">
                          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl" style={{ opacity: 0.55, cursor: 'not-allowed' }}>
                            <div className="w-6 h-6 rounded-md bg-[var(--ins-border-default)] border border-[var(--ins-border-hover)] flex items-center justify-center flex-shrink-0">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ins-text-disabled)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                            </div>
                            <span className="text-sm text-[var(--ins-text-disabled)]">Attach files &amp; data</span>
                          </div>
                          <p className="text-xs text-[var(--ins-text-body)] px-2 mt-1.5 mb-2.5 leading-relaxed">Sign in to attach files and connect your data sources.</p>
                          <a href="/auth/sign-in/" onClick={e => e.stopPropagation()} className="flex items-center justify-center px-3 py-2 rounded-lg text-xs font-medium transition-opacity hover:opacity-90" style={{ background: 'var(--ins-color-teal-500)', color: '#fff' }}>
                            Sign in to continue
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Connectors button */}
                  <div className="relative">
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-150 hover:bg-white/5"
                      style={{ color: tooltip === 'connectors' ? 'var(--ins-text-highlight)' : 'var(--ins-text-body)', background: tooltip === 'connectors' ? 'var(--ins-surface-brand-tint)' : 'transparent' }}
                      onClick={e => { e.stopPropagation(); setTooltip(tooltip === 'connectors' ? null : 'connectors'); }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                      <span className="text-sm font-medium">Connectors</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    {tooltip === 'connectors' && (
                      <div className="absolute bottom-full left-0 mb-2 w-64 bg-[var(--ins-surface-card)] border border-[var(--ins-border-hover)] rounded-2xl shadow-2xl z-[100] overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="px-3 pt-3 pb-1">
                          {[
                            { name: 'Salesforce', domain: 'salesforce.com', slug: 'salesforce' },
                            { name: 'Shopify', domain: 'shopify.com' },
                            { name: 'Facebook Ads', domain: 'facebook.com', slug: 'facebook' },
                            { name: 'Dynamics 365', domain: 'microsoft.com' },
                            { name: 'QuickBooks Online', domain: 'quickbooks.intuit.com', slug: 'quickbooks' },
                            { name: 'HubSpot', domain: 'hubspot.com' },
                            { name: 'Google BigQuery', domain: 'cloud.google.com', slug: 'googlebigquery' },
                          ].map(c => (
                            <div key={c.name} className="flex items-center justify-between px-2 py-2 rounded-xl">
                              <div className="flex items-center gap-2.5">
                                {/* Bare sprite logo — same standard as the connectors page (no chip box) */}
                                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                  <RealConnectorIcon name={c.name} slug={c.slug} domain={c.domain} bg="transparent" size={20} />
                                </div>
                                <span className="text-sm text-[var(--ins-text-body)]">{c.name}</span>
                              </div>
                              <a href="/auth/sign-in/" onClick={e => e.stopPropagation()} className="text-xs font-medium text-[var(--ins-color-teal-500)] hover:text-[var(--ins-color-teal-400)] transition-colors flex-shrink-0">Connect</a>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-t border-[var(--ins-border-hover)]">
                          <a href="/resources/connectors" className="flex items-center gap-1.5 text-xs text-[var(--ins-color-teal-500)] hover:text-[var(--ins-color-teal-400)] transition-colors">
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                            View all 200+ connectors
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Send button — grey when empty, teal when has text */}
                <button
                  className="flex items-center justify-center px-4 py-2 rounded-xl ins-text-emphasise-sm transition-all duration-200"
                  style={{
                    background: userText.trim() ? 'linear-gradient(135deg, var(--ins-color-teal-500), var(--ins-color-teal-600))' : 'var(--ins-color-white-a-08)',
                    boxShadow: userText.trim() ? '0 0 16px rgba(7,128,126,0.35)' : 'none',
                    cursor: userText.trim() ? 'pointer' : 'default',
                    color: userText.trim() ? 'white' : 'var(--ins-text-body)'
                  }}
                  onClick={() => { if (userText.trim()) window.location.href = '/auth/sign-up/'; }}
                >
                  Send
                </button>

              </div>
            </div>
          </div>
        </FadeUp>

        {/* Trust line — restructured as 3-pill strip per ISS-39 for fast scanning */}
        <FadeUp delay={0.3}>
          <div className="text-xs text-[var(--ins-text-body)] flex items-center justify-center gap-3 flex-wrap">
            <span className="flex items-center gap-2">
              <CheckIcon size={14} color="var(--ins-text-highlight)" />
              Built by <span className="text-[var(--ins-text-body)]">Devart</span>
            </span>
            <span aria-hidden="true" className="text-[var(--ins-text-disabled)] text-lg leading-none">·</span>
            <span><span className="text-[var(--ins-text-body)]">40,000+</span> companies</span>
            <span aria-hidden="true" className="text-[var(--ins-text-disabled)] text-lg leading-none">·</span>
            <span><span className="text-[var(--ins-text-body)]">28&nbsp;years</span> of data tooling</span>
          </div>
        </FadeUp>
      </div>
    </section>

      <IntegrationsStrip />
    </>
  );
}

// ─── ARCH OUTPUT CARDS ───
// ─── ARCH RIGHT — stream + cards fully synced ───
function ArchRight({ outputs }) {
  const STREAM_MS  = 2400;  // stream travel time
  const STEP_MS    = 180;   // between card waves
  const HOLD_MS    = 1200;  // cards stay lit
  const PAUSE_MS   = 1800;  // pause before next cycle
  const CYCLE = STREAM_MS + STEP_MS * 2 + HOLD_MS + PAUSE_MS;

  const [streaming, setStreaming] = React.useState(false);
  const [litCards,  setLitCards]  = React.useState([]);
  const waves = [[2], [1, 3], [0, 4]];

  React.useEffect(() => {
    let timeouts = [];

    function runCycle() {
      setStreaming(false);
      setLitCards([]);

      // Start stream on next tick so transition triggers
      const t0 = setTimeout(() => setStreaming(true), 50);
      timeouts.push(t0);

      // Light up cards exactly when stream finishes
      waves.forEach((wave, wi) => {
        const t = setTimeout(() => {
          setLitCards(prev => [...new Set([...prev, ...wave])]);
        }, STREAM_MS + wi * STEP_MS);
        timeouts.push(t);
      });

      // Fade all cards
      const fadeAt = STREAM_MS + (waves.length - 1) * STEP_MS + HOLD_MS;
      const tFade = setTimeout(() => setLitCards([]), fadeAt);
      timeouts.push(tFade);
    }

    runCycle();
    const interval = setInterval(runCycle, CYCLE);
    return () => { timeouts.forEach(clearTimeout); clearInterval(interval); };
  }, []);

  return (
    <div style={{ display: 'contents' }}>
      {/* Stream connector */}
      <div className="relative flex items-center" style={{ height: '32px', overflow: 'hidden' }}>
        <div style={{ position: 'relative', width: '100%', height: '1px', background: 'rgba(7,128,126,0.15)' }}>
          <div style={{
            position: 'absolute',
            top: '-0.5px',
            width: '40px',
            height: '1px',
            borderRadius: '1px',
            background: 'linear-gradient(90deg, rgba(9,160,157,0) 0%, var(--ins-color-teal-400) 60%, var(--ins-color-teal-300) 100%)',
            left: streaming ? 'calc(100% + 40px)' : '-40px',
            transition: streaming ? `left ${STREAM_MS}ms linear` : 'none',
          }}/>
        </div>
      </div>

      {/* Output cards */}
      <div className="flex flex-col justify-between" style={{ alignSelf: 'stretch' }}>
        {outputs.map((o, i) => {
          const isLit = litCards.includes(i);
          return (
            <div key={o.title} className="flex items-center gap-3 px-4 py-3.5 rounded-card" style={{
              border: `1px solid ${isLit ? 'var(--ins-color-teal-a-50)' : 'var(--ins-border-default)'}`,
              background: isLit ? 'rgba(7,128,126,0.08)' : 'var(--ins-surface-card)',
              boxShadow: isLit ? '0 0 16px rgba(9,160,157,0.15), inset 0 0 20px rgba(9,160,157,0.05)' : 'none',
              transition: 'all 0.2s ease',
            }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'rgba(7,128,126,0.15)', border: '1px solid rgba(7,128,126,0.3)'}}>{o.icon}</div>
              <div>
                <p className="ins-text-emphasise-sm">{o.title}</p>
                <p className="text-xs text-[var(--ins-text-body)]">{o.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ARCH OUTPUT CARDS (legacy) ───
function ArchOutputCards({ outputs }) { return null; }

// ─── ARCHITECTURE SECTION ───
/* TODO SEO: full SVG accessibility pass — classify each standalone <svg> as
   meaningful (add role="img" + <title>) or decorative (add aria-hidden="true").
   Current state: inline SVGs inside text-labelled buttons/links are read as
   decorative by most screen readers because the adjacent text is the
   accessible name; a formal pass would make this explicit. */
function Architecture() {
  const connectors = [
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'Snowflake', color: '#29B5E8' },
    { name: 'Google BigQuery', color: '#4285F4' },
    { name: 'Redshift', color: '#8C4FFF' },
    { name: 'HubSpot', color: '#FF7A59' },
    { name: 'Salesforce', color: '#00A1E0' },
    { name: 'Databricks', color: '#FF3621' },
    { name: 'Google Analytics', color: '#E37400' },
    { name: 'Slack', color: '#4A154B' },
    { name: 'Stripe', color: '#635BFF' },
  ];

  // Chaotic swarm — scattered to fill full area matching right panel
  const chaosSwarm = [
    { name: 'Jira',      top: '2%',  left: '22%', rotate: 0, opacity: 0.9 },
    { name: 'Snowflake', top: '5%',  left: '72%', rotate: 0, opacity: 0.85 },
    { name: 'Slack',     top: '35%', left: '0%',  rotate: 0, opacity: 0.9 },
    { name: 'Shopify',   top: '40%', left: '50%', rotate: 0, opacity: 0.85 },
    { name: 'HubSpot',   top: '80%', left: '18%', rotate: 0, opacity: 0.9 },
    { name: 'Salesforce', top: '82%', left: '70%', rotate: 0, opacity: 0.85 },
  ];
  // Icon centers mapped to viewBox 0 0 100 100 (left% + ~7, top% + ~8)
  // Jira: (29,10), Snowflake: (79,13), Slack: (7,43), Shopify: (57,48), HubSpot: (25,88), Salesforce: (77,90)
  const chaosLines = [
    { d: 'M29,10 L79,13' },        // Jira → Snowflake
    { d: 'M29,10 L7,43' },         // Jira → Slack
    { d: 'M29,10 L57,48' },        // Jira → Shopify
    { d: 'M79,13 L57,48' },        // Snowflake → Shopify
    { d: 'M79,13 L77,90' },        // Snowflake → Salesforce
    { d: 'M7,43 L57,48' },         // Slack → Shopify
    { d: 'M7,43 L25,88' },         // Slack → HubSpot
    { d: 'M57,48 L25,88' },        // Shopify → HubSpot
    { d: 'M57,48 L77,90' },        // Shopify → Salesforce
    { d: 'M25,88 L77,90' },        // HubSpot → Salesforce
    // Lines from icons to right edge (connecting to wire stream)
    { d: 'M29,10 Q65,25 100,48' },   // Jira → right
    { d: 'M79,13 Q90,30 100,46' },   // Snowflake → right
    { d: 'M7,43 Q50,44 100,50' },    // Slack → right
    { d: 'M57,48 Q78,49 100,50' },   // Shopify → right
    { d: 'M25,88 Q65,72 100,52' },   // HubSpot → right
    { d: 'M77,90 Q90,70 100,54' },   // Salesforce → right
  ];

  const ClockIcon = ({ size = 16, color = 'var(--ins-color-teal-500)' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  );
  const WandIcon = ({ size = 16, color = 'var(--ins-color-teal-500)' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 4l-1 2-2 1 2 1 1 2 1-2 2-1-2-1z"/>
      <path d="M9 11l-6 9 9-6"/>
      <path d="M14 9l1 1"/>
    </svg>
  );
  const outputs = [
    { icon: <ZapIcon size={16} color="var(--ins-color-teal-500)" />, title: 'Answers in Seconds', desc: 'X3 accuracy' },
    { icon: <LayersIcon size={16} color="var(--ins-color-teal-500)" />, title: 'Semantic Layer', desc: 'One Trusted Source of Data' },
    { icon: <LinkIcon size={16} color="var(--ins-color-teal-500)" />, title: '200+ Data Connectors', desc: 'Plug into any source' },
    { icon: <WandIcon size={16} color="var(--ins-color-teal-500)" />, title: 'No-Code Setup', desc: 'Live in minutes, not months' },
    { icon: <ClockIcon size={16} color="var(--ins-color-teal-500)" />, title: 'Real-Time Info', desc: 'Always up to date' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 32% 34% at 50% 60%, rgba(7,128,126,0.16) 0%, transparent 100%)' }}></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-16 arch-heading">
            <span className="ins-eyebrow ins-eyebrow--pill mb-4">One source of truth</span>
            <h2 className="ins-text-display mb-4">Every number means the same thing</h2>
            <p className="ins-text-body-lg max-w-2xl mx-auto">
              Each of your tools defines “revenue” or “MRR” a little differently — so your reports never quite match. Insightis sets one trusted definition for each metric. Define it once, and every report shows the same number.
            </p>
          </div>
        </FadeUp>

        {/* Desktop diagram */}
        <FadeUp delay={0.15}>
          <div className="hidden lg:grid grid-cols-[1fr_100px_auto_100px_1fr] items-center gap-0 max-w-7xl mx-auto">
            {/* Left connectors — chaotic scattered icons with dashed lines */}
            <div className="relative" style={{ minHeight: '380px', alignSelf: 'stretch' }}>
              {/* Dashed connection lines between icons */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                {chaosLines.map((line, i) => (
                  <path key={'cl'+i} d={line.d} stroke="var(--ins-border-strong)" strokeWidth="0.35" fill="none" strokeDasharray="1.5,1.5" opacity="0.7"/>
                ))}
              </svg>
              {/* Scattered connector icons */}
              {chaosSwarm.map((item, i) => (
                <div key={'chaos'+i} className="absolute flex items-center justify-center" style={{
                  top: item.top,
                  left: item.left,
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--ins-radius-2xl)',
                  background: 'var(--ins-surface-card)',
                  border: '1px solid var(--ins-border-default)',
                  boxShadow: 'var(--ins-shadow-sm)',
                  opacity: item.opacity,
                  animation: `chaosFloat ${4 + (i % 3) * 1.5}s ease-in-out ${i * 0.5}s infinite alternate`,
                }}>
                  <RealConnectorIcon name={item.name} size={30} />
                </div>
              ))}
            </div>

            {/* Left connector — chaos to order stream */}
            <div className="relative overflow-hidden flex items-center" style={{ height: '32px' }}>
              <svg className="w-full h-full" viewBox="0 0 100 32" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,5 Q15,2 30,10 Q50,18 70,16 Q85,15 100,16" stroke="#FF6B6B" strokeWidth="0.5" fill="none" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6.23s" repeatCount="indefinite"/>
                </path>
                <path d="M0,12 Q20,20 35,14 Q55,8 75,16 Q90,16 100,16" stroke="#FF9900" strokeWidth="0.5" fill="none" opacity="0.4">
                  <animate attributeName="opacity" values="0.3;0.5;0.3" dur="5.2s" repeatCount="indefinite"/>
                </path>
                <path d="M0,22 Q25,28 40,20 Q55,12 70,16 Q85,16 100,16" stroke="#635BFF" strokeWidth="0.5" fill="none" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.4;0.2" dur="7.28s" repeatCount="indefinite"/>
                </path>
                <path d="M0,28 Q20,15 40,18 Q60,20 75,16 Q90,16 100,16" stroke="#4285F4" strokeWidth="0.5" fill="none" opacity="0.3">
                  <animate attributeName="opacity" values="0.3;0.5;0.3" dur="5.82s" repeatCount="indefinite"/>
                </path>
                {/* Flowing particles — 4 total */}
                <circle r="1.2" fill="#FF6B6B" opacity="0.7">
                  <animateMotion dur="4.15s" repeatCount="indefinite" path="M0,5 Q15,2 30,10 Q50,18 70,16 Q85,15 100,16"/>
                </circle>
                <circle r="1.2" fill="#FF9900" opacity="0.6">
                  <animateMotion dur="5.2s" repeatCount="indefinite" path="M0,12 Q20,20 35,14 Q55,8 75,16 Q90,16 100,16"/>
                </circle>
                <circle r="1.2" fill="#635BFF" opacity="0.65">
                  <animateMotion dur="4.62s" repeatCount="indefinite" begin="1.23s" path="M0,22 Q25,28 40,20 Q55,12 70,16 Q85,16 100,16"/>
                </circle>
                <circle r="1.2" fill="#4285F4" opacity="0.6">
                  <animateMotion dur="5.54s" repeatCount="indefinite" begin="2.15s" path="M0,28 Q20,15 40,18 Q60,20 75,16 Q90,16 100,16"/>
                </circle>
              </svg>
            </div>

            {/* Center core engine */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-36 h-36 rounded-2xl flex flex-col items-center justify-center gap-3" style={{ border: '1px solid rgba(7,128,126,0.5)', background: 'linear-gradient(135deg, rgba(7,128,126,0.25), rgba(7,128,126,0.08))', animation: 'corePulse 3s ease-in-out infinite' }}>
                <InsightisMark size={38} />
                <span className="text-[13px] font-medium text-[var(--ins-color-teal-500)] text-center leading-tight">Insightis<br/>Semantic AI</span>
              </div>
            </div>

            {/* Right side — stream + cards, fully synced in one React component */}
            <ArchRight outputs={outputs} />
          </div>

          {/* Mobile/tablet layout */}
          <div className="lg:hidden flex flex-col items-center gap-6">
            {(() => {
              // Mobile-friendly chaos positions: 3 rows × 2 col, offset for visual interest.
              const mobileSwarm = [
                { name: 'Slack',      top: '4%',  left: '8%'  },
                { name: 'Snowflake',  top: '4%',  left: '68%' },
                { name: 'Jira',       top: '38%', left: '-2%' },
                { name: 'Shopify',    top: '38%', left: '74%' },
                { name: 'HubSpot',    top: '70%', left: '16%' },
                { name: 'Salesforce', top: '70%', left: '58%' },
              ];
              // Dashed-line connection paths between approximate icon centers (viewBox 0 0 100 100).
              const mobileLines = [
                'M14,12 L74,12',          // Slack → Snowflake
                'M14,12 L4,46',           // Slack → Jira
                'M14,12 L24,78',          // Slack → HubSpot
                'M74,12 L80,46',          // Snowflake → Shopify
                'M74,12 L66,78',          // Snowflake → Salesforce
                'M4,46 L80,46',           // Jira → Shopify
                'M4,46 L24,78',           // Jira → HubSpot
                'M80,46 L66,78',          // Shopify → Salesforce
                'M24,78 L66,78',          // HubSpot → Salesforce
                'M4,46 L66,78',           // Jira → Salesforce (diagonal)
                'M80,46 L24,78',          // Shopify → HubSpot (diagonal)
              ];
              return (
                <div className="relative w-full" style={{height:'260px'}}>
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {mobileLines.map((d, i) => (
                      <path key={'ml'+i} d={d} stroke="var(--ins-border-strong)" strokeWidth="0.35" fill="none" strokeDasharray="1.5,1.5" opacity="0.7"/>
                    ))}
                  </svg>
                  {mobileSwarm.map((item, i) => (
                    <div key={'mob-chaos'+i} className="absolute w-11 h-11 rounded-xl bg-[var(--ins-surface-card)]/90 border border-[var(--ins-border-default)] flex items-center justify-center" style={{
                      top: item.top,
                      left: item.left,
                      boxShadow: 'var(--ins-shadow-sm)',
                      animation: `chaosFloat ${4 + (i % 3) * 1.5}s ease-in-out ${i * 0.5}s infinite alternate`,
                    }}>
                      <RealConnectorIcon name={item.name} size={20} />
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Downward stream — animated multicolor flow into the engine */}
            <div className="relative" style={{width:'40px', height:'56px'}}>
              <svg width="40" height="56" viewBox="0 0 40 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8,0 Q12,18 20,28 Q24,40 12,56" stroke="#FF6B6B" strokeWidth="0.6" fill="none" opacity="0.4">
                  <animate attributeName="opacity" values="0.2;0.5;0.2" dur="6.23s" repeatCount="indefinite"/>
                </path>
                <path d="M20,0 Q14,16 24,30 Q28,42 20,56" stroke="#FF9900" strokeWidth="0.6" fill="none" opacity="0.4">
                  <animate attributeName="opacity" values="0.3;0.5;0.3" dur="5.2s" repeatCount="indefinite"/>
                </path>
                <path d="M32,0 Q28,18 18,30 Q12,42 28,56" stroke="#635BFF" strokeWidth="0.6" fill="none" opacity="0.3">
                  <animate attributeName="opacity" values="0.2;0.4;0.2" dur="7.28s" repeatCount="indefinite"/>
                </path>
                <circle r="1.4" fill="#FF6B6B" opacity="0.8">
                  <animateMotion dur="4.15s" repeatCount="indefinite" path="M8,0 Q12,18 20,28 Q24,40 12,56"/>
                </circle>
                <circle r="1.4" fill="#FF9900" opacity="0.7">
                  <animateMotion dur="5.2s" repeatCount="indefinite" path="M20,0 Q14,16 24,30 Q28,42 20,56"/>
                </circle>
                <circle r="1.4" fill="#635BFF" opacity="0.7">
                  <animateMotion dur="4.62s" repeatCount="indefinite" begin="1.23s" path="M32,0 Q28,18 18,30 Q12,42 28,56"/>
                </circle>
              </svg>
            </div>

            <div className="w-28 h-28 rounded-2xl flex flex-col items-center justify-center gap-2" style={{ border: '1px solid rgba(7,128,126,0.5)', background: 'linear-gradient(135deg, rgba(7,128,126,0.25), rgba(7,128,126,0.08))', animation: 'corePulse 3s ease-in-out infinite' }}>
              <InsightisMark size={30} />
              <span className="text-[11px] font-medium text-[var(--ins-color-teal-500)] text-center leading-tight">Insightis<br/>Semantic AI</span>
            </div>

            <div className="w-px h-8 bg-gradient-to-b from-[var(--ins-color-teal-600)]/40 via-[var(--ins-color-teal-600)]/40 to-transparent"></div>

            <div className="grid grid-cols-1 gap-3 w-full">
              {outputs.map(o => (
                <div key={o.title} className="flex items-center gap-3 px-4 py-3 bg-[var(--ins-surface-card)] border border-[var(--ins-border-default)] rounded-card">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'rgba(7,128,126,0.15)', border: '1px solid rgba(7,128,126,0.3)'}}>{o.icon}</div>
                  <div>
                    <p className="ins-text-emphasise-sm">{o.title}</p>
                    <p className="text-xs text-[var(--ins-text-body)]">{o.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}


// ─── HOW IT WORKS (showcase) ───
function HowItWorks() {
  const mountRef = React.useRef(null);
  React.useEffect(() => {
    // showcase.js is loaded via <script defer>; on slow networks (e.g. Vercel
    // cold-start) it can finish parsing AFTER React hydrates and fires this
    // effect, leaving window.initShowcase undefined. Poll on each frame until
    // it appears, then call once. Bounded so we never spin forever.
    let cancelled = false;
    const tryInit = (attempts = 0) => {
      if (cancelled) return;
      if (typeof window.initShowcase === 'function') {
        window.initShowcase();
        return;
      }
      if (attempts < 120) requestAnimationFrame(() => tryInit(attempts + 1));
    };
    requestAnimationFrame(() => tryInit());
    return () => { cancelled = true; };
  }, []);
  const steps = [
    { n: '01', title: 'Connect your data', desc: 'OAuth or API key. Most connectors live in under 5 minutes — read-only and encrypted.' },
    { n: '02', title: 'Map your metrics', desc: 'Insightis maps the metrics that matter — MRR, CAC, active users — from 500+ pre-built definitions. Edit anytime.' },
    { n: '03', title: 'Ask in plain English', desc: 'Your team asks questions. Insightis queries the right sources and returns precise answers in seconds.' },
  ];
  return (
    <section id="how-it-works" style={{padding:'100px 0', background:'radial-gradient(ellipse 38% 42% at 50% 60%, rgba(7,128,126,0.20) 0%, transparent 100%)', position:'relative'}}>
      {/* Mobile / reduced-motion text-only summary — hidden on desktop via responsive.css */}
      <div className="how-it-works-text-only" style={{display:'none', maxWidth:'720px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{textAlign:'center', marginBottom:'var(--ins-size-10)'}}>
          <span className="ins-eyebrow ins-eyebrow--pill" style={{marginBottom:'14px'}}>How it works</span>
          <h2 style={{fontSize:'clamp(1.8rem,6vw,2.4rem)',fontWeight:500,color:'var(--ins-text-heading)',letterSpacing:'-.02em',lineHeight:1.15}}>From your stack to a precise answer</h2>
        </div>
        <ol style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'18px'}}>
          {steps.map(s => (
            <li key={s.n} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
              <span style={{flexShrink:0,width:'36px',height:'36px',borderRadius:'50%',border:'1px solid var(--ins-border-brand)',background:'var(--ins-surface-brand-tint)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--ins-font-family-mono)',fontSize:'13px',fontWeight:500,color:'var(--ins-text-highlight)'}}>{s.n}</span>
              <div>
                <p className="ins-text-h4" style={{marginBottom:'var(--ins-size-1)'}}>{s.title}</p>
                <p className="ins-text-body">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Desktop animated showcase — hidden on mobile via responsive.css.
          showcase.js populates this div imperatively from a <template>;
          suppressHydrationWarning tells React the children diverge from SSR by design. */}
      <div id="showcase-mount" ref={mountRef} suppressHydrationWarning />
    </section>
  );
}


// ─── WHAT IS INSIGHTIS ───
function WhatIsInsightis() {
  const stats = [
    { target: 200,   suffix: "+", prefix: "", label: "Connectors",           sub: "supported out-of-the-box" },
    { target: 500,   suffix: "+", prefix: "", label: "Pre-built metrics",    sub: "auto-mapped from your tools" },
    { target: 28,    suffix: "",  prefix: "", label: "Years of data tooling", sub: "built by the Devart team" },
    { target: 40000, suffix: "+", prefix: "", label: "Companies",            sub: "rely on Devart data tools" },
  ];

  /* No wash on this section, deliberately — owner call. The other blocks on this
     page keep theirs, so don't "restore consistency" here without asking. */
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-14">
            <span className="ins-eyebrow ins-eyebrow--pill mb-5">What you get</span>
            <h2 className="text-4xl md:text-[48px] font-medium text-[var(--ins-text-heading)] tracking-tight leading-[1.1]">What you get with Insightis</h2>
            <p className="ins-text-body-lg mt-4 max-w-xl mx-auto">
              The AI analytics workspace that turns raw data into clear decisions — instantly, accurately, and without SQL.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <StatStrip stats={stats} />
        </FadeUp>
      </div>
    </section>
  );
}

// ─── PRICING ───
function Pricing() {
  const traditional = [
    'Manual data aggregation required',
    'Complex SQL & Python scripts',
    'Days to set up new reports',
    'Siloed tools & fragmented views',
    'High ongoing engineering overhead',
  ];

  const insightis = [
    'Automated data unification',
    'Natural language — no SQL needed',
    'Instant reports, zero code',
    'Unified intelligence layer',
    '10× more cost-effective',
  ];


  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glow sits low, behind the cards. It used to be pinned to a 300px band at
          the top of the section, purely to keep it off the comparison cards --
          those were 8-10% translucent, so a wash reaching them bled through and
          tinted them rather than pooling behind. The glow cards now carry an
          opaque base (.ins-card--glow in design-system/components/card.css,
          following the platform pages' .mdc), so the wash can cover the section
          and the cards simply sit on top of it.

          Centre at 68% puts it over the card band rather than the heading. Since
          the cards are opaque, what reads is the light around and between them --
          they sit in the pool instead of being coloured by it. */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 30% 40% at 50% 68%, rgba(7,128,126,0.16) 0%, transparent 100%)' }}></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-14">
            <span className="ins-eyebrow ins-eyebrow--pill mb-5">Why Insightis</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[var(--ins-text-heading)] tracking-tight mb-4">Why teams switch to Insightis</h2>
            <p className="ins-text-body-lg max-w-2xl mx-auto">
              Instead of charging for every person in your company, Insightis ties cost to actual AI activity and the storage you need — so pricing stays fair, scalable, and aligned with value.
            </p>
          </div>
        </FadeUp>

        {/* Comparison cards */}
        <FadeUp delay={0.1}>
          <ComparisonCards
            before={{ label: 'Traditional Approach', subtitle: 'Manual, slow, expensive', items: traditional }}
            after={{ label: 'With Insightis', subtitle: 'Automated, instant, scalable', items: insightis }}
          />
        </FadeUp>


      </div>
    </section>
  );
}

// ─── SOLUTIONS ───
/* Sits where the pricing snapshot used to. Pricing still lives on /pricing (linked from
   the header and the bottom CTA), so nothing was lost by taking it off the home page —
   and the six solutions pages had no entry point above the footer.

   Markup and data both live outside this file now: src/components/SolutionsAccordion.jsx
   and src/data/solutions.js, because the same section also goes on all six solutions
   pages. Only the FadeUp wrapper is home-page-specific — the solutions pages have no
   fade-up machinery, which is why the component does not own it. */
function Solutions() {
  return (
    <FadeUp>
      {/* Same centred section glow as the page's other blocks (how-it-works etc.)
          — the accordion section shipped without one and read flat next to them. */}
      <SolutionsAccordion style={{background:'radial-gradient(ellipse 38% 42% at 50% 60%, rgba(7,128,126,0.20) 0%, transparent 100%)'}} />
    </FadeUp>
  );
}

// ─── FOOTER ───
// ─── BOTTOM CTA ───
function BottomCTASection() {
  return (
    <section className="pt-8 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          {/* FIRST OPTION restored for review — the big centered "buttons" version.
              To switch back to the compact one-line row, swap the block below for:
              <BottomCTA
                variant="row"
                title={<>Still waiting on <BottomCTA.Highlight>insights</BottomCTA.Highlight> that take <BottomCTA.Highlight>days?</BottomCTA.Highlight></>}
                ctaLabel="Start for free"
                trustNote="Free plan · No credit card · First answer in under 2 minutes"
              /> */}
          <BottomCTA
            variant="buttons"
            title={<>Ask your data <BottomCTA.Highlight>anything</BottomCTA.Highlight></>}
            description="Connect your stack and get a decision-ready answer in under two minutes — no SQL, no analyst queue. Free to start, no credit card required."
            ctaLabel="Start for free"
            secondaryCtaLabel="Explore Pricing"
            secondaryCtaHref="/pricing"
          />
        </FadeUp>
      </div>
    </section>
  );
}

// ─── APP ───
function App() {
  /* ins-bg-noise dithers the glows. The washes band into visible contour rings
     because the whole ramp is only ~23 levels wide: teal at 0.20 over the #0A0E13
     page composites to rgb(9,37,40), so green travels 14 -> 37 and blue 19 -> 40.
     That is one 8-bit step every ~20-30px, which the eye joins into arcs. A few
     levels of noise scatter each pixel across the step boundaries so the ramp
     reads continuous.

     It goes on the page wrapper below, not on <main>. The noise is white, so it
     lifts whatever it covers by ~2 levels on average. <Header> is a sticky sibling
     sitting ABOVE <main> in the layout, so scoping the noise to <main> lifted the
     page from <main>'s top edge down and left the header strip at the unlifted
     colour — a visible dark band under the navbar. On the wrapper, header, main
     and footer all get the same lift and there is no edge to see. */
  return (
    <div className="font-body ins-bg-noise">
      <Header />
      <main id="main-content">
        <header>
          <Hero />
        </header>
        <Architecture />
        <WhatIsInsightis />
        <HowItWorks />
        <Solutions />
        <Pricing />
        <BottomCTASection />
      </main>
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
