"use client";

import { Github, ExternalLink } from "lucide-react";
import { type Project } from "@/app/data";

interface ProjectsProps {
  data: Project[];
}

export function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="w-full max-w-4xl py-16 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Featured Projects
        </h2>
        <div className="mx-auto h-1 w-12 rounded bg-slate-900 dark:bg-slate-100"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {data.map((proj, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-6 rounded-2xl border border-slate-200/50 dark:border-slate-900 bg-white dark:bg-black/50 shadow-sm transition-all hover:shadow-md"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                {proj.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {proj.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-900">
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <Github size={16} /> Code
                </a>
              )}
              {proj.link && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
