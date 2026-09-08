import { useAuthStore } from "../../store/authStore";
import { useTeamStore } from "../../store/teamStore";
import { useCandidateStore } from "../../store/candidateStore";

import PipelineHeader from "./PipelineHeader";
import PipelineStats from "./PipelineStats";
import PipelineBoard from "./PipelineBoard";
import { findCurrentMember, getVisibleCandidates } from "../../utils/roleBasedDataFiltering";

const PipelinePage = () => {
const user = useAuthStore((state) => state.user);

const members = useTeamStore((state) => state.members);

const candidates = useCandidateStore(
(state) => state.candidates
);

// Find current team member (matches both email AND companyId)
const currentMember = findCurrentMember(members, user);

// Get visible candidates based on role and assigned jobs
const visibleCandidates = getVisibleCandidates(candidates, user, currentMember);

return (
<div className="flex h-full flex-col gap-6 overflow-hidden">
<div className="flex-none space-y-6">
<PipelineHeader />

 <PipelineStats
 candidates={visibleCandidates}
 />
 </div>

 <div className="min-h-0 flex-1 overflow-auto">
 <PipelineBoard
 candidates={visibleCandidates}
 />
 </div>
</div>

);
};

export default PipelinePage;