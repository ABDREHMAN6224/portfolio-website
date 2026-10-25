// Single source of truth for all portfolio copy. Sections read from here; edit content here, not in components.

export const profile = {
  name: "Abdul Rehman Memon",
  shortName: "Abdul Rehman",
  initials: "AR",
  role: "Full Stack & AI Engineer",
  location: "Islamabad, Pakistan",
  /** Optional "open to roles" pill; leave empty to hide it everywhere. */
  availability: "",
  /** Short distinction shown as the hero badge and on the OG image. */
  distinction: "President's Gold Medalist · NUST",
  headline: "I build production AI systems and the full-stack products around them.",
  /** Phrase inside `headline` rendered as the serif-italic accent in the hero. */
  headlineAccent: "AI systems",
  /** Shorter hero version of `summary`. */
  intro:
    "Full-stack engineer across Next.js, Node, Go and AWS. I take products from architecture to production: LangGraph agents, AI pipelines, serverless backends, and the interfaces people use them through.",
  summary:
    "Full-stack engineer working across Next.js, Node, Go and AWS. I take products from architecture to production: LangGraph agents, AI pipelines, serverless backends, and the interfaces people use them through. I graduated in Computer Science from NUST as a President's Gold Medalist (3.93 CGPA) and have spent the last three years shipping for startups and clients worldwide.",
  email: "memonabdulrehman250@gmail.com",
  phone: "+92 316 0532576",
  website: "https://abdrehman.me",
  cv: "/cv.pdf",
  photo: "/images/profile.jpeg",
  socials: {
    github: "https://github.com/ABDREHMAN6224",
    linkedin: "https://www.linkedin.com/in/abdul-rehman-memon-9a908924b",
  },
} as const;

export const stats = [
  { value: "3+", label: "Years shipping production software" },
  { value: "95%", label: "Manual work removed by an AI pipeline at Peak Energy" },
  { value: "5", label: "Engineering teams, onsite and remote" },
  { value: "3.93", label: "CGPA, ranked 1st of 200 · President's Gold Medal" },
] as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  mode: "Hybrid" | "Remote" | "Onsite";
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Alexein AI",
    role: "Backend & AI Engineer",
    period: "Aug 2026 — Present",
    mode: "Onsite",
    current: true,
    summary:
      "Building agentic AI systems alongside Stanford PhD researchers, owning the backend and AI engineering that takes them from research to working software.",
    highlights: [
      "Design and build agentic systems: multi-step agents that plan, call tools and act on behalf of users.",
      "Build SOTA (State-of-the-art) memory layers for agents.",
      "Work directly with Stanford PhD researchers to turn research ideas into reliable, production-grade services.",
      "Own the backend: APIs, agent orchestration, data pipelines and the infrastructure the agents run on.",
    ],
    stack: ["Python", "Agentic Systems", "LLMs", "LangGraph", "Backend APIs", "AWS", "PostgreSQL", "Redis"],
  },
  {
    company: "Alfabolt",
    role: "Software Engineer",
    period: "Dec 2025 — Aug 2026",
    mode: "Onsite",
    current: false,
    summary:
      "Building AI-first products for clients end to end, from agent design to AWS deployment.",
    highlights: [
      "Designed and shipped the AI pipeline for Peak Energy (peakenergy.io), cutting manual processing by ~95%, then extended the wider product as full-stack engineer.",
      "Built ClaimBrite (claimbrite.com), an AI-powered mediation platform: multi-agent workflows in LangGraph, with the backend and agents deployed on AWS.",
      "Led development of an internal sales-automation tool for lead tracking and outreach.",
      "Built and maintained scrapers for Wellfound and Y Combinator to source startup and company data.",
    ],
    stack: ["LangGraph", "Python", "Next.js", "TypeScript", "AWS", "PostgreSQL"],
  },
  {
    company: "Brainbox Automations",
    role: "Full Stack Engineer",
    period: "Apr 2025 — Dec 2025",
    mode: "Remote",
    summary:
      "Owned client projects end to end: architecture, implementation, deployment and production support.",
    highlights: [
      "Built and tuned AWS infrastructure (EC2, Lambda, S3, DynamoDB, Cognito) with CI/CD pipelines for automated testing and deploys.",
      "Integrated LLM features and third-party platforms: Google Ads, Meta Ads APIs, Stripe payments and authentication.",
      "Ran background workers and scheduled jobs that process async tasks, track execution state in DynamoDB and monitor external API workflows.",
      "Worked directly with clients to scope requirements and deliver CMS-driven workflows and optimised data pipelines.",
    ],
    stack: ["Next.js", "Node.js", "AWS Lambda", "DynamoDB", "Cognito", "Stripe"],
  },
  {
    company: "Infinity Beyond",
    role: "Software Engineer (Part-time)",
    period: "Nov 2024 — Jan 2025",
    mode: "Remote",
    summary: "Backend APIs and cloud deployment for a growing product.",
    highlights: [
      "Built backend APIs in Flask integrated with AWS services.",
      "Added a Redis caching layer to cut response times on hot paths.",
      "Containerised services with Docker and managed CI/CD pipelines.",
    ],
    stack: ["Python", "Flask", "Redis", "Docker", "AWS"],
  },
  {
    company: "Asteramind",
    role: "Next.js + Django Developer (Part-time)",
    period: "Sep 2023 — Oct 2024",
    mode: "Remote",
    summary: "Shipped a complete SaaS product from first commit to paying customers.",
    highlights: [
      "Developed and deployed a full SaaS application with integrated payment processing.",
      "Integrated third-party APIs and implemented JWT-based authentication.",
    ],
    stack: ["Next.js", "Django", "DRF", "PostgreSQL", "Stripe"],
  },
];

export type CaseStudy = {
  name: string;
  tagline: string;
  url?: string;
  context: string;
  problem: string;
  solution: string;
  impact: string;
  metric?: { value: string; label: string };
  stack: string[];
};

// Client work highlighted above the project grid.
export const caseStudies: CaseStudy[] = [
  {
    name: "Peak Energy",
    tagline: "AI pipeline for energy operations",
    url: "https://peakenergy.io",
    context: "Client · Alfabolt",
    problem:
      "A large share of the team's day-to-day workflow was manual and repetitive, which limited how fast operations could scale.",
    solution:
      "Designed and built the AI pipeline that automates that workflow, then kept extending the platform with new features as full-stack engineer.",
    impact: "Removed roughly 95% of the manual work and freed the team for higher-value tasks.",
    metric: { value: "~95%", label: "less manual work" },
    stack: ["LLMs", "Python", "Next.js", "AWS"],
  },
  {
    name: "ClaimBrite",
    tagline: "AI-powered mediation platform",
    url: "https://claimbrite.com",
    context: "Client · Alfabolt",
    problem:
      "Mediating claims is slow and labour-intensive, and each case needs structured reasoning across many inputs.",
    solution:
      "Built the platform and its multi-agent workflows with LangGraph, and owned the AWS deployment of both the backend and the AI agents.",
    impact: "Took the product from build to production on AWS, running agentic workflows in a live product.",
    metric: { value: "Multi-agent", label: "LangGraph on AWS" },
    stack: ["LangGraph", "Python", "AWS", "Next.js"],
  },
];

export type Project = {
  name: string;
  description: string;
  highlights: string[];
  stack: string[];
  category: "Systems" | "Full Stack" | "Client";
  github?: string;
  live?: string;
  image?: string;
  featured?: boolean;
  /** Decorative illustration shown on featured project cards. */
  visual?: "compiler" | "terminal" | "workers";
};

export const projects: Project[] = [
  {
    name: "Compiler in Go",
    description:
      "A compiler and bytecode virtual machine for a subset of C, written from scratch.",
    highlights: [
      "Hand-written lexer, parser, bytecode compiler and stack-based VM",
      "Supports if/else, switch, loops, functions, arithmetic and several data types",
    ],
    stack: ["Go", "Compilers", "Virtual Machines"],
    category: "Systems",
    github: "https://github.com/ABDREHMAN6224/Compiler",
    featured: true,
    visual: "compiler",
  },
  {
    name: "Redis Clone",
    description:
      "A Redis-compatible server in Go, built through the CodeCrafters challenge.",
    highlights: [
      "TCP networking, RESP protocol, persistence and replication",
      "Concurrent client handling with ~99% protocol compatibility",
    ],
    stack: ["Go", "TCP", "Concurrency"],
    category: "Systems",
    featured: true,
    visual: "terminal",
  },
  {
    name: "LeetCode Clone Backend",
    description:
      "A distributed code-execution backend with WebSocket servers and worker nodes.",
    highlights: [
      "Sandboxed execution across multiple programming languages",
      "Test cases and submissions stored in Cloudflare R2",
    ],
    stack: ["Node.js", "WebSockets", "Workers", "Cloudflare R2"],
    category: "Systems",
    github: "https://github.com/ABDREHMAN6224/leetcode-clone",
    featured: true,
    visual: "workers",
  },
  {
    name: "eSIM Marketplace",
    description: "E-commerce platform for selling digital eSIMs, with payments and a CMS.",
    highlights: [
      "Stripe checkout, auth, order management and email notifications",
      "Sanity CMS for content and inventory",
    ],
    stack: ["Next.js", "Stripe", "Sanity", "Node.js"],
    category: "Full Stack",
    github: "https://github.com/ABDREHMAN6224/esim-website",
  },
  {
    name: "Gone But Never Forgotten",
    description: "A memorial website for sharing tributes, with secure media uploads.",
    highlights: [
      "Clerk authentication and Cloudflare R2 media storage",
      "Automated notifications; accessible, mobile-first design",
    ],
    stack: ["Next.js", "Clerk", "Cloudflare R2"],
    category: "Client",
    github: "https://github.com/ABDREHMAN6224/fiverr-1",
  },
  {
    name: "Nooru Business Platform",
    description: "A custom business platform for a Fiverr client.",
    highlights: [
      "NextAuth authentication and Nodemailer email automation",
      "Responsive build with SEO work that improved search rankings",
    ],
    stack: ["Next.js", "NextAuth", "Nodemailer"],
    category: "Client",
  },
  {
    name: "CropConnect",
    description: "A social platform for farmers to share resources and collaborate.",
    highlights: [
      "Real-time messaging, geolocation and community forums",
      "Weather APIs and crop-management tools",
    ],
    stack: ["MERN", "Socket.io", "Maps", "Weather API"],
    category: "Full Stack",
    github: "https://github.com/ABDREHMAN6224/CropConnect",
  },
  {
    name: "DSA Visualizer",
    description: "Interactive visualisations of data structures and algorithms.",
    highlights: [
      "Animated trees, heaps and sorting algorithms",
      "Built as a teaching tool on the MERN stack",
    ],
    stack: ["React", "Node.js", "MongoDB"],
    category: "Full Stack",
    live: "https://dsa-visualizer-arm.netlify.app",
    github: "https://github.com/ABDREHMAN6224/dsa_project_final",
    image: "/images/dsa.png",
  },
];

export const skillGroups = [
  {
    title: "AI & LLMs",
    blurb: "Agents and pipelines that run in production.",
    items: ["Agentic AI", "LangGraph", "Memory Architectures", "Reinforcement Learning", "Digital Twins", "LLMs", "RAG", "OpenAI API"],
  },
  {
    title: "Frontend",
    blurb: "Fast, accessible, well-crafted interfaces.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "Material UI"],
  },
  {
    title: "Backend",
    blurb: "APIs, workers and real-time systems.",
    items: ["Node.js", "Express", "Go", "Python", "Django / DRF", "Flask", "Prisma", "WebSockets", "REST"],
  },
  {
    title: "Data",
    blurb: "Relational, document and key-value stores.",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "DynamoDB", "Supabase"],
  },
  {
    title: "Cloud & DevOps",
    blurb: "Infrastructure as code with automated delivery.",
    items: ["AWS (EC2, Lambda, S3, RDS, SQS, SES, API Gateway, Cognito)", "CDK", "Terraform", "Docker", "CI/CD", "Vercel"],
  },
  {
    title: "Tooling & Integrations",
    blurb: "Everything around the core product.",
    items: ["Stripe", "Sanity CMS", "WebRTC", "Socket.io", "Jest", "Cypress", "Git / GitHub", "Google & Meta Ads APIs"],
  },
] as const;

export const education = {
  degree: "B.Sc. Computer Science",
  school: "National University of Sciences & Technology (NUST)",
  detail: "CGPA 3.93 / 4.0",
  honor: "President's Gold Medal",
  honorDetail: "Ranked 1st of 200 in class · Class of 2026",
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

/** About section narrative (hero/about). */
export const about = {
  title: "Engineer first, across the whole stack.",
  titleAccent: "whole stack",
  paragraphs: [
    "I'm a full-stack engineer who works where product and AI meet. For the last three years I've shipped for startups and clients worldwide, usually owning the work end to end: architecture, data model, implementation, deployment and the production support that follows.",
    "Lately that means agentic systems: LangGraph workflows and AI pipelines on serverless AWS, paired with fast interfaces in Next.js and TypeScript. Outside client work I like building from first principles, like a compiler with its own bytecode VM and a Redis-compatible server, both in Go.",
  ],
} as const;

/** Key technologies scrolled in the hero marquee. */
export const heroTech = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Go",
  "LangGraph",
  "RAG",
  "AWS",
  "Lambda",
  "PostgreSQL",
  "DynamoDB",
  "Redis",
  "Docker",
  "Terraform",
  "Stripe",
] as const;

// Contact section + footer copy.
export const contact = {
  headline: { lead: "Let's build something", accent: "worth shipping" },
  lede: "Hiring for a senior full-stack or AI role, or have a product that needs building? Send a note. It comes straight to my inbox.",
  formTitle: "Send a message",
  formNote: "Messages go directly to my inbox.",
  success: "Thanks, your message is on its way. I'll reply to the email you gave.",
  error: "Something went wrong sending that. Please try again, or email me directly.",
  mailtoNotice: "Your email app should open with the message ready to send.",
} as const;

export const footer = {
  tagline: "Full-stack and AI engineer building production AI systems and the products around them.",
} as const;
