"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { type HeaderData } from "@/app/data";
import { Typewriter } from "@/components/ui/typewriter";
import { motion } from "framer-motion";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";

interface HeaderProps {
  data: HeaderData;
}

export function Header({ data }: HeaderProps) {
  return (
    <section id="about" className="relative w-full h-screen min-h-[700px] flex flex-col justify-end overflow-hidden pb-12 lg:pb-20 pt-32 px-6 sm:px-12 lg:px-20">

      {/* Background 3D Robot (Full Screen to prevent cropping) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <InteractiveRobotSpline
          scene="https://prod.spline.design/8xW2L9Lo2Tvnl2lK/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Foreground Text Content (Pushed to the left-lower corner with a Glassmorphism card) */}
      <div className="relative z-10 flex flex-col items-start text-left space-y-2 sm:space-y-3 w-full max-w-4xl px-5 py-5 sm:px-8 sm:py-6 pointer-events-auto bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 rounded-2xl sm:rounded-3xl shadow-2xl">
        
        <div className="space-y-1 w-full">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white drop-shadow-sm">
            <span className="block mb-0">
              Hi{" "}
              <motion.span
                className="inline-block origin-[70%_70%]"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
              >
                👋
              </motion.span>
              ,
            </span>
            <span className="block mt-1 sm:mt-0">
              I'm {data.name}<span className="text-orange-500">.</span>
            </span>
          </h1>
          <div className="text-lg sm:text-2xl font-bold text-slate-700 dark:text-slate-200 drop-shadow-sm">
            <span>I'm </span>
            <Typewriter
              text={[
                "Full Stack Engineer",
                "Software Developer",
                "Tech Enthusiast"
              ]}
              speed={120}
              className="text-orange-500"
              waitTime={1500}
              deleteSpeed={40}
              cursorChar={"_"}
            />
          </div>
          <p className="text-sm sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mt-1">
            {data.bio}
          </p>
        </div>

        {/* Social links */}
        <div className="flex space-x-4 sm:space-x-6 pt-1 sm:pt-2">
          {data.socials.github && (
            <a
              href={data.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
          )}
          {data.socials.linkedin && (
            <a
              href={data.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          )}
          {data.socials.twitter && (
            <a
              href={data.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
          )}
          {data.socials.email && (
            <a
              href={data.socials.email}
              className="text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
