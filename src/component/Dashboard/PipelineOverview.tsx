import { MdAssignment, MdCancel, MdCardGiftcard, MdGroups, MdSearch, MdVerified } from "react-icons/md";
import usePipelineOverview from "./hooks/usePipelineOverview";

const stageStyles = {
 Applied: {
 card: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20",
 text: "text-blue-600 dark:text-blue-400",
 bar: "bg-blue-500",
 },
 Screening: {
 card: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20",
 text: "text-amber-600 dark:text-amber-400",
 bar: "bg-amber-500",
 },
 Interview: {
 card: "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20",
 text: "text-purple-600 dark:text-purple-400",
 bar: "bg-purple-500",
 },
 Offer: {
 card: "border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-900/20",
 text: "text-cyan-600 dark:text-cyan-400",
 bar: "bg-cyan-500",
 },
 Hired: {
 card: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20",
 text: "text-emerald-600 dark:text-emerald-400",
 bar: "bg-emerald-500",
 },
 Rejected: {
 card: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20",
 text: "text-red-600 dark:text-red-400",
 bar: "bg-red-500",
 },
} as const;


const stageIcons = {
 Applied: <MdAssignment size={22} />,
 Screening: <MdSearch size={22} />,
 Interview: <MdGroups size={22} />,
 Offer: <MdCardGiftcard size={22} />,
 Hired: <MdVerified size={22} />,
 Rejected: <MdCancel size={22} />,
};


const DashboardPipelineOverview = () => {
 const { pipeline } = usePipelineOverview();

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
 <div className="overflow-x-auto">
 <div className="flex min-w-max items-center gap-5">

 {pipeline
 .filter((item) => item.stage !== "Rejected")
 .map((item, index) => {
    const style = stageStyles[item.stage];
    return(
 <div
 key={item.stage}
 className="flex items-center gap-5"
 >
 <div
className={`
w-52
h-52
rounded-3xl
border
p-5
transition-all
duration-300
hover:-translate-y-2
hover:shadow-xl
${style.card}
`}


 >
    <div className={`${style.text} mb-3`}>
 {stageIcons[item.stage]}
</div>
 <p 
 className={`text-sm dark:text-zinc-400 font-semibold ${style.text}`}>
 {item.stage}
 </p>

 <h2 className="mt-4 text-4xl font-bold text-zinc-900 dark:text-white">
 {item.count} 
 </h2>
<p className="mt-1 text-sm text-zinc-500">
 Candidates
</p>


 <p className="mt-2 text-sm text-zinc-500">
 {item.percentage}% of candidates
 </p>

<div className="mt-4 h-2 overflow-hidden rounded-full bg-white/60 dark:bg-zinc-700">
 <div
 className={`h-full rounded-full transition-all duration-700 ${style.bar}`}
 style={{
 width: `${item.percentage}%`,
 }}
 />
</div> 
 </div>

 {index < pipeline.filter(
 (stage) => stage.stage !== "Rejected"
 ).length - 1 && (
 <div className="flex items-center">

 <div
 className="
 h-1
 w-10
 rounded-full
 bg-zinc-300
 dark:bg-zinc-700
 "
 />

 <div
 className="
 flex
 h-8
 w-8
 items-center
 justify-center
 rounded-full
 bg-[#408A71]
 text-sm
 font-bold
 text-white
 shadow-md
 "
 >
 →
 </div>

 <div
 className="
 h-1
 w-10
 rounded-full
 bg-zinc-300
 dark:bg-zinc-700
 "
 />

</div>


 )}
 </div>
)})}

 </div>
</div>

<div className="mt-10">
 {pipeline
 .filter((item) => item.stage === "Rejected")
 .map((item) => (
 <div
 key={item.stage}
 className="
 inline-flex
 items-center
 gap-4
 rounded-3xl
 border
 border-red-200
 bg-red-50
 px-6
 py-5
 dark:border-red-900
 dark:bg-red-950/20
 "
 >
 <div>
 <p className="text-sm font-semibold text-red-500">
 Rejected
 </p>

 <h2 className="text-3xl font-bold text-red-600">
 {item.count}
 </h2>
 </div>

 <div className="text-sm text-red-500">
 {item.percentage}% of candidates
 </div>
 </div>
 ))}
</div>

 <div className="space-y-6">
 {pipeline.map((item) => (
 <div key={item.stage}>
 <div className="mb-2 flex items-center justify-between">

 <div className="flex items-center gap-3">
 <span className="font-medium text-zinc-800 dark:text-zinc-200">
 {item.stage}
 </span>

 <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-semibold dark:bg-zinc-800">
 {item.count}
 </span>
 </div>

 <span className="text-sm text-zinc-500">
 {item.percentage}%
 </span>

 </div>

 <div className="h-3 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
 <div
 className="h-full rounded-full bg-[#408A71] transition-all duration-500"
 style={{
 width: `${item.percentage}%`,
 }}
 />
 </div>
 </div>
 ))}
 </div>
 </section>
 );
};

export default DashboardPipelineOverview;