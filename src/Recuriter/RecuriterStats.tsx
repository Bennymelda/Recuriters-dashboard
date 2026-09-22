import { useMemo } from "react";
import {
  MdWorkOutline,
  MdPeopleOutline,
  MdEvent,
  MdPersonSearch,
  MdGavel,
  MdDescription,
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

const RecruiterOverview = () => {
  const user = useAuthStore((state) => state.user);
  const jobs = useJobStore((state) => state.jobs);
  const candidates = useCandidateStore((state) => state.candidates);
  const members = useTeamStore((state) => state.members);

  // Find the current user's team membership
  const currentMember = useMemo(
    () => findCurrentMember(members, user),
    [members, user]
  );

  // Only show jobs the Recruiter is assigned to
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
    // Active jobs assigned to this Recruiter
    const activeJobs = visibleJobs.filter(
      (job) => job.status === "Active"
    ).length;

    // All candidates belonging to assigned jobs
    const totalCandidates = visibleCandidates.length;

    // Candidates that still need screening
    const candidatesToScreen = visibleCandidates.filter(
      (candidate) => candidate.status === "Applied"
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

    // Candidates waiting for Hiring Manager approval
    const pendingHiringApprovals = visibleCandidates.filter(
      (candidate) => candidate.hiringApproval?.status === "Pending"
    ).length;

    // Offers waiting for HR Manager approval
    const offersPendingHR = visibleCandidates.filter(
      (candidate) =>
        candidate.offer?.status === "Pending HR Approval"
    ).length;

    return {
      activeJobs,
      totalCandidates,
      candidatesToScreen,
      interviewsToday,
      pendingHiringApprovals,
      offersPendingHR,
    };
  }, [visibleJobs, visibleCandidates]);

 const cards = [
  {
    title: "Active Jobs",
    value: stats.activeJobs,
    icon: MdWorkOutline,
    description: "Active positions",
    num: "25%",
    iconBg: "bg-blue-50 dark:bg-blue-500/15",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Total Candidates",
    value: stats.totalCandidates,
    icon: MdPeopleOutline,
    description: "Across your assigned jobs",
    num: "15%",
    iconBg: "bg-violet-50 dark:bg-violet-500/15",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    title: "Candidates to Screen",
    value: stats.candidatesToScreen,
    icon: MdPersonSearch,
    description: "Awaiting screening",
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
    title: "Pending Hiring Approval",
    value: stats.pendingHiringApprovals,
    icon: MdGavel,
    description: "Awaiting Hiring Manager",
    num: "50%",
    iconBg: "bg-orange-50 dark:bg-orange-500/15",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "Offers Pending HR",
    value: stats.offersPendingHR,
    icon: MdDescription,
    description: "Awaiting HR approval",
    num: "10%",
    iconBg: "bg-pink-50 dark:bg-pink-500/15",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
];

  return (
    <section className="space-y-6">
   
      {/* Stat Cards */}
 <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
                rounded-xl
                 min-w-[250px]
  shrink-0
  shadow-sm
                bg-white
                dark:bg-zinc-900
                p-5
                transition
                hover:-translate-y-0.5
                hover:shadow-sm
                
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

              <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                {card.description}
              </p>
              {/* Bottom */}
               <div
               className="
               mt-5
               flex
               items-center
               justify-between
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

export default RecruiterOverview;