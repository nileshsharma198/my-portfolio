"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [activePosition, setActivePosition] = useState({ left: 0, width: 0, opacity: 0 });
  const [ripple, setRipple] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const [nextTheme, setNextTheme] = useState<string>("dark");

  const themeTimeoutRef = useRef<number | null>(null);
  const rippleTimeoutRef = useRef<number | null>(null);

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const next = theme === "dark" ? "light" : "dark";

    if (themeTimeoutRef.current !== null) {
      window.clearTimeout(themeTimeoutRef.current);
    }

    if (rippleTimeoutRef.current !== null) {
      window.clearTimeout(rippleTimeoutRef.current);
    }

    setNextTheme(next);
    setRipple({ x, y, active: true });
    themeTimeoutRef.current = window.setTimeout(() => setTheme(next), 180);
    rippleTimeoutRef.current = window.setTimeout(() => setRipple((r) => ({ ...r, active: false })), 700);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const observers = LINKS
      .map((link) => {
        const element = document.querySelector(link.href);
        if (!element) {
          return null;
        }

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              setActiveSection(link.id);
            }
          },
          {
            rootMargin: "-35% 0px -45% 0px",
            threshold: 0.1,
          }
        );

        observer.observe(element);
        return observer;
      })
      .filter(Boolean) as IntersectionObserver[];

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (themeTimeoutRef.current !== null) {
        window.clearTimeout(themeTimeoutRef.current);
      }

      if (rippleTimeoutRef.current !== null) {
        window.clearTimeout(rippleTimeoutRef.current);
      }
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      {ripple.active && (
        <motion.div
          className="fixed inset-0 z-[-1] pointer-events-none"
          style={{
            background: nextTheme === "dark" ? "#000" : "#fff",
            clipPath: `circle(0px at ${ripple.x}px ${ripple.y}px)`,
          }}
          animate={{
            clipPath: [`circle(0px at ${ripple.x}px ${ripple.y}px)`, `circle(200vmax at ${ripple.x}px ${ripple.y}px)`],
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
      )}

      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="flex h-14 w-full max-w-4xl items-center justify-between px-2">
          <div
            className="cursor-pointer text-xl font-bold tracking-tight text-slate-950 dark:text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            nilesh<span className="text-orange-500">.</span>
          </div>

          <div className="hidden md:flex items-center">
            <ul
              className="relative flex items-center rounded-full border border-slate-300/85 bg-white/55 p-1 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:border-slate-800/80 dark:bg-black/45"
              onMouseLeave={() => setPosition(activePosition)}
            >
              {LINKS.map((link) => (
                <Tab
                  key={link.id}
                  setPosition={setPosition}
                  setActivePosition={setActivePosition}
                  isActive={activeSection === link.id}
                  onClick={() => scrollToSection(link.href)}
                >
                  {link.label}
                </Tab>
              ))}
              <Cursor position={position} />
            </ul>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {mounted && (
              <Button
                size="icon"
                variant="ghost"
                onClick={handleThemeToggle}
                className="rounded-full h-9 w-9 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </Button>
            )}
            <Button
              size="sm"
              className="rounded-full px-4 text-xs font-semibold bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
              onClick={() => scrollToSection("#contact")}
            >
              Hire Me
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
              <Button
                size="icon"
                variant="ghost"
                onClick={handleThemeToggle}
                className="rounded-full h-9 w-9 text-slate-500 hover:text-black dark:text-slate-400 dark:hover:text-white"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </Button>
            )}
            <Button
              size="icon"
              variant="outline"
              onClick={() => setOpen(!open)}
              className="rounded-full h-9 w-9 border-slate-300/85 dark:border-slate-800/80 bg-white/55 dark:bg-black/45 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <MenuToggleIcon open={open} className="size-4" duration={300} />
            </Button>
          </div>
        </nav>

        <div
          className={cn(
            "fixed top-0 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-slate-100 bg-white/95 pt-20 transition-all duration-300 dark:border-slate-900 dark:bg-black/95 md:hidden",
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div className="flex h-full w-full flex-col justify-between gap-y-2 p-6">
            <div className="grid gap-y-2 pt-4">
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  className={cn(
                    "flex items-center justify-start rounded-xl px-4 py-3 text-left text-lg font-medium transition-colors",
                    activeSection === link.id
                      ? "bg-slate-100 text-black dark:bg-slate-900 dark:text-white"
                      : "text-slate-500 hover:bg-slate-50 hover:text-black dark:text-slate-400 dark:hover:bg-slate-950 dark:hover:text-white"
                  )}
                  onClick={() => scrollToSection(link.href)}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-3 pb-8">
              <Button
                className="w-full rounded-full py-6 font-bold bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
                onClick={() => scrollToSection("#contact")}
              >
                Hire Me
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

const Tab = ({
  children,
  setPosition,
  setActivePosition,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
  setActivePosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; opacity: number }>>;
  isActive: boolean;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      const pos = { width, opacity: 1, left: ref.current.offsetLeft };
      setActivePosition(pos);
      setPosition(pos);
    }
  }, [isActive, setActivePosition, setPosition]);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      onClick={onClick}
      className={cn(
        "relative z-10 block cursor-pointer px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 text-slate-700 dark:text-slate-300 md:text-xs",
        isActive ? "text-slate-950 dark:text-white" : "opacity-60 hover:opacity-100"
      )}
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-8 rounded-full bg-white/80 border border-slate-300/80 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_1px_8px_rgba(0,0,0,0.06)] dark:bg-white/15 dark:border-white/25 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_8px_rgba(0,0,0,0.2)] md:h-8"
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    />
  );
};
