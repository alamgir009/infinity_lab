/**
 * Central site configuration.
 *
 * All values are sourced from environment variables that are safe to expose
 * publicly (VITE_* variables are inlined into the client bundle at build time).
 * Never place secrets or private API keys in these variables — see
 * .env.example and the README security section.
 */

const trimSlash = (value) => (value || "").replace(/\/+$/, "");

// Deployment base URL used for canonical links and metadata. Falls back to
// the production domain documented in the sitemap so local builds render
// correct-looking absolute URLs during review.
export const SITE_URL = trimSlash(
  import.meta.env.VITE_SITE_URL || "https://infinitylab.co.in"
);

// Contact form backend. Without a value the form disables itself and explains
// why — it never pretends a submission succeeded.
export const FORM_ENDPOINT = trimSlash(import.meta.env.VITE_FORM_ENDPOINT || "");

export const SITE = {
  name: "Infinity Lab",
  tagline: "Software engineering, done properly.",
  founded: 2016,
  description:
    "Infinity Lab is a software engineering company established in 2016. We design, build and operate full-stack web platforms, backend and cloud systems, and mobile applications.",
};

export const CONTACT = {
  email: import.meta.env.VITE_CONTACT_EMAIL || "info@iapro.in",
  phone: import.meta.env.VITE_CONTACT_PHONE || "+91 9239252150",
  whatsapp: import.meta.env.VITE_CONTACT_WHATSAPP || "+91 9239252150",
  // Display address rendered on the Contact page and footer. Intentionally
  // empty by default: the company's public location is not currently
  // verifiable from supplied sources, and inventing one is not allowed.
  // Set VITE_CONTACT_ADDRESS once the official address is confirmed.
  address: import.meta.env.VITE_CONTACT_ADDRESS || "",
};

/**
 * Build a full absolute URL from a route path, honouring VITE_SITE_URL.
 * @param {string} path Route path such as "/" or "/projects".
 */
export const absoluteUrl = (path) => `${SITE_URL}${path}`;
