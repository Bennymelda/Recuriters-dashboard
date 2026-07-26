import {
 MdTrendingUp,
 MdWorkOutline,
 MdCheckCircleOutline,
 MdDrafts,
 MdPeopleOutline,
} from "react-icons/md";
import type { Job } from "../../../types/job";
import { useCandidateStore } from "../../../store/candidateStore";
interface JobStatsProps {
 jobs: Job[];
}

const JobStats = ({ jobs }: JobStatsProps) => {
 const activeJobs = jobs.filter((job) => job.status === "Active").length;

 const closedJobs = jobs.filter((job) => job.status === "Closed").length;

 const draftJobs = jobs.filter((job) => job.status === "Draft").length;

 const candidates = useCandidateStore((state) => state.candidates);

const totalApplicants = candidates.length;

 const stats = [
 {
 title: "Active Jobs",
 value: activeJobs,
 subtitle: "Currently hiring",
 icon: <MdWorkOutline size={22} />,
 color:
 "bg-blue-50 text-blue-600 ring-1 ring-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:ring-blue-900/40",
 },
 {
 title: "Closed Jobs",
 value: closedJobs,
 subtitle: "Hiring completed",
 icon: <MdCheckCircleOutline size={22} />,
 color:
 "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200 dark:bg-zinc-800/50 dark:text-zinc-300 dark:ring-zinc-700",
 },
 {
 title: "Draft Jobs",
 value: draftJobs,
 subtitle: "Awaiting publication",
 icon: <MdDrafts size={22} />,
 color:
 "bg-amber-50 text-amber-600 ring-1 ring-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-900/40",
 },
 {
 title: "Applicants",
 value: totalApplicants,
 subtitle: "Across all jobs",
 icon: <MdPeopleOutline size={22} />,
 color:
 "bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100 dark:bg-cyan-950/30 dark:text-cyan-400 dark:ring-cyan-900/40",
 },
];

 return (
 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
 {stats.map((stat) => (
 <div
 key={stat.title}
 className="
 group
 relative
 overflow-hidden
 rounded-xl
 border
 border-zinc-200
 bg-white
 p-4
 md:p-5
 shadow-sm
 transition-all
 duration-300
 ease-out
 hover:-translate-y-1
 hover:border-zinc-300
 hover:shadow-xl
 dark:border-zinc-800
 dark:bg-zinc-900
 dark:hover:border-zinc-700
 "
 >
 {/* decorative glow */}
 <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

 <div className="relative flex items-start justify-between">
 <div>
 <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
 {stat.title}
 </p>

 <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
 {stat.value.toLocaleString()}
 </h2>

 <p className="mt-2 text-xm md:text-sm text-zinc-500 dark:text-zinc-400">
 {stat.subtitle}
 </p>
 </div>

 <div
 className={`rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110 ${stat.color}`}
 >
 {stat.icon}
 </div>
 </div>

 <div className="mt-6 h-px bg-gradient-to-r from-zinc-200 via-zinc-100 to-transparent dark:from-zinc-700 dark:via-zinc-800" />

 <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
 <MdTrendingUp className="text-blue-500" />
 Updated just now
 </div>
 </div>
 ))}
</div>
 );
};

export default JobStats;