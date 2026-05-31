"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Public Types ─────────────────────────────────────────────────────────────

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  dateObj: Date;
}

export interface HeatmapWeek {
  days: (HeatmapDay | null)[];
}

export interface MonthLabel {
  name: string;
  weekIndex: number;
}

export interface ContributionStats {
  total: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
}

export interface ProcessedData {
  weeks: HeatmapWeek[];
  monthLabels: MonthLabel[];
  stats: ContributionStats;
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 7) return 2;
  if (count <= 12) return 3;
  return 4;
}

function toISO(d: Date): string {
  // Always use local-date representation to match API format (YYYY-MM-DD)
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function processContributions(
  apiData: { date: string; count: number }[],
  year: number
): ProcessedData {
  // Build a fast lookup: "YYYY-MM-DD" → count
  const lookup = new Map<string, number>();
  for (const d of apiData) lookup.set(d.date, d.count);

  // Always use full year bounds — future dates will simply have count=0
  // giving the "upcoming months as empty graph" appearance
  const yearStart = new Date(year, 0, 1);   // Jan 1 00:00
  const yearEnd   = new Date(year, 11, 31); // Dec 31 — always full year

  // Rewind to the Sunday on or before Jan 1
  const cur = new Date(yearStart);
  cur.setDate(cur.getDate() - cur.getDay());

  const weeks: HeatmapWeek[] = [];
  const allDays: HeatmapDay[] = [];

  // Build week by week until we've fully covered yearEnd
  while (true) {
    if (cur > yearEnd) break;          // this whole week starts after the year → stop

    const week: HeatmapWeek = { days: [] };

    for (let d = 0; d < 7; d++) {
      const inRange = cur >= yearStart && cur <= yearEnd;

      if (inRange) {
        const iso = toISO(cur);
        const count = lookup.get(iso) ?? 0;
        const day: HeatmapDay = {
          date: iso,
          count,
          level: getLevel(count),
          dateObj: new Date(cur),
        };
        week.days.push(day);
        allDays.push(day);
      } else {
        // Padding cell (before Jan 1 or after today / Dec 31)
        week.days.push(null);
      }

      cur.setDate(cur.getDate() + 1);
    }

    weeks.push(week);
  }

  // ── Month labels: first occurrence of each calendar month ──────────────────
  const monthLabels: MonthLabel[] = [];
  let lastMonth = -1;

  weeks.forEach((week, wi) => {
    const firstReal = week.days.find((d): d is HeatmapDay => d !== null);
    if (!firstReal) return;
    const m = firstReal.dateObj.getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ name: MONTH_NAMES[m], weekIndex: wi });
      lastMonth = m;
    }
  });

  // ── Stats ──────────────────────────────────────────────────────────────────
  const total = allDays.reduce((s, d) => s + d.count, 0);
  const activeDays = allDays.filter((d) => d.count > 0).length;

  // Longest streak
  let longestStreak = 0;
  let streak = 0;
  for (const d of allDays) {
    if (d.count > 0) {
      streak++;
      if (streak > longestStreak) longestStreak = streak;
    } else {
      streak = 0;
    }
  }

  // Current streak: look backward from last day in the dataset
  let currentStreak = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    if (allDays[i].count > 0) currentStreak++;
    else break;
  }

  return {
    weeks,
    monthLabels,
    stats: { total, activeDays, currentStreak, longestStreak },
  };
}

// ─── Module-level cache (survives re-renders, cleared on page refresh) ─────────

const dataCache = new Map<number, ProcessedData>();

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGithubContributions(year: number) {
  const [data, setData] = useState<ProcessedData | null>(
    dataCache.get(year) ?? null
  );
  const [loading, setLoading] = useState(!dataCache.has(year));
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    // Cache hit → instant return
    if (dataCache.has(year)) {
      setData(dataCache.get(year)!);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/github-contributions?year=${year}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      if (json.error) throw new Error(String(json.error));

      // Normalise either bare array or { contributions: [...] } shapes
      let raw: { date: string; count: number }[];
      if (Array.isArray(json)) {
        raw = json;
      } else if (Array.isArray(json.contributions)) {
        raw = json.contributions;
      } else {
        raw = [];
      }

      const processed = processContributions(raw, year);
      dataCache.set(year, processed);
      setData(processed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, retry: fetchData };
}
