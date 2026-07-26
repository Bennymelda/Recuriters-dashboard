//import { useTeamStore } from "../../store/teamStore";
import TeamCard from "./TeamCard";
import TeamEmpty from "./TeamEmpty";
import type { TeamMember } from "../../types/team";

interface TeamGridProps {
 members: TeamMember[];
 totalMembers: number;
}
const TeamGrid = ({
 members,
 totalMembers,
}: TeamGridProps) => {
 if (totalMembers === 0) {
 return <TeamEmpty />;
}

if (members.length === 0) {
 return (
 <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white py-20 dark:border-zinc-700 dark:bg-zinc-900">
 <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
 No matching team members
 </h3>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 Try changing or clearing your filters.
 </p>
 </div>
 );
}

 return (
 <>
 {/* Desktop Table */}
 <section
 className="
 hidden
 xl:block

 overflow-x-auto

 rounded-3xl

 border
 border-zinc-200

 bg-white

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <table className="min-w-full">
 <thead className="border-b border-zinc-200 dark:border-zinc-700">
 <tr className="text-left text-sm font-semibold text-zinc-500 dark:text-zinc-400">
 <th className="px-6 py-4">Member</th>
 <th className="px-6 py-4">Role</th>
 <th className="px-6 py-4">Department</th>
 <th className="px-6 py-4">Status</th>
 <th className="px-6 py-4 text-center whitespace-nowrap">
 Assigned Jobs
 </th>
 <th className="px-6 py-4">Last Active</th>
 <th className="px-6 py-4 text-right">Actions</th>
 </tr>
 </thead>

 <tbody>
 {members.map((member) => (
 <TeamCard
 key={member.id}
 member={member}
 />
 ))}
 </tbody>
 </table>
 </section>

 {/* Mobile Cards */}
 <section className="space-y-4 xl:hidden md:grid md:grid-cols-2  md:gap-4">
 {members.map((member) => (
 <TeamCard
 key={member.id}
 member={member}
 />
 ))}
 </section>
 </>
);
};

export default TeamGrid;