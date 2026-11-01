import { Link } from "react-router-dom";
import { FiExternalLink, FiLock, FiArrowRight } from "react-icons/fi";
import Badge from "./ui/Badge";

/* Standardized fintech CTA variants — tactile, token-driven, WCAG-AAA compliant */
const base =
  "group/cta relative inline-flex items-center justify-center gap-2 rounded-full font-btn font-semibold tracking-[-0.01em] transition-all duration-200 ease-out active:scale-[0.98] select-none";

const sizes = {
  md: "min-h-[42px] px-5 py-2 text-sm",
  lg: "min-h-[48px] px-7 py-3 text-[15px]",
};

const variants = {
  /** Primary fintech CTA: high-contrast titanium graphite with inner bevel highlight */
  primary:
    "bg-btn-bg text-btn-text shadow-card hover:bg-btn-bg-hover hover:shadow-card-hover border border-transparent dark:border-white/10 dark:shadow-[0_0_20px_rgba(255,255,255,0.08)]",
  /** High-contrast CTA on brand surfaces */
  inverse:
    "bg-btn-bg text-btn-text shadow-card hover:bg-btn-bg-hover hover:shadow-card-hover border border-transparent dark:border-white/10",
  /** Secondary CTA: refined glass/card surface with subtle hairline border */
  secondary:
    "border border-border-subtle bg-surface-card text-text-primary shadow-xs hover:border-border-strong hover:bg-surface-sunken hover:text-text-primary dark:hover:border-slate-600",
  /** Secondary on brand surfaces */
  "secondary-inverse":
    "border border-border-subtle bg-surface-card/60 backdrop-blur-md text-text-on-brand shadow-xs hover:border-border-strong hover:bg-surface-card hover:text-text-on-brand dark:border-slate-800 dark:hover:border-slate-600",
  /** Bare text link with smooth arrow affordance */
  ghost: "text-brand hover:text-brand-hover p-0 font-medium",
};

/**
 * Polymorphic CTA: <Link> for `to` (internal routes), <a> for `href`
 * (external, auto rel=noopener), <button> otherwise.
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
    <FiExternalLink aria-hidden="true" className="size-4 shrink-0 opacity-75 group-hover/cta:opacity-100" />
  ) : arrow ? (
    <FiArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover/cta:translate-x-1"
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
