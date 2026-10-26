import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "./Logo";
import Button from "./Button";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const NAV_LINK_CLASS =
  "flex min-h-[44px] items-center px-3 text-sm font-medium rounded-btn transition-colors duration-150 aria-[current=page]:bg-primary-50 aria-[current=page]:text-primary-800 hover:text-primary-800";
const NAV_IDLE = "text-slate-700";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  // Close menu whenever route changes; lock body scroll while open on mobile.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container-section flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-btn"
        >          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `${NAV_LINK_CLASS} ${isActive ? "text-primary-800" : NAV_IDLE}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Prominent desktop CTA */}
        <Button to="/contact" size="md" className="hidden md:inline-flex">
          Start Your Project
        </Button>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-btn text-slate-700 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <FiX size={24} aria-hidden="true" />
          ) : (
            <FiMenu size={24} aria-hidden="true" />
          )}
          <span className="sr-only">
            {open ? "Close navigation menu" : "Open navigation menu"}
          </span>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden"
        >
          <nav aria-label="Mobile" className="border-t border-slate-200 bg-white px-4 pt-2 pb-4">
            <ul className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `${NAV_LINK_CLASS} w-full ${isActive ? "bg-primary-50 text-primary-700" : "text-slate-700"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button to="/contact" size="md" className="mt-3 w-full">
              Start Project
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
