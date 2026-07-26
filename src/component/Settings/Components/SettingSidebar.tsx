import {
 MdPerson,
 MdLock,
 MdNotifications,

 MdBusiness,
 MdWarning,
} from "react-icons/md";

interface SettingsSidebarProps {
 activeSection: string;
 setActiveSection: (section: string) => void;
 isAdmin: boolean;
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
 h-full
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-5
 
 shadow-sm
 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >
 <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
 Settings
 </p>

 <div className="space-y-2">
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
 transition

 ${
 active
 ? "bg-[#408A71] text-white shadow-md"
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
 </div>

 {isAdmin && (
 <>
 <div className="my-6 border-t border-zinc-200 dark:border-zinc-700" />

 <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
 Workspace
 </p>

 <div className="space-y-2">
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
 transition

 ${
 active
 ? "bg-[#408A71] text-white shadow-md"
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
 </div>
 </>
 )}
 </aside>
 );
};

export default SettingsSidebar;