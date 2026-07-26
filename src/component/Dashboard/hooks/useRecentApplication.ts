import { useCandidateStore } from "../../../store/candidateStore";
const useRecentApplications = () => {
 const candidates = useCandidateStore(
 (state) => state.candidates
 );

 const recentApplications = [...candidates]
 .sort(
 (a, b) =>
 new Date(b.createdAt).getTime() -
 new Date(a.createdAt).getTime()
 )
 .slice(0, 5);

 return {
 recentApplications,
 };
};

export default useRecentApplications;