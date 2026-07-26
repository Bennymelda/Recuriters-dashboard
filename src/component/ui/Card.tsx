import React from "react";

interface CardProps {
 children: React.ReactNode;
 className?: string;
 hover?: boolean;
}

const Card = ({
 children,
 className = "",
 hover = false,
}: CardProps) => {
 return (
 <div
 className={`
 rounded-xl
 border
 border-gray-800
 bg-[#111827]
 p-5
 shadow-sm
 transition-all
 duration-200
 ${
 hover
 ? "hover:border-blue-500/50 hover:-translate-y-1"
 : ""
 }
 ${className}
 `}
 >
 {children}
 </div>
 );
};

export default Card;