import { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import { useCandidateStore } from "../../../store/candidateStore";

// Dedicated brand colors for known hiring sources
const SOURCE_COLOR_MAP: Record<string, string> = {
  LinkedIn: "#3B82F6", // Blue
  Indeed: "#06B6D4", // Cyan
  Referral: "#8B5CF6", // Purple
  "Employee Referral": "#A855F7", // Light Purple
  "Company Website": "#408A71", // Primary Teal
  "Career site": "#408A71", // Primary Teal
  "Job Board": "#F59E0B", // Amber
  Glassdoor: "#10B981", // Emerald
  Twitter: "#38BDF8", // Sky Blue
  University: "#F97316", // Orange
  Other: "#EC4899", // Pink
};

const FALLBACK_COLORS = [
  "#408A71",
  "#3B82F6",
  "#8B5CF6",
  "#F59E0B",
  "#06B6D4",
  "#EC4899",
  "#10B981",
  "#F97316",
];

const HiringSources = () => {
  const candidates = useCandidateStore((state) => state.candidates);

  const totalCandidates = candidates.length;

  const sourceData = useMemo(() => {
    const counts: Record<string, number> = {};

    candidates.forEach((candidate) => {
      const source = candidate.source?.trim() || "Other";
      counts[source] = (counts[source] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([source, count], index) => ({
        source,
        candidates: count,
        percentage:
          totalCandidates > 0
            ? ((count / totalCandidates) * 100).toFixed(1)
            : "0",
        color:
          SOURCE_COLOR_MAP[source] ||
          FALLBACK_COLORS[index % FALLBACK_COLORS.length],
      }))
      .sort((a, b) => b.candidates - a.candidates);
  }, [candidates, totalCandidates]);

  return (
    <section
      className="
        flex flex-col justify-between
        rounded-3xl
        border
        border-zinc-200
        bg-white
        p-6
        shadow-sm
        dark:border-zinc-800
        dark:bg-zinc-900
      "
    >
      {/* Header */}
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          Hiring Sources
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          See where your candidates are coming from.
        </p>
      </div>

      {totalCandidates === 0 ? (
        <div className="flex h-[320px] items-center justify-center rounded-2xl bg-zinc-50 text-sm text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
          No candidate data available yet.
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center">
          {/* Donut Chart with Center Total Display */}
          <div className="relative h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  dataKey="candidates"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  cornerRadius={6}
                  stroke="none"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>

                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: "#18181B",
                    border: "1px solid #3F3F46",
                    borderRadius: "14px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  }}
                  labelStyle={{
                    color: "#A1A1AA",
                    fontSize: "11px",
                    marginBottom: "4px",
                  }}
                  itemStyle={{
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                  formatter={(value: any, _name: any, item: any) => [
                    `${value} candidates (${item?.payload?.percentage ?? 0}%)`,
                    item?.payload?.source ?? "Source",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Total Count Overlay */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                {totalCandidates}
              </span>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Candidates
              </span>
            </div>
          </div>

          {/* Custom Legend Grid */}
          <div className="mt-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
            {sourceData.map((item) => (
              <div
                key={item.source}
                className="flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs dark:bg-zinc-800/60"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex min-w-0 flex-1 items-center justify-between gap-1">
                  <span className="truncate font-medium text-zinc-700 dark:text-zinc-300">
                    {item.source}
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.candidates}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HiringSources;