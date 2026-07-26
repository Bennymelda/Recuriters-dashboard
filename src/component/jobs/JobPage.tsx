import { useState } from "react";
import JobsGrid from "./JobPages/JobsGrid";
import JobsHeader from "./JobPages/JobsHeader";
import JobsToolbar from "./JobPages/JobsToolbar";
import { useJobStore } from "../../store/jobStore";
import JobForm from "./JobForm/JobForm";
import Modal from "../ui/Modal";
import EditJobForm from "./EditJobModal";
import type { Job } from "../../types/job";
import { useSearchStore } from "../../store/searchStore";

import JobStats from "./JobPages/JobStats";

const JobPage = () => {
 const jobs = useJobStore((state) => state.jobs);
const [editingJob, setEditingJob] = useState<Job | null>(null);
 const [department, setDepartment] = useState("All");
 const [status, setStatus] = useState("All");
 const [experience, setExperience] = useState("All");
 const [location, setLocation] = useState("All");
 const [sort, setSort] = useState("All");
 const [view, setView] = useState<"grid" | "list">("grid");
const [isCreateOpen, setIsCreateOpen] = useState(false);

 const onCreateJob = () => {
 setIsCreateOpen(true)
 };
 
const query = useSearchStore((state) => state.query);
 const filteredJobs = jobs
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
 return (
 <>
 <JobsHeader onCreateJob={onCreateJob} totalJobs={jobs.length} />
<JobStats jobs={jobs}/>
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




 <JobsGrid jobs={filteredJobs}
 
 onEdit={setEditingJob} />
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