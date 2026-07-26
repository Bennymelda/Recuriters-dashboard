import { useState } from "react";
import {
 MdMoreHoriz,

 MdEditCalendar,
 MdHistory,

} from "react-icons/md";

import type { Candidate } from "../../types/candidate";
import CompleteInterviewModal from "./CompleteInterviewModal";
import InterviewModal from "../pipeline/ScheduleInterviewModal";
import { useNavigate } from "react-router";

import CancelInterviewModal from "./CancelInterviewModal";
interface InterviewRowProps {
 candidate: Candidate;

 interview: Candidate["interviewHistory"][number];
}

const InterviewRow = ({
 candidate,
 interview,
}: InterviewRowProps) => {
 const [openMenu, setOpenMenu] = useState(false);
const [openCompleteModal, setOpenCompleteModal] =
 useState(false);
const [openRescheduleModal, setOpenRescheduleModal] = useState(false);
const [outcome, setOutcome] = useState<
 "Passed" | "Failed"
>("Passed");
const [showCancelModal, setShowCancelModal] = useState(false);

const navigate=useNavigate()

const isOverdue =
 interview.result === "Scheduled" &&
 new Date(interview.date) < new Date();


 return (
    <>
 <tr className="hidden xl:table-row bg-white dark:bg-zinc-900 border-b border-zinc-200 last:border-none dark:border-zinc-700">
 {/* Candidate */}
 <td className="px-6 py-5">
 <div className="flex items-center gap-2">
 <img
 src={
 candidate.avatar ||
 `https://ui-avatars.com/api/?name=${candidate.fullName}`
 }
 alt={candidate.fullName}
 className="h-10 w-10 rounded-full object-cover"
 />

 <div>
<div className="flex items-center gap-2">
 <h3 className="font-semibold whitespace-nowrap text-sm text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <td className="px-4 py-2">
 <div className="flex items-center gap-2">
 {isOverdue && (
   <>
 <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
<span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-purple-500/20 dark:text-purple-300">
 overdue
 </span>
</>
 )}

 
 </div>
</td>
</div>

 <p className="text-sm text-zinc-500 dark:text-gray-300">
 {candidate.appliedRole}
 </p>
 </div>
 </div>
 </td>



 {/* Stage */}
 <td className="px-4 py-2">
 <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
 {interview.stage}
 </span>
 </td>

 {/* Interviewer */}
 <td className="px-6 py-5 text-sm text-zinc-600 dark:text-zinc-300">
 {interview.interviewerName}
 </td>

 {/* Date */}
 <td className="px-6 py-5 text-sm text-zinc-600 dark:text-zinc-300">
 {new Date(interview.date).toLocaleDateString("en-US", {
 month: "short",
 day: "numeric",
 year: "numeric",
 })}
 </td>

 {/* Status */}
 <td className="px-6 py-5">
 <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
 {interview.result}
 </span>
 </td>

 {/* Outcome */}

<td className="px-6 py-5">
 <div className="flex items-center justify-center">

 {interview.result === "Scheduled" ? (

 <div className="flex items-center gap-2">

 <button
 onClick={() => {
 setOutcome("Passed");
 setOpenCompleteModal(true);
 }}
 className="
 rounded-xl
 bg-emerald-100
 px-4
 py-2
 text-xs
 font-semibold
 text-emerald-700
 transition
 dark:hover:bg-emerald-800
 hover:bg-emerald-200
 dark:bg-emerald-500/20
 dark:text-emerald-300
 "
 >
 Pass
 </button>

 <button
 onClick={() => {
 setOutcome("Failed");
 setOpenCompleteModal(true);
 }}
 className="
 rounded-xl
 bg-red-100
 px-4
 py-2
 text-xs
 font-semibold
 text-red-700
 transition
 hover:bg-red-200
 dark:hover:bg-red-800
 dark:bg-red-500/20
 dark:text-red-300
 "
 >
 Fail
 </button>

 </div>

 ) : (

 <span
 className={`rounded-full px-4 py-2 text-xs font-semibold ${
 interview.result === "Passed"
 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
 : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
 }`}
 >
 {interview.result}
 </span>

 )}

 </div>
</td>

 {/* Actions */}
 <td className="relative px-6 py-5 text-right">
 <button
 onClick={() => setOpenMenu(!openMenu)}
 className="rounded-xl text-black cursor-pointer dark:tex
t-white p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-700"
 >
 <MdMoreHoriz size={22} className=""/>
 </button>

 {openMenu && (
 <div
 className="
 absolute
 right-6
 top-10
 z-30
 w-56
 rounded-2xl
 border
 border-zinc-200
 bg-white
 p-2
 shadow-xl
 dark:text-gray-200
 text-black
 dark:border-zinc-700
 dark:bg-zinc-800
 "
 >
 <button
 onClick={() =>
 navigate(`/candidates/${candidate.id}`, {
 state: {
 tab: "interviews",
 },
 })
 }
 className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
>
 <MdHistory size={18} />
 View Interview History
</button>

 <button
 onClick={() => {
 setOpenMenu(false);
 setOpenRescheduleModal(true);
 }}
 className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
>
 <MdEditCalendar size={18} />
 Reschedule
</button>
<button
 onClick={() => setShowCancelModal(true)}
 className="
 flex
 w-full
 items-center
 gap-3
 px-4
 py-3
 text-left
 text-red-600
 transition
 hover:bg-red-50
 dark:text-red-400
 dark:hover:bg-red-500/10
 "
>
 ❌ Cancel Interview
</button>


 </div>
 )}
 </td>


 </tr>

 <section
 className="
 xl:hidden

w-full
 rounded-3xl
relative
 border
 border-zinc-200

 bg-white

 p-5

 shadow-sm

 transition-all
 duration-300

 dark:border-zinc-700
 dark:bg-zinc-900
 "
>
 {/* Header */}
 <div className="flex items-start justify-between gap-3">

 <div className="flex items-center gap-3">

 <img
 src={
 candidate.avatar ??
 `https://ui-avatars.com/api/?name=${candidate.fullName}`
 }
 alt={candidate.fullName}
 className="h-12 w-12 rounded-full object-cover"
 />

 <div>

<div className="flex items-center gap-2">
 <h3 className="font-semibold whitespace-nowrap text-sm text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <td className="px-4 py-2">
 <div className="flex items-center gap-2">
 {isOverdue && (
   <>
 <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
<span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-purple-500/20 dark:text-purple-300">
 overdue
 </span>
</>
 )}

 
 </div>
</td>
</div>


 <p className="text-sm text-zinc-500 dark:text-gray-300">
 {candidate.appliedRole}
 </p>

 </div>

 </div>

 <button
 onClick={() => setOpenMenu(!openMenu)}
 className="rounded-xl p-2 text-black dark:text-white  hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 <MdMoreHoriz size={22} />
 </button>

 </div>

 {/* Details */}
 <div className="mt-5 px-2 flex justify-between  gap-4">


<div className="flex flex-col gap-4">
<div>
 <p className="text-xs uppercase text-zinc-400">
 Stage
 </p>

 <span className="mt-1 inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">
 {interview.stage}
 </span>
 </div>

<div>
 <p className="text-xs uppercase text-zinc-400">
 Interviewer
 </p>

 <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
 {interview.interviewerName}
 </p>
 </div>
</div>
 


<div>


<div className="flex flex-col gap-4">
 <p className="text-xs uppercase text-zinc-400">
 Status
 </p>

 <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
 {interview.result}
 </span>
 

 

 <div>
 <p className="text-xs uppercase text-zinc-400">
 Date
 </p>

 <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
 {new Date(interview.date).toLocaleDateString("en-US", {
 month: "short",
 day: "numeric",
 year: "numeric",
 })}
 </p>
 </div>
</div>
</div>
 

 </div>

 {/* Outcome */}
 <div className="mt-5 border-t border-zinc-200 pt-4 dark:border-zinc-700">

 {interview.result === "Scheduled" ? (

 <div className="grid grid-cols-2 gap-3">

 <button
 onClick={() => {
 setOutcome("Passed");
 setOpenCompleteModal(true);
 }}
 className="
 rounded-xl

 bg-emerald-200

 py-3

 text-sm
 font-semibold

 text-emerald-700

 dark:bg-emerald-500/20
 dark:text-emerald-300
 "
 >
 Pass
 </button>

 <button
 onClick={() => {
 setOutcome("Failed");
 setOpenCompleteModal(true);
 }}
 className="
 rounded-xl

 bg-red-200

 py-3

 text-sm
 font-semibold

 text-red-700

 dark:bg-red-500/20
 dark:text-red-300
 "
 >
 Fail
 </button>

 </div>

 ) : (

 <div className="flex justify-center">

 <span
 className={`rounded-full px-4 py-2 text-sm font-semibold ${
 interview.result === "Passed"
 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
 : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
 }`}
 >
 {interview.result}
 </span>

 </div>

 )}

 </div>

 {/* Mobile Menu */}
 {openMenu && (
 <div className="mt-4 border-t text-gray-800 dark:text-white  absolute top-10 right-2 z-10 bg-white dark:bg-zinc-800 border dark:border-zinc-700 rounded-sm shadow-sm border-zinc-200 pt-4  space-y-2">

 <button
 onClick={() =>
 navigate(`/candidates/${candidate.id}`, {
 state: { tab: "interviews" },
 })
 }
 className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 <MdHistory size={18} />
 View Interview History
 </button>

 <button
 onClick={() => {
 setOpenMenu(false);
 setOpenRescheduleModal(true);
 }}
 className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 <MdEditCalendar size={18} />
 Reschedule
 </button>

 <button
 onClick={() => setShowCancelModal(true)}
 className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
 >
 ❌ Cancel Interview
 </button>

 </div>
 )}

</section>

  <CompleteInterviewModal
 open={openCompleteModal}
 onClose={() => setOpenCompleteModal(false)}
 candidate={candidate}
 interview={interview}
 outcome={outcome}
/>
 <InterviewModal
 open={openRescheduleModal}
 onClose={() => setOpenRescheduleModal(false)}
 candidate={candidate}
 mode="reschedule"
 interview={interview}
/>
<CancelInterviewModal
 open={showCancelModal}
 onClose={() => setShowCancelModal(false)}
 candidate={candidate}
 interview={interview}
/>
</>
);
};

export default InterviewRow;

