import { useEffect } from "react";
import { SITE_URL, SITE, absoluteUrl, CONTACT } from "../data/siteConfig";

/**
 * Sets document title and meta tags for a route.
 * Takes an options object:
 *   title       string (required, page-specific)
 *   description string (required, page-specific)
 *   path        string route path used to build the canonical URL
 *
 * @param {{title: string, description: string, path: string}} options
 */
export default function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    document.title = title;
    const canonical = absoluteUrl(path);

    const setMeta = (attr, key, content) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE.name);
    setMeta("property", "og:url", canonical);

    // Twitter card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    // JSON-LD structured data for the Organization
    const ld = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: `${SITE_URL}/`,
      foundingDate: String(SITE.founded),
      description: SITE.description,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: CONTACT.email,
        telephone: CONTACT.phone,
        areaServed: "IN",
      },
    };
    let script = document.getElementById("org-ld-json");
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "org-ld-json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);
  }, [title, description, path]);

  return null;
}
