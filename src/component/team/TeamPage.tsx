import { useMemo, useState, useEffect } from "react";

import TeamHeader from "./TeamHeader";
import TeamStats from "./TeamStats";
import TeamToolbar from "./TeamToolbar";
import TeamGrid from "./TeamGrid";
import { useTeamStore } from "../../store/teamStore";
import { useAuthStore } from "../../store/authStore";

import { useCompanyStore } from "../../store/companyStore";

const TeamPage = () => {
  const members = useTeamStore((state) => state.members);
  const syncTeamMembersFromFirestore = useTeamStore((state) => state.syncTeamMembersFromFirestore);
  const subscribeToTeamMembersFromFirestore = useTeamStore((state) => state.subscribeToTeamMembersFromFirestore);
  const user = useAuthStore((state) => state.user);
  const company = useCompanyStore((state) => state.company);

  const companyId = user?.companyId || company?.id;

  // Real-time synchronization of team members from Firestore (updates status live from Pending to Active without refresh)
  useEffect(() => {
    if (!companyId) return;

    // Initial sync
    syncTeamMembersFromFirestore(companyId).catch((error) => {
      console.error("Failed to sync team members:", error);
    });

    // Real-time Firestore listener
    const unsubscribe = subscribeToTeamMembersFromFirestore(companyId);

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [companyId, syncTeamMembersFromFirestore, subscribeToTeamMembersFromFirestore]);

 const [filters, setFilters] = useState({
  role: "",
  department: "",
  status: "",
 });

 const filteredMembers = useMemo(() => {
  return members.filter((member) => {
   const matchesRole = !filters.role || member.role === filters.role;
   const matchesDepartment =
    !filters.department || member.department === filters.department;
    const matchesStatus =
     !filters.status || member.presenceStatus === filters.status;

   return matchesRole && matchesDepartment && matchesStatus;
  });
 }, [members, filters.department, filters.role, filters.status]);



const [currentPage, setCurrentPage] = useState(1);
const membersPerPage = 10;

const totalPages = Math.ceil(
 filteredMembers.length / membersPerPage
);

const startIndex = (currentPage - 1) * membersPerPage;

const paginatedMembers = filteredMembers.slice(
 startIndex,
 startIndex + membersPerPage
);

useEffect(() => {
 setCurrentPage(1);
}, [filters]);




 return (
 <section className="space-y-8">
 <TeamHeader />

 <TeamStats />

 <TeamToolbar
 filters={filters}
 setFilters={setFilters}
/>

 <TeamGrid
 members={paginatedMembers}
 totalMembers={members.length}
/>

{totalPages > 1 && (
 <div className="flex items-center justify-center gap-2 pb-8">
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
 
 
 </section>
 );
};

export default TeamPage;