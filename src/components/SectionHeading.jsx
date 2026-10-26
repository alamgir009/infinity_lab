/**
 * Shared section heading: eyebrow, display title, optional lead paragraph.
 *
 * @param {{ eyebrow?: string, title: string, lead?: string, id?: string,
 *          centered?: boolean, onInverse?: boolean, className?: string }} props
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  centered = false,
  onInverse = false,
  className = "",
}) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.14em] ${
            onInverse ? "text-accent-gold" : "text-brand"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`type-heading mt-3 font-display ${onInverse ? "text-white" : "text-text-primary"}`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-base leading-7 ${
            onInverse ? "text-text-on-inverse-muted" : "text-text-secondary"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
