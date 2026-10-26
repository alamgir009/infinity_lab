import { FiCode, FiServer, FiSmartphone, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const ICONS = {
  code: FiCode,
  server: FiServer,
  mobile: FiSmartphone,
};

/**
 * Reusable service card.
 *
 * @param {{ id: string, name: string, icon: "code"|"server"|"mobile",
 *          tagline: string, description: string,
 *          deliverables?: string[] }} service
 * @param {boolean} [props.detailed] Render the deliverables list.
 */
export default function ServiceCard({ service, detailed = false }) {
  const Icon = ICONS[service.icon] || FiCode;

  return (
    <article className="flex h-full flex-col rounded-card border border-slate-200 bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-md">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-card bg-primary-50 text-primary-700">
        <Icon size={24} aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">
        {service.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-primary-700">
        {service.tagline}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        {service.description}
      </p>

      {detailed && service.deliverables && (
        <>
          <h4 className="mt-4 text-sm font-semibold text-slate-900">
            What you get
          </h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-primary"
                />
                {d}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="mt-auto pt-5">
        <Link
          to="/contact"
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-btn text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          Start your project
          <FiArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
