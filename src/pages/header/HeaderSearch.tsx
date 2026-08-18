import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
 MdSearch,
 MdWorkOutline,
 MdPersonOutline,
 MdClose,
} from "react-icons/md";

import { useSearchStore } from "../../store/searchStore";
import { useJobStore } from "../../store/jobStore";
import { useCandidateStore } from "../../store/candidateStore";

const HeaderSearch = () => {
 const { query, setQuery } = useSearchStore();

 const jobs = useJobStore((state) => state.jobs);
 const candidates = useCandidateStore((state) => state.candidates);

 const navigate = useNavigate();

 const [isFocused, setIsFocused] = useState(false);

 const searchResults = useMemo(() => {
 const trimmedQuery = query.trim().toLowerCase();

 if (!trimmedQuery) {
 return {
 jobs: [],
 candidates: [],
 };
 }

 const matchingJobs = jobs.filter((job) => {
 return (
 job.title?.toLowerCase().includes(trimmedQuery) ||
 job.department?.toLowerCase().includes(trimmedQuery) ||
 job.location?.toLowerCase().includes(trimmedQuery) ||
 job.employmentType?.toLowerCase().includes(trimmedQuery) ||
 job.status?.toLowerCase().includes(trimmedQuery) ||
 job.experienceLevel?.toLowerCase().includes(trimmedQuery) ||
 job.name?.toLowerCase().includes(trimmedQuery)
 );
 });

 const matchingCandidates = candidates.filter((candidate) => {
 return (
 candidate.fullName?.toLowerCase().includes(trimmedQuery) ||
 candidate.email?.toLowerCase().includes(trimmedQuery) ||
 candidate.phone?.toLowerCase().includes(trimmedQuery) ||
 candidate.location?.toLowerCase().includes(trimmedQuery) ||
 candidate.appliedRole?.toLowerCase().includes(trimmedQuery) ||
 candidate.department?.toLowerCase().includes(trimmedQuery) ||
 candidate.status?.toLowerCase().includes(trimmedQuery) ||
 candidate.experience?.toLowerCase().includes(trimmedQuery) ||
 candidate.source?.toLowerCase().includes(trimmedQuery)
 );
 });

 return {
 jobs: matchingJobs.slice(0, 5),
 candidates: matchingCandidates.slice(0, 5),
 };
 }, [query, jobs, candidates]);

 const hasResults =
 searchResults.jobs.length > 0 ||
 searchResults.candidates.length > 0;

 const handleClear = () => {
 setQuery("");
 };

 const handleJobClick = (jobId: string) => {
 setQuery("");
 setIsFocused(false);

 navigate(`/jobs/${jobId}`);
 };

 const handleCandidateClick = (candidateId: string) => {
 setQuery("");
 setIsFocused(false);

 navigate(`/candidates/${candidateId}`);
 };

 const showResults =
 isFocused && query.trim().length > 0;

return (
 <div className="relative w-full   max-w-none sm:max-w-xl md:max-w-2xl">
 {/* Search input */}
 <div className="relative w-full ">
 <MdSearch
 size={20}
 className="
 absolute
 left-4
 top-1/2
 z-10
 -translate-y-1/2
 text-zinc-400
 dark:text-zinc-500
 "
 />

 <input
 type="text"
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 onFocus={() => setIsFocused(true)}
 placeholder="Search jobs, candidates, applications..."
 className="
 w-full
 min-w-0
 rounded-2xl
 border
 border-zinc-200
 bg-white
 py-3
 pl-12
 pr-11
 text-sm
 text-zinc-800
 placeholder:text-zinc-400
 outline-none

 transition-all
 duration-300

 hover:border-[#408A71]/40

 focus:border-#408A71]
 focus:shadow-md
 focus:ring-2
 focus:ring-[#B0E4CC]/30

 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-zinc-100
 dark:placeholder:text-zinc-500

 dark:hover:border-[#B0E4CC]/40

 dark:focus:border-[#B0E4CC]
 dark:focus:ring-[#408A71]/20
 "
 />

 {/* Clear button */}
 {query && (
 <button
 type="button"
 onClick={handleClear}
 className="
 absolute
 right-3
 top-1/2
 -translate-y-1/2
 rounded-lg
 p-1
 text-zinc-400
 transition
 hover:bg-zinc-100
 hover:text-zinc-700
 dark:hover:bg-zinc-700
 dark:hover:text-zinc-200
 cursor-pointer
 "
 >
 <MdClose size={18} />
 </button>
 )}
 </div>

 {/* Search results */}
 {showResults && (
 <>
 {/* Click outside */}
 <div
 className="fixed inset-0 z-40"
 onClick={() => setIsFocused(false)}
 />

 {/* Results dropdown */}
 <div
 className="
 absolute
 left-0
 right-0
 top-[calc(100%+10px)]
 z-50

 w-full
 min-w-0
 max-w-full

 overflow-hidden
 rounded-2xl
 border
 border-zinc-200
 bg-white
 shadow-2xl

 dark:border-zinc-700
 dark:bg-zinc-900

 sm:max-w-xl
 "
 >
 {!hasResults ? (
 <div className="px-5 py-8 text-center">
 <div
 className="
 mx-auto
 flex
 h-10
 w-10
 items-center
 justify-center
 rounded-full
 bg-zinc-100
 dark:bg-zinc-800
 "
 >
 <MdSearch
 size={20}
 className="text-zinc-400"
 />
 </div>

 <p className="mt-3 text-sm font-semibold text-zinc-800 dark:text-white">
 No results found
 </p>

 <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
 Try searching for a job or candidate name.
 </p>
 </div>
 ) : (
 <div
 className="
 max-h-[min(420px,calc(100vh-140px))]
 overflow-y-auto
 overscroll-contain
 p-2

 scrollbar-none
 "
 style={{
 scrollbarWidth: "none",
 msOverflowStyle: "none",
 }}
 >
 {/* Jobs */}
 {searchResults.jobs.length > 0 && (
 <div>
 <p
 className="
 px-3
 py-2
 text-[11px]
 font-bold
 uppercase
 tracking-wider
 text-zinc-400
 dark:text-zinc-500
 "
 >
 Jobs
 </p>

 {searchResults.jobs.map((job) => (
 <button
 key={job.id}
 type="button"
 onClick={() => handleJobClick(job.id)}
 className="
 flex
 w-full
 min-w-0
 items-center
 gap-3
 rounded-xl
 px-3
 py-3
 text-left
 transition

 hover:bg-zinc-50

 dark:hover:bg-zinc-800
 "
 >
 <div
 className="
 flex
 h-10
 w-10
 shrink-0
 items-center
 justify-center
 rounded-xl
 bg-[#EEF8F3]
 text-[#408A71]

 dark:bg-[#408A71]/15
 dark:text-[#B0E4CC]
 "
 >
 <MdWorkOutline size={20} />
 </div>

 <div className="min-w-0 flex-1">
 <p
 className="
 truncate
 text-sm
 font-semibold
 text-zinc-900
 dark:text-white
 "
 >
 {job.title}
 </p>

 <p
 className="
 mt-0.5
 truncate
 text-xs
 text-zinc-500
 dark:text-zinc-400
 "
 >
 {job.department} • {job.location}
 </p>
 </div>

 <span
 className="
 hidden
 shrink-0
 rounded-full
 bg-zinc-100
 px-2
 py-1
 text-[10px]
 font-semibold
 text-zinc-600
 dark:bg-zinc-800
 dark:text-zinc-400

 xs:inline-flex
 "
 >
 Job
 </span>
 </button>
 ))}
 </div>
 )}

 {/* Candidates */}
 {searchResults.candidates.length > 0 && (
 <div className="mt-2">
 <p
 className="
 px-3
 py-2
 text-[11px]
 font-bold
 uppercase
 tracking-wider
 text-zinc-400
 dark:text-zinc-500
 "
 >
 Candidates
 </p>

 {searchResults.candidates.map((candidate) => (
 <button
 key={candidate.id}
 type="button"
 onClick={() =>
 handleCandidateClick(candidate.id)
 }
 className="
 flex
 w-full
 min-w-0
 items-center
 gap-3
 rounded-xl
 px-3
 py-3
 text-left
 transition

 hover:bg-zinc-50

 dark:hover:bg-zinc-800
 "
 >
 {candidate.avatar ? (
 <img
 src={candidate.avatar}
 alt={candidate.fullName}
 className="
 h-10
 w-10
 shrink-0
 rounded-full
 object-cover
 "
 />
 ) : (
 <div
 className="
 flex
 h-10
 w-10
 shrink-0
 items-center
 justify-center
 rounded-full
 bg-blue-50
 text-blue-600

 dark:bg-blue-500/15
 dark:text-blue-400
 "
 >
 <MdPersonOutline size={20} />
 </div>
 )}

 <div className="min-w-0 flex-1">
 <p
 className="
 truncate
 text-sm
 font-semibold
 text-zinc-900
 dark:text-white
 "
 >
 {candidate.fullName}
 </p>

 <p
 className="
 mt-0.5
 truncate
 text-xs
 text-zinc-500
 dark:text-zinc-400
 "
 >
 {candidate.appliedRole} •{" "}
 {candidate.status}
 </p>
 </div>

 <span
 className="
 hidden
 shrink-0
 rounded-full
 bg-zinc-100
 px-2
 py-1
 text-[10px]
 font-semibold
 text-zinc-600
 dark:bg-zinc-800
 dark:text-zinc-400

 xs:inline-flex
 "
 >
 Candidate
 </span>
 </button>
 ))}
 </div>
 )}
 </div>
 )}
 </div>
 </>
 )}
 </div>
);
};

export default HeaderSearch;