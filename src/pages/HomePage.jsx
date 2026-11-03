import { memo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiCheckSquare,
  FiCode,
  FiCloud,
  FiSmartphone,
  FiRefreshCw,
  FiPenTool,
  FiSearch,
  FiUploadCloud,
  FiCalendar,
  FiBox,
  FiUsers,
} from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import markWebp from "../assets/brand/inf-lab-mark.webp";
import Seo from "../components/Seo";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import StatStrip from "../components/ui/StatStrip";
import { SERVICES, METHODOLOGY } from "../data/services";
import { PROJECTS } from "../data/projects";
import { SITE } from "../data/siteConfig";

/**
 * Three core disciplines rendered on Ring B at 120° offsets:
 * Base angle: -150° with delays 0s, -32s, -64s on a 96s period (32s = 120°).
 */
const CAPABILITIES = [
  {
    icon: FiCode,
    title: "Web platforms",
    support: "Modern, scalable, secure",
    delay: "0s",
  },
  {
    icon: FiCloud,
    title: "Cloud & backend",
    support: "Reliable & high performance",
    delay: "-32s",
  },
  {
    icon: FiSmartphone,
    title: "Mobile apps",
    support: "iOS & Android",
    delay: "-64s",
  },
];

/**
 * Consolidated SVG paths for Ring C bezel (Swiss watch instrument ticks):
 * - Minor: 120 radial tick marks (every 3°) from r=227 to r=230 (outer radius 230 = 46cqw of 500)
 * - Major: 12 radial tick marks (every 30°, tenth position) from r=223 to r=231
 */
const MINOR_TICKS_PATH = (() => {
  const cx = 250;
  const cy = 250;
  let d = "";
  for (let i = 0; i < 120; i++) {
    const rad = (i * 3 * Math.PI) / 180;
    const x1 = (cx + 227 * Math.cos(rad)).toFixed(1);
    const y1 = (cy + 227 * Math.sin(rad)).toFixed(1);
    const x2 = (cx + 230 * Math.cos(rad)).toFixed(1);
    const y2 = (cy + 230 * Math.sin(rad)).toFixed(1);
    d += `M${x1} ${y1}L${x2} ${y2}`;
  }
  return d;
})();

const MAJOR_TICKS_PATH = (() => {
  const cx = 250;
  const cy = 250;
  let d = "";
  for (let i = 0; i < 12; i++) {
    const rad = (i * 30 * Math.PI) / 180;
    const x1 = (cx + 223 * Math.cos(rad)).toFixed(1);
    const y1 = (cy + 223 * Math.sin(rad)).toFixed(1);
    const x2 = (cx + 231 * Math.cos(rad)).toFixed(1);
    const y2 = (cy + 231 * Math.sin(rad)).toFixed(1);
    d += `M${x1} ${y1}L${x2} ${y2}`;
  }
  return d;
})();

/**
 * Orbital Capability Card Item:
 * Responsive switch between full card (>= 440px container) and compact icon chip (< 440px container).
 */
function OrbitalCardItem({ card }) {
  const Icon = card.icon;
  return (
    <div
      role="group"
      tabIndex={0}
      aria-label={`${card.title}: ${card.support}`}
      className="orbital-card-item group relative select-none rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] dark:focus-visible:ring-[#818CF8] focus-visible:ring-offset-2"
    >
      {/* ── Desktop & Tablet Full Card (container width >= 440px) ───── */}
      <div
        className="orbital-card-full hidden items-center gap-2.5 rounded-[14px] border px-3 py-2 sm:py-2.5"
        style={{
          width: "31.5cqw",
          minWidth: "156px",
          maxWidth: "188px",
          minHeight: "10.5cqw",
          borderColor: "var(--orbital-card-border)",
          backgroundColor: "var(--orbital-card-surface)",
          boxShadow: "var(--orbital-card-shadow)",
        }}
      >
        {/* Icon tile (8cqw, min 32px, max 40px, radius 10px, 1px border) */}
        <span
          aria-hidden="true"
          className="flex size-[8cqw] min-h-[32px] min-w-[32px] max-h-[40px] max-w-[40px] shrink-0 items-center justify-center rounded-[10px] border border-slate-900/5 bg-slate-50 text-[#4F46E5] dark:border-white/[0.08] dark:bg-[#1A1B23] dark:text-[#818CF8]"
        >
          <Icon size={16} />
        </span>

        {/* Text lockup */}
        <div className="min-w-0 flex-1">
          <div
            className="truncate font-semibold leading-tight text-[#0B0B0F] dark:text-[#F5F6F8]"
            style={{ fontSize: "clamp(12px, 2.6cqw, 14px)" }}
          >
            {card.title}
          </div>
          <div
            className="mt-0.5 truncate leading-tight text-[#5B606B] dark:text-[#9AA0AC]"
            style={{ fontSize: "clamp(10px, 2.1cqw, 12px)" }}
          >
            {card.support}
          </div>
        </div>
      </div>

      {/* ── Mobile Compact Chip (container width < 440px) ─────────── */}
      <div
        className="orbital-card-chip hidden items-center justify-center rounded-full border"
        aria-label={card.title}
        style={{
          width: "12cqw",
          height: "12cqw",
          minWidth: "38px",
          minHeight: "38px",
          maxWidth: "48px",
          maxHeight: "48px",
          borderColor: "var(--orbital-card-border)",
          backgroundColor: "var(--orbital-card-surface)",
          boxShadow: "var(--orbital-card-shadow)",
        }}
      >
        <span
          aria-hidden="true"
          className="text-[#4F46E5] dark:text-[#818CF8]"
        >
          <Icon size={17} />
        </span>
      </div>
    </div>
  );
}

/**
 * Precision Orbital Instrument Visual
 */
export const HeroInstrument = memo(function HeroInstrument({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isIntersecting = true;

    const updatePaused = () => {
      const shouldPause = !isIntersecting || document.hidden;
      if (shouldPause) {
        container.setAttribute("data-paused", "true");
      } else {
        container.removeAttribute("data-paused");
      }
    };

    let observer = null;
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          isIntersecting = entry.isIntersecting;
          updatePaused();
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    const handleVisibility = () => {
      updatePaused();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className={`orbital-wrapper relative mx-auto w-full max-w-[560px] ${className}`}>
      <style>{`
        .orbital-wrapper {
          container-type: inline-size;
        }

        :root {
          --orbital-accent: #4F46E5;
          --orbital-card-surface: #FFFFFF;
          --orbital-card-border: rgba(15, 23, 42, 0.10);
          --orbital-card-shadow: 0 1px 2px rgba(15, 23, 42, 0.06), 0 12px 24px -14px rgba(15, 23, 42, 0.22);
        }

        .dark {
          --orbital-accent: #818CF8;
          --orbital-card-surface: #12131A;
          --orbital-card-border: rgba(255, 255, 255, 0.09);
          --orbital-card-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 14px 28px -16px #000000;
        }

        .orbital-container {
          width: min(100%, 560px);
          aspect-ratio: 1;
          container-type: inline-size;
          contain: layout paint style;
          isolation: isolate;
          position: relative;
          transform-origin: 50% 50%;
        }

        /* ── Compositor Keyframes (Pure 2D Transforms) ── */
        @keyframes orbital-spin-cw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbital-spin-ccw {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes orbital-arm-spin {
          from {
            transform: rotate(-150deg);
          }
          to {
            transform: rotate(210deg);
          }
        }

        @keyframes orbital-card-counter {
          from {
            transform: translate(-50%, -50%) rotate(150deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-210deg);
          }
        }

        @keyframes orbital-entrance-fade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Entrance: once, 700ms ease-out, 90ms stagger */
        .orbital-entrance-rings {
          animation: orbital-entrance-fade 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .orbital-entrance-cards {
          animation: orbital-entrance-fade 700ms cubic-bezier(0.16, 1, 0.3, 1) 90ms both;
        }

        /* Rotators & Arm transform-origin */
        .orbital-rotator,
        .orbital-arm {
          transform-origin: 50% 50%;
        }

        .orbital-card-counter {
          transform-origin: 50% 50%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Hover, focus-within & paused state: seamless pause */
        .orbital-container:hover .orbital-rotator,
        .orbital-container:hover .orbital-arm,
        .orbital-container:hover .orbital-card-counter,
        .orbital-container:focus-within .orbital-rotator,
        .orbital-container:focus-within .orbital-arm,
        .orbital-container:focus-within .orbital-card-counter,
        .orbital-container[data-paused="true"] .orbital-rotator,
        .orbital-container[data-paused="true"] .orbital-arm,
        .orbital-container[data-paused="true"] .orbital-card-counter {
          animation-play-state: paused !important;
        }

        /* Comet-tail arcs on Ring B: ~45deg trailing arc behind each card */
        .orbital-tails-ring {
          border: 1.5px solid var(--orbital-accent);
          mask: repeating-conic-gradient(from 45deg, transparent 0deg, rgba(0, 0, 0, 0.6) 45deg, transparent 45.1deg 120deg);
          -webkit-mask: repeating-conic-gradient(from 45deg, transparent 0deg, rgba(0, 0, 0, 0.6) 45deg, transparent 45.1deg 120deg);
        }

        /* Container Queries: Responsive Card to Chip + Legend */
        @container (min-width: 440px) {
          .orbital-card-full {
            display: flex !important;
          }
          .orbital-card-chip {
            display: none !important;
          }
          .orbital-mobile-legend {
            display: none !important;
          }
        }

        @container (max-width: 439px) {
          .orbital-card-full {
            display: none !important;
          }
          .orbital-card-chip {
            display: flex !important;
          }
          .orbital-mobile-legend {
            display: grid !important;
          }
        }

        /* Accessibility: prefers-reduced-motion stops all motion */
        @media (prefers-reduced-motion: reduce) {
          .orbital-entrance-rings,
          .orbital-entrance-cards,
          .orbital-rotator,
          .orbital-arm,
          .orbital-card-counter {
            animation: none !important;
          }
          .orbital-arm-0 {
            transform: rotate(-150deg) !important;
          }
          .orbital-arm-0 .orbital-card-counter {
            transform: translate(-50%, -50%) rotate(150deg) !important;
          }
          .orbital-arm-1 {
            transform: rotate(-30deg) !important;
          }
          .orbital-arm-1 .orbital-card-counter {
            transform: translate(-50%, -50%) rotate(30deg) !important;
          }
          .orbital-arm-2 {
            transform: rotate(90deg) !important;
          }
          .orbital-arm-2 .orbital-card-counter {
            transform: translate(-50%, -50%) rotate(-90deg) !important;
          }
        }
      `}</style>

      {/* Main Square Orbital Container */}
      <div
        ref={containerRef}
        className="orbital-container relative mx-auto select-none"
      >
        {/* ── Layer 1: Static Backdrop Plate (Zero animation) ───────── */}
        <div
          className="pointer-events-none absolute inset-0 select-none"
          aria-hidden="true"
        >
          <svg viewBox="0 0 500 500" className="h-full w-full" fill="none">
            <defs>
              <pattern
                id="orbital-dot-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="0.75"
                  className="fill-slate-900/[0.08] dark:fill-white/[0.07]"
                />
              </pattern>
              <radialGradient id="orbital-dot-mask" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#000" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#000" stopOpacity="0.4" />
                <stop offset="90%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <mask id="orbital-dot-mask-el">
                <rect width="500" height="500" fill="url(#orbital-dot-mask)" />
              </mask>
            </defs>
            <rect
              width="500"
              height="500"
              fill="url(#orbital-dot-grid)"
              mask="url(#orbital-dot-mask-el)"
            />
          </svg>
        </div>

        {/* ── Rings Entrance Wrapper (700ms ease-out) ────────────────── */}
        <div className="orbital-entrance-rings pointer-events-none absolute inset-0">
          {/* Static Concentric Rings: Hairline outer at r=13, Ring A at r=21, Ring B at r=32.5 */}
          <svg
            viewBox="0 0 500 500"
            className="pointer-events-none absolute inset-0 h-full w-full select-none"
            fill="none"
            aria-hidden="true"
          >
            {/* Faint outer hairline ring at r=13cqw (r=65 in 500x500) */}
            <circle
              cx="250"
              cy="250"
              r="65"
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-900/[0.08] dark:text-white/[0.06]"
              vectorEffect="non-scaling-stroke"
            />

            {/* Ring A (inner): r=21cqw (r=105 in 500x500) dotted hairline */}
            <circle
              cx="250"
              cy="250"
              r="105"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 6"
              className="text-slate-900/[0.14] dark:text-white/[0.12]"
              vectorEffect="non-scaling-stroke"
            />

            {/* Ring B (card track): r=32.5cqw (r=162.5 in 500x500) solid hairline */}
            <circle
              cx="250"
              cy="250"
              r="162.5"
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-900/[0.14] dark:text-white/[0.12]"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Rotator 1: Tick Bezel (Ring C r=46cqw, CW 240s) */}
          <div
            className="orbital-rotator orbital-tick-bezel pointer-events-none absolute inset-0 select-none will-change-transform"
            aria-hidden="true"
            style={{
              animation: "orbital-spin-cw 240s linear infinite",
            }}
          >
            <svg viewBox="0 0 500 500" className="h-full w-full" fill="none">
              {/* Minor ticks: 120 consolidated radial lines */}
              <path
                d={MINOR_TICKS_PATH}
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-900/[0.12] dark:text-white/[0.10]"
                vectorEffect="non-scaling-stroke"
              />
              {/* Major ticks: 12 consolidated radial lines (every 10th position) */}
              <path
                d={MAJOR_TICKS_PATH}
                stroke="currentColor"
                strokeWidth="1.75"
                className="text-slate-900/[0.28] dark:text-white/[0.30]"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Rotator 2: Inner Satellites (Ring A r=21cqw, CCW 64s) */}
          <div
            className="orbital-rotator orbital-inner-sats pointer-events-none absolute inset-0 select-none will-change-transform"
            aria-hidden="true"
            style={{
              animation: "orbital-spin-ccw 64s linear infinite",
            }}
          >
            {/* Sat 1: 4px dot, accent fill, Ring A (45deg) */}
            <span
              className="absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F46E5] ring-1 ring-[#4F46E5]/40 dark:bg-[#818CF8] dark:ring-[#818CF8]/40"
              style={{
                left: "calc(50% + 14.85cqw)",
                top: "calc(50% + 14.85cqw)",
              }}
            />
            {/* Sat 2: 4px dot, neutral fill, Ring A (225deg) */}
            <span
              className="absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-500 ring-1 ring-slate-900/20 dark:bg-slate-400 dark:ring-white/20"
              style={{
                left: "calc(50% - 14.85cqw)",
                top: "calc(50% - 14.85cqw)",
              }}
            />
          </div>

          {/* Rotator 3: Outer Satellites (Ring C r=46cqw, CCW 150s) */}
          <div
            className="orbital-rotator orbital-outer-sats pointer-events-none absolute inset-0 select-none will-change-transform"
            aria-hidden="true"
            style={{
              animation: "orbital-spin-ccw 150s linear infinite",
            }}
          >
            {/* Sat 3: 4px dot, neutral fill, Ring C (110deg) */}
            <span
              className="absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400 ring-1 ring-slate-900/15 dark:bg-slate-500 dark:ring-white/15"
              style={{
                left: "calc(50% - 15.73cqw)",
                top: "calc(50% + 43.23cqw)",
              }}
            />
            {/* Sat 4: 4px dot, neutral fill, Ring C (290deg) */}
            <span
              className="absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400 ring-1 ring-slate-900/15 dark:bg-slate-500 dark:ring-white/15"
              style={{
                left: "calc(50% + 15.73cqw)",
                top: "calc(50% - 43.23cqw)",
              }}
            />
          </div>
        </div>

        {/* ── Cards Entrance Wrapper (700ms ease-out, 90ms stagger) ─── */}
        <div className="orbital-entrance-cards pointer-events-none absolute inset-0">
          {/* Rotator 4: Comet-tail arcs ring on Ring B (CW 96s) */}
          <div
            className="orbital-rotator orbital-tails-ring pointer-events-none absolute will-change-transform"
            style={{
              left: "50%",
              top: "50%",
              width: "65cqw",
              height: "65cqw",
              marginLeft: "-32.5cqw",
              marginTop: "-32.5cqw",
              borderRadius: "50%",
              animation: "orbital-spin-cw 96s linear infinite",
            }}
            aria-hidden="true"
          />

          {/* 3 Arms: Spokes + Cards on Ring B (R=32.5cqw, 120° spacing) */}
          {CAPABILITIES.map((card, idx) => (
            <div
              key={card.title}
              className={`orbital-arm orbital-arm-${idx} pointer-events-none absolute inset-0`}
              style={{
                animation: "orbital-arm-spin 96s linear infinite",
                animationDelay: card.delay,
              }}
            >
              {/* Spoke: 1px dashed hairline from r=13cqw to r=32.5cqw */}
              <div
                className="pointer-events-none absolute top-1/2 h-px -translate-y-1/2 border-t border-dashed border-slate-900/[0.12] dark:border-white/[0.10]"
                style={{
                  left: "calc(50% + 13cqw)",
                  width: "19.5cqw",
                }}
                aria-hidden="true"
              />

              {/* Card node anchor at Ring B (r=32.5cqw) */}
              <div
                className="pointer-events-auto absolute top-1/2"
                style={{
                  left: "calc(50% + 32.5cqw)",
                }}
              >
                {/* Counter-rotation to keep card 100% upright */}
                <div
                  className="orbital-card-counter will-change-transform"
                  style={{
                    animation: "orbital-card-counter 96s linear infinite",
                    animationDelay: card.delay,
                  }}
                >
                  <OrbitalCardItem card={card} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Center Logo Disc: 21cqw dia (r=10.5cqw), static, topmost z-20 ── */}
        <div
          className="absolute left-1/2 top-1/2 z-20 flex size-[21cqw] min-h-[64px] min-w-[64px] max-h-[118px] max-w-[118px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-900/10 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] dark:border-white/[0.09] dark:bg-[#12131A] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
          aria-hidden="true"
        >
          {/* Authentic brand mark asset kept as-is */}
          <img
            src={markWebp}
            width="242"
            height="128"
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            draggable={false}
            className="relative z-10 h-[44%] w-auto max-w-[70%] select-none pointer-events-none object-contain dark:brightness-110"
          />
        </div>
      </div>

      {/* ── Mobile Legend (<440px container) ────────────────────────── */}
      <ul
        className="orbital-mobile-legend mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3"
        aria-label="Capabilities"
      >
        {CAPABILITIES.map((cap) => {
          const Icon = cap.icon;
          return (
            <li
              key={cap.title}
              className="flex items-center gap-2.5 rounded-[12px] border border-slate-900/10 bg-white p-2.5 shadow-xs dark:border-white/[0.09] dark:bg-[#12131A]"
            >
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-[8px] border border-slate-900/5 bg-slate-50 text-[#4F46E5] dark:border-white/[0.08] dark:bg-[#1A1B23] dark:text-[#818CF8]"
              >
                <Icon size={16} />
              </span>
              <div className="min-w-0">
                <div className="truncate text-[13px] font-semibold text-[#0B0B0F] dark:text-[#F5F6F8]">
                  {cap.title}
                </div>
                <div className="truncate text-[11px] text-[#5B606B] dark:text-[#9AA0AC]">
                  {cap.support}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

const STATS = [
  {
    value: "2016",
    label: "Established",
    note: "Software engineering since 2016",
    icon: FiCalendar,
  },
  {
    value: "10+",
    label: "Project engagements",
    note: "Web, mobile, cloud & enterprise",
    icon: FiBox,
  },
  {
    value: "3",
    label: "Core disciplines",
    note: "Web, backend/cloud, mobile",
    icon: FiUsers,
  },
  {
    value: "10 years",
    label: "Engineering practice",
    note: "Continuous delivery, 2016–2026",
    icon: LuShieldCheck,
  },
];

const METHOD_ICONS = {
  search: FiSearch,
  pen: FiPenTool,
  code: FiCode,
  check: FiCheckSquare,
  upload: FiUploadCloud,
  life: FiRefreshCw,
};

/**
 * Delivery-phase ledger cell — display numeral, signal tick, and a hairline
 * list. The ordered list supplies the order; the numeral is decorative.
 */
function MethodStepCard({ phase }) {
  const Icon = METHOD_ICONS[phase.icon] ?? FiCode;
  return (
    <li className="group relative bg-surface-card p-6 transition-colors duration-200 hover:bg-brand-soft/25 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[3px] border border-border-subtle bg-brand-soft text-brand-soft-text">
          <Icon size={17} aria-hidden="true" />
        </span>
        <span
          aria-hidden="true"
          className="font-display text-[2.75rem] leading-none tracking-[-0.04em] text-text-muted/60 [font-variant-numeric:tabular-nums]"
        >
          {String(phase.step).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-6 type-card text-text-primary">
        {phase.name}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
        {phase.description}
      </p>

      <ul className="mt-6 space-y-2.5 border-t border-border-subtle pt-5 text-xs leading-5">
        {phase.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5">
            <span className="signal-mark mt-[0.55em]" aria-hidden="true" />
            <span className="font-medium text-text-secondary">{point}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function HomePage() {
  const flagship = PROJECTS.filter((p) => p.verified).slice(0, 3);

  return (
    <>
      <Seo
        title="Infinity Lab — Software Engineering Company (Est. 2016)"
        description={SITE.description}
        path="/"
      />

      {/* Hero — paper canvas, headline left, instrument right */}
      <section className="relative overflow-hidden">
        <div className="container-section relative grid items-center gap-10 pb-14 pt-10 md:pb-20 md:pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:grid-cols-[minmax(0,580px)_minmax(0,1fr)] xl:gap-16 xl:pb-24 xl:pt-20">
          <div>
            <div className="mb-10 flex items-center gap-3" aria-hidden="true">
              <span className="signal-tick" />
              <span className="h-px flex-1 bg-border-subtle" />
            </div>

            <h1 className="type-hero max-w-[10.5em]">
              <span className="block text-[#0B0B0F] dark:text-[#F5F6F8]">
                Ten years of shipping systems
              </span>
              <span className="block text-[#5B606B] dark:text-[#9AA0AC]">
                that stay up and scale.
              </span>
            </h1>

            <div className="signal-rule mt-10 w-20" aria-hidden="true" />

            <p className="type-lead mt-7 max-w-[52ch] text-text-secondary">
              Infinity Lab designs, builds and operates news portals, institutional platforms, management systems and mobile apps for teams across India.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" size="lg" variant="primary" arrow className="w-full sm:w-auto">
                Start your project
              </Button>
              <Button to="/projects" size="lg" variant="secondary" className="w-full sm:w-auto">
                See our work
              </Button>
            </div>
          </div>

          <div className="animate-fadeUp mx-auto w-full max-w-[480px] sm:max-w-[540px] lg:max-w-none lg:self-center">
            <HeroInstrument />
          </div>
        </div>

        {/* Trust metrics ledger */}
        <div className="container-section pb-14">
          <StatStrip stats={STATS} />
        </div>
      </section>

      {/* Company story */}
      <section aria-labelledby="story-heading" className="cv-auto section">
        <div className="container-section">
          <SectionHeading
            id="story-heading"
            index="01"
            eyebrow="Who we are"
            title={`An engineering company since ${SITE.founded}`}
            lead="Infinity Lab started with a simple conviction: software that people depend on should be built with care, honesty and attention to detail."
          />
          <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-6 lg:col-span-5">
              <div className="container-text space-y-6 text-base leading-relaxed text-text-secondary md:text-[1.0625rem]">
                <p className="text-lg font-medium leading-relaxed text-text-primary">
                  Over the years we have designed and delivered production systems
                  for demanding, high-traffic domains: regional news publishing,
                  education ERP, e-commerce, academic conferences and IT services.
                </p>
                <p>
                  We keep teams small and accountable. The engineers who scope
                  your system are the ones who build and operate it — which is why
                  our clients stay with us long after launch.
                </p>
              </div>
              <div className="signal-rule mt-10 w-16" aria-hidden="true" />
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <div className="panel p-6 sm:p-8">
                <span className="signal-tick mb-5" aria-hidden="true" />
                <h3 className="type-subheading text-text-primary">
                  What that means in practice
                </h3>
                <ul className="mt-6 border-t border-border-subtle">
                  {[
                    "Honest scope and timelines — no overpromising",
                    "Accessibility and performance treated as requirements, not extras",
                    "Operational support after launch, not abandonment",
                    "Clear documentation so your team is never locked out",
                  ].map((item, i) => (
                    <li
                      key={item}
                      className="flex items-start gap-3.5 border-b border-border-subtle py-4 last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 font-mono text-[10px] tabular-nums tracking-[0.12em] text-text-muted"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <FiCheckCircle
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-brand"
                      />
                      <span className="text-sm font-medium text-text-primary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section
        aria-labelledby="services-heading"
        className="cv-auto section border-y border-border-subtle bg-surface-sunken/50"
      >
        <div className="container-section">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="services-heading"
              index="02"
              eyebrow="Services"
              title="Three disciplines, one accountable team"
              lead="We cover the full delivery surface — interface, server, and device — so you never have to chase three vendors for one product."
            />
            <Button
              to="/services"
              variant="secondary"
              size="md"
              arrow
              className="shrink-0"
            >
              Explore services in detail
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Flagship projects */}
      <section aria-labelledby="projects-heading" className="cv-auto section">
        <div className="container-section">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="projects-heading"
              index="03"
              eyebrow="Flagship work"
              title="Platforms in production"
              lead="A selection of live builds, from regional news publishing to campus ERP and e-commerce."
            />
            <Button
              to="/projects"
              variant="secondary"
              size="md"
              arrow
              className="shrink-0"
            >
              All projects
            </Button>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {flagship.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Methodology — a paper plate, never a black slab */}
      <section
        aria-labelledby="method-heading"
        className="cv-auto section border-y border-border-subtle bg-surface-sunken relative overflow-hidden"
      >
        <div className="container-section relative">
          <SectionHeading
            id="method-heading"
            index="04"
            eyebrow="How we deliver"
            title="A methodology that removes surprises"
            lead="Six deliberate phases — the same discipline on every engagement, regardless of size."
          />

          <ol className="mt-12 grid grid-cols-1 gap-px border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
            {METHODOLOGY.map((phase) => (
              <MethodStepCard key={phase.step} phase={phase} />
            ))}
          </ol>
        </div>
      </section>

      {/* Start Project CTA */}
      <section aria-labelledby="cta-heading" className="cv-auto section-tight pt-6">
        <div className="container-section">
          <div className="relative overflow-hidden border-y border-border-subtle py-14 md:py-20">
            <div className="signal-bar absolute left-0 top-0 w-24" aria-hidden="true" />
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <h2 id="cta-heading" className="type-heading text-text-primary">
                  Have a project in mind?
                </h2>
                <p className="type-lead mt-5 max-w-xl text-text-secondary">
                  Tell us what you are building. We will reply with an honest
                  scope, timeline and next step.
                </p>
                <p className="mt-6 text-sm text-text-muted">
                  Prefer to browse first?{" "}
                  <Link
                    to="/projects"
                    className="font-semibold text-brand underline decoration-1 underline-offset-4 hover:text-brand-hover"
                  >
                    See all projects
                  </Link>
                </p>
              </div>
              <div className="md:col-span-5 md:flex md:justify-end">
                <Button to="/contact" size="lg" variant="primary" arrow>
                  Start Your Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

