import {

 MdEvent,
} from "react-icons/md";
import type { Candidate } from "../../types/candidate";

interface TodaysInterviewsProps {
 interviews: {
 candidate: Candidate;
 interview: Candidate["interviewHistory"][number];
 }[];
}

const TodaysInterviews = ({
 interviews,
}: TodaysInterviewsProps) => {
 const formatTime = (date: string) =>
 new Date(date).toLocaleTimeString([], {
 hour: "numeric",
 minute: "2-digit",
 });

 return (
 <section>

 <div className="mb-5 mt-5">
 <h2 className="text-xl font-semibold dark:text-white">
 Today's Interviews
 </h2>

 </div>

 {interviews.length === 0 ? (
 

<div
 className="
 flex
 min-h-[260px]
 flex-col
 items-center
 justify-center
 rounded-3xl
 border
 border-dashed
 border-zinc-300
 bg-white
 px-2
 md:px-8
 md:py-12
 py-10
 text-center
 dark:border-zinc-700
 dark:bg-zinc-900
 "
>
 <div
 className="
 flex
 h-10
 w-10
 items-center
 justify-center
 rounded-full
 bg-[#EEF8F3]
 dark:bg-[#408A71]/15
 "
 >
 <MdEvent
 size={38}
 className="text-[#408A71] dark:text-[#B0E4CC]"
 />
 </div>

 <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-white">
 No Interviews Today
 </h3>

 <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500 dark:text-zinc-400">
 There are no interviews scheduled for today. Any interviews planned for
 today will automatically appear here.
 </p>

 <div
 className="
 mt-6
 rounded-full
 bg-zinc-100
 px-4
 py-2
 text-xs
 font-medium
 text-zinc-600
 dark:bg-zinc-800
 dark:text-zinc-300
 "
 >
 Enjoy the quiet day 😊
 </div>
</div>
 ) : (
<div className="space-y-4">
 {interviews.map(({ candidate, interview }) => (
 <div
 key={interview.id}
  className="
 group
 rounded-2xl
 border-l-[3px]
 border-l-[#285A48]
 
 border-zinc-200
 bg-white
 p-4
 shadow-xs
 transition-all
 duration-300
 hover:-translate-y-1
 hover:shadow-xl
 dark:border-zinc-700
 dark:border-l-[#B0E4CC]
 dark:bg-zinc-900
 "
 >
 <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

 {/* Mobile + Desktop Left */}
 <div className="flex items-start gap-3">

 <img
 src={
 candidate.avatar ||
 `https://ui-avatars.com/api/?name=${candidate.fullName}`
 }
 alt={candidate.fullName}
 className="
 h-12
 w-12

 shrink-0

 rounded-full

 border-2
 border-[#408A71]

 object-cover

 dark:border-[#B0E4CC]
 "
 />

 <div className="min-w-0 flex-1">

 <div className="flex flex-wrap items-center gap-2">

 <h3 className="truncate font-bold text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <span
 className="
 rounded-full

 bg-purple-100

 px-2.5
 py-1
block
md:hidden
 text-[11px]
 font-semibold

 text-purple-700

 dark:bg-purple-500/20
 dark:text-purple-300
 "
 >
 {interview.stage}
 </span>

 </div>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 {candidate.appliedRole}
 </p>



 <p className="mt-3 text-sm font-semibold text-zinc-900 dark:text-white md:hidden">
 {formatTime(interview.date)}
 </p>

 </div>

 </div>

 <span
 className="
 rounded-full
hidden
md:flex
 bg-purple-100

 px-2.5
 py-1

 text-[11px]
 font-semibold

 text-purple-700

 dark:bg-purple-500/20
 dark:text-purple-300
 "
 >
 {interview.stage}
 </span>


 {/* Desktop Time */}
 <div className="hidden text-center md:block">
 <p className="font-semibold text-zinc-900 dark:text-white">
 {formatTime(interview.date)}
 </p>
 </div>



 {/* Button */}
 {/* Action */}
 <button
 className="
 group
 relative
 overflow-hidden

 rounded-xl
cursor-pointer
 bg-[#285A48]
 px-5
 py-3

 text-sm
 font-semibold
 text-white

 shadow-lg
 shadow-[#285A48]/20

 transition-all
 duration-300

 hover:scale-105
 hover:bg-[#2F6D58]

 animate-pulse
 dark:bg-[#B0E4CC]
 dark:text-black
 "
 >
 Join Interview
 </button>

 </div>
 </div>
 ))}
</div>


 )}
 </section>
 );
};

export default TodaysInterviews;