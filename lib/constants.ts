export const PROFILE_DATA = {
  profile: {
    name: "Abdul Rehman Memon",
    email: "memonabdulrehman250@gmail.com",
    phone: "+92-316-0532576",
    linkedin: "https://www.linkedin.com/in/abdul-rehman-memon-9a908924b/",
    github: "https://github.com/ABDREHMAN6224",
    website: "https://portfolio-website-arm.vercel.app",
    avatar: "profile.jpeg",
    summary: "Passionate Full Stack Developer with expertise in MERN, Next.js, AWS, and AI/ML. Experienced in building scalable web applications, integrating AI solutions, and collaborating using Git. Seeking to leverage my skills in cloud infrastructure and large language models to contribute to innovative projects at a leading tech company."
  },
  skills: [
    "Next.js", "React.js", "Redux Toolkit", "TypeScript", "Tailwind CSS", "Material-UI", "Framer Motion",
    "Node.js", "Express.js", "Prisma ORM", "WebSockets", "RESTful APIs", "Go",
    "PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase",
    "AWS (EC2, S3, Lambda, RDS, DynamoDB, SQS, SES, API Gateway)", "Docker", "CI/CD", "Vercel", "CDK",
    "LLMs", "RAG Architecture", "OpenAI API", "Jest", "Cypress", "Git/GitHub",
    "Sanity CMS", "WebRTC", "Socket.io", "Nodemailer"
  ],
  education: {
    degree: "B.Sc. in Computer Sciences",
    institution: "NUST",
    cgpa: "3.92",
    expected_graduation: "2026"
  },
  experience: [
    {
      title: "Software Engineer",
      company: "Alfabolt",
      duration: "Dec 2025 - Present",
      description: [
        "Led development of an internal sales automation tool to streamline lead tracking and outreach",
        "Built and maintained web scrapers for platforms like Wellfound and Y Combinator to extract startup and company data",
        "Worked on multiple client projects, collaborating closely with stakeholders to deliver features end-to-end"
      ]
    },
    {
      title: "Full Stack Engineer",
      company: "Brainbox Automations",
      duration: "Apr 2025 - Dec 2025",
      description: [
        "Led end-to-end development of client projects with full ownership, handling architecture, implementation, deployments, and production support",
        "Built and optimized cloud infrastructure on AWS (EC2, Lambda, S3, DynamoDB, Cognito) and set up robust CI/CD pipelines for automated testing and deployments",
        "Worked directly with clients to gather requirements, deliver scalable solutions, and integrate CMS-driven workflows and optimized data pipelines",
        "Integrated LLM-based features and third-party services including Google Ads, Meta (Facebook) Ads APIs, Stripe payments, and authentication systems",
        "Deployed background workers and scheduled jobs (CRON) to process asynchronous tasks, track execution state in DynamoDB, and monitor external API workflows"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Infinity and Beyond",
      duration: "Oct 2024 - March 2025",
      description: [
        "Working as a Full Stack Developer at Infinity and Beyond. Main technologies include Flask ,React ,Next.js, and S3, Postgres.",

      ]
    },
    {
      title: "Next Js + Django Developer",
      company: "Asteramind",
      duration: "Jan 2024 - Sep 2024",
      description: [
        "Promoted to Next js Developer Position",
        "Implemented SAAS app and completed Service website for a company.",
        "Wrote tests for Shipfro.com using Cypress"
      ]
    },
    {
      title: "React Js Intern",
      company: "Asteramind",
      duration: "Sep 2023 - Dec 2023",
      description: [
        "Front-End Developer at Asteramind on their flagship project.",
        "Developed and integrated front-end using React.js seamlessly with the backend."
      ]
    }
  ],
  projects: [
    {
      name: "AST-Based Interpreter in Go",
      description: "Built a custom interpreter in Go using an Abstract Syntax Tree (AST) for parsing and semantic analysis. Implemented lexical analysis, recursive descent parsing, and AST traversal. Designed symbol tables and type-checking mechanisms to ensure correctness and extensibility.",
      technologies: ["Go"],
      links: {
        github: "https://github.com/ABDREHMAN6224/interpreter",
        live: null
      },
      thumbnail: "interpreter.jpeg",
      images: [
        "interpreter.jpeg"
      ]
    },
    {
      name: "High-Performance Redis Clone (codecrafters)",
      description: "Built complete Redis server clone in Go supporting core commands and data structures. Implemented TCP networking, persistence, and replication features from CodeCrafters curriculum. Achieved 99% compatibility with Redis protocol and optimized for concurrent client handling.",
      technologies: ["Go", "TCP", "Redis Protocol"],
      links: {
        github: null,
        live: null
      },
      thumbnail: "leetc.jpeg",
      images: [
        "leetc.jpeg"
      ]
    },
    {
      name: "eSIM Marketplace Web Application",
      description: "Full-stack e-commerce platform for digital eSIM sales with Stripe payment integration. Implemented user authentication, order management, and automated email notifications. Integrated Sanity CMS for dynamic content management and inventory tracking.",
      technologies: ["Next.js", "Stripe", "Sanity CMS", "Tailwind CSS"],
      links: {
        github: "https://github.com/ABDREHMAN6224/esim-website",
        live: null
      },
      thumbnail: "esim.png",
      images: [
        "esim.png"
      ]
    },
    {
      name: "LeetCode Clone Backend System",
      description: "Architected scalable distributed system with WebSocket servers and worker nodes. Implemented secure code execution environment supporting multiple programming languages. Integrated Cloudflare R2 storage for test cases and submission management.",
      technologies: ["Docker", "Redis", "R2/S3", "Prisma", "Typescript", "WebSockets"],
      links: {
        github: "https://github.com/ABDREHMAN6224/leetcode-clone",
        live: null
      },
      thumbnail: "leetc.jpeg",
      images: [
        "leetc.jpeg"
      ]
    },
    {
      name: "Nooru Business Web Application",
      description: "Custom business platform built for Fiverr client using Next.js and NextAuth authentication. Deployed on Vercel with automated email services using Nodemailer. Implemented responsive design and SEO optimization resulting in improved search rankings.",
      technologies: ["Next.js", "NextAuth", "Nodemailer", "Vercel", "Prisma", "Redux", "Typescript", "Shad cn", "Stripe"],
      links: {
        github: null,
        live: "https://nooru-web-app-arm.vercel.app/"
      },
      thumbnail: "nooru.png",
      images: [
        "nooru.png"
      ]
    },
    {
      name: "Gone But Never Forgotten",
      description: "Compassionate memorial website with Clerk authentication and secure file management. Integrated Cloudflare R2 for media storage and automated notification system. Built with accessibility standards and mobile-responsive design principles.",
      technologies: ["Next.js", "Clerk", "R2/S3", "Nodemailer", "Vercel", "Prisma", "Redux", "Typescript", "Shad cn"],
      links: {
        github: "https://github.com/ABDREHMAN6224/fiverr-1",
        live: null
      },
      thumbnail: "goneBut.png",
      images: [
        "goneBut.png"
      ]
    },
    {
      name: "CropConnect Platform",
      description: "Social platform connecting farmers for resource sharing and agricultural collaboration. Implemented real-time messaging, geolocation services, and community forums. Integrated weather APIs and crop management tools with intuitive farmer-focused UI.",
      technologies: ["Next.js", "Node.js", "Socket.io", "Tailwind CSS"],
      links: {
        github: "https://github.com/ABDREHMAN6224/CropConnect",
        live: null
      },
      thumbnail: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2940&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2940&auto=format&fit=crop"
      ]
    },
    {
      name: "Data Structures & Algorithms Visualizer",
      description: "Educational MERN application with interactive algorithm visualizations and animations. Implemented complex tree structures, sorting algorithms, and heap operations.",
      technologies: ["React", "Node.js", "MERN"],
      links: {
        github: "https://github.com/ABDREHMAN6224/dsa_project_final",
        live: "https://dsa-visualizer-arm.netlify.app/"
      },
      thumbnail: "vis.png",
      images: [
        "vis.png"
      ]
    },
    {
      name: "Wheel of Names",
      description: "A fun web app to randomly select names from a list, with animated spinning and sound effects.",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      thumbnail: "spin.png",
      links: {
        github: null,
        live: "https://spin-names-funhouse.vercel.app/"
      }
    },
    {
      name: "BeachSide Centralinc",
      description: "Marketing website for BeachSide Centralinc.",
      technologies: ["Next.js", "Tailwind CSS", "Shad cn"],
      thumbnail: "beachside.png",
      links: {
        github: null,
        live: "https://www.beachsidecentralinc.com/"
      }
    },
    {
      name: "Github Driller",
      description: "A website to show analytics about users' GitHub profiles and provide a general overview.",
      technologies: ["MERN", "Tailwind CSS", "GitHub API"],
      links: {
        github: "https://github.com/ABDREHMAN6224/github-insights",
        live: "https://gitdrill-arm.netlify.app/"
      },
      thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2943&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2943&auto=format&fit=crop"
      ]
    },
    {
      name: "Chat App",
      description: "A chatting app using MERN, Redux, and Socket.io, supporting file transfers and group chatting.",
      technologies: ["MERN", "Redux", "Socket.io", "Node js"],
      links: {
        github: "https://github.com/ABDREHMAN6224/chat-backend",
        live: null
      },
      thumbnail: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=2940&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=2940&auto=format&fit=crop"
      ]
    },
    {
      name: "Nust Laptops",
      description: "A E-commerce website for NUST students to buy laptops. It is a full-stack project using Next.js, Node.js, and MongoDB.",
      technologies: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
      links: {
        github: "https://github.com/ABDREHMAN6224/AR-Mart",
        live: null
      },
      thumbnail: "laptop.png",
      images: [
        "laptop.png"
      ]
    },
    {
      name: "Unsplash Images",
      description: "IoT dashboard for monitoring and controlling smart home devices with real-time updates and automation rules.",
      technologies: ["Vite", "Tailwind CSS", "Unsplash API"],
      links: {
        github: "https://github.com/ABDREHMAN6224/vite-images",
        live: "https://unsplash-images-arm.netlify.app/"
      },
      thumbnail: "image.png",
      images: [
        "image.png"
      ]
    },
    {
      name: "Cricket Management System",
      description: "A complete cricket management system with a backend in Node.js and a frontend in React.",
      technologies: ["React", "Node js", "PostgresSQL", "JWT", "Redux"],
      links: {
        github: "https://github.com/ABDREHMAN6224/cricketBackendFinal",
        live: null
      },
      thumbnail: "download.jpeg",
      images: [
        "download.jpeg"
      ]
    },
    {
      name: "Shipfro (React Js Developer)",
      description: "A Website for shipping company based in Karachi, Pakistan. I worked as a Front-End Developer at Shipfro.com.",
      technologies: ["React", "Redux", "Cypress", "Tailwind CSS"],
      links: {
        github: null,
        live: "https://shipfro.com/"
      },
      thumbnail: "Shipfro.png",
      images: [
        "Shipfro.png"
      ]
    }
  ]
} as const;
