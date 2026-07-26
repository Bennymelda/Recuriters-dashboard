import { MdMenu } from "react-icons/md";
import HeaderSearch from "./HeaderSearch";
import NotificationButton from "./NotificationButton";
import ProfileMenu from "./ProfileMenu";

interface HeaderProps {
 onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: HeaderProps) => {
 return (
 <header
 className="
 sticky
 top-0
 z-40

 flex
 h-[72px]
 items-center
 justify-between

 border-b
 border-zinc-200

 bg-white/80
 px-4
 lg:px-6

 backdrop-blur-xl

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Left */}
 <div className="flex flex-1 items-center gap-3">

 {/* Mobile menu */}
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

 lg:hidden
 "
 >
 <MdMenu size={24} />
 </button>

 <HeaderSearch />
 </div>

 {/* Right */}
 <div className="flex items-center gap-3">

 <NotificationButton />

 <div className="hidden h-8 w-px bg-zinc-200 dark:bg-zinc-700 lg:block" />

 <ProfileMenu />

 </div>
 </header>
 );
};

export default Header;