import React from "react";

import { MdDashboard, MdWork, MdCalendarToday, MdSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FiGitBranch, FiBarChart2 } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";

interface SidebarItem {
 label: string;
 icon: React.ReactNode;
 href: string;
}

const Sidebar = () => {
 const menuItems: SidebarItem[] = [
	{ label: "Overview", icon: <MdDashboard size={18} />, href: "/dashboard" },
	{ label: "Jobs", icon: <MdWork size={18} />, href: "/dashboard/jobs" },
	{ label: "Candidates", icon: <FaUsers size={18} />, href: "/dashboard/candidates" },
	{ label: "Pipeline", icon: <FiGitBranch size={18} />, href: "/dashboard/pipeline" },
	{ label: "Interviews", icon: <MdCalendarToday size={18} />, href: "/dashboard/interviews" },
	{ label: "Analytics", icon: <FiBarChart2 size={18} />, href: "/dashboard/analytics" },
	{ label: "Team", icon: <HiUsers size={18} />, href: "/dashboard/team" },
	{ label: "Settings", icon: <MdSettings size={18} />, href: "/dashboard/settings" },
 ];

 return (
 <aside className="h-screen w-64 bg-[hashtag#0B1220] border-r border-gray-800 flex flex-col">
 
 {/* Logo */}
 <div className="px-6 py-5 border-b border-gray-800">
 <h1 className="text-white text-xl font-bold">
 CareerFlow
 </h1>
 <p className="text-xs text-gray-500">
 Recruiter Dashboard
 </p>
 </div>

 {/* Menu */}
 <nav className="flex-1 px-4 py-6 space-y-2">
 {menuItems.map((item) => (
 <a
 key={item.label}
 href={item.href}
 className="
 flex items-center gap-3
 px-4 py-2.5
 rounded-lg
 text-gray-300
 hover:bg-gray-800
 hover:text-white
 transition
 "
 >
 <span className="text-gray-400">
 {item.icon}
 </span>

 <span className="text-sm font-medium">
 {item.label}
 </span>
 </a>
 ))}
 </nav>

 {/* Footer */}
 <div className="px-6 py-4 border-t border-gray-800">
 <div className="text-xs text-gray-500">
 Logged in as
 </div>
 <div className="text-sm text-white font-medium">
 Recruiter Admin
 </div>
 </div>
 </aside>
 );
};

export default Sidebar;