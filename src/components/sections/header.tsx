"use client";

import { Github, Linkedin, Mail, Download } from "lucide-react";

export function Header({ data }: { data: Record<string, string> }) {
  const handleChange = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section id="about" className="w-full py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="font-normal text-gray-600 text-base dark:text-gray-400">
            hi there👋, I&apos;m
          </p>

          <div>
            <h1 className="font-bold text-gray-900 text-4xl tracking-tight dark:text-gray-100">
              {data.NAME}
            </h1>
            <h2 className="flex flex-col gap-0 font-normal text-gray-700 text-base dark:text-gray-300">
              <p>
                {data.AGE}, {data.PRONOUN}
              </p>
              <p>{data.HEADLINE}</p>
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            {data.INTRO}
          </p>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            {data.EXPERTISE}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleChange(data.RESUME)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <Download size={16} />
            Resume
          </button>
          
          <button
            onClick={() => handleChange(data.GITHUB)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <Github size={16} />
            GitHub
          </button>
          
          <button
            onClick={() => handleChange(data.LINKEDIN)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <Linkedin size={16} />
            LinkedIn
          </button>
          
          <button
            onClick={() => handleChange(`mailto:${data.EMAIL}`)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <Mail size={16} />
            Email
          </button>
        </div>
      </div>
    </section>
  );
}
