import type { Candidate } from "../../types/candidate";
import PipelineCard from "./PipelineCard";
import PipelineEmpty from "./PipelineEmpty";
import { useDroppable } from "@dnd-kit/core";
interface PipelineColumnProps {
 title: string;
 candidates: Candidate[];
}

const PipelineColumn = ({
 title,
 candidates,
}: PipelineColumnProps) => {

    const { setNodeRef, isOver } = useDroppable({
 id: title,
});

const stageColors: Record<
 string,
 {
 badge: string;
 dot: string;
 background: string;
 dragOver: string;
 }
> = {
 Applied: {
 badge:
 "bg-zinc-100 text-zinc-700 dark:bg-zinc-700/40 dark:text-zinc-300",

 dot: "bg-zinc-400",

 background:
 "bg-zinc-50 dark:bg-zinc-900/40",

 dragOver:
 "bg-zinc-100 ring-2 ring-zinc-300 dark:bg-zinc-800/60 dark:ring-zinc-600",
 },


 Screening: {
 badge:
 "bg-[#EEF8F3] text-[#285A48] dark:bg-[#285A48]/20 dark:text-[#B0E4CC]",

 dot:
 "bg-[#408A71] dark:bg-[#B0E4CC]",

 background:
 "bg-[#F8FCFA] dark:bg-[#285A48]/5",

 dragOver:
 "bg-[#EEF8F3] ring-2 ring-[#408A71] dark:bg-[#285A48]/20 dark:ring-[#B0E4CC]",
 },


 Interview: {
 badge:
 "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",

 dot:
 "bg-indigo-500",

 background:
 "bg-[#F8FCFA] dark:bg-[#285A48]/5",

 dragOver:
 "bg-indigo-100 ring-2 ring-indigo-300 dark:bg-indigo-500/15 dark:ring-indigo-400/40",
 },


 Offer: {
 badge:
 "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",

 dot:
 "bg-amber-500",

 background:
 "bg-[#F8FCFA] dark:bg-[#285A48]/5",

 dragOver:
 "bg-amber-100 ring-2 ring-amber-300 dark:bg-amber-500/15 dark:ring-amber-400/40",
 },


 Hired: {
 badge:
 "bg-[#285A48] text-white dark:bg-[#B0E4CC] dark:text-[#285A48]",

 dot:
 "bg-[#285A48] dark:bg-[#B0E4CC]",

 background:
 "bg-[#F4FBF7] dark:bg-[#285A48]/10",

 dragOver:
 "bg-[#EEF8F3] ring-2 ring-[#285A48] dark:bg-[#285A48]/20 dark:ring-[#B0E4CC]",
 },
};

 return (
 <div className="w-full">
 {/* Header */}
 <div className="mb-5 flex items-center justify-between gap-3">
 <div className="flex min-w-0 items-center gap-3">
 <span
 className={`h-3 w-3 shrink-0 rounded-full ${stageColors[title].dot}`}
 />

 <h2 className="truncate text-base font-semibold text-zinc-900 dark:text-white sm:text-lg">
 {title}
 </h2>
 </div>

 <span
 className={`
 shrink-0
 rounded-full
 px-3
 py-1

 text-xs
 font-semibold

 sm:text-sm

 ${stageColors[title].badge}
 `}
 >
 {candidates.length}
 </span>
 </div>

 {/* Cards */}
 <div
 ref={setNodeRef}
 className={`
 min-h-[420px]
 sm:min-h-[500px]
 space-y-4
 rounded-3xl
 p-3
 sm:p-4
 transition-all
 duration-300

 ${
 isOver
 ? stageColors[title].dragOver
 : stageColors[title].background
 }
`}
 >

 {candidates.length === 0 ? (
 <PipelineEmpty stage={title} />
 ) : (
 candidates.map((candidate) => (
    <>
  
 <PipelineCard
 key={candidate.id}
 candidate={candidate}
 />
 </>
 ))
 )}
 </div>
 </div>
);
};

export default PipelineColumn;