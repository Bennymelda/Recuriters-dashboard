import React from "react";

interface InputProps
 extends React.InputHTMLAttributes<HTMLInputElement> {
 label?: string;
 error?: string;
}

const Input = ({
 label,
 error,
 className = "",
 ...props
}: InputProps) => {
 return (
 <div className="flex flex-col gap-2">
 {label && (
 <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
 {label}
 </label>
 )}

 <input
 className={`
 w-full
 rounded-lg
 border
 border-gray-200
 dark:border-gray-700
 bg-[#111827]
 px-4
 py-3
 text-sm
 text-black
 dark:text-white
 placeholder:text-gray-500
 outline-none
 transition
 focus:border-teal-500
 focus:ring-2
 focus:ring-teal-500/20
 ${error ? "border-red-500" : ""}
 ${className}
 `}
 {...props}
 />

 {error && (
 <p className="text-sm text-red-400">
 {error}
 </p>
 )}
 </div>
 );
};

export default Input;