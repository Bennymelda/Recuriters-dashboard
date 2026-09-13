import type { Candidate } from "../types/candidate";

interface RecruiterPendingApprovalsProps {
  candidates: Candidate[];
  onReviewCandidate: (candidate: Candidate) => void;
}

const RecruiterPendingApprovals = ({
  candidates,
  onReviewCandidate,
}: RecruiterPendingApprovalsProps) => {
  const pendingHiringManagerApproval = candidates.filter(
    (candidate) =>
      candidate.hiringApproval?.status === "Pending"
  );

  const pendingHRApproval = candidates.filter(
    (candidate) =>
      candidate.offer?.status === "Pending HR Approval"
  );

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const totalPending =
    pendingHiringManagerApproval.length +
    pendingHRApproval.length;

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Pending Approvals
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Track candidates and offers waiting for approval.
          </p>
        </div>

        {totalPending > 0 && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
            {totalPending} Pending
          </span>
        )}
      </div>

      {totalPending === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-zinc-200 bg-white p-10 text-center dark:border-white/10 dark:bg-zinc-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-xl dark:bg-zinc-800">
            ✓
          </div>

          <p className="mt-4 font-semibold text-zinc-800 dark:text-zinc-200">
            No pending approvals
          </p>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            You’re all caught up.
          </p>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* Hiring Manager Approval */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="border-b border-zinc-100 px-5 py-4 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    Hiring Manager Approval
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Candidates waiting for a hiring decision.
                  </p>
                </div>

                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                  {pendingHiringManagerApproval.length}
                </span>
              </div>
            </div>

            {pendingHiringManagerApproval.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No candidates waiting for approval.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100 dark:divide-white/10">
                {pendingHiringManagerApproval
                  .slice(0, 4)
                  .map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center justify-between gap-4 p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {candidate.avatar ? (
                          <img
                            src={candidate.avatar}
                            alt={candidate.fullName}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                            {getInitials(candidate.fullName)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                            {candidate.fullName}
                          </p>

                          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                            {candidate.appliedRole}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onReviewCandidate(candidate)
                        }
                        className="shrink-0 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
                      >
                        View
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* HR Approval */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="border-b border-zinc-100 px-5 py-4 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    HR Approval
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Offers waiting for HR Manager approval.
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                  {pendingHRApproval.length}
                </span>
              </div>
            </div>

            {pendingHRApproval.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No offers waiting for HR approval.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100 dark:divide-white/10">
                {pendingHRApproval
                  .slice(0, 4)
                  .map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center justify-between gap-4 p-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {candidate.avatar ? (
                          <img
                            src={candidate.avatar}
                            alt={candidate.fullName}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                            {getInitials(candidate.fullName)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                            {candidate.fullName}
                          </p>

                          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                            {candidate.appliedRole}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          onReviewCandidate(candidate)
                        }
                        className="shrink-0 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
                      >
                        View
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default RecruiterPendingApprovals;