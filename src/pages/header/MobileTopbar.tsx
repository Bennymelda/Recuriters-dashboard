import { MdMenu } from "react-icons/md";
import { useCompanyStore } from "../../store/companyStore";

interface MobileTopBarProps {
 onOpenSidebar: () => void;
}

const MobileTopBar = ({ onOpenSidebar }: MobileTopBarProps) => {
 const company = useCompanyStore((state) => state.company);
   
 
 return (
 <header
 className="
 sticky
 top-0
 z-40

 flex
 h-16
 items-center
 justify-between

 border-b
 border-zinc-200

 bg-white/90
 px-5

 backdrop-blur

 dark:border-zinc-800
 dark:bg-zinc-900/90

 lg:hidden
 "
 >
 <div className="flex items-center gap-3">
 <button
 onClick={onOpenSidebar}
 className="
 rounded-xl
 p-2

 text-[#285A48]

 transition

 hover:bg-[#EEF8F3]

 dark:text-[#B0E4CC]
 dark:hover:bg-zinc-800
 "
 >
 <MdMenu size={24} />
 </button>

 <div className="flex items-center gap-3">

 <img
 src={company.logo || RecruitFlowLogo}
 alt="Company Logo"
 className="h-10 w-10 rounded-xl object-cover"
 />

 <div>

 <h1 className="text-lg font-bold text-zinc-900 dark:text-white">
 RecruitFlow
 </h1>

 <p className="text-xs text-zinc-500 dark:text-zinc-400">
 {company.companyName || "Hiring Dashboard"}
 </p>

 </div>

</div>
 </div>

 <img
 src="https://ui-avatars.com/api/?name=Admin"
 alt="User"
 className="
 h-10
 w-10
 rounded-xl
 border
 border-zinc-200

 dark:border-zinc-700
 "
 />

 </header>
 );
};

export default MobileTopBar;