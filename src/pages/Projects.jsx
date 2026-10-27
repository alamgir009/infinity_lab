import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/projects";
import { SITE } from "../data/siteConfig";

const DEFAULT_FILTER = "all";

/** Pure helper: apply category filter to the project list (unit-tested). */
export function filterProjects(projects, categoryId) {
  if (!categoryId || categoryId === DEFAULT_FILTER) return projects;
  return projects.filter((p) => p.category === categoryId);
}

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeParam = searchParams.get("category") || DEFAULT_FILTER;
  const active = PROJECT_CATEGORIES.some((c) => c.id === activeParam)
    ? activeParam
    : DEFAULT_FILTER;

  const [announced, setAnnounced] = useState("");

  const visible = useMemo(() => filterProjects(PROJECTS, active), [active]);

  const totalCounts = useMemo(() => {
    const counts = { all: PROJECTS.length };
    for (const p of PROJECTS) counts[p.category] = (counts[p.category] || 0) + 1;
    return counts;
  }, []);

  const visibleLabel = (id) =>
    (PROJECT_CATEGORIES.find((c) => c.id === id) || PROJECT_CATEGORIES[0]).label;

  const setFilter = (id) => {
    setSearchParams(id === DEFAULT_FILTER ? {} : { category: id }, {
      replace: true,
    });
    const n = filterProjects(PROJECTS, id).length;
    setAnnounced(
      `Showing ${visibleLabel(id)}: ${n} project${n === 1 ? "" : "s"}`
    );
  };

  const activeLabel = visibleLabel(active);

  return (
    <>
      <Seo
        title={`Projects — ${SITE.name}`}
        description="Portfolio of web platforms, internal systems and digital products delivered by Infinity Lab — from news publishing and EdTech ERP to e-commerce."
        path="/projects"
      />

      {/* Page hero */}
      <section className="bg-brand-deep relative overflow-hidden">
        <div className="bg-grid-fine pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-section relative pt-8 pb-10 md:pt-10 md:pb-12">
          <h1 className="type-display font-display text-text-on-brand">
            Projects
          </h1>
          <p className="container-text mt-4 text-lg leading-8 text-text-on-brand-muted">
            Every build listed here is a real delivery — with an honest note
            where a link is no longer reachable.
          </p>
        </div>
      </section>

      <section aria-labelledby="projects-list-heading" className="pt-10 pb-16 md:pb-20">
        <div className="container-section">
          <SectionHeading
            id="projects-list-heading"
            eyebrow="Delivered work"
            title="Filter by discipline"
            lead="Choose the kind of system you are planning. Filters are toggle buttons — keyboard operable, with announced result counts."
          />

          {/* Accessible filter group */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {PROJECT_CATEGORIES.map((c) => {
              const selected = active === c.id;
              const count = totalCounts[c.id] || 0;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(c.id)}
                  className={`inline-flex min-h-[44px] items-center gap-2.5 rounded-btn border px-4 py-2 text-sm font-semibold transition-[background-color,border-color,color] duration-150 ${selected
                      ? "border-btn-bg bg-btn-bg text-btn-text shadow-card"
                      : "border-border-subtle bg-surface-card text-text-secondary hover:border-brand hover:text-brand"
                    }`}
                >
                  {c.label}
                  <span
                    aria-label={`${count} ${count === 1 ? "project" : "projects"}`}
                    className={`rounded-full px-2 py-0.5 text-xs font-bold [font-variant-numeric:tabular-nums] ${selected
                        ? "bg-white/15 text-white"
                        : "bg-surface-sunken text-text-muted"
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
            <div className="mt-12 rounded-card border border-dashed border-border-strong bg-surface-sunken p-10 text-center sm:p-14">
              <h3 className="text-lg font-bold text-text-primary">
                No {activeLabel.toLowerCase()} projects published yet
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-secondary">
                We do not list work we cannot stand behind. If you are planning
                a {activeLabel.toLowerCase()} product, we would be glad to
                discuss it — see the Contact page.
              </p>
              <Button to="/contact" size="md" className="mt-8">
                Start Your Project
              </Button>
            </div>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <ProjectCard key={p.id} project={p} detailed />
              ))}
            </div>
          )}

          <p className="mt-10 max-w-3xl text-xs leading-5 text-text-muted">
            Link availability checked on 2026-10-26. Projects whose domains no
            longer resolve are kept listed with an explicit{" "}
            <span className="font-semibold text-text-secondary">Unverified link</span>{" "}
            badge rather than being silently hidden or claimed as live.
          </p>
        </div>
      </section>
    </>
  );
}
