const CandidateStatsSkeleton = () => {
 return (
 <div
 className="
 grid
 grid-cols-1
 gap-4
 sm:grid-cols-2
 xl:grid-cols-4
 "
 >
 {Array.from({ length: 4 }).map((_, i) => (
 <div
 key={i}
 className="
 animate-pulse
 rounded-2xl
 border
 border-zinc-200
 bg-white
 p-5
 shadow-sm

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Top */}
 <div className="flex items-center justify-between">
 <div className="h-4 w-24 rounded-md bg-zinc-200 dark:bg-zinc-700" />

 <div className="h-10 w-10 rounded-xl bg-zinc-200 dark:bg-zinc-700" />
 </div>

 {/* Number */}
 <div className="mt-6 h-8 w-16 rounded-lg bg-zinc-200 dark:bg-zinc-700" />

 {/* Bottom */}
 <div className="mt-5 flex items-center justify-between">
 <div className="h-6 w-14 rounded-full bg-zinc-200 dark:bg-zinc-700" />

 <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
 </div>
 </div>
 ))}
 </div>
 );
};

export default CandidateStatsSkeleton;