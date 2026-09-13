import { useMemo } from "react";
import type { Candidate } from "../types/candidate";
import type { Job } from "../types/job";

interface RecentHiringActivityProps {
 candidates: Candidate[];
 jobs: Job[];
}

interface Activity {
 id: string;
 type:
 | "stage"
 | "approval"
 | "offer"
 | "hired"
 | "rejected";
 title: string;
 description: string;
 date: string;
}

const RecentHiringActivity = ({
 candidates,
 jobs,
}: RecentHiringActivityProps) => {
 const activities = useMemo(() => {
 const activityList: Activity[] = [];

 candidates.forEach((candidate) => {
 const job = jobs.find((job) => job.id === candidate.jobId);
 const jobTitle = job?.title ?? candidate.appliedRole;

 // Stage update
 if (candidate.stageUpdatedAt) {
 activityList.push({
 id: `${candidate.id}-stage`,
 type: "stage",
 title: "Candidate moved",
 description: `${candidate.fullName} moved to ${candidate.status} for ${jobTitle}.`,
 date: candidate.stageUpdatedAt,
 });
 }

 // Hiring approval
 if (
 candidate.hiringApproval?.status === "Approved" &&
 candidate.hiringApproval.reviewedAt
 ) {
 activityList.push({
 id: `${candidate.id}-approval-approved`,
 type: "approval",
 title: "Hiring decision approved",
 description: `${candidate.fullName} was approved for ${jobTitle}.`,
 date: candidate.hiringApproval.reviewedAt,
 });
 }

 if (
 candidate.hiringApproval?.status === "Rejected" &&
 candidate.hiringApproval.reviewedAt
 ) {
 activityList.push({
 id: `${candidate.id}-approval-rejected`,
 type: "approval",
 title: "Hiring decision rejected",
 description: `${candidate.fullName} was not approved for ${jobTitle}.`,
 date: candidate.hiringApproval.reviewedAt,
 });
 }

 // Offer sent
 if (candidate.offer?.status === "Sent" && candidate.offer.sentAt) {
 activityList.push({
 id: `${candidate.id}-offer-sent`,
 type: "offer",
 title: "Offer sent",
 description: `An offer was sent to ${candidate.fullName} for ${jobTitle}.`,
 date: candidate.offer.sentAt,
 });
 }

 // Offer accepted
 if (
 candidate.offer?.status === "Accepted" &&
 candidate.offer.respondedAt
 ) {
 activityList.push({
 id: `${candidate.id}-offer-accepted`,
 type: "offer",
 title: "Offer accepted",
 description: `${candidate.fullName} accepted the offer for ${jobTitle}.`,
 date: candidate.offer.respondedAt,
 });
 }

 // Candidate hired
 if (candidate.hiredAt) {
 activityList.push({
 id: `${candidate.id}-hired`,
 type: "hired",
 title: "Candidate hired",
 description: `${candidate.fullName} was hired for ${jobTitle}.`,
 date: candidate.hiredAt,
 });
 }

 // Candidate rejected
 if (candidate.rejection?.date) {
 activityList.push({
 id: `${candidate.id}-rejected`,
 type: "rejected",
 title: "Candidate rejected",
 description: `${candidate.fullName} was rejected from ${jobTitle}.`,
 date: candidate.rejection.date,
 });
 }
 });

 return activityList
 .filter((activity) => {
 const time = new Date(activity.date).getTime();
 return !Number.isNaN(time);
 })
 .sort(
 (a, b) =>
 new Date(b.date).getTime() -
 new Date(a.date).getTime()
 )
 .slice(0, 6);
 }, [candidates, jobs]);

 const formatDate = (date: string) => {
 return new Date(date).toLocaleDateString("en-US", {
 month: "short",
 day: "numeric",
 year: "numeric",
 });
 };

 const formatTime = (date: string) => {
 return new Date(date).toLocaleTimeString("en-US", {
 hour: "numeric",
 minute: "2-digit",
 });
 };

 const getIcon = (type: Activity["type"]) => {
 switch (type) {
 case "stage":
 return "↗";

 case "approval":
 return "✓";

 case "offer":
 return "✉";

 case "hired":
 return "🎉";

 case "rejected":
 return "×";

 default:
 return "•";
 }
 };

 return (
 <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
 <div>
 <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
 Recent Activity
 </h2>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 Recent activity across your assigned candidates and jobs.
 </p>
 </div>

 {activities.length === 0 ? (
 <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 p-8 text-center dark:border-white/10">
 <p className="font-medium text-zinc-700 dark:text-zinc-300">
 No recent activity
 </p>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 Candidate and hiring activity will appear here.
 </p>
 </div>
 ) : (
 <div className="mt-6 divide-y divide-zinc-100 dark:divide-white/10">
 {activities.map((activity) => (
 <div
 key={activity.id}
 className="flex gap-4 py-4 first:pt-0 last:pb-0"
 >
 <div
 className="
 flex
 h-10
 w-10
 shrink-0
 items-center
 justify-center
 rounded-full
 bg-zinc-100
 text-sm
 font-bold
 text-zinc-600
 dark:bg-zinc-800
 dark:text-zinc-300
 "
 >
 {getIcon(activity.type)}
 </div>

 <div className="min-w-0 flex-1">
 <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {activity.title}
 </h3>

 <span className="text-xs text-zinc-400 dark:text-zinc-500">
 {formatDate(activity.date)} ·{" "}
 {formatTime(activity.date)}
 </span>
 </div>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 {activity.description}
 </p>
 </div>
 </div>
 ))}
 </div>
 )}
 </section>
 );
};

export default RecentHiringActivity;