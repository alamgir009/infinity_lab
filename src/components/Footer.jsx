import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import Logo from "./Logo";
import { CONTACT, SITE } from "../data/siteConfig";

const ROUTES = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-section grid gap-10 py-12 md:grid-cols-3 md:gap-8">
        {/* Brand & description */}
        <div>
          <Logo dark />
          <p className="mt-4 max-w-sm text-sm leading-6">
            {SITE.description} Serving clients across India since{" "}
            {SITE.founded}.
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Footer">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Company
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {ROUTES.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  className="inline-flex min-h-[44px] items-center hover:text-white"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact details */}
        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <FiMail aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary-200" />
              <a
                href={`mailto:${CONTACT.email}`}
                className="min-h-[44px] inline-flex items-center hover:text-white break-all"
              >
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FiPhone aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary-200" />
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                className="min-h-[44px] inline-flex items-center hover:text-white"
              >
                {CONTACT.phone}
              </a>
            </li>
            {CONTACT.address && (
              <li className="flex items-start gap-3">
                <FiMapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary-200" />
                <span>{CONTACT.address}</span>
              </li>
            )}
            <li className="flex items-start gap-3">
              <FiClock aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary-200" />
              <span>Est. {SITE.founded} — Software engineering company</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="container-section flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Established {SITE.founded}. Built with care for accessibility and performance.</p>
        </div>
      </div>
    </footer>
  );
}
