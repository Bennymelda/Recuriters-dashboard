import { useMemo } from "react";
import type { Candidate } from "../types/candidate";
import type { Job } from "../types/job";

interface UpcomingInterviewsProps {
 candidates: Candidate[];
 jobs: Job[];
 onViewCandidate: (candidate: Candidate) => void;
}

const UpcomingInterviews = ({
 candidates,
 jobs,
 onViewCandidate,
}: UpcomingInterviewsProps) => {
 const upcomingInterviews = useMemo(() => {
 const now = new Date();

 const interviews = candidates.flatMap((candidate) => {
 const candidateInterviews = candidate.interviewHistory ?? [];

 return candidateInterviews
 .filter((interview) => {
 // Only show scheduled interviews
 if (interview.result !== "Scheduled") {
 return false;
 }

 // Only show upcoming interviews
 const interviewDate = new Date(interview.date);

 return (
 !Number.isNaN(interviewDate.getTime()) &&
 interviewDate >= now
 );
 })
 .map((interview) => ({
 candidate,
 interview,
 }));
 });

 // Soonest interview first
 return interviews.sort(
 (a, b) =>
 new Date(a.interview.date).getTime() -
 new Date(b.interview.date).getTime()
 );
 }, [candidates]);

 const getJobTitle = (jobId: string) => {
 return (
 jobs.find((job) => job.id === jobId)?.title ??
 "Unknown Job"
 );
 };

 const formatInterviewDate = (date: string) => {
 const interviewDate = new Date(date);

 if (Number.isNaN(interviewDate.getTime())) {
 return "Date unavailable";
 }

 return interviewDate.toLocaleDateString("en-US", {
 weekday: "short",
 month: "short",
 day: "numeric",
 year: "numeric",
 });
 };

 const formatInterviewTime = (date: string) => {
 const interviewDate = new Date(date);

 if (Number.isNaN(interviewDate.getTime())) {
 return "";
 }

 return interviewDate.toLocaleTimeString("en-US", {
 hour: "numeric",
 minute: "2-digit",
 });
 };

 const getInitials = (fullName: string) => {
 return fullName
 .split(" ")
 .map((name) => name[0])
 .join("")
 .slice(0, 2)
 .toUpperCase();
 };

 return (
 <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-zinc-900">
 {/* Header */}
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
 Upcoming Interviews
 </h2>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 Interviews scheduled with candidates for your assigned jobs.
 </p>
 </div>

 {upcomingInterviews.length > 0 && (
 <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
 {upcomingInterviews.length} Upcoming
 </span>
 )}
 </div>

 {/* Empty State */}
 {upcomingInterviews.length === 0 ? (
 <div className="mt-5 rounded-2xl border border-dashed border-zinc-200 p-8 text-center dark:border-white/10">
 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-lg dark:bg-zinc-800">
 📅
 </div>

 <p className="mt-3 font-medium text-zinc-700 dark:text-zinc-300">
 No upcoming interviews
 </p>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 Scheduled interviews for your candidates will appear here.
 </p>
 </div>
 ) : (
 <div className="mt-5 space-y-3">
 {upcomingInterviews.map(({ candidate, interview }) => (
 <div
 key={`${candidate.id}-${interview.date}-${interview.stage}`}
 className="flex flex-col gap-4 rounded-2xl border border-zinc-200 p-4 transition hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20 md:flex-row md:items-center md:justify-between"
 >
 {/* Candidate */}
 <div className="flex min-w-0 items-center gap-4">
 {candidate.avatar ? (
 <img
 src={candidate.avatar}
 alt={candidate.fullName}
 className="h-12 w-12 shrink-0 rounded-full object-cover"
 />
 ) : (
 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
 {getInitials(candidate.fullName)}
 </div>
 )}

 <div className="min-w-0">
 <h3 className="truncate font-semibold text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
 {getJobTitle(candidate.jobId)}
 </p>
 </div>
 </div>

 {/* Interview Information */}
 <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm md:grid-cols-3">
 {/* Stage */}
 <div>
 <p className="text-xs text-zinc-400 dark:text-zinc-500">
 Interview
 </p>

 <p className="mt-1 font-medium text-zinc-700 dark:text-zinc-300">
 {interview.stage}
 </p>
 </div>

 {/* Date */}
 <div>
 <p className="text-xs text-zinc-400 dark:text-zinc-500">
 Date
 </p>

 <p className="mt-1 font-medium text-zinc-700 dark:text-zinc-300">
 {formatInterviewDate(interview.date)}
 </p>

 <p className="text-xs text-zinc-500 dark:text-zinc-400">
 {formatInterviewTime(interview.date)}
 </p>
 </div>

 {/* Status */}
 <div>
 <p className="text-xs text-zinc-400 dark:text-zinc-500">
 Status
 </p>

 <span className="mt-1 inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
 Scheduled
 </span>
 </div>
 </div>

 {/* View Candidate */}
 <button
 type="button"
 onClick={() => onViewCandidate(candidate)}
 className="shrink-0 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5"
 >
 View Candidate
 </button>
 </div>
 ))}
 </div>
 )}
 </section>
 );
};

export default UpcomingInterviews;