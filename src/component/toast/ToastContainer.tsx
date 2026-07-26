import { AnimatePresence } from "framer-motion";
import Toast from "./Toast";
import { useToastStore } from "./toastStore";

const ToastContainer = () => {
 const toasts = useToastStore((state) => state.toasts);

 return (
 <div
 className="
 fixed
 top-6
 right-6
 z-[9999]
 flex
 flex-col
 gap-3
 pointer-events-none
 "
 >
 <AnimatePresence>
 {toasts.map((toast) => (
 <div key={toast.id} className="pointer-events-auto">
 <Toast toast={toast} />
 </div>
 ))}
 </AnimatePresence>
 </div>
 );
};

export default ToastContainer;