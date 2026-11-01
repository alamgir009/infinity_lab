import { useRef, useState, useLayoutEffect } from "react";
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
 * animated live data-stream pulses connect the central hub seamlessly to the 3 service cards:
 * Web platforms, Cloud & backend, and Mobile apps.
 */
const C = 200;
const R_MEDALLION = 74;
const R_INNER = 94;
const R_SOLID = 118;
const R_DOT = 152;

/* Bernoulli lemniscate sampled as a closed polyline — a true infinity weave */
const LEMNISCATE = (() => {
  const N = 96;
  const a = 44;
  const ys = 1.35;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const d = 1 + Math.sin(t) ** 2;
    pts.push(`${((a * Math.cos(t)) / d).toFixed(2)} ${(((a * Math.sin(t) * Math.cos(t)) / d) * ys).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
})();

function OrbitRings({ docks }) {
  const targetWeb = { x: docks?.web?.x ?? 136, y: docks?.web?.y ?? 92 };
  const targetCloud = { x: docks?.cloud?.x ?? 265, y: docks?.cloud?.y ?? 188 };
  const targetMobile = { x: docks?.mobile?.x ?? 136, y: docks?.mobile?.y ?? 308 };

  const nodeWeb = { x: 172, y: 145 };
  const nodeMobile = { x: 172, y: 255 };
  const nodeCloud = { x: 262, y: 200 };

  const webElbowX = targetWeb.x + 18;
  const pathWeb = `M ${nodeWeb.x} ${nodeWeb.y} L ${webElbowX} ${nodeWeb.y} L ${targetWeb.x + 5} ${targetWeb.y}`;

  const mobileElbowX = targetMobile.x + 18;
  const pathMobile = `M ${nodeMobile.x} ${nodeMobile.y} L ${mobileElbowX} ${nodeMobile.y} L ${targetMobile.x + 5} ${targetMobile.y}`;

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
          <stop offset="0%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0.22" />
          <stop offset="65%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0.05" />
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

      {/* Telemetry radar ring with dashed hairlines */}
      <g className="hv-orbit-spin">
        <circle
          cx={C} cy={C} r={R_DOT}
          fill="none" stroke="url(#hv-grad)" strokeOpacity="0.35"
          strokeWidth="1.2" strokeDasharray="8 8"
        />
      </g>

      {/* Central medallion disc */}
      <g style={{ filter: "drop-shadow(0 14px 28px var(--hv-medallion-shadow))" }}>
        <circle cx={C} cy={C} r={R_MEDALLION} fill="var(--hv-medallion)" />
      </g>
      <circle cx={C} cy={C} r={R_MEDALLION} fill="none" stroke="var(--hv-medallion-ring)" strokeWidth="1" />
      <circle cx={C} cy={C} r="62" fill="none" stroke="var(--hv-medallion-ring)" strokeOpacity="0.7" strokeWidth="1" />

      {/* Infinity emblem */}
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

      {/* Connected vector routes */}
      <g className="hv-connectors">
        {/* Route 1: Web Platforms */}
        <g>
          <path d={pathWeb} fill="none" stroke="var(--hv-connector)" strokeWidth="1.5" strokeLinecap="round" />
          <path d={pathWeb} fill="none" stroke="var(--hv-pulse)" strokeWidth="2" strokeDasharray="6 24" strokeLinecap="round" className="hv-data-flow" opacity="0.9" />
          <polygon
            points={`${targetWeb.x},${targetWeb.y} ${targetWeb.x + 8},${targetWeb.y - 4.5} ${targetWeb.x + 5.5},${targetWeb.y} ${targetWeb.x + 8},${targetWeb.y + 4.5}`}
            fill="var(--hv-arrow)"
          />
        </g>

        {/* Route 2: Mobile Apps */}
        <g>
          <path d={pathMobile} fill="none" stroke="var(--hv-connector)" strokeWidth="1.5" strokeLinecap="round" />
          <path d={pathMobile} fill="none" stroke="var(--hv-pulse)" strokeWidth="2" strokeDasharray="6 24" strokeLinecap="round" className="hv-data-flow" opacity="0.9" />
          <polygon
            points={`${targetMobile.x},${targetMobile.y} ${targetMobile.x + 8},${targetMobile.y - 4.5} ${targetMobile.x + 5.5},${targetMobile.y} ${targetMobile.x + 8},${targetMobile.y + 4.5}`}
            fill="var(--hv-arrow)"
          />
        </g>

        {/* Route 3: Cloud & Backend */}
        <g>
          <path d={pathCloud} fill="none" stroke="var(--hv-connector)" strokeWidth="1.5" strokeLinecap="round" />
          <path d={pathCloud} fill="none" stroke="var(--hv-pulse)" strokeWidth="2" strokeDasharray="6 24" strokeLinecap="round" className="hv-data-flow" opacity="0.9" />
          <polygon
            points={`${targetCloud.x},${targetCloud.y} ${targetCloud.x - 8},${targetCloud.y - 4.5} ${targetCloud.x - 5.5},${targetCloud.y} ${targetCloud.x - 8},${targetCloud.y + 4.5}`}
            fill="var(--hv-arrow)"
          />
        </g>
      </g>
    </svg>
  );
}

/** Floating service card anchored over the illustration */
function OrbitCard({ icon: Icon, title, support, className, dockSide, dockRef }) {
  return (
    <div
      className={`z-10 flex items-center gap-3 rounded-card border border-border-subtle bg-surface-card/90 py-2.5 pl-2.5 pr-4 shadow-card backdrop-blur-md transition-all duration-300 hover:border-brand/40 hover:shadow-card-hover card-rim lg:gap-2 lg:py-2 lg:pl-2 lg:pr-3.5 xl:gap-3 xl:py-2.5 xl:pl-2.5 xl:pr-4 ${className}`}
    >
      {dockSide === "left" && (
        <span
          ref={dockRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 hidden size-0 -translate-y-1/2 sm:flex"
        />
      )}

      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-chip text-brand-chip-text ring-1 ring-inset ring-brand/15 dark:bg-surface-sunken dark:text-brand lg:size-7 xl:size-9">
        <Icon size={16} aria-hidden="true" className="size-4 lg:size-3.5 xl:size-4" />
      </span>
      <span className="min-w-0">
        <span className="block whitespace-nowrap font-display text-sm font-bold leading-5 text-text-primary lg:text-[13px] lg:leading-4 xl:text-sm xl:leading-5">
          {title}
        </span>
        <span className="block whitespace-nowrap text-[11px] leading-4 text-text-secondary lg:text-[10px] lg:leading-3.5 xl:text-[11px] xl:leading-4">
          {support}
        </span>
      </span>

      {dockSide === "right" && (
        <span
          ref={dockRef}
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 hidden size-0 -translate-y-1/2 sm:flex"
        />
      )}
    </div>
  );
}

function HeroVisual() {
  const containerRef = useRef(null);
  const dockWebRef = useRef(null);
  const dockCloudRef = useRef(null);
  const dockMobileRef = useRef(null);

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
    const ro = new window.ResizeObserver(updateDocks);
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
        {/* Soft rounded backdrop panel */}
        <div className="pointer-events-none absolute inset-[3%] rounded-full border border-border-subtle/70" />

        <OrbitRings docks={docks} />

        {/* Desktop/tablet floating cards */}
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

      {/* Mobile stack */}
      <div className="mx-auto mt-4 grid max-w-[420px] gap-3 sm:hidden">
        <OrbitCard icon={FiCode} title="Web platforms" support="Modern, scalable, secure" className="" />
        <OrbitCard icon={FiCloud} title="Cloud &amp; backend" support="Reliable &amp; high performance" className="" />
        <OrbitCard icon={FiSmartphone} title="Mobile apps" support="iOS &amp; Android" className="" />
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
 * Delivery-phase step card
 */
function MethodStepCard({ phase, connector = "none" }) {
  const Icon = METHOD_ICONS[phase.icon] ?? FiCode;
  return (
    <li className="relative">
      <Card interactive className="h-full">
        {/* Top hairline accent */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-brand opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
        />
        <div className="flex h-full flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-chip text-brand-chip-text ring-1 ring-inset ring-brand/15 dark:bg-surface-sunken dark:text-brand dark:ring-border-subtle">
              <Icon size={18} aria-hidden="true" />
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-xs font-bold tracking-[0.2em] text-brand"
            >
              {String(phase.step).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-text-primary">
            {phase.name}
          </h3>
          <p className="mb-5 mt-2 text-sm leading-relaxed text-text-secondary">
            {phase.description}
          </p>
          <ul className="mt-auto space-y-2.5 border-t border-border-subtle pt-4 text-xs leading-5">
            {phase.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <FiCheckCircle
                  aria-hidden="true"
                  className="mt-[2px] size-3.5 shrink-0 text-brand"
                />
                <span className="text-text-secondary font-medium">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Hairline connector (desktop) */}
      {connector === "next" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-full top-1/2 hidden h-px w-6 bg-[var(--hv-connector)] lg:block"
        />
      )}

      {/* Row transition (desktop) */}
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

      {/* Hero — theme-aware brand surface with precision glow */}
      <section className="bg-brand-deep relative overflow-hidden">
        <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-section relative grid items-center gap-10 pt-10 pb-16 md:pt-16 md:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <h1 className="type-display font-heading text-text-on-brand tracking-tight">
              Ten years of shipping systems<br />
              <span className="text-brand">that stay up and scale.</span>
            </h1>
            <p className="container-text mt-6 text-lg leading-relaxed text-text-on-brand-muted sm:text-xl">
              Infinity Lab designs, builds and operates news portals, institutional platforms, management systems and mobile apps for teams across India.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3.5">
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
        <div className="relative">
          <div className="container-section py-8 sm:py-12">
            <StatStrip stats={STATS} />
          </div>
        </div>
      </section>

      {/* Company story */}
      <section aria-labelledby="story-heading" className="cv-auto py-16 md:py-24">
        <div className="container-section">
          <SectionHeading
            id="story-heading"
            eyebrow="Who we are"
            title={`An engineering company since ${SITE.founded}`}
            lead="Infinity Lab started with a simple conviction: software that people depend on should be built with care, honesty and attention to detail."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="container-text space-y-6 text-base leading-relaxed text-text-secondary md:text-lg">
              <p className="text-lg leading-relaxed text-text-primary font-medium">
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
            <div className="rounded-card-lg border border-border-subtle bg-surface-card p-6 shadow-card card-rim sm:p-8 dark:border-slate-800">
              <h3 className="font-display text-base font-bold tracking-tight text-text-primary">
                What that means in practice
              </h3>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-text-secondary">
                {[
                  "Honest scope and timelines — no overpromising",
                  "Accessibility and performance treated as requirements, not extras",
                  "Operational support after launch, not abandonment",
                  "Clear documentation so your team is never locked out",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FiCheckCircle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand" />
                    <span className="text-text-primary font-medium">{item}</span>
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
        className="cv-auto border-y border-border-subtle bg-surface-sunken/60 py-16 md:py-24"
      >
        <div className="container-section">
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title="Three disciplines, one accountable team"
            lead="We cover the full delivery surface — interface, server, and device — so you never have to chase three vendors for one product."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button to="/services" variant="secondary" size="md">
              Explore services in detail
            </Button>
          </div>
        </div>
      </section>

      {/* Flagship projects */}
      <section aria-labelledby="projects-heading" className="cv-auto py-16 md:py-24">
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
          <div className="mt-12 grid gap-6 md:grid-cols-3">
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
        className="cv-auto bg-brand-deep relative overflow-hidden py-16 md:py-24"
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
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {METHODOLOGY.map((phase, i) => {
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
      <section aria-labelledby="cta-heading" className="cv-auto py-16 md:py-24">
        <div className="container-section">
          <div className="relative overflow-hidden rounded-card-lg border border-border-subtle bg-surface-card px-6 py-14 text-center shadow-card card-rim sm:px-12 md:py-20 dark:border-slate-800">
            <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <h2 id="cta-heading" className="type-heading text-text-primary md:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
                Tell us what you are building. We will reply with an honest
                scope, timeline and next step.
              </p>
              <div className="mt-8 flex justify-center">
                <Button to="/contact" size="lg" variant="primary">
                  Start Your Project
                </Button>
              </div>
              <p className="mt-6 text-sm text-text-muted">
                Prefer to browse first?{" "}
                <Link
                  to="/projects"
                  className="font-semibold text-brand underline underline-offset-4 hover:text-brand-hover"
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
