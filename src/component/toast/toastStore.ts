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
 open: boolean;
 message: string;
 type: ToastType;

 showToast: (
  toast: string | Omit<Toast, "id">,
  fallbackType?: ToastType
 ) => void;
 hideToast: () => void;
 removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
 toasts: [],
 open: false,
 message: "",
 type: "success",

 showToast: (toast, fallbackType = "success") => {
  const payload =
   typeof toast === "string"
    ? { type: fallbackType, title: toast, message: "" }
    : { ...toast, type: toast.type ?? fallbackType };

  const toastItem: Toast = {
   id: crypto.randomUUID(),
   type: payload.type,
   title: payload.title,
   message: payload.message,
  };

  set((state) => ({
   open: true,
   message: toastItem.message || toastItem.title,
   type: toastItem.type,
   toasts: [...state.toasts, toastItem],
  }));
 },

 hideToast: () =>
  set(() => ({
   open: false,
   message: "",
  })),

 removeToast: (id) =>
  set((state) => ({
   toasts: state.toasts.filter((toast) => toast.id !== id),
   open: state.toasts.length <= 1 ? false : state.open,
  })),
}));