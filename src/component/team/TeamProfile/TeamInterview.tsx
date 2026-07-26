import {
 MdCalendarMonth,
 MdVideocam,
 MdLocationOn,
} from "react-icons/md";
import { useCandidateStore } from "../../../store/candidateStore";
import { useTeamStore } from "../../../store/teamStore";
import { formatJoinedDate } from "../../../utils/formatJoinedDate";
const TeamInterviewSchedule = () => {
    const candidates = useCandidateStore(
 (state) => state.candidates
);
 const selectedMemberId = useTeamStore(
 (state) => state.selectedMemberId
 );

 const member = useTeamStore((state) =>
 state.members.find(
 (member) => member.id === selectedMemberId
 )
 );
 
 if (!member) return null;
 const memberId= member.id
 const upcomingInterviews = candidates.flatMap((candidate) =>
 candidate.interviewHistory
 .filter(
 (interview) =>
 interview.interviewerId === memberId &&
 interview.result === "Scheduled"
 )
 .map((interview) => ({
 id: interview.id,

 candidateName: candidate.fullName,

 jobTitle: candidate.appliedRole,

 interviewDate: interview.date,

 stage: interview.stage,

 interviewType: "Virtual",
 }))
);


 return (
 <section
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-6
 shadow-sm
 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
 Upcoming Interviews
 </h2>

 {upcomingInterviews.length === 0 ? (

 <div className="py-10 text-center">

 <MdCalendarMonth
 size={48}
 className="mx-auto text-zinc-400"
 />

 <p className="mt-4 text-zinc-500">
 No upcoming interviews.
 </p>

 </div>

 ) : (

 <div className="space-y-4">

 {upcomingInterviews.map((interview) => (

 <div
 key={interview.id}
 className="
 rounded-2xl
 border
 border-zinc-200
 p-4
 dark:border-zinc-700
 "
 >
 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {interview.candidateName}
 </h3>

 <p className="mt-1 text-sm text-zinc-500">
 {interview.jobTitle}
 </p>

 <div className="mt-4 flex items-center justify-between">

 <div className="flex items-center gap-2 text-sm text-zinc-500">
 <MdCalendarMonth />
 {formatJoinedDate(interview.interviewDate)}
 </div>

 <span
 className="
 rounded-full
 bg-[#EEF8F3]
 px-3
 py-1
 text-xs
 font-semibold
 text-[#408A71]
 dark:bg-[#408A71]/20
 "
 >
 {interview.stage}
 </span>

 </div>

 <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">

 {interview.interviewType === "Virtual" ? (
 <MdVideocam />
 ) : (
 <MdLocationOn />
 )}

 {interview.interviewType}

 </div>

 </div>

 ))}

 </div>

 )}
 </section>
 );
};

export default TeamInterviewSchedule;