import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import './app.css'

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
function CheckIcon({ size = 20, color = "var(--ins-color-teal-600)", className = "" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>;
}
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
function MenuIcon({ size = 24, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
}
function CloseIcon({ size = 24, color = "#fff" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
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
function SearchIcon({ size = 16, color = "#7878A8" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function LayersIcon({ size = 16, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
}
function ShieldCheckIcon({ size = 16, color = "var(--ins-color-teal-600)" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>;
}

// Social icons
function TwitterXIcon({ size = 16, color = "#A0A0B8" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function LinkedInIcon({ size = 16, color = "#A0A0B8" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
function InstagramIcon({ size = 16, color = "#A0A0B8" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
}
function YouTubeIcon({ size = 16, color = "#A0A0B8" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
}
function TikTokIcon({ size = 16, color = "#A0A0B8" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 005.58 2.17v-3.4a4.85 4.85 0 01-1-.16l.01-.02V6.69h.99z"/></svg>;
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
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setActiveDropdown(null);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const NAV_ICONS = {
    chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8 11h.01 M12 11h.01 M16 11h.01',
    link: 'M12 22v-5 M9 8V2 M15 8V2 M18 8H6a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3z',
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 18v-4 M12 18v-2 M16 18v-6',
    bars: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z M2 12l8.58 3.91a2 2 0 0 0 1.66 0L21 12 M2 17l8.58 3.91a2 2 0 0 0 1.66 0L21 17',
    box: 'M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z M12 3v9 M20 7.5l-8 4.5 M4 7.5l8 4.5',
    dollar: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
    star: 'M2 20H22 M5 20L7 12L12 17L17 12L19 20H5Z',
    pulse: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    settings: 'M21 4H8 M3 4h1 M4 4a3 3 0 1 0 6 0 3 3 0 0 0-6 0 M21 12h-5 M3 12h8 M16 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0 M21 20H8 M3 20h1 M4 20a3 3 0 1 0 6 0 3 3 0 0 0-6 0',
    play: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M10 8l6 4-6 4V8z',
    rss: 'M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z M16 6l2 2 M2 21.5l6.36-6.36',
    support: 'M3 18v-6a9 9 0 0 1 18 0v6 M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z',
    grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
    map: 'M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6z M12 12v8 M12 2v4',
  };

  function NavIcon({ name }) {
    const d = NAV_ICONS[name];
    if (!d) return null;
    const paths = d.split(' M').map((p, i) => i === 0 ? p : 'M' + p);
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {paths.map((p, i) => <path key={i} d={p} />)}
      </svg>
    );
  }

  const linkUrls = {
    'AI Chat': 'Platform/AI Chat.html',
    'Integrations': 'Platform/Integrations.html',
    'Semantic Layer': 'Platform/Semantic Layer.html',
    'Memory & Storage': 'Platform/Memory & Storage.html',
    'For RevOps & BizOps': 'Solutions/RevOps BizOps.html',
    'For Founders & CEOs': 'Solutions/Founders CEOs.html',
    'For Marketing Teams': 'Solutions/Marketing Teams.html',
    'For Product Teams': 'Solutions/Product Teams.html',
    'For Data & Analytics Teams': 'Solutions/Data Analytics Teams.html',
    'For Operations & Finance': 'Solutions/Operations Finance.html',
    'Documentation': 'docs/',
    'Blog': 'blog/',
    'Support Center': 'Resources/Contact Support.html',
    'Roadmap': 'Resources/Roadmap.html',
    'Prompt Library': 'Resources/Prompt Library.html',
    'Data Connectors': 'Resources/Connectors.html',
    'Pricing': 'Pricing.html',
    'About Insightis': 'Company/About Insightis.html',
    'Contacts': 'Company/Contacts.html',
    'Success Stories': 'Company/Success Stories.html',
    'Press & Media': 'Company/Press Media.html',
  };

  const dropdowns = {
    Platform: {
      sections: [
        { heading: 'PRODUCT', items: [
          { label: 'AI Chat', desc: 'Ask anything about your data', icon: 'chat' },
          { label: 'Integrations', desc: 'Connect 200+ sources', icon: 'link' },
          { label: 'Semantic Layer', desc: 'One trusted source of truth', icon: 'bars' },
        ]},
        { heading: 'FEATURES', items: [
          { label: 'AI Connect', desc: 'Bring Insightis to your favorite AI tools', icon: 'pulse', comingSoon: true, notClickable: true },
          { label: 'Advanced Reports', desc: 'Rich, interactive reporting', icon: 'file', comingSoon: true, notClickable: true },
          { label: 'Memory & Storage', desc: 'Your business context, always remembered', icon: 'box', comingSoon: true },
        ]},
      ]
    },
    Solutions: {
      sections: [
        { heading: 'BY ROLE', items: [
          { label: 'For RevOps & BizOps', desc: 'Revenue operations and business intelligence', icon: 'dollar' },
          { label: 'For Founders & CEOs', desc: 'Strategic KPIs and company health at a glance', icon: 'star' },
          { label: 'For Marketing Teams', desc: 'Campaign analytics and cross-channel attribution', icon: 'pulse' },
        ]},
        { heading: 'BY TEAM', items: [
          { label: 'For Product Teams', desc: 'Usage metrics and feature adoption tracking', icon: 'box' },
          { label: 'For Data & Analytics Teams', desc: 'Advanced querying and data exploration', icon: 'bars' },
          { label: 'For Operations & Finance', desc: 'Cost tracking and operational efficiency', icon: 'settings' },
        ]},
      ]
    },
    Resources: {
      sections: [
        { heading: 'LEARN', items: [
          { label: 'Documentation', desc: 'Setup guides and API reference', icon: 'file' },
          { label: 'Prompt Library', desc: 'Ready-made prompts for your data', icon: 'play' },
          { label: 'Blog', desc: 'Data analytics tips and product updates', icon: 'rss' },
        ]},
        { heading: 'CONNECT', items: [
          { label: 'Support Center', desc: 'Get help from our team', icon: 'support' },
          { label: 'Roadmap', desc: 'Follow product development in real time', icon: 'map' },
          { label: 'Data Connectors', desc: 'Browse all supported data sources', icon: 'grid' },
        ]},
      ]
    }
  };

  const hasDropdown = (link) => !!dropdowns[link];
  const anyOpen = activeDropdown !== null;

  return (
    <>
      <div style={{
        position:'sticky', top:0, zIndex:50,
        backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
      }}>
      <div ref={navRef} style={{
        position:'relative',
        maxWidth:'1280px', width:'calc(100% - 48px)',
        margin:'0 auto',
        padding:'12px 0 0',
      }}>
        <nav style={{
          height:'56px', display:'flex', alignItems:'center',
          background:'rgba(10,14,19,0.92)',
          backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.08)',
          borderRadius:'50px',
          boxShadow:'0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
          padding:'0 8px 0 24px',
          transition:'border-radius 0.25s ease, box-shadow 0.3s ease',
        }}>
          <div style={{width:'100%'}} className="flex items-center justify-between">
            <a href="index.html" className="flex items-center gap-2.5 flex-shrink-0">
              <svg width="111" height="26" viewBox="0 0 111 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7"><g clipPath="url(#clip0_2673_16536)"><path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/><path d="M33.2746 17.5261V5.60823H35.5859V17.5261H33.2746Z" fill="white"/><path d="M38.2797 17.5261V8.0821H40.1758L40.1216 10.9713H40.4466C40.6152 10.261 40.8379 9.67717 41.1148 9.21971C41.4037 8.76226 41.7708 8.41917 42.2163 8.19044C42.6617 7.96171 43.1793 7.84735 43.7692 7.84735C44.8406 7.84735 45.6532 8.22656 46.207 8.98497C46.7728 9.74338 47.0557 10.9171 47.0557 12.5062V17.5261H44.7624V12.7409C44.7624 11.7177 44.6059 10.9713 44.2929 10.5018C43.9919 10.0203 43.5405 9.77949 42.9386 9.77949C42.433 9.77949 42.0056 9.94201 41.6565 10.267C41.3074 10.58 41.0365 11.0014 40.8439 11.5311C40.6633 12.0487 40.567 12.6205 40.555 13.2465V17.5261H38.2797Z" fill="white"/><path d="M53.1255 17.7609C52.4875 17.7609 51.9096 17.6947 51.392 17.5622C50.8864 17.4419 50.453 17.2673 50.0918 17.0386C49.7307 16.7978 49.4418 16.5149 49.2251 16.1899C49.0084 15.8528 48.876 15.4796 48.8278 15.0703L50.6155 14.4022C50.6396 14.7152 50.76 14.9981 50.9767 15.2509C51.1933 15.4917 51.4943 15.6843 51.8795 15.8287C52.2647 15.9732 52.7282 16.0454 53.2699 16.0454C53.8719 16.0454 54.3353 15.9551 54.6604 15.7746C54.9974 15.5819 55.166 15.3111 55.166 14.962C55.166 14.7092 55.0757 14.5105 54.8951 14.3661C54.7145 14.2096 54.4497 14.0832 54.1006 13.9869C53.7635 13.8785 53.3542 13.7762 52.8727 13.6799C52.4273 13.5836 51.9758 13.4752 51.5184 13.3549C51.073 13.2224 50.6576 13.0539 50.2724 12.8493C49.8992 12.6326 49.5922 12.3557 49.3515 12.0186C49.1228 11.6695 49.0084 11.2301 49.0084 10.7004C49.0084 10.1226 49.1589 9.623 49.4598 9.20166C49.7728 8.78032 50.2182 8.44926 50.7961 8.2085C51.386 7.96773 52.0962 7.84735 52.9269 7.84735C53.7093 7.84735 54.3835 7.9557 54.9493 8.17238C55.5271 8.38907 55.9966 8.70207 56.3578 9.11137C56.7189 9.50863 56.9476 9.98415 57.0439 10.5379L55.166 11.1338C55.1299 10.7967 55.0155 10.5138 54.8229 10.2851C54.6303 10.0443 54.3714 9.86376 54.0464 9.74338C53.7214 9.623 53.3422 9.56281 52.9088 9.56281C52.355 9.56281 51.9217 9.65911 51.6087 9.85172C51.2957 10.0443 51.1392 10.3032 51.1392 10.6282C51.1392 10.893 51.2355 11.1037 51.4281 11.2602C51.6327 11.4167 51.9096 11.5431 52.2587 11.6394C52.6199 11.7357 53.0292 11.832 53.4866 11.9283C53.9682 12.0246 54.4316 12.139 54.8771 12.2714C55.3345 12.3918 55.7438 12.5543 56.105 12.759C56.4661 12.9636 56.755 13.2345 56.9717 13.5716C57.1884 13.8966 57.2967 14.3179 57.2967 14.8356C57.2967 15.4616 57.1282 15.9973 56.7911 16.4427C56.4541 16.8761 55.9725 17.2071 55.3465 17.4358C54.7326 17.6525 53.9922 17.7609 53.1255 17.7609Z" fill="white"/><path d="M59.2115 17.5261V8.0821H61.4868V17.5261H59.2115ZM60.3492 6.60139C59.8917 6.60139 59.5366 6.50508 59.2838 6.31247C59.043 6.10782 58.9226 5.8189 58.9226 5.44571C58.9226 5.07253 59.043 4.78963 59.2838 4.59702C59.5366 4.39236 59.8917 4.29004 60.3492 4.29004C60.8307 4.29004 61.1918 4.38635 61.4326 4.57896C61.6734 4.77157 61.7937 5.06049 61.7937 5.44571C61.7937 5.8189 61.6673 6.10782 61.4145 6.31247C61.1738 6.50508 60.8186 6.60139 60.3492 6.60139Z" fill="white"/><path d="M67.709 20.7765C66.6857 20.7765 65.843 20.6982 65.1809 20.5417C64.5309 20.3852 64.0493 20.1505 63.7363 19.8375C63.4233 19.5245 63.2668 19.1393 63.2668 18.6818C63.2668 18.128 63.4835 17.6766 63.9169 17.3275C64.3623 16.9663 65.0184 16.7436 65.8852 16.6594V16.2982C65.2351 16.3103 64.7415 16.2441 64.4045 16.0996C64.0674 15.9431 63.8988 15.6963 63.8988 15.3592C63.8988 15.0342 64.0614 14.7453 64.3864 14.4925C64.7235 14.2397 65.2772 14.029 66.0477 13.8605V13.4993C65.3133 13.4632 64.7415 13.2345 64.3322 12.8131C63.9229 12.3798 63.7183 11.82 63.7183 11.1338C63.7183 10.5198 63.8868 9.97813 64.2239 9.50863C64.561 9.03914 65.0545 8.67197 65.7046 8.40713C66.3667 8.13025 67.1672 7.99181 68.1062 7.99181H72.7831V9.79755L69.8217 9.36417V9.76144C70.5681 9.88182 71.1158 10.0925 71.4649 10.3934C71.8261 10.6944 72.0066 11.1037 72.0066 11.6214C72.0066 12.1149 71.8501 12.5543 71.5371 12.9395C71.2241 13.3127 70.7667 13.6077 70.1648 13.8244C69.5749 14.029 68.8586 14.1313 68.0159 14.1313C67.8594 14.1313 67.6909 14.1253 67.5103 14.1133C67.3298 14.1012 67.0469 14.0711 66.6616 14.023C66.4088 14.2036 66.2042 14.3661 66.0477 14.5105C65.8912 14.643 65.8129 14.7694 65.8129 14.8897C65.8129 14.986 65.8731 15.0703 65.9935 15.1425C66.1139 15.2027 66.2704 15.2449 66.463 15.2689C66.6556 15.293 66.8422 15.3051 67.0228 15.3051H69.5328C69.7735 15.3051 70.0805 15.3231 70.4537 15.3592C70.8389 15.3954 71.2181 15.4917 71.5913 15.6482C71.9765 15.8047 72.2955 16.0514 72.5484 16.3885C72.8132 16.7256 72.9456 17.2011 72.9456 17.815C72.9456 18.5012 72.747 19.061 72.3497 19.4944C71.9645 19.9398 71.3806 20.2648 70.5982 20.4695C69.8277 20.6741 68.8646 20.7765 67.709 20.7765ZM67.9076 18.9346C68.654 18.9346 69.2499 18.8925 69.6953 18.8082C70.1407 18.7239 70.4597 18.5855 70.6523 18.3929C70.8449 18.2123 70.9412 17.9776 70.9412 17.6886C70.9412 17.4238 70.8811 17.2192 70.7607 17.0747C70.6403 16.9182 70.4838 16.8098 70.2912 16.7497C70.1106 16.6895 69.924 16.6534 69.7314 16.6413C69.5388 16.6293 69.3763 16.6233 69.2438 16.6233H67.0228C66.4449 16.7075 66.0356 16.87 65.7949 17.1108C65.5662 17.3516 65.4518 17.6164 65.4518 17.9053C65.4518 18.1943 65.5481 18.4109 65.7407 18.5554C65.9333 18.7119 66.2102 18.8142 66.5713 18.8624C66.9445 18.9105 67.3899 18.9346 67.9076 18.9346ZM67.9618 12.8854C68.5878 12.8854 69.0633 12.7409 69.3883 12.452C69.7133 12.151 69.8759 11.7598 69.8759 11.2783C69.8759 10.7606 69.7073 10.3393 69.3702 10.0142C69.0452 9.67717 68.5697 9.50863 67.9437 9.50863C67.3177 9.50863 66.8302 9.67115 66.4811 9.99618C66.144 10.3212 65.9755 10.7365 65.9755 11.2421C65.9755 11.5672 66.0477 11.8561 66.1921 12.1089C66.3486 12.3497 66.5713 12.5423 66.8603 12.6867C67.1612 12.8192 67.5284 12.8854 67.9618 12.8854Z" fill="white"/><path d="M74.7825 17.5261V4.70536H77.0758V7.64872C77.0758 7.90152 77.0638 8.16035 77.0397 8.42519C77.0277 8.69003 77.0036 8.96089 76.9675 9.23777C76.9314 9.51465 76.8892 9.79153 76.8411 10.0684C76.805 10.3453 76.7628 10.6222 76.7147 10.8991H77.0939C77.2624 10.249 77.4791 9.70125 77.7439 9.25583C78.0088 8.79837 78.3459 8.44926 78.7552 8.2085C79.1765 7.96773 79.6881 7.84735 80.29 7.84735C81.3855 7.84735 82.2041 8.23258 82.7459 9.00303C83.2876 9.76144 83.5584 10.9171 83.5584 12.47V17.5261H81.2651V12.7951C81.2651 11.7598 81.1087 10.9954 80.7957 10.5018C80.4947 10.0082 80.0372 9.76144 79.4233 9.76144C78.9177 9.76144 78.4963 9.91793 78.1593 10.2309C77.8222 10.5319 77.5634 10.9352 77.3828 11.4408C77.2022 11.9464 77.0939 12.5182 77.0578 13.1562V17.5261H74.7825Z" fill="white"/><path d="M89.2495 17.7428C88.2503 17.7428 87.516 17.478 87.0465 16.9483C86.577 16.4066 86.3422 15.5699 86.3422 14.4383V9.9059H84.9518L84.9879 8.10015H85.9089C86.258 8.10015 86.5168 8.04598 86.6853 7.93764C86.8539 7.82929 86.9562 7.63668 86.9923 7.3598L87.209 5.98744H88.5272V8.0821H91.0191V9.97813H88.5272V14.348C88.5272 14.7934 88.6295 15.1185 88.8342 15.3231C89.0509 15.5278 89.3699 15.6301 89.7912 15.6301C90.0199 15.6301 90.2426 15.606 90.4593 15.5579C90.6881 15.4977 90.8987 15.4014 91.0913 15.2689V17.4358C90.7182 17.5562 90.3751 17.6345 90.0621 17.6706C89.7611 17.7187 89.4903 17.7428 89.2495 17.7428Z" fill="white"/><path d="M92.9634 17.5261V8.0821H95.2386V17.5261H92.9634ZM94.101 6.60139C93.6436 6.60139 93.2884 6.50508 93.0356 6.31247C92.7949 6.10782 92.6745 5.8189 92.6745 5.44571C92.6745 5.07253 92.7949 4.78963 93.0356 4.59702C93.2884 4.39236 93.6436 4.29004 94.101 4.29004C94.5825 4.29004 94.9437 4.38635 95.1845 4.57896C95.4252 4.77157 95.5456 5.06049 95.5456 5.44571C95.5456 5.8189 95.4192 6.10782 95.1664 6.31247C94.9256 6.50508 94.5705 6.60139 94.101 6.60139Z" fill="white"/><path d="M101.461 17.7609C100.823 17.7609 100.245 17.6947 99.7273 17.5622C99.2217 17.4419 98.7883 17.2673 98.4272 17.0386C98.066 16.7978 97.7771 16.5149 97.5604 16.1899C97.3437 15.8528 97.2113 15.4796 97.1632 15.0703L98.9508 14.4022C98.9749 14.7152 99.0953 14.9981 99.312 15.2509C99.5287 15.4917 99.8296 15.6843 100.215 15.8287C100.6 15.9732 101.064 16.0454 101.605 16.0454C102.207 16.0454 102.671 15.9551 102.996 15.7746C103.333 15.5819 103.501 15.3111 103.501 14.962C103.501 14.7092 103.411 14.5105 103.23 14.3661C103.05 14.2096 102.785 14.0832 102.436 13.9869C102.099 13.8785 101.69 13.7762 101.208 13.6799C100.763 13.5836 100.311 13.4752 99.8537 13.3549C99.4083 13.2224 98.993 13.0539 98.6077 12.8493C98.2346 12.6326 97.9276 12.3557 97.6868 12.0186C97.4581 11.6695 97.3437 11.2301 97.3437 10.7004C97.3437 10.1226 97.4942 9.623 97.7952 9.20166C98.1082 8.78032 98.5536 8.44926 99.1314 8.2085C99.7213 7.96773 100.432 7.84735 101.262 7.84735C102.045 7.84735 102.719 7.9557 103.285 8.17238C103.862 8.38907 104.332 8.70207 104.693 9.11137C105.054 9.50863 105.283 9.98415 105.379 10.5379L103.501 11.1338C103.465 10.7967 103.351 10.5138 103.158 10.2851C102.966 10.0443 102.707 9.86376 102.382 9.74338C102.057 9.623 101.678 9.56281 101.244 9.56281C100.69 9.56281 100.257 9.65911 99.944 9.85172C99.631 10.0443 99.4745 10.3032 99.4745 10.6282C99.4745 10.893 99.5708 11.1037 99.7634 11.2602C99.9681 11.4167 100.245 11.5431 100.594 11.6394C100.955 11.7357 101.365 11.832 101.822 11.9283C102.303 12.0246 102.767 12.139 103.212 12.2714C103.67 12.3918 104.079 12.5543 104.44 12.759C104.801 12.9636 105.09 13.2345 105.307 13.5716C105.524 13.8966 105.632 14.3179 105.632 14.8356C105.632 15.4616 105.464 15.9973 105.126 16.4427C104.789 16.8761 104.308 17.2071 103.682 17.4358C103.068 17.6525 102.328 17.7609 101.461 17.7609Z" fill="white"/></g><defs><clipPath id="clip0_2673_16536"><rect width="111" height="25.4928" fill="white"/></clipPath></defs></svg>
            </a>

            <div className="hidden md:flex items-center" style={{gap:'2px'}}>
              {['Platform', 'Solutions', 'Resources', 'Pricing'].map(link => (
                <div key={link}>
                  {hasDropdown(link) ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === link ? null : link)}
                      className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm transition-colors ${activeDropdown === link ? 'text-white bg-white/[0.08]' : 'text-[#A0A0B8] hover:text-white hover:bg-white/[0.04]'}`}
                    >
                      {link}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{transition:'transform 0.2s', transform: activeDropdown === link ? 'rotate(180deg)' : 'rotate(0deg)', opacity:0.5}}>
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                  ) : (
                    <a href={linkUrls[link] || '#'} className="flex items-center px-4 py-1.5 rounded-full text-sm text-[#A0A0B8] hover:text-white hover:bg-white/[0.04] transition-colors">
                      {link}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden md:flex items-center flex-shrink-0" style={{gap:'12px'}}>
              <a href="#" className="text-sm text-[#A0A0B8] hover:text-white transition-colors px-3 py-1.5">Sign In</a>
              <a href="#" className="text-sm font-medium text-white bg-[#07807E] hover:bg-[#09A09D] px-5 py-2 rounded-full transition-colors">Start for Free</a>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>

        {anyOpen && dropdowns[activeDropdown] && (
          <div style={{
            position:'absolute', left:0, right:0, zIndex:-1,
            marginTop:'-24px',
            background:'rgba(10,14,19,0.97)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            borderLeft:'1px solid rgba(255,255,255,0.08)',
            borderRight:'1px solid rgba(255,255,255,0.08)',
            borderBottom:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'0 0 24px 24px',
            boxShadow:'0 12px 48px rgba(0,0,0,0.5)',
          }}>
            <div style={{padding:'44px 32px 28px'}}>
              <div className="flex gap-10">
                {dropdowns[activeDropdown].sections.map((section, si) => (
                  <div key={si} style={{flex:'1'}}>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#A0A0B8] mb-4 px-3">{section.heading}</p>
                    <div className="flex flex-col gap-0.5">
                      {section.items.map((item, ii) => {
                        const inner = (<>
                          {item.icon && (
                            <div style={{
                              flexShrink:0, marginTop:'2px',
                              width:'30px', height:'30px',
                              display:'flex', alignItems:'center', justifyContent:'center',
                              borderRadius:'8px',
                              background:'rgba(10,152,150,0.1)',
                              border:'1px solid rgba(10,152,150,0.2)',
                              color:'#0EC4C1',
                            }}>
                              <NavIcon name={item.icon} />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="flex items-center gap-2">
                              <span className={`text-sm font-medium text-white transition-colors ${item.notClickable ? '' : 'group-hover:text-[#0EC4C1]'}`}>{item.label}{item.external && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</span>
                              {item.comingSoon && (
                                <span style={{fontSize:'10px', fontWeight:500, letterSpacing:'0.04em', padding:'1px 6px', borderRadius:'4px', background:'rgba(10,152,150,0.12)', border:'1px solid rgba(10,152,150,0.3)', color:'#0EC4C1', whiteSpace:'nowrap'}}>Coming Soon</span>
                              )}
                            </span>
                            <span className="text-xs text-[#A0A0B8] mt-0.5 leading-relaxed">{item.desc}</span>
                          </div>
                        </>);
                        return item.notClickable ? (
                          <div key={ii} className="flex items-start gap-3 px-3 py-2.5 rounded-xl group" style={{cursor:'default'}}>{inner}</div>
                        ) : (
                          <a key={ii} href={linkUrls[item.label] || '#'} {...(item.external ? {target:'_blank', rel:'noopener noreferrer'} : {})} onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] transition-colors group">{inner}</a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="md:hidden" style={{
            position:'absolute', left:0, right:0, zIndex:-1,
            background:'rgba(10,14,19,0.97)',
            backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
            borderLeft:'1px solid rgba(255,255,255,0.08)',
            borderRight:'1px solid rgba(255,255,255,0.08)',
            borderBottom:'1px solid rgba(255,255,255,0.08)',
            borderRadius:'0 0 24px 24px',
            padding:'16px 24px',
          }}>
            {['Platform', 'Solutions', 'Resources', 'Pricing'].map(link => (
              <a key={link} href={linkUrls[link] || '#'} className="block py-3 text-[#A0A0B8] hover:text-white transition-colors">{link}</a>
            ))}
            <div className="mt-4 pt-4 border-t border-[#1E1E30] flex flex-col gap-3">
              <a href="#" className="text-sm text-[#A0A0B8]">Sign In</a>
              <a href="#" className="text-sm font-medium text-white bg-[#07807E] px-5 py-2.5 rounded-full text-center">Start for Free</a>
            </div>
          </div>
        )}
      </div>
      </div>

      {anyOpen && (
        <div onClick={() => setActiveDropdown(null)} style={{
          position:'fixed', inset:0, zIndex:48,
          background:'rgba(0,0,0,0.4)',
          backdropFilter:'blur(2px)',
        }}/>
      )}
    </>
  );
}

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
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-[var(--ins-color-gray-800)] border border-[var(--ins-border-hover)] rounded-xl p-4 shadow-2xl z-[100]" onClick={e => e.stopPropagation()} style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[var(--ins-color-gray-800)] border-l border-t border-[var(--ins-border-hover)] rotate-45 mb-[-5px]"></div>
      <p className="text-white text-sm font-medium mb-1">Unlock full access</p>
      <p className="text-[var(--ins-text-inactive)] text-xs mb-3">Get more after registration — connect your data sources and explore AI insights.</p>
      <a href="#pricing" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[var(--ins-color-teal-500)] to-[var(--ins-color-teal-600)] rounded-lg text-white text-xs font-medium hover:shadow-[0_0_16px_rgba(7,128,126,0.4)] transition-shadow">Sign Up Free <ArrowRightIcon size={12} /></a>
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
          <h1 className="ins-text-display-xl text-center mb-6">
            <div><span className="text-white">Your data knows the answer</span></div>
            <div><span style={{color:'var(--ins-text-highlight)'}}>Now you can ask it</span></div>
          </h1>
        </FadeUp>

        {/* Description */}
        <FadeUp delay={0.17}>
          <p className="ins-text-body-lg max-w-2xl mx-auto mb-8" style={{color:'var(--ins-text-body)'}}>
            Insightis connects your real data and delivers answers <span style={{color:'var(--ins-text-highlight)', fontWeight:500}}>3x more accurate</span> with AI Semantic Layer
          </p>
        </FadeUp>
        {/* Chat Mockup */}
        <FadeUp delay={0.2}>
          <div className="max-w-[720px] mx-auto mb-8">
            <div className="bg-[var(--ins-surface-card)]/80 backdrop-blur-xl border border-[var(--ins-border-default)] rounded-2xl shadow-2xl" style={{ boxShadow: '0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(30,30,48,0.5)' }}>

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
                      className="flex-1 bg-transparent text-white text-base outline-none placeholder-[var(--ins-text-inactive)] resize-none h-[160px]"
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
                      style={{ color: tooltip === 'attach' ? 'var(--ins-color-teal-500)' : '#606078', background: tooltip === 'attach' ? 'rgba(9,160,157,0.1)' : 'transparent' }}
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
                              <svg width="18" height="20" viewBox="0 0 18 20" fill="none"><path d="M11 1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7L11 1z" stroke="#7878A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M11 1v6h6" stroke="#7878A8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-150"
                      style={{ color: tooltip === 'connectors' ? 'var(--ins-color-teal-500)' : 'var(--ins-text-inactive)', background: tooltip === 'connectors' ? 'rgba(9,160,157,0.1)' : 'transparent' }}
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
                                <span className="text-sm text-[var(--ins-text-inactive)] group-hover:text-white transition-colors">{c.name}</span>
                              </div>
                              <div className="w-9 h-5 rounded-full flex-shrink-0" style={{ background: 'var(--ins-border-default)', border: '1px solid #3E3E50', position: 'relative' }}>
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
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-150"
                      style={{ color: tooltip === 'model' ? 'var(--ins-color-teal-500)' : 'var(--ins-text-inactive)', background: tooltip === 'model' ? 'rgba(9,160,157,0.1)' : 'transparent' }}
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
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-200"
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

        {/* Trust line */}
        <FadeUp delay={0.3}>
          <p className="text-xs text-[var(--ins-text-inactive)] flex items-center justify-center gap-2">
            <CheckIcon size={14} color="var(--ins-status-success-fg)" />
            Built by the Devart team — the trusted data partner of 40,000+ companies worldwide for over 28 years.
          </p>
        </FadeUp>
      </div>
    </section>

      {/* Integration strip */}
      <div className="w-full border-t border-b border-[var(--ins-border-default)] bg-white/[0.02] py-4 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-6">
          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--ins-text-inactive)] whitespace-nowrap flex-shrink-0">200+ Integrations</span>
          <div className="overflow-hidden flex-1 marquee-container" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
            <div className="flex gap-3 marquee-left" style={{ width: 'max-content' }}>
              {[...integrations, ...integrations].map((name, i) => (
                <ConnectorPill key={`${name}-${i}`} name={name} small />
              ))}
            </div>
          </div>
        </div>
      </div>
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
            background: 'linear-gradient(90deg, rgba(9,160,157,0) 0%, var(--ins-color-teal-400) 60%, #13D4D1 100%)',
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
                <p className="text-sm font-medium text-white">{o.title}</p>
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

  const outputs = [
    { icon: <ZapIcon size={16} color="var(--ins-color-teal-500)" />, title: 'Answers in Seconds', desc: 'X3 accuracy' },
    { icon: <LayersIcon size={16} color="var(--ins-color-teal-500)" />, title: 'Semantic Layer', desc: 'One Trusted Source of Data' },
    { icon: <BrainIcon size={16} color="var(--ins-color-teal-500)" />, title: 'AI Powered Insights', desc: 'Deep dive in your data' },
    { icon: <BellIcon size={16} color="var(--ins-color-teal-500)" />, title: 'Proactive Signals', desc: 'Auto-detected' },
    { icon: <UsersIcon size={16} color="var(--ins-color-teal-500)" />, title: 'Collaborative Analytics', desc: 'Work with Your Team' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(7,128,126,0.06) 0%, transparent 70%)' }}></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeUp>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4" style={{background: 'rgba(7,128,126,0.1)', border: '1px solid rgba(7,128,126,0.4)'}}>
              <span className="text-[var(--ins-color-teal-500)] text-sm">✦</span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--ins-color-teal-500)]">Architecture</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight">The Semantic Intelligence Layer</h2>
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
                  <path key={'cl'+i} d={line.d} stroke="#2A3A4A" strokeWidth="0.35" fill="none" strokeDasharray="1.5,1.5" opacity="0.7"/>
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
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#7A8A9A] mt-2">AI Engine</span>
            </div>

            {/* Right side — stream + cards, fully synced in one React component */}
            <ArchRight outputs={outputs} />
          </div>

          {/* Mobile/tablet layout */}
          <div className="lg:hidden flex flex-col items-center gap-6">
            <div className="relative w-full h-[200px]">
              {chaosSwarm.map((item, i) => (
                <div key={'mob-chaos'+i} className="absolute w-10 h-10 rounded-xl bg-[var(--ins-surface-card)]/80 border border-[var(--ins-border-default)] flex items-center justify-center" style={{
                  top: item.top,
                  left: item.left,
                  transform: `rotate(${item.rotate}deg)`,
                  opacity: item.opacity,
                }}>
                  <ConnectorIcon name={item.name} size={18} />
                </div>
              ))}
            </div>

            <div className="w-px h-8 bg-gradient-to-b from-transparent via-[var(--ins-color-teal-600)]/40 to-transparent"></div>

            <div className="w-24 h-24 rounded-2xl flex flex-col items-center justify-center gap-1.5" style={{ border: '1px solid rgba(7,128,126,0.5)', background: 'linear-gradient(135deg, rgba(7,128,126,0.25), rgba(7,128,126,0.08))', animation: 'corePulse 3s ease-in-out infinite' }}>
              <GridIcon size={24} color="var(--ins-color-teal-500)" />
              <span className="text-[10px] font-medium text-[var(--ins-color-teal-500)] text-center leading-tight">Semantic AI</span>
            </div>

            <div className="w-px h-8 bg-gradient-to-b from-transparent via-[var(--ins-color-teal-600)]/40 to-transparent"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {outputs.map(o => (
                <div key={o.title} className="flex items-center gap-3 px-4 py-3 bg-[var(--ins-surface-card)] border border-[var(--ins-border-default)] rounded-card">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'rgba(7,128,126,0.15)', border: '1px solid rgba(7,128,126,0.3)'}}>{o.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{o.title}</p>
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
    requestAnimationFrame(() => {
      if (window.initShowcase) window.initShowcase();
    });
  }, []);
  return (
    <section id="how-it-works" style={{padding:'100px 0', background:'linear-gradient(180deg,var(--ins-color-gray-900) 0%,var(--ins-color-gray-900) 100%)', position:'relative'}}>
      <div id="showcase-mount" ref={mountRef} />
    </section>
  );
}



// ─── TESTIMONIALS ───
function Testimonials() {
  const testimonials = [
    { quote: "Insightis transformed how we make decisions. The AI insights are incredibly accurate — we now move 3x faster on strategic calls.", name: "Sarah Chen", role: "VP of Analytics · Meridian Health", initials: "SC" },
    { quote: "We cut analysis time by 80%. Natural language queries make complex data accessible to every team member, not just data scientists.", name: "Michael Torres", role: "CTO · Arcline Logistics", initials: "MT" },
    { quote: "Automated insights caught revenue trends we'd have missed for months. It's like having a senior data scientist available around the clock.", name: "Emily Watson", role: "CEO · Brightpath Ventures", initials: "EW" },
    { quote: "Setup integrations took under an hour. ROI was immediate — we found a $200K cost saving in the first week alone.", name: "James Park", role: "Head of Finance · Crestview Capital", initials: "JP" },
    { quote: "Our marketing team loves natural language queries. They pull data without filing tickets to engineering.", name: "Priya Sharma", role: "CMO · Vantage Media Group", initials: "PS" },
    { quote: "Enterprise-grade security with startup speed. Passed our SOC 2 audit with zero issues. The compliance tooling alone is worth it.", name: "David Kim", role: "CISO · Ledgerpoint Financial", initials: "DK" },
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
              <span className="text-[var(--ins-color-teal-500)] text-sm">✦</span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--ins-color-teal-500)]">Verified Impact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight">Loved by a community</h2>
          </div>
        </FadeUp>

        {/* 3x2 static card grid */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[var(--ins-surface-card)] border border-[var(--ins-border-default)] rounded-2xl p-6 relative hover:border-[var(--ins-border-hover)] transition-colors">
                <div className="absolute top-5 right-5" style={{color:'var(--ins-text-inactive)',fontSize:'24px',fontFamily:'Georgia,serif',lineHeight:1}}>99</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <StarIcon key={j} size={13} color="var(--ins-color-amber-400)" />)}
                </div>
                <p className="text-sm text-[var(--ins-text-inactive)] leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold text-white" style={{background:'linear-gradient(135deg, var(--ins-text-highlight), var(--ins-color-teal-650))', border:'2px solid rgba(255,255,255,0.1)'}}>{t.initials}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-[var(--ins-text-inactive)]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

// ─── WHAT IS INSIGHTIS ───
function AnimatedStat({ target, suffix, prefix, duration = 1800 }) {
  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

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
      {prefix}{count.toLocaleString()}{suffix}
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
              <span className="text-[var(--ins-color-teal-500)] text-sm">✦</span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--ins-color-teal-500)]">By the numbers</span>
            </div>
            <h2 className="text-4xl md:text-[48px] font-medium text-white tracking-tight leading-[1.1]">What is Insightis</h2>
            <p className="text-base mt-4 max-w-xl mx-auto" style={{color:'rgba(255,255,255,0.8)'}}>
              The AI analytics workspace that turns raw data into clear decisions — instantly, accurately, and without SQL.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="bg-[var(--ins-surface-card)] border border-[var(--ins-border-default)] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-[var(--ins-border-default)]">
              {stats.map((s, i) => (
                <div key={i} className="text-center px-4">
                  <p className="text-4xl md:text-5xl font-medium text-[var(--ins-color-teal-400)] tracking-tight leading-none mb-3">
                    <AnimatedStat target={s.target} suffix={s.suffix} prefix={s.prefix} duration={1800 + i * 150} />
                  </p>
                  <p className="text-sm font-medium text-white mb-1">{s.label}</p>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white tracking-tight mb-4">Why teams switch to Insightis</h2>
            <p className="text-base max-w-2xl mx-auto" style={{color:'rgba(255,255,255,0.8)'}}>
              Instead of charging for every person in your company, Insightis ties cost to actual AI activity and the storage you need — so pricing stays fair, scalable, and aligned with value.
            </p>
          </div>
        </FadeUp>

        {/* Comparison cards */}
        <FadeUp delay={0.1}>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Traditional / Red */}
            <div className="rounded-2xl p-6 md:p-7 bg-[var(--ins-surface-card)]" style={{border: '1px solid rgba(248,113,113,0.2)'}}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)'}}>
                  <XIcon size={18} color="var(--ins-status-error-fg)" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">Traditional Approach</h3>
                  <p className="text-xs text-[var(--ins-text-inactive)]">Manual, slow, expensive</p>
                </div>
              </div>
              <ul className="flex flex-col gap-4">
                {traditional.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[var(--ins-text-inactive)]">
                    <XIcon size={14} color="var(--ins-status-error-fg)" className="flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Insightis / Green */}
            <div className="rounded-2xl p-6 md:p-7 bg-[var(--ins-surface-card)]" style={{border: '1px solid rgba(7,128,126,0.4)', boxShadow:'0 0 40px rgba(7,128,126,0.08)'}}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background: 'rgba(7,128,126,0.15)', border: '1px solid rgba(7,128,126,0.3)'}}>
                  <CheckIcon size={18} color="var(--ins-color-teal-400)" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">With Insightis</h3>
                  <p className="text-xs text-[var(--ins-text-inactive)]">Automated, instant, scalable</p>
                </div>
              </div>
              <ul className="flex flex-col gap-4">
                {insightis.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[var(--ins-text-inactive)]">
                    <CheckIcon size={14} color="var(--ins-color-teal-400)" className="flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>


        <FadeUp delay={0.25}>
          <div className="text-center mt-10">
            <a href="#" className="ins-btn ins-btn--secondary ins-btn--lg">
              Explore Pricing <ArrowRightIcon size={16} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  const linkUrls = {
    'AI Chat': 'Platform/AI Chat.html',
    'Integrations': 'Platform/Integrations.html',
    'Semantic Layer': 'Platform/Semantic Layer.html',
    'Memory & Storage': 'Platform/Memory & Storage.html',
    'For RevOps & BizOps': 'Solutions/RevOps BizOps.html',
    'For Founders & CEOs': 'Solutions/Founders CEOs.html',
    'For Marketing Teams': 'Solutions/Marketing Teams.html',
    'For Product Teams': 'Solutions/Product Teams.html',
    'For Data & Analytics Teams': 'Solutions/Data Analytics Teams.html',
    'For Operations & Finance': 'Solutions/Operations Finance.html',
    'Documentation': 'docs/',
    'Blog': 'blog/',
    'Support Center': 'Resources/Contact Support.html',
    'Roadmap': 'Resources/Roadmap.html',
    'Prompt Library': 'Resources/Prompt Library.html',
    'Data Connectors': 'Resources/Connectors.html',
  };
  return (
    <footer className="pt-16 pb-8 border-t border-[#1E1E30]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-14 items-start">
          {/* Brand */}
          <div className="shrink-0 md:max-w-[220px]">
            <a href="index.html" className="flex items-center gap-2.5 mb-4">
              <svg width="111" height="26" viewBox="0 0 111 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-7"><g clipPath="url(#clip0_footer)"><path d="M25.4928 10.4151L21.6736 12.7512L25.4928 15.0767L12.7464 22.8371L0 15.0767L3.81921 12.7512L0 10.4151L5.73562 6.92339L7.64785 8.08747L3.82392 10.4151L12.7464 15.8473L21.6689 10.4151L17.845 8.08747L19.7572 6.92339L25.4928 10.4151ZM12.7464 18.1755L5.72881 13.9031L3.8234 15.0767L12.7464 20.5095L21.6694 15.0767L19.7635 13.9031L12.7464 18.1755ZM17.845 10.4209L12.7464 13.525L7.64785 10.4209L9.56426 9.25421L12.7464 11.1915L15.9286 9.25421L17.845 10.4209ZM17.845 5.75931L12.7464 8.86335L7.64785 5.75931L12.7464 2.65527L17.845 5.75931ZM11.4718 5.75878L12.7464 6.53519L14.0211 5.75878L12.7464 4.9829L11.4718 5.75878Z" fill="#1498B9"/><path d="M33.2746 17.5261V5.60823H35.5859V17.5261H33.2746Z" fill="white"/><path d="M38.2797 17.5261V8.0821H40.1758L40.1216 10.9713H40.4466C40.6152 10.261 40.8379 9.67717 41.1148 9.21971C41.4037 8.76226 41.7708 8.41917 42.2163 8.19044C42.6617 7.96171 43.1793 7.84735 43.7692 7.84735C44.8406 7.84735 45.6532 8.22656 46.207 8.98497C46.7728 9.74338 47.0557 10.9171 47.0557 12.5062V17.5261H44.7624V12.7409C44.7624 11.7177 44.6059 10.9713 44.2929 10.5018C43.9919 10.0203 43.5405 9.77949 42.9386 9.77949C42.433 9.77949 42.0056 9.94201 41.6565 10.267C41.3074 10.58 41.0365 11.0014 40.8439 11.5311C40.6633 12.0487 40.567 12.6205 40.555 13.2465V17.5261H38.2797Z" fill="white"/><path d="M53.1255 17.7609C52.4875 17.7609 51.9096 17.6947 51.392 17.5622C50.8864 17.4419 50.453 17.2673 50.0918 17.0386C49.7307 16.7978 49.4418 16.5149 49.2251 16.1899C49.0084 15.8528 48.876 15.4796 48.8278 15.0703L50.6155 14.4022C50.6396 14.7152 50.76 14.9981 50.9767 15.2509C51.1933 15.4917 51.4943 15.6843 51.8795 15.8287C52.2647 15.9732 52.7282 16.0454 53.2699 16.0454C53.8719 16.0454 54.3353 15.9551 54.6604 15.7746C54.9974 15.5819 55.166 15.3111 55.166 14.962C55.166 14.7092 55.0757 14.5105 54.8951 14.3661C54.7145 14.2096 54.4497 14.0832 54.1006 13.9869C53.7635 13.8785 53.3542 13.7762 52.8727 13.6799C52.4273 13.5836 51.9758 13.4752 51.5184 13.3549C51.073 13.2224 50.6576 13.0539 50.2724 12.8493C49.8992 12.6326 49.5922 12.3557 49.3515 12.0186C49.1228 11.6695 49.0084 11.2301 49.0084 10.7004C49.0084 10.1226 49.1589 9.623 49.4598 9.20166C49.7728 8.78032 50.2182 8.44926 50.7961 8.2085C51.386 7.96773 52.0962 7.84735 52.9269 7.84735C53.7093 7.84735 54.3835 7.9557 54.9493 8.17238C55.5271 8.38907 55.9966 8.70207 56.3578 9.11137C56.7189 9.50863 56.9476 9.98415 57.0439 10.5379L55.166 11.1338C55.1299 10.7967 55.0155 10.5138 54.8229 10.2851C54.6303 10.0443 54.3714 9.86376 54.0464 9.74338C53.7214 9.623 53.3422 9.56281 52.9088 9.56281C52.355 9.56281 51.9217 9.65911 51.6087 9.85172C51.2957 10.0443 51.1392 10.3032 51.1392 10.6282C51.1392 10.893 51.2355 11.1037 51.4281 11.2602C51.6327 11.4167 51.9096 11.5431 52.2587 11.6394C52.6199 11.7357 53.0292 11.832 53.4866 11.9283C53.9682 12.0246 54.4316 12.139 54.8771 12.2714C55.3345 12.3918 55.7438 12.5543 56.105 12.759C56.4661 12.9636 56.755 13.2345 56.9717 13.5716C57.1884 13.8966 57.2967 14.3179 57.2967 14.8356C57.2967 15.4616 57.1282 15.9973 56.7911 16.4427C56.4541 16.8761 55.9725 17.2071 55.3465 17.4358C54.7326 17.6525 53.9922 17.7609 53.1255 17.7609Z" fill="white"/><path d="M59.2115 17.5261V8.0821H61.4868V17.5261H59.2115ZM60.3492 6.60139C59.8917 6.60139 59.5366 6.50508 59.2838 6.31247C59.043 6.10782 58.9226 5.8189 58.9226 5.44571C58.9226 5.07253 59.043 4.78963 59.2838 4.59702C59.5366 4.39236 59.8917 4.29004 60.3492 4.29004C60.8307 4.29004 61.1918 4.38635 61.4326 4.57896C61.6734 4.77157 61.7937 5.06049 61.7937 5.44571C61.7937 5.8189 61.6673 6.10782 61.4145 6.31247C61.1738 6.50508 60.8186 6.60139 60.3492 6.60139Z" fill="white"/><path d="M67.709 20.7765C66.6857 20.7765 65.843 20.6982 65.1809 20.5417C64.5309 20.3852 64.0493 20.1505 63.7363 19.8375C63.4233 19.5245 63.2668 19.1393 63.2668 18.6818C63.2668 18.128 63.4835 17.6766 63.9169 17.3275C64.3623 16.9663 65.0184 16.7436 65.8852 16.6594V16.2982C65.2351 16.3103 64.7415 16.2441 64.4045 16.0996C64.0674 15.9431 63.8988 15.6963 63.8988 15.3592C63.8988 15.0342 64.0614 14.7453 64.3864 14.4925C64.7235 14.2397 65.2772 14.029 66.0477 13.8605V13.4993C65.3133 13.4632 64.7415 13.2345 64.3322 12.8131C63.9229 12.3798 63.7183 11.82 63.7183 11.1338C63.7183 10.5198 63.8868 9.97813 64.2239 9.50863C64.561 9.03914 65.0545 8.67197 65.7046 8.40713C66.3667 8.13025 67.1672 7.99181 68.1062 7.99181H72.7831V9.79755L69.8217 9.36417V9.76144C70.5681 9.88182 71.1158 10.0925 71.4649 10.3934C71.8261 10.6944 72.0066 11.1037 72.0066 11.6214C72.0066 12.1149 71.8501 12.5543 71.5371 12.9395C71.2241 13.3127 70.7667 13.6077 70.1648 13.8244C69.5749 14.029 68.8586 14.1313 68.0159 14.1313C67.8594 14.1313 67.6909 14.1253 67.5103 14.1133C67.3298 14.1012 67.0469 14.0711 66.6616 14.023C66.4088 14.2036 66.2042 14.3661 66.0477 14.5105C65.8912 14.643 65.8129 14.7694 65.8129 14.8897C65.8129 14.986 65.8731 15.0703 65.9935 15.1425C66.1139 15.2027 66.2704 15.2449 66.463 15.2689C66.6556 15.293 66.8422 15.3051 67.0228 15.3051H69.5328C69.7735 15.3051 70.0805 15.3231 70.4537 15.3592C70.8389 15.3954 71.2181 15.4917 71.5913 15.6482C71.9765 15.8047 72.2955 16.0514 72.5484 16.3885C72.8132 16.7256 72.9456 17.2011 72.9456 17.815C72.9456 18.5012 72.747 19.061 72.3497 19.4944C71.9645 19.9398 71.3806 20.2648 70.5982 20.4695C69.8277 20.6741 68.8646 20.7765 67.709 20.7765ZM67.9076 18.9346C68.654 18.9346 69.2499 18.8925 69.6953 18.8082C70.1407 18.7239 70.4597 18.5855 70.6523 18.3929C70.8449 18.2123 70.9412 17.9776 70.9412 17.6886C70.9412 17.4238 70.8811 17.2192 70.7607 17.0747C70.6403 16.9182 70.4838 16.8098 70.2912 16.7497C70.1106 16.6895 69.924 16.6534 69.7314 16.6413C69.5388 16.6293 69.3763 16.6233 69.2438 16.6233H67.0228C66.4449 16.7075 66.0356 16.87 65.7949 17.1108C65.5662 17.3516 65.4518 17.6164 65.4518 17.9053C65.4518 18.1943 65.5481 18.4109 65.7407 18.5554C65.9333 18.7119 66.2102 18.8142 66.5713 18.8624C66.9445 18.9105 67.3899 18.9346 67.9076 18.9346ZM67.9618 12.8854C68.5878 12.8854 69.0633 12.7409 69.3883 12.452C69.7133 12.151 69.8759 11.7598 69.8759 11.2783C69.8759 10.7606 69.7073 10.3393 69.3702 10.0142C69.0452 9.67717 68.5697 9.50863 67.9437 9.50863C67.3177 9.50863 66.8302 9.67115 66.4811 9.99618C66.144 10.3212 65.9755 10.7365 65.9755 11.2421C65.9755 11.5672 66.0477 11.8561 66.1921 12.1089C66.3486 12.3497 66.5713 12.5423 66.8603 12.6867C67.1612 12.8192 67.5284 12.8854 67.9618 12.8854Z" fill="white"/><path d="M74.7825 17.5261V4.70536H77.0758V7.64872C77.0758 7.90152 77.0638 8.16035 77.0397 8.42519C77.0277 8.69003 77.0036 8.96089 76.9675 9.23777C76.9314 9.51465 76.8892 9.79153 76.8411 10.0684C76.805 10.3453 76.7628 10.6222 76.7147 10.8991H77.0939C77.2624 10.249 77.4791 9.70125 77.7439 9.25583C78.0088 8.79837 78.3459 8.44926 78.7552 8.2085C79.1765 7.96773 79.6881 7.84735 80.29 7.84735C81.3855 7.84735 82.2041 8.23258 82.7459 9.00303C83.2876 9.76144 83.5584 10.9171 83.5584 12.47V17.5261H81.2651V12.7951C81.2651 11.7598 81.1087 10.9954 80.7957 10.5018C80.4947 10.0082 80.0372 9.76144 79.4233 9.76144C78.9177 9.76144 78.4963 9.91793 78.1593 10.2309C77.8222 10.5319 77.5634 10.9352 77.3828 11.4408C77.2022 11.9464 77.0939 12.5182 77.0578 13.1562V17.5261H74.7825Z" fill="white"/><path d="M89.2495 17.7428C88.2503 17.7428 87.516 17.478 87.0465 16.9483C86.577 16.4066 86.3422 15.5699 86.3422 14.4383V9.9059H84.9518L84.9879 8.10015H85.9089C86.258 8.10015 86.5168 8.04598 86.6853 7.93764C86.8539 7.82929 86.9562 7.63668 86.9923 7.3598L87.209 5.98744H88.5272V8.0821H91.0191V9.97813H88.5272V14.348C88.5272 14.7934 88.6295 15.1185 88.8342 15.3231C89.0509 15.5278 89.3699 15.6301 89.7912 15.6301C90.0199 15.6301 90.2426 15.606 90.4593 15.5579C90.6881 15.4977 90.8987 15.4014 91.0913 15.2689V17.4358C90.7182 17.5562 90.3751 17.6345 90.0621 17.6706C89.7611 17.7187 89.4903 17.7428 89.2495 17.7428Z" fill="white"/><path d="M92.9634 17.5261V8.0821H95.2386V17.5261H92.9634ZM94.101 6.60139C93.6436 6.60139 93.2884 6.50508 93.0356 6.31247C92.7949 6.10782 92.6745 5.8189 92.6745 5.44571C92.6745 5.07253 92.7949 4.78963 93.0356 4.59702C93.2884 4.39236 93.6436 4.29004 94.101 4.29004C94.5825 4.29004 94.9437 4.38635 95.1845 4.57896C95.4252 4.77157 95.5456 5.06049 95.5456 5.44571C95.5456 5.8189 95.4192 6.10782 95.1664 6.31247C94.9256 6.50508 94.5705 6.60139 94.101 6.60139Z" fill="white"/><path d="M101.461 17.7609C100.823 17.7609 100.245 17.6947 99.7273 17.5622C99.2217 17.4419 98.7883 17.2673 98.4272 17.0386C98.066 16.7978 97.7771 16.5149 97.5604 16.1899C97.3437 15.8528 97.2113 15.4796 97.1632 15.0703L98.9508 14.4022C98.9749 14.7152 99.0953 14.9981 99.312 15.2509C99.5287 15.4917 99.8296 15.6843 100.215 15.8287C100.6 15.9732 101.064 16.0454 101.605 16.0454C102.207 16.0454 102.671 15.9551 102.996 15.7746C103.333 15.5819 103.501 15.3111 103.501 14.962C103.501 14.7092 103.411 14.5105 103.23 14.3661C103.05 14.2096 102.785 14.0832 102.436 13.9869C102.099 13.8785 101.69 13.7762 101.208 13.6799C100.763 13.5836 100.311 13.4752 99.8537 13.3549C99.4083 13.2224 98.993 13.0539 98.6077 12.8493C98.2346 12.6326 97.9276 12.3557 97.6868 12.0186C97.4581 11.6695 97.3437 11.2301 97.3437 10.7004C97.3437 10.1226 97.4942 9.623 97.7952 9.20166C98.1082 8.78032 98.5536 8.44926 99.1314 8.2085C99.7213 7.96773 100.432 7.84735 101.262 7.84735C102.045 7.84735 102.719 7.9557 103.285 8.17238C103.862 8.38907 104.332 8.70207 104.693 9.11137C105.054 9.50863 105.283 9.98415 105.379 10.5379L103.501 11.1338C103.465 10.7967 103.351 10.5138 103.158 10.2851C102.966 10.0443 102.707 9.86376 102.382 9.74338C102.057 9.623 101.678 9.56281 101.244 9.56281C100.69 9.56281 100.257 9.65911 99.944 9.85172C99.631 10.0443 99.4745 10.3032 99.4745 10.6282C99.4745 10.893 99.5708 11.1037 99.7634 11.2602C99.9681 11.4167 100.245 11.5431 100.594 11.6394C100.955 11.7357 101.365 11.832 101.822 11.9283C102.303 12.0246 102.767 12.139 103.212 12.2714C103.67 12.3918 104.079 12.5543 104.44 12.759C104.801 12.9636 105.09 13.2345 105.307 13.5716C105.524 13.8966 105.632 14.3179 105.632 14.8356C105.632 15.4616 105.464 15.9973 105.126 16.4427C104.789 16.8761 104.308 17.2071 103.682 17.4358C103.068 17.6525 102.328 17.7609 101.461 17.7609Z" fill="white"/></g><defs><clipPath id="clip0_footer"><rect width="111" height="25.4928" fill="white"/></clipPath></defs></svg>
            </a>
            <p className="text-xs font-medium text-[#09A09D] uppercase tracking-wider mb-2">AI Analytics Workspace for instant insights</p>
            <p className="text-sm text-[#7878A8] leading-relaxed">Every data has an insight. We help you find them, without the complexity.</p>
          </div>

          {/* 5 text columns */}
          <div className="md:ml-auto grid grid-cols-2 gap-8 md:flex md:flex-row md:gap-16">

            {/* Platform */}
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#7878A8] mb-4 whitespace-nowrap">Platform</h4>
              <ul className="flex flex-col gap-2.5">
                {['AI Chat', 'Integrations', 'Semantic Layer', 'AI Connect', 'Advanced Reports', 'Memory & Storage'].map(link => {
                  const isComingSoon = ['AI Connect', 'Advanced Reports', 'Memory & Storage'].includes(link);
                  const isNotClickable = ['AI Connect', 'Advanced Reports'].includes(link);
                  const badge = (
                    <span style={{fontSize:'10px', fontWeight:500, letterSpacing:'0.04em', padding:'1px 6px', borderRadius:'4px', background:'rgba(10,152,150,0.12)', border:'1px solid rgba(10,152,150,0.3)', color:'#0EC4C1', whiteSpace:'nowrap'}}>Coming Soon</span>
                  );
                  if (isComingSoon) {
                    return (
                      <li key={link}>
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          {isNotClickable ? (
                            <span className="text-sm text-[#A0A0B8]" style={{cursor:'default'}}>{link}</span>
                          ) : (
                            <a href={linkUrls[link] || '#'} className="text-sm text-[#A0A0B8] hover:text-white transition-colors">{link}</a>
                          )}
                          {badge}
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={link}><a href={linkUrls[link] || '#'} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link}</a></li>
                  );
                })}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#7878A8] mb-4 whitespace-nowrap">Solutions</h4>
              <ul className="flex flex-col gap-2.5">
                {['For RevOps & BizOps', 'For Founders & CEOs', 'For Marketing Teams', 'For Product Teams', 'For Data & Analytics Teams', 'For Operations & Finance'].map(link => (
                  <li key={link}><a href={linkUrls[link] || '#'} {...(link === 'Video Tutorials' ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link}{link === 'Video Tutorials' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#7878A8] mb-4 whitespace-nowrap">Resources</h4>
              <ul className="flex flex-col gap-2.5">
                {['Documentation', 'Prompt Library', 'Blog', 'Support Center', 'Roadmap', 'Data Connectors'].map(link => (
                  <li key={link}><a href={linkUrls[link] || '#'} {...(link === 'Video Tutorials' ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link}{link === 'Video Tutorials' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#7878A8] mb-4 whitespace-nowrap">Company</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'About Insightis', href: 'Company/About Insightis.html' },
                  { label: 'About Devart', href: 'https://www.devart.com/company/' },
                  { label: 'Careers', href: 'https://www.devart.com/vacancies/' },
                  { label: 'Contacts', href: 'Company/Contacts.html' },
                  { label: 'Success Stories', href: 'Company/Success Stories.html' },
                  { label: 'Press & Media', href: 'Company/Press Media.html' },
                ].map(link => (
                  <li key={link.label}><a href={link.href} {...(link.href.startsWith('http') ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link.label}{link.href.startsWith('http') && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#7878A8] mb-4 whitespace-nowrap">Legal</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: 'Privacy', href: 'Security/Privacy.html' },
                  { label: 'Terms', href: 'Security/Terms.html' },
                  { label: 'Security', href: 'Security/Security.html' },
                  { label: 'Cookie Settings', href: 'Security/Cookie Settings.html' },
                ].map(link => (
                  <li key={link.label}><a href={link.href} {...(link.href.startsWith('http') ? {target:'_blank', rel:'noopener noreferrer'} : {})} className="text-sm text-[#A0A0B8] hover:text-white transition-colors whitespace-nowrap">{link.label}{link.href.startsWith('http') && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:'10px',height:'10px',marginLeft:'4px',display:'inline',verticalAlign:'middle',opacity:0.5}}><path d="M3.5 2H10V8.5"/><path d="M10 2L2 10"/></svg>}</a></li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1E1E30] pt-6 flex items-center justify-between">
          <p className="text-xs text-[#7878A8]">&copy; Copyright &copy; Devart 2026</p>
          <div className="flex items-center gap-4">
            <a href="https://x.com/Insightisai" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><TwitterXIcon size={18} color="#7878A8" /></a>
            <a href="https://www.tiktok.com/@insightisai" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><TikTokIcon size={18} color="#7878A8" /></a>
            <a href="https://www.youtube.com/@InsightisAI" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><YouTubeIcon size={18} color="#7878A8" /></a>
            <a href="https://www.linkedin.com/company/112025589" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><LinkedInIcon size={18} color="#7878A8" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── SUBSCRIBE BANNER ───
function SubscribeBanner() {
  return (
    <section className="pt-16 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="relative rounded-2xl py-10 px-8 md:px-16 text-center overflow-hidden" style={{ border: '1px solid rgba(7,128,126,0.3)', background: 'linear-gradient(135deg, rgba(7,128,126,0.12) 0%, rgba(13,13,26,0.9) 40%, rgba(10,18,32,0.85) 70%, rgba(7,128,126,0.08) 100%)', boxShadow: '0 0 60px rgba(7,128,126,0.12), 0 8px 48px rgba(0,0,0,0.4)' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[var(--ins-color-teal-600)]/60 to-transparent"></div>
            <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-[var(--ins-color-teal-600)]/10 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white mb-3 tracking-tight leading-tight">
                Start Making Smarter Decisions <span className="text-[var(--ins-color-teal-400)]">Today</span>
              </h2>
              <p className="text-sm md:text-base mb-7 max-w-lg mx-auto leading-relaxed" style={{color:'rgba(255,255,255,0.6)'}}>
                Join 1,200+ data-driven teams. Set up in minutes, no credit card required, and cancel anytime.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#" className="sm:w-auto px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-[var(--ins-color-teal-600)] to-[var(--ins-color-teal-500)] rounded-xl hover:shadow-[0_0_32px_rgba(7,128,126,0.5)] transition-all inline-flex items-center justify-center gap-2">
                  Start Free Trial <span>&rarr;</span>
                </a>
                <a href="#" className="sm:w-auto px-8 py-3 text-sm font-medium text-white/80 bg-transparent border border-[var(--ins-border-default)] rounded-xl hover:border-[var(--ins-color-teal-600)]/40 hover:text-white transition-all inline-flex items-center justify-center">
                  Schedule a Demo
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}


// ─── BOTTOM CTA ───
function BottomCTA() {
  return (
    <section className="pt-8 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="relative rounded-2xl border border-[var(--ins-border-default)] py-8 px-8 md:px-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6" style={{background:'linear-gradient(135deg, rgba(18,18,31,0.95) 0%, rgba(13,13,26,0.98) 50%, rgba(18,18,31,0.95) 100%)'}}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--ins-color-teal-600)]/30 to-transparent"></div>
            <h2 className="text-2xl md:text-3xl font-medium text-white tracking-tight leading-tight flex-shrink-0">
              Still waiting on <span style={{color:'rgba(7, 128, 126)'}}> insights</span> that take <span style={{color:'rgba(7, 128, 126)'}}> days?</span>
            </h2>
            <div className="flex items-center w-full md:w-auto md:min-w-[400px] bg-[var(--ins-color-promo-solid)] border border-[var(--ins-border-hover)] rounded-xl overflow-hidden focus-within:border-[var(--ins-color-teal-600)]/60 transition-colors">
              <input
                type="text"
                placeholder="What info are you looking for?"
                aria-label="What info are you looking for?"
                className="flex-1 bg-transparent text-sm text-white placeholder-[var(--ins-text-inactive)] px-4 py-3 outline-none min-w-0"
              />
              <button className="inline-flex items-center gap-2 px-5 py-2.5 m-1 text-sm font-medium text-white bg-gradient-to-r from-[var(--ins-color-teal-600)] to-[var(--ins-color-teal-500)] rounded-lg hover:shadow-[0_0_24px_rgba(7,128,126,0.5)] transition-all flex-shrink-0">
                Get Insight
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── APP ───
function App() {
  return (
    <div className="font-body">
      <header>
        <Header />
        <Hero />
      </header>
      <main id="main-content">
        <Architecture />
        <HowItWorks />
        <SubscribeBanner />
        <Testimonials />
        <WhatIsInsightis />
        <Pricing />
        <BottomCTA />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
