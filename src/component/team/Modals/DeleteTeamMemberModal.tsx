import Modal from "../../ui/Modal";
import type { TeamMember } from "../../../types/team";
interface DeleteTeamMemberModalProps {
 open: boolean;
 onClose: () => void;
 onDelete: () => void;
 member: TeamMember;
}

const DeleteTeamMemberModal = ({
 open,
 onClose,
 onDelete,
 member,
}: DeleteTeamMemberModalProps) => {
 return (
 <Modal
 open={open}
 onClose={onClose}
 title="Remove Team Member"

 >
 <div className="space-y-6">

 <p className="text-sm text-zinc-600 dark:text-zinc-400">
 Are you sure you want to remove{" "}
 <span className="font-semibold">
 {member.fullName}
 </span>{" "}
 from your team?
 </p>

 <div className="flex justify-end gap-3">

 <button
 onClick={onClose}
 className="
 rounded-xl
 border
 border-zinc-300
 px-5
 py-2.5
 text-sm
 font-medium
 hover:bg-zinc-100
 dark:border-zinc-700
 dark:hover:bg-zinc-800
 "
 >
 Cancel
 </button>

 <button
 onClick={onDelete}
 className="
 rounded-xl
 bg-red-600
 px-5
 py-2.5
 text-sm
 font-semibold
 text-white
 hover:bg-red-700
 "
 >
 Remove Member
 </button>

 </div>

 </div>
 </Modal>
 );
};

export default DeleteTeamMemberModal;