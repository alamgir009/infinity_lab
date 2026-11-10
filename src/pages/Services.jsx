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
import { SERVICES, ENGAGEMENT_MODELS, TECHNOLOGIES } from "../data/services";
import { SITE } from "../data/siteConfig";

/** Icon per technology group — one accent, no rainbow chips. */
const GROUP_META = {
  Frontend: { Icon: FiCode },
  Backend: { Icon: FiServer },
  Mobile: { Icon: FiSmartphone },
  Database: { Icon: FiDatabase },
  "Cloud & DevOps": { Icon: FiCloud },
  "CMS & Commerce": { Icon: FiShoppingCart },
};

const ENGAGEMENT_PERKS = {
  project: ["Fixed scope & timeline", "Milestone-gated billing", "Full handover documentation"],
  retainer: ["Priority response SLA", "Monthly iteration budget", "Dedicated engineer contact"],
  partner: ["Hosting & monitoring included", "Continuous roadmap & iteration", "Long-term operational reliability"],
};

const TECH_GROUPS = Array.from(new Set(TECHNOLOGIES.map((t) => t.group))).map((g) => ({
  group: g,
  items: TECHNOLOGIES.filter((t) => t.group === g),
}));

export default function Services() {
  return (
    <>
      <Seo
        title={`Services — ${SITE.name}`}
        description="Full-stack web development, backend & cloud architecture, and mobile development — delivered by Infinity Lab, an engineering company operating since 2016."
        path="/services"
      />

      {/* ── Page hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container-section pb-12 pt-10 md:pb-16 md:pt-14">
          <div className="mb-8 flex items-center gap-3" aria-hidden="true">
            <span className="signal-tick" />
            <span className="h-px flex-1 bg-border-subtle" />
          </div>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="type-display text-text-primary">Services</h1>
              <div className="signal-rule mt-7 w-20" aria-hidden="true" />
            </div>
            <div className="lg:col-span-5">
              <p className="type-lead max-w-[52ch] text-text-secondary">
                Three engineering disciplines, one accountable team. Whether you
                need a storefront, a platform or a system — this is how we can
                help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service detail cards ─────────────────────────────────────────── */}
      <section aria-labelledby="svc-detail" className="section pt-4 md:pt-6">
        <div className="container-section">
          <SectionHeading
            id="svc-detail"
            index="01"
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
      <section aria-labelledby="stack-heading" className="cv-auto section border-y border-border-subtle bg-surface-sunken/50">
        <div className="container-section">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="stack-heading"
              index="02"
              eyebrow="Technology"
              title="Stacks we build on"
              lead="Named tools and frameworks across every engineering discipline — chosen per project, the observable ones already in production."
            />
            <div className="flex shrink-0 flex-wrap items-center gap-5 pb-1 font-mono text-[10px] uppercase tracking-[0.12em]">
              <span className="inline-flex items-center gap-2 text-positive">
                <span className="size-1.5 rounded-full bg-positive" aria-hidden="true" />
                Delivered builds
              </span>
              <span className="inline-flex items-center gap-2 text-text-muted">
                <span className="size-1.5 rounded-full bg-border-strong" aria-hidden="true" />
                Per project
              </span>
            </div>
          </div>

          {/* 6-up category ledger */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {TECH_GROUPS.map(({ group: g, items }) => {
              const meta = GROUP_META[g] ?? { Icon: FiZap };
              const { Icon } = meta;

              return (
                <Card key={g}>
                  {/* Category header */}
                  <div className="flex items-center gap-3 border-b border-border-subtle px-5 py-4">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-[3px] border border-border-subtle bg-brand-soft text-brand-soft-text">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg leading-none tracking-[-0.02em] text-text-primary">
                      {g}
                    </h3>
                    <span className="ml-auto font-mono text-[10px] font-medium tabular-nums tracking-[0.12em] text-text-muted">
                      {String(items.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Tech items */}
                  <ul className="flex flex-1 flex-col px-5">
                    {items.map((t) => (
                      <li
                        key={t.name}
                        className="flex flex-1 items-center justify-between gap-3 border-b border-border-subtle/70 py-3 text-sm last:border-b-0"
                      >
                        <span className="flex min-w-0 items-center gap-2.5 font-medium text-text-primary">
                          {t.observable ? (
                            <FiCheckCircle
                              aria-hidden="true"
                              className="size-4 shrink-0 text-positive"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="inline-block w-4 shrink-0 text-center font-mono text-xs text-text-muted"
                            >
                              —
                            </span>
                          )}
                          <span className="truncate">{t.name}</span>
                        </span>
                        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[9.5px] uppercase leading-none tracking-[0.12em] text-text-muted">
                          <span
                            aria-hidden="true"
                            className={`size-1 rounded-full ${
                              t.observable
                                ? "bg-positive"
                                : "border border-border-strong"
                            }`}
                          />
                          {t.observable ? "delivered" : "per project"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          <p className="mt-8 max-w-3xl font-mono text-[11px] leading-relaxed tracking-[0.01em] text-text-muted">
            * Observable means the tool is verifiable in delivered portfolio builds.
            Per-project tools are selected based on each project&apos;s requirements.
          </p>
        </div>
      </section>

      {/* ── Engagement models ────────────────────────────────────────────── */}
      <section aria-labelledby="engagement-heading" className="cv-auto section">
        <div className="container-section">
          <SectionHeading
            id="engagement-heading"
            index="03"
            eyebrow="Engagement models"
            title="Work with us the way that fits"
            lead="Three clear commercial structures — pick the one that matches your project stage and team needs."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((m, i) => {
              const perks = ENGAGEMENT_PERKS[m.id] ?? [];
              return (
                <Card key={m.id} interactive className="h-full">
                  <div className="flex h-full flex-col p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        aria-hidden="true"
                        className="font-mono text-[10px] tabular-nums tracking-[0.16em] text-text-muted"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="signal-tick" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 type-card text-text-primary">
                      {m.name}
                    </h3>
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
                            <span className="font-medium text-text-primary">{perk}</span>
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
      <section aria-labelledby="svc-cta" className="cv-auto section-tight pb-20 pt-6">
        <div className="container-section">
          <div className="relative overflow-hidden border-y border-border-subtle py-14 md:py-20">
            <div className="signal-bar absolute left-0 top-0 w-24" aria-hidden="true" />
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <h2 id="svc-cta" className="type-heading text-text-primary">
                  Have a project in mind?
                </h2>
                <p className="type-lead mt-5 max-w-xl text-text-secondary">
                  Describe your project in a sentence or two. We will reply with an honest scope, timeline and next step.
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
