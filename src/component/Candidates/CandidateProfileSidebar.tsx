import { MdArrowForward, MdClose } from "react-icons/md";
import type { Candidate } from "../../types/candidate";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
interface CandidateProfileSidebarProps {
 candidate: Candidate | null;
 isOpen: boolean;
 onClose: () => void;
}

const CandidateProfileSidebar = ({
 candidate,
 isOpen,
 onClose,
}: CandidateProfileSidebarProps) => {
    const navigate = useNavigate();
useEffect(() => {
 if (isOpen) {
 document.body.style.overflow = "hidden";
 } else {
 document.body.style.overflow = "";
 }

 return () => {
 document.body.style.overflow = "";
 };
}, [isOpen]);
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
 return (
 <>
 {/* Overlay */}
 {isOpen && (
 <div
 onClick={onClose}
 className="fixed  inset-0 z-40 bg-black/10 backdrop-blur-sm"
 />
 )}

 {/* Sidebar */}
 <aside
 className={`fixed right-0 top-0 z-50 h-screen w-full max-w-md lg:max-w-lg transform overflow-y-auto border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 dark:border-zinc-900 dark:bg-zinc-900 ${
 isOpen ? "translate-x-0" : "translate-x-full"
 }`}
 >
 {/* Header */}
 <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-zinc-700">

 <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
 Candidate Preview
 </h2>

 <button
 onClick={onClose}
 className="rounded-lg cursor-pointer text-[#091413] dark:text-[#B0E4CC] p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
 >
 <MdClose size={22} />
 </button>

 </div>

 {/* Body */}
 <div className="p-6">

 {!candidate ? (
 <div className="flex h-96 items-center justify-center">

 <p className="text-center text-slate-500">
 Select a candidate to preview their profile.
 </p>

 </div>
 ) : (
 <div className="space-y-2">

 {/* Hero */}
<div className=" bg-white p-4 md:p-6 text-center  dark:border-zinc-700 dark:bg-zinc-900">

 <div className="relative mx-auto h-24 w-24">
 <img
 src={
 candidate.avatar ||
 "https://ui-avatars.com/api/?name=" + candidate.fullName
 }
 alt={candidate.fullName}
 className="h-24 w-24 rounded-full border-4 border-[#408A71] object-cover shadow-md dark:border-[#B0E4CC]"
 />

 {/* Status Dot */}
 <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-900" />
 </div>

 {/* Name */}
 <h2 className="mt-5 text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
 {candidate.fullName}
 </h2>

 {/* Applied Role */}
 <p className="mt-1 text-sm font-medium text-[#408A71] dark:text-[#B0E4CC]">
 {candidate.appliedRole}
 </p>

 {/* Status */}
 <div className="mt-4 flex justify-center">
 <span
 className={`rounded-full px-4 py-1 text-xs font-semibold ${
statusColors[candidate.status]
 }`}
 >
 {candidate.status}
 </span>
 </div>

 {/* Location + Department */}
 <div className="mt-5 flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
 <span>{candidate.location}</span>

 <span className="text-zinc-300 dark:text-zinc-600">•</span>

 <span>{candidate.department}</span>
 </div>

 {/* Bio */}
 <p className="mt-5 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
 {candidate.bio}
 </p>

</div>




{/* Core Skills */}
<div className=" mt-4 rounded-3xl  bg-white p-6 transition-all duration-300 dark:border-zinc-700 dark:bg-zinc-900">

 {/* Header */}
 <div className="flex items-center justify-between">
 <div>
 <h3 className="text-lg text-center font-semibold text-zinc-900 dark:text-zinc-100">
 Core Skills
 </h3>

 <p className="mt-1 text-sm text-center mb-4 text-zinc-500 dark:text-zinc-400">
 Strong technical capabilities and professional expertise.
 </p>
 </div>


 </div>

 {/* Skills */}
 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 ">

 {candidate.skills.map((skill) => (
 <div
 key={skill}
 className="group flex items-center gap-3 transition-all duration-300 hover:translate-x-1"
 >
 {/* Animated Dot */}
 <span className="flex h-3 w-3 items-center justify-center">
 <span className="h-2 w-2 rounded-full bg-[#408A71] ring-4 ring-[#408A71]/15 transition-all duration-300 group-hover:scale-125 group-hover:ring-[#408A71]/30 dark:bg-[#B0E4CC] dark:ring-[#B0E4CC]/15 dark:group-hover:ring-[#B0E4CC]/30" />
 </span>

 {/* Skill */}
 <span className="text-sm font-medium text-zinc-700 transition-colors duration-300 group-hover:text-[#408A71] dark:text-zinc-200 dark:group-hover:text-[#B0E4CC]">
 {skill}
 </span>
 </div>
 ))}

 </div>

</div>


 {/* View Full Profile */}
 <button
 onClick={() => navigate(`/candidates/${candidate.id}`)}
 className="
 group
 
 flex
 w-full
 items-center
 justify-center
 gap-3

 rounded-2xl

 bg-[#408A71]

 px-5
 py-4

 text-sm
 font-semibold
 text-white
 dark:text-gray-700
 shadow-lg
 shadow-[#408A71]/20
mt-5
 transition-all
 duration-300
dark:bg-[#B0E4CC]
 hover:-translate-y-0.5
 hover:bg-[#35735D]
 hover:shadow-xl
 hover:dark:text-white
 hover:shadow-[#408A71]/30
cursor-pointer
 active:scale-[0.98]
 "
>
 View Details

 <MdArrowForward
 size={20}
 className="transition-transform duration-300 group-hover:translate-x-1"
 />
</button>

</div>


 )}

 </div>
 </aside>
 </>
 );
};

export default CandidateProfileSidebar;