
import { useNavigate } from "react-router";
import type { Candidate } from "../../../types/candidate";

interface CandidateCardProps {
 candidate: Candidate;
 onView: (candidate: Candidate) => void;

 selected: boolean;
}

const CandidateCard = ({
 candidate,
 onView,
 selected,
}: CandidateCardProps) => {
 const statusColors = {
 Applied:
 "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
 Screening:
 "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
 Interview:
 "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
 Offer:
 "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
 Hired:
 "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
 Rejected:
 "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
 };
const navigate = useNavigate()

 return (
   <>
   {/*desktop */}
 <section
 onClick={() => onView(candidate)}
 className={`
 group
 hidden
 
 cursor-pointer
 w-full
 lg:grid
 grid-cols-[2.5fr_1.2fr_1.5fr_1.2fr_1fr_120px]
 items-center
 gap-4

 border-b
 px-4
 py-4

 transition-all
 duration-300

 ${
 selected
 ? "bg-[#EEF8F3] border-[#408A71]/30 dark:bg-[#408A71]/20"
 : "border-gray-100 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/50"
 }
 `}
>

 {/* Candidate */}
 <div className="flex items-center gap-3">

 <img
 src={
 candidate.avatar ||
 `https://ui-avatars.com/api/?name=${candidate.fullName}`
 }
 alt={candidate.fullName}
 className="
 h-10
 w-10
 rounded-full
 border-2
 border-[#408A71]
 object-cover
 dark:border-[#B0E4CC]
 "
 />

 <div>
 <p className="font-semibold text-zinc-900 dark:text-zinc-200">
 {candidate.fullName}
 </p>

 <p className="text-xs text-zinc-500 dark:text-zinc-400">
 {candidate.email}
 </p>
 </div>

 </div>


 {/* Department */}
 <p className="text-sm text-zinc-700 dark:text-zinc-300">
 {candidate.department}
 </p>


 {/* Role */}
 <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
 {candidate.appliedRole}
 </p>


 {/* Location */}
 <p className="text-sm text-zinc-600 dark:text-zinc-300">
 {candidate.location}
 </p>


 {/* Date */}
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 {new Date(candidate.createdAt).toLocaleDateString("en-US", {
 month: "short",
 day: "numeric",
 year: "numeric",
 })}
 </p>


 {/* Status */}
 <span
 className={`
 w-fit
 rounded-full
 px-3
 py-1
 text-xs
 font-medium
 ${statusColors[candidate.status]}
 `}
 >
 {candidate.status}
 </span>


 </section>

{/*mobile requiement */}
<section
 onClick={() => onView(candidate)}
 className="
 lg:hidden
 cursor-pointer

 rounded-2xl
shadow-sm

 border-zinc-200

 bg-white

 p-5

 

 transition-all
 duration-300

 hover:border-[#285A48]/30
 hover:shadow-lg

 dark:border-zinc-700
 dark:bg-zinc-900
 "
>
 {/* Header */}
 <div className="flex items-start justify-between gap-3">

 <div className="flex items-center gap-3">

 <img
 src={
 candidate.avatar ??
 `https://ui-avatars.com/api/?name=${candidate.fullName}`
 }
 alt={candidate.fullName}
 className="
 h-14
 w-14
 rounded-full
 border-2
 border-[#285A48]
 object-cover
 dark:border-[#B0E4CC]
 "
 />

 <div className="min-w-0">

 <h3 className="truncate text-base font-bold text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
 {candidate.email}
 </p>

 <p className="mt-1 text-sm font-medium text-[#285A48] dark:text-[#B0E4CC]">
 {candidate.appliedRole}
 </p>

 </div>

 </div>

 <span
 className={`
 rounded-full
 px-3
 py-1

 text-xs
 font-semibold

 ${statusColors[candidate.status]}
 `}
 >
 {candidate.status}
 </span>

 </div>

 {/* Details */}
 <div className="flex justify-between mt-4 items-center">
<div className="flex flex-col gap-4">
<div>
 <p className="text-xs uppercase tracking-wide text-zinc-400">
 Department
 </p>

 <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
 {candidate.department}
 </p>
 </div>

 <div>
 <p className="text-xs uppercase tracking-wide text-zinc-400">
 Location
 </p>

 <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
 {candidate.location}
 </p>
 </div>
</div>
 

 <div className="col-span-2">
 <p className="text-xs uppercase tracking-wide text-zinc-400">
 Applied
 </p>

 <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
 {new Date(candidate.createdAt).toLocaleDateString("en-US", {
 month: "short",
 day: "numeric",
 year: "numeric",
 })}
 </p>
 </div>

 </div>

 {/* Footer */}
 <div className="mt-5 flex items-center justify-end border-t border-zinc-200 pt-4 dark:border-zinc-700">

 <button
 onClick={(e) => {
 e.stopPropagation();
 navigate(`/candidates/${candidate.id}`);
 }}
 className="
 text-sm
 font-semibold
 text-[#285A48]
 transition
 hover:underline

 dark:text-[#B0E4CC]
 "
 >
 View Profile →
 </button>

 </div>

</section>
</>
);
};

export default CandidateCard;