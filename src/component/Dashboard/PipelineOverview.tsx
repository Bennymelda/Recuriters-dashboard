import {
 ResponsiveContainer,
 PieChart,
 Pie,
 Cell,
 Tooltip,
} from "recharts";
import usePipelineOverview from "./hooks/usePipelineOverview";

const stageColors = {
 Applied: "#3B82F6",
 Screening: "#F59E0B",
 Interview: "#A855F7",
 Offer: "#06B6D4",
 Hired: "#10B981",
 Rejected: "#EF4444",
} as const;

const DashboardPipelineOverview = () => {
 const { pipeline } = usePipelineOverview();

 const chartData = pipeline.map((item) => ({
 stage: item.stage,
 count: item.count,
 percentage: item.percentage,
 color:
 stageColors[item.stage as keyof typeof stageColors],
 }));

 const totalCandidates = pipeline.reduce(
 (total, item) => total + item.count,
 0
 );

 return (
 <section
 className="
 rounded-2xl

 bg-white
 p-6

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 {/* Header */}
 <div>
 <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
 Hiring Pipeline
 </h2>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 Candidates across each stage of your hiring process.
 </p>
 </div>

 {/* Donut */}
 <div className="mt-6 flex justify-center">
 <div className="relative h-[250px] w-[250px]">
 <ResponsiveContainer width="100%" height="100%">
 <PieChart accessibilityLayer={false}>
 <Pie
 data={chartData}
 
 dataKey="count"
 nameKey="stage"
 cx="50%"
 cy="50%"
 innerRadius={72}
 outerRadius={100}
 paddingAngle={3}
 stroke="none"
 cornerRadius={6}
 >
 {chartData.map((entry) => (
 <Cell
 key={entry.stage}
 fill={entry.color}
 />
 ))}
 </Pie>

 <Tooltip
 contentStyle={{
 backgroundColor: "#18181B",
 border: "none",
 borderRadius: "12px",
 padding: "10px 14px",
 boxShadow:
 "0 10px 30px rgba(0,0,0,0.18)",
 }}
 labelStyle={{
 color: "#A1A1AA",
 fontSize: "11px",
 }}
 itemStyle={{
 color: "#FFFFFF",
 fontSize: "13px",
 fontWeight: 600,
 }}
 formatter={(value, _name, props) => [
 `${value} candidates`,
 `${props.payload.percentage}%`,
 ]}
 />
 </PieChart>
 </ResponsiveContainer>

 {/* Center text */}
 <div
 className="
 pointer-events-none
 absolute
 inset-0
 flex
 flex-col
 items-center
 justify-center
 "
 >
 <span className="text-3xl font-bold text-zinc-900 dark:text-white">
 {totalCandidates}
 </span>

 <span className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
 Total Candidates
 </span>
 </div>
 </div>
 </div>

 {/* Stage Breakdown */}
 <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
 {chartData.map((item) => (
 <div
 key={item.stage}
 className="flex items-center justify-between"
 >
 <div className="flex items-center gap-2.5">
 <span
 className="h-2.5 w-2.5 shrink-0 rounded-full"
 style={{
 backgroundColor: item.color,
 }}
 />

 <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
 {item.stage}
 </span>
 </div>

 <span className="text-sm font-semibold text-zinc-900 dark:text-white">
 {item.percentage}%
 </span>
 </div>
 ))}
 </div>
 </section>
 );
};

export default DashboardPipelineOverview;