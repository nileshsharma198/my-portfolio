export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface HeaderData {
  name: string;
  role: string;
  description: string;
  bio: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface PortfolioData {
  HEADER: HeaderData;
  EXPERIENCE: ExperienceItem[];
  SKILLS: SkillCategory[];
  PROJECTS: Project[];
}

export const DATA: PortfolioData = {
  HEADER: {
    name: "Nilesh Sharma",
    role: "Full-Stack Developer",
    description: "Building modern web experiences with React, Next.js, and Node.js.",
    bio: "I am a passionate software engineer focused on building clean, responsive, and user-centric web applications. I love working with TypeScript, React, and serverless technologies.",
    socials: {
      github: "https://github.com/nileshsharma198",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mailto:nilesh@example.com",
    },
  },
  EXPERIENCE: [
    {
      company: "Airwix Technologies",
      role: "Full Stack Engineer",
      duration: "Jan 2026 – Present",
      description: "Developing scalable HRMS and ERP SaaS applications using React, TypeScript, Node.js, Express.js, and PostgreSQL, mainly working on HRMS modules such as employee management, attendance, payroll, and company configuration while building modular and reusable components across the product, integrating REST APIs, and implementing authentication and role-based access control.",
      skills: ["React", "Node.js", "Express", "REST API", "PostgreSQL", "Tailwind CSS", "Ant Design", "Sequelize"],
    },
    {
      company: "Indian Space Research Organisation",
      role: "Research Trainee",
      duration: "Jan 2024 – Apr 2024",
      description: "Built an interactive meteorological visualization platform for gridded wind vector datasets by converting NetCDF data into JSON using Python and rendering multi-level time-series wind patterns through an interactive Leaflet-based map interface.",
      skills: ["Python", "JavaScript", "Leaflet", "NetCDF", "HTML", "CSS"],
    },
  ],
  SKILLS: [
    {
      category: "Languages",
      items: ["JavaScript (ES6+)", "C/C++", "Python"],
    },
    {
      category: "Frontend",
      items: ["React.js", "Redux Toolkit", "Vite", "Tailwind CSS", "Material UI", "Framer Motion"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "Prisma ORM"],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB"],
    },
    {
      category: "Tools & Services",
      items: ["Git", "GitHub", "Postman", "Clerk Authentication", "Inngest", "Brevo SMTP", "REST APIs"],
    },
  ],
  PROJECTS: [
    {
      title: "ProjectSync",
      description: "Full-stack project management platform for teams to manage workspaces, projects, tasks, and collaboration with secure authentication and automated workflows.",
      tags: ["React.js", "javaScript", "Node.js", "Express.js", "PostgreSQL", "Prisma", "Neon", "Redux Toolkit", "Clerk", "Inngest", "Brevo"],
      link: "https://projectsync-eight.vercel.app/",
      github: "https://github.com/nileshsharma198/ProjectSync",
      image: "/projectsync.png",
    },
    {
      title: "CoinForge",
      description: "Real-time cryptocurrency analytics platform featuring live market data, coin comparisons, and crypto news in a modern, responsive dashboard.",
      tags: ["React.js", "javaScript", "Redux Toolkit", " REST APIs", " Framer Motion", "Tailwind CSS"],
      link: "https://coinforge-ochre.vercel.app/",
      github: "https://github.com/nileshsharma198/CoinForge",
      image: "/coinforge.png",
    }
  ],
};
