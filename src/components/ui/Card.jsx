/**
 * Shared card primitive: a flat ledger panel with a single hairline border,
 * one quiet plate shadow, and a restrained hover lift. No glass, no glow.
 *
 * @param {object} props
 * @param {boolean} [props.interactive] Hover elevation + border illumination.
 * @param {string} [props.className]     Extra classes; include h-full or flex utilities as needed.
 * @param {import("react").ReactNode} props.children
 */
export default function Card({
  interactive = false,
  className = "",
  children,
  ...rest
}) {
  return (
    <div
      className={`group/card panel flex flex-col ${
        interactive ? "panel-interactive" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
