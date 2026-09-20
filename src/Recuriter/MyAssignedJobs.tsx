import type { Job } from "../types/job";
import type { Candidate } from "../types/candidate";

interface RecruiterMyJobsProps {
  jobs: Job[];
  candidates: Candidate[];
}

const RecruiterMyJobs = ({
  jobs,
  candidates,
}: RecruiterMyJobsProps) => {
  const getCandidateCount = (jobId: string) => {
    return candidates.filter(
      (candidate) => candidate.jobId === jobId
    ).length;
  };

  const getCandidatesInStage = (
    jobId: string,
    stage: Candidate["status"]
  ) => {
    return candidates.filter(
      (candidate) =>
        candidate.jobId === jobId &&
        candidate.status === stage
    ).length;
  };

  return (
    <section className="mt-8 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            My Jobs
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Jobs assigned to you and their current recruitment activity.
          </p>
        </div>

        {jobs.length > 0 && (
          <span className="rounded-full whitespace-nowrap text-amber-800 bg-amber-100 px-3 py-1 text-xs font-semibold  dark:bg-amber-700 dark:text-amber-100">
            {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"}
          </span>
        )}
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center dark:border-white/10 dark:bg-zinc-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-xl dark:bg-zinc-800">
            💼
          </div>

          <p className="mt-4 font-semibold text-zinc-800 dark:text-zinc-200">
            No jobs assigned yet
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Jobs assigned to you will appear here.
          </p>
        </div>
      ) : (
        /* Jobs Table */
        <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-100 bg-white  dark:border-white/5 dark:bg-zinc-900">
          <div className="overflow-x-auto border-t rounded-2xl border-zinc-200 dark:border-zinc-700">
            <table className="w-full min-w-[900px] ">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/70 dark:border-white/10 dark:bg-zinc-800/40">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Job
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Candidates
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Screening
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Interviews
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Hired
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 dark:divide-white/10">
                {jobs.map((job) => {
                  const candidateCount = getCandidateCount(job.id);
                  const screeningCount = getCandidatesInStage(
                    job.id,
                    "Screening"
                  );
                  const interviewCount = getCandidatesInStage(
                    job.id,
                    "Interview"
                  );
                  const hiredCount = getCandidatesInStage(
                    job.id,
                    "Hired"
                  );

                  return (
                    <tr
                      key={job.id}
                      className="transition hover:bg-zinc-50/70 dark:hover:bg-white/[0.02]"
                    >
                      {/* Job */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-white">
                            {job.title}
                          </p>

                          

                          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                            {job.location} · {job.employmentType}
                          </p>
                        </div>
                      </td>

                      {/* Candidates */}
                      <td className="px-6 py-5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#285A48]/10 text-xs font-bold text-[#285A48] dark:bg-[#408A71]/10 dark:text-[#6DB397]">
                          {candidateCount}
                        </span>
                      </td>

                      {/* Screening */}
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {screeningCount}
                        </span>
                      </td>

                      {/* Interviews */}
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {interviewCount}
                        </span>
                      </td>

                      {/* Hired */}
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {hiredCount}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            job.status === "Active"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : job.status === "Draft"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecruiterMyJobs;