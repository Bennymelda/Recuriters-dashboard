
import { MdSearch } from "react-icons/md";
import { useSearchStore } from "../../store/searchStore";

const HeaderSearch = () => {
 const { query, setQuery } = useSearchStore();

 return (
 <div className="relative w-full max-w-xl">
 <MdSearch
 size={20}
 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
 />

 <input
 type="text"
 value={query}
 onChange={(e) => setQuery(e.target.value)}
 placeholder="Search jobs, candidates, applications..."
 className="
 w-full

 rounded-2xl
 focus:outline-none
 border
 border-zinc-200

 bg-white

 py-3
 pl-12
 pr-4

 text-sm
 text-zinc-800

 placeholder:text-zinc-400


 outline-none

 transition-all
 duration-300

 hover:border-[#408A71]/40

 focus:border-[#408A71]
 focus:shadow-md
 focus:ring-2
 focus:ring-[#B0E4CC]/30

 dark:border-zinc-700
 dark:bg-zinc-800
 dark:text-zinc-100
 dark:placeholder:text-zinc-500

 dark:hover:border-[#B0E4CC]/40

 dark:focus:border-[#B0E4CC]
 dark:focus:ring-[#408A71]/20
 "
 />
</div>
 );
};

export default HeaderSearch;