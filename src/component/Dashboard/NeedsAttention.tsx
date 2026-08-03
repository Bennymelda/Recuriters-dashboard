import {
 MdWarningAmber,

 MdPersonSearch,
 MdEventBusy,
 MdWorkOff,
 MdCardGiftcard,
} from "react-icons/md";
import useDashboardNeedsAttention from "./hooks/useNeedAttention";


const DashboardNeedsAttention = () => {
    const { screeningCandidates,overdueInterviews, pendingOffers,  jobsWithoutApplicants,  } = useDashboardNeedsAttention();

const alerts = [
 {
 id: "1",
 title: "Candidates Waiting",
 count: screeningCandidates.length,
 description:
 screeningCandidates.length === 0
 ? "No candidates have been waiting in Screening."
 : `${screeningCandidates.length} candidate${
 screeningCandidates.length > 1 ? "s have" : " has"
 } remained in Screening for over 5 days.`,
 icon: <MdPersonSearch size={22} />,
 color:
 "bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-400",
 },
 {
 id: "2",
 count: overdueInterviews.length,
 title: "Overdue Interviews",
 description:
 overdueInterviews.length === 0
 ? "No overdue interviews."
 : `${overdueInterviews.length} interview${
 overdueInterviews.length > 1 ? "s are" : " is"
 } overdue and needs attention.`,
 icon: <MdEventBusy size={22} />,
 color:
 "bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
 },
 {
 id: "3",
 title: "Pending Offers",
 count: pendingOffers.length,
 description:
 pendingOffers.length === 0
 ? "No pending offers."
 : `${pendingOffers.length} candidate${
 pendingOffers.length > 1 ? "s are" : " is"
 } awaiting an offer response.`,
 icon: <MdCardGiftcard size={22} />,
 color:
 "bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400",
 },
 {
 id: "4",
 title: "Jobs Without Applicants",
 count: jobsWithoutApplicants.length,
 description:
 jobsWithoutApplicants.length === 0
 ? "All active jobs have applicants."
 : `${jobsWithoutApplicants.length} active job${
 jobsWithoutApplicants.length > 1 ? "s have" : " has"
 } not received any applications.`,
 icon: <MdWorkOff size={22} />,
 color:
 "bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
 },
];
 return (
 <section
 className="
 rounded-3xl

 bg-white
 p-6

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <div className="mb-6 flex items-center gap-3">
 <div className="rounded-2xl bg-[#EEF8F3] p-3 text-[#285A48] dark:bg-[#285A48]/15 dark:text-[#B0E4CC]">
 <MdWarningAmber size={24} />
 </div>

 <div>
 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
 Needs Attention
 </h2>

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Important items that require immediate action.
 </p>
 </div>
 </div>

 <div className="space-y-4">
 {alerts.map((alert) => (
 <div
 key={alert.id}
 className="
 flex
 items-center
 justify-between
 rounded-2xl
 border
 border-zinc-100
 p-4
 transition
 hover:border-[#408A71]
 hover:shadow-sm
 dark:border-zinc-700
 "
 >
 <div className="flex items-start gap-4">
 <div
 className={`flex md:h-12 md:w-12 h-10 w-10 items-center justify-center rounded-2xl ${alert.color}`}
 >
 {alert.icon}
 </div>

<div className="flex-1">
 <div className="flex items-center justify-between">

 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {alert.title}
 </h3>

 

 </div>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 {alert.description}
 </p>
</div>



 </div>

 <span
 className="
 rounded-full
 bg-zinc-100
 px-3
 py-1
 text-xs
 font-bold
 text-zinc-700
 dark:bg-zinc-800
 dark:text-zinc-200
 "
 >
 {alert.count}
 </span>
 </div>
 ))}
 </div>
 </section>
 );
};

export default DashboardNeedsAttention;