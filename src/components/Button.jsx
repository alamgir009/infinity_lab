import { Link } from "react-router-dom";
import { FiExternalLink, FiLock } from "react-icons/fi";

// Shared class strings
const base =
  "inline-flex items-center justify-center gap-2 rounded-btn font-display font-semibold transition-colors duration-150";
const sizes = {
  md: "min-h-[44px] px-5 py-2 text-sm",
  lg: "min-h-[48px] px-7 py-3 text-base",
};
const variants = {
  primary: "bg-primary-700 text-white hover:bg-primary-800",
  inverse: "bg-white text-primary-800 hover:bg-primary-50",
  outline: "border border-primary-700 text-primary-700 hover:bg-primary-50",
  ghost: "text-primary-700 hover:bg-primary-50",
};

/**
 * Polymorphic CTA button: renders a <Link> for internal routes,
 * <a> for external URLs, or <button> when no `to`/`href` given.
 *
 * @param {object}  props
 * @param {"md"|"lg"} [props.size]
 * @param {"primary"|"inverse"|"outline"|"ghost"} [props.variant]
 * @param {string} [props.to]      Internal route path.
 * @param {string} [props.href]    External URL (auto rel=noopener).
 * @param {boolean} [props.external] Force external-link affordance.
 * @param {import("react").ReactNode} props.children
 */
export default function Button({
  size = "md",
  variant = "primary",
  to,
  href,
  external,
  className = "",
  children,
  ...rest
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const externalBits = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...externalBits} {...rest}>
        {children}
        {external && (
          <FiExternalLink aria-hidden="true" className="size-4" />
        )}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

/**
 * Small badge marking an external/dead link status honestly.
 * @param {{ verified: boolean }} props
 */
export function LinkStatusBadge({ verified }) {
  if (verified) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
      <FiLock aria-hidden="true" /> Unverified link
    </span>
  );
}
