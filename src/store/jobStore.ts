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
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";
const STORAGE_KEY = "careerflow-jobs";

interface JobStore {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  fetchJobs: () => Promise<void>;
  subscribeToJobs: () => () => void;
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

      set((state) => {
        const jobMap = new Map<string, Job>();

        // 1. Initial mock jobs
        (initialJobs as Job[]).forEach((job) => jobMap.set(job.id, job));

        // 2. Local state / persisted jobs
        state.jobs.forEach((job) => jobMap.set(job.id, job));

        // 3. Firestore jobs
        firebaseJobs.forEach((job) => jobMap.set(job.id, job));

        const jobs = Array.from(jobMap.values());
        persistJobs(jobs);
        return { jobs };
      });
    } catch (error) {
      console.warn("Failed to fetch jobs from Firebase (using local storage):", error);
    }
  },

  subscribeToJobs: () => {
    try {
      const unsub = onSnapshot(
        collection(db, "jobs"),
        (snapshot) => {
          const firebaseJobs = snapshot.docs.map((docSnap) => ({
            ...(docSnap.data() as Job),
            id: docSnap.id,
          }));

          set((state) => {
            const jobMap = new Map<string, Job>();

            (initialJobs as Job[]).forEach((job) => jobMap.set(job.id, job));
            state.jobs.forEach((job) => jobMap.set(job.id, job));
            firebaseJobs.forEach((job) => jobMap.set(job.id, job));

            const jobs = Array.from(jobMap.values());
            persistJobs(jobs);
            return { jobs };
          });
        },
        (error) => {
          console.warn("Firestore jobs realtime listener error:", error);
        }
      );

      return unsub;
    } catch (error) {
      console.warn("Failed to initialize jobs listener:", error);
      return () => {};
    }
  },

  addJob: async (job) => {
    // 1. Optimistic update: instantly save to local state and localStorage
    // This ensures the job is immediately visible and counted regardless of Firebase network/rules
    set((state) => {
      const existingIndex = state.jobs.findIndex((j) => j.id === job.id);
      let nextJobs: Job[];
      if (existingIndex >= 0) {
        nextJobs = state.jobs.map((j) => (j.id === job.id ? job : j));
      } else {
        nextJobs = [job, ...state.jobs];
      }
      persistJobs(nextJobs);
      return { jobs: nextJobs };
    });

    // 2. Persist to Firestore
    try {
      await setDoc(doc(db, "jobs", job.id), job);
      console.log(`✅ Job ${job.id} synced to Firestore.`);
    } catch (error) {
      console.warn("Failed to sync job to Firestore (kept locally in storage):", error);
    }
  },

  updateJob: async (id, updatedJob) => {
    // 1. Optimistic update
    set((state) => {
      const nextJobs = state.jobs.map((job) =>
        job.id === id ? { ...job, ...updatedJob } : job
      );
      persistJobs(nextJobs);
      return { jobs: nextJobs };
    });

    // 2. Sync to Firestore
    try {
      await updateDoc(doc(db, "jobs", id), updatedJob as Record<string, unknown>);
    } catch (error) {
      console.warn("Failed to update job in Firestore (updated locally):", error);
    }
  },

  deleteJob: async (id) => {
    // 1. Optimistic local removal
    set((state) => {
      const nextJobs = state.jobs.filter((job) => job.id !== id);
      persistJobs(nextJobs);
      return { jobs: nextJobs };
    });

    // 2. Remove from Firestore
    try {
      const candidatesQuery = query(
        collection(db, "candidates"),
        where("jobId", "==", id)
      );

      const candidatesSnapshot = await getDocs(candidatesQuery);

      await Promise.all(
        candidatesSnapshot.docs.map((candidateDoc) =>
          deleteDoc(candidateDoc.ref)
        )
      );

      await deleteDoc(doc(db, "jobs", id));
      console.log(`✅ Job ${id} and candidates deleted from Firestore.`);
    } catch (error) {
      console.warn("Failed to delete job from Firestore (deleted locally):", error);
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

      const nextJobs = [duplicatedJob, ...state.jobs];
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

// Automatically fetch latest jobs from Firestore in background when running in browser
if (typeof window !== "undefined") {
  setTimeout(() => {
    useJobStore.getState().fetchJobs().catch(() => {});
  }, 100);
}