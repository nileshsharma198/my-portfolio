"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { type HeaderData } from "@/app/data";

interface HeaderProps {
  data: HeaderData;
}

export function Header({ data }: HeaderProps) {
  return (
    <section id="about" className="w-full max-w-4xl py-20 flex flex-col items-center text-center space-y-8">
      {/* Decorative avatar wrapper */}
      <div className="relative group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-slate-300 via-slate-500 to-slate-700 dark:from-slate-800 dark:via-slate-600 dark:to-slate-400 opacity-60 blur transition duration-1000 group-hover:duration-200 group-hover:opacity-100 animate-tilt"></div>
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white text-slate-900 border border-slate-200 text-3xl font-extrabold dark:bg-black dark:text-white dark:border-slate-800">
          {data.name.split(" ").map(n => n[0]).join("")}
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white">
          Hi, I'm {data.name}
        </h1>
        <p className="text-xl sm:text-2xl font-bold text-slate-600 dark:text-slate-300">
          {data.role}
        </p>
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed pt-2">
          {data.bio}
        </p>
      </div>

      {/* Social links */}
      <div className="flex space-x-6 pt-4">
        {data.socials.github && (
          <a
            href={data.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 dark:text-slate-600 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
        )}
        {data.socials.linkedin && (
          <a
            href={data.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 dark:text-slate-600 dark:hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
        )}
        {data.socials.twitter && (
          <a
            href={data.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-900 dark:text-slate-600 dark:hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={22} />
          </a>
        )}
        {data.socials.email && (
          <a
            href={data.socials.email}
            className="text-slate-400 hover:text-slate-900 dark:text-slate-600 dark:hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={22} />
          </a>
        )}
      </div>
    </section>
  );
}
