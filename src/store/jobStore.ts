import { create } from "zustand";
import { jobs as initialJobs } from "../data/jobs";
import type { Job } from "../types/job";

const STORAGE_KEY = "careerflow-jobs";

interface JobStore {
  jobs: Job[];

  setJobs: (jobs: Job[]) => void;
  addJob: (job: Job) => void;
  updateJob: (id: string, updatedJob: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  duplicateJob: (id: string) => void;
clearJobs: () => void;
  getActiveJobs: () => Job[];
  getFilteredJobs: (filters: {
    status?: string;
    department?: string;
    experience?: string;
    location?: string;
  }) => Job[];
}

const loadPersistedJobs = (): Job[] => {
  if (typeof window === "undefined") return initialJobs as Job[];

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialJobs as Job[];

    const parsed = JSON.parse(saved) as Partial<{ jobs: Job[] }>;
    return Array.isArray(parsed.jobs) ? parsed.jobs : (initialJobs as Job[]);
  } catch {
    return initialJobs as Job[];
  }
};

const persistJobs = (jobs: Job[]) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ jobs }));
  } catch {
    // Ignore storage errors so the app still works offline.
  }
};

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: loadPersistedJobs(),

  setJobs: (jobs) => {
    persistJobs(jobs);
    set({ jobs });
  },

  addJob: (job) =>
    set((state) => {
      const nextJobs = [...state.jobs, job];
      persistJobs(nextJobs);
      return { jobs: nextJobs };
    }),

  updateJob: (id, updatedJob) =>
    set((state) => {
      const nextJobs = state.jobs.map((job) =>
        job.id === id ? { ...job, ...updatedJob } : job
      );
      persistJobs(nextJobs);
      return { jobs: nextJobs };
    }),

  deleteJob: (id) =>
    set((state) => {
      const nextJobs = state.jobs.filter((job) => job.id !== id);
      persistJobs(nextJobs);
      return { jobs: nextJobs };
    }),

  duplicateJob: (id) =>
    set((state) => {
      const job = state.jobs.find((job) => job.id === id);

      if (!job) return state;

      const duplicatedJob: Job = {
        ...job,
        id: `job_${Date.now()}`,
        title: `${job.title} (Copy)`,
        status: "Draft",
        createdAt: new Date().toISOString(),
      };

      const nextJobs = [...state.jobs, duplicatedJob];
      persistJobs(nextJobs);
      return { jobs: nextJobs };
    }),

  getActiveJobs: () => {
    return get().jobs.filter((job) => job.status === "Active");
  },

  getFilteredJobs: (filters) => {
    return get().jobs.filter((job) => {
      const matchStatus = !filters.status || job.status === filters.status;
      const matchDepartment =
        !filters.department || job.department === filters.department;
      const matchExperience =
        !filters.experience || job.experienceLevel === filters.experience;
      const matchLocation =
        !filters.location || job.location === filters.location;

      return (
        matchStatus &&
        matchDepartment &&
        matchExperience &&
        matchLocation
      );
    });
  },

  clearJobs: () =>
 set(() => {
 localStorage.removeItem(STORAGE_KEY);

 return {
 jobs: [],
 
 };
 }),


}));
