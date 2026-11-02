/**
 * Editorial section header: optional decorative index, signal-ticked eyebrow,
 * display title, and a calibrated lead. The index is aria-hidden — it is a
 * typographic device, never information.
  *
  * Colours come from the ambient token scope.
  *
  * @param {{ eyebrow?: string, title: string, lead?: string, id?: string,
  *          centered?: boolean, index?: string, className?: string }} props
  */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  centered = false,
  index,
  className = "",
}) {
  return (
    <div
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      {(index || eyebrow) && (
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          {index && (
            <>
              <span
                aria-hidden="true"
                className="font-mono text-[10.5px] tabular-nums tracking-[0.16em] text-text-muted"
              >
                {index}
              </span>
              <span
                aria-hidden="true"
                className="h-px w-5 bg-border-subtle"
              />
            </>
          )}
          {eyebrow && (
            <span className={`eyebrow ${centered ? "justify-center" : ""}`}>
              {eyebrow}
            </span>
          )}
        </div>
      )}

      <h2 id={id} className="type-heading mt-5 text-text-primary">
        {title}
      </h2>

      {lead && (
        <p className="type-lead mt-5 max-w-[60ch] text-text-secondary">
          {lead}
        </p>
      )}
    </div>
  );
}
