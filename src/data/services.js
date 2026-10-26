/**
 * Service catalogue data — single source of truth for the Services page and
 * the Home page service previews.
 */

export const SERVICES = [
  {
    id: "full-stack-web",
    name: "Full-Stack Web Development",
    icon: "code",
    tagline: "From landing pages to complex platforms.",
    description:
      "End-to-end web application delivery — front-end interfaces, application logic and deployment — for products, institutions and publishing businesses.",
    deliverables: [
      "Public websites and landing pages",
      "Content management and publishing platforms",
      "E-commerce storefronts with cart and checkout",
      "Client portals behind authentication",
    ],
  },
  {
    id: "backend-cloud",
    name: "Backend & Cloud Architecture",
    icon: "server",
    tagline: "Systems that stay up when it counts.",
    description:
      "Design and operation of the server side: data models, APIs, integrations, hosting and infrastructure that production systems rely on.",
    deliverables: [
      "Application and system architecture design",
      "API development and third-party integrations",
      "Cloud deployment, monitoring and maintenance",
      "Backups, upgrades and operational support",
    ],
  },
  {
    id: "mobile",
    name: "Mobile Development",
    icon: "mobile",
    tagline: "Ship where your users are.",
    description:
      "Mobile application development for customer-facing and internal products, from concept through store delivery.",
    deliverables: [
      "Product scoping and UI flows",
      "Native or cross-platform app builds",
      "App store delivery and release support",
      "Ongoing maintenance and iteration",
    ],
  },
];

export const ENGAGEMENT_MODELS = [
  {
    id: "project",
    name: "Project Delivery",
    description:
      "A defined scope with agreed deliverables — ideal for a new website, storefront or system build.",
  },
  {
    id: "retainer",
    name: "Support Retainer",
    description:
      "Ongoing maintenance, updates and improvements for platforms we have delivered or need to take over.",
  },
  {
    id: "partner",
    name: "Build & Operate",
    description:
      "Long-term partnership where we build the product and keep operating it — hosting, monitoring and evolution included.",
  },
];

/**
 * Technology stacks, framed honestly:
 *  - WordPress/WooCommerce/PHP are directly observable across delivered
 *    portfolio builds (site generator metadata, shopping-cart plumbing).
 *  - For other groups we state capability categories rather than fabricating
 *    specific tool claims, since the source sites do not disclose them.
 */
export const TECHNOLOGIES = [
  { name: "WordPress", group: "Platforms", observable: true },
  { name: "WooCommerce", group: "Platforms", observable: true },
  { name: "PHP", group: "Backend", observable: true },
  { name: "JavaScript frameworks", group: "Frontend", observable: false },
  { name: "Relational databases", group: "Data", observable: false },
  { name: "Cloud hosting", group: "Cloud", observable: false },
];

/**
 * Methodology steps — used on Home (delivery methodology section).
 */
export const METHODOLOGY = [
  {
    step: 1,
    name: "Understand",
    description:
      "We start with your goals, users and constraints before any code is written.",
  },
  {
    step: 2,
    name: "Design",
    description:
      "Architecture and interface design happen together, so the product is sound inside and out.",
  },
  {
    step: 3,
    name: "Build",
    description:
      "Iterative development with regular demos — you see progress, not surprises.",
  },
  {
    step: 4,
    name: "Operate",
    description:
      "We deploy, monitor and maintain, keeping systems running after launch.",
  },
];
