

import { useState } from "react";
import {
 MdMoreHoriz,
 MdLocationOn,
 MdCalendarToday,
 MdPerson,
 MdSwapHoriz,
 MdEvent,
 MdClose,
} from "react-icons/md"
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Candidate } from "../../types/candidate";
import { useNavigate } from "react-router";
import { useCandidateStore } from "../../store/candidateStore";
//import RejectCandidateModal from "./RejectCandidateModal";
import RejectCandidateModal from "../ui/RejectModalUi";
import InterviewModal from "./ScheduleInterviewModal";
import MoveStageModal from "../ui/MoveStageModal";
import { useTeamStore } from "../../store/teamStore";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";
interface PipelineCardProps {
 candidate: Candidate;
 isOverlay?:boolean;
}

const PipelineCard = ({
 candidate,
 isOverlay = false,
}: PipelineCardProps) => {
const navigate = useNavigate();
const [openInterviewModal, setOpenInterviewModal] =
 useState(false);
const addActivity = useTeamStore(
 (state) => state.addActivity
);
const [openMenu, setOpenMenu] = useState(false);
const addNotification = useNotificationStore(
 (state) => state.addNotification
);
const rejectCandidate = useCandidateStore(
 (state) => state.rejectCandidate
);

const [openRejectModal, setOpenRejectModal] = useState(false);

const draggable = useDraggable({
 id: candidate.id,
 data: {
 candidate,
 },
});

const {
 attributes,
 listeners,
 setNodeRef,
 transform,
 isDragging,
} = draggable;


const style = {
 transform: transform ? CSS.Transform.toString(transform) : undefined,
 opacity: isDragging && !isOverlay ? 0 : undefined,
 transition: isDragging && !isOverlay ? "none" : undefined,
};

const scheduledInterview = candidate.interviewHistory.find(
 (interview) => interview.result === "Scheduled"
);

const showInterviewBadge =
 candidate.status === "Interview" && Boolean(scheduledInterview);
const hasScheduledInterview = candidate.interviewHistory.some(
 (interview) => interview.result === "Scheduled"
);
const moveCandidateStage = useCandidateStore(
 (state) => state.moveCandidateStage
);

const [openMoveModal, setOpenMoveModal] = useState(false);

const latestPassedInterview = [...candidate.interviewHistory]
 .reverse()
 .find((interview) => interview.result === "Passed");


let nextStep: string | null = null;

if (candidate.status === "Interview" && latestPassedInterview) {
 switch (latestPassedInterview.stage) {
 case "Screening":
 nextStep = "Ready for Technical Interview";
 break;

 case "Technical":
 nextStep = "Ready for HR Interview";
 break;

 case "HR":
 nextStep = "Ready for Final Interview";
 break;

 case "Final":
 nextStep = "Ready for Offer";
 break;
 }
}
const updateMember = useTeamStore((state) => state.updateMember);
const user = useAuthStore((state) => state.user);
const selectedMemberId = useTeamStore(
 (state) => state.selectedMemberId
);

const member = useTeamStore((state) =>
 state.members.find((m) => m.id === selectedMemberId)
);


 return (
  <>
   <article
 ref={isOverlay ? undefined : setNodeRef}
 style={isOverlay ? undefined : style}
 {...(!isOverlay ? attributes : {})}
 {...(!isOverlay ? listeners : {})}
 className={`
 group
 w-full
 min-w-0

 rounded-3xl

 border
 border-zinc-200

 bg-white

 p-5

 shadow-sm

 transition-all
 duration-300

 hover:-translate-y-1
 hover:shadow-xl
cursor-grabbing
 active:cursor-grab

 dark:border-zinc-700
 dark:bg-zinc-900

 ${
 isDragging && !isOverlay
 ? "pointer-events-none opacity-0 shadow-2xl"
 : ""
 }

 `}
>
 {/* Top */}

 <div className="flex items-start justify-between gap-3">

 <div className="flex items-center gap-3">

 <div className="
relative
">

<img
src={
candidate.avatar ||
`https://ui-avatars.com/api/?name=${candidate.fullName}`
}
alt={candidate.fullName}
className="
h-12
w-12
rounded-full
object-cover
border
border-[#408A71]/30
"
/>

<div className="
absolute
bottom-0
right-0
h-3
w-3
rounded-full
bg-emerald-500
ring-2
ring-white
dark:ring-zinc-900
"/>
</div>

 <div className="min-w-0 flex-1">

 <h3 className="truncate font-semibold text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
 {candidate.appliedRole}
 </p>

 </div>

 </div>

 <div className="relative">

 <button
  onPointerDown={(e) => e.stopPropagation()}
  onMouseDown={(e) => e.stopPropagation()}
  onClick={(e) => {
 e.stopPropagation();
 setOpenMenu((prev) => !prev);
 }}
 className="
 rounded-xl
 p-2
 transition
 hover:bg-zinc-100
 cursor-pointer
 dark:hover:bg-zinc-700
 "
 >
 <MdMoreHoriz size={20} />
 </button>

 {openMenu && (
 <div
 onPointerDown={(e) => e.stopPropagation()}
 onClick={(e) => e.stopPropagation()}
 className="
 absolute
 right-0
 top-12
 z-20
 w-52
 md:w-56
 rounded-2xl
 border
 border-zinc-200
 bg-white
 p-2
 shadow-xl
 dark:border-zinc-700
 dark:bg-zinc-800
 "
 >

 <button
 onClick={() => {
 navigate(`/candidates/${candidate.id}`);
 setOpenMenu(false);
 }}
 className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
>
 <MdPerson size={18} />
 View Profile
</button>

 <button
 onClick={() => {
 setOpenMenu(false);
 setOpenMoveModal(true);
 }}
 className="flex cursor-pointer w-full items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
>
 <MdSwapHoriz size={18} />
 Move Stage
 </button>


{candidate.status === "Interview" && (
 <button
 onClick={() => {
 setOpenMenu(false);

 if (hasScheduledInterview) {
 // We'll replace this with navigation later
 navigate('/interview');
 } else {
 setOpenInterviewModal(true);
 }
 }}
 className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
 >
 <MdEvent size={18} />
 {hasScheduledInterview ? "Manage Interview" : "Schedule Interview"}
 </button>
)}
 

 <hr className="my-2 border-zinc-200 dark:border-zinc-700" />

 <button
 onClick={() => {
 setOpenMenu(false);
 setOpenRejectModal(true);
}}
 className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-500/10"
>
 <MdClose size={18} />
 Reject Candidate
</button>

 </div>
 )}

</div>

 </div>

 {/* Details */}

 <div className="mt-5 mb-5 space-y-4 w-fit">


<div className="
flex
items-center
gap-2
rounded-xl


text-sm
text-zinc-600

dark:bg-zinc-800
dark:text-zinc-300
">

<MdLocationOn size={17}/>

{candidate.location}

</div>






</div>

{showInterviewBadge && scheduledInterview && (

<div
className="
mt-5
rounded-2xl

border
border-[#408A71]/20

bg-[#EEF8F3]

p-4

transition-all
duration-300

hover:border-[#408A71]/40

dark:border-[#B0E4CC]/20
dark:bg-[#285A48]/10
"
>

<div className="flex items-start gap-3">


<div
className="
flex
h-10
w-10
shrink-0
items-center
justify-center

rounded-xl

bg-[#408A71]

text-white

dark:bg-[#B0E4CC]
dark:text-[#285A48]
"
>
<MdEvent size={18}/>
</div>



<div>

<p
className="
text-sm
font-semibold

text-[#285A48]

dark:text-[#B0E4CC]
"
>
Interview Scheduled
</p>


<p
className="
mt-1

text-xs

text-zinc-600

dark:text-zinc-300
"
>
{scheduledInterview.stage}
{" • "}
{
new Date(scheduledInterview.date)
.toLocaleDateString("en-US",{
month:"short",
day:"numeric"
})
}
</p>


</div>


</div>

</div>

)}

{nextStep && !showInterviewBadge && (

<div
className="
mt-8
rounded-2xl





transition-all
duration-300

hover:border-[#285A48]/40

dark:border-[#B0E4CC]/20
dark:bg-[#285A48]/10
"
>

<div className="flex items-start gap-3">


<div
className="
flex
h-10
w-10
shrink-0
items-center
justify-center

rounded-xl

bg-[#285A48]

text-white

dark:bg-[#B0E4CC]
dark:text-[#285A48]
"
>
<MdEvent size={18}/>
</div>


<div className="min-w-0">


<p
className="
text-sm
font-semibold

text-[#285A48]

dark:text-[#B0E4CC]
"
>
{latestPassedInterview?.stage} Interview Passed
</p>


<p
className="
mt-1

text-xs
leading-5

text-zinc-600

dark:text-zinc-300
"
>
{nextStep}
</p>


</div>


</div>

</div>

)}
 {/* Footer */}

 <div
className="
mt-6
flex
items-center
justify-between

border-t
border-zinc-200

pt-4

dark:border-zinc-700
"
>

<div
className="
flex
items-center
gap-2
text-xs
text-zinc-500
dark:text-zinc-400
"
>

<MdCalendarToday size={15}/>

{
new Date(candidate.createdAt)
.toLocaleDateString("en-US",{
month:"short",
day:"numeric"
})
}

</div>


<div className="flex flex-wrap gap-2">


<span
className="
rounded-full
bg-[#EEF8F3]
px-3
py-1.5
text-xs
font-semibold
text-[#285A48]

dark:bg-[#285A48]/20
dark:text-[#B0E4CC]
"
>
{candidate.experience}
</span>


<span
className="
rounded-full
bg-zinc-100
px-3
py-1.5
text-xs
font-semibold
text-zinc-600

dark:bg-zinc-800
dark:text-zinc-300
"
>
{candidate.yearsOfExperience} yrs
</span>


</div>


</div>

 
 </article>

 <InterviewModal
 open={openInterviewModal}
 onClose={() => setOpenInterviewModal(false)}
 candidate={candidate}
 mode="schedule"
/>

<MoveStageModal
 open={openMoveModal}
 candidate={candidate}
 onClose={() => setOpenMoveModal(false)}
 onMove={(candidateId, newStatus) => {

 console.log("MOVE FIRED", candidateId, newStatus);

 moveCandidateStage(candidateId, newStatus);

 console.log("BEFORE NOTIFICATION");

 addNotification({
 title: "Candidate Updated",
 message: `${candidate.fullName} moved to ${newStatus}.`,
 type: "candidate",
 });

 console.log("AFTER NOTIFICATION");


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

 if (member) {
 updateMember({
 ...member,
 lastActive: new Date().toISOString(),
 });

 
 }
 if(!user) return
 if (candidate.assignedRecruiterId) {
 addActivity(candidate.assignedRecruiterId, {
 id: crypto.randomUUID(),
 action: "Rejected candidate",
 recruiterName:user.fullName,
 target: candidate.fullName,
 date: new Date().toISOString(),
 });
}
}}
/>
</>
 );
};

export default PipelineCard;