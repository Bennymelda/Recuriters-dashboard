
import CustomSelect from "../../ui/CustomSelect";

interface CandidatesToolbarProps {
 status: string;
 setStatus: (value: string) => void;

department: string;
 setDepartment: (value: string) => void;

 experience: string;
 setExperience: (value: string) => void;

 location: string;
 setLocation: (value: string) => void;

 sort: string;
 setSort: (value: string) => void;

 view: "grid" | "list";
 setView: (view: "grid" | "list") => void;
}

const statusOptions = [
    "All",
 "Applied",
 "Screening",
 "Interview",
 "Offer",
 "Hired",
 "Rejected",
];

const Department = [
   "All", 
 "Engineering",
 "Human Resources",
 "Analytics",
 "Design",
 
];

const experienceOptions = [
    "All",
 "Junior",
 "Mid",
 "Senior",
];

const locationOptions = [
    "All",
 "Remote",
 "Hybrid",
 "Onsite",
];

const sortOptions = [
    "All",
 "Latest",
 "Oldest",
 "Name",
];


const JobsToolbar = ({
 status,
 setStatus,
 department,
 setDepartment,
 experience,
 setExperience,
 location,
 setLocation,
 sort,
 setSort,
 
}: CandidatesToolbarProps) => {
 return (
 <div className="mt-10 md:mt-12 mb-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
<p className="font-semibold dark:text-white text-lg">Filter Jobs</p>
 {/* Filters */}
 <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
  <CustomSelect
 placeholder="All Status"
 value={status}
 options={statusOptions}
 onChange={setStatus}
 />

 <CustomSelect
 placeholder="All Department"
 value={department}
 options={Department}
 onChange={setDepartment}
 />

 <CustomSelect
 placeholder="All Experience"
 value={experience}
 options={experienceOptions}
 onChange={setExperience}
 />

 <CustomSelect
 placeholder="All Locations"
 value={location}
 options={locationOptions}
 onChange={setLocation}
 />

 <CustomSelect
 placeholder="Sort By"
 value={sort}
 options={sortOptions}
 onChange={setSort}
 />


</div>

 </div>
 );
};

export default JobsToolbar;