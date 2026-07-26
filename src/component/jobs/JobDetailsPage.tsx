import { useNavigate, useParams } from "react-router-dom";
import {
 MdArrowBack,
 MdEdit,
 MdContentCopy,
 
 MdDelete,

} from "react-icons/md";
import { useCandidateStore } from "../../store/candidateStore";
import { useJobStore } from "../../store/jobStore";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";
import Modal from "../ui/Modal";
import EditJobForm from "./EditJobModal";
import { FiEdit } from "react-icons/fi";
import Tooltip from "../ui/Tooltip";
import { timeAgo } from "../../utils/timeAgo";
import Breadcrumb from "../ui/BreadCrumb";
import { useToastStore } from "../toast/toastStore";
import DeleteModal from "./JobPages/DeleteJobModal";
const statusColors = {
 Active:
 "text-[#3b8167] font-bold ",

 Draft:
 " text-amber-700 ",

 Closed:
 " text-zinc-700 dark:text-zinc-300",
};

const JobDetails = () => {
 const navigate = useNavigate();
 const user = useAuthStore((state) => state.user);
const role = user?.role;

const canCreateJobs =
 role === "Admin" ||
 role === "HR Manager";


const { duplicateJob, deleteJob } = useJobStore();
const showToast = useToastStore((state) => state.showToast);
 const { id } = useParams();
const [deleteOpen, setDeleteOpen] = useState(false);
 const jobs = useJobStore((state) => state.jobs);
const [isEditOpen, setIsEditOpen] = useState(false);
 const job = jobs.find((j) => j.id === id);
const candidates = useCandidateStore(
 (state) => state.candidates
);
if (!job) return null;
const applicantsCount = candidates.filter(
 (candidate) => candidate.jobId === job.id
).length;

 if (!job) {
 return (
 <div className="flex h-[70vh] flex-col items-center justify-center">
 <h2 className="text-3xl font-bold">Job not found</h2>

 <p className="mt-3 text-zinc-500">
 The job you're looking for doesn't exist.
 </p>

 <button
 onClick={() => navigate("/jobs")}
 className="mt-6 rounded-xl bg-teal-600 px-5 py-3 text-white"
 >
 Back to Jobs
 </button>
</div>
 );
 }

 return (
 <div className="space-y-8">

 {/* Back */}
<div className="mb-6 flex flex-wrap items-center gap-4">

 {/* Back Button */}
 <button
 onClick={() => navigate("/jobs")}
 className="
 group
 flex
 items-center
 gap-2

 rounded-xl

 border
 border-zinc-200

 bg-white

 px-4
 py-2

 text-sm
 font-medium

 text-zinc-600

 transition-all
 duration-300

 hover:-translate-x-1
 hover:border-[#408A71]/30
 hover:bg-[#EEF8F3]
 hover:text-[#408A71]

 dark:border-zinc-700
 dark:bg-zinc-900
 dark:text-zinc-300
 dark:hover:bg-zinc-800
 dark:hover:text-[#B0E4CC]
 "
 >
 <MdArrowBack
 size={18}
 className="transition-transform group-hover:-translate-x-1"
 />

 Back
 </button>

 {/* Divider */}
 <div className="hidden h-6 w-px bg-zinc-300 dark:bg-zinc-700 md:block" />

 {/* Breadcrumb */}
 <Breadcrumb
 items={[
 {
 label: "Jobs",
 href: "/jobs",
 },
 {
 label: job.title,
 },
 ]}
 />

</div>
 
 {/* Header */}
<div  className="bg-white px-6 py-4 dark:bg-zinc-900">
<div>

    <div></div>
    <p className="font-bold text-xl dark:text-gray-200 "> Preview</p>

    
    <div className="flex justify-between items-start flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>

            <p className="text-md font-bold dark:text-white mt-10 text-lg mb-1">{job.title}</p>
            <div className="flex items-center">
                <span
 className={` text-sm font-bold${
 statusColors[job.status]
 }`}
 >
 {job.status}
</span>
 <Tooltip text="Edit">
    { canCreateJobs && (
 <button className="cursor-pointer dark:text-gray-200 rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">
 <FiEdit  size={15} onClick={() => setIsEditOpen(true)}/>
 </button>
    )}
 </Tooltip>
 
            </div>
           
            <div className="flex  gap-1 mt-2">
                <span className="text-gray-800 dark:text-gray-300 font-semibold text-sm ">{timeAgo(job.createdAt)} . </span> 
                
                  <span className="text-gray-800 dark:text-gray-300 font-semibold text-sm" >{applicantsCount} applicant</span>
            </div>
        </div>

        <div>

{/*tooltip */}
        <div className="flex cursor-pointer flex-wrap items-center gap-2 bg-gray-100 dark:bg-zinc-900 px-1 py-1 rounded-xl">

 <Tooltip text="Edit">
    { canCreateJobs && (
 <button
 
  onClick={() => setIsEditOpen(true)} className="rounded-xl p-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
 <MdEdit className="dark:text-white" size={20} />
 </button>
 )}
 </Tooltip>

 <Tooltip text="Duplicate">
    {canCreateJobs && (
 <button
 
 onClick={() => {
 duplicateJob(job.id);
showToast({
 type: "success",
 title: "Job Duplicated",
 message: `${job.title} was duplicated successfully.`,
 });

 }}
  className="cursor-pointer rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
 <MdContentCopy size={20} className="dark:text-white" />
 </button>
 )}
 </Tooltip>

 <Tooltip text="Delete">
    { canCreateJobs&& (
 <button 
 onClick={() => setDeleteOpen(true)}
 className="cursor-pointer rounded-xl p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
 <MdDelete size={20} />
 </button>
 )}
 </Tooltip>

</div>
     
        </div>
    </div>

    

   
</div>


<div className=" grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-4 mt-10">
        
        <div className="bg-[#f6fffc] dark:bg-[#3f3e3e] rounded-lg p-5">
            <p className="text-md mb-1 text-gray-800 dark:text-gray-200 font-semibold">Employment Type</p>
            <p className="text-[#285A48] dark:text-[#B0E4CC] font-bold">{job.employmentType}</p>
        </div>
        <div className="bg-[#f6fffc] dark:bg-[#3f3e3e] rounded-xl p-5">
            <p className="text-md mb-1 text-gray-800 font-semibold dark:text-gray-200 " >Offer Salary</p>
            <p  className="text-[#285A48] font-bold dark:text-[#B0E4CC]">{job.salary}</p>
        </div>
        <div className="bg-[#f6fffc] dark:bg-[#3f3e3e] rounded-xl p-5">
            <p  className="text-md mb-1 text-gray-800 font-semibold dark:text-gray-200">Experience</p>
            <p className="text-[#285A48] font-bold dark:text-[#B0E4CC]">{job.experience}</p>
        </div>

        <div className="bg-[#f6fffc] dark:bg-[#3f3e3e]  rounded-xl p-5">
            <p className="text-md mb-1 text-gray-800 font-semibold dark:text-gray-200">Work Level</p>
            <p className="text-[#285A48] font-bold dark:text-[#B0E4CC]">{job.experienceLevel} level</p>
        </div>
    </div>

    {/* Description */}
 <section className="mt-10" >
 <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
 Job Description
 </h2>

 <p className="mt-4 text-sm md:text-base md:leading-8 leading-7 text-zinc-600 dark:text-zinc-300">
 {job.description}
 </p>
 </section>

{/* Responsibilities */}
 <section className="mt-5">
 <h2 className=" text-lg md:text-xl font-semibold  text-zinc-900 dark:text-white">
 Responsibilities
 </h2>

 <ul className="mt-5 space-y-3 md:space-y-4">
 {job.responsibilities.map((item) => (
 <li
 key={item}
 className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300"
 >
 <span className="mt-1 h-2 w-2 dark:bg-white rounded-full bg-black" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </section>

 {/* Requirements */}
 <section className="mt-5">
 <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
 Requirements
 </h2>

 <ul className="mt-5 space-y-4">
 {job.requirements.map((item) => (
 <li
 key={item}
 className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300"
 >
 <span className="mt-1 h-2 w-2 dark:bg-white rounded-full bg-black" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </section>


{/* Benefit*/}
 <section className="mt-5">
 <h2 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-white">
 Benefits
 </h2>

 <ul className="mt-5 space-y-4">
 {job.benefits.map((item) => (
 <li
 key={item}
 className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300"
 >
 <span className="mt-1 dark:bg-white h-2 w-2 rounded-full bg-black" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </section>

{/* slills*/}
 <section className="mt-5">
 <h2 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-white">
 Skills
 </h2>

 <ul className="mt-5 space-y-4">
 {job.skills.map((item) => (
 <li
 key={item}
 className="flex items-start  gap-3 text-zinc-600 dark:text-zinc-300"
 >
 <span className="mt-1 h-2 w-2 dark:bg-white rounded-full bg-black" />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </section>

</div>

<Modal
 open={isEditOpen}
 onClose={() => setIsEditOpen(false)}
 title="Edit Job"
 maxWidth="6xl"
>
 <EditJobForm
 mode="edit"
 job={job}
 onClose={() => setIsEditOpen(false)}
 />
</Modal>
<DeleteModal
 isOpen={deleteOpen}
 title="Delete Job"
 message={`Are you sure you want to delete "${job.title}"? This action cannot be undone.`}
 onClose={() => setDeleteOpen(false)}
 onConfirm={() => {
 deleteJob(job.id);

 showToast({
 type: "success",
 title: "Job Deleted",
 message: `${job.title} has been deleted successfully.`,
 });

 setDeleteOpen(false);
 navigate("/jobs");
 }}
/>
</div>
)
};

export default JobDetails;