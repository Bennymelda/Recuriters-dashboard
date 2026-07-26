import { useState } from "react";
import CandidatesHeader from "./CandidatePages/CandidatesHeader";
import CandidatesToolbar from "./CandidatePages/CandidatesToolbar";
import CandidateStats from "./CandidatePages/CandidateStats";
import CandidatesGrid from "./CandidatePages/CandidatesGrid";
import type { Candidate } from "../../types/candidate";
import { useCandidateStore } from "../../store/candidateStore";
import CandidateProfileSidebar from "./CandidateProfileSidebar";

import CandidatePageSkeleton from "./CandidateSkeleton/SkeletonPage";

const CandidatePage = () => {
 const candidates = useCandidateStore((state) => state.candidates);
 const isLoading = useCandidateStore((state) => state.isLoading);

 const [status, setStatus] = useState("All");
 const [role, setRole] = useState("All");
 const [experience, setExperience] = useState("All");
 const [location, setLocation] = useState("All");

 const [view, setView] = useState<"grid" | "list">("grid");

 const filteredCandidates = candidates
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
 candidates={filteredCandidates}
 view={view}
    onView={handleView}
    selectedCandidate={selectedCandidate}
 />

 <CandidateProfileSidebar
 candidate={selectedCandidate}
 isOpen={selectedCandidate !== null}
 onClose={() => setSelectedCandidate(null)}
/>
 </>
 );
};

export default CandidatePage;