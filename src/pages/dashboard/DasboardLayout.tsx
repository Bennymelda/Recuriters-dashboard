import { Outlet } from "react-router-dom";
import ToastContainer from "../../component/toast/ToastContainer";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const DashboardLayout = () => {
 const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

 const user = useAuthStore((state) => state.user);

 return (
 <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">

 <Sidebar
 mobileSidebarOpen={mobileSidebarOpen}
 setMobileSidebarOpen={setMobileSidebarOpen}
 userRole={user?.role}
 />

 <div className="flex min-w-0 flex-1 flex-col">

 <Header
 onOpenSidebar={() => setMobileSidebarOpen(true)}
 />

 <main className="flex-1 overflow-hidden p-4 lg:p-6">
 <Outlet />
 </main>

 <ToastContainer />

 </div>
 </div>
 );
};

export default DashboardLayout;