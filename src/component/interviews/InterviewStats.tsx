import {
 MdEvent,
 MdToday,
 MdCheckCircle,

} from "react-icons/md";
import { useCandidateStore } from "../../store/candidateStore";

const InterviewsStats = () => {




 const candidates = useCandidateStore((state) => state.candidates);
const upcoming = candidates.flatMap((candidate) =>
 candidate.interviewHistory.filter(
 (interview) =>
 interview.result === "Scheduled" ||
 interview.result === "Pending"
 )
).length;
const today = new Date().toDateString();

const todayInterviews = candidates.flatMap((candidate) =>
 candidate.interviewHistory.filter(
 (interview) =>
 new Date(interview.date).toDateString() === today &&
 (interview.result === "Scheduled" ||
 interview.result === "Pending")
 )
).length;
const completed = candidates.flatMap((candidate) =>
 candidate.interviewHistory.filter(
 (interview) =>
 interview.result === "Passed" ||
 interview.result === "Failed"
 )
).length;



const stats = [
 {
 title: "Upcoming",
 value: upcoming,
 icon: MdEvent,
 color:
 "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
 },
 {
 title: "Today",
 value: todayInterviews,
 icon: MdToday,
 color:
 "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
 },
 {
 title: "Completed",
 value: completed,
 icon: MdCheckCircle,
 color:
 "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
 },
 
];
 return (
<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
 {stats.map((stat) => {
 const Icon = stat.icon;

 return (
 <div
 key={stat.title}
 className="
 group
 relative
 overflow-hidden
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-4
 
 shadow-sm
 transition-all
 duration-300
 hover:-translate-y-1
 hover:shadow-xl
 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Decorative Circle */}
 <div
 className="
 absolute
 -right-6
 -top-6
 h-24
 w-24
 rounded-full
 bg-zinc-100/60
 blur-xl
 dark:bg-zinc-700/20
 "
 />

 <div className="relative flex items-start justify-between">
 <div>
 <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
 {stat.title}
 </p>

 <h2 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
 {stat.value}
 </h2>

 <span
 className="
 mt-4
 inline-flex
 rounded-full
 bg-zinc-100
 px-3
 py-1
 text-xs
 font-semibold
 text-zinc-600
 dark:bg-zinc-700
 dark:text-zinc-300
 "
 >
 Active
 </span>
 </div>

 <div
 className={`
 flex
 h-16
 w-16
 items-center
 justify-center
 rounded-2xl
 shadow-sm
 transition-transform
 duration-300
 group-hover:scale-110
 ${stat.color}
 `}
 >
 <Icon size={30} />
 </div>
 </div>
 </div>
 );
 })}
</section>
 );
};

export default InterviewsStats;