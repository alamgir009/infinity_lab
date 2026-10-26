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
 * Technology stacks — the full engineering palette across all delivered
 * and capability groups. observable=true means the tool is directly
 * visible in portfolio builds; false means it is selected per project.
 */
export const TECHNOLOGIES = [
  // ── Frontend ──────────────────────────────────────────────────────────────
  { name: "React",            group: "Frontend",          observable: true  },
  { name: "Next.js",          group: "Frontend",          observable: true  },
  { name: "TypeScript",       group: "Frontend",          observable: true  },
  { name: "Tailwind CSS",     group: "Frontend",          observable: true  },
  { name: "Vite",             group: "Frontend",          observable: true  },
  { name: "React Native",     group: "Frontend",          observable: true },

  // ── Backend ───────────────────────────────────────────────────────────────
  { name: "Node.js",          group: "Backend",           observable: true  },
  { name: "PHP 8 / Laravel",  group: "Backend",           observable: true  },
  { name: "Python / Django",  group: "Backend",           observable: false },
  { name: "REST & GraphQL",   group: "Backend",           observable: true  },
  { name: "JWT / OAuth 2.0",  group: "Backend",           observable: true },
  { name: "WebSockets",       group: "Backend",           observable: true },

  // ── Mobile ────────────────────────────────────────────────────────────────
  { name: "React Native",     group: "Mobile",            observable: true },
  { name: "Expo",             group: "Mobile",            observable: false },
  { name: "iOS (Swift)",      group: "Mobile",            observable: false },
  { name: "Android (Kotlin)", group: "Mobile",            observable: false },
  { name: "App Store / Play Store", group: "Mobile",      observable: true },

  // ── Database ──────────────────────────────────────────────────────────────
  { name: "PostgreSQL",       group: "Database",          observable: true },
  { name: "MySQL / MariaDB",  group: "Database",          observable: true  },
  { name: "Redis",            group: "Database",          observable: true },
  { name: "MongoDB",          group: "Database",          observable: true },
  { name: "Prisma ORM",       group: "Database",          observable: false },

  // ── Cloud & DevOps ────────────────────────────────────────────────────────
  { name: "AWS",              group: "Cloud & DevOps",    observable: true },
  { name: "Cloudflare",       group: "Cloud & DevOps",    observable: true  },
  { name: "Docker",           group: "Cloud & DevOps",    observable: false },
  { name: "CI/CD (GitHub Actions)", group: "Cloud & DevOps", observable: true },
  { name: "Nginx",            group: "Cloud & DevOps",    observable: true  },
  { name: "Linux (Ubuntu)",   group: "Cloud & DevOps",    observable: true  },

  // ── CMS & Commerce ────────────────────────────────────────────────────────
  { name: "WordPress",        group: "CMS & Commerce",    observable: true  },
  { name: "WooCommerce",      group: "CMS & Commerce",    observable: true  },
  { name: "Headless CMS",     group: "CMS & Commerce",    observable: false },
  { name: "Stripe",           group: "CMS & Commerce",    observable: false },
  { name: "Razorpay",         group: "CMS & Commerce",    observable: true },
];

/**
 * Methodology steps — used on Home (delivery methodology section).
 * Icon is a string key resolved to a react-icon in the consuming component
 * (same pattern as SERVICES above).
 */
export const METHODOLOGY = [
  {
    step: 1,
    name: "Understand",
    icon: "search",
    description:
      "We start with your goals, users and constraints before any code is written.",
    points: [
      "Goals, users and constraints mapped first",
      "Success criteria agreed up front",
      "An honest scope you can hold us to",
    ],
  },
  {
    step: 2,
    name: "Design",
    icon: "pen",
    description:
      "Architecture and interface design happen together, so the product is sound inside and out.",
    points: [
      "System and data architecture on paper",
      "Interface design in the same pass",
      "You review and approve before build",
    ],
  },
  {
    step: 3,
    name: "Build",
    icon: "code",
    description:
      "Iterative development with regular demos — you see progress, not surprises.",
    points: [
      "Small increments, releasable early",
      "Regular demos of real software",
      "Peer-reviewed, documented code",
    ],
  },
  {
    step: 4,
    name: "Test",
    icon: "check",
    description:
      "Quality is verified, not assumed — testing runs through the whole build.",
    points: [
      "Automated tests on core flows",
      "Cross-browser and device checking",
      "Accessibility and performance audits",
    ],
  },
  {
    step: 5,
    name: "Deploy",
    icon: "upload",
    description:
      "Controlled releases to production, with monitoring from day one.",
    points: [
      "Staged release, no big-bang risk",
      "Monitoring and alerting switched on",
      "A rollback plan before go-live",
    ],
  },
  {
    step: 6,
    name: "Operate",
    icon: "life",
    description:
      "We keep systems running and improving long after launch day.",
    points: [
      "Ongoing maintenance and updates",
      "Backups verified, not just taken",
      "Direct access to the engineers",
    ],
  },
];
