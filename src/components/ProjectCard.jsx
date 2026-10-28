import { FiExternalLink, FiClock } from "react-icons/fi";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import { LinkStatusBadge } from "./Button";

/**
 * Reusable project card — title + status dot badge, refined tags and a
 * consistent visit action. Detailed mode adds a timeline/client meta row,
 * a three-cell outcome-metric strip and problem/solution blocks for the
 * Projects page.
 *
 * @param {object}   props
 * @param {{ id: string, name: string, url: string, category: string,
 *          verified: boolean, summary: string, problem?: string,
 *          solution?: string, techTags?: string[], statusLabel?: string,
 *          checkedOn?: string, timeline?: string, client?: string,
 *          highlights?: Array<{ value: string, label: string }> }} props.project
 * @param {boolean} [props.detailed]
 */
export default function ProjectCard({ project, detailed = false }) {
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
    <Card interactive>
      <div className="flex grow flex-col p-6">
        {/* Header: project title + link status, one aligned row */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-lg font-semibold leading-snug tracking-tight text-text-primary">
            {name}
          </h3>
          <LinkStatusBadge verified={verified} />
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5 inline-flex min-h-[36px] items-center text-xs text-text-muted hover:text-brand"
        >
          {domain}
        </a>

        {/* Meta row: engagement timeline + client segment (detailed mode) */}
        {detailed && (timeline || client) && (
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
            {timeline && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-brand-chip px-2.5 py-0.5 font-semibold text-brand-chip-text">
                <FiClock size={11} aria-hidden="true" />
                {timeline}
              </span>
            )}
            {client && (
              <span className="inline-flex min-w-0 items-center gap-1.5 text-text-muted">
                <span
                  aria-hidden="true"
                  className="size-1 shrink-0 rounded-full bg-border-strong"
                />
                <span className="truncate">
                  <span className="sr-only">Client: </span>
                  {client}
                </span>
              </span>
            )}
          </div>
        )}

        <p className="mt-3 text-sm leading-[22px] text-text-secondary line-clamp-2">
          {summary}
        </p>

        {/* Outcome metrics: three stat cells on a hairline grid (detailed mode) */}
        {detailed && highlights.length > 0 && (
          <dl className="mt-4 grid grid-cols-3 divide-x divide-border-subtle overflow-hidden rounded-btn border border-border-subtle bg-surface-sunken/60">
            {highlights.map((h) => (
              <div key={h.label} className="min-w-0 px-2 py-2.5 text-center">
                <dt className="sr-only">{h.label}</dt>
                <dd>
                  <span className="block font-display text-base font-semibold leading-6 tracking-tight text-text-primary [font-variant-numeric:tabular-nums]">
                    {h.value}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-medium leading-[14px] text-text-muted line-clamp-2">
                    {h.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        {detailed && problem && (
          <div className="mt-4 space-y-3 border-l-2 border-border-subtle pl-4 text-sm leading-[22px]">
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
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
        )}

        {/* Footer action aligned across all cards */}
        <div className="mt-auto pt-5">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] w-full items-center justify-between gap-2 rounded-btn border border-border-subtle px-4 text-sm font-semibold text-text-primary transition-colors hover:border-brand hover:text-brand"
          >
            {verified ? "Visit live site" : "Open provided link"}
            <FiExternalLink size={15} aria-hidden="true" />
            <span className="sr-only">
              {` — ${domain}${verified ? "" : "; this link was unreachable when last checked on " + (project.checkedOn || "")}`}
            </span>
          </a>
        </div>
      </div>
    </Card>
  );
}
