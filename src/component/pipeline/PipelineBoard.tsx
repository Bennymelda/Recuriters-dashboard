import PipelineColumn from "./PipelineColumn";
import {useCandidateStore} from "../../store/candidateStore";
import {useTeamStore} from "../../store/teamStore";
import {
 DndContext,
 closestCenter,
 DragOverlay
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { Candidate } from "../../types/candidate";
import { useState } from "react";
import PipelineCard from "./PipelineCard";
import { useAuthStore } from "../../store/authStore";
const PipelineBoard = () => {
 const candidates = useCandidateStore((state) => state.candidates);
const updateCandidateStatus = useCandidateStore(
 (state) => state.updateCandidateStatus
);
const addActivity = useTeamStore((state) => state.addActivity);
 const user = useAuthStore((state) => state.user);
 const columns = [
 {
 title: "Applied",
 candidates: candidates.filter(
 (candidate) => candidate.status === "Applied"
 ),
 },
 {
 title: "Screening",
 candidates: candidates.filter(
 (candidate) => candidate.status === "Screening"
 ),
 },
 {
 title: "Interview",
 candidates: candidates.filter(
 (candidate) => candidate.status === "Interview"
 ),
 },
 {
 title: "Offer",
 candidates: candidates.filter(
 (candidate) => candidate.status === "Offer"
 ),
 },
 {
 title: "Hired",
 candidates: candidates.filter(
 (candidate) => candidate.status === "Hired"
 ),
 },
 ];
const [activeCandidate, setActiveCandidate] =
 useState<Candidate | null>(null);

const handleDragStart = (event: DragStartEvent) => {
 setActiveCandidate(
 event.active.data.current?.candidate ?? null
 );
};

const handleDragEnd = (event: DragEndEvent) => {
 const { active, over } = event;

 setActiveCandidate(null);

 if (!over) return;

 const candidate = active.data.current?.candidate as Candidate;

 if (!candidate) return;

 if (candidate.status === over.id) return;

 const newStatus = over.id as Candidate["status"];
 updateCandidateStatus(candidate.id, newStatus);

 if (candidate.assignedRecruiterId) {
  const action =
   newStatus === "Hired"
    ? "Hired candidate"
    : newStatus === "Rejected"
    ? "Rejected candidate"
    : newStatus === "Offer"
    ? "Moved candidate to Offer"
    : `Moved candidate to ${newStatus}`;

  addActivity(candidate.assignedRecruiterId, {
   action,
   recruiterName: user?.fullName ?? "Unknown",
   target: candidate.fullName,
  });
 }
};
const handleDragCancel = () => {
 setActiveCandidate(null);
};

 return (
 <DndContext
 collisionDetection={closestCenter}
 onDragStart={handleDragStart}
 onDragEnd={handleDragEnd}
 onDragCancel={handleDragCancel}
>
    <DragOverlay>
 {activeCandidate ? (
 <PipelineCard
 candidate={activeCandidate}
 isOverlay
 />
 ) : null}
</DragOverlay>

 <section className="h-full overflow-auto pb-4">
   <div className="flex min-w-max gap-5">
     {columns.map((column) => (
       <div
         key={column.title}
         className="w-[320px] shrink-0 lg:w-[360px]"
       >
         <PipelineColumn
           title={column.title}
           candidates={column.candidates}
         />
       </div>
     ))}
   </div>
 </section>
</DndContext>
 );
};

export default PipelineBoard;