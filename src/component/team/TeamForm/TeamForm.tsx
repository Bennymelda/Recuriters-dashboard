import Input from "../../ui/Input";
import CustomSelect from "../../ui/CustomSelect";
import TeamAvatarUpload from "./TeamAvvatarUpload";
import type { TeamRole, TeamDepartment } from "../../../types/team";

export interface TeamFormData {
 fullName: string;
 email: string;
 phone: string;
 role: TeamRole | "";
 department: TeamDepartment;
}

interface TeamFormProps {
 formData: TeamFormData;
 setFormData: React.Dispatch<
 React.SetStateAction<TeamFormData>
 >;

 image: File | null;
 preview: string | null;
 setImage: (file: File | null) => void;
 setPreview: (preview: string | null) => void;
}

const TeamForm = ({
 formData,
 setFormData,
 image,
 preview,
 setImage,
 setPreview,
}: TeamFormProps) => {
 return (
 <form className="space-y-8">
 {/* -------------------------------- */}
 {/* Avatar */}
 {/* -------------------------------- */}

 <TeamAvatarUpload
 image={image}
 preview={preview}
 setImage={setImage}
 setPreview={setPreview}
 />

 {/* -------------------------------- */}
 {/* Basic Information */}
 {/* -------------------------------- */}

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
 setFormData((prev) => ({
 ...prev,
 fullName: e.target.value,
 }))
 }
 className="border border-gray-200 bg-white dark:bg-zinc-900"
 />

 <Input
 label="Email Address"
 type="email"
 placeholder="john@example.com"
 value={formData.email}
 onChange={(e) =>
 setFormData((prev) => ({
 ...prev,
 email: e.target.value,
 }))
 }
 className="border border-gray-200 bg-white dark:bg-zinc-900"
 />

 <Input
 label="Phone Number"
 placeholder="+234..."
 value={formData.phone}
 onChange={(e) =>
 setFormData((prev) => ({
 ...prev,
 phone: e.target.value,
 }))
 }
 className="border border-gray-200 bg-white dark:bg-zinc-900"
 />
 </div>
 </section>

 {/* -------------------------------- */}
 {/* Work Information */}
 {/* -------------------------------- */}

 <section>
 <h3 className="mb-5 text-lg font-semibold text-zinc-900 dark:text-white">
 Work Information
 </h3>

 <div className="grid gap-5 md:grid-cols-2">
 <CustomSelect
 placeholder="Select Role"
 value={formData.role}
 options={[
 "Admin",
 "Recruiter",
 "Hiring Manager",
 "HR Manager",
 ]}
 onChange={(value) =>
 setFormData((prev) => ({
 ...prev,
 role: value as TeamRole,
 }))
 }
 />

 <CustomSelect
 placeholder="Select Department"
 value={formData.department}
 options={[
 "Engineering",
 "Design",
 "Marketing",
 "Human Resources",
 "Product",
 "Sales",
 "Operations",
 ]}
 onChange={(value) =>
 setFormData((prev) => ({
 ...prev,
 department: value as TeamDepartment,
 }))
 }
 />
 </div>
 </section>
 </form>
 );
};

export default TeamForm;