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
  const user = useAuthStore((state) => state.user);
  const company = useCompanyStore((state) => state.company);

  const companyId = user?.companyId || company?.id;

  // Sync team members from Firestore when page loads or companyId is ready
  useEffect(() => {
    if (companyId) {
      syncTeamMembersFromFirestore(companyId).catch((error) => {
        console.error("Failed to sync team members:", error);
      });
    }
  }, [companyId, syncTeamMembersFromFirestore]);

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

 return (
 <section className="space-y-8">
 <TeamHeader />

 <TeamStats />

 <TeamToolbar
 filters={filters}
 setFilters={setFilters}
/>

 <TeamGrid members={filteredMembers}  totalMembers={members.length}/>
 </section>
 );
};

export default TeamPage;