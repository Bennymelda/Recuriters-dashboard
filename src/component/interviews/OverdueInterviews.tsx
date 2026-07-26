import {
 MdWarningAmber,
 MdCalendarToday,
 MdPerson,
 MdArrowForward,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { Candidate } from "../../types/candidate";

interface OverdueInterviewsProps {
 interviews: {
 candidate: Candidate;
 interview: Candidate["interviewHistory"][number];
 }[];
}

const OverdueInterviews = ({
 interviews,
}: OverdueInterviewsProps) => {
 const navigate = useNavigate();

 const formatDate = (date: string) =>
 new Date(date).toLocaleDateString("en-US", {
 day: "numeric",
 month: "short",
 year: "numeric",
 });

 return (
 <section className="mt-8 rounded-3xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-500/20 dark:bg-zinc-800">
 <div className="mb-6 flex items-center justify-between">
 <div>
 <h2 className="flex items-center gap-2 text-xl font-semibold text-zinc-900 dark:text-white">
 <MdWarningAmber className="text-red-500" />
 Overdue Interviews
 </h2>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 {interviews.length} interview
 {interviews.length !== 1 && "s"} require attention.
 </p>
 </div>

 <div className="rounded-2xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 dark:bg-red-500/20 dark:text-red-300">
 {interviews.length}
 </div>
 </div>

 {interviews.length === 0 ? (
 <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 py-12 dark:border-zinc-700">
 <MdWarningAmber
 size={42}
 className="text-zinc-400"
 />

 <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
 No overdue interviews 🎉
 </p>
 </div>
 ) : (
 <div className="space-y-4">
 {interviews.map(({ candidate, interview }) => (
 <div
 key={interview.id}
 className="rounded-2xl border border-zinc-200 p-5 transition hover:shadow-md dark:border-zinc-700"
 >
 <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
 <div>
 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <div className="mt-3 space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
 <div className="flex items-center gap-2">
 <MdPerson />
 {interview.interviewerName}
 </div>

 <div className="flex items-center gap-2">
 <MdCalendarToday />
 {formatDate(interview.date)}
 </div>
 </div>

 <div className="mt-4 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-500/20 dark:text-red-300">
 {interview.stage} Interview
 </div>
 </div>

 <button
 onClick={() =>
 navigate(`/candidates/${candidate.id}`, {
 state: {
 tab: "interviews",
 },
 })
 }
 className="inline-flex items-center gap-2 rounded-2xl bg-[hashtag#408A71] px-5 py-3 text-sm font-medium text-white transition hover:bg-[hashtag#2f6d58]"
 >
 Manage Interview
 <MdArrowForward />
 </button>
 </div>
 </div>
 ))}
 </div>
 )}
 </section>
 );
};

export default OverdueInterviews;