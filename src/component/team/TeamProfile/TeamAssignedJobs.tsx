import { MdWorkOutline } from "react-icons/md";
import { useCandidateStore } from "../../../store/candidateStore";
import { useJobStore } from "../../../store/jobStore";
import { useTeamStore } from "../../../store/teamStore";
const TeamAssignedJobs = () => {
 const selectedMemberId = useTeamStore(
 (state) => state.selectedMemberId
 );
const candidates = useCandidateStore(
 (state) => state.candidates
);
 const member = useTeamStore((state) =>
 state.members.find((m) => m.id === selectedMemberId)
 );
 




 const jobs = useJobStore((state) => state.jobs);



 if (!member) return null;

 const assignedJobs = jobs.filter((job) =>
 member.assignedJobIds.includes(job.id)
 );


 return (
 <section
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-6
 shadow-sm
 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <div className="mb-6 flex items-center justify-between">

 <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
 Assigned Jobs
 </h2>

 <span className="rounded-full bg-[#EEF8F3] px-3 py-1 text-sm font-semibold text-[#408A71] dark:bg-[#408A71]/20">
 {assignedJobs.length} Jobs
 </span>

 </div>

 {assignedJobs.length === 0 ? (

 <div className="py-12 text-center">

 <MdWorkOutline
 size={48}
 className="mx-auto text-zinc-400"
 />

 <p className="mt-4 text-zinc-500">
 No jobs assigned yet.
 </p>

 </div>

 ) : (

 <div className="space-y-4">

 {assignedJobs.map((job) => {
const applicantsCount = candidates.filter(
 (candidate) => candidate.jobId === job.id
).length;

return(
 <div
 key={job.id}
 className="
 flex
 items-center
 justify-between
 rounded-2xl
 border
 border-zinc-200
 p-4
 dark:border-zinc-700
 "
 >
 <div>

 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {job.title}
 </h3>

 <p className="mt-1 text-sm text-zinc-500">
 {job.department}
 </p>

 </div>

 <div className="text-right">

 <span
 className={`
 rounded-full
 px-3
 py-1
 text-xs
 font-semibold

 ${
 job.status === "Active"
 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
 : job.status === "Draft"
 ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
 : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
 }
 `}
 >
 {job.status}
 </span>

 <p className="mt-2 text-sm text-zinc-500">
 {applicantsCount} Applicants
 </p>

 </div>

 </div>
 )
})}

 </div>

 )}
 </section>
 );
};

export default TeamAssignedJobs;