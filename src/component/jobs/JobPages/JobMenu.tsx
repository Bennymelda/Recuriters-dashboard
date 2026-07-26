import {
 MdDeleteOutline,
 MdEdit,
 MdContentCopy,
 MdVisibility,
} from "react-icons/md";
import { useAuthStore } from "../../../store/authStore";
interface JobMenuProps {
 onView: () => void;
 onEdit: () => void;
 onDuplicate: () => void;
 onDelete: () => void;
}

const JobMenu = ({
 onView,
 onEdit,
 onDuplicate,
 onDelete,
}: JobMenuProps) => {
const user = useAuthStore((state) => state.user); 

const role = user?.role;

const canCreateJobs =
 role === "Admin" ||
 role === "HR Manager";

 return (
 <div className="absolute right-0 max-w-[calc(100vw-1rem)] top-12 z-50 w-52 md:w-56 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
 
 <div className="border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
 <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
 Job Actions
 </p>
</div>
 <button
 onClick={onView}
 className="flex w-full items-center gap-3 p-3 md:px-4 md:py-3 text-left text-xs md:text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
 >
 <MdVisibility size={20} />
 View Details
 </button>
{ canCreateJobs && (
 <button
 onClick={onEdit}
 className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
 >
 <MdEdit size={18} />
 Edit Job
 </button>
)}

{ canCreateJobs && (
 <button
 onClick={onDuplicate}
 className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
 >
 <MdContentCopy size={20} />
 Duplicate Job
 </button>
)}
 <div className="border-t border-slate-200 dark:border-slate-700" />
{ canCreateJobs && (
 <button
 onClick={onDelete}
 className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
 >
 <MdDeleteOutline size={20} />
 Delete Job
 </button>
 )}

 </div>

 );
};

export default JobMenu;