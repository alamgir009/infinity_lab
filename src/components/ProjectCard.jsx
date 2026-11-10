import { memo } from "react";
import { FiExternalLink, FiClock } from "react-icons/fi";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import { LinkStatusBadge } from "./Button";

/**
 * Reusable project card — a file record: title, status, mono domain,
 * metric table, labelled problem/solution, and one clear action.
 *
 * @param {object}   props
 * @param {{ id: string, name: string, url: string, category: string,
 *          verified: boolean, summary: string, problem?: string,
 *          solution?: string, techTags?: string[], statusLabel?: string,
 *          checkedOn?: string, timeline?: string, client?: string,
 *          highlights?: Array<{ value: string, label: string }> }} props.project
 * @param {boolean} [props.detailed]
 */
const ProjectCard = memo(function ProjectCard({ project, detailed = false }) {
  const {
    name,
    url,
    verified,
    summary,
    problem,
    solution,
    techTags = [],
    timeline,
    client,
    highlights = [],
  } = project;

  const domain = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  return (
    <Card interactive className="h-full">
      <div className="flex grow flex-col p-6 sm:p-7">
        {/* Header: project title + link status, one aligned row */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 type-card text-text-primary">
            {name}
          </h3>
          <LinkStatusBadge verified={verified} />
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-flex min-h-[30px] items-center font-mono text-[11px] tracking-[0.02em] text-text-muted transition-colors hover:text-brand"
        >
          {domain}
        </a>

        {/* Meta row: engagement timeline + client segment (detailed mode) */}
        {detailed && (timeline || client) && (
          <div className="mt-2.5 flex items-center gap-x-3 gap-y-1.5 text-xs">
            {timeline && (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[3px] border border-border-subtle bg-brand-soft px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-brand-soft-text">
                <FiClock size={11} aria-hidden="true" />
                {timeline}
              </span>
            )}
            {client && (
              <span className="inline-flex min-w-0 items-center gap-1.5 text-text-muted">
                <span aria-hidden="true" className="select-none text-border-strong">
                  /
                </span>
                <span className="truncate">
                  <span className="sr-only">Client: </span>
                  {client}
                </span>
              </span>
            )}
          </div>
        )}

        <p className="mt-4 text-sm leading-relaxed text-text-secondary line-clamp-2">
          {summary}
        </p>

        {/* Outcome metrics: three stat cells on a hairline grid (detailed mode) */}
        {detailed && highlights.length > 0 && (
          <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-[3px] border border-border-subtle bg-border-subtle">
            {highlights.map((h) => (
              <div key={h.label} className="min-w-0 bg-surface-sunken/60 px-2.5 py-3 text-center">
                <dt className="sr-only">{h.label}</dt>
                <dd>
                  <span className="block font-display text-lg leading-tight tracking-[-0.02em] text-text-primary [font-variant-numeric:tabular-nums]">
                    {h.value}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-text-muted line-clamp-2">
                    {h.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        {detailed && problem && (
          <div className="mt-5 space-y-3 rounded-[3px] border border-border-subtle bg-surface-sunken/40 p-4 text-sm leading-relaxed">
            <p className="text-text-secondary line-clamp-3">
              <span className="font-semibold text-text-primary">Problem — </span>
              {problem}
            </p>
            <p className="text-text-secondary line-clamp-3">
              <span className="font-semibold text-text-primary">Solution — </span>
              {solution}
            </p>
          </div>
        )}

        {techTags.length > 0 && (
          <ul
            className="mt-4 flex flex-wrap gap-1.5"
            aria-label={`Technologies used in ${name}`}
          >
            {techTags.map((t) => (
              <li key={t}>
                <Badge tone="neutral" className="text-[9px]">
                  {t}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        {/* Footer action aligned across all cards */}
        <div className="mt-auto pt-6">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex min-h-[44px] w-full items-center justify-between gap-2 rounded-btn border border-border-subtle bg-transparent px-4 text-sm font-semibold text-text-primary transition-colors duration-150 hover:border-border-strong hover:bg-surface-sunken"
          >
            <span>{verified ? "Visit live site" : "Open provided link"}</span>
            <FiExternalLink
              size={15}
              aria-hidden="true"
              className="text-text-muted transition-transform duration-150 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 group-hover/btn:text-brand"
            />
            <span className="sr-only">
              {` — ${domain}${verified ? "" : "; this link was unreachable when last checked on " + (project.checkedOn || "")}`}
            </span>
          </a>
        </div>
      </div>
    </Card>
  );
});

export default ProjectCard;
