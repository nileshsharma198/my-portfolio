"use client";

import { type ExperienceItem } from "@/app/data";

interface ExperienceProps {
  data: ExperienceItem[];
}

export function Experience({ data }: ExperienceProps) {
  return (
    <section id="experience" className="w-full max-w-4xl py-16 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Work Experience
        </h2>
        <div className="mx-auto h-1 w-12 rounded bg-slate-900 dark:bg-slate-100"></div>
      </div>

      <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-6 space-y-10">
        {data.map((job, idx) => (
          <div key={idx} className="relative pl-8 md:pl-10">
            {/* Circle node on timeline */}
            <span className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-black border-2 border-slate-950 dark:border-slate-100"></span>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
              <div>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                  {job.role}
                </h3>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {job.company}
                </p>
              </div>
              <span className="text-xs font-medium text-slate-400 dark:text-slate-500 md:text-right">
                {job.duration}
              </span>
            </div>

            <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              {job.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40"
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
