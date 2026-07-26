import { MdSearch, MdFilterList, MdRefresh } from "react-icons/md";

const PipelineToolbar = () => {
 return (
 <section className="mt-8 flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 lg:flex-row lg:items-center lg:justify-between">

 {/* Left */}
 <div className="flex flex-1 items-center gap-4">

 {/* Search */}
 <div className="relative flex-1 ">

 <MdSearch
 size={20}
 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
 />

 <input
 type="text"
 placeholder="Search candidate..."
 className="
 w-full
 rounded-2xl
 border
 border-zinc-200
 bg-zinc-50
 py-3
 pl-12
 pr-4
 text-sm
 outline-none
 transition
 focus:border-[hashtag#408A71]
 focus:bg-white
 dark:border-zinc-700
 dark:bg-zinc-900
 dark:text-white
 dark:focus:border-[hashtag#B0E4CC]
 "
 />

 </div>

 {/* Filter */}
 <button
 className="
 flex
 items-center
 gap-2
 rounded-2xl
 border
 border-zinc-200
 px-5
 py-3
 text-sm
 font-medium
 transition
 hover:bg-zinc-100
 dark:border-zinc-700
 dark:hover:bg-zinc-700
 "
 >
 <MdFilterList size={20} />
 Filters
 </button>

 </div>

 {/* Right */}
 <div className="flex items-center gap-3">

 <button
 className="
 rounded-2xl
 border
 border-zinc-200
 p-3
 transition
 hover:bg-zinc-100
 dark:border-zinc-700
 dark:hover:bg-zinc-700
 "
 >
 <MdRefresh size={20} />
 </button>

 </div>

 </section>
 );
};

export default PipelineToolbar;