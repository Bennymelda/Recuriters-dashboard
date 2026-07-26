import { useEffect } from "react";
import { motion } from "framer-motion";
import {
 MdCheckCircle,
 MdError,
 MdWarning,
 MdInfo,
 MdClose,
} from "react-icons/md";
import { useToastStore, type Toast as ToastType } from "./toastStore";

interface ToastProps {
 toast: ToastType;
}

const toastStyles = {
 success: {
 icon: MdCheckCircle,
 iconColor: "text-[#285A48] dark:text-[#B0E4CC]",
 border: "border-[#285A48]/20 dark:border-[#B0E4CC]/20",
 bg: "bg-white dark:bg-zinc-900",
 },

 error: {
 icon: MdError,
 iconColor: "text-red-600 dark:text-red-400",
 border: "border-red-200 dark:border-red-500/20",
 bg: "bg-white dark:bg-zinc-900",
 },

 warning: {
 icon: MdWarning,
 iconColor: "text-amber-600 dark:text-amber-400",
 border: "border-amber-200 dark:border-amber-500/20",
 bg: "bg-white dark:bg-zinc-900",
 },

 info: {
 icon: MdInfo,
 iconColor: "text-blue-600 dark:text-blue-400",
 border: "border-blue-200 dark:border-blue-500/20",
 bg: "bg-white dark:bg-zinc-900",
 },
};

const Toast = ({ toast }: ToastProps) => {
 const removeToast = useToastStore((state) => state.removeToast);

 const style = toastStyles[toast.type];
 const Icon = style.icon;

 useEffect(() => {
 const timer = setTimeout(() => {
 removeToast(toast.id);
 }, 4000);

 return () => clearTimeout(timer);
 }, [toast.id, removeToast]);

 return (
 <motion.div
 initial={{ opacity: 0, x: 80 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: 80 }}
 transition={{ duration: 0.25 }}
 className={`
 w-[360px]
 rounded-2xl
 border
 p-4
 shadow-xl
 ${style.border}
 ${style.bg}
 `}
 >
 <div className="flex items-start gap-3">
 <Icon size={24} className={style.iconColor} />

 <div className="flex-1">
 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {toast.title}
 </h3>

 {toast.message && (
 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 {toast.message}
 </p>
 )}
 </div>

 <button onClick={() => removeToast(toast.id)}>
 <MdClose
 size={18}
 className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
 />
 </button>
 </div>
 </motion.div>
 );
};

export default Toast;