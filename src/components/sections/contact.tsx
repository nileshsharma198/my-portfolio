"use client";

import { Mail, MessageSquare } from "lucide-react";
import { type HeaderData } from "@/app/data";

interface ContactProps {
  data: HeaderData;
}

export function Contact({ data }: ContactProps) {
  return (
    <section id="contact" className="w-full max-w-4xl py-16 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Get In Touch
        </h2>
        <div className="mx-auto h-1 w-12 rounded bg-slate-900 dark:bg-slate-100"></div>
      </div>

      <div className="max-w-xl mx-auto p-8 rounded-3xl border border-slate-200/50 dark:border-slate-900 bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-sm text-center space-y-6 transition-colors duration-300">
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          I'm currently open to new opportunities, freelance work, or just connecting. Shoot me an email or click below to reach out!
        </p>

        {data.socials.email && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href={data.socials.email}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 transition-colors shadow-md"
            >
              <Mail size={16} /> Send Email
            </a>
            
            <a
              href={data.socials.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-black px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors shadow-sm"
            >
              <MessageSquare size={16} /> Say Hello on LinkedIn
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
