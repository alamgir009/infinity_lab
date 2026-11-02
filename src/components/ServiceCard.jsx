import { FiCode, FiServer, FiSmartphone, FiArrowRight, FiCheck } from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "./ui/Card";

const ICONS = {
  code: FiCode,
  server: FiServer,
  mobile: FiSmartphone,
};

const DISCIPLINE_TAGS = {
  code: "Discipline 01",
  server: "Discipline 02",
  mobile: "Discipline 03",
};

/**
 * Reusable service card — a spec panel: index, square icon tile, display
 * title, and a bottom action separated by a hairline.
 *
 * @param {{ id: string, name: string, icon: "code"|"server"|"mobile",
 *          tagline: string, description: string,
 *          deliverables?: string[] }} service
 * @param {boolean} [props.detailed] Render the deliverables list.
 */
export default function ServiceCard({ service, detailed = false }) {
  const Icon = ICONS[service.icon] || FiCode;
  const tag = DISCIPLINE_TAGS[service.icon] || "Engineering";

  return (
    <Card interactive className="h-full">
      <div className="flex grow flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex size-11 items-center justify-center rounded-[3px] border border-border-subtle bg-brand-soft text-brand-soft-text transition-colors duration-200 group-hover/card:bg-btn-bg group-hover/card:text-btn-text">
            <Icon size={20} aria-hidden="true" />
          </span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted">
            {tag}
          </span>
        </div>

        <h3 className="mt-6 type-card text-text-primary">
          {service.name}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-brand">{service.tagline}</p>
        <p
          className={`mt-4 text-sm leading-relaxed text-text-secondary ${
            detailed ? "flex-1" : ""
          }`}
        >
          {service.description}
        </p>

        {detailed && service.deliverables && (
          <div className="mt-7 border-t border-border-subtle pt-6">
            <h4 className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted">
              What you get
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-text-secondary">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[2px] bg-brand-soft text-brand-soft-text"
                  >
                    <FiCheck size={10} strokeWidth={3} />
                  </span>
                  <span className="leading-snug text-text-secondary">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto border-t border-border-subtle pt-5">
          <Link
            to="/contact"
            className="group/link -mx-2 inline-flex min-h-[42px] items-center gap-2 rounded-[3px] px-2 text-sm font-semibold text-brand transition-colors duration-150 hover:text-brand-hover"
          >
            <span>Start your project</span>
            <FiArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/link:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </Card>
  );
}
