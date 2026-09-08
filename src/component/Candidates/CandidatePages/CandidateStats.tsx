import { useCandidateStore } from "../../../store/candidateStore";
import {
 MdPeople,
 MdDescription,
 MdGroups,
 MdWork,
} from "react-icons/md";

import { useAuthStore } from "../../../store/authStore";
import { useTeamStore } from "../../../store/teamStore";
import {
 findCurrentMember,
 getVisibleCandidates,
} from "../../../utils/roleBasedDataFiltering";

const CandidateStats = () => {
 const candidates = useCandidateStore((state) => state.candidates);
 const user = useAuthStore((state) => state.user);
 const members = useTeamStore((state) => state.members);

 // Find the logged-in user's team member record
 const currentMember = findCurrentMember(members, user);

 // Get candidates the current user is allowed to see
 const visibleCandidates = getVisibleCandidates(
 candidates,
 user,
 currentMember
 );

 // Calculate stats from visible candidates only
 const totalCandidates = visibleCandidates.length;

 const appliedCandidates = visibleCandidates.filter(
 (candidate) => candidate.status === "Applied"
 ).length;

 const interviewCandidates = visibleCandidates.filter(
 (candidate) => candidate.status === "Interview"
 ).length;

 const hiredCandidates = visibleCandidates.filter(
 (candidate) => candidate.status === "Hired"
 ).length;

 const stats = [
 {
 title: "Total Candidates",
 value: totalCandidates,
 icon: <MdPeople size={24} />,
 },
 {
 title: "Applied",
 value: appliedCandidates,
 icon: <MdDescription size={24} />,
 },
 {
 title: "Interview",
 value: interviewCandidates,
 icon: <MdGroups size={24} />,
 },
 {
 title: "Hired",
 value: hiredCandidates,
 icon: <MdWork size={24} />,
 },
 ];

 return (
 <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {stats.map((stat) => (
 <div
 key={stat.title}
 className={`
 group
 relative
 overflow-hidden
 rounded-[16px]
 border
 p-3
 md:p-5
 transition-all
 duration-300
 hover:-translate-y-1
 md:hover:-translate-y-2
 hover:shadow-lg
 ${
 stat.title === "Total Candidates"
 ? "border-[#408A71]  bg-[#408A71] text-white"
 : "border-zinc-100 bg-white dark:bg-zinc-900  hover:border-[#408A71]/40 dark:border-zinc-800 "
 }
 `}
 >
 

 <div className="relative z-10 flex items-start justify-between">
 <div>
 <p
 className={`text-sm font-semibold uppercase tracking-wider ${
 stat.title === "Total Candidates"
 ? "text-zinc-900 dark:text-white/80"
 : "text-zinc-500 dark:text-zinc-400"
 }`}
 >
 {stat.title}
 </p>

 <h2
 className={`mt-4 text-3xl font-bold tracking-tight md:text-4xl ${
 stat.title === "Total Candidates"
 ? "text-zinc-900 dark:text-white"
 : "text-zinc-900 dark:text-white"
 }`}
 >
 {stat.value}
 </h2>

 <div className="mt-4 md:mt-6">
 <span
 className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
 stat.title === "Total Candidates"
 ? "bg-white/20 text-[#225e4a] dark:text-white"
 : "bg-[#EEF8F3] text-[#408A71] dark:bg-[#408A71]/20 dark:text-[#B0E4CC]"
 }`}
 >
 Updated today
 </span>
 </div>
 </div>

 {/* Icon */}
 <div
 className={`
 flex
 h-12
 w-12
 items-center
 justify-center
 rounded-3xl
 shadow-sm
 transition-all
 duration-300
 group-hover:scale-110
 group-hover:-rotate-6
 md:h-16
 md:w-16
 ${
 stat.title === "Total Candidates"
 ? "bg-white/15 text-white"
 : "bg-[#EEF8F3] text-[#408A71] group-hover:bg-[#408A71] group-hover:text-white dark:bg-[#408A71]/20 dark:text-[#B0E4CC]"
 }
 `}
 >
 {stat.icon}
 </div>
 </div>

 {/* Bottom Accent */}
 <div
 className={`relative z-10 mt-4 flex items-center justify-between border-t pt-5 md:mt-8 ${
 stat.title === "Total Candidates"
 ? "border-white/10"
 : "border-zinc-100 dark:border-zinc-700"
 }`}
 >
 <p
 className={`text-sm ${
 stat.title === "Total Candidates"
 ? "text-zinc-500 dark:text-white/80"
 : "text-zinc-500 dark:text-zinc-400"
 }`}
 >
 Recruitment Overview
 </p>

 <span
 className={`text-xs font-medium ${
 stat.title === "Total Candidates"
 ? "text-[#408A71] dark:text-white"
 : "text-[#408A71] dark:text-[#B0E4CC]"
 }`}
 >
 Live Data
 </span>
 </div>
 </div>
 ))}
 </div>
 );
};

export default CandidateStats;