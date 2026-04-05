export interface IProjectData {
    NAME: string;
    LIVE_PREVIEW?: string;
    GITHUB?: string;
    DESCRIPTION: string[];
    NOTE?: string;
    TECH_STACK: string[];
    IMAGE?: string;
}

export interface IBlogData {
    DATE: string;
    TIME: string;
    LINK: string;
    DESCRIPTION: string;
    IMAGE?: string;
}

export interface IExperienceData {
    COMPANY: string;
    ROLE: string;
    DURATION: string;
    DESCRIPTION: string[];
    SKILLS?: string[];
}

export const DATA = {
    HEADER: {
        NAME: "Your Name",
        AGE: "25",
        PRONOUN: "he/him",
        HEADLINE: "Full-Stack Developer passionate about building amazing web experiences",
        RESUME: "https://drive.google.com/file/d/your-resume-link/view",
        EMAIL: "your.email@example.com",
        GITHUB: "https://github.com/yourusername",
        LINKEDIN: "https://linkedin.com/in/yourprofile",
        INTRO: "Hey! I'm a full-stack developer who loves building efficient, scalable, and intuitive applications. I thrive on solving complex problems, optimizing performance, and creating seamless user experiences.",
        EXPERTISE: "My expertise lies in React, Next.js, TypeScript, and Node.js, and I enjoy working across the stack to bring ideas to life."
    },
    EXPERIENCE: [
        {
            COMPANY: "Tech Company",
            ROLE: "Senior Frontend Developer",
            DURATION: "2022 - Present",
            DESCRIPTION: [
                "Led development of enterprise-scale React applications",
                "Implemented responsive design patterns improving mobile experience by 40%",
                "Mentored junior developers and conducted code reviews"
            ],
            SKILLS: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
        },
        {
            COMPANY: "StartupXYZ",
            ROLE: "Full-Stack Developer",
            DURATION: "2020 - 2022",
            DESCRIPTION: [
                "Built RESTful APIs and real-time features with Node.js",
                "Developed and maintained multiple client projects",
                "Collaborated with design team to implement UI/UX improvements"
            ],
            SKILLS: ["Node.js", "Express", "MongoDB", "React"]
        }
    ] as IExperienceData[],
    SKILLS: {
        "Frontend": [
            "React", "Next.js", "TypeScript", "Tailwind CSS", 
            "HTML5", "CSS3", "JavaScript (ES6+)"
        ],
        "Backend": [
            "Node.js", "Express", "MongoDB", "PostgreSQL", 
            "REST APIs", "GraphQL"
        ],
        "Tools & Others": [
            "Git", "Docker", "AWS", "Vercel", 
            "Figma", "VS Code"
        ]
    },
    PROJECTS: [
        {
            NAME: "E-Commerce Platform",
            DESCRIPTION: [
                "Full-stack e-commerce solution with real-time inventory management",
                "Implemented secure payment processing with Stripe",
                "Built admin dashboard for product and order management"
            ],
            TECH_STACK: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS"],
            GITHUB: "https://github.com/yourusername/ecommerce",
            LIVE_PREVIEW: "https://ecommerce-demo.vercel.app"
        },
        {
            NAME: "Task Management App",
            DESCRIPTION: [
                "Collaborative task management tool with real-time updates",
                "Features drag-and-drop interface and team collaboration",
                "Includes notifications, deadlines, and progress tracking"
            ],
            TECH_STACK: ["React", "Node.js", "Socket.io", "PostgreSQL"],
            GITHUB: "https://github.com/yourusername/taskmanager",
            LIVE_PREVIEW: "https://taskmanager-demo.vercel.app"
        }
    ] as IProjectData[],
    BLOGS: [
        {
            DATE: "2024-03-15",
            TIME: "5 min read",
            LINK: "https://yourblog.com/nextjs-best-practices",
            DESCRIPTION: "10 Next.js Best Practices for Production Applications",
            IMAGE: "/blog-nextjs.jpg"
        },
        {
            DATE: "2024-02-28",
            TIME: "8 min read",
            LINK: "https://yourblog.com/typescript-tips",
            DESCRIPTION: "Advanced TypeScript Tips for React Developers",
            IMAGE: "/blog-typescript.jpg"
        }
    ] as IBlogData[]
};
