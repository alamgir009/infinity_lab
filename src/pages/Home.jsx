import { Link } from "react-router-dom";
import { FiCheckCircle, FiCode, FiServer, FiSmartphone } from "react-icons/fi";
import Seo from "../components/Seo";
import Button from "../components/Button";
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
 * a glass product panel carrying the brand emblem inside glowing gradient
 * orbit rings, with floating capability chips for depth. All colors come
 * from --hv-* CSS tokens so light and dark both render correctly.
 * Decorative; aria-hidden.
 */
const EMBLEM_PATH =
  "M24 24c1.8-3 3.4-5.6 7-5.6 3.5 0 6.3 2.5 6.3 5.6s-2.8 5.6-6.3 5.6c-3.6 0-5.2-2.6-7-5.6zm0 0c-1.8 3-3.4 5.6-7 5.6-3.5 0-6.3-2.5-6.3-5.6s2.8-5.6 6.3-5.6c3.6 0 5.2 2.6 7 5.6z";

/** Satellite dots on the outer rotating ring (cardinal = gold, diagonal = blue). */
const SATELLITES = [
  { x: 330, y: 180, gold: true },
  { x: 286.1, y: 73.9, gold: false },
  { x: 180, y: 30, gold: true },
  { x: 73.9, y: 73.9, gold: false },
  { x: 30, y: 180, gold: true },
  { x: 73.9, y: 286.1, gold: false },
  { x: 180, y: 330, gold: true },
  { x: 286.1, y: 286.1, gold: false },
];

function OrbitRings() {
  return (
    <svg viewBox="0 0 360 360" className="h-full w-full">
      <defs>
        <linearGradient id="hv-grad" x1="0" y1="0" x2="360" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" style={{ stopColor: "var(--hv-orbit-a)" }} />
          <stop offset="100%" style={{ stopColor: "var(--hv-orbit-b)" }} />
        </linearGradient>
        <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0.18" />
          <stop offset="60%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0.06" />
          <stop offset="100%" style={{ stopColor: "var(--hv-glow)" }} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Core glow */}
      <circle cx="180" cy="180" r="165" fill="url(#hv-glow)" />

      {/* Frosted halo lifting the emblem off the rings */}
      <circle cx="180" cy="180" r="78" fill="var(--hv-halo)" />

      {/* Solid gradient orbit */}
      <circle cx="180" cy="180" r="118" fill="none" stroke="url(#hv-grad)" strokeOpacity="0.8" strokeWidth="2" />
      {/* Inner hairline orbit */}
      <circle cx="180" cy="180" r="94" fill="none" stroke="url(#hv-grad)" strokeOpacity="0.25" strokeWidth="1" />

      {/* Slowly rotating dotted outer ring with satellite dots */}
      <g className="hv-orbit-spin">
        <circle
          cx="180" cy="180" r="152"
          fill="none" stroke="url(#hv-grad)" strokeOpacity="0.55"
          strokeWidth="1.4" strokeDasharray="1 9" strokeLinecap="round"
        />
        {SATELLITES.map((s, i) => (
          <circle
            key={i} cx={s.x} cy={s.y}
            r={s.gold ? 4 : 3}
            style={{ fill: s.gold ? "var(--hv-gold)" : "var(--hv-orbit-a)" }}
            fillOpacity={s.gold ? 0.95 : 0.8}
          />
        ))}
      </g>

      {/* The brand emblem: single-stroke infinity loop, generous scale */}
      <g transform="translate(180 180) scale(3.4) translate(-24 -24)">
        <path
          d={EMBLEM_PATH}
          stroke="url(#hv-grad)" strokeOpacity="0.3" strokeWidth="7"
          strokeLinecap="round" fill="none"
        />
        <path
          d={EMBLEM_PATH}
          stroke="url(#hv-grad)" strokeWidth="2.4" strokeLinecap="round" fill="none"
        />
      </g>
      {/* Focal accent above and below the loop */}
      <circle cx="127" cy="180" r="3" style={{ fill: "var(--hv-gold)" }} fillOpacity="0.9" />
      <circle cx="233" cy="180" r="3" style={{ fill: "var(--hv-gold)" }} fillOpacity="0.9" />
    </svg>
  );
}

function HeroVisual() {
  const chipClass =
    "absolute inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card px-3.5 py-2 text-xs font-semibold text-text-primary shadow-card dark:border-white/15 dark:text-white";

  return (
    <div className="relative" aria-hidden="true">
      {/* Glass product panel */}
      <div className="relative overflow-hidden rounded-[1.5rem] border border-border-subtle bg-gradient-to-br from-blue-50/80 via-white to-white p-6 shadow-card-hover sm:p-8 dark:border-white/10 dark:from-white/[0.06] dark:via-white/[0.03] dark:to-transparent dark:shadow-none">
        <div className="relative mx-auto aspect-square max-w-[360px]">
          <OrbitRings />
        </div>
      </div>

      {/* Floating capability chips — honest content, staggered float */}
      <div className={`${chipClass} hv-float -left-2 top-[16%] sm:-left-5`} style={{ animationDelay: "0s" }}>
        <FiCode size={13} className="text-brand" />
        Web platforms
      </div>
      <div className={`${chipClass} hv-float -right-2 top-[46%] sm:-right-4`} style={{ animationDelay: "1.2s" }}>
        <FiServer size={13} className="text-brand" />
        Cloud &amp; backend
      </div>
      <div className={`${chipClass} hv-float -left-2 bottom-[12%] sm:-left-5`} style={{ animationDelay: "2.4s" }}>
        <FiSmartphone size={13} className="text-brand" />
        Mobile apps
      </div>
    </div>
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
              <Button to="/contact" size="lg" variant="inverse">
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
      <section aria-labelledby="story-heading" className="py-20 md:py-28">
        <div className="container-section">
          <SectionHeading
            id="story-heading"
            eyebrow="Who we are"
            title={`An engineering company since ${SITE.founded}`}
            lead="Infinity Lab started with a simple conviction: software that people depend on should be built with care, honesty and attention to detail."
          />
          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-14">
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
            <div className="rounded-card border border-border-subtle bg-surface-sunken p-6 sm:p-7">
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
      <section aria-labelledby="services-heading" className="border-y border-border-subtle bg-surface-sunken py-20 md:py-28">
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
          <div className="mt-10 text-center">
            <Button to="/services" variant="secondary" size="md">
              Explore services in detail
            </Button>
          </div>
        </div>
      </section>

      {/* Flagship projects */}
      <section aria-labelledby="projects-heading" className="py-20 md:py-28">
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
      <section aria-labelledby="method-heading" className="bg-brand-deep relative overflow-hidden py-20 md:py-28">
        <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-section relative">
          <SectionHeading
            id="method-heading"
            eyebrow="How we deliver"
            title="A methodology that removes surprises"
            lead="Four deliberate phases — the same discipline on every engagement, regardless of size."
            onBrand
          />
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {/* Timeline connector */}
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-5 hidden border-t border-dashed border-border-subtle md:block dark:border-white/20"
            />
            {METHODOLOGY.map((m) => (
              <li key={m.step} className="relative">
                <span className="relative z-10 flex size-10 items-center justify-center rounded-full bg-btn-bg font-display text-base font-bold text-btn-text ring-4 ring-surface-brand">
                  {m.step}
                </span>
                <h3 className="mt-5 text-lg font-bold text-text-on-brand">{m.name}</h3>
                <p className="mt-2 text-sm leading-6 text-text-on-brand-muted">
                  {m.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Start Project CTA */}
      <section aria-labelledby="cta-heading" className="py-20 md:py-28">
        <div className="container-section">
          <div className="bg-brand-deep relative overflow-hidden rounded-[1.25rem] border border-border-subtle px-6 py-16 text-center shadow-card sm:px-12 md:py-20 dark:border-transparent dark:shadow-none">
            <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <h2 id="cta-heading" className="type-heading text-text-on-brand md:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-text-on-brand-muted">
                Tell us what you are building. We will reply with an honest
                scope, timeline and next step.
              </p>
              <Button to="/contact" size="lg" variant="inverse" className="mt-9">
                Start Your Project
              </Button>
              <p className="mt-7 text-sm text-text-on-brand-muted">
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
