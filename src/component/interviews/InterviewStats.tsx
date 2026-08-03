import {
 MdEvent,
 MdToday,
 MdCheckCircle,
 MdTrendingUp,
 MdArrowForward,

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
 
 num:"2.6%",
 icon: <MdEvent size={38} />,
 color:
 "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
 },
 {
 title: "Today",
 value: todayInterviews,
 icon: <MdToday size={38} />,
 num:"2.2%",
 color:
 "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
 },
 {
 title: "Completed",

 value: completed,
 num:"6.6%",
icon: <MdCheckCircle size={38} />,
 color:
 "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
 },
 
];
 return (


 <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
 {stats.map((stat) => (
    <>
    <div  key={stat.title}
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-4 
 md:p-6
 
 transition
 hover:-translate-y-1
 hover:shadow-lg
 dark:border-zinc-700
 dark:bg-zinc-900
 ">
        <div className="flex justify-between">
            <p className="text-sm font-bold text-zinc-500 dark:text-zinc-200">
 {stat.title}
 </p>
  <div
 className={`flex h-10 w-10 md:h-12 p-2 md:w-12 items-center justify-center rounded-2xl ${stat.color}`}
 >
 {stat.icon}
 </div>
        </div>
         <h2 className="mt-3 mb-4 text-4xl font-bold text-zinc-900 dark:text-white">
 {stat.value}
 </h2>
        <div className="flex justify-between ">
            <div className="flex items-center gap-2">
            <div className="flex text-xs items-center bg-green-100 px-1 rounded-xl">
                <MdTrendingUp />
               <p className="text-xs">{stat.num}</p> 
            </div>
            <p className="text-xs dark:text-gray-200">last period</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-xl dark:bg-zinc-800">
               <MdArrowForward className="text-gray-700 dark:text-gray-200" />
               
            </div>
        </div>

    </div>

</>
 ))}
 </section>

 );
};

export default InterviewsStats;