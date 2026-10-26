/**
 * StatStrip — brand trust metrics rendered as labeled columns with hairline
 * dividers, tabular numerics and an equal grid. Used on the Home hero ribbon.
 *
 * @param {{ stats: Array<{ value: string, label: string, detail: string }> }} props
 */
export default function StatStrip({ stats }) {
  return (
    <dl className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`min-w-0 ${i > 0 ? "md:border-l md:border-white/10 md:pl-8" : ""} ${
            i === 1 ? "border-l border-white/10 pl-6 md:pl-8" : ""
          } ${i === 3 ? "border-l border-white/10 pl-6 md:pl-8" : ""}`}
        >
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="block font-display text-3xl font-bold tracking-tight text-white [font-variant-numeric:tabular-nums] sm:text-4xl">
              {s.value}
            </span>
            <span className="mt-2 block text-sm font-semibold text-white/90">
              {s.label}
            </span>
            <span className="mt-1 block text-xs leading-5 text-text-on-inverse-muted">
              {s.detail}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
