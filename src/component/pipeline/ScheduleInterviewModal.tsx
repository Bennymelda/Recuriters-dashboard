import { useState } from "react";
import { MdClose } from "react-icons/md";
import type { Candidate, InterviewStage } from "../../types/candidate";
import { useCandidateStore } from "../../store/candidateStore";
import { useTeamStore } from "../../store/teamStore";
import { useAuthStore } from "../../store/authStore";
import { useNotificationStore } from "../../store/notificationStore";
import { useToastStore } from "../toast/toastStore";
interface InterviewModalProps {
 open: boolean;
 onClose: () => void;

 candidate: Candidate;

 mode: "schedule" | "reschedule";

 interview?: Candidate["interviewHistory"][number];
}

const InterviewModal = ({
 open,
 candidate,
 onClose,
 mode,
 interview,
}: InterviewModalProps) => {
const members = useTeamStore((state) => state.members);
console.log(members)
const [stage, setStage] = useState<InterviewStage>(
 interview?.stage ?? "Technical"
);
const showToast = useToastStore((state) => state.showToast);
const [interviewerId, setInterviewerId] = useState(
 interview?.interviewerId ?? ""
);
const updateMember = useTeamStore((state) => state.updateMember);
const [date, setDate] = useState(() => {
 if (!interview) return "";

 return interview.date.split("T")[0];
});

const [time, setTime] = useState(() => {
 if (!interview) return "";

 return interview.date.split("T")[1]?.slice(0, 5) ?? "";
});

const [notes, setNotes] = useState(
 interview?.note ?? ""
);

const scheduleInterview = useCandidateStore(
 (state) => state.scheduleInterview
);

const addNotification = useNotificationStore(
 (state) => state.addNotification
);

const rescheduleInterview = useCandidateStore(
 (state) => state.rescheduleInterview
);


const addActivity = useTeamStore(
 (state) => state.addActivity
);
const user = useAuthStore((state) => state.user);
const handleSubmit = () => {
 if (!stage.trim()) {
 showToast({
 type: "warning",
 title: "Interview stage required",
 message: "Please select an interview stage.",
 });
 return;
 }

 if (!interviewerId.trim()) {
 showToast({
 type: "warning",
 title: "Interviewer required",
 message: "Please select an interviewer.",
 });
 return;
 }

 if (!date) {
 showToast({
 type: "warning",
 title: "Interview date required",
 message: "Please select an interview date.",
 });
 return;
 }

 if (!time) {
 showToast({
 type: "warning",
 title: "Interview time required",
 message: "Please select an interview time.",
 });
 return;
 }

 const selectedMember = members.find(
 (member) => member.id === interviewerId
 );

 

 if (!selectedMember) {
 showToast({
 type: "warning",
 title: "Invalid interviewer",
 message: "Please select a valid interviewer.",
 });
 return;
 }
const interviewDate = new Date(`${date}T${time}`);
const now = new Date();

if (interviewDate <= now) {
 showToast({
 type: "warning",
 title: "Invalid interview time",
 message: "Please select a future date and time.",
 });

 return;
}

 const interviewData = {
 stage: stage as
 | "Screening"
 | "Technical"
 | "HR"
 | "Final",

 interviewerId: selectedMember.id,

 interviewerName: selectedMember.fullName,

 date: new Date(`${date}T${time}`).toISOString(),

 note: notes,
 };

  if (mode === "schedule") {
    scheduleInterview(candidate.id, interviewData);
    addActivity(selectedMember.id, {
      id: crypto.randomUUID(),
      action: "Scheduled an interview",
      recruiterName: user?.fullName ?? "Unknown",
      target: candidate.fullName,
      date: new Date().toISOString(),
    });
   
   addNotification({
 title: "Interview Scheduled",
 message: `${candidate.fullName}, you have an interview with ${selectedMember.fullName} on ${new Date(`${date}T${time}`).toLocaleString()}.`,


 type: "interview",
});
    updateMember({
      ...selectedMember,
      lastActive: new Date().toISOString(),
    });

    showToast({
      type: "success",
      title: "Interview Scheduled",
      message: `${candidate.fullName}'s interview has been scheduled successfully.`,
    });
  } else if (interview) {
    rescheduleInterview(
      candidate.id,
      interview.id,
      interviewData
    );
    addActivity(selectedMember.id, {
      id: crypto.randomUUID(),
      action: "Rescheduled an interview",
      recruiterName: user?.fullName ?? "Unknown",
      target: candidate.fullName,
      date: new Date().toISOString(),
    });
    updateMember({
      ...selectedMember,
      lastActive: new Date().toISOString(),
    });
    showToast({
      type: "success",
      title: "Interview Rescheduled",
      message: `${candidate.fullName}'s interview has been updated successfully.`,
    });
  }

 onClose();
};


 if (!open) return null;

 return (
 <>
 {/* Overlay */}
 <div
 onClick={onClose}
 className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
 />

 {/* Modal */}
 <div className="fixed left-1/2 top-1/2 z-50 w-sm md:w-lg max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-7 shadow-2xl dark:bg-zinc-900">

 <div className="mb-6 flex items-center justify-between">
 <div>
 <h2 className="text-2xl font-bold dark:text-white">
 {mode === "schedule"
 ? "Schedule Interview"
 : "Reschedule Interview"}
 </h2>

 <p className="mt-1 text-sm text-zinc-500">
 {candidate.fullName}
 </p>
 </div>

 <button onClick={onClose}>
 <MdClose size={24} />
 </button>
 </div>

 {/* Stage */}

 <div className="space-y-5">

 <div>
 <label className="mb-2 block text-sm font-medium dark:text-white">
 Interview Stage
 </label>

 <select
 value={stage}
 onChange={(e) =>
 setStage(e.target.value as InterviewStage)
}
 className="w-full rounded-xl border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
 >
 <option>Screening</option>
 <option>Technical</option>
 <option>HR</option>
 <option>Final</option>
 </select>
 </div>

 <div>
 <label className="mb-2 block text-sm font-medium dark:text-white">
 Interviewer
 </label>

<select
 value={interviewerId}
 onChange={(e) => setInterviewerId(e.target.value)}
 className="w-full rounded-xl border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
>
 <option value="">Select Interviewer</option>

 {members.map((member) => (
 <option
 key={member.id}
 value={member.id}
 >
 {member.fullName}
 </option>
 ))}
</select>
 </div>

 <div className="grid grid-cols-2 gap-4">

 <div>
 <label className="mb-2 block text-sm font-medium dark:text-white">
 Date
 </label>

 <input
 type="date"
 value={date}
  min={new Date().toISOString().split("T")[0]}
 onChange={(e) => setDate(e.target.value)}
 className="w-full rounded-xl border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
 />
 </div>

 <div>
 <label className="mb-2 block text-sm font-medium dark:text-white">
 Time
 </label>

 <input
 type="time"
 value={time}
 onChange={(e) => setTime(e.target.value)}
 className="w-full rounded-xl border border-zinc-300 p-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
 />
 </div>

 </div>

 <div>
 <label className="mb-2 block text-sm font-medium dark:text-white">
 Notes
 </label>

 <textarea
 rows={4}
 value={notes}
 onChange={(e) => setNotes(e.target.value)}
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
 onClick={handleSubmit}
 className="rounded-xl bg-[#408A71] px-5 py-3 font-semibold text-white"
>
 {mode === "schedule"
 ? "Schedule Interview"
 : "Save Changes"}
</button>

 </div>

 </div>
 </>
 );
};

export default InterviewModal;