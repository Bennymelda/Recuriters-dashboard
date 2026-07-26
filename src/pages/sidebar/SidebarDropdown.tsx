import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { IconType } from "react-icons";
import {
 MdKeyboardArrowDown,

} from "react-icons/md";

interface DropdownItem {
 label: string;
 to: string;
}

interface SidebarDropdownProps {
 icon: IconType;
 label: string;
 items: DropdownItem[];
 isExpanded: boolean;
 onItemClick?: () => void;
}

const SidebarDropdown = ({
 icon: Icon,
 label,
 items,
 isExpanded,
  onItemClick,
}: SidebarDropdownProps) => {
 const location = useLocation();

 const isActive = items.some((item) =>
 location.pathname.startsWith(item.to)
 );

 const [open, setOpen] = useState(isActive);

 return (
 <div className="mb-1">
 {/* Parent */}
 <button
 onClick={() => setOpen((prev) => !prev)}
 className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200
 ${
 isActive
 ? "dark:bg-[#B0E4cc] bg-[#285A48] text-white dark:text-zinc-800 shadow-md"
 : "text-slate-600 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800 hover:bg-zinc-300 hover:text-slate-900  "
 }`}
 >
 <div className="flex items-center gap-4">
 <Icon size={22} />

 {isExpanded && (
 <span className="text-sm font-medium">
 {label}
 </span>
 )}
 </div>

 {isExpanded && (
 <div
 className={`transition-transform duration-200 ${
 open ? "rotate-180" : ""
 }`}
 >
 <MdKeyboardArrowDown size={20} />
 </div>
 )}
 </button>

 {/* Children */}
 {isExpanded && open && (
 <div className="mt-2 ml-11 flex flex-col gap-1">
 {items.map((item) => {
 const active = location.pathname === item.to;

 return (
 <Link
 key={item.to}
 to={item.to}
 onClick={onItemClick}
 className={`rounded-lg px-4 font-semibold py-2 text-sm transition-all duration-200
 ${
 active
 ? "dark:text-[#B0E4cc] font-semibold  text-[#285A48] hover:bg-zinc-200  dark:hover:bg-zinc-800 "
 : "text-zinc-500 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-200 hover:text-slate-900 dark:hover:bg-zinc-800 "
 }`}
 >
 {item.label}
 </Link>
 );
 })}
 </div>
 )}
 </div>
 );
};

export default SidebarDropdown;