import { useMemo } from "react";
import type { Candidate } from "../types/candidate";
import type { Job } from "../types/job";

interface RecruiterUpcomingInterviewsProps {
  candidates: Candidate[];
  jobs: Job[];
  onManageInterview: (candidate: Candidate) => void;
}

const RecruiterUpcomingInterviews = ({
  candidates,
  jobs,
  onManageInterview,
}: RecruiterUpcomingInterviewsProps) => {
  const upcomingInterviews = useMemo(() => {
    const now = new Date();

    const interviews = candidates.flatMap((candidate) => {
      const interviewHistory = candidate.interviewHistory ?? [];

      return interviewHistory
        .filter((interview) => {
          if (interview.result !== "Scheduled") return false;

          const interviewDate = new Date(interview.date);

          return (
            !Number.isNaN(interviewDate.getTime()) &&
            interviewDate >= now
          );
        })
        .map((interview) => ({
          candidate,
          interview,
        }));
    });

    return interviews
      .sort(
        (a, b) =>
          new Date(a.interview.date).getTime() -
          new Date(b.interview.date).getTime()
      )
      .slice(0, 6);
  }, [candidates]);

  const getJobTitle = (jobId: string) => {
    return (
      jobs.find((job) => job.id === jobId)?.title ??
      "Unknown Job"
    );
  };

  const formatDate = (date: string) => {
    const interviewDate = new Date(date);

    if (Number.isNaN(interviewDate.getTime())) {
      return "Date unavailable";
    }

    return interviewDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    const interviewDate = new Date(date);

    if (Number.isNaN(interviewDate.getTime())) {
      return "";
    }

    return interviewDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Upcoming Interviews
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Interviews scheduled for candidates in your assigned jobs.
          </p>
        </div>

        {upcomingInterviews.length > 0 && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            {upcomingInterviews.length} Upcoming
          </span>
        )}
      </div>

      {/* Empty State */}
      {upcomingInterviews.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-zinc-200 p-8 text-center dark:border-white/10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-lg dark:bg-zinc-800">
            📅
          </div>

          <p className="mt-3 font-medium text-zinc-700 dark:text-zinc-300">
            No upcoming interviews
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Scheduled interviews will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/70 dark:border-white/10 dark:bg-zinc-800/40">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Candidate
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Job
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Interview
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Date & Time
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 dark:divide-white/10">
                {upcomingInterviews.map(({ candidate, interview }) => (
                  <tr
                    key={`${candidate.id}-${interview.date}-${interview.stage}`}
                    className="transition hover:bg-zinc-50/70 dark:hover:bg-white/[0.02]"
                  >
                    {/* Candidate */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {candidate.avatar ? (
                          <img
                            src={candidate.avatar}
                            alt={candidate.fullName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                            {getInitials(candidate.fullName)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate font-semibold text-zinc-900 dark:text-white">
                            {candidate.fullName}
                          </p>

                          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                            {candidate.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Job */}
                    <td className="px-5 py-4">
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">
                        {getJobTitle(candidate.jobId)}
                      </p>
                    </td>

                    {/* Interview */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {interview.stage}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {formatDate(interview.date)}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {formatTime(interview.date)}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                        Scheduled
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onManageInterview(candidate)}
                        className="rounded-xl border border-zinc-200 px-3.5 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecruiterUpcomingInterviews;