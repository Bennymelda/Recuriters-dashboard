import Input from "../../ui/Input";
import CustomSelect from "../../ui/CustomSelect";
import TeamAvatarUpload from "./TeamAvvatarUpload";
import TeamPermissionSelect from "./TeamPermissionSelect";
import type { TeamRole, TeamStatus } from "../../../types/team";
export interface TeamFormData {
 fullName: string;
 email: string;
 phone: string;
 joinedAt: string;

 role: TeamRole | "";

 department:
 | "Engineering"
 | "Design"
 | "Marketing"
 | "Human Resources"
 | "Product"
 | "Sales"
 | "Operations"
 | "";

 employmentType: string;

 status: TeamStatus;
}

interface TeamFormProps {
 formData: TeamFormData;
 setFormData: React.Dispatch<React.SetStateAction<TeamFormData>>;

 image: File | null;
 preview: string | null;
 setImage: (file: File | null) => void;
 setPreview: (preview: string | null) => void;

 permissions: string[];
 setPermissions: (permissions: string[]) => void;
}

const TeamForm = ({
 formData,
 setFormData,

 image,
 preview,
 setImage,
 setPreview,

 permissions,
 setPermissions,
}: TeamFormProps) => {
 return (
 <form className="space-y-8">

 {/* Avatar */}

 <TeamAvatarUpload
 image={image}
 preview={preview}
 setImage={setImage}
 setPreview={setPreview}
 />

 {/* Basic Information */}

 <section>

 <h3 className="mb-5 text-lg font-semibold text-zinc-900 dark:text-white">
 Basic Information
 </h3>

 <div className="grid gap-5 md:grid-cols-2">

 <Input
 label="Full Name"
 placeholder="John Doe"
 value={formData.fullName}
 onChange={(e) =>
 setFormData({
 ...formData,
 fullName: e.target.value,
 })
 }
 className="bg-white dark:bg-zinc-900 border border-gray-200"
 />

 <Input
 label="Email Address"
 type="email"
 placeholder="john@example.com"
 value={formData.email}
 onChange={(e) =>
 setFormData({
 ...formData,
 email: e.target.value,
 })
 }
 className="bg-white dark:bg-zinc-900 border border-gray-200"
 />

 <Input
 label="Phone Number"
 placeholder="+234..."
 value={formData.phone}
 onChange={(e) =>
 setFormData({
 ...formData,
 phone: e.target.value,
 })
 }
 className="bg-white dark:bg-zinc-900 border border-gray-200"
 />

 <Input
 label="Joined Date"
 type="date"
   min={new Date().toISOString().split("T")[0]}
 value={formData.joinedAt}
 onChange={(e) =>
 setFormData({
 ...formData,

 joinedAt: e.target.value,
 })
 
 }
 className="bg-white dark:bg-zinc-900 border border-gray-200"
 />

 </div>

 </section>

 {/* Work Information */}

 <section>

 <h3 className="mb-5 text-lg font-semibold text-zinc-900 dark:text-white">
 Work Information
 </h3>

 <div className="grid gap-5 md:grid-cols-2">

 <CustomSelect
 placeholder="Select Role"
 value={formData.role}
 options={[
 "Recruiter",
 "Hiring Manager",
 "HR Manager",

 ]}
 onChange={(value) =>
 setFormData({
 ...formData,
 role: value,
 })
 }
 />

 <CustomSelect
 placeholder="Department"
 value={formData.department}
 options={[
 "Engineering",
  "Design",
  "Marketing",
 "Human Resources",
 ]}
 onChange={(value) =>
 setFormData({
 ...formData,
 department: value,
 })
 }
 />

 <CustomSelect
 placeholder="Employment Type"
 value={formData.employmentType}
 options={[
 "Full Time",
 "Part Time",
 "Contract",
 ]}
 onChange={(value) =>
 setFormData({
 ...formData,
 employmentType: value,
 })
 }
 />

 <CustomSelect
 placeholder="Status"
 value={formData.status}
 options={[
 "Online",
 "Away",
 "Offline",
 ]}
 onChange={(value) =>
 setFormData({
 ...formData,
 status: value,
 })
 }
 />

 </div>

 </section>

 {/* Permissions */}

 <TeamPermissionSelect
 permissions={permissions}
 setPermissions={setPermissions}
 />

 </form>
 );
};

export default TeamForm;