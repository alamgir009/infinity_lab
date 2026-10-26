/**
 * Shared section heading with eyebrow label, big title and optional lead-in
 * paragraph.
 *
 * @param {{eyebrow?: string, title: string, lead?: string, id?: string, centered?: boolean}} props
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  centered = false,
}) {
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-lg leading-7 text-slate-600">{lead}</p>
      )}
    </div>
  );
}
