import {
 MdWork,
 MdPeople,
 MdEvent,
 MdTrendingUp,
} from "react-icons/md";
import { useCandidateStore } from "../../../store/candidateStore";
import { useTeamStore } from "../../../store/teamStore";
const TeamMemberStats = () => {
 const selectedMemberId = useTeamStore(
 (state) => state.selectedMemberId
 );
const candidates = useCandidateStore(
 (state) => state.candidates
);
 const member = useTeamStore((state) =>
 state.members.find(
 (member) => member.id === selectedMemberId
 )
 );

 if (!member) return null;
 const assignedJobIds = Array.isArray(member.assignedJobIds)
 ? member.assignedJobIds
 : Array.isArray(member.assignedJobs)
 ? member.assignedJobs
 : [];
console.log("Assigned jobs:", assignedJobIds);

console.log(
 "Matching candidates:",
 candidates.filter(candidate =>
 assignedJobIds.includes(candidate.jobId)
 )
);
 const normalizedAssignedJobIds = new Set(
 assignedJobIds.map((jobId) => jobId.trim().toLowerCase())
 );

 const interviews = candidates.flatMap((candidate) =>
 candidate.interviewHistory.filter(
 (interview) => interview.interviewerId === member.id
 )
);
 const interviewsCount = interviews.length;

const hiresCount = candidates.filter(
 (candidate) =>
 candidate.status === "Hired" &&
 candidate.interviewHistory.some(
 (interview) => interview.interviewerId === member.id
 )
).length;
const activeCandidatesCount = candidates.filter((candidate) => {
 const normalizedCandidateJobId = candidate.jobId?.trim().toLowerCase();
 const normalizedStatus = candidate.status?.trim();

 return (
  Boolean(normalizedCandidateJobId) &&
  normalizedAssignedJobIds.has(normalizedCandidateJobId) &&
  ["Applied", "Screening", "Interview", "Offer"].includes(normalizedStatus ?? "")
 );
}).length;

const activeCandidates = candidates.filter((candidate) => {
 const normalizedCandidateJobId = candidate.jobId?.trim().toLowerCase();

 return (
 Boolean(normalizedCandidateJobId) &&
 normalizedAssignedJobIds.has(normalizedCandidateJobId) &&
 ["Applied", "Screening", "Interview", "Offer"].includes(candidate.status)
 );
});

console.log("Active candidates:", activeCandidates);

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

 <div>

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 {stat.title}
 </p>

 <h2 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
 {stat.value}
 </h2>

 </div>

 <div
 className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
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