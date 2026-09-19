import { MdClose } from "react-icons/md";
import type { Candidate } from "../../types/candidate";
import { useState, useEffect} from "react";

import CustomSelect from "../ui/CustomSelect";
import { useAuthStore } from "../../store/authStore";

interface MoveStageModalProps {
 open: boolean;
 candidate: Candidate | null;
 onClose: () => void;

 onMove: (
 candidateId: string,
 newStatus: Candidate["status"]
 ) => void;

 onRequestApproval: (candidateId: string) => void;
 onApproveHiring: (candidateId: string) => void;
 onRejectHiring: (candidateId: string, note?: string) => void;

 onCreateOffer: (candidateId: string,
 salary: number,
 startDate: string,
 employmentType: string,
 description:string
) => void;
 onApproveOffer: (candidateId: string) => void;
 onRejectOffer: (candidateId: string, note?: string) => void;
 onSendOffer: (candidateId: string) => Promise<boolean>;

 onHireCandidate: (candidateId: string) => void;
}

const MoveStageModal = ({
 open,
 candidate,
 onClose,
 onMove,
 onRequestApproval,
 onApproveHiring,
 onRejectHiring,
 onCreateOffer,
 onApproveOffer,
 onRejectOffer,
 onSendOffer,
 onHireCandidate,
}: MoveStageModalProps) => {

  
    



const [linkCopied, setLinkCopied] = useState(false);
const user = useAuthStore((state) => state.user);
//const addActivity = useTeamStore((state) => state.addActivity);
const [stage, setStage] = useState<Candidate["status"]>(candidate?.status ?? "Applied");
const [salary, setSalary] = useState("");
const [startDate, setStartDate] = useState("");
const [employmentType, setEmploymentType] = useState("");
const [description, setDescription] = useState("");

const [isSendingOffer, setIsSendingOffer] = useState(false);
const [isEditingRejectedOffer, setIsEditingRejectedOffer] = useState(false);
useEffect(() => {
  if (candidate?.offer?.status === "Draft" && isEditingRejectedOffer) {
    setSalary(candidate.offer.salary?.toString() ?? "");
    setStartDate(candidate.offer.startDate ?? "");
    setEmploymentType(candidate.offer.employmentType ?? "");
    setDescription(candidate.offer.description ?? "");
  }
}, [candidate, isEditingRejectedOffer]);

const stageOptions: Candidate["status"][] = (() => {
 if (!candidate || !user) return [];

 if (user.role !== "Recruiter") {
 return [];
 }

 switch (candidate.status) {
 case "Applied":
 return ["Screening"];

 case "Screening":
 return ["Interview", "Rejected"];

 case "Interview":
 // Interview is controlled by the interview
 // and approval workflow, not manual stage movement.
 return [];

 default:
 return [];
 }
})();

const isRecruiter = user?.role === "Recruiter";
const isHiringManager = user?.role === "Hiring Manager";
const isHRManager = user?.role === "HR Manager";

const hiringApprovalPending =
 candidate?.hiringApproval?.status === "Pending";

const hiringApproved =
 candidate?.hiringApproval?.status === "Approved";

const offerPendingHRApproval =
 candidate?.offer?.status === "Pending HR Approval";

const offerApproved =
 candidate?.offer?.status === "Approved";

const offerAccepted =
 candidate?.offer?.status === "Accepted";
const latestFinalInterview = candidate?.interviewHistory.find(
 (interview) => interview.stage === "Final"
);

const hasPassedFinalInterview =
 latestFinalInterview?.result === "Passed";

const isWorkflowAction =
 candidate?.status === "Interview" ||
 hasPassedFinalInterview ||
 hiringApprovalPending ||
 hiringApproved ||
 offerPendingHRApproval ||
 offerApproved ||
 offerAccepted;


 if (!open || !candidate) return null;

 return (
 <>
 {/* Overlay */}
 

 {/* Modal */}

    <div
 onClick={onClose}
 className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
 />
 <div 
 onClick={(e)=> e.stopPropagation()}
 className="
fixed
left-1/2
top-1/2
z-50

w-sm md:w-lg
max-w-lg

-translate-x-1/2
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

 <div className="">
 <h2 className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">
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
{!isWorkflowAction && (
    <>
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
 onChange={(value) => setStage(value as Candidate["status"])}
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

onMove(
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
 </>
)}


{candidate && (
 <div className="mt-8">
 {/* Recruiter: request hiring approval */}
 {candidate.status === "Interview" &&
 hasPassedFinalInterview &&
 isRecruiter &&
 !hiringApprovalPending &&
 !hiringApproved && (
 <button
 onClick={() => {
 onRequestApproval(candidate.id);
 onClose();
 }}
 className="w-full rounded-2xl bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6d58]"
 >
 Request Hiring Manager Approval
 </button>
 )}

{candidate.status === "Interview" &&
  isRecruiter &&
  !hasPassedFinalInterview &&
  !hiringApprovalPending &&
  !hiringApproved && (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center dark:border-white/10 dark:bg-white/5">
      <p className="font-semibold text-gray-900 dark:text-white">
        Final interview required
      </p>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        You can only request Hiring Manager approval after the
        candidate has completed and passed the Final Interview.
      </p>
    </div>
  )}

{candidate.status === "Interview" &&
 isRecruiter &&
 hiringApprovalPending && (
 <div className="rounded-xl text-center border border-amber-100 bg-amber-50 p-3 dark:border-amber-500/20 dark:bg-amber-500/10">
 <p className="font-semibold text-amber-700 dark:text-amber-300">
 Hiring Manager Approval Pending
 </p>

 <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">
 Your approval request has been sent to the Hiring Manager.
 </p>
 </div>
 )}


{/* 
{candidate.status === "Interview" &&
 isRecruiter &&
 hiringApproved &&
 !candidate.offer && (
 <>
 <div className="mb-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
 <p className="font-semibold text-emerald-700 dark:text-emerald-300">
 Hiring Approved
 </p>

 <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
 The Hiring Manager approved this candidate. You can now create an offer.
 </p>
 </div>
 </>
)}
*/}


 {/* Hiring Manager: approve */}
 {candidate.status === "Interview" &&
hasPassedFinalInterview &&
isHiringManager &&
hiringApprovalPending && (
 <div className="flex flex-col gap-3 sm:flex-row">
 <button
 onClick={() => {
 onApproveHiring(candidate.id);
 onClose();
 }}
 className="w-full rounded-2xl bg-[#408A71] px-6 py-3 font-semibold text-white"
 >
 Approve Hiring
 </button>

 <button
 onClick={() => {
 onRejectHiring(candidate.id);
 onClose();
 }}
 className="w-full rounded-2xl border border-red-300 px-6 py-3 font-semibold text-red-600"
 >
 Reject Hiring
 </button>
 </div>
 )}
{candidate.hiringApproval?.status === "Approved" &&
  !candidate.offer && (
  <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-500/30 dark:bg-green-500/10">
    <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
      
      
       Candidate Approved
    </h3>

    <p className="mt-1 text-sm text-green-600 dark:text-green-300">
      This candidate has been approved by the Hiring Manager and is ready for the next step.
    </p>
  </div>
)}

{candidate.offer?.status === "Pending HR Approval" && isRecruiter && (
  <div className="mt-4 text center rounded-xl border border-amber-100 text-center bg-amber-50 p-3 dark:border-amber-500/30 dark:bg-amber-500/10">
    <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400">
      Waiting for HR Approval
    </h3>

    <p className="mt-1 text-sm text-amber-600 dark:text-amber-300">
      The offer has been submitted to HR and is currently waiting for approval.
    </p>
  </div>
)}



 {/* Recruiter: create offer */}
{candidate.status === "Interview" &&
  isRecruiter &&
  hiringApproved &&
  (!candidate.offer || (candidate.offer.status === "Draft" && isEditingRejectedOffer  )) &&  (
 <div className="mt-4 px-2">

<h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
  {candidate.offer?.status === "Draft"
    ? "Edit Offer"
    : "Create Offer"}
</h3>

<p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
  {candidate.offer?.status === "Draft"
    ? "Update the offer details and resubmit it for HR approval."
    : "Enter the offer details for this candidate."}
</p>

<div className="mt-4">
 <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
 Company Name
 </label>

 <input
 type="text"
 value={user?.companyName ?? ""}
 readOnly
 className="mt-2 w-full  text-zinc-600 outline-none  dark:text-zinc-300"
 />
</div>


<div className="mt-4">
 <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
 Offer Message
 </label>

 <textarea
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 rows={5}
 placeholder="We are pleased to offer you the position of..."
 className="mt-2 w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#408A71] dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
 />
</div>
 {/* Salary */}

<div className="mt-5">
 <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
 Salary
 </label>

 <div className="mt-2 flex items-center rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
 <span className="px-3 text-sm font-medium text-zinc-500 dark:text-zinc-400">
 ₦
 </span>

<input
  type="text"
  value={salary ? Number(salary).toLocaleString("en-NG") : ""}
  onChange={(e) => {
    const value = e.target.value.replace(/,/g, "");
    
    if (!/^\d*$/.test(value)) return;
    
    setSalary(value);
  }}
  placeholder="Enter salary"
  className="w-full bg-transparent px-3 py-3 text-sm text-zinc-900 outline-none dark:text-white"
/>
 </div>
</div>

 {/* Start Date */}
 <div className="mt-4">
 <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
 Start Date
 </label>

 <input
  type="date"
  value={startDate}
  min={new Date().toISOString().split("T")[0]}
  onChange={(e) => setStartDate(e.target.value)}
  className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#408A71] dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
/>
 </div>

 {/* Employment Type */}
 <div className="mt-4">
 <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
 Employment Type
 </label>

 <select
 value={employmentType}
 onChange={(e) => setEmploymentType(e.target.value)}
 className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-[#408A71] dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
 >
 <option value="">Select employment type</option>
 <option value="Full-time">Full-time</option>
 <option value="Part-time">Part-time</option>
 <option value="Contract">Contract</option>
 <option value="Internship">Internship</option>
 </select>
 </div>

 {/* Create Offer Button */}
 <button
 onClick={() => {

 

 if (!salary || !startDate || !employmentType) {
 return;
 }

 onCreateOffer(
 candidate.id,
 Number(salary),
 startDate,
 employmentType,
 description,
 );

 onClose();
 }}
 disabled={!salary || !startDate || !employmentType || !description.trim()}
 className="mt-5 w-full rounded-2xl bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6d58] disabled:cursor-not-allowed disabled:opacity-50"
 >
  {candidate.offer?.status === "Rejected"
    ? "Resubmit for HR Approval"
    : "Create Offer"}
 </button>

 </div>
 )}

 {/* HR: approve offer */}

{(offerPendingHRApproval && isHRManager  || candidate.offer?.status === "Draft") && (
  <div className="mt-4  bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">

    <div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
        Review Offer
      </h3>

      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Review the offer details before making your decision.
      </p>
    </div>

    {/* Company */}
    <div className="mt-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-400">
        Company
      </p>

      <p className="mt-1 font-medium text-zinc-900 dark:text-white">
        {candidate.offer?.companyName || "—"}
      </p>
    </div>

    {/* Offer Message */}
    <div className="mt-4">
      <p className="text-base font-normal font-semibold text-zinc-700 dark:text-zinc-400">
        Offer Message
      </p>

      <div className="mt-1 text-sm  bg-white  text-sm leading-4 text-zinc-700 dark:text-zinc-300">
        {candidate.offer?.description || "No offer message provided."}
      </div>
    </div>

    {/* Salary */}
    <div className="mt-4">
      <p className="text-base font-normal font-semibold text-zinc-700 dark:text-zinc-400">
        Salary
      </p>

      <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
        {candidate.offer?.salary
          ? `₦${candidate.offer.salary.toLocaleString()}`
          : "—"}
      </p>
    </div>

    {/* Start Date */}
    <div className="mt-4">
      <p className="text-base font-normal font-semibold text-zinc-700 dark:text-zinc-400">
        Start Date
      </p>

      <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
        {candidate.offer?.startDate || "—"}
      </p>
    </div>

    {/* Employment Type */}
    <div className="mt-4">
      <p className="text-base font-normal font-semibold text-zinc-700 dark:text-zinc-400">
        Employment Type
      </p>

      <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
        {candidate.offer?.employmentType || "—"}
      </p>
    </div>

    {/* Created By */}
    <div className="mt-4">
      <p className="text-base font-normal font-semibold text-zinc-700 dark:text-zinc-400">
        Created By
      </p>

      <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
        {candidate.offer?.createdByName || "Recruiter"}
      </p>
    </div>

    {/* Decision buttons */}
    {candidate.offer?.status === "Pending HR Approval" && (
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => {
            onApproveOffer(candidate.id);
            onClose();
          }}
          className="w-full rounded-2xl bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6d58]"
        >
          Approve Offer
        </button>

        <button
          onClick={() => {
            onRejectOffer(candidate.id);
            onClose();
          }}
          className="w-full rounded-2xl border border-red-300 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/40 dark:hover:bg-red-500/10"
        >
          Reject Offer
        </button>
      </div>
    )}

    {/* Offer Rejected */}
    {candidate.status === "Interview" &&
  isRecruiter &&
  hiringApproved &&
  candidate.offer?.status === "Draft" &&
  !isEditingRejectedOffer && (
    <div className="mt-6  ">
      <h3 className="text-base font-semibold text-red-700 dark:text-red-400">
        Offer Rejected
      </h3>

      <p className="mt-1 text-xs text-red-600 dark:text-red-300">
        HR rejected this offer. You can edit the offer and resubmit it for
        approval.
      </p>

      <button
        type="button"
        onClick={() => setIsEditingRejectedOffer(true)}
        className="mt-4 w-full rounded-xl bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6d58]"
      >
        Edit Offer
      </button>
    </div>
  )}

  </div>
)}







 {/* Recruiter: send approved offer */}
 
{offerApproved && isRecruiter && (
 <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
 <div>
 <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">
 Offer Approved
 </h3>

 <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">
 HR has approved this offer. You can now send it to the candidate.
 </p>
 </div>

 <button
 onClick={async () => {
 setIsSendingOffer(true);

 try {
 const success = await onSendOffer(candidate.id);

 if (success) {
 onClose();
 } else {
 setIsSendingOffer(false);
 }
 } catch (error) {
 console.error("Send offer failed:", error);
 setIsSendingOffer(false);
 }
 }}
 disabled={isSendingOffer}
 className="mt-5 w-full rounded-2xl bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[hashtag#2f6d58] disabled:cursor-not-allowed disabled:opacity-70"
>
 {isSendingOffer ? "Sending..." : "Send Offer"}
</button>

 </div>
)}


{candidate.status === "Offer" &&
 candidate.offer?.status === "Sent" &&
 isRecruiter && (
 <div className="mt-4">
 <div>
 <h3 className="text-lg text-center font-semibold text-green-800 dark:text-green-700">
 Offer Sent
 </h3>

 <p className="mt-1 text-sm text-gray-700 text-center dark:text-gray-300">
 The offer has been sent to the candidate. You can copy the
 candidate's offer link below.
 </p>
 </div>



<button
 type="button"
 onClick={async () => {
 const publicAppUrl = (
 import.meta.env.VITE_PUBLIC_APP_URL ||
 "https://recuriters-dashboard.onrender.com"
).replace(/\/$/, "");

const offerLink = `${publicAppUrl}/candidate/offer/${candidate.offer?.id}`;

 try {
 await navigator.clipboard.writeText(offerLink);

 setLinkCopied(true);

 setTimeout(() => {
 setLinkCopied(false);
 }, 2000);
 } catch (error) {
 console.error("Failed to copy offer link:", error);
 }
 }}
 className="mt-4 w-full rounded-2xl bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6d58]"
>
 {linkCopied ? " Copied" : "Copy Offer Link"}
</button>

 </div>
 )}

 {/* Recruiter: hire after candidate accepts */}
 {offerAccepted && isRecruiter && (
 <button
 onClick={() => {
 onHireCandidate(candidate.id);
 onClose();
 }}
 className="w-full rounded-2xl bg-[#408A71] px-6 py-3 font-semibold text-white transition hover:bg-[#2f6d58]"
 >
 Hire Candidate
 </button>
 )}
 </div>
)}

 </div>






 </>
 );
};

export default MoveStageModal;