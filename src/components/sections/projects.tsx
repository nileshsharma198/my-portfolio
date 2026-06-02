"use client";

import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { type Project } from "@/app/data";

interface ProjectsProps {
  data: Project[];
}

export function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="w-full max-w-5xl py-20 space-y-16">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Featured Projects
        </h2>
        <div className="mx-auto h-1 w-12 rounded bg-slate-900 dark:bg-slate-100"></div>
      </div>

      <div className="relative pl-8 md:pl-0 space-y-16 md:space-y-28">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute left-4 md:left-1/2 top-4 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-slate-300 via-slate-200/50 to-transparent dark:from-slate-700 dark:via-slate-800/50 dark:to-transparent origin-top z-0"
        />

        {data.map((proj, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              <div className="absolute left-0 -translate-x-full md:left-1/2 md:-translate-x-1/2 top-6 md:top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-white dark:border-slate-950 bg-slate-50 dark:bg-slate-900 shadow-lg flex items-center justify-center group"
                >
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-900 dark:bg-slate-100 animate-pulse" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-900 bg-slate-100 dark:bg-slate-950/40 aspect-[1024/485] shadow-md hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-500 ${
                  isEven ? "md:order-1" : "md:order-2"
                }`}
              >
                {proj.image ? (
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-60 transition-opacity group-hover:opacity-75" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                className={`flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-900 bg-white/80 dark:bg-slate-950/40 backdrop-blur-md shadow-md hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-300 ${
                  isEven ? "md:order-2" : "md:order-1"
                }`}
              >
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                    {proj.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
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
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
