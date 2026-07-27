// src/components/dashboard/settings/SettingsHeader.tsx

import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router";

const SettingsHeader = () => {
 const navigate = useNavigate();

 return (
 <div className="mb-8 flex items-start gap-4">
 <button
 onClick={() => navigate(-1)}
 className="
 mt-1
 flex
 items-center
 gap-2
 rounded-xl
 border
 border-zinc-200
 bg-white
 px-4
 py-2
 text-sm
 font-medium
 text-zinc-700
 transition
 hover:bg-zinc-100

 dark:border-zinc-700
 dark:bg-zinc-900
 dark:text-zinc-300
 dark:hover:bg-zinc-800
 "
 >
 <MdArrowBack size={18} />
 Back
 </button>

 <div>
 <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
 Settings
 </h1>

 <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">
 Manage your account, workspace, and security preferences in one
 place.
 </p>
 </div>
 </div>
 );
};

export default SettingsHeader;