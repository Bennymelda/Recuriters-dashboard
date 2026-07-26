import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

import SettingsSidebar from "./Components/SettingSidebar";
import ProfileSettings from "./Components/ProfileSettings";
import SecuritySettings from "./Components/SecuritySetting";


import CompanySettings from "./Components/ComapnySetting";
import DangerZone from "./Components/DangerZone";
const SettingsPage = () => {
 const user = useAuthStore((state) => state.user);

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



 case "danger":
 return isAdmin ? (
 <DangerZone />
 ) : null;

 default:
 return <ProfileSettings />;
 }
 };

 return (
 <main className="min-h-screen bg-zinc-50 dark:bg-zinc-900">

 <div className="mx-auto max-w-7xl px-6 py-8">

 {/* Header */}

 <div className="mb-8">

 <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
 Settings
 </h1>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 Manage your account, security, notifications and workspace.
 </p>

 </div>

 {/* Layout */}

 <div
 className="
 grid
 gap-6

 lg:grid-cols-[280px_1fr]
 "
 >

 {/* Sidebar */}

 <SettingsSidebar
 activeSection={activeSection}
 setActiveSection={setActiveSection}
 isAdmin={isAdmin}
 />

 {/* Content */}

 <section
 className="
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