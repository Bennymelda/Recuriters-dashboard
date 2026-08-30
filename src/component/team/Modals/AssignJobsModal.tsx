import { useEffect, useState } from "react";
import Modal from "../../ui/Modal";

import { useAuthStore } from "../../../store/authStore";
import { useJobStore } from "../../../store/jobStore";
import { useTeamStore } from "../../../store/teamStore";

import type { TeamMember } from "../../../types/team";

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
 // ---------------------------------------------
 // Stores
 // ---------------------------------------------

 const user = useAuthStore((state) => state.user);

 const jobs = useJobStore(
 (state) => state.jobs
 );

 const updateMember = useTeamStore(
 (state) => state.updateMember
 );

 const addActivity = useTeamStore(
 (state) => state.addActivity
 );

 const addNotification = useNotificationStore(
 (state) => state.addNotification
 );

 const showToast = useToastStore(
 (state) => state.showToast
 );

 // ---------------------------------------------
 // Active jobs
 // ---------------------------------------------

 const activeJobs = jobs.filter(
 (job) => job.status === "Active"
 );

 // ---------------------------------------------
 // Selected jobs
 // ---------------------------------------------

 const [selectedJobs, setSelectedJobs] =
 useState<string[]>(
 Array.isArray(member.assignedJobIds)
 ? member.assignedJobIds
 : []
 );

 // ---------------------------------------------
 // Reset selected jobs when member changes
 // ---------------------------------------------

 useEffect(() => {
 setSelectedJobs(
 Array.isArray(member.assignedJobIds)
 ? member.assignedJobIds
 : []
 );
 }, [member]);

 // ---------------------------------------------
 // Toggle job
 // ---------------------------------------------

 const toggleJob = (jobId: string) => {
 setSelectedJobs((previous) =>
 previous.includes(jobId)
 ? previous.filter(
 (id) => id !== jobId
 )
 : [...previous, jobId]
 );
 };

 // ---------------------------------------------
 // Assign jobs
 // ---------------------------------------------

 const handleAssignJobs = () => {
 const normalizedSelectedJobs = [
 ...new Set(
 selectedJobs
 .map((jobId) => jobId.trim())
 .filter(Boolean)
 ),
 ];

 const previousAssignedJobs =
 Array.isArray(member.assignedJobIds)
 ? member.assignedJobIds
 : [];

 // -------------------------------------------
 // Find newly assigned jobs
 // -------------------------------------------

 const newlyAssignedJobs =
 normalizedSelectedJobs.filter(
 (jobId) =>
 !previousAssignedJobs.includes(jobId)
 );

 // -------------------------------------------
 // Find removed jobs
 // -------------------------------------------

 const removedJobs =
 previousAssignedJobs.filter(
 (jobId) =>
 !normalizedSelectedJobs.includes(jobId)
 );

 // -------------------------------------------
 // Update member
 // -------------------------------------------

 const updatedMember: TeamMember = {
 ...member,

 assignedJobIds:
 normalizedSelectedJobs,
 };

 updateMember(updatedMember);

 // -------------------------------------------
 // Activity + notification
 // -------------------------------------------

 newlyAssignedJobs.forEach((jobId) => {
 const assignedJob = jobs.find(
 (job) => job.id === jobId
 );

 if (!assignedJob) return;

 addActivity(member.id, {
 id: crypto.randomUUID(),

 action: "Assigned a job",

 target: assignedJob.title,

 secondaryTarget:
 member.fullName,

 recruiterName:
 user?.fullName ?? "Unknown",

 date: new Date().toISOString(),

 category: "job",
 });

 addNotification({
 title: "Job Assigned",

 message: `${member.fullName} has been assigned to manage the ${assignedJob.title} position.`,

 type: "job",
 });
 });

 // -------------------------------------------
 // Removed job activity
 // -------------------------------------------

 removedJobs.forEach((jobId) => {
 const removedJob = jobs.find(
 (job) => job.id === jobId
 );

 if (!removedJob) return;

 addActivity(member.id, {
 id: crypto.randomUUID(),

 action: "Removed a job assignment",

 target: removedJob.title,

 secondaryTarget:
 member.fullName,

 recruiterName:
 user?.fullName ?? "Unknown",

 date: new Date().toISOString(),

 category: "job",
 });
 });

 // -------------------------------------------
 // Success feedback
 // -------------------------------------------

 showToast({
 type: "success",

 title: "Job Assignments Updated",

 message: `${member.fullName}'s job assignments have been updated successfully.`,
 });

 onClose();
 };

 // ---------------------------------------------
 // Render
 // ---------------------------------------------

 return (
 <Modal
 open={open}
 onClose={onClose}
 title={`Assign Jobs to ${member.fullName}`}
 >
 <div className="space-y-6">

 {/* --------------------------------------- */}
 {/* Job List */}
 {/* --------------------------------------- */}

 <div className="max-h-104 space-y-3 overflow-y-auto">

 {activeJobs.length === 0 ? (
 <div
 className="
 rounded-2xl
 border
 border-dashed
 border-zinc-300
 px-5
 py-8
 text-center
 dark:border-zinc-700
 "
 >
 <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
 No active jobs available
 </p>

 <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
 Create an active job before assigning it
 to a team member.
 </p>
 </div>
 ) : (
 activeJobs.map((job) => {
 const isSelected =
 selectedJobs.includes(job.id);

 return (
 <label
 key={job.id}
 className={`
 flex
 cursor-pointer
 items-center
 justify-between
 rounded-2xl
 border
 p-4
 transition
 ${
 isSelected
 ? "border-[hashtag#408A71] bg-[hashtag#408A71]/5 dark:border-[hashtag#B0E4CC] dark:bg-[hashtag#B0E4CC]/5"
 : "border-zinc-200 hover:border-[hashtag#408A71] dark:border-zinc-700 dark:hover:border-[hashtag#B0E4CC]"
 }
 `}
 >
 {/* Job information */}

 <div>
 <h4 className="font-semibold text-zinc-900 dark:text-white">
 {job.title}
 </h4>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 {job.department}
 </p>
 </div>

 {/* Checkbox */}

 <input
 type="checkbox"
 checked={isSelected}
 onChange={() =>
 toggleJob(job.id)
 }
 className="
 h-5
 w-5
 cursor-pointer
 accent-[hashtag#408A71]
 "
 />
 </label>
 );
 })
 )}
 </div>

 {/* --------------------------------------- */}
 {/* Footer */}
 {/* --------------------------------------- */}

 <div
 className="
 flex
 flex-col
 gap-4
 border-t
 border-zinc-200
 pt-5
 dark:border-zinc-700
 sm:flex-row
 sm:items-center
 sm:justify-between
 "
 >
 {/* Selected count */}

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 {selectedJobs.length}{" "}
 {selectedJobs.length === 1
 ? "job"
 : "jobs"}{" "}
 selected
 </p>

 {/* Actions */}

 <div className="flex gap-3">
 <button
 type="button"
 onClick={onClose}
 className="
 rounded-xl
 border
 border-zinc-300
 px-5
 py-2.5
 text-sm
 font-medium
 text-zinc-700
 transition
 hover:bg-zinc-100
 dark:border-zinc-700
 dark:text-zinc-300
 dark:hover:bg-zinc-800
 "
 >
 Cancel
 </button>

 <button
 type="button"
 onClick={handleAssignJobs}
 className="
 rounded-xl
 bg-[hashtag#408A71]
 px-5
 py-2.5
 text-sm
 font-semibold
 text-white
 transition
 hover:bg-[hashtag#35745E]
 "
 >
 Save Assignments
 </button>
 </div>
 </div>
 </div>
 </Modal>
 );
};

export default AssignJobsModal;