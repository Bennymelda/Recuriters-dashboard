import {
 MdHistory,
 MdCheckCircle,
} from "react-icons/md";
import { useTeamStore } from "../../../store/teamStore";
const TeamRecentActivity = () => {
 const selectedMemberId = useTeamStore(
 (state) => state.selectedMemberId
 );

 const member = useTeamStore((state) =>
 state.members.find(
 (member) => member.id === selectedMemberId
 )
 );

 if (!member) return null;

 const recentActivities = [...member.recentActivity].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
 );

 return (
 <section
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-6
 shadow-sm
 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <div className="mb-6 flex items-center gap-3">

 <MdHistory
 size={24}
 className="text-[#408A71]"
 />

 <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
 Recent Activity
 </h2>

 </div>

 {recentActivities.length === 0 ? (

 <div className="py-10 text-center">

 <MdHistory
 size={48}
 className="mx-auto text-zinc-400"
 />

 <p className="mt-4 text-zinc-500">
 No recent activity.
 </p>

 </div>

 ) : (

 <div className="space-y-6">

 {recentActivities.map((activity) => (

 <div
 key={activity.id}
 className="flex gap-4"
 >
 {/* Timeline */}

 <div className="flex flex-col items-center">

 <div
 className="
 flex
 h-10
 w-10
 items-center
 justify-center
 rounded-full
 bg-[#EEF8F3]
 text-[#408A71]
 dark:bg-[#408A71]/20
 "
 >
 <MdCheckCircle size={20} />
 </div>

 <div className="mt-2 h-full w-px bg-zinc-200 dark:bg-zinc-700" />

 </div>

 {/* Content */}

 <div className="flex-1 pb-6">

 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {activity.action}
 </h3>

 <p className="mt-1 text-sm text-zinc-500">
 {activity.target}
 </p>

 <p className="mt-2 text-xs text-zinc-400">
 {new Date(activity.date).toLocaleString()}
 </p>

 </div>

 </div>

 ))}

 </div>

 )}
 </section>
 );
};

export default TeamRecentActivity;