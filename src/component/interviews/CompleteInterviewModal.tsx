import { useState } from "react";
import { MdClose } from "react-icons/md";
import type { Candidate } from "../../types/candidate";
import { useCandidateStore } from "../../store/candidateStore";
import { useTeamStore } from "../../store/teamStore";
import { useNotificationStore } from "../../store/notificationStore";
import { useAuthStore } from "../../store/authStore";
interface CompleteInterviewModalProps {
 open: boolean;
 onClose: () => void;

 candidate: Candidate;

 interview: Candidate["interviewHistory"][number];

 outcome: "Passed" | "Failed";
}

const CompleteInterviewModal = ({
 open,
 onClose,
 candidate,
 interview,
 outcome,
}: CompleteInterviewModalProps) => {
 const [feedback, setFeedback] = useState("");
 const completeInterview = useCandidateStore(
 (state) => state.completeInterview
 );
const updateMember = useTeamStore((state) => state.updateMember);
const addNotification = useNotificationStore(
 (state) => state.addNotification
);
const members = useTeamStore((state) => state.members);
const addActivity = useTeamStore(
 (state) => state.addActivity
);
const user = useAuthStore((state) => state.user);
const interviewer = members.find(
 (member) => member.id === interview.interviewerId
);


 if (!open) return null;

 const handleCompleteInterview = () => {
 completeInterview(
 candidate.id,
 interview.id,
 outcome,
 feedback
 );

  addActivity(interview.interviewerId, {
    action: `Completed ${interview.stage} interview`,
    target: candidate.fullName,
    recruiterName: user?.fullName ?? "Unknown",
  });
 
addNotification({
 title: "Interview Scheduled",
 message: `${candidate.fullName}, you have an interview with ${interview.interviewerName} scheduled for ${interview.date}.`,
 type: "interview",
});


if (interviewer) {
 updateMember({
 ...interviewer,
 lastActive: new Date().toISOString(),
 });
 }
 onClose();
};

 return (
 <>
 {/* Overlay */}
 <div
 onClick={onClose}
 className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
 />

 {/* Modal */}
 <div className="fixed left-1/2 top-1/2 z-50 w-sm md:w-lg  max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-7 shadow-2xl dark:bg-zinc-900">

 {/* Header */}
 <div className="mb-6 flex items-center justify-between">
 <div>
 <h2 className="text-2xl font-bold dark:text-white">
 Complete Interview
 </h2>

 <p className="mt-1 text-sm text-zinc-500">
 {candidate.fullName}
 </p>
 </div>

 <button onClick={onClose}>
 <MdClose size={24} />
 </button>
 </div>

 {/* Interview Stage */}
 <div className="mb-5">
 <label className="mb-2 block text-sm font-medium dark:text-white">
 Interview Stage
 </label>

 <div className="rounded-xl border border-zinc-300 bg-zinc-50 p-3 text-sm font-medium dark:border-zinc-700 dark:bg-zinc-800 dark:text-white">
 {interview.stage}
 </div>
 </div>

 {/* Outcome */}
 <div className="mb-5">
 <label className="mb-2 block text-sm font-medium dark:text-white">
 Outcome
 </label>

 <div
 className={`flex items-center justify-center rounded-xl border p-3 text-sm font-semibold ${
 outcome === "Passed"
 ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
 : "border-red-300 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
 }`}
 >
 {outcome}
 </div>
 </div>

 {/* Feedback */}
 <div>
 <label className="mb-2 block text-sm font-medium dark:text-white">
 Interview Feedback
 </label>

 <textarea
 rows={5}
 value={feedback}
 onChange={(e) => setFeedback(e.target.value)}
 placeholder="Summarize how the interview went..."
 className="w-full rounded-xl border border-zinc-300 p-3 outline-none transition focus:border-[#408A71] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
 />
 </div>

 {/* Footer */}
 <div className="mt-8 flex justify-end gap-4">
 <button
 onClick={onClose}
 className="rounded-xl border px-5 py-3 font-semibold dark:border-zinc-700 dark:text-white"
 >
 Cancel
 </button>

 <button
 onClick={handleCompleteInterview}
 className="rounded-xl bg-[#408A71] px-5 py-3 font-semibold text-white transition hover:bg-[#367760]"
 >
 Complete Interview
 </button>
 </div>
 </div>
 </>
);


};

export default CompleteInterviewModal;