/*

import { useMemo } from "react";
import type { Candidate } from "../types/candidate";
import type { Job } from "../types/job";

interface RecruiterRecentActivityProps {
  candidates: Candidate[];
  jobs: Job[];
}

interface Activity {
  id: string;
  type:
    | "stage"
    | "approval"
    | "offer"
    | "hired"
    | "rejected";
  title: string;
  description: string;
  date: string;
}

const RecruiterRecentActivity = ({
  candidates,
  jobs,
}: RecruiterRecentActivityProps) => {
  const activities = useMemo(() => {
    const activityList: Activity[] = [];

    candidates.forEach((candidate) => {
      const job = jobs.find(
        (job) => job.id === candidate.jobId
      );

      const jobTitle =
        job?.title ?? candidate.appliedRole;

      // Candidate moved through the recruitment pipeline
      if (candidate.stageUpdatedAt) {
        activityList.push({
          id: `${candidate.id}-stage`,
          type: "stage",
          title: "Candidate moved",
          description: `${candidate.fullName} moved to ${candidate.status} for ${jobTitle}.`,
          date: candidate.stageUpdatedAt,
        });
      }

      // Hiring Manager approved candidate
      if (
        candidate.hiringApproval?.status === "Approved" &&
        candidate.hiringApproval.reviewedAt
      ) {
        activityList.push({
          id: `${candidate.id}-approval-approved`,
          type: "approval",
          title: "Hiring approval received",
          description: `${candidate.fullName} was approved for ${jobTitle}.`,
          date: candidate.hiringApproval.reviewedAt,
        });
      }

      // Hiring Manager rejected candidate
      if (
        candidate.hiringApproval?.status === "Rejected" &&
        candidate.hiringApproval.reviewedAt
      ) {
        activityList.push({
          id: `${candidate.id}-approval-rejected`,
          type: "approval",
          title: "Hiring approval rejected",
          description: `${candidate.fullName} was not approved for ${jobTitle}.`,
          date: candidate.hiringApproval.reviewedAt,
        });
      }

      // Offer created/sent
      if (
        candidate.offer?.status === "Sent" &&
        candidate.offer.sentAt
      ) {
        activityList.push({
          id: `${candidate.id}-offer-sent`,
          type: "offer",
          title: "Offer sent",
          description: `An offer was sent to ${candidate.fullName} for ${jobTitle}.`,
          date: candidate.offer.sentAt,
        });
      }

      // Offer accepted
      if (
        candidate.offer?.status === "Accepted" &&
        candidate.offer.respondedAt
      ) {
        activityList.push({
          id: `${candidate.id}-offer-accepted`,
          type: "offer",
          title: "Offer accepted",
          description: `${candidate.fullName} accepted the offer for ${jobTitle}.`,
          date: candidate.offer.respondedAt,
        });
      }

      // Candidate hired
      if (candidate.hiredAt) {
        activityList.push({
          id: `${candidate.id}-hired`,
          type: "hired",
          title: "Candidate hired",
          description: `${candidate.fullName} was hired for ${jobTitle}.`,
          date: candidate.hiredAt,
        });
      }

      // Candidate rejected
      if (candidate.rejection?.date) {
        activityList.push({
          id: `${candidate.id}-rejected`,
          type: "rejected",
          title: "Candidate rejected",
          description: `${candidate.fullName} was rejected from ${jobTitle}.`,
          date: candidate.rejection.date,
        });
      }
    });

    return activityList
      .filter((activity) => {
        const time = new Date(activity.date).getTime();

        return !Number.isNaN(time);
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 6);
  }, [candidates, jobs]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "stage":
        return "↗";

      case "approval":
        return "✓";

      case "offer":
        return "✉";

      case "hired":
        return "🎉";

      case "rejected":
        return "×";

      default:
        return "•";
    }
  };

  return (
    <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
     
      <div>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Recent recruitment activity across your assigned jobs.
        </p>
      </div>

     }
      {activities.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 p-8 text-center dark:border-white/10">
          <p className="font-medium text-zinc-700 dark:text-zinc-300">
            No recent activity
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Recruitment activity will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-6 divide-y divide-zinc-100 dark:divide-white/10">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {getIcon(activity.type)}
              </div>

             
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {activity.title}
                  </h3>

                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    {formatDate(activity.date)} ·{" "}
                    {formatTime(activity.date)}
                  </span>
                </div>

                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecruiterRecentActivity;
*/

import { useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Candidate } from "../types/candidate";
import type { Job } from "../types/job";

interface RecruiterRecentActivityProps {
  candidates: Candidate[];
  jobs: Job[];
}

interface Activity {
  id: string;
  type:
    | "stage"
    | "approval"
    | "offer"
    | "hired"
    | "rejected";
  title: string;
  description: string;
  date: string;
}

const RecruiterRecentActivity = ({
  candidates,
  jobs,
}: RecruiterRecentActivityProps) => {
  const [timeRange, setTimeRange] = useState<7 | 14 | 30>(7);
  const activities = useMemo(() => {
    const activityList: Activity[] = [];

    candidates.forEach((candidate) => {
      const job = jobs.find(
        (job) => job.id === candidate.jobId
      );

      const jobTitle =
        job?.title ?? candidate.appliedRole;

      if (candidate.stageUpdatedAt) {
        activityList.push({
          id: `${candidate.id}-stage`,
          type: "stage",
          title: "Candidate moved",
          description: `${candidate.fullName} moved to ${candidate.status} for ${jobTitle}.`,
          date: candidate.stageUpdatedAt,
        });
      }

      if (
        candidate.hiringApproval?.status === "Approved" &&
        candidate.hiringApproval.reviewedAt
      ) {
        activityList.push({
          id: `${candidate.id}-approval-approved`,
          type: "approval",
          title: "Hiring approval received",
          description: `${candidate.fullName} was approved for ${jobTitle}.`,
          date: candidate.hiringApproval.reviewedAt,
        });
      }

      if (
        candidate.hiringApproval?.status === "Rejected" &&
        candidate.hiringApproval.reviewedAt
      ) {
        activityList.push({
          id: `${candidate.id}-approval-rejected`,
          type: "approval",
          title: "Hiring approval rejected",
          description: `${candidate.fullName} was not approved for ${jobTitle}.`,
          date: candidate.hiringApproval.reviewedAt,
        });
      }

      if (
        candidate.offer?.status === "Sent" &&
        candidate.offer.sentAt
      ) {
        activityList.push({
          id: `${candidate.id}-offer-sent`,
          type: "offer",
          title: "Offer sent",
          description: `An offer was sent to ${candidate.fullName} for ${jobTitle}.`,
          date: candidate.offer.sentAt,
        });
      }

      if (
        candidate.offer?.status === "Accepted" &&
        candidate.offer.respondedAt
      ) {
        activityList.push({
          id: `${candidate.id}-offer-accepted`,
          type: "offer",
          title: "Offer accepted",
          description: `${candidate.fullName} accepted the offer for ${jobTitle}.`,
          date: candidate.offer.respondedAt,
        });
      }

      if (candidate.hiredAt) {
        activityList.push({
          id: `${candidate.id}-hired`,
          type: "hired",
          title: "Candidate hired",
          description: `${candidate.fullName} was hired for ${jobTitle}.`,
          date: candidate.hiredAt,
        });
      }

      if (candidate.rejection?.date) {
        activityList.push({
          id: `${candidate.id}-rejected`,
          type: "rejected",
          title: "Candidate rejected",
          description: `${candidate.fullName} was rejected from ${jobTitle}.`,
          date: candidate.rejection.date,
        });
      }
    });

    return activityList
      .filter((activity) => {
        const time = new Date(activity.date).getTime();

        return !Number.isNaN(time);
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 6);
  }, [candidates, jobs]);

  /*
   * Build chart data from the actual recent activities.
   */
 const chartData = useMemo(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDateKey = (date: Date) => {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const days = Array.from(
    { length: timeRange },
    (_, index) => {
      const date = new Date(today);

      date.setDate(
        today.getDate() - (timeRange - 1 - index)
      );

      return {
        date: getDateKey(date),
        label: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        total: 0,
        moved: 0,
        approved: 0,
        offers: 0,
        hired: 0,
        rejected: 0,
      };
    }
  );

  const activityList: Activity[] = [];

  candidates.forEach((candidate) => {
    if (candidate.stageUpdatedAt) {
      activityList.push({
        id: `${candidate.id}-stage`,
        type: "stage",
        title: "",
        description: "",
        date: candidate.stageUpdatedAt,
      });
    }

    if (candidate.hiringApproval?.reviewedAt) {
      activityList.push({
        id: `${candidate.id}-approval`,
        type: "approval",
        title: "",
        description: "",
        date: candidate.hiringApproval.reviewedAt,
      });
    }

    if (candidate.offer?.sentAt) {
      activityList.push({
        id: `${candidate.id}-offer`,
        type: "offer",
        title: "",
        description: "",
        date: candidate.offer.sentAt,
      });
    }

    if (candidate.offer?.respondedAt) {
      activityList.push({
        id: `${candidate.id}-offer-response`,
        type: "offer",
        title: "",
        description: "",
        date: candidate.offer.respondedAt,
      });
    }

    if (candidate.hiredAt) {
      activityList.push({
        id: `${candidate.id}-hired`,
        type: "hired",
        title: "",
        description: "",
        date: candidate.hiredAt,
      });
    }

    if (candidate.rejection?.date) {
      activityList.push({
        id: `${candidate.id}-rejected`,
        type: "rejected",
        title: "",
        description: "",
        date: candidate.rejection.date,
      });
    }
  });

  activityList.forEach((activity) => {
    const activityDate = new Date(activity.date);

    if (Number.isNaN(activityDate.getTime())) return;

    const dateKey = getDateKey(activityDate);

    const day = days.find(
      (item) => item.date === dateKey
    );

    if (!day) return;

    day.total += 1;

    switch (activity.type) {
      case "stage":
        day.moved += 1;
        break;

      case "approval":
        day.approved += 1;
        break;

      case "offer":
        day.offers += 1;
        break;

      case "hired":
        day.hired += 1;
        break;

      case "rejected":
        day.rejected += 1;
        break;
    }
  });

  return days;
}, [candidates, timeRange]);

  const totals = useMemo(() => {
    return chartData.reduce(
      (acc, day) => ({
        total: acc.total + day.total,
        moved: acc.moved + day.moved,
        approved: acc.approved + day.approved,
        offers: acc.offers + day.offers,
        hired: acc.hired + day.hired,
        rejected: acc.rejected + day.rejected,
      }),
      {
        total: 0,
        moved: 0,
        approved: 0,
        offers: 0,
        hired: 0,
        rejected: 0,
      }
    );
  }, [chartData]);

  return (
    <section
      className="
        mt-8
        overflow-hidden
        rounded-2xl
      
        bg-white
        p-6
       
        dark:bg-zinc-900
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Recruitment activity across your assigned jobs.
          </p>
        </div>

        <div className="rounded-2xl bg-[#EEF8F3] px-4 py-2.5 dark:bg-[#285A48]/20">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
  Last {timeRange} days
</p>

          <p className="mt-0.5 text-xl font-bold text-[#285A48] dark:text-[#B0E4CC]">
            {totals.total}
          </p>
        </div>
      </div>
      

     
      {/* Activity summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Candidates moved
          </p>

          <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
            {totals.moved}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Approvals
          </p>

          <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
            {totals.approved}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Offers
          </p>

          <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
            {totals.offers}
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Hired
          </p>

          <p className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">
            {totals.hired}
          </p>
        </div>
      </div>

       <div className="mt-6  flex w-fit rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
  {[7, 14, 30].map((days) => (
    <button
      key={days}
      type="button"
      onClick={() =>
        setTimeRange(days as 7 | 14 | 30)
      }
      className={`rounded-lg cursor-pointer px-4 py-2 text-sm font-medium transition ${
        timeRange === days
          ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      }`}
    >
      {days} Days
    </button>
  ))}
</div>


      {/* Chart */}
      {activities.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 p-8 text-center dark:border-white/10">
          <p className="font-medium text-zinc-700 dark:text-zinc-300">
            No recent activity
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Recruitment activity will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 h-[320px] w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="activityGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#408A71"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="100%"
                      stopColor="#408A71"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  strokeDasharray="4 4"
                  className="stroke-zinc-200 dark:stroke-zinc-700"
                />

                <XAxis
  dataKey="label"
  axisLine={false}
  tickLine={false}
  tick={{
    fontSize: 12,
  }}
  className="fill-zinc-400"
  interval={timeRange === 30 ? 4 : 0}
/>

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  width={35}
                  tick={{
                    fontSize: 12,
                  }}
                  className="fill-zinc-400"
                />

                <Tooltip
  cursor={{
    stroke: "#408A71",
    strokeWidth: 1,
    strokeDasharray: "4 4",
  }}
  contentStyle={{
    borderRadius: "16px",
    border: "1px solid #e4e4e7",
    backgroundColor: "#ffffff",
    padding: "12px 14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  }}
  labelStyle={{
    fontWeight: 600,
    marginBottom: 6,
  }}
  formatter={(value, name) => [
    value,
    name === "total"
      ? "Total activity"
      : name,
  ]}
/>

                <Area
                  type="monotone"
                  dataKey="total"
                  name="Activity"
                  stroke="#408A71"
                  strokeWidth={3}
                  fill="url(#activityGradient)"
                  dot={{
                    r: 4,
                    fill: "#408A71",
                    strokeWidth: 2,
                    stroke: "#ffffff",
                  }}
                  activeDot={{
                    r: 7,
                    strokeWidth: 3,
                    stroke: "#ffffff",
                    fill: "#408A71",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart footer */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-zinc-100 pt-5 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#408A71]" />

              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Total activity
              </span>
            </div>

            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700" />

            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {totals.moved} candidates moved
            </span>

            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {totals.approved} approvals
            </span>

            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {totals.offers} offers
            </span>

            <span className="text-xs text-zinc-400 dark:text-zinc-500">
              {totals.hired} hired
            </span>
          </div>
        </>
      )}
    </section>
  );
};

export default RecruiterRecentActivity;