import {
 MdCheckCircle,
 MdError,
 MdInfo,
 MdClose,
} from "react-icons/md";
import { useToastStore } from "../../store/toastStore";

const Toast = () => {
 const { open, message, type, hideToast } = useToastStore();

 if (!open) return null;

 const config = {
 success: {
 icon: <MdCheckCircle size={24} />,
 color: "text-emerald-600",
 border: "border-emerald-500",
 },
 error: {
 icon: <MdError size={24} />,
 color: "text-red-600",
 border: "border-red-500",
 },
 info: {
 icon: <MdInfo size={24} />,
 color: "text-sky-600",
 border: "border-sky-500",
 },
 };

 const current = config[type];

 return (
 <div className="fixed right-6 top-6 z-[9999] animate-slide-in">
 <div
 className={`flex w-96 items-start gap-4 rounded-2xl border-l-4 ${current.border}
 bg-white p-5 shadow-2xl dark:bg-slate-900`}
 >
 <div className={current.color}>{current.icon}</div>

 <div className="flex-1">
 <h3 className="font-semibold text-slate-900 dark:text-white">
 {type.charAt(0).toUpperCase() + type.slice(1)}
 </h3>

 <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
 {message}
 </p>
 </div>

 <button
 onClick={hideToast}
 className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
 >
 <MdClose />
 </button>
 </div>
 </div>
 );
};

export default Toast;