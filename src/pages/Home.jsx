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
  { icon: FiCode, title: "Web platforms", support: "Modern, scalable, secure" },
  {
    icon: FiCloud,
    title: "Cloud & backend",
    support: "Reliable & high performance",
  },
  { icon: FiSmartphone, title: "Mobile apps", support: "iOS & Android" },
];

/**
 * One floating spec card. The same markup serves the phone ledger and the
 * desktop instrument; only the anchor classes change.
 */
function HeroCard({ icon: Icon, title, support, anchor, connector }) {
  return (
    <li className={`relative ${anchor}`}>
      <div className="flex items-center gap-2.5 rounded-card border border-border-subtle bg-surface-card py-3 pl-2.5 pr-3.5 shadow-card sm:w-[204px]">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[3px] border border-border-subtle bg-brand-soft text-brand-soft-text">
          <Icon size={15} aria-hidden="true" />
        </span>

        <span className="min-w-0">
          <span className="block text-[13px] font-semibold leading-4 tracking-[-0.01em] text-text-primary">
            {title}
          </span>
          <span className="mt-0.5 block text-[10.5px] leading-4 text-text-muted">
            {support}
          </span>
        </span>
      </div>

      {connector === "right" && (
        <>
          <span
            aria-hidden="true"
            className="absolute right-[-14px] top-1/2 hidden h-px w-3.5 -translate-y-1/2 bg-border-strong/35 sm:block"
          />
          <span
            aria-hidden="true"
            className="absolute right-[-16px] top-1/2 hidden size-[3px] -translate-y-1/2 rounded-full bg-border-strong/60 sm:block"
          />
        </>
      )}
      {connector === "left" && (
        <>
          <span
            aria-hidden="true"
            className="absolute left-[-14px] top-1/2 hidden h-px w-3.5 -translate-y-1/2 bg-border-strong/35 sm:block"
          />
          <span
            aria-hidden="true"
            className="absolute left-[-16px] top-1/2 hidden size-[3px] -translate-y-1/2 rounded-full bg-border-strong/60 sm:block"
          />
        </>
      )}
    </li>
  );
}

/** Where each card sits on the 480px stage, and which edge carries its tick. */
const CARD_ANCHORS = [
  "sm:absolute sm:left-0 sm:top-[9%]",
  "sm:absolute sm:right-0 sm:top-[44%]",
  "sm:absolute sm:left-[3%] sm:top-[78%]",
];
const CARD_CONNECTORS = ["right", "left", "right"];

/**
 * The infinity instrument. A fixed 480px stage holds everything: three
 * hairline orbits, the brand mark on a paper medallion, and one spec card
 * per ring quadrant. Below 640px the rings disappear and the same three
 * cards read as the capability ledger.
 *
 * Static by construction — no filters, no gradients, no animation, no
 * layout reads. The whole thing is one SVG plus three divs.
 */
function HeroInstrument() {
  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      {/* Orbits. Decorative: the cards carry the meaning. */}
      <svg
        viewBox="0 0 480 480"
        className="absolute inset-0 hidden h-full w-full text-border-strong sm:block"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle cx="240" cy="240" r="206" strokeWidth="1" strokeDasharray="1 7" opacity="0.45" />
        <circle cx="240" cy="240" r="164" strokeWidth="1" opacity="0.5" />
        <circle cx="240" cy="240" r="122" strokeWidth="1" strokeDasharray="1 6" opacity="0.32" />
        <circle cx="240" cy="240" r="78" strokeWidth="1" strokeDasharray="1 5" opacity="0.32" />
        <g fill="currentColor" stroke="none">
          <circle cx="343" cy="62" r="2" opacity="0.6" />
          <circle cx="343" cy="418" r="2" opacity="0.6" />
          <circle cx="46" cy="311" r="2" opacity="0.6" />
        </g>
      </svg>

      {/* Medallion — the real brand mark, not a redrawn one. */}
      <div
        className="absolute left-1/2 top-1/2 hidden size-[104px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-surface-card shadow-card sm:flex"
        aria-hidden="true"
      >
        <img
          src={markWebp}
          width="242"
          height="128"
          alt=""
          loading="eager"
          decoding="async"
          draggable={false}
          className="h-11 w-auto"
        />
      </div>

      <ul
        aria-label="What we build"
        className="relative flex flex-col gap-3 sm:block sm:aspect-square"
      >
        {CAPABILITIES.map(({ icon, title, support }, i) => (
          <HeroCard
            key={title}
            icon={icon}
            title={title}
            support={support}
            anchor={CARD_ANCHORS[i]}
            connector={CARD_CONNECTORS[i]}
          />
        ))}
      </ul>
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
        <div className="container-section relative grid items-start gap-12 pb-14 pt-10 md:pb-20 md:pt-16 xl:grid-cols-[minmax(0,600px)_minmax(0,1fr)] xl:gap-16 xl:pb-24 xl:pt-20">
          <div>
            <div className="mb-10 flex items-center gap-3" aria-hidden="true">
              <span className="signal-tick" />
              <span className="h-px flex-1 bg-border-subtle" />
            </div>

            <h1 className="type-hero max-w-[9.7em] text-text-primary">
              Ten years of shipping systems {" "} <span className="text-text-on-brand-muted">that stay up and scale.</span>
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

          <div className="animate-fadeUp w-full xl:self-center">
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
