import { useMemo } from "react";
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

const TimeToHire = () => {
 const candidates = useCandidateStore((state) => state.candidates);

 const hiredCandidates = useMemo(() => {
    return candidates
      .filter((candidate) => candidate.status === "Hired")
      .map((candidate) => {
        const createdDate = new Date(candidate.createdAt || Date.now());
        const hiredDateStr =
          candidate.hiredAt ||
          candidate.updatedAt ||
          candidate.stageUpdatedAt ||
          new Date().toISOString();
        const hiredDate = new Date(hiredDateStr);

        if (
          Number.isNaN(createdDate.getTime()) ||
          Number.isNaN(hiredDate.getTime())
        ) {
          return null;
        }

        const difference = hiredDate.getTime() - createdDate.getTime();
        const days = Math.max(
          0,
          Math.ceil(difference / (1000 * 60 * 60 * 24))
        );

        return {
          id: candidate.id,
          name: candidate.fullName,
          days,
        };
      })
      .filter(
        (
          candidate
        ): candidate is {
          id: string;
          name: string;
          days: number;
        } => candidate !== null
      )
      .sort((a, b) => b.days - a.days);
  }, [candidates]);

 const statistics = useMemo(() => {
 if (hiredCandidates.length === 0) {
 return {
 average: 0,
 fastest: 0,
 longest: 0,
 totalHires: 0,
 };
 }

 const totalDays = hiredCandidates.reduce(
 (total, candidate) => total + candidate.days,
 0
 );

 const fastest = Math.min(
 ...hiredCandidates.map((candidate) => candidate.days)
 );

 const longest = Math.max(
 ...hiredCandidates.map((candidate) => candidate.days)
 );

 return {
 average: Math.round(
 totalDays / hiredCandidates.length
 ),
 fastest,
 longest,
 totalHires: hiredCandidates.length,
 };
 }, [hiredCandidates]);

console.table(
 candidates
 .filter((candidate) => candidate.status === "Hired")
 .map((candidate) => ({
 name: candidate.fullName,
 status: candidate.status,
 createdAt: candidate.createdAt,
 hiredAt: candidate.hiredAt,
 }))
);

 const chartData = useMemo(() => {
 return hiredCandidates.map((candidate) => ({
 ...candidate,

 // Keep names readable on the chart
 shortName:
 candidate.name.length > 14
 ? `${candidate.name.slice(0, 14)}...`
 : candidate.name,
 }));
 }, [hiredCandidates]);

 return (
 <section
 className="
 rounded-2xl
 
 bg-white
 p-6

[--chart-grid:#E4E4E7]
dark:[--chart-grid:#27272A]
 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Header */}
 <div
 className="
 flex
 flex-col
 gap-5

 lg:flex-row
 lg:items-start
 lg:justify-between
 "
 >
 <div>
 <h2
 className="
 text-lg
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 Time to Hire
 </h2>

 <p
 className="
 mt-1
 max-w-xl
 text-sm
 text-zinc-500
 dark:text-zinc-400
 "
 >
 See how quickly candidates move from
 application to hire.
 </p>
 </div>

 
 </div>

 {/* Stats */}
 <div
 className="
 mt-6
 grid
 grid-cols-2
 gap-3

 sm:grid-cols-4
 "
 >
 {/* Total Hires */}
 <div
 className="
 rounded-2xl
 border
 border-zinc-200
 bg-zinc-50
 p-4

 dark:border-zinc-800
 dark:bg-zinc-800/50
 "
 >
 <p
 className="
 text-xs
 font-medium
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Total hires
 </p>

 <p
 className="
 mt-1
 text-xl
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 {statistics.totalHires}
 </p>
 </div>

 {/* Fastest */}
 <div
 className="
 rounded-2xl
 border
 border-zinc-200
 bg-zinc-50
 p-4

 dark:border-zinc-800
 dark:bg-zinc-800/50
 "
 >
 <p
 className="
 text-xs
 font-medium
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Fastest hire
 </p>

 <p
 className="
 mt-1
 text-xl
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 {statistics.fastest}
 <span className="ml-1 text-xs font-medium">
 days
 </span>
 </p>
 </div>

 {/* Longest */}
 <div
 className="
 rounded-2xl
 border
 border-zinc-200
 bg-zinc-50
 p-4

 dark:border-zinc-800
 dark:bg-zinc-800/50
 "
 >
 <p
 className="
 text-xs
 font-medium
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Longest hire
 </p>

 <p
 className="
 mt-1
 text-xl
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 {statistics.longest}
 <span className="ml-1 text-xs font-medium">
 days
 </span>
 </p>
 </div>

 {/* Average */}
 <div
 className="
 rounded-2xl
 border
 border-zinc-200
 bg-zinc-50
 p-4

 dark:border-zinc-800
 dark:bg-zinc-800/50
 "
 >
 <p
 className="
 text-xs
 font-medium
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Average
 </p>

 <p
 className="
 mt-1
 text-xl
 font-bold
 text-[#408A71]
 dark:text-[#B0E4CC]
 "
 >
 {statistics.average}
 <span className="ml-1 text-xs font-medium">
 days
 </span>
 </p>
 </div>
 </div>

 {/* Chart */}
 {hiredCandidates.length === 0 ? (
 <div
 className="
 mt-6
 flex
 h-[280px]
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
 No hired candidates yet.
 </div>
 ) : (
 <div className="mt-6 h-[300px] w-full">
 <ResponsiveContainer
 width="100%"
 height="100%"
 >
 <BarChart
 data={chartData}
 accessibilityLayer={false}
 margin={{
 top: 10,
 right: 10,
 left: -20,
 bottom: 5,
 }}
 >
 <CartesianGrid
 strokeDasharray="3 5"
 vertical={false}
 stroke="var(--chart-grid)"
 />

 <XAxis
 dataKey="shortName"
 axisLine={false}
 tickLine={false}
 tick={{
 fontSize: 11,
 fill: "#A1A1AA",
 }}
 />

 <YAxis
 allowDecimals={false}
 axisLine={false}
 tickLine={false}
 tick={{
 fontSize: 11,
 fill: "#A1A1AA",
 }}
 />

 <Tooltip
 cursor={{
 fill: "rgba(64, 138, 113, 0.06)",
 }}
 contentStyle={{
 borderRadius: "14px",
 border: "1px solid #3F3F46",
 backgroundColor: "#18181B",
 color: "#FFFFFF",
 boxShadow:
 "0 10px 30px rgba(0,0,0,0.15)",
 }}
 labelStyle={{
 color: "#A1A1AA",
 marginBottom: 6,
 fontWeight: 600,
 }}
 formatter={(value) => [
 `${value} days`,
 "Time to hire",
 ]}
 />

 <Bar
 dataKey="days"
 fill="#3B82F6"
 radius={[8, 8, 0, 0]}
 barSize={32}
 />
 </BarChart>
 </ResponsiveContainer>
 </div>
 )}
 </section>
 );
};

export default TimeToHire;