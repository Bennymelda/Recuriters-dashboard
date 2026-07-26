const CandidatesHeader = () => {
 return (
 <section className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-3  dark:border-zinc-800 dark:bg-zinc-900">

 {/* Accent Glow */}
 <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#408A71]/10 blur-3xl" />

 <div className="relative">

 <span className="inline-flex rounded-full bg-[#EEF8F3] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#408A71] dark:bg-[#408A71]/20 dark:text-[#B0E4CC]">
 Talent Management
 </span>

 <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
 Candidates
 </h1>

 <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
 Review applicants, monitor hiring progress, and identify the best talent
 with a clean, organized recruitment workflow.
 </p>

 </div>

 </section>
 );
};

export default CandidatesHeader;