import type { Job } from "../../../types/job";

interface BasicInfoSectionProps {
 title: string;
 setTitle: (value: string) => void;

 department: string;
 setDepartment: (value: string) => void;

 location: string;
 setLocation: (value: string) => void;

 employmentType: Job["employmentType"];
setEmploymentType: (value: Job["employmentType"]) => void;

experienceLevel: Job["experienceLevel"];
setExperienceLevel: (value: Job["experienceLevel"]) => void;

status: Job["status"];
setStatus: (value: Job["status"]) => void;
 salary: string;
 setSalary: (value: string) => void;
}

const inputStyle =
 "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:ring-teal-900";

const labelStyle =
 "mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

const BasicInfoSection = ({
 title,
 setTitle,
 department,
 setDepartment,
 location,
 setLocation,
 employmentType,
 setEmploymentType,
 experienceLevel,
 setExperienceLevel,
 status,
 setStatus,
 salary,
 setSalary,
}: BasicInfoSectionProps) => {
 return (
 <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
 <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">
 Basic Information
 </h2>

 <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
 {/* Job Title */}
 <div className="md:col-span-2">
 <label className={labelStyle}>Job Title</label>

 <input
 type="text"
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 placeholder="Frontend Developer"
 className={inputStyle}
 />
 </div>

 {/* Department */}
 <div>
 <label className={labelStyle}>Department</label>

 <select
 value={department}
 onChange={(e) => setDepartment(e.target.value)}
 className={inputStyle}
 >
 <option value="">Select Department</option>
 <option>Engineering</option>
 <option>Design</option>
 <option>Analytics</option>
 <option>Human Resources</option>
 <option>Marketing</option>
 <option>Sales</option>
 </select>
 </div>

 {/* Location */}
 <div>
 <label className={labelStyle}>Location</label>

 <select
 value={location}
 onChange={(e) => setLocation(e.target.value)}
 className={inputStyle}
 >
 <option value="">Select Location</option>
 <option>Remote</option>
 <option>Hybrid</option>
 <option>Onsite</option>
 </select>
 </div>

 {/* Employment Type */}
 <div>
 <label className={labelStyle}>Employment Type</label>

 <select
 value={employmentType}
 onChange={(e) =>
 setEmploymentType(e.target.value as Job["employmentType"])
}
 className={inputStyle}
 >
 <option value="">Select Employment Type</option>
 <option>Full-time</option>
 <option>Part-time</option>
 <option>Contract</option>
 <option>Internship</option>
 </select>
 </div>

 {/* Experience */}
 <div>
 <label className={labelStyle}>Experience Level</label>

 <select
 value={experienceLevel}
 onChange={(e) => setExperienceLevel(e.target.value as Job["experienceLevel"])}
 className={inputStyle}
 >
 <option value="">Select Experience</option>
 <option>Junior</option>
 <option>Mid</option>
 <option>Senior</option>
 </select>
 </div>

 {/* Status */}
 <div>
 <label className={labelStyle}>Status</label>

 <select
 value={status}
 onChange={(e) =>
 setStatus(e.target.value as Job["status"])
}


 className={inputStyle}
 >
 <option value="">Select Status</option>
 <option>Active</option>
 <option>Draft</option>
 <option>Closed</option>
 </select>
 </div>

 {/* Salary */}
 <div>
 <label className={labelStyle}>Salary Range</label>

 <input
 type="text"
 value={salary}
 onChange={(e) => setSalary(e.target.value)}
 placeholder="$80,000 - $120,000"
 className={inputStyle}
 />
 </div>
 </div>
 </section>
 );
};

export default BasicInfoSection;