import { useJobStore } from "../../../store/jobStore";
import { useCandidateStore } from "../../../store/candidateStore";
const useDashboardNeedsAttention = () => {
 const candidates = useCandidateStore((state) => state.candidates);
 const jobs = useJobStore((state) => state.jobs);

 const now = new Date();

 // Candidates in Screening for more than 5 days
 const screeningCandidates = candidates.filter((candidate) => {
 if (candidate.status !== "Screening") return false;

 const stageDate = new Date(candidate.stageUpdatedAt);

 const diff =
 now.getTime() - stageDate.getTime();

 const days = diff / (1000 * 60 * 60 * 24);

 return days >= 5;
 });
 const overdueInterviews = candidates.filter((candidate) =>
 candidate.interviewHistory.some((interview) => {
 if (interview.result !== "Scheduled") return false;

 return new Date(interview.date) < now;
 })
);
const pendingOffers = candidates.filter(
 (candidate) => candidate.status === "Offer"
);

const jobsWithoutApplicants = jobs.filter((job) => {
 if (job.status !== "Active") return false;

 return !candidates.some(
 (candidate) => candidate.jobId === job.id
 );
});
 return {
 screeningCandidates,
 jobs,
  overdueInterviews,
  pendingOffers,
   jobsWithoutApplicants,
 };
};

export default useDashboardNeedsAttention;