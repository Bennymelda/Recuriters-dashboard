import { useEffect, useState } from "react";
import {
 MdEmail,
 MdPhone,
 MdBusiness,
 MdWork,
 MdCalendarToday,
 MdAccessTime,
} from "react-icons/md";

import { formatLastActive } from "../../../utils/formatLastActive";
import { useTeamStore } from "../../../store/teamStore";
import { formatJoinedDate } from "../../../utils/formatJoinedDate";
const TeamMemberInfo = () => {
 const selectedMemberId = useTeamStore(
 (state) => state.selectedMemberId
 );

 const member = useTeamStore((state) =>
 state.members.find(
 (member) => member.id === selectedMemberId
 )
 );
 const [, setTick] = useState(0);

 useEffect(() => {
  const interval = window.setInterval(() => {
   setTick((prev) => prev + 1);
  }, 30000);

  return () => window.clearInterval(interval);
 }, []);

 if (!member) return null;

 const info = [
 {
 label: "Email",
 value: member.email,
 icon: <MdEmail size={20} />,
 },
 {
 label: "Phone",
 value: member.phone,
 icon: <MdPhone size={20} />,
 },
 {
 label: "Department",
 value: member.department,
 icon: <MdBusiness size={20} />,
 },
 {
 label: "Role",
 value: member.role,
 icon: <MdWork size={20} />,
 },
 {
 label: "Joined",
 value: member.joinedAt
 ? formatJoinedDate(member.joinedAt)
 : "N/A",
 icon: <MdCalendarToday size={20} />,
},
 {
 label: "Last Active",
 value: formatLastActive(member.lastActive),
 icon: <MdAccessTime size={20} />,
 },
 ];

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
 <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
 Personal Information
 </h2>

 <div className="grid gap-5 md:grid-cols-2">
 {info.map((item) => (
 <div
 key={item.label}
 className="
 flex
 items-start
 gap-4
 rounded-2xl
 bg-zinc-50
 p-4
 dark:bg-zinc-800
 "
 >
 <div
 className="
 flex
 h-11
 w-11
 items-center
 justify-center
 rounded-xl
 bg-[#EEF8F3]
 text-[#408A71]
 dark:bg-[#408A71]/20
 "
 >
 {item.icon}
 </div>

 <div>
 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 {item.label}
 </p>

 <p className="mt-1 font-semibold text-zinc-900 dark:text-white">
 {item.value}
 </p>
 </div>
 </div>
 ))}
 </div>
 </section>
 );
};

export default TeamMemberInfo;