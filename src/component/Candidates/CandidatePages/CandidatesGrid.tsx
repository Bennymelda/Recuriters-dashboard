import CandidateCard from "./CandidateCard";
import type { Candidate } from "../../../types/candidate";

interface CandidatesGridProps {
 candidates: Candidate[];
 view: "grid" | "list";
 onView: (candidate: Candidate) => void;
 selectedCandidate: Candidate | null;

}

const CandidatesGrid = ({
 candidates,
 view,
 onView,
 selectedCandidate,
}: CandidatesGridProps) => {




 
 if (candidates.length === 0) {
 return (
 <div className="mt-8 mb-10 rounded-2xl border border-dashed border-zinc-300 bg-white py-20 text-center dark:border-zinc-700 dark:bg-zinc-900">
 <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
 No candidates found
 </h3>

 <p className="mt-2 text-sm text-zinc-500">
 Try adjusting your filters or search.
 </p>
 </div>
 );
 }

 return (
 <div
 className={`mt-2 grid dark:bg-zinc-900 xl:bg-white py-4 gap-4  ${
 view === "grid"
 ? "grid-cols-1 "
 : "grid-cols-1 "
 }`}
 >
 {candidates.map((candidate) => (
 <CandidateCard
 candidate={candidate}
 onView={onView}
 selected={selectedCandidate?.id === candidate.id}
/>
 ))}
 </div>
 );
};

export default CandidatesGrid;