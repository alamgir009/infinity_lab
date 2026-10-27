import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
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
  "font-display text-xs font-semibold uppercase tracking-[0.14em] text-text-on-brand-muted";

/**
 * Site footer — brand anchor on the theme-aware brand surface (light: white
 * with hairline top border, Google-style; dark: deep navy), consistent with
 * the hero, methodology and CTA sections.
 */
export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-brand text-text-on-brand-muted">
      <div className="container-section grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        {/* Brand */}
        <div className="md:col-span-5">
          <Link to="/" className="inline-flex rounded-btn">
            <Logo onBrand />
            <span className="sr-only">Infinity Lab — home</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6">
            {SITE.description}
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-xs">
            <div className="flex items-center gap-2">
              <dt className="sr-only">Founded</dt>
              <FiClock aria-hidden="true" className="size-3.5 text-text-on-brand-muted" />
              <dd>
                Est. {SITE.founded} · Software engineering, India
              </dd>
            </div>
          </dl>
        </div>

        {/* Site nav */}
        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className={headingClass}>Company</h2>
          <ul className="mt-5 space-y-1 text-sm">
            {ROUTES.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  className="inline-flex min-h-[36px] items-center rounded-btn text-text-on-brand-muted transition-colors hover:text-text-on-brand"
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
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <FiMail aria-hidden="true" className="size-4 shrink-0 text-text-on-brand-muted" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex min-h-[36px] items-center text-text-on-brand-muted break-all transition-colors hover:text-text-on-brand"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone aria-hidden="true" className="size-4 shrink-0 text-text-on-brand-muted" />
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                className="inline-flex min-h-[36px] items-center text-text-on-brand-muted transition-colors hover:text-text-on-brand [font-variant-numeric:tabular-nums]"
              >
                {CONTACT.phone}
              </a>
            </li>
            {CONTACT.address && (
              <li className="flex items-start gap-3">
                <FiMapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-text-on-brand-muted" />
                <span className="pt-0.5 text-text-on-brand-muted">{CONTACT.address}</span>
              </li>
            )}
          </ul>
          <Button
            to="/contact"
            variant="secondary-inverse"
            size="md"
            className="mt-7"
          >
            Start Your Project
          </Button>
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="container-section flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Infinity Lab. All rights reserved.</p>
          <p className="text-text-on-brand-muted">
            Built to WCAG 2.2 AA · Accessibility &amp; performance by default
          </p>
        </div>
      </div>
    </footer>
  );
}
