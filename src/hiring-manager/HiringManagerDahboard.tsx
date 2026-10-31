
import { useTeamStore } from "../store/teamStore";
import { useJobStore } from "../store/jobStore";
import { useCandidateStore } from "../store/candidateStore";
import { useAuthStore } from "../store/authStore";
import { findCurrentMember, getVisibleJobs, getVisibleCandidates } from "../utils/roleBasedDataFiltering";
import MoveStageModal from "../component/pipeline/MoveStageModal";
import type { Candidate } from "../types/candidate";
import { useState, useEffect } from "react";
import HiringOverview from "./HiringStas";

import HiringApprovalRequests from "./HiringReview";
import UpcomingInterviews from "./UpcomingInterview";
import HiringPipelineSnapshot from "./HiringSnapshot";
import RecentHiringActivity from "./RecentHiringActivity";
import MyAssignedJobs from "./Myjob";




const HiringManagerDashboard = () => {
 const user = useAuthStore((state) => state.user);
 const members = useTeamStore((state) => state.members);
 const jobs = useJobStore((state) => state.jobs);
 const fetchJobs = useJobStore((state) => state.fetchJobs);
 const candidates = useCandidateStore((state) => state.candidates);
 const fetchCandidates = useCandidateStore((state) => state.fetchCandidates);

 useEffect(() => {
  fetchJobs();
  fetchCandidates();
 }, [fetchJobs, fetchCandidates]);

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

const latestSelectedCandidate = selectedCandidate
 ? candidates.find(
 (candidate) => candidate.id === selectedCandidate.id
 ) ?? null
 : null;



 return (
 
<>


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
<HiringOverview />
<div
 className="
 grid
 grid-cols-1
 gap-6
 lg:grid-cols-2
 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]
 items-stretch
"
>
<RecentHiringActivity
 candidates={assignedCandidates}
 jobs={assignedJobs}
/>
<HiringPipelineSnapshot
 candidates={assignedCandidates}
/>
</div>

 <div
 className="
 grid
 grid-cols-1
 gap-6
 lg:grid-cols-2

 items-stretch
"
>
<HiringApprovalRequests
 candidates={assignedCandidates}
 onReview={(candidate) => {
 setSelectedCandidate(candidate);
 setOpenMoveModal(true);
 }}
/>
<UpcomingInterviews
 candidates={assignedCandidates}
 jobs={assignedJobs}
 onViewCandidate={(candidate) => {
 setSelectedCandidate(candidate);
 setOpenMoveModal(true);
 }}
/>

</div>



<MyAssignedJobs
  jobs={assignedJobs}
  candidates={assignedCandidates}
/>

</>
 );
};

export default HiringManagerDashboard;