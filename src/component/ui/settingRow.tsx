interface SettingRowProps {
 title: string;
 description: string;
 checked: boolean;
 onClick: () => void;
}

const SettingRow = ({
 title,
 description,
 checked,
 onClick,
}: SettingRowProps) => {
 return (
 <div
 className="
 flex
 items-center
 justify-between

 rounded-2xl

 border
 border-zinc-200

 bg-white

 p-5

 transition
 duration-200

 hover:border-[hashtag#408A71]/30
 hover:shadow-sm

 dark:border-zinc-700
 dark:bg-zinc-900
 dark:hover:border-[hashtag#B0E4CC]/30
 "
 >
 {/* Left */}
 <div className="flex-1 pr-6">

 <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
 {title}
 </h3>

 <p className="mt-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
 {description}
 </p>

 </div>

 {/* Toggle */}

 <button
 onClick={onClick}
 className={`
 relative

 h-7
 w-14

 rounded-full

 transition-all
 duration-300

 ${
 checked
 ? "bg-[hashtag#408A71]"
 : "bg-zinc-300 dark:bg-zinc-700"
 }
 `}
 >
 <span
 className={`
 absolute
 top-1

 h-5
 w-5

 rounded-full

 bg-white

 shadow

 transition-all
 duration-300

 ${
 checked
 ? "translate-x-8"
 : "translate-x-1"
 }
 `}
 />
 </button>
 </div>
 );
};

export default SettingRow;