import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import type { Candidate } from "../../types/candidate";

interface MoveStageModalProps {
 open: boolean;
 candidate: Candidate;
 onClose: () => void;
 onMove: (
 candidateId: string,
 newStatus: Candidate["status"]
 ) => void;
}

const stages: Candidate["status"][] = [
 "Applied",
 "Screening",
 "Interview",
 "Offer",
 "Hired",
 "Rejected",
];

const MoveStageModal = ({
 open,
 candidate,
 onClose,
 onMove,
}: MoveStageModalProps) => {
 const [status, setStatus] = useState<Candidate["status"]>(
 candidate.status
 );

 useEffect(() => {
 setStatus(candidate.status);
 }, [candidate]);

 if (!open) return null;

 return (
 <>
 <div
 onClick={onClose}
 className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
 />

 <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-7 shadow-2xl dark:bg-zinc-900">

 <div className="mb-6 flex items-center justify-between">
 <div>
 <h2 className="text-2xl font-bold dark:text-white">
 Move Candidate
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
 Current Stage
 </label>

 <div className="rounded-xl border border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white">
 {candidate.status}
 </div>
 </div>

 <div>
 <label className="mb-2 block text-sm font-medium dark:text-white">
 New Stage
 </label>

 <select
 value={status}
 onChange={(e) =>
 setStatus(e.target.value as Candidate["status"])
 }
 className="w-full rounded-xl border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
 >
 {stages.map((stage) => (
 <option key={stage}>{stage}</option>
 ))}
 </select>
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
 onMove(candidate.id, status);
 onClose();
 }}
 className="rounded-xl bg-[#285A48] dark:bg-[#B0E4CC] px-5 py-3 font-semibold text-white"
 >
 Move Candidate
 </button>

 </div>

 </div>
 </>
 );
};

export default MoveStageModal;