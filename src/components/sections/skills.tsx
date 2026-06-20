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
  const classes = "mb-1.5 h-6 w-6 transition-colors duration-300";
  
  if (s.includes("react")) return <Icons.react className={`${classes} group-hover:text-[#61DAFB]`} />;
  if (s.includes("tailwind")) return <Icons.tailwind className={`${classes} group-hover:text-[#06B6D4]`} />;
  if (s.includes("github")) return <Icons.gitHub className={`${classes} group-hover:text-black dark:group-hover:text-white`} />;
  if (s.includes("node") || s.includes("npm")) return <Icons.npm className={`${classes} group-hover:text-[#CB3837]`} />;
  
  if (s.includes("next.js")) return <Triangle className={`${classes} group-hover:text-black dark:group-hover:text-white`} />;
  if (s.includes("typescript")) return <Code2 className={`${classes} group-hover:text-[#3178C6]`} />;
  if (s.includes("javascript")) return <FileJson className={`${classes} group-hover:text-[#F7DF1E]`} />;
  if (s.includes("html/css")) return <FileCode2 className={`${classes} group-hover:text-[#E34F26]`} />;
  if (s.includes("c/c++")) return <Icons.cplusplus className={`${classes} grayscale group-hover:grayscale-0`} />;
  if (s.includes("python")) return <Icons.python className={`${classes} grayscale group-hover:grayscale-0`} />;
  
  if (s.includes("redux")) return <RefreshCcw className={`${classes} group-hover:text-[#764ABC]`} />;
  if (s.includes("framer motion")) return <Wand2 className={`${classes} group-hover:text-[#0055FF]`} />;
  if (s.includes("vite")) return <Zap className={`${classes} group-hover:text-[#646CFF]`} />;
  if (s.includes("material ui")) return <Layers className={`${classes} group-hover:text-[#007FFF]`} />;
  
  if (s.includes("express.js")) return <Server className={`${classes} group-hover:text-black dark:group-hover:text-white`} />;
  if (s.includes("prisma")) return <Database className={`${classes} group-hover:text-[#2D3748] dark:group-hover:text-white`} />;
  
  if (s.includes("postgresql")) return <Database className={`${classes} group-hover:text-[#336791]`} />;
  if (s.includes("mongodb")) return <Leaf className={`${classes} group-hover:text-[#47A248]`} />;
  
  if (s.includes("git") && !s.includes("github")) return <GitBranch className={`${classes} group-hover:text-[#F05032]`} />;
  if (s.includes("postman")) return <Send className={`${classes} group-hover:text-[#FF6C37]`} />;
  if (s.includes("clerk")) return <ShieldCheck className={`${classes} group-hover:text-[#6C47FF]`} />;
  if (s.includes("inngest")) return <Activity className={`${classes} group-hover:text-slate-900 dark:group-hover:text-white`} />;
  if (s.includes("brevo")) return <Mail className={`${classes} group-hover:text-[#0092FF]`} />;
  if (s.includes("api")) return <Network className={`${classes} group-hover:text-[#00E676]`} />;
  
  return null;
};

export function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="w-full max-w-5xl py-16 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Skills & Tech Stack
        </h2>
        <div className="mx-auto h-1 w-12 rounded bg-slate-900 dark:bg-slate-100"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {data.map((cat, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl border border-slate-200/50 dark:border-slate-900/80 bg-white dark:bg-black/50 backdrop-blur-sm shadow-sm space-y-4 transition-colors duration-300 ${
              idx === data.length - 1 ? "md:col-span-2" : ""
            }`}
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-900 pb-2">
              {cat.category}
            </h3>
            
            <div className={`grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 ${idx === data.length - 1 ? "md:grid-cols-6 lg:grid-cols-8" : "md:grid-cols-3 lg:grid-cols-4"}`}>
              {cat.items.map((skill) => (
                <span
                  key={skill}
                  className="group flex flex-col items-center justify-center w-full aspect-square rounded-xl px-1 sm:px-2 py-2 sm:py-3 text-center text-[10px] sm:text-[11px] leading-tight font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-800"
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
