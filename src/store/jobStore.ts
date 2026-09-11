import { create } from "zustand";
import { jobs as initialJobs } from "../data/jobs";
import type { Job } from "../types/job";

import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";
const STORAGE_KEY = "careerflow-jobs";

interface JobStore {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  fetchJobs: () => Promise<void>;
  addJob: (job: Job) => Promise<void>;
  updateJob: (id: string, updatedJob: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
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
    const jobMap = new Map(
      (initialJobs as Job[]).map((job) => [job.id, job])
    );
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return Array.from(jobMap.values());

    const parsed = JSON.parse(saved) as Partial<{ jobs: Job[] }>;
    if (Array.isArray(parsed.jobs)) {
      parsed.jobs.forEach((job) => {
        if (job.id) jobMap.set(job.id, job);
      });
    }

    return Array.from(jobMap.values());
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

  fetchJobs: async () => {
    try {
      const snapshot = await getDocs(collection(db, "jobs"));
      const firebaseJobs = snapshot.docs.map((docSnap) => ({
        ...(docSnap.data() as Job),
        id: docSnap.id,
      }));
      const jobMap = new Map(
        (initialJobs as Job[]).map((job) => [job.id, job])
      );

      get().jobs.forEach((job) => jobMap.set(job.id, job));
      firebaseJobs.forEach((job) => jobMap.set(job.id, job));

      const jobs = Array.from(jobMap.values());

      persistJobs(jobs);
      set({ jobs });
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  },

  addJob: async (job) => {
    try {
      await setDoc(doc(db, "jobs", job.id), job);

      set((state) => {
        const nextJobs = [...state.jobs, job];
        persistJobs(nextJobs);
        return { jobs: nextJobs };
      });
    } catch (error) {
      console.error("Failed to save job to Firebase:", error);
      throw error;
    }
  },

  updateJob: async (id, updatedJob) => {
    try {
      await updateDoc(doc(db, "jobs", id), updatedJob as Record<string, unknown>);

      set((state) => {
        const nextJobs = state.jobs.map((job) =>
          job.id === id ? { ...job, ...updatedJob } : job
        );
        persistJobs(nextJobs);
        return { jobs: nextJobs };
      });
    } catch (error) {
      console.error("Failed to update job:", error);
      throw error;
    }
  },
/*
  deleteJob: async (id) => {
    try {
      await deleteDoc(doc(db, "jobs", id));

      set((state) => {
        const nextJobs = state.jobs.filter((job) => job.id !== id);
        persistJobs(nextJobs);
        return { jobs: nextJobs };
      });
    } catch (error) {
      console.error("Failed to delete job:", error);
      throw error;
    }
  },
*/

deleteJob: async (id) => {
  try {
    // Find all candidates belonging to this job
    const candidatesQuery = query(
      collection(db, "candidates"),
      where("jobId", "==", id)
    );

    const candidatesSnapshot = await getDocs(candidatesQuery);

    // Delete all related candidates from Firestore
    await Promise.all(
      candidatesSnapshot.docs.map((candidateDoc) =>
        deleteDoc(candidateDoc.ref)
      )
    );

    // Delete the job from Firestore
    await deleteDoc(doc(db, "jobs", id));

    // Remove the job from local state
    set((state) => {
      const nextJobs = state.jobs.filter(
        (job) => job.id !== id
      );

      persistJobs(nextJobs);

      return {
        jobs: nextJobs,
      };
    });

    console.log(
      `✅ Job ${id} and ${candidatesSnapshot.size} related candidate(s) deleted.`
    );
  } catch (error) {
    console.error(
      "Failed to delete job and related candidates:",
      error
    );

    throw error;
  }
},

  duplicateJob: (id) => {
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
    });
  },

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

  clearJobs: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    set(() => ({ jobs: [] }));
  },
}));