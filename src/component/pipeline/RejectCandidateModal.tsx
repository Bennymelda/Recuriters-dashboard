import { MdClose } from "react-icons/md";

interface RejectCandidateModalProps {
 open: boolean;
 candidateName: string;
 onClose: () => void;
 onConfirm: () => void;
}

const RejectCandidateModal = ({
 open,
 candidateName,
 onClose,
 onConfirm,
}: RejectCandidateModalProps) => {
 if (!open) return null;

 return (
 <>
 {/* Overlay */}
 <div
 onClick={onClose}
 className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
 />

 {/* Modal */}
 <div className="fixed left-1/2 top-1/2 z-50 w-sm md:w-md max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-7 shadow-2xl dark:bg-zinc-900">

 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/10">
 <MdClose
 size={32}
 className="text-red-600"
 />
 </div>

 <h2 className="mt-6 text-center text-2xl font-bold text-zinc-900 dark:text-white">
 Reject Candidate?
 </h2>

 <p className="mt-3 text-center leading-7 text-zinc-500 dark:text-zinc-400">
 Are you sure you want to reject
 <span className="font-semibold text-zinc-900 dark:text-white">
 {" "}
 {candidateName}
 </span>
 ?
 </p>

 <p className="mt-2 text-center text-sm text-zinc-400">
 The candidate will be moved to the Rejected stage.
 You can still access their profile later.
 </p>

 <div className="mt-8 flex gap-4">

 <button
 onClick={onClose}
 className="flex-1 rounded-2xl border border-zinc-300 py-3 font-semibold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
 >
 Cancel
 </button>

 <button
 onClick={onConfirm}
 className="flex-1 rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
 >
 Reject Candidate
 </button>

 </div>

 </div>
 </>
 );
};

export default RejectCandidateModal;