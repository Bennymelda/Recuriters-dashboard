import { useMemo } from "react";
import type { Candidate } from "../types/candidate";
import type { Job } from "../types/job";

interface CandidatesNeedingAttentionProps {
  candidates: Candidate[];
  jobs: Job[];
  onViewCandidate: (candidate: Candidate) => void;
}

const CandidatesNeedingAttention = ({
  candidates,
  jobs,
  onViewCandidate,
}: CandidatesNeedingAttentionProps) => {
  const candidatesNeedingAttention = useMemo(() => {
    return candidates
      .filter((candidate) => {
        // Newly applied candidates need screening
        if (candidate.status === "Applied") {
          return true;
        }

        // Candidates in screening may need recruiter action
        if (candidate.status === "Screening") {
          return true;
        }

        // Candidates waiting for Hiring Manager decision
        if (candidate.hiringApproval?.status === "Pending") {
          return true;
        }

        return false;
      })
      .slice(0, 6);
  }, [candidates]);

  const getJobTitle = (jobId: string) => {
    return (
      jobs.find((job) => job.id === jobId)?.title ??
      "Unknown Job"
    );
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getAttention = (candidate: Candidate) => {
    if (candidate.hiringApproval?.status === "Pending") {
      return {
        label: "Hiring approval",
        className:
          "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      };
    }

    if (candidate.status === "Applied") {
      return {
        label: "Needs screening",
        className:
          "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
      };
    }

    return {
      label: "Needs action",
      className:
        "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
    };
  };

  return (
    <section className="mt-8 ">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Candidates Needing Attention
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Candidates that currently need your recruitment action.
          </p>
        </div>

        {candidatesNeedingAttention.length > 0 && (
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {candidatesNeedingAttention.length}{" "}
            {candidatesNeedingAttention.length === 1
              ? "Candidate"
              : "Candidates"}
          </span>
        )}
      </div>

      {candidatesNeedingAttention.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center dark:border-white/10 dark:bg-zinc-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-xl dark:bg-zinc-800">
            ✓
          </div>

          <p className="mt-4 font-semibold text-zinc-800 dark:text-zinc-200">
            You’re all caught up
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            There are no candidates requiring your attention right now.
          </p>
        </div>
      ) : (
        <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
          <div className="divide-y divide-zinc-100 dark:divide-white/10">
            {candidatesNeedingAttention.map((candidate) => {
              const attention = getAttention(candidate);

              return (
                <div
                  key={candidate.id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-zinc-50/70 dark:hover:bg-white/[0.02] md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    {candidate.avatar ? (
                      <img
                        src={candidate.avatar}
                        alt={candidate.fullName}
                        className="h-11 w-11 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {getInitials(candidate.fullName)}
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-zinc-900 dark:text-white">
                        {candidate.fullName}
                      </h3>

                      <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                        {getJobTitle(candidate.jobId)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <span
                      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${attention.className}`}
                    >
                      {attention.label}
                    </span>

                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {candidate.status}
                    </span>

                    <button
                      type="button"
                      onClick={() => onViewCandidate(candidate)}
                      className="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
                    >
                      View Candidate
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default CandidatesNeedingAttention;