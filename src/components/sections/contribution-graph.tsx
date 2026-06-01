"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useGithubContributions,
  type HeatmapDay,
} from "@/hooks/use-github-contributions";

const CELL = 13;
const YEARS = [2026, 2025, 2024];

const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "#161B22",
  1: "#0E4429",
  2: "#006D32",
  3: "#26A641",
  4: "#39D353",
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const heatmapVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatCount(count: number): string {
  if (count === 0) return "No contributions";
  return `${count} contribution${count !== 1 ? "s" : ""}`;
}

function HeatmapSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="ml-8 mb-2 flex h-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-3 w-7 rounded bg-slate-700/50" />
        ))}
      </div>
      <div className="flex gap-[3px]">
        <div style={{ width: 28 }} />
        {Array.from({ length: 53 }).map((_, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, di) => (
              <div
                key={di}
                style={{
                  width: CELL,
                  height: CELL,
                  borderRadius: 2,
                  backgroundColor: "#161B22",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContributionGraph() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipDateRef = useRef<HTMLParagraphElement>(null);
  const tooltipCountRef = useRef<HTMLParagraphElement>(null);
  const { data, loading, error, retry } = useGithubContributions(selectedYear);

  const hideTooltip = useCallback(() => {
    if (!tooltipRef.current) {
      return;
    }

    tooltipRef.current.style.opacity = "0";
  }, []);

  const showTooltip = useCallback((x: number, y: number, day: HeatmapDay) => {
    if (!tooltipRef.current || !tooltipDateRef.current || !tooltipCountRef.current) {
      return;
    }

    tooltipDateRef.current.textContent = formatDate(day.dateObj);
    tooltipCountRef.current.textContent = formatCount(day.count);
    tooltipRef.current.style.left = `${x}px`;
    tooltipRef.current.style.top = `${Math.max(y - 62, 8)}px`;
    tooltipRef.current.style.opacity = "1";
  }, []);

  const handleCellEnter = useCallback((target: HTMLDivElement, day: HeatmapDay) => {
    const rect = heatmapContainerRef.current?.getBoundingClientRect();
    const cellRect = target.getBoundingClientRect();

    if (!rect) {
      return;
    }

    showTooltip(
      cellRect.left - rect.left + CELL / 2,
      cellRect.top - rect.top,
      day
    );
  }, [showTooltip]);

  const handleYearSelect = useCallback((year: number) => {
    setSelectedYear(year);
    hideTooltip();
  }, [hideTooltip]);

  return (
    <motion.section
      id="contributions"
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="mb-10 space-y-2 text-center">
        <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Contribution Graph
        </h2>
        <div className="mx-auto h-1 w-12 rounded bg-slate-900 dark:bg-slate-100" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/60 to-white/30 p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-slate-700/50 dark:from-[#0d1117] dark:to-[#0d1117] dark:ring-1 dark:ring-white/5 dark:shadow-[0_8px_64px_-16px_rgba(0,0,0,0.8)] md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              GitHub Activity
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={`total-${selectedYear}-${loading}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                {loading
                  ? "Fetching contributions..."
                  : `${(data?.stats.total ?? 0).toLocaleString()} contributions in ${selectedYear}`}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-end">
            <a
              href="https://github.com/nileshsharma198"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 self-end text-xs text-slate-400 transition-colors duration-200 hover:text-emerald-400"
              aria-label="GitHub profile"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z" />
              </svg>
              <span className="group-hover:underline">@nileshsharma198</span>
            </a>

            <div className="mt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  const currentIndex = YEARS.indexOf(selectedYear);
                  if (currentIndex < YEARS.length - 1) {
                    handleYearSelect(YEARS[currentIndex + 1]);
                  }
                }}
                disabled={loading || selectedYear === YEARS[YEARS.length - 1]}
                className="rounded border border-slate-700/50 bg-slate-800/60 p-1 text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Previous Year"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="min-w-[32px] text-center text-xs font-bold text-slate-300">{selectedYear}</span>
              <button
                onClick={() => {
                  const currentIndex = YEARS.indexOf(selectedYear);
                  if (currentIndex > 0) {
                    handleYearSelect(YEARS[currentIndex - 1]);
                  }
                }}
                disabled={loading || selectedYear === YEARS[0]}
                className="rounded border border-slate-700/50 bg-slate-800/60 p-1 text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Next Year"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          <div className="relative min-w-0 flex-1" ref={heatmapContainerRef}>
            <div
              ref={tooltipRef}
              className="pointer-events-none absolute z-50 -translate-x-1/2 rounded-lg border border-slate-700/60 bg-slate-900 px-3 py-2 text-xs opacity-0 transition-opacity duration-100 dark:bg-slate-800"
            >
              <p ref={tooltipDateRef} className="leading-snug text-white font-bold" />
              <p ref={tooltipCountRef} className="mt-0.5 text-slate-300" />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-full -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid #334155",
                }}
              />
            </div>

            <div className="max-w-full overflow-x-auto overflow-y-visible pb-2">
              {loading && <HeatmapSkeleton />}

              {!loading && error && (
                <div className="flex min-w-[300px] flex-col items-center justify-center gap-4 py-16 text-slate-500">
                  <svg
                    className="h-10 w-10 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="mb-1 text-sm font-semibold text-slate-300">Failed to load contributions</p>
                    <p className="text-xs text-slate-500">{error}</p>
                  </div>
                  <button
                    onClick={retry}
                    className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/20"
                  >
                    Retry
                  </button>
                </div>
              )}

              {!loading && !error && data && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedYear}
                    variants={heatmapVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full"
                  >
                    <div className="relative mb-1 h-[18px]" aria-hidden="true">
                      {data.monthLabels.map(({ name, weekIndex }) => (
                        <span
                          key={`${name}-${weekIndex}`}
                          className="absolute -translate-x-1/2 text-[11px] font-medium text-slate-400 dark:text-slate-500"
                          style={{ left: `${(weekIndex / Math.max(data.weeks.length - 1, 1)) * 100}%` }}
                        >
                          {name}
                        </span>
                      ))}
                    </div>

                    <div
                      role="grid"
                      aria-label={`GitHub contribution heatmap for ${selectedYear}`}
                      className="flex w-full justify-between"
                    >
                      {data.weeks.map((week, wi) => (
                        <div key={wi} role="row" className="flex flex-col gap-[3px]">
                          {week.days.map((day, di) => {
                            if (!day) {
                              return <div key={di} aria-hidden="true" style={{ width: CELL, height: CELL }} />;
                            }

                            return (
                              <div
                                key={di}
                                role="gridcell"
                                tabIndex={0}
                                aria-label={`${formatCount(day.count)} on ${formatDate(day.dateObj)}`}
                                title={`${formatCount(day.count)} on ${formatDate(day.dateObj)}`}
                                onMouseEnter={(e) => handleCellEnter(e.currentTarget, day)}
                                onMouseLeave={hideTooltip}
                                onFocus={(e) => handleCellEnter(e.currentTarget, day)}
                                onBlur={hideTooltip}
                                className="cursor-default outline-none transition-transform duration-100 hover:scale-125 focus-visible:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400/80 focus-visible:outline-offset-1"
                                style={{
                                  width: CELL,
                                  height: CELL,
                                  borderRadius: 2,
                                  backgroundColor: LEVEL_COLORS[day.level],
                                  border: day.level === 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                                }}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[11px] text-slate-400 dark:text-slate-500">
                        {data.stats.total.toLocaleString()} contributions in {selectedYear}
                      </p>

                      <div className="flex items-center gap-1.5" aria-label="Contribution level legend">
                        <span className="mr-0.5 text-[10px] text-slate-400 dark:text-slate-500">Less</span>
                        {([0, 1, 2, 3, 4] as const).map((lvl) => (
                          <div
                            key={lvl}
                            aria-label={`Level ${lvl}`}
                            style={{
                              width: CELL,
                              height: CELL,
                              borderRadius: 2,
                              backgroundColor: LEVEL_COLORS[lvl],
                              border: lvl === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                            }}
                          />
                        ))}
                        <span className="ml-0.5 text-[10px] text-slate-400 dark:text-slate-500">More</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
