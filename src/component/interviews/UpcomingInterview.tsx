import { useNavigate } from "react-router";
import type { Candidate } from "../../types/candidate";
import { MdEvent } from "react-icons/md";


interface UpcomingInterviewsProps {
 interviews: {
 candidate: Candidate;
 interview: Candidate["interviewHistory"][number];
 }[];
}

const UpcomingInterviews = ({
 interviews,
}: UpcomingInterviewsProps) => {

 const navigate=useNavigate()
 const formatDate = (date: string) =>
 new Date(date).toLocaleDateString("en-US", {
 day: "numeric",
 month: "short",
 year: "numeric",
 });
 const formatTime = (date: string) =>
 new Date(date).toLocaleTimeString([], {
 hour: "numeric",
 minute: "2-digit",
 });


if(interviews.length === 0){
    return(<>
    <div
 className="
 flex
 flex-col
 items-center
 justify-center
animate-fade
 rounded-3xl
 border
 border-dashed
 border-zinc-300

 bg-zinc-50
px-4
 md:px-6
 py-10
 md:py-16

 text-center

 dark:border-zinc-700
 dark:bg-zinc-900/40
 "
>
 <div
 className="
 flex
 h-20
 w-20
 items-center
 justify-center

 rounded-full

 bg-[#EEF8F3]

 dark:bg-[#408A71]/15
 "
 >
 <MdEvent
 size={35}
 className="text-[#408A71] dark:text-[#B0E4CC]"
 />
 </div>

 <h3 className="mt-4 md:mt-6 text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
 No Upcoming Interviews
 </h3>

 <p className="mt-3 max-w-md text-sm leading-7 text-zinc-500 dark:text-zinc-400">
 Interviews that are scheduled from the Hiring Pipeline will
 automatically appear here. Once scheduled, recruiters can manage,
 reschedule, and leave interview feedback from this page.
 </p>

 <button
 onClick={() => navigate("/pipeline")}
 className="
 mt-8
 rounded-2xl
 bg-[#408A71]
 px-6
 py-3

 text-sm
 font-semibold
 text-white

 transition-all
 duration-300

 hover:-translate-y-0.5
 hover:bg-[#2F6D58]
 hover:shadow-lg
 "
 >
 Go to Hiring Pipeline
 </button>
</div>
    </>)
}
return(
    <>
 
<div className="w-full xl:w-1/2">
 <h2 className="mt-1 mb-4 text-2xl font-bold text-zinc-900 dark:text-white">
 Upcoming Interviews
 </h2>

 <div className="flex flex-col gap-4">
 {interviews.map(({ candidate, interview }) => (
 <div
 key={interview.id}
 className="
 group
 rounded-2xl
 border-l-[3px]
 border-l-[#285A48]
 border
 border-zinc-200
 bg-white
 p-4
 shadow-sm
 transition-all
 duration-300
 hover:-translate-y-1
 hover:shadow-lg
 dark:border-zinc-700
 dark:border-l-[#B0E4CC]
 dark:bg-zinc-900
 "
 >
 {/* Desktop */}
 <div className="hidden md:flex items-center justify-between gap-4">

 <div className="flex items-center gap-3">
 <img
 src={
 candidate.avatar ||
 `https://ui-avatars.com/api/?name=${candidate.fullName}`
 }
 alt={candidate.fullName}
 className="h-10 w-10 rounded-full border-2 border-[#408A71] object-cover dark:border-[#B0E4CC]"
 />

 <div>
 <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 {candidate.appliedRole}
 </p>
 </div>
 </div>

 <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
 {interview.stage}
 </span>

 <div className="flex items-center gap-3">
 <p className="text-sm font-semibold dark:text-gray-200">
 {formatDate(interview.date)}
 </p>

 <p className="text-sm font-semibold dark:text-gray-200">
 {formatTime(interview.date)}
 </p>
 </div>

 </div>

 {/* Mobile */}
 <div className="md:hidden">

 <div className="flex items-center gap-3">

 <img
 src={
 candidate.avatar ||
 `https://ui-avatars.com/api/?name=${candidate.fullName}`
 }
 alt={candidate.fullName}
 className="h-11 w-11 rounded-full border-2 border-[#408A71] object-cover dark:border-[#B0E4CC]"
 />

 <div className="min-w-0 flex-1 ">

    <div className="flex  gap-2 mb-1">
<h3 className="truncate text-sm font-bold text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>
 <span className="rounded-full bg-purple-100 px-3 py- text-xs font-semibold text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
 {interview.stage}
 </span>
    </div>
 

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 {candidate.appliedRole}
 </p>
 </div>

 </div>

 <div className="mt-4  flex items-center justify-between">

 

 <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
 {formatDate(interview.date)}
 </p>

 <p className="text-sm font-semibold text-zinc-900 dark:text-white">
 {formatTime(interview.date)}
 </p>


 </div>

 </div>
 </div>
 ))}
 </div>
</div>

    </>
)

};

export default UpcomingInterviews;