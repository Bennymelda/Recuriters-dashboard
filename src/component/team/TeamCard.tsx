import {

 MdMoreHoriz,
} from "react-icons/md";
import { useState,useEffect } from "react";
import type { TeamMember } from "../../types/team";
import EditTeamMemberModal from "./Modals/EditTeamMemberModal";
import DeleteTeamMemberModal from "./Modals/DeleteTeamMemberModal";
import { useTeamStore } from "../../store/teamStore";
import AssignJobsModal from "./Modals/AssignJobsModal";
import { useNavigate } from "react-router";
import { formatLastActive } from "../../utils/formatLastActive";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";

interface TeamCardProps {
 member: TeamMember;
}

const statusColors = {
 Online:
 "bg-emerald-500",
 Away:
 "bg-amber-500",
 Offline:
 "bg-zinc-400",
};
const statusBadgeColors = {
 Online:
 "bg-[#EEF8F3] text-[#285A48] dark:bg-[#285A48]/20 dark:text-[#B0E4CC]",

 Away:
 "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",

 Offline:
 "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};
const TeamCard = ({
 member,
}: TeamCardProps) => {
 const [openMenu, setOpenMenu] = useState(false);
const [openEditModal, setOpenEditModal] = useState(false);
const [openDeleteModal, setOpenDeleteModal] = useState(false);
const [openAssignModal, setOpenAssignModal] = useState(false);

const navigate=useNavigate()
const deleteMember = useTeamStore(
 (state) => state.deleteMember
);
const user = useAuthStore((state) => state.user);
const canManageTeam = user?.role === "Admin";
const addNotification = useNotificationStore(
 (state) => state.addNotification
);
const handleDelete = () => {
  
 deleteMember(member.id);
addNotification({
 title: "Team Member Removed",
 message: `${member.fullName} has been removed from your team.`,
 type: "team",
});
 setOpenDeleteModal(false);
};

const selectMember = useTeamStore((state) => state.selectMember);
 const [, setTick] = useState(0);
 
  useEffect(() => {
   const interval = window.setInterval(() => {
    setTick((prev) => prev + 1);
   }, 30000);
 
   return () => window.clearInterval(interval);
  }, []);

return (
   <>

<tr className="hidden xl:table-row border-b border-zinc-200 last:border-none dark:border-zinc-700">
 {/* Member */}
 <td className="px-6 py-5">
 <div className="flex items-center gap-4">
 <div className="relative">
 <img
 src={
 member.avatar ||
 `https://ui-avatars.com/api/?name=${member.fullName}`
 }
 alt={member.fullName}
 className="h-12 w-12 rounded-2xl border-2 border-[#285A48] object-cover dark:border-[#B0E4CC]"
 />

 <span
 className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-zinc-900 ${statusColors[member.status]}`}
 />
 </div>

 <div>
 <div className="flex items-center gap-2">
 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {member.fullName}
 </h3>

 
 </div>

 
 </div>
 </div>
 </td>

 {/* Role */}
 <td className="px-6 py-5">
 <p className="font-medium text-zinc-700 dark:text-zinc-300">
 {member.role}
 </p>
 </td>

 {/* Department */}
 <td className="px-6 py-5">
 <span className="rounded-full bg-[#EEF8F3] px-3 py-1 text-xs font-semibold text-[#285A48] dark:bg-[#285A48]/20 dark:text-[#B0E4CC]">
 {member.department}
 </span>
 </td>

 {/* Status */}
 <td className="px-6 py-5">
<span
 className={`rounded-full px-3 py-1 text-xs font-semibold ${
 statusBadgeColors[member.status]
 }`}
>
 {member.status}
</span>

 </td>

 {/* Assigned Jobs */}
 <td className="px-6 py-5">
 <span className="font-semibold text-zinc-900 dark:text-white">
 {member.assignedJobs.length ?? 0}
 </span>

 <span className="ml-1 text-sm text-zinc-500 dark:text-zinc-400">
 Jobs
 </span>
 </td>

<td className="px-6 py-5">
 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-emerald-500" />

 <span className="text-sm whitespace-nowrap text-zinc-600 dark:text-zinc-300">
 {formatLastActive(member.lastActive)}
 </span>
 </div>
</td>

 {/* Actions */}
 <td className="relative px-6 py-5 absolute text-right">
 <button
 onClick={() => setOpenMenu(!openMenu)}
 className="rounded-xl p-2 transition dark:text-gray-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 <MdMoreHoriz size={22} />
 </button>

 {openMenu && (
 <div
 className="
 absolute
 right-6
 top-14
 z-30
 w-56
 rounded-2xl
 border
 border-zinc-200
 bg-white
 p-2
 shadow-xl
 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <button
 onClick={() => {
 selectMember(member.id);
 navigate(`/team/${member.id}`);
 }}
 className="flex w-full dark:text-white rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 View Profile
 </button>
{canManageTeam && (
 <button
 onClick={() => {
 setOpenMenu(false);
 setOpenEditModal(true);
 }}
 className="flex w-full dark:text-white rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 Edit Member
 </button>
)}
{canManageTeam && (
 <button
 onClick={() => {
 setOpenMenu(false);
 setOpenAssignModal(true);
 }}
 className="flex w-full dark:text-white rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 Assign Jobs
 </button>
)}
 <hr className="my-2 border-zinc-200 dark:border-zinc-700" />
{canManageTeam && (
 <button
 onClick={() => {
 setOpenMenu(false);
 setOpenDeleteModal(true);
 }}
 className="flex w-full dark:text-red-700 rounded-xl px-3 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
 >
 Remove Member
 </button>
 )}
 </div>
 )}
 </td>
</tr>


<div
 className="
 xl:hidden

 rounded-3xl
 border
 border-zinc-200

 bg-white

 p-4

 shadow-sm

 dark:border-zinc-700
 dark:bg-zinc-900
 "
>
 {/* Header */}
 <div className="flex items-start justify-between">

 <div className="flex items-center gap-3">

 <div className="relative">
 <img
 src={
 member.avatar ||
 `https://ui-avatars.com/api/?name=${member.fullName}`
 }
 alt={member.fullName}
 className="h-14 w-14 rounded-2xl border-2 border-[#285A48] object-cover dark:border-[#B0E4CC]"
 />

 <span
 className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-zinc-900 ${statusColors[member.status]}`}
 />
 </div>

 <div>
 <h3 className="font-bold text-zinc-900 dark:text-white">
 {member.fullName}
 </h3>

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 {member.email}
 </p>

 <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
 {member.role}
 </p>
 </div>

 </div>

 <button
 onClick={() => setOpenMenu(!openMenu)}
 className="rounded-xl p-2 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"
 >
 <MdMoreHoriz size={22} />
 </button>

 </div>

 {/* Details */}
 <div className="mt-5 space-y-3">

 <div className="flex justify-between">
 <span className="text-zinc-500 dark:text-zinc-400">
 Department
 </span>

 <span className="rounded-full bg-[#EEF8F3] px-3 py-1 text-xs font-semibold text-[#285A48] dark:bg-[#285A48]/20 dark:text-[#B0E4CC]">
 {member.department}
 </span>
 </div>

 <div className="flex justify-between">
 <span className="text-zinc-500 dark:text-zinc-400">
 Status
 </span>

 <span
 className={`rounded-full px-3 py-1 text-xs font-semibold ${
 statusBadgeColors[member.status]
 }`}
>
 {member.status}
</span>
 </div>

 <div className="flex justify-between">
 <span className="text-zinc-500 dark:text-zinc-400">
 Assigned Jobs
 </span>

 <span className="font-semibold text-zinc-900 dark:text-white">
 {member.assignedJobs.length}
 </span>
 </div>

 <div className="flex justify-between">
 <span className="text-zinc-500 dark:text-zinc-400">
 Last Active
 </span>

 <div className="flex items-center gap-2">
 <span className="h-2 w-2 rounded-full bg-emerald-500" />

 <span className="text-sm text-zinc-700 dark:text-zinc-300">
 {formatLastActive(member.lastActive)}
 </span>
 </div>
 </div>

 </div>

 {/* Quick Action */}
 <button
 onClick={() => {
 selectMember(member.id);
 navigate(`/team/${member.id}`);
 }}
 className="
 mt-5

 w-full

 rounded-2xl

 bg-[#285A48]

 py-3

 font-semibold

 text-white

 transition

 hover:bg-[#35745E]
 "
 >
 View Profile
 </button>

 {/* Dropdown */}
 {openMenu && (
 <div
 className="
 mt-4

 rounded-2xl

 border

 border-zinc-200

 bg-white

 p-2

 shadow-xl

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 {/* Keep your existing menu buttons */}

<button
 onClick={() => {
 selectMember(member.id);
 navigate(`/team/${member.id}`);
 }}
 className="flex w-full dark:text-white rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 View Profile
 </button>
{canManageTeam && (
 <button
 onClick={() => {
 setOpenMenu(false);
 setOpenEditModal(true);
 }}
 className="flex w-full dark:text-white rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 Edit Member
 </button>
 )}
{canManageTeam && (
 <button
 onClick={() => {
 setOpenMenu(false);
 setOpenAssignModal(true);
 }}
 className="flex w-full dark:text-white rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 Assign Jobs
 </button>
)}
 <hr className="my-2 border-zinc-200 dark:border-zinc-700" />
{canManageTeam && (
 <button
 onClick={() => {
 setOpenMenu(false);
 setOpenDeleteModal(true);

 }}
 className="flex w-full dark:text-red-700 rounded-xl px-3 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
 >
 Remove Member
 </button>
)}


 </div>
 )}
</div>

<EditTeamMemberModal
 open={openEditModal}
 onClose={() => setOpenEditModal(false)}
 member={member}
/>

<DeleteTeamMemberModal
 open={openDeleteModal}
 onClose={() => setOpenDeleteModal(false)}
 onDelete={handleDelete}
 member={member}
/>

<AssignJobsModal
 open={openAssignModal}
 onClose={() => setOpenAssignModal(false)}
 member={member}
/>

</> 
 );
};

export default TeamCard;