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
import { AiOutlineRise } from "react-icons/ai";

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
 num: "25%",
    iconBg: "bg-blue-50 dark:bg-blue-500/15",
    iconColor: "text-blue-600 dark:text-blue-400",
 },
 {
 title: "Candidates to Review",
 value: stats.candidatesToReview,
 icon: MdPeopleOutline,
 description: "Awaiting your review",
    num: "20%",
    iconBg: "bg-amber-50 dark:bg-amber-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
 },
 {
 title: "Interviews Today",
 value: stats.interviewsToday,
 icon: MdEvent,
 description: "Scheduled for today",
  num: "60%",
    iconBg: "bg-cyan-50 dark:bg-cyan-500/15",
    iconColor: "text-cyan-600 dark:text-cyan-400",
 },
 {
 title: "Pending Decisions",
 value: stats.pendingDecisions,
 icon: MdGavel,
 description: "Awaiting your decision",
   num: "50%",
    iconBg: "bg-orange-50 dark:bg-orange-500/15",
    iconColor: "text-orange-600 dark:text-orange-400",
 },
 ];

 return (
 <section className="space-y-6">



 {/* Stat Cards */}
 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
 {cards.map((card) => {
 const Icon = card.icon;

 return (
 <div
 key={card.title}
 className="
 rounded-xl

 bg-white
 p-5
 shadow-sm
 transition
 hover:-translate-y-0.5
 hover:shadow-sm

 dark:bg-zinc-900
 "
 >
 <div className="flex items-start justify-between">
 <div>
 <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
 {card.title}
 </p>

 <p className="mt-3 text-2xl font-semibold text-zinc-900 dark:text-white">
 {card.value}
 </p>
 </div>

      <div
  className={`
    flex
    h-11
    w-11
    items-center
    justify-center
    rounded-xl
    ${card.iconBg}
    ${card.iconColor}
  `}
>
  <Icon size={22} />
</div>
 </div>
<button
className="text-red-900 bg-blue-700"
     onClick={() => {
     useAuthStore.getState().setRole("Recruiter");
     window.location.reload();
     }}
    >Test</button>
<div
               className="
               mt-5
               flex
               items-center
               
               gap-3
               "
               >
               <div
               className="
               flex
               items-center
               gap-1
               rounded-full
               bg-green-100
               px-2
               py-1
               text-xs
               text-green-700
              
               dark:bg-green-500/15
               dark:text-green-400
               "
               >
               <AiOutlineRise />
              
               <p className="text-xs">
               {card.num}
               </p>
               </div>
              
               <p
               className="
               whitespace-nowrap
               text-xs
               font-semibold
               text-gray-600
               dark:text-gray-300
               "
               >
               {card.description}
               </p>
               </div>
 </div>
 );
 })}
 </div>
 </section>
 );
};

export default HiringOverview;