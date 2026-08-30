
import { useTeamStore } from "../store/teamStore";
import { useJobStore } from "../store/jobStore";
import { useCandidateStore } from "../store/candidateStore";
import { useAuthStore } from "../store/authStore";

const HiringManagerDashboard = () => {
 const user = useAuthStore((state) => state.user);
 const members = useTeamStore((state) => state.members);
 const jobs = useJobStore((state) => state.jobs);
 const candidates = useCandidateStore((state) => state.candidates);

 // Find the TeamMember belonging to the logged-in user
 const currentMember = members.find(
 (member) =>
 member.email.toLowerCase() === user?.email?.toLowerCase()
 );

 // Jobs assigned to this Hiring Manager
 const assignedJobs = jobs.filter((job) =>
 currentMember?.assignedJobIds.includes(job.id)
 );

 // Candidates belonging to assigned jobs
 const assignedCandidates = candidates.filter((candidate) =>
 currentMember?.assignedJobIds.includes(candidate.jobId)
 );

 const totalCandidates = assignedCandidates.length;

 const interviews = assignedCandidates.reduce(
 (total, candidate) =>
 total + candidate.interviewHistory.length,
 0
 );


console.log("Logged-in user:", user);
console.log("All team members:", members);

console.log("Logged-in user:", user);
console.log("All team members:", members);

 return (
 <div className="min-h-screen bg-zinc-50 p-6 dark:bg-zinc-950">
 <div className="mx-auto max-w-7xl">

 {/* Header */}
 <div className="mb-8">
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Hiring Manager
 </p>

 <h1 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-white">
 Welcome back, {user?.fullName?.split(" ")[0] || "there"} 👋
 </h1>

 <p className="mt-2 text-zinc-500 dark:text-zinc-400">
 Here's what's happening with your hiring process.
 </p>
 </div>

 {/* Stats */}
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

 <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 My Jobs
 </p>

 <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
 {assignedJobs.length}
 </p>
 </div>

 <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Candidates
 </p>

 <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
 {totalCandidates}
 </p>
 </div>

 <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Interviews
 </p>

 <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
 {interviews}
 </p>
 </div>

 </div>

 {/* Assigned Jobs */}
 <section className="mt-8">

 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
 My Jobs
 </h2>

 {assignedJobs.length === 0 ? (
 <div className="mt-4 rounded-2xl bg-white p-8 text-center dark:bg-zinc-900">
 <p className="text-zinc-500 dark:text-zinc-400">
 No jobs have been assigned to you yet.
 </p>
 </div>
 ) : (
 <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

 {assignedJobs.map((job) => (
 <div
 key={job.id}
 className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900"
 >
 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {job.title}
 </h3>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 {job.location}
 </p>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 {job.employmentType}
 </p>

 <div className="mt-4">
 <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
 {candidates.filter(
 (candidate) => candidate.jobId === job.id
 ).length}{" "}
 Candidates
 </span>
 </div>
 </div>
 ))}

 </div>
 )}

 </section>

 </div>
 </div>
 );
};

export default HiringManagerDashboard;