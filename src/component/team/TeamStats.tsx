import {
 MdGroups,
 MdCircle,
 MdWork,
 MdEvent,
 MdArrowForward,
 MdTrendingUp,
} from "react-icons/md";
import { useTeamStore } from "../../store/teamStore";
import { useCandidateStore } from "../../store/candidateStore";

const TeamStats = () => {
 const members = useTeamStore((state) => state.members);
const candidates = useCandidateStore((state) => state.candidates);
 const isThisWeek = (date: string) => {
 const today = new Date();

 const startOfWeek = new Date(today);
 startOfWeek.setDate(today.getDate() - today.getDay());

 const endOfWeek = new Date(startOfWeek);
 endOfWeek.setDate(startOfWeek.getDate() + 6);

 const interviewDate = new Date(date);

 return (
 interviewDate >= startOfWeek &&
 interviewDate <= endOfWeek
 );
};



 const stats = [
 {
 title: "Team Members",
 value: members.length,
 icon: <MdGroups size={28} />,
 num:"12%",
 color:
 "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300",
 },

 {
 title: "Online",
  num:"5.6%",
 value: members.filter(
 (member) => member.status === "Online"
 ).length,
 icon: <MdCircle size={24} />,
 color:
 "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
 },
 {
     num:"4.6%",
 title: "Assigned Jobs",
 value: members.reduce(
 (total, member) => total + member.assignedJobs.length,
 0
 ),
 icon: <MdWork size={28} />,
 color:
 "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300",
 },
 {
 title: "Interviews This Week",
  num:"2.6%",
 value: candidates.reduce(
 (total, candidate) =>
 total +
 candidate.interviewHistory.filter(
 (interview) =>
 interview.result === "Scheduled" &&
 isThisWeek(interview.date)
 ).length,
 0
),


 icon: <MdEvent size={28} />,
 color:
 "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300",
 },
 ];

 return (
 <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
 className={`flex h-8 p-2 w-8 items-center justify-center rounded-2xl ${stat.color}`}
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

export default TeamStats;