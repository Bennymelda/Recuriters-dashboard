import { useState } from "react";
import Modal from "../../ui/Modal";
import type { TeamFormData } from "../TeamForm/TeamForm";
import TeamForm from "../TeamForm/TeamForm";
import TeamFormFooter from "../TeamForm/TeamFormFooter";
import { useTeamStore } from "../../../store/teamStore";
import type { TeamMember } from "../../../types/team";
import { useToastStore } from "../../toast/toastStore";
import { useAuthStore } from "../../../store/authStore";
import { useNotificationStore } from "../../../store/notificationStore";
interface AddTeamMemberModalProps {
 open: boolean;
 onClose: () => void;
}

const AddTeamMemberModal = ({
 open,
 onClose,
}: AddTeamMemberModalProps) => {
    const addNotification = useNotificationStore(
 (state) => state.addNotification
);


const addMember = useTeamStore((state) => state.addMember);
const showToast = useToastStore((state) => state.showToast);
const user = useAuthStore((state) => state.user);
const handleAddMember = () => {
if (
 !formData.fullName.trim() ||
 !formData.email.trim() ||
 !formData.department.trim() ||
 !formData.role.trim()
) {
 showToast({
 type: "error",
 title: "Missing Information",
 message: "Please fill all required fields before adding a team member.",
 });

 return;
}
if(!user) return
 const newMember: TeamMember = {
 id: crypto.randomUUID(),

 fullName: formData.fullName,
 email: formData.email,
 phone: formData.phone,

 avatar: preview ?? undefined,

 department: formData.department,

 role: formData.role as TeamMember["role"],

 status: formData.status as TeamMember["status"],

 assignedJobs: [],

 assignedJobIds: [],
 interviewsThisWeek: 0,
 hires: 0,
 averageHiringDays: 0,

 successfulHires: 0,
 performanceScore: 100,



recentActivity: [
 {
 id: crypto.randomUUID(),
 action: "Created team member",
 recruiterName:user.fullName,
 target: `${formData.fullName}${formData.role ? ` - ${formData.role}` : ""}`,
 date: new Date().toISOString(),

 },
],

 lastActive: new Date().toISOString(),

 joinedAt: formData.joinedAt,

 createdAt: new Date().toISOString(),
 };

 addMember(newMember);

 addNotification({
 title: "Team Member Added",
 message: `${newMember.fullName} has been added to your team.`,
 type: "team",
});
showToast({
 type: "success",
 title: "Team Member",
 message: 'Team member created successfully.',
});
 setFormData({
 fullName: "",
 email: "",
 phone: "",
 joinedAt: "",
 role: "",
 department: "",
 employmentType: "",
 status: "Online",
 });

 setPermissions([]);
 setImage(null);
 setPreview(null);

 onClose();
};




    const [image, setImage] = useState<File | null>(null);
const [permissions, setPermissions] = useState<string[]>([]);
const [preview, setPreview] = useState<string | null>(null);
const [formData, setFormData] = useState<TeamFormData>({
 fullName: "",
 email: "",
 phone: "",
 joinedAt: "",
 role: "",
 department: "",
 employmentType: "",
 status: "Online",
});


 return (
 <Modal
 open={open}
 onClose={onClose}
 title="Add Team Member"
 
 >
 <div className="space-y-8">

 <TeamForm
formData={formData}
 setFormData={setFormData}
 image={image}
 setImage={setImage}
 preview={preview}
 setPreview={setPreview}
 permissions={permissions}
 setPermissions={setPermissions}
/>

 <TeamFormFooter
 submitLabel="Add Member"
 onCancel={onClose}
 onSubmit={handleAddMember}
 />

 </div>
 </Modal>
 );
};

export default AddTeamMemberModal;