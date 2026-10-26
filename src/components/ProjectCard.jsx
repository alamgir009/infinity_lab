import { FiExternalLink } from "react-icons/fi";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import { LinkStatusBadge } from "./Button";

/**
 * Reusable project card — monogram tile, status dot badge, refined tags and
 * a consistent visit action. Detailed mode adds problem/solution blocks for
 * the Projects page.
 *
 * @param {object}   props
 * @param {{ id: string, name: string, url: string, category: string,
 *          verified: boolean, summary: string, problem?: string,
 *          solution?: string, techTags?: string[], statusLabel?: string,
 *          checkedOn?: string }} props.project
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
  } = project;

  const domain = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  const monogram = name.charAt(0).toUpperCase();

  return (
    <Card interactive>
      <div className="flex grow flex-col p-6">
        {/* Header: monogram tile + domain identity + status */}
        <div className="flex items-start justify-between gap-3">
          <span
            aria-hidden="true"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-brand-chip font-display text-base font-bold text-brand-chip-text"
          >
            {monogram}
          </span>
          <LinkStatusBadge verified={verified} />
        </div>

        <h3 className="mt-4 text-lg font-bold leading-snug text-text-primary">
          {name}
        </h3>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-0.5 inline-flex min-h-[36px] items-center text-xs text-text-muted hover:text-brand"
        >
          {domain}
        </a>

        <p className="mt-3 text-sm leading-6 text-text-secondary">{summary}</p>

        {detailed && problem && (
          <div className="mt-5 space-y-4 border-l-2 border-border-subtle pl-4 text-sm leading-6">
            <p className="text-text-secondary">
              <span className="font-semibold text-text-primary">Problem — </span>
              {problem}
            </p>
            <p className="text-text-secondary">
              <span className="font-semibold text-text-primary">Solution — </span>
              {solution}
            </p>
          </div>
        )}

        {techTags.length > 0 && (
          <ul
            className="mt-5 flex flex-wrap gap-1.5"
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
        <div className="mt-auto pt-6">
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
