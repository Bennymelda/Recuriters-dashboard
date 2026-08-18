import { useMemo, useState } from "react";
import {
 ResponsiveContainer,
 LineChart,
 Line,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
} from "recharts";
import { useTeamStore } from "../../../store/teamStore";
import { useCandidateStore } from "../../../store/candidateStore";

type Range = "7d" | "30d";

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

const HiringActivityAnalytics = () => {
	const members = useTeamStore((state) => state.members);
  const candidates = useCandidateStore((state) => state.candidates);

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

  const activities = useMemo(() => {
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

 const [range, setRange] = useState<Range>("7d");

 const chartData = useMemo(() => {
 const numberOfDays = range === "7d" ? 7 : 30;

 const today = new Date();

 today.setHours(0, 0, 0, 0);

 return Array.from(
 { length: numberOfDays },
 (_, index) => {
 const date = new Date(today);

 date.setDate(
 today.getDate() -
 (numberOfDays - 1 - index)
 );

 const dateKey = [
 date.getFullYear(),
 String(date.getMonth() + 1).padStart(2, "0"),
 String(date.getDate()).padStart(2, "0"),
 ].join("-");

 const dayActivities = activities.filter(
 (activity) => {
 const activityDate =
 getActivityDate(activity);

 if (!activityDate) return false;

 return (
 activityDate.getFullYear() ===
 date.getFullYear() &&
 activityDate.getMonth() ===
 date.getMonth() &&
 activityDate.getDate() ===
 date.getDate()
 );
 }
 );

 const interviews =
 dayActivities.filter((activity) => {
 const action =
 activity.action.toLowerCase();

 return (
 action.includes("interview") ||
 action.includes("scheduled") ||
 action.includes("rescheduled")
 );
 }).length;

 const offers =
 dayActivities.filter((activity) => {
 const action =
 activity.action.toLowerCase();

 return action.includes("offer");
 }).length;

 const hires =
 dayActivities.filter((activity) => {
 const action =
 activity.action.toLowerCase();

 return action.includes("hired");
 }).length;

 return {
 date: dateKey,

 label:
 range === "7d"
 ? date.toLocaleDateString(
 "en-US",
 {
 weekday: "short",
 }
 )
 : date.toLocaleDateString(
 "en-US",
 {
 month: "short",
 day: "numeric",
 }
 ),

 interviews,
 offers,
 hires,

 total:
 interviews +
 offers +
 hires,
 };
 }
 );
 }, [activities, range]);

 const totals = useMemo(() => {
 return chartData.reduce(
 (total, item) => ({
 interviews:
 total.interviews + item.interviews,

 offers:
 total.offers + item.offers,

 hires:
 total.hires + item.hires,

 total:
 total.total + item.total,
 }),
 {
 interviews: 0,
 offers: 0,
 hires: 0,
 total: 0,
 }
 );
 }, [chartData]);

 const maxValue = Math.max(
 1,
 ...chartData.flatMap((item) => [
 item.interviews,
 item.offers,
 item.hires,
 ])
 );

 return (
 <section
 className="
 rounded-2xl
[--chart-grid:#E4E4E7]
[--chart-cursor:#D4D4D8]
dark:[--chart-cursor:#3F3F46]
dark:[--chart-grid:#27272A]
 bg-white
 p-6


 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Header */}
 <div
 className="
 flex
 flex-col
 gap-4

 lg:flex-row
 lg:items-start
 lg:justify-between
 "
 >
 <div>
 <p
 className="
 text-xs
 font-semibold
 uppercase
 tracking-wider
 text-[#408A71]
 dark:text-[#B0E4CC]
 "
 >
 Recruitment analytics
 </p>

 <h2
 className="
 mt-1
 text-2xl
 font-bold
 tracking-tight
 text-zinc-900

 dark:text-white
 "
 >
 Hiring Activity
 </h2>

 <p
 className="
 mt-2
 max-w-xl
 text-sm
 leading-6
 text-zinc-500

 dark:text-zinc-400
 "
 >
 Track interviews, offers, and hires
 across your recruitment process over
 time.
 </p>
 </div>

 {/* Range selector */}
 <div
 className="
 flex
 w-fit
 rounded-xl
 border
 border-zinc-200
 bg-zinc-50
 p-1

 dark:border-zinc-700
 dark:bg-zinc-800
 "
 >
 <button
 type="button"
 onClick={() =>
 setRange("7d")
 }
 className={`
 rounded-lg
 px-4
 py-2
 text-xs
 font-semibold
 transition

 ${
 range === "7d"
 ? `
 bg-white
 text-[#408A71]
 shadow-sm

 dark:bg-zinc-700
 dark:text-[#B0E4CC]
 `
 : `
 text-zinc-500
 hover:text-zinc-900

 dark:text-zinc-400
 dark:hover:text-white
 `
 }
 `}
 >
 7 Days
 </button>

 <button
 type="button"
 onClick={() =>
 setRange("30d")
 }
 className={`
 rounded-lg
 px-4
 py-2
 text-xs
 font-semibold
 transition

 ${
 range === "30d"
 ? `
 bg-white
 text-[#408A71]
 shadow-sm

 dark:bg-zinc-700
 dark:text-[#B0E4CC]
 `
 : `
 text-zinc-500
 hover:text-zinc-900

 dark:text-zinc-400
 dark:hover:text-white
 `
 }
 `}
 >
 30 Days
 </button>
 </div>
 </div>

 {/* KPI summary */}
 <div
 className="
 mt-7
 grid
 grid-cols-2
 gap-3

 md:grid-cols-4
 "
 >
 {/* Total */}
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
 Total activity
 </p>

 <p
 className="
 mt-2
 text-2xl
 font-bold
 text-zinc-900

 dark:text-white
 "
 >
 {totals.total}
 </p>
 </div>

 {/* Interviews */}
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
 <div className="flex items-center gap-2">
 <span
 className="
 h-2.5
 w-2.5
 rounded-full
 bg-[#408A71]
 "
 />

 <p
 className="
 text-xs
 font-medium
 text-zinc-500

 dark:text-zinc-400
 "
 >
 Interviews
 </p>
 </div>

 <p
 className="
 mt-2
 text-2xl
 font-bold
 text-zinc-900

 dark:text-white
 "
 >
 {totals.interviews}
 </p>
 </div>

 {/* Offers */}
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
 <div className="flex items-center gap-2">
 <span
 className="
 h-2.5
 w-2.5
 rounded-full
 bg-violet-500
 "
 />

 <p
 className="
 text-xs
 font-medium
 text-zinc-500

 dark:text-zinc-400
 "
 >
 Offers
 </p>
 </div>

 <p
 className="
 mt-2
 text-2xl
 font-bold
 text-zinc-900

 dark:text-white
 "
 >
 {totals.offers}
 </p>
 </div>

 {/* Hires */}
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
 <div className="flex items-center gap-2">
 <span
 className="
 h-2.5
 w-2.5
 rounded-full
 bg-blue-500
 "
 />

 <p
 className="
 text-xs
 font-medium
 text-zinc-500

 dark:text-zinc-400
 "
 >
 Hires
 </p>
 </div>

 <p
 className="
 mt-2
 text-2xl
 font-bold
 text-zinc-900

 dark:text-white
 "
 >
 {totals.hires}
 </p>
 </div>
 </div>

 {/* Chart */}
 <div
 className="
 mt-8
 outline-none
 focus:outline-none
 h-[340px]
 w-full
 "
 >
 <ResponsiveContainer
 width="100%"
 height="100%"

 >
 <LineChart
 data={chartData}
 accessibilityLayer={false}
style={{outline:"none"}}
 margin={{
 top: 10,
 right: 10,
 left: -20,
 bottom: 5,
 }}
 >
 <CartesianGrid
 vertical={false}
 stroke="var(--chart-grid)"
 strokeDasharray="3 5"
 />

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

 <YAxis
 axisLine={false}
 tickLine={false}
 allowDecimals={false}
 domain={[
 0,
 maxValue + 1,
 ]}
 tick={{
 fontSize: 11,
 fill: "#A1A1AA",
 }}
 />

 <Tooltip
 cursor={{
 stroke: "var(--chart-cursor)",
 strokeWidth: 1,
 strokeDasharray: "4 4",
 }}
 contentStyle={{
 backgroundColor: "#18181B",
 border: "none",
 borderRadius: "14px",
 padding: "12px 14px",
 boxShadow:
 "0 10px 30px rgba(0,0,0,0.18)",
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
 `${value}`,
 `${name}`,
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
 </LineChart>
 </ResponsiveContainer>
 </div>

 {/* Legend */}
 <div
 className="
 mt-5
 flex
 flex-wrap
 items-center
 justify-center
 gap-x-7
 gap-y-3
 "
 >
 <div className="flex items-center gap-2">
 <span
 className="
 h-2
 w-2
 rounded-full
 bg-[#408A71]
 "
 />

 <span
 className="
 text-xs
 font-medium
 text-zinc-500

 dark:text-zinc-400
 "
 >
 Interviews
 </span>
 </div>

 <div className="flex items-center gap-2">
 <span
 className="
 h-2
 w-2
 rounded-full
 bg-violet-500
 "
 />

 <span
 className="
 text-xs
 font-medium
 text-zinc-500

 dark:text-zinc-400
 "
 >
 Offers
 </span>
 </div>

 <div className="flex items-center gap-2">
 <span
 className="
 h-2
 w-2
 rounded-full
 bg-blue-500
 "
 />

 <span
 className="
 text-xs
 font-medium
 text-zinc-500

 dark:text-zinc-400
 "
 >
 Hires
 </span>
 </div>
 </div>
 </section>
 );
};

export default HiringActivityAnalytics;