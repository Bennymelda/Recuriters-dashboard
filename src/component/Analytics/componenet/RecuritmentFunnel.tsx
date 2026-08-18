import {
 ResponsiveContainer,
 BarChart,
 Bar,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
} from "recharts";

import { useCandidateStore } from "../../../store/candidateStore";

const RecruitmentFunnel = () => {
 const candidates = useCandidateStore((state) => state.candidates);

 const funnelData = [
 {
 stage: "Applied",
 candidates: candidates.filter(
 (candidate) => candidate.status === "Applied"
 ).length,
 },
 {
 stage: "Screening",
 candidates: candidates.filter(
 (candidate) => candidate.status === "Screening"
 ).length,
 },
 {
 stage: "Interview",
 candidates: candidates.filter(
 (candidate) => candidate.status === "Interview"
 ).length,
 },
 {
 stage: "Offer",
 candidates: candidates.filter(
 (candidate) => candidate.status === "Offer"
 ).length,
 },
 {
 stage: "Hired",
 candidates: candidates.filter(
 (candidate) => candidate.status === "Hired"
 ).length,
 },
 ];

 const totalCandidates = candidates.length;

 return (
 <section
 className="
 rounded-2xl

 bg-white
 [--chart-grid:#E4E4E7]
dark:[--chart-grid:#27272A]
 p-6

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Header */}
 <div className="mb-6">
 <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
 Recruitment Funnel
 </h2>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 See how candidates move through your hiring pipeline.
 </p>
 </div>

 {/* Summary */}
 <div className="mb-6">
 <p
 className="
 text-xs
 font-medium
 uppercase
 tracking-wide
 text-zinc-400
 dark:text-zinc-500
 "
 >
 Candidates
 </p>

 <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-white">
 {totalCandidates}
 </p>
 </div>

 {/* Chart */}
 <div className="h-[320px] w-full">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart
 data={funnelData}
 accessibilityLayer={false}
 margin={{
 top: 10,
 right: 10,
 left: -20,
 bottom: 5,
 }}
 >
 {/* Grid */}
 <CartesianGrid
 vertical={false}
 strokeDasharray="3 5"
stroke="var(--chart-grid)"
 className="dark:opacity-20"
 />

 {/* X Axis */}
 <XAxis
 dataKey="stage"
 axisLine={false}
 tickLine={false}
 tick={{
 fontSize: 11,
 fill: "#8e8e97",
 }}
 dy={10}
 />

 {/* Y Axis */}
 <YAxis
 type="number"
 allowDecimals={false}
 axisLine={false}
 tickLine={false}
 tick={{
 fontSize: 11,
 fill: "#71717A",
 }}
 />

 {/* Tooltip */}
 <Tooltip
 cursor={{
 fill: "rgba(64, 138, 113, 0.08)",
 }}
 contentStyle={{
 borderRadius: "14px",
 border: "1px solid #3F3F46",
 backgroundColor: "#18181B",
 color: "#FFFFFF",
 boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
 }}
 labelStyle={{
 color: "#A1A1AA",
 fontSize: "12px",
 marginBottom: "5px",
 }}
 itemStyle={{
 color: "hashtag#FFFFFF",
 fontSize: "13px",
 fontWeight: 600,
 }}
 formatter={(value) => [`${value}`, "Candidates"]}
 />

 {/* Bars */}
 <Bar
 
 dataKey="candidates"
 fill="#408A71"
 radius={[8, 8, 0, 0]}
 barSize={42}
 />
 </BarChart>
 </ResponsiveContainer>
 </div>
 </section>
 );
};

export default RecruitmentFunnel;