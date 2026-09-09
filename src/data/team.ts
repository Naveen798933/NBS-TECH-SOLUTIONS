// src/data/team.ts

export type TeamMember = {
  id: "satish" | "bhovan" | "naveen";
  heroPosition: "left" | "middle" | "right";
  name: string;
  role: string;
  headline: string;
  summary: string;
  avatar: string;
  contact?: {
    location?: string;
    phone?: string;
    email?: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
  allSkills: string[];
  projects: {
    name: string;
    subtitle?: string;
    description: string;
    tech: string[];
    url?: string;
  }[];
  experience: {
    title: string;
    org: string;
    period?: string;
    description?: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period?: string;
    score?: string;
  }[];
  certifications: string[];
  strengths?: string[];
  links: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
  };
  resumeFile: string;
  resumeFileName: string;
  resumeViewUrl: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "satish",
    heroPosition: "left",
    name: "Satish Reddy",
    role: "AI Analyst — Python Developer",
    headline: "AI-Powered Systems, Automation & Intelligent Backend Workflows",
    summary:
      "Computer Science Engineering student with hands-on experience in Python, Streamlit, Google Gemini AI, Prompt Engineering and n8n workflow automation. Passionate about developing AI-powered applications and solving real-world problems. Enjoys continuous learning and architecting complex AI-driven solutions.",
    avatar: "/images/satish.jpg",
    contact: {
      phone: "+91 8008925730",
      email: "sathishkumar30017@gmail.com",
    },
    skills: [
      {
        category: "Programming",
        items: ["Python", "SQL"],
      },
      {
        category: "AI & Generative AI",
        items: ["Google Gemini AI", "Prompt Engineering", "Generative AI"],
      },
      {
        category: "Automation & Workflows",
        items: ["n8n", "Gemini API"],
      },
      {
        category: "Frameworks",
        items: ["Streamlit"],
      },
      {
        category: "Core Competencies",
        items: ["Computer Networks", "Cybersecurity"],
      },
      {
        category: "Tools",
        items: ["Git", "Microsoft Office", "AI Tools"],
      },
    ],
    allSkills: [
      "Python",
      "SQL",
      "Google Gemini AI",
      "Prompt Engineering",
      "Generative AI",
      "n8n",
      "Gemini API",
      "Streamlit",
      "Computer Networks",
      "Cybersecurity",
      "Git",
    ],
    projects: [
      {
        name: "AI Medical Assistant Telegram Bot",
        subtitle: "Telegram Bot API & Python Backend Logic",
        description:
          "Developed an AI-powered Telegram bot designed to assist users with medical-related queries. Integrated Google Gemini AI for natural-language responses and engineered Python-based backend logic.",
        tech: ["Python", "Google Gemini AI", "Telegram Bot API", "Streamlit"],
      },
      {
        name: "Blood Donation Forecast",
        subtitle: "Machine Learning Project (Skillfied Mentor)",
        description:
          "Developed a machine-learning predictive model to forecast blood donation-related outcomes using a dataset of 748 records and 5 features.",
        tech: ["Python", "Machine Learning", "Data Analytics"],
      },
      {
        name: "Network Intrusion Detection System",
        subtitle: "Cybersecurity & Traffic Monitoring",
        description:
          "Developed a Python-based intrusion detection system for real-time monitoring of network traffic, detecting suspicious activities with predefined security rules.",
        tech: ["Python", "Cybersecurity", "Network Monitoring"],
      },
    ],
    experience: [
      {
        title: "Machine Learning Intern",
        org: "HR Shark",
        period: "Internship",
        description: [
          "Developed an AI assistant using Python, Streamlit, Google Gemini AI and n8n.",
          "Automated student query handling using Prompt Engineering.",
          "Designed an interactive interface for Smart Campus support.",
        ],
      },
      {
        title: "Security Engineering Researcher",
        org: "Intrusion Detection System Project",
        period: "Technical Project",
        description: [
          "Engineered a Python-based intrusion detection system for analyzing network packets.",
          "Applied security rules to flag malicious behavior and prevent network vulnerabilities.",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Technology (Computer Science and Engineering)",
        institution: "MVR College of Engineering and Technology",
        period: "Expected Graduation: 2027",
        score: "CGPA: 8.7",
      },
    ],
    certifications: [
      "AI & Automation Workshop",
      "AI AGENTS WORK WORKSHOP",
      "Academic Participation Certificates",
      "ML INTERNSHIP COMPLETION",
      "HACKATHON PARTICIPATE",
    ],
    strengths: [
      "Problem Solving",
      "Communication",
      "Teamwork",
      "Leadership",
      "Adaptability",
    ],
    links: {
      linkedin: "https://www.linkedin.com/in/bayana-sathish-reddy",
    },
    resumeFile: "/resumes/satish_resume.pdf",
    resumeFileName: "satish_resume.pdf",
    resumeViewUrl: "/resumes/satish_resume.pdf",
  },
  {
    id: "bhovan",
    heroPosition: "middle",
    name: "Kokkiligadda Bhovan Chandra",
    role: "Trainee Software Engineer | Full-Stack Developer | AI & Machine Learning",
    headline: "Full-Stack Web Architectures, RESTful APIs, and Generative AI / RAG Systems",
    summary:
      "CSE (AI & ML) student with hands-on experience in Java, Python, JavaScript, TypeScript, React, Next.js, Node.js, SQL, Machine Learning, and Data Analytics. Skilled in building full-stack web applications, RESTful APIs, and practical AI/ML solutions. Seeking to apply technical rigor and contribute to scalable software solutions.",
    avatar: "/images/bhovan.jpg",
    contact: {
      location: "Vijayawada, Andhra Pradesh, India",
      phone: "+91 9502422997",
      email: "bhovanchandrakokkiligadda@gmail.com",
    },
    skills: [
      {
        category: "Programming Languages",
        items: ["Java", "Python", "JavaScript", "TypeScript", "C"],
      },
      {
        category: "Web Technologies",
        items: [
          "React",
          "Next.js",
          "Node.js",
          "Express.js",
          "Tailwind CSS",
          "HTML5",
          "CSS3",
          "WebSocket",
        ],
      },
      {
        category: "Databases",
        items: ["SQL"],
      },
      {
        category: "AI & Machine Learning",
        items: [
          "Machine Learning",
          "Generative AI",
          "Retrieval-Augmented Generation (RAG)",
          "Data Mining",
          "Data Analytics",
        ],
      },
      {
        category: "Tools & Platforms",
        items: ["Git", "GitHub", "Google Colab", "MS Excel", "Vercel"],
      },
    ],
    allSkills: [
      "Java",
      "Python",
      "JavaScript",
      "TypeScript",
      "C",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "SQL",
      "Machine Learning",
      "Generative AI",
      "RAG",
      "Data Mining",
      "Git",
      "GitHub",
      "Vercel",
      "WebSocket",
    ],
    projects: [
      {
        name: "Employee Management System",
        subtitle: "Enterprise Java Application",
        description:
          "Java-based desktop application with full CRUD operations for employee records, built using object-oriented programming principles.",
        tech: ["Java", "SQL", "OOP"],
      },
      {
        name: "Expense Tracker",
        subtitle: "Personal Expense Tracking & Categorization",
        description:
          "Application for recording and managing personal expenses with categorization, transaction tracking, and summary reporting.",
        tech: ["Java", "SQL"],
      },
      {
        name: "Quantum State Visualizer (QSV)",
        subtitle: "Interactive Multi-Qubit Circuit Simulation",
        description:
          "Interactive visualization tool for multi-qubit quantum circuits using Bloch spheres, density heatmaps, and entanglement graphs.",
        tech: ["TypeScript", "Quantum Computing", "Visualization"],
      },
      {
        name: "RapidAid — Emergency Coordination Platform",
        subtitle: "Real-Time Emergency Dispatch",
        description:
          "Real-time emergency dispatch platform with WebSocket-based state synchronization for low-latency data updates.",
        tech: ["TypeScript", "Next.js", "WebSocket"],
      },
      {
        name: "Smart Water Management System",
        subtitle: "Telemetry-Driven Irrigation Control",
        description:
          "Telemetry-driven irrigation control system with threshold-based autonomous pump operation.",
        tech: ["Python", "Automated Control", "Telemetry"],
      },
    ],
    experience: [
      {
        title: "Full Stack Development Intern",
        org: "InternCourse",
        period: "Apr 2026 – Jun 2026",
        description: [
          "Completed an 8-week hands-on Full Stack Development training program.",
          "Built practical applications and strengthened programming, debugging, and problem-solving skills.",
        ],
      },
      {
        title: "Machine Learning Intern",
        org: "Slash Mark IT Solutions (OPC) Pvt. Ltd.",
        period: "May 2026 – Jul 2026 (Virtual)",
        description: [
          "Applied machine learning concepts to real-world tasks through structured, guided project work.",
          "Strengthened technical and analytical skills in ML algorithms and data pipelines.",
        ],
      },
    ],
    education: [
      {
        degree: "B.Tech – Computer Science and Engineering (AI & ML)",
        institution: "S.R.K. Institute of Technology, Vijayawada",
        period: "2023 – Present",
        score: "CGPA: 7.43 / 10",
      },
      {
        degree: "Intermediate (MPC)",
        institution: "Sri Srinivasa Gravity College, Vijayawada",
        period: "2023",
        score: "Percentage: 83.8%",
      },
      {
        degree: "SSC",
        institution: "VMC High School",
        period: "2021",
        score: "Percentage: 94%",
      },
    ],
    certifications: [
      "AI Skills Passport (EY & Microsoft)",
      "Artificial Intelligence Professional Certificate (IBM)",
      "AI-Powered Document Retrieval / RAG (IBM)",
      "Python Programming Foundations (Cisco)",
      "Introduction to Modern AI (Cisco)",
      "AI in Manufacturing (NASSCOM IT-ITeS SSC)",
      "Yuva AI for All (NIELIT)",
      "Generative AI Mastermind (Outskill)",
      "Data Science and Entrepreneurship Development (APSSDC)",
    ],
    strengths: [
      "Problem Solving",
      "Quick Learning",
      "Team Collaboration",
      "Adaptability",
      "Analytical Thinking",
      "Technical Documentation",
    ],
    links: {
      github: "https://github.com/bhovanchandarkokkiligadda",
      linkedin: "https://linkedin.com/in/bhovanchandarkokkiligadda",
    },
    resumeFile: "/resumes/Kokkiligadda_Bhovan_Chandra_Final_Resume_Eidiko_A4.pdf",
    resumeFileName: "Kokkiligadda_Bhovan_Chandra_Final_Resume_Eidiko_A4.pdf",
    resumeViewUrl: "/resumes/Kokkiligadda_Bhovan_Chandra_Final_Resume_Eidiko_A4.pdf",
  },
  {
    id: "naveen",
    heroPosition: "right",
    name: "Kota Naveen",
    role: "Full-Stack Web Developer",
    headline: "Architecting Production-Grade Systems, Real-Time Platforms & AI-Integrated Web Applications",
    summary:
      "Full-stack web developer and final-year B.Tech Computer Science student with hands-on experience architecting production-grade, AI-integrated applications, including a real-time collaborative document platform, a SaaS email-automation tool, and an EdTech LMS. Proficient in React, Node.js, Flask, and modern database and infrastructure tooling, with a consistent record of independently designing, building, and deploying complete software systems.",
    avatar: "/images/naveen.jpg",
    contact: {
      location: "Vijayawada, Andhra Pradesh, India",
      phone: "+91 79893 35763",
      email: "nbstechsolutions3@gmail.com",
    },
    skills: [
      {
        category: "Languages",
        items: ["JavaScript", "Java", "Python", "SQL", "HTML5", "CSS3"],
      },
      {
        category: "Frameworks & Libraries",
        items: [
          "React 18",
          "Node.js",
          "Express.js",
          "Flask",
          "TipTap",
          "Three.js",
          "Zustand",
        ],
      },
      {
        category: "Databases & Infrastructure",
        items: [
          "MongoDB",
          "MySQL",
          "SQLite",
          "Redis",
          "Socket.io",
          "Yjs (CRDT)",
          "Docker",
          "CI/CD",
          "Playwright",
          "k6",
        ],
      },
      {
        category: "Tools & Platforms",
        items: [
          "Git",
          "GitHub",
          "AWS",
          "Supabase",
          "OpenAI GPT-4o API",
          "NLTK",
          "spaCy",
          "Angular",
        ],
      },
    ],
    allSkills: [
      "JavaScript",
      "Java",
      "Python",
      "SQL",
      "React",
      "Node.js",
      "Express",
      "Flask",
      "MongoDB",
      "MySQL",
      "SQLite",
      "Redis",
      "Socket.io",
      "Docker",
      "CI/CD",
      "AWS",
      "Supabase",
      "OpenAI GPT-4o API",
      "Three.js",
      "Yjs",
    ],
    projects: [
      {
        name: "LogicVeda",
        subtitle: "Real-Time Document Collaboration Platform",
        description:
          "Architected an enterprise-grade, multi-user document collaboration platform comparable to Google Docs/Notion, structured as a pnpm monorepo. Implemented full CI/CD pipeline, Docker-based deployment, Playwright end-to-end testing, and k6 load testing to ensure production readiness.",
        tech: [
          "React 18",
          "Yjs CRDT",
          "TipTap",
          "Socket.io",
          "MongoDB",
          "Redis",
          "Docker",
        ],
      },
      {
        name: "MailForge Pro",
        subtitle: "Smart Bulk Email Automation SaaS",
        description:
          "Designed and developed an AI-powered bulk email automation platform, integrating GPT-4o for content generation and Celery/Redis for asynchronous task processing.",
        tech: [
          "Flask",
          "React 18",
          "Celery",
          "Redis",
          "MySQL",
          "OpenAI GPT-4o",
        ],
      },
      {
        name: "SkillTrix",
        subtitle: "Premium EdTech LMS Platform",
        description:
          "Built a full-featured learning management system with 3D interactive UI elements and integrated Razorpay payment processing.",
        tech: ["Vite", "JavaScript", "Supabase", "Three.js", "Razorpay"],
      },
      {
        name: "ResumeAI Pro",
        subtitle: "AI-Powered Resume Analyzer",
        description:
          "Developed a full-stack resume analysis tool that uses NLP techniques to parse, score, and visualize resume content for job seekers.",
        tech: ["Flask", "SQLite", "NLTK", "spaCy", "Chart.js"],
      },
      {
        name: "Business Websites",
        subtitle: "Client Portals & Commercial Solutions",
        description:
          "Designed and deployed responsive websites for businesses (Sky Tuition Point, Seelam Groups, E-Commerce demo, Car Travels) featuring form validation and client-side authentication.",
        tech: ["HTML5", "CSS3", "JavaScript"],
      },
    ],
    experience: [
      {
        title: "Web Developer Intern",
        org: "Cognifyz Technologies, Nagpur, Maharashtra",
        period: "Sep 2025 – Oct 2025",
        description: [
          "Built and tested responsive website components as part of a structured web development internship program.",
        ],
      },
      {
        title: "Web Developer Intern",
        org: "BIST Technologies, Vijayawada, Andhra Pradesh",
        period: "Jun 2025 – Jul 2025",
        description: [
          "Completed a 120-hour intensive web development program, applying core front-end development skills to live projects.",
        ],
      },
      {
        title: "Web Developer Intern",
        org: "APP TECH INFO Pvt. Ltd.",
        period: "Internship",
        description: [
          "Contributed to web development tasks and strengthened full-stack development fundamentals.",
        ],
      },
      {
        title: "Web Developer Intern",
        org: "Sysslan IT Solutions",
        period: "Internship",
        description: [
          "Assisted in building and maintaining web applications as part of a development team.",
        ],
      },
    ],
    education: [
      {
        degree: "B.Tech, Computer Science & Engineering",
        institution:
          "MVR College of Engineering and Technology, Paritala, Andhra Pradesh",
        period: "2023 – 2027 (Expected)",
      },
      {
        degree: "Intermediate (MPC)",
        institution:
          "Sri Srinivasa Gravity Junior College, Vijayawada, Andhra Pradesh",
        period: "2021 – 2023",
      },
    ],
    certifications: [
      "AWS Certified Developer – Associate (Infosys)",
      "Angular Certification (Infosys Springboard)",
      "Introduction to Generative AI Studio (Simplilearn/Google Cloud)",
      "GenAI for Professionals (Udemy)",
      "Introduction to Data Science (Infosys Springboard)",
      "Cyber Security Workshop (Academy of Tech Masters)",
      "AI Tools Workshop (BE10X)",
      "Short-Term Web Developer Program, 120 Hrs (BIST Technologies)",
    ],
    strengths: [
      "Full-Stack Architecture",
      "Real-Time Collaboration",
      "AI System Integration",
      "DevOps & Containerization",
      "Performance Engineering",
    ],
    links: {
      github: "https://github.com/KotaNaveen",
      linkedin: "https://linkedin.com/in/kota-naveen",
    },
    resumeFile: "/resumes/Kota_Naveen_Resume.pdf",
    resumeFileName: "Kota_Naveen_Resume.pdf",
    resumeViewUrl: "/resumes/Kota_Naveen_Resume.pdf",
  },
];
