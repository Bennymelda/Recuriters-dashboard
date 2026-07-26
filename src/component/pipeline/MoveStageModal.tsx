import { MdClose } from "react-icons/md";
import type { Candidate } from "../../types/candidate";
import { useEffect, useState } from "react";
import { useCandidateStore } from "../../store/candidateStore";
//import { useTeamStore } from "../../store/teamStore";
import CustomSelect from "../ui/CustomSelect";
interface MoveStageModalProps {
 open: boolean;
 candidate: Candidate | null;
 onClose: () => void;
}

const MoveStageModal = ({
 open,
 candidate,
 onClose,
}: MoveStageModalProps) => {

    
const moveCandidateStage = useCandidateStore(
 (state) => state.moveCandidateStage
);
//const addActivity = useTeamStore((state) => state.addActivity);
const [stage, setStage] = useState<Candidate["status"]>(candidate?.status ?? "Applied");
const stageOptions = [
 "Applied",
 "Screening",
 "Interview",
 "Offer",
 "Hired",
].filter((s) => s !== candidate?.status);
useEffect(() => {
 if (candidate) {
 setStage(candidate.status);
 }
}, [candidate]); 




 if (!open || !candidate) return null;

 return (
 <>
 {/* Overlay */}
 <div
 onClick={onClose}
 className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
 />

 {/* Modal */}
 <div className="
fixed
left-1/2
top-1/2
z-50

w-sm md:w-lg
max-w-lg

-max translate-x-1/2
-translate-y-1/2

rounded-2xl
sm:rounded-3xl

bg-white
dark:bg-zinc-900

p-5
sm:p-7

shadow-2xl

max-h-[90vh]
overflow-y-auto
"
 >

 {/* Header */}
 <div className="flex items-center justify-between">

 <div>

 <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#408A71] dark:text-[#B0E4CC]">
 Hiring Pipeline
 </p>

 <h2 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
 Move Candidate
 </h2>

 </div>

 <button
 onClick={onClose}
 className="rounded-xl p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 <MdClose
 size={22}
 className="text-zinc-700 dark:text-white"
 />
 </button>

 </div>

 {/* Candidate */}
 <div className="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
 <img
 src={
 candidate.avatar ||
 `https://ui-avatars.com/api/?name=${candidate.fullName}`
 }
 alt={candidate.fullName}
 className="h-14 w-14 md:h-16 md:w-16 rounded-full border-2 border-[#408A71] object-cover dark:border-[#B0E4CC]"
 />

 <div>

 <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 {candidate.appliedRole}
 </p>

 </div>

 </div>

 {/* Current Stage */}
 <div className="mt-8">

 <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
 Current Stage
 </label>

 <div className="mt-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
 <span className="font-medium text-[#408A71] dark:text-[#B0E4CC]">
 {candidate.status}
 </span>
 </div>

 </div>

 {/* Next Stage */}

 <div className="mt-6">

 <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
 Move To
 </label>

 {/* We'll add our custom select here later */}

 <div className="mt-2">
 <CustomSelect
 placeholder="Select stage"
 value={stage}
 options={stageOptions}
 onChange={(value) => setStage(value as Candidate ["status"])}
 />
</div>

 </div>

 {/* Footer */}

 <div className="mt-10 flex flex-col-reverse md:flex-row md:justify-end justify-end gap-3">

 <button
 onClick={onClose}
 className="rounded-2xl border border-zinc-300 px-6 py-3 font-semibold dark:border-zinc-700 dark:text-white w-full md:w-auto"
 >
 Cancel
 </button>

<button
 onClick={() => {
 if (!candidate) return;

moveCandidateStage(
 candidate.id,
 stage as Candidate["status"]
);
 onClose();
 }}
 className="
 rounded-2xl
 bg-[#408A71]
 px-6
 py-3
 
 w-full
 md:w-auto
 font-semibold
 text-white
 transition
 hover:bg-[#2f6d58]
 "
>
 Move Candidate
</button>

 </div>

 </div>
 </>
 );
};

export default MoveStageModal;