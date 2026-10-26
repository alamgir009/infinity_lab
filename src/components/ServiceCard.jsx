import { FiCode, FiServer, FiSmartphone, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "./ui/Card";

const ICONS = {
  code: FiCode,
  server: FiServer,
  mobile: FiSmartphone,
};

/**
 * Reusable service card — icon on a brand gradient tile with ring, aligned
 * equal-height body, exactly one CTA per card.
 *
 * @param {{ id: string, name: string, icon: "code"|"server"|"mobile",
 *          tagline: string, description: string,
 *          deliverables?: string[] }} service
 * @param {boolean} [props.detailed] Render the deliverables list.
 */
export default function ServiceCard({ service, detailed = false }) {
  const Icon = ICONS[service.icon] || FiCode;

  return (
    <Card interactive className="min-h-0">
      {/* Brand hairline accent on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand/0 via-brand to-brand/0 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
      />

      <div className="flex grow flex-col p-6">
        <span className="inline-flex size-11 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#1D4ED8] to-[#4F86F7] text-white shadow-card">
          <Icon size={20} aria-hidden="true" />
        </span>

        <h3 className="mt-5 text-lg font-bold text-text-primary">
          {service.name}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">{service.tagline}</p>
        <p className="mt-4 text-sm leading-6 text-text-secondary">
          {service.description}
        </p>

        {detailed && service.deliverables && (
          <>
            <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
              What you get
            </h4>
            <ul className="mt-3 space-y-2.5 text-sm text-text-secondary">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] inline-block size-1.5 shrink-0 rounded-full bg-brand"
                  />
                  <span className="text-text-primary">{d}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-auto pt-6">
          <Link
            to="/contact"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-btn text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
          >
            Start your project
            <FiArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
