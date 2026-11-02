/**
 * Pill-free status badge: squared ledger chip, mono label, dot + text so
 * status is never communicated by colour alone.
 *
 * @param {{ children: import("react").ReactNode, tone?: "neutral"|"live"|"warning"|"brand", className?: string }} props
 */
export default function Badge({ tone = "neutral", className = "", children }) {
  const tones = {
    neutral:
      "border-border-subtle bg-transparent text-text-muted",
    live: "border-positive/30 bg-positive-soft text-positive",
    warning: "border-warning/30 bg-warning-soft text-warning",
    brand: "border-brand/25 bg-brand-soft text-brand-soft-text",
  };

  return (
    <span
      className={`inline-flex select-none items-center gap-1.5 whitespace-nowrap rounded-[3px] border px-2 py-0.5 font-mono text-[10px] font-medium uppercase leading-4 tracking-[0.1em] ${tones[tone]} ${className}`}
    >
      {tone === "live" && (
        <span className="size-1.5 rounded-full bg-positive" aria-hidden="true" />
      )}
      {tone === "warning" && (
        <span className="size-1.5 rounded-full bg-warning" aria-hidden="true" />
      )}
      {children}
    </span>
  );
}
