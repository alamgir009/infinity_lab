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
} from "react-icons/fi";
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

const TRUST_STATS = [
  { value: "2016", label: "Established", detail: "Software engineering since 2016" },
  { value: "10", label: "Project engagements", detail: "Shown on our Projects page" },
  { value: "3", label: "Core disciplines", detail: "Web, backend/cloud, mobile" },
  { value: "10 yrs", label: "Engineering practice", detail: "Continuous delivery, 2016–2026" },
];

/**
 * Premium hero visual (theme-aware, shown in BOTH themes):
 * a white circular medallion carrying the brand infinity emblem, wrapped in
 * precise concentric orbits (dotted outer ring rotates slowly), blue spherical
 * nodes on the orbital paths, and thin connector lines linking nodes to three
 * floating service cards. All colors come from --hv-* CSS tokens so light and
 * dark both render correctly. Decorative; aria-hidden.
 */
/* Smooth lemniscate (Bernoulli) sampled as a closed polyline — a true
   infinity weave with a diagonal crossover, unlike the compact logo path
   which only reads correctly at small tile sizes. */
const LEMNISCATE = (() => {
  const N = 96;
  const a = 40;      // half-width -> 80px emblem in the 360 viewBox
  const ys = 1.35;   // gentle vertical stretch for a balanced aspect
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const d = 1 + Math.sin(t) ** 2;
    pts.push(`${((a * Math.cos(t)) / d).toFixed(2)} ${(((a * Math.sin(t) * Math.cos(t)) / d) * ys).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
})();

/* Orbit geometry (viewBox 360x360, centre 180/180). Nodes sit on the rings
   clear of the card footprints; connector endpoints touch each card edge —
   cards are positioned to match (see HeroVisual). */
const C = 180;
const R_SOLID = 116;
const R_DOT = 150;
const NODES = [
  { angle: 195, ring: R_SOLID }, // left of centre  -> card A (upper-left)
  { angle: -25, ring: R_DOT },   // upper-right     -> card B (right)
  { angle: 165, ring: R_SOLID }, // left of centre  -> card C (lower-left)
];
const CONNECTORS = [
  { x1: 68, y1: 150, x2: 134, y2: 89 },    // card A right edge
  { x1: 316, y1: 117, x2: 300, y2: 135 },  // card B top-left edge
  { x1: 68, y1: 210, x2: 132, y2: 254 },   // card C right edge
];

function polar(angleDeg, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: C + radius * Math.cos(rad), y: C + radius * Math.sin(rad) };
}

function OrbitRings() {
  return (
    <svg viewBox="0 0 360 360" className="h-full w-full">
      <defs>
        <linearGradient id="hv-grad" x1="0" y1="0" x2="360" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style={{ stopColor: "var(--hv-orbit-a)" }} />
          <stop offset="100%" style={{ stopColor: "var(--hv-orbit-b)" }} />
        </linearGradient>
        <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0.16" />
          <stop offset="60%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0.05" />
          <stop offset="100%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hv-node" cx="35%" cy="30%" r="75%">
          <stop offset="0%" style={{ stopColor: "var(--hv-node-hi)" }} />
          <stop offset="100%" style={{ stopColor: "var(--hv-node-lo)" }} />
        </radialGradient>
      </defs>

      {/* Ambient glow */}
      <circle cx={C} cy={C} r="168" fill="url(#hv-glow)" />

      {/* Connector lines: node -> service card (anchored under the card edge) */}
      <g stroke="var(--hv-connector)" strokeWidth="1.25" className="hv-connectors">
        {CONNECTORS.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>
      {/* Small anchor dots where the connectors meet the card edges */}
      <g className="hv-connectors" style={{ fill: "var(--hv-node-lo)" }}>
        {CONNECTORS.map((l, i) => (
          <circle key={i} cx={l.x2} cy={l.y2} r="2.6" fillOpacity="0.85" />
        ))}
      </g>

      {/* Medallion: white disc with layered hairlines and soft depth */}
      <g style={{ filter: "drop-shadow(0 14px 28px var(--hv-medallion-shadow))" }}>
        <circle cx={C} cy={C} r="76" fill="var(--hv-medallion)" />
      </g>
      <circle cx={C} cy={C} r="76" fill="none" stroke="var(--hv-medallion-ring)" strokeWidth="1" />
      <circle cx={C} cy={C} r="64" fill="none" stroke="var(--hv-medallion-ring)" strokeOpacity="0.7" strokeWidth="1" />

      {/* Solid gradient orbit + inner hairline orbit */}
      <circle cx={C} cy={C} r={R_SOLID} fill="none" stroke="url(#hv-grad)" strokeOpacity="0.8" strokeWidth="2" />
      <circle cx={C} cy={C} r="96" fill="none" stroke="url(#hv-grad)" strokeOpacity="0.28" strokeWidth="1" />

      {/* Slowly rotating dotted outer ring */}
      <g className="hv-orbit-spin">
        <circle
          cx={C} cy={C} r={R_DOT}
          fill="none" stroke="url(#hv-grad)" strokeOpacity="0.55"
          strokeWidth="1.4" strokeDasharray="1 9" strokeLinecap="round"
        />
      </g>

      {/* Blue spherical nodes on the orbital paths */}
      {NODES.map((n, i) => {
        const p = polar(n.angle, n.ring);
        return <circle key={i} cx={p.x} cy={p.y} r="5" fill="url(#hv-node)" />;
      })}

      {/* The brand emblem: mathematically smooth infinity weave */}
      <g transform={`translate(${C} ${C})`}>
        <path
          d={LEMNISCATE}
          stroke="url(#hv-grad)" strokeOpacity="0.15" strokeWidth="15"
          strokeLinejoin="round" strokeLinecap="round" fill="none"
        />
        <path
          d={LEMNISCATE}
          stroke="url(#hv-grad)" strokeWidth="7" strokeLinejoin="round" fill="none"
        />
      </g>
      {/* Focal accents at the loop tips */}
      <circle cx="128" cy={C} r="3" style={{ fill: "var(--hv-gold)" }} fillOpacity="0.9" />
      <circle cx="232" cy={C} r="3" style={{ fill: "var(--hv-gold)" }} fillOpacity="0.9" />
    </svg>
  );
}

/** Floating service card anchored over the illustration (decorative).
 *  Compacts automatically in the 1024–1279px range so the right-hand card
 *  never clips against the viewport edge; full size from xl up. */
function OrbitCard({ icon: Icon, title, support, className }) {
  return (
    <div
      className={`z-10 flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface-card py-2.5 pl-2.5 pr-4 shadow-card lg:gap-2 lg:py-2 lg:pl-2 lg:pr-3 dark:border-white/15 dark:bg-surface-card dark:shadow-none xl:gap-3 xl:py-2.5 xl:pl-2.5 xl:pr-4 ${className}`}
    >
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
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-[340px] xl:max-w-[420px]">
        {/* Soft rounded backdrop panel behind the illustration */}
        <div className="absolute inset-[3%] rounded-[2rem] border border-border-subtle bg-gradient-to-br from-blue-50/70 via-white/60 to-white/20 shadow-card-hover dark:border-white/10 dark:from-white/[0.05] dark:via-white/[0.02] dark:to-transparent dark:shadow-none" />

        {/* Orbital illustration (rings, medallion, nodes, connectors) */}
        <OrbitRings />

        {/* Desktop/tablet: floating service cards over the illustration */}
        <OrbitCard
          icon={FiCode}
          title="Web platforms"
          support="Modern, scalable, secure"
          className="absolute left-[-9%] top-[20%] hidden sm:flex"
        />
        <OrbitCard
          icon={FiCloud}
          title="Cloud &amp; backend"
          support="Reliable &amp; high performance"
          className="absolute left-[78%] top-[38%] hidden sm:flex lg:left-[68%] xl:left-[72%]"
        />
        <OrbitCard
          icon={FiSmartphone}
          title="Mobile apps"
          support="iOS &amp; Android"
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
        <div className="container-section relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-surface-sunken px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary dark:border-white/15 dark:bg-white/5 dark:text-white/80">
              <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-brand dark:bg-accent-gold" />
              Since {SITE.founded} · India
            </p>
            <h1 className="type-display mt-6 font-display text-text-on-brand dark:text-white">
              Software engineering,<br />
              <span className="text-brand dark:text-white/60">done properly.</span>
            </h1>
            <p className="container-text mt-6 text-lg leading-8 text-text-on-brand-muted">
              Infinity Lab designs, builds and operates web platforms, backend
              and cloud systems, and mobile applications — for newsrooms,
              institutions, retailers and product teams across India.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" variant="inverse" arrow>
                Start Your Project
              </Button>
              <Button to="/projects" size="lg" variant="secondary-inverse">
                See our work
              </Button>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-secondary dark:text-white/70">
              {["Accessible by default", "Performance-first builds", "Real operational support"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <FiCheckCircle aria-hidden="true" className="text-brand dark:text-accent-gold" />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="animate-fadeUp">
            <HeroVisual />
          </div>
        </div>

        {/* Trust metrics ribbon */}
        <div className="relative border-t border-border-subtle dark:border-white/10">
          <div className="container-section py-10">
            <StatStrip stats={TRUST_STATS} />
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
