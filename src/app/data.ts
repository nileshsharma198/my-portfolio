export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
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
      company: "Company Name",
      role: "Software Engineer",
      duration: "2024 - Present",
      description: "Developed and maintained highly scalable web applications using Next.js and Tailwind CSS. Collaborated closely with designers and product managers to deliver polished user interfaces.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      company: "Previous Company",
      role: "Frontend Developer Intern",
      duration: "2023 - 2024",
      description: "Optimized website performance and constructed reusable UI components. Conducted unit testing and cross-browser responsiveness audits.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
    },
  ],
  SKILLS: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    },
    {
      category: "Backend & Databases",
      items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
    },
    {
      category: "DevOps & Tools",
      items: ["Git", "GitHub", "Docker", "Vercel", "Linux"],
    },
  ],
  PROJECTS: [
    {
      title: "Portfolio Website",
      description: "A modern developer portfolio built using Next.js, Tailwind CSS, and Framer Motion.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/nileshsharma198/my-portfolio",
    },
    {
      title: "Task Management App",
      description: "A collaborative project management tool featuring drag-and-drop boards and real-time updates.",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      link: "https://example.com",
      github: "https://github.com",
    },
  ],
};
