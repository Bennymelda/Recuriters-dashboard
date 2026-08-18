import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

import SettingsSidebar from "./Components/SettingSidebar";
import ProfileSettings from "./Components/ProfileSettings";
import SecuritySettings from "./Components/SecuritySetting";
import Notifications from "../../pages/header/Notifcations";

import CompanySettings from "./Components/ComapnySetting";
import DangerZone from "./Components/DangerZone";
import { MdMenu } from "react-icons/md";

const SettingsPage = () => {
 const user = useAuthStore((state) => state.user);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [activeSection, setActiveSection] =
 useState("profile");

 const isAdmin = user?.role === "Admin";

 const renderSection = () => {
 switch (activeSection) {
 case "profile":
 return <ProfileSettings />;

 case "security":
 return <SecuritySettings />;



  case "company":
 return isAdmin ? (
 <CompanySettings />
 ) : null;


  case "notifications":
 return  (
 <Notifications />
 ) 


 case "danger":
 return isAdmin ? (
 <DangerZone />
 ) : null;

 default:
 return <ProfileSettings />;
 }
 };

return (
 <main className="min-h-full bg-zinc-50 dark:bg-zinc-900">
 {/* Mobile Header */}
 <div className="mb-4 flex items-center px-4 pt-4 lg:hidden">
 <button
 onClick={() => setMobileMenuOpen(true)}
 className="
 rounded-xl
 p-2
 cursor-pointer
 text-zinc-700
 transition
 hover:bg-zinc-100
 dark:text-white
 dark:hover:bg-zinc-800
 "
 >
 <MdMenu size={24} />
 </button>

 <h2 className="ml-3 text-xl font-bold text-zinc-900 dark:text-white">
 Settings
 </h2>
 </div>

 <div className="flex gap-6">
 {/* Settings Sidebar */}
 <div
 className={`
 fixed
 inset-y-0
 left-0
 z-50
 w-72

 bg-white
 dark:bg-zinc-900

 transition-transform
 duration-300

 ${
 mobileMenuOpen
 ? "translate-x-0"
 : "-translate-x-full"
 }

 lg:static
 lg:translate-x-0
 lg:w-[300px]
 `}
 >
 <SettingsSidebar
 activeSection={activeSection}
 setActiveSection={setActiveSection}
 isAdmin={isAdmin}
 onClose={() => setMobileMenuOpen(false)}
 />
 </div>

 {/* Mobile Overlay */}
 {mobileMenuOpen && (
 <div
 onClick={() => setMobileMenuOpen(false)}
 className="
 fixed
 inset-0
 z-40
 bg-black/40
 lg:hidden
 "
 />
 )}

 {/* Settings Content */}
 <div className="flex-1 p-4 lg:p-0">
 <section
 className="
 mt-5
 mb-10

 rounded-3xl
 border
 border-zinc-200

 bg-white

 p-8

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {renderSection()}
 </section>
 </div>
 </div>
 </main>
);
};

export default SettingsPage;