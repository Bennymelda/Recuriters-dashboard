import { useState } from "react";
import {
 MdKeyboardArrowDown,
 MdPerson,
 MdSettings,


 MdLogout,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useThemeStore } from "../../store/themeStore";
const ProfileMenu = () => {
 const [open, setOpen] = useState(false);
 const { theme } = useThemeStore();
const logout = useAuthStore(
 (state) => state.logout
);
const user = useAuthStore((state) => state.user);

const navigate =useNavigate()
const handleLogout = () => {
 logout();

 navigate("/login");
};

 return (
 <div className="relative">
 {/* Profile Button */}
 <button
 onClick={() => setOpen((prev) => !prev)}
 className="
 group
 flex
 items-center
 gap-3

 rounded-2xl
cursor-pointer
 px-3
 py-2

 transition-all
 duration-300

 hover:bg-zinc-100

 dark:hover:bg-zinc-800
 "
>
 <img
 src={
 user?.avatar ||
 `https://ui-avatars.com/api/?name=${encodeURIComponent(
 user?.fullName ?? "Recruiter"
 )}&background=${
 theme === "dark" ? "B0E4CC" : "285A48"
 }&color=${
 theme === "dark" ? "000000" : "FFFFFF"
 }`
 }
 alt="Profile"
 className="
 h-11
 w-11
 rounded-full
 object-cover

 ring-2
 ring-[#408A71]/20

 transition-all
 duration-300

 group-hover:ring-[#408A71]/50

 dark:ring-[#B0E4CC]/20
 dark:group-hover:ring-[#B0E4CC]/50
 "
/>


 <div className="hidden text-left lg:block">
 <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
{user?.fullName}
 </p>

 <p className="text-xs text-zinc-500 dark:text-zinc-400">
 {user?.role === "HR Manager"
 ? "HR Manager"
 : user?.role}
 </p>
 </div>

 <MdKeyboardArrowDown
 size={20}
 className={`
 text-zinc-500
 transition-all
 duration-300
 group-hover:text-[#408A71]
 dark:group-hover:text-[#B0E4CC]
 ${open ? "rotate-180" : ""}
 `}
 />
</button>



 {/* Dropdown */}
{open && (
 <div
 className="
 absolute
 right-0
 mt-3
 w-80
 overflow-hidden

 rounded-3xl

 border
 border-zinc-200

 bg-white

 shadow-xl
 ring-1
 ring-black/5

 dark:border-zinc-700
 dark:bg-zinc-900
 dark:ring-white/5
 "
 >

 {/* Profile */}
 <div className="border-b border-zinc-200 p-5 dark:border-zinc-700">

 <div className="flex items-center gap-4">


 <div>

 <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
{user?.fullName}
 </h3>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 {user?.role === "HR Manager"
 ? "HR Manager"
 : user?.role}
 </p>

 <p className="mt-1 text-xs text-zinc-400">
{user?.email}
 </p>

 </div>

 </div>

 </div>

 {/* Menu */}
 <div className="p-3 space-y-1">

 <Link
 to="/settings"
 className="
 group
 flex
 items-center
 gap-3

 rounded-2xl

 px-4
 py-3

 text-sm
 font-medium

 text-zinc-700

 transition-all
 duration-200

 hover:bg-[#EEF8F3]
 hover:text-[#408A71]

 dark:text-zinc-300
 dark:hover:bg-zinc-800
 dark:hover:text-[#B0E4CC]
 "
 >
 <MdPerson
 size={20}
 className="transition-transform group-hover:scale-110"
 />
 My Profile
 </Link>

 <Link
 to="/settings"
 className="
 group
 flex
 items-center
 gap-3

 rounded-2xl

 px-4
 py-3

 text-sm
 font-medium

 text-zinc-700

 transition-all
 duration-200

 hover:bg-[#EEF8F3]
 hover:text-[#408A71]

 dark:text-zinc-300
 dark:hover:bg-zinc-800
 dark:hover:text-[#B0E4CC]
 "
 >
 <MdSettings
 size={20}
 className="transition-transform group-hover:rotate-90"
 />
 Settings
 </Link>

 </div>

 {/* Logout */}
 <div className="border-t border-zinc-200 p-3 dark:border-zinc-700">

 <button
 onClick={handleLogout}
 className="
 group
 flex
 w-full
 items-center
 gap-3
cursor-pointer
 rounded-2xl

 px-4
 py-3

 text-sm
 font-medium

 text-red-600

 transition-all
 duration-200

 hover:bg-red-50
 hover:text-red-700

 dark:text-red-400
 dark:hover:bg-red-900/20
 dark:hover:text-red-300
 "
 >
 <MdLogout
 size={20}
 className="transition-transform group-hover:-translate-x-1"
 />
 Logout
 </button>

 </div>

 </div>
)}
</div>
 );
};

export default ProfileMenu;