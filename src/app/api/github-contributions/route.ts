import { NextRequest, NextResponse } from "next/server";

const GITHUB_USERNAME = "nileshsharma198";
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface Week {
  contributionDays: ContributionDay[];
}

function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 7) return 2;
  if (count <= 12) return 3;
  return 4;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get("year");
  const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

  // Validate year
  const currentYear = new Date().getFullYear();
  const safeYear = Math.min(Math.max(year, currentYear - 10), currentYear);

  try {
    const token = process.env.GITHUB_TOKEN;

    // ── No token: use the public github-contributions-api ──────────────────
    if (!token) {
      const url = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${safeYear}`;

      const response = await fetch(url, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Public API returned ${response.status}`);
      }

      const data = await response.json();

      // Public API returns { total: {year: n}, contributions: [{date, count, level}] }
      // Transform to our simple format: [{date, count}]
      const contributions: { date: string; count: number }[] =
        Array.isArray(data.contributions)
          ? data.contributions.map((c: { date: string; count: number }) => ({
              date: c.date,
              count: c.count,
            }))
          : [];

      return NextResponse.json({
        contributions,
        total: {
          [safeYear]: contributions.reduce((s, c) => s + c.count, 0),
        },
      });
    }

    // ── With GitHub token: use GraphQL API ──────────────────────────────────
    const from = `${safeYear}-01-01T00:00:00Z`;
    const to =
      safeYear === currentYear
        ? new Date().toISOString()
        : `${safeYear}-12-31T23:59:59Z`;

    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME, from, to } }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) throw new Error("GitHub GraphQL API request failed");

    const json = await response.json();
    const calendar =
      json.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) throw new Error("No contribution data found");

    const contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];

    calendar.weeks.forEach((week: Week) => {
      week.contributionDays.forEach((day: ContributionDay) => {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
          level: getContributionLevel(day.contributionCount),
        });
      });
    });

    return NextResponse.json({
      contributions,
      total: { [safeYear]: calendar.totalContributions },
    });
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
