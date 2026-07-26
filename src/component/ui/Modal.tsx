import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import type { ReactNode } from "react";
interface ModalProps {
 open: boolean;
 onClose: () => void;
 title?: string;
 children: ReactNode;
 maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl";
}

const widthClasses = {
 sm: "max-w-sm",
 md: "max-w-md",
 lg: "max-w-lg",
 xl: "max-w-xl",
 "2xl": "max-w-2xl",
 "4xl": "max-w-4xl",
 "6xl": "max-w-6xl",
};

const Modal = ({
 open,
 onClose,
 title,
 children,
 maxWidth = "4xl",
}: ModalProps) => {
 useEffect(() => {
 if (!open) return;

 const handleEscape = (e: KeyboardEvent) => {
 if (e.key === "Escape") {
 onClose();
 }
 };

 document.addEventListener("keydown", handleEscape);

 document.body.style.overflow = "hidden";

 return () => {
 document.removeEventListener("keydown", handleEscape);
 document.body.style.overflow = "auto";
 };
 }, [open, onClose]);

 if (!open) return null;

 return (
 <div
 className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm"
 onClick={onClose}
 >
 <div
 onClick={(e) => e.stopPropagation()}
 className={`relative w-full ${widthClasses[maxWidth]} max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900`}
 >
 <div className="sticky top-0 flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-700 dark:bg-zinc-900">
 <h2 className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-white">
 {title}
 </h2>

 <button
 onClick={onClose}
 className="rounded-lg p-2  transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
 >
 <MdClose size={22} className="dark:text-white"/>
 </button>
 </div>

 <div className="p-6">{children}</div>
 </div>
 </div>
 );
};

export default Modal;