import CandidateHeaderSkeleton from "./HeaderSkeleton";
import CandidateListSkeleton from "./ListSkeleton";
import CandidateStatsSkeleton from "./StatsSkeleton";
import CandidateToolbarSkeleton from "./ToolbarSkeleton";


const CandidatePageSkeleton = () => {
 return (
 <div className="space-y-8 animate-pulse">

 <CandidateHeaderSkeleton />

 <CandidateStatsSkeleton />

 <CandidateToolbarSkeleton />

 <CandidateListSkeleton />

 </div>
 );
};

export default CandidatePageSkeleton;