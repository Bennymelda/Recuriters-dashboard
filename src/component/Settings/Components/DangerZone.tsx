import ClearDemoModal from "./DangerZone/ClearDemoCard";
import { useState } from "react";
import { useCandidateStore } from "../../../store/candidateStore";
import { useJobStore } from "../../../store/jobStore";
import { useTeamStore } from "../../../store/teamStore";
import { useNotificationStore } from "../../../store/notificationStore";
import { useCompanyStore } from "../../../store/companyStore";
import DeleteWorkspaceModal from "./DeletWorkSpaceModal";
import { useAuthStore } from "../../../store/authStore";
import { useToastStore } from "../../toast/toastStore";
const DangerZone = () => {

const clearCandidates = useCandidateStore(
 (state) => state.clearCandidates
);
const [openDeleteModal, setOpenDeleteModal] = useState(false);

const company = useCompanyStore((state) => state.company);
const clearJobs = useJobStore(
 (state) => state.clearJobs
);

const clearMembers = useTeamStore(
 (state) => state.clearMembers
);

const clearNotifications = useNotificationStore(
 (state) => state.clearNotifications
);


const showToast = useToastStore((state) => state.showToast);


const resetCompany = useCompanyStore(
 (state) => state.resetCompany
);

const logout = useAuthStore(
 (state) => state.logout
);


const handleExportData = () => {
const exportData = {
 company: JSON.parse(
 localStorage.getItem("careerflow-company") || "{}"
 ),

 candidates: JSON.parse(
 localStorage.getItem("careerflow-candidates") || "{}"
 ),

jobs: JSON.parse(
 localStorage.getItem("careerflow-jobs") || "{}"
),

 team: JSON.parse(
 localStorage.getItem("careerflow-team") || "{}"
 ),

 auth: JSON.parse(
 localStorage.getItem("auth-storage") || "{}"
 ),

 currentUser: JSON.parse(
 localStorage.getItem("currentUser") || "{}"
 ),

 users: JSON.parse(
 localStorage.getItem("users") || "[]"
 ),

 exportedAt: new Date().toISOString(),
};

 const blob = new Blob(
 [JSON.stringify(exportData, null, 2)],
 {
 type: "application/json",
 }
 );

 const url = URL.createObjectURL(blob);

 const link = document.createElement("a");

 link.href = url;

 link.download = `careerflow-backup-${new Date()
 .toISOString()
 .split("T")[0]}.json`;

 document.body.appendChild(link);

 link.click();

 document.body.removeChild(link);

 URL.revokeObjectURL(url);

 showToast({
 type: "success",
 title: "Export Complete",
 message: "Your workspace has been downloaded successfully.",
 });
 console.log(localStorage);
console.log(Object.keys(localStorage));
};


    const [openClearModal, setOpenClearModal] = useState(false);
 const handleDeleteWorkspace = () => {
 clearJobs();
 clearCandidates();
 clearMembers();
 clearNotifications();
 resetCompany();

 logout();

 showToast({
 type: "success",
 title: "Workspace Deleted",
 message: "Your workspace has been deleted successfully.",
 });

 setOpenDeleteModal(false);
};
 
 
    return (
 <div className="space-y-8">

 {/* Header */}

 <div>
 <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
 Danger Zone
 </h2>

 <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
 These actions are irreversible. Please proceed carefully.
 </p>
 </div>


{/* Export Data */}

<div
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-8
 shadow-sm
 dark:border-zinc-700
 dark:bg-zinc-900
 "
>
 <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

 <div>
 <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
 Export Company Data
 </h3>

 <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-500 dark:text-zinc-400">
 Download a backup of your company information, recruiters,
 candidates, interviews, jobs and settings. This can be used
 for record keeping or migration.
 </p>
 </div>

 <button
onClick={handleExportData}

 className="
 rounded-2xl
 border
 border-[#285A48]
 px-6
 py-3
 font-semibold
 text-[#285A48]
 transition
 hover:bg-[#285A48]
 hover:text-white

 dark:border-[#B0E4CC]
 dark:text-[#B0E4CC]
 dark:hover:bg-[#B0E4CC]
 dark:hover:text-zinc-900
 "
 >
 Export Data
 </button>

 </div>
</div>

{/* Clear Demo Data */}

<div
 className="
 rounded-3xl
 border
 border-amber-200
 bg-amber-50
 p-8

 dark:border-amber-700/40
 dark:bg-amber-950/20
 "
>
 <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

 <div>

 <span
 className="
 rounded-full
 bg-amber-100
 px-3
 py-1
 text-xs
 font-semibold
 uppercase
 tracking-wide
 text-amber-700

 dark:bg-amber-900/40
 dark:text-amber-300
 "
 >
 Warning
 </span>

 <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
 Clear Demo Data
 </h3>

 <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
 Remove all sample jobs, candidates, interviews and recruiter
 activities while keeping your company account and workspace
 intact.
 </p>

 </div>

 <button
 className="
 rounded-2xl
 bg-amber-500
 px-6
 py-3
 font-semibold
 text-white
 transition
 hover:bg-amber-600
 "
 onClick={() => setOpenClearModal(true)}


 >
 Clear Demo Data
 </button>

 </div>
</div>




{/* Delete Workspace */}

<div
 className="
 rounded-3xl
 border
 border-red-200
 bg-red-50
 p-8

 dark:border-red-800
 dark:bg-red-950/20
 "
>
 <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

 <div>

 <span
 className="
 rounded-full
 bg-red-100
 px-3
 py-1
 text-xs
 font-semibold
 uppercase
 tracking-wide
 text-red-700

 dark:bg-red-900/40
 dark:text-red-300
 "
 >
 Permanent
 </span>

 <h3 className="mt-4 text-xl font-bold text-red-700 dark:text-red-300">
 Delete Workspace
 </h3>

 <p className="mt-3 max-w-2xl text-sm leading-7 text-red-700/80 dark:text-red-300/80">
 Permanently delete your company, recruiters, candidates,
 interviews, jobs, notifications and every piece of data in this
 workspace. This action cannot be undone.
 </p>

 </div>

 <button
 className="
 rounded-2xl
 bg-red-600
 px-6
 py-3
 font-semibold
 text-white
 transition
 hover:bg-red-700
 "
onClick={() => setOpenDeleteModal(true)}

 >
 Delete Workspace
 </button>

 </div>
</div>


<ClearDemoModal
 open={openClearModal}
 onClose={() => setOpenClearModal(false)}
 onConfirm={() => {
 clearCandidates();
clearJobs();
clearMembers();
clearNotifications();
 setOpenClearModal(false);
 }}
/>





<DeleteWorkspaceModal
 open={openDeleteModal}
 onClose={() => setOpenDeleteModal(false)}
 companyName={company.companyName}
 onConfirm={handleDeleteWorkspace}
/>



 </div>
 );
};

export default DangerZone;