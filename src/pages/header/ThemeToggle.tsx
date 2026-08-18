import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useThemeStore } from "../../store/themeStore";

const ThemeToggle = () => {
 const { theme, toggleTheme } = useThemeStore();

 return (
 <button
 onClick={toggleTheme}
 className="
 flex
 w-full
 cursor-pointer
 items-center
 justify-between
 rounded-xl
 px-3
 py-3
 transition-all
 duration-200
 hover:bg-[#EEF2FF]
 dark:hover:bg-zinc-800
 "
 >
 {/* Left */}
 <div className="flex items-center gap-3">
 
{theme === "dark" ? <MdDarkMode size={20}
 className="text-[#285a48] dark:text-[#B0E4CC]"/> : <MdLightMode size={20}
 className="text-[#285a48] dark:text-[#B0E4CC]"/>}
 <span className="text-sm font-medium text-slate-700 dark:text-slate-200">


 </span>
 </div>


 </button>
 );
};

export default ThemeToggle;