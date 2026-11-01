import { FiCode, FiServer, FiSmartphone, FiArrowRight, FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "./ui/Card";

const ICONS = {
  code: FiCode,
  server: FiServer,
  mobile: FiSmartphone,
};

const DISCIPLINE_TAGS = {
  web: "Discipline 01",
  backend: "Discipline 02",
  mobile: "Discipline 03",
};

/**
 * Reusable service card — fintech architectural styling, equal-height body,
 * glowing icon chip, and smooth hover interaction.
 *
 * @param {{ id: string, name: string, icon: "code"|"server"|"mobile",
 *          tagline: string, description: string,
 *          deliverables?: string[] }} service
 * @param {boolean} [props.detailed] Render the deliverables list.
 */
export default function ServiceCard({ service, detailed = false }) {
  const Icon = ICONS[service.icon] || FiCode;
  const tag = DISCIPLINE_TAGS[service.id] || "Engineering";

  return (
    <Card interactive className="h-full">
      {/* Top subtle brand highlight */}
      <div
        aria-hidden="true"
        className="h-1 w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
      />

      <div className="flex grow flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border-subtle bg-brand-chip text-brand-chip-text transition-all duration-300 group-hover/card:border-brand/40 group-hover/card:bg-brand group-hover/card:text-white dark:bg-surface-sunken dark:text-brand dark:group-hover/card:bg-brand dark:group-hover/card:text-surface">
            <Icon size={22} aria-hidden="true" />
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            {tag}
          </span>
        </div>

        <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-text-primary">
          {service.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-brand">{service.tagline}</p>
        <p className="mt-3.5 text-sm leading-relaxed text-text-secondary">
          {service.description}
        </p>

        {detailed && service.deliverables && (
          <div className="mt-7 border-t border-border-subtle pt-6">
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
              What you get
            </h4>
            <ul className="mt-3.5 space-y-2.5 text-sm text-text-secondary">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-brand-chip text-brand"
                  >
                    <FiCheck size={10} strokeWidth={3} />
                  </span>
                  <span className="text-text-secondary leading-snug">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto border-t border-border-subtle pt-6">
          <Link
            to="/contact"
            className="group/link inline-flex min-h-[42px] items-center gap-2 rounded-full font-btn px-4 text-sm font-semibold text-brand transition-colors duration-150 hover:bg-brand-chip hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>Start your project</span>
            <FiArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </Card>
  );
}
