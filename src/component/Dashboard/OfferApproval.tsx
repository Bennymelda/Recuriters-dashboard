import { useState } from "react";
import { useCandidateStore } from "../../store/candidateStore";
import { useAuthStore } from "../../store/authStore";
import MoveStageModal from "../pipeline/MoveStageModal";
import type { Candidate } from "../../types/candidate";
const OfferApprovalRequests = () => {
 const user = useAuthStore((state) => state.user);
 const candidates = useCandidateStore((state) => state.candidates);

 const approveOffer = useCandidateStore(
 (state) => state.approveOffer
 );

 const rejectOffer = useCandidateStore(
 (state) => state.rejectOffer
 );
const sendOffer = useCandidateStore(
 (state) => state.sendOffer
);
 const [selectedCandidate, setSelectedCandidate] =
 useState<Candidate | null>(null);

 const [openMoveModal, setOpenMoveModal] = useState(false);

 // This section should only be visible to HR Managers.
 if (user?.role !== "HR Manager") {
 return null;
 }

 const pendingOfferApprovals = candidates.filter(
 (candidate) =>
 candidate.offer?.status === "Pending HR Approval"
 );

 return (
 <>
 <section className="mt-8">
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
 Offer Approval Requests
 </h2>

 <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
 Review offers waiting for your approval.
 </p>
 </div>

 {pendingOfferApprovals.length > 0 && (
 <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
 {pendingOfferApprovals.length} Pending
 </span>
 )}
 </div>

 {pendingOfferApprovals.length === 0 ? (
 <div className="mt-4 rounded-xl bg-white p-8 text-center shadow-xs dark:bg-zinc-900">
 <p className="font-medium text-zinc-700 dark:text-zinc-300">
 No pending offer approval requests.
 </p>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 New offers from Recruiters will appear here.
 </p>
 </div>
 ) : (
 <div className="mt-4 space-y-3">
 {pendingOfferApprovals.map((candidate) => (
 <div
 key={candidate.id}
 className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between dark:bg-zinc-900"
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
 Created by{" "}
 {candidate.offer?.createdByName ||
 "Recruiter"}
 </p>
 </div>
 </div>

 <button
 onClick={() => {
 setSelectedCandidate(candidate);
 setOpenMoveModal(true);
 }}
 className="rounded-lg bg-[#408A71] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2f6d58]"
 >
 Review Offer
 </button>
 </div>
 ))}
 </div>
 )}
 </section>

 {selectedCandidate && (
 <MoveStageModal
 open={openMoveModal}
 candidate={selectedCandidate}
 onClose={() => {
 setOpenMoveModal(false);
 setSelectedCandidate(null);
 }}
 onMove={() => {}}
 onRequestApproval={() => {}}
 onApproveHiring={() => {}}
 onRejectHiring={() => {}}
 onCreateOffer={() => {}}
 onApproveOffer={(candidateId) => {
 approveOffer(candidateId);
 }}
 onRejectOffer={(candidateId, note) => {
 rejectOffer(candidateId, note);
 }}
 onSendOffer={async (candidateId) => {
 return await sendOffer(candidateId);
}}
 onHireCandidate={() => {}}
 />
 )}
 </>
 );
};

export default OfferApprovalRequests;