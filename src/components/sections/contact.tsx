"use client";

import { Mail, Github, Linkedin } from "lucide-react";

export function Contact({ data }: { data: Record<string, string> }) {
  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="w-full py-12">
      <h2 className="font-bold text-gray-900 text-2xl mb-8 dark:text-gray-100">
        Get In Touch
      </h2>
      
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          I&apos;m always interested in hearing about new opportunities and exciting projects. 
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => openLink(`mailto:${data.EMAIL}`)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <Mail size={20} />
            Send Email
          </button>
          
          <button
            onClick={() => openLink(data.GITHUB)}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <Github size={20} />
            GitHub
          </button>
          
          <button
            onClick={() => openLink(data.LINKEDIN)}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors dark:border-gray-600 dark:hover:bg-gray-800"
          >
            <Linkedin size={20} />
            LinkedIn
          </button>
        </div>
      </div>
    </section>
  );
}
