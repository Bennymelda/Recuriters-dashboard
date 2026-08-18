import {
    MdWork,
    MdPeople,
    MdEvent,
    MdCardGiftcard,
    MdVerified,
} from "react-icons/md";

import { useJobStore } from "../../store/jobStore";
import { useCandidateStore } from "../../store/candidateStore";
import { GoArrowUpRight } from "react-icons/go";
import { AiOutlineRise } from "react-icons/ai";

const DashboardStats = () => {
    const jobs = useJobStore((state) => state.jobs);
    const candidates = useCandidateStore((state) => state.candidates);

    const activeJobs = jobs.filter(
        (job) => job.status === "Active"
    ).length;

    const totalCandidates = candidates.length;

    const interviewsToday = 0; // Replace later
    const offersSent = candidates.filter(
        (candidate) => candidate.status === "Offer"
    ).length;

    const hired = candidates.filter(
        (candidate) => candidate.status === "Hired"
    ).length;

    const stats = [
        {
            title: "Active Jobs",
            output:"total jobs",
            value: activeJobs,
            icon: <MdWork size={26} />,
            num:'5%',
            color:
                "bg-[#EEF8F3] text-[#285A48] dark:bg-[#285A48]/15 dark:text-[#B0E4CC]",
        },
        {
            title: "Candidates",
            output: "total candidates",
            value: totalCandidates,
            icon: <MdPeople size={26} />,
            num:'10%',
            color:
                "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
        },
        {
            title: "Interviews Today",
            output: "Today interviews ",
            value: interviewsToday,
            icon: <MdEvent size={26} />,
            num:'15%',
            color:
                "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
        },
        {
            title: "Offers Sent",
            output: "offers sent",
            value: offersSent,
            num:'20%',
            icon: <MdCardGiftcard size={26} />,
            color:
                "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
        },
        {
            title: "Hired",
            output: " candidates hired",
            value: hired,
            num:'10%',
            icon: <MdVerified size={26} />,
            color:
                "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
        },
    ];

  return (
 <section
 className="
 mb-10

 flex
 w-full
 gap-4
 overflow-x-auto
 pb-3

 scrollbar-thin
 scrollbar-thumb-zinc-300
 scrollbar-track-transparent
 dark:scrollbar-thumb-zinc-700

 xl:grid
 xl:grid-cols-5
 xl:gap-5
 xl:overflow-visible
 xl:pb-0
 "
 >
 {stats.map((stat) => (
 <div
 key={stat.title}
 className="
 group
 relative
 min-w-[230px]
 shrink-0
 overflow-hidden
 rounded-xl
 bg-white
 p-4
 shadow-sm

 transition-all
 duration-300
 ease-out

 hover:-translate-y-1
 hover:shadow-xl

 dark:bg-zinc-900

 xl:min-w-0
 xl:shrink
 "
 >
 {/* Top */}
 <div className="flex items-center justify-between">
 <div
 className={`
 rounded-2xl
 p-3
 transition-transform
 duration-300
 group-hover:scale-110
 ${stat.color}
 `}
 >
 {stat.icon}
 </div>

 <div
 className="
 rounded-md
 bg-gray-100
 px-2
 py-1

 dark:bg-zinc-800
 dark:text-white
 "
 >
 <GoArrowUpRight className="text-gray-700 dark:text-white" />
 </div>
 </div>

 {/* Title */}
 <p
 className="
 mt-5
 font-semibold
 text-zinc-800
 dark:text-gray-200
 "
 >
 {stat.title}
 </p>

 {/* Value */}
 <p
 className="
 mt-5
 text-xl
 font-bold
 text-zinc-900
 dark:text-gray-300
 "
 >
 {stat.value}
 </p>

 {/* Bottom */}
 <div
 className="
 mt-5
 flex
 items-center
 justify-between
 gap-3
 "
 >
 <div
 className="
 flex
 items-center
 gap-1
 rounded-full
 bg-green-100
 px-2
 py-1
 text-xs
 text-green-700

 dark:bg-green-500/15
 dark:text-green-400
 "
 >
 <AiOutlineRise />

 <p className="text-xs">
 {stat.num}
 </p>
 </div>

 <p
 className="
 whitespace-nowrap
 text-xs
 font-semibold
 text-gray-600
 dark:text-gray-300
 "
 >
 {stat.output}
 </p>
 </div>
 </div>
 ))}
 </section>
);
};

export default DashboardStats;

