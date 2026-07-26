import {
 MdArrowForward,
 MdCheckCircle,
 MdClose,
 MdEvent,
} from "react-icons/md";

import type { Candidate } from "../../../types/candidate";
import { useCandidateStore } from "../../../store/candidateStore";
import { useState } from "react";
import RejectCandidateModal from "../../ui/RejectModalUi";
import MoveStageModal from "../../ui/MoveStageModal";
import InterviewModal from "../../pipeline/ScheduleInterviewModal";
import { useNavigate } from "react-router";
import { useTeamStore } from "../../../store/teamStore";
import { useAuthStore } from "../../../store/authStore";
//import { useAuthStore } from "../../../store/authStore";
interface CandidateActionsProps {
 candidate: Candidate;
}

const CandidateActions = ({
 candidate,
}: CandidateActionsProps) => {
 const moveCandidateStage = useCandidateStore(
 (state) => state.moveCandidateStage
);

const addActivity = useTeamStore((state) => state.addActivity);
const navigate=useNavigate()
const [openInterviewModal, setOpenInterviewModal] = useState(false);
const [openMoveModal, setOpenMoveModal] = useState(false);
const [openRejectModal, setOpenRejectModal] = useState(false);
const rejectCandidate = useCandidateStore(
 (state) => state.rejectCandidate
);
const user = useAuthStore((state) => state.user);
const hasScheduledInterview = candidate.interviewHistory.some(
 (interview) => interview.result === "Scheduled"
);


 return (
 <section className="mt-5 border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">

 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
 Recruiter Actions
 </h2>

 <div className="mt-6 flex flex-col md:flex-row gap-3 ">
 {candidate.status === "Rejected" ? (
 <div
 className="
 mt-6
 rounded-2xl
 border
 border-red-200
 bg-red-50
 p-5
 dark:border-red-500/20
 dark:bg-red-500/10
 "
 >
 <div className="flex items-start gap-3">
 <div className="rounded-xl bg-red-100 p-2 dark:bg-red-500/20">
 <MdClose
 size={20}
 className="text-red-600 dark:text-red-400"
 />
 </div>

 <div>
 <h3 className="font-semibold text-red-700 dark:text-red-400">
 Candidate Rejected
 </h3>

 <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
 This candidate has been rejected and is no longer progressing through
 the hiring process.
 </p>
 </div>
 </div>
 </div>
) : candidate.status === "Hired" ? (
 <div
 className="
 mt-6
 rounded-2xl
 border
 border-emerald-200
 bg-emerald-50
 p-5
 dark:border-emerald-500/20
 dark:bg-emerald-500/10
 "
 >
 <div className="flex items-start gap-3">
 <div className="rounded-xl bg-emerald-100 p-2 dark:bg-emerald-500/20">
 <MdCheckCircle
 size={20}
 className="text-emerald-600 dark:text-emerald-400"
 />
 </div>

 <div>
 <h3 className="font-semibold text-emerald-700 dark:text-emerald-400">
 Candidate Hired
 </h3>

 <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
 This candidate has been successfully hired. No further recruitment
 actions are required.
 </p>
 </div>
 </div>
 </div>
) : (
 <div className="mt-6 flex flex-col gap-3 md:flex-row justify-between">

 <button
 onClick={() => setOpenMoveModal(true)}
 className="
 flex
 w-full
 items-center
 justify-between
 rounded-2xl
 border
 border-[#408A71]/20
 bg-[#EEF8F3]
 px-4
 py-3
 text-sm
 font-semibold
 text-[#408A71]
 transition
 hover:bg-[#408A71]
 hover:text-white
 dark:bg-[#408A71]/15
 dark:text-[#B0E4CC]
 dark:hover:bg-[#408A71]
 dark:hover:text-white
 "
 >
 <span className="flex items-center gap-3">
 <MdArrowForward size={20} />
 Move Stage
 </span>
 </button>


 {candidate.status === "Interview" && (
 <>
 <button
 onClick={() => {
 if (hasScheduledInterview) {
 navigate("/interview");
 } else {
 setOpenInterviewModal(true);
 }
 }}
 className="
 flex
 w-full
 items-center
 gap-3
 rounded-2xl
 border
 border-teal-200
 px-4
 py-3
 text-sm
 font-semibold
 text-[#285248]
 transition
 hover:bg-blue-50
 dark:border-teal-500/20
 dark:text-[#B0E4CC]
 dark:hover:bg-teal-500/10
 "
 >
 <MdEvent size={20} />
 {hasScheduledInterview ? "Manage Interview" : "Schedule Interview"}
 </button>


 <button
 onClick={() => setOpenRejectModal(true)}
 className="
 flex
 w-full
 items-center
 gap-3
 rounded-2xl
 border
 border-zinc-200
 px-4
 py-3
 text-sm
 font-semibold
 text-zinc-700
 transition
 hover:bg-red-50
 hover:text-red-600
 dark:border-zinc-700
 dark:text-zinc-300
 dark:hover:bg-red-900/20
 dark:hover:text-red-400
 "
 >
 <MdClose size={20} />
 Reject Candidate
 </button>

 </>
 )}
 </div>
 )}
 </div>


<MoveStageModal
 open={openMoveModal}
 candidate={candidate}
 onClose={() => setOpenMoveModal(false)}
 onMove={(candidateId, newStatus) => {
  moveCandidateStage(candidateId, newStatus);
  if (candidate.assignedRecruiterId) {
   const action =
    newStatus === "Hired"
     ? "Hired candidate"
     : newStatus === "Rejected"
     ? "Rejected candidate"
     : newStatus === "Offer"
     ? "Moved candidate to Offer"
     : `Moved candidate to ${newStatus}`;

   addActivity(candidate.assignedRecruiterId, {
    action,
     recruiterName: user?.fullName ?? "Unknown",
    target: candidate.fullName,
   });
  }
 }}
/>

<RejectCandidateModal
 open={openRejectModal}
 candidate={candidate}
 onClose={() => setOpenRejectModal(false)}
 onReject={(candidateId, reason, note) => {
  rejectCandidate(candidateId, reason, note);
  if (candidate.assignedRecruiterId) {
   addActivity(candidate.assignedRecruiterId, {
    action: "Rejected candidate",
     recruiterName: user?.fullName ?? "Unknown",
    target: candidate.fullName,
   });
  }
 }}
/>

<InterviewModal
 open={openInterviewModal}
 onClose={() => setOpenInterviewModal(false)}
 candidate={candidate}
 mode="schedule"
/>
</section>
 );
};

export default CandidateActions;