import { useMemo } from "react";
import {
 ResponsiveContainer,
 PieChart,
 Pie,
 Cell,
 Tooltip,
 Legend,
} from "recharts";

import { useCandidateStore } from "../../../store/candidateStore";

const SOURCE_COLORS = [
 "#408A71", // Career site
 "#3B82F6", // LinkedIn
 "#8B5CF6", // Referral
 "#F59E0B", // Job board
 "#06B6D4", // Indeed
 "#EC4899", // Other
];

const HiringSources = () => {
 const candidates = useCandidateStore(
 (state) => state.candidates
 );

 const sourceData = useMemo(() => {
 const counts: Record<string, number> = {};

 candidates.forEach((candidate) => {
 const source = candidate.source?.trim() || "Other";

 counts[source] = (counts[source] || 0) + 1;
 });

 return Object.entries(counts).map(
 ([source, candidates], index) => ({
 source,
 candidates,
 color: SOURCE_COLORS[index % SOURCE_COLORS.length],
 })
 );
 }, [candidates]);

 const totalCandidates = candidates.length;

 return (
 <section
 className="
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
 <div className="mb-6">
 <h2
 className="
 text-lg
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 Hiring Sources
 </h2>

 <p
 className="
 mt-1
 text-sm
 text-zinc-500
 dark:text-zinc-400
 "
 >
 See where your candidates are coming from.
 </p>
 </div>

 {totalCandidates === 0 ? (
 <div
 className="
 flex
 h-[320px]
 items-center
 justify-center
 rounded-2xl
 bg-zinc-50
 text-sm
 text-zinc-500
 dark:bg-zinc-800/50
 dark:text-zinc-400
 "
 >
 No candidate data available yet.
 </div>
 ) : (
 <div className="h-[320px] w-full">
 <ResponsiveContainer
 width="100%"
 height="100%"
 >
 <PieChart>
 <Pie
 data={sourceData}
 dataKey="candidates"
 nameKey="source"
 cx="50%"
 cy="45%"
 innerRadius={75}
 outerRadius={108}
 paddingAngle={4}
 cornerRadius={6}
 stroke="none"
 data-testid="hiring-sources-chart"
 >
 {sourceData.map((entry) => (
 <Cell
 key={entry.source}
 fill={entry.color}
 />
 ))}
 </Pie>

 {/* Tooltip */}
 <Tooltip
 cursor={false}
 contentStyle={{
 backgroundColor: "#18181B",
 border: "1px solid #3F3F46",
 borderRadius: "14px",
 padding: "10px 14px",
 boxShadow:
 "0 10px 30px rgba(0, 0, 0, 0.2)",
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
 formatter={(value, name) => [
 `${value} candidates`,
 name,
 ]}
 />

 {/* Legend */}
 <Legend
 verticalAlign="bottom"
 height={50}
 iconType="circle"
 iconSize={8}
 formatter={(value) => (
 <span
 className="
 text-xs
 font-medium
 text-zinc-500
 dark:text-zinc-400
 "
 >
 {value}
 </span>
 )}
 />
 </PieChart>
 </ResponsiveContainer>
 </div>
 )}
 </section>
 );
};

export default HiringSources;