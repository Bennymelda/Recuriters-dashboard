const CandidateHeaderSkeleton = () => {
 return (
 <div
 className="
 flex
 flex-col
 gap-5
 rounded-2xl
 border
 border-zinc-200
 bg-white
 p-5
 shadow-sm

 sm:flex-row
 sm:items-center
 sm:justify-between
 sm:p-6

 dark:border-zinc-800
 dark:bg-zinc-900
 "
 >
 {/* Header Content */}
 <div className="space-y-3">
 {/* Title */}
 <div
 className="
 h-8
 w-40
 animate-pulse
 rounded-lg
 bg-zinc-200

 sm:w-48

 dark:bg-zinc-700
 "
 />

 {/* Description */}
 <div
 className="
 h-4
 w-64
 animate-pulse
 rounded-md
 bg-zinc-200

 sm:w-80

 dark:bg-zinc-700
 "
 />
 </div>

 {/* Action Button */}
 <div
 className="
 h-11
 w-full
 animate-pulse
 rounded-xl
 bg-zinc-200

 sm:w-32

 dark:bg-zinc-700
 "
 />
 </div>
 );
};

export default CandidateHeaderSkeleton;