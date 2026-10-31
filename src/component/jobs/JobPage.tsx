import { useState, useEffect} from "react";
import JobsGrid from "./JobPages/JobsGrid";
import JobsHeader from "./JobPages/JobsHeader";
import JobsToolbar from "./JobPages/JobsToolbar";
import { useJobStore } from "../../store/jobStore";
import JobForm from "./JobForm/JobForm";
import Modal from "../ui/Modal";
import EditJobForm from "./EditJobModal";
import type { Job } from "../../types/job";
import { useSearchStore } from "../../store/searchStore";
import { useAuthStore } from "../../store/authStore";
import { useTeamStore } from "../../store/teamStore";
import JobStats from "./JobPages/JobStats";
import { findCurrentMember, getVisibleJobs } from "../../utils/roleBasedDataFiltering";

const JobPage = () => {
 const jobs = useJobStore((state) => state.jobs);
 const fetchJobs = useJobStore((state) => state.fetchJobs);
 const subscribeToJobs = useJobStore((state) => state.subscribeToJobs);
 const user = useAuthStore((state) => state.user);
 const members = useTeamStore((state) => state.members);

 useEffect(() => {
  fetchJobs();
  const unsub = subscribeToJobs?.();
  return () => {
   unsub?.();
  };
 }, [fetchJobs, subscribeToJobs]);

 // Find current team member (matches both email AND companyId for multi-company support)
 const currentMember = findCurrentMember(members, user);

 // Get visible jobs based on role and assigned jobs
 const visibleJobs = getVisibleJobs(jobs, user, currentMember);
console.log("ALL JOB FROM STORE:",user?.role)
const [editingJob, setEditingJob] = useState<Job | null>(null);
 const [department, setDepartment] = useState("All");
 const [status, setStatus] = useState("All");
 const [experience, setExperience] = useState("All");
 const [location, setLocation] = useState("All");
 const [sort, setSort] = useState("All");
 const [view, setView] = useState<"grid" | "list">("grid");
const [isCreateOpen, setIsCreateOpen] = useState(false);

const onCreateJob = () => {
 if (user?.role === "Hiring Manager") return;

 setIsCreateOpen(true);
};
 
const query = useSearchStore((state) => state.query);
 const filteredJobs = visibleJobs
 .filter(
 (job) =>
 job.title.toLowerCase().includes(query.toLowerCase()) ||
 job.department.toLowerCase().includes(query.toLowerCase()) ||
 job.location.toLowerCase().includes(query.toLowerCase())
 )
 .filter((job) => department === "All" || job.department === department)
 .filter((job) => status === "All" || job.status === status)
 .filter((job) => experience === "All" || job.experienceLevel === experience)
 .filter((job) => location === "All" || job.location === location)
 .sort((a, b) => {
 switch (sort) {
 case "Latest":
 return (
 new Date(b.createdAt).getTime() -
 new Date(a.createdAt).getTime()
 );

 case "Oldest":
 return (
 new Date(a.createdAt).getTime() -
 new Date(b.createdAt).getTime()
 );

 case "Name":
 return a.title.localeCompare(b.title);

 default:
 return 0;
 }
 });


const [currentPage, setCurrentPage] = useState(1);
const jobsPerPage = 10;

const totalPages = Math.ceil(
 filteredJobs.length / jobsPerPage
);

const startIndex = (currentPage - 1) * jobsPerPage;

const paginatedJobs = filteredJobs.slice(
 startIndex,
 startIndex + jobsPerPage
);

useEffect(() => {
 setCurrentPage(1);
}, [query, department, status, experience, location, sort]);


 return (
 <>
 <JobsHeader onCreateJob={onCreateJob} totalJobs={visibleJobs.length} />
<JobStats jobs={visibleJobs}/>
 <JobsToolbar
 department={department}
 setDepartment={setDepartment}
 status={status}
 setStatus={setStatus}
 experience={experience}
 setExperience={setExperience}
 location={location}
 setLocation={setLocation}
 sort={sort}
 setSort={setSort}
 view={view}
 setView={setView}
 />


<button
 onClick={() => {
 useAuthStore.getState().setRole("Hiring Manager");
 window.location.reload();
 }}
>
 Test as Hiring Manager
</button>

 <JobsGrid jobs={paginatedJobs}
 onEdit={(job) => {
 if (user?.role === "Hiring Manager") return;

 setEditingJob(job);
 }}
 userRole={user?.role}
 onCreateJob={onCreateJob}
/>

{totalPages > 1 && (
 <div className="flex mt-5 items-center justify-center gap-2 pb-8">
 <button
 onClick={() =>
 setCurrentPage((page) => Math.max(page - 1, 1))
 }
 disabled={currentPage === 1}
 className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
 >
 Previous
 </button>

 {Array.from({ length: totalPages }, (_, index) => index + 1).map(
 (page) => (
 <button
 key={page}
 onClick={() => setCurrentPage(page)}
 className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
 currentPage === page
 ? "bg-[#285A48] dark:bg-[#B0E4CC] text-white dark:text-zinc-800"
 : "border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
 }`}
 >
 {page}
 </button>
 )
 )}

 <button
 onClick={() =>
 setCurrentPage((page) =>
 Math.min(page + 1, totalPages)
 )
 }
 disabled={currentPage === totalPages}
 className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
 >
 Next
 </button>
 </div>
)}

 <Modal
 open={isCreateOpen}
 onClose={() => setIsCreateOpen(false)}
 title="Create Job"
 maxWidth="6xl"
>
 <JobForm
 mode="create"
 onClose={() => setIsCreateOpen(false)}
 />
</Modal>
<Modal
 open={editingJob !== null}
 onClose={() => setEditingJob(null)}
 title="Edit Job"
>
 {editingJob && (
 <EditJobForm
 mode="edit"
 job={editingJob}
 onClose={() => setEditingJob(null)}
 />
 )}
</Modal>
 </>
 );
};

export default JobPage;