import useRecentApplications from "./hooks/useRecentApplication";
const DashboardRecentApplications = () => {
 const { recentApplications } =
 useRecentApplications();

 return (
 <section
 className="
 rounded-3xl
 border
 border-zinc-200
 bg-white
 p-6
 shadow-sm

 dark:border-zinc-700
 dark:bg-zinc-900
 "
 >

 <div className="mb-6">
 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
 Recent Applications
 </h2>

 <p className="text-sm text-zinc-500 dark:text-zinc-400">
 Latest candidates who applied for your jobs.
 </p>
 </div>


 <div className="space-y-4">

 {recentApplications.map((candidate) => (

 <div
 key={candidate.id}
 className="
 flex
 items-center
 justify-between
 rounded-2xl
 border
 border-zinc-200
 p-4
 transition
 hover:shadow-md

 dark:border-zinc-700
 "
 >

 <div className="flex items-center gap-4">

 <img
 src={
 candidate.avatar ||
 `https://ui-avatars.com/api/?name=${candidate.fullName}`
 }
 alt={candidate.fullName}
 className="
 h-12
 w-12
 rounded-full
 object-cover
 "
 />


 <div>

 <h3 className="font-semibold text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h3>

 <p className="text-sm text-zinc-500">
 {candidate.appliedRole}
 </p>

 </div>

 </div>


 <div className="text-right">

 <span
 className="
 rounded-full
 bg-[#EEF8F3]
 px-3
 py-1
 text-xs
 font-semibold
 text-[#285A48]

 dark:bg-[#285A48]/20
 dark:text-[#B0E4CC]
 "
 >
 {candidate.status}
 </span>


 <p className="mt-2 text-xs text-zinc-500">
 {
 new Date(candidate.createdAt)
 .toLocaleDateString("en-US", {
 month: "short",
 day: "numeric",
 })
 }
 </p>

 </div>


 </div>

 ))}

 </div>

 </section>
 );
};

export default DashboardRecentApplications;