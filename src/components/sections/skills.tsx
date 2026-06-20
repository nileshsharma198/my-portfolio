"use client";

import { type SkillCategory } from "@/app/data";
import { Icons } from "@/components/ui/icons";

import { 
  Braces, FileJson, RefreshCcw, Wand2, FileCode2, Server, Database, 
  Leaf, GitBranch, Send, ShieldCheck, Zap, Mail, Network, Triangle, Code2,
  Terminal, Layers, Activity, Code
} from "lucide-react";

interface SkillsProps {
  data: SkillCategory[];
}

const getSkillIcon = (skill: string) => {
  const s = skill.toLowerCase();
  const classes = "mr-1.5 h-3.5 w-3.5";
  
  if (s.includes("react")) return <Icons.react className={classes} />;
  if (s.includes("tailwind")) return <Icons.tailwind className={classes} />;
  if (s.includes("github")) return <Icons.gitHub className={classes} />;
  if (s.includes("node") || s.includes("npm")) return <Icons.npm className={classes} />;
  
  if (s.includes("next.js")) return <Triangle className={classes} />;
  if (s.includes("typescript")) return <Code2 className={classes} />;
  if (s.includes("javascript")) return <FileJson className={classes} />;
  if (s.includes("html/css")) return <FileCode2 className={classes} />;
  if (s.includes("c/c++")) return <Terminal className={classes} />;
  if (s.includes("python")) return <Code className={classes} />;
  
  if (s.includes("redux")) return <RefreshCcw className={classes} />;
  if (s.includes("framer motion")) return <Wand2 className={classes} />;
  if (s.includes("vite")) return <Zap className={classes} />;
  if (s.includes("material ui")) return <Layers className={classes} />;
  
  if (s.includes("express.js")) return <Server className={classes} />;
  if (s.includes("prisma")) return <Database className={classes} />;
  
  if (s.includes("postgresql")) return <Database className={classes} />;
  if (s.includes("mongodb")) return <Leaf className={classes} />;
  
  if (s.includes("git") && !s.includes("github")) return <GitBranch className={classes} />;
  if (s.includes("postman")) return <Send className={classes} />;
  if (s.includes("clerk")) return <ShieldCheck className={classes} />;
  if (s.includes("inngest")) return <Activity className={classes} />;
  if (s.includes("brevo")) return <Mail className={classes} />;
  if (s.includes("api")) return <Network className={classes} />;
  
  return null;
};

export function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="w-full max-w-4xl py-16 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Skills & Tech Stack
        </h2>
        <div className="mx-auto h-1 w-12 rounded bg-slate-900 dark:bg-slate-100"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {data.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border border-slate-200/50 dark:border-slate-900/80 bg-white dark:bg-black/50 backdrop-blur-sm shadow-sm space-y-4 transition-colors duration-300"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-900 pb-2">
              {cat.category}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center rounded px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 transition-all hover:scale-105"
                >
                  {getSkillIcon(skill)}
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
