import { MdAdd, MdWorkOutline } from "react-icons/md";
import { useAuthStore } from "../../../store/authStore";
interface JobsHeaderProps {
 onCreateJob: () => void;
 totalJobs: number;
}

const JobsHeader = ({ onCreateJob, totalJobs }: JobsHeaderProps) => {
const user = useAuthStore((state) => state.user);
const role = user?.role;
    const canCreateJobs =
 role === "Admin" ||
 role === "HR Manager";

    return (
 <div
 className="
 mb-6
 flex
 flex-col
 gap-6

 rounded-2xl

 

 bg-white
p-5
 md:p-7

 shadow-sm

 dark:border-zinc-800
 dark:bg-zinc-900

 lg:flex-row
 lg:items-center
 lg:justify-between
 "
 >
 {/* Left */}
<div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
 {/* Icon */}
 <div
 className="
 flex
 h-14 
 w-14
 md:h-16
 md:w-16
 items-center
 justify-center

 rounded-2xl

 bg-[#285A48]

 text-[#B0E4CC]

 dark:bg-[#B0E4CC]/15
 dark:text-[#B0E4CC]
 "
 >
 <MdWorkOutline size={28} />
 </div>

 <div>

 <div className="flex justify-center md:justify-start flex-wrap items-center gap-3">

 <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
 Jobs
 </h1>

 <span
 className="
inline-flex

sm:w-auto
w-fit
items-center
justify-center
gap-2

rounded-2xl

bg-[#285A48]


text-sm
font-semibold
text-white
p-2
shadow-lg
dark:bg-[#B0E4CC]
dark:text-black

transition-all
duration-300

hover:-translate-y-0.5
hover:bg-[#408A71]
hover:shadow-xl

active:scale-95
"
 >
 <span className="h-2 w-2 rounded-full bg-emerald-500" />

 {totalJobs} Active Openings
 </span>

 </div>

 <p className="mt-3 max-w-full lg:max-w-2xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
 Create, organize, and manage job openings while tracking every stage
 of your recruitment pipeline from one central dashboard.
 </p>

 </div>

 </div>

 {/* Right */}
 {canCreateJobs&& (
 <button
 onClick={onCreateJob}
 className="
 inline-flex
 items-center
 justify-center
 gap-2

 rounded-2xl

 bg-[#285A48]

 px-6
 py-3.5

 text-sm
 font-semibold
 text-white

 shadow-lg
 dark:text-black
 shadow-[#3525cd]/20

 transition-all
 duration-300
dark:bg-[#B0E4CC]
 hover:-translate-y-0.5
 hover:bg-[#408A71]
 hover:shadow-xl
cursor-pointer
 active:scale-95
 "
 >
 <MdAdd size={20} />
 Create Job
 </button>
)}

 </div>
);
};

export default JobsHeader;