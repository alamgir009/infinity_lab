import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle, FiAnchor } from "react-icons/fi";
import Seo from "../components/Seo";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import ProjectCard from "../components/ProjectCard";
import { SERVICES, METHODOLOGY } from "../data/services";
import { PROJECTS } from "../data/projects";
import { SITE } from "../data/siteConfig";

const TRUST_STATS = [
  { value: String(SITE.founded), label: "Established", detail: "Software engineering since 2016" },
  { value: "10", label: "Project engagements", detail: "Shown on our Projects page" },
  { value: "3", label: "Core disciplines", detail: "Web, backend/cloud, mobile" },
  { value: "IN", label: "Market focus", detail: "Client base across India" },
];

/**
 * Bespoke technical hero visual: an abstract network/node lattice drawn in
 * SVG, referencing the infinity motif. Decorative, aria-hidden.
 */
function HeroVisual() {
  const nodes = [
    [40, 80], [110, 40], [180, 110], [250, 60],
    [70, 170], [150, 200], [230, 160], [300, 120],
    [120, 260], [210, 280], [290, 230],
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 5], [5, 7], [1, 4], [4, 6],
    [6, 7], [4, 8], [8, 9], [9, 10], [6, 10], [2, 6], [5, 9],
  ];
  return (
    <svg
      viewBox="0 0 340 320"
      className="h-auto w-full"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="340" height="320" rx="16" fill="rgba(255,255,255,0.04)" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="#8C9EFF"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 5 : 3}
          fill={i % 3 === 0 ? "#DDC58F" : "#4F86F7"}
          fillOpacity={i % 3 === 0 ? 0.9 : 0.7}
        />
      ))}
      {/* Infinity motif anchor */}
      <path
        d="M130 95c6-10 12-17 25-17 13 0 22 8 22 17s-9 17-22 17c-13 0-19-7-25-17zm0 0c-6 10-12 17-25 17-13 0-22-8-22-17s9-17 22-17c13 0 19 7 25 17z"
        stroke="#DDC58F"
        strokeWidth="3"
        fill="none"
        strokeOpacity="0.85"
      />
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
      <section className="bg-hero-gradient text-white">
        <div className="container-section grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-100">
              Since {SITE.founded} · India
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Software engineering, done properly.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200">
              Infinity Lab designs, builds and operates web platforms, backend
              and cloud systems, and mobile applications — for newsrooms,
              institutions, retailers and product teams across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact" size="lg" variant="inverse">
                Start Your Project <FiArrowRight aria-hidden="true" />
              </Button>
              <Button to="/projects" size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                See our work
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              {["Accessible by default", "Performance-first builds", "Real operational support"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <FiCheckCircle aria-hidden="true" className="text-accent" />
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
        <div className="border-t border-white/10 bg-[#0f1930]">
          <dl className="container-section grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
            {TRUST_STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-bold text-white">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-primary-100">
                    {s.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-300">
                    {s.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
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
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
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
            <div className="rounded-card border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                What that means in practice
              </h3>
              <ul className="mt-4 space-y-3 text-base text-slate-700">
                {[
                  "Honest scope and timelines — no overpromising",
                  "Accessibility and performance treated as requirements, not extras",
                  "Operational support after launch, not abandonment",
                  "Clear documentation so your team is never locked out",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FiCheckCircle aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section aria-labelledby="services-heading" className="bg-slate-50 py-16 md:py-24">
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
          <div className="mt-8 text-center">
            <Button to="/services" variant="outline" size="md">
              Explore services in detail <FiArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Flagship projects */}
      <section aria-labelledby="projects-heading" className="py-16 md:py-24">
        <div className="container-section">
          <SectionHeading
            id="projects-heading"
            eyebrow="Flagship work"
            title="Platforms in production"
            lead="A selection of live builds, from regional news publishing to campus ERP and e-commerce."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {flagship.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button to="/projects" variant="primary" size="md">
              All projects <FiArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section aria-labelledby="method-heading" className="bg-slate-900 py-16 text-white md:py-24">
        <div className="container-section">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              How we deliver
            </p>
            <h2 id="method-heading" className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              A methodology that removes surprises
            </h2>
            <p className="mt-4 text-lg leading-7 text-slate-300">
              Four deliberate phases — the same discipline on every engagement,
              regardless of size.
            </p>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {METHODOLOGY.map((m) => (
              <li key={m.step} className="relative">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary-700 font-display text-lg font-bold text-white">
                  {m.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{m.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {m.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Start Project CTA */}
      <section aria-labelledby="cta-heading" className="py-16 md:py-24">
        <div className="container-section">
          <div className="cta-gradient rounded-card px-6 py-12 text-center text-white sm:px-12 md:py-16">
            <FiAnchor aria-hidden="true" className="mx-auto size-8 text-white/70" />
            <h2 id="cta-heading" className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-100">
              Tell us what you are building. We will reply with an honest
              scope, timeline and next step.
            </p>
            <Button to="/contact" size="lg" variant="inverse" className="mt-8">
              Start Your Project <FiArrowRight aria-hidden="true" />
            </Button>
            <p className="mt-6 text-sm text-slate-200">
              Prefer to browse first?{" "}
              <Link to="/projects" className="font-semibold text-white underline hover:no-underline">
                See all projects
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
