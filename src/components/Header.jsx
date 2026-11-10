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

const desktopLink = ({ isActive }) =>
  `nav-link inline-flex items-center py-2 text-[14px] font-medium tracking-[0.01em] transition-colors duration-150 ${
    isActive
      ? "text-text-primary"
      : "text-text-secondary hover:text-text-primary"
  }`;

const mobileLink = ({ isActive }) =>
  `flex min-h-[64px] items-center justify-between gap-4 font-display text-[1.75rem] leading-none tracking-[-0.02em] transition-colors duration-150 ${
    isActive
      ? "text-brand"
      : "text-text-primary hover:text-brand"
  }`;

/**
 * Site chrome: a flat 68px ledger bar. The active route is marked by a
 * 1.5px spectral underline rather than a filled pill. Scroll depth is read
 * with an IntersectionObserver sentinel, so no scroll listener runs.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const sentinelRef = useRef(null);
  const location = useLocation();

  // Close the drawer on route change.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Depth detection without a scroll handler.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof window.IntersectionObserver === "undefined") return undefined;
    const io = new window.IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
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

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-8"
      />
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-200 ${
          scrolled
            ? "border-border-subtle bg-surface"
            : "border-transparent bg-surface/0"
        }`}
      >
        <div className="container-section flex h-[68px] items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex shrink-0 items-center rounded-btn"
            aria-label="Infinity Lab — Return to homepage"
          >
            <Logo />
          </Link>

          {/* Desktop navigation — flat, no container */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 lg:gap-9">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === "/"} className={desktopLink}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Button to="/contact" size="md" arrow>
              Start Your Project
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              ref={menuButtonRef}
              className="inline-flex size-11 items-center justify-center rounded-btn border border-border-subtle bg-transparent text-text-primary transition-colors duration-150 hover:border-border-strong hover:bg-surface-sunken"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? (
                <FiX size={19} aria-hidden="true" className="shrink-0" />
              ) : (
                <FiMenu size={19} aria-hidden="true" className="shrink-0" />
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
            className="fixed inset-x-0 bottom-0 top-[68px] z-50 flex flex-col bg-surface lg:hidden"
          >
            <div className="container-section flex h-full flex-col justify-between py-8">
              <nav aria-label="Mobile Navigation">
                <ul className="border-t border-border-subtle">
                  {NAV_ITEMS.map((item, i) => (
                    <li key={item.to} className="border-b border-border-subtle">
                      <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        className={mobileLink}
                      >
                        <span className="flex items-baseline gap-4">
                          <span
                            aria-hidden="true"
                            className="font-mono text-[10px] font-medium tabular-nums tracking-[0.16em] text-text-muted"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{item.label}</span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-mono text-base text-text-muted"
                        >
                          ↗
                        </span>
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
    </>
  );
}
