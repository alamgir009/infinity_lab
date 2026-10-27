import {
  FiCode,
  FiServer,
  FiSmartphone,
  FiDatabase,
  FiCloud,
  FiShoppingCart,
  FiCheckCircle,
  FiZap,
} from "react-icons/fi";
import Seo from "../components/Seo";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { SERVICES, ENGAGEMENT_MODELS, TECHNOLOGIES } from "../data/services";
import { SITE } from "../data/siteConfig";

/** Icon + accent-gradient per technology group */
const GROUP_META = {
  "Frontend":         { Icon: FiCode,        gradient: "from-blue-500 to-indigo-600",   chip: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  "Backend":          { Icon: FiServer,       gradient: "from-violet-500 to-purple-600", chip: "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
  "Mobile":           { Icon: FiSmartphone,   gradient: "from-emerald-500 to-teal-600",  chip: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
  "Database":         { Icon: FiDatabase,     gradient: "from-orange-500 to-amber-600",  chip: "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" },
  "Cloud & DevOps":   { Icon: FiCloud,        gradient: "from-sky-500 to-cyan-600",      chip: "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" },
  "CMS & Commerce":   { Icon: FiShoppingCart, gradient: "from-rose-500 to-pink-600",     chip: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" },
};

const ENGAGEMENT_PERKS = {
  project:  ["Fixed scope & timeline", "Milestone-gated billing", "Full handover documentation"],
  retainer: ["Priority response SLA", "Monthly iteration budget", "Dedicated engineer contact"],
  partner:  ["Hosting & monitoring included", "Continuous roadmap & iteration", "Long-term operational reliability"],
};

export default function Services() {
  const groups = [...new Set(TECHNOLOGIES.map((t) => t.group))];

  return (
    <>
      <Seo
        title={`Services — ${SITE.name}`}
        description="Full-stack web development, backend & cloud architecture, and mobile development — delivered by Infinity Lab, an engineering company operating since 2016."
        path="/services"
      />

      {/* ── Page hero ───────────────────────────────────────────────────── */}
      <section className="bg-brand-deep relative overflow-hidden">
        <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-section relative pt-8 pb-10 md:pt-10 md:pb-12">
          <h1 className="type-display font-display text-text-on-brand">
            Services
          </h1>
          <p className="container-text mt-4 text-lg leading-8 text-text-on-brand-muted">
            Three engineering disciplines, one accountable team. Whether you
            need a storefront, a platform or a system — this is how we can
            help.
          </p>
        </div>
      </section>

      {/* ── Service detail cards ─────────────────────────────────────────── */}
      <section aria-labelledby="svc-detail" className="pt-10 pb-16 md:pb-20">
        <div className="container-section">
          <SectionHeading
            id="svc-detail"
            eyebrow="Disciplines"
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

      {/* ── Technology stack ─────────────────────────────────────────────── */}
      <section
        aria-labelledby="stack-heading"
        className="border-y border-border-subtle bg-surface-sunken py-14 md:py-16"
      >
        <div className="container-section">
          {/* Heading row with legend key */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="stack-heading"
              eyebrow="Technology"
              title="Stacks we build on"
              lead="Named tools and frameworks across every engineering discipline — chosen per project, the observable ones already in production."
            />
            <div className="flex shrink-0 items-center gap-5 pb-1 text-[11px] font-semibold uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="inline-block size-2 rounded-full bg-emerald-500" />
                Delivered builds
              </span>
              <span className="inline-flex items-center gap-1.5 text-text-muted">
                <span className="inline-block size-2 rounded-full border border-border-strong" />
                Per project
              </span>
            </div>
          </div>

          {/* 6-up category cards grid */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {groups.map((g) => {
              const meta = GROUP_META[g] ?? { Icon: FiZap, gradient: "from-slate-500 to-slate-600", chip: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300" };
              const { Icon, gradient, chip } = meta;
              const items = TECHNOLOGIES.filter((t) => t.group === g);

              return (
                <Card key={g} className="overflow-hidden">
                  {/* Category header */}
                  <div className="flex items-center gap-3 border-b border-border-subtle bg-surface-sunken px-5 py-4">
                    <span className={`inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-sm`}>
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-sm font-semibold tracking-tight text-text-primary">
                      {g}
                    </h3>
                    <span className={`ml-auto rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest ${chip}`}>
                      {items.length}
                    </span>
                  </div>

                  {/* Tech items list */}
                  <ul className="divide-y divide-border-subtle px-5 py-2">
                    {items.map((t) => (
                      <li
                        key={t.name}
                        className="flex items-center justify-between gap-3 py-2.5 text-sm"
                      >
                        <span className="flex items-center gap-2.5 font-medium text-text-primary">
                          {t.observable ? (
                            <FiCheckCircle
                              aria-hidden="true"
                              className="size-3.5 shrink-0 text-emerald-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="inline-block size-3.5 shrink-0 rounded-full border border-border-strong"
                            />
                          )}
                          {t.name}
                        </span>
                        <Badge tone={t.observable ? "live" : "neutral"}>
                          {t.observable ? "delivered" : "per project"}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          <p className="mt-8 text-xs leading-6 text-text-muted">
            * Observable means the tool is verifiable in delivered portfolio builds.
            Per-project tools are selected based on each project's requirements.
          </p>
        </div>
      </section>

      {/* ── Engagement models ────────────────────────────────────────────── */}
      <section aria-labelledby="engagement-heading" className="py-14 md:py-16">
        <div className="container-section">
          <SectionHeading
            id="engagement-heading"
            eyebrow="Engagement models"
            title="Work with us the way that fits"
            lead="Three clear commercial structures — pick the one that matches your project stage and team needs."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((m) => {
              const perks = ENGAGEMENT_PERKS[m.id] ?? [];
              return (
                <Card key={m.id} interactive>
                  {/* Hover brand hairline accent */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand/0 via-brand to-brand/0 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
                  />
                  <div className="flex flex-col p-6">
                    <h3 className="text-lg font-bold text-text-primary">{m.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      {m.description}
                    </p>
                    {perks.length > 0 && (
                      <ul className="mt-6 space-y-2.5 border-t border-border-subtle pt-5">
                        {perks.map((perk) => (
                          <li key={perk} className="flex items-center gap-2.5 text-sm">
                            <FiCheckCircle
                              aria-hidden="true"
                              className="size-4 shrink-0 text-brand"
                            />
                            <span className="text-text-primary">{perk}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section aria-labelledby="svc-cta" className="pb-12 md:pb-16">
        <div className="container-section">
          <div className="bg-brand-deep relative overflow-hidden rounded-[1.25rem] border border-border-subtle px-6 py-12 text-center shadow-card sm:px-12 md:py-16 dark:border-transparent dark:shadow-none">
            <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <h2 id="svc-cta" className="type-heading text-text-on-brand">
                Not sure which model fits?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-7 text-text-on-brand-muted">
                Describe your project in a sentence or two. We will recommend
                the right approach — honestly.
              </p>
              <Button to="/contact" size="lg" variant="inverse" className="mt-9">
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
