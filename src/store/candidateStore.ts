import { create } from "zustand";
import { candidates as initialCandidates } from "../data/candidates";
import type { Candidate, InterviewHistoryItem, InterviewStage } from "../types/candidate";

const STORAGE_KEY = "careerflow-candidates";
const STORAGE_VERSION = 2;

type PersistedCandidateState = {
 version: number;
 candidates: Candidate[];
};

const persistCandidates = (candidates: Candidate[]) => {
 if (typeof window === "undefined") return;

 try {
 const payload: PersistedCandidateState = {
 version: STORAGE_VERSION,
 candidates,
 };
 window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
 } catch {
 // Ignore storage errors so the app still works offline.
 }
};

const loadPersistedCandidates = (): Candidate[] => {
 if (typeof window === "undefined") return initialCandidates as Candidate[];

 try {
 const saved = window.localStorage.getItem(STORAGE_KEY);
 if (!saved) return initialCandidates as Candidate[];

 const parsed = JSON.parse(saved) as Partial<PersistedCandidateState> | Candidate[];

 if (Array.isArray(parsed)) {
 window.localStorage.removeItem(STORAGE_KEY);
 return initialCandidates as Candidate[];
 }

 if (parsed.version === STORAGE_VERSION && Array.isArray(parsed.candidates)) {
 return parsed.candidates as Candidate[];
 }

 window.localStorage.removeItem(STORAGE_KEY);
 return initialCandidates as Candidate[];
 } catch {
 window.localStorage.removeItem(STORAGE_KEY);
 return initialCandidates as Candidate[];
 }
};

interface CandidateStore {
 candidates: Candidate[];
 selectedCandidateId: string | null;
 isLoading: boolean;
 setLoading: (isLoading: boolean) => void;
 setCandidates: (candidates: Candidate[]) => void;

 updateCandidate: (
 id: string,
 updatedCandidate: Partial<Candidate>
 ) => void;
updateCandidateStatus: (
 id: string,
 status: Candidate["status"]
) => void;
 deleteCandidate: (id: string) => void;

 selectCandidate: (id: string) => void;
clearCandidates: () => void;
 clearSelectedCandidate: () => void;

 getCandidateById: (id: string) => Candidate | undefined;
addNote: (
 candidateId: string,
 note: {
 author: string;
 content: string;
 }
) => void;
 getFilteredCandidates: (filters: {
 status?: string;
 role?: string;
 experience?: string;
 location?: string;
 }) => Candidate[];

 getCandidatesByStatus: (
 status: Candidate["status"]
 ) => Candidate[];

 updateNote: (
 candidateId: string,
 noteId: string,
 content: string
) => void;

deleteNote: (
 candidateId: string,
 noteId: string
) => void;

scheduleInterview: (
 candidateId: string,
 interview: {
 stage: InterviewStage;
 interviewerId: string;
interviewerName: string;
 date: string;
 note?: string;
 }
) => void;

rescheduleInterview: (
 candidateId: string,
 interviewId: string,
 interview: {
 stage: InterviewStage;
 interviewerId: string;
interviewerName: string;
 date: string;
 note?: string;
 }
) => void;

completeInterview: (
 candidateId: string,
 interviewId: string,
 result: "Passed" | "Failed",
 feedback: string
) => void;


moveCandidateStage: (
 candidateId: string,
 status: Candidate["status"]
) => void;
rejectCandidate: (
 candidateId: string,
 reason: string,
 note: string
) => void;

cancelInterview: (
 candidateId: string,
 interviewId: string
) => void;

}


export const useCandidateStore = create<CandidateStore>((set, get) => ({
 candidates: loadPersistedCandidates(),

 selectedCandidateId: null,
 isLoading: false,

 setLoading: (isLoading) => set({ isLoading }),

 setCandidates: (candidates) => {
 set({
 candidates,
 isLoading: false,
 });
 persistCandidates(candidates);
 },

 updateCandidate: (id, updatedCandidate) =>
 set((state) => {
 const updatedCandidates = state.candidates.map((candidate) =>
 candidate.id === id
 ? {
 ...candidate,
 ...updatedCandidate,
 updatedAt: new Date().toISOString(),
 stageUpdateAt:new Date().toISOString(),
 }
 : candidate
 );

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),

 deleteCandidate: (id) =>
 set((state) => {
 const updatedCandidates = state.candidates.filter(
 (candidate) => candidate.id !== id
 );

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),

 selectCandidate: (id) =>
 set({
 selectedCandidateId: id,
 }),

 clearSelectedCandidate: () =>
 set({
 selectedCandidateId: null,
 }),

 getCandidateById: (id) => {
 return get().candidates.find(
 (candidate) => candidate.id === id
 );
 },

 getFilteredCandidates: (filters) => {
 return get().candidates.filter((candidate) => {
 const matchStatus =
 !filters.status ||
 candidate.status === filters.status;

 const matchRole =
 !filters.role ||
 candidate.appliedRole === filters.role;

 const matchExperience =
 !filters.experience ||
 candidate.experience === filters.experience;

 const matchLocation =
 !filters.location ||
 candidate.location === filters.location;

 return (
 matchStatus &&
 matchRole &&
 matchExperience &&
 matchLocation
 );
 });
 },

 getCandidatesByStatus: (status) => {
 return get().candidates.filter(
 (candidate) => candidate.status === status
 );
 },

updateCandidateStatus: (id, status) =>
 set((state) => {
 const candidate = state.candidates.find(
 (candidate) => candidate.id === id
 );

 if (!candidate) {
 return state;
 }

 const remainingCandidates = state.candidates.filter(
 (candidate) => candidate.id !== id
 );

 const updatedCandidate = {
 ...candidate,
 status,
 updatedAt: new Date().toISOString(),
 };

 const updatedCandidates = [
 updatedCandidate,
 ...remainingCandidates,
 ];

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),
 addNote: (candidateId, note) =>
 set((state) => {
 const updatedCandidates = state.candidates.map((candidate) =>
 candidate.id === candidateId
 ? {
 ...candidate,
 notes: [
 {
 id: crypto.randomUUID(),
 author: note.author,
 date: new Date().toISOString(),
 content: note.content,
 },
 ...candidate.notes,
 ],
 }
 : candidate
 );

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),

 updateNote: (candidateId, noteId, content) =>
 set((state) => {
 const updatedCandidates = state.candidates.map((candidate) =>
 candidate.id !== candidateId
 ? candidate
 : {
 ...candidate,
 notes: candidate.notes.map((note) =>
 note.id === noteId
 ? {
 ...note,
 content,
 date: new Date().toISOString(),
 }
 : note
 ),
 }
 );

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),

deleteNote: (candidateId, noteId) =>
 set((state) => {
 const updatedCandidates = state.candidates.map((candidate) =>
 candidate.id !== candidateId
 ? candidate
 : {
 ...candidate,
 notes: candidate.notes.filter(
 (note) => note.id !== noteId
 ),
 }
 );

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),

 scheduleInterview: (candidateId, interview) =>
 set((state) => {
  const updatedCandidates: Candidate[] = state.candidates.map((candidate) =>
   candidate.id !== candidateId
    ? candidate
    : {
       ...candidate,
       status: "Interview",
       updatedAt: new Date().toISOString(),
       interviewHistory: [
        {
         id: crypto.randomUUID(),
         stage: interview.stage,
         interviewerId: interview.interviewerId,
         interviewerName: interview.interviewerName,
         date: interview.date,
         result: "Scheduled" as InterviewHistoryItem["result"],
         note: interview.note ?? "",
         feedback: "",
        },
        ...candidate.interviewHistory,
       ],
      }
  );

  persistCandidates(updatedCandidates);

  return {
   candidates: updatedCandidates,
   isLoading: false,
  };
 }),

 rescheduleInterview: (
 candidateId,
 interviewId,
 interview
) =>
 set((state) => {
  const updatedCandidates: Candidate[] = state.candidates.map((candidate) =>
   candidate.id !== candidateId
    ? candidate
    : {
       ...candidate,
       updatedAt: new Date().toISOString(),
       interviewHistory: candidate.interviewHistory.map((existingInterview) =>
        existingInterview.id === interviewId
         ? {
            ...existingInterview,
            stage: interview.stage,
            interviewerId: interview.interviewerId,
            interviewerName: interview.interviewerName,
            date: interview.date,
            note: interview.note ?? existingInterview.note,
           }
         : existingInterview
       ),
      }
  );

  persistCandidates(updatedCandidates);

  return {
   candidates: updatedCandidates,
   isLoading: false,
  };
 }),

 
completeInterview: (
 candidateId,
 interviewId,
 result,
 feedback
) =>
 set((state) => {
  const updatedCandidates = state.candidates.map((candidate) => {
   if (candidate.id !== candidateId) return candidate;

   const updatedInterviewHistory = candidate.interviewHistory.map((interview) =>
    interview.id === interviewId
     ? {
        ...interview,
        result,
        feedback,
       }
     : interview
   );

   const completedInterview = updatedInterviewHistory.find(
    (interview) => interview.id === interviewId
   );

   const readyForOffer =
    completedInterview?.stage === "Final" &&
    completedInterview.result === "Passed";

   return {
    ...candidate,
    readyForOffer,
    updatedAt: new Date().toISOString(),
    interviewHistory: updatedInterviewHistory,
   };
  });

  persistCandidates(updatedCandidates);

  return {
   candidates: updatedCandidates,
   isLoading: false,
  };
 }),


 
moveCandidateStage: (candidateId, status) =>
 set((state) => {
  const updatedCandidates: Candidate[] = state.candidates.map((candidate) =>
   candidate.id !== candidateId
    ? candidate
    : {
       ...candidate,
       status,
       updatedAt: new Date().toISOString(),
       hiredAt:
        status === "Hired"
         ? new Date().toISOString()
         : candidate.hiredAt,
      }
  );

  persistCandidates(updatedCandidates);

  return {
   candidates: updatedCandidates,
   isLoading: false,
  };
 }),



 rejectCandidate: (
 candidateId,
 reason,
 note
) =>
 set((state) => {
  const updatedCandidates: Candidate[] = state.candidates.map((candidate) =>
   candidate.id !== candidateId
    ? candidate
    : {
       ...candidate,
       status: "Rejected",
       rejection: {
        reason,
        note,
        date: new Date().toISOString(),
       },
       updatedAt: new Date().toISOString(),
      }
  );

  persistCandidates(updatedCandidates);

  return {
   candidates: updatedCandidates,
   isLoading: false,
  };
 }),

 cancelInterview: (candidateId, interviewId) =>
 set((state) => {
  const updatedCandidates: Candidate[] = state.candidates.map((candidate) => {
   if (candidate.id !== candidateId) return candidate;

   return {
    ...candidate,
    updatedAt: new Date().toISOString(),
    readyForOffer: false,
    interviewHistory: candidate.interviewHistory.map((interview) =>
     interview.id === interviewId
      ? {
         ...interview,
         result: "Cancelled" as InterviewHistoryItem["result"],
        }
      : interview
    ),
   };
  });

  persistCandidates(updatedCandidates);

  return {
   candidates: updatedCandidates,
   isLoading: false,
  };
 }),

clearCandidates: () =>
 set(() => {
 localStorage.removeItem("candidates");

 return {
 candidates: [],
 selectedCandidateId: null,
 isLoading: false,
 };
 }),



}));
