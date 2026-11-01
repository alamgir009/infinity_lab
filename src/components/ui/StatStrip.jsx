import { FiCalendar, FiBox, FiUsers, FiCheckCircle } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const DEFAULT_BENEFITS = [
  "Scalable architecture",
  "Performance-first builds",
  "Real operational support",
];

const FALLBACK_ICONS = [FiCalendar, FiBox, FiUsers, LuShieldCheck];

/**
 * EngineeringBenefitsRow — clean horizontally aligned strip with restrained
 * emerald check icons, compact readable typography, and subtle pill chips.
 */
export function EngineeringBenefitsRow({ benefits = DEFAULT_BENEFITS, className = "" }) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <div
      className={`mt-8 flex items-center justify-center gap-4 sm:gap-6 ${className}`}
      aria-label="Engineering benefits"
    >
      <div
        aria-hidden="true"
        className="hidden h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-border-subtle sm:block md:max-w-xs"
      />
      <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold sm:text-sm">
        {benefits.map((item) => (
          <li
            key={item}
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-card/80 px-3.5 py-1.5 shadow-xs backdrop-blur-sm dark:bg-surface-card/50"
          >
            <FiCheckCircle
              aria-hidden="true"
              className="size-4 shrink-0 text-brand"
            />
            <span className="tracking-tight text-text-primary">{item}</span>
          </li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="hidden h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-border-subtle sm:block md:max-w-xs"
      />
    </div>
  );
}

/**
 * StatStrip — brand trust metrics and engineering benefits.
 * Features an elevated fintech telemetry panel, subtle hairlines,
 * restrained accents, and large tabular numerals.
 *
 * @param {{
 *   stats: Array<{ value: string, label: string, note?: string, detail?: string, icon?: React.ComponentType<{ size?: number, className?: string }> }>,
 *   benefits?: string[]
 * }} props
 */
export default function StatStrip({ stats, benefits = DEFAULT_BENEFITS }) {
  return (
    <div className="w-full">
      {/* 4 Horizontally aligned statistics cells inside a unified bordered container */}
      <div className="overflow-hidden rounded-card-lg border border-border-subtle bg-surface-card card-rim shadow-card dark:border-slate-800">
        <dl className="grid grid-cols-1 divide-y divide-border-subtle sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
          {stats.map((s, i) => {
            const Icon = s.icon ?? FALLBACK_ICONS[i % FALLBACK_ICONS.length];

            return (
              <div
                key={s.label}
                className="group relative flex h-full min-w-0 flex-col justify-between p-6 transition-colors duration-200 hover:bg-surface-sunken/40 sm:p-7"
              >
                <div>
                  <div className="flex items-center gap-3.5">
                    {Icon && (
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-brand-chip text-brand-chip-text transition-colors duration-200 group-hover:border-brand/30 dark:bg-surface-sunken dark:text-brand">
                        <Icon size={20} aria-hidden="true" className="shrink-0" />
                      </div>
                    )}
                    <span className="block font-display text-3xl font-extrabold tracking-tight text-text-primary [font-variant-numeric:tabular-nums] sm:text-4xl">
                      {s.value}
                    </span>
                  </div>

                  <dt className="sr-only">{s.label}</dt>
                  <dd className="mt-4">
                    <span className="block text-sm font-bold tracking-tight text-text-primary">
                      {s.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-text-secondary">
                      {s.note ?? s.detail}
                    </span>
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>

      {/* Engineering-benefits row below statistics cards */}
      <EngineeringBenefitsRow benefits={benefits} />
    </div>
  );
}
