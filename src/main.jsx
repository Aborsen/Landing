import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './app.css'
import Header from './components/Header';
import Footer from './components/Footer';
import IntegrationsStrip from './components/IntegrationsStrip';
import Button from './components/Button';
import Card from './components/Card';
import BottomCTA from './components/BottomCTA';
import TestimonialCard from './components/TestimonialCard';
import CheckIcon from './components/CheckIcon';

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
function XIcon({ size = 16, color = "var(--ins-status-error-fg)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
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
    AWS: <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF9900"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.583.16-.863.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.024c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167 4.593 4.593 0 0 1 1.005-.36 4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.44.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .535-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.128 0 .2.064.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.264-.168.312a.549.549 0 0 1-.32.08h-.687c-.152 0-.256-.024-.32-.08-.063-.056-.12-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.248-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247a.456.456 0 0 1 .144.024c.048.016.12.048.2.08.27.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.336-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.176 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.694 0 .223.08.415.24.567.16.152.454.304.87.44l1.133.358c.574.184.99.44 1.237.767.248.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/><path d="M21.384 17.752a22.372 22.372 0 0 1-9.263 2.024c-4.31 0-8.189-1.373-11.12-3.66-.23-.192-.024-.455.256-.303 3.167 1.843 7.085 2.955 11.133 2.955 2.73 0 5.732-.567 8.494-1.748.415-.184.766.272.5.732z" fill="#FF9900"/></svg>,
    Google: <svg width={size} height={size} viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
    Slack: <svg width={size} height={size} viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/><path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/><path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 0 1-2.52 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.52 2.522v6.312z" fill="#2EB67D"/><path d="M15.165 18.956a2.528 2.528 0 0 1 2.52 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.521-2.522v-2.522h2.521zm0-1.271a2.527 2.527 0 0 1-2.521-2.52 2.527 2.527 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.52h-6.313z" fill="#ECB22E"/></svg>,
    Salesforce: <svg width={size} height={size} viewBox="0 0 24 24" fill="#00A1E0"><path d="M10.006 5.16a4.182 4.182 0 0 1 3.16-1.456 4.2 4.2 0 0 1 3.924 2.712 5.073 5.073 0 0 1 1.728-.303 5.09 5.09 0 0 1 5.09 5.09 5.09 5.09 0 0 1-5.09 5.089h-.218a3.927 3.927 0 0 1-3.52 2.187 3.908 3.908 0 0 1-1.924-.504A4.476 4.476 0 0 1 9.038 20.5a4.455 4.455 0 0 1-1.136-.147 3.635 3.635 0 0 1-3.298 2.126A3.644 3.644 0 0 1 .96 18.835c0-.97.385-1.85 1.01-2.497a4.4 4.4 0 0 1-.409-1.858A4.426 4.426 0 0 1 4.62 10.1a4.4 4.4 0 0 1 1.374.219A4.69 4.69 0 0 1 10.006 5.16z"/></svg>,
    Stripe: <svg width={size} height={size} viewBox="0 0 24 24" fill="#635BFF"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.918 3.757 7.093c0 3.774 2.268 5.335 5.984 6.765 2.374.913 3.128 1.607 3.128 2.617 0 .936-.794 1.543-2.189 1.543-1.869 0-4.932-1.005-6.913-2.263l-.93 5.56C4.487 22.419 7.322 24 11.405 24c2.633 0 4.752-.655 6.282-1.894 1.678-1.349 2.543-3.354 2.543-5.815 0-3.884-2.363-5.462-6.254-7.141z"/></svg>,
    PostgreSQL: <svg width={size} height={size} viewBox="0 0 24 24" fill="#336791"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.825 2.865.356 4.471.476 6.636c.035.636.182 1.32.337 2.022.327 1.49.791 3.1 1.357 4.416.283.66.612 1.263 1.025 1.745.206.242.468.472.793.637.324.165.724.25 1.1.177.748-.146 1.202-.727 1.541-1.321.164-.288.302-.6.424-.912l.014.007c.76.366 1.628.474 2.469.36.14-.019.278-.046.413-.08l-.006.082c-.065.877-.036 1.755.09 2.63.202 1.388.632 2.86 1.756 3.876.052.047.108.085.163.126a1.966 1.966 0 0 0-.093.252c-.16.538-.125 1.08.215 1.528.34.448.876.648 1.39.685.516.037 1.07-.036 1.608-.169a5.867 5.867 0 0 0 1.55-.66c.509-.306.966-.712 1.196-1.265.142-.342.172-.711.065-1.073l-.002-.008c.314-.194.584-.424.822-.673.613-.642.975-1.422 1.197-2.2.439-1.538.464-3.19.453-4.26a.317.317 0 0 0 0-.032c.03-.019.06-.037.09-.057.475-.31.874-.734 1.167-1.235.518-.886.785-1.96.838-3.07.053-1.11-.1-2.28-.462-3.265a6.355 6.355 0 0 0-1.2-2.064C19.865.633 18.701.134 17.376.015 17.293.008 17.21.003 17.128 0z"/></svg>,
    BigQuery: <svg width={size} height={size} viewBox="0 0 24 24"><path d="M6.22 13.84l-3.76 3.76a10.48 10.48 0 0 0 7.23 4.15l2.72-4.58a5.93 5.93 0 0 1-6.19-3.33z" fill="#4285F4"/><path d="M21.73 10.49a10.46 10.46 0 0 0-3.31-6.03L14.6 8.28a5.93 5.93 0 0 1 2.23 5.71h4.91c.09-.49.09-.99-.01-3.5z" fill="#4285F4"/><path d="M12 17.91a5.91 5.91 0 0 1-5.59-3.93L2.46 17.6A10.49 10.49 0 0 0 12 22.44c1.67 0 3.27-.4 4.71-1.13l-3.82-3.82a5.9 5.9 0 0 1-.89.42z" fill="#4285F4"/><circle cx="12" cy="12" r="3.45" fill="#4285F4"/><path d="M12 1.56A10.49 10.49 0 0 0 2.46 6.4l3.82 3.82A5.91 5.91 0 0 1 12 6.09a5.87 5.87 0 0 1 2.73.68l3.69-3.69A10.45 10.45 0 0 0 12 1.56z" fill="#4285F4"/></svg>,
    Snowflake: <svg width={size} height={size} viewBox="0 0 24 24" fill="#29B5E8"><path d="M12.394 23.4a1.963 1.963 0 0 1-.979-.263L7.7 20.96a.492.492 0 0 1 .488-.854l3.715 2.177a.982.982 0 0 0 .982 0l3.715-2.177a.492.492 0 0 1 .488.854l-3.715 2.177a1.963 1.963 0 0 1-.979.263zM5.51 19.384a.492.492 0 0 1-.492-.492v-4.343a.492.492 0 0 1 .984 0v4.343a.492.492 0 0 1-.492.492zm12.768 0a.492.492 0 0 1-.492-.492v-4.343a.492.492 0 0 1 .984 0v4.343a.492.492 0 0 1-.492.492zm-6.384-3.684a1.963 1.963 0 0 1-.979-.263l-3.715-2.177a1.963 1.963 0 0 1-.979-1.7V7.2c0-.702.373-1.35.979-1.7L10.915 3.32a1.963 1.963 0 0 1 1.958 0l3.715 2.18c.606.35.979.998.979 1.7v4.36c0 .702-.373 1.35-.979 1.7l-3.715 2.177a1.963 1.963 0 0 1-.979.263zm0-14.16a.982.982 0 0 0-.49.132L7.69 3.852a.982.982 0 0 0-.49.85v4.36c0 .35.187.675.49.85l3.715 2.18a.982.982 0 0 0 .982 0l3.715-2.18a.982.982 0 0 0 .49-.85V4.7a.982.982 0 0 0-.49-.85L12.384 1.672a.982.982 0 0 0-.49-.132zM2.836 8.784a.492.492 0 0 1-.243-.065L.736 7.592a.492.492 0 0 1 .488-.854l1.857 1.127a.492.492 0 0 1-.245.919zm18.116 0a.492.492 0 0 1-.245-.919l1.857-1.127a.492.492 0 0 1 .488.854l-1.857 1.127a.492.492 0 0 1-.243.065z"/></svg>,
    Redshift: <svg width={size} height={size} viewBox="0 0 24 24" fill="#8C4FFF"><path d="M1.463 8.586L12 14.12l10.537-5.534L12 3.051 1.463 8.586zm10.025 6.586L1.463 9.894v5.534L11.488 20.95v-5.778zm1.024 0v5.778l10.025-5.522V9.894l-10.025 5.278z"/></svg>,
  };
  return icons[name] || <svg width={size} height={size} viewBox="0 0 24 24" fill="var(--ins-color-teal-600)"><rect width="24" height="24" rx="4"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="500">{name[0]}</text></svg>;
}

const connectorColors = {
  HubSpot: '#FF7A59', AWS: '#FF9900', Google: '#4285F4', Slack: '#4A154B',
  Salesforce: '#00A1E0', Stripe: '#635BFF', PostgreSQL: '#336791',
  BigQuery: '#4285F4', Snowflake: '#29B5E8', Redshift: '#8C4FFF',
};

function ConnectorPill({ name, small = false }) {
  return (
    <div className={`flex items-center gap-2 ${small ? 'px-3 py-1.5' : 'px-4 py-2'} bg-[var(--ins-surface-card)] border border-[var(--ins-border-default)] rounded-full flex-shrink-0 hover:border-[var(--ins-border-hover)] transition-colors`}>
      <div className={`${small ? 'w-5 h-5' : 'w-6 h-6'} flex items-center justify-center`}>
        <ConnectorIcon name={name} size={small ? 16 : 18} />
      </div>
      <span className={`${small ? 'text-xs' : 'text-sm'} text-[var(--ins-text-inactive)] font-medium whitespace-nowrap`}>{name}</span>
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

  const integrations = ['HubSpot', 'AWS', 'Google', 'Slack', 'Salesforce', 'Stripe', 'PostgreSQL', 'BigQuery', 'Snowflake', 'Redshift'];

  const TooltipPopup = () => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-[var(--ins-color-gray-800)] border border-[var(--ins-border-hover)] rounded-xl p-4 z-[100]" onClick={e => e.stopPropagation()} style={{ boxShadow: 'none' }}>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[var(--ins-color-gray-800)] border-l border-t border-[var(--ins-border-hover)] rotate-45 mb-[-5px]"></div>
      <p className="text-[var(--ins-text-heading)] text-sm font-medium mb-1">Unlock full access</p>
      <p className="text-[var(--ins-text-inactive)] text-xs mb-3">Get more after registration — connect your data sources and explore AI insights.</p>
      <Button as="a" href="/auth/sign-up/" variant="primary" size="sm">Sign Up Free</Button>
    </div>
  );

  return (
    <>
    <section className="relative flex flex-col items-center justify-center overflow-hidden" style={{minHeight: 'min(100vh, 900px)', paddingTop: '80px', paddingBottom: '40px'}}>
      {/* Purple radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(7,128,126,0.08) 0%, transparent 70%)' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Headline */}
        <FadeUp delay={0.1}>
          <h1 className="text-center mb-6" style={{fontSize:'clamp(2.2rem,3.2vw,3.6rem)',fontWeight:700,fontFamily:'var(--ins-font-family-sans)',letterSpacing:'-.04em',lineHeight:1.1,textWrap:'balance'}}>
            <span style={{display:'block'}} className="text-[var(--ins-text-heading)]">Your data knows the answer</span>
            <span style={{display:'block',color:'var(--ins-text-highlight)'}}>Now you can ask it</span>
          </h1>
        </FadeUp>

        {/* Description */}
        <FadeUp delay={0.17}>
          <p className="ins-text-body-lg max-w-2xl mx-auto mb-3" style={{color:'var(--ins-text-body)'}}>
            Insightis connects your real data and delivers answers <span style={{color:'var(--ins-text-highlight)', fontWeight:500}}>3× more accurate</span> than spreadsheets.
          </p>
          <p className="text-sm max-w-2xl mx-auto mb-8" style={{color:'var(--ins-text-inactive)'}}>
            Powered by your <span style={{color:'var(--ins-text-body)'}}>semantic layer</span> — a unified dictionary of every metric, dimension, and join in your data.
          </p>
        </FadeUp>
        {/* Chat Mockup */}
        <FadeUp delay={0.2}>
          <div className="max-w-[720px] mx-auto mb-8">
            <div className="bg-[var(--ins-surface-card)]/80 backdrop-blur-xl border border-[var(--ins-border-default)] rounded-2xl" style={{ boxShadow: 'none' }}>

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
                      className="flex-1 bg-transparent text-[var(--ins-text-heading)] text-base outline-none placeholder-[var(--ins-text-inactive)] resize-none h-[160px]"
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && userText.trim()) { e.preventDefault(); window.location.href = '#pricing'; } }}
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

                  {/* Attach button */}
                  <div className="relative">
                    <button
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150"
                      style={{ color: tooltip === 'attach' ? 'var(--ins-text-highlight)' : 'var(--ins-text-inactive)', background: tooltip === 'attach' ? 'var(--ins-surface-brand-tint)' : 'transparent' }}
                      onClick={e => { e.stopPropagation(); setTooltip(tooltip === 'attach' ? null : 'attach'); }}
                      aria-label="Attach file"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                    </button>
                    {tooltip === 'attach' && (
                      <div className="absolute bottom-full left-0 mb-2 w-48 bg-[var(--ins-surface-card)] border border-[var(--ins-border-hover)] rounded-2xl p-3 shadow-2xl z-[100]" onClick={e => e.stopPropagation()}>
                        {[
                          { label: 'CSV / Excel', ext: 'CSV' },
                          { label: 'PDF Document', ext: 'PDF' },
                          { label: 'JSON / XML', ext: 'JSON' },
                          { label: 'Image', ext: 'IMG' },
                        ].map(f => (
                          <div key={f.label} className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors" onClick={() => { setTooltip(null); setIsActive(true); setTimeout(() => inputRef.current && inputRef.current.focus(), 50); }}>
                            <div className="w-9 h-9 rounded-xl bg-[var(--ins-border-default)] border border-[var(--ins-border-hover)] flex items-center justify-center flex-shrink-0">
                              <svg width="18" height="20" viewBox="0 0 18 20" fill="none" style={{color:'var(--ins-text-disabled)'}}><path d="M11 1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7L11 1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 1v6h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <span className="text-xs text-[var(--ins-text-inactive)]">{f.label}</span>
                          </div>
                        ))}
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
                          <p className="text-[10px] font-medium text-[var(--ins-text-inactive)] uppercase tracking-wider px-1 mb-2">Not configured</p>
                          {[
                            { name: 'PostgreSQL' },
                            { name: 'SQL Server' },
                            { name: 'Shopify' },
                            { name: 'NetSuite' },
                            { name: 'Facebook Ads' },
                            { name: 'Dynamics 365' },
                            { name: 'Quickbooks' },
                            { name: 'Zoho CRM' },
                            { name: 'HubSpot' },
                            { name: 'Google BigQuery' },
                          ].map(c => (
                            <div key={c.name} className="flex items-center justify-between px-2 py-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                              <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded-md bg-[var(--ins-border-default)] border border-[var(--ins-border-hover)] flex items-center justify-center flex-shrink-0">
                                  <ConnectorIcon name={c.name} size={14} />
                                </div>
                                <span className="text-sm text-[var(--ins-text-inactive)] group-hover:text-[var(--ins-text-heading)] transition-colors">{c.name}</span>
                              </div>
                              <div className="w-9 h-5 rounded-full flex-shrink-0" style={{ background: 'var(--ins-border-default)', border: '1px solid var(--ins-border-hover)', position: 'relative' }}>
                                <div className="w-3.5 h-3.5 rounded-full bg-[var(--ins-border-hover)] absolute top-[2px] left-[2px]"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-t border-[var(--ins-border-hover)]">
                          <a href="#pricing" className="flex items-center gap-1.5 text-xs text-[var(--ins-color-teal-500)] hover:text-[var(--ins-color-teal-400)] transition-colors">
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                            View all 200+ connectors
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Model selector */}
                  <div className="relative">
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-150 hover:bg-white/5"
                      style={{ color: tooltip === 'model' ? 'var(--ins-text-highlight)' : 'var(--ins-text-body)', background: tooltip === 'model' ? 'var(--ins-surface-brand-tint)' : 'transparent' }}
                      onClick={e => { e.stopPropagation(); setTooltip(tooltip === 'model' ? null : 'model'); }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                      <span className="text-sm font-medium">Gemini Pro</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                    {tooltip === 'model' && (
                      <div className="absolute bottom-full left-0 mb-2 w-60 bg-[var(--ins-surface-card)] border border-[var(--ins-border-hover)] rounded-2xl shadow-2xl z-[100] overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-3">
                          <p className="text-[10px] font-medium text-[var(--ins-text-inactive)] uppercase tracking-wider px-1 mb-2">Select model</p>
                          {[
                            { name: 'Gemini Pro', tag: 'Google', active: true },
                            { name: 'GPT-4o', tag: 'OpenAI', active: false },
                            { name: 'Claude 3.5 Sonnet', tag: 'Anthropic', active: false },
                            { name: 'Llama 3.3', tag: 'Meta', active: false },
                          ].map(m => (
                            <div key={m.name}
                              className="flex items-center justify-between px-2 py-2.5 rounded-xl cursor-pointer transition-colors hover:bg-white/5"
                              onClick={() => setTooltip(null)}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded-md bg-[var(--ins-border-default)] border border-[var(--ins-border-hover)] flex items-center justify-center flex-shrink-0">
                                  <div className="w-2 h-2 rounded-full" style={{ background: m.active ? 'var(--ins-color-teal-500)' : 'var(--ins-border-hover)' }}></div>
                                </div>
                                <div>
                                  <span className="text-sm block" style={{ color: m.active ? 'white' : 'var(--ins-text-inactive)' }}>{m.name}</span>
                                  <span className="text-[10px] text-[var(--ins-text-inactive)]">{m.tag}</span>
                                </div>
                              </div>
                              <div className="w-9 h-5 rounded-full relative flex-shrink-0 transition-all"
                                style={{ background: m.active ? 'var(--ins-color-teal-500)' : 'var(--ins-border-default)', border: `1px solid ${m.active ? 'var(--ins-color-teal-500)' : 'var(--ins-border-hover)'}` }}>
                                <div className="w-3.5 h-3.5 rounded-full bg-white absolute top-[2px] transition-all"
                                  style={{ left: m.active ? 'calc(100% - 18px)' : '2px' }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Send button — grey when empty, teal when has text */}
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-[var(--ins-text-heading)] text-sm font-medium transition-all duration-200"
                  style={{
                    background: userText.trim() ? 'linear-gradient(135deg, var(--ins-color-teal-500), var(--ins-color-teal-600))' : 'rgba(255,255,255,0.08)',
                    boxShadow: userText.trim() ? '0 0 16px rgba(7,128,126,0.35)' : 'none',
                    cursor: userText.trim() ? 'pointer' : 'default',
                    color: userText.trim() ? 'white' : 'var(--ins-text-inactive)'
                  }}
                  onClick={() => { if (userText.trim()) window.location.href = '#pricing'; }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  Send
                </button>

              </div>
            </div>
          </div>
        </FadeUp>

        {/* Trust line — restructured as 3-pill strip per ISS-39 for fast scanning */}
        <FadeUp delay={0.3}>
          <div className="text-xs text-[var(--ins-text-inactive)] flex items-center justify-center gap-3 flex-wrap">
            <span className="flex items-center gap-2">
              <CheckIcon size={14} color="var(--ins-text-highlight)" />
              Built by <span className="text-[var(--ins-text-body)]">Devart</span>
            </span>
            <span aria-hidden="true" className="text-[var(--ins-text-disabled)] text-lg leading-none">·</span>
            <span><span className="text-[var(--ins-text-body)]">40,000+</span> companies</span>
            <span aria-hidden="true" className="text-[var(--ins-text-disabled)] text-lg leading-none">·</span>
            <span><span className="text-[var(--ins-text-body)]">28&nbsp;yrs</span> of data tooling</span>
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
              border: `1px solid ${isLit ? 'rgba(9,160,157,0.5)' : 'var(--ins-border-default)'}`,
              background: isLit ? 'rgba(7,128,126,0.08)' : 'var(--ins-surface-card)',
              boxShadow: isLit ? '0 0 16px rgba(9,160,157,0.15), inset 0 0 20px rgba(9,160,157,0.05)' : 'none',
              transition: 'all 0.2s ease',
            }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'rgba(7,128,126,0.15)', border: '1px solid rgba(7,128,126,0.3)'}}>{o.icon}</div>
              <div>
                <p className="text-sm font-medium text-[var(--ins-text-heading)]">{o.title}</p>
                <p className="text-xs text-[var(--ins-text-inactive)]">{o.desc}</p>
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
    { name: 'BigQuery', color: '#4285F4' },
    { name: 'Redshift', color: '#8C4FFF' },
    { name: 'HubSpot', color: '#FF7A59' },
    { name: 'Salesforce', color: '#00A1E0' },
    { name: 'AWS', color: '#FF9900' },
    { name: 'Google', color: '#4285F4' },
    { name: 'Slack', color: '#4A154B' },
    { name: 'Stripe', color: '#635BFF' },
  ];

  // Chaotic swarm — scattered to fill full area matching right panel
  const chaosSwarm = [
    { name: 'PostgreSQL', top: '2%',  left: '22%', rotate: 0, opacity: 0.9 },
    { name: 'Snowflake', top: '5%',  left: '72%', rotate: 0, opacity: 0.85 },
    { name: 'Slack',     top: '35%', left: '0%',  rotate: 0, opacity: 0.9 },
    { name: 'BigQuery',  top: '40%', left: '50%', rotate: 0, opacity: 0.85 },
    { name: 'HubSpot',   top: '80%', left: '18%', rotate: 0, opacity: 0.9 },
    { name: 'AWS',       top: '82%', left: '70%', rotate: 0, opacity: 0.85 },
  ];
  // Icon centers mapped to viewBox 0 0 100 100 (left% + ~7, top% + ~8)
  // PostgreSQL: (29,10), Snowflake: (79,13), Slack: (7,43), BigQuery: (57,48), HubSpot: (25,88), AWS: (77,90)
  const chaosLines = [
    { d: 'M29,10 L79,13' },        // PostgreSQL → Snowflake
    { d: 'M29,10 L7,43' },         // PostgreSQL → Slack
    { d: 'M29,10 L57,48' },        // PostgreSQL → BigQuery
    { d: 'M79,13 L57,48' },        // Snowflake → BigQuery
    { d: 'M79,13 L77,90' },        // Snowflake → AWS
    { d: 'M7,43 L57,48' },         // Slack → BigQuery
    { d: 'M7,43 L25,88' },         // Slack → HubSpot
    { d: 'M57,48 L25,88' },        // BigQuery → HubSpot
    { d: 'M57,48 L77,90' },        // BigQuery → AWS
    { d: 'M25,88 L77,90' },        // HubSpot → AWS
    // Lines from icons to right edge (connecting to wire stream)
    { d: 'M29,10 Q65,25 100,48' },   // PostgreSQL → right
    { d: 'M79,13 Q90,30 100,46' },   // Snowflake → right
    { d: 'M7,43 Q50,44 100,50' },    // Slack → right
    { d: 'M57,48 Q78,49 100,50' },   // BigQuery → right
    { d: 'M25,88 Q65,72 100,52' },   // HubSpot → right
    { d: 'M77,90 Q90,70 100,54' },   // AWS → right
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
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(7,128,126,0.06) 0%, transparent 70%)' }}></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-16 arch-heading">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{background: 'rgba(7,128,126,0.1)', border: '1px solid rgba(7,128,126,0.4)'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[var(--ins-text-highlight)]"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--ins-text-highlight)]">Architecture</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-[var(--ins-text-heading)] mb-4 tracking-tight">The semantic intelligence layer</h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto">
              Bring all your data sources into a single AI-ready layer, turning fragmented systems into a trusted semantic foundation that delivers consistent meaning, and business clarity across your organization.
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
                  <ConnectorIcon name={item.name} size={30} />
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
                <GridIcon size={36} color="var(--ins-color-teal-500)" />
                <span className="text-[13px] font-medium text-[var(--ins-color-teal-500)] text-center leading-tight">Insightis<br/>Semantic AI</span>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-text-muted mt-2">AI Engine</span>
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
                { name: 'PostgreSQL', top: '38%', left: '-2%' },
                { name: 'BigQuery',   top: '38%', left: '74%' },
                { name: 'HubSpot',    top: '70%', left: '16%' },
                { name: 'AWS',        top: '70%', left: '58%' },
              ];
              // Dashed-line connection paths between approximate icon centers (viewBox 0 0 100 100).
              const mobileLines = [
                'M14,12 L74,12',          // Slack → Snowflake
                'M14,12 L4,46',           // Slack → PostgreSQL
                'M14,12 L24,78',          // Slack → HubSpot
                'M74,12 L80,46',          // Snowflake → BigQuery
                'M74,12 L66,78',          // Snowflake → AWS
                'M4,46 L80,46',           // PostgreSQL → BigQuery
                'M4,46 L24,78',           // PostgreSQL → HubSpot
                'M80,46 L66,78',          // BigQuery → AWS
                'M24,78 L66,78',          // HubSpot → AWS
                'M4,46 L66,78',           // PostgreSQL → AWS (diagonal)
                'M80,46 L24,78',          // BigQuery → HubSpot (diagonal)
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
                      <ConnectorIcon name={item.name} size={20} />
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
              <GridIcon size={28} color="var(--ins-color-teal-500)" />
              <span className="text-[11px] font-medium text-[var(--ins-color-teal-500)] text-center leading-tight">Insightis<br/>Semantic AI</span>
            </div>

            <div className="w-px h-8 bg-gradient-to-b from-[var(--ins-color-teal-600)]/40 via-[var(--ins-color-teal-600)]/40 to-transparent"></div>

            <div className="grid grid-cols-1 gap-3 w-full">
              {outputs.map(o => (
                <div key={o.title} className="flex items-center gap-3 px-4 py-3 bg-[var(--ins-surface-card)] border border-[var(--ins-border-default)] rounded-card">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'rgba(7,128,126,0.15)', border: '1px solid rgba(7,128,126,0.3)'}}>{o.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-[var(--ins-text-heading)]">{o.title}</p>
                    <p className="text-xs text-[var(--ins-text-inactive)]">{o.desc}</p>
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
    { n: '01', title: 'Connect your data', desc: 'OAuth or API key. Most connectors live in under 5 minutes — read-only and SOC 2 secured.' },
    { n: '02', title: 'Configure the semantic layer', desc: 'Map your fields to certified metrics — MRR, CAC, NRR, WAU. One trusted truth across every source.' },
    { n: '03', title: 'Ask in plain English', desc: 'Your team asks questions. Insightis queries the right sources and returns precise answers in seconds.' },
    { n: '04', title: 'Get instant insights', desc: 'Charts, contributing factors, and follow-up suggestions — saved as live reports in one click.' },
    { n: '05', title: 'Share with your team', desc: 'Publish answers to Slack, dashboards, or Teams. Every figure stays linked to its source.' },
  ];
  return (
    <section id="how-it-works" style={{padding:'100px 0', background:'linear-gradient(180deg,var(--ins-color-gray-900) 0%,var(--ins-color-gray-900) 100%)', position:'relative'}}>
      {/* Mobile / reduced-motion text-only summary — hidden on desktop via responsive.css */}
      <div className="how-it-works-text-only" style={{display:'none', maxWidth:'720px', margin:'0 auto', padding:'0 24px'}}>
        <div style={{textAlign:'center', marginBottom:'40px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:5,padding:'4px 12px',background:'var(--ins-surface-brand-tint)',border:'1px solid var(--ins-border-brand)',borderRadius:'999px',marginBottom:'14px'}}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{color:'var(--ins-text-highlight)'}}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            <span style={{fontSize:'10px',fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ins-text-highlight)',fontFamily:'var(--ins-font-family-mono)'}}>How it works</span>
          </div>
          <h2 style={{fontSize:'clamp(1.8rem,6vw,2.4rem)',fontWeight:500,color:'var(--ins-text-heading)',letterSpacing:'-.02em',lineHeight:1.15}}>From your stack to a precise answer</h2>
        </div>
        <ol style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:'18px'}}>
          {steps.map(s => (
            <li key={s.n} style={{display:'flex',gap:'14px',alignItems:'flex-start'}}>
              <span style={{flexShrink:0,width:'36px',height:'36px',borderRadius:'50%',border:'1px solid var(--ins-border-brand)',background:'var(--ins-surface-brand-tint)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--ins-font-family-mono)',fontSize:'13px',fontWeight:500,color:'var(--ins-text-highlight)'}}>{s.n}</span>
              <div>
                <p style={{fontSize:'15px',fontWeight:600,color:'var(--ins-text-heading)',marginBottom:'4px',lineHeight:1.3}}>{s.title}</p>
                <p style={{fontSize:'13.5px',color:'var(--ins-text-body)',lineHeight:1.55}}>{s.desc}</p>
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


// ─── TESTIMONIALS ───
function Testimonials() {
  const testimonials = [
    { quote: "Insightis transformed how we make decisions. The AI insights are incredibly accurate — we now move 3x faster on strategic calls.", name: "Sarah Chen", role: "VP of Analytics · Meridian Health", initials: "SC", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { quote: "We cut analysis time by 80%. Natural language queries make complex data accessible to every team member, not just data scientists.", name: "Michael Torres", role: "CTO · Arcline Logistics", initials: "MT", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { quote: "Automated insights caught revenue trends we'd have missed for months. It's like having a senior data scientist available around the clock.", name: "Emily Watson", role: "CEO · Brightpath Ventures", initials: "EW", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
    { quote: "Setup integrations took under an hour. ROI was immediate — we found a $200K cost saving in the first week alone.", name: "James Park", role: "Head of Finance · Crestview Capital", initials: "JP", avatar: "https://randomuser.me/api/portraits/men/77.jpg" },
    { quote: "Our marketing team loves natural language queries. They pull data without filing tickets to engineering every single day.", name: "Priya Sharma", role: "CMO · Vantage Media Group", initials: "PS", avatar: "https://randomuser.me/api/portraits/women/26.jpg" },
    { quote: "Enterprise-grade security with startup speed. Passed our SOC 2 audit with zero issues. The compliance tooling alone is worth it.", name: "David Kim", role: "CISO · Ledgerpoint Financial", initials: "DK", avatar: "https://randomuser.me/api/portraits/men/53.jpg" },
  ];

  const stats = [
    { value: "10x", label: "Faster Insights", sub: "vs. traditional BI tools" },
    { value: "80%", label: "Time Saved", sub: "on data analysis tasks" },
    { value: "1,200+", label: "Companies", sub: "across 60+ countries" },
    { value: "99.9%", label: "Uptime SLA", sub: "enterprise-grade reliability" },
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{background: 'rgba(7,128,126,0.1)', border: '1px solid rgba(7,128,126,0.4)'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[var(--ins-text-highlight)]"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--ins-text-highlight)]">Verified Impact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-[var(--ins-text-heading)] tracking-tight">Loved by a community</h2>
          </div>
        </FadeUp>

        {/* 3x2 static card grid */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {testimonials.map((t, i) => (
              <TestimonialCard
                key={i}
                quote={t.quote}
                name={t.name}
                role={t.role}
                avatar={t.avatar}
                initials={t.initials}
                showStars
              />
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

// ─── WHAT IS INSIGHTIS ───
function AnimatedStat({ target, suffix, prefix, duration = 1800 }) {
  // Initialize at target so SSR + initial hydration render the REAL number
  // (ISS-02). The count-up animation is purely enhancement: it kicks in only
  // for below-the-fold elements that scroll into view AFTER mount. Above-fold
  // elements render their final value immediately — no "0x / 0% / 0+" flash.
  const [count, setCount] = React.useState(target);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // If element is already in view at hydration time, skip the animation —
    // the visitor would see a flash from target → 0 → target otherwise.
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    setCount(0); // armed for animation; below the fold, never rendered until scrolled to
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-US')}{suffix}
    </span>
  );
}

function WhatIsInsightis() {
  const stats = [
    { target: 10,   suffix: "x",  prefix: "",  label: "Faster Insights",  sub: "vs. traditional BI tools" },
    { target: 80,   suffix: "%",  prefix: "",  label: "Time Saved",        sub: "on data analysis tasks" },
    { target: 1200, suffix: "+",  prefix: "",  label: "Companies",         sub: "across 60+ countries" },
    { target: 99,   suffix: ".9%",prefix: "",  label: "Uptime SLA",        sub: "enterprise-grade reliability" },
  ];

  return (
    <section className="py-24 relative" style={{ background: 'linear-gradient(180deg, var(--ins-color-gray-900) 0%, var(--ins-color-promo-solid) 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{background: 'rgba(7,128,126,0.1)', border: '1px solid rgba(7,128,126,0.4)'}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-[var(--ins-text-highlight)]"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
              <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--ins-text-highlight)]">By the numbers</span>
            </div>
            <h2 className="text-4xl md:text-[48px] font-medium text-[var(--ins-text-heading)] tracking-tight leading-[1.1]">What is Insightis</h2>
            <p className="text-base mt-4 max-w-xl mx-auto" style={{color:'var(--ins-text-body)'}}>
              The AI analytics workspace that turns raw data into clear decisions — instantly, accurately, and without SQL.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-[var(--ins-surface-card)] border border-[var(--ins-border-default)] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[var(--ins-border-default)]">
              {stats.map((s, i) => (
                <div key={i} className="text-center px-4">
                  <p className="text-4xl md:text-5xl font-bold text-[var(--ins-color-teal-400)] tracking-tight leading-none mb-3">
                    <AnimatedStat target={s.target} suffix={s.suffix} prefix={s.prefix} duration={1800 + i * 150} />
                  </p>
                  <p className="text-sm font-medium text-[var(--ins-text-heading)] mb-1">{s.label}</p>
                  <p className="text-xs text-[var(--ins-text-inactive)]">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
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
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[var(--ins-text-heading)] tracking-tight mb-4">Why teams switch to Insightis</h2>
            <p className="text-base max-w-2xl mx-auto" style={{color:'var(--ins-text-body)'}}>
              Instead of charging for every person in your company, Insightis ties cost to actual AI activity and the storage you need — so pricing stays fair, scalable, and aligned with value.
            </p>
          </div>
        </FadeUp>

        {/* Comparison cards */}
        <FadeUp delay={0.1}>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Traditional / Red — Glow card pattern (ISS-40 + ISS-66 + ISS-96) */}
            <Card variant="glow" className="ins-card--glow--error p-6 md:p-7">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)'}}>
                  <XIcon size={18} color="var(--ins-status-error-fg)" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-[var(--ins-text-heading)]">Traditional Approach</h3>
                  <p className="text-xs text-[var(--ins-text-body)]">Manual, slow, expensive</p>
                </div>
              </div>
              <ul className="flex flex-col gap-4">
                {traditional.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[var(--ins-text-body)]">
                    <XIcon size={14} color="var(--ins-status-error-fg)" className="flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Insightis / Teal — Glow card pattern (ISS-40 + ISS-66 + ISS-96) */}
            <Card variant="glow" className="ins-card--glow--brand p-6 md:p-7">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background: 'rgba(14,196,193,0.15)', border: '1px solid rgba(14,196,193,0.30)'}}>
                  <CheckIcon size={18} color="var(--ins-color-teal-400)" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-[var(--ins-text-heading)]">With Insightis</h3>
                  <p className="text-xs text-[var(--ins-text-body)]">Automated, instant, scalable</p>
                </div>
              </div>
              <ul className="flex flex-col gap-4">
                {insightis.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[var(--ins-text-body)]">
                    <CheckIcon size={14} color="var(--ins-color-teal-400)" className="flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </FadeUp>


        <FadeUp delay={0.25}>
          <div className="text-center mt-10">
            <a href="/Pricing" className="ins-btn ins-btn--secondary ins-btn--lg">
              Explore Pricing
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── FOOTER ───
// ─── SUBSCRIBE BANNER ───
function SubscribeBanner() {
  return (
    <section className="pt-16 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="relative rounded-2xl py-10 px-8 md:px-16 text-center overflow-hidden" style={{ border: '1px solid rgba(7,128,126,0.3)', background: 'linear-gradient(135deg, rgba(7,128,126,0.12) 0%, rgba(13,13,26,0.9) 40%, rgba(10,18,32,0.85) 70%, rgba(7,128,126,0.08) 100%)', boxShadow: 'none' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[var(--ins-color-teal-600)]/60 to-transparent"></div>
            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[var(--ins-color-teal-600)]/10 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-[var(--ins-text-heading)] mb-3 tracking-tight leading-tight">
                Start making smarter decisions <span className="text-[var(--ins-text-highlight)]">today</span>
              </h2>
              <p className="text-sm md:text-base mb-7 max-w-lg mx-auto leading-relaxed" style={{color:'var(--ins-text-body)'}}>
                Join 1,200+ data-driven teams. Set up in minutes, no credit card required, and cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button as="a" href="/auth/sign-up/" variant="primary" size="lg">Start Free Trial</Button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}


// ─── BOTTOM CTA ───
function BottomCTASection() {
  return (
    <section className="pt-8 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <BottomCTA
            variant="form"
            title={<>Still waiting on <BottomCTA.Highlight>insights</BottomCTA.Highlight> that take <BottomCTA.Highlight>days?</BottomCTA.Highlight></>}
            inputPlaceholder="Show me MRR by region last quarter"
            inputAriaLabel="Ask a question"
            ctaLabel="Get insights"
          />
        </FadeUp>
      </div>
    </section>
  );
}

// ─── APP ───
function App() {
  return (
    <div className="font-body">
      <Header />
      <main id="main-content">
        <header>
          <Hero />
        </header>
        <Architecture />
        <HowItWorks />
        <SubscribeBanner />
        <Testimonials />
        <WhatIsInsightis />
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
