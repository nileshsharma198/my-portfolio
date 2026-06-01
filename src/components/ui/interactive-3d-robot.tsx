"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";

const Spline = typeof window !== "undefined"
  ? lazy(() => import("@splinetool/react-spline"))
  : null;

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    let cancelled = false;
    let timeoutId: any = null;
    let idleId: any = null;

    const startLoading = () => {
      const load = () => {
        if (!cancelled) {
          setShouldRender(true);
        }
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        idleId = (window as any).requestIdleCallback(load, { timeout: 1500 });
      } else {
        timeoutId = setTimeout(load, 250);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        startLoading();
        observer.disconnect();
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();

      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }

      if (idleId !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Suspense fallback={<RobotFallback className={className} />}>
        <div className="relative h-full w-full overflow-hidden pointer-events-auto">
          <div className="absolute bottom-[-80px] left-0 right-[-80px] top-0">
            {shouldRender && Spline ? (
              <Spline scene={scene} className={className} />
            ) : (
              <RobotFallback className={className} />
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
}

function RobotFallback({ className }: { className?: string }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-transparent text-slate-500 ${className ?? ""}`}
      aria-label="Loading 3D scene"
    >
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/30 bg-white/20 px-4 py-3 backdrop-blur-md dark:border-slate-800/60 dark:bg-black/20">
        <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
        </svg>
        <span className="text-xs font-medium uppercase tracking-[0.2em]">Loading scene</span>
      </div>
    </div>
  );
}
