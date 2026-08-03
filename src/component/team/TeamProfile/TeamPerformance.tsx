import {
 MdTrendingUp,
 MdWorkspacePremium,
 MdSpeed,
} from "react-icons/md";
import { useCandidateStore } from "../../../store/candidateStore";
import { useTeamStore } from "../../../store/teamStore";
const TeamPerformance = () => {
 const selectedMemberId = useTeamStore(
 (state) => state.selectedMemberId
 );
const candidates = useCandidateStore(
 (state) => state.candidates
);
 const member = useTeamStore((state) =>
 state.members.find(
 (member) => member.id === selectedMemberId
 )
 );
if (!member) return null;
const successfulHires = candidates.filter(
 (candidate) =>
 candidate.status === "Hired" &&
 candidate.interviewHistory.some(
 (interview) => interview.interviewerId === member.id
 )
).length;

const interviewsCount = candidates.flatMap(
 (candidate) => candidate.interviewHistory
).filter(
 (interview) => interview.interviewerId === member.id
).length;

const assignedJobs = member.assignedJobIds.length;

const activeCandidates = candidates.filter(
 (candidate) =>
 member.assignedJobIds.includes(candidate.jobId) &&
 ["Applied", "Screening", "Interview", "Offer"].includes(candidate.status)
).length;

const rawScore =
 successfulHires * 10 +
 interviewsCount * 3 +
 assignedJobs * 2 +
 activeCandidates;

const performanceScore = Math.min(rawScore, 100);

const hiredCandidates = candidates.filter(
 (candidate) =>
 candidate.status === "Hired" &&
 candidate.hiredAt &&
 candidate.interviewHistory.some(
 (interview) => interview.interviewerId === member.id
 )
);



const averageHiringDays =
 hiredCandidates.length === 0
 ? 0
 : Math.round(
 hiredCandidates.reduce((total, candidate) => {
 const created = new Date(candidate.createdAt).getTime();
 const hired = new Date(candidate.hiredAt!).getTime();

 const days = (hired - created) / (1000 * 60 * 60 * 24);

 return total + days;
 }, 0) / hiredCandidates.length
 );

 const activeCandidatesCount = candidates.filter(
 (candidate) =>
 member.assignedJobIds.includes(candidate.jobId) &&
 ["Applied", "Screening", "Interview", "Offer"].includes(candidate.status)
).length;

const radius = 48;
const stroke = 8;
const normalizedRadius = radius - stroke / 2;
const circumference = 2 * Math.PI * normalizedRadius;

const progress = Math.min(Math.max(performanceScore, 0), 100);

const strokeDashoffset =
 circumference - (progress / 100) * circumference;

const workload =
 activeCandidatesCount <= 10
 ? "Light"
 : activeCandidatesCount <= 25
 ? "Normal"
 : "Heavy";


 if (!member) return null;

 const workloadColor = {
 Light:
 "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",

 Normal:
 "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",

 Heavy:
 "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
 };

 return (
 <section
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-6

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
 Performance
 </h2>

 {/* Score */}

 <div className="mt-8 text-center">

 <div className="relative mx-auto h-28 w-28">
 <svg
 className="h-28 w-28 -rotate-90"
 viewBox="0 0 100 100"
 >
 {/* Background */}
 <circle
 cx="50"
 cy="50"
 r={normalizedRadius}
 stroke="#E5E7EB"
 strokeWidth={stroke}
 fill="none"
 />

 {/* Progress */}
 <circle
 cx="50"
 cy="50"
 r={normalizedRadius}
 stroke="#408A71"
 strokeWidth={stroke}
 fill="none"
 strokeLinecap="round"
 strokeDasharray={circumference}
 strokeDashoffset={strokeDashoffset}
 className="transition-all duration-700"
 />
 </svg>

 <div className="absolute inset-0 flex items-center justify-center">
 <span className="text-3xl font-bold text-zinc-900 dark:text-white">
 {performanceScore}%
 </span>
 </div>
</div>

 <p className="mt-4 text-sm text-zinc-500">
 Performance Score
 </p>

 </div>

 {/* Progress */}

 <div className="mt-8">

 <div className="mb-2 flex justify-between text-sm">

 <span className="text-zinc-500">
 Overall Performance
 </span>

 <span className="font-semibold text-[#408A71]">
 {performanceScore}%
 </span>

 </div>

 <div className="h-3 rounded-full bg-zinc-200 dark:bg-zinc-700">

 <div
 className="h-3 rounded-full bg-[#408A71]"
 style={{
 width: `${performanceScore}%`,
 }}
 />

 </div>

 </div>

 {/* Metrics */}

 <div className="mt-8 space-y-5">

 <div className="flex items-center justify-between">

 <div className="flex items-center gap-3">

 <MdWorkspacePremium
 size={22}
 className="text-[#408A71]"
 />

 <span className="text-zinc-600 dark:text-zinc-300">
 Successful Hires
 </span>

 </div>

 <span className="font-semibold text-zinc-900 dark:text-white">
 {successfulHires}
 </span>

 </div>

 <div className="flex items-center justify-between">

 <div className="flex items-center gap-3">

 <MdTrendingUp
 size={22}
 className="text-[#408A71]"
 />

 <span className="text-zinc-600 dark:text-zinc-300">
 Avg Hiring Days
 </span>

 </div>

 <span className="font-semibold text-zinc-900 dark:text-white">
 {averageHiringDays} days
 </span>

 </div>

 <div className="flex items-center justify-between">

 <div className="flex items-center gap-3">

 <MdSpeed
 size={22}
 className="text-[#408A71]"
 />

 <span className="text-zinc-600 dark:text-zinc-300">
 Workload
 </span>

 </div>

 <span
 className={`rounded-full px-3 py-1 text-xs font-semibold ${workloadColor[workload]}`}
 >
 {workload}
 </span>

 </div>

 </div>

 </section>
 );
};

export default TeamPerformance;