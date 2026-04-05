"use client";

import { ExternalLink, Github } from "lucide-react";
import type { IProjectData } from "@/app/data";

export function Projects({ data }: { data: IProjectData[] }) {
  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section id="projects" className="w-full py-12">
      <h2 className="font-bold text-gray-900 text-2xl mb-8 dark:text-gray-100">
        Projects
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {data.map((project, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow dark:border-gray-700"
          >
            <h3 className="font-semibold text-gray-900 text-lg mb-3 dark:text-gray-100">
              {project.NAME}
            </h3>
            
            <ul className="space-y-2 mb-4 text-gray-600 dark:text-gray-400">
              {project.DESCRIPTION.map((desc, descIndex) => (
                <li key={descIndex} className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.TECH_STACK.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium dark:bg-gray-800 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex gap-3">
              {project.GITHUB && (
                <button
                  onClick={() => openLink(project.GITHUB!)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  <Github size={16} />
                  Code
                </button>
              )}
              
              {project.LIVE_PREVIEW && (
                <button
                  onClick={() => openLink(project.LIVE_PREVIEW!)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
