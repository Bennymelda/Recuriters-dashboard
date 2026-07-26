import { useState } from "react";
import Modal from "../../ui/Modal";

interface DeleteWorkspaceModalProps {
 open: boolean;
 onClose: () => void;
 companyName: string;
 onConfirm: () => void;
}

const DeleteWorkspaceModal = ({
 open,
 onClose,
 companyName,
 onConfirm,
}: DeleteWorkspaceModalProps) => {
 const [confirmation, setConfirmation] = useState("");

 const canDelete =
 confirmation.trim() === companyName.trim();

 return (
 <Modal
 open={open}
 onClose={onClose}
 title="Delete Workspace"
 >
 <div className="space-y-6">

 <div className="rounded-2xl bg-red-50 p-5 dark:bg-red-950/20">
 <p className="font-semibold text-red-700 dark:text-red-300">
 This action cannot be undone.
 </p>

 <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
 This will permanently delete your company,
 recruiters, candidates, interviews, jobs,
 notifications and every piece of data in this
 workspace.
 </p>
 </div>

 <div>

 <label className="mb-2 block text-sm font-medium">
 Type
 <span className="font-bold">
 {" "}
 {companyName}
 </span>{" "}
 to confirm
 </label>

 <input
 value={confirmation}
 onChange={(e) =>
 setConfirmation(e.target.value)
 }
 className="
 w-full
 rounded-2xl
 border
 border-zinc-300
 px-4
 py-3

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 />

 </div>

 <div className="flex justify-end gap-3">

 <button
 onClick={onClose}
 className="rounded-2xl border px-5 py-3"
 >
 Cancel
 </button>

 <button
 disabled={!canDelete}
 onClick={onConfirm}
 className="
 rounded-2xl
 bg-red-600
 px-5
 py-3
 font-semibold
 text-white

 disabled:cursor-not-allowed
 disabled:opacity-40
 "
 >
 Delete Workspace
 </button>

 </div>

 </div>
 </Modal>
 );
};

export default DeleteWorkspaceModal;