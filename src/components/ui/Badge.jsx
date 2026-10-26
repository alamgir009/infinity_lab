/** Pill badge with optional status dot (green=live, amber=unverified).
 *
 * @param {{ children: import("react").ReactNode, tone?: "neutral"|"live"|"warning", className?: string }} props
 */
export default function Badge({ tone = "neutral", className = "", children }) {
  const tones = {
    neutral:
      "border-border-subtle bg-surface-sunken text-text-secondary",
    live:
      "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-900/25 dark:text-emerald-300",
    warning:
      "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800/60 dark:bg-amber-900/25 dark:text-amber-300",
  };
  const dotColor = {
    live: "bg-emerald-600 dark:bg-emerald-400",
    warning: "bg-amber-600 dark:bg-amber-400",
    neutral: "",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium leading-4 ${tones[tone]} ${className}`}
    >
      {tone !== "neutral" && (
        <span
          aria-hidden="true"
          className={`inline-block size-1.5 rounded-full ${dotColor[tone]}`}
        />
      )}
      {children}
    </span>
  );
}
