import {
 MdPeopleOutline,
 MdEvent,
 MdCardGiftcard,
 MdVerified,
 MdTrendingUp,
} from "react-icons/md";

import { useCandidateStore } from "../../../store/candidateStore";

const AnalyticsStats = () => {
 const candidates = useCandidateStore((state) => state.candidates);

 const totalApplications = candidates.length;

 const interviews = candidates.filter(
 (candidate) => candidate.status === "Interview"
 ).length;

 const offers = candidates.filter(
 (candidate) => candidate.status === "Offer"
 ).length;

 const hires = candidates.filter(
 (candidate) => candidate.status === "Hired"
 ).length;

 const hiringRate =
 totalApplications > 0
 ? ((hires / totalApplications) * 100).toFixed(1)
 : "0.0";

 const stats = [
 {
 label: "Total Applications",
 value: totalApplications,
 description: "All candidates",
 icon: <MdPeopleOutline size={22} />,
 iconStyle:
 "bg-[#EEF8F3] text-[#408A71] dark:bg-[#408A71]/20 dark:text-[#B0E4CC]",
 },
 {
 label: "Interviews",
 value: interviews,
 description: "Candidates interviewing",
 icon: <MdEvent size={22} />,
 iconStyle:
 "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300",
 },
 {
 label: "Offers",
 value: offers,
 description: "Offers in progress",
 icon: <MdCardGiftcard size={22} />,
 iconStyle:
 "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300",
 },
 {
 label: "Hires",
 value: hires,
 description: "Successfully hired",
 icon: <MdVerified size={22} />,
 iconStyle:
 "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
 },
 {
 label: "Hiring Rate",
 value: `${hiringRate}%`,
 description: "Hires / applications",
 icon: <MdTrendingUp size={22} />,
 iconStyle:
 "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300",
 },
 ];

 return (
 <section
 className="
 grid
 grid-cols-1
 gap-4
 sm:grid-cols-2
 xl:grid-cols-5
 "
 >
 {stats.map((stat) => (
 <div
 key={stat.label}
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-5
 shadow-sm
 transition
 duration-300
 hover:-translate-y-1
 hover:shadow-md

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 <div className="flex items-start justify-between">
 <div
 className={`
 flex
 h-11
 w-11
 items-center
 justify-center
 rounded-2xl
 ${stat.iconStyle}
 `}
 >
 {stat.icon}
 </div>
 </div>

 <div className="mt-5">
 <p
 className="
 text-sm
 font-medium
 text-zinc-500
 dark:text-zinc-400
 "
 >
 {stat.label}
 </p>

 <h3
 className="
 mt-1
 text-2xl
 font-bold
 tracking-tight
 text-zinc-900
 dark:text-white
 "
 >
 {stat.value}
 </h3>

 <p
 className="
 mt-1
 text-xs
 text-zinc-400
 dark:text-zinc-500
 "
 >
 {stat.description}
 </p>
 </div>
 </div>
 ))}
 </section>
 );
};

export default AnalyticsStats;