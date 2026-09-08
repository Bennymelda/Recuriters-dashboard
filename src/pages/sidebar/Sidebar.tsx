

import { useState } from "react";
import {
 MdDashboard,
 MdGroups,
 MdWork,
 MdAssignment,
 MdInsights,
 MdClose,
} from "react-icons/md";

import SidebarItem from "./sidebarItem";
import SidebarsFooter from "./sidebarMainFooter";
import SidebarDropdown from "./SidebarDropdown";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { useCompanyStore } from "../../store/companyStore";
import type { UserRole } from "../../types/auth";

interface SidebarProps {
 mobileSidebarOpen: boolean;
 setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
 userRole?: UserRole;
}

const Sidebar = ({
 mobileSidebarOpen,
 setMobileSidebarOpen,
 userRole,
}: SidebarProps) => {
 const company = useCompanyStore((state) => state.company);

 const [isExpanded, setIsExpanded] = useState(true);

 const closeMobileSidebar = () => {
 if (window.innerWidth < 1024) {
 setMobileSidebarOpen(false);
 }
 };

 const companyInitials =
 company.companyName?.trim()
 ? company.companyName
 .split(" ")
 .map((word) => word[0])
 .join("")
 .slice(0, 2)
 .toUpperCase()
 : "RF";

 /*
 * ---------------------------------------------
 * ROLE-BASED NAVIGATION
 * ---------------------------------------------
 */

 const canSeeJobs =
 userRole === "Admin" ||
 userRole === "Recruiter" ||
 userRole === "HR Manager" ||
 userRole === "Hiring Manager";

 const canSeeCandidates =
 userRole === "Admin" ||
 userRole === "Recruiter" ||
 userRole === "Hiring Manager" ||
 userRole === "HR Manager";



 const canSeeInterviews =
 userRole === "Admin" ||
 userRole === "Recruiter" ||
 userRole === "Hiring Manager" ||
 userRole === "HR Manager";

 const canSeeAnalytics =
 userRole === "Admin" ||
 userRole === "Recruiter" ||
 userRole === "HR Manager";

 const canSeeTeam =
 userRole === "Admin" ||
 userRole === "HR Manager";

const isHiringManager = userRole === "Hiring Manager";

const jobsPath = isHiringManager
 ? "/hiring-manager/jobs"
 : "/jobs";

const candidatesPath = isHiringManager
 ? "/hiring-manager/candidates"
 : "/candidates";
 

const interviewsPath = isHiringManager
 ? "/hiring-manager/interviews"
 : "/interview";

const dashboardPath = isHiringManager
 ? "/hiring-manager"
 : "/dashboard"; 

 return (
 <>
 <aside
 className={`
 fixed
 inset-y-0
 left-0
 z-50

 flex
 flex-col

 border-r
 border-zinc-100

 bg-white

 transition-all
 duration-300

 dark:border-zinc-800
 dark:bg-zinc-900

 ${
 mobileSidebarOpen
 ? "translate-x-0"
 : "-translate-x-full"
 }

 lg:sticky
 lg:top-0
 lg:h-screen
 lg:translate-x-0

 ${isExpanded ? "lg:w-64" : "lg:w-20"}

 w-72
 `}
 >
 {/* Header */}

 <div className="flex min-w-0 items-center justify-between border-b border-zinc-100 p-3 dark:border-zinc-800">
 
 <div className="flex items-center gap-3">
 {company.logo ? (
 <img
 src={company.logo}
 alt={company.companyName}
 className="h-10 w-10 shrink-0  rounded-xl object-cover"
 />
 ) : (
 <div
 className="
 flex
 shrink-0
 h-10
 w-10
 items-center
 justify-center
 rounded-xl
 bg-[#285A48]
 text-sm
 font-bold
 text-white
 dark:bg-[#B0E4CC]
 dark:text-zinc-900
 "
 >
 {companyInitials}
 </div>
 )}

 {isExpanded && (
 <div>
 <h1 className="text-lg font-bold text-zinc-900 dark:text-white">
 RecruitFlow
 </h1>

 <p className="text-xs text-zinc-500 dark:text-zinc-400">
 {company.companyName || "Hiring Dashboard"}
 </p>
 </div>
 )}
 </div>

 <div className="flex items-center gap-2">
 {/* Desktop collapse button */}

 <button
 onClick={() => setIsExpanded(!isExpanded)}
 className="
 hidden
 cursor-pointer
 rounded-lg
 p-2
 text-[#285A48]
 transition
 hover:bg-slate-100
 dark:text-[#B0E4CC]
 dark:hover:bg-zinc-800
 lg:flex
 "
 >
 {isExpanded ? (
 <CiSquareChevLeft
 size={22}
 className="text-gray-400"
 />
 ) : (
 <CiSquareChevRight
 size={22}
 className="text-gray-400"
 />
 )}
 </button>

 {/* Mobile close button */}

 <button
 onClick={() => setMobileSidebarOpen(false)}
 className="
 cursor-pointer
 rounded-lg
 p-2
 text-[#285A48]
 transition
 hover:bg-slate-100
 dark:text-[#B0E4CC]
 dark:hover:bg-zinc-800
 lg:hidden
 "
 >
 <MdClose size={22} />
 </button>
 </div>
 </div>

 {/* Navigation */}

 <div className="flex flex-1 flex-col">
 <nav className="flex-1 overflow-y-auto px-3 py-5">

 {/* Dashboard - Everyone */}

 <SidebarItem
 icon={MdDashboard}
 label="Dashboard"
 to={dashboardPath}
 isExpanded={isExpanded}
 onClick={closeMobileSidebar}
 />

 {/* Candidates */}

 {canSeeCandidates && (
 <SidebarDropdown
 icon={MdGroups}
 label="Candidates"
 onItemClick={closeMobileSidebar}
 isExpanded={isExpanded}
 items={
 isHiringManager
 ? [
 {
 label: "Candidate List",
 to: candidatesPath,
 },
 {
 label: "Hiring Pipeline",
 to: "hiring-manager/pipeline",
 },
 ]
 : [
 {
 label: "Candidate List",
 to: "/candidates",
 },
 {
 label: "Hiring Pipeline",
 to: "/pipeline",
 },
 ]
}
 />
)}

 {/* Jobs */}

 {canSeeJobs && (
 <SidebarItem
 icon={MdWork}
 label="Jobs"
 to={jobsPath}
 isExpanded={isExpanded}
 onClick={closeMobileSidebar}
 />
 )}

 {/* Interviews */}

 {canSeeInterviews && (
 <SidebarItem
 icon={MdAssignment}
 label="Interview Candidate"
 to={interviewsPath}
 isExpanded={isExpanded}
 onClick={closeMobileSidebar}
 />
 )}

 {/* Analytics */}

 {canSeeAnalytics && (
 <SidebarItem
 icon={MdInsights}
 label="Analytics"
 to="/analytics"
 isExpanded={isExpanded}
 onClick={closeMobileSidebar}
 />
 )}

 {/* Team */}

 {canSeeTeam && (
 <SidebarItem
 icon={MdGroups}
 label="Team Members"
 to="/team"
 isExpanded={isExpanded}
 onClick={closeMobileSidebar}
 />
 )}

 {/* Settings - Everyone */}

 <SidebarItem
 icon={MdAssignment}
 label="Settings"
 to="/settings"
 isExpanded={isExpanded}
 onClick={closeMobileSidebar}
 />
 </nav>

 {/* Footer */}

 <div className="mt-auto border-t border-zinc-200 p-4 dark:border-zinc-800">
 <SidebarsFooter isExpanded={isExpanded} />
 </div>
 </div>
 </aside>

 {/* Mobile overlay */}

 {mobileSidebarOpen && (
 <div
 onClick={() => setMobileSidebarOpen(false)}
 className="
 fixed
 inset-0
 z-40
 bg-black/40
 lg:hidden
 "
 />
 )}
 </>
 );
};

export default Sidebar;