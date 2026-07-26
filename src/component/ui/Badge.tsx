import React from "react";

interface BadgeProps {
 children: React.ReactNode;
 variant?: 
 | "success"
 | "danger"
 | "warning"
 | "info"
 | "purple"
 | "default";
}

const Badge = ({
 children,
 variant = "default",
}: BadgeProps) => {

 const variants = {
 success:
 "bg-green-500/10 text-green-400 border border-green-500/20",

 danger:
 "bg-red-500/10 text-red-400 border border-red-500/20",

 warning:
 "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",

 info:
 "bg-blue-500/10 text-blue-400 border border-blue-500/20",

 purple:
 "bg-purple-500/10 text-purple-400 border border-purple-500/20",

 default:
 "bg-gray-500/10 text-gray-400 border border-gray-500/20",
 };


 return (
 <span
 className={`
 inline-flex items-center
 rounded-full
 px-3 py-1
 text-xs
 font-medium
 ${variants[variant]}
 `}
 >
 {children}
 </span>
 );
};

export default Badge;