import { Link } from "react-router-dom";
import { FiExternalLink, FiLock, FiArrowRight } from "react-icons/fi";
import Badge from "./ui/Badge";

/* Standardized CTA variants, token-driven so they adapt to light/dark. */
const base =
  "group/cta inline-flex items-center justify-center gap-2 rounded-btn font-display font-semibold transition-[background-color,box-shadow] duration-150 shadow-xs";
const sizes = {
  md: "min-h-[44px] px-5 py-2 text-sm",
  lg: "min-h-[48px] px-7 py-3 text-base",
};
const variants = {
  primary: "bg-btn-bg text-btn-text hover:bg-btn-bg-hover shadow-card hover:shadow-card-hover",
  /** Light CTA for use on dark brand surfaces. */
  inverse: "bg-white text-slate-900 hover:bg-slate-100 shadow-card hover:shadow-card-hover",
  /** Quiet bordered CTA on light surfaces. */
  secondary:
    "border border-border-strong bg-surface-card text-text-primary hover:border-brand hover:text-brand",
  /** Quiet bordered CTA on dark brand surfaces. */
  "secondary-inverse":
    "border border-white/30 bg-transparent text-white hover:border-white/60 hover:bg-white/10",
  /** Bare text link with arrow affordance. */
  ghost: "text-brand hover:text-brand-hover",
};

/**
 * Polymorphic CTA: <Link> for `to` (internal routes), <a> for `href`
 * (external, auto rel=noopener), <button> otherwise.
 *
 * @param {object}  props
 * @param {"md"|"lg"} [props.size]
 * @param {"primary"|"inverse"|"secondary"|"secondary-inverse"|"ghost"} [props.variant]
 * @param {string} [props.to]       Internal route path.
 * @param {string} [props.href]     External URL.
 * @param {boolean} [props.external] Force external-link affordance (G).
 * @param {boolean} [props.arrow]   Append an arrow glyph.
 * @param {import("react").ReactNode} props.children
 */
export default function Button({
  size = "md",
  variant = "primary",
  to,
  href,
  external,
  arrow,
  className = "",
  children,
  ...rest
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const externalBits = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  const suffix = external ? (
    <FiExternalLink aria-hidden="true" className="size-4 shrink-0" />
  ) : arrow ? (
    <FiArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-150 motion-reduce:transition-none group-hover/cta:translate-x-0.5"
    />
  ) : null;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
        {suffix}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...externalBits} {...rest}>
        {children}
        {suffix}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
      {suffix}
    </button>
  );
}

/** Small badge marking an unverified/dead link honestly. */
export function LinkStatusBadge({ verified }) {
  if (verified) return null;
  return (
    <Badge tone="warning">
      <FiLock aria-hidden="true" className="size-3" />
      Unverified link
    </Badge>
  );
}
