import { useState, useEffect } from "react";
import {
 
 MdMoreVert,

} from "react-icons/md";
//import type { CompanyIconKey } from "../../../utils/companyIcons";
import { companyIcons } from "../../../utils/companyIcons";
import type { Job } from "../../../types/job";
import JobMenu from "./JobMenu";
import DeleteModal from "./DeleteJobModal";
import { useJobStore } from "../../../store/jobStore";
import { useToastStore } from "../../toast/toastStore";
import { useNavigate } from "react-router";
import { timeAgo } from "../../../utils/timeAgo";
import { useThemeStore } from "../../../store/themeStore";

interface JobCardProps {
 job: Job;
 onEdit: (job: Job) => void;
}

const JobCard = ({ job, onEdit }: JobCardProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const [, forceUpdate] = useState(0);
 
 useEffect(() => {
 const interval = setInterval(() => {
 forceUpdate((prev) => prev + 1);
 }, 60000);

 return () => clearInterval(interval);
 }, []);
    const navigate = useNavigate();
    const [deleteOpen, setDeleteOpen]=useState(false)
 const { theme } = useThemeStore();
 const deleteJob = useJobStore((state) => state.deleteJob);
 const {duplicateJob}=useJobStore()
const showToast = useToastStore((state) => state.showToast);
const truncateText = (text: string, limit: number) => {
 if (text.length <= limit) return text;

 const truncated = text.slice(0, limit);
 const lastSpace = truncated.lastIndexOf(" ");

 return `${truncated.slice(0, lastSpace)}...`;
};
const Icon =
 companyIcons[job.icon as keyof typeof companyIcons];
  console.log(companyIcons);
console.log(job.icon);
console.log(companyIcons[job.icon as keyof typeof companyIcons]);
 return (
    <>
 <div className="
 group relative rounded-2xl border border-zinc-200
 bg-white p-4 md:p-6 shadow-sm
 transition-all duration-300 ease-out
 hover:-translate-y-1 hover:shadow-xl
 hover:border-zinc-300
 dark:border-zinc-800 dark:bg-zinc-900
 dark:hover:border-zinc-700"
 >
<div>

    

    <div>
        <div className="flex justify-between gap-3 items-start">
            <div className="flex gap-2 items-center">
               {Icon && (
 <Icon
 size={32}
 className="h-6 w-6 md:h-8 md:w-8"
 style={{
 color: theme === "dark"
 ? job.darkIcon
 : job.iconColor,
 }}
 />
)}
                
                <div>
                    <p className="font-bold text-lg break-words md:text-xl dark:text-gray-200">{job.title}</p>
                    <div className="flex gap-2 md:text-base text-sm text-gray-600 dark:text-gray-300 leading-6">
                        <span>{job.name}</span>
                        <span>{timeAgo(job.createdAt)}</span>
                    </div>
                </div>
            </div>
            <div>
            {/* MENU */}
                <div className="relative   group-hover:opacity-100 transition-opacity duration-200">
                <button
                onClick={() => setShowMenu((p) => !p)}
                className="cursor-pointer rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                <MdMoreVert size={20} />
                </button>

                {showMenu && (
                <div className="absolute right-0 -mt-10">
                <JobMenu
                onView={() => {
                setShowMenu(false);
                navigate(`/jobs/${job.id}`);
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
                />
                </div>
                )}
                </div>
            </div>
        </div>
        
    </div>
    <hr className="mt-4 gap-4 mb-4 text-gray-200 dark:text-zinc-700 flex flex-col" />
    <p className="text-gray-600 dark:text-zinc-200 leading-6">
 {truncateText(job.description, 120)}
</p>
    <div className="mt-8 flex flex-col gap-4  md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 items-center text-sm text-gray-600 dark:text-gray-300">
            <span className="bg-gray-100 dark:bg-zinc-700 px-2 py-1 rounded-full">{job.experience}</span>
            <span className="bg-gray-100 dark:bg-zinc-700  px-2 py-1 rounded-full">{job.employmentType}</span>
            <span className="bg-gray-100 dark:bg-zinc-700  px-2 py-1 rounded-full" >{job.location}</span>
        </div>
        <div className="self-start sm:slef-auto">
            <p className="font-bold text-base dark:text-white">{job.salary}/yearly</p>
        </div>
    </div>
 
</div>

 
 </div>
{/* DELETE MODAL */}
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
</>
 );
};

export default JobCard;