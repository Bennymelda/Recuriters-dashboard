import { useMemo } from "react";
import { MdPerson } from "react-icons/md";

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

  return (
    <section
      className="
        mt-8
        rounded-3xl
        bg-white
        p-4
        dark:bg-zinc-900
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Upcoming Interviews
        </h2>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Interviews scheduled with candidates.
        </p>
      </div>

      {/* Interviews */}
      <div className="space-y-4">
        {upcomingInterviews.map(({ candidate, interview }) => {
          const initials = candidate.fullName
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={`${candidate.id}-${interview.date}-${interview.stage}`}
              className="
                flex
                mt-4
                border-l-5
                items-center
                justify-between
                rounded-2xl
                
                border-purple-500
                p-2
                transition
                shadow-sm
                dark:border-zinc-700
              "
            >
              {/* Candidate information */}
              <div className="flex min-w-0 items-center gap-4">
                {candidate.avatar ? (
                  <img
                    src={candidate.avatar}
                    alt={candidate.fullName}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-zinc-900 dark:text-white">
                    {candidate.fullName}
                  </h3>

                  <p className="truncate text-sm text-zinc-500 dark:text-gray-300">
                    {getJobTitle(candidate.jobId)}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-gray-300">
                    <MdPerson size={15} />

                    <span>
                      {interview.interviewerName || "Interviewer"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Date + Action */}
              <div className="ml-4 flex shrink-0 items-center gap-3">
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    whitespace-nowrap
                    rounded-3xl
                    bg-gray-100
                    px-3
                    py-1
                    dark:bg-[#285A48]/20
                  "
                >
                  <p className="text-xs text-zinc-500 dark:text-gray-200">
                    {new Date(
                      interview.date
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    •
                  </span>

                  <p className="text-xs text-zinc-500 dark:text-gray-200">
                    {new Date(
                      interview.date
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                
              </div>
              <button
                  type="button"
                  onClick={() => onManageInterview(candidate)}
                  className="
                    rounded-xl
                    border
                    border-zinc-200
                    px-2
                    py-1
                    text-xs
                    ml-2
                    font-semibold
                    text-zinc-700
                    transition
                    hover:bg-zinc-50
                    dark:border-zinc-700
                    dark:text-zinc-300
                    dark:hover:bg-zinc-800
                  "
                >
                  Manage
                </button>
            </div>
          );
        })}

        {/* Empty State */}
        {upcomingInterviews.length === 0 && (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-zinc-300
              p-6
              text-center
              text-sm
              text-zinc-500
              dark:border-zinc-700
            "
          >
            No upcoming interviews.
          </div>
        )}
      </div>
    </section>
  );
};

export default RecruiterUpcomingInterviews;