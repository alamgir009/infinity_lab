import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

/**
 * Site chrome: frosted-glass sticky bar (Stripe / Resend aesthetic) with
 * precision hairline border, passive scroll shadow, pill-segmented nav items,
 * and an accessible, focus-managed mobile drawer.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const location = useLocation();

  // Close the drawer on route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Scroll depth detection.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body scroll lock while drawer is open.
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keyboard: Escape closes drawer.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const desktopLink = ({ isActive }) =>
    `relative inline-flex min-h-[38px] items-center px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
      isActive
        ? "bg-brand-chip text-brand-chip-text font-semibold shadow-xs dark:bg-brand-chip dark:text-brand-chip-text"
        : "text-text-secondary hover:text-text-primary hover:bg-surface-sunken"
    }`;

  const mobileLink = ({ isActive }) =>
    `flex min-h-[48px] items-center justify-between rounded-btn px-4 text-base font-medium transition-colors duration-150 ${
      isActive
        ? "bg-brand-chip text-brand-chip-text font-semibold"
        : "text-text-secondary hover:bg-surface-sunken hover:text-text-primary"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border-subtle bg-surface/85 backdrop-blur-md transition-shadow duration-200 supports-[backdrop-filter]:bg-surface/80 ${
        scrolled ? "shadow-card dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]" : ""
      }`}
    >
      <div className="container-section flex h-[72px] items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-2.5 rounded-btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Infinity Lab — Return to homepage"
        >
          <Logo />
        </Link>

        {/* Desktop navigation bar */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full border border-border-subtle/80 bg-surface-card/60 p-1 backdrop-blur-sm dark:bg-surface-card/40">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={desktopLink}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Button to="/contact" size="md" arrow>
            Start Your Project
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            ref={menuButtonRef}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border-subtle bg-surface-card text-text-primary shadow-xs transition-colors duration-150 hover:border-border-strong hover:bg-surface-sunken focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <FiX size={20} aria-hidden="true" className="shrink-0" />
            ) : (
              <FiMenu size={20} aria-hidden="true" className="shrink-0" />
            )}
            <span className="sr-only">
              {open ? "Close navigation menu" : "Open navigation menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[72px] bottom-0 z-50 flex flex-col bg-surface/95 backdrop-blur-xl md:hidden"
        >
          <div className="container-section flex flex-col justify-between py-6 h-full">
            <nav aria-label="Mobile Navigation">
              <ul className="space-y-1.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={mobileLink}
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-text-muted">→</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 border-t border-border-subtle pt-6">
              <Button to="/contact" size="lg" arrow className="w-full">
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
