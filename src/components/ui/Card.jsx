/**
 * Shared card primitive: hairline border, token elevation, hover lift.
 * Keeps every card on the site visually consistent (services, projects,
 * engagement models) with equal-height support via flex utilities.
 *
 * @param {object} props
 * @param {boolean} [props.interactive] Hover elevation + accent hairline.
 * @param {string} [props.className]     Extra classes; include h-full or
 *                                       flex utilities as needed.
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
      className={`group/card relative flex flex-col overflow-hidden rounded-card border border-border-subtle bg-surface-card ${
        interactive
          ? "shadow-card transition-[box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-card-hover motion-reduce:hover:translate-y-0"
          : "shadow-card"
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
