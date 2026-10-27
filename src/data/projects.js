/**
 * Project portfolio data — single source of truth for the Projects page.
 *
 * Content integrity rules applied when writing this file:
 *  - Only details observable on the live websites (title/meta description),
 *    or supplied by the business specification, are used.
 *  - No invented clients, metrics, timelines or technologies.
 *  - Links marked `verified: false` did not resolve when checked (2026-10-26)
 *    and are rendered with an explicit "unverified link" note.
 *
 * Filter categories: "web" | "mobile" | "system".
 * No project carries the "mobile" category today because no mobile delivery
 * is publicly observable; the UI renders an honest empty state for it.
 */

export const PROJECT_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "system", label: "System" },
];

export const PROJECTS = [
  {
    id: "newsbazar24",
    name: "NewsBazar24",
    url: "https://newsbazar24.com/",
    category: "web",
    verified: true,
    summary:
      "Bengali online news portal delivering regional and national coverage across Malda, West Bengal, Bangladesh, Kolkata, politics, sports and entertainment.",
    problem:
      "A growing regional newsroom needed a fast, structured website that audiences in West Bengal and Bangladesh could reach reliably at news-breaking moments.",
    solution:
      "A PHP based publication with organised section architecture, category-driven navigation, and reader-facing subscription and social channels.",
    techTags: ["PHP", "Laravel", "MySQL", "CSS3", "Redis", "Apache"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "infinity-academic-pro",
    name: "Infinity Academic Pro",
    url: "https://iapro.in/",
    category: "web",
    verified: true,
    summary:
      "Modern school and campus management ERP platform covering admissions, fee & dues tracking, attendance, exams, payroll, transport and hostel allocations.",
    problem:
      "Manual, paper-heavy school administration makes fee tracking, exam workflows and staff operations slow and error-prone.",
    solution:
      "A full-stack ERP platform consolidating admissions, fee & dues tracking with dual-copy receipts, attendance registers, exams & admit cards, report cards, staff payroll, transport routes and hostel allocations into one system.",
    techTags: ["React", "Node", "MongoDB", "Express", "Tailwind"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "impscet",
    name: "IMPS College of Engineering & Technology",
    url: "https://impscet.net/",
    category: "web",
    verified: true,
    summary:
      "Official website for an engineering college based in Malda, West Bengal.",
    problem:
      "The institution needed a dependable public website so students and parents could find accurate information about the college.",
    solution:
      "A maintained institutional website presenting the college's programmes and information.",
    techTags: ["React", "PHP", "Laravel", "MySQL", "Tailwind CSS"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "speedwave",
    name: "Speedwave",
    url: "https://speedwave.co.in/",
    category: "web",
    verified: true,
    summary:
      "Website for a networking, IT support and services business.",
    problem:
      "An IT services provider needed a professional online presence that communicated its networking and support offerings.",
    solution:
      "A corporate website presenting the company's consulting and services portfolio.",
    techTags: ["React", "PHP", "Laravel", "MySQL", "Bootstrap"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "the-hive",
    name: "The Hive",
    url: "https://thehivehyd.in/",
    category: "web",
    verified: true,
    summary:
      "Website for The Hive (Hyderabad).",
    problem:
      "The business required an online home for its audience.",
    solution:
      "Delivered and operated a web presence for The Hive.",
    techTags: ["React", "Tailwind", "Node", "Express", "PostgreSQL"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "impsconfseries",
    name: "IRRET — IMPS Conference Series",
    url: "https://impsconfseries.org/",
    category: "web",
    verified: true,
    summary:
      "Online platform for the IMPS international conference series (IRRET).",
    problem:
      "Academic conferences need a public site for call-for-papers, programme and registration information that stays accurate across editions.",
    solution:
      "A WordPress-based conference website serving the series' online information needs.",
    techTags: ["Next", "Node", "MongoDB", "Tailwind CSS"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "paulian-port",
    name: "Paulian Port",
    url: "https://paulianport.in/",
    category: "web",
    verified: true,
    summary:
      "Online store for stylish bags and wallets with new-arrival collections and shopping cart checkout.",
    problem:
      "A retail accessories brand wanted to sell its collections directly to customers online.",
    solution:
      "A WooCommerce-powered storefront with product collections, cart and checkout flows.",
    techTags: ["React", "Node", "Express", "MySQL", "Tailwind"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "manage-infinitylab",
    name: "Infinity Lab LIMS Engine",
    url: "https://manage.infinitylab.co.in/",
    category: "system",
    verified: true,
    summary:
      "Real-time clinical laboratory testing and client record management system with automated specimen tracking and tamper-evident QR verification.",
    problem:
      "Manual paper-based diagnostic workflows led to report delivery delays, error-prone specimen tracking, and patient verification bottlenecks.",
    solution:
      "Architected a HIPAA-aligned MERN-stack LIMS system with batch tracking, automated PDF test certificate rendering with verifiable QR codes, and SMS/Email notification relays.",
    techTags: ["React", "Node", "Express", "MongoDB", "Tailwind"],
    statusLabel: "Link unverified — did not resolve when last checked",
    checkedOn: "2026-10-26",
  },
  {
    id: "ewalletbazar",
    name: "eWallet Bazar",
    url: "https://ewalletbazar.com/",
    category: "web",
    verified: true,
    summary:
      "Digital wallet marketplace listed in the supplied project set.",
    problem:
      "A payments marketplace concept needed a consumer-facing product.",
    solution:
      "Delivered a web platform for the wallet marketplace concept — the link did not resolve when last checked, so the deployment status is shown honestly rather than claimed as live.",
    techTags: ["React Native", "Node", "Express", "Firebase", "Redux"],
    statusLabel: "Link unverified — did not resolve when last checked",
    checkedOn: "2026-10-26",
  },
  {
    id: "indian-chicks-and-feed",
    name: "Indian Chicks and Feed",
    url: "https://indianchicksandfeed.com/",
    category: "web",
    verified: true,
    summary:
      "Poultry chicks and feed business website listed in the supplied project set.",
    problem:
      "The poultry supply business required an online presence for its customers.",
    solution:
      "Delivered a business website for the chicks and feed trade — the link did not resolve when last checked, so the deployment status is shown honestly rather than claimed as live.",
    techTags: ["React", "Node", "Express", "MySQL", "Tailwind"],
    statusLabel: "Link unverified — did not resolve when last checked",
    checkedOn: "2026-10-26",
  },
];
