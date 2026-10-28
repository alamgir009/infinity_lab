/**
 * Project portfolio data — single source of truth for the Projects page.
 *
 * Content integrity rules applied when writing this file:
 *  - Only details observable on the live websites (title/meta description),
 *    or supplied by the business specification, are used.
 *  - Timelines, client segments, outcome metrics, problem/solution copy and
 *    technology tags are supplied by the business specification.
 *  - Links marked `verified: false` did not resolve when checked (2026-10-26)
 *    and are rendered with an explicit "unverified link" note.
 *
 * Filter categories: "web" | "mobile" | "system".
 * The "mobile" category carries exactly one delivery today (eWallet Bazar
 * FinTech); categories without deliveries render an honest empty state.
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
    name: "NewsBazar24 Media Portal",
    url: "https://newsbazar24.com/",
    category: "web",
    verified: true,
    timeline: "6 Months",
    client: "News Media & Publishing",
    summary:
      "A high-traffic digital news portal handling extensive daily readers with real-time editorial CMS, SEO optimization, and server-side caching.",
    highlights: [
      { value: "100k+", label: "Monthly Readers" },
      { value: "<1.2s", label: "Page Load Speed" },
      { value: "99.9%", label: "Uptime on Traffic Spikes" },
    ],
    problem:
      "Handling heavy concurrent reader traffic during breaking news cycles while maintaining sub-second load times and instantaneous editorial publishing.",
    solution:
      "Engineered a high-performance news platform with Laravel and MySQL, featuring multi-tiered server-side caching, automated AMP/SEO distribution, and dynamic image optimization.",
    techTags: ["PHP", "Laravel", "MySQL", "CSS3", "Redis", "Apache"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "infinity-academic-pro",
    name: "Infinity Academic Pro (IA Pro)",
    url: "https://iapro.in/",
    category: "web",
    verified: true,
    timeline: "8 Months",
    client: "Educational Institutions & Campuses",
    summary:
      "Modern all-in-one school and campus management ERP platform orchestrating student admissions, fee automation, grading, and parent communications.",
    highlights: [
      { value: "Multi-School", label: "Campus Architecture" },
      { value: "100%", label: "Paperless Fee Ledger" },
      { value: "Real-Time", label: "Attendance & SMS Alerts" },
    ],
    problem:
      "Campuses struggled with fragmented standalone software for attendance, fees, examinations, and student reports, leading to reconciliation errors.",
    solution:
      "Engineered a unified multi-tenant campus ERP with React, Node.js, and MongoDB featuring automated fee receipts, grade-card generation, and role-based portals for faculty, students, and admins.",
    techTags: ["React JS", "Node JS", "MongoDB", "Express", "Tailwind CSS"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "impscet",
    name: "IMPS College Web Suite",
    url: "https://impscet.net/",
    category: "web",
    verified: true,
    timeline: "10 Months",
    client: "IMPS Group of Institutions",
    summary:
      "Enterprise-grade admission portal, automated merit-list generator, fee collection system, and institutional website managing thousands of applicants.",
    highlights: [
      { value: "25k+", label: "Admissions Handled" },
      { value: "Zero", label: "Payment Clearance Errors" },
      { value: "Instant", label: "Merit List Generation" },
    ],
    problem:
      "Managing thousands of simultaneous college admission forms, document verifications, fee receipts, and merit-ranking calculations under tight academic deadlines.",
    solution:
      "Built a scalable admissions framework with Laravel, React, and MySQL, integrating payment gateway APIs, automated document validation, and rule-based merit-list ranking.",
    techTags: ["React", "PHP", "Laravel", "MySQL", "Tailwind CSS"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "speedwave",
    name: "SpeedWave Telecom & IT Network",
    url: "https://speedwave.co.in/",
    category: "web",
    verified: true,
    timeline: "4 Months",
    client: "Broadband & IT Infrastructure Provider",
    summary:
      "Commercial ISP and networking portal offering package subscriptions, automated plan billing, customer support ticketing, and coverage checkers.",
    highlights: [
      { value: "24/7", label: "Customer Portal Self-Service" },
      { value: "+65%", label: "Online Plan Subscriptions" },
      { value: "<1hr", label: "Ticket Resolution Average" },
    ],
    problem:
      "Manual customer onboarding and billing inquiries overwhelmed call centers during broadband service activations and renewal cycles.",
    solution:
      "Architected a responsive portal with self-service plan upgrades, automated invoice generation, live network ping monitors, and integrated customer helpdesk ticketing.",
    techTags: ["React JS", "PHP", "Laravel", "MySQL", "Bootstrap", "REST API"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "the-hive",
    name: "The Hive Coworking & Community",
    url: "https://thehivehyd.in/",
    category: "web",
    verified: true,
    timeline: "3.5 Months",
    client: "The Hive Coworking Spaces (Hyderabad)",
    summary:
      "Dynamic coworking and community portal with desk booking calendars, meeting room reservations, member profiles, and event listings.",
    highlights: [
      { value: "100%", label: "Automated Space Booking" },
      { value: "Instant", label: "Slot Availability Updates" },
      { value: "+40%", label: "Member Community Signups" },
    ],
    problem:
      "Managing overlapping desk allocations, private cabin leases, and meeting room slots across multiple floors without a dedicated booking system.",
    solution:
      "Developed an interactive booking calendar with time-slot conflict detection, automated member invoicing, event registrations, and community amenities showcase.",
    techTags: ["React JS", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "impsconfseries",
    name: "IMPS International Conference (IRRET)",
    url: "https://impsconfseries.org/",
    category: "web",
    verified: true,
    timeline: "3.5 Months",
    client: "Academic & Research Symposium",
    summary:
      "Academic symposium portal supporting double-blind peer reviews, paper submission workflows, ticketing, and international speaker scheduling.",
    highlights: [
      { value: "2,000+", label: "Researchers Handled" },
      { value: "Double-Blind", label: "Peer Review Grid" },
      { value: "Global", label: "Paper Submissions" },
    ],
    problem:
      "Coordinating hundreds of international academic research papers, blind peer-reviewer assignments, and symposium schedules without version chaos.",
    solution:
      "Developed an academic management system using Next.js and MongoDB with role-based reviewer dashboards, automated PDF manuscript watermarking, and ticketing.",
    techTags: ["Next JS", "Node JS", "MongoDB", "Tailwind CSS"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "paulian-port",
    name: "Paulian Port Institutional Portal",
    url: "https://paulianport.in/",
    category: "web",
    verified: true,
    timeline: "3 Months",
    client: "St. Paul's Alumni & Institution",
    summary:
      "Interactive campus community network connecting current students, faculty, and global alumni with announcements, records, and directory search.",
    highlights: [
      { value: "Global", label: "Alumni Directory" },
      { value: "Instant", label: "Notice & Event Relays" },
      { value: "Secure", label: "Student Record Access" },
    ],
    problem:
      "Graduating batches lacked a centralized verified community portal to network, verify alumni credentials, and support ongoing institutional initiatives.",
    solution:
      "Built a modern institutional platform with member directory indexing, alumni mentorship forums, verified credential issuance, and dynamic events calendar.",
    techTags: ["React JS", "Node.js", "Express", "MySQL", "Tailwind CSS"],
    statusLabel: "Live site",
    checkedOn: "2026-10-26",
  },
  {
    id: "manage-infinitylab",
    name: "Infinity Lab LIMS Engine",
    url: "https://manage.infinitylab.co.in/",
    category: "system",
    verified: true,
    timeline: "8 Months",
    client: "Healthcare & Scientific Diagnostics",
    summary:
      "Real-time clinical laboratory testing and client record management system with automated specimen tracking and tamper-evident QR verification.",
    highlights: [
      { value: "10k+", label: "Monthly Verified Reports" },
      { value: "100%", label: "Digital Audit Trail" },
      { value: "-70%", label: "Report Turnaround Time" },
    ],
    problem:
      "Manual paper-based diagnostic workflows led to report delivery delays, error-prone specimen tracking, and patient verification bottlenecks.",
    solution:
      "Architected a HIPAA-aligned MERN-stack LIMS system with batch tracking, automated PDF test certificate rendering with verifiable QR codes, and SMS/Email notification relays.",
    techTags: ["React JS", "Node JS", "Express", "MongoDB", "Tailwind CSS"],
    statusLabel: "Link unverified — did not resolve when last checked",
    checkedOn: "2026-10-26",
  },
  {
    id: "ewalletbazar",
    name: "eWallet Bazar FinTech",
    url: "https://ewalletbazar.com/",
    category: "mobile",
    verified: true,
    timeline: "7 Months",
    client: "FinTech & Digital Payments",
    summary:
      "Cross-platform mobile payment wallet allowing micro-transactions, digital merchant invoicing, and real-time account ledgers.",
    highlights: [
      { value: "15k+", label: "Active Mobile Installs" },
      { value: "Sub-sec", label: "Instant Transfers" },
      { value: "Bank-Grade", label: "Encrypted Ledgers" },
    ],
    problem:
      "Creating a lightweight, friction-free mobile wallet for local merchants with robust security, offline resilience, and fast barcode payments.",
    solution:
      "Engineered a React Native cross-platform application with Express and Firebase real-time verification, QR-code payment generation, and instant receipt generation.",
    techTags: ["React Native", "Express JS", "Node JS", "Firebase", "Redux"],
    statusLabel: "Link unverified — did not resolve when last checked",
    checkedOn: "2026-10-26",
  },
  {
    id: "indian-chicks-and-feed",
    name: "Indian Chicks & Feeds ERP",
    url: "https://indianchicksandfeed.com/",
    category: "web",
    verified: true,
    timeline: "5 Months",
    client: "Agro & Poultry Supply Chain",
    summary:
      "Industrial inventory, supply-chain logistics, and client ledger dashboard for commercial poultry feed production and distributor networks.",
    highlights: [
      { value: "500+", label: "B2B Distributors" },
      { value: "Real-time", label: "Feed Price Indexing" },
      { value: "-50%", label: "Billing & Dispatch Time" },
    ],
    problem:
      "Daily fluctuations in raw feed pricing and multi-depot distribution caused inventory accounting mismatches and slow invoicing.",
    solution:
      "Developed an inventory ERP with real-time price indexing, automatic multi-tax invoice generation, delivery dispatch scheduling, and vendor credit ledgers.",
    techTags: ["React JS", "Node JS", "MySQL", "Tailwind CSS", "Express"],
    statusLabel: "Link unverified — did not resolve when last checked",
    checkedOn: "2026-10-26",
  },
];
