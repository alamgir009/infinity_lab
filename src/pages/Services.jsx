import Seo from "../components/Seo";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import {
  SERVICES,
  ENGAGEMENT_MODELS,
  TECHNOLOGIES,
} from "../data/services";
import { SITE } from "../data/siteConfig";

export default function Services() {
  const groups = [...new Set(TECHNOLOGIES.map((t) => t.group))];

  return (
    <>
      <Seo
        title={`Services — ${SITE.name}`}
        description="Full-stack web development, backend & cloud architecture, and mobile development — delivered by Infinity Lab, an engineering company operating since 2016."
        path="/services"
      />

      {/* Page hero */}
      <section className="bg-hero-gradient text-white">
        <div className="container-section py-14 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Services
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              Three engineering disciplines, one accountable team. Whether you
              need a storefront, a platform or a system — this is how we can
              help.
            </p>
          </div>
        </div>
      </section>

      {/* Service detail cards */}
      <section aria-labelledby="svc-detail" className="py-16 md:py-24">
        <div className="container-section">
          <SectionHeading
            id="svc-detail"
            eyebrow="What we do"
            title="Detail on each discipline"
            lead="Every engagement includes the deliverables listed — agreed up front, tracked transparently."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} detailed />
            ))}
          </div>
        </div>
      </section>

      {/* Technology stacks */}
      <section aria-labelledby="stack-heading" className="bg-slate-50 py-16 md:py-24">
        <div className="container-section">
          <SectionHeading
            id="stack-heading"
            eyebrow="Technology"
            title="Stacks we build on"
          />
          <p className="mt-4 max-w-2xl text-sm text-slate-600">
            Platform technologies below are those visibly powering our
            delivered builds. For other groups we state capability categories —
            the exact stack is always chosen per project rather than claimed
            in advance.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {groups.map((g) => (
              <div key={g} className="rounded-card border border-slate-200 bg-white p-6 shadow-card">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-primary-700">
                  {g}
                </h3>
                <ul className="mt-4 space-y-2">
                  {TECHNOLOGIES.filter((t) => t.group === g).map((t) => (
                    <li
                      key={t.name}
                      className="flex items-center justify-between text-sm text-slate-700"
                    >
                      <span>{t.name}</span>
                      {t.observable ? (
                        <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                          in delivered builds
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                          per project
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section aria-labelledby="engagement-heading" className="py-16 md:py-24">
        <div className="container-section">
          <SectionHeading
            id="engagement-heading"
            eyebrow="Engagement models"
            title="Work with us the way that fits"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((m) => (
              <article
                key={m.id}
                className="flex h-full flex-col rounded-card border border-slate-200 bg-white p-6 shadow-card"
              >
                <h3 className="text-lg font-semibold text-slate-900">{m.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {m.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="svc-cta" className="pb-16 md:pb-24">
        <div className="container-section">
          <div className="cta-gradient rounded-card px-6 py-12 text-center text-white sm:px-12">
            <h2 id="svc-cta" className="text-3xl font-bold text-white">
              Not sure which model fits?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-100">
              Describe your project in a sentence or two. We will recommend the
              right approach — honestly.
            </p>
            <Button to="/contact" size="lg" variant="inverse" className="mt-8">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
