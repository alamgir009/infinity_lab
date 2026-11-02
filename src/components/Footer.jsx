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
  "flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-text-primary";

/**
 * Site footer — the closing page of the ledger: hairline columns, a status
 * line, and a low-contrast wordmark used purely as a signature.
 */
export default function Footer() {
  return (
    <footer className="bg-surface">
      <div className="signal-rule opacity-60" aria-hidden="true" />

      <div className="container-section grid gap-12 py-16 md:grid-cols-12 md:gap-8 lg:py-20">
        {/* Brand */}
        <div className="md:col-span-5">
          <Link
            to="/"
            className="inline-flex rounded-btn"
          >
            <Logo size="lg" />
            <span className="sr-only">Infinity Lab — home</span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-text-secondary">
            {SITE.description}
          </p>
        </div>

        {/* Site nav */}
        <nav aria-label="Footer Navigation" className="md:col-span-3">
          <h2 className={headingClass}>
            <span className="signal-tick" aria-hidden="true" />
            Navigation
          </h2>
          <ul className="mt-5 space-y-2 text-sm font-medium">
            {ROUTES.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  className="inline-flex py-1 text-text-secondary transition-colors duration-150 hover:text-text-primary"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="md:col-span-4">
          <h2 className={headingClass}>
            <span className="signal-tick" aria-hidden="true" />
            Get in touch
          </h2>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[3px] border border-border-subtle bg-surface-sunken text-text-muted">
                <FiMail aria-hidden="true" className="size-4" />
              </span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="break-all text-text-secondary transition-colors hover:text-text-primary"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-[3px] border border-border-subtle bg-surface-sunken text-text-muted">
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
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[3px] border border-border-subtle bg-surface-sunken text-text-muted">
                  <FiMapPin aria-hidden="true" className="size-4" />
                </span>
                <span className="leading-snug text-text-secondary">
                  {CONTACT.address}
                </span>
              </li>
            )}
          </ul>
          <div className="mt-7">
            <Button to="/contact" variant="secondary" size="md" arrow>
              Start Your Project
            </Button>
          </div>
        </div>
      </div>

      {/* Closing wordmark — the signature set to the full measure.
          Decorative: the name is already announced by the logo above. */}
      <div className="container-section mt-4 overflow-hidden [container-type:inline-size]" aria-hidden="true">
        <span className="block select-none whitespace-nowrap font-brand text-[10.2cqw] font-semibold leading-[1] tracking-[-0.04em] text-wordmark">
          Infinity Lab
        </span>
      </div>

      {/* Closing rule — the ledger's final hairline */}
      <div className="container-section mt-9">
        <div className="signal-rule opacity-70" aria-hidden="true" />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="container-section flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
            © 2016 - {new Date().getFullYear()} Infinity Lab. System Operational.
          </p>
        </div>
      </div>
    </footer>
  );
}
