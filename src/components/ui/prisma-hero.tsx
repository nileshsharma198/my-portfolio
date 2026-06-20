"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useRef } from "react";
import { Typewriter } from "@/components/ui/typewriter";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */

interface PrismaHeroProps {
  title?: string;
  description?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const PrismaHero = ({ title = "Prisma", description = "I am a passionate software engineer focused on building clean, responsive, and user-centric web applications. I love working with TypeScript, React, and serverless technologies.", socials }: PrismaHeroProps) => {
  return (
    <section id="about" className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden">

        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />



        {/* Hero content */}
        <div className="absolute bottom-10 md:bottom-16 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">

            <div className="col-span-12 lg:col-span-8 ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl md:text-4xl text-white/90 font-medium mb-1 md:mb-3"
              >
                Hi{" "}
                <motion.span
                  className="inline-block origin-[70%_70%]"
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                >
                  👋
                </motion.span>
                , I'm
              </motion.div>
              <h1
                className="font-bold leading-[0.9] tracking-tight text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[9vw] xl:text-[8vw] 2xl:text-[7vw] -ml-[0.05em]"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text={title} showAsterisk />
              </h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-xl md:text-2xl font-bold text-white/80 drop-shadow-sm pt-1 md:pt-2 flex flex-wrap items-center gap-4"
              >
                <span>a</span>
                <Typewriter
                  text={[
                    "Full Stack Developer",
                    "Software Developer",
                    "Tech Enthusiast"
                  ]}
                  speed={120}
                  className="text-orange-400"
                  waitTime={1500}
                  deleteSpeed={40}
                  cursorChar={"_"}
                />
              </motion.div>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-1 lg:col-span-4 lg:pb-3">

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs text-white/70 sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 sm:gap-6 flex-wrap"
              >
                <button
                  className="group inline-flex items-center gap-2 rounded-full bg-white py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                >
                  Contact me
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                  </span>
                </button>

                {socials && (
                  <div className="flex items-center gap-4 sm:gap-5">
                    {socials.github && (
                      <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-transform hover:scale-110">
                        <Github size={22} />
                      </a>
                    )}
                    {socials.linkedin && (
                      <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-transform hover:scale-110">
                        <Linkedin size={22} />
                      </a>
                    )}
                    {socials.twitter && (
                      <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-transform hover:scale-110">
                        <Twitter size={22} />
                      </a>
                    )}
                    {socials.email && (
                      <a href={socials.email} className="text-white/70 hover:text-white transition-transform hover:scale-110">
                        <Mail size={22} />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
