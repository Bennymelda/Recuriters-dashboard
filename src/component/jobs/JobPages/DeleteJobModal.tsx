import { MdClose, MdDeleteOutline, MdWarningAmber } from "react-icons/md";

interface DeleteModalProps {
 isOpen: boolean;
 title: string;
 message: string;
 loading?: boolean;
 onClose: () => void;
 onConfirm: () => void;
}

const DeleteModal = ({
 isOpen,
 title,
 message,
 loading = false,
 onClose,
 onConfirm,
}: DeleteModalProps) => {
 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-3 md:p-4 backdrop-blur-sm">
 <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
 {/* Close Button */}
 <button
 onClick={onClose}
 disabled={loading}
 className="absolute right-4 top-4 rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
 >
 <MdClose size={20} />
 </button>

 {/* Content */}
 <div className="flex flex-col items-center px-5 py-6 md:px-8 md:py-8 text-center">
 {/* Icon */}
 <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
 <MdWarningAmber className="text-3xl md:text-4xl text-red-600" />
 </div>

 {/* Title */}
 <h2 className="mt-5 text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
 {title}
 </h2>

 {/* Message */}
 <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
 {message}
 </p>

 {/* Actions */}
 <div className="mt-8 flex  flex-col md:flex-row w-full  gap-3">
 <button
 onClick={onClose}
 disabled={loading}
 className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
 >
 Cancel
 </button>

 <button
 
 onClick={onConfirm}
 disabled={loading}
 className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
 >
 <MdDeleteOutline size={20} />
 {loading ? "Deleting..." : "Delete"}
 </button>
 </div>
 </div>
 </div>
 </div>
 );
};

export default DeleteModal;