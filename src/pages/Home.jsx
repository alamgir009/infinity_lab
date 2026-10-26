import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
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
 * Engineered hero visual: concentric precision rings, a fine coordinate grid
 * and the infinity emblem as the focal anchor — deliberately geometric.
 * Decorative; aria-hidden.
 */
function HeroVisual() {
  return (
    <svg
      viewBox="0 0 460 400"
      className="h-auto w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hv-accent" x1="0" y1="0" x2="460" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8AB0FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#DDC58F" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id="hv-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#4F86F7" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#4F86F7" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="460" height="400" rx="20" fill="rgb(255 255 255 / 0.03)" />
      <rect width="460" height="400" rx="20" fill="url(#hv-glow)" />

      {/* Fine coordinate grid */}
      {Array.from({ length: 15 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={16 + i * 30.6}
          y1="12"
          x2={16 + i * 30.6}
          y2="388"
          stroke="rgb(148 163 184 / 0.09)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 13 }, (_, i) => (
        <line
          key={`h${i}`}
          x1="12"
          y1={16 + i * 30.6}
          x2="448"
          y2={16 + i * 30.6}
          stroke="rgb(148 163 184 / 0.09)"
          strokeWidth="1"
        />
      ))}

      {/* Concentric precision rings */}
      {[70, 110, 150].map((r) => (
        <circle
          key={r}
          cx="230"
          cy="200"
          r={r}
          fill="none"
          stroke="url(#hv-accent)"
          strokeOpacity={r === 110 ? 0.55 : 0.2}
          strokeDasharray={r === 70 ? "none" : "2 6"}
          strokeWidth="1.4"
        />
      ))}

      {/* Engineering markers on the ring axes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 230 + 110 * Math.cos(rad);
        const y = 200 + 110 * Math.sin(rad);
        return (
          <circle
            key={deg}
            cx={x}
            cy={y}
            r="3.2"
            fill={deg % 90 === 0 ? "#DDC58F" : "#8AB0FF"}
            fillOpacity={deg % 90 === 0 ? 0.95 : 0.6}
          />
        );
      })}

      {/* The brand emblem: a single-stroke infinity loop, centered */}
      <g transform="translate(230 200) scale(2.4) translate(-24 -24)">
        <path
          d="M24 24c1.8-3 3.4-5.6 7-5.6 3.5 0 6.3 2.5 6.3 5.6s-2.8 5.6-6.3 5.6c-3.6 0-5.2-2.6-7-5.6zm0 0c-1.8 3-3.4 5.6-7 5.6-3.5 0-6.3-2.5-6.3-5.6s2.8-5.6 6.3-5.6c3.6 0 5.2 2.6 7 5.6z"
          stroke="url(#hv-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      {/* Focal point */}
      <circle cx="230" cy="200" r="4" fill="#DDC58F" />
      <circle cx="230" cy="200" r="10" fill="none" stroke="#DDC58F" strokeOpacity="0.35" strokeWidth="1" />
    </svg>
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

      {/* Hero */}
      <section className="bg-brand-deep relative overflow-hidden">
        <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-section relative grid items-center gap-14 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
              <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent-gold" />
              Since {SITE.founded} · India
            </p>
            <h1 className="type-display mt-6 font-display text-white">
              Software engineering,<br />
              <span className="text-white/60">done properly.</span>
            </h1>
            <p className="container-text mt-6 text-lg leading-8 text-text-on-inverse-muted">
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
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {["Accessible by default", "Performance-first builds", "Real operational support"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <FiCheckCircle aria-hidden="true" className="text-accent-gold" />
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
        <div className="relative border-t border-white/10">
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
            onInverse
          />
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
            {/* Timeline connector */}
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-5 hidden border-t border-dashed border-white/20 md:block"
            />
            {METHODOLOGY.map((m) => (
              <li key={m.step} className="relative">
                <span className="relative z-10 flex size-10 items-center justify-center rounded-full bg-btn-bg font-display text-base font-bold text-white ring-4 ring-surface-inverse">
                  {m.step}
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{m.name}</h3>
                <p className="mt-2 text-sm leading-6 text-text-on-inverse-muted">
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
          <div className="bg-brand-deep relative overflow-hidden rounded-[1.25rem] px-6 py-16 text-center sm:px-12 md:py-20">
            <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <h2 id="cta-heading" className="type-heading text-white md:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-text-on-inverse-muted">
                Tell us what you are building. We will reply with an honest
                scope, timeline and next step.
              </p>
              <Button to="/contact" size="lg" variant="inverse" className="mt-9">
                Start Your Project
              </Button>
              <p className="mt-7 text-sm text-white/70">
                Prefer to browse first?{" "}
                <Link
                  to="/projects"
                  className="font-semibold text-accent-gold underline underline-offset-4 hover:no-underline"
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
