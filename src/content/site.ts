// Single source of truth for all portfolio copy. Sections read from here; edit content here, not in components.

export const profile = {
  name: "Abdul Rehman Memon",
  shortName: "Abdul Rehman",
  initials: "AR",
  role: "Software Engineer",
  location: "Islamabad, Pakistan",
  /** Optional "open to roles" pill; leave empty to hide it everywhere. */
  availability: "",
  /** Short distinction shown as the hero badge and on the OG image. */
  distinction: "President's Gold Medalist · NUST",
  headline: "I engineer backend and AI systems, from first design to production.",
  /** Phrase inside `headline` rendered as the serif-italic accent in the hero. */
  headlineAccent: "backend and AI systems",
  /** Shorter hero version of `summary`. */
  intro:
    "Software engineer at Alexein AI, working on agentic AI, memory architectures and the backend they run on. Before that I built AI products and cloud infrastructure at Alfabolt and BrainBox Automations, owning systems from architecture to production support.",
  summary:
    "Software engineer at Alexein AI, a San Francisco-based startup backed by Stanford PhDs that builds persistent AI twins grounded in company knowledge graphs. I work across agentic AI, memory architectures, reinforcement learning and digital twins, and own the backend engineering. Before Alexein I built AI pipelines, LangGraph agents and AWS infrastructure at Alfabolt and BrainBox Automations. I graduated in Computer Science from NUST as a President's Gold Medalist, ranked 1st of 200 with a 3.93 CGPA.",
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
  { value: "3+", label: "Years building production software" },
  { value: "95%", label: "Less manual work from the AI pipeline I built for Peak Energy" },
  { value: "5", label: "Engineering roles, on-site and remote" },
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
      "San Francisco-based startup backed by Stanford PhDs, building persistent AI twins grounded in company knowledge graphs. I work across agentic AI, memory architectures, reinforcement learning and digital twins, and own the backend engineering that turns that research into working software.",
    highlights: [
      "Design and build agentic systems: multi-step agents that plan, call tools and act on behalf of users.",
      "Build memory layers that let agents retain and use context over time.",
      "Work directly with Stanford PhD researchers to turn research ideas into reliable production services.",
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
      "Built AI products on Alfabolt's engineering team, from agent design and pipelines through to AWS deployment.",
    highlights: [
      "Built the AI pipeline for Peak Energy (peakenergy.io), cutting manual work by ~95%, then extended the wider product as a full-stack engineer.",
      "Developed ClaimBrite (claimbrite.com), an AI-powered mediation platform: built its LangGraph agents and deployed the backend and agents on AWS.",
      "Led development of an internal sales-automation tool for lead tracking and outreach.",
      "Built and maintained scrapers for Wellfound and Y Combinator that extract startup and company data.",
    ],
    stack: ["LangGraph", "Python", "Next.js", "TypeScript", "AWS", "PostgreSQL"],
  },
  {
    company: "Brainbox Automations",
    role: "Full Stack Engineer",
    period: "Apr 2025 — Dec 2025",
    mode: "Remote",
    summary:
      "Owned projects end to end: architecture, implementation, deployment and production support.",
    highlights: [
      "Built AWS infrastructure (EC2, Lambda, S3, DynamoDB, Cognito) and CI/CD pipelines for automated testing and deployment.",
      "Integrated LLM features, Google Ads and Meta Ads APIs, Stripe payments and authentication.",
      "Deployed background workers and scheduled (CRON) jobs that process async tasks and track execution state in DynamoDB.",
      "Delivered CMS-driven workflows and optimised data pipelines.",
    ],
    stack: ["Next.js", "Node.js", "AWS Lambda", "DynamoDB", "Cognito", "Stripe"],
  },
  {
    company: "Infinity Beyond",
    role: "Software Engineer (Part-time)",
    period: "Nov 2024 — Jan 2025",
    mode: "Remote",
    summary: "Backend APIs, caching and containerised deployment on AWS.",
    highlights: [
      "Built backend APIs in Flask integrated with AWS services.",
      "Implemented Redis caching on the API layer.",
      "Containerised applications with Docker and managed the CI/CD pipelines.",
    ],
    stack: ["Python", "Flask", "Redis", "Docker", "AWS"],
  },
  {
    company: "Asteramind",
    role: "Next.js + Django Developer (Part-time)",
    period: "Sep 2023 — Oct 2024",
    mode: "Remote",
    summary: "Built and deployed a complete SaaS application, including payment processing.",
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

// Products I built as a software engineer at Alfabolt, shown above the project grid.
export const caseStudies: CaseStudy[] = [
  {
    name: "Peak Energy",
    tagline: "AI pipeline for energy operations",
    url: "https://peakenergy.io",
    context: "Built at Alfabolt · 2026",
    problem:
      "Much of the day-to-day operational workflow was manual and repetitive, which limited how far operations could scale.",
    solution:
      "Designed and built the AI pipeline that automates that workflow, then kept extending the platform as a full-stack engineer.",
    impact: "Cut the manual work in that workflow by roughly 95%.",
    metric: { value: "~95%", label: "less manual work" },
    stack: ["LLMs", "Python", "Next.js", "AWS"],
  },
  {
    name: "ClaimBrite",
    tagline: "AI-powered mediation platform",
    url: "https://claimbrite.com",
    context: "Built at Alfabolt · 2026",
    problem:
      "Mediating claims is slow and labour-intensive, and each case needs structured reasoning across many inputs.",
    solution:
      "Built the platform's multi-agent workflows in LangGraph and owned the AWS deployment of both the backend and the agents.",
    impact: "Took the product from build to production, with agentic workflows running live on AWS.",
    metric: { value: "Multi-agent", label: "LangGraph on AWS" },
    stack: ["LangGraph", "Python", "AWS", "Next.js"],
  },
];

export type Project = {
  name: string;
  description: string;
  highlights: string[];
  stack: string[];
  category: "Systems" | "Applications";
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
      "Core commands and data structures over TCP using the RESP protocol",
      "Persistence, replication and handling of concurrent connections, with ~99% protocol compatibility",
    ],
    stack: ["Go", "TCP", "Concurrency"],
    category: "Systems",
    featured: true,
    visual: "terminal",
  },
  {
    name: "LeetCode Clone Backend",
    description:
      "A distributed code-execution backend built from WebSocket servers and worker nodes.",
    highlights: [
      "Secure, sandboxed execution across multiple programming languages",
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
    description: "An e-commerce platform for selling digital eSIMs, with payments and a CMS.",
    highlights: [
      "Stripe checkout, authentication, order management and email notifications",
      "Sanity CMS for content and inventory",
    ],
    stack: ["Next.js", "Stripe", "Sanity", "Node.js"],
    category: "Applications",
    github: "https://github.com/ABDREHMAN6224/esim-website",
  },
  {
    name: "CropConnect",
    description: "A social platform where farmers share resources and collaborate.",
    highlights: [
      "Real-time messaging, geolocation and community forums",
      "Weather data and crop-management tools",
    ],
    stack: ["MERN", "Socket.io", "Maps", "Weather API"],
    category: "Applications",
    github: "https://github.com/ABDREHMAN6224/CropConnect",
  },
  {
    name: "DSA Visualizer",
    description: "Interactive visualisations of data structures and algorithms, built as a teaching tool.",
    highlights: [
      "Animated trees, heaps and sorting algorithms",
      "React front end with a Node.js and MongoDB backend",
    ],
    stack: ["React", "Node.js", "MongoDB"],
    category: "Applications",
    live: "https://dsa-visualizer-arm.netlify.app",
    github: "https://github.com/ABDREHMAN6224/dsa_project_final",
    image: "/images/dsa.png",
  },
];

export const skillGroups = [
  {
    title: "Backend & Distributed Systems",
    blurb: "APIs, workers, real-time servers and the protocols underneath.",
    items: ["Go", "Node.js", "Express", "Django / DRF", "Flask", "Prisma", "WebSockets", "REST APIs", "Background workers & CRON jobs", "TCP networking"],
  },
  {
    title: "AI Systems",
    blurb: "Agents, memory and pipelines built to run in production.",
    items: ["Agentic AI", "LangGraph", "Memory Architectures", "Reinforcement Learning", "Digital Twins", "LLMs", "RAG", "OpenAI API"],
  },
  {
    title: "Cloud & Infrastructure",
    blurb: "Infrastructure as code, containers and automated delivery.",
    items: ["AWS (EC2, Lambda, S3, RDS, SQS, SES, API Gateway, Cognito)", "CDK", "Terraform", "Docker", "CI/CD", "Cloudflare R2", "Vercel"],
  },
  {
    title: "Data",
    blurb: "Relational, document and key-value stores, plus caching.",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "DynamoDB", "Supabase"],
  },
  {
    title: "Frontend",
    blurb: "Fast, accessible interfaces on top of the systems.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Framer Motion", "Material UI"],
  },
  {
    title: "Languages & Tooling",
    blurb: "Languages, testing and the integrations around a system.",
    items: ["Go", "Python", "TypeScript", "Git / GitHub", "Jest", "Cypress", "Stripe", "Socket.io", "WebRTC", "Sanity CMS", "Google & Meta Ads APIs"],
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
  title: "I own systems end to end.",
  titleAccent: "end to end",
  paragraphs: [
    "I'm a software engineer at Alexein AI, where I work on agentic AI, memory architectures, reinforcement learning and digital twins, and own the backend those systems run on. Before that I was a software engineer at Alfabolt, where I built the AI pipeline behind Peak Energy and the LangGraph agents behind ClaimBrite, and a full-stack engineer at BrainBox Automations, where I built AWS infrastructure, background workers and CI/CD.",
    "I usually own the work end to end: architecture, data model, implementation, deployment and the production support that follows. I pick tools to fit the problem rather than the other way round. Outside work I build from first principles to understand what sits underneath, like a compiler with its own bytecode VM and a Redis-compatible server, both in Go.",
  ],
} as const;

/** Key technologies scrolled in the hero marquee. */
export const heroTech = [
  "Go",
  "Python",
  "TypeScript",
  "LangGraph",
  "Agentic AI",
  "RAG",
  "AWS",
  "Terraform",
  "Docker",
  "PostgreSQL",
  "Redis",
  "DynamoDB",
  "WebSockets",
  "Node.js",
  "Django",
  "Next.js",
] as const;

// Contact section + footer copy.
export const contact = {
  headline: { lead: "Let's start a", accent: "conversation" },
  lede: "Recruiting for an engineering role, working on similar problems in backend, distributed or AI systems, or want to compare notes? Send a message. It comes straight to my inbox.",
  formTitle: "Send a message",
  formNote: "Messages go directly to my inbox.",
  success: "Thanks, your message is on its way. I'll reply to the email you gave.",
  error: "Something went wrong sending that. Please try again, or email me directly.",
  mailtoNotice: "Your email app should open with the message ready to send.",
} as const;

export const footer = {
  tagline: "Software engineer working on backend, distributed and AI systems. Currently at Alexein AI.",
} as const;
