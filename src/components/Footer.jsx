import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Logo from "./Logo";
import Button from "./Button";
import { CONTACT, SITE } from "../data/siteConfig";

const ROUTES = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const headingClass =
  "font-mono text-xs font-semibold uppercase tracking-[0.14em] text-text-primary";

/**
 * Site footer — fintech brand anchor with precision hairlines,
 * accessible typography, and streamlined contact channels.
 */
export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-card text-text-secondary">
      <div className="container-section grid gap-12 py-16 md:grid-cols-12 md:gap-8 lg:py-20">
        {/* Brand */}
        <div className="md:col-span-5">
          <Link
            to="/"
            className="inline-flex rounded-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Logo size="lg" />
            <span className="sr-only">Infinity Lab — home</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-secondary">
            {SITE.description}
          </p>
          
        </div>

        {/* Site nav */}
        <nav aria-label="Footer Navigation" className="md:col-span-3">
          <h2 className={headingClass}>Navigation</h2>
          <ul className="mt-5 space-y-2 text-sm font-medium">
            {ROUTES.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  className="inline-flex py-1 text-text-secondary transition-colors duration-150 hover:text-text-primary hover:underline hover:underline-offset-4"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="md:col-span-4">
          <h2 className={headingClass}>Get in touch</h2>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-btn border border-border-subtle bg-surface-sunken text-text-muted">
                <FiMail aria-hidden="true" className="size-4" />
              </span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-text-secondary transition-colors hover:text-text-primary break-all"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-btn border border-border-subtle bg-surface-sunken text-text-muted">
                <FiPhone aria-hidden="true" className="size-4" />
              </span>
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                className="text-text-secondary transition-colors hover:text-text-primary [font-variant-numeric:tabular-nums]"
              >
                {CONTACT.phone}
              </a>
            </li>
            {CONTACT.address && (
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-btn border border-border-subtle bg-surface-sunken text-text-muted">
                  <FiMapPin aria-hidden="true" className="size-4" />
                </span>
                <span className="text-text-secondary leading-snug">{CONTACT.address}</span>
              </li>
            )}
          </ul>
          <div className="mt-7">
            <Button
              to="/contact"
              variant="secondary"
              size="md"
              arrow
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle/80 bg-surface-sunken/40 py-6">
        <div className="container-section flex flex-col items-center justify-between gap-4 text-xs text-text-muted sm:flex-row">
          <p>© 2016 - {new Date().getFullYear()} Infinity Lab. System Operational.</p>
        </div>
      </div>
    </footer>
  );
}
