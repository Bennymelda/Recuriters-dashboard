
import { MdCheck } from "react-icons/md";

interface TeamPermissionSelectProps {
 permissions: string[];
 setPermissions: (permissions: string[]) => void;
}

const permissionOptions = [
 "Manage Jobs",
 "Manage Candidates",
 "Schedule Interviews",
 "View Analytics",
 "Manage Team",
 "Administrator",
];

const TeamPermissionSelect = ({
 permissions,
 setPermissions,
}: TeamPermissionSelectProps) => {
 const togglePermission = (permission: string) => {
 if (permissions.includes(permission)) {
 setPermissions(
 permissions.filter((item) => item !== permission)
 );
 } else {
 setPermissions([...permissions, permission]);
 }
 };

 return (
 <section>

 <h3 className="mb-5 text-lg font-semibold text-zinc-900 dark:text-white">
 Permissions
 </h3>

 <div className="grid gap-4 md:grid-cols-2">

 {permissionOptions.map((permission) => {
 const selected = permissions.includes(permission);

 return (
 <button
 key={permission}
 type="button"
 onClick={() => togglePermission(permission)}
 className={`
 flex
 items-center
 justify-between

 rounded-2xl

 border

 p-4

 transition-all

 ${
 selected
 ? "border-[#408A71] bg-[g#EEF8F3] dark:bg-[#408A71]/10"
 : "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
 }
 `}
 >
 <span className="font-medium text-zinc-900 dark:text-white">
 {permission}
 </span>

 {selected && (
 <MdCheck
 size={20}
 className="text-[#408A71]"
 />
 )}
 </button>
 );
 })}

 </div>

 </section>
 );
};

export default TeamPermissionSelect;