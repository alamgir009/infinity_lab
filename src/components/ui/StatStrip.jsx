/**
 * StatStrip — brand trust metrics rendered as labeled columns with hairline
 * dividers, tabular numerics and an equal grid. Fully theme-aware via the
 * brand-surface tokens (light: dark text on white; dark: light text on navy).
 *
 * @param {{ stats: Array<{ value: string, label: string, detail: string }> }} props
 */
export default function StatStrip({ stats }) {
  return (
    <dl className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`min-w-0 ${i > 0 ? "md:border-l md:border-border-subtle md:pl-8 dark:md:border-white/10" : ""} ${
            i === 1 || i === 3
              ? "border-l border-border-subtle pl-6 md:pl-8 dark:border-white/10"
              : ""
          }`}
        >
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="block font-display text-3xl font-bold tracking-tight text-text-on-brand [font-variant-numeric:tabular-nums] sm:text-4xl">
              {s.value}
            </span>
            <span className="mt-2 block text-sm font-semibold text-text-on-brand/90">
              {s.label}
            </span>
            <span className="mt-1 block text-xs leading-5 text-text-on-brand-muted">
              {s.detail}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
