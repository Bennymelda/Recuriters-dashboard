import type { Candidate } from "../../../types/candidate";

interface CandidateOverviewProps {
 candidate: Candidate;
}

const CandidateOverview = ({
 candidate,
}: CandidateOverviewProps) => {
 return (
 <section className=" bg-white p-6  dark:border-slate-800 dark:bg-slate-900">

 <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
 Overview
 </h2>

 <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
 {candidate.bio}
 </p>

{/* Skills */}
 <div className="mt-10">

 <div className="flex items-center justify-between">

 <div>
 <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
 Skills
 </h3>

 <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
 Technical and professional skills.
 </p>
 </div>

 <span className="text-sm text-zinc-500 dark:text-zinc-400">
 {candidate.skills.length} skills
 </span>

 </div>


 <div className="mt-6 flex flex-wrap gap-3">

 {candidate.skills.map((skill) => (

 <div
 key={skill}
 className="
 group
 flex
 items-center
 gap-2

 rounded-2xl

 border
 border-zinc-200

 bg-white

 px-4
 py-2.5

 text-sm
 font-medium

 text-zinc-700

 transition-all
 duration-300

 hover:-translate-y-0.5
 hover:border-[#408A71]/40
 hover:shadow-sm

 dark:border-zinc-700
 dark:bg-zinc-900
 dark:text-zinc-300
 "
 >

 {/* Dot */}

 <span
 className="
 h-2
 w-2
 rounded-full

 bg-[#408A71]

 transition-all

 group-hover:scale-125

 dark:bg-[#B0E4CC]
 "
 />

 {skill}

 </div>

 ))}

 </div>

</div>


 </section>
 );
};

export default CandidateOverview;