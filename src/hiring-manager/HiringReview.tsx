import type { Candidate } from "../types/candidate";

interface HiringApprovalRequestsProps {
 candidates: Candidate[];
 onReview: (candidate: Candidate) => void;
}

const HiringApprovalRequests = ({
 candidates,
 onReview,
}: HiringApprovalRequestsProps) => {
 const pendingHiringApprovals = candidates.filter(
 (candidate) =>
 candidate.status === "Interview" &&
 candidate.hiringApproval?.status === "Pending"
 );

 return (
 <section className="mt-8 bg-white dark:bg-zinc-900 rounded-xl p-4">
 {/* Header */}
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
 Hiring Approval Requests
 </h2>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 Candidates waiting for your hiring decision.
 </p>
 </div>

 {pendingHiringApprovals.length > 0 && (
 <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
 {pendingHiringApprovals.length} Pending
 </span>
 )}
 </div>

 {/* Empty state */}
 {pendingHiringApprovals.length === 0 ? (
 <div className="mt-4 rounded-xl bg-white p-8 text-center  dark:bg-zinc-900">
 <p className="font-medium text-zinc-700 dark:text-zinc-300">
 No pending hiring approval requests.
 </p>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 New requests from Recruiters will appear here.
 </p>
 </div>
 ) : (
 <div className="mt-4 space-y-3">
 {pendingHiringApprovals.map((candidate) => (
 <div
 key={candidate.id}
 className="flex flex-col gap-4 rounded-xl border border-zinc-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between dark:bg-zinc-900 dark:border-zinc-800"
 >
 {/* Candidate */}
 <div className="flex items-center gap-4">
 {candidate.avatar ? (
 <img
 src={candidate.avatar}
 alt={candidate.fullName}
 className="h-12 w-12 rounded-full object-cover"
 />
 ) : (
 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
 {candidate.fullName
 .split(" ")
 .map((name) => name[0])
 .join("")
 .slice(0, 2)
 .toUpperCase()}
 </div>
 )}

 <div>
 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 {candidate.appliedRole}
 </p>

 <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
 Requested by{" "}
 {candidate.hiringApproval?.requestedByName ||
 "Recruiter"}
 </p>
 </div>
 </div>

 {/* Review */}
 <button
 type="button"
 onClick={() => onReview(candidate)}
 className="rounded-xl bg-[#285A48] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
 >
 Review Request
 </button>
 </div>
 ))}
 </div>
 )}
 </section>
 );
};

export default HiringApprovalRequests;