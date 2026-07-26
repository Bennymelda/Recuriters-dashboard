import {
 MdSettings,


} from "react-icons/md";
import { Link } from "react-router-dom";

interface SidebarFooterProps {
 isExpanded: boolean;
}

const SidebarFooter = ({ isExpanded }: SidebarFooterProps) => {
 return (
 <div className=" dark:border-slate-800">
 <div className="">
 <Link
 to="/settings"
 className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
 >
 <MdSettings size={22} />

 {isExpanded && (
 <span className="text-sm font-medium">
 Settings
 </span>
 )}
 </Link>

 

 </div>
 </div>
 );
};

export default SidebarFooter;