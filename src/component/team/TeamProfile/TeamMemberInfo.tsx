import { useEffect, useState } from "react";
import {
 MdEmail,
 MdPhone,
 MdBusiness,
 MdWork,
 MdCalendarToday,
 MdAccessTime,
} from "react-icons/md";

import { useTeamStore } from "../../../store/teamStore";

import { formatLastActive } from "../../../utils/formatLastActive";
import { formatJoinedDate } from "../../../utils/formatJoinedDate";

const TeamMemberInfo = () => {
 // ---------------------------------------------
 // Selected member
 // ---------------------------------------------

 const selectedMemberId = useTeamStore(
 (state) => state.selectedMemberId
 );

 const member = useTeamStore((state) =>
 state.members.find(
 (teamMember) =>
 teamMember.id === selectedMemberId
 )
 );

 // ---------------------------------------------
 // Refresh relative last-active text
 // ---------------------------------------------

 const [, setTick] = useState(0);

 useEffect(() => {
 const interval = window.setInterval(() => {
 setTick((previous) => previous + 1);
 }, 30000);

 return () =>
 window.clearInterval(interval);
 }, []);

 // ---------------------------------------------
 // No selected member
 // ---------------------------------------------

 if (!member) {
 return null;
 }

 // ---------------------------------------------
 // Last active
 // ---------------------------------------------

 const lastActive =
 member.membershipStatus === "Pending"
 ? "Not joined"
 : member.lastActive
 ? formatLastActive(member.lastActive)
 : "Never active";

 // ---------------------------------------------
 // Personal information
 // ---------------------------------------------

 const info = [
 {
 label: "Email",
 value: member.email || "N/A",
 icon: <MdEmail size={20} />,
 },

 {
 label: "Phone",
 value: member.phone || "N/A",
 icon: <MdPhone size={20} />,
 },

 {
 label: "Department",
 value: member.department || "Not assigned",
 icon: <MdBusiness size={20} />,
 },

 {
 label: "Role",
 value: member.role || "Not assigned",
 icon: <MdWork size={20} />,
 },

 {
 label: "Joined",
 value: member.joinedAt
 ? formatJoinedDate(member.joinedAt)
 : member.membershipStatus === "Pending"
 ? "Not joined"
 : "N/A",
 icon: <MdCalendarToday size={20} />,
 },

 {
 label: "Last Active",
 value: lastActive,
 icon: <MdAccessTime size={20} />,
 },
 ];

 // ---------------------------------------------
 // Render
 // ---------------------------------------------

 return (
 <section
 className="
 rounded-2xl
 bg-white
 p-4
 md:p-6
 dark:bg-zinc-900
 "
 >
 {/* --------------------------------------- */}
 {/* Header */}
 {/* --------------------------------------- */}

 <div className="mb-6">
 <h2
 className="
 text-xl
 font-semibold
 text-zinc-900
 dark:text-white
 "
 >
 Personal Information
 </h2>

 <p
 className="
 mt-1
 text-sm
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Contact and employment information for{" "}
 {member.fullName}.
 </p>
 </div>

 {/* --------------------------------------- */}
 {/* Information */}
 {/* --------------------------------------- */}

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
 {/* Icon */}

 <div
 className="
 flex
 h-11
 w-11
 shrink-0
 items-center
 justify-center
 rounded-xl
 bg-[hashtag#EEF8F3]
 text-[hashtag#408A71]
 dark:bg-[hashtag#408A71]/20
 dark:text-[hashtag#B0E4CC]
 "
 >
 {item.icon}
 </div>

 {/* Information */}

 <div className="min-w-0">
 <p
 className="
 text-sm
 text-zinc-500
 dark:text-zinc-400
 "
 >
 {item.label}
 </p>

 <p
 className="
 mt-1
 break-words
 font-semibold
 text-zinc-900
 dark:text-white
 "
 >
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