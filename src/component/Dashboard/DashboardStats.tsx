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
            output: "interviews scheduled ",
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
        <section className="grid mb-10 grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {stats.map((stat) => (
             <div 
           className="  
            group
 relative
 overflow-hidden
 rounded-xl
shadow-sm
 bg-white
 p-4
 md:p-5

 transition-all
 duration-300
 ease-out
 hover:-translate-y-1
 hover:border-zinc-300
 hover:shadow-xl
 dark:border-zinc-800
 dark:bg-zinc-900
 dark:hover:border-zinc-700
 "
             >
                <div className="flex justify-between items-center">
                    <div
 className={`rounded-2xl p-3 transition-transform duration-300 group-hover:scale-110 ${stat.color}`}
 >
 {stat.icon}
 </div>
                    <div className="bg-gray-100 dark:bg-zinc-800  dark:text-white px-2 py-1 rounded-md"><GoArrowUpRight className="text-gray-700 dark:text-white"/></div>
                </div>
                <p className="mt-5 font-semibold text-zinc-800 dark:text-gray-200">{stat.title}</p>
                <p className="text-xl font-bold mt-5 dark:text-gray-300">{stat.value}</p>
                <div className="flex justify-between mt-5">
                 <div className=" bg-green-100 text-xs px-2 rounded-4xl flex gap-1 items-center">
                    <AiOutlineRise />
                    <p className="text-xs">{stat.num}</p>
                </div> 
                <p className="text-sm text-gray-600 font-semibold whitespace-nowrap text-xs dark:text-gray-300">{stat.output}</p>
                </div>
             </div>
            ))}
        </section>
    );
};

export default DashboardStats;

