/**
 * Shared section heading: fintech-grade eyebrow chip, display title, and calibrated lead paragraph.
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
        <div className={`mb-3 inline-flex items-center ${centered ? "justify-center" : ""}`}>
          <span
            className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand"
          >
            // {eyebrow}
          </span>
        </div>
      )}
      <h2
        id={id}
        className={`type-heading font-subheading tracking-tight ${onBrand ? "text-text-on-brand" : "text-text-primary"}`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-3.5 text-base leading-relaxed md:text-lg md:leading-normal ${
            onBrand ? "text-text-on-brand-muted" : "text-text-secondary"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
