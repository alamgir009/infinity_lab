import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiCheckSquare,
  FiCode,
  FiSmartphone,
  FiCloud,
  FiRefreshCw,
  FiPenTool,
  FiSearch,
  FiUploadCloud,
  FiCalendar,
  FiBox,
  FiUsers,
} from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import Seo from "../components/Seo";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import StatStrip from "../components/ui/StatStrip";
import { SERVICES, METHODOLOGY } from "../data/services";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/projects";
import { SITE } from "../data/siteConfig";
import heroFintechLight from "../assets/hero-fintech-light.jpg";
import heroFintechDark from "../assets/hero-fintech-dark.jpg";

/**
 * HeroTechCard — Fintech-grade software engineering & live production telemetry visual.
 * Precision studio backdrop card, photorealistic hardware mockup with dedicated
 * light (#ffffff) and dark (#11131a) mode seamless background matching,
 * unobstructed display visibility, and architectural SLA metrics.
 * Designed with zero brand text in the card for authentic engineering credibility.
 */
function HeroTechCard() {
  /* Concentric radius formula: r_inner = max(0, r_outer - padding) */
  return (
    <div
      role="region"
      aria-label="Fintech-grade software architecture and live production telemetry preview"
      className="relative mx-auto w-full max-w-[560px] lg:max-w-[600px] xl:max-w-[650px] lg:self-center"
    >
      {/* 1. Rear physical depth plate (concentric 28px radius, offset for tactile layering) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden select-none rounded-[28px] border border-black/[0.06] bg-surface-card/60 origin-top-left scale-[0.985] sm:block sm:translate-x-3 sm:translate-y-3 lg:translate-x-3.5 lg:translate-y-3.5 dark:border-white/[0.06] dark:bg-surface-card/40 animate-[workIndexRise_600ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
      />

      {/* 2. Main Studio Console Card (pure white on light, obsidian #11131a on dark) */}
      <div className="relative z-10 overflow-hidden rounded-[24px] sm:rounded-[28px] border border-black/[0.08] bg-white p-3.5 sm:p-5 lg:p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_1px_2px_0_rgba(0,0,0,0.04),0_24px_48px_-12px_rgba(0,0,0,0.09)] dark:border-white/[0.08] dark:bg-[#11131a] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_1px_2px_0_rgba(0,0,0,0.3),0_28px_60px_-14px_rgba(0,0,0,0.7)] animate-[workIndexRise_600ms_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:60ms] motion-reduce:animate-none">

        {/* Console Header Bar (Zero brand name: authentic macOS window controls & telemetry status) */}
        <div className="mb-3.5 flex items-center justify-between border-b border-black/[0.06] pb-3 dark:border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            {/* Window control traffic lights */}
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#FF5F56]/90 shadow-sm" />
              <span className="size-2.5 rounded-full bg-[#FFBD2E]/90 shadow-sm" />
              <span className="size-2.5 rounded-full bg-[#27C93F]/90 shadow-sm" />
            </div>
            <span className="h-3.5 w-px bg-border-subtle" aria-hidden="true" />
            <span className="font-mono text-[11px] font-medium tracking-tight text-text-muted">
              cluster-prod-01 <span className="text-text-muted/50">/</span> ap-south-1
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-medium text-text-secondary">
              99.98% SLA
            </span>
            <span className="hidden font-mono text-[10.5px] text-text-muted sm:inline">
              • 24ms
            </span>
          </div>
        </div>

        {/* 3. The Visual Stage (Bigger size, unobstructed, perfectly matched light & dark background) */}
        <div className="relative overflow-hidden rounded-[18px] sm:rounded-[22px] border border-black/[0.06] bg-white dark:border-white/[0.06] dark:bg-[#11131a]">

          <div className="relative aspect-[16/9.5] w-full overflow-hidden">
            {/* Light Mode Fintech Device Mockup (Seamless white background) */}
            <img
              src={heroFintechLight}
              alt="Fintech-grade software engineering platform and real-time telemetry dashboard in light mode"
              width="1376"
              height="768"
              fetchpriority="high"
              decoding="async"
              className="block h-full w-full object-contain object-center transition-transform duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.015] motion-reduce:hover:scale-100 dark:hidden"
            />

            {/* Dark Mode Fintech Device Mockup (Seamless obsidian dark slate background) */}
            <img
              src={heroFintechDark}
              alt="Fintech-grade software engineering platform and real-time telemetry dashboard in dark mode"
              width="1376"
              height="768"
              fetchpriority="high"
              decoding="async"
              className="hidden h-full w-full object-contain object-center transition-transform duration-700 ease-out [@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.015] motion-reduce:hover:scale-100 dark:block"
            />

            {/* Subtle specular glass highlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/20 via-transparent to-transparent dark:from-white/[0.04]"
            />
          </div>

          {/* Floating Architectural SLA Shield Badge (Top-Right, subtle & non-obstructive) */}
          <div
            aria-hidden="true"
            className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 flex size-9 sm:size-10 items-center justify-center rounded-full border border-black/[0.08] bg-white/90 text-emerald-600 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-white/[0.12] dark:bg-[#151722]/90 dark:text-emerald-400 dark:shadow-[0_12px_28px_-4px_rgba(0,0,0,0.5)] animate-[workIndexRise_600ms_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:240ms] motion-reduce:animate-none"
          >
            <LuShieldCheck size={18} className="shrink-0" />
          </div>
        </div>

        {/* 4. Systems Spec Footer Strip (3-column production telemetry ledger) */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-black/[0.06] pt-3 text-center dark:border-white/[0.06]">
          <div className="flex flex-col items-center">
            <span className="font-display text-[15px] font-semibold text-text-primary sm:text-[16px]">
              10 Years
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              Engineering Practice
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-border-subtle">
            <span className="font-display text-[15px] font-semibold text-text-primary sm:text-[16px]">
              99.9%
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              Uptime Architecture
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-[15px] font-semibold text-text-primary sm:text-[16px]">
              &lt;1.2s
            </span>
            <span className="font-mono text-[10px] text-text-muted">
              Page Load Velocity
            </span>
          </div>
        </div>

        {/* 5. Action Link to Verified Projects */}
        <div className="mt-3.5 flex items-center justify-between border-t border-black/[0.06] pt-2.5 dark:border-white/[0.06]">
          <span className="signal-tick" aria-hidden="true" />

          <Link
            to="/projects"
            className="group/link inline-flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-text-primary underline decoration-transparent underline-offset-4 decoration-1 transition-colors duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-brand [@media(hover:hover)_and_(pointer:fine)]:hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span>See live platforms</span>
            <FiArrowRight
              size={13}
              className="shrink-0 text-text-muted transition-transform duration-150 [@media(hover:hover)_and_(pointer:fine)]:group-hover/link:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover/link:text-brand"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

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

export default function Home() {
  const flagship = PROJECTS.filter((p) => p.verified).slice(0, 3);

  return (
    <>
      <Seo
        title="Infinity Lab — Software Engineering Company (Est. 2016)"
        description={SITE.description}
        path="/"
      />

      {/* Hero — paper canvas, headline left, platform console right */}
      <section className="relative overflow-hidden">
        <div className="container-section relative grid items-center gap-8 pb-10 pt-10 md:gap-10 md:pb-12 md:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10 xl:grid-cols-[minmax(0,560px)_minmax(0,1fr)] xl:gap-12 xl:pb-12 xl:pt-14">
          <div>
            <div className="mb-8 flex items-center gap-3" aria-hidden="true">
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

            <div className="signal-rule mt-6 w-20" aria-hidden="true" />

            <p className="type-lead mt-5 max-w-[52ch] text-text-secondary">
              Infinity Lab designs, builds and operates news portals, institutional platforms, management systems and mobile apps for teams across India.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" size="lg" variant="primary" arrow className="w-full sm:w-auto">
                Start your project
              </Button>
              <Button to="/projects" size="lg" variant="secondary" className="w-full sm:w-auto">
                See our work
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[480px] sm:max-w-[520px] lg:max-w-none lg:self-center">
            <HeroTechCard />
          </div>
        </div>

        {/* Trust metrics ledger */}
        <div className="container-section pb-10 md:pb-14">
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
        className="cv-auto section relative overflow-hidden border-y border-border-subtle bg-surface-sunken"
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

export { Home as HomePage };
