import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
 theme: Theme;
 toggleTheme: () => void;
 setTheme: (theme: Theme) => void;
}

const getInitialTheme = (): Theme => {
 if (typeof window === "undefined") return "light";

 const saved = localStorage.getItem("theme") as Theme | null;
 return saved ?? "light";
};

const applyTheme = (theme: Theme) => {
 document.documentElement.classList.toggle(
 "dark",
 theme === "dark"
 );
};

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

export const useThemeStore = create<ThemeStore>((set, get) => ({
 theme: initialTheme,

 toggleTheme: () => {
 const next = get().theme === "light" ? "dark" : "light";

 localStorage.setItem("theme", next);
 applyTheme(next);

 set({ theme: next });
 },

 setTheme: (theme) => {
 localStorage.setItem("theme", theme);
 applyTheme(theme);
 set({ theme });
 },
}));