/**
 * Shared section heading: eyebrow, display title, optional lead paragraph.
 *
 * @param {{ eyebrow?: string, title: string, lead?: string, id?: string,
 *          centered?: boolean, onBrand?: boolean, className?: string }} props
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  centered = false,
  onBrand = false,
  className = "",
}) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p
          className={`font-mono text-xs font-semibold uppercase tracking-[0.08em] ${
            onBrand ? "text-brand dark:text-accent-gold" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`type-heading mt-3 font-display ${onBrand ? "text-text-on-brand" : "text-text-primary"}`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-base leading-7 ${
            onBrand ? "text-text-on-brand-muted" : "text-text-secondary"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
