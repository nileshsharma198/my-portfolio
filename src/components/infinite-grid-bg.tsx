"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";

export const InfiniteGridBg = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const shouldReduceMotion = useReducedMotion();
  const [interactiveMask, setInteractiveMask] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updateMask = () => setInteractiveMask(mediaQuery.matches);

    updateMask();
    mediaQuery.addEventListener("change", updateMask);

    return () => mediaQuery.removeEventListener("change", updateMask);
  }, [shouldReduceMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveMask) {
      return;
    }

    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  const maskImage = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-full min-h-screen bg-white text-slate-950 transition-colors duration-300 dark:bg-black dark:text-white",
        className
      )}
    >
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.3] dark:opacity-[0.15]">
        <GridPattern className="text-slate-200 dark:text-slate-900" />
      </div>

      {interactiveMask && (
        <motion.div
          className="fixed inset-0 z-0 pointer-events-none opacity-100"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <GridPattern className="text-slate-900/30 dark:text-slate-100/20" />
        </motion.div>
      )}

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute right-[-20%] top-[-20%] h-[50%] w-[50%] rounded-full bg-slate-200/20 blur-[120px] dark:bg-slate-900/20" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[50%] w-[50%] rounded-full bg-slate-300/10 blur-[120px] dark:bg-slate-900/10" />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

const GridPattern = ({ className }: { className?: string }) => {
  return (
    <svg className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className={className}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};
