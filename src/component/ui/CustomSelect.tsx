import { useState } from "react";
import { MdKeyboardArrowDown, MdCheck } from "react-icons/md";

interface CustomSelectProps<T extends string> {
 placeholder: string;
 value: T | "";
 options: readonly T[];
 onChange: (value: T) => void;
}

const CustomSelect = <T extends string>({
 placeholder,
 value,
 options,
 onChange,
}: CustomSelectProps<T>) => {
 const [open, setOpen] = useState(false);

 return (
 <div className="relative">
 {/* Trigger */}
 <button
 type="button"
 onClick={() => setOpen(!open)}
 className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-zinc-700 transition hover:border-teal-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
 >
 <span>{value || placeholder}</span>

 <MdKeyboardArrowDown
 size={20}
 className={`transition ${open ? "rotate-180" : ""}`}
 />
 </button>

 {/* Dropdown */}

 {open && (
 <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-xl dark:border-zinc-700 dark:bg-zinc-900">

 {options.map((option) => (
 <div
 key={option}
 onClick={() => {
 onChange(option);
 setOpen(false);
 }}
 className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm hover:bg-slate-100 dark:hover:bg-zinc-800"
 >
 <span className="dark:text-white">{option}</span>

 {value === option && (
 <MdCheck
 size={18}
 className="text-teal-600"
 />
 )}
 </div>
 ))}

 </div>
 )}
 </div>
 );
};

export default CustomSelect;