import {
 MdCalendarToday,
 MdPerson,
 MdCheckCircle,
 MdSchedule,
 MdCancel,
} from "react-icons/md";
import type { Candidate } from "../../../types/candidate";

interface CandidateInterviewHistoryProps {
 candidate: Candidate;
}

const resultColors = {
 Scheduled:
 "bg-[#285A48] text-white dark:bg-[#BOE4CC] dark:text-white",
 Passed:
 "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
 Failed:
 "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
 Pending:
 "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
Cancelled:
 "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200",
};

const resultIcons = {
 Scheduled: <MdSchedule />,
 Passed: <MdCheckCircle />,
 Failed: <MdCancel />,
 Pending: <MdSchedule />,
 Cancelled: <MdCancel />,
};

const CandidateInterviewHistory = ({
 candidate,
}: CandidateInterviewHistoryProps) => {

const formatInterviewDate = (date: string) => {
 const d = new Date(date);

 const day = d.getDate();

 const suffix =
 day % 10 === 1 && day !== 11
 ? "st"
 : day % 10 === 2 && day !== 12
 ? "nd"
 : day % 10 === 3 && day !== 13
 ? "rd"
 : "th";

 const month = d.toLocaleString("en-US", {
 month: "short",
 });

 const year = d.getFullYear();

 return `${day}${suffix} ${month} ${year}`;
};

 return (
    <>
 <section className="rounded-2xl border border-zinc-200 bg-white p-4 md:p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
 <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
 Interview History
 </h2>

 {candidate.interviewHistory.length === 0 ? (
 <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-300">
 No interviews recorded yet.
 </p>
 ) : (
 <div className="relative mt-8">

 {/* Timeline Line */}
 <div className="absolute left-5 top-0 h-full w-px bg-zinc-200 dark:bg-zinc-700" />

 <div className="space-y-8">

 {candidate.interviewHistory.map((interview, index) => (
 <div
 key={interview.id}
 className="relative flex gap-3 md:gap-6"
 >

 {/* Timeline Dot */}
 <div
 className={`
 relative
 z-10

 flex
 h-8
 w-8
 md:h-10
 md:w-10
 shrink-0
 items-center
 justify-center

 rounded-full

 border-4
 border-white

 shadow-md

 dark:border-zinc-900

 ${
 interview.result === "Passed"
 ? "bg-emerald-500"
 : interview.result === "Failed"
 ? "bg-red-500"
 : interview.result === "Scheduled"
 ? "bg-[#285A48] dark:bg-[#B0E4CC]"
 : interview.result === "Cancelled"
 ? "bg-zinc-500 dark:bg-zinc-400"
 : "bg-amber-500"
}
 
 `}
 >
 <span className="text-white text-sm">
 {resultIcons[interview.result]}
 </span>
 </div>

 {/* Interview Card */}
 <div
 className="
 flex-1

 rounded-3xl

 border
 border-zinc-200

 bg-white

 p-4 md:p-6

 shadow-sm

 transition-all
 duration-300

 hover:-translate-y-1
 hover:shadow-lg

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 {/* Header */}
 <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">

 <div>

 <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
 Round {index + 1}
 </p>

 <h3 className="mt-2 text-lg md:text-xl font-semibold text-zinc-900 dark:text-white">
 {interview.stage} Interview
 </h3>

 </div>

 <span
 className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${resultColors[interview.result]}`}
 >
 {resultIcons[interview.result]}
 {interview.result}
 </span>

 </div>

 {/* Meta */}
 <div className="mt-6 flex flex-wrap gap-3 md:gap-6 text-sm text-zinc-500 dark:text-zinc-400">

 <div className="flex items-center gap-2">
 <MdPerson className="text-[#408A71]" />
 <span>{interview.interviewerName}</span>
 </div>

 <div className="flex items-center gap-2">
 <MdCalendarToday className="text-[#408A71]" />
 <span>{formatInterviewDate(interview.date)}</span>
 </div>

 </div>

{/* Interview Notes */}

{interview.note && (
 <div
 className="
 mt-6
 rounded-2xl
 border-l-4
 border-[#285A48] 
 bg-[#e5f7f0]
 p-4 md:p-5
 dark:border-[#BOE4CC]
 dark:bg-[#0f3528]
 "
 >
 <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-gray-200">
 Interview Notes
 </p>

 <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
 {interview.note}
 </p>
 </div>
)}


{interview.feedback && (
 <div
 className="
 mt-4
 rounded-2xl
 border-l-4
 border-[hashtag#408A71]
 bg-zinc-50
 p-4 md:p-5
 dark:bg-zinc-800
 "
 >
 <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
 Interview Feedback
 </p>

 <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
 {interview.feedback}
 </p>
 </div>
)}
 </div>

 </div>
 ))}

 </div>

</div>


 )}

 {candidate.rejection && (
 <div
 className="
 mt-8
 rounded-3xl
 border
 border-red-200
 bg-red-50
 p-6
 dark:border-red-500/20
 dark:bg-red-500/10
 "
 >
 <div className="flex items-center gap-3">
 <MdCancel className="text-red-500" size={26} />

 <div>
 <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
 Candidate Rejected
 </h3>

 <p className="text-sm text-zinc-500">
 This candidate was removed from the hiring process.
 </p>
 </div>
 </div>

 <div className="mt-6 space-y-5">

 <div>
 <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
 Reason
 </p>

 <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
 {candidate.rejection.reason}
 </p>
 </div>

 <div>
 <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
 Recruiter Note
 </p>

 <p className="mt-2 text-sm leading-7 text-zinc-700 dark:text-zinc-300">
 {candidate.rejection.note}
 </p>
 </div>

 <div>
 <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
 Rejected On
 </p>

 <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
 {formatInterviewDate(candidate.rejection.date)}
 </p>
 </div>

 </div>
 </div>
)}

 </section>
 

</>
 );
};

export default CandidateInterviewHistory;