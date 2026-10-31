import RecruiterMyJobs from "./MyAssignedJobs";

import RecruiterPendingApprovals from "./RecruiterPendingApproval";
import RecruiterPipelineSnapshot from "./RecuriterPipelineSnapshot";
import RecruiterRecentActivity from "./RecuriterRecentActivity";
import RecruiterOverview from "./RecuriterStats";
import RecruiterUpcomingInterviews from "./UpcomingInterview";
import { useTeamStore } from "../store/teamStore";
import { useJobStore } from "../store/jobStore";
import { useCandidateStore } from "../store/candidateStore";
import { useAuthStore } from "../store/authStore";
import { findCurrentMember, getVisibleJobs, getVisibleCandidates } from "../utils/roleBasedDataFiltering";

import type { Candidate } from "../types/candidate";
import { useState, useEffect } from "react";
import MoveStageModal from "../component/pipeline/MoveStageModal";


const RecruiterDashboard = () => {
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

  const approveHiring = useCandidateStore(
    (state) => state.approveHiring
  );

  const rejectHiring = useCandidateStore(
    (state) => state.rejectHiring
  );

  const sendOffer = useCandidateStore(
    (state) => state.sendOffer
  );

  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate | null>(null);

  const [openMoveModal, setOpenMoveModal] = useState(false);

  const currentMember = findCurrentMember(members, user);

  const assignedJobs = getVisibleJobs(
    jobs,
    user,
    currentMember
  );

  const assignedCandidates = getVisibleCandidates(
    candidates,
    user,
    currentMember
  );

  const latestSelectedCandidate = selectedCandidate
    ? candidates.find(
        (candidate) => candidate.id === selectedCandidate.id
      ) ?? null
    : null;

  return (
    <>
    <button
 onClick={() => {
 useAuthStore.getState().setRole("Admin");
 window.location.reload();
 }}
>
 Test as Admin
</button>

<button
 onClick={() => {
 useAuthStore.getState().setRole("HR Manager");
 window.location.reload();
 }}
>
 Test as HR Manager
</button>

<button
 onClick={() => {
 useAuthStore.getState().setRole("Recruiter");
 window.location.reload();
 }}
>
 Test as Recruiter
</button>

<button
 onClick={() => {
 useAuthStore.getState().setRole("Hiring Manager");
 window.location.reload();
 }}
>
 Test as Hiring Manager
</button>
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
          onApproveOffer={() => {}}
          onRejectOffer={() => {}}
       
    onCreateOffer={() => {}}
          onSendOffer={async (candidateId) => {
            return await sendOffer(candidateId);
          }}
          onHireCandidate={() => {}}
        />
      )}

      <RecruiterOverview />

      <div
  className="
 grid
 grid-cols-1
 gap-6
 lg:grid-cols-2

 items-stretch
"
>
 <RecruiterRecentActivity
        candidates={assignedCandidates}
        jobs={assignedJobs}
      />
<RecruiterPipelineSnapshot
        candidates={assignedCandidates}
      />
</div>
{/*
      <CandidatesNeedingAttention
        candidates={assignedCandidates}
        jobs={assignedJobs}
        onViewCandidate={(candidate) => {
          setSelectedCandidate(candidate);
          setOpenMoveModal(true);
        }}
      />
      */}

     

      

      <div
 className="
 grid
 grid-cols-1
 gap-6
 lg:grid-cols-2

 items-stretch
"
>
<RecruiterPendingApprovals
        candidates={assignedCandidates}
        onReviewCandidate={(candidate) => {
          setSelectedCandidate(candidate);
          setOpenMoveModal(true);
        }}
      />

 <RecruiterUpcomingInterviews
        candidates={assignedCandidates}
        jobs={assignedJobs}
        onManageInterview={(candidate) => {
          setSelectedCandidate(candidate);
          setOpenMoveModal(true);
        }}
      />
     
      
</div>

      

      

      <RecruiterMyJobs
        jobs={assignedJobs}
        candidates={assignedCandidates}
      />
    </>
  );
};

export default RecruiterDashboard;