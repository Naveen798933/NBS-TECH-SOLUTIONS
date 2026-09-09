// src/data/services.ts

export type Service = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  iconName: "Globe" | "Cpu" | "Sparkles" | "Layers" | "Workflow" | "Briefcase";
  gradient: string;
};

export const services: Service[] = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    tagline: "Modern responsive websites & high-performance web applications",
    description:
      "We design and build ultra-responsive, accessible, and aesthetically refined web applications using React, Next.js, and modern TypeScript. Engineered for lightning performance and seamless cross-device fidelity.",
    capabilities: [
      "Modern Next.js & React Architectures",
      "Tailwind CSS & Framer Motion Interactivity",
      "Accessible Semantic Markup & SEO Optimization",
      "High-Conversion Commercial & Landing Portals",
    ],
    iconName: "Globe",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
  },
  {
    id: "software-development",
    number: "02",
    title: "Software Development",
    tagline: "Scalable software solutions for real-world engineering requirements",
    description:
      "From object-oriented desktop architectures to scalable backend microservices, we build reliable software systems in Java, Python, and TypeScript built upon robust design patterns and persistent SQL databases.",
    capabilities: [
      "Object-Oriented System Architecture (Java & Python)",
      "ACID-Compliant Relational Database Design",
      "Modular Desktop & Enterprise Tools",
      "Robust Error Handling & Telemetry Logging",
    ],
    iconName: "Cpu",
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
  },
  {
    id: "ai-machine-learning",
    number: "03",
    title: "AI & Machine Learning",
    tagline: "AI-powered applications, automation & intelligent predictive systems",
    description:
      "Integrating cutting-edge Generative AI models (Google Gemini, OpenAI GPT-4o) and traditional supervised machine learning algorithms to build conversational agents, predictive forecast engines, and NLP pipelines.",
    capabilities: [
      "Large Language Model Integration (Gemini AI & GPT-4o)",
      "Retrieval-Augmented Generation (RAG) Architecture",
      "Supervised Machine Learning & Predictive Modeling",
      "NLP Resume & Text Parsing (NLTK & spaCy)",
    ],
    iconName: "Sparkles",
    gradient: "from-purple-500/20 via-blue-500/10 to-transparent",
  },
  {
    id: "fullstack-development",
    number: "04",
    title: "Full-Stack Development",
    tagline: "End-to-end frontend, backend & resilient database development",
    description:
      "Delivering cohesive full-stack solutions uniting React frontends with Node.js, Express, and Flask backends, backed by MongoDB, PostgreSQL, MySQL, and Redis caching layers.",
    capabilities: [
      "RESTful API & GraphQL Services",
      "NoSQL (MongoDB) & Relational (MySQL/PostgreSQL) Storage",
      "Real-Time WebSockets & Yjs CRDT Collaboration",
      "Redis Caching & Asynchronous Task Queuing",
    ],
    iconName: "Layers",
    gradient: "from-sky-500/20 via-indigo-500/10 to-transparent",
  },
  {
    id: "automation",
    number: "05",
    title: "Automation",
    tagline: "Workflow automation, async tasks & productivity engineering",
    description:
      "Eliminate repetitive manual bottlenecks with automated pipelines using n8n workflow orchestrators, Celery asynchronous workers, and custom webhook triggers for maximum team velocity.",
    capabilities: [
      "n8n Workflow Automation & Webhook Pipes",
      "Celery & Redis Asynchronous Job Scheduling",
      "Automated Bulk Messaging & Notification Systems",
      "Continuous Integration & Dockerized Workflows",
    ],
    iconName: "Workflow",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
  {
    id: "business-solutions",
    number: "06",
    title: "Business Solutions",
    tagline: "Professional digital solutions for organizations & scaling startups",
    description:
      "Crafting tailored digital platforms, administrative portals, LMS platforms, and client-facing interfaces designed to elevate brand authority and streamline commercial operations.",
    capabilities: [
      "EdTech LMS Platforms with Integrated Payments",
      "Corporate Client Portals & Showcase Websites",
      "Client-Side Authentication & Validation",
      "Clean Analytics & Operational Dashboards",
    ],
    iconName: "Briefcase",
    gradient: "from-emerald-500/20 via-blue-500/10 to-transparent",
  },
];
