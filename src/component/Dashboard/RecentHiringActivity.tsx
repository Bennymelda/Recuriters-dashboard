
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useMemo, useState} from "react";
import { useTeamStore } from "../../store/teamStore";
import { useCandidateStore } from "../../store/candidateStore";

type Activity = {
  action: string;
  date: string;
  createdAt?: string;
  recruiterName?: string;
};

const getActivityDate = (activity: Activity) => {
  const rawDate = activity.createdAt ?? activity.date;

  if (!rawDate) return null;

  const parsedDate = new Date(rawDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};

const DashboardRecentHiringActivity = () => {
  const members = useTeamStore((state) => state.members);
  const candidates = useCandidateStore((state) => state.candidates);
const [activityRange, setActivityRange] = useState<7 | 14 | 30>(7);
  const candidateActivities = useMemo(() => {
    const list: Activity[] = [];

    candidates.forEach((candidate) => {
      // 1. Interview History
      if (candidate.interviewHistory && candidate.interviewHistory.length > 0) {
        candidate.interviewHistory.forEach((interview) => {
          if (interview.date) {
            list.push({
              action: `Scheduled ${interview.stage || ""} interview`,
              date: interview.date,
              createdAt: interview.date,
            });
          }
        });
      }

      // 2. Hires
      if (candidate.status === "Hired") {
        const hiredDate =
          candidate.hiredAt || candidate.updatedAt || candidate.stageUpdatedAt;
        if (hiredDate) {
          list.push({
            action: "Hired candidate",
            date: hiredDate,
            createdAt: hiredDate,
          });
        }
      }

      // 3. Offers
      if (candidate.status === "Offer") {
        const offerDate = candidate.stageUpdatedAt || candidate.updatedAt;
        if (offerDate) {
          list.push({
            action: "Moved candidate to Offer",
            date: offerDate,
            createdAt: offerDate,
          });
        }
      }

      // 4. Interview stage status
      if (candidate.status === "Interview" && candidate.stageUpdatedAt) {
        list.push({
          action: "Scheduled interview",
          date: candidate.stageUpdatedAt,
          createdAt: candidate.stageUpdatedAt,
        });
      }
    });

    return list;
  }, [candidates]);

  const allActivities = useMemo(() => {
    const teamActivities = members.flatMap((member) =>
      (member.recentActivity || []).map((activity) => ({
        ...activity,
        recruiterName:
          activity.recruiterName?.trim() || member.fullName?.trim() || "Unknown",
      }))
    );

    const extraCandidateActivities = candidateActivities.filter((candAct) => {
      const candDate = candAct.createdAt || candAct.date;
      if (!candDate) return false;
      const candDateStr = new Date(candDate).toDateString();
      const candActionLower = candAct.action.toLowerCase();
      const candCategory = candActionLower.includes("hired")
        ? "hire"
        : candActionLower.includes("offer")
        ? "offer"
        : "interview";

      return !teamActivities.some((teamAct) => {
        const teamDate = (teamAct as { createdAt?: string; date: string }).createdAt || teamAct.date;
        if (!teamDate) return false;
        const teamDateStr = new Date(teamDate).toDateString();
        const teamActionLower = teamAct.action.toLowerCase();
        const teamCategory = teamActionLower.includes("hired")
          ? "hire"
          : teamActionLower.includes("offer")
          ? "offer"
          : "interview";

        return teamDateStr === candDateStr && teamCategory === candCategory;
      });
    });

    return [...teamActivities, ...extraCandidateActivities].sort(
      (a, b) =>
        new Date((b as { createdAt?: string; date: string }).createdAt || b.date).getTime() -
        new Date((a as { createdAt?: string; date: string }).createdAt || a.date).getTime()
    );
  }, [members, candidateActivities]);

  const chartData = useMemo(() => {
 const today = new Date();

 return Array.from({ length: activityRange }, (_, index) => {
 const date = new Date(today);

 date.setDate(
 today.getDate() - (activityRange - 1 - index)
 );

 const dateKey = [
 date.getFullYear(),
 String(date.getMonth() + 1).padStart(2, "0"),
 String(date.getDate()).padStart(2, "0"),
 ].join("-");

 const dayActivities = allActivities.filter((activity) => {
 const activityDate = getActivityDate(activity);

 if (!activityDate) return false;

 return (
 activityDate.getFullYear() === date.getFullYear() &&
 activityDate.getMonth() === date.getMonth() &&
 activityDate.getDate() === date.getDate()
 );
 });

 const interviews = dayActivities.filter((activity) => {
 const action = activity.action.toLowerCase();

 return (
 action.includes("interview") ||
 action.includes("scheduled") ||
 action.includes("rescheduled") ||
 action.includes("completed")
 );
 }).length;

 const hires = dayActivities.filter((activity) =>
 activity.action.toLowerCase().includes("hired")
 ).length;

 const offers = dayActivities.filter((activity) =>
 activity.action.toLowerCase().includes("offer")
 ).length;

 return {
 date: dateKey,
 label:
 activityRange === 7
 ? date.toLocaleDateString("en-US", {
 weekday: "short",
 })
 : date.toLocaleDateString("en-US", {
 month: "short",
 day: "numeric",
 }),


 interviews,
 hires,
 offers,
 };
 });
}, [allActivities, activityRange]);

  const totalActivity = useMemo(() => {
    return chartData.reduce(
      (total, item) => total + item.interviews + item.hires + item.offers,
      0
    );
  }, [chartData]);

 const maxValue = Math.max(
 1,
 ...chartData.flatMap((item) => [
 item.interviews,
 item.hires,
 item.offers,
 ])
 );

 return (
 <section
 className="
 rounded-2xl
 [--chart-grid:#E4E4E7]
 [--chart-cursor:#D4D4D8]
dark:[--chart-cursor:#3F3F46]
 dark:[--chart-grid:#202023]
 bg-white
 p-6

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Header */}
 <div className="flex items-start justify-between gap-4">
 <div>
 <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
 Hiring Activity
 </h2>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 Track your team's hiring activity over the last 7 days.
 </p>
 </div>

 {/* Range */}
 <div className="flex items-center gap-2">
 {[7, 14, 30].map((days) => (
 <button
 key={days}
 onClick={() =>
 setActivityRange(days as 7 | 14 | 30)
 }
 className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
 activityRange === days
 ? "bg-[#285A48] dark:bg-[#B0E4CC] dark:text-zinc-800 text-white"
 : "bg-zinc-100 text-zinc-600  hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
 }`}
 >
 {days}D
 </button>
 ))}
</div>
 </div>

 {/* Summary */}
 <div className="mt-6">
 <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
 Total activity
 </p>

 <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
 {totalActivity}
 </p>
 </div>

 {/* Chart */}
 <div className="mt-6 h-[300px] w-full outline-none focus:outline-none">
 <ResponsiveContainer width="100%" height="100%">
 <LineChart
 data={chartData}
 style={{outline:"none"}}
 accessibilityLayer={false}
 margin={{
 top: 15,
 right: 10,
 left: -20,
 bottom: 5,
 }}
 >
 {/* Grid */}
 <CartesianGrid
 vertical={false}
 stroke="var(--chart-grid)"
 strokeDasharray="3 5"
 />

 {/* X Axis */}
 <XAxis
 dataKey="label"
 axisLine={false}
 tickLine={false}
 tick={{
 fontSize: 11,
 fill: "#A1A1AA",
 }}
 dy={10}
 />

 {/* Y Axis */}
 <YAxis
 axisLine={false}
 tickLine={false}
 allowDecimals={false}
 domain={[0, maxValue + 1]}
 tick={{
 fontSize: 11,
 fill: "#A1A1AA",
 }}
 />

 {/* Tooltip */}
 <Tooltip
 cursor={{
 stroke: "var(--chart-cursor)",
 strokeWidth: 1,
 strokeDasharray: "4 4",
 }}
 contentStyle={{
 backgroundColor: "#18181B",
 border: "none",
 borderRadius: "12px",
 padding: "10px 14px",
 boxShadow:
 "0 10px 30px rgba(0, 0, 0, 0.18)",
 }}
 labelStyle={{
 color: "#A1A1AA",
 fontSize: "11px",
 marginBottom: "6px",
 }}
 itemStyle={{
 color: "#FFFFFF",
 fontSize: "12px",
 fontWeight: 600,
 }}
 formatter={(value, name) => [
 `${value} ${name}`,
 "",
 ]}
 />

 {/* Interviews */}
 <Line
 type="monotone"
 dataKey="interviews"
 name="Interviews"
 stroke="#408A71"
 strokeWidth={2.5}
 dot={false}
 activeDot={{
 r: 5,
 fill: "#408A71",
 stroke: "#FFFFFF",
 strokeWidth: 3,
 }}
 />

 {/* Hires */}
 <Line
 type="monotone"
 dataKey="hires"
 name="Hires"
 stroke="#3B82F6"
 strokeWidth={2.5}
 dot={false}
 activeDot={{
 r: 5,
 fill: "#3B82F6",
 stroke: "#FFFFFF",
 strokeWidth: 3,
 }}
 />

 {/* Offers */}
 <Line
 type="monotone"
 dataKey="offers"
 name="Offers"
 stroke="#8B5CF6"
 strokeWidth={2.5}
 dot={false}
 activeDot={{
 r: 5,
 fill: "#8B5CF6",
 stroke: "#FFFFFF",
 strokeWidth: 3,
 }}
 />
 </LineChart>
 </ResponsiveContainer>
 </div>

 {/* Legend */}
 <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-[#408A71]" />

 <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
 Interviews
 </span>
 </div>

 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-blue-500" />

 <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
 Hires
 </span>
 </div>

 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-violet-500" />

 <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
 Offers
 </span>
 </div>
 </div>
 </section>
 );
};

export default DashboardRecentHiringActivity;