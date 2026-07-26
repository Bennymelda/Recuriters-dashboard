import {
    MdWork,
    MdPeople,
    MdEvent,
    MdCardGiftcard,
    MdVerified,
} from "react-icons/md";

import { useJobStore } from "../../store/jobStore";
import { useCandidateStore } from "../../store/candidateStore";

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
            value: activeJobs,
            icon: <MdWork size={26} />,
            color:
                "bg-[#EEF8F3] text-[#285A48] dark:bg-[#285A48]/15 dark:text-[#B0E4CC]",
        },
        {
            title: "Candidates",
            value: totalCandidates,
            icon: <MdPeople size={26} />,
            color:
                "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
        },
        {
            title: "Interviews Today",
            value: interviewsToday,
            icon: <MdEvent size={26} />,
            color:
                "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
        },
        {
            title: "Offers Sent",
            value: offersSent,
            icon: <MdCardGiftcard size={26} />,
            color:
                "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
        },
        {
            title: "Hired",
            value: hired,
            icon: <MdVerified size={26} />,
            color:
                "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400",
        },
    ];

    return (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-6
 shadow-sm
 transition-all
 duration-300
 hover:-translate-y-1
 hover:shadow-lg

 dark:border-zinc-700
 dark:bg-zinc-900
 "
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                {stat.title}
                            </p>

                            <h2 className="mt-4 text-4xl font-bold text-zinc-900 dark:text-white">
                                {stat.value}
                            </h2>
                        </div>

                        <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
                        >
                            {stat.icon}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default DashboardStats;

