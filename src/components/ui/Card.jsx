/**
 * Shared card primitive: fintech-grade elevated panel with micro-hairline border,
 * dark-mode top rim reflection, smooth multi-layer ambient shadow, and fluid hover lift.
 *
 * @param {object} props
 * @param {boolean} [props.interactive] Hover elevation + subtle border illumination.
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
      className={`group/card relative flex flex-col overflow-hidden rounded-card border border-border-subtle bg-surface-card card-rim shadow-card ${
        interactive
          ? "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card-hover dark:hover:border-slate-700/80"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
