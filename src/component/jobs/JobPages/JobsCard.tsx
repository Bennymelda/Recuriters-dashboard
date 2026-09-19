

import { useState, useEffect } from "react";
import { MdMoreVert } from "react-icons/md";
import { companyIcons } from "../../../utils/companyIcons";
import type { Job } from "../../../types/job";
import type { UserRole } from "../../../types/auth";
import JobMenu from "./JobMenu";
import DeleteModal from "./DeleteJobModal";
import { useJobStore } from "../../../store/jobStore";
import { useToastStore } from "../../toast/toastStore";
import { useNavigate } from "react-router";
import { timeAgo } from "../../../utils/timeAgo";
import { useThemeStore } from "../../../store/themeStore";
import { useAuthStore } from "../../../store/authStore";

interface JobCardProps {
job: Job;
onEdit: (job: Job) => void;
userRole?: UserRole;
}

const JobCard = ({
job,
onEdit,
userRole,
}: JobCardProps) => {
const [showMenu, setShowMenu] = useState(false);
const [, forceUpdate] = useState(0);
const [deleteOpen, setDeleteOpen] = useState(false);

const navigate = useNavigate();
const { theme } = useThemeStore();

const deleteJob = useJobStore((state) => state.deleteJob);
const duplicateJob = useJobStore((state) => state.duplicateJob);
const updateJob = useJobStore((state) => state.updateJob);

const showToast = useToastStore(
(state) => state.showToast
);
const user = useAuthStore((state) => state.user);
const isHiringManager =
userRole === "Hiring Manager";

useEffect(() => {
const interval = setInterval(() => {
forceUpdate((prev) => prev + 1);
}, 60000);

return () => clearInterval(interval);

}, []);

const truncateText = (
text: string,
limit: number
) => {
if (text.length <= limit) return text;

const truncated = text.slice(0, limit);
const lastSpace = truncated.lastIndexOf(" ");

return `${truncated.slice(0, lastSpace)}...`;

};

const Icon =
companyIcons[
job.icon as keyof typeof companyIcons
];

return (
<>
<div
className="
group relative rounded-2xl
border border-zinc-200
bg-white p-4 md:p-6
shadow-sm
transition-all duration-300 ease-out
hover:-translate-y-1 hover:shadow-xl
hover:border-zinc-300
dark:border-zinc-800
dark:bg-zinc-900
dark:hover:border-zinc-700
"
>
<div>
<div>
<div className="flex items-start justify-between gap-3">
<div className="flex items-center gap-2">
{Icon && (
<Icon
size={32}
className="h-6 w-6 md:h-8 md:w-8"
style={{
color:
theme === "dark"
? job.darkIcon
: job.iconColor,
}}
/>
)}

 <div>
 <p className="break-words text-lg font-bold md:text-xl dark:text-gray-200">
 {job.title}
 </p>

 <div className="flex gap-2 text-sm leading-6 text-gray-600 md:text-base dark:text-gray-300">
 <span>{job.name}</span>
 <span>{timeAgo(job.createdAt)}</span>
 </div>
 </div>
 </div>

 {/* JOB ACTIONS */}

 <div className="relative">
 <div className="transition-opacity duration-200 group-hover:opacity-100">
 <button
 onClick={() =>
 setShowMenu((prev) => !prev)
 }
 className="
 cursor-pointer rounded-lg p-2
 text-zinc-500
 hover:bg-zinc-100
 dark:hover:bg-zinc-800
 "
 >
 <MdMoreVert size={20} />
 </button>

 {showMenu && (
 <div className="absolute right-0 z-20 -mt-10">
    
 <JobMenu
 onView={() => {
 setShowMenu(false);

 if (user?.role === "Hiring Manager") {
 navigate(`/hiring-manager/jobs/${job.id}`);
 } else {
 navigate(`/jobs/${job.id}`);
 }
 }}
 onEdit={() => {
 setShowMenu(false);
 onEdit(job);
 }}
 onDuplicate={() => {
 setShowMenu(false);

 duplicateJob(job.id);

 showToast({
 type: "success",
 title: "Job Duplicated",
 message: `${job.title} was duplicated successfully.`,
 });
 }}
 onDelete={() => {
 setShowMenu(false);
 setDeleteOpen(true);
 }}
 onClose={async () => {
 setShowMenu(false);

 try {
 await updateJob(job.id, {
 status: "Closed",
 });

 showToast({
 type: "success",
 title: "Job Closed",
 message: `${job.title} has been closed successfully.`,
 });
 } catch (error) {
 console.error("Failed to close job:", error);

 showToast({
 type: "error",
 title: "Failed to Close Job",
 message: "Something went wrong while closing this job.",
 });
 }
 }}
/>
 
 </div>
 )}
 </div>
 </div>

 </div>
 </div>

 <hr className="mb-4 mt-4 flex flex-col gap-4 text-gray-200 dark:text-zinc-700" />

 <p className="leading-6 text-gray-600 dark:text-zinc-200">
 {truncateText(job.description, 120)}
 </p>

 <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
 <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
 <span className="rounded-full bg-gray-100 px-2 py-1 dark:bg-zinc-700">
 {job.experience}
 </span>

 <span className="rounded-full bg-gray-100 px-2 py-1 dark:bg-zinc-700">
 {job.employmentType}
 </span>

 <span className="rounded-full bg-gray-100 px-2 py-1 dark:bg-zinc-700">
 {job.location}
 </span>
 </div>

 <div className="self-start sm:self-auto">
 <p className="text-base font-bold dark:text-white">
 {job.salary}/yearly
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* DELETE MODAL */}

 {!isHiringManager && (
 <DeleteModal
 isOpen={deleteOpen}
 title="Delete Job"
 message={`Are you sure you want to delete '${job.title}'? This action cannot be undone.`}
 onClose={() => setDeleteOpen(false)}
 onConfirm={() => {
 deleteJob(job.id);

 showToast({
 type: "success",
 title: "Job Deleted",
 message: `${job.title} has been deleted successfully.`,
 });

 setDeleteOpen(false);
 }}
 />
 )}
</>

);
};

export default JobCard;