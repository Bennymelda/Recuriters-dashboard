import JobCard from "./JobsCard";
import type { Job } from "../../../types/job";

interface JobsGridProps {
 jobs: Job[];
 onEdit: (job: Job) => void;
}

const JobsGrid = ({ jobs, onEdit }: JobsGridProps) => {
 if (jobs.length === 0) {
 return (
 <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-20 text-center dark:border-zinc-700 dark:bg-zinc-900">
 <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
 No Jobs Found
 </h2>

 <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
 There are no jobs matching your current filters. Try adjusting your
 filters or create a new job.
 </p>

 <button className="mt-6 rounded-xl bg-[#285A48] dark:bg-[#B0E4CC] dark:text-white px-5 py-2.5 font-medium text-white transition hover:bg-teal-700">
 Create Job
 </button>
 </div>
 );
 }

 return (
 <div className="grid mt-2 grid-cols-1 gap-6 lg:grid-cols-2">
 {jobs.map((job) => (
 <JobCard key={job.id} job={job} onEdit={onEdit} />
 ))}
 </div>
 );
};

export default JobsGrid;