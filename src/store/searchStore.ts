import { create } from "zustand";

const STORAGE_KEY = "careerflow-search";

interface SearchStore {
 query: string;

 setQuery: (query: string) => void;

 clearQuery: () => void;
}

const loadPersistedQuery = (): string => {
 if (typeof window === "undefined") return "";

 try {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved ?? "";
 } catch {
  return "";
 }
};

const persistQuery = (query: string) => {
 if (typeof window === "undefined") return;

 try {
  window.localStorage.setItem(STORAGE_KEY, query);
 } catch {
  // Ignore storage errors so the app still works offline.
 }
};

export const useSearchStore = create<SearchStore>((set) => ({
 query: loadPersistedQuery(),

 setQuery: (query) => {
  persistQuery(query);
  set({ query });
 },

 clearQuery: () => {
  persistQuery("");
  set({ query: "" });
 },
}));