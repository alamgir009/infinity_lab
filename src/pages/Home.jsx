import { useRef, useState, useLayoutEffect, forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiCheckSquare,
  FiCloud,
  FiCode,
  FiRefreshCw,
  FiPenTool,
  FiSearch,
  FiSmartphone,
  FiUploadCloud,
  FiCalendar,
  FiBox,
  FiUsers,
} from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import Seo from "../components/Seo";
import Button from "../components/Button";
import Card from "../components/ui/Card";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import StatStrip from "../components/ui/StatStrip";
import { SERVICES, METHODOLOGY } from "../data/services";
import { PROJECTS } from "../data/projects";
import { SITE } from "../data/siteConfig";

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


/**
 * Fintech-grade hero visual (Cloudflare & Google Cloud engineering aesthetic):
 * Central core medallion with the brand infinity emblem, surrounded by precision
 * concentric telemetry orbits and active egress nodes. Precision vector paths with
 * animated live data-stream pulses and directional stealth arrowheads connect the
 * central hub seamlessly to the 3 service cards: Web platforms, Cloud & backend,
 * and Mobile apps.
 *
 * All coordinates are dynamically tracked via ResizeObserver and mapped to the SVG
 * viewBox, guaranteeing 100% pixel-perfect docking alignment across all viewports
 * and resolutions with zero layout shift.
 */
const C = 200;
const R_MEDALLION = 74;
const R_INNER = 94;
const R_SOLID = 118;
const R_DOT = 152;

/* Smooth lemniscate (Bernoulli) sampled as a closed polyline — a true
   infinity weave with a diagonal crossover, scaled for 400x400 viewBox. */
const LEMNISCATE = (() => {
  const N = 96;
  const a = 44;      // balanced emblem in 400 viewBox
  const ys = 1.35;   // vertical stretch for natural loop aspect
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const d = 1 + Math.sin(t) ** 2;
    pts.push(`${((a * Math.cos(t)) / d).toFixed(2)} ${(((a * Math.sin(t) * Math.cos(t)) / d) * ys).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
})();

function OrbitRings({ docks }) {
  // Pre-calibrated initial fallback coordinates ensure zero-jump rendering
  const targetWeb = { x: docks?.web?.x ?? 136, y: docks?.web?.y ?? 92 };
  const targetCloud = { x: docks?.cloud?.x ?? 265, y: docks?.cloud?.y ?? 188 };
  const targetMobile = { x: docks?.mobile?.x ?? 136, y: docks?.mobile?.y ?? 308 };

  // Origin nodes on the orbital routing mesh:
  const nodeWeb = { x: 172, y: 145 };
  const nodeMobile = { x: 172, y: 255 };
  const nodeCloud = { x: 262, y: 200 };

  // Secondary telemetry nodes for architectural depth (fintech network topology)
  const TELEMETRY_NODES = [
    { x: 114, y: 148, r: 3.5 },
    { x: 114, y: 252, r: 3.5 },
    { x: 200, y: 82, r: 3 },
    { x: 200, y: 318, r: 3 },
    { x: 286, y: 148, r: 3 },
    { x: 286, y: 252, r: 3 },
  ];

  // Straight angular routing — fintech-grade elbow paths (no curves).
  // Each route leaves the orbit node horizontally, then turns at a right-angle
  // elbow to reach the card dock pin in a clean L-shape.

  // Web (top-left card): go left horizontally, then angle up-left to dock
  const webElbowX = targetWeb.x + 18;
  const pathWeb = `M ${nodeWeb.x} ${nodeWeb.y} L ${webElbowX} ${nodeWeb.y} L ${targetWeb.x + 5} ${targetWeb.y}`;

  // Mobile (bottom-left card): go left horizontally, then angle down-left to dock
  const mobileElbowX = targetMobile.x + 18;
  const pathMobile = `M ${nodeMobile.x} ${nodeMobile.y} L ${mobileElbowX} ${nodeMobile.y} L ${targetMobile.x + 5} ${targetMobile.y}`;

  // Cloud (right card): go right horizontally, then angle to dock
  const cloudElbowX = targetCloud.x - 18;
  const pathCloud = `M ${nodeCloud.x} ${nodeCloud.y} L ${cloudElbowX} ${nodeCloud.y} L ${targetCloud.x - 5} ${targetCloud.y}`;

  return (
    <svg viewBox="0 0 400 400" className="pointer-events-none h-full w-full overflow-visible">
      <defs>
        <linearGradient id="hv-grad" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style={{ stopColor: "var(--hv-orbit-a)" }} />
          <stop offset="100%" style={{ stopColor: "var(--hv-orbit-b)" }} />
        </linearGradient>
        <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0.18" />
          <stop offset="65%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0.04" />
          <stop offset="100%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hv-node" cx="35%" cy="30%" r="75%">
          <stop offset="0%" style={{ stopColor: "var(--hv-node-hi)" }} />
          <stop offset="100%" style={{ stopColor: "var(--hv-node-lo)" }} />
        </radialGradient>
      </defs>

      {/* Ambient radial glow */}
      <circle cx={C} cy={C} r="185" fill="url(#hv-glow)" />

      {/* Primary solid orbit & inner telemetry hairlines */}
      <circle cx={C} cy={C} r={R_SOLID} fill="none" stroke="url(#hv-grad)" strokeOpacity="0.75" strokeWidth="1.75" />
      <circle cx={C} cy={C} r={R_INNER} fill="none" stroke="url(#hv-grad)" strokeOpacity="0.32" strokeWidth="1" strokeDasharray="3 5" />

      {/* Slowly rotating dotted telemetry radar ring */}
      <g className="hv-orbit-spin">
        <circle
          cx={C} cy={C} r={R_DOT}
          fill="none" stroke="url(#hv-grad)" strokeOpacity="0.5"
          strokeWidth="1.3" strokeDasharray="2 10" strokeLinecap="round"
        />
      </g>

      {/* Secondary telemetry nodes on orbital tracks */}
      {TELEMETRY_NODES.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.r} fill="url(#hv-node)" opacity="0.85" />
      ))}

      {/* Central medallion: illuminated disc with layered hairlines & soft depth */}
      <g style={{ filter: "drop-shadow(0 14px 28px var(--hv-medallion-shadow))" }}>
        <circle cx={C} cy={C} r={R_MEDALLION} fill="var(--hv-medallion)" />
      </g>
      <circle cx={C} cy={C} r={R_MEDALLION} fill="none" stroke="var(--hv-medallion-ring)" strokeWidth="1" />
      <circle cx={C} cy={C} r="62" fill="none" stroke="var(--hv-medallion-ring)" strokeOpacity="0.7" strokeWidth="1" />

      {/* The brand infinity emblem: mathematically smooth Bernoulli lemniscate */}
      <g transform={`translate(${C} ${C})`}>
        <path
          d={LEMNISCATE}
          stroke="url(#hv-grad)" strokeOpacity="0.16" strokeWidth="16"
          strokeLinejoin="round" strokeLinecap="round" fill="none"
        />
        <path
          d={LEMNISCATE}
          stroke="url(#hv-grad)" strokeWidth="7" strokeLinejoin="round" fill="none"
        />
      </g>


      {/* Connected Arrows Section (Desktop/Tablet sm+):
          Precision vector routes linking core nodes to each service card */}
      <g className="hv-connectors">
        {/* --- Route 1: Web Platforms (Top Left) --- */}
        <g>
          {/* Egress node on core orbit */}
          <circle cx={nodeWeb.x} cy={nodeWeb.y} r="7" fill="none" stroke="var(--hv-node-lo)" strokeWidth="1" strokeOpacity="0.35" className="animate-pulse" />
          <circle cx={nodeWeb.x} cy={nodeWeb.y} r="4" fill="url(#hv-node)" />

          {/* Base connector line */}
          <path d={pathWeb} fill="none" stroke="var(--hv-connector)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Live data pulse packet */}
          <path d={pathWeb} fill="none" stroke="var(--hv-pulse)" strokeWidth="2" strokeDasharray="6 24" strokeLinecap="round" className="hv-data-flow" opacity="0.9" />

          {/* Stealth fintech arrowhead pointing directly into card dock pin */}
          <polygon
            points={`${targetWeb.x},${targetWeb.y} ${targetWeb.x + 8},${targetWeb.y - 4.5} ${targetWeb.x + 5.5},${targetWeb.y} ${targetWeb.x + 8},${targetWeb.y + 4.5}`}
            fill="var(--hv-arrow)"
          />
        </g>

        {/* --- Route 2: Mobile Apps (Bottom Left) --- */}
        <g>
          {/* Egress node on core orbit */}
          <circle cx={nodeMobile.x} cy={nodeMobile.y} r="7" fill="none" stroke="var(--hv-node-lo)" strokeWidth="1" strokeOpacity="0.35" className="animate-pulse" />
          <circle cx={nodeMobile.x} cy={nodeMobile.y} r="4" fill="url(#hv-node)" />

          {/* Base connector line */}
          <path d={pathMobile} fill="none" stroke="var(--hv-connector)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Live data pulse packet */}
          <path d={pathMobile} fill="none" stroke="var(--hv-pulse)" strokeWidth="2" strokeDasharray="6 24" strokeLinecap="round" className="hv-data-flow" opacity="0.9" />

          {/* Stealth fintech arrowhead pointing directly into card dock pin */}
          <polygon
            points={`${targetMobile.x},${targetMobile.y} ${targetMobile.x + 8},${targetMobile.y - 4.5} ${targetMobile.x + 5.5},${targetMobile.y} ${targetMobile.x + 8},${targetMobile.y + 4.5}`}
            fill="var(--hv-arrow)"
          />
        </g>

        {/* --- Route 3: Cloud & Backend (Right) --- */}
        <g>
          {/* Egress node on core orbit */}
          <circle cx={nodeCloud.x} cy={nodeCloud.y} r="7" fill="none" stroke="var(--hv-node-lo)" strokeWidth="1" strokeOpacity="0.35" className="animate-pulse" />
          <circle cx={nodeCloud.x} cy={nodeCloud.y} r="4" fill="url(#hv-node)" />

          {/* Base connector line */}
          <path d={pathCloud} fill="none" stroke="var(--hv-connector)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Live data pulse packet */}
          <path d={pathCloud} fill="none" stroke="var(--hv-pulse)" strokeWidth="2" strokeDasharray="6 24" strokeLinecap="round" className="hv-data-flow" opacity="0.9" />

          {/* Stealth fintech arrowhead pointing directly into card dock pin */}
          <polygon
            points={`${targetCloud.x},${targetCloud.y} ${targetCloud.x - 8},${targetCloud.y - 4.5} ${targetCloud.x - 5.5},${targetCloud.y} ${targetCloud.x - 8},${targetCloud.y + 4.5}`}
            fill="var(--hv-arrow)"
          />
        </g>
      </g>
    </svg>
  );
}

/** Floating service card anchored over the illustration (decorative).
 *  Compacts automatically in the 1024–1279px range so the right-hand card
 *  never clips against the viewport edge; full size from xl up.
 *  Includes hardware docking port pin for connecting arrows. */
function OrbitCard({ icon: Icon, title, support, className, dockSide, dockRef }) {
  return (
    <div
      className={`z-10 flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface-card/95 py-2.5 pl-2.5 pr-4 shadow-card backdrop-blur-sm transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover lg:gap-2 lg:py-2 lg:pl-2 lg:pr-3 dark:border-white/15 dark:bg-surface-card/90 dark:shadow-none dark:hover:border-white/30 xl:gap-3 xl:py-2.5 xl:pl-2.5 xl:pr-4 ${className}`}
    >
      {/* Dock pin on left if dockSide === 'left' */}
      {dockSide === "left" && (
        <span
          ref={dockRef}
          aria-hidden="true"
          className="pointer-events-none absolute -left-1.5 top-1/2 hidden size-3 -translate-y-1/2 items-center justify-center sm:flex"
        >
          <span className="size-2 rounded-full border border-brand bg-white shadow-xs dark:border-accent-gold dark:bg-surface-card" />
        </span>
      )}

      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-chip text-brand lg:size-7 dark:bg-white/10 dark:text-accent-gold xl:size-9">
        <Icon size={16} aria-hidden="true" className="size-4 lg:size-3.5 xl:size-4" />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap text-sm font-bold leading-5 text-text-primary lg:text-[13px] lg:leading-4 dark:text-white xl:text-sm xl:leading-5">
          {title}
        </span>
        <span className="block whitespace-nowrap text-[11px] leading-4 text-text-secondary lg:text-[10px] lg:leading-3.5 dark:text-white/60 xl:text-[11px] xl:leading-4">
          {support}
        </span>
      </span>

      {/* Dock pin on right if dockSide === 'right' */}
      {dockSide === "right" && (
        <span
          ref={dockRef}
          aria-hidden="true"
          className="pointer-events-none absolute -right-1.5 top-1/2 hidden size-3 -translate-y-1/2 items-center justify-center sm:flex"
        >
          <span className="size-2 rounded-full border border-brand bg-white shadow-xs dark:border-accent-gold dark:bg-surface-card" />
        </span>
      )}
    </div>
  );
}

function HeroVisual() {
  const containerRef = useRef(null);
  const dockWebRef = useRef(null);
  const dockCloudRef = useRef(null);
  const dockMobileRef = useRef(null);

  // Exact coordinates mapped to 400x400 viewBox.
  // Pre-calibrated initial fallback coordinates ensure zero layout shift before first paint:
  const [docks, setDocks] = useState({
    web: { x: 136, y: 92 },
    cloud: { x: 265, y: 188 },
    mobile: { x: 136, y: 308 },
  });

  useLayoutEffect(() => {
    const updateDocks = () => {
      if (!containerRef.current) return;
      const cont = containerRef.current.getBoundingClientRect();
      if (!cont.width || !cont.height) return;

      const toSvg = (clientX, clientY) => ({
        x: ((clientX - cont.left) / cont.width) * 400,
        y: ((clientY - cont.top) / cont.height) * 400,
      });

      const next = {};
      if (dockWebRef.current) {
        const r = dockWebRef.current.getBoundingClientRect();
        next.web = toSvg(r.left + r.width / 2, r.top + r.height / 2);
      }
      if (dockCloudRef.current) {
        const r = dockCloudRef.current.getBoundingClientRect();
        next.cloud = toSvg(r.left + r.width / 2, r.top + r.height / 2);
      }
      if (dockMobileRef.current) {
        const r = dockMobileRef.current.getBoundingClientRect();
        next.mobile = toSvg(r.left + r.width / 2, r.top + r.height / 2);
      }

      setDocks((prev) => ({ ...prev, ...next }));
    };

    updateDocks();
    const raf = requestAnimationFrame(updateDocks);
    window.addEventListener("resize", updateDocks);
    const ro = new ResizeObserver(updateDocks);
    ro.observe(containerRef.current);
    if (dockWebRef.current) ro.observe(dockWebRef.current);
    if (dockCloudRef.current) ro.observe(dockCloudRef.current);
    if (dockMobileRef.current) ro.observe(dockMobileRef.current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateDocks);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative" aria-hidden="true">
      <div
        ref={containerRef}
        className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-[340px] xl:max-w-[420px]"
      >
        {/* Soft rounded backdrop panel behind the illustration */}
        <div className="pointer-events-none absolute inset-[3%] rounded-[2rem] border border-border-subtle bg-gradient-to-br from-blue-50/70 via-white/10 to-white/20 shadow-card-hover dark:border-white/10 dark:from-white/[0.05] dark:via-white/[0.02] dark:to-transparent dark:shadow-none" />

        {/* Orbital illustration (rings, medallion, nodes, and fintech connected arrows) */}
        <OrbitRings docks={docks} />

        {/* Desktop/tablet: floating service cards over the illustration */}
        <OrbitCard
          icon={FiCode}
          title="Web platforms"
          support="Modern, scalable, secure"
          dockSide="right"
          dockRef={dockWebRef}
          className="absolute left-[-9%] top-[20%] hidden sm:flex"
        />
        <OrbitCard
          icon={FiCloud}
          title="Cloud &amp; backend"
          support="Reliable &amp; high performance"
          dockSide="left"
          dockRef={dockCloudRef}
          className="absolute left-[78%] top-[38%] hidden sm:flex lg:left-[68%] xl:left-[72%]"
        />
        <OrbitCard
          icon={FiSmartphone}
          title="Mobile apps"
          support="iOS &amp; Android"
          dockSide="right"
          dockRef={dockMobileRef}
          className="absolute left-[-9%] top-[64%] hidden sm:flex"
        />
      </div>

      {/* Mobile: cards stack statically below the illustration (no connectors) */}
      <div className="mx-auto mt-2 grid max-w-[420px] gap-3 sm:hidden">
        <OrbitCard icon={FiCode} title="Web platforms" support="Modern, scalable, secure" className="" />
        <OrbitCard icon={FiCloud} title="Cloud &amp; backend" support="Reliable &amp; high performance" className="" />
        <OrbitCard icon={FiSmartphone} title="Mobile apps" support="iOS &amp; Android" className="" />
      </div>
    </div>
  );
}

/* Icon lookup for METHODOLOGY steps (the data stores string keys, matching
   the SERVICES pattern). */
const METHOD_ICONS = {
  search: FiSearch,
  pen: FiPenTool,
  code: FiCode,
  check: FiCheckSquare,
  upload: FiUploadCloud,
  life: FiRefreshCw,
};

/**
 * Circular node marking a connector endpoint: a brand hairline ring on a
 * card-token disc with a solid brand dot centred inside. Decorative, and
 * desktop-only (connectors render only on the 3-column grid at lg+).
 */
function MethodNode({ className }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-10 hidden size-3.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand/50 bg-surface-card lg:flex ${className}`}
    >
      <span className="block size-2 rounded-full bg-brand" />
    </span>
  );
}

/**
 * Delivery-phase step card (Cloudflare/Google style): compact, opaque,
 * theme-aware card on the brand band — circular icon chip + quiet step
 * number on one top line, title, blurb, and a checklist pinned to the card
 * bottom (`mt-auto`) so every card in a row shares one aligned divider.
 * Cards fill their grid cell (`h-full`), keeping row heights consistent.
 *
 * `connector` (desktop only, purely decorative CSS, aria-hidden):
 *  - "next":   hairline through the grid gap + end nodes into the next card.
 *  - "return": the card 3 → card 4 hand-off — a stub leaves the card's
 *    bottom edge, a hairline runs along the row-gap midline (symmetric about
 *    the grid: card centre to card centre), then drops into the next row's
 *    first card. Geometry assumes the 24px (gap-6) grid gap.
 */
function MethodStepCard({ phase, connector = "none" }) {
  const Icon = METHOD_ICONS[phase.icon] ?? FiCode;
  return (
    <li className="relative">
      <Card interactive className="h-full">
        {/* Brand hairline accent on hover (matches ServiceCard) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand/0 via-brand to-brand/0 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
        />
        <div className="flex h-full flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-chip text-brand-chip-text ring-1 ring-inset ring-brand/15 dark:bg-white/10 dark:text-accent-gold dark:ring-white/15">
              <Icon size={16} aria-hidden="true" />
            </span>
            <span
              aria-hidden="true"
              className="font-display text-xs font-semibold tracking-[0.2em] text-text-on-brand-muted"
            >
              {String(phase.step).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-4 text-base font-bold text-text-on-brand">{phase.name}</h3>
          <p className="mb-4 mt-2 text-sm leading-6 text-text-on-brand-muted">
            {phase.description}
          </p>
          <ul className="mt-auto space-y-2 border-t border-border-subtle pt-4 text-[13px] leading-5 dark:border-white/10">
            {phase.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <FiCheckCircle
                  aria-hidden="true"
                  className="mt-[3px] size-3.5 shrink-0 text-brand dark:text-accent-gold"
                />
                <span className="text-text-on-brand-muted">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Hairline + end nodes to the next card in the row (desktop). */}
      {connector === "next" && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-full top-1/2 hidden h-px w-6 bg-[var(--hv-connector)] lg:block"
          />
          <MethodNode className="left-full top-1/2" />
          <MethodNode className="left-[calc(100%_+_24px)] top-1/2" />
        </>
      )}

      {/* Row transition: card 3 hands off to card 4 (desktop). */}
      {connector === "return" && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1/2 top-full hidden h-3 w-3 rounded-br-[8px] border-b border-r lg:block"
            style={{ borderColor: "var(--hv-connector)" }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[calc(-150%_-_36px)] right-[calc(50%_+_12px)] top-[calc(100%_+_11px)] hidden h-px bg-[var(--hv-connector)] lg:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[calc(-150%_-_48px)] top-[calc(100%_+_11px)] hidden h-[13px] w-3 rounded-tl-[8px] border-l border-t lg:block"
            style={{ borderColor: "var(--hv-connector)" }}
          />
          <MethodNode className="left-1/2 top-full" />
          <MethodNode className="left-[calc(-150%_-_48px)] top-[calc(100%_+_24px)]" />
        </>
      )}
    </li>
  );
}

export default function Home() {
  const flagship = PROJECTS.filter((p) => p.verified).slice(0, 3);

  return (
    <>
      <Seo
        title="Infinity Lab — Software Engineering Company (Est. 2016)"
        description={SITE.description}
        path="/"
      />

      {/* Hero — theme-aware brand surface. Light: clean white Cloudflare/Google
          style. Dark: navy surface. The visual renders in BOTH themes with
          theme differences expressed in CSS only. */}
      <section className="bg-brand-deep relative overflow-hidden">
        <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-section relative grid items-center gap-10 pt-8 pb-14 md:pt-12 md:pb-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="type-display font-display text-text-on-brand dark:text-white">
              Ten years of shipping systems<br />
              <span className="text-brand dark:text-white/60">that stay up and scale.</span>
            </h1>
            <p className="container-text mt-6 text-lg leading-8 text-text-on-brand-muted">
              Infinity Lab designs, builds and operates news portals, institutional platforms, management systems and mobile apps for teams across India.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
              <Button to="/contact" size="lg" variant="inverse" arrow className="w-full sm:w-auto">
                Start your project
              </Button>
              <Button to="/projects" size="lg" variant="secondary-inverse" className="w-full sm:w-auto">
                See our work
              </Button>
            </div>
          </div>
          <div className="animate-fadeUp">
            <HeroVisual />
          </div>
        </div>

        {/* Trust metrics ribbon */}
        <div className="relative ">
          <div className="container-section py-10 sm:py-12">
            <StatStrip stats={STATS} />
          </div>
        </div>
      </section>

      {/* Company story */}
      <section aria-labelledby="story-heading" className="py-16 md:py-24">
        <div className="container-section">
          <SectionHeading
            id="story-heading"
            eyebrow="Who we are"
            title={`An engineering company since ${SITE.founded}`}
            lead="Infinity Lab started with a simple conviction: software that people depend on should be built with care, honesty and attention to detail."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="container-text space-y-5 text-base leading-7 text-text-secondary md:text-lg md:leading-8">
              <p className="text-lg leading-8 text-text-primary">
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
            <div className="rounded-card border border-border-subtle bg-surface-sunken p-6 sm:p-8">
              <h3 className="text-base font-bold text-text-primary">
                What that means in practice
              </h3>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-text-secondary">
                {[
                  "Honest scope and timelines — no overpromising",
                  "Accessibility and performance treated as requirements, not extras",
                  "Operational support after launch, not abandonment",
                  "Clear documentation so your team is never locked out",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FiCheckCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
                    <span className="text-text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section
        aria-labelledby="services-heading"
        className="border-y border-border-subtle bg-surface-sunken py-16 md:py-24"
      >
        <div className="container-section">
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title="Three disciplines, one accountable team"
            lead="We cover the full delivery surface — interface, server, and device — so you never have to chase three vendors for one product."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/services" variant="secondary" size="md">
              Explore services in detail
            </Button>
          </div>
        </div>
      </section>

      {/* Flagship projects */}
      <section aria-labelledby="projects-heading" className="py-16 md:py-24">
        <div className="container-section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="projects-heading"
              eyebrow="Flagship work"
              title="Platforms in production"
              lead="A selection of live builds, from regional news publishing to campus ERP and e-commerce."
            />
            <Button to="/projects" variant="secondary" size="md" className="hidden sm:inline-flex">
              All projects
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {flagship.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Button to="/projects" variant="secondary" size="md">
              All projects
            </Button>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section
        aria-labelledby="method-heading"
        className="bg-brand-deep relative overflow-hidden py-16 md:py-24"
      >
        <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-section relative">
          <SectionHeading
            id="method-heading"
            eyebrow="How we deliver"
            title="A methodology that removes surprises"
            lead="Six deliberate phases — the same discipline on every engagement, regardless of size."
            onBrand
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {METHODOLOGY.map((phase, i) => {
              // Desktop 3-col flow: in-row links on 1→2, 2→3, 4→5 and the
              // dedicated 3→4 row return; the rest are row ends.
              const connector =
                i % 3 !== 2 && i < METHODOLOGY.length - 1
                  ? "next"
                  : i === 2
                    ? "return"
                    : "none";
              return (
                <MethodStepCard key={phase.step} phase={phase} connector={connector} />
              );
            })}
          </ol>
        </div>
      </section>

      {/* Start Project CTA */}
      <section aria-labelledby="cta-heading" className="py-16 md:py-24">
        <div className="container-section">
          <div className="bg-brand-deep relative overflow-hidden rounded-[1.25rem] border border-border-subtle px-6 py-14 text-center shadow-card sm:px-12 md:py-16 dark:border-transparent dark:shadow-none">
            <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <h2 id="cta-heading" className="type-heading text-text-on-brand md:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-text-on-brand-muted">
                Tell us what you are building. We will reply with an honest
                scope, timeline and next step.
              </p>
              <Button to="/contact" size="lg" variant="inverse" className="mt-8">
                Start Your Project
              </Button>
              <p className="mt-6 text-sm text-text-on-brand-muted">
                Prefer to browse first?{" "}
                <Link
                  to="/projects"
                  className="font-semibold text-brand dark:text-accent-gold underline underline-offset-4 hover:no-underline"
                >
                  See all projects
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
