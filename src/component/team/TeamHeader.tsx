import { MdGroupAdd } from "react-icons/md";
import { useState } from "react";
import AddTeamMemberModal from "./Modals/AddTeamMemberModal";
import { useAuthStore } from "../../store/authStore";
const TeamHeader = () => {
    const user = useAuthStore((state) => state.user);
const canManageTeam = user?.role === "Admin";
    const [openAddMemberModal, setOpenAddMemberModal] =
 useState(false);
 return (
<section
 className="
 flex flex-col gap-6
 rounded-3xl
 border border-zinc-200
 bg-gradient-to-r
 from-[#134e2f]
 to-white
 p-6
 shadow-sm

 dark:border-zinc-700
 dark:from-[#b0eccd]
 dark:to-gray-100

 md:flex-row
 md:items-center
 md:justify-between
 "
>
 <div>
 <span
 className="
 inline-flex
 rounded-full
 bg-[#EEF8F3]
 px-3
 py-1
 text-xs
 font-semibold
 tracking-wide
 text-[#285A48]

 dark:bg-[#285A48]/20
 dark:text-black
 "
 >
 Team Management
 </span>

 <h1 className="mt-4 text-3xl font-bold tracking-tight text-white dark:text-black">
 Team Members
 </h1>

 <p className="mt-3 max-w-2xl md:max-w-lg text-white text-sm leading-6  dark:text-zinc-800">
 Manage recruiters, hiring managers, HR staff, assign responsibilities,
 and monitor your hiring team's performance from one place.
 </p>
 </div>
{canManageTeam && (
 <button
 onClick={() => setOpenAddMemberModal(true)}
 className="
 inline-flex
 items-center
 gap-2

 rounded-2xl
w-fit
 bg-[#285A48]
cursor-pointer
 px-6
 py-3

 text-sm
 font-semibold
 text-white

 shadow-md

 transition-all
 duration-300

 hover:-translate-y-0.5
 hover:bg-[#35745E]
 hover:shadow-xl
whitespace-nowrap
 dark:bg-[#B0E4CC]
 dark:text-zinc-900
 dark:hover:bg-[#A3DEC4]
 "
 >
 <MdGroupAdd size={22} />
 Add Team Member
 </button>
)}
 <AddTeamMemberModal
 open={openAddMemberModal}
 onClose={() => setOpenAddMemberModal(false)}
 />
</section>
 );
};

export default TeamHeader;