import {
 MdArrowBack,
 MdEdit,
 MdWork,
} from "react-icons/md";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useTeamStore } from "../../../store/teamStore";
import EditTeamMemberModal from "../Modals/EditTeamMemberModal";
//import DeleteTeamMemberModal from "../Modals/DeleteTeamMemberModal";
import AssignJobsModal from "../Modals/AssignJobsModal";
import { useState } from "react";
//import { useCandidateStore } from "../../../store/candidateStore";
const TeamMemberHeader = () => {
 const navigate = useNavigate();
const user = useAuthStore((state) => state.user);
const canManageTeam = user?.role === "Admin";
 const selectedMemberId = useTeamStore(
 (state) => state.selectedMemberId
 );

 const member = useTeamStore((state) =>
 state.members.find(
 (member) => member.id === selectedMemberId
 )
 );
const [openEditModal, setOpenEditModal] = useState(false);

const [openAssignModal, setOpenAssignModal] = useState(false);
 if (!member) return null;

 return (
 <section
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-8
 shadow-sm
 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 {/* Top */}

 <div className="mb-8 flex items-center justify-between">

 <button
 onClick={() => navigate("/team")}
 className="
 flex
 items-center
 gap-2
 rounded-xl
 border
 border-zinc-300
 px-4
 py-2
 text-sm
 font-medium
 hover:bg-zinc-100
 dark:border-zinc-700
 dark:hover:bg-zinc-800
 "
 >
 <MdArrowBack />

 Back
 </button>

 <div className="flex gap-3">
{canManageTeam && (
 <button
 onClick={() => {

 setOpenEditModal(true);
 }}
 className="
 flex
 items-center
 gap-2
 rounded-xl
 border
 border-zinc-300
 px-4
 py-2
 text-sm
 font-medium
 hover:bg-zinc-100
 dark:border-zinc-700
 dark:hover:bg-zinc-800
 "
 >
 <MdEdit />

 Edit
 </button>
 )}
{canManageTeam && (
 <button
 className="
 flex
 items-center
 gap-2
 rounded-xl
 bg-[#408A71]
 px-4
 py-2
 text-sm
 font-semibold
 text-white
 hover:bg-[#35745E]
 "
  onClick={() => {

 setOpenAssignModal(true);
 }}
 >
 <MdWork />

 Assign Jobs
 </button>
)}
 </div>

 </div>

 {/* Profile */}

 <div className="flex flex-col gap-6 md:flex-row md:items-center">

 <img
 src={
 member.avatar ||
 `https://ui-avatars.com/api/?name=${member.fullName}`
 }
 alt={member.fullName}
 className="
 h-28
 w-28
 rounded-full
 border-4
 border-[#408A71]
 object-cover
 "
 />

 <div className="flex-1">

 <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
 {member.fullName}
 </h1>

 <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
 {member.role}
 </p>

 <div className="mt-4 flex flex-wrap items-center gap-3">

 <span
 className="
 rounded-full
 bg-[#EEF8F3]
 px-4
 py-1
 text-sm
 font-semibold
 text-[#408A71]
 dark:bg-[#408A71]/20
 dark:text-[#B0E4CC]
 "
 >
 {member.department}
 </span>

 <span
 className="
 rounded-full
 bg-blue-100
 px-4
 py-1
 text-sm
 font-semibold
 text-blue-700
 dark:bg-blue-500/20
 dark:text-blue-300
 "
 >
 {member.status}
 </span>

 </div>

 </div>

 </div>
<EditTeamMemberModal
 open={openEditModal}
 onClose={() => setOpenEditModal(false)}
 member={member}
/>


<AssignJobsModal
 open={openAssignModal}
 onClose={() => setOpenAssignModal(false)}
 member={member}
/>
 </section>
 );
};

export default TeamMemberHeader;