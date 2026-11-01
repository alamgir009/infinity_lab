/**
 * Pill badge with fintech optical spacing, subtle borders, and WCAG-AAA contrast.
 *
 * @param {{ children: import("react").ReactNode, tone?: "neutral"|"live"|"warning"|"brand", className?: string }} props
 */
export default function Badge({ tone = "neutral", className = "", children }) {
  const tones = {
    neutral:
      "border-border-subtle bg-surface-sunken text-text-secondary dark:border-slate-800 dark:bg-surface-sunken/80 dark:text-text-secondary",
    live:
      "border-emerald-300/80 bg-emerald-50/90 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300",
    warning:
      "border-amber-300/80 bg-amber-50/90 text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-300",
    brand:
      "border-brand/20 bg-brand-chip text-brand-chip-text dark:border-brand/30 dark:bg-brand-chip dark:text-brand-chip-text",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide leading-4 select-none ${tones[tone]} ${className}`}
    >
      {tone === "live" && (
        <span className="size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
      )}
      {tone === "warning" && (
        <span className="size-1.5 rounded-full bg-amber-600 dark:bg-amber-400" />
      )}
      {children}
    </span>
  );
}
