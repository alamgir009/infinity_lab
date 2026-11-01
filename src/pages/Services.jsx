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

/** Icon + accent style per technology group */
const GROUP_META = {
  "Frontend": { Icon: FiCode, chip: "bg-blue-50 text-blue-900 border-blue-200 dark:border-blue-800/60 dark:bg-blue-950/40 dark:text-blue-300" },
  "Backend": { Icon: FiServer, chip: "bg-violet-50 text-violet-900 border-violet-200 dark:border-violet-800/60 dark:bg-violet-950/40 dark:text-violet-300" },
  "Mobile": { Icon: FiSmartphone, chip: "bg-emerald-50 text-emerald-900 border-emerald-200 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-300" },
  "Database": { Icon: FiDatabase, chip: "bg-amber-50 text-amber-900 border-amber-200 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300" },
  "Cloud & DevOps": { Icon: FiCloud, chip: "bg-sky-50 text-sky-900 border-sky-200 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-300" },
  "CMS & Commerce": { Icon: FiShoppingCart, chip: "bg-rose-50 text-rose-900 border-rose-200 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-300" },
};

const ENGAGEMENT_PERKS = {
  project: ["Fixed scope & timeline", "Milestone-gated billing", "Full handover documentation"],
  retainer: ["Priority response SLA", "Monthly iteration budget", "Dedicated engineer contact"],
  partner: ["Hosting & monitoring included", "Continuous roadmap & iteration", "Long-term operational reliability"],
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
        <div className="container-section relative pt-10 pb-12 md:pt-14 md:pb-16">
          <h1 className="type-display font-heading text-text-on-brand tracking-tight">
            Services
          </h1>
          <p className="container-text mt-4 text-lg leading-relaxed text-text-on-brand-muted sm:text-xl">
            Three engineering disciplines, one accountable team. Whether you
            need a storefront, a platform or a system — this is how we can
            help.
          </p>
        </div>
      </section>

      {/* ── Service detail cards ─────────────────────────────────────────── */}
      <section aria-labelledby="svc-detail" className="pt-12 pb-16 md:pt-16 md:pb-24">
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

      {/* ── Technology stack ─────────────────────────────────────────────── */}
      <section aria-labelledby="stack-heading" className="cv-auto border-y border-border-subtle bg-surface-sunken/60 py-16 md:py-24">
        <div className="container-section">
          {/* Heading row with legend key */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="stack-heading"
              eyebrow="Technology"
              title="Stacks we build on"
              lead="Named tools and frameworks across every engineering discipline — chosen per project, the observable ones already in production."
            />
            <div className="flex shrink-0 items-center gap-5 pb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.1em]">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-500" />
                Delivered builds
              </span>
              <span className="inline-flex items-center gap-1.5 text-text-muted">
                <span className="size-2 rounded-full bg-slate-400" />
                Per project
              </span>
            </div>
          </div>

          {/* 6-up category cards grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {groups.map((g) => {
              const meta = GROUP_META[g] ?? { Icon: FiZap, chip: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300" };
              const { Icon, chip } = meta;
              const items = TECHNOLOGIES.filter((t) => t.group === g);

              return (
                <Card key={g} className="overflow-hidden">
                  {/* Category header */}
                  <div className="flex items-center gap-3 border-b border-border-subtle bg-surface-sunken/80 px-5 py-4">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-brand-chip text-brand-chip-text dark:bg-surface-sunken dark:text-brand">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-sm font-bold tracking-tight text-text-primary">
                      {g}
                    </h3>
                    <span className={`ml-auto rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${chip}`}>
                      {items.length}
                    </span>
                  </div>

                  {/* Tech items list */}
                  <ul className="divide-y divide-border-subtle/70 px-5 py-2">
                    {items.map((t) => (
                      <li
                        key={t.name}
                        className="flex items-center justify-between gap-3 py-3 text-sm transition-colors hover:bg-surface-sunken/30"
                      >
                        <span className="flex items-center gap-2.5 font-medium text-text-primary">
                          {t.observable ? (
                            <FiCheckCircle
                              aria-hidden="true"
                              className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="inline-block size-4 shrink-0 text-center font-mono text-xs text-text-muted select-none"
                            >
                              —
                            </span>
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

          <p className="mt-8 font-mono text-xs leading-relaxed text-text-muted">
            * Observable means the tool is verifiable in delivered portfolio builds.
            Per-project tools are selected based on each project&apos;s requirements.
          </p>
        </div>
      </section>

      {/* ── Engagement models ────────────────────────────────────────────── */}
      <section aria-labelledby="engagement-heading" className="cv-auto py-16 md:py-24">
        <div className="container-section">
          <SectionHeading
            id="engagement-heading"
            eyebrow="Engagement models"
            title="Work with us the way that fits"
            lead="Three clear commercial structures — pick the one that matches your project stage and team needs."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((m) => {
              const perks = ENGAGEMENT_PERKS[m.id] ?? [];
              return (
                <Card key={m.id} interactive className="h-full">
                  {/* Top hairline accent */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-brand opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
                  />
                  <div className="flex h-full flex-col p-6 sm:p-8">
                    <h3 className="font-display text-xl font-bold tracking-tight text-text-primary">{m.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {m.description}
                    </p>
                    {perks.length > 0 && (
                      <ul className="mt-auto space-y-3 border-t border-border-subtle pt-6">
                        {perks.map((perk) => (
                          <li key={perk} className="flex items-center gap-2.5 text-sm">
                            <FiCheckCircle
                              aria-hidden="true"
                              className="size-4 shrink-0 text-brand"
                            />
                            <span className="text-text-primary font-medium">{perk}</span>
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
      <section aria-labelledby="svc-cta" className="cv-auto pb-16 md:pb-24">
        <div className="container-section">
          <div className="relative overflow-hidden rounded-card-lg border border-border-subtle bg-surface-card px-6 py-14 text-center shadow-card card-rim sm:px-12 md:py-20 dark:border-slate-800">
            <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <h2 id="svc-cta" className="type-heading text-text-primary md:text-4xl">
                Not sure which model fits?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
                Describe your project in a sentence or two. We will recommend
                the right approach — honestly.
              </p>
              <div className="mt-8 flex justify-center">
                <Button to="/contact" size="lg" variant="primary">
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
