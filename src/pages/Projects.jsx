import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/Button";
import ProjectCard from "../components/ProjectCard";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
} from "../data/projects";
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
  const active =
    PROJECT_CATEGORIES.some((c) => c.id === activeParam)
      ? activeParam
      : DEFAULT_FILTER;

  const [announced, setAnnounced] = useState("");

  const visible = useMemo(
    () => filterProjects(PROJECTS, active),
    [active]
  );

  const totalCounts = useMemo(() => {
    const counts = { all: PROJECTS.length };
    for (const p of PROJECTS) counts[p.category] = (counts[p.category] || 0) + 1;
    return counts;
  }, []);

  const setFilter = (id) => {
    setSearchParams(id === DEFAULT_FILTER ? {} : { category: id }, {
      replace: true,
    });
    setAnnounced(
      `Showing ${visibleLabel(id)}: ${filterProjects(PROJECTS, id).length} project${filterProjects(PROJECTS, id).length === 1 ? "" : "s"}`
    );
  };

  const visibleLabel = (id) =>
    (PROJECT_CATEGORIES.find((c) => c.id === id) || PROJECT_CATEGORIES[0]).label;

  const activeLabel = visibleLabel(active);

  return (
    <>
      <Seo
        title={`Projects — ${SITE.name}`}
        description="Portfolio of web platforms, internal systems and digital products delivered by Infinity Lab — from news publishing and EdTech ERP to e-commerce."
        path="/projects"
      />

      <section className="bg-hero-gradient text-white">
        <div className="container-section py-14 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Projects
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              Every build listed here is a real delivery — with an honest note
              where a link is no longer reachable.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="projects-list-heading" className="py-16 md:py-24">
        <div className="container-section">
          <SectionHeading
            id="projects-list-heading"
            eyebrow="Portfolio"
            title="Delivered work, by discipline"
            lead="Filter by the kind of system you are planning. Use the arrow keys or Tab to move between filters."
          />

          {/* Accessible filter group */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="mt-10 flex flex-wrap gap-3"
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
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-btn border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                    selected
                      ? "border-primary-700 bg-primary-700 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-primary-600 hover:text-primary-800"
                  } ${count === 0 && !selected ? "opacity-90" : ""}`}
                >
                  {c.label}
                  <span
                    aria-label={`${count} ${count === 1 ? "project" : "projects"}`}
                    className={`rounded-full px-1.5 text-xs font-bold ${
                      selected ? "bg-primary-800 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="sr-only">{announced}</p>

          {/* Mobile empty state honesty */}
          {visible.length === 0 ? (
            <div className="mt-10 rounded-card border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No {activeLabel.toLowerCase()} projects published yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                We do not list work we cannot stand behind. If you are planning
                a {activeLabel.toLowerCase()} product, we would be glad to
                discuss it — see the Contact page.
              </p>
              <Button to="/contact" size="md" className="mt-6">
                Start Your Project
              </Button>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((p) => (
                <ProjectCard key={p.id} project={p} detailed />
              ))}
            </div>
          )}

          <p className="mt-8 text-xs leading-5 text-slate-500">
            Link availability checked on 2026-10-26. Projects whose domains no
            longer resolve are kept listed with an explicit{" "}
            <span className="font-semibold">Unverified link</span> badge rather
            than being silently hidden or claimed as live.
          </p>
        </div>
      </section>
    </>
  );
}
