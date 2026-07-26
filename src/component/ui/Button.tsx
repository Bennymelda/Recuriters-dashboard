import React from "react";

interface ButtonProps
 extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: "primary" | "secondary" | "outline" | "danger";
 size?: "sm" | "md" | "lg";
 isLoading?: boolean;
}

const Button = ({
 children,
 variant = "primary",
 size = "md",
 isLoading = false,
 disabled,
 className = "",
 ...props
}: ButtonProps) => {
 const baseStyles =
 "flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

 const variants = {
 primary:
 "bg-blue-600 text-white hover:bg-blue-700",
 secondary:
 "bg-gray-700 text-white hover:bg-gray-600",
 outline:
 "border border-gray-600 text-gray-200 hover:bg-gray-800",
 danger:
 "bg-red-600 text-white hover:bg-red-700",
 };

 const sizes = {
 sm: "px-3 py-2 text-sm",
 md: "px-5 py-2.5 text-sm",
 lg: "px-6 py-3 text-base",
 };

 return (
 <button
 className={`
 ${baseStyles}
 ${variants[variant]}
 ${sizes[size]}
 ${className}
 `}
 disabled={disabled || isLoading}
 {...props}
 >
 {isLoading ? (
 <span className="flex items-center gap-2">
 <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
 Loading...
 </span>
 ) : (
 children
 )}
 </button>
 );
};

export default Button;