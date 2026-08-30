

/*
import { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import TeamForm from "../TeamForm/TeamForm";
import type { TeamFormData } from "../TeamForm/TeamForm";
import TeamFormFooter from "../TeamForm/TeamFormFooter";
import { useTeamStore } from "../../../store/teamStore";
import type { TeamMember } from "../../../types/team";
import { useToastStore } from "../../toast/toastStore";
import { useNotificationStore } from "../../../store/notificationStore";
interface EditTeamMemberModalProps {
 open: boolean;
 onClose: () => void;
 member: TeamMember;
}


const EditTeamMemberModal = ({
 open,
 onClose,
 member
}: EditTeamMemberModalProps) => {

  const addNotification = useNotificationStore(
 (state) => state.addNotification
);  
const updateMember = useTeamStore((state) => state.updateMember);
const showToast = useToastStore((state) => state.showToast);
const [image, setImage] = useState<File | null>(null);
const [permissions, setPermissions] = useState<string[]>([]);
const [preview, setPreview] = useState<string | null>(null);
const [formData, setFormData] = useState<TeamFormData>({
 fullName: member.fullName,
 email: member.email,
 phone: member.phone,
 joinedAt: member.joinedAt ?? "",
 role: member.role,
 department: member.department,
 employmentType: "Full Time",
 status: member.status,
});

useEffect(() => {
 setFormData({
 fullName: member.fullName,
 email: member.email,
 phone: member.phone,
 joinedAt: member.joinedAt ?? "",
 role: member.role,
 department: member.department,
 employmentType: "Full Time",
 status: member.status,
 });

 setPreview(member.avatar ?? null);
}, [member]);
const handleUpdateMember = () => {
 const updatedMember: TeamMember = {
 ...member,

 fullName: formData.fullName,
 email: formData.email,
 phone: formData.phone,

 avatar: preview ?? member.avatar,

 department: formData.department,

 role: formData.role as TeamMember["role"],

 status: formData.status as TeamMember["status"],

 joinedAt: formData.joinedAt,
 assignedJobIds: member.assignedJobIds,
 };

 updateMember(updatedMember);

if (member.role !== updatedMember.role) {
 addNotification({
 title: "Role Changed",
 message: `${member.fullName}'s role was changed to ${updatedMember.role}.`,
 type: "team",
 });
}

showToast({
 type: "success",
 title: "Team Edit",
 message: "Team member has been updated successfully.",
});
 onClose();
};

 return (
 <Modal
 open={open}
 onClose={onClose}
 title="Edit Team Member"

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
 submitLabel="Save Changes"
 onCancel={onClose}
 onSubmit={handleUpdateMember}
 />

 </div>
 </Modal>
 );
};

export default EditTeamMemberModal;
*/
import { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import TeamForm from "../TeamForm/TeamForm";
import type { TeamFormData } from "../TeamForm/TeamForm";
import TeamFormFooter from "../TeamForm/TeamFormFooter";
import { useTeamStore } from "../../../store/teamStore";
import type { TeamMember } from "../../../types/team";
import { useToastStore } from "../../toast/toastStore";
import { useNotificationStore } from "../../../store/notificationStore";

interface EditTeamMemberModalProps {
 open: boolean;
 onClose: () => void;
 member: TeamMember;
}

const EditTeamMemberModal = ({
 open,
 onClose,
 member,
}: EditTeamMemberModalProps) => {
 const updateMember = useTeamStore(
 (state) => state.updateMember
 );

 const addNotification = useNotificationStore(
 (state) => state.addNotification
 );

 const showToast = useToastStore(
 (state) => state.showToast
 );

 const [image, setImage] = useState<File | null>(null);

 const [preview, setPreview] = useState<string | null>(
 member.avatar ?? null
 );

 const [formData, setFormData] = useState<TeamFormData>({
 fullName: member.fullName,
 email: member.email,
 phone: member.phone ?? "",
 role: member.role,
 department: member.department,
 });

 /*
 * Reset the form whenever
 * the selected member changes.
 */
 useEffect(() => {
 setFormData({
 fullName: member.fullName,
 email: member.email,
 phone: member.phone ?? "",
 role: member.role,
 department: member.department,
 });

 setPreview(member.avatar ?? null);
 setImage(null);
 }, [member]);

 /*
 * Save changes
 */
 const handleUpdateMember = () => {
 const fullName = formData.fullName.trim();
 const phone = formData.phone.trim();

 /*
 * Basic validation
 */
 if (!fullName) {
 showToast({
 type: "error",
 title: "Invalid Name",
 message: "Please enter the team member's full name.",
 });

 return;
 }

 if (!formData.role) {
 showToast({
 type: "error",
 title: "Role Required",
 message: "Please select a role for this team member.",
 });

 return;
 }

 const updatedMember: TeamMember = {
 ...member,

 /*
 * Profile information
 */
 fullName,

 // Email cannot be changed from Team Edit.
 email: member.email,

 phone,

 avatar: preview ?? member.avatar,

 /*
 * Organization information
 */
 role: formData.role,

 department: formData.department,
 };

 updateMember(updatedMember);

 /*
 * Notify when the role changes.
 */
 if (member.role !== updatedMember.role) {
 addNotification({
 title: "Role Changed",
 message: `${member.fullName}'s role was changed to ${updatedMember.role}.`,
 type: "team",
 });
 }

 /*
 * Success feedback
 */
 showToast({
 type: "success",
 title: "Team Member Updated",
 message: `${updatedMember.fullName} has been updated successfully.`,
 });

 onClose();
 };

 return (
 <Modal
 open={open}
 onClose={onClose}
 title="Edit Team Member"
 >
 <div className="space-y-8">
 <TeamForm
 formData={formData}
 setFormData={setFormData}
 image={image}
 setImage={setImage}
 preview={preview}
 setPreview={setPreview}
 />

 <TeamFormFooter
 submitLabel="Save Changes"
 onCancel={onClose}
 onSubmit={handleUpdateMember}
 />
 </div>
 </Modal>
 );
};

export default EditTeamMemberModal;