import { useCandidateStore } from "../../../store/candidateStore";
const useUpcomingInterviews = () => {
 const candidates = useCandidateStore(
 (state) => state.candidates
 );


 const upcomingInterviews = candidates
 .flatMap((candidate) =>
 candidate.interviewHistory
 .filter(
 (interview) =>
 interview.result === "Scheduled"
 )
 .map((interview) => ({
 ...interview,
 candidateName: candidate.fullName,
 candidateAvatar: candidate.avatar,
 appliedRole: candidate.appliedRole,
 }))
 )
 .filter(
 (interview) =>
 new Date(interview.date) >= new Date()
 )
 .sort(
 (a, b) =>
 new Date(a.date).getTime() -
 new Date(b.date).getTime()
 )
 .slice(0, 5);


 return {
 upcomingInterviews,
 };
};


export default useUpcomingInterviews;