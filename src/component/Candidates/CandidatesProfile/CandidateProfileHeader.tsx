
import { useParams } from "react-router-dom";
import { useCandidateStore } from "../../../store/candidateStore";

const CandidateProfileHeader = () => {
 const { id } = useParams();

 const candidate = useCandidateStore((state) =>
 state.candidates.find((c) => c.id === id)
 );

 if (!candidate) {
 return null;
 }

 return (
 <div className=" bg-white p-4 md:p-8 dark:border-zinc-700 dark:bg-zinc-900">

 <div className="flex flex-col items-center gap-8">

 {/* Avatar */}

 <div className="relative">

<div className="relative mx-auto h-20 w-20 md:h-24 md:w-24">
 <img
 src={
 candidate.avatar ||
 "https://ui-avatars.com/api/?name=" + candidate.fullName
 }
 alt={candidate.fullName}
 className="h-20 w-20 md:h-24 md:w-24 rounded-full border-4 border-[#408A71] object-cover shadow-md dark:border-[#B0E4CC]"
 />

 {/* Status Dot */}
 <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500 dark:border-zinc-800" />
 </div>


 

 </div>

 {/* Candidate */}

 <div className="text-center flex-col flex justify-center items-center">

 <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
 {candidate.fullName}
 </h1>

 <p className="mt-1 text-md font-mono text-zinc-500 dark:text-zinc-400">
 {candidate.appliedRole}
 </p>

 <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 dark:text-zinc-200 max-w-xl">
 {candidate.bio}
 </p>

{/* Skills */}
 <div className="mt-8 md:mt-10">

 <div className="flex items-center justify-between">

 <div>
 <h3 className="text-lg md:text-xl text-start font-bold text-zinc-900 dark:text-white">
 Skills
 </h3>

 <p className="mt-1 text-start text-sm text-zinc-500 dark:text-zinc-400">
 Technical and professional skills.
 </p>
 </div>

 

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
px-3
 py-2
 md:px-4
 md:py-2.5

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
 </div>

 </div>

</div>
 );
};

export default CandidateProfileHeader;