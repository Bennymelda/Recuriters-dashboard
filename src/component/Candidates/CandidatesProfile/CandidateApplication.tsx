import {
 MdWorkOutline,
 MdCalendarToday,
 MdFlag,
MdBusiness,
 MdStar

} from "react-icons/md";
import type { Candidate } from "../../../types/candidate";
import CandidateResume from "./CandidateResume";

interface CandidateApplicationProps {
 candidate: Candidate;
}

const statusColors = {
 Applied:
 "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
 Screening:
 "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
 Interview:
 "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
 Offer:
 "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
 Hired:
 "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
 Rejected:
 "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const CandidateApplication = ({
 candidate,
}: CandidateApplicationProps) => {

    const formatInterviewDate = (date: string) => {
 const d = new Date(date);

 const day = d.getDate();

 const suffix =
 day % 10 === 1 && day !== 11
 ? "st"
 : day % 10 === 2 && day !== 12
 ? "nd"
 : day % 10 === 3 && day !== 13
 ? "rd"
 : "th";

 const month = d.toLocaleString("en-US", {
 month: "short",
 });

 const year = d.getFullYear();

 return `${day}${suffix} ${month} ${year}`;
};

 return (
 <div className="mt-8 overflow-hidden  border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">

 {/* Applied Position */}
 <div className="flex items-center justify-between px-4 md:px-8 py-5 md:py-6 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40">

 <div className="flex items-center gap-4">

 <div className="flex h-10 md:h-11 w-11 md:w-11 items-center justify-center rounded-2xl bg-[#EEF8F3] dark:bg-[#408A71]/15">
 <MdWorkOutline className="text-[#408A71] dark:text-[#B0E4CC]" size={20} />
 </div>

 <div>
 <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
 Applied Position
 </p>

 <p className="mt-1 text-base md:text-lg font-semibold text-zinc-900 dark:text-white">
 {candidate.appliedRole}
 </p>
 </div>

 </div>

 </div>

 <div className="mx-4 md:mx-8 border-b border-zinc-200 dark:border-zinc-700" />

 {/* Department */}
 <div className="flex items-center justify-between px-4  py-5 md:px-8 md:py-6 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40">

 <div className="flex items-center gap-4">

 <div className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-2xl bg-[#EEF8F3] dark:bg-[#408A71]/15">
 <MdBusiness className="text-[#408A71] dark:text-[#B0E4CC]" size={20} />
 </div>

 <div>
 <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
 Department
 </p>

 <p className="mt-1 text-base md:text-lg font-semibold text-zinc-900 dark:text-white">
 {candidate.department}
 </p>
 </div>

 </div>

 </div>

 <div className="md:mx-8 mx-4 border-b border-zinc-200 dark:border-zinc-700" />

 {/* Experience */}
 <div className="flex items-center justify-between px-4  py-5 md:px-8 md:py-6 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40">

 <div className="flex items-center gap-4">

 <div className="flex h-10 w-10 md:h-11 md:w-11  items-center justify-center rounded-2xl bg-[#EEF8F3] dark:bg-[#408A71]/15">
 <MdStar className="text-[#408A71] dark:text-[#B0E4CC]" size={20} />
 </div>

 <div>
 <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
 Experience
 </p>

 <p className="mt-1 text-base md:text-lg font-semibold text-zinc-900 dark:text-white">
 {candidate.experience}
 </p>
 </div>

 </div>

 </div>

 <div className="md:mx-8 mx-4 border-b border-zinc-200 dark:border-zinc-700" />

 {/* Applied Date */}
 <div className="flex items-center justify-between px-4 py-5 md:px-8 md:py-6 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/40">

 <div className="flex items-center gap-4">

 <div className="flex h-10 w-10 md:h-11 md:w-11  items-center justify-center rounded-2xl bg-[#EEF8F3] dark:bg-[#408A71]/15">
 <MdCalendarToday className="text-[#408A71] dark:text-[#B0E4CC]" size={20} />
 </div>

 <div>
 <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
 Applied Date
 </p>

 <p className="mt-1 text-base md:text-lg font-semibold text-zinc-900 dark:text-white">
 {formatInterviewDate(candidate.createdAt)}
 </p>
 </div>

 </div>

 </div>

 <div className="mx-4 md:mx-8 border-b border-zinc-200 dark:border-zinc-700" />

 {/* Status */}
 <div className="flex items-center justify-between px-4  py-5 md:px-8 md:py-6">

 <div className="flex items-center gap-4">

 <div className="flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-2xl bg-[#EEF8F3] dark:bg-[#408A71]/15">
 <MdFlag className="text-[#408A71] dark:text-[#B0E4CC]" size={20} />
 </div>

 <div>
 <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
 Current Status
 </p>

 <span
 className={`mt-2 inline-flex rounded-full md:px-4 md:py-2 px-3 py-1.5 text-sm font-semibold ${statusColors[candidate.status]}`}
 >
 {candidate.status}
 </span>
 </div>

 </div>

 </div>

 <div className="border-t border-zinc-200 dark:border-zinc-700">
 <CandidateResume candidate={candidate} />
 </div>

 </div>
);
};

export default CandidateApplication;