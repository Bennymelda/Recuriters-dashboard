import { MdDownload } from "react-icons/md";

const AnalyticsHeader = () => {
 return (
 <section
 className="
 flex
 flex-col
 gap-5
 lg:flex-row
 lg:items-center
 lg:justify-between
 "
 >
 {/* Left */}
 <div>
 <h1
 className="
 text-2xl
 font-bold
 tracking-tight
 text-zinc-900
 dark:text-white
 sm:text-3xl
 "
 >
 Analytics
 </h1>

 <p
 className="
 mt-1
 text-sm
 text-zinc-500
 dark:text-zinc-400
 "
 >
 Track your hiring performance and recruitment
 progress.
 </p>
 </div>

 {/* Right */}
 <div className="flex flex-wrap items-center gap-3">
 {/* Date range */}
 <select
 className="
 rounded-xl
 border
 border-zinc-200
 bg-white
 px-4
 py-2.5
 text-sm
 font-medium
 text-zinc-700
 outline-none
 transition
 focus:border-[#408A71]

 dark:border-zinc-700
 dark:bg-zinc-900
 dark:text-zinc-200
 "
 defaultValue="30"
 >
 <option value="7">Last 7 days</option>
 <option value="30">Last 30 days</option>
 <option value="90">Last 90 days</option>
 <option value="365">Last year</option>
 </select>

 {/* Export */}
 <button
 type="button"
 className="
 flex
 items-center
 gap-2
 rounded-xl
 border
 border-zinc-200
 bg-white
 px-4
 py-2.5
 text-sm
 font-semibold
 text-zinc-700
 transition
 hover:bg-zinc-50

 dark:border-zinc-700
 dark:bg-zinc-900
 dark:text-zinc-200
 dark:hover:bg-zinc-800
 "
 >
 <MdDownload size={18} />

 Export
 </button>
 </div>
 </section>
 );
};

export default AnalyticsHeader;