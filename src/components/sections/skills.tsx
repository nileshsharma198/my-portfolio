"use client";

import { type SkillCategory } from "@/app/data";

interface SkillsProps {
  data: SkillCategory[];
}

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
                  className="rounded px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 transition-all hover:scale-105"
                >
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
