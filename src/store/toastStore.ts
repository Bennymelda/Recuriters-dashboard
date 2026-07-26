import { create } from "zustand";

type ToastType = "success" | "error" | "info";

interface ToastState {
 open: boolean;
 message: string;
 type: ToastType;

 showToast: (message: string, type?: ToastType) => void;
 hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
 open: false,
 message: "",
 type: "success",

 showToast: (message, type = "success") => {
 set({
 open: true,
 message,
 type,
 });

 setTimeout(() => {
 set({ open: false });
 }, 3000);
 },

 hideToast: () => set({ open: false }),
}));