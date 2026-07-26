import { useState } from "react";
import { MdClose } from "react-icons/md";
import type { Candidate } from "../../types/candidate";

interface RejectCandidateModalProps {
 open: boolean;
 candidate: Candidate;
 onClose: () => void;
 onReject: (
 candidateId: string,
 reason: string,
 note: string
 ) => void;
}

const RejectCandidateModal = ({
 open,
 candidate,
 onClose,
 onReject,
}: RejectCandidateModalProps) => {
 const [reason, setReason] = useState("");
 const [note, setNote] = useState("");

 if (!open) return null;

 return (
 <>
 {/* Overlay */}
 <div
 onClick={onClose}
 className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
 />

 {/* Modal */}
 <div className="fixed left-1/2 top-1/2 z-50 w-sm md:w-lg xl:w-xl max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-7 shadow-2xl dark:bg-zinc-900">

 <div className="mb-6 flex items-center justify-between">
 <div>
 <h2 className="text-2xl font-bold text-red-600">
 Reject Candidate
 </h2>

 <p className="mt-1 text-sm text-zinc-500">
 {candidate.fullName}
 </p>
 </div>

 <button onClick={onClose}>
 <MdClose size={24} />
 </button>
 </div>

 <div className="space-y-5">

 <div>
 <label className="mb-2 block text-sm font-medium dark:text-white">
 Reason (Optional)
 </label>

 <select
 value={reason}
 onChange={(e) => setReason(e.target.value)}
 className="w-full rounded-xl border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
 >
 <option value="">Select reason</option>
 <option>Skills mismatch</option>
 <option>Experience mismatch</option>
 <option>Culture fit</option>
 <option>Salary expectations</option>
 <option>Position filled</option>
 <option>Other</option>
 </select>
 </div>

 <div>
 <label className="mb-2 block text-sm font-medium dark:text-white">
 Recruiter Note (Optional)
 </label>

 <textarea
 rows={5}
 value={note}
 onChange={(e) => setNote(e.target.value)}
 placeholder="Add an internal note..."
 className="w-full rounded-xl border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
 />
 </div>

 </div>

 <div className="mt-8 flex justify-end gap-4">

 <button
 onClick={onClose}
 className="rounded-xl border px-5 py-3 font-semibold"
 >
 Cancel
 </button>

 <button
 onClick={() => {
 onReject(candidate.id, reason, note);
 onClose();
 }}
 className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
 >
 Reject Candidate
 </button>

 </div>

 </div>
 </>
 );
};

export default RejectCandidateModal;