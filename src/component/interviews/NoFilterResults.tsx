import { MdFilterAltOff } from "react-icons/md";

interface NoFilterResultsProps {
 onClearFilters: () => void;
}

const NoFilterResults = ({
 onClearFilters,
}: NoFilterResultsProps) => {
 return (
 <div
 className="
 flex
 flex-col
 items-center
 justify-center
 rounded-3xl
 border
 border-dashed
 border-zinc-300
 bg-zinc-50
 px-6
 py-16
 text-center
 dark:border-zinc-700
 dark:bg-zinc-900/40
 "
 >
 <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800">
 <MdFilterAltOff
 size={38}
 className="text-zinc-500"
 />
 </div>

 <h3 className="mt-6 text-2xl font-bold dark:text-white">
 No matching interviews
 </h3>

 <p className="mt-3 max-w-md text-sm leading-7 text-zinc-500 dark:text-zinc-400">
 No interviews match your selected filters. Try changing or clearing
 your filters.
 </p>

 <button
 onClick={onClearFilters}
 className="
 mt-8
 rounded-2xl
 bg-[#408A71]
 px-3
 md:px-6
 py-2
 md:py-3
 text-sm
 font-semibold
 text-white
 transition
 hover:bg-[#2F6D58]
 "
 >
 Clear Filters
 </button>
 </div>
 );
};

export default NoFilterResults;