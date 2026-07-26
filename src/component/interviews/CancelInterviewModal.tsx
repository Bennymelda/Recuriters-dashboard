import Modal from "../ui/Modal";
import { MdWarningAmber } from "react-icons/md";
import { useCandidateStore } from "../../store/candidateStore";
import type { Candidate, InterviewHistoryItem } from "../../types/candidate";
import { useToastStore } from "../toast/toastStore";
import { useNotificationStore } from "../../store/notificationStore";
interface CancelInterviewModalProps {
 open: boolean;
 onClose: () => void;
 candidate: Candidate;
 interview: InterviewHistoryItem;
}

const CancelInterviewModal = ({
 open,
 onClose,
 candidate,
 interview,
}: CancelInterviewModalProps) => {
 const cancelInterview = useCandidateStore(
 (state) => state.cancelInterview
 );
 const addNotification = useNotificationStore(
 (state) => state.addNotification
);
const showToast = useToastStore((state) => state.showToast);
 const handleCancelInterview = () => {
 cancelInterview(candidate.id, interview.id);
addNotification({
 title: "Interview Cancelled",
 message: `${candidate.fullName}, your interview with ${interview.interviewerName} has been cancelled.`,
 type: "interview",
});


 showToast({
 type: "success",
 title: "Cancel Interview",
 message: `interview cancelled successfully.`,
 });
 onClose();
 };

 return (
 <Modal
 open={open}
 onClose={onClose}
 title="Cancel Scheduled Interview"
 >
 <div className="space-y-6">
 <div className="flex flex-col items-center text-center">
 <div
 className="
 flex
 h-16
 w-16
 items-center
 justify-center
 rounded-full
 bg-red-100
 dark:bg-red-500/15
 "
 >
 <MdWarningAmber
 size={34}
 className="text-red-600 dark:text-red-400"
 />
 </div>

 <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">
 Cancel this interview?
 </h3>

 <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
 This will remove the scheduled{" "}
 <span className="font-semibold">
 {interview.stage}
 </span>{" "}
 interview for{" "}
 <span className="font-semibold">
 {candidate.fullName}
 </span>
 . You can always schedule another interview later.
 </p>
 </div>

 <div className="flex flex-col md:flex-row justify-end gap-4">
 <button
 onClick={onClose}
 className="
 rounded-xl
 border
 border-zinc-300
 px-5
 py-3
 font-semibold
 transition
 hover:bg-zinc-100
 dark:border-zinc-700
 dark:text-white
 dark:hover:bg-zinc-800
 "
 >
 Keep Interview
 </button>

 <button
 onClick={handleCancelInterview}
 className="
 rounded-xl
 bg-red-600
 px-5
 py-3
 font-semibold
 text-white
 transition
 hover:bg-red-700
 "
 >
 Cancel Interview
 </button>
 </div>
 </div>
 </Modal>
 );
};

export default CancelInterviewModal;