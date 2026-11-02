import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

/** The three disciplines, stated exactly as the hero always has. */
const CAPABILITIES = [
  {
    icon: FiCode,
    title: "Web platforms",
    support: "Modern, scalable, secure",
    angleDeg: -150,
  },
  {
    icon: FiCloud,
    title: "Cloud & backend",
    support: "Reliable & high performance",
    angleDeg: -30,
  },
  {
    icon: FiSmartphone,
    title: "Mobile apps",
    support: "iOS & Android",
    angleDeg: 90,
  },
];

/**
 * 3 nodes at 120° spacing on shared orbit radius R = 32.5cqw.
 * In a 500x500 coordinate space (center 250, 250):
 * - Node 0 (-150°): cos = -0.866, sin = -0.5  -> left: calc(50% - 28.15cqw), top: calc(50% - 16.25cqw)
 * - Node 1 (-30°):  cos = +0.866, sin = -0.5  -> left: calc(50% + 28.15cqw), top: calc(50% - 16.25cqw)
 * - Node 2 (90°):   cos = 0,      sin = +1.0  -> left: 50%,                 top: calc(50% + 32.5cqw)
 */
const ORBITAL_NODES = [
  {
    ...CAPABILITIES[0],
    left: "calc(50% - 28.15cqw)",
    top: "calc(50% - 16.25cqw)",
    x1: 203,
    y1: 223,
    x2: 138,
    y2: 185,
  },
  {
    ...CAPABILITIES[1],
    left: "calc(50% + 28.15cqw)",
    top: "calc(50% - 16.25cqw)",
    x1: 297,
    y1: 223,
    x2: 362,
    y2: 185,
  },
  {
    ...CAPABILITIES[2],
    left: "50%",
    top: "calc(50% + 32.5cqw)",
    x1: 250,
    y1: 304,
    x2: 250,
    y2: 378,
  },
];

/**
 * Orbital Capability Card:
 * - Desktop/tablet (≥640px): full glass card with 1px hairline border, brand icon tile,
 *   600-weight title and high-contrast muted subtitle.
 * - Mobile (<640px): compact 44px icon-only glass chip with aria-label + visible label below.
 */
function OrbitalCard({ icon: Icon, title, support }) {
  return (
    <div
      role="group"
      tabIndex={0}
      aria-label={`${title}: ${support}`}
      className="group relative select-none rounded-[6px] transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 hover:scale-[1.02]"
    >
      {/* ── Desktop & Tablet Card (≥640px) ─────────────────────────── */}
      <div className="hidden sm:flex items-center gap-2.5 rounded-[6px] border border-slate-200/90 bg-white/80 px-3 py-2.5 shadow-[0_8px_30px_-12px_rgba(30,27,75,0.18)] backdrop-blur-md transition-colors duration-200 hover:border-slate-300 dark:border-white/10 dark:bg-[#14151A]/80 dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] dark:hover:border-white/20 sm:w-[34cqw] sm:min-w-[164px] sm:max-w-[188px]">
        {/* Brand-tinted icon tile */}
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-[4px] border border-indigo-200/60 bg-gradient-to-br from-indigo-50 to-purple-100/70 text-indigo-700 dark:border-indigo-400/20 dark:from-indigo-950/70 dark:to-purple-900/40 dark:text-indigo-300"
        >
          <Icon size={15} />
        </span>

        {/* Text lockup */}
        <span className="min-w-0">
          <span className="block truncate text-[12.5px] font-semibold leading-tight tracking-[-0.01em] text-[#0B0B0F] dark:text-[#F5F6F8]">
            {title}
          </span>
          <span className="mt-0.5 block truncate text-[10.5px] leading-tight text-[#5B606B] dark:text-[#9AA0AC]">
            {support}
          </span>
        </span>
      </div>

      {/* ── Mobile Compact Chip (<640px) ───────────────────────────── */}
      <div className="flex sm:hidden flex-col items-center justify-center">
        <div className="flex size-11 items-center justify-center rounded-full border border-slate-200/90 bg-white/85 text-indigo-700 shadow-[0_6px_20px_-6px_rgba(30,27,75,0.22)] backdrop-blur-md transition-colors dark:border-white/15 dark:bg-[#14151A]/85 dark:text-indigo-300 dark:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <span
            aria-hidden="true"
            className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-purple-100/80 dark:from-indigo-950/70 dark:to-purple-900/40"
          >
            <Icon size={16} />
          </span>
        </div>
        <span
          aria-hidden="true"
          className="hidden xs:block mt-1 max-w-[76px] truncate text-center text-[9.5px] font-medium leading-tight text-[#0B0B0F] dark:text-[#F5F6F8]"
        >
          {title}
        </span>
      </div>
    </div>
  );
}

/**
 * Fintech-grade Orbital Instrument:
 * - Single square container sized proportionally via container queries (cqw).
 * - Exact center: logo disc (20cqw) with brand gradient glow and subtle pulse, z-20.
 * - 3 concentric rings (inner dotted, mid hairline, outer dotted) with token strokes.
 * - Rotating conic sweep on mid ring.
 * - 4 satellites on inner/outer rings at different speeds and directions (40s, -70s, 90s, -50s).
 * - 3 capability cards spaced at 120° on shared radius R = 32.5cqw rotating clockwise (60s),
 *   counter-rotating counter-clockwise (-60s) so text remains upright.
 * - Strict No-Overlap Rule: R - cardWidth/2 >= logoRadius + 8px at every angle.
 * - Rotation pauses on hover/focus-within and when tab is hidden.
 * - Reduced motion safe: animations disabled, cards fixed at -150°/-30°/90°.
 */
function HeroInstrument() {
  const [isTabHidden, setIsTabHidden] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      setIsTabHidden(document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const isPaused = isTabHidden;

  return (
    <div
      className="orbital-container relative mx-auto aspect-square w-full max-w-[480px] sm:max-w-[540px] select-none"
      style={{ aspectRatio: "1 / 1" }}
    >
      {/* ── 1. Concentric Rings (Concentric at exact center 250, 250) ── */}
      <svg
        viewBox="0 0 500 500"
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        fill="none"
        aria-hidden="true"
      >
        {/* Outer dotted ring: r = 220 (44cqw) */}
        <circle
          cx="250"
          cy="250"
          r="220"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 7"
          className="text-slate-900/[0.15] dark:text-white/10"
        />

        {/* Mid solid hairline ring: r = 162.5 (32.5cqw) */}
        <circle
          cx="250"
          cy="250"
          r="162.5"
          stroke="currentColor"
          strokeWidth="1"
          className="text-slate-900/[0.15] dark:text-white/10"
        />

        {/* Inner dotted ring: r = 110 (22cqw) */}
        <circle
          cx="250"
          cy="250"
          r="110"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="1.5 5"
          className="text-slate-900/[0.15] dark:text-white/10"
        />
      </svg>

      {/* ── 2. Faint rotating sweep on mid ring ─────────────────────── */}
      <div
        className="orbital-rotates pointer-events-none absolute inset-0 will-change-transform"
        style={{
          animation: "orbit-spin 25s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 500 500" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="orbit-mid-sweep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#2f4bff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="250"
            cy="250"
            r="162.5"
            stroke="url(#orbit-mid-sweep)"
            strokeWidth="1.5"
            strokeDasharray="85 255"
          />
        </svg>
      </div>

      {/* ── 3. Satellites on inner & outer rings ───────────────────── */}
      {/* Sat 1: Inner ring (22cqw), 40s clockwise */}
      <div
        className="orbital-rotates pointer-events-none absolute inset-0 will-change-transform"
        style={{
          animation: "orbit-spin 40s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-[calc(50%-22cqw)] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/80 shadow-[0_0_6px_rgba(55,48,163,0.7)] dark:bg-brand dark:shadow-[0_0_8px_rgba(165,180,252,0.8)]" />
      </div>

      {/* Sat 2: Outer ring (44cqw), 70s counter-clockwise (-70s) */}
      <div
        className="orbital-rotates pointer-events-none absolute inset-0 will-change-transform"
        style={{
          animation: "orbit-counter-spin 70s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        aria-hidden="true"
      >
        <span className="absolute left-[calc(50%+44cqw)] top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400/80 shadow-[0_0_6px_rgba(148,163,184,0.5)] dark:bg-white/60 dark:shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
      </div>

      {/* Sat 3: Outer ring (44cqw), 90s clockwise */}
      <div
        className="orbital-rotates pointer-events-none absolute inset-0 will-change-transform"
        style={{
          animation: "orbit-spin 90s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-[calc(50%+44cqw)] size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400/60 dark:bg-white/40" />
      </div>

      {/* Sat 4: Inner ring (22cqw), 50s counter-clockwise */}
      <div
        className="orbital-rotates pointer-events-none absolute inset-0 will-change-transform"
        style={{
          animation: "orbit-counter-spin 50s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        aria-hidden="true"
      >
        <span className="absolute left-[calc(50%-22cqw)] top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#db2777]/70 shadow-[0_0_6px_rgba(219,39,119,0.5)] dark:bg-[#f472b6]/70" />
      </div>

      {/* ── 4. Center Logo Disc (~20cqw, z-20 above rings and connectors) ── */}
      <div
        className="absolute left-1/2 top-1/2 z-20 flex size-[20cqw] min-h-[64px] min-w-[64px] max-h-[110px] max-w-[110px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 shadow-[0_4px_24px_-4px_rgba(55,48,163,0.18),0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-md dark:border-white/15 dark:bg-[#14151a]/90 dark:shadow-[0_8px_32px_-6px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
        aria-hidden="true"
      >
        {/* Soft brand-gradient glow with subtle pulse */}
        <div
          className="orbital-rotates pointer-events-none absolute -inset-3 rounded-full bg-gradient-to-tr from-[#2f4bff]/25 via-[#7c3aed]/20 to-[#db2777]/25 blur-md dark:from-[#6d8bff]/30 dark:via-[#a78bfa]/25 dark:to-[#f472b6]/30"
          style={{
            animation: "orbit-pulse 4s ease-in-out infinite alternate",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        />

        {/* Authentic brand mark asset */}
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

      {/* ── 5. Shared Orbit Wrapper (rotating 360deg linear infinite ~60s) ── */}
      <div
        className="orbital-rotates pointer-events-none absolute inset-0 will-change-transform"
        style={{
          animation: "orbit-spin 60s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* Faint radial hairlines from logo edge to card edge, behind cards (z-0) */}
        <svg
          viewBox="0 0 500 500"
          className="pointer-events-none absolute inset-0 h-full w-full select-none"
          fill="none"
          aria-hidden="true"
        >
          {ORBITAL_NODES.map((node) => (
            <line
              key={node.title}
              x1={node.x1}
              y1={node.y1}
              x2={node.x2}
              y2={node.y2}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 3"
              className="text-slate-300/60 dark:text-white/10"
            />
          ))}
        </svg>

        {/* 3 Nodes at 120° spacing on shared radius R = 32.5cqw */}
        {ORBITAL_NODES.map((node) => (
          <div
            key={node.title}
            className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: node.left, top: node.top }}
          >
            {/* Counter-rotating wrapper: -360deg so text remains upright */}
            <div
              className="orbital-rotates will-change-transform"
              style={{
                animation: "orbit-counter-spin 60s linear infinite",
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              <OrbitalCard
                icon={node.icon}
                title={node.title}
                support={node.support}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


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

export default function Home() {
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
