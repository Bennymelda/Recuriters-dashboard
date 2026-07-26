import {
 MdAccessTime,
 MdPerson,
 MdWork,
 MdArrowForward,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import type { Candidate } from "../../types/candidate";

interface NextInterviewCardProps {
 interview:
 | {
 candidate: Candidate;
 interview: Candidate["interviewHistory"][number];
 }
 | null;
}

const NextInterviewCard = ({
 interview,
}: NextInterviewCardProps) => {
 const navigate = useNavigate();

 if (!interview) {
 return (
 <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
 <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
 Next Interview
 </h2>

 <p className="mt-6 text-zinc-500 dark:text-zinc-400">
 No upcoming interviews scheduled.
 </p>
 </section>
 );
 }

 const { candidate, interview: details } = interview;

 const interviewDate = new Date(details.date);

 const getTimeUntilInterview = (date: Date) => {
 const diff = date.getTime() - Date.now();

 const minutes = Math.floor(diff / (1000 * 60));

 const hours = Math.floor(minutes / 60);

 const days = Math.floor(hours / 24);

 if (minutes < 60) {
 return `Starts in ${minutes} min`;
 }

 if (hours < 24) {
 return `Starts in ${hours} hour${hours > 1 ? "s" : ""}`;
 }

 if (days === 1) {
 return `Tomorrow • ${date.toLocaleTimeString([], {
 hour: "numeric",
 minute: "2-digit",
 })}`;
 }

 return `In ${days} days`;
};

 return (
 <section className="rounded-3xl bg-gradient-to-r from-[hashtag#408A71] to-[hashtag#5BB08D] p-8 text-white shadow-lg">
 <p className="text-sm uppercase tracking-widest opacity-80">
 Next Interview
 </p>

 <h2 className="mt-3 text-3xl font-bold">
 {candidate.fullName}
 </h2>

 <p className="mt-1 text-lg opacity-90">
 {candidate.appliedRole}
 </p>

 <div className="mt-8 grid gap-5 md:grid-cols-3">
 <div className="flex items-center gap-3">
 <MdAccessTime size={22} />
 <div>
 <p className="text-sm opacity-80">Time</p>
 <p className="font-semibold">
 {interviewDate.toLocaleString()}
 </p>
 </div>
 </div>

 <div className="flex items-center gap-3">
 <MdPerson size={22} />
 <div>
 <p className="text-sm opacity-80">Interviewer</p>
 <p className="font-semibold">
 {details.interviewerName}
 </p>
 </div>
 </div>

 <div className="flex items-center gap-3">
 <MdWork size={22} />
 <div>
 <p className="text-sm opacity-80">Stage</p>
 <p className="font-semibold">
 {details.stage}
 </p>
 </div>
 </div>
 </div>

 <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
 <div className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
 {getTimeUntilInterview(interviewDate)}
 </div>

 <button
 onClick={() =>
 navigate(`/candidates/${candidate.id}`, {
 state: {
 tab: "interviews",
 },
 })
 }
 className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-[hashtag#408A71] transition hover:scale-105"
 >
 Manage Interview
 <MdArrowForward />
 </button>
 </div>
 </section>
 );
};

export default NextInterviewCard;