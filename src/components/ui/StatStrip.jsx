import { FiCalendar, FiBox, FiUsers, FiCheckCircle, FiShield } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";

const DEFAULT_BENEFITS = [
  "Scalable architecture",
  "Performance-first builds",
  "Real operational support",
];

const FALLBACK_ICONS = [FiCalendar, FiBox, FiUsers, LuShieldCheck];

/**
 * EngineeringBenefitsRow — clean horizontally aligned strip with restrained
 * cyan/blue check icons, compact readable typography, and flanking horizontal hairlines.
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
        className="hidden h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-border-subtle sm:block dark:to-blue-500/25 md:max-w-xs"
      />
      <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-xs font-semibold text-text-on-brand sm:gap-x-9 sm:text-sm dark:text-slate-200">
        {benefits.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <FiCheckCircle
              aria-hidden="true"
              className="size-4 shrink-0 text-brand dark:text-cyan-400"
            />
            <span className="tracking-tight">{item}</span>
          </li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="hidden h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-border-subtle sm:block dark:to-blue-500/25 md:max-w-xs"
      />
    </div>
  );
}

/**
 * StatStrip — brand trust metrics and engineering benefits.
 * Features a deep navy/transparent card container, subtle blue border,
 * restrained cyan/blue accents, consistent icon containers, large readable
 * metrics, and thin vertical desktop separators.
 *
 * @param {{
 *   stats: Array<{ value: string, label: string, note?: string, detail?: string, icon?: React.ComponentType<{ size?: number, className?: string }> }>,
 *   benefits?: string[]
 * }} props
 */
export default function StatStrip({ stats, benefits = DEFAULT_BENEFITS }) {
  return (
    <div className="w-full">
      {/* 4 Horizontally aligned statistics cards inside a unified bordered container */}
      <div className="rounded-2xl border border-border-subtle bg-surface-card/60 shadow-card backdrop-blur-sm dark:border-blue-500/20 dark:bg-[#0b132b]/75 dark:shadow-none">
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon ?? FALLBACK_ICONS[i % FALLBACK_ICONS.length];
            const borderClasses =
              i === 0
                ? ""
                : i === 1
                ? "border-t border-border-subtle sm:border-t-0 sm:border-l dark:border-blue-500/15"
                : i === 2
                ? "border-t border-border-subtle sm:border-t lg:border-t-0 lg:border-l dark:border-blue-500/15"
                : "border-t border-border-subtle sm:border-t sm:border-l lg:border-t-0 lg:border-l dark:border-blue-500/15";

            return (
              <div
                key={s.label}
                className={`flex h-full min-w-0 flex-col justify-between p-6 transition-colors duration-150 sm:p-7 lg:p-6 xl:p-7 ${borderClasses}`}
              >
                <div>
                  <div className="flex items-center gap-3.5">
                    {Icon && (
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-blue-50/70 text-brand dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-cyan-400">
                        <Icon size={19} aria-hidden="true" className="shrink-0" />
                      </div>
                    )}
                    <span className="block font-display text-3xl font-bold tracking-tight text-text-on-brand [font-variant-numeric:tabular-nums] sm:text-4xl dark:text-white">
                      {s.value}
                    </span>
                  </div>

                  <dt className="sr-only">{s.label}</dt>
                  <dd className="mt-3.5">
                    <span className="block text-sm font-semibold tracking-normal text-text-on-brand/90 dark:text-slate-200">
                      {s.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-text-on-brand-muted dark:text-slate-400">
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

