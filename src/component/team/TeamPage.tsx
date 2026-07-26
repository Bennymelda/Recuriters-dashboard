import { useMemo, useState } from "react";

import TeamHeader from "./TeamHeader";
import TeamStats from "./TeamStats";
import TeamToolbar from "./TeamToolbar";
import TeamGrid from "./TeamGrid";
import { useTeamStore } from "../../store/teamStore";

const TeamPage = () => {
 const members = useTeamStore((state) => state.members);
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
   const matchesStatus = !filters.status || member.status === filters.status;

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