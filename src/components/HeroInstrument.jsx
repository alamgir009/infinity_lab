/**
 * ============================================================================
 * HeroInstrument — Precision Orbital Visual Component
 * ============================================================================
 * Design Language: "Precision Instrument" (Swiss watch / astronomical ledger).
 * Hairlines, a planetary involute gear train, pure compositor GPU transforms (60fps).
 *
 * Performance Guarantees:
 * - Zero paint recalculations during continuous orbiting.
 * - Compositor-only layers with `will-change: transform` on the six gear layers.
 * - Zero React state or re-renders during animation.
 * - Tab visibility and viewport IntersectionObserver pause rotation via DOM data attribute.
 * - Aspect ratio 1:1 with inline SVG for zero Cumulative Layout Shift (CLS 0).
 *
 * Geometry & No-Overlap Invariant:
 * - Ring B radius R = 32.5cqw, card dimension = 31.5cqw x 10.5cqw (w/2 = 15.75, h/2 = 5.25).
 * - Clearance to center: minimum corner distance 15.90cqw >= logoRadius(10.5cqw) + 5cqw (5.40cqw clearance).
 * - Stage boundary clearance: 100cqw - 98.25cqw = 1.75cqw margin.
 * - Inter-card clearance: > 23cqw at 120° offsets.
 *
 * Responsive Adaptability:
 * - >= 440px container width: Full capability cards with 14px radius and dual-line typography.
 * - < 440px container width: 12cqw compact icon chips on the orbit + 3-item static legend below.
 * - Prefers-reduced-motion: All continuous and entrance animations disabled; cards fixed upright at -150°/-30°/90°.
 * ============================================================================
 */

import { memo, useRef, useEffect } from "react";
import { FiCode, FiCloud, FiSmartphone } from "react-icons/fi";
import markWebp from "../assets/brand/inf-lab-mark.webp";
import {
  GEAR,
  PLANET_POSITIONS,
  PLANET_BOX,
  CENTER,
  CARRIER_RADIUS,
  CARRIER_ARM_WIDTH,
  CARRIER_ARM_INNER,
  CARRIER_BOSS,
  CARRIER_PIN,
} from "./heroGearGeometry";
import "./HeroInstrument.css";

/**
 * Three core disciplines rendered on Ring B at 120° offsets:
 * Base angle: -150° with delays 0s, -32s, -64s on a 96s period (32s = 120°).
 */
const CAPABILITIES = [
  {
    icon: FiCode,
    title: "Web platforms",
    support: "Modern, scalable, secure",
  },
  {
    icon: FiCloud,
    title: "Cloud & backend",
    support: "Reliable & high performance",
  },
  {
    icon: FiSmartphone,
    title: "Mobile apps",
    support: "iOS & Android",
  },
];

/* ─── Planetary train: one crisp stroke per path, three non-scaling weights ── */
const STROKE = {
  vectorEffect: "non-scaling-stroke",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/** Ring gear: internal involute teeth, thick rim, bolt circle and three leaders. */
function RingGear() {
  const g = GEAR.ring;
  return (
    <svg
      className="orbital-part orbital-part--ring orbital-rot"
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={g.d}
        fill="var(--orbital-gear-fill)"
        fillRule="evenodd"
        className="orbital-line-1"
        {...STROKE}
      />
      <circle
        cx={g.cx}
        cy={g.cy}
        r={g.pitch}
        className="orbital-line-2"
        strokeDasharray="2 3"
        {...STROKE}
      />
      <circle
        cx={g.cx}
        cy={g.cy}
        r={g.root}
        className="orbital-line-2"
        strokeDasharray="1 4"
        {...STROKE}
      />
      <circle
        cx={g.cx}
        cy={g.cy}
        r={g.tip}
        className="orbital-line-2"
        strokeDasharray="1 4"
        {...STROKE}
      />
      <circle
        cx={g.cx}
        cy={g.cy}
        r={g.boltCircle}
        className="orbital-line-3"
        strokeDasharray="1 4"
        {...STROKE}
      />
      <path d={g.bolts} className="orbital-line-3" {...STROKE} />
      <path
        d={g.centerline}
        className="orbital-line-3"
        strokeDasharray="7 3 1 3"
        {...STROKE}
      />
      <path d={g.leaders} className="orbital-line-3" {...STROKE} />
    </svg>
  );
}

/** Sun gear: behind the hub, which acts as its cap. */
function SunGear() {
  const g = GEAR.sun;
  return (
    <svg
      className="orbital-part orbital-part--sun orbital-rot"
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={g.d}
        fill="var(--orbital-gear-fill)"
        className="orbital-line-1"
        {...STROKE}
      />
      <circle
        cx={g.cx}
        cy={g.cy}
        r={g.pitch}
        className="orbital-line-2"
        strokeDasharray="2 3"
        {...STROKE}
      />
      <circle
        cx={g.cx}
        cy={g.cy}
        r={g.root}
        className="orbital-line-2"
        strokeDasharray="1 4"
        {...STROKE}
      />
      <circle
        cx={g.cx}
        cy={g.cy}
        r={g.tip}
        className="orbital-line-2"
        strokeDasharray="1 4"
        {...STROKE}
      />
      <path d={g.holes} className="orbital-line-3" {...STROKE} />
      <circle
        cx={g.cx}
        cy={g.cy}
        r={g.bore}
        className="orbital-line-3"
        {...STROKE}
      />
      <path d={g.keyway} className="orbital-line-3" {...STROKE} />
      <path
        d={g.centerline}
        className="orbital-line-3"
        strokeDasharray="7 3 1 3"
        {...STROKE}
      />
    </svg>
  );
}

/** One planet: nested inside the carrier SVG, so it inherits carrier rotation. */
function PlanetGear({ position }) {
  const g = GEAR.planet;
  return (
    <svg
      className="orbital-planet"
      x={position.x}
      y={position.y}
      width={PLANET_BOX}
      height={PLANET_BOX}
      viewBox="-75 -75 150 150"
      fill="none"
      aria-hidden="true"
    >
      {/* Planet-local spin: rotates about the planet centre (0,0) only. */}
      <g className="orbital-planet-spin">
        <path
          d={g.d}
          fill="var(--orbital-gear-fill)"
          className="orbital-line-1"
          {...STROKE}
        />
        <circle
          cx="0"
          cy="0"
          r={g.pitch}
          className="orbital-line-2"
          strokeDasharray="2 3"
          {...STROKE}
        />
        <circle
          cx="0"
          cy="0"
          r={g.root}
          className="orbital-line-2"
          strokeDasharray="1 4"
          {...STROKE}
        />
        <circle
          cx="0"
          cy="0"
          r={g.tip}
          className="orbital-line-2"
          strokeDasharray="1 4"
          {...STROKE}
        />
        <circle
          cx="0"
          cy="0"
          r={g.bearing}
          className="orbital-line-2"
          {...STROKE}
        />
        <circle
          cx="0"
          cy="0"
          r={g.bearingInner}
          className="orbital-line-3"
          {...STROKE}
        />
        <path d={g.holes} className="orbital-line-3" {...STROKE} />
        <path
          d={g.centerline}
          className="orbital-line-3"
          strokeDasharray="7 3 1 3"
          {...STROKE}
        />
      </g>
    </svg>
  );
}

/** Carrier: three arms, three bosses and the only accent detail (three pins). */
function CarrierGear() {
  return (
    <svg
      className="orbital-part orbital-part--carrier orbital-rot"
      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"
    >
      {PLANET_POSITIONS.map((position) => (
        <PlanetGear key={position.angle} position={position} />
      ))}

      {PLANET_POSITIONS.map((position) => (
        <rect
          key={`arm-${position.angle}`}
          x={CENTER - CARRIER_ARM_WIDTH / 2}
          y={CENTER - CARRIER_RADIUS}
          width={CARRIER_ARM_WIDTH}
          height={CARRIER_RADIUS - CARRIER_ARM_INNER}
          rx={CARRIER_ARM_WIDTH / 2}
          transform={`rotate(${position.angle + 90} ${CENTER} ${CENTER})`}
          fill="var(--orbital-gear-fill)"
          className="orbital-line-1"
          {...STROKE}
        />
      ))}

      {PLANET_POSITIONS.map((position) => (
        <circle
          key={`boss-${position.angle}`}
          cx={position.x + PLANET_BOX / 2}
          cy={position.y + PLANET_BOX / 2}
          r={CARRIER_BOSS}
          fill="var(--orbital-gear-fill)"
          className="orbital-line-1"
          {...STROKE}
        />
      ))}

      {PLANET_POSITIONS.map((position) => (
        <circle
          key={`pin-${position.angle}`}
          cx={position.x + PLANET_BOX / 2}
          cy={position.y + PLANET_BOX / 2}
          r={CARRIER_PIN}
          className="orbital-pin"
          {...STROKE}
        />
      ))}
    </svg>
  );
}

/**
 * The only non-animated gear SVG: card track plus the r=65 hairline that is
 * fully occluded by the opaque sun surface. Everything else is a rotating layer.
 */
function GearStage() {
  return (
    <div className="orbital-gear-stage" aria-hidden="true">
      <svg
        className="orbital-static"
        viewBox="0 0 500 500"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="250"
          cy="250"
          r="65"
          className="orbital-line-3"
          {...STROKE}
        />
        <circle
          cx="250"
          cy="250"
          r={CARRIER_RADIUS}
          className="orbital-line-2"
          {...STROKE}
        />
      </svg>

      <RingGear />
      <SunGear />
      <CarrierGear />
    </div>
  );
}

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
      <div className="orbital-card-full hidden items-center gap-2.5 rounded-[14px] border px-3 py-2 sm:py-2.5">
        {/* Icon tile (8cqw, min 32px, max 40px, radius 10px, 1px border) */}
        <span
          aria-hidden="true"
          className="flex size-[8cqw] min-h-[32px] min-w-[32px] max-h-[40px] max-w-[40px] shrink-0 items-center justify-center rounded-[10px] border border-slate-900/5 bg-slate-50 text-[#4F46E5] dark:border-white/[0.08] dark:bg-[#1A1B23] dark:text-[#818CF8]"
        >
          <Icon size={16} />
        </span>

        {/* Text lockup */}
        <div className="min-w-0 flex-1">
          <div className="orbital-card-title truncate font-semibold leading-tight text-[#0B0B0F] dark:text-[#F5F6F8]">
            {card.title}
          </div>
          <div className="orbital-card-support mt-0.5 truncate leading-tight text-[#5B606B] dark:text-[#9AA0AC]">
            {card.support}
          </div>
        </div>
      </div>

      {/* ── Mobile Compact Chip (container width < 440px) ─────────── */}
      <div
        className="orbital-card-chip hidden items-center justify-center rounded-full border"
        aria-label={card.title}
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

const HeroInstrument = memo(function HeroInstrument({ className = "" }) {
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
          <GearStage />
        </div>

        {/* ── Cards Entrance Wrapper (700ms ease-out, 90ms stagger) ─── */}
        <div className="orbital-entrance-cards pointer-events-none absolute inset-0">
          {/* 3 Arms: Cards on Ring B (R=32.5cqw, 120° spacing) */}
          {CAPABILITIES.map((card, idx) => (
            <div
              key={card.title}
              className={`orbital-arm orbital-arm-${idx} pointer-events-none absolute inset-0`}
            >
              {/* Card node anchor at Ring B (r=32.5cqw) */}
              <div className="orbital-card-anchor pointer-events-auto absolute top-1/2">
                {/* Counter-rotation to keep card 100% upright */}
                <div className="orbital-card-counter will-change-transform">
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

export default HeroInstrument;
