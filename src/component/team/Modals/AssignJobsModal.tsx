import { useState } from "react";
import Modal from "../../ui/Modal";
import { useAuthStore } from "../../../store/authStore";
import { useJobStore } from "../../../store/jobStore";
import type { TeamMember } from "../../../types/team";
import { useTeamStore } from "../../../store/teamStore";
import { useToastStore } from "../../toast/toastStore";
import { useNotificationStore } from "../../../store/notificationStore";
interface AssignJobsModalProps {
 open: boolean;
 onClose: () => void;
 member: TeamMember;
}

const AssignJobsModal = ({
 open,
 onClose,
 member,
}: AssignJobsModalProps) => {
    /*
 const jobs = useJobStore((state) => state.getActiveJobs()) ?? [];
*/
const addNotification = useNotificationStore(
 (state) => state.addNotification
);
const user = useAuthStore((state) => state.user);
const jobs = useJobStore((state) => state.jobs);
const addActivity = useTeamStore(
 (state) => state.addActivity
);
const activeJobs = jobs.filter(
 (job) => job.status === "Active"
);
 const initialSelectedJobs = Array.isArray(member.assignedJobIds)
 ? member.assignedJobIds
 : Array.isArray(member.assignedJobs)
 ? member.assignedJobs
 : [];
 const [selectedJobs, setSelectedJobs] = useState<string[]>(initialSelectedJobs);
const showToast = useToastStore((state) => state.showToast);

 const toggleJob = (jobId: string) => {
 setSelectedJobs((prev) =>
 prev.includes(jobId)
 ? prev.filter((id) => id !== jobId)
 : [...prev, jobId]
 );

 
 };
const updateMember = useTeamStore((state) => state.updateMember);

const handleAssignJobs = () => {
 const normalizedSelectedJobs = selectedJobs
 .map((jobId) => jobId.trim())
 .filter(Boolean);

 try {
 const updatedMember: TeamMember = {
 ...member,
 assignedJobIds: normalizedSelectedJobs,
 assignedJobs: normalizedSelectedJobs,
 lastActive: new Date().toISOString(),
 };

 updateMember(updatedMember);




   const newlyAssignedJobs = normalizedSelectedJobs.filter(
     (jobId) => !initialSelectedJobs.includes(jobId)
   );

   const removedJobs = initialSelectedJobs.filter(
     (jobId) => !normalizedSelectedJobs.includes(jobId)
   );

   newlyAssignedJobs.forEach((jobId) => {
     const assignedJob = jobs.find((job) => job.id === jobId);

     if (assignedJob) {

       addActivity(member.id, {
         id: crypto.randomUUID(),
         action: "Assigned a job",
         target: assignedJob.title,
         secondaryTarget: member.fullName,
         recruiterName: user?.fullName ?? "Unknown",
         date: new Date().toISOString(),
         category: "job",
       });

addNotification({
 title: "Job Assigned",
 message: `${member.fullName} have been assigned to manage the ${assignedJob.title} position.`,
 type: "job",
});
console.log("Newly assigned jobs:", newlyAssignedJobs);



     }
   
 


   });

   removedJobs.forEach((jobId) => {
     const removedJob = jobs.find((job) => job.id === jobId);

     if (removedJob) {
       addActivity(member.id, {
         id: crypto.randomUUID(),
         action: "Removed a job assignment",
         target: removedJob.title,
         recruiterName: user?.fullName ?? "Unknown",
         secondaryTarget: member.fullName,
         date: new Date().toISOString(),
         category: "job",
       });
     }
   });

 } catch (err) {
 console.error("Failed to assign jobs to member:", err);
 }


 showToast({
 type: "success",
 title: "Job assignment",
 message: "Job assigned successfully.",
 });

 onClose();
};

 return (
 <Modal
 open={open}
 onClose={onClose}
 title={`Assign Jobs to ${member.fullName}`}

 >
 <div className="space-y-6">

 <div className="space-y-3 max-h-104 overflow-y-auto">

 {activeJobs.map((job) => (
 <label
 key={job.id}
 className="
 flex
 cursor-pointer
 items-center
 justify-between
 rounded-2xl
 border
 border-zinc-200
 p-4
 transition
 hover:border-[#408A71]
 dark:border-zinc-700
 "
 >
 <div>

 <h4 className="font-semibold text-zinc-900 dark:text-white">
 {job.title}
 </h4>

 <p className="mt-1 text-sm text-zinc-500">
 {job.department}
 </p>

 </div>

 <input
 type="checkbox"
 checked={selectedJobs.includes(job.id)}
 onChange={() => toggleJob(job.id)}
 className="h-5 w-5 accent-[#408A71]"
 />
 </label>
 ))}

 </div>

 <div className="flex items-center justify-between border-t border-zinc-200 pt-5 dark:border-zinc-700">

 <p className="text-sm text-zinc-500">
 {selectedJobs.length} job(s) selected
 </p>

 <div className="flex gap-3">

 <button
 onClick={onClose}
 className="
 rounded-xl
 border
 border-zinc-300
 px-5
 py-2.5
 text-sm
 hover:bg-zinc-100
 dark:border-zinc-700
 dark:hover:bg-zinc-800
 "
 >
 Cancel
 </button>

 <button
 onClick={handleAssignJobs}
 className="
 rounded-xl
 bg-[#408A71]
 px-5
 py-2.5
 text-sm
 font-semibold
 text-white
 hover:bg-[#35745E]
 "
 >
 Assign Jobs
 </button>

 </div>

 </div>

 </div>
 </Modal>
 );
};

export default AssignJobsModal;