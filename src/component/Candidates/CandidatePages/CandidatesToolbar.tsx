
import CustomSelect from "../../ui/CustomSelect";

interface CandidatesToolbarProps {
 status: string;
 setStatus: (value: string) => void;

 role: string;
 setRole: (value: string) => void;

 experience: string;
 setExperience: (value: string) => void;

 location: string;
 setLocation: (value: string) => void;



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

const roleOptions = [
    "All",
 "Frontend Engineer",
 "Senior Technical Recruiter",
 "UI/UX Designer",
 "Senior Product Manager",
 "Data Analyst",
 "Engineering",
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




const CandidatesToolbar = ({
 status,
 setStatus,
 role,
 setRole,
 experience,
 setExperience,
 location,
 setLocation,

 
}: CandidatesToolbarProps) => {
 return (
 <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
<p className="font-semibold dark:text-white mb-4">Filter Candidate</p>
 {/* Filters */}
 <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">







 

  <CustomSelect
 placeholder="All Status"
 value={status}
 options={statusOptions}
 onChange={setStatus}
 />

 <CustomSelect
 placeholder="All Role"
 value={role}
 options={roleOptions}
 onChange={setRole}
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



</div>

 </div>
 );
};

export default CandidatesToolbar;