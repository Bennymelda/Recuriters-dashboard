
import { useTeamStore } from "../store/teamStore";
import { useJobStore } from "../store/jobStore";
import { useCandidateStore } from "../store/candidateStore";
import { useAuthStore } from "../store/authStore";
import { findCurrentMember, getVisibleJobs, getVisibleCandidates } from "../utils/roleBasedDataFiltering";
import MoveStageModal from "../component/pipeline/MoveStageModal";
import type { Candidate } from "../types/candidate";
import { useState } from "react";




const HiringManagerDashboard = () => {
 const user = useAuthStore((state) => state.user);
 const members = useTeamStore((state) => state.members);
 const jobs = useJobStore((state) => state.jobs);
 const candidates = useCandidateStore((state) => state.candidates);
const [selectedCandidate, setSelectedCandidate] =
 useState<Candidate | null>(null);
const createOffer = useCandidateStore(
 (state) => state.createOffer
);
const [openMoveModal, setOpenMoveModal] = useState(false);
 // Find current team member (matches both email AND companyId)
 const currentMember = findCurrentMember(members, user);
const approveHiring = useCandidateStore(
 (state) => state.approveHiring
);

const rejectHiring = useCandidateStore(
 (state) => state.rejectHiring
);
const sendOffer = useCandidateStore(
 (state) => state.sendOffer
);
 // Get visible jobs (all for Admin, only assigned for Hiring Manager)
 const assignedJobs = getVisibleJobs(jobs, user, currentMember);

 // Get visible candidates (all for Admin, only assigned for Hiring Manager)
 const assignedCandidates = getVisibleCandidates(candidates, user, currentMember);

 const totalCandidates = assignedCandidates.length;

const pendingHiringApprovals = assignedCandidates.filter(
 (candidate) => candidate.hiringApproval?.status === "Pending"
);
const latestSelectedCandidate = selectedCandidate
 ? candidates.find(
 (candidate) => candidate.id === selectedCandidate.id
 ) ?? null
 : null;
 const interviews = assignedCandidates.reduce(
 (total, candidate) =>
 total + candidate.interviewHistory.length,
 0
 );

 console.log("Logged-in user:", user);
 console.log("Current team member:", currentMember);
 const assignedJobIds = currentMember?.assignedJobIds ?? [];
 console.log("Assigned job IDs:", assignedJobIds);
 console.log("All jobs:", jobs);
 console.log("Visible jobs:", assignedJobs);
 console.log("All candidates:", candidates);
 console.log("Visible candidates:", assignedCandidates);

 return (
 <div className="min-h-screen bg-zinc-50 p-6 dark:bg-zinc-950">
 <div className="mx-auto max-w-7xl">
  <button
     onClick={() => {
     useAuthStore.getState().setRole("Recruiter");
     window.location.reload();
     }}
    >
     Test as Hiring Manager
    </button>
 {/* Header */}
 <div className="mb-8">
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Hiring Manager
 </p>

 <h1 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-white">
 Welcome back, {user?.fullName?.split(" ")[0] || "there"} 👋
 </h1>

 <p className="mt-2 text-zinc-500 dark:text-zinc-400">
 Here's what's happening with your hiring process.
 </p>
 </div>

 {/* Stats */}
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

 <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 My Jobs
 </p>

 <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
 {assignedJobs.length}
 </p>
 </div>

 <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Candidates
 </p>

 <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
 {totalCandidates}
 </p>
 </div>

 <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Interviews
 </p>

 <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
 {interviews}
 </p>
 </div>

 </div>



{/* Hiring Approval Requests */}
<section className="mt-8">
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

 {pendingHiringApprovals.length === 0 ? (
 <div className="mt-4 rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-zinc-900">
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
 className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:bg-zinc-900"
 >
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

 <button
 onClick={() => {
 setSelectedCandidate(candidate);
 setOpenMoveModal(true);
 }}
 className="rounded-xl bg-[#285A48] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
 >
 Review Request
 </button>
 </div>
 ))}
 </div>
 )}
</section>


 {/* Assigned Jobs */}
 <section className="mt-8">

 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
 My Jobs
 </h2>

 {assignedJobs.length === 0 ? (
 <div className="mt-4 rounded-2xl bg-white p-8 text-center dark:bg-zinc-900">
 <p className="text-zinc-500 dark:text-zinc-400">
 No jobs have been assigned to you yet.
 </p>
 </div>
 ) : (
 <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

 {assignedJobs.map((job) => (
 <div
 key={job.id}
 className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900"
 >
 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {job.title}
 </h3>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 {job.location}
 </p>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 {job.employmentType}
 </p>

 <div className="mt-4">
 <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
 {assignedCandidates.filter(
 (candidate) => candidate.jobId === job.id
 ).length}{" "}
 Candidates
 </span>
 </div>
 </div>
 ))}

 </div>
 )}

 </section>

 </div>



{latestSelectedCandidate && (
 <MoveStageModal
 open={openMoveModal}
 candidate={latestSelectedCandidate}
 onClose={() => {
 setOpenMoveModal(false);
 setSelectedCandidate(null);
 }}
 onMove={() => {}}
 onRequestApproval={() => {}}

 onApproveHiring={(candidateId) => {
 approveHiring(candidateId);
 }}

 onRejectHiring={(candidateId, note) => {
 rejectHiring(candidateId, note);
 }}
onCreateOffer={(candidateId, salary, startDate, employmentType, description,) => {
console.log("PARENT OFFER DATA:", {
 candidateId,
 salary,
 startDate,
 employmentType,
 description,
 });

 createOffer(candidateId, salary, startDate, employmentType, description,);
}}



 onApproveOffer={() => {}}
 onRejectOffer={() => {}}
 onSendOffer={async (candidateId) => {
 return await
  sendOffer(candidateId);
}}
 onHireCandidate={() => {}}
 />
)}

 </div>
 );
};

export default HiringManagerDashboard;