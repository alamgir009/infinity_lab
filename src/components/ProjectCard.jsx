import { FiExternalLink } from "react-icons/fi";
import { LinkStatusBadge } from "./Button";

/**
 * Reusable project card.
 *
 * @param {object}   props
 * @param {{ id: string, name: string, url: string, category: string,
 *          verified: boolean, summary: string, problem?: string,
 *          solution?: string, techTags?: string[], statusLabel?: string }} props.project
 * @param {boolean} [props.detailed]   Whether problem/solution blocks are shown.
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
    statusLabel,
  } = project;

  const domain = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  })();

  return (
    <article
      className="flex h-full flex-col rounded-card border border-slate-200 bg-white p-6 shadow-card"
      aria-label={name}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-slate-900">{name}</h3>
        <LinkStatusBadge verified={verified} />
      </div>

      <p className="mt-1 text-xs text-slate-500">{domain}</p>
      <p className="mt-3 text-sm leading-6 text-slate-700">{summary}</p>

      {detailed && problem && (
        <div className="mt-4 space-y-3 text-sm leading-6">
          <p>
            <span className="font-semibold text-slate-900">Problem: </span>
            {problem}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Solution: </span>
            {solution}
          </p>
        </div>
      )}

      {techTags.length > 0 && (
        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label={`Technologies used in ${name}`}
        >
          {techTags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-700"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      {statusLabel && (
        <p className="mt-4 text-xs font-medium text-slate-600">{statusLabel}</p>
      )}

      <div className="mt-auto pt-5">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-btn text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          {verified ? `Visit ${domain}` : "Open link (may be offline)"}
          <FiExternalLink size={16} aria-hidden="true" />
          <span className="sr-only">
            {verified
              ? ` — opens in a new tab`
              : ` — opens in a new tab; link was unreachable when last checked on ${project.checkedOn}`}
          </span>
        </a>
      </div>
    </article>
  );
}
