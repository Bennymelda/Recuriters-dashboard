import {
 MdPerson,
 MdLock,
 MdNotifications,

 MdBusiness,
 MdWarning,
 MdArrowBack,

} from "react-icons/md";
import { Link} from "react-router";

interface SettingsSidebarProps {
 activeSection: string;
 setActiveSection: (section: string) => void;
 isAdmin: boolean;
 onClose?: () => void;
}

const SettingsSidebar = ({
 activeSection,
 setActiveSection,
 isAdmin,

}: SettingsSidebarProps) => {
 const menuItems = [
 {
 id: "profile",
 label: "Profile",
 icon: MdPerson,
 },
 {
 id: "security",
 label: "Security",
 icon: MdLock,
 },
 {
 id: "notifications",
 label: "Notifications",
 icon: MdNotifications,
 },

 ];


 const adminItems = [

 {
 id: "company",
 label: "Company Settings",
 icon: MdBusiness,
 },
 {
 id: "danger",
 label: "Danger Zone",
 icon: MdWarning,
 },
 ];

 return (
 <aside
 className="
 sticky
 top-0

 h-full
 w-full

 border-r
 border-zinc-200

 bg-white

 px-5
 py-6

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Heading */}
 <div className="mb-8 flex items-center gap-2">
    <div  >
    <Link to="/dashboard">
<MdArrowBack size={20} className="bg-gary-600 dark:text-gray-300"/>
</Link>
    </div>
    <div className="mb-6 flex items-center gap-3 lg:hidden">


 
</div>
 <p className="text-xs  font-semibold uppercase tracking-[0.2em] text-zinc-400">
 Personal
 </p>
 </div>

 {/* Main Menu */}
 <nav className="space-y-2">
 {menuItems.map((item) => {
 const Icon = item.icon;
 const active = activeSection === item.id;

 return (
 <button
 key={item.id}
 onClick={() => setActiveSection(item.id)}
 className={`
 flex
 w-full
 items-center
 gap-3
 rounded-2xl
 px-4
 py-3
 text-left
 transition-all
 duration-200

 ${
 active
 ? "bg-[#408A71] text-white shadow-sm"
 : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
 }
 `}
 >
 <Icon size={20} />

 <span className="font-medium">
 {item.label}
 </span>
 </button>
 );
 })}
 </nav>

 {isAdmin && (
 <>
 <div className="my-8 border-t border-zinc-200 dark:border-zinc-800" />

 <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
 Workspace
 </p>

 <nav className="space-y-2">
 {adminItems.map((item) => {
 const Icon = item.icon;
 const active = activeSection === item.id;

 return (
 <button
 key={item.id}
 onClick={() => setActiveSection(item.id)}
 className={`
 flex
 w-full
 items-center
 gap-3
 rounded-2xl
 px-4
 py-3
 text-left
 transition-all
 duration-200

 ${
 active
 ? "bg-[#408A71] text-white shadow-sm"
 : item.id === "danger"
 ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
 : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
 }
 `}
 >
 <Icon size={20} />

 <span className="font-medium">
 {item.label}
 </span>
 </button>
 );
 })}
 </nav>
 </>
 )}
 </aside>
);
};

export default SettingsSidebar;