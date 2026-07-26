import { create } from "zustand";

export type ToastType =
 | "success"
 | "error"
 | "warning"
 | "info";

export interface Toast {
 id: string;
 type: ToastType;
 title: string;
 message?: string;
}

interface ToastStore {
 toasts: Toast[];

 showToast: (toast: Omit<Toast, "id">) => void;

 removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
 toasts: [],

 showToast: (toast) =>
 set((state) => ({
 toasts: [
 ...state.toasts,
 {
 id: crypto.randomUUID(),
 ...toast,
 },
 ],
 })),

 removeToast: (id) =>
 set((state) => ({
 toasts: state.toasts.filter(
 (toast) => toast.id !== id
 ),
 })),
}));