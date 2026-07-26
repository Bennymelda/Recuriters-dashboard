import { MdAccountTree } from "react-icons/md";

const PipelineHeader = () => {
 return (
 <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center w-full ">



 <div className="border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 rounded-2xl">

 <div className="flex items-center gap-3">

 <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-[#EEF8F3] text-[#408A71] dark:bg-[#408A71]/20 dark:text-[#B0E4CC]">
 <MdAccountTree size={22} />
 </div>

 <div>

 <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#408A71] dark:text-[#B0E4CC]">
 Recruitment Pipeline
 </p>

 <h1 className="mt-1 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
 Hiring Pipeline
 </h1>

 </div>

 </div>

 <p className="mt-2 md:mt-4 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
 Track every candidate through each stage of your hiring process.
 Move candidates between stages, schedule interviews, and monitor
 recruitment progress from one place.
 </p>


 </div>

 </section>
 );
};

export default PipelineHeader;