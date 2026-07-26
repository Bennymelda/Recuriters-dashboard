import { useCandidateStore } from "../../../store/candidateStore";
const usePipelineOverview = () => {
 const candidates = useCandidateStore((state) => state.candidates);

 const totalCandidates = candidates.length;

 const stages = [
 "Applied",
 "Screening",
 "Interview",
 "Offer",
 "Hired",
 "Rejected",
 ] as const;

 const pipeline = stages.map((stage) => {
 const count = candidates.filter(
 (candidate) => candidate.status === stage
 ).length;

 return {
 stage,
 count,
 percentage:
 totalCandidates === 0
 ? 0
 : Math.round((count / totalCandidates) * 100),
 };
 });

 return {
 pipeline,
 totalCandidates,
 };
};

export default usePipelineOverview;