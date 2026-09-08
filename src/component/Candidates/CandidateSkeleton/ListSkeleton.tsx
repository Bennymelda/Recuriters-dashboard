const CandidateListSkeleton = () => {
 return (
 <div className="space-y-3">
 {Array.from({ length: 8 }).map((_, i) => (
 <div
 key={i}
 className="
 hidden
 h-20
 animate-pulse
 grid-cols-[2.5fr_1.2fr_1.5fr_1.2fr_1fr_120px]
 items-center
 gap-4
 rounded-xl
 border
 border-zinc-200
 bg-white
 p-4
 shadow-sm

 lg:grid

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Candidate */}
 <div className="flex items-center gap-3">
 <div
 className="
 h-10
 w-10
 shrink-0
 rounded-full
 bg-zinc-200
 dark:bg-zinc-700
 "
 />

 <div className="space-y-2">
 <div className="h-3.5 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />
 <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
 </div>
 </div>

 {/* Role */}
 <div className="h-3.5 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />

 {/* Location */}
 <div className="h-3.5 w-28 rounded bg-zinc-200 dark:bg-zinc-700" />

 {/* Experience */}
 <div className="h-3.5 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />

 {/* Status */}
 <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700" />

 {/* Action */}
 <div className="h-9 w-20 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
 </div>
 ))}
 </div>
 );
};

export default CandidateListSkeleton;