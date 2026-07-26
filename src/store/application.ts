import { create } from "zustand";
import { applications as initialApplications } from "../data/applicatons";

type Status =
 | "Applied"
 | "Screening"
 | "Interview"
 | "Offer"
 | "Hired"
 | "Rejected";

interface Application {
 id: string;
 jobId: string;
 candidateId: string;
 status: Status;
 matchScore: number;
 appliedAt: string;
 updatedAt: string;
}

interface ApplicationStore {
 applications: Application[];

 updateStatus: (id: string, status: Status) => void;

 getByJob: (jobId: string) => Application[];
 getByCandidate: (candidateId: string) => Application[];
}

const STORAGE_KEY = "careerflow-applications";

const loadPersistedApplications = (): Application[] => {
 if (typeof window === "undefined") return initialApplications as unknown as Application[];

 try {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return initialApplications as unknown as Application[];

  const parsed = JSON.parse(saved) as Partial<{ applications: Application[] }>;
  return Array.isArray(parsed.applications)
   ? (parsed.applications as Application[])
   : (initialApplications as unknown as Application[]);
 } catch {
  return initialApplications as unknown as Application[];
 }
};

const persistApplications = (applications: Application[]) => {
 if (typeof window === "undefined") return;

 try {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ applications }));
 } catch {
  // Ignore storage errors so the app still works offline.
 }
};

export const useApplicationStore = create<ApplicationStore>((set, get) => ({
 applications: loadPersistedApplications(),

 updateStatus: (id, status) =>
 set((state) => {
  const nextApplications = state.applications.map((app) =>
   app.id === id ? { ...app, status, updatedAt: new Date().toISOString() } : app
  );
  persistApplications(nextApplications);
  return { applications: nextApplications };
 }),

 getByJob: (jobId) => get().applications.filter((a) => a.jobId === jobId),

 getByCandidate: (candidateId) => get().applications.filter((a) => a.candidateId === candidateId),
}));