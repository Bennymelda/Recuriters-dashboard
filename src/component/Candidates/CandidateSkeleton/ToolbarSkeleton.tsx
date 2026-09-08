const CandidateToolbarSkeleton = () => {
 return (
 <div
 className="
 flex
 flex-col
 gap-4
 animate-pulse
 rounded-2xl
 border
 border-zinc-200
 bg-white
 p-4
 shadow-sm

 md:flex-row
 md:items-center

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Search */}
 <div
 className="
 h-11
 min-w-0
 flex-1
 rounded-xl
 bg-zinc-200
 dark:bg-zinc-700
 "
 />

 {/* Filter */}
 <div
 className="
 h-11
 w-full
 rounded-xl
 bg-zinc-200

 md:w-40

 dark:bg-zinc-700
 "
 />

 {/* Filter */}
 <div
 className="
 h-11
 w-full
 rounded-xl
 bg-zinc-200

 md:w-40

 dark:bg-zinc-700
 "
 />
 </div>
 );
};

export default CandidateToolbarSkeleton;