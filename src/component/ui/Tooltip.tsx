import type { ReactNode } from "react";

interface TooltipProps {
 text: string;
 children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
 return (
 <div className="group relative inline-flex">

 {children}

 <div
 className="
 pointer-events-none
 absolute
 left-1/2
 top-0

 -translate-x-1/2
 -translate-y-[calc(100%+10px)]

 whitespace-nowrap

 rounded-lg

 bg-zinc-900

 px-3
 py-1.5

 text-xs
 font-medium
 text-white

 opacity-0
 shadow-xl

 transition-all
 duration-200

 group-hover:-translate-y-[calc(100%+14px)]
 group-hover:opacity-100

 dark:bg-white
 dark:text-zinc-900
 "
 >
 {text}

 <div
 className="
 absolute
 left-1/2
 top-full

 h-2
 w-2

 -translate-x-1/2
 -translate-y-1/2
 rotate-45

 bg-zinc-900

 dark:bg-white
 "
 />
 </div>

 </div>
 );
};

export default Tooltip;