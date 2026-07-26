import Modal from "../../../ui/Modal";
interface ClearDemoModalProps {
 open: boolean;
 onClose: () => void;
 onConfirm: () => void;
}

const ClearDemoModal = ({
 open,
 onClose,
 onConfirm,
}: ClearDemoModalProps) => {
 return (
 <Modal
 open={open}
 onClose={onClose}
 title="Clear Demo Data"
 >
 <div className="space-y-6">

 <div className="rounded-2xl bg-amber-50 p-5 dark:bg-amber-950/20">
 <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
 This will permanently remove all demo jobs, candidates,
 interviews, notifications and sample recruiter activity.
 </p>

 <p className="mt-4 font-semibold text-amber-700 dark:text-amber-300">
 Your company account will remain.
 </p>
 </div>

 <div className="flex justify-end gap-3">

 <button
 onClick={onClose}
 className="rounded-2xl border border-zinc-300 px-5 py-3 font-semibold dark:border-zinc-700"
 >
 Cancel
 </button>

 <button
 onClick={onConfirm}
 className="rounded-2xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600"
 >
 Clear Demo Data
 </button>

 </div>

 </div>
 </Modal>
 );
};

export default ClearDemoModal;