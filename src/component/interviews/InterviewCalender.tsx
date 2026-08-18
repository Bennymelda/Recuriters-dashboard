import { useState } from "react";

import { useCandidateStore } from "../../store/candidateStore";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
const InterviewCalendar = () => {
 const [currentMonth, setCurrentMonth] = useState(new Date());
const candidates = useCandidateStore(
 (state) => state.candidates
);
 // Step 3
 const year = currentMonth.getFullYear();
 const month = currentMonth.getMonth();
const [selectedDate, setSelectedDate] = useState<string | null>(null);
 const firstDay = new Date(year, month, 1);
 const lastDay = new Date(year, month + 1, 0);

 const daysInMonth = lastDay.getDate();
 const startDay = firstDay.getDay();

 // Step 4
 const weekDays = [
 "Sun",
 "Mon",
 "Tue",
 "Wed",
 "Thu",
 "Fri",
 "Sat",
 ];
const calendarDays = [
 ...Array(startDay).fill(null),
 ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
];
const scheduledInterviewDates = candidates.flatMap((candidate) =>
 candidate.interviewHistory
 .filter((interview) => interview.result === "Scheduled")
 .map((interview) => interview.date.split("T")[0])
);
const interviewsForSelectedDate = candidates.flatMap((candidate) =>
 candidate.interviewHistory
 .filter(
 (interview) =>
 interview.result === "Scheduled" &&
 interview.date.split("T")[0] === selectedDate
 )
 .map((interview) => ({
 id: interview.id,
 candidateName: candidate.fullName,
 jobTitle: candidate.appliedRole,
 stage: interview.stage,
 interviewer: interview.interviewerName,
 interviewType: "Virtual",
 date: interview.date,
 }))
);

return (
 <section className="rounded-3xl w-full xl:w-1/2 border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">

 {/* Header */}
 <div className="mb-6 flex items-center justify-between">
 <h2 className="text-xl font-semibold dark:text-white">
 {currentMonth.toLocaleString("default", {
 month: "long",
 year: "numeric",
 })}
 </h2>

 <div className="flex gap-2">
 <button
 onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
 className="rounded-xl cursor-pointer border border-zinc-300 px-4 py-2 text-sm dark:text-white hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
 >
 <MdNavigateBefore size={18}/>
 </button>

 <button
 onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
 className="rounded-xl cursor-pointer border border-zinc-300 px-4 py-2 text-sm dark:text-white hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
 >
 <MdNavigateNext size={18}/>
 </button>
 </div>
 </div>

 {/* Week Days */}
 <div className="grid grid-cols-7 gap-2">

 {weekDays.map((day) => (
 <div
 key={day}
 className="text-center text-sm font-semibold text-zinc-500 dark:text-gray-200"
 >
 {day}
 </div>
 ))}

 {/* Calendar Days */}
 {calendarDays.map((day, index) => {
 if (!day) {
 return <div key={index}></div>;
 }

 const currentDate = `${year}-${String(month + 1).padStart(
 2,
 "0"
 )}-${String(day).padStart(2, "0")}`;

 const hasInterview =
 scheduledInterviewDates.includes(currentDate);

 return (
<div
 key={index}
 onClick={() => setSelectedDate(currentDate)}
 className={`
 relative
 flex
 h-10
 
 cursor-pointer
 items-center
 justify-center
 rounded-xl
 dark:text-white
 text-sm
 transition
 ${
 selectedDate === currentDate
 ? "bg-[#408A71] dark:bg-[#B0E4CC]  text-white dark:text-zinc-900 "
 : hasInterview
 ? "bg-[#EEF8F3] dark:bg-zinc-800 font-semibold text-[#408A71] dark:text-white"
 : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
 }
 `}
>
 {day}

 {hasInterview && (
 <span className="absolute bottom-1 h-2 w-2 rounded-full bg-[#21dd9e]" />
 )}
 </div>
 );
 })}
 </div>

 <div className="mt-6">
 <h3 className="mb-2 text-sm text-zinc-800 font-semibold dark:text-white">
 {selectedDate
 ? `Interviews for ${selectedDate}`
 : "Select a day"}
 </h3>

 {!selectedDate ? (
    
 <p className="text-zinc-500 dark:text-zinc-200">
 Click a day on the calendar.
 </p>
 ) : interviewsForSelectedDate.length === 0 ? (
 <p className="text-zinc-500 dark:text-zinc-200">
 No interviews scheduled.
 </p>
 ) : (
 <div className="space-y-4">
 {interviewsForSelectedDate.map((interview) => (
 <div
 key={interview.id}
 className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-700"
 >
 {/* Desktop */}
 <div className="hidden md:flex items-center justify-between gap-3">
 <h4 className="font-semibold dark:text-white">
 {interview.candidateName}
 </h4>

 <p className="text-sm text-zinc-500 dark:text-zinc-300">
 {interview.jobTitle}
 </p>

 <p className="text-sm dark:text-white">
 {new Date(interview.date).toLocaleTimeString([], {
 hour: "2-digit",
 minute: "2-digit",
 })}
 </p>

 <span className="rounded-full bg-[#EEF8F3] dark:bg-[#B0E4CC] px-3 py-1 text-xs font-semibold text-[#408A71]">
 {interview.stage}
 </span>
 </div>

 {/* Mobile */}
 <div className="md:hidden">
 <div className="flex items-start justify-between gap-3">
 <div className="min-w-0">
 <h4 className="truncate font-semibold text-zinc-900 dark:text-white">
 {interview.candidateName}
 </h4>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-300">
 {interview.jobTitle}
 </p>
 </div>

 <span className="shrink-0 rounded-full bg-[#EEF8F3] dark:bg-[#B0E4CC] px-3 py-1 text-xs font-semibold text-[#408A71]">
 {interview.stage}
 </span>
 </div>

 <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-700">
 <p className="text-xs text-zinc-500 dark:text-zinc-400">
 Interview Time
 </p>

 <p className="font-semibold text-zinc-900 dark:text-white">
 {new Date(interview.date).toLocaleTimeString([], {
 hour: "2-digit",
 minute: "2-digit",
 })}
 </p>
 </div>
 </div>
 </div>
))}
 </div>
 )}
</div>
 </section>
);
};

export default InterviewCalendar;