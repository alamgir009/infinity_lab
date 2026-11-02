import { FiCalendar, FiBox, FiUsers } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const DEFAULT_BENEFITS = [
  "Scalable architecture",
  "Performance-first builds",
  "Real operational support",
];

const FALLBACK_ICONS = [FiCalendar, FiBox, FiUsers, LuShieldCheck];

/**
 * EngineeringBenefitsRow — a quiet mono ledger of assurances. No pills,
 * no borders: just signal ticks and a readable measure.
 */
export function EngineeringBenefitsRow({ benefits = DEFAULT_BENEFITS, className = "" }) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <ul
      className={`mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted ${className}`}
      aria-label="Engineering benefits"
    >
      {benefits.map((item) => (
        <li key={item} className="inline-flex items-center gap-2.5">
          <span className="signal-mark" aria-hidden="true" />
          <span className="text-text-secondary">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * StatStrip — a four-cell trust ledger. Hairlines are drawn by a 1px grid
 * gap, so the rhythm survives every breakpoint without divider utilities.
 *
 * @param {{
 *   stats: Array<{ value: string, label: string, note?: string, detail?: string, icon?: React.ComponentType<{ size?: number, className?: string }> }>,
 *   benefits?: string[]
 * }} props
 */
export default function StatStrip({ stats, benefits = DEFAULT_BENEFITS }) {
  return (
    <div className="w-full">
      <ul className="grid grid-cols-1 gap-px border-y border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon ?? FALLBACK_ICONS[i % FALLBACK_ICONS.length];

          return (
            <li
              key={s.label}
              className="group flex min-w-0 flex-col justify-between bg-surface p-6 transition-colors duration-200 hover:bg-surface-sunken/50 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="block font-display text-[2.125rem] font-semibold leading-none tracking-[-0.035em] text-text-primary [font-variant-numeric:tabular-nums] sm:text-[2.375rem]">
                  {s.value}
                </span>
                {Icon && (
                  <Icon
                    size={17}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-text-muted"
                  />
                )}
              </div>

              <div className="mt-5">
                <span className="block text-[13px] font-semibold tracking-tight text-text-primary">
                  {s.label}
                </span>
                <span className="mt-1 block text-xs leading-5 text-text-muted">
                  {s.note ?? s.detail}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <EngineeringBenefitsRow benefits={benefits} />
    </div>
  );
}
