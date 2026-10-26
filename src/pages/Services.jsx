import Seo from "../components/Seo";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { SERVICES, ENGAGEMENT_MODELS, TECHNOLOGIES } from "../data/services";
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
      <section className="bg-brand-deep relative overflow-hidden">
        <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-section relative py-16 md:py-24">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent-gold" />
            What we do
          </p>
          <h1 className="type-display mt-6 font-display text-white">
            Services
          </h1>
          <p className="container-text mt-5 text-lg leading-8 text-text-on-inverse-muted">
            Three engineering disciplines, one accountable team. Whether you
            need a storefront, a platform or a system — this is how we can
            help.
          </p>
        </div>
      </section>

      {/* Service detail cards */}
      <section aria-labelledby="svc-detail" className="py-20 md:py-28">
        <div className="container-section">
          <SectionHeading
            id="svc-detail"
            eyebrow="Disciplines"
            title="Detail on each discipline"
            lead="Every engagement includes the deliverables listed — agreed up front, tracked transparently."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} detailed />
            ))}
          </div>
        </div>
      </section>

      {/* Technology stacks */}
      <section aria-labelledby="stack-heading" className="border-y border-border-subtle bg-surface-sunken py-20 md:py-28">
        <div className="container-section">
          <SectionHeading
            id="stack-heading"
            eyebrow="Technology"
            title="Stacks we build on"
          />
          <p className="mt-4 max-w-2xl text-sm leading-6 text-text-muted">
            Platform technologies below are those visibly powering our
            delivered builds. For other groups we state capability categories —
            the exact stack is always chosen per project rather than claimed
            in advance.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {groups.map((g) => (
              <Card key={g} className="p-6">
                <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  {g}
                </h3>
                <ul className="mt-5 space-y-3">
                  {TECHNOLOGIES.filter((t) => t.group === g).map((t) => (
                    <li
                      key={t.name}
                      className="flex items-center justify-between gap-3 border-b border-border-subtle pb-3 text-sm last:border-0 last:pb-0"
                    >
                      <span className="font-medium text-text-primary">{t.name}</span>
                      <Badge tone={t.observable ? "live" : "neutral"}>
                        {t.observable ? "in delivered builds" : "per project"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section aria-labelledby="engagement-heading" className="py-20 md:py-28">
        <div className="container-section">
          <SectionHeading
            id="engagement-heading"
            eyebrow="Engagement models"
            title="Work with us the way that fits"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((m) => (
              <Card key={m.id}>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-text-primary">{m.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {m.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="svc-cta" className="pb-20 md:pb-28">
        <div className="container-section">
          <div className="bg-brand-deep relative overflow-hidden rounded-[1.25rem] px-6 py-14 text-center sm:px-12 md:py-16">
            <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <h2 id="svc-cta" className="type-heading text-white">
                Not sure which model fits?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-on-inverse-muted">
                Describe your project in a sentence or two. We will recommend
                the right approach — honestly.
              </p>
              <Button to="/contact" size="lg" variant="inverse" className="mt-8">
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
