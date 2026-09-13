import RecruiterMyJobs from "./MyAssignedJobs";
import CandidatesNeedingAttention from "./NeedsAttention";
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
import { useState } from "react";
import MoveStageModal from "../component/pipeline/MoveStageModal";


const RecruiterDashboard = () => {
  const user = useAuthStore((state) => state.user);

  const members = useTeamStore((state) => state.members);
  const jobs = useJobStore((state) => state.jobs);
  const candidates = useCandidateStore((state) => state.candidates);

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
          onSendOffer={async (candidateId) => {
            return await sendOffer(candidateId);
          }}
          onHireCandidate={() => {}}
        />
      )}

      <RecruiterOverview />

      <CandidatesNeedingAttention
        candidates={assignedCandidates}
        jobs={assignedJobs}
        onViewCandidate={(candidate) => {
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

      <RecruiterPendingApprovals
        candidates={assignedCandidates}
        onReviewCandidate={(candidate) => {
          setSelectedCandidate(candidate);
          setOpenMoveModal(true);
        }}
      />

      <RecruiterPipelineSnapshot
        candidates={assignedCandidates}
      />

      <RecruiterRecentActivity
        candidates={assignedCandidates}
        jobs={assignedJobs}
      />

      <RecruiterMyJobs
        jobs={assignedJobs}
        candidates={assignedCandidates}
      />
    </>
  );
};

export default RecruiterDashboard;