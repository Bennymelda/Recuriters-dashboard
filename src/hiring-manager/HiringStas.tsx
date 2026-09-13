import { useMemo } from "react";
import {
 MdWorkOutline,
 MdPeopleOutline,
 MdEvent,
 MdGavel,
} from "react-icons/md";

import { useJobStore } from "../store/jobStore";
import { useCandidateStore } from "../store/candidateStore";
import { useAuthStore } from "../store/authStore"; 
import { useTeamStore } from "../store/teamStore";
import {
 findCurrentMember,
 getVisibleJobs,
 getVisibleCandidates,
} from "../utils/roleBasedDataFiltering";

const HiringOverview = () => {
 const user = useAuthStore((state) => state.user);
 const jobs = useJobStore((state) => state.jobs);
 const candidates = useCandidateStore((state) => state.candidates);
 const members = useTeamStore((state) => state.members);

 // Find the current user's team membership
 const currentMember = useMemo(
 () => findCurrentMember(members, user),
 [members, user]
 );

 // Only show jobs assigned to this Hiring Manager
 const visibleJobs = useMemo(
 () => getVisibleJobs(jobs, user, currentMember),
 [jobs, user, currentMember]
 );

 // Only show candidates belonging to assigned jobs
 const visibleCandidates = useMemo(
 () => getVisibleCandidates(candidates, user, currentMember),
 [candidates, user, currentMember]
 );

 const stats = useMemo(() => {
 // Active jobs assigned to this Hiring Manager
 const openJobs = visibleJobs.filter(
 (job) => job.status === "Active"
 ).length;

 // Candidates currently waiting for Hiring Manager approval
 const candidatesToReview = visibleCandidates.filter(
 (candidate) =>
 candidate.status === "Interview" &&
 candidate.hiringApproval?.status === "Pending"
 ).length;

 // Interviews scheduled for today
 const today = new Date().toISOString().split("T")[0];

 const interviewsToday = visibleCandidates.filter((candidate) =>
 candidate.interviewHistory?.some(
 (interview) =>
 interview.date.startsWith(today) &&
 interview.result === "Scheduled"
 )
 ).length;

 // Candidates waiting for Hiring Manager decision
 const pendingDecisions = visibleCandidates.filter(
 (candidate) =>
 candidate.hiringApproval?.status === "Pending"
 ).length;

 return {
 openJobs,
 candidatesToReview,
 interviewsToday,
 pendingDecisions,
 };
 }, [visibleJobs, visibleCandidates]);

 const cards = [
 {
 title: "Open Jobs",
 value: stats.openJobs,
 icon: MdWorkOutline,
 description: "Active positions",
 },
 {
 title: "Candidates to Review",
 value: stats.candidatesToReview,
 icon: MdPeopleOutline,
 description: "Awaiting your review",
 },
 {
 title: "Interviews Today",
 value: stats.interviewsToday,
 icon: MdEvent,
 description: "Scheduled for today",
 },
 {
 title: "Pending Decisions",
 value: stats.pendingDecisions,
 icon: MdGavel,
 description: "Awaiting your decision",
 },
 ];

 return (
 <section className="space-y-6">
 {/* Welcome */}
 <div>
 <h1 className="text-2xl font-bold text-zinc-900 dark:text-white md:text-3xl">
 Good morning,{" "}
 {user?.fullName?.split(" ")[0] || "there"} 👋
 </h1>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 md:text-base">
 Here’s what’s happening with your hiring pipeline.
 </p>
 </div>

 {/* Stat Cards */}
 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
 {cards.map((card) => {
 const Icon = card.icon;

 return (
 <div
 key={card.title}
 className="
 rounded-2xl
 border
 border-zinc-200
 bg-white
 p-5
 transition
 hover:-translate-y-0.5
 hover:shadow-sm
 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 <div className="flex items-start justify-between">
 <div>
 <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
 {card.title}
 </p>

 <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
 {card.value}
 </p>
 </div>

 <div
 className="
 flex
 h-11
 w-11
 items-center
 justify-center
 rounded-xl
 bg-[hashtag#EEF8F3]
 text-[hashtag#408A71]
 dark:bg-[hashtag#408A71]/20
 dark:text-[hashtag#B0E4CC]
 "
 >
 <Icon size={22} />
 </div>
 </div>

 <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
 {card.description}
 </p>
 </div>
 );
 })}
 </div>
 </section>
 );
};

export default HiringOverview;