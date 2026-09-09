// src/data/projects.ts

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: "Full-Stack Web" | "AI & Machine Learning" | "Real-Time Systems" | "Software Engineering";
  authorId: "satish" | "bhovan" | "naveen";
  authorName: string;
  description: string;
  highlights: string[];
  tech: string[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "logicveda",
    title: "LogicVeda",
    subtitle: "Real-Time Document Collaboration Platform",
    category: "Real-Time Systems",
    authorId: "naveen",
    authorName: "Kota Naveen",
    description:
      "Enterprise-grade, multi-user document collaboration platform comparable to Google Docs and Notion, architected as a clean pnpm monorepo with low-latency CRDT synchronization.",
    highlights: [
      "Engineered real-time concurrent editing with Yjs CRDT and Socket.io",
      "Full CI/CD automated pipeline with Docker-based production deployment",
      "Playwright end-to-end testing and k6 load testing for guaranteed scalability",
    ],
    tech: ["React 18", "Yjs CRDT", "TipTap", "Socket.io", "MongoDB", "Redis", "Docker"],
    featured: true,
  },
  {
    id: "mailforge-pro",
    title: "MailForge Pro",
    subtitle: "Smart Bulk Email Automation SaaS",
    category: "Full-Stack Web",
    authorId: "naveen",
    authorName: "Kota Naveen",
    description:
      "AI-powered bulk email automation platform integrating OpenAI GPT-4o for intelligent personalized content generation with Celery and Redis for asynchronous task queuing.",
    highlights: [
      "Integrated OpenAI GPT-4o API for automated copywriting and content optimization",
      "Asynchronous high-throughput queue processing with Celery and Redis workers",
      "Comprehensive tracking and recipient management backed by MySQL",
    ],
    tech: ["Flask", "React 18", "Celery", "Redis", "MySQL", "OpenAI GPT-4o"],
    featured: true,
  },
  {
    id: "ai-medical-bot",
    title: "AI Medical Assistant Telegram Bot",
    subtitle: "Intelligent Healthcare Query System",
    category: "AI & Machine Learning",
    authorId: "satish",
    authorName: "Satish Reddy",
    description:
      "AI-driven Telegram bot engineered to assist users with real-time medical-related queries using Google Gemini AI for natural-language reasoning and Python backend logic.",
    highlights: [
      "Integrated Google Gemini AI for conversational healthcare comprehension",
      "Engineered Telegram Bot API webhook lifecycle with Python backend logic",
      "Structured prompt engineering for clear, empathetic, and reliable answers",
    ],
    tech: ["Python", "Google Gemini AI", "Telegram Bot API", "Streamlit"],
    featured: true,
  },
  {
    id: "rapidaid",
    title: "RapidAid",
    subtitle: "Emergency Coordination & Dispatch Platform",
    category: "Real-Time Systems",
    authorId: "bhovan",
    authorName: "Bhovan Chandra",
    description:
      "Real-time emergency dispatch and response platform featuring WebSocket-based state synchronization for low-latency live location and status coordination.",
    highlights: [
      "Low-latency real-time state synchronization via custom WebSocket architecture",
      "Next.js App Router frontend for rapid situational response",
      "Resilient incident queuing and dispatch assignment tracking",
    ],
    tech: ["TypeScript", "Next.js", "WebSocket", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "quantum-visualizer",
    title: "Quantum State Visualizer (QSV)",
    subtitle: "Interactive Multi-Qubit Circuit Simulation",
    category: "Software Engineering",
    authorId: "bhovan",
    authorName: "Bhovan Chandra",
    description:
      "Interactive computational visualization tool for multi-qubit quantum circuits using 3D Bloch spheres, density heatmaps, and state entanglement graphs.",
    highlights: [
      "Visual Bloch sphere representations of arbitrary quantum state vectors",
      "Multi-qubit density matrix heatmap calculations",
      "Pure TypeScript algorithmic implementation without heavy dependencies",
    ],
    tech: ["TypeScript", "Quantum Algorithms", "Canvas / SVG Visualization"],
    featured: true,
  },
  {
    id: "skilltrix",
    title: "SkillTrix",
    subtitle: "Premium EdTech LMS Platform with 3D UI",
    category: "Full-Stack Web",
    authorId: "naveen",
    authorName: "Kota Naveen",
    description:
      "Modern full-featured learning management system boasting interactive 3D UI elements powered by Three.js, secure Supabase backend, and Razorpay payment checkout.",
    highlights: [
      "Interactive 3D landing elements and learning models with Three.js",
      "Secure authentication and cloud relational storage with Supabase",
      "End-to-end payment gateway processing with Razorpay integration",
    ],
    tech: ["Vite", "JavaScript", "Supabase", "Three.js", "Razorpay"],
    featured: false,
  },
  {
    id: "blood-donation-forecast",
    title: "Blood Donation Forecast",
    subtitle: "Machine Learning Outcome Predictor",
    category: "AI & Machine Learning",
    authorId: "satish",
    authorName: "Satish Reddy",
    description:
      "Supervised machine learning model trained to forecast blood donation-related outcomes based on historical donor behavior across 748 records and 5 clinical features.",
    highlights: [
      "Trained and evaluated classification models on donor recency, frequency, and time",
      "Optimized model hyperparameters for enhanced recall and predictive precision",
      "Skillfied Mentor certified machine learning research project",
    ],
    tech: ["Python", "Machine Learning", "Scikit-Learn", "Data Analytics"],
    featured: false,
  },
  {
    id: "employee-management",
    title: "Employee Management System",
    subtitle: "Enterprise CRUD Desktop Application",
    category: "Software Engineering",
    authorId: "bhovan",
    authorName: "Bhovan Chandra",
    description:
      "Robust Java desktop application implementing complete CRUD operations for corporate employee records, designed with clean object-oriented architecture and SQL database persistence.",
    highlights: [
      "Full CRUD transaction support with ACID-compliant SQL operations",
      "Object-oriented design patterns with robust exception handling",
      "Clean administrative GUI for departmental record management",
    ],
    tech: ["Java", "SQL", "OOP", "JDBC"],
    featured: false,
  },
  {
    id: "resume-ai-pro",
    title: "ResumeAI Pro",
    subtitle: "NLP-Powered Resume Analyzer",
    category: "AI & Machine Learning",
    authorId: "naveen",
    authorName: "Kota Naveen",
    description:
      "Full-stack resume evaluation tool utilizing Natural Language Processing (NLTK and spaCy) to parse, score, and visualize candidate resume strength and keyword matching.",
    highlights: [
      "Natural language extraction and semantic matching using NLTK and spaCy",
      "Interactive visual score breakdown and skill gap analytics via Chart.js",
      "Lightweight Flask backend with SQLite storage",
    ],
    tech: ["Flask", "SQLite", "NLTK", "spaCy", "Chart.js"],
    featured: false,
  },
  {
    id: "smart-water-system",
    title: "Smart Water Management System",
    subtitle: "Autonomous IoT & Telemetry Control",
    category: "Software Engineering",
    authorId: "bhovan",
    authorName: "Bhovan Chandra",
    description:
      "Telemetry-driven automated irrigation and water distribution control system with threshold-based autonomous pump operation and sensory monitoring.",
    highlights: [
      "Automated sensor threshold telemetry triggering pump actuation",
      "Real-time resource conservation and overflow protection logic",
      "Python-driven algorithmic event handler and status reporting",
    ],
    tech: ["Python", "Automated Control", "Telemetry", "IoT Systems"],
    featured: false,
  },
  {
    id: "network-intrusion-detection",
    title: "Network Intrusion Detection System",
    subtitle: "Traffic Packet Analysis & Defense",
    category: "Software Engineering",
    authorId: "satish",
    authorName: "Satish Reddy",
    description:
      "Python-engineered security monitoring system for real-time traffic analysis, inspecting packet flows and flagging anomalous activities using predefined network rules.",
    highlights: [
      "Real-time packet inspection and signature-based anomaly detection",
      "Configurable security thresholds for malicious traffic filtering",
      "Detailed event logging and threat alerting capabilities",
    ],
    tech: ["Python", "Cybersecurity", "Network Protocols", "Traffic Analysis"],
    featured: false,
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    subtitle: "Personal Expense Tracking & Analytics",
    category: "Software Engineering",
    authorId: "bhovan",
    authorName: "Bhovan Chandra",
    description:
      "Application for recording, categorizing, and auditing personal financial transactions with categorized budgeting, history tracking, and summary ledger generation.",
    highlights: [
      "Structured transaction categorization and budgeting bounds",
      "Automated summary metrics and expense trend aggregation",
      "Relational SQL persistence with robust data validation",
    ],
    tech: ["Java", "SQL", "Database Design"],
    featured: false,
  },
  {
    id: "business-websites",
    title: "Client Business Websites",
    subtitle: "Responsive Commercial Portals & Platforms",
    category: "Full-Stack Web",
    authorId: "naveen",
    authorName: "Kota Naveen",
    description:
      "Suite of deployed responsive websites for businesses including Sky Tuition Point, Seelam Groups, E-Commerce demo, and Car Travels with custom client-side validation and authentication.",
    highlights: [
      "High-performance responsive UI optimized across desktop and mobile",
      "Secure client-side validation and interactive booking flows",
      "Custom brand aesthetics and smooth interactive micro-animations",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    featured: false,
  },
];
