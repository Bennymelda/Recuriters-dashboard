import {
 MdAssignment,
 MdManageSearch,
 MdCalendarMonth,
 MdDescription,
 MdVerified,
} from "react-icons/md";
import { useCandidateStore } from "../../store/candidateStore";
const PipelineStats = () => {
 const candidates = useCandidateStore((state) => state.candidates);

 const stats = [
 {
 title: "Applied",
 value: candidates.filter(
 (candidate) => candidate.status === "Applied"
 ).length,
 icon: <MdAssignment size={26} />,
 color:
 "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
 border: "hover:border-blue-300",
 },

 {
 title: "Screening",
 value: candidates.filter(
 (candidate) => candidate.status === "Screening"
 ).length,
 icon: <MdManageSearch size={26} />,
 color:
 "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
 border: "hover:border-amber-300",
 },

 {
 title: "Interview",
 value: candidates.filter(
 (candidate) => candidate.status === "Interview"
 ).length,
 icon: <MdCalendarMonth size={26} />,
 color:
 "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
 border: "hover:border-purple-300",
 },

 {
 title: "Offer",
 value: candidates.filter(
 (candidate) => candidate.status === "Offer"
 ).length,
 icon: <MdDescription size={26} />,
 color:
 "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
 border: "hover:border-orange-300",
 },

 {
 title: "Hired",
 value: candidates.filter(
 (candidate) => candidate.status === "Hired"
 ).length,
 icon: <MdVerified size={26} />,
 color:
 "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
 border: "hover:border-emerald-300",
 },
 ];

 return (
<section
 className="
 mt-8
 mb-5
snap-x snap-mandatory scroll-smooth
 flex
 gap-4
scrollbar-none
 overflow-x-auto
 pb-2

 lg:grid
 lg:grid-cols-3
 xl:grid-cols-5
 lg:overflow-visible
 "
>
 {stats.map((stat) => (
 <div
 key={stat.title}
 className="
 group
snap-start
 min-w-[240px]
 shrink-0

 lg:min-w-0

 flex
 items-center
 gap-4

 rounded-2xl

 border
 border-zinc-200

 bg-white

 p-4

 transition-all
 duration-300

 hover:-translate-y-1
 hover:shadow-lg

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <div
 className={`
 flex
 h-11
 w-11
 shrink-0
 items-center
 justify-center

 rounded-2xl

 transition-all
 duration-300

 group-hover:scale-110

 ${stat.color}
 `}
 >
 {stat.icon}
 </div>

 <div className="min-w-0 flex-1">
 <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
 {stat.value}
 </h2>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 {stat.title} candidate
 </p>
 </div>
 </div>
 ))}
</section>


 );
};

export default PipelineStats;