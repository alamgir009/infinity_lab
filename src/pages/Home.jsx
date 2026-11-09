import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiCheckSquare,
  FiCode,
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
import HeroInstrument from "../components/HeroInstrument";
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
export { Home as HomePage };
