"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame
} from "framer-motion";

export const InfiniteGridBg = ({
  children,
  className
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.3;
  const speedY = 0.3;

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        // NO overflow-x-hidden here — that creates a second scroll container
        // and breaks sticky positioning. Global overflow-x is handled in globals.css
        "relative w-full min-h-screen bg-white dark:bg-black text-slate-950 dark:text-white transition-colors duration-300",
        className
      )}
    >
      {/* Background Grid Pattern — fixed so it covers the whole viewport without adding scroll height */}
      <div className="fixed inset-0 z-0 opacity-[0.3] dark:opacity-[0.15] pointer-events-none">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} className="text-slate-200 dark:text-slate-900" />
      </div>

      {/* Masked Active Grid Layer (Revealed on hover) */}
      <motion.div
        className="fixed inset-0 z-0 opacity-100 pointer-events-none"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} className="text-slate-900/30 dark:text-slate-100/20" />
      </motion.div>

      {/* Ambient background monochrome highlights — fixed so they don't scroll */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-20%] w-[50%] h-[50%] rounded-full bg-slate-200/20 dark:bg-slate-900/20 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[50%] h-[50%] rounded-full bg-slate-300/10 dark:bg-slate-900/10 blur-[120px]" />
      </div>

      {/* Children content on top */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

const GridPattern = ({
  offsetX,
  offsetY,
  className
}: {
  offsetX: any;
  offsetY: any;
  className?: string;
}) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className={className}
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
};
