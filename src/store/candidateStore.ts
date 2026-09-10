import { create } from "zustand";
import { candidates as initialCandidates } from "../data/candidates";
import type { Candidate, InterviewHistoryItem, InterviewStage } from "../types/candidate";
import {
 collection,
 doc,
 setDoc,
 getDocs,
getDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import { useAuthStore } from "./authStore";
import type { TeamRole } from "../types/team";
const STORAGE_KEY = "careerflow-candidates";
const STORAGE_VERSION = 3;

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
 // Always start with initialCandidates as base (Map by ID)
 const candidateMap = new Map(
 (initialCandidates as Candidate[]).map((c) => [c.id, c])
 );

 const saved = window.localStorage.getItem(STORAGE_KEY);
 if (!saved) return Array.from(candidateMap.values());

 const parsed = JSON.parse(saved) as Partial<PersistedCandidateState> | Candidate[];

 if (Array.isArray(parsed)) {
 window.localStorage.removeItem(STORAGE_KEY);
 return Array.from(candidateMap.values());
 }

    if (parsed.version === STORAGE_VERSION && Array.isArray(parsed.candidates)) {
      // Process persisted candidates
      const processedCandidates = parsed.candidates.map((c) => ({
        ...c,
        source:
          c.source ||
          candidateMap.get(c.id)?.source ||
          "LinkedIn",
        hiredAt:
          c.status === "Hired"
            ? c.hiredAt || c.updatedAt || c.stageUpdatedAt || new Date().toISOString()
            : c.hiredAt,
      })) as Candidate[];
      
      // Override initialCandidates with persisted changes (preserves initial data + updates)
      processedCandidates.forEach((c) => {
        if (c.id) {
          candidateMap.set(c.id, c);
        }
      });
      
      return Array.from(candidateMap.values());
    }

 window.localStorage.removeItem(STORAGE_KEY);
 return Array.from(candidateMap.values());
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
fetchCandidates: () => Promise<void>;


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
addCandidate: (candidate: Candidate) => Promise<void>;


 getCandidateById: (id: string) => Candidate | undefined;
addNote: (
 candidateId: string,
 note: {
 author: string;
 content: string;
 authorRole:TeamRole;
 authorId: string;
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

requestHiringApproval: (candidateId: string) => void;
approveHiring: (candidateId: string, note?: string) => void;
rejectHiring: (candidateId: string, note?: string) => void;

createOffer: (
 candidateId: string,
 salary: number,
 startDate: string,
 employmentType: string,
 
 description:string,
) => void;

approveOffer: (candidateId: string) => void;

rejectOffer: (candidateId: string, note?: string) => void;

 sendOffer: (candidateId: string) => Promise<boolean>;

acceptOffer: (candidateId: string) => Promise<void>;

declineOffer: (candidateId: string, note?: string) => Promise<void>;
}

const removeUndefined = <T extends Record<string, any>>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as T;
};
export const useCandidateStore = create<CandidateStore>((set, get) => ({
 candidates: loadPersistedCandidates(),

 selectedCandidateId: null,
 isLoading: false,

 setLoading: (isLoading) => set({ isLoading }),
fetchCandidates: async () => {
 set({ isLoading: true });

 try {
 const snapshot = await getDocs(
 collection(db, "candidates")
 );

 const firebaseCandidates = snapshot.docs.map((docSnap) => ({
 ...(docSnap.data() as Candidate),
 id: docSnap.id,
 }));

 set((state) => {
 // Use Map to merge: initialCandidates (base) + state.candidates (local changes) + firebaseCandidates (remote)
 // This ensures initialCandidates are always present and duplicates are prevented by ID
 const candidateMap = new Map(
 (initialCandidates as Candidate[]).map((c) => [c.id, c])
 );

 // Override with current state (preserves any local changes like status updates, notes)
 state.candidates.forEach((c) => {
 if (c.id) {
 candidateMap.set(c.id, c);
 }
 });

 // Override with Firestore candidates (latest remote data)
 firebaseCandidates.forEach((c) => {
 if (c.id) {
 candidateMap.set(c.id, c);
 }
 });

 const mergedCandidates = Array.from(candidateMap.values());

 persistCandidates(mergedCandidates);

 return {
 candidates: mergedCandidates,
 isLoading: false,
 };
 });
 } catch (error) {
 console.error(
 "Failed to fetch candidates from Firebase:",
 error
 );

 set({ isLoading: false });
 }
},

 setCandidates: (candidates) => {
 set({
 candidates,
 isLoading: false,
 });
 persistCandidates(candidates);
 },


addCandidate: async (candidate) => {
 try {
 await setDoc(
 doc(db, "candidates", candidate.id),
 candidate
 );

 set((state) => {
 const newCandidates = [
 ...state.candidates,
 candidate,
 ];

 persistCandidates(newCandidates);

 return {
 candidates: newCandidates,
 isLoading: false,
 };
 });
 } catch (error) {
 console.error(
 "Failed to save candidate to Firebase:",
 error
 );

 throw error;
 }
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
    hiredAt:
      status === "Hired"
        ? candidate.hiredAt || new Date().toISOString()
        : candidate.hiredAt,
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
 authorRole:note.authorRole,
 authorId: note.authorId,
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
 const currentUser = useAuthStore.getState().user;

 if (!currentUser) {
 return state;
 }

 const candidate = state.candidates.find(
 (candidate) => candidate.id === candidateId
 );

 if (!candidate) {
 return state;
 }

 const note = candidate.notes.find(
 (note) => note.id === noteId
 );

 if (!note) {
 return state;
 }

 // Only the person who created the note can edit it
 if (note.authorId !== currentUser.id) {
 return state;
 }

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
 const currentUser = useAuthStore.getState().user;

 if (!currentUser) {
 return state;
 }

 const candidate = state.candidates.find(
 (candidate) => candidate.id === candidateId
 );

 if (!candidate) {
 return state;
 }

 const note = candidate.notes.find(
 (note) => note.id === noteId
 );

 if (!note) {
 return state;
 }

 // Only the person who created the note can delete it
 if (note.authorId !== currentUser.id) {
 return state;
 }

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


 /*
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
*/
moveCandidateStage: (candidateId, status) =>
 set((state) => {
 const currentUser = useAuthStore.getState().user;

 if (!currentUser) {
 return state;
 }

 // Only Recruiters can manually move candidates
 if (currentUser.role !== "Recruiter") {
 return state;
 }

 const candidate = state.candidates.find(
 (candidate) => candidate.id === candidateId
 );

 if (!candidate) {
 return state;
 }

 // Hired candidates cannot be moved
 if (candidate.status === "Hired") {
 return state;
 }

 // Normal pipeline movement must be sequential
 const allowedNextStages: Partial<
 Record<Candidate["status"], Candidate["status"][]>
 > = {
 Applied: ["Screening"],
 Screening: ["Interview"],
 };

 const allowedStages = allowedNextStages[candidate.status] ?? [];

 // Hired has a separate workflow requirement
 if (status === "Hired") {
 if (candidate.offer?.status !== "Accepted") {
 return state;
 }
 }
 // Offer can only happen after Hiring Manager approval
 else if (status === "Offer") {
 if (candidate.hiringApproval?.status !== "Approved") {
 return state;
 }
 }
 // Interview cannot be manually moved to Offer
 else if (
 candidate.status === "Interview" &&
 status !== "Rejected" &&
 !allowedStages.includes(status)
 ) {
 return state;
 }
 // Applied/Screening can only move to their next stage
 else if (
 candidate.status in allowedNextStages &&
 status !== "Rejected" &&
 !allowedStages.includes(status)
 ) {
 return state;
 }

 const now = new Date().toISOString();

 const updatedCandidates: Candidate[] = state.candidates.map(
 (candidate) =>
 candidate.id !== candidateId
 ? candidate
 : {
 ...candidate,
 status,
 updatedAt: now,
 stageUpdatedAt: now,

 hiredAt:
 status === "Hired"
 ? candidate.hiredAt || now
 : candidate.hiredAt,

 hiredBy:
 status === "Hired"
 ? currentUser.id
 : candidate.hiredBy,

 hiredByName:
 status === "Hired"
 ? currentUser.fullName
 : candidate.hiredByName,
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
       status: "Rejected" as const,
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


requestHiringApproval: (candidateId) =>
 set((state) => {
 const currentUser = useAuthStore.getState().user;

 if (!currentUser) {
 return state;
 }

 const candidate = state.candidates.find(
 (candidate) => candidate.id === candidateId
 );

 if (!candidate) {
 return state;
 }

 // Only Recruiters can request hiring approval
 if (currentUser.role !== "Recruiter") {
 return state;
 }

 // Candidate must have passed the Final interview
 const finalInterview = candidate.interviewHistory.find(
 (interview) => interview.stage === "Final"
 );
console.log("CANDIDATE BEFORE APPROVAL:", candidate);
console.log("INTERVIEW HISTORY:", candidate.interviewHistory);
 if (!finalInterview || finalInterview.result !== "Passed") {
 return state;
 }

 // Don't request approval if already pending or approved
 if (
 candidate.hiringApproval?.status === "Pending" ||
 candidate.hiringApproval?.status === "Approved"
 ) {
 return state;
 }

 const now = new Date().toISOString();

 const updatedCandidates = state.candidates.map((candidate) =>
 candidate.id !== candidateId
 ? candidate
 : {
 ...candidate,

 // Candidate remains in the Interview column
 status: "Interview" as const,

 hiringApproval: {
 status: "Pending" as const,
 requestedBy: currentUser.id,
 requestedByName: currentUser.fullName,
 },

 updatedAt: now,
 }
 );

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),

approveHiring: (candidateId, note) =>
 set((state) => {
 const currentUser = useAuthStore.getState().user;

 if (!currentUser) {
 return state;
 }

 const candidate = state.candidates.find(
 (candidate) => candidate.id === candidateId
 );

 if (!candidate) {
 return state;
 }

 // Only Hiring Managers can approve
 if (currentUser.role !== "Hiring Manager") {
 return state;
 }

 // There must be a pending approval
 if (candidate.hiringApproval?.status !== "Pending") {
 return state;
 }

 const now = new Date().toISOString();

 const updatedCandidates = state.candidates.map((candidate) =>
 candidate.id !== candidateId
 ? candidate
 : {
 ...candidate,

 // Keep the candidate in the Interview column.
 status: "Interview" as const,

 hiringApproval: {
 ...candidate.hiringApproval!,
 status: "Approved" as const,
 reviewedBy: currentUser.id,
 reviewedByName: currentUser.fullName,
 reviewedAt: now,
 note,
 },

 updatedAt: now,
 }
 );

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),

rejectHiring: (candidateId, note) =>
 set((state) => {
 const currentUser = useAuthStore.getState().user;

 if (!currentUser) {
 return state;
 }

 const candidate = state.candidates.find(
 (candidate) => candidate.id === candidateId
 );

 if (!candidate) {
 return state;
 }

 // Only Hiring Managers can reject at this approval point
 if (currentUser.role !== "Hiring Manager") {
 return state;
 }

 // There must be a pending approval
 if (candidate.hiringApproval?.status !== "Pending") {
 return state;
 }

 const now = new Date().toISOString();

 const updatedCandidates = state.candidates.map((candidate) =>
 candidate.id !== candidateId
 ? candidate
 : {
 ...candidate,

 // Rejection is still a terminal pipeline status.
 status: "Rejected" as const,

 hiringApproval: {
 ...candidate.hiringApproval!,
 status: "Rejected" as const,
 reviewedBy: currentUser.id,
 reviewedByName: currentUser.fullName,
 reviewedAt: now,
 note,
 },

 rejection: {
 reason: "Hiring Manager rejected candidate",
 note: note ?? "",
 date: now,
 },

 updatedAt: now,
 stageUpdatedAt: now,
 }
 );

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),


 createOffer: (candidateId, salary, startDate, employmentType, description,) =>
 set((state) => {
 const currentUser = useAuthStore.getState().user;

 if (!currentUser) {
 return state;
 }

 const candidate = state.candidates.find(
 (candidate) => candidate.id === candidateId
 );

 if (!candidate) {
 return state;
 }

 // Only Recruiters can create offers
 if (currentUser.role !== "Recruiter") {
 return state;
 }

 // Candidate must have Hiring Manager approval while remaining in Interview.
 if (
 candidate.status !== "Interview" ||
 candidate.hiringApproval?.status !== "Approved"
 ) {
 return state;
 }

 const now = new Date().toISOString();
console.log("CREATE OFFER DATA:", {
 candidateId,
 salary,
 startDate,
 employmentType,
 description,
 companyName: currentUser.companyName,
 createdBy: currentUser.id,
 createdByName: currentUser.fullName,
});
 const updatedCandidates: Candidate[] =
 state.candidates.map((candidate) =>
 candidate.id !== candidateId
 ? candidate
 : {
 ...candidate,
 
 offer: {
  id:crypto.randomUUID(),
 status: "Pending HR Approval" as const,
 salary,
 startDate,

 description,
 employmentType,
 createdBy: currentUser.id,
 createdByName: currentUser.fullName,
  companyName: currentUser.companyName,
 },
 
 updatedAt: now,
 }
 );



console.log("UPDATED CANDIDATE:", updatedCandidates);

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),

approveOffer: (candidateId) =>
 set((state) => {
 const currentUser = useAuthStore.getState().user;

 if (!currentUser) {
 return state;
 }

 const candidate = state.candidates.find(
 (candidate) => candidate.id === candidateId
 );

 if (!candidate) {
 return state;
 }

 // Only HR Managers can approve offers
 if (currentUser.role !== "HR Manager") {
 return state;
 }

 if (candidate.offer?.status !== "Pending HR Approval") {
 return state;
 }

 const now = new Date().toISOString();

 const updatedCandidates: Candidate[] =
 state.candidates.map((candidate) =>
 candidate.id !== candidateId
 ? candidate
 : {
 ...candidate,
 offer: {
 ...candidate.offer!,
 status: "Approved" as const,
 approvedBy: currentUser.id,
 approvedByName: currentUser.fullName,
 approvedAt: now,
 },
 updatedAt: now,
 }
 );

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),

rejectOffer: (candidateId, note) =>
 set((state) => {
 const currentUser = useAuthStore.getState().user;

 if (!currentUser) {
 return state;
 }

 const candidate = state.candidates.find(
 (candidate) => candidate.id === candidateId
 );

 if (!candidate) {
 return state;
 }

 // Only HR Managers can reject offers
 if (currentUser.role !== "HR Manager") {
 return state;
 }

 if (candidate.offer?.status !== "Pending HR Approval") {
 return state;
 }

 const now = new Date().toISOString();

 const updatedCandidates: Candidate[] =
 state.candidates.map((candidate) =>
 candidate.id !== candidateId
 ? candidate
 : {
 ...candidate,
 offer: {
 ...candidate.offer!,
 status: "Draft" as const,
 },
 rejection: {
 reason: "Offer rejected by HR",
 note: note ?? "",
 date: now,
 },
 updatedAt: now,
 }
 );

 persistCandidates(updatedCandidates);

 return {
 candidates: updatedCandidates,
 isLoading: false,
 };
 }),
sendOffer: async (candidateId) => {
 console.log("🧪 DUMMY SEND OFFER FUNCTION CALLED", candidateId);

 const currentUser = useAuthStore.getState().user;

 if (!currentUser) {
 return false;
 }

 // Only Recruiters can send offers
 if (currentUser.role !== "Recruiter") {
 return false;
 }

 const candidate = get().candidates.find(
 (candidate) => candidate.id === candidateId
 );

 if (!candidate) {
 return false;
 }

 // Offer must have HR approval
 if (candidate.offer?.status !== "Approved") {
 return false;
 }

 if (!candidate.offer.id) {
 console.error("Cannot send offer: offer ID is missing.");
 return false;
 }

 try {
 // 🧪 DUMMY EMAIL SEND


 // Give the dummy request a small delay
 // so the "Sending..." state can be seen.
 await new Promise((resolve) => setTimeout(resolve, 1000));

 const now = new Date().toISOString();

 const updatedCandidate: Candidate = {
 ...candidate,
 status: "Offer",
 offer: {
 ...candidate.offer,
 status: "Sent",
 sentAt: now,
 },
 updatedAt: now,
 stageUpdatedAt: now,
 };
const cleanCandidate = removeUndefined(updatedCandidate);

await setDoc(
  doc(db, "candidates", updatedCandidate.id),
  cleanCandidate
);
 const updatedCandidates = get().candidates.map((candidate) =>
 candidate.id === candidateId
 ? updatedCandidate
 : candidate
 );

 persistCandidates(updatedCandidates);

 set({
 candidates: updatedCandidates,
 isLoading: false,
 });

 console.log(
 "✅ Dummy offer sent successfully."
 );

 return true;
 } catch (error) {
 console.error("Dummy offer error:", error);

 return false;
 }
},




acceptOffer: async (candidateId) => {
 const candidateRef = doc(db, "candidates", candidateId);

 const candidateSnapshot = await getDoc(candidateRef);

 if (!candidateSnapshot.exists()) {
 return;
 }

 const candidate: Candidate = {
 ...(candidateSnapshot.data() as Candidate),
 id: candidateSnapshot.id,
 };

 // The offer must have been sent
 if (candidate.offer?.status !== "Sent") {
 return;
 }

 const now = new Date().toISOString();

 const updatedCandidate: Candidate = {
 ...candidate,
 status: "Hired",
 offer: {
 ...candidate.offer,
 status: "Accepted",
 respondedAt: now,
 },
 hiredAt: now,
 updatedAt: now,
 stageUpdatedAt: now,
 };

 const cleanCandidate = removeUndefined(updatedCandidate);

 await setDoc(candidateRef, cleanCandidate);

 const updatedCandidates = get().candidates.map((candidate) =>
 candidate.id === candidateId ? updatedCandidate : candidate
 );

 persistCandidates(updatedCandidates);

 set({
 candidates: updatedCandidates,
 isLoading: false,
 });
},
declineOffer: async (candidateId, note) => {
  const candidate = get().candidates.find(
    (candidate) => candidate.id === candidateId
  );

  if (!candidate) {
    return;
  }

  // The offer must have been sent
  if (candidate.offer?.status !== "Sent") {
    return;
  }

  const now = new Date().toISOString();

  const updatedCandidate: Candidate = {
    ...candidate,
    status: "Offer Declined",
    offer: {
      ...candidate.offer,
      status: "Declined",
      respondedAt: now,
    },
    rejection: note
      ? {
          reason: "Candidate declined offer",
          note,
          date: now,
        }
      : candidate.rejection,
    updatedAt: now,
    stageUpdatedAt: now,
  };

  const cleanCandidate = removeUndefined(updatedCandidate);

  await setDoc(
    doc(db, "candidates", candidateId),
    cleanCandidate
  );

  const updatedCandidates = get().candidates.map((candidate) =>
    candidate.id === candidateId ? updatedCandidate : candidate
  );

  persistCandidates(updatedCandidates);

  set({
    candidates: updatedCandidates,
    isLoading: false,
  });
},

}));
