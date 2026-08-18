/*
import {
  MdPersonAdd,
  MdEvent,
  MdClose,
  MdCardGiftcard,
  MdVerified,
  MdTaskAlt,
  MdAssignmentInd,
  MdRemoveCircleOutline,
  MdFilterList,
  MdTrendingUp,
  MdHistory,
  MdAccessTime,
} from "react-icons/md";
import { useAuthStore } from "../../store/authStore";
import useRecentHiringActivity, {
  type DashboardActivity,
} from "./hooks/useRecentActivity";
import { timeAgo } from "../../utils/timeAgo";


const getActivityIconAndStyle = (action: string) => {
  const act = action.toLowerCase();

  if (act.includes("rejected")) {
    return {
      icon: <MdClose size={20} />,
      badgeStyle:
        "bg-red-50 text-red-600 border-red-200/60 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/20",
    };
  }

  if (act.includes("hired")) {
    return {
      icon: <MdVerified size={20} />,
      badgeStyle:
        "bg-emerald-50 text-emerald-600 border-emerald-200/60 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/20",
    };
  }

  if (act.includes("offer")) {
    return {
      icon: <MdCardGiftcard size={20} />,
      badgeStyle:
        "bg-emerald-50 text-emerald-600 border-emerald-200/60 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/20",
    };
  }

  if (act.includes("completed")) {
    return {
      icon: <MdTaskAlt size={20} />,
      badgeStyle:
        "bg-teal-50 text-teal-600 border-teal-200/60 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/20",
    };
  }

  if (act.includes("scheduled") || act.includes("rescheduled")) {
    return {
      icon: <MdEvent size={20} />,
      badgeStyle:
        "bg-blue-50 text-blue-600 border-blue-200/60 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/20",
    };
  }

  if (act.includes("assigned a job") || act.includes("assigned job")) {
    return {
      icon: <MdAssignmentInd size={20} />,
      badgeStyle:
        "bg-indigo-50 text-indigo-600 border-indigo-200/60 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-500/20",
    };
  }

  if (act.includes("removed")) {
    return {
      icon: <MdRemoveCircleOutline size={20} />,
      badgeStyle:
        "bg-amber-50 text-amber-600 border-amber-200/60 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/20",
    };
  }

  if (act.includes("created") || act.includes("team")) {
    return {
      icon: <MdPersonAdd size={20} />,
      badgeStyle:
        "bg-purple-50 text-purple-600 border-purple-200/60 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/20",
    };
  }

  if (act.includes("screening")) {
    return {
      icon: <MdFilterList size={20} />,
      badgeStyle:
        "bg-purple-50 text-purple-600 border-purple-200/60 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/20",
    };
  }

  return {
    icon: <MdTrendingUp size={20} />,
    badgeStyle:
      "bg-[#EEF8F3] text-[#408A71] border-[#408A71]/20 dark:bg-[#285A48]/20 dark:text-[#B0E4CC] dark:border-[#B0E4CC]/20",
  };
};

const formatFullDate = (isoString: string) => {
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const renderActivityContent = (activity: DashboardActivity) => {
  const recruiterName = activity.recruiterName?.trim() || "Unknown";
  const recruiter = (
    <span className="font-bold text-zinc-900 dark:text-white">
      {recruiterName}
    </span>
  );

  const target = (
    <span className="font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md border border-zinc-200/70 dark:border-zinc-700/70 inline-block my-0.5">
      {activity.target}
    </span>
  );

  const secondaryTarget = activity.secondaryTarget ? (
    <span className="font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md border border-zinc-200/70 dark:border-zinc-700/70 inline-block my-0.5">
      {activity.secondaryTarget}
    </span>
  ) : null;

  const actionLower = activity.action.toLowerCase();

  // Assigned job
  if (
    actionLower.includes("assigned a job") ||
    actionLower.includes("assigned job")
  ) {
    return (
      <span>
        {recruiter} assigned the {target} job
        {secondaryTarget ? <> to {secondaryTarget}</> : ""}.
      </span>
    );
  }

  // Removed job assignment
  if (
    actionLower.includes("removed") &&
    (actionLower.includes("job") || actionLower.includes("assignment"))
  ) {
    return (
      <span>
        {recruiter} removed job assignment {target}
        {secondaryTarget ? <> from {secondaryTarget}</> : ""}.
      </span>
    );
  }

  // Completed technical / stage interview
  if (actionLower.includes("completed")) {
    const stageMatch = activity.action.match(
      /completed\s+(?:the\s+)?(\w+)?\s*interview/i
    );
    const stageName = stageMatch?.[1]
      ? stageMatch[1].toLowerCase()
      : "technical";
    return (
      <span>
        {recruiter} completed the{" "}
        <span className="font-medium text-emerald-600 dark:text-emerald-400">
          {stageName} interview
        </span>{" "}
        for {target}.
      </span>
    );
  }

  // Scheduled interview
  if (actionLower.includes("scheduled")) {
    return (
      <span>
        {recruiter} scheduled an interview with {target}.
      </span>
    );
  }

  // Rescheduled interview
  if (actionLower.includes("rescheduled")) {
    return (
      <span>
        {recruiter} rescheduled the interview with {target}.
      </span>
    );
  }

  // Moved candidate to [Stage]
  if (actionLower.includes("moved")) {
    let stageName = "Screening";
    if (actionLower.includes("offer")) stageName = "Offer";
    else if (actionLower.includes("interview")) stageName = "Interview";
    else if (actionLower.includes("screening")) stageName = "Screening";
    else {
      const parts = activity.action.split(" to ");
      if (parts[1]) stageName = parts[1].trim();
    }
    return (
      <span>
        {recruiter} moved {target} to{" "}
        <span className="font-semibold text-[#408A71] dark:text-[#B0E4CC]">
          {stageName}
        </span>
        .
      </span>
    );
  }

  // Hired candidate
  if (actionLower.includes("hired")) {
    return (
      <span>
        {recruiter} hired candidate {target}.
      </span>
    );
  }

  // Rejected candidate
  if (actionLower.includes("rejected")) {
    return (
      <span>
        {recruiter} rejected {target}.
      </span>
    );
  }

  // Created team member
  if (actionLower.includes("created") && actionLower.includes("team")) {
    return (
      <span>
        {recruiter} created a new team member {target}.
      </span>
    );
  }

  // Fallback sentence structure
  return (
    <span>
      {recruiter} {activity.action} {target}.
    </span>
  );
};


const DashboardRecentHiringActivity = () => {
  const { activities } = useRecentHiringActivity();
  const user = useAuthStore((state) => state.user);
console.log("recent:", activities)
console.log("current use:", user)
  return (
    <section
      className="
      rounded-3xl
      border
      border-zinc-200
      bg-white
      p-6
      shadow-sm
      dark:border-zinc-700
      dark:bg-zinc-900
      "
    >
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Recent Hiring Activity
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ATS Feed
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Real-time recruiter actions and pipeline events.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
          <MdHistory size={16} />
          <span>Top 5 Newest</span>
        </div>
      </div>

     
      <div className="space-y-3.5">
        {activities.map((activity) => {
          const { icon, badgeStyle } = getActivityIconAndStyle(
            activity.action
          );
          const relativeTime = timeAgo(activity.date);
          const exactDateTime = formatFullDate(activity.date);

          return (
            <div
              key={activity.id}
              className="
              flex
              items-start
              gap-3.5
              rounded-2xl
              border
              border-zinc-100
              bg-zinc-50/50
              p-3.5
              transition
              hover:border-zinc-200
              hover:bg-zinc-100/60
              dark:border-zinc-800/80
              dark:bg-zinc-800/40
              dark:hover:border-zinc-700
              dark:hover:bg-zinc-800/70
              "
            >
            
              <div
                className={`
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                shadow-xs
                ${badgeStyle}
                `}
              >
                {icon}
              </div>

             
              <div className="flex-1 min-w-0">
                <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {renderActivityContent(activity)}
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                  <span className="inline-flex items-center gap-1 font-medium text-zinc-500 dark:text-zinc-400">
                    <MdAccessTime size={13} className="text-zinc-400" />
                    {relativeTime}
                  </span>
                  <span>•</span>
                  <span>{exactDateTime}</span>
                </div>
              </div>
            </div>
          );
        })}

        {activities.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-200 p-8 text-center dark:border-zinc-700">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No hiring activities recorded yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardRecentHiringActivity;
*/



import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useMemo } from "react";
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

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - index));

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
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        interviews,
        hires,
        offers,
      };
    });
  }, [allActivities]);

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
 <div
 className="
 shrink-0
 rounded-xl
 border border-zinc-200
 bg-white
 px-3
 py-2
 text-sm
 font-medium
 text-zinc-700
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-zinc-200
 "
 >
 7 Days
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