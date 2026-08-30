import {
 MdWork,
 MdPeople,
 MdEvent,
 MdTrendingUp,
} from "react-icons/md";

import { useCandidateStore } from "../../../store/candidateStore";
import { useTeamStore } from "../../../store/teamStore";

const TeamMemberStats = () => {
 // ---------------------------------------------
 // Selected member
 // ---------------------------------------------

 const selectedMemberId = useTeamStore(
 (state) => state.selectedMemberId
 );

 // ---------------------------------------------
 // Team member
 // ---------------------------------------------

 const member = useTeamStore((state) =>
 state.members.find(
 (teamMember) =>
 teamMember.id === selectedMemberId
 )
 );

 // ---------------------------------------------
 // Candidates
 // ---------------------------------------------

 const candidates = useCandidateStore(
 (state) => state.candidates
 );

 if (!member) return null;

 // ---------------------------------------------
 // Assigned jobs
 // ---------------------------------------------

 const assignedJobIds = Array.isArray(
 member.assignedJobIds
 )
 ? member.assignedJobIds
 : [];

 const normalizedAssignedJobIds = new Set(
 assignedJobIds
 .map((jobId) =>
 jobId.trim().toLowerCase()
 )
 .filter(Boolean)
 );

 // ---------------------------------------------
 // Active candidates
 // ---------------------------------------------

 const activeCandidateStatuses = [
 "Applied",
 "Screening",
 "Interview",
 "Offer",
 ];

 const activeCandidatesCount =
 candidates.filter((candidate) => {
 const candidateJobId =
 candidate.jobId
 ?.trim()
 .toLowerCase();

 return (
 Boolean(candidateJobId) &&
 normalizedAssignedJobIds.has(
 candidateJobId
 ) &&
 activeCandidateStatuses.includes(
 candidate.status
 )
 );
 }).length;

 // ---------------------------------------------
 // Interviews
 // ---------------------------------------------

 const interviews = candidates.flatMap(
 (candidate) =>
 candidate.interviewHistory.filter(
 (interview) =>
 interview.interviewerId ===
 member.id
 )
 );

 const interviewsCount =
 interviews.length;

 // ---------------------------------------------
 // Successful hires
 // ---------------------------------------------
 //
 // IMPORTANT:
 // We currently don't have hiredById on Candidate.
 //
 // Therefore we cannot reliably say that this
 // particular team member hired the candidate.
 //
 // We use the member's existing successfulHires
 // value for now.
 //
 // Later, when Candidate gets hiredById, this
 // should be calculated directly from candidates.
 // ---------------------------------------------

 const hiresCount =
 member.successfulHires ?? 0;

 // ---------------------------------------------
 // Stats
 // ---------------------------------------------

 const stats = [
 {
 title: "Assigned Jobs",

 value: assignedJobIds.length,

 icon: <MdWork size={28} />,

 color:
 "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
 },

 {
 title: "Active Candidates",

 value: activeCandidatesCount,

 icon: <MdPeople size={28} />,

 color:
 "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
 },

 {
 title: "Interviews",

 value: interviewsCount,

 icon: <MdEvent size={28} />,

 color:
 "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
 },

 {
 title: "Successful Hires",

 value: hiresCount,

 icon: <MdTrendingUp size={28} />,

 color:
 "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300",
 },
 ];

 // ---------------------------------------------
 // Render
 // ---------------------------------------------

 return (
 <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
 {stats.map((stat) => (
 <div
 key={stat.title}
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-6
 shadow-sm
 transition
 hover:-translate-y-1
 hover:shadow-lg
 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <div className="flex items-center justify-between">
 {/* Stat information */}

 <div>
 <p
 className="
 text-sm
 text-zinc-500
 dark:text-zinc-400
 "
 >
 {stat.title}
 </p>

 <h2
 className="
 mt-3
 text-3xl
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 {stat.value}
 </h2>
 </div>

 {/* Icon */}

 <div
 className={`
 flex
 h-14
 w-14
 items-center
 justify-center
 rounded-2xl
 ${stat.color}
 `}
 >
 {stat.icon}
 </div>
 </div>
 </div>
 ))}
 </section>
 );
};

export default TeamMemberStats;