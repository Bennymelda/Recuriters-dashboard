import { useEffect, useState } from "react";
import CandidatesHeader from "./CandidatePages/CandidatesHeader";
import CandidatesToolbar from "./CandidatePages/CandidatesToolbar";
import CandidateStats from "./CandidatePages/CandidateStats";
import CandidatesGrid from "./CandidatePages/CandidatesGrid";
import type { Candidate } from "../../types/candidate";
import { useCandidateStore } from "../../store/candidateStore";
import CandidateProfileSidebar from "./CandidateProfileSidebar";
import { useAuthStore } from "../../store/authStore";
import { useTeamStore } from "../../store/teamStore";
import CandidatePageSkeleton from "./CandidateSkeleton/SkeletonPage";
import { findCurrentMember, getVisibleCandidates } from "../../utils/roleBasedDataFiltering";

const CandidatePage = () => {
const candidates = useCandidateStore((state) => state.candidates);
const isLoading = useCandidateStore((state) => state.isLoading);
const fetchCandidates = useCandidateStore(
 (state) => state.fetchCandidates
);
const user = useAuthStore((state) => state.user);
const members = useTeamStore((state) => state.members);



useEffect(() => {
 fetchCandidates();
}, [fetchCandidates]);

// Find current team member (matches both email AND companyId)
const currentMember = findCurrentMember(members, user);

// Get visible candidates based on role and assigned jobs
const visibleCandidates = getVisibleCandidates(candidates, user, currentMember);

 const [status, setStatus] = useState("All");
 const [role, setRole] = useState("All");
 const [experience, setExperience] = useState("All");
 const [location, setLocation] = useState("All");

 const [view, setView] = useState<"grid" | "list">("grid");

 const filteredCandidates = visibleCandidates
 .filter(
 (candidate) =>
 status === "All" ||
 candidate.status === status
 )
 .filter(
 (candidate) =>
 role === "All" ||
 candidate.appliedRole === role
 )
 .filter(
 (candidate) =>
 experience === "All" ||
 candidate.experience === experience
 )
 .filter(
 (candidate) =>
 location === "All" ||
 candidate.location === location
 );

const [currentPage, setCurrentPage] = useState(1);
const candidatesPerPage = 10;
const totalPages = Math.ceil(
 filteredCandidates.length / candidatesPerPage
);

const startIndex = (currentPage - 1) * candidatesPerPage;
const endIndex = startIndex + candidatesPerPage;

const paginatedCandidates = filteredCandidates.slice(
 startIndex,
 endIndex
);
useEffect(() => {
 setCurrentPage(1);
}, [status, role, experience, location]);


 const [selectedCandidate, setSelectedCandidate] =
 useState<Candidate | null>(null);
const handleView = (candidate: Candidate) => {
 if (selectedCandidate?.id === candidate.id) {
 setSelectedCandidate(null);
 } else {
 setSelectedCandidate(candidate);
 }
};

if(isLoading){
   return(
      <CandidatePageSkeleton />
   )
}
 return (
 <>
 <CandidatesHeader />
<CandidateStats />
 <CandidatesToolbar
 status={status}
 setStatus={setStatus}
 role={role}
 setRole={setRole}
 experience={experience}
 setExperience={setExperience}
 location={location}
 setLocation={setLocation}

 view={view}
 setView={setView}
 />

 

 <CandidatesGrid
 candidates={paginatedCandidates}
 view={view}
 onView={handleView}
 selectedCandidate={selectedCandidate}
/>
{totalPages > 1 && (
 <div className="mt-6 mb-8 flex items-center justify-center gap-2">
 <button
 onClick={() =>
 setCurrentPage((page) => Math.max(page - 1, 1))
 }
 disabled={currentPage === 1}
 className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
 >
 Previous
 </button>

 {Array.from({ length: totalPages }, (_, index) => index + 1).map(
 (page) => (
 <button
 key={page}
 onClick={() => setCurrentPage(page)}
 className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
 currentPage === page
 ? "bg-[#285A48] dark:bg-[#B0E4CC] text-white dark:text-zinc-800"
 : "border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
 }`}
 >
 {page}
 </button>
 )
 )}

 <button
 onClick={() =>
 setCurrentPage((page) =>
 Math.min(page + 1, totalPages)
 )
 }
 disabled={currentPage === totalPages}
 className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
 >
 Next
 </button>
 </div>
)}
 <CandidateProfileSidebar
 candidate={selectedCandidate}
 isOpen={selectedCandidate !== null}
 onClose={() => setSelectedCandidate(null)}
/>
 </>
 );
};

export default CandidatePage;