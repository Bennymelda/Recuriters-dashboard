
import { useNavigate } from "react-router";
import ThemeToggle from "../header/ThemeToggle";
import { useAuthStore } from "../../store/authStore";
import { MdLogout } from "react-icons/md";

interface SidebarFooterProps {
 isExpanded: boolean;
}
export default function SidebarsFooter({ isExpanded }: SidebarFooterProps){

const logout = useAuthStore(
 (state) => state.logout
);

const navigate =useNavigate()
const handleLogout = () => {
 logout();

 navigate("/login");
};



return(<>

<ThemeToggle />
<button
onClick={handleLogout}
 className="flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
 >
 <MdLogout size={22} />

 {isExpanded && (
 <span className="text-sm font-medium">
 Logout
 </span>
 )}
 </button>



</>)
}