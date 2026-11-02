import { Link } from "react-router-dom";
import { FiExternalLink, FiLock, FiArrowRight } from "react-icons/fi";
import Badge from "./ui/Badge";

/* Standardised CTA variants — squared ledger geometry, ink primary, hairlines. */
const base =
  "group/cta relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-btn font-btn font-semibold tracking-[0.01em] transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const sizes = {
  md: "min-h-[42px] px-5 py-2.5 text-[13px]",
  lg: "min-h-[50px] px-6 py-3 text-sm",
};

const variants = {
  /** Ink plate: the single strongest action on any page. */
  primary:
    "border border-transparent bg-btn-bg text-btn-text hover:-translate-y-px hover:bg-btn-bg-hover",
  /** Same plate, used on inverted surfaces (tokens flip automatically). */
  inverse:
    "border border-transparent bg-btn-bg text-btn-text hover:-translate-y-px hover:bg-btn-bg-hover",
  /** Hairline outline: secondary actions, never a filled pill. */
  secondary:
    "border border-border-strong/70 bg-transparent text-text-primary hover:border-border-strong hover:bg-surface-sunken",
  /** Secondary on an inverted surface. */
  "secondary-inverse":
    "border border-border-strong/70 bg-transparent text-text-primary hover:border-border-strong hover:bg-surface-sunken",
  /** Bare text action with a signal arrow. */
  ghost: "p-0 font-medium text-brand hover:text-brand-hover",
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

  const glyph = external ? (
    <FiExternalLink
      aria-hidden="true"
      className="size-[15px] shrink-0 opacity-80 transition-transform duration-200 ease-out group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 group-hover/cta:opacity-100 motion-reduce:transition-none"
    />
  ) : arrow ? (
    <FiArrowRight
      aria-hidden="true"
      className="size-[15px] shrink-0 transition-transform duration-200 ease-out group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
    />
  ) : null;

  const suffix = glyph ? (
    <span className="relative ml-1 flex items-center pl-3">
      <span
        aria-hidden="true"
        className="absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 bg-current opacity-20"
      />
      {glyph}
    </span>
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
