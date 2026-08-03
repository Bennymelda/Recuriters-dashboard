import {
 MdArrowBack,
 MdEdit,
 MdWork,
} from "react-icons/md";
import { useAuthStore } from "../../../store/authStore";
import { useNavigate } from "react-router-dom";
import { useTeamStore } from "../../../store/teamStore";
import EditTeamMemberModal from "../Modals/EditTeamMemberModal";
import AssignJobsModal from "../Modals/AssignJobsModal";
import { useState } from "react";

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
 <>
 {/* Back navigation */}
 <div className="mb-5">
 <button
 onClick​={() => navigate("/team")}
 className="
 group
 inline-flex
 items-center
 gap-2
 rounded-xl
 px-3
 py-2
 text-sm
 font-medium
 text-zinc-500
 transition-all
 duration-200
 hover:bg-white
 hover:text-zinc-900
 hover:shadow-sm
 dark:text-zinc-400
 dark:hover:bg-zinc-900
 dark:hover:text-white
 "
 >
 <MdArrowBack
 size={19}
 className="
 transition-transform
 duration-200
 group-hover:-translate-x-1
 "
 />

 Back to Team
 </button>
 </div>

 {/* Profile Header */}
 <section
 className="
 relative
 overflow-hidden
 rounded-3xl
 border
 border-zinc-200
 bg-white
 
 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Decorative background */}
 <div
 className="
 absolute
 right-0
 top-0
 h-48
 w-48
 rounded-full
 bg-[#408A71]/10
 blur-3xl
 "
 />

 <div
 className="
 absolute
 -left-20
 bottom-0
 h-40
 w-40
 rounded-full
 bg-[#B0E4CC]/10
 blur-3xl
 "
 />

 <div className="relative z-10 p-6 md:p-8">

 {/* Top row */}
 <div
 className="
 flex
 flex-col
 gap-6
 lg:flex-row
 lg:items-start
 lg:justify-between
 "
 >

 {/* Profile */}
 <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

 {/* Avatar */}
 <div className="relative shrink-0">

 <img
 src={
 member.avatar ||
 `https://ui-avatars.com/api/?name=${encodeURIComponent(
 member.fullName
 )}&background=285A48&color=fff`
 }
 alt={member.fullName}
 className="
 h-24
 w-24
 rounded-2xl
 border
 border-zinc-200
 object-cover
 shadow-md
 ring-4
 ring-[#408A71]/10
 md:h-28
 md:w-28
 "
 />

 {/* Online/status indicator */}
 <span
 className="
 absolute
 bottom-1
 right-1
 h-4
 w-4
 rounded-full
 border-[3px]
 border-white
 bg-[#408A71]
 dark:border-zinc-900
 "
 />
 </div>

 {/* Details */}
 <div>

 <div className="flex flex-wrap items-center gap-3">

 <h1
 className="
 text-2xl
 font-bold
 tracking-tight
 text-zinc-900
 md:text-3xl
 dark:text-white
 "
 >
 {member.fullName}
 </h1>

 <span
 className="
 rounded-full
 bg-[#EEF8F3]
 px-3
 py-1
 text-xs
 font-semibold
 text-[#408A71]
 dark:bg-[#408A71]/15
 dark:text-[#B0E4CC]
 "
 >
 Team Member
 </span>

 </div>

 <p
 className="
 mt-1
 text-sm
 font-medium
 text-zinc-500
 md:text-base
 dark:text-zinc-400
 "
 >
 {member.role}
 </p>

 {/* Metadata */}
 <div className="mt-4 flex flex-wrap gap-2">

 <span
 className="
 inline-flex
 items-center
 rounded-lg
 bg-zinc-100
 px-3
 py-1.5
 text-xs
 font-medium
 text-zinc-600
 dark:bg-zinc-800
 dark:text-zinc-300
 "
 >
 {member.department}
 </span>

 <span
 className={`
 inline-flex
 items-center
 gap-1.5
 rounded-lg
 px-3
 py-1.5
 text-xs
 font-semibold
 ${
 member.status === "Active"
 ? "bg-[#EEF8F3] text-[#408A71] dark:bg-[#408A71]/15 dark:text-[#B0E4CC]"
 : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
 }
 `}
 >
 <span
 className={`
 h-1.5
 w-1.5
 rounded-full
 ${
 member.status === "Active"
 ? "bg-[#408A71]"
 : "bg-zinc-400"
 }
 `}
 />

 {member.status}
 </span>

 </div>

 </div>

 </div>


 {/* Actions */}
 {canManageTeam && (
 <div
 className="
 flex
 w-full
 gap-2
 sm:w-auto
 "
 >

 <button
 onClick={() => setOpenEditModal(true)}
 className="
 inline-flex
 flex-1
 items-center
 justify-center
 gap-2
 rounded-xl
 border
 border-zinc-200
 bg-white
 px-4
 py-2.5
 text-sm
 font-semibold
 text-zinc-700
 shadow-sm
 transition-all
 duration-200
 hover:-translate-y-0.5
 hover:border-zinc-300
 hover:shadow-md
 sm:flex-none
 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-zinc-200
 dark:hover:border-zinc-600
 "
 >
 <MdEdit size={18} />
 Edit
 </button>


 <button
 onClick={() => setOpenAssignModal(true)}
 className="
 inline-flex
 flex-1
 items-center
 justify-center
 gap-2
 rounded-xl
 bg-[#408A71]
 px-4
 py-2.5
 text-sm
 font-semibold
 text-white
 shadow-sm
 transition-all
 duration-200
 hover:-translate-y-0.5
 hover:bg-[#35745E]
 hover:shadow-md
 sm:flex-none
 "
 >
 <MdWork size={18} />
 Assign Jobs
 </button>

 </div>
 )}

 </div>


 {/* Bottom divider */}
 <div
 className="
 mt-7
 border-t
 border-zinc-100
 pt-5
 dark:border-zinc-800
 "
 >

 <div className="flex flex-wrap items-center gap-x-8 gap-y-3">

 <div>
 <p className="text-xs font-medium text-zinc-400">
 Department
 </p>

 <p className="mt-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
 {member.department}
 </p>
 </div>

 <div className="hidden h-8 w-px bg-zinc-200 sm:block dark:bg-zinc-700" />

 <div>
 <p className="text-xs font-medium text-zinc-400">
 Role
 </p>

 <p className="mt-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
 {member.role}
 </p>
 </div>

 <div className="hidden h-8 w-px bg-zinc-200 sm:block dark:bg-zinc-700" />

 <div>
 <p className="text-xs font-medium text-zinc-400">
 Status
 </p>

 <p className="mt-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
 {member.status}
 </p>
 </div>

 </div>

 </div>

 </div>

 </section>


 {/* Modals */}
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
 </>
);
};

export default TeamMemberHeader;