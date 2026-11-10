import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiLock, FiActivity, FiEye } from "react-icons/fi";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import GuaranteeStrip from "../components/ui/GuaranteeStrip";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/projects";
import { SITE } from "../data/siteConfig";

const DEFAULT_FILTER = "all";

/** Delivery-assurance ribbon items — contractual trust messaging. */
const ASSURANCES = [
  {
    title: "100% IP Ownership & NDA",
    body: "You retain complete intellectual property rights, repositories, infrastructure keys, and assets with strict NDAs signed prior to kick-off.",
    icon: FiLock,
  },
  {
    title: "Production SLA Guarantee",
    body: "Engineered with zero-downtime CI/CD pipelines, automated regression suites, and 99.9% uptime architecture guidelines.",
    icon: FiActivity,
  },
  {
    title: "Agile Sprint Visibility",
    body: "Weekly demo builds, clear sprint tracking boards, and direct access to lead software engineers via private Slack or Discord channels.",
    icon: FiEye,
  },
];

/** Pure helper: apply category filter to the project list (unit-tested). */
export function filterProjects(projects, categoryId) {
  if (!categoryId || categoryId === DEFAULT_FILTER) return projects;
  return projects.filter((p) => p.category === categoryId);
}

const TOTAL_COUNTS = { all: PROJECTS.length };
for (const p of PROJECTS) TOTAL_COUNTS[p.category] = (TOTAL_COUNTS[p.category] || 0) + 1;

const getCategoryLabel = (id) =>
  (PROJECT_CATEGORIES.find((c) => c.id === id) || PROJECT_CATEGORIES[0]).label;

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeParam = searchParams.get("category") || DEFAULT_FILTER;
  const active = PROJECT_CATEGORIES.some((c) => c.id === activeParam)
    ? activeParam
    : DEFAULT_FILTER;

  const [announced, setAnnounced] = useState("");

  const visible = useMemo(() => filterProjects(PROJECTS, active), [active]);

  const setFilter = (id) => {
    setSearchParams(id === DEFAULT_FILTER ? {} : { category: id }, {
      replace: true,
    });
    const n = TOTAL_COUNTS[id] || 0;
    setAnnounced(
      `Showing ${getCategoryLabel(id)}: ${n} project${n === 1 ? "" : "s"}`
    );
  };

  const activeLabel = getCategoryLabel(active);

  return (
    <>
      <Seo
        title={`Projects — ${SITE.name}`}
        description="Portfolio of web platforms, internal systems and digital products delivered by Infinity Lab — from news publishing and EdTech ERP to e-commerce."
        path="/projects"
      />

      {/* Page hero */}
      <section className="relative overflow-hidden">
        <div className="container-section pb-12 pt-10 md:pb-16 md:pt-14">
          <div className="mb-8 flex items-center gap-3" aria-hidden="true">
            <span className="signal-tick" />
            <span className="h-px flex-1 bg-border-subtle" />
          </div>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="type-display text-text-primary">Projects</h1>
              <div className="signal-rule mt-7 w-20" aria-hidden="true" />
            </div>
            <div className="lg:col-span-5">
              <p className="type-lead max-w-[52ch] text-text-secondary">
                Every build listed here is a real delivery — with an honest note
                where a link is no longer reachable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="projects-list-heading" className="section pt-4 md:pt-6">
        <div className="container-section">
          <SectionHeading
            id="projects-list-heading"
            index="01"
            eyebrow="Delivered work"
            title="Filter by discipline"
            lead="Choose the kind of system you are planning. Filters are toggle buttons — keyboard operable, with announced result counts."
          />

          {/* Accessible filter group — squared ledger control */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-10 flex flex-wrap gap-2 border-b border-border-subtle pb-5"
          >
            {PROJECT_CATEGORIES.map((c) => {
              const selected = active === c.id;
              const count = TOTAL_COUNTS[c.id] || 0;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(c.id)}
                  className={`inline-flex min-h-[42px] select-none items-center gap-2.5 rounded-btn border px-4 py-2 text-[13px] font-semibold transition-colors duration-150 ${
                    selected
                      ? "border-transparent bg-btn-bg text-btn-text"
                      : "border-border-subtle bg-transparent text-text-secondary hover:border-border-strong hover:text-text-primary"
                  }`}
                >
                  {c.label}
                  <span
                    aria-label={`${count} ${count === 1 ? "project" : "projects"}`}
                    className={`rounded-[2px] px-1.5 py-0.5 font-mono text-[10px] font-medium tabular-nums ${
                      selected
                        ? "bg-btn-text text-btn-bg"
                        : "border border-border-subtle bg-surface-sunken text-text-muted"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="sr-only">{announced}</p>

          {visible.length === 0 ? (
            <div className="mt-12 rounded-card border border-dashed border-border-strong bg-surface-sunken/60 p-10 text-center sm:p-14">
              <h3 className="font-display text-2xl tracking-[-0.02em] text-text-primary">
                No {activeLabel.toLowerCase()} projects published yet
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
                We do not list work we cannot stand behind. If you are planning
                a {activeLabel.toLowerCase()} product, we would be glad to
                discuss it — see the Contact page.
              </p>
              <div className="mt-8 flex justify-center">
                <Button to="/contact" size="md" arrow>
                  Start Your Project
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <ProjectCard key={p.id} project={p} detailed />
              ))}
            </div>
          )}

          <div className="relative mt-12 border border-border-subtle bg-surface-sunken/40 p-4 pl-5">
            <span className="signal-bar absolute bottom-0 left-0 top-0 w-0.5" aria-hidden="true" />
            <p className="max-w-3xl text-xs leading-relaxed text-text-muted">
              Our portfolio reflects our commitment to transparency.{" "}
              Project links are periodically reviewed, and their verification status is clearly communicated for a reliable browsing experience.
            </p>
          </div>
        </div>
      </section>

      {/* Delivery assurance — contractual trust ribbon + closing CTA */}
      <section
        aria-labelledby="assurance-heading"
        className="cv-auto section border-t border-border-subtle"
      >
        <div className="container-section">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="assurance-heading"
              index="02"
              eyebrow="Delivery assurance"
              title="Every engagement, protected"
              lead="Three commitments that apply to every project on this page — from the first signature to production operations."
            />
            <Button to="/contact" size="md" arrow className="shrink-0">
              Start Your Project
            </Button>
          </div>

          <div className="mt-12">
            <GuaranteeStrip items={ASSURANCES} />
          </div>
        </div>
      </section>
    </>
  );
}
