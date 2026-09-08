import {
 MdArrowBack,
 MdEdit,
 MdWork,
} from "react-icons/md";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../store/authStore";
import { useTeamStore } from "../../../store/teamStore";

import EditTeamMemberModal from "../Modals/EditTeamMemberModal";
import AssignJobsModal from "../Modals/AssignJobsModal";

const TeamMemberHeader = () => {
 const navigate = useNavigate();

 // ---------------------------------------------
 // Auth
 // ---------------------------------------------

 const user = useAuthStore(
 (state) => state.user
 );

 const canManageTeam =
 user?.role === "Admin" || "HR Manager";

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
 // Modals
 // ---------------------------------------------

 const [openEditModal, setOpenEditModal] =
 useState(false);

 const [openAssignModal, setOpenAssignModal] =
 useState(false);

 if (!member) return null;

 // ---------------------------------------------
 // Presence
 // ---------------------------------------------

 const presenceStyles = {
 Online: {
 dot: "bg-emerald-500",
 badge:
 "bg-[#EEF8F3] text-[#408A71] dark:bg-[#408A71]/15 dark:text-[#B0E4CC]",
 },

 Away: {
 dot: "bg-amber-500",
 badge:
 "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",
 },

 Offline: {
 dot: "bg-zinc-400",
 badge:
 "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
 },
 };

 const currentPresence =
 presenceStyles[member.presenceStatus];

 // ---------------------------------------------
 // Membership status
 // ---------------------------------------------

 const membershipStyles = {
 Active:
 "bg-[#EEF8F3] text-[#408A71] dark:bg-[#408A71]/15 dark:text-[#B0E4CC]",

 Pending:
 "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300",

 Inactive:
 "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
 };

 // ---------------------------------------------
 // Render
 // ---------------------------------------------

 return (
 <>
 {/* ========================================= */}
 {/* Back navigation */}
 {/* ========================================= */}

 <div className="mb-5">
 <button
 type="button"
 onClick={() => navigate("/team")}
 className="
 group
 inline-flex
 cursor-pointer
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

 {/* ========================================= */}
 {/* Profile Header */}
 {/* ========================================= */}

 <section
 className="
 relative
 overflow-hidden
 rounded-xl
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

 {/* ===================================== */}
 {/* Top row */}
 {/* ===================================== */}

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
 {/* ================================= */}
 {/* Profile */}
 {/* ================================= */}

 <div
 className="
 flex
 flex-col
 gap-5
 sm:flex-row
 sm:items-center
 "
 >
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

 {/* Presence indicator */}

 <span
 className={`
 absolute
 bottom-1
 right-1
 h-4
 w-4
 rounded-full
 border-[3px]
 border-white
 ${currentPresence.dot}
 dark:border-zinc-900
 `}
 />
 </div>

 {/* Member details */}

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

 {/* Membership status */}

 <span
 className={`
 rounded-full
 px-3
 py-1
 text-xs
 font-semibold
 ${membershipStyles[member.membershipStatus]}
 `}
 >
 {member.membershipStatus}
 </span>
 </div>

 {/* Role */}

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
 {member.role || "Role not assigned"}
 </p>

 {/* Metadata */}

 <div className="mt-4 flex flex-wrap gap-2">

 {/* Department */}

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
 {member.department ||
 "Department not assigned"}
 </span>

 {/* Presence */}

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
 ${currentPresence.badge}
 `}
 >
 <span
 className={`
 h-1.5
 w-1.5
 rounded-full
 ${currentPresence.dot}
 `}
 />

 {member.presenceStatus}
 </span>
 </div>
 </div>
 </div>

 {/* ================================= */}
 {/* Actions */}
 {/* ================================= */}

 {canManageTeam && (
 <div
 className="
 flex
 w-full
 gap-2
 sm:w-auto
 "
 >
 {/* Edit */}

 <button
 type="button"
 onClick={() =>
 setOpenEditModal(true)
 }
 className="
 inline-flex
 flex-1
 cursor-pointer
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

 {/* Assign Jobs */}

 <button
 type="button"
 onClick={() =>
 setOpenAssignModal(true)
 }
 className="
 inline-flex
 flex-1
 cursor-pointer
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
 hover:
 bg-[
 #35745E]
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

 {/* ===================================== */}
 {/* Bottom information */}
 {/* ===================================== */}

 <div
 className="
 mt-7
 border-t
 border-zinc-100
 pt-5
 dark:border-zinc-800
 "
 >
 <div
 className="
 flex
 flex-wrap
 items-center
 gap-x-8
 gap-y-4
 "
 >
 {/* Department */}

 <div>
 <p
 className="
 text-xs
 font-medium
 text-zinc-400
 "
 >
 Department
 </p>

 <p
 className="
 mt-1
 text-sm
 font-semibold
 text-zinc-800
 dark:text-zinc-200
 "
 >
 {member.department ||
 "Not assigned"}
 </p>
 </div>

 <div className="hidden h-8 w-px bg-zinc-200 sm:block dark:bg-zinc-700" />

 {/* Role */}

 <div>
 <p
 className="
 text-xs
 font-medium
 text-zinc-400
 "
 >
 Role
 </p>

 <p
 className="
 mt-1
 text-sm
 font-semibold
 text-zinc-800
 dark:text-zinc-200
 "
 >
 {member.role ||
 "Not assigned"}
 </p>
 </div>

 <div className="hidden h-8 w-px bg-zinc-200 sm:block dark:bg-zinc-700" />

 {/* Membership */}

 <div>
 <p
 className="
 text-xs
 font-medium
 text-zinc-400
 "
 >
 Membership
 </p>

 <span
 className={`
 mt-1
 inline-flex
 rounded-full
 px-2.5
 py-1
 text-xs
 font-semibold
 ${membershipStyles[member.membershipStatus]}
 `}
 >
 {member.membershipStatus}
 </span>
 </div>

 <div className="hidden h-8 w-px bg-zinc-200 sm:block dark:bg-zinc-700" />

 {/* Presence */}

 <div>
 <p
 className="
 text-xs
 font-medium
 text-zinc-400
 "
 >
 Presence
 </p>

 <p
 className="
 mt-1
 flex
 items-center
 gap-2
 text-sm
 font-semibold
 text-zinc-800
 dark:text-zinc-200
 "
 >
 <span
 className={`
 h-2
 w-2
 rounded-full
 ${currentPresence.dot}
 `}
 />

 {member.presenceStatus}
 </p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* ========================================= */}
 {/* Modals */}
 {/* ========================================= */}

 <EditTeamMemberModal
 open={openEditModal}
 onClose={() =>
 setOpenEditModal(false)
 }
 member={member}
 />

 <AssignJobsModal
 open={openAssignModal}
 onClose={() =>
 setOpenAssignModal(false)
 }
 member={member}
 />
 </>
 );
};

export default TeamMemberHeader;