
import { Link, useLocation } from "react-router-dom";
import type { IconType } from "react-icons";

interface SidebarItemProps {
 icon: IconType;
 label: string;
 to: string;
 isExpanded: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
 icon: Icon,
 label,
 to,
 onClick,
 isExpanded,
}: SidebarItemProps) => {
 const location = useLocation();

 const active = location.pathname === to;

 return (
 <Link
 to={to}
 onClick={onClick}
 className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200
 ${
 active
 ? "dark:bg-[#B0E4cc] bg-[#285A48] text-white dark:text-zinc-800 shadow-md"
 : "text-slate-600 dark:text-zinc-300 dark:hover:bg-zinc-800 hover:bg-zinc-100 hover:text-slate-900  dark:hover:text-white"
 }`}
 >
 <Icon size={22} />

 {isExpanded && (
 <span className="text-sm font-medium">
 {label}
 </span>
 )}
 </Link>
 );
};

export default SidebarItem;

