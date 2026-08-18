import { useMemo } from "react";

import { useJobStore } from "../../../store/jobStore";
import { useCandidateStore } from "../../../store/candidateStore";

const JobsPerformance = () => {
 const jobs = useJobStore((state) => state.jobs);
 const candidates = useCandidateStore((state) => state.candidates);

 const performance = useMemo(() => {
 return jobs.map((job) => {
 const jobCandidates = candidates.filter(
 (candidate) => candidate.jobId === job.id
 );

 const applications = jobCandidates.length;

 const interviews = jobCandidates.filter(
 (candidate) => candidate.status === "Interview"
 ).length;

 const hires = jobCandidates.filter(
 (candidate) => candidate.status === "Hired"
 ).length;

 const hiringRate =
 applications > 0
 ? ((hires / applications) * 100).toFixed(1)
 : "0.0";

 return {
 id: job.id,
 title: job.title,
 department: job.department,
 applications,
 interviews,
 hires,
 hiringRate,
 status: job.status,
 };
 });
 }, [jobs, candidates]);

 return (
 <section
 className="
 rounded-2xl
 
 bg-white
 p-6

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Header */}
 <div className="mb-6">
 <h2
 className="
 text-lg
 font-bold
 text-zinc-900
 dark:text-white
 "
 >
 Jobs Performance
 </h2>

 <p
 className="
 mt-1
 text-sm
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Compare how each job is performing throughout the
 hiring process.
 </p>
 </div>

 {/* Table */}
 <div className="overflow-x-auto">
 <table className="w-full min-w-[750px]">
 <thead>
 <tr
 className="
 border-b
 border-zinc-200
 text-left

 dark:border-zinc-800
 "
 >
 <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
 Job
 </th>

 <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
 Applications
 </th>

 <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
 Interviews
 </th>

 <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
 Hires
 </th>

 <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
 Hiring Rate
 </th>

 <th className="pb-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
 Status
 </th>
 </tr>
 </thead>

 <tbody>
 {performance.map((job) => (
 <tr
 key={job.id}
 className="
 border-b
 border-zinc-100
 transition
 hover:bg-zinc-50

 dark:border-zinc-800
 dark:hover:bg-zinc-800/50
 "
 >
 {/* Job */}
 <td className="py-4">
 <div>
 <p className="font-semibold text-zinc-900 dark:text-white">
 {job.title}
 </p>

 <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
 {job.department}
 </p>
 </div>
 </td>

 {/* Applications */}
 <td className="py-4">
 <span className="font-semibold text-zinc-800 dark:text-zinc-200">
 {job.applications}
 </span>
 </td>

 {/* Interviews */}
 <td className="py-4">
 <span className="font-semibold text-zinc-800 dark:text-zinc-200">
 {job.interviews}
 </span>
 </td>

 {/* Hires */}
 <td className="py-4">
 <span className="font-semibold text-emerald-600 dark:text-emerald-400">
 {job.hires}
 </span>
 </td>

 {/* Hiring Rate */}
 <td className="py-4">
 <span className="font-semibold text-[#408A71] dark:text-[#B0E4CC]">
 {job.hiringRate}%
 </span>
 </td>

 {/* Status */}
 <td className="py-4">
 <span
 className={`
 inline-flex
 rounded-full
 px-3
 py-1
 text-xs
 font-semibold

 ${
 job.status === "Active"
 ? "bg-[#EEF8F3] text-[#408A71] dark:bg-[#408A71]/20 dark:text-[#B0E4CC]"
 : job.status === "Draft"
 ? "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300"
 : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
 }
 `}
 >
 {job.status}
 </span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 {/* Empty state */}
 {performance.length === 0 && (
 <div
 className="
 flex
 h-40
 items-center
 justify-center
 text-sm
 text-zinc-500
 dark:text-zinc-400
 "
 >
 No jobs available yet.
 </div>
 )}
 </section>
 );
};

export default JobsPerformance;