import { MdRefresh } from "react-icons/md";
import CustomSelect from "../ui/CustomSelect";

interface TeamToolbarProps {
 filters: {
 role: string;
 department: string;
 status: string;
 };
 setFilters: React.Dispatch<
 React.SetStateAction<{
 role: string;
 department: string;
 status: string;
 }>
 >;
}

const TeamToolbar = ({
 filters,
 setFilters,
}: TeamToolbarProps) => {
 return (
 <section
 className="
 mt-8
 rounded-3xl
 border
 border-zinc-100
 bg-white
 p-4
 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <div className="flex flex-col gap-4 md:flex-row lg:items-center lg:justify-between">

 {/* Filters */}
 <div
 className="
 flex
 gap-3
 overflow-x-auto
 hide-scrollbar

 lg:flex-1
 lg:flex-wrap
 md:overflow-visible
 "
 >
 <div className="min-w-[180px] shrink-0 lg:min-w-0">
 <CustomSelect
 placeholder="All Roles"
 value={filters.role}
 onChange={(value) =>
 setFilters((prev) => ({
 ...prev,
 role: value,
 }))
 }
 options={[
 "Recruiter",
 "Hiring Manager",
 "HR Manager",
 "Admin",
 ]}
 />
 </div>

 <div className="min-w-[200px] shrink-0 lg:min-w-0">
 <CustomSelect
 placeholder="All Departments"
 value={filters.department}
 onChange={(value) =>
 setFilters((prev) => ({
 ...prev,
 department: value,
 }))
 }
 options={[
 "Engineering",
 "Product",
 "Design",
 "Marketing",
 "Human Resources",
 "Sales",
 "Operations",
 ]}
 />
 </div>

 <div className="min-w-[180px] shrink-0 lg:min-w-0">
 <CustomSelect
 placeholder="All Status"
 value={filters.status}
 onChange={(value) =>
 setFilters((prev) => ({
 ...prev,
 status: value,
 }))
 }
 options={[
 "Online",
 "Away",
 "Offline",
 ]}
 />
 </div>
 </div>

 {/* Refresh */}
 <div className="lg:ml-4">
 <button
 onClick={() =>
 setFilters({
 role: "",
 department: "",
 status: "",
 })
 }
 className="
 flex
 w-full
 items-center
 justify-center
 gap-2

 rounded-2xl
 border
 border-zinc-200

 px-5
 py-3

 transition

 hover:bg-zinc-100

 dark:border-zinc-700
 dark:hover:bg-zinc-700

 lg:w-auto
 "
 >
 <MdRefresh
 size={20}
 className="dark:text-white"
 />
 <span className="text-sm whitespace-nowrap font-medium dark:text-white">
 Reset Filters
 </span>
 </button>
 </div>

 </div>
 </section>
);
};

export default TeamToolbar;